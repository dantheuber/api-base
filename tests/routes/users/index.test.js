'use strict';
/*jshint -W030 */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var SutPath = '../../../lib/routes/users/';

describe('routes/users', function() {
  var sut, stubs, swagger;

  beforeEach(function() {
    swagger = {
      addGet: sinon.spy(),
      addPut: sinon.spy(),
      addPost: sinon.spy(),
      addDelete: sinon.spy()
    };

    stubs = {
      path: {
        resolve: sinon.spy()
      },
      glob: {
        sync: sinon.stub().returns({
          map: sinon.stub().returns({
            forEach: sinon.spy()
          })
        })
      },
      './get.js': {
        spec: {
          method: 'GET'
        }
      },
      './post.js': {
        spec: {
          method: 'POST'
        }
      },
      './put.js': {
        spec: {
          method: 'PUT'
        }
      },
      './delete.js': {
        spec: {
          method: 'DELETE'
        }
      }
    };

    sut = proxyquire(SutPath, stubs)(swagger);
  });

  it('maps over files', function() {
    expect(stubs.glob.sync().map).to.have.been.called;
    stubs.glob.sync().map.getCall(0).args[0]('');
  });

  it('includes GET methods', function() {
    stubs.glob.sync().map().forEach.getCall(0).args[0]('./get.js');
    expect(swagger.addGet).to.have.been.called;
  });

  it('includes POST methods', function() {
    stubs.glob.sync().map().forEach.getCall(0).args[0]('./post.js');
    expect(swagger.addPost).to.have.been.called;
  });

  it('includes PUT methods', function() {
    stubs.glob.sync().map().forEach.getCall(0).args[0]('./put.js');
    expect(swagger.addPut).to.have.been.called;
  });

  it('includes DELETE methods', function() {
    stubs.glob.sync().map().forEach.getCall(0).args[0]('./delete.js');
    expect(swagger.addDelete).to.have.been.called;
  });
});
