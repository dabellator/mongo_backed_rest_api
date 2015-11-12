var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
chai.use(chaihttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/caffeine_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var Developer = require(__dirname + '/../models/developer');
var Caffeine = require(__dirname + '/../models/caffeine');

describe('developer caffeine routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  before(function(done) {
    var caffData = {_id: 1, type: 'coffee', units:5};
    chai.request('localhost:3000')
      .post('/drip/caffeine')
      .send(caffData)
      .end(function(err, res) {
        done();
      });
  });

  it('should create a developer', function(done) {
    var devData = {name: 'jordan', language: 'javascript'};
    chai.request('localhost:3000')
      .post('/drip/developer')
      .send(devData)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('jordan');
        done();
      });
  });

  it('should modify the existing dev', function(done) {
    chai.request('localhost:3000')
      .put('/drip/developer/caffeine/jordan')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.nModified).to.eql(1);
        done();
      });
  });

  it('should read caffeine data', function(done) {
    chai.request('localhost:3000')
      .get('/drip/developer/caffeine/jordan')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.eql('coffee');
        done();
    });
  });

});

