'use strict';

angular.module('MySavedListingItemService', []).factory('SavedListingsItem', ['$http', ($http) ->
  class SavedListingsItem
    constructor: (data) ->
      @instantiate(data)
    instantiate: (data) ->
      @attributes = data
      angular.extend(@, data)
])