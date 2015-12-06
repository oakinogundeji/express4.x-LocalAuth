/**
*Module dependencies
*/
var
  express = require('express'),
  logger = require('morgan'),
  path = require('path'),
  bParser = require('body-parser'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  mongodbStore = require('connect-mongo')(session);
//==============================================================================
/**
*Create app instance
*/
var app = express();
//==============================================================================
/**
*Module Variables
*/
var
  config = require('./config/config'),
  port = process.env.PORT || 3030,
  env = config.env,
  router = require('./routes/routes'),
  dbURL = config.dbURL;
  app.locals.errMsg = app.locals.errMsg || null;
//==============================================================================
/**
*Module Settings and Config
*/
app.set('port', port);
app.set('env', env);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

mongoose.connect(dbURL);
var db = mongoose.connection;
db.on('error', function (err) {
  console.error('There was a db connection error');
  return  console.error(err.message);
});
db.once('connected', function () {
  return console.log('Successfully connected to ' + dbURL);
});
db.once('disconnected', function () {
  return console.error('Successfully disconnected from ' + dbURL);
});
//==============================================================================
/**
*Middleware
*/
app.use(logger('dev'));

app.use(bParser.json());

app.use(bParser.urlencoded({ extended: true }));

app.use(session({
  name: 'xpressBlu.sess', store: new mongodbStore({
    mongooseConnection: mongoose.connection,
  touchAfter: 24 * 3600}), secret: 'qwertyuiop123456789', resave: true,
  saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 15}}));
//==============================================================================
/**
*Routes
*/
app.use('/', router);
//==============================================================================
/**
*Export Module
*/
module.exports = app;
//==============================================================================
