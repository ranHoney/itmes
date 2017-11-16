$(function() {

	$(".more").click(function(){
		$(".more").hide(400,function(){
				$(".hide").show(400,function(){
					$("#allBrands").show();
				})
			
			
		})
	});
	$(".hide").click(function(){
		$("#allBrands").hide(400,function(){
			$(".more").show(0,function(){
				$(".hide").hide();
			});
		})
	})

})