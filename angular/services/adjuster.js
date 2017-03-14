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

        function recalculateRGB() {
            redPercent = Math.floor(((100 - cyanPercent) * (100 - blackPercent))/100);
            redCSS = Math.floor((redPercent*255)/100);

            greenPercent = Math.floor(((100 - magentaPercent) * (100 - blackPercent))/100);
            greenCSS = Math.floor((greenPercent*255)/100);

            bluePercent = Math.floor(((100 - yellowPercent) * (100 - blackPercent))/100);
            blueCSS = Math.floor((bluePercent*255)/100);
        }

        function recalculateCMYK() {
            blackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

            cyanPercent = Math.floor(((100 - redPercent - blackPercent)/(100 - blackPercent))*100);
            magentaPercent = Math.floor(((100 - greenPercent - blackPercent)/(100 - blackPercent))*100);
            yellowPercent = Math.floor(((100 - bluePercent - blackPercent)/(100 - blackPercent))*100);
        }

        function getRedPercent() {
            return redPercent;
        }

        function getRedCSS() {
            return redCSS;
        }

        function setRed(newRedPercent) {
            redPercent = newRedPercent;
            redCSS = Math.floor((newRedPercent*255)/100);
            recalculateCMYK();
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
            recalculateCMYK();
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
            recalculateCMYK();
        } 

        function getCyan() {
            return cyanPercent;
        }

        function setCyan(newCyan) {
            cyanPercent = newCyan;
            recalculateRGB();
        } 

        function getMagenta() {
            return magentaPercent;
        }

        function setMagenta(newMagenta) {
            magentaPercent = newMagenta;
            recalculateRGB();
        }  

        function getYellow() {
            return yellowPercent;
        }

        function setYellow(newYellow) {
            yellowPercent = newYellow;
            recalculateRGB();
        }  

        function getBlack() {
            return blackPercent;
        }

        function setBlack(newBlack) {
            blackPercent = newBlack;
            recalculateRGB();
        } 
}]);