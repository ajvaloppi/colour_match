angular.module('colourMatch').factory('MatcherService',
    [
    function () {
        var redCSS = Math.round(Math.random() * 255);
        var greenCSS = Math.round(Math.random() * 255);
        var blueCSS = 0;//Math.round(Math.random() * 255);

        console.log(redCSS, greenCSS, blueCSS);
        
        var redPercent = Math.round((redCSS/255)*100);
        var greenPercent = Math.round((greenCSS/255)*100);
        var bluePercent = Math.round((blueCSS/255)*100);

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
            refresh: newColours
        });

        function newColours() {
            redCSS = Math.round(Math.random() * 255);
            greenCSS = Math.round(Math.random() * 255);
            blueCSS = Math.round(Math.random() * 255);
            
            redPercent = Math.round((redCSS/255)*100);
            greenPercent = Math.round((greenCSS/255)*100);
            bluePercent = Math.round((blueCSS/255)*100);
        }

        function getRedPercent() {
            return redPercent;
        }

        function getRedCSS() {
            return redCSS;
        }

        function setRed(newRedPercent) {
            redPercent = newRedPercent;
            redCSS = Math.round((newRedPercent*255)/100);
        }

        function getGreenPercent() {
            return greenPercent;
        }

        function getGreenCSS() {
            return greenCSS;
        }

        function setGreen(newGreenPercent) {
            greenPercent = newGreenPercent;
            greenCSS = Math.round((newGreenPercent*255)/100);
        }

        function getBluePercent() {
            return bluePercent;
        }

        function getBlueCSS() {
            return blueCSS;
        }

        function setBlue(newBluePercent) {
            bluePercent = newBluePercent;
            blueCSS = Math.round((newBluePercent*255)/100);
        } 
}]);