describe 'Service: SavedResource', () ->

  #Mocha specific config
  $injector = angular.injector([])

# load the service's module
  beforeEach module 'MySavedResourcesService'


# instantiate service
  SavedResource = {}
  $httpBackend = {}
  beforeEach inject (_SavedResource_, _$httpBackend_, $rootScope) ->
    $httpBackend = _$httpBackend_
    scope = $rootScope.$new() 
    SavedResource = _SavedResource_
    listingMockData = 
      "saved_resources": [
       { "description": "4847 Slauson Ave, Los Angeles, CA 92005"},
       { "description": "1234 HillBilly Ave, Los Banos, CA 90125"},
       { "description": "7417 RichGuy Ave, Los Altos, CA 91005"}
      ]

    $httpBackend.whenGET('api/savedresources.json').respond(listingMockData)
    $httpBackend.whenGET("api/savedresources_p1.json").respond(PageOneFixture)
    $httpBackend.whenGET("api/savedresources_p2.json").respond(PageTwoFixture)
    $httpBackend.whenGET("api/savedresources_p3.json").respond(PageThreeFixture)

  it 'should be able to make a new instance of itself when it already has data', () ->
    resource = new SavedResource(name: 'Alan is cooler than Shayne')
    expect(resource.name).toBe('Alan is cooler than Shayne')
  it 'should be able to give itself model attributes with instantiate for use with promises', () ->
    resource  = new SavedResource
    resource.instantiate(name:  'Alan is cooler than Shayne')
    expect(resource.name).toBe('Alan is cooler than Shayne')
  it 'should fetch listings from the server', () ->
    listings = SavedResource.all()
    $httpBackend.flush()
    expect(listings.length).toBe(3)
    expect(listings[0].description).toBe("4847 Slauson Ave, Los Angeles, CA 92005")
  it "should have 10 listings", () ->
    page = PageOneFixture.saved_resources.length
    expect(page).toBe(10)
    expect(PageTwoFixture.saved_resources.length).toBe(10)
    expect(PageThreeFixture.saved_resources.length).toBe(10)
  it "should be able to get a specific page of listings", () ->
    listings = SavedResource.byPage(2)
    $httpBackend.flush()
    expect(listings.length).toBe(10)


