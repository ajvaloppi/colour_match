'use strict';

angular.module('matcher', [])

.controller('matcherController', ['$scope', '$rootScope', 'MatcherService', 'AdjusterService', function($scope, $rootScope, MatcherService, AdjusterService) {
		$scope.rectangle = "rectangle";
		$scope.circle = "circle";

		$scope.adjust_red = AdjusterService.getRedCSS();
		$scope.adjust_green = AdjusterService.getGreenCSS();
		$scope.adjust_blue = AdjusterService.getBlueCSS();

		$scope.match_red = MatcherService.getRedCSS();
		$scope.match_green = MatcherService.getGreenCSS();
		$scope.match_blue = MatcherService.getBlueCSS();

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
			
			$rootScope.$emit('adjustSliders');

			console.log($scope.match_red, $scope.match_green, $scope.match_blue);
			console.log($scope.adjust_red, $scope.adjust_green, $scope.adjust_blue);
		})
}])

.directive('matcherDirective', function() {
  return {
    templateUrl: 'templates/matcher.html'
  };
});