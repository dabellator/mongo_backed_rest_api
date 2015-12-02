var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/caffeine_test';
process.env.APP_SECRET = 'hello';
require(__dirname + '/../server');
var mongoose = require('mongoose');

describe('The Auth routes', function() {

  before(function(done) {
    chai.request('localhost:3000')
      .post('/signup')
      .send({username:'test',password:'nopass'})
      .end(function(err, res) {
        done();
      });
  });
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should receive status code 200', function(done) {
    chai.request('localhost:3000')
      .post('/signup')
      .send({username:'jordan',password:'secret123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should only allow unique usernames', function(done) {
    chai.request('localhost:3000')
      .post('/signup')
      .send({username:'test',password:'whatever'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('msg');
        done();
      });
  });

  it('should log a user in', function(done) {
    chai.request('localhost:3000')
      .get('/signin')
      .auth('test', 'nopass')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

