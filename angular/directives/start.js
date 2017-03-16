'use strict';

angular.module('start', [])

.controller('startController', ['$scope', function($scope) {
		$scope.start = true;

		$scope.startGame = function () {
			$scope.start = false;
		}
}])

.directive('startDirective', function() {
  return {
    templateUrl: 'templates/start.html'
  };
});