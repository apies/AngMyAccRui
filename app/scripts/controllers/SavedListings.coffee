
SavedListingsControl = ($scope, SavedListingsCollection, $http) ->
  $scope.currentPage = 1
  slCollection = new SavedListingsCollection()
  slCollection.populatePage($scope.currentPage, $scope)
  #console.log thing
  #console.log slCollection
  #$scope.listings = slCollection.listings

  $scope.getNextPage = () ->
    $scope.currentPage += 1
    slCollection.populatePage($scope.currentPage, $scope)

  $scope.setOrderProp = (order) ->
    $scope.orderProp = order
 

angular.module('AngMyAccUIApp').controller('SavedListingsCtrl', ['$scope', 'SavedListingsCollection', '$http', SavedListingsControl ])
  