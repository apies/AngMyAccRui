(function() {
  'use strict';

  angular.module('AngMyAccUIApp', ['MySavedListingsCollectionService']).config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/saved_listings.html',
      controller: 'SavedListingsCtrl'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);

(function() {
  var SavedListingsControl;

  SavedListingsControl = function($scope, SavedListingsCollection, $http) {
    var slCollection;
    $scope.currentPage = 1;
    slCollection = new SavedListingsCollection();
    slCollection.populatePage($scope.currentPage, $scope);
    $scope.getNextPage = function() {
      $scope.currentPage += 1;
      return slCollection.populatePage($scope.currentPage, $scope);
    };
    return $scope.setOrderProp = function(order) {
      return $scope.orderProp = order;
    };
  };

  angular.module('AngMyAccUIApp').controller('SavedListingsCtrl', ['$scope', 'SavedListingsCollection', '$http', SavedListingsControl]);

}).call(this);

(function() {
  'use strict';

  var MainControl;

  MainControl = function($scope) {
    return $scope.awesomeThings = ['a', 'b', 'c'];
  };

  angular.module('AngMyAccUIApp').controller('MainCtrl', ['$scope', MainControl]);

}).call(this);

(function() {
  'use strict';

  angular.module('MySavedListingsCollectionService', ['MySavedListingItemService']).factory('SavedListingsCollection', [
    '$http', 'SavedListingsItem', function($http, SavedListingsItem) {
      var SavedListingsCollection;
      return SavedListingsCollection = (function() {

        function SavedListingsCollection(data) {
          this.listings = [];
          this.instantiate(data);
        }

        SavedListingsCollection.prototype.instantiate = function(data) {
          this.attributes = data;
          return angular.extend(this, data);
        };

        SavedListingsCollection.prototype.addListings = function(newListings) {
          return this.listings = this.listings.concat(newListings);
        };

        SavedListingsCollection.prototype.populatePage = function(page, scope) {
          var _this = this;
          $http.get("api/savedresources_p" + page + ".json").then(function(response) {
            var listing, params, _i, _len, _ref;
            _ref = response.data["saved_resources"];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              params = _ref[_i];
              listing = new SavedListingsItem(params);
              _this.addListings(listing);
            }
            return scope.listings = _this.listings;
          });
          return this;
        };

        return SavedListingsCollection;

      })();
    }
  ]);

}).call(this);

(function() {
  'use strict';

  angular.module('MySavedListingItemService', []).factory('SavedListingsItem', [
    '$http', function($http) {
      var SavedListingsItem;
      return SavedListingsItem = (function() {

        function SavedListingsItem(data) {
          this.instantiate(data);
        }

        SavedListingsItem.prototype.instantiate = function(data) {
          this.attributes = data;
          return angular.extend(this, data);
        };

        return SavedListingsItem;

      })();
    }
  ]);

}).call(this);

(function() {
  'use strict';

  angular.module('MySavedResourcesService', []).factory('SavedResource', [
    '$http', function($http) {
      var SavedResource;
      return SavedResource = (function() {

        function SavedResource(data) {
          this.instantiate(data);
        }

        SavedResource.prototype.instantiate = function(data) {
          this.attributes = data;
          return angular.extend(this, data);
        };

        SavedResource.all = function() {
          var listings;
          listings = [];
          $http.get("api/savedresources.json").then(function(response) {
            var params, _i, _len, _ref, _results;
            _ref = response.data["saved_resources"];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              params = _ref[_i];
              _results.push(listings.push(new SavedResource(params)));
            }
            return _results;
          });
          return listings;
        };

        SavedResource.byPage = function(page) {
          var listings;
          listings = [];
          $http.get("api/savedresources_p" + page + ".json").then(function(response) {
            var params, _i, _len, _ref, _results;
            _ref = response.data["saved_resources"];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              params = _ref[_i];
              _results.push(listings.push(new SavedResource(params)));
            }
            return _results;
          });
          return listings;
        };

        SavedResource.prototype.sayHello = function() {
          return "hello!";
        };

        return SavedResource;

      })();
    }
  ]);

}).call(this);
