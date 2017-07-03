/**
 * @module 风险监测报警模块
 * @author POPE
 * @date   2017-01-18
 */
function RiskMonitoring(){
	if(!(this instanceof RiskMonitoring)){
		return new RiskMonitoring();
	}
	this.locateTitle  = null; //定位名称
	this.staticLayer = null; //静态图层
	this.alarmLayer = null; //闪烁图层
}
var fnMonitoring = RiskMonitoring.prototype;
/**
 * @author:POPE
 * @date:2017-01-18
 * @param {string} locateTitle - 当前定位标题.
 * @description:启动函数
 */
fnMonitoring.run = function (locateTitle) {
	var self = this;
	self.locateTitle = locateTitle;
	self.show('#menu_bd');
	self.initMonitoring('1');
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} container - 面板容器.
 * @description:显示面板
 */
fnMonitoring.show =function (container) {
	debugger;
	var self = this;
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var tab =
		'<div id="div_datetime"><div class="shTitle"><时间></div>'
	    +'<div style="text-align:center;margin: 3px;" class="timeDiv"><div id="dateSelect" class="dateSelect"></div></div>'
	    +'</div>'
		+'</div>'
		+'<div id="div-hourSpan"><div class="shTitle"><报警时效></div>'
		+'<div class="btn-line3">'
		+'<button id="btn1Hour" class="active">1小时</button>'
		+'<button id="btn3Hour">3小时</button>'
		+'<button id="btn6Hour">6小时</button>'
		+'<button id="btn12Hour">12小时</button>'
		+'<button id="btn24Hour">24小时</button>'
		+'</div>'
		+'</div>'
		+'</div>'
		+'<div class="layui-tab-item">'
		+'<div class="btn-line2">'
		+'<button id="btnRiversThreshold">中小河流阈值</button>'
		+'<button id="btnMountainTorrentsThreshold">山洪沟阈值</button>'
		+'</div>'
		+'<div class="btn-line2">'
		+'<button id="btnDebrisFlowThreshold">泥石流阈值</button>'
		+'<button id="btnLandslipsThreshold">滑坡阈值</button>'
		+'</div>'
		+'</div>'
		+'</div>'
		+'</div>';
	$(container).append(tab);
	self.myDateSelecter = new DateSelecter(2,2);
	$("#dateSelect").append(self.myDateSelecter.div);
	$("#dateSelect").find("input").css("width","74px");

	$("<div id='sel'><select id='seltime'><option>08时</option><option>20时</option></select></div>").appendTo("#dateSelect");
	$("#dateSelect").find("div[id!=sel]").css("float","left");
	$("<div style='padding-left:100px;position: absolute;display: block;top: 50px;width: 100%;height: 30px;z-index: 999;text-align: center;font-size: 17px;font-weight:700'><div style='color: black;float: left'>中心河流</div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E1E113;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E10000;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E1E113;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E10000;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #CDC5BF;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div></div></div>").appendTo("#map_div");
	   $("<div style='padding-left:100px;position: absolute;display: block;top: 80px;width: 100%;height: 30px;z-index: 999;text-align: center;font-size: 17px;font-weight:700'><div style='color: black;float: left;margin-right: 17px'>山洪沟</div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E1E113;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E10000;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E1E113;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E10000;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #CDC5BF;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div></div></div>").appendTo("#map_div");
	$("<div style='padding-left:100px;position: absolute;display: block;top: 110px;width: 100%;height: 30px;z-index: 999;text-align: center;font-size: 17px;font-weight:700'><div style='color: black;float: left;'>地质灾害</div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #0066E1;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E10000;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #CDC5BF;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div>" +
		"<div style='height: 20px;width: 20px;background-color: #E8E8E8;float: left;margin-left: 5px'></div></div></div>").appendTo("#map_div");
	self._event();

}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} type - 预警时效：1,3,6.
 * @description:预警初始化
 */
