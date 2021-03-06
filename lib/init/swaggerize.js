'use strict';

module.exports = function(app, express, subpath, applicationUrl) {
  var swagger = require('swagger-node-express');
  swagger.setAppHandler(subpath);
  swagger.configure(applicationUrl, require('../../package.json').version);
  swagger.allModels = require('../models/swagger_models');
  swagger.setApiInfo({
    title: 'api-base',
    description: 'base api for new api projects',
    contact: 'dan.essig@gmail.com'
  });

  app.use(express.static('dist'));

  return swagger;
};
