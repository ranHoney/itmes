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

	$('.consult-tel').mouseleave(function() {
		$('.ke').animate({
			'right': 200,
			'opacity': 0
		}, 400, function() {
			$('.ke').css('z-index', -9999)
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

	var detail = document.getElementById("detail");
	$.getJSON("../../itmes/json/details.json", function(data) {
		
		if(getCookie("cart")) {
			var objCookie = JSON.parse(getCookie("cart"));
		} else {
			//没有的话 定义一个对象去，未来点击按钮时保存数据
			var objCookie = {};
		}
//		console.log(objCookie);
		var str = location.search;
		var arr = str.split("=");
		var id = arr[1];
		console.log(id);
		var proDetail = data[id];	
		console.log(proDetail);
		detail.innerHTML = "<div id='dbox'><div id='xbox'><img src=" + proDetail.img + "><div id='zoom'></div></div><div class ='bigImg'><img src=" + proDetail.img + " class='tImg'></div><a class='xiaoa' href='#'><img class = 'xiaotu' src =" + proDetail.img + "></a><div id='bigpic'><img src=" + proDetail.img + "></div></div><p class='biaoti'>" + proDetail.title + "</p><p class='pinpai'>" + proDetail.pinpai + "</p><p class='bianhao'> " + proDetail.bianhao + "</p><p id='money'>" + proDetail.price + "</p><a id='car' data-id=" + proDetail.id + ">加入购物车</a><a class='shouc'>加入收藏</a><p class='fenxiang'><span class='f1'></span><span class='f2'></span><span class='f3'></span><span class='f4'></span><span class='f5'></span><span class='f6'></span></p>";
		var ostr = "";
		for(var i=0;i<8;i++,proDetail.id++){
			ostr+="<li><a href='detail1.html?id="+proDetail.id+"' class='img'><img src=" + data[proDetail.id].img + "></a><p class='biaoti1'>" + data[proDetail.id].title + "</p><p id='money1'>" + data[proDetail.id].price + "</p></li>"
		}
		
		$("#r-list").html(ostr);
		var oZoomBox = document.getElementById("dbox");
		var oMidArea = document.getElementById("xbox");
		var oZoom = document.getElementById("zoom");
		var oBigArea = document.getElementsByClassName("bigImg")[0];
		var oBigImg = document.getElementsByClassName("tImg")[0];
		$("#dbox").on("mouseover",function(e) {
			var evt = e || event;
			$("#zoom").css("display", "block");
			$(".bigImg").css("display", "block");

			var _left = evt.clientX - oZoomBox.offsetLeft - oZoom.offsetWidth / 2 - $('#detail').offset().left - 40;
			var _top = evt.clientY - oZoomBox.offsetTop - oZoom.offsetHeight / 2 - $('#detail').offset().top - 30;

			//不能越界

			if(_left <= 0) {
				_left = 0;
			}
			if(_top <= 0) {
				_top = 0;
			}
			if(_left >= oMidArea.offsetWidth - oZoom.offsetWidth) {
				_left = oMidArea.offsetWidth - oZoom.offsetWidth;
			}
			if(_top >= oMidArea.offsetHeight - oZoom.offsetHeight) {
				_top = oMidArea.offsetHeight - oZoom.offsetHeight;
			}
			oZoom.style.left = _left + "px";
			oZoom.style.top = _top + "px";
			//			放大镜向右移动的距离与中图区域宽度的比 和  大图向左移动的距离和大图宽度的比 相等
			oBigImg.style.left = -oZoom.offsetLeft / oMidArea.offsetWidth * oBigImg.offsetWidth + "px";
			oBigImg.style.top = -oZoom.offsetTop / oMidArea.offsetHeight * oBigImg.offsetHeight + "px";

		})
		$("#dbox").on("mouseout",function() {
			oZoom.style.display = "none";
			oBigArea.style.display = "none";
		});
		var total = 0;
		$("#car").click(function() {
			total++;
			alert("已经加入购物车！");
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

		});
		for(var i in objCookie) {
			total += objCookie[i];
		}
		$(".oSpan").html(total) ;
			
	})
	
	$("#ulwrap").find("li").click(function(){
		console.log($(this));
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	var arr2 = location.search;
	arr2 = arr2.split("=");
	console.log(arr2);
	$(".userming").html("欢迎"+arr2[1]);

})