fnMonitoring.initMonitoring =function (type) {
	var self = this,map = GDYB.Page.curPage.map;
	if(self.staticLayer!=null) self.staticLayer.removeAllFeatures();
	else self.staticLayer = self.initLayer('staticLayer',map);
	if(self.alarmLayer!=null) self.alarmLayer.removeAllFeatures();
	else self.alarmLayer = self.initAlarmLayer('alarmLayer',map);
	self.addLayerFeature(self.staticLayer,self.alarmLayer,type);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @description:响应事件
 */
fnMonitoring._event =function () {
	var self = this,$element = $('#div-element'),$hourSpan = $('#div-hourSpan');
	/**
	 * 要素事件
	 */
	$element.undelegate("button","click").delegate("button","click",function(){
		var id = $(this).attr('id');
		$element.find("button.active").removeClass('active');
		$(this).addClass('active');
		switch (id){
			case "btnSKYL":
				$hourSpan.find("button.active").removeClass('active');
				$("#btn1Hour").addClass('active');
				self.initMonitoring('1');
				break;
			case "btnDSYB":
				break;
			case "btnQPE":
				break;
			case "btnQPF":
				break;
		}
		layer.msg($(this).text());
	});
	/**
	 * 时效事件
	 */
	$hourSpan.undelegate("button","click").delegate("button","click",function(){
		var id = $(this).attr('id');
		$hourSpan.find("button.active").removeClass('active');
		$(this).addClass('active');
		debugger;
		switch (id){
			case "btn1Hour":
				self.initMonitoring('1');
				break;
			case "btn3Hour":
				self.initMonitoring('3');
				break;
			case "btn6Hour":
				self.initMonitoring('6');
				break;
			case "btn12Hour":
				self.initMonitoring('12');
				break;
			case "btn24Hour":
				self.initMonitoring('24');
				break;
		}
		layer.msg($(this).text());
	});
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} id - 图层标识.
 * @param: {Object} map - 当前地图对象
 * @returns: {Object} layer
 * @description:创建图层
 */
fnMonitoring.initLayer = function (id,map) {
	var layer = new WeatherMap.Layer.Vector(id,{renderers: ["Canvas2"]});
	map.addLayer(layer);
	return layer;
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} id - 图层标识.
 * @param: {Object} map - 当前地图对象
 * @returns: {Object} alarmLayer
 * @description:创建闪烁图层
 */
fnMonitoring.initAlarmLayer = function (id,map) {
	var alarmLayer = new WeatherMap.Layer.AnimatorVector(id,{rendererType: "GlintAnimator"}, {
		speed:1, //设置速度为每帧播放0.05的数据
		startTime:1, //开始时间为0
		frameRate:10, //每秒渲染12帧
		endTime:1 //结束时间设置为10
	});
	map.addLayer(alarmLayer);
	return alarmLayer;
}
/**
 * @author:zhanghao
 * @date:2017-06-14
 * @param: {Object} staticLayer - 静态显示图层.
 * @param: {Object} alarmLayer - 闪烁图层
 * @param: {string} type - 预警时效：1,3,6.
 * @description:添加闪烁图层要素
 */
fnMonitoring.addLayerFeature= function(staticLayer,alarmLayer,type) {
	var self = this,alarmFeatures = [],hdFeatures = [],staticFeatures = [],staticFeature,style = null;
	self.getStationData(function (data) {
		debugger;
		if(data!=null && data.length>0){
			var hoursRainfall = null;
			for(var i=0,len =data.length;i<len;i++) {
				var item = data[i];
				/*if(item.type!=1) continue;
				switch (type){
					case '1':
						hoursRainfall = item.hoursRainfall1;
						break;
					case '3':
						hoursRainfall = item.hoursRainfall3;
						break;
					case '6':
						hoursRainfall = item.hoursRainfall6;
						break;
				}
				if(hoursRainfall>=5 && hoursRainfall<8){
					style = twinkleStyles[3];
				}
				else if(hoursRainfall>=8 && hoursRainfall<11){
					style = twinkleStyles[2];
				}
				else if(hoursRainfall>=11 && hoursRainfall<14){
					style = twinkleStyles[1];
				}
				else if(hoursRainfall>=14 && hoursRainfall<=18){
					style = twinkleStyles[0];
				}*/

				//if(item.type!=1) continue;
				switch (type){
					case '1':
						hoursRainfall = item.rain1Grade;
						break;
					case '3':
						hoursRainfall = item.rain3Grade;
						break;
					case '6':
						hoursRainfall = item.rain6Grade;
						break;
					case '12':
						hoursRainfall = item.rain12Grade;
						break;
					case '24':
						hoursRainfall = item.rain24Grade;
						break;
				}
				if(hoursRainfall==9999){
					//style = twinkleStyles[3];
					continue;
				}
				else if(hoursRainfall==3){
					style = twinkleStyles[2];
				}
				else if(hoursRainfall==2){
					style = twinkleStyles[1];
				}
				else if(hoursRainfall==1){
					style = twinkleStyles[0];
				}
				/**
				 * 闪烁要素
				 */
				var geometry = new WeatherMap.Geometry.Point(item.longitude, item.latitude);
				var alarmFeature = new WeatherMap.Feature.Vector(geometry, item, style);
				alarmFeature.attributes.FEATUREID = i;
				alarmFeature.attributes.TIME = 1;
				alarmFeatures.push(alarmFeature);
				staticFeature = new WeatherMap.Feature.Vector(geometry,item,style);
				staticFeatures.push(staticFeature);
				/**
				 * 站点要素
				 */
				geometry = new WeatherMap.Geometry.Point(item.longitude, item.latitude);
				var hdFeature;
				var hdStyle = {
					// label:item.stationName,
					fontSize:"14px",
					fontColor:"blue",
					fontFamily:"宋体",
					fontWeight:"bold",
					labelXOffset:"0",
					labelYOffset:"12",
					fillColor: "yellow",
					fillOpacity: 0.8,
					strokeOpacity: 0,
					pointRadius: 2,
					display:"block"
				}
				item.hd = "hd";
				hdFeature = new WeatherMap.Feature.Vector(geometry,item,hdStyle);
				hdFeatures.push(hdFeature);
			}
		}
		alarmLayer.addFeatures(alarmFeatures);
		staticLayer.addFeatures(hdFeatures);
		staticLayer.addFeatures(staticFeatures);
		alarmLayer.animator.start();
	});
}
/**
 * @author:zhanghao
 * @date:2017-06-14
 * @callback callback
 * @description:获取实况站点数据
 */
fnMonitoring.getStationData =function (callback) {
	var self = this;
	self.getStation(function (data) {
		/*for (var i = 0,len = data.length; i < len; i++) {
			var random = self.createRandom(5,18);
			data[i].hoursRainfall1 = random.toFixed(1);
			data[i].hoursRainfall3 = random.toFixed(1);
			data[i].hoursRainfall6 = random.toFixed(1);
		}*/
		$.isFunction(callback)&&callback.call(null,data);
	});
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @callback callback
 * @description:获取站点
 */
fnMonitoring.getStation = function(callback){
	var self = this,url = gridServiceUrl+"services/GridService/getWarnStations";
	if(self.stations != null && self.stations.length>0){
		$.isFunction(callback)&&callback.call(null,self.stations);
	}
	else{
		self.requestData(url,function (data) {
			self.stations = data;
			$.isFunction(callback)&&callback.call(null,self.stations);
		});
	}
}
/**
 * @author:zhanghao
 * @date:2017-06-14
 * @param: {string} url - 请求服务地址.
 * @callback callback
 * @description:请求数据
 */
fnMonitoring.requestData = function (url,callback) {
	debugger;
	var areaCode = "37";
	var datetime = this.myDateSelecter.getCurrentTime(false);
	var dates = new Array();
	dates= datetime.split(" ")
	var hourmin = ["08:00:00","20:00:00"];
	if($("#seltime option:selected").val()=="08时"){
		datetime=dates[0]+" "+hourmin[0];
	}else{
		datetime=dates[0]+" "+hourmin[1];
	}
	//时间先写死
	datetime="2017-06-14 14:00:00";
	$.ajax({
		data:{"para":"{areaCode:'"+ areaCode + "',time:'"+datetime+"'}"},
		url:url,
		dataType:"json",
		type:"POST",
		success:function(data){
			$.isFunction(callback)&&callback.call(null,data);
		},
		error: function (e) {
			layer.alert("获取站点数据错误");
		}
	});
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Number} x - 开始数字.
 * @param: {Number} y - 结束数字.
 * @returns: {Number} x,y之间的随机数
 * @description:生成x-y之间的随机数
 */
fnMonitoring.createRandom =function (x,y) {
	var z = y - x;
	return Math.random()*z + x;
}
