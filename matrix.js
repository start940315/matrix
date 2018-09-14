var Matrix = function() {
    /**
     * the base Matrix value
     * @inner
     */
    var baseArray = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    /**
     * context
     * @inner
     */
    var context = typeof window !== "undefined" ? window : global;

    var /**
         * @name isNaN
         * @desc using es6 Number.isNaN with old browsers compatible.
         * @param {Number} 角度
         * @inner
         */
        isNaN = Number.isNaN || function(num) {
            return (typeof num === "number" || num instanceof Number) && num !== num;
        }
        /**
         * @name toFixed
         * @desc help method for tranform prop support only 6 significant digits.
         * @param {Number} 数字
         * @param {Number} 保留位数
         * @inner
         */
        ,toFixed = function(num, dig) {
            num = Number(num);
            dig = dig || Matrix.precision;
            if( isNaN(num) ) {
                num = 0;
            }
            if (!dig) {
                return num;
            }
            num = num.toFixed(dig).toString();
            num = num.split(".");
            num = num[0] + "." + num[1].substr(0, dig);
            return Number(num);
        }
        /**
         * @name sin
         * @desc sin function with precision
         * @param {Number} deg angle unit
         * @inner
         */
        ,sin = function(deg) {
            return toFixed( Math.sin(deg), Matrix.precision );
        }
        /**
         * @name cos
         * @desc cos function with precision
         * @param {Number} deg angle unit
         * @inner
         */
        ,cos = function(deg) {
            return toFixed( Math.cos(deg), Matrix.precision );
        }
        /**
         * @name tan
         * @desc tan function with precision
         * @param {Number} deg angle unit
         * @inner
         */
        ,tan = function(deg) {
            return toFixed( Math.tan(deg), Matrix.precision );
        }
        ;

    /**
     * @name Matrix
     * @constructor 
     * @desc data structure for css transform matrix
     * @extends Array
     * @param {Array | Number[]} any 16 numbers array or 16 number arguments
     * @global 
     * @return the instance of Matrix if used as funcion
     */
    function Matrix() {
        var args = arguments;
        var i,j,len = 4,flag = false;
        if(this === context) {
            return new Matrix(args);
        }
        if( typeof args[0] !== "undefined" && args[0].length === 16) {
            args = args[0];
        } else if(args.length !== 16) {
            flag = true;
        }
        for(i = 0; i < len; i++) {
            this[i] = [];
            for(j = 0; j < len; j++) {
                this[i][j] = flag ? 0 : toFixed( args[i*len+j], Matrix.precision );
            }
        }
    }
    /**
     * set default precision
     */
    Matrix.precision = 6;
    /**
     * this virable is only used to make the prototype chain shorter in this file.
     * @inner
     */
    var mpt = Matrix.prototype = [];
    /** reset the constructor in Matrix's prototype */
    mpt.constructor = Matrix;

    /**
     * rewrite the toString method of Matrix to give us a css3 value .
     * @name toString
     * @method
     */
    mpt.toString = function() {
        var i,j,len = 4;
        var res = "matrix3d(";
        for(i = 0; i < len; i++) {
            for(j = 0; j < len; j++) {
                res += (this[i][j] + ",");
            }
        }
        res = res.substr(0, res.length-1);
        res += ")";
        return res;
    }
    /**
     * the method used mul the instance of Matrix to left multiply an Matrix
     * @name mul
     * @param {Matrix} Matrix
     * @method
     */
    mpt.mul = function(m) {
        return Matrix.mul(m, this);
    }
    /**
     * the method used mul the instance of Matrix to imply a scalar-multiply operation.
     * @name smul
     * @method
     * @param {Matrix} num
     * @return the result Matrix
     */
    mpt.smul = function(num) {
        return Matrix.smul(this, num);
    }
    /**
     * the method used mul the instance of Matrix to right multiply an Matrix
     * @name rmul
     * @param {Matrix} Matrix
     * @method
     */
    mpt.rmul = function(m) {
        return Matrix.mul(this, m);
    }
    /**
     * the method used mul the instance of Matrix to rotate
     * @name rotate
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @method
     */
     mpt.rotate = function(x, y, z) {
        return this.mul( Matrix.rotate(x, y, z) );
     }
     /**
     * the method used by the instance of Matrix to rotateX.
     * @name rotateX
     * @method
     * @param {Number} x
     * @return the ratation Matrix
     */
    mpt.rotateX = function(deg) {
        return this.mul( Matrix.rotateX(deg) );
    }
    /**
     * the method used by the instance of Matrix to rotateY.
     * @name rotateY
     * @method
     * @param {Number} y
     * @return the ratation Matrix
     */
    mpt.rotateY = function(deg) {
        return this.mul( Matrix.rotateY(deg) );
    }
    /**
     * the method used by the instance of Matrix to rotateZ.
     * @name rotateZ
     * @method
     * @param {Number} z
     * @return the ratation Matrix
     */
    mpt.rotateZ = function(deg) {
        return this.mul( Matrix.rotateZ(deg) );
    }
    /**
     * the method used by the instance of Matrix to translate.
     * @name translate
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the translation Matrix
     */
    mpt.translate = function(x, y, z) {
        return this.mul( Matrix.translate(x, y, z) );
    }
    /**
     * the method used by the instance of Matrix to translateX.
     * @name translateX
     * @method
     * @param {Number} x
     * @return the translation Matrix
     */
    mpt.translateX = function(dis) {
        return this.mul( Matrix.translateX(dis) )
    }
    /**
     * the method used by the instance of Matrix to translateY.
     * @name translateY
     * @method
     * @param {Number} y
     * @return the translation Matrix
     */
    mpt.translateY = function(dis) {
        return this.mul( Matrix.translateY(dis) );
    }
    /**
     * the method used by the instance of Matrix to translateZ.
     * @name translateZ
     * @method
     * @param {Number} z
     * @return the translation Matrix
     */
    mpt.translateZ = function(dis) {
        return this.mul( Matrix.translateZ(dis) );
    }

    /**
     * the method used by the instance of Matrix to scale.
     * @name scale
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the scaling Matrix
     */
    mpt.scale = function(x, y, z) {
        return this.mul( Matrix.scale(x, y, z) );
    }
    /**
     * the method used by the instance of Matrix to skew.
     * @name Matrix.skew
     * @method
     * @param {Number} Xdeg
     * @param {Number} Ydeg
     * @return the skewing Matrix
     */
    mpt.skew = function(x, y, z) {
        return this.mul( Matrix.skew(x, y, z) );
    }
    /**
     * the method used by the instance of Matrix to skewX.
     * @name Matrix.skewX
     * @method
     * @param {Number} deg
     * @return the skewed Matrix
     */
    mpt.skewX = function(deg) {
        return this.mul( Matrix.skewX(deg) );
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the skewing dimension relate to y axis.
     * @name Matrix.skewY
     * @method
     * @param {Number} deg
     * @return the skewed Matrix
     */
    mpt.skewY = function(deg) {
        return this.mul( Matrix.skewY(deg) );
    }


    /**
     * the method attach to the Matrix to generate a base Matrix
     * @name Matrix.base
     * @method
     * @return a base Matrix
     */
    Matrix.base = function() {
        var m = new Matrix();
        m[0][0] = 1;
        m[1][1] = 1;
        m[2][2] = 1;
        m[3][3] = 1;
        return m;
    }

    /**
     * the method attach to the Matrix to test if a Matrix is a base Matrix
     * @name Matrix.isBase
     * @method
     * @param {Matrix} Matrix
     * @return true if the Matrix is a base Matrix, otherwise false
     */
    Matrix.isBase = function(m) {
        var i,j,len = 4;
        for(i = 0; i < len; i++) {
            for(j = 0; j < len; j++) {
                if(m[i][j] !== baseArray[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * the method attach to the Matrix to test if a Matrix is a zero Matrix
     * @name Matrix.isZero
     * @method
     * @param {Matrix} Matrix
     * @return true if the Matrix is a zero Matrix, otherwise false
     */
    Matrix.isZero = function(m) {
        var i,j,len = 4;
        for(i = 0; i < len; i++) {
            for(j = 0; j < len; j++) {
                if(m[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * the method attach to the Matrix to multiply two Matrix
     * @name Matrix.mul
     * @method
     * @param {Matrix} Matrix
     * @param {Matrix} Matrix
     * @return the result Matrix
     */
    Matrix.mul = function(m1, m2) {
        var i, j, k, len1, len2, len3;
        var res = Matrix(), temp = 0;
        var test = 0;
        for(i = 0, len1 = 3; i < len1; i++) {
            for(j = 0, len2 = 3; j < len2; j++ ) {
                temp = 0;
                for(k = 0, len3 = len2; k < len3; k++) {
                    temp += m1[i][k]*m2[k][j];
                }
                res[i][j] = toFixed( temp, Matrix.precision );
            }
            res[i][j] = 0;
        }
        for(j = 0; j < 3; j++) {
            res[i][j] = m1[i][j] + m2[i][j];
        }
        res[i][j] = 1;
        return res;
    }
    /**
     * the method attach to the Matrix to imply a scalar-multiply operation.
     * @name Matrix.smul
     * @method
     * @param {Matrix} Matrix
     * @param {Matrix} num
     * @return the result Matrix
     */
    Matrix.smul = function(m, num) {
        var i, j, len1, len2;
        for(i = 0, len1 = 3; i < len1; i++) {
            for(j = 0, len2 = 3; j < len2; j++ ) {
                m[i][j] = toFixed( m[i][j]*num, Matrix.precision );
            }
        }
        return m;
    }


    /**
     * the method attach to the Matrix to format the arguments passed in Matrix.rotate/Matrix.translate/Matrix.scale/Matrix.skew
     * @name Matrix.formatArgs
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the formated arguments in a array
     */
    Matrix.formatArgs = function(x, y, z) {
        if( typeof x === "object" ) {
            if(x instanceof Array) {
                z = x[2];
                y = x[1];
                x = x[0];
            } else {
                z = x.z;
                y = x.y;
                x = x.x;
            }
        }
        x = x || 0;
        y = y || 0;
        z = z || 0;
        return [x,y,z];
    }

    /**
     * the method attach to the Matrix to create a Matrix with 3 arguments as the rotation angle relate to x/y/z axis.
     * @name Matrix.rotate
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the ratation Matrix
     */
    Matrix.rotate = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.mul( Matrix.rotateX(args[0]) )
            .mul( Matrix.rotateY(args[1]) )
            .mul( Matrix.rotateZ(args[2]) )
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to x axis.
     * @name Matrix.rotateX
     * @method
     * @param {Number} x
     * @return the ratation Matrix
     */
    Matrix.rotateX = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, 0, 0, 0, 0, cos(deg), -sin(deg), 0, 0, sin(deg), cos(deg), 0, 0, 0, 0, 1);
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to y axis.
     * @name Matrix.rotateY
     * @method
     * @param {Number} y
     * @return the ratation Matrix
     */
    Matrix.rotateY = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(cos(deg), 0, -sin(deg), 0, 0, 1, 0, 0, sin(deg), 0, cos(deg), 0, 0, 0, 0, 1);
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to z axis.
     * @name Matrix.rotateZ
     * @method
     * @param {Number} z
     * @return the ratation Matrix
     */
    Matrix.rotateZ = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(cos(deg), sin(deg), 0, 0, -sin(deg), cos(deg), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    /**
     * the method attach to the Matrix to create a Matrix with 3 arguments as the translation dimension relate to x/y/z axis.
     * @name Matrix.translate
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the translation Matrix
     */
    Matrix.translate = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.mul( Matrix.translateX(args[0]) )
            .mul( Matrix.translateY( args[1] ) )
            .mul( Matrix.translateZ( args[2] ) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to x axis.
     * @name Matrix.translateX
     * @method
     * @param {Number} x
     * @return the translation Matrix
     */
    Matrix.translateX = function(dis) {
        var m = Matrix.base();
        m[3][0] = dis;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to y axis.
     * @name Matrix.translateY
     * @method
     * @param {Number} y
     * @return the translation Matrix
     */
    Matrix.translateY = function(dis) {
        var m = Matrix.base();
        m[3][1] = dis;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to z axis.
     * @name Matrix.translateZ
     * @method
     * @param {Number} z
     * @return the translation Matrix
     */
    Matrix.translateZ = function(dis) {
        var m = Matrix.base();
        m[3][2] = dis;
        return m;
    }

    /**
     * the method attach to the Matrix to create a Matrix with 3 arguments as the scaling dimension relate to x/y/z axis.
     * @name Matrix.scale
     * @method
     * @param {Number} x
     * @param {Number} y
     * @param {Number} z
     * @return the scaling Matrix
     */
    Matrix.scale = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.mul( Matrix.scaleX(args[0]) )
            .mul( Matrix.scaleY(args[1]) )
            .mul( Matrix.scaleZ(args[2]) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to x axis.
     * @name Matrix.scaleX
     * @method
     * @param {Number} x
     * @return the scaling Matrix
     */
    Matrix.scaleX = function(dim) {
        var m = Matrix.base();
        m[0][0] = dim;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to y axis.
     * @name Matrix.scaleY
     * @method
     * @param {Number} y
     * @return the scaling Matrix
     */
    Matrix.scaleY = function(dim) {
        var m = Matrix.base();
        m[1][1] = dim;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to z axis.
     * @name Matrix.scaleZ
     * @method
     * @param {Number} z
     * @return the scaling Matrix
     */
    Matrix.scaleZ = function(dim) {
        var m = Matrix.base();
        m[2][2] = dim;
        return m;
    }

    /**
     * the method attach to the Matrix to create a Matrix with 2 arguments as the skewing angle relate to x/y/z axis.
     * @name Matrix.skew
     * @method
     * @param {Number} x
     * @param {Number} y
     * @return the skewing Matrix
     */
    Matrix.skew = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.mul( Matrix.skewX(args[0]) )
            .mul( Matrix.skewY(args[1]) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the skewing dimension relate to x axis.
     * @name Matrix.skewX
     * @method
     * @param {Number} x
     * @return the skewing Matrix
     */
    Matrix.skewX = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, tan(deg), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the skewing dimension relate to y axis.
     * @name Matrix.skewY
     * @method
     * @param {Number} y
     * @return the skewing Matrix
     */
    Matrix.skewY = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, 0, 0, 0, tan(deg), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );
    }

    /**
     * the method attach to the Matrix to translate angle to arc.
     * @name Matrix.deg2arc
     * @method
     * @param {Number} angle
     * @return arc
     */
    Matrix.deg2arc = function(deg) {
        if( isNaN( parseFloat(deg) ) ) {
            throw new Error("Matrix.deg2arc needs a number as an argument");
        }
        return deg/180*Math.PI;
    }
    /**
     * the method attach to the Matrix to translate arc to angle.
     * @name Matrix.arc2deg
     * @method
     * @param {Number} arc
     * @return angle
     */
    Matrix.arc2deg = function(arc) {
        if( isNaN( parseFloat(arc) ) ) {
            throw new Error("Matrix.arc2deg needs a number as an argument");
        }
        return arc/Math.PI*180;
    }
    return Matrix;
}();

/**
 * export the Matrix class as a node module if the enviroment is nodejs.
 * @module 
 */
if(module) {
    module.exports = Matrix;
}












