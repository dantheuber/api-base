'use strict';

var setHeaders = require('./setHeaders');

function writeResponse (res, results, queries, start) {
  setHeaders(res, queries, start);
  res.send(results);
}

module.exports = writeResponse;
