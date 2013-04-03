describe 'Service: SavedListingsCollection', () -> 
  beforeEach module 'MySavedListingsCollectionService'

  SavedListingsCollection = {}
  $httpBackend = {}
  listingMockData = {}
  SavedListingsItem = {}
  scope = {}
  beforeEach inject (_SavedListingsCollection_, _$httpBackend_, $rootScope, _SavedListingsItem_ ) ->
    $httpBackend = _$httpBackend_
    scope = $rootScope.$new()
    SavedListingsItem = _SavedListingsItem_ 
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


  it "should be able to create a new instance", () ->
    expect(1).toBeGreaterThan(0)
    saveListingsCol = new SavedListingsCollection(name: 'Shayne just rules')
    #expect(saveListingsCol.name).toBe('Shayne just rules')

  it "should have a listings array property", () ->
    collection = new SavedListingsCollection
    expect(collection.listings.length).toBe(0)
    collection.listings.push { "description": "4847 Slauson Ave, Los Angeles, CA"}
    expect(collection.listings.length).toBe(1)

  it "should have an add listing method", () ->
    collection = new SavedListingsCollection
    expect(collection.listings.length).toBe(0)
    collection.addListings({"description": "4847 Slauson Ave, Los Angeles, CA"})
    expect(collection.listings.length).toBe(1)
    collection.addListings([{ "description": "4847 Slauson Ave, Los Angeles"} , { "description": "4847 Slauson Ave, Los Angeles"}])
    expect(collection.listings.length).toBe(3)
 
  it "should populate a page of listings", () ->
    collection = new SavedListingsCollection
    expect(PageOneFixture.saved_resources.length).toBe(10)
    collection.populatePage(1, scope).populatePage(2, scope)
    $httpBackend.flush()
    expect(collection.listings.length).toBe(20)