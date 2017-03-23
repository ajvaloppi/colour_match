'use strict';

angular.module('end', [])

.controller('endController', ['$scope', '$rootScope', '$http', 'AdjusterService', 'MatcherService', function($scope, $rootScope, $http, AdjusterService, MatcherService) {
		$scope.end = false;
		$scope.hideGif = false;

		$scope.refreshGame = function () {
			$scope.end = false;
			MatcherService.refresh();
			AdjusterService.refresh();
			$rootScope.$emit('refresh');
			$scope.gif = "";
		}

		$rootScope.$on('doneRound', function (event, data) {
			$scope.correctness = Math.round(AdjusterService.getCorrectness() * 100) / 100;
			
			$scope.redDiff = Math.abs(AdjusterService.getRedPercent() - MatcherService.getRedPercent());
			$scope.greenDiff = Math.abs(AdjusterService.getGreenPercent() - MatcherService.getGreenPercent());
			$scope.blueDiff = Math.abs(AdjusterService.getBluePercent() - MatcherService.getBluePercent());

			var redPercent = MatcherService.getRedPercent();
			var greenPercent = MatcherService.getGreenPercent();
			var bluePercent = MatcherService.getBluePercent();

			var blackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

		    if (blackPercent != 100) {
		        cyanPercent = Math.round(((100 - redPercent - blackPercent)/(100 - blackPercent))*100);
		        magentaPercent = Math.round(((100 - greenPercent - blackPercent)/(100 - blackPercent))*100);
		        yellowPercent = Math.round(((100 - bluePercent - blackPercent)/(100 - blackPercent))*100);
		    }
		    else {
		        cyanPercent = Math.round(((100 - redPercent - blackPercent)/(100 - 99))*100);
		        magentaPercent = Math.round(((100 - greenPercent - blackPercent)/(100 - 99))*100);
		        yellowPercent = Math.round(((100 - bluePercent - blackPercent)/(100 - 99))*100);
		    }

			$scope.cyanDiff = Math.abs(AdjusterService.getCyan() - cyanPercent);
			$scope.magentaDiff = Math.abs(AdjusterService.getMagenta() - magentaPercent);
			$scope.yellowDiff = Math.abs(AdjusterService.getYellow() - yellowPercent);
			$scope.blackDiff = Math.abs(AdjusterService.getBlack() - blackPercent);

			var reaction = ""
			if ($scope.correctness < 50) {
				reaction = "oh+no";
			}
			else if ($scope.correctness > 75) {
				reaction = "celebrate";
			}
			else {
				reaction = "you+got+this";
			}

			$http.get("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + reaction + "&rating=pg-13")
			.then(function(response){ 
				$scope.gif = response.data.data.image_original_url; 
				$scope.end = true;
			}, function() {
					$scope.end = true;
					$scope.hideGif = true;	
				}
			);
		})
}])

.directive('endDirective', function() {
  return {
    templateUrl: 'templates/end.html'
  };
});