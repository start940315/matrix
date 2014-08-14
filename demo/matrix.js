var Matrix = function() {
    /**
     * cache the slice method of Array to use in other place such as to slice the arguments
     * @inner
     */
    var slice = Array.prototype.slice;
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
     * the context of this file
     * @inner
     */
    var context = typeof window !== "undefined" ? window : global;

    var /**
         * @name isNaN
         * @desc 封装好的isNaN，保证了低版本浏览器的兼容性。
         * @param {Number} 角度
         */
        isNaN = isNaN || function(num) {
            return (typeof num === "number" || num instanceof Number) && (num + 0 !== num);
        }
        /**
         * @name toFixed
         * @desc 改良的toFixed方法，输入的第一个参数不能转化为数字时，返回为0
         * @param {Number} 数字
         * @param {Number} 保留位数
         */
        ,toFixed = function(num, dig) {
            num = Number(num);
            dig = dig || 6
            if( isNaN(num) ) {
                num = 0;
            }
            num = num.toFixed(dig).toString();
            num = num.split(".");
            num = num[0] + "." + num[1].substr(0, dig);
            return Number(num);
        }
        /**
         * @name sin
         * @desc 封装好的正弦函数
         * @param {Number} 角度
         */
        ,sin = function(deg) {
            return toFixed( Math.sin(deg), 6 );
        }
        /**
         * @name cos
         * @desc 封装好的余弦函数
         * @param {Number} 角度
         */
        ,cos = function(deg) {
            return toFixed( Math.cos(deg), 6 );
        }
        /**
         * @name tan
         * @desc 封装好的正切函数
         * @param {Number} 角度
         */
        ,tan = function(deg) {
            return toFixed( Math.tan(deg), 6 );
        }
        ;

    /**
     * @name Matrix
     * @constructor 
     * @classdesc 适用于css3的matrix3d的矩阵数据结构
     * @desc 可以通过new和调用函数的方式来创建一个矩阵对象，当没有传入参数或者参数不符合要求是，返回一个全0矩阵。
     * @extends Array
     * @requires js基本数据类型和内置方法
     * @param {?Array} 一个包含16个数的数组，用于自上向下，自左向右填满4*4的矩阵；或者没有传入参数
     * @param {?Number} 参数共16个，为填满矩阵的数字；或者没有传入参数
     * @global the function will be exposed to window if the enviroment is in browser.
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
                this[i][j] = flag ? 0 : toFixed( args[i*len+j], 6 );
            }
        }
    }
    /**
     * this virable is only used to make the prototype chain shorter in this file.
     * @inner
     */
    var mpt = Matrix.prototype = new Array();
    /** reset the constructor in Matrix's prototype */
    mpt.constructor = Matrix;

    /**
     * rewrite the toString method of Matrix to give us a css3 value .
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
     * the method used by the instance of Matrix to left multiply an Matrix
     * @method
     */
    mpt.by = function(m) {
        return Matrix.by(m, this);
    }
    /**
     * the method used by the instance of Matrix to right multiply an Matrix
     * @method
     */
    mpt.rby = function(m) {
        return Matrix.by(this, m);
    }

    /**
     * the method attach to the Matrix to generate a base Matrix
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
     * @method
     * @param {Matrix} give an Matrix to test
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
     * @method
     * @param {Matrix} give an Matrix to test
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
     * @method
     * @param {Matrix} the Matrix to be multiplied
     * @param {Matrix} the Matrix to be multiplied
     * @return the result Matrix
     */
    Matrix.by = function(m1, m2) {
        var i, j, k, len1, len2, len3;
        var res = Matrix(), temp = 0;
        var test = 0;
        for(i = 0, len1 = 3; i < len1; i++) {
            for(j = 0, len2 = 3; j < len2; j++ ) {
                temp = 0;
                for(k = 0, len3 = len2; k < len3; k++) {
                    temp += m1[i][k]*m2[k][j];
                }
                res[i][j] = toFixed( temp, 6 );
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
     * the method attach to the Matrix to format the arguments passed in Matrix.rotate/Matrix.translate/Matrix.scale/Matrix.skew
     * @method
     * @param {Number} the value related to the x axis
     * @param {Number} the value related to the y axis
     * @param {Number} the value related to the y axis
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
     * @method
     * @param {Number} the angle related to the x axis
     * @param {Number} the angle related to the y axis
     * @param {Number} the angle related to the y axis
     * @return the ratation Matrix
     */
    Matrix.rotate = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.by( Matrix.rotateX(args[0]) )
            .by( Matrix.rotateY(args[1]) )
            .by( Matrix.rotateZ(args[2]) )
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to x axis.
     * @method
     * @param {Number} the angle related to the x axis
     * @return the ratation Matrix
     */
    Matrix.rotateX = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, 0, 0, 0, 0, cos(deg), -sin(deg), 0, 0, sin(deg), cos(deg), 0, 0, 0, 0, 1);
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to y axis.
     * @method
     * @param {Number} the angle related to the y axis
     * @return the ratation Matrix
     */
    Matrix.rotateY = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(cos(deg), 0, -sin(deg), 0, 0, 1, 0, 0, sin(deg), 0, cos(deg), 0, 0, 0, 0, 1);
    }
    /**
     * the method attach to the Matrix to create a Matrix with an argument as the rotation angle relate to z axis.
     * @method
     * @param {Number} the angle related to the z axis
     * @return the ratation Matrix
     */
    Matrix.rotateZ = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(cos(deg), 0, -sin(deg), 0, 0, 1, 0, 0, sin(deg), 0, cos(deg), 0, 0, 0, 0, 1);
    }

    /**
     * the method attach to the Matrix to create a Matrix with 3 arguments as the translation dimension relate to x/y/z axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @param {Number} the dimension related to the y axis
     * @param {Number} the dimension related to the z axis
     * @return the translation Matrix
     */
    Matrix.translate = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.by( Matrix.translateX(args[0]) )
            .by( Matrix.translateY( args[1] ) )
            .by( Matrix.translateZ( args[2] ) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to x axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @return the translation Matrix
     */
    Matrix.translateX = function(dis) {
        var m = Matrix.base();
        m[3][0] = dis;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to y axis.
     * @method
     * @param {Number} the dimension related to the y axis
     * @return the translation Matrix
     */
    Matrix.translateY = function(dis) {
        var m = Matrix.base();
        m[3][1] = dis;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the translation dimension relate to z axis.
     * @method
     * @param {Number} the dimension related to the z axis
     * @return the translation Matrix
     */
    Matrix.translateZ = function(dis) {
        var m = Matrix.base();
        m[3][2] = dis;
        return m;
    }

    /**
     * the method attach to the Matrix to create a Matrix with 3 arguments as the scaling dimension relate to x/y/z axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @param {Number} the dimension related to the y axis
     * @param {Number} the dimension related to the z axis
     * @return the scaling Matrix
     */
    Matrix.scale = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.by( Matrix.scaleX(args[0]) )
            .by( Matrix.scaleY(args[1]) )
            .by( Matrix.scaleZ(args[2]) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to x axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @return the scaling Matrix
     */
    Matrix.scaleX = function(dim) {
        var m = Matrix.base();
        m[0][0] = dim;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to y axis.
     * @method
     * @param {Number} the dimension related to the y axis
     * @return the scaling Matrix
     */
    Matrix.scaleY = function(dim) {
        var m = Matrix.base();
        m[1][1] = dim;
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the scaling dimension relate to z axis.
     * @method
     * @param {Number} the dimension related to the z axis
     * @return the scaling Matrix
     */
    Matrix.scaleZ = function(dim) {
        var m = Matrix.base();
        m[2][2] = dim;
        return m;
    }

    /**
     * the method attach to the Matrix to create a Matrix with 2 arguments as the skewing angle relate to x/y/z axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @param {Number} the dimension related to the y axis
     * @return the skewing Matrix
     */
    Matrix.skew = function(x, y, z) {
        var args = Matrix.formatArgs(x, y, z)
            ,m = Matrix.base()
            ;
        m = m.by( Matrix.skewX(args[0]) )
            .by( Matrix.skewY(args[1]) );
        return m;
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the skewing dimension relate to x axis.
     * @method
     * @param {Number} the dimension related to the x axis
     * @return the skewing Matrix
     */
    Matrix.skewX = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, tan(deg), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );
    }
    /**
     * the method attach to the Matrix to create a Matrix with an arguments as the skewing dimension relate to y axis.
     * @method
     * @param {Number} the dimension related to the y axis
     * @return the skewing Matrix
     */
    Matrix.skewY = function(deg) {
        deg = deg/180*Math.PI;
        return Matrix(1, 0, 0, 0, tan(deg), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );
    }

    /**
     * the method attach to the Matrix to translate angle to arc.
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
 * export the Matrix class as a node module if the enviroment is in nodejs.
 * @module 
 */
if(typeof window === "undefined") {
    module.exports = Matrix;
}












