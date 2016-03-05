const assert = require('chai').assert;
const request = require('request');
const app = require('../server');

describe('Server', () => {
  before( (done) => {
    this.port = 3000;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:3000/'
    });
  });

  after( () => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('Routes', () => {
    it('/ should return a 200', (done) => {
      this.request.get('/', (err, response) => {
        if (err) { done(err); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('/polls/new should return a 200', (done) => {
      this.request.get('/polls/new', (err, response) => {
        if (err) { done(err); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('/polls/34343323232 should return a 200', (done) => {
      this.request.get('/polls/34343323232', (err, response) => {
        if (err) { done(err); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('/polls/432534523452/admin should return a 200', (done) => {
      this.request.get('/polls/432534523452/admin', (err, response) => {
        if (err) { done(err); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });
  });
});
