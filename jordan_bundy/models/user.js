var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  username: String,
  auth: {
    basic: {
      username: String,
      password: String
    }
  }
});

userSchema.methods.hashPassword = function(password, cb) {
  this.username = this.auth.basic.username;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) throw err;
    return bcrypt.hash(password, salt, function(err, hash) {
      if (err) throw err;
      this.auth.basic.password = hash;
      cb();
    }.bind(this));
  }.bind(this));
};

userSchema.methods.checkPassword = function(password, cb) {
  bcrypt.compare(password, this.auth.basic.password, function(err, res) {
    if (err) throw err;
    cb(res);
  });
};

userSchema.methods.generateToken = function(cb) {
  var id = this._id;
  eat.encode({id:id}, process.env.APP_SECRET, cb);
};

var User = mongoose.model('User', userSchema);
module.exports = User;

