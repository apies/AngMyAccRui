describe 'Service: SavedListingsItem', () ->
  beforeEach module 'MySavedListingItemService'

  SavedListingsItem = {}
  $httpBackend = {}
  listingMockData = {}
  beforeEach inject (_SavedListingsItem_, _$httpBackend_, $rootScope) ->
    $httpBackend = _$httpBackend_
    scope = $rootScope.$new() 
    SavedListingsItem = _SavedListingsItem_

    listingMockData = 
      { "description": "4847 Slauson Ave, Los Angeles, CA 92005"}

  it "should be able to create a new instance", () ->
    saveListingsItem = new SavedListingsItem(name: 'Shayne just rules')
    expect(saveListingsItem.name).toBe('Shayne just rules')

  it "should instantiate key to values", () ->
    saveListingsItem = new SavedListingsItem()
    saveListingsItem.instantiate(listingMockData)
    expect(saveListingsItem.description).toBe("4847 Slauson Ave, Los Angeles, CA 92005")
    expect(saveListingsItem.attributes.description).toBe("4847 Slauson Ave, Los Angeles, CA 92005")
