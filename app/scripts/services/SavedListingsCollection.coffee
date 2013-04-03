'use strict';

angular.module('MySavedListingsCollectionService', ['MySavedListingItemService']).factory('SavedListingsCollection', [ '$http','SavedListingsItem',  ($http, SavedListingsItem) ->
  class SavedListingsCollection 
    constructor: (data) ->
      @listings = []
      @instantiate(data)

    instantiate: (data) ->
      @attributes = data
      angular.extend(@, data)

    addListings: (newListings) ->
      @listings = @listings.concat(newListings)

    populatePage: (page, scope) ->
      $http.get("api/savedresources_p#{page}.json").then( (response) =>
        for params in response.data["saved_resources"]
          listing = new SavedListingsItem(params)
          @addListings(listing)
        scope.listings = @listings
      )
      @
   
])