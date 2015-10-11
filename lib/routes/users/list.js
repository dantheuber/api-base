'use strict';

var sw = require('swagger-node-express');
var param = sw.param;
var url = require('url');
var swe = sw.errors;

module.exports = {
  spec: {
    tags: ['tag1'],
    description : 'List all users',
    path : '/users',
    method: 'GET',
    summary : 'Find all users',
    notes : 'Returns all users',
    type: 'array',
    items: {
      $ref: 'User'
    },
    produces: ['application/json'],
    responseMessages: [swe.notFound('users')],
    nickname : 'getUsers'
  },
  action: handler
};

// ****************************************************
function handler (req, res) {
  var users = [{
    name: 'example_user1'
  }, {
    name: 'example_user2'
  }];
  res.status(200).send(users);
}
