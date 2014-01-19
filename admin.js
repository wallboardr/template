define([], function () {
  'use strict';
  var myScreenController = function ($scope, dataLoader) {
    // Helper function to return promise from dataLoader.
    var makeRequest = function (url, form) {
      url = form.data.url + '/api' + url + '?apikey=' + form.data.apiKey;
      return dataLoader({
        url: url,
        proxy: true
      });
    };

    // Resets the scope to a knowning beginning state.
    $scope.reset = function () {
      $scope.allthings = [];
      $scope.step = 0;
    };

    // Fetch something remotely
    $scope.getSomethingFromService = function (form, active) {
      if (form.$valid) {
        makeRequest('/entities', active || form).then(function (res) {
          $scope.allthings = res;
          $scope.step = 1;
        });
      }
    };

    // Control where we are in this wizard.
    $scope.showStep = function (step) {
      return $scope.step === step;
    };

    // Return a potential list of classes for each of the entities.
    $scope.entityStatus = function (entity) {
      var classes = [];
      if ($scope.activeScreenEdit && $scope.activeScreenEdit.data && entity.Id === $scope.activeScreenEdit.data.entityId) {
        classes.push('is-active');
      }
      return classes;
    };

    // Choose something from the list with a particular ID.
    $scope.chooseSomething = function (form, id, active) {
      var dataLocation = active || form;
      if (form.$valid) {
        dataLocation.data.entityId = id;
        if (active) {
          $scope.updateActiveScreen(form);
        } else {
          $scope.addScreen(form);
        }
      }
    };

    // Initialize scope.
    $scope.reset();
  };
  // Angular wiring to tell controller what to inject.
  myScreenController.$inject = ['$scope', 'dataLoader'];

  // Add metadata about this screen type to the function.
  myScreenController.config = {
    name: 'myscreen',
    controller: 'MyScreenController',
    humanName: 'My Remote Data',
    centered: true,
    pollInterval: 120
  };

  return myScreenController;
});