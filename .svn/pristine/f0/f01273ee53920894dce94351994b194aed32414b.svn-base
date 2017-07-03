/**
 * @module 产品制作与发布、检验评估模块
 * @author POPE
 * @date   2017-03-01
 */
function RiskProduct(){
	if(!(this instanceof RiskProduct)){
		return new RiskProduct();
	}
}
var fnProduct = RiskProduct.prototype;
/**
 * @author:POPE
 * @date:2017-03-01
 * @param {string} locateTitle - 当前定位标题.
 * @description:启动函数
 */
fnProduct.run =function (locateTitle) {
	var self = this;
	self.locateTitle = locateTitle;
	self.show('#menu_bd');
}
/**
 * @author:POPE
 * @date:2017-03-01
 * @param: {Object} container - 面板容器.
 * @description:面板显示
 */
fnProduct.show =function (container) {
	debugger;
	var gm =new GridManage();
	this.numbers=[3,6,9,12,15,18,21,24];
	var t = this;
	this.hourSpan = null;
	var isLand = true;
	var self = this;
	var areaContent="";
	var dxRadarLayer=null;
	var currentStyle=null;
	var imgbase64;
	var now=new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var day=now.getDate();
	var hour = now.getHours();
	var min = now.getMinutes();
	var areaType="4"; //默认绘制的是雷电落区，用4表示，5表示强对流落区
	var title ='<div id="div_display"><div class="locateTitle">山洪预警--><span id="locateTitle">'+self.locateTitle+'</span></div></div>';
	$(container).html(title);
	var htmlStr = ""
		+"<div id='dateSelect' style='clear:both;text-align: center;padding-left: 20px'></div>"
		+"</div>"
		// +'<div id="datetime" class="date-time-picker"><div style="margin:10px 0 10px 10px"><div id="dateSelect"><div style="border:1px solid rgba(65,65,65,0.5);border-radius: 3px;width: 210px;height: 30px;margin-left: -10px;padding-top: 4px;"><img class="dateBtn dateBtnUp" src="imgs/dateBtnUp.png"><img class="dateBtn dateBtnDown" src="imgs/dateBtnDown.png"><input style="color:#5B5B5B;height:auto;padding:2px;font-size:15px;" type="text" value="2017-04-27 17:00:00"><img class="dateBtn dateBtnUp" src="imgs/dateBtnUp.png"><img class="dateBtn dateBtnDown" src="imgs/dateBtnDown.png"></div></div></div><div style="margin-left:35%;margin-top:2px;margin-bottom:5px;"><button id="preCheck" style="cursor: pointer;display:none;" title="时段雨量查询"> 查&nbsp;&nbsp;询 </button></div></div>'
		+"<div class='btitle'></div>"
		+"<div id='div_element' class='btn_line'><button id='r3' flag='ludi'>降水量</button><button id='btndown'>下载初始场</button></div>"
		+"<div class='btitle'></div>"
		+"<div id='yubaoshixiao' class='' style='width:220px'>"
		+"</div>"
		+"<div id='yubaoshixiaoshuoming' style='height: 30px;margin:5px; font-size:12px'>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(250, 165, 26, 1.0)), to(rgba(244, 122, 32, 1.0)));background: linear-gradient(to bottom,rgba(250, 165, 26, 1.0) 0,rgba(244, 122, 32, 1.0) 100%); border-radius:20px;'/><span>已打开</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(200, 200, 255, 1.0)), to(rgba(51, 133, 255, 1.0)));background: linear-gradient(to bottom,rgba(200, 200, 255, 1.0) 0,rgba(51, 133, 255, 1.0) 100%); border-radius:20px;'/><span>已修改</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(200, 255, 200, 1.0)), to(rgba(0, 255, 0, 1.0)));background: linear-gradient(to bottom,rgba(200, 255, 200, 1.0) 0,rgba(0, 255, 0, 1.0) 100%); border-radius:20px;'/><span>已提交</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(225, 225, 235, 1.0)), to(rgba(225, 225, 235, 1.0)));background: linear-gradient(to bottom,rgba(225, 225, 235, 1.0) 0,rgba(225, 225, 235, 1.0) 100%); border-radius:20px;'/><span>无数据</span>"
		+"</div>"
		+"<div class='btitle'></div>"
		+"<div id='ZCD_Menu'>"
		+"<div id='div_toolss'>"
		+"&nbsp;暴雨:<select id='areaDate' style='height:20px; width:80px; border-radius:15px;font-size:8px;''><option value='blue_warn'>蓝色预警</option><option value='yellow_warn'>黄色预警</option><option value='orange_warn'>橙色预警</option><option value='red_warn'>红色预警</option></select>"
		+"&nbsp;<img id='img_tool_drawRadar' title='绘制降雨落区' style='cursor: pointer;width:30px;' src='imgs/img_tool_drawluoqunone1.png'/>"
		+"&nbsp;<img id='img_tool_drawSave' title='保存落区' style='cursor: pointer;width:23px' src='imgs/save.png'/>"
		+"&nbsp;<img id='img_tool_drawClear' title='清除' style='cursor: pointer;width:35px' src='imgs/img_tool_erase1.png'/>"
		+"</div>"
		+"<div id='fillInArea'>"
		+"<div class='panel panel-default' style='margin-bottom:0;'>"
		+"<div class='panel-heading' data-toggle='collapse' data-parent='#accordion' style='padding:4px;' href='#bwdd'>"
		+"<h4 class='panel-title' style='width:100%;height:100%;'>"
		+"<a href='#'>期号</a>"
		+"</h4>"
		+"</div>"
		+"<div id='bwdd' class='panel-collapse collapse in'>"
		+"<div class='panel-body' style='display:flex;flex-flow:row wrap;padding:4px;'>"
		+"<input id='forecastNoRel' type='text' style='height:25px;width:325px'/>"
		+"</div>"
		+"</div>"
		+"</div>"
		+"<div class='panel panel-default' style='margin-bottom:0;'>"
		+"<div class='panel-heading' data-toggle='collapse' data-parent='#accordion' style='padding:4px;' href='#zhfx'>"
		+"<h4 class='panel-title' style='width:100%;height:100%;'>"
		+"<a href='#'>综合分析</a>"
		+"</h4>"
		+"</div>"
		+"<div id='zhfx' class='panel-collapse collapse in'>"
		+"<div class='panel-body' style='display:flex;flex-flow:row wrap;padding:4px;'>"
		+"<textarea id='forecastSumContent' style='height:94px;width:325px'>根据未来24小时降雨预报及前期实际降雨量分析，青岛东北部、烟台南部、威海西南部降雨引发地质灾害的可能性较大（黄色预警），请当地政府及相关单位做好地质灾害防范工作。 </textarea>"
		+"</div>"
		+"</div>"
		+"</div>"
		+"</div>"
		+"<div class='btn_line' style='text-align: center'><button id='creatingPro'>生成产品</button></div>";//<button id='toCountry'>上报国家局</button>
	$(container).append(htmlStr);
	var creatingCPWin = ""
		+"<div id='CPSCWin' style='display: none;'>"
		+"<div id='cpTitle'>生成产品</div>"
		+"<div style='border: 1px #999 solid;margin: 10px auto;width: 95%;height: 220px;'><textarea id='contentText'></textarea></div>"
		+"<div class='btn_line' style='text-align: center;'><button id='commitBtn'>提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id='cancelBtn'>取消</button></div>"
		+"</div>";
	$("#map_div").append(creatingCPWin);
	self.myDateSelecter = new DateSelecter(2,2); //最小视图为天
	self.myDateSelecter.intervalMinutes = 60*24; //12小时
	$("#dateSelect").append(self.myDateSelecter.div);
	$("#dateSelect").find("input").css("width","80px");
	$("<div id='sel'><select id='selectMakeTime'><option>05时</option><option>16时</option></select></div>").appendTo("#dateSelect");
	$("#dateSelect").find("div[id!=sel]").css("float","left");
	//预报时效
	self.yubaoshixiaoTools = new YuBaoshixiaoTools($("#yubaoshixiao"), self.myDateSelecter.getCurrentTimeReal(),"",[3,6,9,12,15,18,21,24]);
	self.yubaoshixiaoTools.supportMultiSelect = true;
	//显示格点订正工具箱
	if(!$("#Panel_Tools").length>0){
		self.myPanel_Tools = new Panel_Tools($("#map_div"));
	}
	$("#Panel_Tools").css("display","block");
	$("#creatingPro").click(function(){
		//$("#CPSCWin").css("display","block");
		debugger;
		if(imgbase64=="undefined"||imgbase64==null||imgbase64==""){
			alert("请选保存落区！");
		}else{
			var imgbase = imgbase64.split(',');
			var rainimgbase = imgbase[1];
			var qihao = document.getElementById("forecastNoRel").value;
			var con=document.getElementById("forecastSumContent").value;
			if(qihao==null||qihao==""){
				alert("请输入期号!");
			}else if(con==null||con==""){
				alert("请输入综合分析!");
			}else{
				//var con="根据未来24小时降雨预报及前期实际降雨量分析，青岛东北部、烟台南部、威海西南部降雨引发地质灾害的可能性较大（黄色预警），请当地政府及相关单位做好地质灾害防范工作。";
				var  param = '{"productType":"disaster",year:'+year+',month:'+month+',day:'+day+',qihao:'+qihao+',hour:'+hour+',min:'+min+',con:'+con+',img:"'+rainimgbase+'"}';
				$.ajax({
					type:'post',
					url:host+'/WMProductManager/services/distribute/createProduct',
					data:{'para':param},
					dataType:'text',
					success: function(data){
						window.open(data,"_blank");
						$("#dmapTools").css("display","block");//去掉地图切换工具
						$("#div_layerManager").css("display","block");//去掉地图切换工具
						$("#ExportPics").css("display","block");//去掉地图切换工具
						$("#div_mapBounds").css("display","block");//去掉地图切换工具
						/*$("#map_title_div").css("display","block");//去掉标题
						 $("#div_legend").css("display","block");//去掉标题*/
						$("#prodect_tuli").remove();
						$("#prodect_title").remove();
					},
					error:function(){
						alert("生成产品失败，请检查输入项再试。");
						$("#dmapTools").css("display","block");//去掉地图切换工具
						$("#div_layerManager").css("display","block");//去掉地图切换工具
						$("#ExportPics").css("display","block");//去掉地图切换工具
						$("#div_mapBounds").css("display","block");//去掉地图切换工具
						/*$("#map_title_div").css("display","block");//去掉标题
						 $("#div_legend").css("display","block");//去掉标题*/
						$("#prodect_tuli").remove();
						$("#prodect_title").remove();
					}
				});
			}
		}

	});
	$("#cancelBtn").click(function(){
		$("#CPSCWin").css("display","none");
	});


	$("#img_tool_drawSave").click(function(){
			debugger;
			var forecastHour=$("#areaDate")[0].value;
			$("#Panel_Tools").css("display","none"); //去掉工具箱
			$("#mapSwitch_div").css("display","none");//去掉地图切换工具
			$("#dmapTools").css("display","none");//去掉地图切换工具
			$("#div_layerManager").css("display","none");//去掉地图切换工具
			$("#ExportPics").css("display","none");//去掉地图切换工具
			$("#div_mapBounds").css("display","none");//去掉地图切换工具
			$(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
			$("#map_title_div").css("display","none");
			$("#div_legend").css("display","none");
			t.clearLayer()
			$("<div id='product_title'><div style='position: absolute;display: block;top: 150px;width: 100%;height: 30px;z-index: 999;text-align: center;font-size: 30px;font-weight:700'><p style='color: blue'>山东省地址灾害气象预报</p></div>"+
				"<div style='position: absolute;display: block;top: 190px;width: 100%;height: 30px;z-index: 999;text-align: center;font-size: 20px;font-weight:700'><p style='color: blue'>发布时间"+year+"年"+month+"月"+day+"日"+hour+"时</p></div></div>").appendTo("#map_div");
			$("<div id='product_tuli'><div style='position: absolute;display: block;right:12%;bottom: 150px;width: 11%;height: 30px;z-index: 999;font-size: 18px;font-weight:700'><div style='width: 70px;height: 30px;background-color:rgb(219,213,164);float: left'></div><div style='color: blue;padding-top: 3px'>可能性较大</div></div></div>").appendTo("#map_div");
			SPDPrintBound('map_div',false,function(img) {

				console.log(img);
				imgbase64=img;
				if(imgbase64=="undefined"||imgbase64==""||imgbase64==null){
					alert("保存落区失败，请重新保存！");
				}else{
					alert("保存落区成功！");
				}

                //SPDPrintBound()
/*				var now=new Date();
				var fileName="m_"+now.format("yyyyMMdd")+"_"+forecastHour+".png";
				requestDataServlet("saveImg",fileName,areaContent,img,function(data){
					$("#Panel_Tools").css("display","block"); //去掉工具箱
					$("#mapSwitch_div").css("display","block");//去掉地图切换工具
					$(".smControlZoomIn.smButton").parent().css("display","block");//去除缩放工具条
					if (data=="-1"){
						alert("保存图片失败，请重试。");
						return false;
					}else{
						if (dxRadarLayer!=null)
						{
							dxRadarLayer.removeAllFeatures();
							dxdrawRadar.deactivate();
						}
						areaContent="";
						alert("保存落区图片成功。");
					}

				},"保存图片失败。");*/


			});

		}
	);

	$("#areaDate").change(function(){
		areaContent="";
		if (dxRadarLayer!=null)
		{
			dxRadarLayer.removeAllFeatures();
			dxdrawRadar.deactivate();
		}
		//initComput();
	});
	$("#img_tool_drawClear").click(function(){
		if (dxRadarLayer!=null)
		{
			dxRadarLayer.removeAllFeatures();
			dxdrawRadar.deactivate();
		}
		areaContent="";
	});
	$("#img_tool_drawRadar").click(function(){
		debugger;
		areaType=4;
		if (dxRadarLayer==null)
		{
			dxRadarLayer = new WeatherMap.Layer.Vector("drawRadarLayer");
			//dxRadarLayer.style = style;
			dxdrawRadar = new WeatherMap.Control.DrawFeature(dxRadarLayer, WeatherMap.Handler.PolygonFree);
			map = GDYB.Page.curPage.map;
			map.addControl(dxdrawRadar);
			map.addLayer(dxRadarLayer);
			dxdrawRadar.events.on({"featureadded": drawCompleted});
		}
		currentStyle = {
			strokeColor:"#6495ED",
			fillColor:"#00e09e",
			fillOpacity:0.3
		};
		stopDragMap();
		dxdrawRadar.activate();
	});
	$("#img_tool_drawRain").click(function(){
		debugger;
		areaType=5;
		if (dxRadarLayer==null)
		{
			dxRadarLayer = new WeatherMap.Layer.Vector("drawRadarLayer");

			//dxRadarLayer.style = style;
			dxdrawRadar = new WeatherMap.Control.DrawFeature(dxRadarLayer, WeatherMap.Handler.PolygonFree);
			map = GDYB.Page.curPage.map;
			map.addControl(dxdrawRadar);
			map.addLayer(dxRadarLayer);
			dxdrawRadar.events.on({"featureadded": drawCompleted});
		}
		currentStyle = {
			strokeColor:"#FF7F50",
			fillColor:"#5F9EA0",
			fillOpacity:0.6
		};
		stopDragMap();
		dxdrawRadar.activate();
	});

	$("#btndown").click(function(){
		debugger;
		var element="r3";
		t.hourSpan = t.numbers[0];
		onChangeDateTime();



		/*$("#div_progress_title").html("正在下载...");
		$("#div_progress").css("display", "block");
		GDYB.GridProductClass.changeElement = true;
		GDYB.GridProductClass.dataCache.clearFile(function(){
			GDYB.GridProductClass.dataCache = null; //销毁内存，否则崩溃
			//GDYB.GridProductClass.datasetGridInfos = []; //这个不销毁
		this.downCityElement(function () {
			gdyb.openElement();
		});
		});*/
	});
	$("#table_yubaoshixiao").find("td").click(function(){
         //alert($(this).text());
		debugger;
		t.hourSpan = $(this).text();
		//onChangeDateTime();
		t.clearLayer();
		t.displayGridProduct();
	});



	function onChangeDateTime(){
		//t.displayGridValueSerial(); //时间改变，同时更新图表
		//t.displayWeatherDescription(); //天气概况

		if($("#elementDiv").find($(".active")).attr("value")=="10uv"||$("#elementDiv").find($(".active")).attr("value")=="wmax"||$("#elementDiv").find($(".active")).attr("value")=="seawmax"){
			t.clearLayer();
			t.displayStream();
			$(GDYB.Page.curPage.baseLayer.div).css("filter","brightness(0.4)");
		}else{
			t.clearLayer();
			t.displayGridProduct();
			$(GDYB.Page.curPage.baseLayer.div).css("filter","brightness(1)");
		}
	}
	//清除图层
	this.clearLayer = function(){
		if(t.layerFillRangeColor != null)
			t.layerFillRangeColor.setDatasetGrid(null);
		if(t.layerStream != null)
			t.layerStream.visibility = false;
		if(GDYB.GridProductClass.layerFillRangeColor != null)
			GDYB.GridProductClass.layerFillRangeColor.setDatasetGrid(null);
		//GDYB.Page.curPage.map.removeLayer(layerFillRangeColor);
	};
	this.displayStream = function(){
		if(this.layerStream == null){
			this.layerStream = new WeatherMap.Layer.StreamLayer("layerStream");
			this.layerStream.resolution = 2;//风场流线密度
			GDYB.Page.curPage.map.addLayer(this.layerStream);
		}else{
			if(this.layerStream.visibility == false){
				this.layerStream.visibility = true;
			}
		}
		if(this.layerFillRangeColor == null){
			this.layerFillRangeColor = new WeatherMap.Layer.FillRangeColorLayer(
				"layerFillRangeColor",
				{
					"radius":40,
					"featureWeight":"value",
					"featureRadius":"geoRadius"
				}
			);
			GDYB.Page.curPage.map.addLayers([this.layerFillRangeColor]);
			this.layerFillRangeColor.alpha = 50;
			this.layerFillRangeColor.isAlwaySmooth = true;
			this.layerFillRangeColor.isSmooth = true;
			this.layerFillRangeColor.isShowLabel = false;
			this.layerFillRangeColor.items = heatMap_10uvStyles;
		}
		var maketime = GDYB.GridProductClass.currentMakeTime;
		var datetime = t.myDateSelecter.getCurrentTime(false);
		var element = $("#elementDiv").find($(".active")).attr("value");
		var houspan = t.hourSpan;
		//this.addGrid(null, '2013-01-01 01:00:00');
		this.addStream(null, "prvn", maketime, datetime, element, houspan);
	};

	this.addStream = function(recall, type, maketime, datetime, element, hourspan){
		var t = this;
		var level = 1000;
		var version = "p";
		var url = gridServiceUrl + "services/GridService/getUV";
		$.ajax({
			url: url,
			data:{"para":"{element:'"+ element + "',type:'"+ type + "',level:'"+ level + "',hourspan:"+ hourspan + ",maketime:'" + maketime + "',version:'" + version + "',datetime:'"+ datetime + "'}"},
			dataType: "json",
			success: function (data) {
				if(typeof(data) != "undefined") {
					var dvalues = data.dvalues;
					if (dvalues != null && dvalues.length > 0) {
						var dimensionsUV = 2; //维度，UV风场有两维
						var dimensionsWS = 1; //维度，风速场有一维
						var dMin = 9999;
						var dMax = -9999;
						var dgUV = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, dimensionsUV); //u、v
						dgUV.noDataValue = data.noDataValue;
						var dgWS = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, dimensionsWS); //风速
						dgWS.noDataValue = data.noDataValue;
						var gridUV = [];
						var gridWS = [];
						for (var i = 0; i < data.rows; i++) {
							var nIndexLine = data.cols * i * dimensionsUV;
							for (var j = 0; j < data.cols; j++) {
								var nIndex = nIndexLine + j * dimensionsUV;
								gridUV.push(Math.round(dvalues[nIndex+1])); //风速在前
								gridUV.push(Math.round(dvalues[nIndex]));   //风向在后

								var ws = Math.sqrt(dvalues[nIndex]*dvalues[nIndex]+dvalues[nIndex + 1]*dvalues[nIndex + 1]);
								gridWS.push(ws);
								if (ws != 9999 && ws != -9999) {
									if (ws < dMin)
										dMin = ws;
									if (ws > dMax)
										dMax = ws;
								}
							}
						}
						dgUV.grid = gridUV;
						//dgUV.dMin = dMin;
						//dgUV.dMax = dMax;
						t.layerStream.setDatasetGrid(dgUV);

						dgWS.grid = gridWS;
						dgWS.dMin = dMin;
						dgWS.dMax = dMax;
						t.layerFillRangeColor.setDatasetGrid(dgWS);
					}
				}
			},
			error: function(e) {
			},
			type: "POST"
		});
	};

	//展示格点产品
	this.displayGridProduct = function(t){
		var t = typeof(t)=="undefined"?this:t;
        debugger;
		var datetime;
		var type = "prvn";
		var element = "r3";
		var elementName ="陆地-降水量";
		var version = "r";
		var maketime = t.myDateSelecter.getCurrentTime(false);
		//var maketime = "2017-01-20 12:00:00"
        var dates = new Array();
		dates= maketime.split(" ")
		var hourmin = ["05:00:00","16:00:00"];
		var hourmins = ["08:00:00","20:00:00"];
		if($("#selectMakeTime option:selected").val()=="05时"){
			maketime=dates[0]+" "+hourmin[0];
			datetime=dates[0]+" "+hourmins[0];
		}else{
			maketime=dates[0]+" "+hourmin[1];
			datetime=dates[0]+" "+hourmins[1];
		}
		GDYB.GridProductClass.currentMakeTime = maketime;
		var hourspan = t.hourSpan;
		var fromModel;
		var level = 1000;
		if(type == null || element == null || hourspan == null)
			return;

		//获取上一次时效
		var i=0;
		var departCode="37";
		var hourspans = GDYB.GDYBPage.getHourSpan(element);
		for(i; i<hourspans.length; i++){
			if(hourspans[i] == hourspan)
				break;
		}
		var hourspanLast = 0;
		if(i>0)
			hourspanLast = hourspans[i-1];
		debugger;
		t.getGrid(element, type, level, hourspan, maketime, version, datetime,function(dg1,dg2){
			if(dg1=="undefined"||dg1==null||dg1==""){
                 alert("无数据!")
			}else{
				var map =GDYB.Page.curPage.map;
				t.layerFillRangeColor = new WeatherMap.Layer.FillRangeColorLayer(
					"layerMicapsGrid", {
						"radius": 40,
						"featureWeight": "value",
						"featureRadius": "geoRadius"
					}
				);
				t.layerFillRangeColor.isSmooth = true;
				t.layerFillRangeColor.isAlwaySmooth = true;
				t.layerFillRangeColor.isShowGridline = true;
				t.layerFillRangeColor.isShowLabel = true;
				t.layerFillRangeColor.items = heatMap_Rain24Styles;
				t.layerFillRangeColor.setDatasetGrid(dg1);
				map.addLayer(t.layerFillRangeColor);
			}
		});

/*		if(GDYB.GridProductClass.datasetGridInfos == null && GDYB.GridProductClass.datasetGridInfos.length == 0)
		GDYB.GridProductClass.getGridInfo(null,departCode, type, element, datetime,version);
		debugger;
		GDYB.GridProductClass.displayGridProduct(function(){
		}, type, level, element, maketime, version, datetime, hourspan, fromModel, elementName, hourspanLast);*/
	};


