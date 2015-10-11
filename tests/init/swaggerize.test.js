'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire');
var SutPath = '../../lib/init/swaggerize';

describe('init swaggerize', function() {
  var sut, stubs;
  var subpath = {};
  var express = {};
  var app = {};
  var applicationUrl = 'testurl.com';

  beforeEach(function() {
    subpath = {
      example: 'subpath'
    }
    stubs = {
      'swagger-node-express': {
        setAppHandler: sinon.spy(),
        configure: sinon.spy(),
        setApiInfo: sinon.spy(),
        allModels: {}
      },
      '../models/swagger_models': {
        example: 'json'
      }
    };
    app.use = sinon.spy();
    express.static = sinon.spy();
    sut = proxyquire(SutPath, stubs)(app, express, subpath, applicationUrl);
  });

  it('sets app handler', function() {
    expect(stubs['swagger-node-express'].setAppHandler.getCall(0).args[0]).to.deep.equal(subpath);
  });

  it('configures swagger', function() {
    expect(stubs['swagger-node-express'].configure).to.have.been.called;
  });

  it('sets models', function() {
    expect(stubs['swagger-node-express'].allModels).to.be.defined;
  });

  it('sets api info', function() {
    expect(stubs['swagger-node-express'].setApiInfo).to.have.been.called;
  });
});
