/**
 * add by wangkun on 2017/03/29
 * title:中尺度分析
 */
function ZCDPageClass(){
	this.className = "ZCDPageClass";
	var t = this;
	var dxRadarLayer=null; 
	var currentStyle=null;
	var areaContent="";
	var map;
	var forecastHour="08";
	var areaType="4"; //默认绘制的是雷电落区，用4表示，5表示强对流落区
	var stationData=null; //保存国家站点
	t.MyTime=null;
    this.renderMenu = function() {
    	$("#menu_bd").html(`
			<div id="currentNav"></div><div class="btitle"></div>
			<div id="ZCD_Menu"> 
				<div id='div_tools'>
					&nbsp;时次:<select id='areaDate' style='height:20px; width:130px; border-radius:15px;font-size:8px;''><option value='08'>今日12时至20时</option><option value='20'>今日20时至明日08时</option></select>
					&nbsp;<img id="img_tool_drawRadar" title="绘制雷报落区" style="cursor: pointer;" src="imgs/img_tool_drawluoqunone1.png"/>
					&nbsp;<img id="img_tool_drawRain" title="绘制强天气落区" style="cursor: pointer;" src="imgs/img_tool_drawluoqu1.png"/>
					&nbsp;<img id="img_tool_drawSave" title="保存落区" style="cursor: pointer;" src="imgs/save.png"/>
					&nbsp;<img id="img_tool_drawClear" title="清除" style="cursor: pointer;" src="imgs/img_tool_erase1.png"/>
				</div>
				<div class="btitle"></div>
				<div id="fillInArea">
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#yxxt">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">影响系统</a>
							</h4>
						</div>
						<div id="yxxt" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<input id="forecastSystem" style="width:325px">
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#sd">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">湿度</a>
							</h4>
						</div>
						<div id="sd" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<input id="forecastHumity" style="width:325px">
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#bwdd">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">不稳定度</a>
							</h4>
						</div>
						<div id="bwdd" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea id="forecastNoRel" style="height:90px;width:325px">我省鲁西北地区△T850-500 >28℃；</textarea>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#08d">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">08点数值预报检验</a>
							</h4>
						</div>
						<div id="08d" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea id="forecast08Check" style="height:44px;width:325px">08时850hPa实况风场与02时6小时T639预报基本一致。</textarea>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#zhfx">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">综合分析</a>
							</h4>
						</div>
						<div id="zhfx" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea id="forecastSumContent" style="height:94px;width:325px">今天白天，受高空槽影响，我省鲁西北地屈△T850-500大于28℃，具有一定的不稳定能量，但整层湿度较小，考虑今天白天我省鲁西北地区局部的雷阵雨天气。</textarea>
							</div>
						</div>
					</div>
					<form action="" id="imageForm" enctype="multipart/form-data" method="POST">
						<input type="file" name="micapseImg1" id="micapseImg1" accept="image/png, image/jpeg"> 
					</form> 
					<form action="" id="imageForm2" enctype="multipart/form-data" method="POST">
						<input type="file" name="micapseImg2" id="micapseImg2" accept="image/png, image/jpeg"> 
					</form>  
				</div>
				<div class="btitle"></div>
				<div class="btn_line"><button id="btn_createProduct">提交生成产品</button></div> 
			</div>
		</div>
    	`);
        $("#menu").css("width","340px");
        $("#map_div").css("left","340px");

		$("#micapseImg1").change(function(){
			var now=new Date();
			var fileName="w_"+now.getFullYear()+"_"+(now.getMonth()+1)+"_"+now.getDate()+"_1.png";
			$("#imageForm")[0].action=host+'/WMProductManager/services/upload/uploadimg?fileName='+fileName; 
			$("#imageForm").ajaxSubmit( function (data){ 
				if (data=="-1")
				{
					alert("上传图片1失败，请重试。");
				}
			});
		}); 
		$("#micapseImg2").change(function(){
			var now=new Date();
			var fileName="w_"+now.getFullYear()+"_"+(now.getMonth()+1)+"_"+now.getDate()+"_2.png";
			$("#imageForm2")[0].action=host+'/WMProductManager/services/upload/uploadimg?fileName='+fileName; 
			$("#imageForm2").ajaxSubmit( function (data){ 
				if (data=="-1")
				{
					alert("上传图片2失败，请重试。");
				}
			});
		});
		$("#btn_createProduct").click(function(){ 
				var forecaster=$.cookie("showName");
				var now=new Date();
				var forecastDate=now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日";
				var forecastImgHeader1="图1 今日12时至20时雷暴落区预报";
				var forecastImg1="m_"+now.format("yyyyMMdd")+"_08.png";
				var forecastImgHeader2="图2 今日20时至明日08时雷暴落区预报";
				var forecastImg2="m_"+now.format("yyyyMMdd")+"_20.png";
				var forecastSystem=$("#forecastSystem").val();
				var forecastHumity=$("#forecastHumity").val();
				var forecastNoRel=$("#forecastNoRel").val();
				var forecast08Check=$("#forecast08Check").val();
				var forecastSumContent=$("#forecastSumContent").val(); 
				var forecastImgMicaps2="w_"+now.getFullYear()+"_"+(now.getMonth()+1)+"_"+now.getDate()+"_2.png";
				var forecastImgMicaps1="w_"+now.getFullYear()+"_"+(now.getMonth()+1)+"_"+now.getDate()+"_1.png";
				var beforeDay=now.AddDays(-1); 
				var forecastImgMicapsHead1="图1 "+forecastDate+"08时850hPa风（红色）和"+(beforeDay.getMonth()+1)+"月"+beforeDay.getDate()+"日"+"2时6小时时效T639风场（黑）";
				//图1  2015年6月4日08时850hPa风（红色）和6月3日2时6小时时效T639风场（黑）
				var forecastImgMicapsHead2="图2 "+forecastDate+"08时高空实况中尺度分析";
				var param='{"productType":"midForecast","forecaster":"'+forecaster+'","forecastDate":"'+forecastDate+'","forecastImgHeader1":"'+forecastImgHeader1+'","forecastImg1":"'+forecastImg1;
				param+='","forecastImgHeader2":"'+forecastImgHeader2+'","forecastImg2":"'+forecastImg2+'","forecastSystem":"'+forecastSystem+'","forecastHumity":"'+forecastHumity;
				param+='","forecastNoRel":"'+forecastNoRel+'","forecast08Check":"'+forecast08Check+'","forecastSumContent":"'+forecastSumContent+'","forecastImgMicaps1":"'+forecastImgMicaps1;
				param+='","forecastImgMicaps2":"'+forecastImgMicaps2+'","forecastImgMicapsHead1":"'+forecastImgMicapsHead1+'","forecastImgMicapsHead2":"'+forecastImgMicapsHead2+'"}';
				$.ajax({ 
					type:'post',
					url:host+'/WMProductManager/services/distribute/createProduct',
					data:{'para':param},
					dataType:'text',
					success: function(data){
						window.open(data,"_blank");
					},
					error:function(){
						alert("生成产品失败，请检查输入项再试。");
					}
				});
			}
		);
		$("#img_tool_drawSave").click(function(){ 
				var forecastHour=$("#areaDate")[0].value;
				$("#Panel_Tools").css("display","none"); //去掉工具箱
				$("#mapSwitch_div").css("display","none");//去掉地图切换工具
				$(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
				SPDPrintBound('map',false,function(img) { 
					var now=new Date(); 
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
						
					},"保存图片失败。");
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
		/* change by fanjibing 暂时不需要订正工具条
    	var sr=new SmallRadar();
    	sr.Initi("map_div");
    	var paneltool=new Panel_Tools($("#map_div"));
    	$("#Panel_Tools").addClass("delete");
		*/ 
    	IniStation();
		//initComput();
    	/**
	 * @author:wangkun
	 * @date:2017-03-29
	 * @param:
	 * @return:
	 * @description:初始化事件
	 */
	 
    }
	//请求数据保存DataServlet服务
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
	function SPDPrintBound (id,isLegend,callback) {
		var el = document.getElementById(id);
		if(el){
			html2canvas(el , {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas)
				{
					var img = canvas.toDataURL("image/png");
					if($.isFunction(callback)){
						callback(img);
					}
				}
			});
		}
	}
	function IniStation(){
		var param="{'stationType':'1'}";
		var dataserver = GDYB.DataServer;
        var selft=this; 
		dataserver.queryData("getStations",param,function(data){
			 var stationLayer= new WeatherMap.Layer.Vector("stationLayer");
			 stationLayer.style= { 
						fontColor:"#B424C1",
						fontSize:"14px",
						labelYOffset:20,
						labelSelect:"true",
						fillOpacity:0.5,
						fillColor:"#B424C1",
						strokeWidth:0.2,
						pointRadius:3 
			 };
			 var features=[];
			 stationData=data;
			 for(var i=0;i<data.length;i++) {
                 var feature=new WeatherMap.Feature.Vector(new WeatherMap.Geometry.Point(data[i].Longitude, data[i].Latitude));
				 features.push(feature);
			 }
			 stationLayer.addFeatures(features);
			 var map = GDYB.Page.curPage.map;
			 map.addLayer(stationLayer);
		}); 
	}
	function initComput(){
		//初始化界面时，就去请求计算指数 
		$.ajax({ 
			type:'post',
			url:host+'/WMProductManager/servlet/ProductServlet?method=computZCD&fileName='+zcdPath,
			dataType:'text',
			success: function(data){
				if (data=="")
				{
					return;
				}
				var strArray=data.split(";");
				var jinan=strArray[0].split(",");
				var weihai=strArray[1].split(","); 
				var qingdao=strArray[1].split(",");
				$("#forecastHumity").val("850hPa湿度，济南"+jinan[1]+"g/kg，青岛"+qingdao[1]+"g/kg，荣成"+weihai[1]+"g/kg" );
				var content="济南探空K="+jinan[2]+"℃，si="+jinan[3]+"，CAPE="+jinan[4]+"；青岛探空K="+qingdao[2]+"℃，si="+qingdao[3]+"，CAPE="+qingdao[4]+"；威海探空K="+weihai[2]+"℃，si="+weihai[3]+"，CAPE="+weihai[4]+"。";
				$("#forecastNoRel").val($("#forecastNoRel").val()+content);
			},
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
}
ZCDPageClass.prototype = new PageBase();
