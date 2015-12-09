var express = require('express');
var jsonParse = require('body-parser').json();
var Caffeine = require(__dirname + '/../models/caffeine');
var handleErr = require(__dirname + '/../lib/handleErr');

var caffeineRouter = module.exports = express.Router();

caffeineRouter.get('/caffeine/:type', function(req, res) {
  Caffeine.find({type: req.params.type}, function(err, data) {
    if (err) return handleErr(err, res);
    res.json(data);
  })
});

caffeineRouter.post('/caffeine', jsonParse, function(req, res) {
  var caffUnit = new Caffeine(req.body);
  caffUnit.save(function(err, data) {
    if (err) return handleErr(err, res);
    res.json(data);
  })
});

//caffeineRouter.put('/caffeine/:id', jsonParse, function(req, res) {
  
//});

