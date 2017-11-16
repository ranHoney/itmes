var hei = document.body.clientHeight || document.documentElement.clientHeight;
//console.log(hei);
$(".newleft").css("height", "hei");

var oBanner = document.getElementById("mainContent");
var oScrollImg = document.getElementById("scrollImg");
var oFocusList = document.getElementById("focusList");

var oPrev = document.getElementsByClassName("lbtn")[0];
var oNext = document.getElementsByClassName("rbtn")[0];
var aLi = oScrollImg.children;
var aFlist = oFocusList.children;
var cloneLi = aLi[0].cloneNode(true);
oScrollImg.appendChild(cloneLi);
var perWidth = aLi[0].offsetWidth;
oScrollImg.style.width = perWidth * aLi.length + "px";
//console.log(aLi.length);
var i = 0;
var timer = setInterval(function() {
	move();
}, 3000);
for(let j = 0; j < aFlist.length; j++) {
	aFlist[j].onmouseover = function() {
		clearInterval(timer);
		oPrev.style.opacity = 1;
		oNext.style.opacity = 1;
		i = j - 1;
		move();
	}
	aFlist[j].onmouseout = function() {
		timer = setInterval(function() {
			oPrev.style.opacity = 0;
			oNext.style.opacity = 0;
			move();
		}, 3000);
	}
}
oNext.onclick = function() {
	clearInterval(timer);
	move();
}
oPrev.onclick = function() {
	clearInterval(timer);
	i = i - 2;
	move();
}
oBanner.onmouseleave = function() {
	clearInterval(timer);
	timer = setInterval(function() {
		move();
	}, 3000)
}

function move() {
	i++;
	if(i == aLi.length) {
		i = 1;
		oScrollImg.style.left = 0;
	}

	if(i == -1) {
		oScrollImg.style.left = -perWidth * (aLi.length - 1) + "px";
		i = aLi.length - 2;
	}
	for(var j = 0; j < aFlist.length; j++) {
		aFlist[j].className = "";
	}

	if(i == aFlist.length) {
		aFlist[0].className = "cur";
	} else {
		aFlist[i].className = "cur";
	}
	startMove(oScrollImg, {
		"left": -perWidth * i
	});
}

//电话热线效果

$(function() {
	$(".productMenu").hide();
	$('.xinxi').mouseenter(function() {
		$('.productMenu').show(200);
	})
	$('.xinxi').mouseleave(function() {
		$('.productMenu').hide(200);
	})
	//号码图片显示与隐藏
	$('.consult-tel').mouseenter(function() {
		$('.ke').css('z-index', 9999)
		$('.ke').stop().animate({
			'right': 66,
			'opacity': 1
		}, 400)
	})
	$('.consult-tel').mouseout(function() {
		$('.ke').animate({
			'right': 200,
			'opacity': 0
		}, 400, function() {
			$('.ke').css('z-index', -9999)
		})
	});

	//文字背景，图片偏移
	var obj = $(".col li");
	$.each(obj, function() {
		$(this).mouseover(function() {
			$(this).find('.arrow-left').css('border-left', '14px solid #eeafce')
			$(this).find('.zi1').css('background', '#eeafce')
			$(this).find('.zuo1').css('right', '5px')
			$(this).find('.you').css('left', '5px')
			$(this).find('.zi2').css('background', '#97c86c')
			$(this).find('.arrow-right').css('border-right', '14px solid #97c86c')
		})
		$(this).mouseout(function() {
			$(this).find('.zi1').css('background', '#fff')
			$(this).find('.arrow-left').css('border-left', '14px solid #fff')
			$(this).find('.zuo1').css('right', '0px')
			$(this).find('.you').css('left', '0px')
			$(this).find('.zi2').css('background', '#fff')
			$(this).find('.arrow-right').css('border-right', '14px solid #fff')
		})
	});

	//搜索框效果
	$(".head").hide();
	$(".fdjbtn").click(function() {
		$(".head").show(200);
		$(".search-box").animate({
			'opacity': 1
		}, 400);
		$(".search").css({
				"height": 80
			})
			.hover(function() {
				$(".close").show(400)
			}, function() {
				$(".close").click(function() {
					$(".head").hide()
				});
			})
			.mouseleave(function() {
				$(".close").hide(400)
			})

	})


	
	//图片的显示与隐藏

	$(".cbox li").each(function() {
		$(this).click(function() {
			//			console.log($(this).next());
			$(this).next().css({
				"opacity": "1",
				"z-index": "99999"
			});
			$(".inner img").show(400, function() {
				$(".inner .b").show(400);
			});
		});
	})
	
	
	$(".closed").each(function() {
		$(this).click(function() {
			console.log($(this).length);
			$(this).each(function() {
				console.log();
				var a1 = $(this).next();
				$(this).next().next().hide(400, function() {
					a1.hide(400, function() {
						console.log($(a1).parent())
						$(a1).parent().parent().css({
							"opacity": "0",
							"z-index": "-1"
						})
					})
				})
			})
		})
	})

	//购物车
	if(getCookie("cart")) {
		var objCookie = JSON.parse(getCookie("cart"));
	} else {
		//没有的话 定义一个对象去，未来点击按钮时保存数据
		var objCookie = {};
	}
	var total = 0;
	$(".carbtn").click(function() {
		total++;
		console.log(111);
		$(".oSpan").html(total);
		var proId = this.getAttribute("data-id");
		//同种商品增加数量
		if(!objCookie[proId]) {
			objCookie[proId] = 1;
		} else {
			objCookie[proId] += 1;
		}

		var strCookie = JSON.stringify(objCookie);

		setCookie("cart", strCookie, 7);
		total += 1;
		$(".oSpan").innerHTML = total;

	});

	for(var i in objCookie) {
		total += objCookie[i];
	}
	$(".oSpan").html(total);

})