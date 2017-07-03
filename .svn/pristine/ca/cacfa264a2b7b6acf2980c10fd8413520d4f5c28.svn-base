function SKZLPageClass(){
	this.className = "SKZL";
	var AQILayer = null;
	var enviFlag = 0;
	//渲染左侧菜单区域里的按钮
	this.renderMenu = function(){
		var htmlStr = ""
			+ "<div id='currentNav'>实况监测-->气温</div>"
			+"<div id='stationCheck' class=''><div class='btitle'></div>"
			+"<div class='checkbox checkbox-primary' style='margin-left:1%' ><input type='checkbox' id='chkStateStation' flag ='nstation' checked/><label for='chkStateStation'>国家站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>&nbsp;&nbsp;<input type='checkbox' id='chkAreaStation' flag ='rstation' checked/><label for='chkAreaStation'>区域站</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' id='chkGridReal' flag ='rstation'/><label for='chkGridReal'>格点实况</label></div>"
			+"</div>"
			+ "<div class='btitle'></div>"
			+ "<div id='datetime' class='date-time-picker'>"
			+ "<div style='margin:10px 0 10px 10px'><div class='dateSelect'></div></div>"
			/*
			+ "<div style='margin-left:35%;margin-top:2px;margin-bottom:5px;'><button id='preCheck' style='cursor: pointer;display:none;' title='时段雨量查询' > 查&nbsp;&nbsp;询 </button></div>"
			+ "</div>"
			+"<div id='div_type' class=''><div class='btitle'></div>"
			 <td><button id='ys|TEM_MIN' flag='8'>日最大风</button>
			 */
			+"<div id='div_Station' style='padding: 3px;'>"
			+"<table id='CIMISS_temp' class='active'>"
			+"<tr><td><button id='ys|TEM' flag='6'>整点气温</button></td><td><button id='ys|TEM_Max' flag='7'>小时内最高</button></td><td><button id='ys|TEM_Min' flag='8'>小时内最低</button></td></tr>"
			+"<tr><td><button id='ys|GST'>地表温度</button></td><td><button id='ys|GST_Max'>地表日最高</button></td><td><button id='ys|GST_Min'>地表日最低</button></td></tr>"
			+"<tr><td><button id='ys|TEM_Max_24h'>日最高气温</button></td><td><button id='ys|TEM_Min_24h'>日最低气温</button></td><td></td></tr>"
			+"</table>"
			+"<table id='CIMISS_rain' class='' style='display:none'><tr><td><button id='ys|rain_1h' flag='7'>1小时降水</button></td><td><button id='ys|rain_10min' flag='6'>10分钟降水</button></td><td><button id='ys|rain_3h' flag='7'>3小时降水</button></td></tr>"
			+"<tr><td><button id='ys|rain_6h' flag='8'>6小时降水</button></td><td><button id='ys|rain_12h'>12小时降水</button></td><td><button id='ys|rain_24h'>24小时降水</button></td></tr>"
			+"<tr><td><button id='ys|rain_48h'>48小时降水</button></td><td><button id='ys|rain_72h'>72小时降水</button></td></tr>"
			+"</table>"
			+"<table id='wind_CIMISS' class='' style='display:none'>"
			+"<tr><td><button id='ys|WIN_S_Max' flag='6'>正&nbsp;点&nbsp;风</button></td><td><button id='ys|WIN_S_Inst_Max' flag='7'>小时极大风</button></td></tr>"
			+"<tr><td><button id='ys|WIN_S_Max_24h'>日最大风</button></td><td><button id='ys|WIN_S_Inst_Max_24h'>日极大风</button></td></tr>"
			+"</table>"
			+"<table id='CIMISS_pre' class='' style='display:none'><tr><td colspan='3'><button id='ys|PRS' flag='6'>气&nbsp;&nbsp压</button></td></tr></table>"
			+"<table id='CIMISS_vis' class='' style='display:none'><tr><td colspan='3'><button id='ys|VIS' flag='6'>能&nbsp;&nbsp;见&nbsp;&nbsp;度</button></td></tr></table>"
			+"<table id='CIMISS_hum' class='' style='display:none'><tr><td colspan='3'><button id='ys|RHU' flag='6'>湿&nbsp;&nbsp;度</button></td></tr></table>"
			+"<table id='CIMISS_flash' class='' style='display:none'><tr><td colspan='3'><button id='ys|newSplash' flag='6'>闪&nbsp;电&nbsp;定&nbsp;位</button></tr></table>"
			+"<table id='ENVI_table' class='' style='display:none'>"
			+"<tr><td>&nbsp;&nbsp;<input type='checkbox' id='chkStateStation' flag ='nstation' /><label for='chkStateStation'>&nbsp; 全国&nbsp;&nbsp;&nbsp;</label></td><td><input type='checkbox' id='chkGridReal' flag ='rstation'/><label for='chkGridReal'>&nbsp; 华东区域</label></td><td>&nbsp;&nbsp;<input type='checkbox' id='chkGridReal' flag ='rstation' checked/><label for='chkGridReal'> &nbsp;山东省</label></td></tr>"
			+"<tr><td><button id='AQI' flag='6'>AQI</button></td><td><button id='PM25' flag='7'>PM2.5</button></td><td><button id='PM10' flag='8'>PM10</button></td></tr>"
			+"<tr><td><button id='O3'>O3</button></td><td><button id='SO2'>SO2</button></td><td><button id='CO'>CO</button></td></tr><tr><td><button id='NO2'>NO2</button></td></tr></table>"
			+"<table id='RADER_table' class='' style='display:none'>"
			+"<tr><td colspan='2'><button id='ys|radar' class='realRadar'>实&nbsp;况&nbsp;数&nbsp;据</button></td></tr>"
			+"<tr><td><button class='GST-FOR-VAL' flag='1' id=''>未来6分钟</button></td><td><button class='GST-FOR-VAL' flag='2' id=''>未来12分钟</button></td></tr>"
			+"<tr><td><button class='GST-FOR-VAL' flag='3' id=''>未来18分钟</button></td><td><button class='GST-FOR-VAL' flag='4' id=''>未来24分钟</button></td></tr>"
			+"<tr><td><button class='GST-FOR-VAL' flag='5' id=''>未来30分钟</button></td><td><button class='GST-FOR-VAL' flag='6' id=''>未来36分钟</button></td></tr>"
			+"<tr><td><button class='GST-FOR-VAL' flag='7' id=''>未来42分钟</button></td><td><button class='GST-FOR-VAL' flag='8' id=''>未来48分钟</button></td></tr>"
			+"<tr><td><button class='GST-FOR-VAL' flag='9' id=''>未来54分钟</button></td><td><button class='GST-FOR-VAL' flag='10' id=''>未来60分钟</button></td></tr>"
			+"<tr><td colspan='2'><button id='GST_animation'>动&nbsp;画&nbsp;播&nbsp;放</button></td></tr>"
			+"</table>"
			+"<table id='CLOUD_table' class='' style='display:none'>"
			+"<tr><td><button id='ys|TEM' flag='6'>红&nbsp;&nbsp;外</button></td><td><button id='ys|TEM_MAX' flag='7'>可&nbsp;见&nbsp;光</button></td></tr>"
			+"</table>"
			+"</div>"
			+"</div>"
			+"<div id='displayType'><div class='btitle'></div>"
			+"<div><table style='width:100%'><tr><td><div class='checkbox checkbox-primary'><input type='checkbox' checked id='buttonDisplayPlot'/><label for='buttonDisplayPlot'>填&nbsp;&nbsp;&nbsp;值&nbsp;&nbsp;&nbsp;&nbsp;</label></div></td><td><div class='checkbox checkbox-primary'><input type='checkbox' id='buttonDisplayContour' /><label for='buttonDisplayContour'>等值线&nbsp;&nbsp;&nbsp;&nbsp;</label></div></td></tr>"
			+"<tr><td><div class='checkbox checkbox-primary'><input type='checkbox' id='buttonDisplaysoStation' ><label for='buttonDisplaysoStation' style='font-weight:500;'>站&nbsp;&nbsp;名</label></div></td>"
			+"<td><div class='checkbox checkbox-primary'><input type='checkbox'id='buttonDisplayIsoSurface' /><label for='buttonDisplayIsoSurface'>等值线填色</label></div></td></tr>"
			+"<tr><td><div id='showCountry' class='checkbox checkbox-primary'><input type='checkbox' id='buttonDisplayCountry'/><label for='buttonDisplayCountry'>标记国家站</label></div><div id='WinSpeedBox' class='checkbox checkbox-primary' style='display: none'><input type='checkbox' id='buttonDisplayWinSpeed'/><label for='buttonDisplayWinSpeed'>风速m/s</label></div></td><td></td></tr>"
			+"</table></div>"
			+"</div>"
			+ "<div id='precipitationBox'>"
			+ "<div class='btitle'></div>"
			+ "<div style='color:blue;margin-left:1%'>★&nbsp;时段降水查询</div>"
			+ "<div class='btitle'></div>"
			+ "<div id='datetime-1' class='date-time-picker'>"
			+ "<div style='margin:10px 0 10px 10px'>"
			+ "<div id='dateSelect1' class='dateSelect1'></div>"
			+ "</div>"
			+ "<div id='datetime-1' class='date-time-picker'>"
			+ "<div style='margin:10px 0 10px 10px'>"
			+ "<div id='dateSelect2' class='dateSelect1'></div>"
			+ "</div>"
			+ "<div style='margin-left:35%;margin-top:2px;margin-bottom:5px;'>"
			+ "<button id='preSum' style='cursor: pointer;' title='任意时段累计降水查询' > 开始查询 </button>"
			+ "</div>"
			+ "</div>"
			+ "</div>"
				+ "</div>"
			+"<div><div class='btitle'></div>"
			+"<div id='fontSize' style='margin-left:15% ;margin-top:10px;'>字体调节:&nbsp;&nbsp<img style='cursor: pointer;' class='dateBtn1' src='imgs/dateBtn1.png' />&nbsp;&nbsp<input id='vstr' type='text' style='width:50px;color:#5B5B5B;height:auto;text-align:center;' value='16' />&nbsp;&nbsp<img class='dateBtn2' style='cursor: pointer;' src='imgs/dateBtn2.png' /></div>"
			+"</div>"
			+"<div id='dsControl' style='display:none'><div class='btitle'></div>"
			+'<div style="margin-left:15% ;margin-top:10px;">格距:&nbsp;&nbsp;<input id="displaySpace" type="text" style="width:92px;color:#5B5B5B;height:auto;" value=""   />&nbsp;&nbsp;&nbsp<button onclick="GDYB.SKZLPage.DisplaySpace()">修改</button><input id="displaySpaceIndex" type="hidden" value="" /></div>'
			+"</div>"
			+"<div ><div class='btitle'></div>"
			+"<div id='capturePics' style='margin-left:20% ;margin-top:10px;'><button id='displayCity' class='' style='font-size:14px;cursor: pointer;padding: 4px 3px;' title='县级行政区域填色'>&nbsp;&nbsp;县域填色&nbsp;&nbsp;</button><button style='font-size:14px;cursor: pointer;padding: 4px 3px;' title='当前地图出图' onclick='dmt.exportNewImage()'> 保存截图 </button><!--<button onclick='GDYB.SKZLPage.test()'> 测试 </button>--></div>"
			+"</div>";
		$("#menu_bd").html(htmlStr);
		/*注册组件*/
		var t = this;
		t.historyCheck = false;
		t.callBack = false;
		t.myNowTime = new DateSelecterSK();
		t.myDateSelecter = new DateSelecterSK();
		t.myDateSelecter1 = new DateSelecterSK();
		t.myDateSelecter2 = new DateSelecterSK();
		//t.myDateSelecter.input.val("2017-01-13 20:00:00");
		$("#precipitationBox").css({"display": "none"});
		$(".dateSelect").append(t.myDateSelecter.div);
		$("#dateSelect1").append(t.myDateSelecter1.div);
		t.myDateSelecter1.changeHours(-6*60);
		$("#dateSelect2").append(t.myDateSelecter2.div);
		//$(".dateSelect1").attr("disabled", "disabled");
		t.micapsDataClass_WeatherMap_Plot = new MicapsDataClass();
		t.micapsDataClass_WeatherMap_Contour1 = new MicapsDataClass();
		t.micapsDataClass_WeatherMap_Contour2 = new MicapsDataClass();
		t.micapsDataClass_Physic = new MicapsDataClass();
		AQILayer = new WeatherMap.Layer.Vector("AQILayer",{renderers: ["Canvas"]});//站点AQI图层
		GDYB.Page.curPage.map.addLayer(AQILayer);
		dmt.SDAQICallBack(AQILayer);
		GDYB.Page.curPage.map.events.register("zoomend", GDYB.Page.curPage.map, function(){
			var ZoomIndex = GDYB.Page.curPage.map.getZoom();
			if(!(m_layerPlot == null || m_layerPlot.features.length <= 0)){
				if(ZoomIndex*1 > 10){
					$(m_layerPlot.features).each(function(i,e){
						e.style.pointRadius = 4.5;
					});
				}else if(ZoomIndex*1 > 8){
					$(m_layerPlot.features).each(function(i,e){
						e.style.pointRadius = 2;
					});
				}else{
					$(m_layerPlot.features).each(function(i,e){
						e.style.pointRadius = 1.5;
					});
				}
				m_layerPlot.redraw();
			}
		});
		//选择时间
		$(".date-time-picker").find("input[type='radio']").click(function () {
			if ($(this).attr("id") == "timeRadio") {
				//时刻
				t.myDateSelecter.setCurrentTime(t.myNowTime.getCurrentTime(false));
				$(".dateSelect1").attr("disabled", "disabled");
				$("#preCheck").css({"display": "none"});
				$("#div_Station").find("table.active button").removeClass("dis").removeClass("active");
			} else {
				//时段
				t.myDateSelecter.setCurrentTime(t.myNowTime.getDefineCurrentTime(6));
				$(".dateSelect1").removeAttr("disabled");
				$("#preCheck").css({"display": "block"});
				$("#div_Station").find("table.active button").removeClass("active").addClass("dis");
			}
		});

		//降水时段查询
		$("#preSum").click(function(){
			t.historyCheck = true;
			fnCimiss.clearCimissDisplay();
			$($("#div_Station").find("table button")).removeClass("active");
			var timeNow = new Date();
			var timeStart = new Date(t.myDateSelecter1.input.val());
			var timeEnd  = new Date(t.myDateSelecter2.input.val());
			if(timeStart > timeNow || timeEnd > timeNow){
				layer.alert('时间段不合法，可能某一个是未来时间！', {
					icon: 2
				});
				return;
			}
			var StartTime = t.myDateSelecter1.getCurrentTime(false);
			var EndTime = t.myDateSelecter2.getCurrentTime(false);
			var timeNow = new Date();
			if(timeStart > timeEnd){
				var timeTem = timeStart;
				timeStart = timeEnd;
				timeEnd = timeTem;
				StartTime = t.myDateSelecter2.getCurrentTime(false);
				EndTime = t.myDateSelecter1.getCurrentTime(false);
			}
			var timeDiff = (timeEnd - timeStart)/(24*60*60*1000);
			if(timeDiff >= 3){
				layer.alert('3天以上的查询结果可能稍慢，请耐心等待...', {
					icon: 2
					, time: 3000 //2秒关闭（如果不配置，默认是3秒）
				});
			}
			var SurType = "SURF_CHN_MUL_HOR";
			var stype = [];
			$("#stationCheck").find("input[type='checkbox']:checked").each(function(){
				stype.push($(this).attr("flag"));
			});
			var slevParm = [];
			if(stype.length > 1){
				slevParm = ["011","012","013","014"];
			}else if($.inArray("nstation",stype) > -1){
				slevParm = ["011","012","013"];
			}else{
				slevParm = ["014"];
			}
			slevParm = ["011","012","013","014"];
			fnCimiss.getStationStatis("PRE_1h", [StartTime,EndTime],SurType, "getSurfEleInRegionByTimeRange", slevParm, "getMultipleStationSuccess", function(){
				$("#stationCheck").find("input[type='checkbox']:checked").each(function(){
					if(m_layerPlot != null){
						var points = m_layerPlot.getFeaturesByAttribute("stype", $(this).attr("flag"));
						if(points.length>0){
							$(points).each(function(i,e){
								if(((showName.indexOf("PRE") >-1 || showName.indexOf("preSum") >-1 ) && (e.attributes[showName]*1 == 0))){
									e.style.display = "none";
								}else{
									e.style.display = "block";
								}

							});
						}
						m_layerPlot.redraw();
					}
				});
				t.displayPrams();
			});
			//t.displayStationStatis(preSum);
		});
		$('.realRadar').click(function(e){
			showRealRadar();
		});
		// 雷达数据图
		$('.GST-FOR-VAL').click(function (e) {
			var flag = $(this).attr('flag');
			var regExp = /[-\s:]/g; //匹配冒号空格减号
			var curDate = $('#datetime').find('input').val().replace(regExp, '');
			var zeroStr = '', suffix = '.png', fileName = '';
			var reqUrl = host+'/mosaicpic/';
			for (var i = flag.length; i < 3; i++) {
				zeroStr += '0';
			}
			$("#map_title_div").html($('#datetime').find('input').val()+" 未来"+flag*6+"分钟");
			$("#map_title_div").css("display","block");
			fileName = curDate.substring(0, 12) + '00.' + zeroStr + flag + suffix;
			displayRadar(reqUrl + fileName);
			console.log(reqUrl + fileName);
		});
		// 雷达动画播放
		var timerId;
		$('#GST_animation').click(function (e) {
			var regExp = /[-\s:]/g; //匹配冒号空格减号
			var curDate = $('#datetime').find('input').val().replace(regExp, '');
			var suffix = '.png', fileName = '';
			var reqUrl = host+'/mosaicpic/';
			var curIndex = 1;
			if ($(this).attr("flag")==undefined||$(this).attr("flag")=="start")
			{
				$(this).attr("flag","stop");
				$(this).text("停止");
				timerId = setInterval(function (e) {
					if (curIndex >= 10) {
						curIndex = 1;
					} else {
						curIndex++;
					}
					var str = curIndex < 10 ? "00" : "0";
					fileName = curDate.substring(0, 12) + '00.' + str + curIndex + suffix;
					$("#map_title_div").html($('#datetime').find('input').val()+" 未来"+curIndex*6+"分钟");
					$("#map_title_div").css("display","block");
					displayRadar(reqUrl + fileName);
				}, 2000)
			}else{
				$(this).attr("flag","start");
				$(this).text("动画播放");
				clearTimeout(timerId);
			}
		});

		//站点类型控制
		$("#stationCheck").find("input[type='checkbox']").click(function(){
			if(m_layerPlot != null){
				var typeStr = $(this).attr("flag");
				// index(4) 格点实况
				if ($(this).index() == 4) {
					$("#stationCheck").find("input[type='checkbox']").removeAttr('checked');
					this.checked = true;
				} else {
					$("#chkGridReal").removeAttr('checked');
				}

				if(this.checked){
					$(m_layerPlot.getFeaturesByAttribute("stype", typeStr)).each(function(i,e){
						if(((showName.indexOf("PRE") >-1 || showName.indexOf("preSum") >-1 ) && (e.attributes[showName]*1 == 0))){
							e.style.display = "none";
						}else{
							e.style.display = "block";
						}
					});
				}else{
					$(m_layerPlot.getFeaturesByAttribute("stype", typeStr)).each(function(i,e){
						//e.style = {"display":"none"};
						e.style.display = "none";
					});
				}
				m_layerPlot.redraw();
			}
		});

		//气象要素点击事件
		$("#div_Station").find("button").click(function(){
			t.historyCheck = false;
			if ($(this).hasClass("active")) {
				return;
			}else {
				$("table.active button.active").removeClass("active");
				$(this).addClass("active");
				getDataByType();
			}
		});

		//$("#map_title_div").html($('#datetime').find('input').val()+" "+$("#currentNav").html().split("&gt;")[1]);
		//$("#map_title_div").css('dispaly','block');
		setTimeout(function() {
			$($("table.active button")[0]).addClass("active");
			//实况监测 monitor
			ZHJCMonitor();
			getAllCntys("cnty");
		},500);
		function ZHJCMonitor(){
			getDataByType();
			//dmt.ZHJCWarning();
			setTimeout(function(){
				if(GDYB.Page.curPage == GDYB.SKZLPage){
					ZHJCMonitor();
				}
			},30*60*1000);
		}
		//获取山东各级行政单位区域
		function getAllCntys(level){
			//cty : 市级行政单位;cnty : 县级行政单位
			var para = {};
			para.areaCode = "37";
			para.level = level;
			para = JSON.stringify(para); //对象转换为json
			var url= gridServiceUrl+"services/AdminDivisionService/getDivisionInfos";
			$.ajax({
				data: {"para": para},
				url: url,
				dataType: "json",
				type: "POST",
				success: function (data) {
					if (typeof(data) != "undefined") {
						var areaDatas = [];
						for (var k = 0; k < data.length; k++) {
							var objData = $.parseJSON(data[k]);
							areaDatas.push(objData);
						}
						GDYB.GridProductClass.cntyDatas = areaDatas;
					}
				}
			});
		}
		$("#displayCity").click(function(){
			var pageElement = GDYB.GridProductClass.currentElement || showName;
			if( pageElement.indexOf("TEM")>-1 || pageElement.indexOf("preSum")>-1|| pageElement.indexOf("GST")>-1 || pageElement.indexOf("PRE")>-1 || pageElement.indexOf("RHU")>-1){
				var fillcolors = new FillColors();
				if($("#displayCity").hasClass("active")){
					$("#displayCity").removeClass("active");
					if(fnColors.layerCntyColor != null){
						fnColors.layerCntyColor.removeAllFeatures();
						fnColors.layerCntyColor.visibility = false;
					}
					if(!$("#buttonDisplayIsoSurface")[0].checked){
						GDYB.LegendCimiss.showLegendItem("","","hidden",null,"desc","");
					}
					fillcolors.noFill();
					GDYB.LegendCimiss.update(null);
				}else{
					$("#displayCity").addClass("active");
					fillcolors.fill();
					fnColors.layerCntyColor.visibility = true;
					var sdCity=GDYB.SKZLPage.map.getLayersByName("sdCity");
					if  (sdCity.length>0)
					{
						GDYB.SKZLPage.map.setLayerIndex(sdCity[0], 998);
					}
					GDYB.SKZLPage.map.setLayerIndex(GDYB.SKZLPage.baseLayerLabel, 999);
					if(m_style != null){
						//GDYB.LegendCimiss.update(m_style);
						var titleStr = GDYB.SKZLPage.getLtitle(showName);
						GDYB.LegendCimiss.showLegendItem(showName,titleStr,"visible",m_style,"desc","");
					}
				}
			}
		});

		//自定义字体大小
		$("#fontSize").find("img").click(function(){
			if($(this).hasClass("dateBtn1")){
				var x = $("#vstr").val()*1-1;
				$("#vstr").val(x<0?0:x);
			}else{
				var x = $("#vstr").val()*1+1;
				$("#vstr").val(x<0?0:x);
			}
			var value = $("#vstr").val();
			setFontSize(value);
		});
		$("#vstr").change(function(){
			var value = $("#vstr").val();
			setFontSize(value);
		});
		function setFontSize(value){
			for(var i in plotStyles_skzl) {
				$.each(plotStyles_skzl[i].style,function(name,val){
					if(name.toString() == "fontSize"){
						plotStyles_skzl[i].style[name] = value+"px";
					}
				});
			}
			if(m_layerPlot != null){
				m_layerPlot.redraw();
			}
			var AQILayer = GDYB.Page.curPage.map.getLayersByName("AQILayer")[0];
			if(AQILayer != null){
				$(AQILayer.features).each(function(i,e){
					e.style.fontSize = value+"px";
				});
				AQILayer.redraw();
			}
		}
		function ENVIJC(element){
			showName = "";
			GDYB.SKZLPage.ENVIAreaDisplay();
		}

		// 填值显隐
		$("#buttonDisplayPlot").click(function(){
			var index = queryPlotStyle_skzl(plotStyles_skzl, showName);
			if(m_layerPlot != null){
				if(this.checked){
					//m_layerPlot.setVisibility(true);
					//plotStyles_skzl[index].visible = true;
					$(m_layerPlot.features).each(function(i,e){
						e.style.display = "block";
					});
				}else{
					//plotStyles_skzl[index].visible = false;
					$(m_layerPlot.features).each(function(i,e){
						e.style.display = "none";
					});
				}
				m_layerPlot.redraw();
			}
		});
		// 站点显隐
		$("#buttonDisplaysoStation").click(function(){
			if(m_layerPlot != null){
				if(this.checked){
					plotStyles_skzl[0].visible = true;
				}else{
					plotStyles_skzl[0].visible = false;
				}
				m_layerPlot.redraw();
			}
		});
		//填色显隐
		$("#buttonDisplayFill").click(function(){
			if(m_layerFillRangeColor != null){
				if(this.checked){
					m_layerFillRangeColor.isSmooth = false;
					m_layerFillRangeColor.refresh();
				}else{
					m_layerFillRangeColor.isSmooth = true;
					m_layerFillRangeColor.refresh();
				}
			}
		});
		//等值线
		$("#buttonDisplayContour").click(function(){
			if(m_layerContour != null){
				//m_layerContour.setVisibility(!m_layerContour.visibility);
				if(this.checked){
					dmt.locationMapByCode('37',true);
					m_layerContour.setVisibility(true);
					var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
					coverLayer&&coverLayer.setVisibility(true);
 				}else{
					m_layerContour.setVisibility(false);
					var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
					coverLayer&&coverLayer.setVisibility(false);
				}
			}
		});
		//色斑图
		$("#buttonDisplayIsoSurface").click(function(){
			if(m_layerFillRangeColor != null){
				if(this.checked){
					//GDYB.LegendCimiss.update(m_style);
					var titleStr = t.getLtitle(showName);
					GDYB.LegendCimiss.showLegendItem(showName,titleStr,"visible",m_style,"desc","");
					$("#dsControl").show();
					dmt.locationMapByCode('37',true);
					m_layerFillRangeColor.setVisibility(true);
					m_layerFillRangeColor.isSmooth = true;
					m_layerFillRangeColor.refresh();
					var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
					coverLayer&&coverLayer.setVisibility(true);
				}else{
					GDYB.LegendCimiss.update(null);
					GDYB.LegendCimiss.showLegendItem(showName,showName,"visible",null,"desc","");
					$("#dsControl").hide();
					m_layerFillRangeColor.setVisibility(false);
					m_layerFillRangeColor.refresh();
					var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
					coverLayer&&coverLayer.setVisibility(false);
				}
			}
		});

		// 2017-4-13 16:40:03 add Sean 15为风速的样式的对象
		$('#buttonDisplayWinSpeed').click(function () {
			var index = queryPlotStyle_skzl(plotStyles_skzl, 'WIN_S_Max_label');
			if(m_layerPlot != null){
				if(this.checked){
					plotStyles_skzl[index].visible = true;
				}else{
					plotStyles_skzl[index].visible = false;
				}
				m_layerPlot.redraw();
			}
		});

		// 高亮显示国家站
		$('#buttonDisplayCountry').click(function () {
			if(m_layerPlot != null){
				if (this.checked) {
					$(m_layerPlot.getFeaturesByAttribute("stype", 'nstation')).each(function(i,e){
						var rd = e.style.pointRadius*1;
						setPointColor(e, '#FF0000', rd+2);
					});
				} else {
					$(m_layerPlot.getFeaturesByAttribute("stype", 'nstation')).each(function(i,e){
						//var rd = m_layerPlot.getFeaturesByAttribute("stype", 'rstation')[0].style.pointRadius*1;
						var ZoomIndex = GDYB.Page.curPage.map.getZoom();
						var rd = 1.5;
						if(ZoomIndex*1 > 10){
							rd = 4.5;
						}else if(ZoomIndex*1 > 8){
							rd = 2;
						}else{
							rd = 1.5;
						}
						setPointColor(e, '#0000FF', rd);
					});
				}
				m_layerPlot.redraw();
			}
		});

		/**
		 * 设置发射点颜色
		 * @param pointObj 发射点样式对象
		 * @param colorHex 16进制颜色值
		 * @param pointRadius 发射点半径
		 */
		function setPointColor (pointObj, colorHex, pointRadius) {
			pointObj = pointObj || {};
			colorHex = colorHex || '#000000';
			pointRadius = pointRadius || 1;
			pointObj.style.fillColor = pointObj.style.strokeColor = colorHex;
			pointObj.style.pointRadius = pointRadius;
		}

		//获取指定样式下标
		function queryPlotStyle_skzl (plotStyle, fieldName) {
			for (var i in plotStyle)
				if (plotStyle[i].field == fieldName)
					return i;
			return -1;
		}

		//点击上翻(日期)
		t.myDateSelecter.leftBtn.click(function(){
			onChangeDateTime();
		});

		//点击下翻(日期)
		t.myDateSelecter.rightBtn.click(function(){
			onChangeDateTime();
		});

		//点击上翻(分钟)
		t.myDateSelecter.leftBtn1.click(function(){
			onChangeDateTime();
		});

		//点击下翻(分钟)
		t.myDateSelecter.rightBtn1.click(function(){
			onChangeDateTime();
		});

		//点击时次
		this.myDateSelecter.input.change(function(){
			onChangeDateTime();
		});
		function onChangeDateTime(){
			//$("#stationCheck").find("input[type='checkbox']").attr("checked","checked");
			if(!(GDYB.Page.curPage.map.getLayersByName("AQILayer")[0] == null || typeof(GDYB.Page.curPage.map.getLayersByName("AQILayer")[0]) == "undefined")){
				GDYB.Page.curPage.map.getLayersByName("AQILayer")[0].removeAllFeatures();
				dmt.closeAQIWin();
			}
			/*if(m_layerPlot != null){
				m_layerPlot.removeAllFeatures();
			}*/
			getDataByType();
		}
		function showRealRadar(){
			var regExp = /[-\s:]/g; //匹配冒号空格减号
			var curDate = $('#datetime').find('input').val().replace(regExp, '');
			var zeroStr = '', suffix = '.png', fileName = '';
			var reqUrl = host+'/mosaicpic/';
			$("#map_title_div").html($('#datetime').find('input').val()+" 实况雷达");
			$("#map_title_div").css("display","block");
			fileName = curDate.substring(0, 12) + '00'+ suffix;
			displayRadar(reqUrl + fileName);
			console.log(reqUrl + fileName);
		}
		/**
		 * 下面的内容很暴力 服务器可以访问数据后需要修改的
		 * @param url
		 */
		function displayRadar(url){
			var radarParam = {};
			radarParam.url = url;
			radarParam.bounds = new WeatherMap.Bounds(114,34,122,38);
			var options = {useCanvas:true,isBaseLayer:false};
			t.raderLayer = new WeatherMap.Layer.Image(
				"radar",
				radarParam.url,
				radarParam.bounds ,
				options
			);
			clearRadarLayer();
			t.raderLayer.setOpacity(0.5);
			GDYB.Page.curPage.map.addLayer(t.raderLayer);
		}
		//清楚雷达数据
		function clearRadarLayer(){
			var radarList = GDYB.Page.curPage.map.getLayersByName("radar");
			if(radarList){
				for(var i=0;i<radarList.length;i++){
					GDYB.Page.curPage.map.removeLayer(radarList[i]);
					radarList[i].destroy();
				}
			}
		}
		//按要素类型获取数据
		function getDataByType(){
			fnCimiss.clearCimissDisplay();
			GDYB.LegendCimiss.showLegendItem("","","hidden",null,"desc","");
			var curButton = $("#div_Station").find("table.active button.active");
			if($(curButton).hasClass("dis")){
				//alert("请点击查询按钮进行查询！");
				layer.alert('请点击查询按钮进行查询！', {
					icon: 2
					, time: 3000 //2秒关闭（如果不配置，默认是3秒）
				});
				return;
			}
			var stype = [];
			$("#stationCheck").find("input[type='checkbox']:checked").each(function(){
				stype.push($(this).attr("flag"));
			});
			var slevParm = [];
			if(stype.length > 1){
				slevParm = ["011","012","013","014"];
			}else if($.inArray("nstation",stype) > -1){
				slevParm = ["011","012","013"];
			}else{
				slevParm = ["014"];
			}
			slevParm = ["011","012","013","014"];
			var control = $("#div_Station").find("table.active").attr("id");
			var element = $(curButton).attr("id").split("|")[1];
			if(control.indexOf("CIMISS")>-1){
				var titleLeft = $('#datetime').find('input').val()+" "+$("#currentNav").html().split("&gt;")[1];
				var titleRight = "-"+$(curButton).html();
				if(!(element == "PRS" || element == "VIS" || element == "RHU" || element == "newSplash")){
					$("#map_title_div").html(titleLeft + titleRight);
				}else{
					$("#map_title_div").html(titleLeft);
				}
				$("#map_title_div").css('dispaly','block');
				layer.closeAll();
				fnCimiss.closeMyInfoWin();
				dmt.closeAQIWin();
				fnColors.CimissData = null;
				fnCimiss.getAutomaticStationData(element, t.myDateSelecter.getCurrentTime(false),slevParm,function(){
					var legend = null;
					var legendFlag = $("#buttonDisplayIsoSurface")[0].checked;
					if(legendFlag){
						legend = m_style;
					}
					var plotFlag = $("#buttonDisplayPlot")[0].checked;
					var lineFlag = $("#buttonDisplayContour")[0].checked;
					var faceFlag = $("#buttonDisplayIsoSurface")[0].checked;
					$("#txtContent").val("");
					$("#MapToolsDiv").css("display","none");
					//此函数参数对应的 目标依次是图例，填值，等值线，色斑图
					t.CIMISSDispaly(null,plotFlag,lineFlag,faceFlag);
					if(faceFlag){
						var titleStr = t.getLtitle(showName);
						GDYB.LegendCimiss.showLegendItem(showName,titleStr,"visible",m_style,"desc","");
					}
					if(element == "newSplash"){
						if(m_layerPlot != null){
							t.CIMISSDispaly(null,true,false,false);
						}
						showName = "";
					}
					var showCount = 0;
					$("#stationCheck").find("input[type='checkbox']:checked").each(function(){
						if(m_layerPlot != null){
							var points = m_layerPlot.getFeaturesByAttribute("stype", $(this).attr("flag"));
							if(points.length>0){
								$(points).each(function(i,e){
									if(showName == "WIN_S_Max_24h" || showName == "WIN_S_Inst_Max_24h") {
										var fStr = showName.split("_24h")[0];
										if(e.attributes[fStr]*1 == 0){
											e.style.display = "none";
										}else{
											e.style.display = "block";
											showCount++;
										}
									}else if(((showName.indexOf("PRE") >-1 || showName.indexOf("preSum") >-1 ) && (e.attributes[showName]*1 == 0))){
										e.style.display = "none";
									}else{
										e.style.display = "block";
										showCount++;
									}
								});
							}
							m_layerPlot.redraw();
						}
					});
					if(m_layerPlot == null || m_layerPlot.features.length < 1){
						$("#div_progress").css("display", "none");
						layer.alert('系统暂无 Cimiss 数据！', {
							icon: 2
						});
						return;
					}
					if(showCount < 1){
						$("#div_progress").css("display", "none");
						layer.alert('数据存在，但系统不显示已过滤的无效值！', {
							icon: 2
						});
					}
				});
			}
			if(control.indexOf("ENVI")>-1){
				var titleLeft = $('#datetime').find('input').val()+" "+$("#currentNav").html().split("&gt;")[1];
				var titleRight = "-"+$(curButton).html();
				$("#map_title_div").html(titleLeft + titleRight);
				$("#map_title_div").css('dispaly','block');
				$("#displayType").find("input[type='checkbox']").attr("checked",false);
				($("#displayType").find("input[type='checkbox']")[0]).checked = true;
				$("#dsControl").hide();
				t.CIMISSDispaly(null,false,false,false);
				ENVIJC(element);
			}
			if(control.indexOf("RADER")>-1){
				t.CIMISSDispaly(null,false,false,false);
				if (element=="radar"){
					showRealRadar();
				}
				var element = "swan_2dcrmosaic";
				var level = 0; //仰角
				var datetime = t.myDateSelecter.getCurrentTime(false);
				// GDYB.RadarDataClass.displayRadarData(null, element, level, datetime);
				// displayRadar('http://10.76.10.166:8081/mosaicpic/201703151048.010.png');
			}
			if(control.indexOf("CLOUD")>-1){
				var titleLeft = $('#datetime').find('input').val()+" "+$("#currentNav").html().split("&gt;")[1];
				var titleRight = "-"+$(curButton).html();
				$("#map_title_div").html(titleLeft + titleRight);
				$("#map_title_div").css('dispaly','block');
				t.CIMISSDispaly(null,false,false,false);
				GDYB.MicapsDataClass.displayMicapsData(null, this.id, 1000, t.myDateSelecter.getCurrentTime(false), 0);
				//displayMicaps(this.id, 1000, t.myDateSelecter.getCurrentTime(false), 0);
				function displayMicaps(element, level, datetime, hourspan){
					//GDYB.MicapsDataClass.displayMicapsData(null, element, level, datetime, hourspan);
				};
			}
		}
	}
	this.displayPrams = function(){
		var legend = null;
		var legendFlag = $("#buttonDisplayIsoSurface")[0].checked;
		if(legendFlag){
			legend = m_style;
		}
		var plotFlag = $("#buttonDisplayPlot")[0].checked;
		var lineFlag = $("#buttonDisplayContour")[0].checked;
		var faceFlag = $("#buttonDisplayIsoSurface")[0].checked;
		GDYB.SKZLPage.CIMISSDispaly(null,plotFlag,lineFlag,faceFlag);
		if(faceFlag){
			var titleStr = GDYB.SKZLPage.getLtitle(showName);
			GDYB.LegendCimiss.showLegendItem(showName,titleStr,"visible",m_style,"desc","");
		}
	}
	this.CIMISSDispaly = function(legend,plot,line,face){
		GDYB.LegendCimiss.update(legend);
		GDYB.LegendCimiss.showLegendItem(showName,showName,"visible",legend,"desc","");
		if(m_layerPlot != null) {
			m_layerPlot.setVisibility(plot);
		}
		if(m_layerContour != null){
			m_layerContour.setVisibility(line);
		}
		if(m_layerFillRangeColor != null) {
			if (face) {
				m_layerFillRangeColor.setVisibility(true);
				m_layerFillRangeColor.isSmooth = true;
				//m_layerFillRangeColor.setOpacity(0.1);
				m_layerFillRangeColor.refresh();
			} else {
				m_layerFillRangeColor.setVisibility(false);
				//m_layerFillRangeColor.isSmooth = true;
				m_layerFillRangeColor.refresh();
			}
		}
	}
	//单站数据 HigthCHarts 图表展示
	this.displayStationChart =  function(list){
		if(list.length==0)
			return;
		var allDayFlag = false;
		if(showName.indexOf("24h") > -1 || showName.indexOf("GST_") > -1){
			allDayFlag = true;
		}
		var lonLat = new WeatherMap.LonLat(list[0].Lon,list[0].Lat);
		var stationName = list[0].Station_Name;
		var etime = timeTo(list[list.length-1].Datetime,false);
		var stime = timeTo(list[0].Datetime,false);
		var endTime = allDayFlag?(etime.getDate()+ "日" ):(etime.getDate()+ "日" + etime.getHours() +"时");
		var startTime = allDayFlag?(stime.getDate()+ "日"):(stime.getDate()+ "日" + stime.getHours() +"时");
		var eleStr = dmt.getFileName(GDYB.SKZLPage.historyCheck?"":$("#div_Station").find("table.active button.active").html())||dmt.getFileName($("#currentNav").html().split("&gt;")[1]);
		var title = stationName +" "+ startTime +" 到 " + endTime +" " + eleStr + " 实况";
		if(GDYB.SKZLPage.historyCheck){
			title = stationName +" "+ startTime +" 到 " + endTime +" 历史降水查询";
		}
		var contentHTML = "<div style='border-radius: 6px;'>";
		//contentHTML += "<span id='closeTab' style='color:#333333;font-weight:bold;font-size:12px;cursor:pointer;z-index:100;border:1px solid #666666;position:absolute;bottom:60px;right:18px;height:22px;border-radius: 6px;line-height: 18px;text-align:center;padding:2px' title='关闭' onclick='fnCimiss.closeMyInfoWin()' >关闭</span>";
		contentHTML += '<span id="closeTab" style="cursor:pointer;z-index:100;position:absolute;top:15.5px;right:36px;" title="关闭" onclick="fnCimiss.closeMyInfoWin()" ><img id="cwImg" src="imgs/winClose.png" /></span>';
		contentHTML += "<div class='chartDiv'>";
		contentHTML += "<div id='precipitation' class='chartElement' ></div>";
		contentHTML += "</div>";
		contentHTML += "</div>";
		windowInfoXY(lonLat,contentHTML);
		$("#myInfoWin").css("border-radius","6px");
		var tabFlag = "";
		var parms = [];
		if($("#div_Station").find("table.active button.active").length != 0) {
			/*
			$("#div_Station").find("table.active button.active").each(function () {
				var temp = $(this).attr("id").split("|")[1];
				if(temp.indexOf("rain_") > -1){
					temp = "PRE_1h";
				}
				if(temp == "ALL") {
					tabFlag = "ALL";
					parms = ["PRE_1h", "TEM", "WIN_S_Avg_10mi","RHU", "PRS"];
				}else{
					parms.push(temp);
				}
			});
			*/
			if(allDayFlag){
				parms.push(showName.split("_24h")[0]);
			}else{
				parms.push(showName);
			}
		}else{
			parms.push(showName);
		}
		//highcharts数据分类，此处可拓展多种数据，现只使用一种
		var allData = {};
		for(var index in parms){
			allData[parms[index]]= {};
			allData[parms[index]].labels = [];
			allData[parms[index]].datasets = [];
			for(var i in list){
				//返回北京时
				var dateNew = timeTo(list[i].Datetime,false);
				var day = dateNew.getDate();
				var hour = dateNew.getHours();
				if(allDayFlag){
					allData[parms[index]].labels.push(day + "日");
				}else{
					allData[parms[index]].labels.push(day + "日/" + hour+"时");
				}
				allData[parms[index]].datasets.push(replaceInvalid((list[i][parms[index]])*1));
			}
		}
		if(tabFlag == "ALL"){
			displayMultipleHighCharts(allData);
		}else{
			displayHighCharts(allData);
		}
		function displayHighCharts(datas) {
			Highcharts.setOptions({
				lang: {
					loading: '',
					printChart:'打印',
					downloadJPEG: '',
					downloadPDF: '导出 PDF',
					downloadPNG: '导出 PNG',
					downloadSVG: ''
				},
				colors : ['#f7a35c','#7cb5ec','#00ff00','#4972A4','#8085e9']
			});
			var labels = [];
			var data = [];
			var labelFlag = 0;
			var dataType,yText,vSuffix = "";
			var colors = ['#f7a35c'];
			var chartType = 'line'
			$.each(datas, function(x, val) {
				if(labelFlag<1){
					labels = val.labels;
					dataType = x;
				}
				var temp = {};
				if(typeof(val) == "object"){
					switch(dataType){
						case "TEM" :{
							yText = '温度';
							vSuffix = " °C ";
							colors = ['#f7a35c'];
						}
							break;
						case "TEM_Max" :{
							yText = '小时最高温';
							vSuffix = " °C ";
							colors = ['#FF2C00'];
						}
							break;
						case "TEM_Min" :{
							yText = '小时最低温';
							vSuffix = " °C ";
							colors = ['#f7a35c'];
						}
							break;
						case "GST" :{
							yText = '地表温度';
							vSuffix = " °C ";
							colors = ['#BD5552'];
						}
							break
						case "GST_Max" :{
							yText = '地表最高温';
							vSuffix = " °C ";
							colors = ['#BD5552'];
						}
							break
						case "GST_Min" :{
							yText = '地表最低温';
							vSuffix = " °C ";
							colors = ['#BD5552'];
						}
							break
						case "TEM_Max_24h" :{
							yText = '日最高温';
							vSuffix = " °C ";
							colors = ['#BD5552'];
						}
							break
						case "TEM_Min_24h" :{
							yText = '日最低温';
							vSuffix = " °C ";
							colors = ['#BD5552'];
						}
							break
						case "PRE_1h" :{
							yText = '降水';
							vSuffix = " mm ";
							colors =  ['#127CCB'];
							chartType = 'column'
						}
							break;
						case "PRE" :{
							yText = '降水';
							vSuffix = " mm ";
							colors =  ['#127CCB'];
							chartType = 'column'
						}
							break;
						case "RHU" :{
							yText = '湿度';
							vSuffix = " % ";
							colors = ['#62a545'];
						}
							break;
						case "WIN_S_Avg_10mi" :{
							yText = '风速';
							vSuffix = " m/s ";
							colors = ['#4972A4'];
						}
							break;
						case "WIN_S_Max" :{
							yText = '风速';
							vSuffix = " m/s ";
							colors = ['#4972A4'];
						}
							break;
						case "WIN_S_Inst_Max" :{
							yText = '风速';
							vSuffix = " m/s ";
							colors = ['#4972A4'];
						}
							break;
						case "WIN_S_Inst_Max_12h" :{
							yText = '风速';
							vSuffix = " m/s ";
							colors = ['#4972A4'];
						}
							break;
						case "PRS" :{
							yText = '气压';
							vSuffix = " 百帕 ";
							colors = ['#292726'];
						}
							break;
						case "VIS" :{
							yText = '能见度';
							vSuffix = " m ";
							colors = ['#A5E3F7'];
						}
							break;
					}
					temp.name = '  ';
					temp.data = val.datasets;
					data.push(temp);
					labelFlag++;
				}
			});
			var chart = new Highcharts.Chart('precipitation', {
				chart: {
					type: chartType,
					zoomType: 'xy'
				},
				title: {
					text: title,
					x: -20
				},
				/*
				//副标题
				subtitle: {
					text: '数据来源: CIMISS',
					x: -20
				},
				*/
				xAxis: {
					categories: labels
				},
				yAxis: {
					title: {
						//text: '温度 (°C)'
						text: yText+" ("+vSuffix+")"
					},
					plotLines: [{
						value: 0,
						width: 0.1,
						color: '#808080'
					}]
				},
				tooltip: {
					//valueSuffix: '°C'
					valueSuffix: vSuffix
				},
				colors:colors,
				legend: {
					enabled : false,
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				//图形细节控制
				plotOptions: {
					series: {
						lineWidth: 1,
						fillOpacity: 0.1,
						marker: {
							radius: 3,  //曲线点半径，默认是4
							symbol: 'circle', //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
							states: {
								hover: {
									enabled: true,
									radius: 3
								}
							}
						}
					}
				},
				series: data
			});
		}
		function displayMultipleHighCharts(allData){
			var labelFlag = 0;
			var theLabel = [];
			var TEM,PRE,RHU,WIN_S_Avg_10mi,PRS = {};
			$.each(allData, function(name, value) {
				var dataType = "";
				dataType = name;
				if(labelFlag<1){
					theLabel = value.labels;
				}
				if(typeof(value) == "object"){
					switch(dataType){
						case "TEM" :{
							TEM = {
								name: '气温',
								type: 'spline',
								yAxis: 0,
								data: value.datasets,
								tooltip: {
									valueSuffix: ' °C'
								}
							}
						}
							break;
						case "PRE_1h" :{
							PRE = {
								name: '降水',
								type: 'column',
								yAxis: 1,
								data: value.datasets,
								tooltip: {
									valueSuffix: ' mm'
								}
							}
						}
							break;
						case "RHU" :{
							RHU = {
								name: '湿度',
								type: 'line',
								yAxis: 2,
								data: value.datasets,
								tooltip: {
									valueSuffix: ' %'
								}
							}
						}
							break;
						case "WIN_S_Avg_10mi" :{
							WIN_S_Avg_10mi = {
								name: '风',
								type: 'line',
								yAxis: 3,
								data: value.datasets,
								tooltip: {
									valueSuffix: ' m/s'
								}
							}
						}
							break;
						case "PRS" :{
							PRS = {
								name: '气压',
								type: 'line',
								yAxis: 4,
								data: value.datasets,
								tooltip: {
									valueSuffix: ' 百帕'
								}
							}
						}
							break;
					}
					labelFlag++;
				}
			});
			var mulitpleData = [TEM,PRE,RHU,WIN_S_Avg_10mi,PRS];
			Highcharts.setOptions({
				lang: {
					loading: '...',
					printChart:'打印',
					downloadJPEG: '',
					downloadPDF: '导出 PDF',
					downloadPNG: '导出 PNG',
					downloadSVG: ''
				},
				colors : ['#f7a35c','#127CCB','#62a545','#4972A4','#292726']
			});
			$('#precipitation').highcharts({
				chart: {
					zoomType: 'xy'
				},
				title: {
					text: stationName +" "+ startTime +" 到 " + endTime +"  综合填图"
				},
				/*
				subtitle: {
					text: '数据来源: CIMISS'
				},
				*/
				xAxis: [{
					categories: theLabel,
					crosshair: true
				}],
				yAxis: [{
					title: {
						text: '气温',
						style: {
							color: Highcharts.getOptions().colors[0]
						}
					},labels: {
						format: '{value}°C',
						style: {
							color: Highcharts.getOptions().colors[0]
						}
					},
					opposite: false
				}, {
					gridLineWidth: 0,
					title: {
						text: '降水',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					labels: {
						format: '{value} mm',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					}
				},{
					title: {
						text: '湿度',
						style: {
							color: Highcharts.getOptions().colors[2]
						}
					},
					labels: {
						format: '{value} %',
						style: {
							color: Highcharts.getOptions().colors[2]
						}
					},
					opposite: true
				},{
					title: {
						text: '风',
						style: {
							color: Highcharts.getOptions().colors[3]
						}
					},
					labels: {
						format: '{value} m/s',
						style: {
							color: Highcharts.getOptions().colors[3]
						}
					},
					opposite: true
				},{
					title: {
						text: '气压',
						style: {
							color: Highcharts.getOptions().colors[4]
						}
					},
					labels: {
						format: '{value} 百帕',
						style: {
							color: Highcharts.getOptions().colors[4]
						}
					},
					opposite: true
				}],
				tooltip: {
					shared: true
				},
				legend: {
					layout: 'vertical',
					align: 'left',
					x: 150,
					verticalAlign: 'top',
					y: 45,
					floating: true,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'RGBA(255,255,255,0.1)'
				},
				series: mulitpleData
			});
		}
		$(".highcharts-credits").remove();
		//$("g title").remove();
		$("g title").html("附加工具");
		//console.log($(".highcharts-button highcharts-contextbuttonhighcharts-button-normal").html());
	}
	//初始化地图气泡
	function windowInfoXY(lonLat,contentHTML){
		var pixel = GDYB.Page.curPage.map.getPixelFromLonLat(lonLat);
		$("#myInfoWin").html(contentHTML);
		var height = parseInt($("#myInfoWindow").css("height"));
		var width = $("#myInfoWindow").css("width");
		var bt = "B";
		var lr = "L";
		$(".myInfoImg").css("display","none");
		$("#myInfo"+bt+lr).css("display","block");
		$("#myInfoWindow").css("top",pixel.y);
		$("#myInfoWindow").css("left",pixel.x);
		$("#myInfoWindow").css("margin-top","-"+(height-2)+"px");
		$("#myInfoWindow").css("margin-left","-51px");
		$("#myInfoWindow").css("display","block");
		GDYB.Page.curPage.map.events.register("move", map, function(event){
			if($("#myInfoWindow").css("display")=="block"){
				var pixel = GDYB.Page.curPage.map.getPixelFromLonLat(lonLat);
				$("#myInfoWindow").css("top",pixel.y);
				$("#myInfoWindow").css("left",pixel.x);
			}
		});
	}
	//字符串世界时-北京时互转 timeStr:time string;  wb:true - b to w;false - w to b
	function timeTo(timeStr,wb){
		var dateTemp = new Date(timeStr);
		var resultDate = new Date();
		if(wb){
			resultDate = new Date(dateTemp.getTime() - 8*60*60*1000);
		}else{
			resultDate = new Date(dateTemp.getTime() + 8*60*60*1000);
		}
		return resultDate;
	}
	this.DisplaySpace = function(){
		function spliceEmpty(Array){
			for(var index = 0; index <Array.length;index++){
				if(dmt.isEmpty(Array[index]) || isNaN(Array[index]) ){
					Array.splice(index,1);
					//上面删除操作会减少数组长度，故对数组下标做-=1 操作
					index-=1;
				}
			}
			return Array;
		}
		var str = $("#displaySpace").val().replace(/，/g,',').replace(/[^0-9-.,]/g,'');
		var index = $("#displaySpaceIndex").val();
		var xyz = m_style;
		var arr1 = str.split(",");
		var arr2 = index.split(",");
		arr1 = spliceEmpty(arr1);
		arr2 = spliceEmpty(arr2);
		arr2.splice(0,1);
		arr1 = dmt.NumberSort(arr1);
		arr2 = dmt.NumberSort(arr2);
		for(var i in arr1){
			if(typeof (arr2[i]) == 'undefined' || typeof (arr2[i]) == null){
				if((arr2[i-1]*1+1) >= xyz.length) {
					arr2.push(xyz.length - 1);
				}else{
					arr2.push(arr2[i-1]*1+1);
				}
			}
			if(i<arr1.length-1){
				var start = arr1[i]*1;
				var end = arr1[i*1+1]*1;
				xyz[arr2[i]*1]["start"] = start;
				xyz[arr2[i]*1]["end"] = end;
			}
		}
		//GDYB.LegendCimiss.update(xyz);
		m_layerFillRangeColor.refresh();
	}
	//环境数据按市级显示
	this.ENVIAreaDisplay = function(){
		var para = {};
		para.areaCode = "37";
		para.level = "cty";
		para = JSON.stringify(para); //对象转换为json
		var url = gridServiceUrl+"services/AdminDivisionService/getDivisionInfos";
		var	params = {"para": para};
		var asyncFlag = true;
		var error ="暂无数据";
		dmt.getDataRecall(function(data){
			if(data != null) {
				var curButton = $("#div_Station").find("table.active button.active");
				var typeStr = $(curButton).attr("id");
				var AQIDatas =  [];
				//测试数据：剥离相同市级单位数据，选相同期各市第一个数据站
				/*
				var tempArray = [];
				for(var k in ENVIDemo){
					var stID = "";
					if(ENVIDemo[k].stationName.indexOf("_")>-1){
						stID = ENVIDemo[k].stationName.split("_")[0];
					}else{
						stID = ENVIDemo[k].stationName;
					}
					if(stID.indexOf("市") < 0){
						stID += "市";
					}
					if($.inArray(stID,tempArray)<0){
						//简单规避无效值
						if(ENVIDemo[k][typeStr]*1 <99999){
							ENVIDemo[k].stationName = stID;
							AQIDatas.push(ENVIDemo[k]);
							tempArray.push(stID);
						}
					}
				}
				*/
				var map = GDYB.Page.curPage.map;
				var AQILayer = map.getLayersByName("AQILayer")[0];
				if(AQILayer != null){
					AQILayer.removeAllFeatures();
				}
				var AQIDatas = dmt.getSDAQIHour(GDYB.Page.curPage.myDateSelecter.getCurrentTime(false),typeStr);
				if(AQIDatas.length < 1){
					alertFuc("系统暂无 环境数据 !");
					return;
				}
				var areaDatas =[];
				for( var k =0;k<data.length;k++){
					var objData = $.parseJSON(data[k]);
					areaDatas.push(objData);
				}
				for(var index in areaDatas){
					var pointArray = [];
					var pointList = areaDatas[index].geometry.points;
					var len = pointList.length;
					for(var i =0; i < len; i++){
						if(pointList[i]!=null){
							var longitude = pointList[i].x;
							var latitude = pointList[i].y;
							var point = new WeatherMap.Geometry.Point(longitude, latitude);
							pointArray.push(point);
						}
					}
					var linearRings = new WeatherMap.Geometry.LinearRing(pointArray);
					var region = new WeatherMap.Geometry.Polygon([linearRings]);
					region.calculateBounds();
					var StyleSet = getCtyColor(areaDatas[index].fieldValues[4],AQIDatas);
					var fillColor = StyleSet.color;
					//var fillColor = "RGBA(255,51,51,0.5)";
					var labelStr =  areaDatas[index].fieldValues[4] +"\n";
					//var labelStr = "";
					labelStr += (((StyleSet.value*1)>9999) || (typeof(StyleSet.value) == "undefined")) ? "暂无数据" : (StyleSet.value)
					var style = {
						label:labelStr,
						fill:true,
						fillColor:fillColor,
						/*fontColor:"RGBA(0,0,0,0.9)",*/
						fontSize:"15px",
						//fontWeight:"bold",
						fillOpacity:1,
						//strokeColor:"RGBA(119,180,254,0.9)",
						strokeOpacity:0.5,
						strokeWidth:1
					}
					var feature = new WeatherMap.Feature.Vector(region,AQIDatas[StyleSet.dIndex],style);
					AQILayer.addFeatures(feature);
				}
				if(AQILayer.features.length < 1) {
					alertFuc("系统当前无 环境 数据!");
					return;
				}
				/*var colorItems = [
				 {start:0,end:50,startColor:{red:16,green:199,blue:16}},
				 {start:50,end:100,startColor:{red:255,green:255,blue:99}},
				 {start:100,end:150,startColor:{red:239,green:125,blue:24}},
				 {start:150,end:200,startColor:{red:231,green:65,blue:66}},
				 {start:200,end:300,startColor:{red:173,green:89,blue:132}},
				 {start:300,end:1000,startColor:{red:57,green:12,blue:8}}
				 ];
				 GDYB.Legend.update(colorItems);*/
				$("#AQI_chart").show().appendTo($("#map"));
				fnSurvey.showGrid(AQIDatas,"SKZL_AQI","城市环境数据详情");
				enviFlag +=1;
				if(enviFlag*1 > 1){
					$("a.layui-layer-min").click();
				}
			}
		},url,params,asyncFlag,error);
	}
	function getCtyColor(stationName,AQIDatas){
		var result = {};
		var curButton = $("#div_Station").find("table.active button.active");
		var typeStr = $(curButton).attr("id");
		result.type = typeStr;
		//这里需要动态选择样式
		var curCty = {};
		for(var i in AQIDatas){
			if(AQIDatas[i].stationName == stationName){
				curCty = AQIDatas[i];
				result.dIndex = i;
			}
		}
		var value = curCty[typeStr]*1;
		result.value = value;
		var colorItems = [
			{start:0,end:50,startColor:{red:16,green:199,blue:16}},
			{start:50,end:100,startColor:{red:255,green:255,blue:99}},
			{start:100,end:150,startColor:{red:239,green:125,blue:24}},
			{start:150,end:200,startColor:{red:231,green:65,blue:66}},
			{start:200,end:300,startColor:{red:173,green:89,blue:132}},
			{start:300,end:1000,startColor:{red:57,green:12,blue:8}}
		];
		result.color = "RGBA(255,255,255,0.39)";
		var len = colorItems.length;
		for(var i =0;i<len; i++){
			var colorItem = colorItems[i];
			if(value >=colorItem.start && value<colorItem.end){
				result.color = "RGBA("+ colorItem.startColor.red +","+colorItem.startColor.green+","+colorItem.startColor.blue+",0.39)";
				break;
			}
		}
		return result;
	}

	this.displayStationStatis = function(sData){
		//时段数据简单规则过滤
		function dataFilter(oldData){
			var tempArray = [];
			var tempDatas = {};
			var realData = [];
			//保护数据，进行对象克隆
			function clone(obj){
				var result ={};
				for(var key in obj){
					result[key]=obj[key];
				}
				return result;
			}
			for(var index in oldData){
				var stID = "";
				stID = oldData[index].Station_Id_d;
				if($.inArray(stID,tempArray) < 0){
					tempDatas[stID] = clone(oldData[index]);
					if(typeof(oldData[index].TEM) != "undefined"){
						tempDatas[stID].temMax = tempDatas[stID].temMin = oldData[index].TEM;
						delete tempDatas[stID]["TEM"];
					}
					if(typeof(oldData[index].PRE_1h) != "undefined"){
						tempDatas[stID].preSum = oldData[index].PRE_1h;
						delete tempDatas[stID]["PRE_1h"];
						GDYB.GridProductClass.currentElement = "preSum";
					}
					if(typeof(oldData[index].RHU) != "undefined"){
						tempDatas[stID].RHUMax = tempDatas[stID].RHUMin = oldData[index].RHU;
						delete tempDatas[stID]["RHU"];
					}
					if(typeof(oldData[index].WIN_S_Avg_10mi) != "undefined"){
						tempDatas[stID].winMax = tempDatas[stID].winMin = oldData[index].WIN_S_Avg_10mi;
						tempDatas[stID].winMax_D = tempDatas[stID].winMin_D = oldData[index].WIN_D_Avg_10mi;
						delete tempDatas[stID]["WIN_S_Avg_10mi"];
						delete tempDatas[stID]["WIN_D_Avg_10mi"];
					}
					if(typeof(oldData[index].PRS) != "undefined"){
						tempDatas[stID].PRSMax = tempDatas[stID].PRSMin = oldData[index].PRS;
						delete tempDatas[stID]["PRS"];
					}
					tempArray.push(stID);
				}else{
					var tempObj = clone(oldData[index]);
					if(typeof(oldData[index].TEM) != "undefined"){
						tempObj.temMax = oldData[index].TEM*1 > tempDatas[stID].temMax*1 ? oldData[index].TEM : tempDatas[stID].temMax;
						tempObj.temMin = oldData[index].TEM*1 < tempDatas[stID].temMin*1 ? oldData[index].TEM : tempDatas[stID].temMin;
						delete tempObj["TEM"];
					}
					if(typeof(oldData[index].PRE_1h) != "undefined") {
						tempObj.preSum = (oldData[index].PRE_1h * 1 + tempDatas[stID].preSum * 1).toString();
						delete tempObj["PRE_1h"];
					}
					if(typeof(oldData[index].RHU) != "undefined") {
						tempObj.RHUMax = oldData[index].RHU*1 > tempDatas[stID].RHUMax*1 ? oldData[index].RHU : tempDatas[stID].RHUMax;
						tempObj.RHUMin = oldData[index].RHU*1 < tempDatas[stID].RHUMin*1 ? oldData[index].RHU : tempDatas[stID].RHUMin;
						delete tempObj["RHU"];
					}
					if(typeof(oldData[index].WIN_S_Avg_10mi) != "undefined") {
						if(oldData[index].WIN_S_Avg_10mi*1 > tempDatas[stID].winMax*1 ){
							tempObj.winMax = oldData[index].WIN_S_Avg_10mi;
							tempObj.winMax_D = oldData[index].WIN_D_Avg_10mi;
						}else{
							tempObj.winMax = tempDatas[stID].winMax;
							tempObj.winMax_D = tempDatas[stID].winMax_D;
						}
						if(oldData[index].WIN_S_Avg_10mi*1 < tempDatas[stID].winMin*1 ){
							tempObj.winMin = oldData[index].WIN_S_Avg_10mi;
							tempObj.winMin_D = oldData[index].WIN_D_Avg_10mi;
						}else{
							tempObj.winMin = tempDatas[stID].winMin;
							tempObj.winMin_D = tempDatas[stID].winMin_D;
						}
						delete tempObj["WIN_S_Avg_10mi"];
						delete tempObj["WIN_D_Avg_10mi"];
					}
					if(typeof(oldData[index].PRS) != "undefined") {
						tempObj.PRSMax = oldData[index].PRS*1 > tempDatas[stID].PRSMax*1 ? oldData[index].PRS : tempDatas[stID].PRSMax;
						tempObj.PRSMin = oldData[index].PRS*1 < tempDatas[stID].PRSMin*1 ? oldData[index].PRS : tempDatas[stID].PRSMin;
						delete tempObj["PRS"];
					}
					tempDatas[stID] = tempObj;
				}
			}
			$.each(tempDatas,function(name,value){
				realData.push(value);
			});
			return realData;
		}
		var newData = dataFilter(sData.DS);
		var map = GDYB.Page.curPage.map;
		var element = "PRE_1h";
		var pointVectors = [];
		var attribute = {};
		var pointVector = null;
		for(var i=0;i<data.length;i++){
			attribute = {};
			var point = new WeatherMap.Geometry.Point(data[i].Lon,data[i].Lat);
			if(typeof(data[i].TEM) != "undefined"){
				attribute["TEM"] = replaceInvalid(data[i].TEM);
			}
			if(typeof(data[i].temMax) != "undefined"){
				attribute["temMax"] = replaceInvalid(data[i].temMax);
			}
			if(typeof(data[i].temMin) != "undefined"){
				attribute["temMin"] = replaceInvalid(data[i].temMin);
			}
			if(typeof(data[i].PRE_1h) != "undefined"){
				attribute["PRE_1h"] = replaceInvalid(data[i].PRE_1h);
			}
			if(typeof(data[i].preSum) != "undefined"){
				attribute["preSum"] = replaceInvalid(data[i].preSum);
			}
			if(typeof(data[i].RHU) != "undefined"){
				attribute["RHU"] = replaceInvalid(data[i].RHU);
			}
			if(typeof(data[i].RHUMax) != "undefined"){
				attribute["RHUMax"] = replaceInvalid(data[i].RHUMax);
			}
			if(typeof(data[i].RHUMin) != "undefined"){
				attribute["RHUMin"] = replaceInvalid(data[i].RHUMin);
			}
			if(typeof(data[i].WIN_S_Avg_10mi) != "undefined"){
				attribute["WIN_S_Avg_10mi"] = getWindLevel(data[i].WIN_S_Avg_10mi);
				attribute["WIN_D_Avg_10mi"] = data[i].WIN_D_Avg_10mi;
			}
			if(typeof(data[i].winMax) != "undefined"){
				attribute["winMax"] = getWindLevel(data[i].winMax);
				attribute["winMax_D"] = data[i].winMax_D;
			}
			if(typeof(data[i].winMin) != "undefined"){
				attribute["winMin"] = getWindLevel(data[i].winMin);
				attribute["winMin_D"] = data[i].winMin_D;
			}
			if(typeof(data[i].PRS) != "undefined"){
				attribute["PRS"] = replaceInvalid(data[i].PRS);
			}
			if(typeof(data[i].PRSMax) != "undefined"){
				attribute["PRSMax"] = replaceInvalid(data[i].PRSMax);
			}
			if(typeof(data[i].PRSMin) != "undefined"){
				attribute["PRSMin"] = replaceInvalid(data[i].PRSMin);
			}
			pointVector = new WeatherMap.Feature.Vector(point, attribute);
			pointVectors.push(pointVector);
		}
	}
	this.test = function(){
		/*
		//测试
		var data ={
			"url":"http://10.76.89.55/cimiss-web/api",
			"userId":GridForecast.CiMissConfig.userId,
			"pwd":GridForecast.CiMissConfig.password,
			"interfaceId":"getSurfEleInRegionByTimeRange",
			"dataCode":"SURF_CHN_MUL_HOR", //中国地面逐小时资料
			"timeRange":"[20170518010000,20170518020000]",
			"adminCodes":GridForecast.CiMissConfig.AreaCode,
			//"elements":"Station_ID_C,Station_Id_d,PRE_1h,PRS,RHU,VIS,WIN_S_Avg_2mi,WIN_D_Avg_2mi,Q_PRS",
			"elements":"Station_Name,City,Cnty,Station_Id_c,Station_Id_d,Admin_Code_CHN,Lat,Lon,Datetime,PRE_3h,PRE_6h,PRE_12h,WIN_S_Max,WIN_D_S_Max",
			"staLevels":"011,012,013,014",
			"orderBy":"Datetime:asc", //排序字段，按照纬度降序排序，从北到南
			"dataFormat":"json"
		}
		debugger;
		//http://10.76.89.55/cimiss-web/api?userId=BEJN_QXT_shandong2&pwd=123456&interfaceId=getSurfEleInRegionByTimeRange&dataCode=SURF_CHN_MUL_HOR&timeRange=[20170518010000,20170518020000]&adminCodes=370000&elements=Station_Name,City,Cnty,Station_Id_c,Station_Id_d,Admin_Code_CHN,Lat,Lon,Datetime,PRE_1h,WIN_S_Max,WIN_D_S_Max&staLevels=011,012,013,014&orderBy=Datetime:asc&dataFormat=json
		var url = gridServiceUrl+"services/ForecastfineService/getCimissDatas";
		var test = JSON.stringify(data);
		var params = {"para": '{"data":'+JSON.stringify(data)+',"eleStr":"ceshi","rtype":"list"}'};
		//console.log(params);
		var params = {"para": JSON.stringify(data)};
		console.log(params);
		var asyncFlag = true;
		var error ="暂无数据";
		dmt.getDataRecall(function(data){
			//console.log(JSON.stringify(data));
			console.log(data);
		},url,params,asyncFlag,error);
		*/

		$(m_layerPlot.getFeaturesByAttribute("Station_Id_c", '54861')).each(function(i,e){
			console.log(e);
			var rd = e.style.pointRadius*1;
			e.style.fillColor = e.style.strokeColor = '#FF0000';
			e.style.pointRadius = rd+5;
		});
		m_layerPlot.redraw();
	}
	this.getLtitle = function(showName){
		var ltitle = "";
		if( showName.indexOf("TEM")>-1 ){
			ltitle = " 气温 (℃)";
		}else if( showName.indexOf("GST")>-1 ){
			ltitle = " 地表温度 (℃)";
		}else if( showName.indexOf("PRE")>-1){
			ltitle = " 降水 (mm)";
		}else if( showName.indexOf("preSum")>-1 ){
			ltitle = " 累计降水 (mm)";
		}else if( showName.indexOf("WIN")>-1){
			ltitle = " 风速 (m/s)";
		}else if( showName.indexOf("PRS")>-1 ){
			ltitle = " 气压 (hPa)";
		}else if( showName.indexOf("RHU")>-1){
			ltitle = " 湿度 (%)";
		}else if( showName.indexOf("VIS")>-1) {
			ltitle = " 能见度 (Km)";
		}
		return ltitle;
	}
}
SKZLPageClass.prototype = new PageBase();
