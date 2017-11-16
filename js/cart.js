$(function() {
	$(".productMenu").hide();
	$('.xinxi').mouseenter(function() {
		$('.productMenu').show(200);
	});
	$('.xinxi').mouseleave(function() {
		$('.productMenu').hide(200);
	});
	//号码图片显示与隐藏
	$('.consult-tel').mouseenter(function() {
		$('.ke').css('z-index', 9999);
		$('.ke').stop().animate({
			'right': 66,
			'opacity': 1
		}, 400)
	});
	$('.consult-tel').mouseleave(function() {
		$('.ke').stop().animate({
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
			});

	});

	$(".newTop").css("display", "none");
	$(window).scroll(function() {
		if($(window).scrollTop() > 300) {
			$(".newTop").fadeIn(1500);
		} else {
			$(".newTop").fadeOut(1500);
		}
	});
	$(".newTop").click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 1);
		return false;
	});
	
	
	
});

$.getJSON("json/details.json", function(data) {

	var oUl = document.getElementById("shangpinxinxi");
	var oLie = document.getElementById("removelie");
	//获取cookie转换成对象
	if(getCookie("cart")) {
		var objCookie = JSON.parse(getCookie("cart"));
	} else {
		var objCookie = {};
	}
	//根据cookie中保存的数据生成DOM结构
	var str = "";
	var shul = 0;
//				console.log(objCookie);
	for(let i in objCookie) {
		//i指产品id，取出该产品id对应的值（一个包含产品属性的对象）
//		console.log(i);
//		console.log(data[i]);
		var obj = data[i];
		shul += objCookie[i];
		var arr = obj.price;
		var newArr = arr.split(";");
		//console.log(obj.id);
		str += "<tr id='removelie'><td class='in2'><input type='checkbox'></td><td><img src='" + obj.img + "'><span class = 's1' >" + obj.title + "</span></td><td class='jia'><span>" + obj.price + " </span> </td><td class='shuli'><i class ='jian' next_id=" + i + ">" + '-' + "</i><span class='shu'> " + objCookie[i] + " </span> <i class='zeng' prev_id=" + i + "> " + '+' + "</i> </td> <td class = 'sjg'><span class='zongjia' dataid='" + i + "'>" + objCookie[i] * newArr[2] + "</span></td> <td><input data-id='" + i + "' value='删除' class='shan'><td></tr>"

	}
	oUl.innerHTML = str;
	var str1 = location.search;
	var arr = str.split("=");
	var id = arr[1];
	var proDetail = data[id];
	var aInput = document.getElementsByClassName("shan");
	for(let m = 0; m < aInput.length; m++) {
		aInput[m].onclick = function() {
			//获取id值，id保存在自定义属性data-id中
			var id = this.getAttribute("data-id");
			//删除时需要从DOM中移除节点
			//					console.log(this.parentNode.parentNode);
			oUl.removeChild(this.parentNode.parentNode);
			//delete删除对象中的某个属性
			delete objCookie[id];
			//删除之后需要再次在存cookie。否则刷新页面时，仍然存在
			location.reload();
			var strCookie = JSON.stringify(objCookie);
			//					console.log(strCookie);
			var total = 0;
			for(var i in objCookie) {
				total += objCookie[i];
			}
			$(".oSpan").html(total);
			setCookie("cart", strCookie, 7);
		}

	}

	//多选框勾选

	$(".in1").click(function() {
//		console.log($(this));
		if($(this).prop("checked")) {
			$(".in2").each(function() {
//				console.log($(this).children().length)
				$(this).children().prop("checked", true);
			})
		} else {
			$(".in2").each(function() {
//				console.log($(this).children().length)
				$(this).children().prop("checked", false);
			})
		}

	});

	var pr0 = 0;
	$(".in2 input").click(function() {
		//判断选中的数量
		if($(".in2 input:checked").length == $(".in2 input").length) {
			$(".in1").prop("checked", true);
		} else {
			$(".in1").prop("checked", false);
		}
	});
	
	$(".in2 input").click(function(){
		var talMoney=0;
		$(".in2 input:checked").each(function(i,ele){
			talMoney+=Number($(this).parent().siblings(".sjg").children("span").html());
		})
		$(".t-p").html(talMoney + "元");
	})
//	console.log(pr0)
	

	var pr1 = 0;
	//减少数量
	$(".jian").click(function() {
		var flag = false;
		var int1 = parseInt($(this).next().html());

		var detId = this.getAttribute("next_id");
		if(objCookie[detId] > 1) {
			objCookie[detId] -= 1;
//			console.log(objCookie[detId]);
			flag = false;
		} else {
			objCookie[detId] = 1;
			flag = true;
		}
		//计算不同商品的价钱综合
		var p1 = $(this).parent().prev().children().html();
		//console.log(p1)
		var p2 = p1.split(";");
		//console.log(p2[1])
		$(this).parent().next().children().html(objCookie[detId] * p2[1]);
		var strCookie = JSON.stringify(objCookie);

		//console.log($(this).siblings().parent().parent().find(".zongjia").html());
		//console.log($(".sjg").children().eq(0).html());

		if(int1 > 1) {
			int1--;
			$(this).next().html(int1);
			flag = false;
		} else {
			int1 = 1;
			$(this).next().html(int1);
			flag = true;
		}
		if(flag == false) {
			shul--;
		} else {
			$(".oSpan").html(shul);
		}
		$(".oSpan").html(shul);
		setCookie("cart", strCookie, 7);
		//计算所选商品的总价
		var talMoney=0;
		$(".in2 input:checked").each(function(i,ele){
			talMoney+=Number($(this).parent().siblings(".sjg").children("span").html());
		})
		$(".t-p").html(talMoney + "元")
		
	});

	//增加数量
	$(".zeng").click(function() {
		var int1 = parseInt($(this).prev().html());
		int1++;
		shul++;
		$(this).prev().html(int1);
		var cur = int1
		var detId = this.getAttribute("prev_id");
		objCookie[detId] += 1;

		//获取购物车当前的价钱
		var p1 = $(this).parent().prev().children().html();
		var p2 = p1.split(";");
		$(this).parent().next().children().html(objCookie[detId] * p2[1]);
		var strCookie = JSON.stringify(objCookie);
		setCookie("cart", strCookie, 7);
		var num = shul + int1;
		$(".oSpan").html(shul);
		//把总价写入
		var talMoney=0;
		$(".in2 input:checked").each(function(i){
			talMoney+=Number($(this).parent().siblings(".sjg").children("span").html());
		})
		$(".t-p").html(talMoney + "元")

	});
	$(".oSpan").html(shul);

});