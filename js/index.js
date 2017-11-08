var hei = document.body.clientHeight || document.documentElement.clientHeight;
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
console.log(aLi.length);
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
	},3000)
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
