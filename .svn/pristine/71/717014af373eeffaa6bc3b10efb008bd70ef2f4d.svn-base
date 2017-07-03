/**
 * @module 一致性检查
 * @author POPE
 * @date   2016-11-11
 */
function ConsistencyCheck(div){
	if(!(this instanceof ConsistencyCheck)){
		return new ConsistencyCheck();
	}
	this.div = div;
	this.tab = 0;
	this.data = null;
	this.temData = null; //气温
	this.maxMinTemData = null; //高低温
	this.r12Data = null; //日降水量
	this.wmaxData = null; //日最大风
	this.w10uvData = null; //风
	this.rhData = null; //相对湿度
	this.wData = null; //天气现象
	this.selectMaxMinTemVal =-1;
	this.selectTemVal =-1;
	this.checkLayer = null;
	this.hourSpan = null;
	this.currentElement ="";
	this.correctionTmaxTminType = null; //订正高温低温类型，1-日最高温日最低温与气温极值比对，2-高温低温比对
}
var fnCC = ConsistencyCheck.prototype;
/**
 * @author:POPE
 * @date:2016-11-11
 * @callback: callback - 回调函数.
 * @description: 初始化面板
 */
fnCC.initPanel = function (callback) {
	var width = "500px";
	var height = "700px";
	var container = $("#ConsistencyCheckPanel");
	var elementName = $($("#div_element").find("button.active")[0]).html();
	var title = "一致性检查";
	var self = this;
	self.createDom();
	self.showSelect();
	self.checkConsistent(function (dataArr) {
		self.showLayer(width,height,container,title);
		self._event();
		// GDYB.GridProductClass.isConsistencyCheck = true;
		if($.isFunction(callback)){
			callback.call(null,dataArr);
		}
	});
}

/*
 ** 面板内容
 */
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 创建面板
 */
