/**
 * @module 风险普查模块
 * @author POPE
 * @date   2017-01-18
 */
function RiskSurvey(){
	if(!(this instanceof RiskSurvey)){
		return new RiskSurvey();
	}
	this.riversData =null;
	this.shgData =null;
	this.locateTitle  = null; //定位名称
	this.stationLayer = null; //站点图层
	this.boundaryLayer = null; //边界图层
	this.riversBasicLayer =null;
	this.riversWarningLayer =null;
	this.shgBasicLayer =null;
	this.shgWarningLayer =null;
	this.nslBasicLayer =null;
	this.nslWarningLayer =null;
	this.hpBasicLayer =null;
	this.hpWarningLayer =null;
	this.drawPointLayer=null;
	this.drawPoint=null;
	this.map = null;
	this.currentAddPointId="";
    this.successdata = null;
}
var fnSurvey = RiskSurvey.prototype;
/**
 * @author:POPE
 * @date:2017-01-18
 * @param {string} locateTitle - 当前定位标题.
 * @description:启动函数
 */
fnSurvey.run = function (locateTitle) {
	var self = this;
	self.locateTitle = locateTitle;
	self.show('#menu_bd');
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} container - 面板容器.
 * @description:风险普查列表显示
 */
fnSurvey.show  = function (container) {
	var self = this;
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var html ='<div id="div-basin">'
		+'<div id="div-rivers"><div class="shTitle">'+'<中小河流>'+'<span id="addRiverPoint" style="display: inline-block;float: right;padding: 0px 15px;font-size: 14px;cursor: pointer;">'+'<添加>'+'</span></div>'
		+'<div class="btn-line2">'
		+'<button id="getRivers_Basic">中小河流域</button>'
		+'<button id="getRivers_Warning">预警点</button>'
		+'</div>'
		+'</div>'
		+'<div id="div-shg"><div class="shTitle"><山洪沟><span id="addSHGPoint" style="display: inline-block;float: right;padding: 0px 15px;font-size: 14px;cursor: pointer;">'+'<添加>'+'</span></div>'
		+'<div class="btn-line2">'
		+'<button id="getMountainTorrents_Basic">山洪沟基本情况</button>'
		+'<button id="getMountainTorrents_Warning">预警点</button>'
		+'</div>'
		+'</div>'
		+'<div id="div-nsl"><div class="shTitle"><泥石流><span id="addNSLPoint" style="display: inline-block;float: right;padding: 0px 15px;font-size: 14px;cursor: pointer;">'+'<添加>'+'</span></div>'
		+'<div class="btn-line2">'
		+'<button id="getDebrisFlow_Basic">泥石流基本情况</button>'
		+'<button id="getDebrisFlow_Warning">预警点</button>'
		+'</div>'
		+'</div>'
		+'<div id="div-hp"><div class="shTitle"><滑坡><span id="addHPPoint"  style="display: inline-block;float: right;padding: 0px 15px;font-size: 14px;cursor: pointer;">'+'<添加>'+'</span></div>'
		+'<div class="btn-line2">'
		+'<button id="getLandslips_Basic">滑坡基本情况</button>'
		+'<button id="getLandslips_Warning">预警点</button>'
		+'</div>'
		+'</div>'
		+'</div>'
		+'<div id="div-operation"><div class="shTitle"><操作></div>'
		+'<div class="btn-line1">'
		// +'<button id="isShowBoundary" class="active">边界</button>'
		+'<button id="isShowName" class="active">名称</button>'
		+'</div>'
		+'</div>';
	$(container).append(html);
	self._event();
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @description:创建所有图层 todo
 */
fnSurvey.createAllLayers =function () {
	var self = this,map = GDYB.Page.curPage.map;
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} container - 面板容器.
 * @description:添加风险普查面板
 */
fnSurvey.addRiskSurveyLayNav =function (container) {
	var self = this;
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var layNav = '<ul id="ulRiskSurvey" class="layui-nav layui-nav-tree" lay-filter="riskSurvey">'
		+'<li class="layui-nav-item layui-nav-itemed">'
		+'<a style="cursor:pointer;">中小河流</a>'
		+'<dl class="layui-nav-child">'
		+'<dd><a id="getRivers_Basic"  style="cursor:pointer;">中小河流域</a></dd>'
		+'<dd><a id="getRivers_Warning"  style="cursor:pointer;">预警点</a></dd>'
		// +'<dd><a id="getRivers_Hidden"  style="cursor:pointer;">隐患点</a></dd>'
		// +'<dd><a id="getRivers_Town"  style="cursor:pointer;">隐患乡镇点</a></dd>'
		// +'<dd><a id="getRivers_Reservoir"  style="cursor:pointer;">隐患水库</a></dd>'
		+'</dl>'
		+'</li>'
		+'<li class="layui-nav-item layui-nav-itemed">'
		+'<a style="cursor:pointer;" class="base">山洪沟</a>'
		+'<dl class="layui-nav-child">'
		+'<dd><a id="getMountainTorrents_Basic"  style="cursor:pointer;">山洪沟基本情况</a></dd>'
		+'<dd><a id="getMountainTorrents_Warning"  style="cursor:pointer;">预警点</a></dd>'
		// +'<dd><a id="getMountainTorrents_Hidden"  style="cursor:pointer;">隐患点</a></dd>'
		// +'<dd><a id="getMountainTorrents_Reservoir"  style="cursor:pointer;">隐患水库</a></dd>'
		+'</dl>'
		+'</li>'
		+'<li class="layui-nav-item layui-nav-itemed">'
		+'<a style="cursor:pointer;">泥石流</a>'
		+'<dl class="layui-nav-child">'
		+'<dd><a id="getDebrisFlow_Basic" style="cursor:pointer;">泥石流基本情况</a></dd>'
		+'<dd><a id="getDebrisFlow_Warning" style="cursor:pointer;">预警点</a></dd>'
		+'</dl>'
		+'</li>'
		+'<li class="layui-nav-item layui-nav-itemed">'
		+'<a style="cursor:pointer;">滑坡</a>'
		+'<dl class="layui-nav-child">'
		+'<dd><a id="getLandslips_Basic" style="cursor:pointer;">滑坡基本情况</a></dd>'
		+'<dd><a id="getLandslips_Warning" style="cursor:pointer;">预警点</a></dd>'
		+'</dl>'
		+'</li>'
		+'</ul>';
	$(container).append(layNav);
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @description:注册事件
 */
fnSurvey._event =function () {
	var self = this,$basin = $('#div-basin'),$rivers = $('#div-rivers'),$shg = $('#div-shg'),$nsl = $('#div-nsl'),$hp = $('#div-hp'),$operation = $('#div-operation');;
	var map=GDYB.Page.curPage.map;
	self.map =map;
	/**
	 * 普查信息点击事件
	 */
	$("#div-basin").on("click","span",function(){
		fnSurvey.currentAddPointId=$(this).attr("id");
		self.initMapClick();
	});
	$basin.undelegate("button","click").delegate("button","click",function(){
		var isActive = false,queryType = $(this).attr('id'),title = $(this).text();
		if($(this).hasClass('active')){
			$(this).removeClass('active');
			layer.closeAll();
		}
		else {
			$(this).addClass('active');
			isActive = true;
		}
		switch (queryType){
			case "getRivers_Basic": //中小河基本信息
				if(self.riversLabelLayer !=null) self.riversLabelLayer.removeAllFeatures();
				else self.riversLabelLayer= self.initLabelLayer('riversLabelLayer',map,'#9932CC');
				if(self.riversBasicLayer !=null) self.riversBasicLayer.removeAllFeatures();
				else self.riversBasicLayer= self.initLayer('riversBasicLayer',map);
				self.showBoundary(self.riversBasicLayer,queryType,title,isActive,function () {
					self.showLabel(queryType,isActive);
				});
				break;
			case "getMountainTorrents_Basic": //山洪沟基本信息
				if(self.shgLabelLayer !=null) self.shgLabelLayer.removeAllFeatures();
				else self.shgLabelLayer= self.initLabelLayer('shgLabelLayer',map,'#A52A2A');
				if(self.shgBasicLayer !=null) self.shgBasicLayer.removeAllFeatures();
				else self.shgBasicLayer= self.initLayer('shgBasicLayer',map);
				self.showBoundary(self.shgBasicLayer,queryType,title,isActive,function () {
					self.showLabel(queryType,isActive);
				});
				break;
			case "getRivers_Warning": //中小河预警点
				if(self.riversWarningLayer !=null) self.riversWarningLayer.removeAllFeatures();
				else self.riversWarningLayer= self.initLayer('riversWarningLayer',map);
				self.showPointGrid(self.riversWarningLayer,queryType,title,isActive);
				self.Edit_Warning();
				break;
			case "getMountainTorrents_Warning": //山洪沟预警点
				if(self.shgWarningLayer !=null) self.shgWarningLayer.removeAllFeatures();
				else self.shgWarningLayer= self.initLayer('shgWarningLayer',map);
				self.showPointGrid(self.shgWarningLayer,queryType,title,isActive);
				self.Edit_Warning();
				break;
			case "getDebrisFlow_Basic": //泥石流基本信息
				if(self.nslBasicLayer !=null) self.nslBasicLayer.removeAllFeatures();
				else self.nslBasicLayer= self.initLayer('nslBasicLayer',map);
				self.showPointGrid(self.nslBasicLayer,queryType,title,isActive);
				break;
			case "getDebrisFlow_Warning": //泥石流预警点
				if(self.nslWarningLayer !=null) self.nslWarningLayer.removeAllFeatures();
				else self.nslWarningLayer= self.initLayer('nslWarningLayer',map);
				self.showPointGrid(self.nslWarningLayer,queryType,title,isActive);
				self.Edit_Warning();
				break;
			case "getLandslips_Basic": //滑坡基本信息
				if(self.hpBasicLayer !=null) self.hpBasicLayer.removeAllFeatures();
				else self.hpBasicLayer= self.initLayer('hpBasicLayer',map);
				self.showPointGrid(self.hpBasicLayer,queryType,title,isActive);
				break;
			case "getLandslips_Warning": //滑坡预警点
				if(self.hpWarningLayer !=null) self.hpWarningLayer.removeAllFeatures();
				else self.hpWarningLayer= self.initLayer('hpWarningLayer',map);
				self.showPointGrid(self.hpWarningLayer,queryType,title,isActive);
				self.Edit_Warning();
				break;
		}
	});
	/**
	 * 操作点击事件
	 */
	$operation.undelegate("button","click").delegate("button","click",function(){
		var id = $(this).attr('id'),isActive = false,type =['getRivers_Basic','getMountainTorrents_Basic'];
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}
		else {
			$(this).addClass('active');
			isActive = true;
		}
		switch (id){
			case "isShowBoundary":
				break;
			case "isShowName":
				if($('#'+type[0]).hasClass('active')){
					if(self.riversLabelLayer !=null) self.riversLabelLayer.removeAllFeatures();
					else self.riversLabelLayer= self.initLabelLayer('riversLabelLayer',map,'#9932CC');
					self.showLabel(type[0],isActive);
				}
				if($('#'+type[1]).hasClass('active')){
					if(self.shgLabelLayer !=null) self.shgLabelLayer.removeAllFeatures();
					else self.shgLabelLayer= self.initLabelLayer('shgLabelLayer',map,'#A52A2A');
					self.showLabel(type[1],isActive);
				}
				break;
		}
	});
};
/*
*   编辑站点信息
* */
fnSurvey.Edit_Warning = function(){
	var self =this;
	$("body").undelegate("a","click").delegate("a","click",function(){
		var str=$(this).attr("id");
		var arr=str.split('|');
		var type=arr[0];
		var id=arr[1];
		var element = arr[2];
		fnSurvey.EditePoint(type,id,element);
		return false;
	});
};
fnSurvey.EditePoint=function(type,id,element){ // 删除与编辑山洪预警站点
	var self = this;
	var values='[{"id":"'+id+'"}]';
	var delestation = "";
	var selectByIdName="";
	var delesevice = new DataServer();
	switch(type){
		case "getRivers_Warning": // 删除中小河流站点
			delestation = "t_zhongxiaohe.delete";
			selectByIdName="getRivers_WarningById";
			break;
		case "getMountainTorrents_Warning": // 删除山洪沟站点
			delestation = "t_shanhonggou.delete";
			selectByIdName="getMountainTorrents_WarningById";
			break;
		case "getDebrisFlow_Warning": // 删除泥石流站点
			delestation = "t_nishiliu.delete";
			selectByIdName="getDebrisFlow_WarningById";
			break;
		case "getLandslips_Warning": // 删除滑坡站点
			delestation = "t_huapo.delete";
			selectByIdName="getLandslips_WarningById";
			break;
	}
	if (element == 'Delete'){ // 删除预警点信息
		delesevice.updateData(delestation,values,function(data){
			if (parseInt(data) == 1){
				alert("删除成功");
				fnSurvey.reserve_table (type);
			}else {
				alert("删除失败");
			}
		});
	};
	if(element == 'Edite'){ // 编辑预警点信息
		delesevice.queryData(selectByIdName,'{"id":"'+id+'"}',function(data){
			if (data.length > 0){
				self.addRiverPoint(type,data,id);
			}else {
				alert("获取数据失败!");
			}
		});
	}
};
fnSurvey.addRiverPoint = function (select,content,id,dx,dy) {
    var self = this;
	var id = id;
    //console.log('x坐标' + dx);
    //console.log('y坐标' + dy);
    //console.log(fnSurvey.successdata);
    $("#MapToolsDiv").css({"display": "none", "left": 400, "top": 150});
    var div = ''
         + '<div style="width: 250px;">'
         + '<div class="Warn_Move" style="width: 100%;font-family: Microsoft YaHei;font-size: 14px;background-color: rgb(249,249,249);border-bottom: 1px solid #ccc;cursor: move;overflow: hidden;">'
			 + '<span class="warning_current" style="display: inline-block;float:left;width:210px;padding:5px 14px 4px 14px;">添加站点</span>'
			 + '<span class="warning_close" title="关闭" style="display: inline-block;font-weight:bold;float:right;padding:4px 14px;cursor: pointer;">x</span>'
         + '</div>'
         + '<div class="add_select" style="font-size: 14px;font-family: Microsoft YaHei;">'
         + '<lable class="Label_Name" style="display:inline-block;padding: 18px 4px 0px 4px;font-weight: bold;">预警点名称 :</lable><input class="Warn_StatinName" type="text" style="width: 150px;padding: 2px 3px;border: 1px solid #ccc" placeholder="请输入预警点" autofocus>'
         + '<lable class="Label_Area" style="display:none;padding: 18px 4px 0px 4px;font-weight: bold;">影响面积 :</lable><input class="Warn_Area" type="text" style="width: 150px;padding: 2px 3px;border: 1px solid #ccc;display:none;" placeholder="请输入影响面积" autofocus>'
         + '<lable class="Label_LINJE" style="display:inline-block;padding: 18px 4px 0px 4px;font-weight: bold;">临界面雨量 :</lable><input class="Warn_LINJE" type="text" style="width: 150px;padding: 2px 3px;border: 1px solid #ccc" placeholder="请输入临界面雨量" autofocus>'
         + '<lable class="Label_CHUFA" style="display:none;padding: 18px 4px 0px 4px;font-weight: bold;">触发雨量 :</lable><input class="Warn_CHUFA" type="text" style="width: 150px;padding: 2px 3px;border: 1px solid #ccc;display:none;" placeholder="请输入触发雨量" autofocus>'
         + '<lable class="Label_Level" style="display:inline-block;padding: 18px 4px 0px 17px;font-weight: bold;">洪水等级 :</lable>'
         + '<select class="Warn_Level" style="width: 120px;padding: 2px 5px;">'
			 + '<option value="">' + '--请选择--' + '</option>'
			 + '<option value="1">' + '1 级' + '</option>'
			 + '<option value="2">' + '2 级' + '</option>'
			 + '<option value="3">' + '3 级' + '</option>'
         + '</select>'
         + '<lable style="display:inline-block;padding: 18px 4px 0px 27px;font-weight: bold;">时&nbsp;&nbsp;&nbsp;&nbsp;效 :</lable>'
          + '<select class="Warn_Time"  style="width: 120px;padding: 2px 5px;">'
			  + '<option value="">' + '--请选择--' + '</option>'
			  + '<option value="1">' + '1 小时' + '</option>'
			  + '<option value="3">' + '3 小时' + '</option>'
			  + '<option value="6">' + '6 小时' + '</option>'
			  + '<option value="12">' + '12 小时' + '</option>'
			  + '<option value="24">' + '24 小时' + '</option>'
          + '</select>'
          + '</div>'
          + '<div style="width: 100%;height:52px;"><button id="Warn_Submit" type="button" style="float: right;padding:2px 10px;margin: 12px 27px;cursor: pointer;">确定</button></div>'
          + '</div>';
		$('#mtsContent').html(div);
	switch (select) {
		case "addRiverPoint": // 保存中小河站点信息
			showtime();
			break;
		case "addSHGPoint": // 保存山洪沟站点信息
			$(".Label_Level").html('山洪等级 :');
			showtime();
		break;
		case "addNSLPoint": // 保存泥石流站点信息
		case "addHPPoint":	 // 保存滑坡站点信息
			$(".Label_Area").css({"display": "inline-block", "padding-left": 17,});
			$(".Warn_Area").show();
			$(".Label_CHUFA").css({"display": "inline-block", "padding-left": 17,});
			$(".Warn_CHUFA").show();
			$(".Label_Level").hide();
			$(".Warn_Level").hide();
			$(".Label_LINJE").html('有效雨量 :');
			$(".Label_LINJE").css({"padding-left": 17,})
			$(".Warn_LINJE").attr('placeholder', '请输入有效雨量');
			showtime();
		break;
		case "getRivers_Warning": // 编辑中小河流信息
			$(".Label_Name").hide();
			$(".Warn_StatinName").hide();
			$(".warning_current").html('当前站点--'+content[0].HydrologicalControlStationName);
			$(".Warn_LINJE").val(content[0].CriticalRainfall);
			$(".Warn_Level").val(content[0].FloodGrade);
			$(".Warn_Time").val(content[0].CriticalRainfallHourSpan);
			showtime();
			break;
		case "getMountainTorrents_Warning": // 编辑山洪沟信息
			$(".Label_Name").hide();
			$(".Warn_StatinName").hide();
			$(".Label_Level").html('山洪等级 :');
			$(".warning_current").html('当前站点--'+content[0].WarningPointName);
			$(".Warn_LINJE").val(content[0].CriticalRainfall);
			$(".Warn_Level").val(content[0].FloodGrade);
			$(".Warn_Time").val(content[0].CriticalRainfallHourSpan);
			showtime();
			break;
		case "getDebrisFlow_Warning": // 编辑泥石流信息
		case "getLandslips_Warning": // 编辑滑坡信息
			$(".Label_Name").hide();
			$(".Warn_StatinName").hide();
			$(".Label_Area").css({"display": "inline-block", "padding-left": 17,});
			$(".Warn_Area").show();
			$(".Label_CHUFA").css({"display": "inline-block", "padding-left": 17,});
			$(".Warn_CHUFA").show();
			$(".Label_Level").hide();
			$(".Warn_Level").hide();
			$(".Label_LINJE").html('有效雨量 :');
			$(".Label_LINJE").css({"padding-left": 17});
			$(".warning_current").html('当前站点--'+content[0].WarningPointName);
			$(".Warn_Area").val(content[0].InfluenceArea+' (平方千米)');
			$(".Warn_CHUFA").val(content[0].TriggerRainfall);
			$(".Warn_LINJE").val(content[0].EffectiveRainfall);
			$(".Warn_Time").val(content[0].TriggerRainfallHourSpan);
			showtime();
			break;
	}
	function showtime() {
		setTimeout(function () {
			$("#MapToolsDiv").show();
		}, 500);
	}
	$("#mtsContentBL").css("display", "none");
	$("#mtsContentBR").css("display", "none");
	$('.warning_close').click(function () {
		$("#MapToolsDiv").css({"display": "none"});
	});
  $("#Warn_Submit").on('click', function () { // 提交编辑和保存信息
      var warn_name = '', warn_lijie = '', warn_area = '', warn_chufa = '', warn_level = '', warn_time = '';
      warn_name = $(".Warn_StatinName").val();
      warn_lijie = $(".Warn_LINJE").val();
      warn_area = $(".Warn_Area").val();
      warn_chufa = $(".Warn_CHUFA").val();
      warn_level = $(".Warn_Level").val();
      warn_time = $(".Warn_Time").val();
      //console.log(warn_name+'--'+warn_lijie+'--'+warn_level+'--'+warn_time);
      var dataserve = new DataServer(), values = '';
      switch (select) {
		  case "addRiverPoint": // 保存中小河流站点信息
			  values = '[{"HydrologicalControlStationName":"' + warn_name + '","CriticalRainfall":"' + warn_lijie + '","FloodGrade":"' + warn_level + '","CriticalRainfallHourSpan":"' + warn_time + '"}]';
			  dataserve.updateData("t_zhongxiaohe.add", values, function (data) {
				  console.log(data);
			  if (data.length > 0) {
				  alert("保存成功");
			  } else {
				  alert("保存失败");
			  }
			});
			break;
		  case "addSHGPoint": // 保存山洪沟站点信息
				values = '[{"WarningPointName":"' + warn_name + '","CriticalRainfall":"' + warn_lijie + '","FloodGrade":"' + warn_level + '","CriticalRainfallHourSpan":"' + warn_time + '"}]';
			  dataserve.updateData("t_shanhonggou.add", values, function (data) {
				  if (data.length > 0) {
					  alert("保存成功");
				  } else {
					  alert("保存失败");
				  }
				});
			break;
		  case "addNSLPoint": // 保存泥石流站点信息
			  values = '[{"WarningPointName":"' + warn_name + '","InfluenceArea":"' + warn_area + '","EffectiveRainfall":"' + warn_lijie + '","TriggerRainfall":"' + warn_chufa + '","TriggerRainfallHourSpan":"' + warn_time + '"}]';
			  dataserve.updateData("t_nishiliu.add", values, function (data) {
				  console.log(data)
			  if (data.length > 0) {
				  alert("保存成功");
			  } else {
				  alert("保存失败");
			  }
			});
			break;
		  case "addHPPoint": // 保存滑坡站点信息
			  values = '[{"WarningPointName":"' + warn_name + '","InfluenceArea":"' + warn_area + '","EffectiveRainfall":"' + warn_lijie + '","TriggerRainfall":"' + warn_chufa + '","TriggerRainfallHourSpan":"' + warn_time + '"}]';
			  dataserve.updateData("t_huapo.add", values, function (data) {
				 if (data.length > 0) {
					 alert("保存成功");
				 } else {
					alert("保存失败");
				 }
			});
			break;
		  case "getRivers_Warning": // 修改中小河流信息
			  values = '[{"CriticalRainfall":"' + warn_lijie + '","FloodGrade":"' + warn_level + '","CriticalRainfallHourSpan":"' + warn_time + '","id":"'+id+'"}]';
			  dataserve.updateData("t_zhongxiaohe.update", values, function (data) {
				  console.log(data);
				  if (data > 0) {
					  alert("保存成功");
					  fnSurvey.reserve_table ("getRivers_Warning");
				  } else {
					  alert("保存失败");
				  }
			  });
			  break;
		  case "getMountainTorrents_Warning": // 保存修改山洪沟信息
			  values = '[{"CriticalRainfall":"' + warn_lijie + '","FloodGrade":"' + warn_level + '","CriticalRainfallHourSpan":"' + warn_time + '","id":"'+id+'"}]';
			  dataserve.updateData("t_shanhonggou.update", values, function (data) {
				  if (data > 0) {
					  alert("保存成功");
					  fnSurvey.reserve_table ("getMountainTorrents_Warning");
				  } else {
					  alert("保存失败");
				  }
			  });
			  break;
		  case "getDebrisFlow_Warning": // 保存修改泥石流信息
			  values = '[{"InfluenceArea":"' + warn_area + '","EffectiveRainfall":"' + warn_lijie + '","TriggerRainfall":"'+warn_chufa+'","TriggerRainfallHourSpan":"' + warn_time + '","id":"'+id+'"}]';
			  dataserve.updateData("t_nishiliu.update", values, function (data) {
				  if (data > 0) {
					  alert("保存成功");
					  fnSurvey.reserve_table ("getDebrisFlow_Warning");
				  } else {
					  alert("保存失败");
				  }
			  });
			  break;
		  case "getLandslips_Warning": // 保存修改滑坡信息
			  values = '[{"InfluenceArea":"' + warn_area + '","EffectiveRainfall":"' + warn_lijie + '","TriggerRainfall":"'+warn_chufa+'","TriggerRainfallHourSpan":"' + warn_time + '","id":"'+id+'"}]';
			  dataserve.updateData("t_huapo.update", values, function (data) {
				  //console.log(data);
				  if (data > 0) {
					  alert("保存成功");
					  fnSurvey.reserve_table ("getLandslips_Warning");
				  } else {
					  alert("保存失败");
				  }
			  });
			  break;
		}
    $("#MapToolsDiv").hide();
  });
  self.Warn_Move();
};
fnSurvey.reserve_table = function (re_type) { // 刷新表格信息
	var ds = new DataService();
	ds.getCommonData(re_type,function (data) {
		fnSurvey.showGrid(data,re_type,'预警点'); // 展示表格
	});
}
fnSurvey.Warn_Move = function () { // 添加框拖动
    $(".Warn_Move").on({
        mousedown: function(e){
            var os = $("#MapToolsDiv").offset(), dx = e.pageX-os.left, dy = e.pageY-os.top;
            $(document).on('mousemove.drag', function(e){ $("#MapToolsDiv").offset({top: e.pageY-dy, left: e.pageX-dx}); });
        },
        mouseup: function(e){ $(document).off('mousemove.drag');
        }
    });
};
fnSurvey.initMapClick=function(){
	if (this.drawPointLayer==null){
		this.drawPointLayer = new WeatherMap.Layer.Vector("drawPointLayer");
		this.drawPointLayer.style = {
			strokeColor:"#00e09e",
			fillColor:"#3de1ad",
			fillOpacity:0.4
		};
		this.drawPoint= new WeatherMap.Control.DrawFeature(this.drawPointLayer, WeatherMap.Handler.Point);
		this.map.addControl(this.drawPoint);
		this.map.addLayer(this.drawPointLayer);
		this.drawPoint.events.on({"featureadded": this.drawCompleted});
	}
	this.drawPoint.activate();
};
fnSurvey.drawCompleted = function (event) {
    var self = this;
    var geometry = event.feature.geometry;
    var dx = geometry.x;
    var dy = geometry.y;
    var url = gridServiceUrl + "services/AdminDivisionService/getLocationInfo";
    $.ajax({
        data: {"para": "{'x':" + dy + ",'y':" + dx + "}"},
        url: url,
        type: "POST",
        dataType: "json",
        success: function (data) {
            fnSurvey.successdata = data;
			fnSurvey.addRiverPoint(fnSurvey.currentAddPointId,geometry,dx,dy);
        },
        error: function (e) {
            alert("获取行政区划错误。");
        },
    });
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} container - 面板容器.
 * @description:初始化lay element,并添加监听
 */
fnSurvey.initLayElement =function (container) {
	var self = this, element = layui.element();
	alert(element);
	element.init();
	element.on(container, function(elem){ //监听导航点击
		var title = elem.text();
		var queryType = $(elem[0]).find('a').attr('id');
		$("#div_progress_title").html("正在查询,请稍候...");
		$("#div_progress").css("display", "block");
		switch (queryType){
			case 'getRivers_Basic':
			case 'getMountainTorrents_Basic':
				self.showBoundary(queryType,title);
				break;
			default:
				self.showPointGrid(queryType,title);
				break;
		}
	});
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} curLayer - 当前图层对象
 * @param: {string} queryType - 展示类型.
 * @param: {string} title - 标题.
 * @param: {string} isActive - 当前是否激活
 * @description:显示点和表格
 */
fnSurvey.showPointGrid =function (curLayer,queryType,title,isActive) {
	var self = this,map = GDYB.Page.curPage.map,ds = new DataService();
	if(isActive) {
		ds.getCommonData(queryType, function (data) {
			/**
			 * 展示表格
			 */
			self.showGrid(data, queryType, title);
			/**
			 * 要素选择
			 */
			self.addSelectFeature(map, curLayer);
			/**
			 * 展示点
			 */
			self.showPoint(curLayer, data, queryType);
		});
	}
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Array} data - 展示数据集合
 * @param: {string} queryType - 展示类型.
 * @param: {string} title - 标题.
 * @description:显示表格
 */
fnSurvey.showGrid = function (data,queryType,title){
	var self = this,layout = new Layout(),width = (document.body.clientWidth-250) +"px",height = "350px",layContainer = $('#layerDiv');
	if(queryType == "SKDetail" || queryType == "QDLSK_Warning"){
		width = (document.body.clientWidth-300) +"px";
		height = "200px";
	}
	var colProp = self.instanceTitle(queryType);
	var opts = {panel :layContainer,type:queryType};
	var layOpts ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
	//layOpts.title ='查询统计';
	layout.grid(colProp,data,opts);
	layout.showLayer(layOpts,function () {});
};

fnSurvey.showStatic= function (statis,data,staTitle,queryType,title){
	var self = this,layout = new Layout(),width = (document.body.clientWidth-250) +"px",height = "350px",layContainer = $('#layerDiv');
	var staProp = self.instanceTitle(staTitle);
	var colProp = self.instanceTitle(queryType);
	var opts = {panel :layContainer};
	opts.panel.empty();
	var layOpts ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
	layout.Statis(staProp,statis,opts);
	layout.Statis(colProp,data,opts);
	layout.showLayer(layOpts,function () {});
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} curLayer - 当前图层对象
 * @param: {string} queryType - 展示类型.
 * @param: {string} title - 标题.
 * @param: {string} isActive - 当前是否激活
 * @callback callback
 * @description:显示边界
 */
fnSurvey.showBoundary = function (curLayer,queryType,title,isActive,callback) {
	var self = this,map = GDYB.Page.curPage.map,ds = new DataService();
	if(isActive){
		self.getBoundary(queryType,function (data) {
			self.drawBound(data,curLayer,queryType);
			ds.getCommonData(queryType,function (data) {
				self.showGrid(data,queryType,title); // 展示表格
			});
			self.addSelectFeature(map,curLayer);
			$.isFunction(callback)&&callback.call(null);
		});
	}
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} queryType - 展示类型.
 * @param: {string} isActive - 当前是否激活
 * @return:
 * @description:显示标签
 */
fnSurvey.showLabel =function (queryType,isActive) {
	var self = this,curLayer;
	if(isActive){
		switch (queryType){
			case 'getRivers_Basic':  //中小河流
				curLayer = self.riversLabelLayer;
				break;
			case 'getMountainTorrents_Basic':  //山洪沟
				curLayer = self.shgLabelLayer;
				break;
		}
		self.getBoundary(queryType,function (data) {
			self.drawLabel(data,curLayer,queryType);
		});
	}
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} type - 表头类型.
 * @returns: {Object} titles
 * @description:实例化表格表头
 */
fnSurvey.instanceTitle = function(type){
	var titles = [];
	switch(type){
		//中小河流
		case "getRivers_Basic":{  //中小河流基本情况
			titles =[
				{
					"title": "河流名称",
					"data": "rivername"
				},{
					"title": "河流代码",
					"data": "rivercode"
				},{
					"title": "面积(平方千米)",
					"data": "area"
				},{
					"title": "纬度",
					"data": "latitude"
				},{
					"title": "经度",
					"data": "longitude"
				},{
					"title": "水文站",
					"data": "HydrologicalStation"
				},{
					"title": "雨量站",
					"data": "RainfallStation"
				},{
					"title": "面雨量计算方法",
					"data": "RainfallCalculation"
				}
			]
		}
			break;
		case "getRivers_Warning":{
			titles =[
				{
					"title": "预警点名称",
					"data": "HydrologicalControlStationName"
				},{
					"title": "市",
					"data": "HydrologicalControlStationCity"
				},{
					"title": "县",
					"data": "HydrologicalControlStationCounty"
				},{
					"title": "纬度",
					"data": "HydrologicalControlStationLatitude"
				},{
					"title": "经度",
					"data": "HydrologicalControlStationLongitude"
				},{
					"title": "洪水等级",
					"data": "FloodGrade"
				},{
					"title": "时效",
					"data": "CriticalRainfallHourSpan"
				},{
					"title": "临界面雨量",
					"data": "CriticalRainfall"
				},{
					"title":'操作',
				},
			]
		}
			break;
		//山洪沟
		case "getMountainTorrents_Basic":{
			titles =[
				{
					"title": "山洪沟名称",
					"data": "name"
				},{
					"title": "山洪沟代码",
					"data": "code"
				},{
					"title": "面积(平方千米)",
					"data": "area"
				},{
					"title": "纬度",
					"data": "latitude"
				},{
					"title": "经度",
					"data": "longitude"
				},{
					"title": "水文站",
					"data": "HydrologicalStation"
				},{
					"title": "雨量站",
					"data": "RainfallStation"
				},{
					"title": "面雨量计算方法",
					"data": "RainfallCalculation"
				}
			]
		}
			break;
		case "getMountainTorrents_Warning":{
			titles =[
				{
					"title": "预警点名称",
					"data": "WarningPointName"
				},{
					"title": "市",
					"data": "WarningPointCity"
				},{
					"title": "县",
					"data": "WarningPointCounty"
				},{
					"title": "纬度",
					"data": "WarningPointLatitude"
				},{
					"title": "经度",
					"data": "WarningPointLongitude"
				},{
					"title": "山洪等级",
					"data": "FloodGrade"
				},{
					"title": "时效",
					"data": "CriticalRainfallHourSpan"
				},{
					"title": "临界面雨量",
					"data": "CriticalRainfall"
				},{
					"title":'操作',
				},
			]
		}
			break;
		//泥石流
		case "getDebrisFlow_Basic":{
		titles =[
			{
				"title": "泥石流沟名",
				"data": "name"
			},{
				"title": "泥石流沟代码",
				"data": "code"
			},{
				"title": "面积(平方千米)",
				"data": "area"
			},{
				"title": "纬度",
				"data": "latitude"
			},{
				"title": "经度",
				"data": "longitude"
			},{
				"title": "水文站",
				"data": "HydrologicalStation"
			},{
				"title": "雨量站",
				"data": "RainfallStation"
			},{
				"title": "面雨量计算方法",
				"data": "RainfallCalculation"
			}
		]
	}
		    break;
		case "getDebrisFlow_Warning":{
			titles =[
				{
					"title": "预警点名称",
					"data": "WarningPointName"
				},{
					"title": "市",
					"data": "WarningPointCity"
				},{
					"title": "县",
					"data": "WarningPointCounty"
				},{
					"title": "纬度",
					"data": "WarningPointLatitude"
				},{
					"title": "经度",
					"data": "WarningPointLongitude"
				},{
					"title": "影响面积(平方千米)",
					"data": "InfluenceArea"
				},{
					"title": "有效雨量",
					"data": "EffectiveRainfall"
				},{
					"title": "时效",
					"data": "TriggerRainfallHourSpan"
				},{
					"title": "触发雨量",
					"data": "TriggerRainfall"
				},{
					"title":'操作',
				},
			]
		}
			break;
		//滑坡
		case "getLandslips_Basic":{//中小河水库
			titles =[
				{
					"title": "滑坡名称",
					"data": "name"
				},{
					"title": "滑坡代码",
					"data": "code"
				},{
					"title": "流域面积(平方千米)",
					"data": "area"
				},{
					"title": "纬度",
					"data": "latitude"
				},{
					"title": "经度",
					"data": "longitude"
				},{
					"title": "水文站",
					"data": "HydrologicalStation"
				},{
					"title": "雨量站",
					"data": "RainfallStation"
				}, {
					"title": "面雨量计算方法",
					"data": "RainfallCalculation"
				}
			]
		}
			break;
		case "getLandslips_Warning":{
			titles =[
				{
					"title": "预警点名称",
					"data": "WarningPointName"
				},{
					"title": "市",
					"data": "WarningPointCity"
				},{
					"title": "县",
					"data": "WarningPointCounty"
				},{
					"title": "纬度",
					"data": "WarningPointLatitude"
				},{
					"title": "经度",
					"data": "WarningPointLongitude"
				},{
					"title": "影响面积(平方千米)",
					"data": "InfluenceArea"
				},{
					"title": "有效雨量",
					"data": "EffectiveRainfall"
				},{
					"title": "时效",
					"data": "TriggerRainfallHourSpan"
				},{
					"title": "触发雨量",
					"data": "TriggerRainfall"
				},{
					"title":'操作',
				},
			]
		}
			break;
		case "QDLSK_Warning":{
			titles =[
				{
					"title": "报警点名称",
					"data": "Station_Name"
				},{
					"title": "所在市",
					"data": "City"
				},{
					"title": "纬度",
					"data": "Lat"
				},{
					"title": "经度",
					"data": "Lon"
				},{
					"title": "报警类型",
					"data": "wName"
				},{
					"title": "报警时间",
					"data": "addtime"
				},{
					"title": "最大报超警值",
					"data": "wValue"
				}
			]
		}
			break;
		case "QDLSK_Statis":{
			titles =[
				{
					"cTitle": "统计概览",
				},{
					"title": "地级市",
					"data": "Station_Name",
				},{
					"title": "蓝色报警",
					"data": "blue"
				},{
					"title": "黄色报警",
					"data": "yellow"
				},{
					"title": "橙色报警",
					"data": "orange"
				},{
					"title": "红色报警",
					"data": "red"
				}
			]
		}
			break;
		case "SKZL_AQI":{
			titles =[
				{
					"title": "城市",
					"data": "stationName"
				},{
					"title": "AQI",
					"data": "AQI"
				},{
					"title": "PM2.5",
					"data": "PM25"
				},{
					"title": "PM10",
					"data": "PM10"
				},{
					"title": "臭氧",
					"data": "O3"
				},{
					"title": "二氧化硫",
					"data": "SO2"
				},{
					"title": "一氧化碳",
					"data": "CO"
				},{
					"title": "二氧化氮",
					"data": "NO2"
				}
			]
		}
			break;
		case "SKDetail":{
			titles =[
				{
					"title": "超警站点名称",
					"data": "Station_Name",
				},{
					"title": "所在市",
					"data": "City"
				},{
					"title": "所在县/区",
					"data": "Cnty"
				},{
					"title": "行政编码",
					"data": "Admin_Code_CHN"
				},{
					"title": "超警值",
					"data": "wValue"
				}
			]
		}
	}
	return titles;
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} id - 图层标识.
 * @param: {Object} map - 当前地图对象
 * @return:{Object} layer
 * @description:初始化图层
 */
fnSurvey.initLayer = function (id,map) {
	var layer = new WeatherMap.Layer.Vector(id, {renderers: ["Canvas2"]});
	map.addLayer(layer);
	return layer;
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} id - 图层标识.
 * @param: {Object} map - 当前地图对象
 * @param: {string} fontColor - 标签颜色.
 * @return:{Object} layer
 * @description:初始化标签图层
 */
fnSurvey.initLabelLayer = function(id,map,fontColor){
	var strategy = new WeatherMap.Strategy.GeoText();
	fontColor = fontColor || "#f00";
	strategy.style = {
		fontFamily: "微软雅黑",
		fontColor: fontColor,
		strokeColor: "#fff",
		fontSize: "12px",
		fontWeight: 600,
		strokeWidth:1.0,
		outline:true,
		fill: false,
		stroke: false
	};
	var layer  = new WeatherMap.Layer.Vector(id, {strategies: [strategy], renderers: ["Canvas2"]});
	map.addLayer(layer);
	return layer;
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} map - 当前地图对象.
 * @param: {Object} curLayer - 当前图层对象
 * @callback callback
 * @description:添加图层要素鼠标事件
 */
fnSurvey.addSelectFeature =function (map,curLayer,callback) {
	var self = this,myTools = new dMapTools();
	var callbacks = {
		click: function (currentFeature) {
			self.featureClick(currentFeature);
		},
		clickout: function(lastFeature){
			myTools.closeMyInfoWin();
		},
		over: function(currentFeature){
			self.featureClick(currentFeature);
		},
		out: function(currentFeature){}
	};
	var selectFeatures = new WeatherMap.Control.SelectFeature(curLayer, {
		callbacks: callbacks
	});
	map.addControl(selectFeatures);
	selectFeatures.activate();
	$.isFunction(callback)&&callback.call(null,selectFeatures);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} currentFeature - 当前选中的图层要素.
 * @description:添加图层要素鼠标点击事件
 */
fnSurvey.featureClick =function (currentFeature) {
	var self = this,myTools = new dMapTools();
	var contentHTML='',detailStr = '',lonLat,name;
	switch (currentFeature.data.queryMethod) {
		//中小河流域
		case  "getRivers_Basic": {
			name = self.checkEmpty(currentFeature.attributes.rivername);
			detailStr = ""
				+ "<div> 流域名称： " + name + " </div>"
				+ "<div> 流域编号： " + self.checkEmpty(currentFeature.attributes.rivercode) + " </div>"
				+ "<div> 流域面积(公顷)： " + self.checkEmpty(currentFeature.attributes.area) + " </div>"
				+ "<div> 水文站： " + self.checkEmpty(currentFeature.attributes.HydrologicalStation) + " </div>"
				+ "<div> 雨量站： " + self.checkEmpty(currentFeature.attributes.RainfallStation) + " </div>";
		}
			break;
		case  "getRivers_Warning": {
			name = self.checkEmpty(currentFeature.attributes.HydrologicalControlStationName);
			detailStr = ""
				+ "<div> 预警点名称： " + name + " </div>"
				+ "<div> 所在市： " + self.checkEmpty(currentFeature.attributes.HydrologicalControlStationCity) + " </div>"
				+ "<div> 所在县： " + self.checkEmpty(currentFeature.attributes.HydrologicalControlStationCounty) + " </div>"
				+ "<div> 洪水等级： " + self.checkEmpty(currentFeature.attributes.FloodGrade) + " </div>";
		}
			break;
		//山洪沟
		case "getMountainTorrents_Basic": {
			name = self.checkEmpty(currentFeature.attributes.name);
			detailStr = ""
				+ "<div> 山洪沟名称： " + name + " </div>"
				+ "<div> 山洪沟代码： " + self.checkEmpty(currentFeature.attributes.code) + " </div>"
				+ "<div> 流域面积(平方千米)： " + self.checkEmpty(currentFeature.attributes.area) + " </div>"
				+ "<div> 水文站： " + self.checkEmpty(currentFeature.attributes.HydrologicalStation) + " </div>"
				+ "<div> 雨量站： " + self.checkEmpty(currentFeature.attributes.RainfallStation) + " </div>";
		}
			break;
		case "getMountainTorrents_Warning": {
			name = self.checkEmpty(currentFeature.attributes.WarningPointName);
			detailStr = ""
				+ "<div> 预警点名称： " + name + " </div>"
				+ "<div> 所在市： " + self.checkEmpty(currentFeature.attributes.WarningPointCity) + " </div>"
				+ "<div> 所在县： " + self.checkEmpty(currentFeature.attributes.WarningPointCounty) + " </div>"
				+ "<div> 山洪等级： " + self.checkEmpty(currentFeature.attributes.FloodGrade) + " </div>";
		}
			break;
		//泥石流
		case  "getDebrisFlow_Basic": {
			name = self.checkEmpty(currentFeature.attributes.name);
			detailStr = ""
				+ "<div> 泥石流沟名： " + name + " </div>"
				+ "<div> 泥石流沟代码： " + self.checkEmpty(currentFeature.attributes.code) + " </div>"
				+ "<div> 流域面积(平方千米)： " + self.checkEmpty(currentFeature.attributes.area) + " </div>"
				+ "<div> 水文站： " + self.checkEmpty(currentFeature.attributes.HydrologicalStation) + " </div>"
				+ "<div> 雨量站： " + self.checkEmpty(currentFeature.attributes.RainfallStation) + " </div>";
		}
			break;
		case  "getDebrisFlow_Warning": {
			name = self.checkEmpty(currentFeature.attributes.WarningPointName);
			detailStr = ""
				+ "<div> 预警点名称： " + name + " </div>"
				+ "<div> 所在市： " + self.checkEmpty(currentFeature.attributes.WarningPointCity) + " </div>"
				+ "<div> 所在县： " + self.checkEmpty(currentFeature.attributes.WarningPointCounty) + " </div>"
				+ "<div> 影响面积(平方千米)： " + self.checkEmpty(currentFeature.attributes.InfluenceArea) + " </div>";
		}
			break;
		//滑坡
		case  "getLandslips_Basic": {
			name = self.checkEmpty(currentFeature.attributes.name);
			detailStr = ""
				+ "<div> 滑坡名称： " + name + " </div>"
				+ "<div> 滑坡代码： " + self.checkEmpty(currentFeature.attributes.code) + " </div>"
				+ "<div> 流域面积(平方千米)： " + self.checkEmpty(currentFeature.attributes.area) + " </div>"
				+ "<div> 水文站： " + self.checkEmpty(currentFeature.attributes.HydrologicalStation) + " </div>"
				+ "<div> 雨量站： " + self.checkEmpty(currentFeature.attributes.RainfallStation) + " </div>";
		}
			break;
		case  "getLandslips_Warning": {
			name = self.checkEmpty(currentFeature.attributes.WarningPointName);
			detailStr = ""
				+ "<div> 预警点名称： " + name + " </div>"
				+ "<div> 所在市： " + self.checkEmpty(currentFeature.attributes.WarningPointCity) + " </div>"
				+ "<div> 所在县： " + self.checkEmpty(currentFeature.attributes.WarningPointCounty) + " </div>"
				+ "<div> 影响面积(平方千米)： " + self.checkEmpty(currentFeature.attributes.InfluenceArea) + " </div>";
		}
			break;
	}
	lonLat = new WeatherMap.LonLat(currentFeature.data.longitude, currentFeature.data.latitude);
	contentHTML = ""
		+ "<div style='border: 1px solid #B7B7B7;font-size:12px;min-height:120px; width: 310px;max-height: 200px;overflow-y:auto;overflow-x:hidden'>"
		+ "<div style='width: 100%;height: 28px;border-bottom:1px solid #dfdfdf;font-family: Microsoft YaHei;font-size: 14px;background-color: rgb(249,249,249);'>"
		+ "<span style='font-size: 12px;color: #808080;float: left; margin: 7px 0px 0px 2px;'> ( " + name + " ) </span>"
		+ "<span id='cpButton' title='关闭' style='float: right;width: 30px;height: 25px;cursor: pointer;font-size: 18px;font-weight: bold;color: #cccccc;font-family: cursive;'><span style='margin-left: 7px;'>x</span></span>"
		+ "</div>"
		+ "<div style='float: left;width: 100%;min-height: 80px;padding:3px 5px 2px 5px;font-size: 14px;'>"
		+ detailStr
		+ "</div>"
		+ "<div class='divHR'></div>";
	+"</div>";
	myTools.windowInfoXY(lonLat, contentHTML);
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {string} type - 边界类型
 * @callback callback
 * @description:获取边界数据
 */
fnSurvey.getBoundary = function (type,callback) {
	var self= this,boundaryData= null,ds = new DataService(),url ='data/river.json';
	switch (type){
		case 'getRivers_Basic':
			url ='data/river.json';
			boundaryData= self.riversData;
			break;
		case 'getMountainTorrents_Basic':
			url ='data/shg.json';
			boundaryData= self.shgData;
			break;
	}
	if(boundaryData!=null){
		$.isFunction(callback)&&callback.call(null,boundaryData);
	}
	else{
		ds.getJSON(url,function (boundaryData) {
			if(boundaryData!=null && boundaryData!=''){
				var data = boundaryData.features;
				console.log("GetBoundary Success!");
				switch (type){
					case 'getRivers_Basic':
						self.riversData= data;
						break;
					case 'getMountainTorrents_Basic':
						self.shgData= data;
						break;
				}
				$.isFunction(callback)&&callback.call(null,data);
			}
		});
	}
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} data - 边界数据.
 * @param: {Object} curLayer - 当前图层对象
 * @param: {string} type - 边界类型
 * @description:绘制边界
 */
fnSurvey.drawBound = function (data,curLayer,type) {
	var self= this,lineVectors = [],strokeColor,fontColor,fillColor,label;
	for(var i = 0,len = data.length;i<len;i++){
		var item = data[i];
		switch (type){
			case 'getRivers_Basic':  //中小河流
				strokeColor ='#0000FF';//='#1e90ff';
				fontColor ='#ff0000';
				fillColor ='#1e90ff';
				label = item.fieldValues[2];
				break;
			case 'getMountainTorrents_Basic':  //山洪沟
				strokeColor ='#ff0000';
				fontColor ='#0000FF';
				fillColor ='#00FF00';
				label = item.fieldValues[4];
				break;
		}
		if(!self.isShowLabel) label ='';
		var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(item);
		feature.geometry.calculateBounds();
		feature.style = {
			label:label,
			fill:false,
			fillColor: fillColor,
			fillOpacity: 0.4,
			strokeColor: strokeColor,
			strokeWidth: 0.5,
			strokeOpacity:1,
			fontColor:fontColor,
			fontSize:"14px",
			pointRadius: 5.1,
			graphicWidth:32,
			graphicHeight:32
		};
		lineVectors.push(feature);
	}
	curLayer.addFeatures(lineVectors);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} data - 标签数据.
 * @param: {Object} curLayer - 当前图层对象
 * @param: {string} type - 标签类型
 * @description:绘制标签
 */
fnSurvey.drawLabel = function (data,curLayer,type) {
	var self= this,labelFeatures = [],label;
	for(var i = 0,len = data.length;i<len;i++){
		var item = data[i];
		var longitude = item.geometry.center.x;
		var latitude = item.geometry.center.y;
		switch (type){
			case 'getRivers_Basic':  //中小河流
				label = item.fieldValues[2] || "";
				break;
			case 'getMountainTorrents_Basic':  //山洪沟
				label = item.fieldValues[4] || "";
				break;
		}
		var geoTextStation = new WeatherMap.Geometry.GeoText(longitude, latitude, label);
		var labelFeature = new WeatherMap.Feature.Vector(geoTextStation);
		labelFeatures.push(labelFeature);
	}
	curLayer.addFeatures(labelFeatures);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} curLayer - 当前图层对象.
 * @param: {Object} data - 离散点数据
 * @param: {string} type - 填充类型
 * @callback callback
 * @description:显示离散点
 */
fnSurvey.showPoint = function (curLayer,data,type,callback) {
	var self = this,colors ="DarkOrchid";
	switch (type){
		default:
		case "getRivers_Warning": //中小河预警点
			colors="#FF0000";
			break;
		case "getMountainTorrents_Warning": //山洪沟预警点
			colors="#0000FF";
			break;
		case "getDebrisFlow_Basic": //泥石流基本信息
			colors="#CD00CD";
			break;
		case "getDebrisFlow_Warning": //泥石流预警点
			colors="#76EEC6";
			break;
		case "getLandslips_Basic": //滑坡基本信息
			colors="#EE7600";
			break;
		case "getLandslips_Warning": //滑坡预警点
			colors="#B23AEE";
			break;
	}
	var style = {
		fillColor:colors,
		strokeWidth:3,
		pointRadius:2.5
	};
	self.drawPoints(curLayer,style,data);
	$.isFunction(callback)&&callback.call(null);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} layer - 当前图层对象.
 * @param: {Object} style - 绘制样式
 * @param: {Object} points - 离散点对象
 * @description:绘制离散点
 */
fnSurvey.drawPoints = function (layer,style,points){
	var pointArray = [];
	var len = points.length;
	for(var i= 0;i< len;i++){
		var geometry = new WeatherMap.Geometry.Point(points[i].longitude,points[i].latitude);
		pointArray.push(geometry);
	}
	var features = [];
	var l = pointArray.length;
	for(var j= 0;j< l;j++){
		var pointFeature = new WeatherMap.Feature.Vector(pointArray[j],points[j],style);
		features.push(pointFeature);
	}
	layer.addFeatures(features);
}
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} obj - 待判断的对象.
 * @returns: {Object} - 空字符串或者原对象
 * @description:空处理
 */
fnSurvey.checkEmpty = function(obj){
	return (obj == null || typeof(obj) == 'undefined' || obj.toString() == 'undefined' || obj.toString().replace(/ /gm,'').length < 1) ? '&nbsp;--':obj;
};
/**
 * @author:POPE
 * @date:2017-01-18
 * @param: {Object} obj - 待判断的对象.
 * @returns: {Boolean} emptyFlag - ture or false
 * @description:空判断
 */
fnSurvey.judgeEmpty = function (obj){
	var emptyFlag = false;
	if(obj == null || typeof(obj) == 'undefined' || obj.toString() == 'undefined' ||  obj.toString().replace(/\s*$|^\s*!/g, "").length <1){
		emptyFlag = true;
	}
	return emptyFlag;
}
