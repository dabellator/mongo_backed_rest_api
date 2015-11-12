var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var caffeineSchema = Schema({
    _id: Number,
    type: String,
    units: Number,
    consumer: [{type: Number, ref: 'Developr'}]
});

module.exports = mongoose.model('Caffeine', caffeineSchema);

