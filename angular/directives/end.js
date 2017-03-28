// This is the directive that implements the end screen that appears when you want to check your match

'use strict';

angular.module('end', [])

.controller('endController', ['$scope', '$rootScope', '$http', 'AdjusterService', 'MatcherService', function($scope, $rootScope, $http, AdjusterService, MatcherService) {
		$scope.end = false;
		$scope.hideGif = false;

		// hides the end screen
		// recalcuates the background and font colour
		// tells the rest of the app that a new game has been started
		$scope.refreshGame = function () {
			$scope.end = false;
			MatcherService.refresh();
			AdjusterService.refresh();
			$rootScope.$emit('refresh');
			$scope.gif = "";
		}

		// happens when the "CHECK MY MATCH" button is clicked
		$rootScope.$on('doneRound', function (event, data) {
			$scope.correctness = Math.round(AdjusterService.getCorrectness() * 100) / 100;
			
			// calculate the difference of RGB
			$scope.redDiff = Math.abs(AdjusterService.getRedPercent() - MatcherService.getRedPercent());
			$scope.greenDiff = Math.abs(AdjusterService.getGreenPercent() - MatcherService.getGreenPercent());
			$scope.blueDiff = Math.abs(AdjusterService.getBluePercent() - MatcherService.getBluePercent());

			// calculate the CMYK of the original background colour (the colour we are matching to)
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

		    // calculate the difference of CMYK
			$scope.cyanDiff = Math.abs(AdjusterService.getCyan() - oldCyanPercent);
			$scope.magentaDiff = Math.abs(AdjusterService.getMagenta() - oldMagentaPercent);
			$scope.yellowDiff = Math.abs(AdjusterService.getYellow() - oldYellowPercent);
			$scope.blackDiff = Math.abs(AdjusterService.getBlack() - oldBlackPercent);

			// figure out which reaction we want as a gif based on correctness
			var reaction = ""
			if ($scope.correctness < 60) {
				reaction = "oh+no";
			}
			else if ($scope.correctness > 80) {
				reaction = "celebrate";
			}
			else {
				reaction = "you+got+this";
			}

			// call the giphy API to get a random gif based on our reaction
			$http.get("https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + reaction + "&rating=pg-13")
			.then(function(response){ 
				var gif = response.data.data.image_original_url;
				if (gif[4] != 's') {
					$scope.gif = [gif.slice(0, 4), 's', gif.slice(4)].join('');
				}
				else {
					$scope.gif = gif;
				}

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