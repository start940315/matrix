var matrix = require("Matrix");

var s = new matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
console.log(s.toString());

var str = "测试rotate\n";
console.log(matrix.rotateX(45).toString(), matrix.rotateY(45).toString(), matrix.rotateZ(45).toString(), matrix.rotate(45, 45, 45).toString());

str = "测试translate\n";
console.log(matrix.translateX(45).toString(), matrix.translateY(45).toString(), matrix.translateZ(45).toString(), matrix.translate(45, 45, 45).toString());

str = "测试scale\n";
console.log(matrix.scaleX(45).toString(), matrix.scaleY(45).toString(), matrix.scaleZ(45).toString(), matrix.scale(45, 45, 45).toString());

str = "测试skew\n";
console.log(matrix.skewX(45).toString(), matrix.skewY(45).toString(), matrix.skew(45, 45).toString());

