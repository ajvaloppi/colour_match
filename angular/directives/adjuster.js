// This is the directive that implements the sliders

'use strict';

angular.module('adjuster', [])

.controller('adjusterController', ['$scope', '$rootScope', 'AdjusterService', 'MatcherService', 'ColourConversionService', function($scope, $rootScope, AdjusterService, MatcherService, ColourConversionService) {

	$scope.red_count = AdjusterService.getRedPercent();
	$scope.green_count = AdjusterService.getGreenPercent();
	$scope.blue_count = AdjusterService.getBluePercent();

	$scope.cyan_count = AdjusterService.getCyan();
	$scope.magenta_count = AdjusterService.getMagenta();
	$scope.yellow_count = AdjusterService.getYellow();
	$scope.black_count = AdjusterService.getBlack();

	// when the red slider is adjusted, we need to change red and cyan percent
	// and then tell the font/background to change
	$scope.redChange = function () {
		AdjusterService.setRed(parseInt($scope.red_count));
		$scope.red_count = AdjusterService.getRedPercent();
		$scope.cyan_count = AdjusterService.getCyan();
		$rootScope.$emit('colourChange');
	};

	// when the green slider is adjusted, we need to change green and magenta percent
	// and then tell the font/background to change
	$scope.greenChange = function () {
		AdjusterService.setGreen(parseInt($scope.green_count));
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.magenta_count = AdjusterService.getMagenta();
		$rootScope.$emit('colourChange');
	};

	// when the blue slider is adjusted, we need to change blue and yellow percent
	// and then tell the font/background to change
	$scope.blueChange = function () {
		AdjusterService.setBlue(parseInt($scope.blue_count));
		$scope.blue_count = AdjusterService.getBluePercent();
		$scope.yellow_count = AdjusterService.getYellow();
		$rootScope.$emit('colourChange');
	};

	// when the cyan slider is adjusted, we need to change cyan and red percent
	// and then tell the font/background to change
	$scope.cyanChange = function () {
		AdjusterService.setCyan(parseInt($scope.cyan_count));
		$scope.cyan_count = AdjusterService.getCyan();
		$scope.red_count = AdjusterService.getRedPercent();
		$rootScope.$emit('colourChange');
	};

	// when the red slider is adjusted, we need to change red and cyan percent
	// and then tell the font/background to change
	$scope.magentaChange = function () {
		AdjusterService.setMagenta(parseInt($scope.magenta_count));
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.magenta_count = AdjusterService.getMagenta();
		$rootScope.$emit('colourChange');
	};

	// when the yellow slider is adjusted, we need to change yellow and blue percent
	// and then tell the font/background to change
	$scope.yellowChange = function () {
		AdjusterService.setYellow(parseInt($scope.yellow_count));
		$scope.yellow_count = AdjusterService.getYellow();
		$scope.blue_count = AdjusterService.getBluePercent();
		$rootScope.$emit('colourChange');
	};

	// when the black slider is adjusted, we need to change the black, red, green and blue percents 
	// (since black is calculated with rgb)
	// and then tell the font/background to change
	$scope.blackChange = function () {
		AdjusterService.setBlack(parseInt($scope.black_count));
		$scope.black_count = AdjusterService.getBlack();
		$scope.red_count = AdjusterService.getRedPercent();
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.blue_count = AdjusterService.getBluePercent();
		$rootScope.$emit('colourChange');
	};

	// when we are done with our round we need to calculate the correct percentage 
	// and tell the end screen that we are done with our round
	$scope.check = function () {
		var newRed = AdjusterService.getRedPercent();
		var newGreen = AdjusterService.getGreenPercent();
		var newBlue = AdjusterService.getBluePercent();

		var oldRed = MatcherService.getRedPercent();
		var oldGreen = MatcherService.getGreenPercent();
		var oldBlue = MatcherService.getBluePercent();

		var newLab = ColourConversionService.rgb2lab(newRed, newGreen, newBlue);
		var oldLab = ColourConversionService.rgb2lab(oldRed, oldGreen, oldBlue);

		var difference = ColourConversionService.deltaE(newLab, oldLab);

		var length = ColourConversionService.fullLength(newLab, oldLab);

		if (length != 0){
			AdjusterService.setCorrectness(100 - (difference / length) * 100);
		}
		else {
			AdjusterService.setCorrectness(100);
		}

		$rootScope.$emit('doneRound');
	}

	// when a new round happens, we need to make sure the sliders are on the right values
	$rootScope.$on('refresh', function (event, data) {
		$scope.red_count = AdjusterService.getRedPercent();
		$scope.green_count = AdjusterService.getGreenPercent();
		$scope.blue_count = AdjusterService.getBluePercent();

		$scope.cyan_count = AdjusterService.getCyan();
		$scope.magenta_count = AdjusterService.getMagenta();
		$scope.yellow_count = AdjusterService.getYellow();
		$scope.black_count = AdjusterService.getBlack();
	})
}])

.directive('adjusterDirective', function() {
  return {
    templateUrl: 'templates/adjuster.html'
  };
});