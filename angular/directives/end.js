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

			var oldBlackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

		    if (oldBlackPercent != 100) {
		        var oldCyanPercent = Math.round(((100 - redPercent - oldBlackPercent)/(100 - oldBlackPercent))*100);
		        var oldMagentaPercent = Math.round(((100 - greenPercent - oldBlackPercent)/(100 - oldBlackPercent))*100);
		        var oldYellowPercent = Math.round(((100 - bluePercent - oldBlackPercent)/(100 - oldBlackPercent))*100);
		    }

		    else {
		        var oldCyanPercent = Math.round(((100 - redPercent - oldBlackPercent)/(100 - 99))*100);
		        var oldMagentaPercent = Math.round(((100 - greenPercent - oldBlackPercent)/(100 - 99))*100);
		        var oldYellowPercent = Math.round(((100 - bluePercent - oldBlackPercent)/(100 - 99))*100);
		    }


			$scope.cyanDiff = Math.abs(AdjusterService.getCyan() - oldCyanPercent);
			$scope.magentaDiff = Math.abs(AdjusterService.getMagenta() - oldMagentaPercent);
			$scope.yellowDiff = Math.abs(AdjusterService.getYellow() - oldYellowPercent);
			$scope.blackDiff = Math.abs(AdjusterService.getBlack() - oldBlackPercent);

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
				var gif = response.data.data.image_original_url; 
				$scope.gif = [gif.slice(0, 4), 's', gif.slice(4)].join('');
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