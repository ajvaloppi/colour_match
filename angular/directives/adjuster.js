
'use strict';

angular.module('adjuster', [])

.controller('adjusterController', ['$scope', '$rootScope', 'AdjusterService', 'MatcherService', 'ColourConversionService', function($scope, $rootScope, AdjusterService, MatcherService, ColourConversionService) {
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
		AdjusterService.setRed(parseInt($scope.red_count));
		$rootScope.$emit('colourChange');
	};

	$scope.greenChange = function () {
		AdjusterService.setGreen(parseInt($scope.green_count));
		$rootScope.$emit('colourChange');
	};

	$scope.blueChange = function () {
		AdjusterService.setBlue(parseInt($scope.blue_count));
		$rootScope.$emit('colourChange');
	};

	$scope.cyanChange = function () {
		AdjusterService.setCyan(parseInt($scope.cyan_count));
		$rootScope.$emit('colourChange');
	};

	$scope.magentaChange = function () {
		AdjusterService.setMagenta(parseInt($scope.magenta_count));
		$rootScope.$emit('colourChange');
	};

	$scope.yellowChange = function () {
		AdjusterService.setYellow(parseInt($scope.yellow_count));
		$rootScope.$emit('colourChange');
	};

	$scope.blackChange = function () {
		AdjusterService.setBlack(parseInt($scope.black_count));
		$rootScope.$emit('colourChange');
	};

	$scope.check = function () {
		$scope.done = true;

		var newRed = AdjusterService.getRedPercent();
		var newGreen = AdjusterService.getGreenPercent();
		var newBlue = AdjusterService.getBluePercent();

		var oldRed = MatcherService.getRedPercent();
		var oldGreen = MatcherService.getGreenPercent();
		var oldBlue = MatcherService.getBluePercent();

		var newLab = ColourConversionService.rgb2lab(newRed, newGreen, newBlue);
		var oldLab = ColourConversionService.rgb2lab(oldRed, oldGreen, oldBlue);

		var difference = ColourConversionService.deltaE(newLab, oldLab);

		AdjusterService.setCorrectness(100 - difference);
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