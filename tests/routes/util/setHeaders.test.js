'use strict';
/*jshint -W030 */
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var SutPath = '../../../lib/routes/util/setHeaders';

describe('routes/util/setHeaders', function() {
  var sut, res;
  beforeEach(function() {
    res = {
      header: sinon.spy()
    };
    sut = new require(SutPath);
  });

  it('sets headers', function() {
    sut(res, null, 0);
    expect(res.header).to.have.been.called;
  });

  it('sets query headers if queries passed', function() {
    sut(res, {some:'query'}, 0);
    expect(res.header).to.have.been.calledTwice;
  });
});
