angular.module('colourMatch').factory('MatcherService',
    [
    function () {
        var red = Math.floor(Math.random() * 51)*5;
        var green = Math.floor(Math.random() * 51)*5;
        var blue = Math.floor(Math.random() * 51)*5;

        return ({
            getRed: getRed,
            setRed: setRed,
            getGreen: getGreen,
            setGreen: setGreen,
            getBlue: getBlue,
            setBlue: setBlue,
        });

        function getRed() {
            return red;
        }

        function setRed(newRed) {
            red = newRed;
        }

        function getGreen() {
            return green;
        }

        function setGreen(newGreen) {
            green = newGreen;
        }

        function getBlue() {
            return blue;
        }

        function setBlue(newBlue) {
            blue = newBlue;
        }
}]);