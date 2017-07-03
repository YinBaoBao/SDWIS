/**
 * @module 产品检验评估
 * @author POPE
 * @date   2017-04-01
 */
function RiskInspection(){
	if(!(this instanceof RiskInspection)){
		return new RiskInspection();
	}
}
var fnRI = RiskInspection.prototype;
fnRI.run =function (locateTitle) {
	var self = this;
	self.locateTitle = locateTitle;
	self.show('#menu_bd');
}
/**
 * @author:POPE
 * @date:2017-04-01
 * @param: {Object} container - 面板容器.
 * @description:显示面板
 */
fnRI.show =function (container) {
	var self = this;
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var html ='<div id="div_datetime"><div class="shTitle"><时段></div>'
		+'<div style="text-align:center;"><div id="dateSelect1" class="dateSelect"></div></div>'
		+'<div style="text-align:center;"><div id="dateSelect2" class="dateSelect"></div></div>'
		+'</div>'
		+'<div id="div_station"><div class="shTitle"><站点></div>'
		+'<div class="btn-line3">'
		+'<button id="btnAllStation">全部站</button>'
		+'<button id="btnNationStation">国家站</button>'
		+'<button id="btnAreaStation">区域站</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_display"><div class="shTitle"><显示></div>'
		+'<div class="btn-line2">'
		+'<button id="btnGrid">表格</button>'
		+'<button id="btnMap">地图</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_effect"><div class="shTitle"><效果></div>'
		+'<div class="btn-line2">'
		+'<button id="btnAnimation">动画</button>'
		+'<button id="btnSuspend">暂停</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_operation"><div class="shTitle"><操作></div>'
		+'<div class="btn-line3">'
		+'<button id="btnStatistics">统计</button>'
		+'<button id="btnSimulation">模拟</button>'
		+'<button id="btnAssessment">评估</button>'
		+'</div>'
		+'</div>';
	$(container).append(html);

	self.myDateSelecter1 = new DateSelecter();
	self.myDateSelecter2 = new DateSelecter();
	$("#dateSelect1").append(self.myDateSelecter1.div);
	$("#dateSelect2").append(self.myDateSelecter2.div);
}
