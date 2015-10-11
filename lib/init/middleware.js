'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function(app, subpath){
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use('/v1', subpath);
};
