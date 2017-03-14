angular.module('colourMatch').factory('AdjusterService',
    [
    function () {
        var redCSS = Math.floor(Math.random() * 255);
        var greenCSS = Math.floor(Math.random() * 255);
        var blueCSS = Math.floor(Math.random() * 255);
        
        var redPercent = Math.floor((redCSS/255)*100);
        var greenPercent = Math.floor((greenCSS/255)*100);
        var bluePercent = Math.floor((blueCSS/255)*100);

        var blackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

        var cyanPercent = Math.floor(((100 - redPercent - blackPercent)/(100 - blackPercent))*100);
        var magentaPercent = Math.floor(((100 - greenPercent - blackPercent)/(100 - blackPercent))*100);
        var yellowPercent = Math.floor(((100 - bluePercent - blackPercent)/(100 - blackPercent))*100);

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
            getCyan: getCyan,
            setCyan: setCyan,
            getMagenta: getMagenta,
            setMagenta: setMagenta,
            getYellow: getYellow,
            setYellow: setYellow,
            getBlack: getBlack,
            setBlack: setBlack
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

        function getCyan() {
            return cyanPercent;
        }

        function setCyan(newCyan) {
            cyanPercent = newCyan;
            // adjust RGB
        } 

        function getMagenta() {
            return magentaPercent;
        }

        function setMagenta(newMagenta) {
            magentaPercent = newMagenta;
            // adjust RGB
        }  

        function getYellow() {
            return yellowPercent;
        }

        function setYellow(newYellow) {
            yellowPercent = newYellow;
            // adjust RGB
        }  

        function getBlack() {
            return blackPercent;
        }

        function setBlack(newBlack) {
            blackPercent = newBlack;
            // adjust RGB
        } 
}]);