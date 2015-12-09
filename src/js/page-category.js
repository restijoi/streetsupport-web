/* global location */

// Page modules
var FastClick = require('fastclick')
var nav = require('./nav.js') // eslint-disable-line

// FastClick
FastClick.attach(document.body)

// TO DO: Make this a module
function getUrlParameter (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

// Load and process data
require.ensure(['./api', './get-api-data', 'hogan.js', 'lodash/collection/forEach', 'lodash/collection/find'], function (require) {
  var apiRoutes = require('./api')
  var getApiData = require('./get-api-data')
  var Hogan = require('hogan.js')
  /*
  var forEach = require('lodash/collection/forEach')
  var find = require('lodash/collection/find')
  */

  var theCategory = getUrlParameter('category')
  var categoryUrl = apiRoutes.categoryServiceProviders += theCategory

  // Get API data using promise
  getApiData.data(categoryUrl).then(function (result) {
/*
    // Get services provided
    forEach.forEach(result.serviceProviders, function (org) {
      org.requestedService = find.find(org.servicesProvided, function (service) {
        return service.name === category
      })
    })
*/

    // Append object name for Hogan
    var theData = { organisations: result }

    // Compile and render template
    var theTemplate = document.getElementById('js-category-result-tpl').innerHTML
    var compileTemplate = Hogan.compile(theTemplate)
    var theOutput = compileTemplate.render(theData)

    document.getElementById('js-category-result-output').innerHTML = theOutput
  })
})
