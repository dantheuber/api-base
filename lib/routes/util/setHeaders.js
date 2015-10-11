'use strict';

function setHeaders (res, queries, start) {
  // sw.setHeaders(res);
  res.header('Duration-ms', new Date() - start);
  if (queries) {
    res.header('Q', JSON.stringify(queries));
  }
}

module.exports = setHeaders;