/*	this.openElement = function (callback) {
		var self = this;
		var element = GDYB.GridProductClass.currentElement || 'tmax';
		switch (GDYB.GridProductClass.currentType){
			case 'prvn':
				if($("#selectMakeTime").val() == 16){
					self.callLast(function(){
						GDYB.GridProductClass.getGridInfo(function () {
							self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
							$.isFunction(callback) && callback.call(null);
						}, GDYB.GridProductClass.currentUserDepart.departCode, self.productType, element, self.myDateSelecter.getCurrentTime(false));
					});
				}
				else{
					GDYB.GridProductClass.getGridInfo(function () {
						self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
						$.isFunction(callback) && callback.call(null);
					}, GDYB.GridProductClass.currentUserDepart.departCode, self.productType, element, self.myDateSelecter.getCurrentTime(false));
				}
				break;
			default:
				GDYB.GridProductClass.getGridInfo(function(){
					self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
					$.isFunction(callback) && callback.call(null);
				}, GDYB.GridProductClass.currentUserDepart.departCode ,self.productType, element, self.myDateSelecter.getCurrentTime(false));
				break;
		}
	};*/

	/**
	 * @author:POPE
	 * @date:2017-05-19
	 * @param: {string} element - 要素.
	 * @param: {string} type - 模式类型.
	 * @param: {string} level - 层次.
	 * @param: {string} hourspan:时效
	 * @param: {string} maketime:制作时间
	 * @param: {string} version：版本号
	 * @param: {string} datetime：起报时间
	 * @callback: callback - 回调函数.
	 * @description: 获取格点数据
	 */
	this.getGrid = function(element, type, level, hourspan, maketime, version, datetime,callback){//优先从缓存中取值。如果是调入模式，需要更新缓存
		var self = this;
		var url= ((type=="prvn" || type=="cty" || type=="cnty")?getGridServiceUrl(maketime):gridServiceUrl) + "services/GridService/getGrid";
		if(!self.dataCache){
			self.dataCache = new DataCache();
		}
		$.ajax({
			data:{"para":"{element:'"+ element + "',type:'"+ type + "',level:'"+ level + "',hourspan:"+ hourspan + ",maketime:'" + maketime + "',version:'" + version + "',datetime:'"+ datetime + "'}"},
			url:url,
			dataType:"json",
			success:function(data){
				var datasetGrid = null;
				if(data && data.dvalues){
					var dvalues = data.dvalues;
					if (dvalues && dvalues.length > 0) {
						var bWind = (element == "10uv" || element == "wmax"); //是否为风场，风场具有两个字段（风向、风速），在dvalues中交叉表示
						var hasTag = (!bWind)&&(dvalues.length == data.rows*data.cols*2);
						var dimensions = (bWind||hasTag) ? 2 : 1; //维度，风场有两维；带有Tag属性也是两维
						var dMin = 9999;
						var dMax = -9999;
						datasetGrid = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, bWind?2:1); //只有风是两要素
						datasetGrid.noDataValue = data.noDataValue;
						var grid = [];
						var tag = [];
						for (var i = 0; i < data.rows; i++) {
							var tagLine = [];
							var nIndexLine = data.cols * i * dimensions;
							for (var j = 0; j < data.cols; j++) {
								var nIndex = nIndexLine + j * dimensions;
								var z;
								if (bWind) {
									z = dvalues[nIndex + 1];
									grid.push(Math.round(dvalues[nIndex+1])); //风速在前
									grid.push(Math.round(dvalues[nIndex]));   //风向在后
								}
								else {
									z = dvalues[nIndex];
									grid.push(Math.round(dvalues[nIndex] * 10) / 10);
									if(hasTag)
										tagLine.push(dvalues[nIndex+1]);
								}
								if (z != 9999 && z != -9999) {
									if (z < dMin)
										dMin = z;
									if (z > dMax)
										dMax = z;
								}
							}
							if(hasTag)
								tag.push(tagLine);
						}
						datasetGrid.grid = grid;
						datasetGrid.dMin = dMin;
						datasetGrid.dMax = dMax;
						if(hasTag){
							datasetGrid.tag = tag;
							datasetGrid.defaultTag = 0;
						}
					}
				}
				// else {
				//     datasetGrid = GDYB.GridProductClass.createDatasetGrid(maketime, version, datetime, element, hourspan); //如果数据集为空，则创建
				// }
				$.isFunction(callback)&&callback.call(null,datasetGrid);
			},
			type:"POST"

		});
	};


	this.downCityElement = function (callback) {
		var self = this,element = {
			yuBaoSource: self.yuBaoSource, //prvn
			elements: ['r12'],
			elementNames: ['日降水量']
		};
		this.downElements(element,callback);
	};

	function SPDPrintBound (id,isLegend,callback) {
		var el = document.getElementById(id);
		if(el){
			html2canvas(el , {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas)
				{
					var img = canvas.toDataURL("image/png");
					//var divhtml = "<div style='width:1524px;height:826px;background-image:url("+img+")'></div>"
					if($.isFunction(callback)){
						callback(img);
					}
				}
			});
		}
	}

	function requestDataServlet(methodName,fileName,areaContent,params,callBackHandle,callFaultMesg){
		$.ajax({
			type:'post',
			url:host+'/WMProductManager/servlet/ProductServlet',
			data:{'method':methodName,'fileName':fileName,'area':areaContent,'para':params},
			dataType:'text',
			success: callBackHandle,
			error:function(){
				alert(callFaultMesg);
			}
		});
	}

	function stopDragMap(){
		var map = GDYB.Page.curPage.map;
		for(var i =0; i < map.events.listeners.mousemove.length; i++) {
			var handler = map.events.listeners.mousemove[i];
			if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
			{
				handler.obj.active = false;
			}
		}
	}


	function drawCompleted(event) {
		var geometry = event.feature.geometry;
		var areaStation="";
		var stationItem;
		for(var i=0;i<stationData.length;i++) {
			stationItem=stationData[i];
			if (geometry.containsPoint(new WeatherMap.Geometry.Point(stationItem.Longitude, stationItem.Latitude)))
			{
				areaStation+= stationItem.StationNum+",";
			}
		}
		areaStation=areaStation.substr(0,areaStation.length-1);
		if (areaContent=="")
		{
			areaContent=geometry.toString()+"__"+areaStation+"__"+areaType;
		}else{
			areaContent=areaContent+"--"+geometry.toString()+"__"+areaStation+"__"+areaType;
		}
		var geoVector = new WeatherMap.Feature.Vector(geometry);
		geoVector.style=currentStyle;
		dxRadarLayer.addFeatures(geoVector);
		dxdrawRadar.deactivate();
	}
};
