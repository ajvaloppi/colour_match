
'use strict';

angular.module('adjuster', [])

.controller('adjusterController', ['$scope', '$rootScope', 'AdjusterService', 'MatcherService', function($scope, $rootScope, AdjusterService, MatcherService) {
	$scope.done = false;

	$scope.red_count = AdjusterService.getRed();
	$scope.green_count = AdjusterService.getGreen();
	$scope.blue_count = AdjusterService.getBlue();

	$scope.match_red = MatcherService.getRed();
	$scope.match_green = MatcherService.getGreen();
	$scope.match_blue = MatcherService.getBlue();

	$scope.redUp = function () {
		$scope.red_count += 5;
		AdjusterService.setRed($scope.red_count);

		$rootScope.$emit('colourChange');
	};

	$scope.redDown = function () {
		$scope.red_count -= 5;
		AdjusterService.setRed($scope.red_count);

		$rootScope.$emit('colourChange');
	};

	$scope.greenUp = function () {
		$scope.green_count += 5;
		AdjusterService.setGreen($scope.green_count);

		$rootScope.$emit('colourChange');
	};

	$scope.greenDown = function () {
		$scope.green_count -= 5;
		AdjusterService.setGreen($scope.green_count);

		$rootScope.$emit('colourChange');
	};

	$scope.blueUp = function () {
		$scope.blue_count += 5;
		AdjusterService.setBlue($scope.blue_count);

		$rootScope.$emit('colourChange');
	};

	$scope.blueDown = function () {
		$scope.blue_count -= 5;
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