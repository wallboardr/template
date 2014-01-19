// This file controls the display of the screen when it is being viewed on a wallboard.
// It is a normal Require.js (AMD) module and can take dependencies as outlined in the README
define(['jquery', 'boards/data-loader', 'require', './admin'], function ($, dataLoader, require) {
  'use strict';

  // Load in the admin.js file in this folder which should contain the meta information on this screen.
  var plugin = require('./admin'),
      // This function is a wrapper around the dataLoader. Just a helper to get the data needed.
      // The dataLoader function returns a promise of data.
      makeRequest = function (url, data) {
        url = data.url + '/api' + url + '?apikey=' + data.apiKey;
        return dataLoader({
          url: url,
          proxy: true
        });
      },
      // Another helper function, deals with handling the remote data results
      getRemoteData = function (data) {
        var partial = '/' + data.entityId + '/recent';
        return makeRequest(partial, data).then(function (results) {
          var normalized = $.map(results, function (result) {
            return {
              name: result.Name.toUpperCase(),
              combined: result.Value * result.AnotherValue
            };
          });

          return {results: normalized, data: data.raw};
        });
      },
      // This is the screen function that is returned from this module.
      // It should return an object which contains event hooks into the screen
      // display lifecycle.
      myScreen = function () {
        // 'this' will be the screen object as described in the README.
        // Notably however, is the 'props' property which contains all of the
        // data saved on this screen in the database.
        var self = this;
        return {
          // Probably the most important of the events to implement, this provides your
          // screen with data to display. Can return either an object or a promise of an object
          // which will then be passed to the template in `screen.mustache`.
          getViewData: function () {
            return getRemoteData(self.props.data);
            // Whether a specific promise or an object is returned, it works the same.
            // return { name: self.props.data.name };
          },
          // Run after the screen has been added to the DOM, but before it is visible.
          // Useful to run any visual optimizations.
          preShow: function () {
            self.maximizeTextSize();
          }
        };
      };

  // Attach the screen config information to this module as well.
  myScreen.config = plugin.config;
  return myScreen;
});