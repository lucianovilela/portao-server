var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Portao, User, Historico } = require("../models");
const {
  isValidTokenUser,
  isValidTokenPortao,
} = require("../services/security");


router.get("/list/:id", async (req, res) => {
  const token = req.header("token");
  const id = req.params.id;
  const pg = req.query.pg||1;
  if (!token || !(await isValidTokenPortao(id, token))) {
    res.status(504).send({ msg: "portao invalido" });
    return;
  }

  Historico.find({ portao: new mongoose.Types.ObjectId(id) }, {}, {limit:3, skip:pg*3})
  .populate("user")
  .sort("updated" ,-1)
  .then((docs) =>
    res.send(docs)
  );
});


module.exports = router;
