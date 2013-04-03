'use strict'

angular.module('AngMyAccUIApp', ['MySavedListingsCollectionService'])
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/saved_listings.html'
        controller: 'SavedListingsCtrl'
      .otherwise
        redirectTo: '/'
