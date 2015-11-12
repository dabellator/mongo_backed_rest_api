var express = require('express');
var bodyParser = require('body-parser');
var handleErr = require(__dirname + '/../lib/handleErr')
var Developer = require(__dirname + '/../models/developer');
var Caffeine = require(__dirname + '/../models/caffeine');

var developerRouter = module.exports = express.Router();

developerRouter.get('/developer/:name', function(req, res) {
  Developer.find({name: req.params.name}, function(err, data) {
    if (err) return handleErr(err, res);
    res.json(data);
  })
});

developerRouter.post('/developer', bodyParser.json(), function(req, res) {
  var devPerson = new Developer(req.body);
  devPerson.save(function(err, data) {
    if (err) return handleErr(err, res);
    res.json(data);
  })
});

developerRouter.put('/developer/caffeine/:name', function(req, res) {
  Developer.update({name: req.params.name}, {caffeine: 1}, function(err, data) {
    if (err) return handleErr(err, res);
    res.json(data);
  })
});

developerRouter.get('/developer/caffeine/:name', function(req, res) {
  Developer.find({name: req.params.name})
    .populate('caffeine')
    .exec(function(err, caff) {
      if (err) return handleErr(err, res);
      res.json(caff[0].caffeine.type);
    });
});

developerRouter.delete('/developer/:name', function(req, res) {
  Developer.remove({name: req.params.name}, function(err) {
    if (err) return handleErr(err, res);
    res.json({info: 'dead'});
  })
});
