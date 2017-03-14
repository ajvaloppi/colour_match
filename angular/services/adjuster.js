angular.module('colourMatch').factory('AdjusterService',
    [
    function () {
        var redCSS = Math.floor(Math.random() * 255);
        var greenCSS = Math.floor(Math.random() * 255);
        var blueCSS = Math.floor(Math.random() * 255);
        
        var redPercent = Math.floor((redCSS/255)*100);
        var greenPercent = Math.floor((greenCSS/255)*100);
        var bluePercent = Math.floor((blueCSS/255)*100);

        console.log(redCSS, redPercent);
        console.log(greenCSS, greenPercent);
        console.log(blueCSS, bluePercent);

        return ({
            getRedPercent: getRedPercent,
            getRedCSS: getRedCSS,
            setRed: setRed,
            getGreenPercent: getGreenPercent,
            getGreenCSS: getGreenCSS,
            setGreen: setGreen,
            getBluePercent: getBluePercent,
            getBlueCSS: getBlueCSS,
            setBlue: setBlue,
        });

        function getRedPercent() {
            return redPercent;
        }

        function getRedCSS() {
            return redCSS;
        }

        function setRed(newRedPercent) {
            redPercent = newRedPercent;
            redCSS = Math.floor((newRedPercent*255)/100);
        }

        function getGreenPercent() {
            return greenPercent;
        }

        function getGreenCSS() {
            return greenCSS;
        }

        function setGreen(newGreenPercent) {
            greenPercent = newGreenPercent;
            greenCSS = Math.floor((newGreenPercent*255)/100);
        }

        function getBluePercent() {
            return bluePercent;
        }

        function getBlueCSS() {
            return blueCSS;
        }

        function setBlue(newBluePercent) {
            bluePercent = newBluePercent;
            blueCSS = Math.floor((newBluePercent*255)/100);
        }    
}]);