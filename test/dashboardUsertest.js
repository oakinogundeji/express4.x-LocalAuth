var
  should = require('should'),
  request = require('supertest'),
  app = require('../app'),
  faker = require('faker');

describe('Dashboard', function () {
  it('should reject an unauthenticated user', function (done) {
    request(app)
    .get('/dashboard')
    .send({
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    .expect(302)
    .end(function (err, res) {
      res.text.should.containEql('Redirecting to /login');
      done(err);
    })
  })
})
