
'use strict';

angular.module('adjuster', [])

.controller('adjusterController', ['$scope', 'AdjusterService', function($scope, AdjusterService) {
	$scope.red_count = AdjusterService.getRed();
	$scope.green_count = AdjusterService.getGreen();
	$scope.blue_count = AdjusterService.getBlue();
}])

.directive('adjusterDirective', function() {
  return {
    templateUrl: 'templates/adjuster.html'
  };
});