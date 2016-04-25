/* global describe, beforeEach, afterEach, it, expect */

var getFromApi = require('../../src/js/get-api-data')
var sinon = require('sinon')
var Model = require('../../src/js/models/GiveItemModel')
var endpoints = require('../../src/js/api')
var getUrlParams = require('../../src/js/get-url-parameter')
var browser = require('../../src/js/browser')

describe('Give Item Model', function () {
  var needId = '56d81bad92855625087e9a93'

  describe('Need not found', function () {
    var browserStub
    var urlParamStub

    beforeEach(function () {
      urlParamStub = sinon.stub(getUrlParams, 'parameter')
      urlParamStub.withArgs('id')
        .returns(needId)

      sinon.stub(getFromApi, 'data')
        .withArgs(endpoints.needs + needId)
        .returns({
          then: function (success, error) {
            error({
              'status': 'error',
              'statusCode': 404,
              'message': ''
            })
          }
        })

      browserStub = sinon.stub(browser, 'redirect')
      sinon.stub(browser, 'loading')

      var model = new Model() // eslint-disable-line
    })

    afterEach(function () {
      getFromApi.data.restore()
      getUrlParams.parameter.restore()
      browser.redirect.restore()
      browser.loading.restore()
    })

    it('should redirect to 404', function () {
      expect(browserStub.withArgs('/404/').calledOnce).toBeTruthy()
    })
  })
})
