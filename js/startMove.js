function getStyle(obj, attr) {
				if(obj.currentStyle) {
					return obj.currentStyle[attr];
				} else {
					return getComputedStyle(obj, false)[attr];
				}
			}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true; //看到此定义时，先忽略，具体为什么要定义flag，参考下边的说明
		for(var attr in json){ 
			if(attr == "opacity"){
				var iCur = Math.round(getStyle(obj,attr)*100);
			}else{
				var iCur = parseInt(getStyle(obj,attr));
			}
			var iTarget = json[attr];
			var iSpeed = (iTarget - iCur)/8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(attr == "opacity"){
				obj.style.opacity = (iCur + iSpeed)/100;
				obj.style.filter = "alpha(opacity="+(iCur+iSpeed)+")";
			}else{
				obj.style[attr] = iCur + iSpeed + "px";
			}
			//正常来讲，当当前值和目标值相等时要清除定时器，但是此时可能设计多个属性值同时发生变化
			//如果其中某一个属性值先达到目标值，直接清除，其他属性值没法再发生变化
			//考虑使用一个公共变量去相应各个属性值的变化 定义一个flag
			//只要没有达到目标值，就让flag值为flase，此时不清除定时器
			if(iCur != iTarget){
				flag = false;
			}
			
		}
		
		//所有都到达了目标值
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
	},30)
}


		function getStyle(obj, attr) {
				if(obj.currentStyle) {
					return obj.currentStyle[attr];
				}
				return getComputedStyle(obj, false)[attr];
			}
