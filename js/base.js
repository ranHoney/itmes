
$(function(){
	
	var ss= JSON.parse($.cookie("login"));
	//console.log(typeof ss,ss.name);
	$(".userming").html("欢迎  "+ss.name);
	
	var flag;
	$(".userming").click(function(){
		if($(this).html()!="登录"){
			var flag = true;
		}else{
			flag = false;
		}
		if(flag){
			$(this).html("登录");
		}
	})
				
	//搜索框效果
	$(".head").hide();
	$(".fdjbtn").click(function(){
		$(".head").show(200);
		$(".search-box").animate({
			'opacity':1
		},400);
		$(".search").css({"height":80})
		.hover(function(){
			$(".close").show(400)
		},function(){
			$(".close").click(function(){
				$(".head").hide()
			});
		})
		.mouseleave(function(){
			$(".close").hide(400)			
		})

	});


$(".btnIn").click(function(){
	location.href= "http://www.wm18.com/search.php?encode="+$("#searchInput").val()
})
	if(getCookie("cart")){
		var objCookie = JSON.parse(getCookie("cart"));
	}else{
		var objCookie = {};
	}
	var str = "";
	var num = 0;
	for(var i in objCookie){
		num += objCookie[i]
	}
	$(".oSpan").html(num);
})
