'use strict';

angular.module('end', [])

.controller('endController', ['$scope', '$rootScope', 'AdjusterService', 'MatcherService', function($scope, $rootScope, AdjusterService, MatcherService) {
		$scope.end = false;

		$scope.refreshGame = function () {
			$scope.end = false;
			MatcherService.refresh();
			AdjusterService.refresh();
			$rootScope.$emit('refresh');
		}

		$rootScope.$on('doneRound', function (event, data) {
			$scope.end = true;
		})
}])

.directive('endDirective', function() {
  return {
    templateUrl: 'templates/end.html'
  };
});