// This is the directive that implements the instruction screen that appears when you first open the site, or click the '?' button

'use strict';

angular.module('start', [])

.controller('startController', ['$scope', function($scope) {
		$scope.showInstructions = true;
		$scope.help = false;

		// Shows the instruction screen
		$scope.startGame = function () {
			$scope.showInstructions = false;
			$scope.help = true;
		}

		// Shows the instruction screen
		$scope.showHelp = function () {
			$scope.showInstructions = true;
		}

		// Hides the instruction screen
		$scope.closeHelp = function () {
			$scope.showInstructions = false;
		}
}])

.directive('startDirective', function() {
  return {
    templateUrl: 'templates/start.html'
  };
});