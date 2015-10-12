'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire').noCallThru();
var SutPath = '../../../lib/routes/util/writeResponse';


describe('routes/util/writeResponse', function() {
  var sut, stubs, res;

  beforeEach(function() {
    stubs = {
      './setHeaders': sinon.spy()
    };
    res = {
      send: sinon.spy()
    };

    sut = proxyquire(SutPath, stubs);
  });

  it('sets headers', function() {
    sut(res,{},{},0);
    expect(stubs['./setHeaders']).to.have.been.called;
  });

  it('sends results', function() {
    var results = { some: 'results' };
    sut(res, results, {}, 0);
    expect(res.send).to.have.been.calledWith(results);
  });
});
