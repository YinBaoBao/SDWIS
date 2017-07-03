/**
 * 风险评估模块
 * Created by POPE on 2017/1/18.
 */
function RiskAssessment(){
	if(!(this instanceof RiskAssessment)){
		return new RiskAssessment();
	}
	this.myDateSelecter1 =null;
	this.myDateSelecter2 =null;
}
var fnAssessment = RiskAssessment.prototype;
fnAssessment.run =function () {
	var self = this;
	var html ='<div id="div_datetime"><div class="title"><时段></div>'
		+'<div style="text-align:center;"><div id="dateSelect1" class="dateSelect"></div></div>'
		+'<div style="text-align:center;"><div id="dateSelect2" class="dateSelect"></div></div>'
		+'</div>'
		+'<div id="div_station"><div class="title"><站点></div>'
		+'<div class="btn_line">'
		+'<button id="btnAllStation">全部站</button>'
		+'<button id="btnNationStation">国家站</button>'
		+'<button id="btnAreaStation">区域站</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_display"><div class="title"><显示></div>'
		+'<div class="btn_line">'
		+'<button id="btnGrid">表格</button>'
		+'<button id="btnMap">地图</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_operation"><div class="title"><操作></div>'
		+'<div class="btn_line">'
		+'<button id="btnStatistics">统计</button>'
		+'<button id="btnSimulation">模拟</button>'
		+'<button id="btnAssessment">评估</button>'
		+'</div>'
		+'</div>'
		+'<div id="div_effect"><div class="title"><效果></div>'
		+'<div class="btn_line">'
		+'<button id="btnAnimation">动画</button>'
		+'<button id="btnSuspend">暂停</button>'
		+'</div>'
		+'</div>';
	$("#menu_bd").html(html);

	self.myDateSelecter1 = new DateSelecter();
	self.myDateSelecter2 = new DateSelecter();
	$("#dateSelect1").append(self.myDateSelecter1.div);
	$("#dateSelect2").append(self.myDateSelecter2.div);
}
