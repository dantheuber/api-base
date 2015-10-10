'use strict';

var path = require('path');
var glob = require('glob');

module.exports = function(swagger) {
  var filenames = glob.sync('*.js', {
      cwd: path.resolve(__dirname, './'),
      ignore: 'index.js'
    })
    .map(function(filename) {
      return path.basename(filename, '.js');
    });

  filenames.forEach(function(filename) {
    var route = require(filename);
    var method = route.method;

    switch(route.type){
      case 'GET':
        swagger.addGet(method);
        break;
      case 'POST':
        swagger.addPost(method);
        break;
      case 'PUT':
        swagger.addPut(method);
        break;
      case 'DELETE':
        swagger.addDelete(method);
       break;
    }
  });
};
