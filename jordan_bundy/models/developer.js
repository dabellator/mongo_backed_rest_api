var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var developerSchema = Schema({
  //_id: Number,
  name: String,
  language: String,
  caffeine: {type: Number, ref: 'Caffeine'}
});

module.exports = mongoose.model('Developer', developerSchema);

