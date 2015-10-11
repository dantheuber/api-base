'use strict';

var path = require('path');
var glob = require('glob');

module.exports = function(app, swagger) {
  var filenames = glob.sync('./**/index.js', {
      cwd: path.resolve(__dirname, './'),
      ignore: './index.js'
    })
    .map(function(filename) {
      return filename;
    });

  filenames.forEach(function(filename) {
    require(filename)(app, swagger);
  });
};
