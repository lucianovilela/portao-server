var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Portao } = require("../models");
const {
  isValidTokenUser,
  isValidTokenPortao,
} = require("../services/security");

/* GET home page. */
router.get("/test", function (req, res) {
  res.send(
    JSON.stringify({
      datetime: Date.now(),
      msg: "se voce estiver vendo essa mensagem é pq funcionou",
    })
  );
});

router.get("/testdb", async (req, res) => {
  const portao = new Portao({ nome: "teste", key: "XXXXXXXXXX" });

  Portao.find({}).then((docs) => res.send(docs));
});

router.get("/status/:id", async (req, res) => {
  const token = req.header("token");
  const id = req.params.id;
  if (!token || !await isValidTokenPortao(id, token)) {
    res.status(504).send({ msg: "portao invalido" });
    return;
  }

  Portao.findOne({ _id: new mongoose.Types.ObjectId(id) }).then((docs) =>
    res.send(docs)
  );
});

router.get("/abre/:id", async (req, res) => {
  Portao.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(async (doc) => {
      if (doc.key !== req.query.key || doc.status !== "fechado") {
        res.status(504).send({ msg: "error" });
        return;
      }

      doc.status = "abrindo";
      await doc.save();
      res.send(doc);
    })
    .catch((err) => res.status(504).send({ msg: "error" }));
});

router.get("/fecha/:id", async (req, res) => {
  Portao.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) })
    .then(async (doc) => {
      if (doc.key !== req.query.key || doc.status !== "abrindo") {
        res.status(504).send({ msg: "error" });
        return;
      }

      doc.status = "fechado";
      await doc.save();
      res.send(doc);
    })
    .catch((err) => res.status(504).send({ msg: "error" }));
});


module.exports = router;
