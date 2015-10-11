'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var SutPath = '../../lib/init';

describe('init index', function() {
  var sut, stubs;

  beforeEach(function() {

    stubs = {
      http: {
        createServer: sinon.stub().returns({
          listen: sinon.spy(),
          address: sinon.stub().returns({
            port: 9999
          })
        }),
      },
      express: sinon.spy(),
      minimist: sinon.stub().returns({
        domain: undefined,
        port: undefined
      }),
      './middleware': sinon.spy(),
      '../routes': sinon.spy(),
      './swaggerize': sinon.spy()
    };

    sut = proxyquire(SutPath, stubs)();
  });

  it('uses passed port/domain', function() {
    stubs.minimist = sinon.stub().returns({
      domain: 'test.com',
      port: '9999'
    });
    sut = proxyquire(SutPath, stubs)();
    expect(stubs['./swaggerize'].getCall(1).args[3]).to.equal('http://test.com:9999');
  });

  it('runs middleware', function() {
    expect(stubs['./middleware']).to.have.been.called;
  });

  it('runs swaggerize', function() {
    expect(stubs['./swaggerize']).to.have.been.called;
  });

  it('runs routes', function() {
    expect(stubs['../routes']).to.have.been.called;
  });

  it('starts the server', function() {
    stubs.http.createServer().listen.getCall(0).args[1]();
    expect(stubs.http.createServer().address).to.have.been.called;
  });
});
