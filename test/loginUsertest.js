var
  should = require('should'),
  request = require('supertest'),
  app = require('../app'),
  User = require('../models/users'),
  faker = require('faker');

describe('Login', function () {
  before(function (done) {
    User.remove({}, done);
  });
  describe('Login fail', function () {
    it('should reject an invalid user with 409 status', function (done) {
      request(app)
      .post('/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
  describe('Login fail', function () {
    it('should reject user because of wrong password', function (done) {
      request(app)
      .post('/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
  describe('Login fail', function () {
    it('should reject user because of wrong username', function (done) {
      request(app)
      .post('/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
})
