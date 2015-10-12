'use strict';
/*jshint -W030 */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var SutPath = '../../../lib/routes/users/list';

describe('routes/users/list', function() {
  var sut, stubs, req, res;

  beforeEach(function() {
    stubs = {
      'swagger-node-express': {
        param: sinon.spy(),
        errors: {
          notFound: sinon.spy()
        }
      }
    };
    res = {
      status: sinon.stub().returns({
        send: sinon.spy()
      })
    };
    sut = proxyquire(SutPath, stubs);
  });

  it('exports a swagger spec', function() {
    expect(sut.spec).to.be.defined;
  });

  it('exports a route handler', function() {
    expect(sut.action).to.be.defined;
  });

  it('returns 200 okay', function() {
    sut.action(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.status().send).to.have.been.called;
  });
});
