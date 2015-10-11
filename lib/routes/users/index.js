'use strict';

var path = require('path');
var glob = require('glob');

module.exports = function(swagger) {
  var filenames = glob.sync('./*.js', {
      cwd: path.resolve(__dirname, './'),
      ignore: './index.js'
    })
    .map(function(filename) {
      return filename;
    });

  filenames.forEach(function(filename) {
    var route = require(filename);
    var method = route.spec.method;

    switch(method){
      case 'GET':
        swagger.addGet(route);
        break;
      case 'POST':
        swagger.addPost(route);
        break;
      case 'PUT':
        swagger.addPut(route);
        break;
      case 'DELETE':
        swagger.addDelete(route);
       break;
    }
  });
};
