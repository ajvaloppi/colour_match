
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

	$scope.match_black = 100 - (Math.max(Math.max($scope.match_red, $scope.match_green), $scope.match_blue));

    $scope.match_cyan = Math.round(((100 - $scope.match_red - $scope.match_black)/(100 - $scope.match_black))*100);
    $scope.match_magenta = Math.round(((100 - $scope.match_green - $scope.match_black)/(100 - $scope.match_black))*100);
    $scope.match_yellow = Math.round(((100 - $scope.match_blue - $scope.match_black)/(100 - $scope.match_black))*100);

	$scope.cyan_count = AdjusterService.getCyan();
	$scope.magenta_count = AdjusterService.getMagenta();
	$scope.yellow_count = AdjusterService.getYellow();
	$scope.black_count = AdjusterService.getBlack();

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

	$scope.cyanChange = function () {
		AdjusterService.setCyan($scope.cyan_count);
		$rootScope.$emit('colourChange');
	};

	$scope.magentaChange = function () {
		AdjusterService.setMagenta($scope.magenta_count);
		$rootScope.$emit('colourChange');
	};

	$scope.yellowChange = function () {
		AdjusterService.setYellow($scope.yellow_count);
		$rootScope.$emit('colourChange');
	};

	$scope.blackChange = function () {
		AdjusterService.setBlack($scope.black_count);
		$rootScope.$emit('colourChange');
	};

	$scope.check = function () {
		$scope.done = true;

		var newRed = AdjusterService.getRedCSS();
		var newGreen = AdjusterService.getGreenCSS();
		var newBlue = AdjusterService.getBlueCSS();

		var oldRed = MatcherService.getRedCSS();
		var oldGreen = MatcherService.getGreenCSS();
		var oldBlue = MatcherService.getBlueCSS();

		var changeRed = Math.pow(newRed - oldRed, 2);
		var changeGreen = Math.pow(newGreen - oldGreen, 2);
		var changeBlue = Math.pow(newBlue - oldBlue, 2);

		// Source: https://en.wikipedia.org/wiki/Color_difference#Euclidean
		var colourDistance = Math.sqrt(2*changeRed + 4*changeGreen + 3*changeBlue);
		AdjusterService.setCorrectness((1 - colourDistance/765)* 100);

		$rootScope.$emit('doneRound');
	}

	$rootScope.$on('adjustSliders', function (event, data) {
		$scope.red_count = AdjusterService.getRedPercent();
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.blue_count = AdjusterService.getBluePercent();

		$scope.cyan_count = AdjusterService.getCyan();
		$scope.magenta_count = AdjusterService.getMagenta();
		$scope.yellow_count = AdjusterService.getYellow();
		$scope.black_count = AdjusterService.getBlack();
	})

	$rootScope.$on('refresh', function (event, data) {
		$scope.red_count = AdjusterService.getRedPercent();
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.blue_count = AdjusterService.getBluePercent();

		$scope.match_red = MatcherService.getRedPercent();
		$scope.match_green = MatcherService.getGreenPercent();
		$scope.match_blue = MatcherService.getBluePercent();

		$scope.cyan_count = AdjusterService.getCyan();
		$scope.magenta_count = AdjusterService.getMagenta();
		$scope.yellow_count = AdjusterService.getYellow();
		$scope.black_count = AdjusterService.getBlack();

		$scope.match_black = 100 - (Math.max(Math.max($scope.match_red, $scope.match_green), $scope.match_blue));

    	$scope.match_cyan = Math.round(((100 - $scope.match_red - $scope.match_black)/(100 - $scope.match_black))*100);
		$scope.match_magenta = Math.round(((100 - $scope.match_green - $scope.match_black)/(100 - $scope.match_black))*100);
    	$scope.match_yellow = Math.round(((100 - $scope.match_blue - $scope.match_black)/(100 - $scope.match_black))*100);
		$scope.done = false;
	})
}])

.directive('adjusterDirective', function() {
  return {
    templateUrl: 'templates/adjuster.html'
  };
});