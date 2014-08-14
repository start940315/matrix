$(function() {
	var nowM = {
		translate: {
			x: Matrix.base(),
			y: Matrix.base(),
			z: Matrix.base()
		},
		rotate: {
			x: Matrix.base(),
			y: Matrix.base(),
			z: Matrix.base()
		},
		scale: {
			x: Matrix.base(),
			y: Matrix.base(),
			z: Matrix.base()
		},
		skew: {
			x: Matrix.base(),
			y: Matrix.base()
		}
	};

	$("input").on("change", function(e) {
		var $this = $(this)
			,type = $this.data().type
			,tot = type.substr(0, type.length-1)
			,axis = type.substr(-1)
			,val = 0
			,wr = $this.parents("li")
			,tar = wr.find(".result img")
			,res = Matrix.base()
			;
		if( isNaN( val = Number( $this.val() ) ) ) {
			$this.val(0);
			nowM[tot][axis] = Matrix[type](0);
		} else {
			nowM[tot][axis] = Matrix[type](val);
		}
		for(var i in nowM[tot]) {
			res = res.by( nowM[tot][i] );
		}
		wr.find(".string span").eq(1).text(res);
		var tds = wr.find("td");
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				tds.eq(i*4+j).text( res[i][j] )
			}
		}
		tar.css("transform", res );
	})
})