'use strict'

MainControl = ($scope) ->
	$scope.awesomeThings = ['a', 'b', 'c']

angular.module('AngMyAccUIApp').controller('MainCtrl', ['$scope', MainControl] )
  