var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Portao } = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: req.params.nome || "Sem nome" });
});
router.get("/portao/list", function (req, res, next) {
  res.render("portao/lista", { pageTitle: req.params.nome || "Sem nome" });
});
router.get("/portao/qrcode/:id", function (req, res, next) {
  const id = req.params.id;
  Portao.findOne({ _id: new mongoose.Types.ObjectId(id) }).then((docs) =>
    res.render("portao/qrcode", { ...docs._doc })
  );
});

module.exports = router;
