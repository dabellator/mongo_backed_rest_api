var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGOLAB_URI = 'mongodb://localhost/caffeine_test';
process.env.APP_SECRET = 'hello';
require(__dirname + '/../server');
var mongoose = require('mongoose');

describe('The Auth routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      console.log('done it');
      done();
    });
  });

  it('should receive status code 200', function(done) {
    chai.request('localhost:3000')
      .post('/signup')
      .send({username:'jordan',password:'secret123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.exist;
        done()
      });
  });

  it('should log a user in', function(done) {
    chai.request('localhost:3000')
      .get('/signin')
      .auth('jordan', 'secret123')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.exist;
        done();
      });
  });
});

