angular.module('colourMatch').factory('ColourConversionService',
    [
    function () {

        return ({
            rgb2lab: rgb2lab,
            deltaE: deltaE
        });

        // takes in rgb in percents and gives Lab colour space
        function rgb2lab(r, g, b) {
            if ( r > 0.04045 ) {
                r = ( ( r + 0.055 ) / 1.055 ) ^ 2.4;
            }
            else {
                r = r / 12.92;
            }
            if ( g > 0.04045 ) {
                g = ( ( g + 0.055 ) / 1.055 ) ^ 2.4;
            }
            else {
                g = g / 12.92;
            }
            if ( b > 0.04045 ) {
                b = ( ( b + 0.055 ) / 1.055 ) ^ 2.4;
            }
            else {
                b = b / 12.92;
            }

            var X = r * 0.4124 + g * 0.3576 + b * 0.1805;
            var Y = r * 0.2126 + g * 0.7152 + b * 0.0722;
            var Z = r * 0.0193 + g * 0.1192 + b * 0.9505;

            var var_X = X / 95.047;
            var var_Y = Y / 100.000;
            var var_Z = Z / 108.883;

            if ( var_X > 0.008856 ) {
                var_X = Math.pow(var_X, (1/3));
            }
            else {
                var_X = ( 7.787 * var_X ) + ( 16 / 116 );
            }

            if ( var_Y > 0.008856 ) {
                var_Y = Math.pow(var_Y, (1/3));
            }
            else {
                var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
            }

            if ( var_Z > 0.008856 ) {
                var_Z = Math.pow(var_Z, (1/3));
            }
            else {
                var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );
            }

            var L = ( 116 * var_Y ) - 16;
            var a = 500 * ( var_X - var_Y );
            var b = 200 * ( var_Y - var_Z );

            return [L, a, b];
        }

        function deltaE(labA, labB){
            var deltaL = Math.pow(labA[0] - labB[0],2);
            var deltaA = Math.pow(labA[1] - labB[1],2);
            var deltaB = Math.pow(labA[2] - labB[2],2);

            var deltaE = Math.sqrt(deltaL + deltaA + deltaB);
            console.log(deltaE);
            return deltaE;
        }
}]);