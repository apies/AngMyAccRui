# 'use strict'

# describe 'Controller: SavedListingsCtrl', () ->

#   # load the controller's module
#   beforeEach module 'AngMyAccUIApp'

#   SavedListingsCtrl = {}
#   scope = {}
#   $httpBackend = {}

#   # Initialize the controller and a mock scope
#   beforeEach inject (_$httpBackend_, $rootScope,  $controller) ->
#     $httpBackend = _$httpBackend_
#     listingMockData = 
#       "saved_resources": [
#        { "description": "4847 Slauson Ave, Los Angeles, CA 92005"},
#        { "description": "1234 HillBilly Ave, Los Banos, CA 90125"},
#        { "description": "7417 RichGuy Ave, Los Altos, CA 91005"}
#       ]
#     $httpBackend.whenGET('api/savedresources.json').respond(listingMockData)
#     $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture)
#     $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture)
#     $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture)
    

#     scope = $rootScope.$new()
#     SavedListingsCtrl = $controller 'SavedListingsCtrl', {
#       $scope: scope
#     }
#     $httpBackend.flush()

    
#   it 'should attach a list of listings to the scope', () ->
#     expect(scope.listings.length).toBe 10
#   it 'should be able to get the next page of listings', () ->
#     expect(scope.listings.length).toBe 10
#     #$httpBackend.expectGET("api/savedresources_p2.json").respond(PageTwoFixture)
#     scope.getNextPage()
#     $httpBackend.flush()
#     expect(scope.listings.length).toBe 20

