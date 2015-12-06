/**
*Module dependencies
*/
var
  app = require('./app'),
  http = require('http');
//==============================================================================
/**
*Create server instance
*/
var server = http.createServer(app);
//==============================================================================
/**
*Module Variables
*/
//==============================================================================
var
  port = app.get('port'),
  env = app.get('env');
/**
*Bind server to port
*/
//==============================================================================
server.listen(port, function () {
  return console.log('Xpress server listening on port:' + port +' in ' + env +
  ' mode');
});
//==============================================================================
