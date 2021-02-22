var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.send(JSON.stringify({"msg":"se voce estiver vendo essa mensagem é pq funcionou"}));
});

module.exports = router;