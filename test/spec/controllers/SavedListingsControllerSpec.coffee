'use strict'

describe 'Controller: SavedListingsCtrl', () ->

  # load the controller's module
  beforeEach module 'AngMyAccUIApp'

  SavedListingsCtrl = {}
  scope = {}
  $httpBackend = {}
  SavedListingsCollection = {}

  # Initialize the controller and a mock scope
  beforeEach inject ( $rootScope,  _SavedListingsCollection_, _$httpBackend_, $controller) ->
    SavedListingsCollection = _SavedListingsCollection_
    $httpBackend = _$httpBackend_

    listingMockData = [
      { "description": "4847 Slauson Ave, Los Angeles, CA 92005"},
      { "description": "4847 Slauson Ave, Los Angeles"}
    ]
    
    $httpBackend.whenGET('api/savedresources.json').respond(listingMockData)
    $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture)
    $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture)
    $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture)
    

    scope = $rootScope.$new()
    SavedListingsCtrl = $controller 'SavedListingsCtrl', {
      $scope: scope
    }
    $httpBackend.flush()

  it "should default current_page to 1", () ->
    expect(scope.currentPage).toBe(1)

  it "should have a listings $scope attribute", () ->
    expect(scope.listings.length).toBe(10)

  it "should have a fetch next page method", () ->
    scope.getNextPage()
    expect(scope.currentPage).toBe(2)
    $httpBackend.flush()
    expect(scope.listings.length).toBe(20)

  it "should set the order to description", () -> 
    scope.setOrderProp("description")
    expect(scope.orderProp).toBe("description")
    

    