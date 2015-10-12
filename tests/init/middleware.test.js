'use strict';
/*jshint -W030 */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire');
var SutPath = '../../lib/init/middleware';

describe('init middleware', function() {
  var sut, stubs, subpath;
  var app = {};

  beforeEach(function() {
    stubs = {
      bodyParser: {
        urlencoded: sinon.spy(),
        json: sinon.spy()
      },
      'cookie-parser': sinon.spy()
    };
    subpath = sinon.spy();
    app.use = sinon.spy();
    sut = proxyquire(SutPath, stubs)(app,subpath);
  });

  it('supports cookies', function() {
    expect(stubs['cookie-parser']).to.have.been.called;
  });
});
