// The service for the math involved in calculating the final percentage correct (on the end screen)

angular.module('colourMatch').factory('ColourConversionService',
    [
    function () {
        var Expression = algebra.Expression;
        var Equation = algebra.Equation;

        return ({
            rgb2lab: rgb2lab,
            deltaE: deltaE,
            fullLength: fullLength
        });

        // finds where the line represented by x, y, z intersects the plane given
        function getPlanePoint (plane, x, y, z) {
            var T = plane.solveFor("t");

            var tx = x.eval({t: T});
            var ty = y.eval({t: T});
            var tz = z.eval({t: T});

            if (tx.constants.length >= 1 && tx.constants[0].hasOwnProperty("numer") && tx.constants[0].hasOwnProperty("denom")) {
                numx = tx.constants[0].numer / tx.constants[0].denom;
            }
            else {
                numx = 0;
            }

            if (ty.constants.length >= 1 && ty.constants[0].hasOwnProperty("numer") && ty.constants[0].hasOwnProperty("denom")) {
                numy = ty.constants[0].numer / ty.constants[0].denom;
            }
            else {
                numy = 0;
            }

            if (tz.constants.length >= 1 && tz.constants[0].hasOwnProperty("numer") && tz.constants[0].hasOwnProperty("denom")) {
                numz = tz.constants[0].numer / tz.constants[0].denom;
            }
            else {
                numz = 0;
            }

            if (numx >= 0 && numx <= 100 && numy >= -128 && numy <= 128 && numz >= -128 && numz <= 128) {
                return [numx,numy,numz];
            }
        }

        // takes in rgb in percents and gives Lab colour space
        // http://www.easyrgb.com/index.php?X=MATH
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

        // calculates the visual difference between two colours, labA and labB
        // http://colormine.org/delta-e-calculator/
        function deltaE(labA, labB){
            var deltaL = Math.pow(labA[0] - labB[0],2);
            var deltaA = Math.pow(labA[1] - labB[1],2);
            var deltaB = Math.pow(labA[2] - labB[2],2);

            var deltaE = Math.sqrt(deltaL + deltaA + deltaB);
            return deltaE;
        }

        // Given two Lab colours, A and B, find the length of the full line (equation calculated using these points) within the Lab cube.
        function fullLength (A, B) {
            // first find the equation of line AB
            var a = B[0] - A[0];
            var b = B[1] - A[1];
            var c = B[2] - A[2];

            // if they are 100% correct... 
            if (a == 0 && b == 0 && c == 0) {
                return 0;
            }

            var planePoints = [];

            var x = new Expression("t");
            x = x.multiply(Math.round(a));
            x = x.add(Math.round(A[0]));


            var y = new Expression("t");
            y = y.multiply((Math.round(b)));
            y = y.add(Math.round(A[1]));

            var z = new Expression("t");
            z = z.multiply((Math.round(c)));
            z = z.add(Math.round(A[2]));

            var plane;
            var point;

            // check every plane that makes up our Lab cube space for intersection.
            // 0=x plane
            plane = new Equation(x, 0);
            if (Math.round(a) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }

            // 0=x-100 => 100 = x
            plane = new Equation(x, 100);
            if (Math.round(a) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }

            // 0=y+128 => -128 = y
            plane = new Equation(y, -128);
            if (Math.round(b) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }

            // 0=y-128 => 128 = y
            plane = new Equation(y, 128);
            if (Math.round(b) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }

            // 0=z+128 => -128 = z
            plane = new Equation(z, -128);
            if (Math.round(c) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }

            // 0=z-128 => 128 = z
            plane = new Equation(z, 128);
            if (Math.round(c) != 0) {
                point = getPlanePoint(plane, x, y, z);

                if (point) {
                    planePoints.push(point);
                }
            }
            
            // if planePoints is not length 2, remove any duplicate points 
            // this will only happen when a line intersects on an edge or corner of the Lab cube
            if (planePoints.length >= 2) {
                var hash = {};
                var out = [];
                for (var i = 0, l = planePoints.length; i < l; i++) {
                    var key = planePoints[i].join('|');
                    if (!hash[key]) {
                        out.push(planePoints[i]);
                        hash[key] = 'found';
                    }
                }
                return deltaE(out[0], out[1]);
            }
            
            // find difference of the two ends and return
            return deltaE(planePoints[0], planePoints[1]);
        }
}]);