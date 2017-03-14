
'use strict';

angular.module('adjuster', [])

.controller('adjusterController', ['$scope', '$rootScope', 'AdjusterService', 'MatcherService', function($scope, $rootScope, AdjusterService, MatcherService) {
	$scope.done = false;

	$scope.red_count = AdjusterService.getRedPercent();
	$scope.green_count = AdjusterService.getGreenPercent();
	$scope.blue_count = AdjusterService.getBluePercent();

	$scope.match_red = MatcherService.getRedPercent();
	$scope.match_green = MatcherService.getGreenPercent();
	$scope.match_blue = MatcherService.getBluePercent();

	$scope.redChange = function () {
		AdjusterService.setRed($scope.red_count);
		$rootScope.$emit('colourChange');
	};

	$scope.greenChange = function () {
		AdjusterService.setGreen($scope.green_count);
		$rootScope.$emit('colourChange');
	};


	$scope.blueChange = function () {
		AdjusterService.setBlue($scope.blue_count);
		$rootScope.$emit('colourChange');
	};

	$scope.check = function () {
		$scope.done = true;
	}
}])

.directive('adjusterDirective', function() {
  return {
    templateUrl: 'templates/adjuster.html'
  };
});