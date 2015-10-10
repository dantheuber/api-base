'use strict';

var http = require('http');
var express = require('express');
var argv = require('minimise')(process.argv.slice(2));

var app = express();
var subpath = express();
var server = http.createServer(app);

module.exports = function(){
  var domain = 'localhost';

  if(argv.domain !== undefined) domain = argv.domain;
  else console.log('No --domain=xxx specified, taking default hostname "localhost".');

  var port = 8080;
  if(argv.port !== undefined) port = argv.port;
  else console.log('No --port=xxx specified, taking default port ' + port + '.');

  require('./middleware')(app, subpath);

  var swagger = require('./swaggerize')(app, subpath, 'http://' + domain + ':' + port);
  require('./lib/routes')(swagger);

  server.listen(port, function () {
    app.setHost(server.address().address + ':' + server.address().port);
    console.log('Server listening on port ' + server.address().port);
  });
};
