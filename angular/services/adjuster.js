angular.module('colourMatch').factory('AdjusterService',
    [
    function () {
        var redCSS = Math.round(Math.random() * 255);
        var greenCSS = Math.round(Math.random() * 255);
        var blueCSS = Math.round(Math.random() * 255);
        
        var redPercent = Math.round((redCSS/255)*100);
        var greenPercent = Math.round((greenCSS/255)*100);
        var bluePercent = Math.round((blueCSS/255)*100);

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

        var correctness = 0;

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
            setBlack: setBlack,
            refresh: newColours,
            getCorrectness: getCorrectness,
            setCorrectness: setCorrectness
        });

        function getCorrectness() {
            return correctness;
        }

        function setCorrectness(newCorrectness) {
            correctness = newCorrectness;
        }

        function newColours() {
            redCSS = Math.round(Math.random() * 255);
            greenCSS = Math.round(Math.random() * 255);
            blueCSS = Math.round(Math.random() * 255);
            
            redPercent = Math.round((redCSS/255)*100);
            greenPercent = Math.round((greenCSS/255)*100);
            bluePercent = Math.round((blueCSS/255)*100);

            blackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

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
        }

        function recalculateRGB() {
            redPercent = Math.round(((100 - cyanPercent) * (100 - blackPercent))/100);
            redCSS = Math.round((redPercent*255)/100);

            greenPercent = Math.round(((100 - magentaPercent) * (100 - blackPercent))/100);
            greenCSS = Math.round((greenPercent*255)/100);

            bluePercent = Math.round(((100 - yellowPercent) * (100 - blackPercent))/100);
            blueCSS = Math.round((bluePercent*255)/100);
        }

        function recalculateCMYK() {
            blackPercent = 100 - (Math.max(Math.max(redPercent, greenPercent), bluePercent));

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
            greenCSS = Math.round((newGreenPercent*255)/100);
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
            blueCSS = Math.round((newBluePercent*255)/100);
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