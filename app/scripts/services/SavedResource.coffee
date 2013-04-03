'use strict';

# angular.module('AngMyAccUIApp')
#   .factory 'SavedResource', () ->
#     # Service logic
#     # ...

#     meaningOfLife = 42

#     # Public API here
#     {
#       someMethod: () ->
#         return meaningOfLife;
#     }


angular.module('MySavedResourcesService', []).factory('SavedResource', ['$http', ($http) ->
  class SavedResource
    constructor: (data) ->
      @instantiate(data)
    instantiate: (data) ->
      @attributes = data
      angular.extend(@, data)
    @all: () ->
      listings = []
      $http.get("api/savedresources.json").then( (response) ->
        listings.push new SavedResource(params) for params in response.data["saved_resources"]
      )
      listings
    @byPage: (page) ->
      listings = []
      $http.get("api/savedresources_p#{page}.json").then( (response) ->
        listings.push new SavedResource(params) for params in response.data["saved_resources"]
      )
      listings
    sayHello: () ->
      "hello!"


])