'use strict';

angular.module('start', [])

.controller('startController', ['$scope', function($scope) {
		$scope.showInstructions = true;
		$scope.help = false;

		$scope.startGame = function () {
			$scope.showInstructions = false;
			$scope.help = true;
		}

		$scope.showHelp = function () {
			$scope.showInstructions = true;
		}

		$scope.closeHelp = function () {
			$scope.showInstructions = false;
		}
}])

.directive('startDirective', function() {
  return {
    templateUrl: 'templates/start.html'
  };
});