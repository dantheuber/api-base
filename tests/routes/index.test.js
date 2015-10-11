'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var proxyquire = require('proxyquire');
var SutPath = '../../lib/routes/';

describe('routes', function() {
  var sut, stubs, app, swagger;

  beforeEach(function() {
    stubs = {
      path: {
        resolve: sinon.spy()
      },
      glob: {
        sync: sinon.stub().returns([])
      },
      './index': sinon.spy()
    };

    sut = proxyquire(SutPath, stubs)(app, swagger);
  });

  describe('maps', function() {
    beforeEach(function() {
      stubs.glob.sync = sinon.stub().returns({
        map: sinon.stub().returns({
          forEach: sinon.spy()
        })
      });

      sut = proxyquire(SutPath, stubs)(app, swagger);
    });

    it('over files', function() {
      expect(stubs.glob.sync().map).to.have.been.called;
    });

    it('loops over all files and requires them', function() {
      stubs.glob.sync().map.getCall(0).args[0]('./index');
      expect(stubs.glob.sync().map().forEach).to.have.been.called;
      stubs.glob.sync().map().forEach.getCall(0).args[0]('./index');
      expect(stubs['./index']).to.have.been.called;
    });
  });

});
