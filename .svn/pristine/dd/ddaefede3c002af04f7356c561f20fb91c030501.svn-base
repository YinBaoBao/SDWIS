/**
 * @module 灾害风险管理模块
 * @author POPE
 * @date   2017-01-11
 */
function DisasterManage(){
    if(!(this instanceof DisasterManage)){
        return new DisasterManage();
    }
	this.className = "DisasterManage";
	this.ra = new RiskAssessment(); //风险评估模块
	this.rs = new RiskSurvey(); //风险普查模块
	this.rm = new RiskMonitoring(); //风险监测报警模块
	this.rzm = new RiskZoningMap(); //风险区划图谱模块
	this.rp = new RiskProduct(); //产品制作与发布
	this.ri = new RiskInspection(); //检验评估模块
	this.layout = new Layout(); //页面布局
}

var fnDM = DisasterManage.prototype = new PageBase();
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:面板渲染
 */
fnDM.renderMenu = function(){
    var self = this;
	self._event();
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:事件处理
 */
fnDM._event =function(){
	var self = this;
	self._navMenuEvent("#btnMountainFloodWarning");
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} container - 面板容器.
 * @description:导航栏事件
 */
fnDM._navMenuEvent = function (container) { 
	var self = this;
	var locateTitle = ['风险普查','监测报警','风险区划图谱','产品制作与发布','山洪预警联防','产品检验评估'];
	var layerName =['riversLabelLayer','shgLabelLayer','riversBasicLayer','riversWarningLayer','shgBasicLayer','shgWarningLayer','nslBasicLayer', 'nslWarningLayer',
		'hpBasicLayer','hpWarningLayer','stationLayer','boundaryLayer','staticLayer','alarmLayer'];
	self.layout.createLayDom();
	$(container).undelegate("a","click").delegate("a","click",function(){ 
		var cflag = true; // 是否更新页面
		if (GDYB.Page.curPage instanceof PageBase) {
			cflag = GDYB.DisasterManagePage.className !== GDYB.Page.curPage.className && !GDYB.Page.curPage.destroy();
		}
		cflag && GDYB.Page.main(GDYB.DisasterManagePage);
		self.clearLayer(layerName);
		self.layout.clear();
		if (GDYB.Page.curPage) GDYB.Page.curPage.className = undefined;
		layer.closeAll();
		var id = this.id;
		if (id=="monitoringAlarm"||id=="riskProduct"||id=="riskWarning"||id=="productInspection")
		{ 
			if (!checkLoginAndAuthority("SHYJ"))
			{
				return;
			}
		} 
		switch (id){
			case "riskSurvey": //风险普查
				self.rs.run(locateTitle[0]);
				break;
			case "monitoringAlarm": //监测报警与致灾阈值管理
				self.rm.run(locateTitle[1]);
				break;
			case "riskZoningMap": //风险区划图谱
				self.rzm.run(locateTitle[2]);
				break;
			case "riskProduct": //产品制作与发布
				self.rp.run(locateTitle[3]);
				break;
			case "riskWarning": //山洪预警联防
				self.layout.showZHYJ(locateTitle[4]);
				break;
			case "productInspection": //产品检验评估
				self.ri.run(locateTitle[5]);
				break;
		}
	});
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} names - 图层标识集合.
 * @description:清除地图图层要素
 */
fnDM.clearLayer =function (names) {
	var map = GDYB.Page.curPage.map;
	if(names!=null && names.length>0){
		for(var i=0,len = names.length;i<len;i++){
			var name = names[i];
			var layer = map.getLayersByName(name);
			if(layer!=null && layer.length>0){
				layer[0].removeAllFeatures();
			}
		}
	}
}
