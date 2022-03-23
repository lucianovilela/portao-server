var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Portao, User, Historico } = require("../../models");
const {
  isValidTokenUser,
  isValidTokenPortao,
} = require("../../services/security");

/* GET home page. */
router.get("/test", function (req, res) {
  res.send(
    JSON.stringify({
      datetime: new Date(),
      msg: "se voce estiver vendo essa mensagem é pq funcionou",
    })
  );
});

router.get("/list", async (req, res) => {

  const pg = req.query.pg || 1;

  Portao.find({}, {}, { limit: 10, skip: pg * 10 })
    .limit(10)
    .skip(pg * 10)
    .then((docs) =>
      res.send(docs)
    );
});

router.get("/status/:id", async (req, res) => {
  const token = req.header("token");
  const id = req.params.id;
  if (!token || !(await isValidTokenPortao(id, token))) {
    res.status(504).send({ msg: "portao invalido" });
    return;
  }

  Portao.findOne({ _id: new mongoose.Types.ObjectId(id) }).then((docs) =>
    res.send({ ...docs._doc, token: undefined })
  );
});

router.get("/abre/:id", async (req, res) => {
  Portao.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(async (portao) => {
      const token = req.header("token");
      const email = req.query.email;
      if (!token || !(await isValidTokenUser(email, token))) {
        res.status(504).send({ msg: "usuario inválido" });
        return;
      }
      console.log(portao.key, req.query.key);
      if (portao.key !== req.query.key || portao.status !== "fechado") {

        res.status(504).send({ msg: "error" });
        return;
      }
      const user = await User.findOne({ email: email });
      console.log("user:", user);

      await new Historico({ portao: portao._id
        , 
        /*user: user._id*/ 
      }).save();

      portao.status = "abrindo";
      portao.infoAberura = { /* user: user.email,*/ date: Date.now() }
      await portao.save();
      res.send({ ...portao._doc, token: undefined });
    })
    .catch(
      (err) => {
        console.log(err);
        res.status(504).send({ err: JSON.stringify(err) });
      }

    );
});




router.get("/fecha/:id", async (req, res) => {
  const token = req.header("token");
  const id = req.params.id;
  if (!token || !(await isValidTokenPortao(id, token))) {
    res.status(504).send({ msg: "portao invalido" });
    return;
  }

  Portao.findOne({ _id: new mongoose.Types.ObjectId(id) })
    .then(async (doc) => {
      if (doc.status !== "abrindo") {
        res.status(504).send({ msg: "error" });
        return;
      }

      doc.status = "fechado";
      await doc.save();
      res.send(doc);
    })
    .catch((err) => res.status(504).send({ msg: "error" }));
});


router.put("/add", async (req, res) => {
  res.status(200).send(await new Portao({ descricao: "teste", status: "fechado", token: "tokenX" }).save());
});
module.exports = router;
