'use strict';

angular.module('matcher', [])

.controller('matcherController', ['$scope', '$rootScope', 'MatcherService', 'AdjusterService', function($scope, $rootScope, MatcherService, AdjusterService) {
		$scope.rectangle = "rectangle";
		$scope.circle = "circle";

		$scope.adjust_red = AdjusterService.getRed();
		$scope.adjust_green = AdjusterService.getGreen();
		$scope.adjust_blue = AdjusterService.getBlue();

		$scope.match_red = MatcherService.getRed();
		$scope.match_green = MatcherService.getGreen();
		$scope.match_blue = MatcherService.getBlue();

		$rootScope.$on('colourChange', function (event, data) {
			$scope.adjust_red = AdjusterService.getRed();
			$scope.adjust_green = AdjusterService.getGreen();
			$scope.adjust_blue = AdjusterService.getBlue();
		})
}])

.directive('matcherDirective', function() {
  return {
    templateUrl: 'templates/matcher.html'
  };
});