fnCC.createDom = function() {
	var self = this;
	var form ='<form class="form-inline" role="form">'
		+'<div class="form-group"  style="display: none;">'
		+'<div class="input-group">'
		+'<div class="input-group-addon">高低温时效</div>'
		+'<select id="selectMaxMinTem" style="height:25px;z-index: 999"></select>'
		+'</div>'
		+'</div>'
		+'<div class="form-group"  style="display: none;">'
		+'<div class="input-group">'
		+'<div class="input-group-addon">3t气温时效&nbsp;</div>'
		+'<select id="selectTem" style="height:25px;z-index: 999"></select>'
		+'</div>'
		+'</div>'
		+'<div id="btnCheckTool">'
		+'<a id="correction_r12" title="日降水量=3小时雨量累加" class="btn btn-default" style="display: none;">订正日降水量</a>'
		+'<a id="correction_tmax" title="日最高温=3小时最大气温" class="btn btn-default" style="display: none;">订正日最高温</a>'
		+'<a id="correction_tmin" title="日最低温=3小时最小气温" class="btn btn-default" style="display: none;">订正日最低温</a>'
		+'<a id="correction_2t" title="气温=日最高温、日最低温与3小时气温规则转换" class="btn btn-default" style="display: none;">订正气温</a>'
		+'<a id="correction_wmax" title="日最大风=3小时最大风" class="btn btn-default" style="display: none;">订正日最大风</a>'
		+'<a id="correction_r3" title="降水量=日降水量按原来3小时雨量重新分布" class="btn btn-default" style="display: none;">订正降水量</a>'
		+'<a id="correction_10uv" title="风=日最大风与3小时风规则转换" class="btn btn-default" style="display: none;">订正风</a>'
		+'<a id="correction_rh" title="相对湿度=3小时雨量与3小时相对湿度规则转换" class="btn btn-default" style="display: none;">订正相对湿度</a>'
		+'<a id="correction_w" title="天气=3小时雨量和云量规则转换" class="btn btn-default" style="display: none;">订正天气</a>'
		+'<a id="correction_tmaxTmin1" class="btn btn-default" style="display: none;">显示日高低温比对</a>'
		+'<a id="correction_tmax2t" class="btn btn-default" style="display: none;">显示日高温气温比对</a>'
		+'<a id="correction_tmaxTmin2" class="btn btn-default" style="display: none;">显示日高低温比对</a>'
		+'<a id="correction_tmin2t" class="btn btn-default" style="display: none;">显示日低温气温比对</a>'
		+'<a id="correction_refresh" class="btn btn-default">刷新</a>'
		+'</div>'
		+'</form>';
	var div ='<div id ="ConsistencyCheckDiv" style="width:100%;height:100%;text-align: left">'
		+'<div id="correctionToolDiv"></div>'
		+'<div id="yzxjcContent" style="height:570px; overflow:scroll; overflow-x:hidden;"></div>'
		+'</div>';
	self.tab1 = $("#ConsistencyCheckPanel").html(div);
	$("#correctionToolDiv").html(form);
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建3小时气温检查列表
 */
fnCC.createTemTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="40" style="text-align:center;">3t时效</th>'
		+'<th width="40" style="text-align:center;">时效</th>'
		+'<th width="60" style="text-align:center;">日最高温</th>'
		+'<th width="40" style="text-align:center;">气温</th>'
		+'<th width="60" style="text-align:center;">日最低温</th>'
		+'<th width="180" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")";
			var checkType = data[i].checkType || ""; //检查类型
			var temHourSpan = data[i].temHourSpan || ""; //3t时效
			var maxMinTemHourSpan = data[i].maxMinTemHourSpan || ""; //高低温时效
			var dValueMaxTem = data[i].dValueMaxTem || ""; //日最高气温
			var dValueMinTem = data[i].dValueMinTem || ""; //日最低气温
			var dValueTem = data[i].dValueTem || ""; //2t气温
			tr+='<tr >' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="40" flag = "temHourSpan">'+temHourSpan+'</td>' +
				'<td width="40" flag = "maxMinTemHourSpan">'+maxMinTemHourSpan+'</td>' +
				'<td width="60" flag = "dValueMaxTem">'+dValueMaxTem+'</td>' +
				'<td width="40" flag = "dValueTem">'+dValueTem+'</td>' +
				'<td width="60" flag = "dValueMinTem">'+dValueMinTem+'</td>' +
				'<td width="180" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建高低温检查列表
 */
fnCC.createMaxMinTemTable =function (data) {
	var self = this;
	// var element = GDYB.GridProductClass.currentElement;
	var element = self.currentElement;
	var extremumName ="极值";
	switch (element){
		case "tmax":
			extremumName ="极大值";
			break;
		case "tmin":
			extremumName ="极小值";
			break;
	}
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="40" style="text-align:center;">时效</th>'
		+'<th width="60" style="text-align:center;">日最高温</th>'
		+'<th width="60" style="text-align:center;">日最低温</th>'
		+'<th width="60" style="text-align:center;">'+ extremumName +'</th>'
		+'<th width="200" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")";
			var checkType = data[i].checkType || ""; //检查类型
			var maxMinTemHourSpan = data[i].maxMinTemHourSpan || ""; //高低温时效
			var dValueMaxTem = data[i].dValueMaxTem || ""; //日最高气温
			var dValueMinTem = data[i].dValueMinTem || ""; //日最低气温
			var dValueExtremumTem = data[i].dValueExtremumTem || ""; //极值
			tr+='<tr >' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="40" flag = "maxMinTemHourSpan">'+maxMinTemHourSpan+'</td>' +
				'<td width="60" flag = "dValueMaxTem">'+dValueMaxTem+'</td>' +
				'<td width="60" flag = "dValueMinTem">'+dValueMinTem+'</td>' +
				'<td width="60" flag = "dValueExtremumTem">'+dValueExtremumTem+'</td>' +
				'<td width="200" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建降水检查列表
 */
fnCC.createRainTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="80" style="text-align:center;">日降水时效</th>'
		+'<th width="60" style="text-align:center;">日降水量</th>'
		+'<th width="80" style="text-align:center;">降水量累加值</th>'
		+'<th width="200" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")";
			var checkType = data[i].checkType || ""; //检查类型
			var hourSpanR12 = data[i].hourSpanR12; //日降水时效
			var dValueR12 = data[i].dValueR12; //日降水量
			var dValueTotal = data[i].dValueTotal; //降水量累加值
			tr+='<tr>' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="80" flag = "hourSpanR12">'+hourSpanR12+'</td>' +
				'<td width="60" flag = "dValueR12">'+dValueR12+'</td>' +
				'<td width="80" flag = "dValueTotal">'+dValueTotal+'</td>' +
				'<td width="200" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建日最大风检查列表
 */
fnCC.createWmaxTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="60" style="text-align:center;">日最大风时效</th>'
		+'<th width="40" style="text-align:center;">风最大值时效</th>'
		+'<th width="60" style="text-align:center;">日最大风速</th>'
		+'<th width="60" style="text-align:center;">日最大风向</th>'
		+'<th width="40" style="text-align:center;">风最大值风速</th>'
		+'<th width="40" style="text-align:center;">风最大值风向</th>'
		+'<th width="120" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")";
			var hourSpanWmax = data[i].hourSpanWmax || ""; //日最大风时效
			var hourSpan10uv = data[i].hourSpan10uv || ""; //风最大值时效
			var dValueWmax = data[i].dValueWmax || ""; //日最大风速
			var maxWindDiretion = data[i].maxWindDiretion || ""; //日最大风向
			var dValue10uv = data[i].dValue10uv || ""; //风最大值风速
			var w10uvWindDiretion = data[i].w10uvWindDiretion || ""; //风最大值风向
			var checkType = data[i].checkType || ""; //检查类型
			tr+='<tr >' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="60" flag = "hourSpanWmax">'+hourSpanWmax+'</td>' +
				'<td width="40" flag = "hourSpan10uv">'+hourSpan10uv+'</td>' +
				'<td width="60" flag = "dValueWmax">'+dValueWmax+'</td>' +
				'<td width="60" flag = "maxWindDiretion">'+maxWindDiretion+'</td>' +
				'<td width="40" flag = "dValue10uv">'+dValue10uv+'</td>' +
				'<td width="40" flag = "w10uvWindDiretion">'+w10uvWindDiretion+'</td>' +
				'<td width="120" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description:创建风检查列表
 */
fnCC.createWindTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="60" style="text-align:center;">日最大风时效</th>'
		+'<th width="40" style="text-align:center;">风时效</th>'
		+'<th width="60" style="text-align:center;">日最大风速</th>'
		+'<th width="60" style="text-align:center;">日最大风向</th>'
		+'<th width="40" style="text-align:center;">风速</th>'
		+'<th width="40" style="text-align:center;">风向</th>'
		+'<th width="120" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")";
			var checkType = data[i].checkType || ""; //检查类型
			var hourSpanWmax = data[i].hourSpanWmax || ""; //日最大风时效
			var hourSpan10uv = data[i].hourSpan10uv || ""; //风时效
			var dValueWmax = data[i].dValueWmax || ""; //日最大风
			var dValue10uv = data[i].dValue10uv || ""; //风
			var maxWindDiretion = data[i].maxWindDiretion || ""; //日最大风向
			var w10uvWindDiretion = data[i].w10uvWindDiretion || ""; //风向
			tr+='<tr >' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="60" flag = "hourSpanWmax">'+hourSpanWmax+'</td>' +
				'<td width="40" flag = "hourSpan10uv">'+hourSpan10uv+'</td>' +
				'<td width="60" flag = "dValueWmax">'+dValueWmax+'</td>' +
				'<td width="60" flag = "maxWindDiretion">'+maxWindDiretion+'</td>' +
				'<td width="40" flag = "dValue10uv">'+dValue10uv+'</td>' +
				'<td width="40" flag = "w10uvWindDiretion">'+w10uvWindDiretion+'</td>' +
				'<td width="120" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建相对湿度检查列表
 */
fnCC.createRHTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="70" style="text-align:center;">格点位置</th>'
		+'<th width="70" style="text-align:center;">时效</th>'
		+'<th width="70" style="text-align:center;">降水量</th>'
		+'<th width="70" style="text-align:center;">相对湿度</th>'
		+'<th width="200" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")"; //格点位置
			var checkType = data[i].checkType || ""; //检查类型
			var hourSpan = data[i].hourSpan || ""; //时效
			var dValueR3 = data[i].dValueR3 || ""; //降水量
			var dValueRH = data[i].dValueRH || ""; //相对湿度
			tr+='<tr >' +
				'<td width="70" flag = "grid">'+ grid +'</td>' +
				'<td width="70" flag = "hourSpan">'+hourSpan+'</td>' +
				'<td width="70" flag = "dValueR3">'+dValueR3+'</td>' +
				'<td width="70" flag = "dValueRH">'+dValueRH+'</td>' +
				'<td width="200" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据列表.
 * @description: 创建天气现象检查列表
 */
fnCC.createWTable =function (data) {
	var self = this;
	var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:left;">'
		+'<thead class="fixedThead">'
		+'<tr>'
		+'<th width="60" style="text-align:center;">格点位置</th>'
		+'<th width="50" style="text-align:center;">时效</th>'
		+'<th width="60" style="text-align:center;">日降水量</th>'
		+'<th width="60" style="text-align:center;">总云量</th>'
		+'<th width="70" style="text-align:center;">计算天气值</th>'
		+'<th width="70" style="text-align:center;">当前天气值</th>'
		+'<th width="110" style="text-align:center;">检查类型</th>'
		+'<th style="text-align:center;display:none;">X坐标</th>'
		+'<th style="text-align:center;display:none;">Y坐标</th>'
		+'</tr>'
		+'</thead>'
		+'<tbody class="scrollTbody">'
		+'</tbody>'
		+'</table>';
	$("#yzxjcContent").empty();
	$("#yzxjcContent").html(table);
	var container = $('#yzxjcTable tbody');
	if(data!= null && data.length>0){
		var tr = '';
		var len = data.length;
		for(var i =0; i<len;i++){
			var x = data[i].x;
			var y = data[i].y;
			var grid = "("+x + "," + y +")"; //格点位置
			var hourSpanR12 = data[i].hourSpanR12 || ""; //时效
			var dValueR12 = data[i].dValueR12; //日降水量
			var dValueTCC = data[i].dValueTCC; //总云量
			var dValueCalcWeather = data[i].dValueCalcWeather; //计算天气值
			var dValueWeather = data[i].dValueWeather; //当前天气值
			var checkType = data[i].checkType || ""; //检查类型
			tr+='<tr >' +
				'<td width="60" flag = "grid">'+ grid +'</td>' +
				'<td width="50" flag = "hourSpanR12">'+hourSpanR12+'</td>' +
				'<td width="60" flag = "dValueR12">'+dValueR12+'</td>' +
				'<td width="60" flag = "dValueTCC">'+dValueTCC+'</td>' +
				'<td width="70" flag = "dValueCalcWeather">'+dValueCalcWeather+'</td>' +
				'<td width="70" flag = "dValueWeather">'+dValueWeather+'</td>' +
				'<td width="110" flag = "checkType">'+checkType+'</td>' +
				'<td style="display:none;" flag = "x">'+x+'</td>' +
				'<td style="display:none;" flag = "y">'+y+'</td>' +
				'</tr>';
		}
		container.html(tr);
		self.trClick(container);
	}
}

/*
 ** 一致性检查
 */
/**
 * @author:POPE
 * @date:2016-11-11
 * @callback: callback - 回调函数.
 * @description: 一致性检查入口
 */
fnCC.checkConsistent =function(callback) {
	var self = this;
	self.currentElement = $("#div_element").find("button.active").attr("id");
	self.hourSpan = GDYB.GDYBPage.yubaoshixiaoTools.hourSpan;
	var msgTitle ='正在一致性检查，请稍候...';
	self.showData(msgTitle,self.hourSpan,callback);
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} temHourSpan - 3小时气温时效.
 * @param: {object} maxMinTemHourSpan - 高低温时效.
 * @callback: callback - 回调函数.
 * @description: 气温一致性检查
 */
fnCC.doTemConsistent =function(temHourSpan,maxMinTemHourSpan,callback) {
	var self =this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpan,function (dataCacheMaxTem) {
		if (!dataCacheMaxTem || !dataCacheMaxTem.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpan,function (dataCacheMinTem) {
			if (!dataCacheMinTem || !dataCacheMinTem.data){
				$.isFunction(callback)&&callback.call(null,dataArr);
				return;
			}
			dataCache.getData(makeTime, version, currentDateTime, "2t",temHourSpan,function (dataCacheTem) {
				if (dataCacheTem && dataCacheTem.data){
					var dgMaxTem = dataCacheMaxTem.data;
					var dgMinTem = dataCacheMinTem.data;
					var dgTem = dataCacheTem.data;
					var cols = dgTem.cols;
					var rows = dgTem.rows;
					for (var i = 0; i < rows; i++) {
						for (var j = 0; j < cols; j++) {
							var dValueMaxTem = dgMaxTem.getValue(0, j, i); //日最高气温
							var dValueTem = dgTem.getValue(0, j, i); //气温
							var dValueMinTem = dgMinTem.getValue(0, j, i);  //日最低气温
							var m_obj = {};
							if(dValueTem > dValueMaxTem){
								m_obj.maxMinTemHourSpan = maxMinTemHourSpan;
								m_obj.temHourSpan = temHourSpan;
								m_obj.dValueMaxTem = dValueMaxTem;
								m_obj.dValueMinTem = dValueMinTem;
								m_obj.dValueTem = dValueTem;
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.jclx = "温度要素一致性检查"; //检查类型
								m_obj.checkType = "3小时气温>日最高温度"; //检查类型
								dataArr.push(m_obj);
							}
							else if(dValueTem < dValueMinTem){
								m_obj.maxMinTemHourSpan = maxMinTemHourSpan;
								m_obj.temHourSpan = temHourSpan;
								m_obj.dValueMaxTem = dValueMaxTem;
								m_obj.dValueMinTem = dValueMinTem;
								m_obj.dValueTem = dValueTem;
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.jclx = "温度要素一致性检查"; //检查类型
								m_obj.checkType = "3小时气温<日最低温度"; //错误类型
								dataArr.push(m_obj);
							}
						}
					}
					self.temData = dataArr;
					$.isFunction(callback)&&callback.call(null,dataArr);
				}
				else{
					layer.closeAll();
					layer.alert("无气温数据！");
				}
			});
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} temHourSpan - 3小时气温时效.
 * @param: {object} hourSpan - 高低温时效.
 * @param: {object} type - 要素类型.
 * @callback: callback - 回调函数.
 * @description: 日最高气温、日最低气温一致性检查
 */
fnCC.doMaxMinTemConsistent =function(hourSpan,temHourSpan,type,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "tmax",hourSpan,function (dataCacheMaxTem) {
		if (!dataCacheMaxTem || !dataCacheMaxTem.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "tmin",hourSpan,function (dataCacheMinTem) {
			if (!dataCacheMinTem || !dataCacheMinTem.data){
				$.isFunction(callback)&&callback.call(null,dataArr);
				return;
			}
			dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpan,function (dataCacheTem) {
				if(dataCacheTem){
					var dgMaxTem = dataCacheMaxTem.data;
					var dgMinTem = dataCacheMinTem.data;
					var noDataValue = dgMaxTem.noDataValue;
					var noDataValueABS = Math.abs(noDataValue);
					if(dgMaxTem && dgMinTem){
						var cols = dgMaxTem.cols;
						var rows = dgMaxTem.rows;
						for (var i = 0; i < rows; i++) {
							for (var j = 0; j < cols; j++) {
								var dValueMaxTem = dgMaxTem.getValue(0, j, i); //日最高气温
								var dValueMinTem = dgMinTem.getValue(0, j, i); //日最低气温
								var dValueMax = noDataValueABS * -1; //极大值
								var dValueMin = noDataValueABS; //极小值
								var len = temHourSpan.length;
								for (var k = 0; k < len; k++) {
									var m_temHourSpan = temHourSpan[k];
									var dgTem = dataCacheTem[m_temHourSpan].data;
									if(!dgTem || !dgTem.grid){
										layer.alert("3小时温度无数据！");
										return;
									}
									var dValueTem = dgTem.getValue(0, j, i);
									if (dValueTem != dgTem.noDataValue) {
										if (dValueTem > dValueMax){
											dValueMax = dValueTem;
										}
										if (dValueTem < dValueMin){
											dValueMin = dValueTem;
										}
									}
								}
								var m_obj = {};
								switch (type){
									case 'tmax':
										if(dValueMaxTem < dValueMinTem){
											m_obj.maxMinTemHourSpan = hourSpan;
											m_obj.dValueExtremumTem = dValueMax; //极值
											m_obj.dValueMaxTem = dValueMaxTem;
											m_obj.dValueMinTem = dValueMinTem;
											m_obj.x = i; //格点行
											m_obj.y = j; //格点列
											m_obj.jclx = "温度要素一致性检查"; //检查类型
											m_obj.checkType = "日最高温度小于日最低温度"; //检查类型
											m_obj.displayType = 2; //日最高温度与日最低温度比较
											dataArr.push(m_obj);
											continue;
										}
										else if(dValueMaxTem < dValueMax){
											m_obj.maxMinTemHourSpan = hourSpan;
											m_obj.dValueExtremumTem = dValueMax; //极值
											m_obj.dValueMaxTem = dValueMaxTem;
											m_obj.dValueMinTem = dValueMinTem;
											m_obj.x = i; //格点行
											m_obj.y = j; //格点列
											m_obj.jclx = "温度要素一致性检查"; //检查类型
											m_obj.checkType = "日最高温度小于气温极大值"; //检查类型
											m_obj.displayType = 1; //日最高温度与气温极大值比较
											dataArr.push(m_obj);
											continue;
										}
										break;
									case 'tmin':
										if(dValueMinTem > dValueMaxTem ){
											m_obj.maxMinTemHourSpan = hourSpan;
											m_obj.dValueExtremumTem = dValueMin; //极值
											m_obj.dValueMaxTem = dValueMaxTem;
											m_obj.dValueMinTem = dValueMinTem;
											m_obj.x = i; //格点行
											m_obj.y = j; //格点列
											m_obj.jclx = "温度要素一致性检查"; //检查类型
											m_obj.checkType = "日最低温度大于日最高温度"; //检查类型
											m_obj.displayType = 3; //日最低温度与日最高温度比较
											dataArr.push(m_obj);
											continue;
										}
										else if(dValueMinTem > dValueMin){
											m_obj.maxMinTemHourSpan = hourSpan;
											m_obj.dValueExtremumTem = dValueMin; //极值
											m_obj.dValueMaxTem = dValueMaxTem;
											m_obj.dValueMinTem = dValueMinTem;
											m_obj.x = i; //格点行
											m_obj.y = j; //格点列
											m_obj.jclx = "温度要素一致性检查"; //检查类型
											m_obj.checkType = "日最低温度大于气温极小值"; //检查类型
											m_obj.displayType = 1; //日最低温度与气温极大值比较
											dataArr.push(m_obj);
											continue;
										}
										break;
								}
							}
						}
					}
					self.maxMinTemData = dataArr;
					$.isFunction(callback)&&callback.call(null,dataArr);
				}
				else{
					layer.closeAll();
					layer.alert("无气温数据！");
				}
			});

		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpanR12 - 12小时降水时效.
 * @param: {object} hourSpanR3 - 3小时降水时效.
 * @callback: callback - 回调函数.
 * @description: 日降水量一致性检查
 */
fnCC.doR12Consistent =function(hourSpanR12,hourSpanR3,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;

	dataCache.getData(makeTime, version, currentDateTime, "r12",hourSpanR12,function (dataCacheR12) {
		if (!dataCacheR12 || !dataCacheR12.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getDatas(makeTime, version, currentDateTime, "r3",hourSpanR3,function (dataCacheR3) {
			if(dataCacheR3){
				var dgR12 = dataCacheR12.data;
				var cols = dgR12.cols;
				var rows = dgR12.rows;
				for (var i = 0; i < rows; i++) {
					for (var j = 0; j < cols; j++) {
						var dValueTotal = 0.0;
						var dValueR12= dgR12.getValue(0, j, i);
						var len = hourSpanR3.length;
						for (var k = 0; k < len; k++) {
							var hourSpan = hourSpanR3[k];
							var dgR3 = dataCacheR3[hourSpan].data;
							if(!dgR3 || !dgR3.grid){
								layer.alert("降水量无数据！");
								return;
							}
							var dValueR3= dgR3.getValue(0, j, i);
							if (dValueR3 != dgR3.noDataValue && dValueR3 >= 0){
								dValueTotal += dValueR3;
							}
						}
						var D_value = Math.abs(dValueTotal - dValueR12);
						if(dValueTotal!=0.0 && D_value > 0.25){
							var m_obj ={};
							dValueTotal = dValueTotal.toFixed(1); //四舍五入保留一位小数
							m_obj.hourSpanR12 = hourSpanR12;
							m_obj.dValueR12 = dValueR12;
							m_obj.dValueTotal = dValueTotal;
							m_obj.x = i; //格点行
							m_obj.y = j; //格点列
							m_obj.jclx = "降水要素一致性检查"; //检查类型
							if(dValueR12>dValueTotal){
								m_obj.checkType = "日降水量>降水量累加值"; //检查类型
							}
							else{
								m_obj.checkType = "日降水量<降水量累加值"; //检查类型
							}
							dataArr.push(m_obj);
						}
					}
				}
				self.r12Data = dataArr;
				$.isFunction(callback)&&callback.call(null,dataArr);
			}
			else{
				layer.closeAll();
				layer.alert("无降水数据！");
			}
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpanR12 - 12小时降水时效.
 * @param: {object} hourSpanR3 - 3小时降水时效.
 * @callback: callback - 回调函数.
 * @description: 3小时降水量一致性检查
 */
fnCC.doR3Consistent =function(hourSpanR12,hourSpanR3,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;

	dataCache.getData(makeTime, version, currentDateTime, "r12",hourSpanR12,function (dataCacheR12) {
		if (!dataCacheR12 || !dataCacheR12.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getDatas(makeTime, version, currentDateTime, "r3",hourSpanR3,function (dataCacheR3) {
			if(dataCacheR3){
				var dgR12 = dataCacheR12.data;
				var cols = dgR12.cols;
				var rows = dgR12.rows;
				for (var i = 0; i < rows; i++) {
					for (var j = 0; j < cols; j++) {
						var dValueTotal = 0.0;
						var dValueR12= dgR12.getValue(0, j, i);
						var len = hourSpanR3.length;
						for (var k = 0; k < len; k++) {
							var hourSpan = hourSpanR3[k];
							var dgR3 = dataCacheR3[hourSpan].data;
							if(dgR3 || dgR3.grid){
								layer.alert("降水量无数据！");
								return;
							}
							var dValueR3= dgR3.getValue(0, j, i);
							if (dValueR3 != dgR3.noDataValue && dValueR3 >= 0){
								dValueTotal += dValueR3;
							}
						}
						// dValueTotal = dValueTotal.toFixed(1); //四舍五入保留一位小数
						var D_value = Math.abs(dValueTotal - dValueR12);
						if(dValueTotal!=0.0 && D_value > 0.2){
							var m_obj ={};
							m_obj.hourSpanR12 = hourSpanR12;
							m_obj.dValueR12 = dValueR12;
							m_obj.dValueTotal = dValueTotal;
							m_obj.x = i; //格点行
							m_obj.y = j; //格点列
							m_obj.jclx = "降水要素一致性检查"; //检查类型
							if(dValueR12>dValueTotal){
								m_obj.checkType = "日降水量>降水量累加值"; //检查类型
							}
							else{
								m_obj.checkType = "日降水量<降水量累加值"; //检查类型
							}
							dataArr.push(m_obj);
						}
					}
				}
				self.r12Data = dataArr;
				$.isFunction(callback)&&callback.call(null,dataArr);
			}
			else{
				layer.closeAll();
				layer.alert("无降水数据！");
			}
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpanWmax - 12小时风时效.
 * @param: {object} hourSpan10uv - 3小时风时效.
 * @callback: callback - 回调函数.
 * @description: 日最大风一致性检查
 */
fnCC.doWmaxConsistent =function(hourSpanWmax,hourSpan10uv,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "wmax",hourSpanWmax,function (dataCacheWmax) {
		if (!dataCacheWmax || !dataCacheWmax.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getDatas(makeTime, version, currentDateTime, "10uv",hourSpan10uv,function (dataCache10uv) {
			if (dataCache10uv){
				var dgWmax = dataCacheWmax.data;
				if(dgWmax){
					var cols = dgWmax.cols;
					var rows = dgWmax.rows;
					var noDataValue = dgWmax.noDataValue;
					var noDataValueABS = Math.abs(noDataValue);
					for (var i = 0; i < rows; i++) {
						for (var j = 0; j < cols; j++) {
							var len = hourSpan10uv.length;
							var dValueMax = noDataValueABS * -1; //极大值
							var w10uvWindDiretion = noDataValue;
							var maxHourSpan10uv ="";
							for(var k =0; k<len;k++){
								var m_hourSpan10uv = hourSpan10uv[k];
								var dg10uv = dataCache10uv[m_hourSpan10uv].data;
								if(!dg10uv || !dg10uv.grid){
									layer.alert("降水量无数据！");
									return;
								}
								var dValue10uv = dg10uv.getValue(0, j, i);
								if (dValue10uv != dValue10uv.noDataValue) {
									if (dValue10uv > dValueMax){
										dValueMax = dValue10uv;
										w10uvWindDiretion = dg10uv.getValue(1, j, i);
										maxHourSpan10uv = m_hourSpan10uv;
									}
								}
							}
							var dValueWmax = dgWmax.getValue(0, j, i); //日最大风
							var maxWindDiretion = dgWmax.getValue(1, j, i); //日最大风速风向
							var m_obj = {};
							if(dValueMax > dValueWmax){
								m_obj.hourSpanWmax = hourSpanWmax;
								m_obj.hourSpan10uv = maxHourSpan10uv;
								m_obj.dValueWmax = dValueWmax;
								m_obj.dValueMax = dValueMax;
								m_obj.maxWindDiretion = maxWindDiretion;
								m_obj.w10uvWindDiretion = w10uvWindDiretion;
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.checkType = "日最大风<3小时风最大值"; //检查类型
								dataArr.push(m_obj);
							}
						}
					}
				}
				self.wmaxData = dataArr;
				$.isFunction(callback)&&callback.call(null,dataArr);
			}
			else{
				layer.closeAll();
				layer.alert("无风数据！");
			}
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpanWmax - 12小时风时效.
 * @param: {object} hourSpan10uv - 3小时风时效.
 * @callback: callback - 回调函数.
 * @description: 3小时风一致性检查
 */
fnCC.do10uvConsistent =function(hourSpanWmax,hourSpan10uv,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "wmax",hourSpanWmax,function (dataCacheWmax) {
		if (!dataCacheWmax || !dataCacheWmax.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "10uv",hourSpan10uv,function (dataCache10uv) {
			if (dataCache10uv || dataCache10uv.data){
				var dgWmax = dataCacheWmax.data;
				var dg10uv= dataCache10uv.data;
				if(dgWmax && dg10uv){
					var cols = dg10uv.cols;
					var rows = dg10uv.rows;
					for (var i = 0; i < rows; i++) {
						for (var j = 0; j < cols; j++) {
							var dValueWmax = dgWmax.getValue(0, j, i); //日最大风
							var dValue10uv = dg10uv.getValue(0, j, i); //风
							var maxWindDiretion = dgWmax.getValue(1, j, i); //日最大风速风向
							var w10uvWindDiretion = dg10uv.getValue(1, j, i); //风速风向
							var m_obj = {};
							if(dValue10uv > dValueWmax){
								m_obj.hourSpanWmax = hourSpanWmax;
								m_obj.hourSpan10uv = hourSpan10uv;
								m_obj.dValueWmax = dValueWmax;
								m_obj.dValue10uv = dValue10uv;
								m_obj.maxWindDiretion = maxWindDiretion;
								m_obj.w10uvWindDiretion = w10uvWindDiretion;
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.checkType = "风>日最大风"; //检查类型
								dataArr.push(m_obj);
							}
						}
					}
				}
				self.w10uvData = dataArr;
				$.isFunction(callback)&&callback.call(null,dataArr);
			}
			else{
				layer.closeAll();
				layer.alert("无风数据！");
			}
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 时效.
 * @callback: callback - 回调函数.
 * @description: 相对湿度一致性检查
 */
fnCC.doRhConsistent =function(hourSpan,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "r3", hourSpan, function(dataCacheHourSpanR3){
		if (!dataCacheHourSpanR3 || !dataCacheHourSpanR3.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "rh", hourSpan, function(dataCacheHourSpanRH){
			if (dataCacheHourSpanRH || dataCacheHourSpanRH.data){
				var dgR3 = dataCacheHourSpanR3.data; //降水量
				var dgRH = dataCacheHourSpanRH.data; //相对湿度
				var rows = dgRH.rows;
				var cols = dgRH.cols;
				for (var i = 0; i < rows; i++) {
					for (var j = 0; j < cols; j++) {
						var dValueRH = dgRH.getValue(0, j, i);
						var dValueR3 = dgR3.getValue(0, j, i);
						if (dValueR3 >= 25.0) //中雨量级
						{
							if(dValueRH < 80){ //相对湿度低于80的，提到75-80。
								var m_obj={};
								m_obj.hourSpan = hourSpan;
								m_obj.dValueR3 = dValueR3;
								m_obj.dValueRH = dValueRH;
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.checkType = "降水达到中雨时，其相对湿度小于80"; //检查类型
								dataArr.push(m_obj);
							}
						}
					}
				}
				self.rhData = dataArr;
				$.isFunction(callback)&&callback.call(null,dataArr);
			}
			else{
				layer.closeAll();
				layer.alert("无风数据！");
			}
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpanR12 - 12小时降水时效.
 * @param: {object} hourSpanTCC - 12小时云量时效.
 * @callback: callback - 回调函数.
 * @description: 天气一致性检查
 */
fnCC.doWConsistent =function(hourSpanR12,hourSpanTCC,callback) {
	var self = this;
	var dataArr =[];
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	var month = new Date().getMonth() + 1;
	dataCache.getData(makeTime, version, currentDateTime, "w", hourSpanR12, function(dataCacheHourSpanWeather){
		if (!dataCacheHourSpanWeather || !dataCacheHourSpanWeather.data){
			$.isFunction(callback)&&callback.call(null,dataArr);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "r12", hourSpanR12, function(dataCacheHourSpanR12){
			if (!dataCacheHourSpanR12 || !dataCacheHourSpanR12.data){
				$.isFunction(callback)&&callback.call(null,dataArr);
				return;
			}
			dataCache.getDatas(makeTime, version, currentDateTime, "tcc", hourSpanTCC, function(dataCacheHourSpanTCC){
				if (dataCacheHourSpanTCC){
					var dgR12 = dataCacheHourSpanR12.data; //日降水量
					var dgWeather = dataCacheHourSpanWeather.data;
					var noDataValue = dgWeather.noDataValue;
					var rows = dgR12.rows;
					var cols = dgR12.cols;
					var hasTag = typeof(dgR12.tag) != "undefined";
					var tag = null;
					for (var i = 0; i < rows; i++) {
						for (var j = 0; j < cols; j++) {
							var dValueTotal = 0.0;
							var dValueR12= dgR12.getValue(0, j, i);
							var dValueWeather= dgWeather.getValue(0, j, i);
							var len = hourSpanTCC.length;
							for (var k = 0; k < len; k++) {
								var hourSpan = hourSpanTCC[k];
								var dgTCC = dataCacheHourSpanTCC[hourSpan].data; //云量
								if(!dgTCC || !dgTCC.grid){
									layer.alert("云量无数据！");
									return;
								}
								var dValueTCC= dgTCC.getValue(0, j, i);
								if (dValueTCC != dgTCC.noDataValue && dValueTCC >= 0){
									dValueTotal += dValueTCC;
								}
							}
							if (hasTag)
								tag = dgR12.tag[i][j];
							var dValueCalcWeather = self.getWeatherCode(noDataValue, dValueR12, dValueTotal, tag, month);
							// dValueTotal = dValueTotal.toFixed(1); //四舍五入保留一位小数
							if(dValueCalcWeather!=0.0 && dValueCalcWeather !=dValueWeather){
								var m_obj ={};
								m_obj.hourSpanR12 = hourSpanR12; //日降水时效
								m_obj.dValueR12 = dValueR12; //日降水量
								m_obj.dValueTCC = dValueTotal; //总云量
								m_obj.dValueCalcWeather = dValueCalcWeather; //计算天气值
								m_obj.dValueWeather = dValueWeather; //当前天气值
								m_obj.x = i; //格点行
								m_obj.y = j; //格点列
								m_obj.jclx = "降水要素一致性检查"; //检查类型
								m_obj.checkType = "日降水量+总云量->与当前天气值不相符"; //检查类型
								dataArr.push(m_obj);
							}
						}
					}
					self.wData = dataArr;
					$.isFunction(callback)&&callback.call(null,dataArr);
				}
				else{
					layer.closeAll();
					layer.alert("无云量数据！");
				}
			});
		});
	});
}
/*
 ** end
 */
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} arrayToSearch - 源数组.
 * @param: {object} obj - 对象数组.
 * @description: 查找要素
 */
fnCC.findElem = function(arrayToSearch,obj){
	var len = arrayToSearch.length;
	for(var i = len;i--;) {   //递减到0
		if(arrayToSearch[i].hourSpan== obj.hourSpan && arrayToSearch[i].dValueMaxTem== obj.dValueMaxTem && arrayToSearch[i].dValueTem== obj.dValueTem && arrayToSearch[i].dValueMinTem== obj.dValueMinTem){
			return i;
		}
	}
	return -1;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} element - 要素.
 * @description: 获取时效
 */
fnCC.getHourSpan = function(element){
	return GDYB.GDYBPage.getHourSpan(element);
};
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 时效.
 * @description: 通过12小时时效获取3小时中的4个时效
 */
fnCC.getHourSpanBy12 =function (hourSpan) {
	var result = [];
	hourSpan = parseInt(hourSpan);
	for(var i = hourSpan-9;i<=hourSpan;i+=3){
		result.push(i);
	}
	return result;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 时效.
 * @description: 通过24小时时效获取3小时中的8个时效
 */
fnCC.getHourSpanBy24 =function (hourSpan) {
	var result = [];
	hourSpan = parseInt(hourSpan);
	for(var i = hourSpan-21;i<=hourSpan;i+=3){
		result.push(i);
	}
	return result;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 时效.
 * @description: 获取12小时时效
 */
fnCC.getHourSpan12 =function (hourSpan) {
	var result = 0;
	hourSpan = parseInt(hourSpan);
	if(hourSpan<=12){
		result = 12;
	}
	else if(hourSpan>=15 && hourSpan<=24){
		result = 24;
	}
	else if(hourSpan>=27 && hourSpan<=36){
		result = 36;
	}
	else if(hourSpan>=39 && hourSpan<=48){
		result = 48;
	}
	else if(hourSpan>=51 && hourSpan<=60){
		result = 60;
	}
	else if(hourSpan>=63 && hourSpan<=72){
		result = 72;
	}
	else if(hourSpan>=75 && hourSpan<=84){
		result = 84;
	}
	else if(hourSpan>=87 && hourSpan<=96){
		result = 96;
	}
	else if(hourSpan>=99 && hourSpan<=108){
		result = 108;
	}
	else if(hourSpan>=111 && hourSpan<=120){
		result = 120;
	}
	else if(hourSpan>=123 && hourSpan<=132){
		result = 132;
	}
	else if(hourSpan>=135 && hourSpan<=144){
		result = 144;
	}
	else if(hourSpan>=147 && hourSpan<=156){
		result = 156;
	}
	else if(hourSpan>=159 && hourSpan<=168){
		result = 168;
	}
	else if(hourSpan>=171 && hourSpan<=180){
		result = 180;
	}
	else if(hourSpan>=183 && hourSpan<=192){
		result = 192;
	}
	else if(hourSpan>=195 && hourSpan<=204){
		result = 204;
	}
	else if(hourSpan>=207 && hourSpan<=216){
		result = 216;
	}
	return result;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 时效.
 * @description: 获取24小时时效
 */
fnCC.getHourSpan24 =function (hourSpan) {
	var result = 0;
	hourSpan = parseInt(hourSpan);
	if(hourSpan<=24){
		result = 24;
	}
	else if(hourSpan>=27 && hourSpan<=48){
		result = 48;
	}
	else if(hourSpan>=51 && hourSpan<=72){
		result = 72;
	}
	else if(hourSpan>=75 && hourSpan<=96){
		result = 96;
	}
	else if(hourSpan>=99 && hourSpan<=120){
		result = 120;
	}
	else if(hourSpan>=123 && hourSpan<=144){
		result = 144;
	}
	else if(hourSpan>=147 && hourSpan<=168){
		result = 168;
	}
	else if(hourSpan>=171 && hourSpan<=192){
		result = 192;
	}
	else if(hourSpan>=195 && hourSpan<=216){
		result = 216;
	}
	return result;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 检查数据.
 * @description: 注册事件
 */
fnCC._event= function(data){
	var self = this;
	var m_data = null;
	var cc = new CrossCorrection();
	$(".form-inline").undelegate('a', 'click').delegate('a', 'click',function () {
		var id = $(this).attr('id');
		var msg = layer.msg('正在订正，请稍候...', {
			icon: 1,
			time: 0
		});
		switch(id){
			case "correction_tmax" : //订正日最高温
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "2t", "tmax");
				break;
			case "correction_tmin" : //订正日最低温
				//   if(self.correctionTmaxTminType == 1 || self.correctionTmaxTminType == 2){
				//       var temHourSpan = self.getHourSpanBy24(self.hourSpan);
				//       self.correctionMaxMinTem(self.hourSpan,temHourSpan, self.currentElement,function (dataArr) {
				//           layer.close(msg);
				//           layer.alert("订正完毕!");
				//           self.showData(msgTitle,self.hourSpan);
				//       });
				//   }
				// else{
				//       cc.cal(function () {
				//           layer.close(msg);
				//           layer.alert("订正完毕!");
				//           self.showData(msgTitle,self.hourSpan);
				//       }, "2t", "tmin");
				//   }
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "2t", "tmin");
				break;
			case "correction_2t" :  //订正气温
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "tmax", "2t");
				break;
			case "correction_r12" :  //订正日降水量
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "r3", "r12");
				break;
			case "correction_wmax" :  //订正日最大风
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "10uv", "wmax");
				break;
			case "correction_r3" :  //订正降水量
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "r12", "r3");
				break;
			case "correction_10uv" :  //订正风
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "wmax", "10uv");
				break;
			case "correction_rh" :  //订正相对湿度
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "r3", "rh");
				break;
			case "correction_w" :  //订正天气现象
				cc.cal(function () {
					for(var key in CrossRelation)
						CrossRelation[key].reasonable = true;
					layer.close(msg);
					layer.alert("订正完毕!");
					self.showData(msgTitle,self.hourSpan);
				}, "r12", "w");
				break;
			case "correction_refresh" :  //刷新
				var msgTitle ='正在刷新，请稍候...';
				self.showData(msgTitle,self.hourSpan);
				break;
			case "correction_tmaxTmin1" :  //显示日高低温比对
				layer.close(msg);
				var btnElementActive = $("#btnCheckTool").find("a.active");
				if(btnElementActive.attr("id") == $(this).attr('id'))
					return;
				btnElementActive.removeClass("active");
				$(this).addClass("active");
				var msg1 = layer.msg('正在查询，请稍候...', {
					icon: 1,
					time: 0
				});
				m_data = self.filterArray("dValueMinTem","dValueMaxTem",self.maxMinTemData);
				self.createMaxMinTemTable(m_data); //添加信息列表
				self.showGrid(m_data);
				self.correctionTmaxTminType = 2;
				layer.close(msg1);
				break;
			case "correction_tmax2t" :  //显示日高温气温比对
				layer.close(msg);
				var btnElementActive = $("#btnCheckTool").find("a.active");
				if(btnElementActive.attr("id") == $(this).attr('id'))
					return;
				btnElementActive.removeClass("active");
				$(this).addClass("active");
				var msg2 = layer.msg('正在查询，请稍候...', {
					icon: 1,
					time: 0
				});
				m_data = self.filterArray("dValueExtremumTem","dValueMaxTem",self.maxMinTemData);
				self.createMaxMinTemTable(m_data); //添加信息列表
				self.showGrid(m_data);
				self.correctionTmaxTminType = 1;
				layer.close(msg2);
				break;
			case "correction_tmaxTmin2" :  //显示日高低温比对
				layer.close(msg);
				var btnElementActive = $("#btnCheckTool").find("a.active");
				if(btnElementActive.attr("id") == $(this).attr('id'))
					return;
				btnElementActive.removeClass("active");
				$(this).addClass("active");
				var msg3 = layer.msg('正在查询，请稍候...', {
					icon: 1,
					time: 0
				});
				m_data = self.filterArray("dValueMinTem","dValueMaxTem",self.maxMinTemData);
				self.createMaxMinTemTable(m_data); //添加信息列表
				self.showGrid(m_data);
				self.correctionTmaxTminType = 2;
				layer.close(msg3);
				break;
			case "correction_tmin2t" :  //显示日低温气温比对
				layer.close(msg);
				var btnElementActive = $("#btnCheckTool").find("a.active");
				if(btnElementActive.attr("id") == $(this).attr('id'))
					return;
				btnElementActive.removeClass("active");
				$(this).addClass("active");
				var msg4 = layer.msg('正在查询，请稍候...', {
					icon: 1,
					time: 0
				});
				m_data = self.filterArray("dValueMinTem","dValueExtremumTem",self.maxMinTemData);
				self.createMaxMinTemTable(m_data); //添加信息列表
				self.showGrid(m_data);
				self.correctionTmaxTminType = 1;
				layer.close(msg4);
				break;
		}
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} hourSpan - 日高低温时效.
 * @param: {object} temHourSpan - 3小时气温时效.
 * @param: {object} type - 要素类型.
 * @callback: callback - 回调函数.
 * @description: 订正日最高温、日最低温
 */
fnCC.correctionMaxMinTem =function(hourSpan,temHourSpan,type,callback) {
	var self = this;
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;
	dataCache.getData(makeTime, version, currentDateTime, "tmax",hourSpan,function (dataCacheMaxTem) {
		if (dataCacheMaxTem == null || dataCacheMaxTem.data == null){
			$.isFunction(callback)&&callback.call(null);
			return;
		}
		dataCache.getData(makeTime, version, currentDateTime, "tmin",hourSpan,function (dataCacheMinTem) {
			if (dataCacheMinTem == null || dataCacheMinTem.data == null){
				$.isFunction(callback)&&callback.call(null);
				return;
			}
			dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpan,function (dataCacheTem) {
				if(dataCacheTem !=null){
					if(dataCacheMaxTem!=null && dataCacheMinTem!=null){
						var dgMaxTem = dataCacheMaxTem.data;
						var dgMinTem = dataCacheMinTem.data;
						var noDataValue = dgMaxTem.noDataValue;
						var noDataValueABS = Math.abs(noDataValue);
						if(dgMaxTem!=null && dgMinTem!=null){
							var cols = dgMaxTem.cols;
							var rows = dgMaxTem.rows;
							for (var i = 0; i < rows; i++) {
								for (var j = 0; j < cols; j++) {
									var dValueMaxTem = dgMaxTem.getValue(0, j, i); //日最高气温
									var dValueMinTem = dgMinTem.getValue(0, j, i); //日最低气温
									var dValueMax = noDataValueABS * -1; //极大值
									var dValueMin = noDataValueABS; //极小值
									var len = temHourSpan.length;
									for (var k = 0; k < len; k++) {
										var m_temHourSpan = temHourSpan[k];
										var dgTem = dataCacheTem[m_temHourSpan].data;
										if(dgTem ==null || dgTem.grid ==null){
											layer.alert("3小时温度无数据！");
											return;
										}
										var dValueTem = dgTem.getValue(0, j, i);
										if (dValueTem != dgTem.noDataValue) {
											if (dValueTem > dValueMax){
												dValueMax = dValueTem;
											}
											if (dValueTem < dValueMin){
												dValueMin = dValueTem;
											}
										}
									}
									if(type == "tmax"){
										if(dValueMaxTem < dValueMinTem){
											if(self.correctionTmaxTminType == 2){
												dgMaxTem.setValue(0, j, i, dValueMinTem);
												continue;
											}
										}
										else if(dValueMaxTem < dValueMax){
											if(self.correctionTmaxTminType == 1){
												dgMaxTem.setValue(0, j, i, dValueMax);
												continue;
											}
										}
									}
									else if(type == "tmin"){
										if(dValueMinTem > dValueMaxTem){
											if(self.correctionTmaxTminType == 2){
												dgMinTem.setValue(0, j, i, dValueMaxTem);
												continue;
											}
										}
										else if(dValueMinTem > dValueMin){
											if(self.correctionTmaxTminType == 1){
												dgMinTem.setValue(0, j, i, dValueMin);
												continue;
											}
										}
									}
								}
							}
							if(type == "tmax"){
								dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", hourSpan, 1, dgMaxTem); //更新已修改状态
							}
							else if(type == "tmin"){
								dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", hourSpan, 1, dgMinTem); //更新已修改状态
							}
						}
					}
					$.isFunction(callback)&&callback.call(null);
				}
				else{
					layer.closeAll();
					layer.alert("无气温数据！");
				}
			});

		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @callback: callback - 回调函数.
 * @description: 订正日最高温-气温
 */
fnCC.correctionMaxTemp =function (callback) {
	var that =this;
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;

	var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
	var temHourSpans = that.getHourSpan("2t");

	var msg = layer.msg('正在订正，请稍候...', {
		icon: 1,
		time: 0
	});
	dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
		dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
			dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
				if(dataCacheTem!=null){
					var count =0;
					var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
					var yLen = temHourSpans.length; //2t时效
					for(var i =0; i<xLen; i++){
						var maxMinTemHourSpan = maxMinTemHourSpans[i];
						var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
						var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
						if(dgMaxTem!=null && dgMinTem!=null){
							var cols = dgMaxTem.cols;
							var rows = dgMaxTem.rows;
							for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
								var k = i + count;
								count++;
								if(k <= yLen){
									var temHourSpan = temHourSpans[k];
									if(dataCacheTem[temHourSpan]!=null){
										var dgTem = dataCacheTem[temHourSpan].data;
										if(dgTem!=null && dgTem.grid!=null){
											for (var m = 0; m < rows; m++) {
												for (var n = 0; n < cols; n++) {
													var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
													var dValueTem = dgTem.getValue(0, n, m);//气温
													var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温

													if(dValueMaxTem < dValueTem){
														dgMaxTem.setValue(0, n, m, dValueTem);
													}
													else if(dValueTem < dValueMinTem){
														dgMinTem.setValue(0, n, m, dValueTem);
													}
												}
											}
										}
									}
								}
							}
							//更新状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", maxMinTemHourSpan, 1, dgMaxTem); //更新已修改状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", maxMinTemHourSpan, 1, dgMinTem); //更新已修改状态
						}
					}
					$.isFunction(callback)&&callback.call(null,msg);
				}
				else{
					layer.closeAll();
					layer.alert("3小时温度无数据！");
				}
			});
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @callback: callback - 回调函数.
 * @description: 订正日最低温-气温
 */
fnCC.correctionMinTemp =function (callback) {
	var that =this;
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;

	var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
	var temHourSpans = that.getHourSpan("2t");

	var msg = layer.msg('正在订正，请稍候...', {
		icon: 1,
		time: 0
	});
	dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
		dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
			dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
				if(dataCacheTem!=null){
					var count =0;
					var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
					var yLen = temHourSpans.length; //2t时效
					for(var i =0; i<xLen; i++){
						var maxMinTemHourSpan = maxMinTemHourSpans[i];
						var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
						var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
						if(dgMaxTem!=null && dgMinTem!=null){
							var cols = dgMaxTem.cols;
							var rows = dgMaxTem.rows;
							for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
								var k = i + count;
								count++;
								if(k <= yLen){
									var temHourSpan = temHourSpans[k];
									if(dataCacheTem[temHourSpan]!=null){
										var dgTem = dataCacheTem[temHourSpan].data;
										if(dgTem!=null && dgTem.grid!=null){
											for (var m = 0; m < rows; m++) {
												for (var n = 0; n < cols; n++) {
													var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
													var dValueTem = dgTem.getValue(0, n, m);//气温
													var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温

													if(dValueMaxTem < dValueTem){
														dgMaxTem.setValue(0, n, m, dValueTem);
													}
													else if(dValueTem < dValueMinTem){
														dgMinTem.setValue(0, n, m, dValueTem);
													}
												}
											}
										}
									}
								}
							}
							//更新状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", maxMinTemHourSpan, 1, dgMaxTem); //更新已修改状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", maxMinTemHourSpan, 1, dgMinTem); //更新已修改状态
						}
					}
					$.isFunction(callback)&&callback.call(null,msg);
				}
				else{
					layer.closeAll();
					layer.alert("3小时温度无数据！");
				}
			});
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @callback: callback - 回调函数.
 * @description: 订正3小时温度
 */
fnCC.correctionTemp =function (callback) {
	var that =this;
	var dataCache = GDYB.GridProductClass.dataCache;
	var makeTime = GDYB.GridProductClass.currentMakeTime;
	var version = GDYB.GridProductClass.currentVersion;
	var currentDateTime = GDYB.GridProductClass.currentDateTime;

	var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
	var temHourSpans = that.getHourSpan("2t");

	var msg = layer.msg('正在订正，请稍候...', {
		icon: 1,
		time: 0
	});
	dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
		dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
			dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
				if(dataCacheTem!=null){
					var count =0;
					var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
					var yLen = temHourSpans.length; //2t时效
					for(var i =0; i<xLen; i++){
						var maxMinTemHourSpan = maxMinTemHourSpans[i];
						var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
						var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
						if(dgMaxTem!=null && dgMinTem!=null){
							var cols = dgMaxTem.cols;
							var rows = dgMaxTem.rows;
							for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
								var k = i + count;
								count++;
								if(k <= yLen){
									var temHourSpan = temHourSpans[k];
									if(dataCacheTem[temHourSpan]!=null){
										var dgTem = dataCacheTem[temHourSpan].data;
										if(dgTem!=null && dgTem.grid!=null){
											for (var m = 0; m < rows; m++) {
												for (var n = 0; n < cols; n++) {
													var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
													var dValueTem = dgTem.getValue(0, n, m);//气温
													var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温

													if(dValueMaxTem < dValueTem){
														dgTem.setValue(0, n, m, dValueMaxTem);
													}
													else if(dValueTem < dValueMinTem){
														dgTem.setValue(0, n, m, dValueMinTem);
													}
												}
											}
										}
									}
								}
							}
							//更新状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", maxMinTemHourSpan, 1, dgMaxTem); //更新已修改状态
							dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", maxMinTemHourSpan, 1, dgMinTem); //更新已修改状态
						}
					}
					$.isFunction(callback)&&callback.call(null,msg);
				}
				else{
					layer.closeAll();
					layer.alert("3小时温度无数据！");
				}
			});
		});
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 下拉框
 */
fnCC.showSelect =function () {
	var self = this;
	var arrMaxMinTem =[];
	var arrTem =[];
	var maxMinTemHourSpans = self.getHourSpan("tmax");
	var temHourSpans = self.getHourSpan("2t");
	var objDefault = {};
	objDefault.id = "-1";
	objDefault.text = "全部";
	arrMaxMinTem.push(objDefault);
	arrTem.push(objDefault);
	for(var i =0,l = maxMinTemHourSpans.length;i<l;i++){
		var maxMinTemHourSpan = maxMinTemHourSpans[i];
		var objMaxMinTem ={};
		objMaxMinTem.id = maxMinTemHourSpan;
		objMaxMinTem.text = maxMinTemHourSpan;
		arrMaxMinTem.push(objMaxMinTem);
	}
	for(var j =0,len = temHourSpans.length;j<len;j++){
		var objTem ={};
		var temHourSpan = temHourSpans[j];
		objTem.id = temHourSpan;
		objTem.text = temHourSpan;
		arrTem.push(objTem);
	}
	$("#selectMaxMinTem").select2({
		data: arrMaxMinTem
	});
	$("#selectTem").select2({
		data: arrTem
	});
	$("#selectMaxMinTem").on("change",function(){
		var name = "maxMinTemHourSpan";
		self.selectMaxMinTemVal  = $(this).val();
		self.showTemData(name,self.selectMaxMinTemVal,self.maxMinTemData);
	});
	$("#selectTem").on("change",function(){
		var name = "temHourSpan";
		self.selectTemVal  = $(this).val();
		self.showTemData(name,self.selectTemVal,self.temData);
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} msgTitle - 标题.
 * @param: {object} hourSpan - 时效.
 * @callback: callback - 回调函数.
 * @description: 数据显示
 */
fnCC.showData = function (msgTitle,hourSpan,callback) {
	var self = this;
	var element = self.currentElement;
	var temHourSpan = self.getHourSpanBy24(hourSpan);

	var msg = layer.msg(msgTitle, {icon: 3, time: 0});
	self.resetBtn();
	$("#yzxjcContent").empty();
	switch (element){
		case "tmax": //日最高温
			$("#correction_tmax").show();
			$("#correction_tmaxTmin1").show();
			$("#correction_tmax2t").show();
			self.doMaxMinTemConsistent(hourSpan,temHourSpan,element,function (dataArr) {
				// var m_data = self.searchArray(name,value,dataArr);
				self.createMaxMinTemTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "tmin": //日最低温
			$("#correction_tmin").show();
			$("#correction_tmaxTmin2").show();
			$("#correction_tmin2t").show();
			self.doMaxMinTemConsistent(hourSpan,temHourSpan,element,function (dataArr) {
				// var m_data = self.searchArray(name,value,dataArr);
				self.createMaxMinTemTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "2t": //气温
			$("#correction_2t").show();
			var maxMinTemHourSpan = self.getHourSpan24(hourSpan);
			self.doTemConsistent(hourSpan,maxMinTemHourSpan,function (dataArr) {
				self.createTemTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "r12": //日降水量
			$("#correction_r12").show();
			var hourSpanR3 = self.getHourSpanBy12(hourSpan);
			self.doR12Consistent(hourSpan,hourSpanR3,function (dataArr) {
				self.createRainTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "r3": //3小时降水量
			$("#correction_r3").show();
			var hourSpanR12 = self.getHourSpan12(hourSpan);
			var hourSpanR3 = self.getHourSpanBy12(hourSpanR12);
			self.doR12Consistent(hourSpanR3,hourSpanR12,function (dataArr) {
				self.createRainTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "wmax": //日最大风
			$("#correction_wmax").show();
			var hourSpan10uv = self.getHourSpanBy12(hourSpan);
			self.doWmaxConsistent(hourSpan,hourSpan10uv,function (dataArr) {
				self.createWmaxTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "10uv": //风
			$("#correction_10uv").show();
			var hourSpanWmax = self.getHourSpan12(hourSpan);
			self.do10uvConsistent(hourSpanWmax,hourSpan,function (dataArr) {
				self.createWindTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "rh": //相对湿度
			$("#correction_rh").show();
			self.doRhConsistent(hourSpan,function (dataArr) {
				self.createRHTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		case "w": //天气
			$("#correction_w").show();
			var hourSpanTCC = self.getHourSpanBy12(hourSpan);
			self.doWConsistent(hourSpan,hourSpanTCC,function (dataArr) {
				self.createWTable(dataArr); //添加信息列表
				self.showGrid(dataArr);
				layer.close(msg);
				layer.alert("总共检查出"+dataArr.length+"个格点存在问题");
				$.isFunction(callback)&&callback.call(null,dataArr);
			});
			break;
		default:
			layer.close(msg);
			layer.msg('暂时不提供一致性检查', {icon: 2, time: 2});
			break;
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 下拉框改变事件
 */
fnCC.ValueChange = function () {
	var self = this;
	var name1 = "maxMinTemHourSpan";
	var value1 = self.selectMaxMinTemVal;
	var name2 = "temHourSpan";
	var value2 = self.selectTemVal;
	var load = layer.load(2);
	var data = self.searchData = self.temData;
	if(value1!=-1 && value2!=-1){
		data = self.searchData = self.filterArray(name1,value1,name2,value2,self.temData);
		self.createTemTable(data); //添加信息列表
		self.showGrid(data);
	}
	layer.close(load);
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} name1 - 标题.
 * @param: {object} name2 - 时效.
 * @param: {object} receiveArray - 时效.
 * @description: 过滤数据
 */
fnCC.filterArray=function(name1,name2,receiveArray){
	var arrResult = [];
	var len = receiveArray.length;
	for (var i=0; i<len; i++) {
		var item = receiveArray[i];
		if(item[name1] > item[name2]) {
			arrResult.push(item);
		}
	}
	return arrResult;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} name - 标题.
 * @param: {object} value - 时效.
 * @param: {object} arrData - 时效.
 * @description: 查询数据
 */
fnCC.searchArray=function(name,value,arrData){
	var arrResult = [];
	var len = arrData.length;
	for (var i=0; i<len; i++) {
		var item = arrData[i];
		if(item[name] == value) {
			arrResult.push(item);
			continue;
		}
	}
	return arrResult;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} container - 容器.
 * @description: 初始化jqueryTable
 */
fnCC.initJqueryTable = function(container){
	var aSelected = [];
	/* Init the table */
	var tables = $(container).DataTable( {
		"bAutoWidth": true,
		"bProcessing": true,
		"asStripClasses":"even",
		"bSort":false,
		// "aaSorting": [],
		"bLengthChange":true,
		"bPaginate":true,
		"bScrollInfinite":true,
		"scrollY": "600px",
		"scrollCollapse": "true",
		"pagingType":   "simple_numbers", //simple - 只有上一页、下一页两个按钮,simple_numbers - 除了上一页、下一页两个按钮还有页数按钮，Datatables默认是这个full - 有四个按钮首页、上一页、下一页、末页,full_numbers - 除首页、上一页、下一页、末页四个按钮还有页数按钮
		"oLanguage": {
			"sLengthMenu": "每页显示: _MENU_ 条记录",
			"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "没有数据",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上一页",
				"sNext": "下一页",
				"sLast": "尾页"
			},
			"sZeroRecords": "没有检索到数据",
			"sSearch": "查询:"
		},
		"aLengthMenu": [[10, 20, 30, -1], [10]], //[[10, 20, 30, -1], [10, 25, 50, "All"]]
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			if (jQuery.inArray(aData.DT_RowId, aSelected) !== -1 ) {
				$(nRow).addClass('row_selected');
			}
			return nRow;
		},
		buttons: [
			'copy', 'excel', 'pdf'
		]
	});
	/* Click event handler */
	// $(container + ' tbody tr').on('click', function () {
	//     var id = this.id;
	//     var index = jQuery.inArray(id, aSelected);
	//     if ( index === -1 ) {
	//         aSelected.push( id );
	//     } else {
	//         aSelected.splice( index, 1 );
	//     }
	//     $(this).toggleClass('row_selected');
	// });
	return tables;
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 数据列表.
 * @description: 格点高亮
 */
fnCC.showGrid =function (data) {
	GDYB.FilterTool.flash = false;
	GDYB.FilterTool.hide();
	GDYB.FilterTool.show(data);
	if (GDYB.GridProductClass.layerAbnormalFillRangeColor != null) GDYB.GridProductClass.layerAbnormalFillRangeColor.refresh();
	if (GDYB.GridProductClass.layerFillRangeColor != null) GDYB.GridProductClass.layerFillRangeColor.refresh();
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} data - 数据列表.
 * @description: 隐藏格点高亮
 */
fnCC.hideGrid =function () {
	GDYB.FilterTool.flash = false;
	GDYB.FilterTool.hide();
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @param: {object} container - 容器.
 * @callback: callback - 回调函数.
 * @description: 预报时效切换
 */
fnCC.changeYuBaoShiXiao =function (container,callback) {
	var self = this;
	var msgTitle ='正在一致性检查，请稍候...';
	self.currentElement = $("#div_element").find("button.active").attr("id");
	$("#yzxjcContent").empty();
	// var value = self.hourSpan = container.html();
	self.hourSpan = GDYB.GDYBPage.yubaoshixiaoTools.hourSpan;
	if(GDYB.GridProductClass.isConsistencyCheck){
		self.showData(msgTitle,self.hourSpan,callback);
	}
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: tab窗口
 */
fnCC.showTab =function () {
	var self = this;
	self.tab = layer.tab({
		type: 1,
		shade: 0,
		offset: 'rb',
		area: ['600px', '600px'],
		maxmin: true,
		moveOut: true,
		zIndex : 998,
		anim:5,
		tab: [{
			title: '一致性检查',
			content: $('#ConsistencyCheckPanel').html()
		}, {
			title: '高低温检查对比',
			content: '内容2'
		}]
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 弹出框
 */
fnCC.showLayer =function (width,height,content,title,callback) {
	var self = this;
	self.checkLayer = layer.open({
		type: 1,
		title:title,
		zIndex:998,
		anim:5,//弹出动画
		offset: 'rb',
		// shadeClose:true,
		maxmin: true,
		moveOut:true,
		shade: 0,
		area: [width, height],
		content: content,
		success: function(layero, index){
			$.isFunction(callback)&&callback.call(null,layero,index);
		},
		end: function(index){
			$("#btnCheck").removeClass("active");
			GDYB.GridProductClass.isConsistencyCheck = false;
		}
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 列表点击事件
 */
fnCC.trClick = function (container) {
	// container = container ||  $('#yzxjcTable tbody');
	container.undelegate('tr', 'click');
	container.delegate('tr', 'click', function () {
		var map = GDYB.Page.curPage.map;
		var datasetGrid = GDYB.GridProductClass.datasetGrid;
		var trData ={};//存储当前行数据
		var trElementActive =  $('#yzxjcTable tbody').find("tr.active");
		trElementActive.removeClass("active");
		$(this).addClass("active");
		var tds = $(this).find("td");
		var len = tds.length;
		for(var i =len;i--;){
			var td = tds[i];
			var flag = $(td).attr("flag");
			if(flag!=null && flag!=""){
				trData[flag]= $(td).text();
			}
		}
		var x = Number(trData.x);
		var y = Number(trData.y);
		var coordinate = datasetGrid.gridToXY(y,x);
		if(GDYB.GridProductClass.layerGridMarkers != null){
			GDYB.GridProductClass.layerGridMarkers.clearMarkers();
			var size = new WeatherMap.Size(21,25);
			var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
			var icon = new WeatherMap.Icon('imgs/marker.png',size,offset);
			var lonLat = new WeatherMap.LonLat(coordinate.x,coordinate.y);
			map.setCenter(new WeatherMap.LonLat(coordinate.x, coordinate.y), 18);
			GDYB.GridProductClass.layerGridMarkers.addMarker(new WeatherMap.Marker(lonLat,icon)); //标记图层上添加标记
		}
		// $("#yubaoshixiao").find("td").removeClass("active");
		// $("#yubaoshixiao").find("#"+trData.hourSpan+"h").addClass("active");
		// GDYB.GDYBPage.yubaoshixiaoTools.hourSpan = trData.hourSpan;
		// GDYB.GDYBPage.displayGridProduct();
	});
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 重置按钮
 */
fnCC.resetBtn =function () {
	$("#correction_r12").hide();
	$("#correction_tmax").hide();
	$("#correction_tmin").hide();
	$("#correction_wmax").hide();
	$("#correction_r3").hide();
	$("#correction_2t").hide();
	$("#correction_10uv").hide();
	$("#correction_rh").hide();
	$("#correction_w").hide();
	$("#correction_tmaxTmin1").hide();
	$("#correction_tmax2t").hide();
	$("#correction_tmaxTmin2").hide();
	$("#correction_tmin2t").hide();
	$("#btnCheckTool").find("a.active").removeClass("active");
}
/**
 * @author:POPE
 * @date:2016-11-11
 * @description: 获取天气代码
 */
fnCC.getWeatherCode =function(noDataValue, dValueR12, dValueTCC, tag, month) {
	var dValueTarget = noDataValue;
	if (dValueR12 != noDataValue && dValueR12 > 0) {
		if (tag == null || tag == noDataValue || tag == 0) //雨量转换天气现象（按24小时标准），tag=1是雪，tag=0是缺省降水
		{
			if (dValueR12 < 10.0) //小雨量级
			{
				if (month < 5 || month > 9)
					dValueTarget = 7.0; //小雨
				else
					dValueTarget = 3.0; //阵雨
			}
			else if (dValueR12 < 25.0) //中雨量级
				dValueTarget = 8.0;
			else if (dValueR12 < 50.0) //大雨量级
				dValueTarget = 9.0;
			else if (dValueR12 < 100.0) //暴雨量级
				dValueTarget = 10.0;
			else if (dValueR12 < 250.0) //大暴雨量级
				dValueTarget = 11.0;
			else //特大暴雨
				dValueTarget = 12.0;
		}
		else if (tag == 1) //降雪转换天气现象（按24小时标准），tag=1是雪，tag=0是缺省降水
		{
			if (dValueR12 < 2.5)        //小雪
				dValueTarget = 14.0;
			else if (dValueR12 < 5.0)   //中雪
				dValueTarget = 15.0;
			else if (dValueR12 < 10.0)  //大雪
				dValueTarget = 16.0;
			else                        //暴雪（天气现象没有大暴雪和特大暴雪）
				dValueTarget = 17.0;
		}
		else if (tag == 2) {
			dValueTarget = 3.0; //阵雨
		}
		else if (tag == 3) {
			dValueTarget = 4.0; //雷阵雨
		}
		else if (tag == 4) {
			dValueTarget = 5.0; //冰雹
		}
		else if (tag == 5) {
			dValueTarget = 6.0; //雨夹雪
		}
		else if (tag == 6) {
			dValueTarget = 13.0; //阵雪
		}
		else if (tag == 7) {
			dValueTarget = 19.0; //冻雨
		}
	}
	else { //否则根据总云量换算，晴0=[0-30]，多云1=(30,70]，阴2=(70-100]
		if (dValueTCC != noDataValue) {
			if (dValueTCC > 70.0) {
				if (month < 6 || month > 9) //注意，夏天广西为1（多云），甘肃为2（阴）
					dValueTarget = 2.0;
				else
					dValueTarget = 1.0;
			}
			else if (dValueTCC > 30.0)
				dValueTarget = 1.0;
			else
				dValueTarget = 0.0;
		}
	}
	return dValueTarget;
}
