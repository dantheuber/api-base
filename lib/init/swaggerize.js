'use strict';

var glob = require('glob');

var swagger = require('swagger-node-express');
var models = require('../models/swagger_models');

module.exports = function(app, subpath, applicationUrl) {
  swagger.configureSwaggerPaths('', 'api-docs', '');
  swagger.configure(applicationUrl, '1.0.0');
  swagger.setAppHandler(subpath);
  swagger.models(models);
  swagger.setApiInfo({
    title: 'api-base',
    description: 'base api for new api projects',
    contact: "dan.essig@gmail.com"
  });

  app.use(express.static('dist'));
  
  return swagger;
};
