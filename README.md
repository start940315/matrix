好了，不装逼了，上中文
###
这个库可以做适用于css3的矩阵变换。
1、用new Matrix() 或者 Matrix() 来实例化一个Matrix，通过这样的方式生成的矩阵是0矩阵。同时也可以传入一个4*4的二维数组，那么返回的矩阵中的值与该数组一一对应，还可以在调用函数时依次传入16个值从左到右、从上到下填满生成的矩阵。
2、Matrix.base()方法可以返回一个单位矩阵。
3、实例化Matrix后，该实例可以做基本的矩阵变换，比如
	var m = Matrix.base();
	var cssStr = m.rotate(45, 45, 45).translateX(200).scale(.5).skewX(10).toString();
	console.log(cssStr);
	//控制台输出的结果就为：matrix3d(0,-0.353554,-0.353554,0,0,0,0,0,0,0,0,0,200,0,0,1)
4、如果你想合并两个变换，你可以使用by方法。比如
	var m1 = new Matrix.base();
	var m2 = new Matrix.base();
	m1 = m1.translateX(100).rotateX(90);
	m2 = m2.skewX(10).scale(1.2);
	var res = Matrix.by(m1, m2); //这里是m1左乘m2，同时还可以使用m1.by(m2) / m2.rby(m1);
	//res即为先进行m1变换，在进行m2变换的结果
5、同时，如果你想让一个元素执行一个过渡的变换，可以使用数乘的方法sby。比如
	var nowM = Matrix.base();
	var m1 = Matrix.base().scale(1.5).translateY(90);
	var now = 0;
	var tar = 1;
	var el = ANY_DOM;
	function animate() {
		el.style.transform = nowM.by( m1.sby(now) );//这里js会自动调用toString方法，不需要在这里手动调用
		now += 0.05;
		if( now <= tar ) {
			requestAnimationFrame(animate);
		}
	}
	animate();
这样就实现了一个简单的css3动画
>你可能会想：我给el设置一个transition然后再直接改矩阵不就可以了嘛。。。对于这个例子确实是可以的。但是如果你要对一个元素连续进行多次变换而且还要在变换过程中暂停等，那你可能就得考虑考虑用js来逐步实现那些动画了。这个时候，Matrix确实是你不错的助手~~