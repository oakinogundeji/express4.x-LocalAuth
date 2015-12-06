var
  should = require('should'),
  request = require('supertest'),
  app = require('../app'),
  User = require('../models/users'),
  faker = require('faker');

describe('Users', function () {
  before(function (done) {
    User.remove({}, done);
  });
  describe('Signup pass', function () {
    it('should create a new valid user', function (done) {
      request(app)
      .post('/signup')
      .send({
        username: 'temili234',
        email: 'temili@testingit.com',
        password: 'qwertyuiop'
      })
      .expect(302)
      .end(function (err, res) {
        res.text.should.containEql('Redirecting to /dashboard');
        done(err);
      })
    })
  });
  describe('Logout pass', function () {
    it('should logout the user', function (done) {
      request(app)
      .get('/logout')
      .expect(302)
      .end(function (err, res) {
        res.text.should.containEql('Redirecting to /');
        done(err);
      })
    })
  });
  describe('Login pass', function () {
    it('should login a valid user', function (done) {
      request(app)
      .post('/login')
      .send({
        email: 'temili@testingit.com',
        password: 'qwertyuiop'
      })
      .expect(302)
      .end(function (err, res) {
        res.text.should.containEql('Redirecting to /dashboard');
        done(err);
      })
    })
  });
  describe('Signup fail', function () {
    it('should fail because of missing username', function (done) {
      request(app)
      .post('/signup')
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
  describe('Signup fail', function () {
    it('should fail because of missing password', function (done) {
      request(app)
      .post('/signup')
      .send({
        username: faker.internet.userName(),
        email: faker.internet.email()
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
  describe('Signup fail', function () {
    it('should fail because of missing email', function (done) {
      request(app)
      .post('/signup')
      .send({
        username: faker.internet.userName(),
        password: faker.internet.password()
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
  describe('Signup fail', function () {
    it('should fail because of existing user', function (done) {
      request(app)
      .post('/signup')
      .send({username: 'temili234',
      email: 'temili@testingit.com',
      password: 'qwertyuiop'
      })
      .expect(409)
      .end(function (err, res) {
        done(err);
      })
    })
  });
})
