var mongoose = require('mongoose');
var app = require('express')();
var developerRouter = require(__dirname + '/routes/developer_routes');
var caffeineRouter = require(__dirname + '/routes/caffeine_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/caffeine_dev');

app.use('/drip', developerRouter, caffeineRouter);

app.get('/drip', function(req, res) {
  res.writeHead(200, {'content-type': 'text/plain'});
  res.write('Ready to give a dev some coffee?  Let\'s get started');
  res.end()
});

app.listen(3000, function() {
  console.log('power up');
});

