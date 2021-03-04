var express = require("express");
var router = express.Router();
const security = require('../services/security')
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
/* GET users listing. */
router.get("/validate", function (req, res) {
  const email = req.query.email;
  const token = req.header('token');
  console.log(token, email);
  security.isValidTokenUser( email, token)
  .then(result => res.send(result))
  .catch(err => res.send(err));
});

module.exports = router;
