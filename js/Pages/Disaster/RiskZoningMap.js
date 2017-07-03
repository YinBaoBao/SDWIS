/**
 * @module 风险区划图谱模块
 * @author POPE
 * @date   2017-03-01
 */
function RiskZoningMap(){
	if(!(this instanceof RiskZoningMap)){
		return new RiskZoningMap();
	}
	this.locateTitle  = null; //定位名称
}
var fnZoning = RiskZoningMap.prototype;
/**
 * @author:POPE
 * @date:2017-03-01
 * @param {string} locateTitle - 当前定位标题.
 * @description:启动函数
 */
fnZoning.run = function (locateTitle) {
	var self = this;
	self.locateTitle = locateTitle;
	self.show('#menu_bd');
};
/**
 * @author:POPE
 * @date:2017-03-01
 * @param: {Object} container - 面板容器.
 * @description:面板显示
 */
fnZoning.show =function (container) {
	var self = this;
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var html ='<div class="menu_ds">'
		+'<div id="div-basin"><div class="shTitle"><流域></div>'
	    +'<div class="btn-line2">'
	    +'<button id="btnRivers" class="active" style="margin:8px 0px 0px 6px;">中小河</button>'
	    +'<button id="btnSHG" style="margin-top:8px;">山洪沟</button>'
	    +'<button id="btn_PYNL" style="margin:8px 0px 0px 6px;">平原内涝</button>'
	    +'</div>'
	    +'</div>'
		+'<div id="div-basinDetail"><hr style="margin:7px 0;"></div>'
		+'<div id="div-detail" style="display: none;margin-bottom: 60px;"><div class="shTitle"><详情></div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP5" name="GDP5">5年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP5" name="POP5">5年一遇淹没人口</button>'
		+'<button id="btnFloodDepth5" name="Flood5">5年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP10" name="GDP10">10年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP10" name="POP10">10年一遇淹没人口</button>'
		+'<button id="btnFloodDepth10" name="Flood10">10年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP15" name="GDP15">15年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP15" name="POP15">15年一遇淹没人口</button>'
		+'<button id="btnFloodDepth15" name="Flood15">15年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP20" name="GDP20">20年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP20" name="POP20">20年一遇淹没人口</button>'
		+'<button id="btnFloodDepth20" name="Flood20">20年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP30" name="GDP30">30年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP30" name="POP30">30年一遇淹没人口</button>'
		+'<button id="btnFloodDepth30" name="Flood30">30年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP50" name="GDP50">50年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP50" name="POP50">50年一遇淹没人口</button>'
		+'<button id="btnFloodDepth50" name="Flood50">50年一遇淹没深度</button>'
		+'</div>'
		+'<div class="btn-line3">'
		+'<button id="btnFloodGDP100" name="GDP100">百年一遇淹没GDP</button>'
		+'<button id="btnFloodPOP100" name="POP100">百年一遇淹没人口</button>'
		+'<button id="btnFloodDepth100" name="Flood100">百年一遇淹没深度</button>'
		+'</div>'
		+'</div>'
		+'</div>'
		+'</div>';
	$(container).append(html);
	var img = '<ul id="jq22">'
		+'<li><img src="img/rivers/DE171500/5a/GDP5.jpg" alt="5年一遇GDP"></li>'
		+'<li><img src="img/rivers/DE171500//5a/Flood5.jpg" alt="5年一遇淹没深度"></li>'
		+'<li><img src="img/rivers/DE171500//5a/POP5.jpg" alt="白沙河5年一遇人口（修改）"></li>'
		+'</ul>';
	$('<div id="div-img" style="display: none;height: 100%"><div class="titleDiv"></div><div><img src="img/rivers/DE171500/5a/GDP5.jpg" alt="5年一遇GDP"></div></div>').appendTo('body');
	self._event();
};
/**
 * @author:POPE
 * @date:2017-03-01
 * @description:获取中小河流数据渲染按钮
 */
fnZoning.showRivers = function (_event,_type) {
	var html = '', len = _event.length;
	var num = 1;
	var btn = '';
	for (var k = 0; k < len; k++) {
		var item = _event[k];
		var id = 'ZXH-' + item.id;
		btn += '<button id="' + id + '" name="'+_type+'/'+ item.e_name+'">' + item.name + '</button>';
		if (k == (num * 3 - 1)) {
			var div = '<div class="btn-line3">' + btn + '</div>';
			html += div;
			btn = '';
			num++;
		}
		if (k == (len - 1)) {
			var div = '<div class="btn-line3 btn_last" style="text-align:left;padding-left:6px;">' + btn + '</div>';
			html += div;
			btn = '';
			num++;
		}
	}
	return html;
};
/**
 * @author:POPE
 * @date:2017-03-01
 * @description:注册事件
 */
fnZoning._event =function () {
	var self = this,$basin = $('#div-basin'),$type = $('#div-type'),$basinDetail = $('#div-basinDetail'),$detail = $('#div-detail'),$img = $('#div-img');
	var layout = new Layout(),width = (document.body.clientWidth-666) +"px",height = (document.body.clientHeight-10) +"px",img_height = (document.body.clientHeight-70) +"px";
	/**
	 * 流域点击事件
	 */
	$basinDetail.append(self.showRivers(rivers,'zxh'));
	$('#div-basinDetail').children('div').eq(0).find('button').eq(0).addClass('active');
	$basin.undelegate("button","click").delegate("button","click",function(){
		$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).attr('id');
		$basinDetail.empty();
		$basinDetail.html('<hr style="margin:7px 0;">');
		var _type = '';
		switch (id){
			case "btnRivers":
				_type = 'zxh';
				$basinDetail.append(self.showRivers(rivers,_type));
				break;
			case "btnSHG":
				_type = 'shg';
				$basinDetail.append(self.showRivers(shg,_type));
				break;
			case "btn_PYNL":
				_type = 'pynl';
				$basinDetail.append(self.showRivers(PYNL,_type));
				// $(".btn_last").css('padding-left','10px');
				break;
		}
		// layer.msg($(this).text());
	});
	/**
	 * 流域详情点击事件
	 */
	$basinDetail.undelegate("button","click").delegate("button","click",function(){
		var id = $(this).attr('id');
		$basinDetail.find("button.active").removeClass('active');
		$(this).addClass('active');
		switch (id){
			case "btnRivers":
				break;
			case "btnSHG":
				break;
		}
	});
	$detail.css('display','block');
	/**
	 * 详情点击事件
	 */
	$detail.undelegate("button","click").delegate("button","click",function(){
		var id = $(this).attr('id');
		var name = $(this).attr('name');
		var riverName = $basinDetail.find("button.active").attr('name');
		var title = $basinDetail.find("button.active").text() +'---' +$(this).text();
		var src = 'img/rivers/'+riverName+'/'+name +'.jpg';
		$('.titleDiv').html(title);
		$img.find('img').attr('src',src).css('max-height',img_height);
		var option ={
			width: width,
			height: height,
			content: $img,
			title: '图谱展示',
			offset: 't'
		};
		$detail.find("button.active").removeClass('active');
		$(this).addClass('active');
		layout.showLayer(option);
	});
	// $('#jq22').viewer();
};
