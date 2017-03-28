// This is the directive that implements colour of the font and background

'use strict';

angular.module('matcher', [])

.controller('matcherController', ['$scope', '$rootScope', 'MatcherService', 'AdjusterService', function($scope, $rootScope, MatcherService, AdjusterService) {

		// colour of font (what we are adjusting the colour of)
		$scope.adjust_red = AdjusterService.getRedCSS();
		$scope.adjust_green = AdjusterService.getGreenCSS();
		$scope.adjust_blue = AdjusterService.getBlueCSS();

		// colour of background (what we are matching to)
		$scope.match_red = MatcherService.getRedCSS();
		$scope.match_green = MatcherService.getGreenCSS();
		$scope.match_blue = MatcherService.getBlueCSS();

		// when the sliders change, we need to display the font as the proper colour
		$rootScope.$on('colourChange', function (event, data) {
			var redDiff = MatcherService.getRedPercent() - AdjusterService.getRedPercent();
			var greenDiff = MatcherService.getGreenPercent() - AdjusterService.getGreenPercent();
			var blueDiff = MatcherService.getBluePercent() - AdjusterService.getBluePercent();
			
			if (redDiff === 0 && greenDiff === 0 && blueDiff === 0){
				//if percentages match, make the rgb match perfectly. 
				// there is sometimes a slight discrepancy because of the calculation of the percentages
				$scope.adjust_red = $scope.match_red;
				$scope.adjust_green = $scope.match_green;
				$scope.adjust_blue = $scope.match_blue;
			}
			else {
				$scope.adjust_red = AdjusterService.getRedCSS();
				$scope.adjust_green = AdjusterService.getGreenCSS();
				$scope.adjust_blue = AdjusterService.getBlueCSS();
			}
		})

		// when a new round is started we need to display the font/background as the new colours
		$rootScope.$on('refresh', function (event, data) {
			$scope.adjust_red = AdjusterService.getRedCSS();
			$scope.adjust_green = AdjusterService.getGreenCSS();
			$scope.adjust_blue = AdjusterService.getBlueCSS();

			$scope.match_red = MatcherService.getRedCSS();
			$scope.match_green = MatcherService.getGreenCSS();
			$scope.match_blue = MatcherService.getBlueCSS();
		})
}])

.directive('matcherDirective', function() {
  return {
    templateUrl: 'templates/matcher.html'
  };
});