var express = require('express');
var bodyParser = require('body-parser').json();
var errHandle = require(__dirname + '/../lib/handleErr');
var basicAuth = require(__dirname + '/../lib/basic_auth');
var User = require(__dirname + '/../models/user');

var authRouter = module.exports = express.Router();

authRouter.post('/signup', bodyParser, function(req, res) {
  // refactor to remove pyramid of doom
  User.findOne({username: req.body.username}, function(err, user) {
    if (err) throw err;
    if (user) return res.json({msg: 'already taken'});

    var user = new User();
    user.auth.basic.username = req.body.username;
    user.hashPassword(req.body.password, function() {

      user.save(function(err, data) {
        if (err) return errHandle(err, res);

        user.generateToken(function(err, token) {
          if (err) return errHandle(err, res);
          res.json({token: token});
        });
      });
    });
  });
});

authRouter.get('/signin', basicAuth, function (req, res) {
  if (!(req.auth.username && req.auth.password)) {
    return res.status(401).json({msg: 'nothing sent'});
  }
  User.findOne({'auth.basic.username': req.auth.username}, function (err, user) {
    if (err) return res.status(401).json({msg: 'big ol err'});
    if (!user) return res.status(401).json({msg: 'you arent here'});
    user.checkPassword(req.auth.password, function(check) {

      if (!check) return res.status(401).json({msg: 'fix'});
      user.generateToken(function(err, token) {
        if (err) errHandle(err, res);
        res.json({token: token});
      });
    });
  });
});

