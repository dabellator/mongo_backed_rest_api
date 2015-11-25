var mongoose = require('mongoose');
var app = require('express')();
var developerRouter = require(__dirname + '/routes/developer_routes');
var caffeineRouter = require(__dirname + '/routes/caffeine_routes');
var fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/caffeine_dev');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/:filename', function(req, res, next) {
  fs.stat(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if (err) {
      console.log(err);
      return next();
    }
    if (!stats.isFile()) return next();
    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.use('/drip', developerRouter, caffeineRouter);

app.get('/drip', function(req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Ready to give a dev some coffee?  Let\'s get started');
  res.end()
});

app.listen(3000, function() {
  console.log('power up');
});

