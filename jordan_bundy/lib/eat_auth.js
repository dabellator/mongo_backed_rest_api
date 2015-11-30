var eat = require('eat');
var User = require(__dirname + '/../models/userSchema');

module.exports = function(req, res, next) {
  var token = req.headers.token || (req.body) ? req.body.token : '';
  if (!token) return res.status(401).json({msg: 'You must log in'});
  eat.decode(token, process.env.APP_SECRET, function (err, decoded) {
    if (err) return res.status(401).json({msg: 'Invalid'});

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) return res.status(401).json({msg: 'Invalid'});
      req.user = user;
      next();
    });
  });
};

