var express = require('express');
var router = express.Router();

const client = require('../services/db');

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.send(JSON.stringify({"datetime": new Date(), "msg":"se voce estiver vendo essa mensagem é pq funcionou"}));
});

router.get('/testdb', function(req, res, next) {

  client.connect(err => {
    
    const collection = client.db("portaoeletronico").collection("portao");
    collection.find({}).toArray((errs, docs)=>{
      console.log("find:", errs, docs);
      res.send(JSON.stringify(docs));
    }); 

  });
  
});




module.exports = router;