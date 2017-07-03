/**
 * @module 站点预报
 * @author POPE
 * @date   2017-05-04
 */
function ZDYB(){
	if(!(this instanceof ZDYB)){
		return new ZDYB();
	}
	this.className = "ZDYB";
}

var fnZB = ZDYB.prototype;
/**
 * @author:POPE
 * @date:2017-05-04
 * @description:启动函数
 */
fnZB.run = function () {
	var self =this;
	$("#btnZdyb").on('click',function(){
		var url = host + "/"+ webRootName +"/zdyb.html?zdyb";
		self.open(url);
	});
	$("#btnZdybManage").on('click',function(){
		var url = host + "/"+ webRootName +"/zdybManage.html?manage";
		self.open(url);
	});
};
/**
 * @author:POPE
 * @date:2017-05-04
 * @description:打开新窗口
 */
fnZB.open = function (url) {
	var win = window.open(url);
	if(win){
		win.focus();
	}
}
;(function(w){
	// debugger
	// var zdyb =new ZDYB();
	// zdyb.run();
})(window);
