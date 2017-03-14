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
			$scope.adjust_red = AdjusterService.getRedCSS();
			$scope.adjust_green = AdjusterService.getGreenCSS();
			$scope.adjust_blue = AdjusterService.getBlueCSS();
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