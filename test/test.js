const Matrix = require("../matrix");

const baseMatrix = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1]
];

describe('basic matrix method', () => {
  test('api: Matrix.base()', () => {
    expect(Matrix.base()).toEqual(new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1));
  });

  test('api: Matrix.isBase()', () => {
    expect(Matrix.isBase(Matrix.base())).toBe(true);
  });

  test('api: Matrix.prototype.toString()', () => {
    const m1 = new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,10,10,10,1);
    expect(m1.toString()).toBe('matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,10,10,10,1)');
  });

  test('api: Matrix.mul()', () => {
    const m1 = new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,10,10,10,1);
    const m2 = new Matrix(2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,1);
    expect(Matrix.mul(m1, m2)).toEqual(new Matrix(10,0,0,0,0,10,0,0,0,0,10,0,10,10,10,1));
  });

  test('api: Matrix.smul()', () => {
    const m1 = new Matrix(10,0,0,0,0,10,0,0,0,0,10,0,10,10,10,1);
    expect(Matrix.smul(m1, 0.8)).toEqual(new Matrix(1.6,0,0,0,0,1.6,0,0,0,0,1.6,0,10,10,10,1));
  });

  test('api: Matrix.formatArgs()', () => {
    expect(Matrix.formatArgs(1,2,3)).toEqual([1,2,3]);
  });

  test('api: Matrix.rotate()', () => {
    expect(Matrix.rotate(10, 10, 10)).toEqual(new Matrix(0.939693,-0.059391,-0.336824,0,0,0.984808,-0.173648,0,0.34202,0.163176,0.925418,0,0,0,0,1));
  });

  test('api: Matrix.rotateX()', () => {
    expect(Matrix.rotateX(10)).toEqual(new Matrix(1,0,0,0,0,0.984808,-0.173648,0,0,0.173648,0.984808,0,0,0,0,1));
  });

  test('api: Matrix.rotateY()', () => {
    expect(Matrix.rotateY(10)).toEqual(new Matrix(0.984808,0,-0.173648,0,0,1,0,0,0.173648,0,0.984808,0,0,0,0,1));
  });

  test('api: Matrix.rotateZ()', () => {
    expect(Matrix.rotateZ(10)).toEqual(new Matrix(0.984808,0.173648,0,0,-0.173648,0.984808,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.rotateZ()', () => {
    expect(Matrix.rotateZ(10)).toEqual(new Matrix(0.984808,0.173648,0,0,-0.173648,0.984808,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.translate()', () => {
    expect(Matrix.translate(10, 10, 10)).toEqual(new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,10,10,10,1));
  });

  test('api: Matrix.translateX()', () => {
    expect(Matrix.translateX(10)).toEqual(new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,10,0,0,1));
  });

  test('api: Matrix.translateY()', () => {
    expect(Matrix.translateY(10)).toEqual(new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,0,10,0,1));
  });

  test('api: Matrix.translateZ()', () => {
    expect(Matrix.translateZ(10)).toEqual(new Matrix(1,0,0,0,0,1,0,0,0,0,1,0,0,0,10,1));
  });

  test('api: Matrix.scale()', () => {
    expect(Matrix.scale(2, 2, 2)).toEqual(new Matrix(2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,1));
  });

  test('api: Matrix.scaleX()', () => {
    expect(Matrix.scaleX(2)).toEqual(new Matrix(2,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.scaleY()', () => {
    expect(Matrix.scaleY(2)).toEqual(new Matrix(1,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.scaleZ()', () => {
    expect(Matrix.scaleZ(2)).toEqual(new Matrix(1,0,0,0,0,1,0,0,0,0,2,0,0,0,0,1));
  });

  test('api: Matrix.skew()', () => {
    expect(Matrix.skew(20, 20)).toEqual(new Matrix(1,0.36397,0,0,0.36397,1.132474,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.skewX()', () => {
    expect(Matrix.skewX(20)).toEqual(new Matrix(1,0.36397,0,0,0,1,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.skewY()', () => {
    expect(Matrix.skewY(20)).toEqual(new Matrix(1,0,0,0,0.36397,1,0,0,0,0,1,0,0,0,0,1));
  });

  test('api: Matrix.deg2arc()', () => {
    expect(Matrix.deg2arc(30)).toEqual(30/180*Math.PI);
  });

  test('api: Matrix.arc2deg()', () => {
    expect(Matrix.arc2deg(1)).toEqual(1/Math.PI*180);
  });
})
