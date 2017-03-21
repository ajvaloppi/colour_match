'use strict';

angular.module('end', [])

.controller('endController', ['$scope', '$rootScope', '$http', 'AdjusterService', 'MatcherService', function($scope, $rootScope, $http, AdjusterService, MatcherService) {
		$scope.end = false;

		$scope.refreshGame = function () {
			$scope.end = false;
			MatcherService.refresh();
			AdjusterService.refresh();
			$rootScope.$emit('refresh');
			$scope.gif = "";
		}

		$rootScope.$on('doneRound', function (event, data) {
			$scope.correctness = Math.round(AdjusterService.getCorrectness() * 100) / 100;

			$http.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=celebrate&rating=pg-13")
			.then(function(response){ 
				$scope.gif = response.data.data.image_original_url; 
				$scope.end = true;
			});
		})
}])

.directive('endDirective', function() {
  return {
    templateUrl: 'templates/end.html'
  };
});