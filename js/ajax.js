function Ajax(type, url, data, fnSuc, fnFail) {
	var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	var str = "";
	for(var i in data) {
		str += i + "=" + data[i] + "&";
	}
	str = str.replace(/&$/, "");

	if(type.toUpperCase() == "GET") {
		xhr.open("GET", url + "?" + str, true);
		xhr.send();
	} else {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				if(fnSuc) {
					var data = xhr.responseText;
					fnSuc(data);
				}
			} else {
				if(fnFail) {
					fnFail();
				}
			}
		}
	}
}