var express = require('express');
var router = express.Router();
var usersdata = require('../users.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {
    title:"Users",
    users:usersdata
  });
});

module.exports = router;
