'use strict';

angular.module('matcher', [])

.controller('matcherController', ['$scope', 'MatcherService', 'AdjusterService', function($scope, MatcherService, AdjusterService) {
		$scope.rectangle = "rectangle";
		$scope.circle = "circle";

		$scope.adjust_red = AdjusterService.getRed();
		$scope.adjust_green = AdjusterService.getGreen();
		$scope.adjust_blue = AdjusterService.getBlue();

		$scope.match_red = MatcherService.getRed();
		$scope.match_green = MatcherService.getGreen();
		$scope.match_blue = MatcherService.getBlue();
}])

.directive('matcherDirective', function() {
  return {
    templateUrl: 'templates/matcher.html'
  };
});