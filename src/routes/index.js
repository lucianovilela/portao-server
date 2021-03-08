var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const { Portao } = require("../models");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: req.params.nome || "Sem nome" });
});
router.get("/portao/list", function (req, res, next) {
  const pg = req.query.pg || 0;

  Portao.find({})
    .limit(10)
    .skip(pg * 10)
    .then((docs) =>{
      console.log(docs);
      return res.render("portao/lista", {docs })
    });
    
});
router.get("/portao/qrcode/:id", function (req, res, next) {
  const id = req.params.id;
  Portao.findOne({ _id: new mongoose.Types.ObjectId(id) }).then((docs) =>
    res.render("portao/qrcode", { ...docs._doc, removeNav: true })
  );
});

module.exports = router;
