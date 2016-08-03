var util = {
	randRangeInt : function(min,max) {
		return Math.floor(Math.random() * (max-min+1) + min);
	},
	rollPercent : function(percent) {
		return Math.random() * 100 < percent;
	},

	// 浅度或深度克隆
	clone : function(src, deep) {
		if(typeof(src) != 'object') return src; 
		if(src == null) return null; 
		var dst = {};
		for (var i in src) {
			var v = src[i];
			dst[i] = deep ? util.clone(v, deep) : v;
		}
		return dst;
	},

	// 将一个对象浅度或深度复制到目的对象
	copyTo : function(dst, src, deep) {
		for (var i in src) {
			var v = src[i];
			dst[i] = deep ? util.clone(v, deep) : v;
		}
		return dst;
	},

	// 计算向量角度
	calcAngle : function(fromX, fromY, toX, toY) {
		var deltaX = toX - fromX;
		var deltaY = toY - fromY;
		var angle = Math.atan2(deltaY, deltaX);
		angle = angle * 180 / Math.PI;
		return angle;
	},
	
	// 绑定元素的点击事件
	bindClickEvent : function(selector, fn) {
		var item = document.querySelector(selector);
		function on(event) {
			event.preventDefault();
			fn(event);
		};
		item.addEventListener("click", on);
		item.addEventListener("touchend", on);
	},

	toFriendlyNumber : function(num) {
		if (num >= 10000)
			num = Math.floor(num/10000) + ',' + num%10000;
		return num;
	},

};

function $1(s) { return document.getElementById(s); }
function $2(s) { return document.getElementsByClassName(s); }
function $3(s) { return document.querySelector(s); }
function $4(s) { return document.querySelectorAll(s); }

if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	window.cancelAnimationFrame = window.webkitcancelAnimationFrame || window.mozcancelAnimationFrame;
}
