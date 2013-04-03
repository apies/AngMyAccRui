(function() {



}).call(this);

(function() {
  'use strict';

  describe('Controller: SavedListingsCtrl', function() {
    var $httpBackend, SavedListingsCollection, SavedListingsCtrl, scope;
    beforeEach(module('AngMyAccUIApp'));
    SavedListingsCtrl = {};
    scope = {};
    $httpBackend = {};
    SavedListingsCollection = {};
    beforeEach(inject(function($rootScope, _SavedListingsCollection_, _$httpBackend_, $controller) {
      var listingMockData;
      SavedListingsCollection = _SavedListingsCollection_;
      $httpBackend = _$httpBackend_;
      listingMockData = [
        {
          "description": "4847 Slauson Ave, Los Angeles, CA 92005"
        }, {
          "description": "4847 Slauson Ave, Los Angeles"
        }
      ];
      $httpBackend.whenGET('api/savedresources.json').respond(listingMockData);
      $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture);
      $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture);
      $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture);
      scope = $rootScope.$new();
      SavedListingsCtrl = $controller('SavedListingsCtrl', {
        $scope: scope
      });
      return $httpBackend.flush();
    }));
    it("should default current_page to 1", function() {
      return expect(scope.currentPage).toBe(1);
    });
    it("should have a listings $scope attribute", function() {
      return expect(scope.listings.length).toBe(10);
    });
    it("should have a fetch next page method", function() {
      scope.getNextPage();
      expect(scope.currentPage).toBe(2);
      $httpBackend.flush();
      return expect(scope.listings.length).toBe(20);
    });
    return it("should set the order to description", function() {
      scope.setOrderProp("description");
      return expect(scope.orderProp).toBe("description");
    });
  });

}).call(this);

(function() {

  describe('Service: SavedListingsCollection', function() {
    var $httpBackend, SavedListingsCollection, SavedListingsItem, listingMockData, scope;
    beforeEach(module('MySavedListingsCollectionService'));
    SavedListingsCollection = {};
    $httpBackend = {};
    listingMockData = {};
    SavedListingsItem = {};
    scope = {};
    beforeEach(inject(function(_SavedListingsCollection_, _$httpBackend_, $rootScope, _SavedListingsItem_) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      SavedListingsItem = _SavedListingsItem_;
      SavedListingsCollection = _SavedListingsCollection_;
      $httpBackend = _$httpBackend_;
      listingMockData = [
        {
          "description": "4847 Slauson Ave, Los Angeles, CA 92005"
        }, {
          "description": "4847 Slauson Ave, Los Angeles"
        }
      ];
      $httpBackend.whenGET('api/savedresources.json').respond(listingMockData);
      $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture);
      $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture);
      return $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture);
    }));
    it("should be able to create a new instance", function() {
      var saveListingsCol;
      expect(1).toBeGreaterThan(0);
      return saveListingsCol = new SavedListingsCollection({
        name: 'Shayne just rules'
      });
    });
    it("should have a listings array property", function() {
      var collection;
      collection = new SavedListingsCollection;
      expect(collection.listings.length).toBe(0);
      collection.listings.push({
        "description": "4847 Slauson Ave, Los Angeles, CA"
      });
      return expect(collection.listings.length).toBe(1);
    });
    it("should have an add listing method", function() {
      var collection;
      collection = new SavedListingsCollection;
      expect(collection.listings.length).toBe(0);
      collection.addListings({
        "description": "4847 Slauson Ave, Los Angeles, CA"
      });
      expect(collection.listings.length).toBe(1);
      collection.addListings([
        {
          "description": "4847 Slauson Ave, Los Angeles"
        }, {
          "description": "4847 Slauson Ave, Los Angeles"
        }
      ]);
      return expect(collection.listings.length).toBe(3);
    });
    return it("should populate a page of listings", function() {
      var collection;
      collection = new SavedListingsCollection;
      expect(PageOneFixture.saved_resources.length).toBe(10);
      collection.populatePage(1, scope).populatePage(2, scope);
      $httpBackend.flush();
      return expect(collection.listings.length).toBe(20);
    });
  });

}).call(this);

(function() {

  describe('Service: SavedListingsItem', function() {
    var $httpBackend, SavedListingsItem, listingMockData;
    beforeEach(module('MySavedListingItemService'));
    SavedListingsItem = {};
    $httpBackend = {};
    listingMockData = {};
    beforeEach(inject(function(_SavedListingsItem_, _$httpBackend_, $rootScope) {
      var scope;
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      SavedListingsItem = _SavedListingsItem_;
      return listingMockData = {
        "description": "4847 Slauson Ave, Los Angeles, CA 92005"
      };
    }));
    it("should be able to create a new instance", function() {
      var saveListingsItem;
      saveListingsItem = new SavedListingsItem({
        name: 'Shayne just rules'
      });
      return expect(saveListingsItem.name).toBe('Shayne just rules');
    });
    return it("should instantiate key to values", function() {
      var saveListingsItem;
      saveListingsItem = new SavedListingsItem();
      saveListingsItem.instantiate(listingMockData);
      expect(saveListingsItem.description).toBe("4847 Slauson Ave, Los Angeles, CA 92005");
      return expect(saveListingsItem.attributes.description).toBe("4847 Slauson Ave, Los Angeles, CA 92005");
    });
  });

}).call(this);

(function() {

  describe('Service: SavedResource', function() {
    var $httpBackend, $injector, SavedResource;
    $injector = angular.injector([]);
    beforeEach(module('MySavedResourcesService'));
    SavedResource = {};
    $httpBackend = {};
    beforeEach(inject(function(_SavedResource_, _$httpBackend_, $rootScope) {
      var listingMockData, scope;
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();
      SavedResource = _SavedResource_;
      listingMockData = {
        "saved_resources": [
          {
            "description": "4847 Slauson Ave, Los Angeles, CA 92005"
          }, {
            "description": "1234 HillBilly Ave, Los Banos, CA 90125"
          }, {
            "description": "7417 RichGuy Ave, Los Altos, CA 91005"
          }
        ]
      };
      $httpBackend.whenGET('api/savedresources.json').respond(listingMockData);
      $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture);
      $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture);
      return $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture);
    }));
    it('should be able to make a new instance of itself when it already has data', function() {
      var resource;
      resource = new SavedResource({
        name: 'Alan is cooler than Shayne'
      });
      return expect(resource.name).toBe('Alan is cooler than Shayne');
    });
    it('should be able to give itself model attributes with instantiate for use with promises', function() {
      var resource;
      resource = new SavedResource;
      resource.instantiate({
        name: 'Alan is cooler than Shayne'
      });
      return expect(resource.name).toBe('Alan is cooler than Shayne');
    });
    it('should fetch listings from the server', function() {
      var listings;
      listings = SavedResource.all();
      $httpBackend.flush();
      expect(listings.length).toBe(3);
      return expect(listings[0].description).toBe("4847 Slauson Ave, Los Angeles, CA 92005");
    });
    it("should have 10 listings", function() {
      var page;
      page = PageOneFixture.saved_resources.length;
      expect(page).toBe(10);
      expect(PageTwoFixture.saved_resources.length).toBe(10);
      return expect(PageThreeFixture.saved_resources.length).toBe(10);
    });
    return it("should be able to get a specific page of listings", function() {
      var listings;
      listings = SavedResource.byPage(2);
      $httpBackend.flush();
      return expect(listings.length).toBe(10);
    });
  });

}).call(this);
