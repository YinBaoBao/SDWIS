/**
 * Created by wangkun on 2017/1/11.
 * title:短临服务-显示和监测
 */
//阈值:全局变量处理
/*var temMaxHold = null;
var temMinHold = null;
var preHold = null;
var windHold = null;*/
function QDLJCPageClass() {
	this.className = "QDLJC";
	var t = this;
	t.MyTime=null;
	t.MapLayer = new Map(); //存放地图图层
	t.jkFlag = true;
	t.syFlag = true;
	this.renderMenu=function(){
		/*$("#menu").css("background-color","#2591F1");*/
		/*$("#menu_bd").html(`
			<div class="datetime">
				<div id="dateSelect"></div>
			</div>
			<div class="space"></div>
			<div id="live">
				<div class="title"><img src="imgs/live.png"><span>实况</span></div>
				<div class="col7" id="rain"><span>降水：</span><button id="24">24h</button><button id="12">12h</button><button id="6">6h</button><button id="3">3h</button><button id="1">1h</button><button id="0.5">30m</button></div>
				<div class="space5"></div>
				<div class="col4" id="wind"><span>大风：</span><button id="17-25">17-25</button><button id="17-25">25-30</button><button id="30">>=30</button></div>
				<div class="space5"></div>
				<div class="col5"><button id="bb">冰雹</button><button id="flash">闪电</button><button id="leib">雷暴</button><button id="vis">能见度</button><button id="regimen">水情</button></div>
				<div class="space5"></div>
				<div class="col5"><button id="temp">气温</button><button id="maxtemp">最高</button><button id="mintemp">最低</button></div>
			</div>
			<div id="radar">
				<div class="title"><img src="imgs/radar.png"><span>雷达</span></div>
				<div class="newcol"><button id="mosaic">三维拼图</button><button id="cr">组合反射率</button><button id="top">回波顶高</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="vil">垂直液态水含量</button><button id="fbzz">风暴识别与追踪</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="qpe">QPE</button><button id="qpf">QPF</button><button id="titan">TITAN</button><button id="trec">TREC</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crjk">回波监控预警</button><button id="sdt">速度图</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crforcast">反射率预报</button></div>
			</div>
			<div id="satellite">
				<div class="title"><img src="imgs/satellite.png"><span>卫星</span></div>
				<div class="newcol"><button id="infrared">红外</button><button id="minfrared">中红外</button><button id="moisture">水汽</button><button id="vlight">可见光</button></div>
			</div>
			<div id="monitorsignal">
				<div class="title"><img src="imgs/monitorsignal.png"><span>预警信号</span></div>
				<div class="newcol"><button id="by">暴雨</button><button  id="tf">台风</button><button  id="gw">高温</button><button  id="hc">寒潮</button><button  id="dw">大雾</button></div>
				<div class="newcol"><button  id="df">大风</button><button  id="ld">雷电</button><button  id="bb">冰雹</button><button  id="lbdf" style="flex:2;">雷暴大风</button></div>
			</div>
			<div id="objectiveproduct">
				<div class="title"><img src="imgs/objectiveproduct.png"><span>客观产品</span></div>
				<div class="newcol"><button>强回波</button><button>强回波预报</button></div>
				<div class="newcol"><span>外推：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>EC：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>GFS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MESO：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MARS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
			</div>
			<div id="alarm">
				<div class="half" style="justify-content: flex-end;">
					<span>报警</span>
					<div id="bj" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
				<div class="half">
					<span>声音</span>
					<div id="voice" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
			</div>
		`);*/
		$("#menu_bd").html(`
			<div id="currentNav">短临预报-->强对流监控</div><div class="btitle"></div>
			<div class="datetime">
				<div id="dateSelect" style="margin-left: 15px;padding: 2px;"></div>
			</div>
			<div id="live">
				<div class="title"><img src="imgs/live.png"><span>实况</span></div>
				<div class="newcol" id="rain"><span>降水：</span><button id="ys|rain_1h">24h</button><button id="ys|rain_12h">12h</button><button id="ys|rain_6h">6h</button></div>
				<div class="newcol" id="rain"><span></span><button id="ys|rain_3h">3h</button><button id="ys|rain_1h">1h</button><button id="ys|rain_30min">30min</button></div>
				<div class="space5"></div>
				<div class="newcol" id="wind"><span>大风：</span><button id="ys|WIN_S_Avg_10mi">10min风</button><button id="ys|WIN_S_Max">小时风</button><button id="ys|WIN_S_Inst_Max_12h">极大风</button></div>
				<div class="space5"></div>
			</div>
			<div id="radar">
				<div class="title"><img src="imgs/radar.png"><span>雷达</span></div>
				<div class="newcol"><button id="mosaic">三维拼图</button><button id="cr">组合反射率</button><button id="sdt">速度图</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="vil">垂直液态水含量</button><button id="crforcast">反射率预报</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="qpe">QPE</button><button id="qpf">QPF</button><button id="titan">TITAN</button><button id="trec">TREC</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crjk">回波监控预警</button></div>
				<div class="space5"></div>
			</div>
			<div id="monitorsignal">
				<div class="title"><img src="imgs/monitorsignal.png"><span>预警信号</span></div>
				<div class="newcol"><button id="by">暴雨</button><button  id="tf">台风</button><button  id="gw">高温</button><button  id="hc">寒潮</button><button  id="dw">大雾</button></div>
				<div class="newcol"><button  id="df">大风</button><button  id="ld">雷电</button><button  id="bb">冰雹</button><button  id="lbdf" style="flex:2;">雷暴大风</button></div>
			</div>
			<div id="objectiveproduct">
				<div class="title"><img src="imgs/objectiveproduct.png"><span>客观产品</span></div>
				<div class="newcol"><button>强回波</button><button>强回波预报</button></div>
				<div class="newcol"><span>外推：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>EC：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>GFS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MESO：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MARS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
			</div>
			<div id="alarm">
				<div class="half" style="justify-content: flex-end;">
					<span>报警</span>
					<div id="bj" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
				<div class="half">
					<span>声音</span>
					<div id="voice" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
			</div>
		`);
		InitEvent();
		InitDateTIme();
		//this.myPanel_YSTJ = new Panel_YSTJ($("#map_div"));
		//获取最新阈值
		//dmt.getWarningHold();
		//报警&声音开关样式切换
		$("#alarm #bj,#alarm #voice").click(function(){
			debugger;
			if($(this.children[0]).hasClass("open1")){
				$(this.children[0]).removeClass("open1");
				$(this.children[0]).addClass("close1");
				$(this.children[0].children[0]).removeClass("open2");
				$(this.children[0].children[0]).addClass("close2");
				if($(this).attr("id") == "bj"){
					t.jkFlag = false;
					animatorStop();
				}else{
					t.syFlag = false;
					$('#alertAudio')[0].pause();
				}
			}else{
				$(this.children[0]).removeClass("close1");
				$(this.children[0]).addClass("open1");
				$(this.children[0].children[0]).removeClass("close2");
				$(this.children[0].children[0]).addClass("open2");
				if($(this).attr("id") == "bj"){
					t.jkFlag = true;
					QDLJK();
				}else{
					t.syFlag = true;
				}
			}
		});
		//实况报警要素选择
		$("#live").find("button").click(function(){
			if ($(this).hasClass("active")) {
				return;
			}else{
				$("#live button.active").removeClass("active");
				$(this).addClass("active");
				var element = $(this).attr("id").split("|")[1];
				layer.closeAll();
				animatorStop();
				fnCimiss.getWarningData(element,t.MyTime.getCurrentTime(false),['011','012','013','014'],null);
			}
		});

		/*
		//旧的实时降水-大风监控
		//JCmonitor();
		function JCmonitor(){
			fnCimiss.getStationStatis(["PRE_1h","WIN_S_Max","WIN_S_Avg_10mi","WIN_S_Inst_Max_12h"],dmt.getMyCurTime(false,0,""),"SURF_CHN_MUL_HOR","getSurfEleInRegionByTime",['011','012','013','014'],"getWarningSuccess",null);
			//t.WarningDispaly(SDWarning.DS);
			setTimeout(function(){
				if(GDYB.Page.curPage == GDYB.QDLJCPage){
					if(t.jkFlag){
						JCmonitor()
					}
				}
			},10*60*1000);
		}
		*/



		//实时降水-大风监控
		QDLJK();
		function QDLJK(){
			getWarningData();
			setTimeout(function(){
				if(GDYB.Page.curPage == GDYB.QDLJCPage){
					if(t.jkFlag){
						QDLJK()
					}
				}
			},60*60*1000);
		};
		function getWarningData(){
			debugger;
			var para = {};
			para.areaCode = "37";
			//para.areaCode = $.cookie("departCode");
			para.dtype = "0";
			para = JSON.stringify(para); //对象转换为json
			var url = gridServiceUrl+"services/ForecastfineService/getWaringByADCode";
			var	params = {"para": para};
			var asyncFlag = true;
			var error ="暂无数据";
			dmt.getDataRecall(function(wdata){
				if(!dmt.isArray(wdata) || wdata.length < 1){
					layer.closeAll();
					$('#alertAudio')[0].pause();
					animatorStop();
					return;
				}
				animatorStop();
				dmt.warningFlashInit();
				var me = GDYB.Page.curPage;
				var markersLayer = me.map.getLayersByName("markersLayer")[0];
				var animatorLayer = me.map.getLayersByName("animatorLayer")[0];
				var size = new WeatherMap.Size(32, 32);
				var offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
				//报警点样式
				var style = {
					/*stroke: false,
					 pointRadius: 8*/
				};
				//点击报警标志点击事件
				function popup(obj) {
					var attr = obj.attributes;
					var html = ''
						+'<div class="" style="background-color: rgba(255,255,255,0.5)">'
						//+'<div class="title" style="text-align:center;margin:5px 0px 0px 0px">'+ attr.Station_Name + ' ' + attr.type + '</div>'
						+'<div class="title" style="text-align:center;margin:5px 0px 0px 0px">'+ attr.Station_Name + ' ' + attr.wName + '</div>'
						+'<div style="text-align:center"><img width="20" height="20" style="margin-top:-3px" src="imgs/monitor/'+attr.img + '.png"> &nbsp;'+ attr.value + '</div>'
						+'<div id="wdeal" style="text-align:center;margin:5px 0px 0px 0px"><button class="wb" id="yjzz">预警信号制作</button><button class="wb" id="qtqzz">强天气预警制作</button><button class="wb" id="toDeal">标记已处理</button></div>'
						+'</div>';
					var popup = new WeatherMap.Popup.FramedCloud(
						'marker_popup',
						new WeatherMap.LonLat(attr.Lon, attr.Lat),
						null,
						html,
						null,
						true
					);
					popup.setOpacity(0.0);
					me.map.removeAllPopup();
					me.map.addPopup(popup);
					$("#wdeal").find("button").click(function(){
						var btype = $(this).attr("id");
						if(btype == "toDeal"){
							var para = attr;
							para.dealTime = dmt.getMyCurTime(false,0,"");
							para.decisioner = (typeof($.cookie("departName")) == "undefined" || $.cookie("departName") == null)?"":$.cookie("departName");
							para = JSON.stringify(para); //对象转换为json
							var url = gridServiceUrl+"services/ForecastfineService/WarningDeal";
							var	params = {"para": para};
							var asyncFlag = true;
							var error ="暂无数据";
							//删除当前气泡测试

							me.map.removePopup(popup);
							markersLayer.removeMarker(obj);
							animatorLayer.removeFeatures(animatorLayer.getFeaturesByAttribute("DATA",attr));
							dmt.getDataRecall(function(result){
								if(result){
									me.map.removePopup(popup);
									markersLayer.removeMarker(obj);
									animatorLayer.removeFeatures(animatorLayer.getFeaturesByAttribute("DATA",attr));
									if(animatorLayer.features < 1){
										$('#alertAudio')[0].pause();
									}
								}
							},url,params,asyncFlag,error);
						}
					});
				}

				//重构报警对象
				function  restore(wdata){
					function clone(obj){
						var result ={};
						for(var key in obj){
							result[key]=obj[key];
						}
						return result;
					}
					function createObj(flagType,curObj){
						var eleType,colorType,eleName,sufix,colorStr = "";
						eleType = flagType.split("_")[0];
						colorType = flagType.split("_")[1];
						switch(eleType){
							case "rain":{
								eleName = "短时强降水";
								sufix = "(mm)";
							}
								break;
							case "win":{
								eleName = "大风";
								sufix = "(m/s)";
							}
								break;
						}
						switch(colorType){
							case "blue":{
								colorStr = "蓝色";
							}
								break;
							case "yellow":{
								colorStr = "黄色";
							}
								break;
							case "orange":{
								colorStr = "橙色";
							}
								break;
							case "red":{
								colorStr = "红色";;
							}
								break;
						}
						var tempObj = clone(curObj);
						tempObj.img = flagType;
						tempObj.color = colorType;
						tempObj.colorStr = colorStr;
						tempObj.type = eleName+" <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
						tempObj.value = curObj.wValue+sufix;
						return tempObj;
					}
					var newWarings = [];
					for(var index in wdata){
						var dataType = wdata[index].wType;
						var flagType = dataType;
						if(dataType.split("_")-1 > 1){
							flagType = dataType.substring(0,dataType.lastIndexOf("_"));
						}
						newWarings.push(createObj(flagType,wdata[index]));
					}
					return newWarings;
				}
				//报警闪烁点
				var pointFeatures = [];
				var warnings = restore(wdata);
				//var ststisData = StrongWeatherStatis(warnings);
				if(warnings.length > 0){
					//fnSurvey.showStatic(ststisData,warnings,"QDLSK_Statis","QDLSK_Warning","强对流报警统计");
					//fnSurvey.showGrid()
					//showPanel(wData,wData[0].Datetime,wData[wData.length-1].Datetime);
					if(t.syFlag){
						$('#alertAudio')[0].play();
					}
					//渲染报警点和报警标志
					warnings.forEach(function(attr, index) {
						//报警标志
						var ICON_URL = '/SDWIS/imgs/monitor/';
						var icon = ICON_URL + attr.img + '.png';
						var marker = new WeatherMap.Marker(
							new WeatherMap.LonLat(attr.Lon, attr.Lat),
							new WeatherMap.Icon(icon, size, offset)
						);
						marker.attributes = attr;
						marker.events.on({
							click: function() {
								//popup(this.attributes, 'click');
								popup(marker, 'click');
							},
							// mouseover: function() {
							//     me.popup(this, 'mouseover');
							// },
							/*
							touchend: function() {
								popup(this.attributes, 'touchend');
							},
							*/
							scope: marker
						});
						markersLayer.addMarker(marker);
						//报警点
						var point = new WeatherMap.Geometry.Point(attr.Lon, attr.Lat);
						//闪动泡泡样式
						var pointStyle = Object.assign({}, style, {
							fillColor: attr.color,
							//pointRadius: 12
						});
						var pointFeature = new WeatherMap.Feature.Vector(point, {
							TIME: 1,
							FEATUREID: index,
							DATA:attr
						}, pointStyle);
						pointFeatures.push(pointFeature);
					});
					animatorLayer.addFeatures(pointFeatures);
					// 延迟开始动画,等待地图准备
					setTimeout(function() {
						animatorLayer.animator.start();
					}, 900);
				}else{
					layer.closeAll();
					$('#alertAudio')[0].pause();
					animatorStop();
				}
			},url,params,asyncFlag,error);
		}

	}
	this.WarningDispaly = function(wData) {
		var x = filterCitiesData(wData);
		debugger;
		if(!dmt.isArray(wData)){
			layer.closeAll();
			$('#alertAudio')[0].pause();
			animatorStop();
			return;
		}
		animatorStop();
		dmt.warningFlashInit();
		var me = GDYB.Page.curPage;
		var markersLayer = me.map.getLayersByName("markersLayer")[0];
		var animatorLayer = me.map.getLayersByName("animatorLayer")[0];
		var size = new WeatherMap.Size(32, 32);
		var offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
		//报警点样式
		var style = {
			/*stroke: false,
			 pointRadius: 8*/
		};
		function popup(attr) {
			var html = ''
				+'<div class="" style="background-color: rgba(255,255,255,0.5)">'
				+'<div class="title">'+ attr.Station_Name + ' ' + attr.type + '</div>'
				+'<div style="text-align:center">'+ attr.value + '</div>'
				+'</div>';
			var popup = new WeatherMap.Popup.FramedCloud(
				'marker_popup',
				new WeatherMap.LonLat(attr.Lon, attr.Lat),
				null,
				html,
				null,
				true
			);
			popup.setOpacity(0.0);
			me.map.removeAllPopup();
			me.map.addPopup(popup);
		}
		var pointFeatures = [];
		var warnings = StrongWeatherDeal(wData);
		var ststisData = StrongWeatherStatis(warnings);
		if(warnings.length > 0){
			fnSurvey.showStatic(ststisData,warnings,"QDLSK_Statis","QDLSK_Warning","强对流报警统计");
			//showPanel(wData,wData[0].Datetime,wData[wData.length-1].Datetime);
			if(t.syFlag){
				$('#alertAudio')[0].play();
			}
			warnings.forEach(function(attr, index) {
				var ICON_URL = '/SDWIS/imgs/monitor/';
				var icon = "";
				if(attr.img.indexOf("WIN_") > -1){
					icon = ICON_URL +"WIN_"+attr.color + '.png';
				}else{
					icon = ICON_URL + attr.img+"_"+attr.color + 'png';
				}
				var marker = new WeatherMap.Marker(
					new WeatherMap.LonLat(attr.Lon, attr.Lat),
					new WeatherMap.Icon(icon, size, offset)
				);
				marker.attributes = attr;
				marker.events.on({
					click: function() {
						popup(this.attributes, 'click');
					},
					// mouseover: function() {
					//     me.popup(this, 'mouseover');
					// },
					touchend: function() {
						popup(this.attributes, 'touchend');
					},
					scope: marker
				});
				markersLayer.addMarker(marker);
				var point = new WeatherMap.Geometry.Point(attr.Lon, attr.Lat);
				//闪动泡泡样式
				var pointStyle = Object.assign({}, style, {
					fillColor: attr.color,
					//pointRadius: 12
				});
				var pointFeature = new WeatherMap.Feature.Vector(point, {
					TIME: 1,
					FEATUREID: index
				}, pointStyle);
				pointFeatures.push(pointFeature);
			});
			animatorLayer.addFeatures(pointFeatures);
			// 延迟开始动画,等待地图准备
			setTimeout(function() {
				animatorLayer.animator.start();
			}, 900);
		}else{
			layer.closeAll();
			$('#alertAudio')[0].pause();
			animatorStop();
		}
	}

	//cimiss 站点数据提取市区数据
	function filterCitiesData(data){
		var cityNO = [
			"371601",//滨州市
			"370301",// 淄博市
			"370101",// 济南市
			"370601",// 烟台市
			"370901",// 泰安市
			"371301",// 临沂市
			"371501",// 聊城市
			"370201",// 青岛市
			"370701",// 潍坊市
			"370401",// 枣庄市
			"371401",// 德州市
			"371201",// 莱芜市
			"370501",// 东营市
			"371001",// 威海市
			"370801",// 济宁市
			"371101",// 日照市
			"371701",// 菏泽市
		];
		var stationNO = [
			"54734",//滨州市
			"54830",// 淄博市
			"54823",// 济南市
			"54765",// 烟台市
			"54827",// 泰安市
			"54938",// 临沂市
			"54806",// 聊城市
			"54857",// 青岛市
			"54840",// 潍坊市
			"58024",// 枣庄市
			"54714",// 德州市
			"54806",// 莱芜市
			"54736",// 东营市
			"54774",// 威海市
			"54915",// 济宁市
			"54945",// 日照市
			"54906",// 菏泽市
		];
		var cityDatas = {};
		for(var i in cityNO){
			cityDatas[cityNO[i].substr(0,4)] = [];
		}
		//按市级行政单位数据分类
		for(var index in data){
			if(typeof(cityDatas[data[index].Admin_Code_CHN.substr(0,4)]) != "undefined"){
				cityDatas[data[index].Admin_Code_CHN.substr(0,4)].push(data[index]);
			}
		}
		return getWarningResult(cityDatas);
	}

	function getWarningResult(odatas){
		//{"cityNo":[values]}
		var Drs = [];
		$.each(odatas,function(no,cArray){
			var cs = cArray.length;
			var cWarnings = StrongWeatherDeal(cArray);
			var cstatis = StrongWeatherStatis(cWarnings);
			if((cWarnings.length / cs) > 0.3){
				Drs.push.apply(Drs,cWarnings);
			}
		});
		return Drs;
	}
	//强天气数据相对阈值处理
	function StrongWeatherDeal(data){
		//构造报警对象
		var warnings = [];
		//保护数据，进行对象克隆
		function clone(obj){
			var result ={};
			for(var key in obj){
				result[key]=obj[key];
			}
			return result;
		}
		function getWarningClor(hold,value){
			var color = {};
			color.color = "blue";
			color.str = "蓝色";
			if(hold.type != "TEM_Min"){
				if(value*1<hold.yellow*1){
					color.color = "blue";
					color.str = "蓝色";
				}else if(value*1<hold.orange*1){
					color.color = "yellow";
					color.str = "黄色";
				}else if(value*1<hold.red*1){
					color.color = "orange";
					color.str = "橙色";
				}else{
					color.color = "red";
					color.str = "红色";
				}
			}else{
				if(value*1>hold.yellow*1){
					color.color = "blue";
					color.str = "蓝色";
				}else if(value*1>hold.orange*1){
					color.color = "yellow";
					color.str = "黄色";
				}else if(value*1>hold.red*1){
					color.color = "orange";
					color.str = "橙色";
				}else{
					color.color = "red";
					color.str = "红色";
				}
			}
			return color;
		}
		for(var i in data){
			$.each(data[i],function(name,value){
				switch(name){
					case "TEM_Max":{
						if(value*1 > (temMaxHold.blue*1) && (value*1 < 999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(temMaxHold,value).color;
							tempObj.colorStr = getWarningClor(temMaxHold,value).str;
							tempObj.type = "高温 <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + " </font>警报";
							tempObj.value = value+"(°C)";
							warnings.push(tempObj);
						}
					}
						break;
					case "TEM_Min":{
						if(value*1 < (temMinHold.blue*1) && (value*1 < 999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(temMinHold,value).color;
							tempObj.colorStr = getWarningClor(temMinHold,value).str;
							tempObj.type = "低温 <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(°C)";
							warnings.push(tempObj);
						}
					}
						break;
					case "PRE_1h":{
						if(value*1 > (preHold.blue*1) && (value*1 < 9999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(preHold,value).color;
							tempObj.colorStr = getWarningClor(preHold,value).str;
							tempObj.type = "短时强降水 <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(mm)";
							warnings.push(tempObj);
						}
					}
						break;
					case "PRE":{
						if(value*1 > (preHold.blue*1) && (value*1 < 9999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(preHold,value).color;
							tempObj.colorStr = getWarningClor(preHold,value).str;
							tempObj.type = "短时强降水 <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(mm)";
							warnings.push(tempObj);
						}
					}
						break;
					case "WIN_S_Avg_10mi":{
						if(value*1 > (windHold.blue*1) && (value*1 < 999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(windHold,value).color;
							tempObj.colorStr = getWarningClor(windHold,value).str;
							tempObj.type = "大风(10min) <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(m/s)";
							warnings.push(tempObj);
						}
					}
						break;
					case "WIN_S_Max":{
						if(value*1 > (windHold.blue*1) && (value*1 < 999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(windHold,value).color;
							tempObj.colorStr = getWarningClor(windHold,value).str;
							tempObj.type = "大风(小时风) <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(m/s)";
							warnings.push(tempObj);
						}
					}
						break;
					case "WIN_S_Inst_Max_12h":{
						if(value*1 > (windHold.blue*1) && (value*1 < 999)){
							//var tempObj = createObj(name,data[i]);
							var tempObj = clone(data[i]);
							tempObj.img = name;
							tempObj.color = getWarningClor(windHold,value).color;
							tempObj.colorStr = getWarningClor(windHold,value).str;
							tempObj.type = "大风(极大风) <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
							tempObj.value = value+"(m/s)";
							warnings.push(tempObj);
						}
					}
						break;
				}
			})
		}
		return warnings;
	}
	//强天气市级数据统计
	function StrongWeatherStatis(warnings){
		//需要返回的统计结果
		var statis = {};
		//进行判断的临时数组
		var cities = [];
		for(var i in warnings){
			if($.inArray(warnings[i].City,cities) < 0){
				cities.push(warnings[i].City);
				pushData();
			}else{
				pushData();
			}
			function pushData(){
				if((typeof(statis[warnings[i].City]) == 'undefined') || (typeof(statis[warnings[i].City]) == null)){
					statis[warnings[i].City] = {};
					statis[warnings[i].City].Station_Name = warnings[i].City;
					statis[warnings[i].City][warnings[i].color] = 1;
				}else{
					if((typeof(statis[warnings[i].City][warnings[i].color]) == 'undefined') || (typeof(statis[warnings[i].City][warnings[i].color]) == null)){
						statis[warnings[i].City][warnings[i].color] = 1;
					}else{
						statis[warnings[i].City][warnings[i].color] += 1;
					}
				}
			}
		}
		return statis;
	}
	function animatorStop(){
		var curmap = GDYB.Page.curPage.map;
		var animatorLayer = curmap.getLayersByName("animatorLayer")[0];
		if (!animatorLayer) return;
		var animator = animatorLayer.animator;
		if (!animator) return;
		animator.stop();
		//$("#Panel_YSTJ").css("display","none");
		curmap.removeLayer(curmap.getLayersByName("markersLayer")[0]);
		curmap.removeLayer(animatorLayer);
	}

	//简单超警统计
	function showPanel(data,time1,time2){
		var tjObject = {"高温":[],"低温":[],"短时强降水":[],"大风":[]};
		for(var key in tjObject){
			for(var index in data){
				if(key == "高温"){
					if((data[index].TEM_Max*1) >= (temMaxHold.blue*1) && (data[index].TEM_Max*1) < 900000){
						tjObject[key].push(data[index]);
					}
				}
				if(key == "低温"){
					if((data[index].TEM_Min*1) <= (temMinHold.blue*1) && (data[index].TEM_Min*1) < 900000){
						tjObject[key].push(data[index]);
					}
				}
				if(key == "短时强降水"){
					if((data[index].PRE_1h*1) >= (preHold.blue*1)  && (data[index].PRE_1h*1) < 900000){
						tjObject[key].push(data[index]);
					}
				}
				if(key == "大风"){
					if((data[index].WIN_S_Avg_10mi*1) >= (windHold.blue*1)  && (data[index].WIN_S_Avg_10mi*1) < 900000){
						tjObject[key].push(data[index]);
					}
				}
			}
		}
		var contentTable = "<table border='1'  bordercolor='#969696'><tr ><th style='text-align:center'>类别</th><th style='text-align:center'>站次</th><th style='text-align:center'>极值</th><th style='text-align:center'>出现时间</th></tr>";
		var contentDiv = "<div id='ystjContentDiv' style='overflow: auto;height: 60%;border: 1px solid rgb(150,150,150);padding: 10px;'>"+time1+"至"+time2+":";
		var num = 1;
		var showTable = false;
		for(var obj in tjObject){
			var maxNum = 0;
			var maxObj = null;
			if(tjObject[obj].length != 0){
				num ++;
				contentTable += "<tr><td style='text-align:center'>"+obj+"</td><td style='text-align:center'>"+tjObject[obj].length+"</td>";
				var Val = "";
				switch(obj){
					case "高温":{
						Val ="TEM_Max";
					}
						break;
					case "低温":{
						Val ="TEM_Min";
					}
						break;
					case "大风":{
						Val ="WIN_S_Avg_10mi";
					}
						break;
					case "短时强降水":{
						Val ="PRE_1h";
					}
						break;
				}
				if(obj == "高温" || obj == "大风" || obj == "低温" || obj == "短时强降水"){
					contentDiv += "<br/>"
					contentDiv += "<font style='color:red'>"+obj+"出现"+tjObject[obj].length+"站，分别为：</font><br/>";
					for(var i=0;i<tjObject[obj].length;i++){
						if(tjObject[obj][i][Val]*1 > 900000){
							continue;
						}
						var date = new Date(tjObject[obj][i].Datetime);
						contentDiv += tjObject[obj][i].Cnty+tjObject[obj][i].Station_Name+date.getDate()+"日"+date.getHours()+"时"+tjObject[obj][i][Val]+", ";
						if(Val != "TEM_Min"){
							if((maxNum*1) <= (tjObject[obj][i][Val]*1) ){
								maxNum = tjObject[obj][i][Val];
								maxObj = tjObject[obj][i];
							}
						}else{
							if((maxNum*1) >= (tjObject[obj][i][Val]*1)){
								maxNum = tjObject[obj][i][Val];
								maxObj = tjObject[obj][i];

							}
						}
					}
					contentDiv = contentDiv.substr(0,contentDiv.length-1);
					contentDiv += "。";
					var date = new Date(maxObj.Datetime);
					contentTable +="<td>"+maxObj.Station_Name+"("+maxNum+")</td><td style='text-align:center'>"+date.getDate()+"日"+date.getHours()+"时</td></tr>";
					if(maxObj != null)
						showTable = true;
				}
			}
		}
		contentTable += "</table>";
		contentDiv += "</div>";
		if(showTable){
			t.myPanel_YSTJ.panel.find(".ystjContent").html(contentTable+contentDiv);
			$("#ystjContentDiv").css("height",222-num*21);
		}
		else{
			t.myPanel_YSTJ.panel.find(".ystjContent").html("");
		}
		t.myPanel_YSTJ.panel.css("display","block");
	}

	/**
	 * @author:wangkun
	 * @date:2017-03-29
	 * @param:
	 * @return:
	 * @description:初始化事件
	 */
	function InitEvent(){
		t.MyTime=new DateSelecter(1, 1); //最小视图为分钟
		t.MyTime.intervalMinutes = 6; //6分钟
		$("#dateSelect").append(t.MyTime.div);
	}
	//DisplayAlarmArea();
	/**
	 * @author:wangkun
	 * @date:2017-03-10
	 * @param:
	 * @return:
	 * @description:初始化时间
	 */
	function InitDateTIme(){
		$('#datetimepicker').datetimepicker({
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			showMeridian: 1,
			format: "yyyy-mm-dd hh:ii"
		});
		$("#datetimepicker").datetimepicker('setDate', new Date());
	}
}
QDLJCPageClass.prototype = new PageBase();

