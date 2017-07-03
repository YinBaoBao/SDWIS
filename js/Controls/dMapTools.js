/**
 * Created by dx on 2016/6/22.
 */
function dMapTools(){
	console.log("欢迎使用北京思湃德信息技术有限公司软件！祝您使用愉快！");
	var t=this;
	var tMapTools = this;
	var style = {
		strokeColor:"#00e09e",
		fillColor:"#3de1ad",
		fillOpacity:0.4
	};
	//地图工具栏
	var lineFlag = false;
	var areaFlag = false;
	var rectangFlag = false;
	var circleFlag = false;
	var luoquFlag = false;
	var textFlag=false;
	var isNotClear=false;
	var dxdrawLayer,dxlineLayer, dxareaLayer,dxrectangLayer,dxcircleLayer,dxluoquLayer,drawTxtLayer;
	var dxmousePosition,dxdrawLine,dxdrawPolygon ,dxdrawRectang,dxdrawCircle,dxdrawLuoqu,dxdrawText;
	var drawPoint;
	var dxdrawCtr = null;
	var initFlag = false;
	this.init = function(){
		var map = GDYB.Page.curPage.map;
		if(!initFlag){
			/*var center=parseInt($("#map_div").css("width"))-parseInt($("#dmapTools").css("width"));
			$("#dmapTools").css("left",center/2)*/
			$("#dmapTools").find("div").click(function(){
				tMapTools.ToolsClick(this);
			});
			initFlag = true;
		}
		dxdrawLayer = new WeatherMap.Layer.Vector("drawLayer");
		dxlineLayer = new WeatherMap.Layer.Vector("dxlineLayer");
		dxareaLayer = new WeatherMap.Layer.Vector("dxareaLayer");
		dxrectangLayer = new WeatherMap.Layer.Vector("dxrectangleLayer");
		dxcircleLayer = new WeatherMap.Layer.Vector("dxcircleLayer");
		dxluoquLayer = new WeatherMap.Layer.Vector("dxluoquLayer");
		drawTxtLayer = new WeatherMap.Layer.Vector("drawTxtLayer");
		dxdrawLayer.style = style;
		dxlineLayer.style = style;
		dxareaLayer.style = style;
		dxrectangLayer.style = style;
		dxcircleLayer.style = style;
		dxluoquLayer.style = style;
		//鼠标监听
		dxmousePosition = new WeatherMap.Control.MousePosition();
		//画线
		dxdrawLine = new WeatherMap.Control.DrawFeature(dxdrawLayer, WeatherMap.Handler.Path,{ multi: true});
		//画面
		dxdrawPolygon = new WeatherMap.Control.DrawFeature(dxdrawLayer, WeatherMap.Handler.Polygon);
		//画矩形
		dxdrawRectang = new WeatherMap.Control.DrawFeature(dxdrawLayer, WeatherMap.Handler.Box);
		//画圆
		dxdrawCircle = new WeatherMap.Control.DrawFeature(dxdrawLayer, WeatherMap.Handler.RegularPolygon,{handlerOptions:{irregular:true,sides:50}});
		//画落区
		dxdrawLuoqu = new WeatherMap.Control.DrawFeature(dxdrawLayer, WeatherMap.Handler.PolygonFree);

		dxdrawText= new WeatherMap.Control.DrawFeature(drawTxtLayer, WeatherMap.Handler.Point);
		map.addLayer(dxdrawLayer);
		map.addLayer(dxlineLayer);
		map.addLayer(dxareaLayer);
		map.addLayer(dxrectangLayer);
		map.addLayer(dxcircleLayer);
		map.addLayer(dxluoquLayer);
		map.addControl(dxmousePosition);
		map.addControl(dxdrawLine);
		map.addControl(dxdrawPolygon);
		map.addControl(dxdrawRectang);
		map.addControl(dxdrawCircle);
		map.addControl(dxdrawLuoqu);
		map.addControl(dxdrawText);
		dxdrawPolygon.events.on({"featureadded": drawCompleted});
		dxdrawLine.events.on({"featureadded": drawCompleted});
		dxdrawCircle.events.on({"featureadded": drawCompleted});
		dxdrawRectang.events.on({"featureadded": drawCompleted});
		dxdrawLuoqu.events.on({"featureadded": drawCompleted});
		dxdrawText.events.on({"featureadded": drawCompleted});
        if ($.cookie("departCode")!=null){
            this.locationMapByCode($.cookie("departCode"),false);
        }
	}
	this.initLayerManager=function(){
		$("#img_layerShow").unbind( "click" )
		$("#img_layerShow").click(function(){
			var flag=$("#div_layerManager").attr("flag");
			if (flag=="min")
			{
				$("#div_layerManager").css({"height":"165px","bottom":"5px"});
				$("#div_layerManager").attr("flag","max");
				var innerHTML="<div class='checkbox checkbox-primary'><input type='checkbox' id='checkbox-china' checked value='china2'></input><label for='checkbox-china'>行政边界</label></div>"
				+"<div class='checkbox checkbox-primary'><input type='checkbox' id='checkbox-sdCity' checked value='sdCity'></input><label for='checkbox-sdCity'>县&nbsp;&nbsp;边&nbsp;&nbsp;界</label></div>"
				+"<div class='checkbox checkbox-primary'><input type='checkbox' id='checkbox-sdLabels' checked value='sdLabels'></input><label for='checkbox-sdLabels'>行政地名</label></div>"
				+"<div class='checkbox checkbox-primary'><input type='checkbox' id='checkbox-sdRiver' checked value='sdRiver'></input><label for='checkbox-sdRiver'>河流水系</label></div> "
				+"<div class='checkbox checkbox-primary'><input type='checkbox' id='checkbox-sdRoad' checked value='sdRoad'></input><label for='checkbox-sdRoad'>道路交通</label></div> ";
				$("#div_layeContent").html(innerHTML);
				$("#img_layerShow").attr("src","imgs/layerDown.png");
				$("#div_layeContent").find("input").click(function(){
					var checkValue=$(this)[0].value;
					var map = GDYB.Page.curPage.map;
					var layer=map.getLayersByName(checkValue);
					if (layer!=null&&layer.length>0)
					{
						layer[0].displayInLayerSwitcher=$(this)[0].checked; //用于保存当前是可见或不可见，在放大缩小地图时会用到
						layer[0].setVisibility($(this)[0].checked);
					}
				});

			}else{
				$("#div_layeContent").html("");
				$("#div_layerManager").css({"height":"30px","bottom":"2px"});
				$("#div_layerManager").attr("flag","min");
				$("#img_layerShow").attr("src","imgs/layerUp.png");
			}
		});
	}
	this.createMapBoundsSet=function(){
		var param="{'parentid':'37'}";
		var dataserver = GDYB.DataServer;
        var selft=this;
		dataserver.queryData("getCityFrom_T_area",param,function(data){
			 var innerHTML="<div class='checkbox checkbox-primary'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='chkIsCover' type='checkbox'/><label for='chkIsCover'>遮罩&nbsp;</label><a id='000000'>&nbsp;清&nbsp;&nbsp;除&nbsp;</a><a id='37'>&nbsp;山东省&nbsp;</a>";
             var count=3;
			 for(var i=0;i<data.length;i++) {
                 innerHTML+="<a id='"+data[i].areacode+"'>&nbsp;"+data[i].areaname+"&nbsp;</a>";
                 count++;
                 if (count%4==0){
                     innerHTML+="<br>";
                 }
			 }
			 innerHTML+="</div>";
			 $('#div_mapBoundsContent').html(innerHTML);
             $('#div_mapBoundsContent').find("a").click(function (){
                 var areaCode=$(this).attr("id");
                 var isCover=$("#chkIsCover")[0].checked;
                 selft.locationMapByCode(areaCode,isCover);
                 $('#div_mapBoundsContent').html("");
                 $('#div_mapBoundsContent').removeClass("div_mapBoundsContent");
            })
		});

	}
    this.locationMapByCode=function(areaCode,isCover){
        var param="{'areacode':'"+areaCode+"'}";
        var dataserver = GDYB.DataServer;
        dataserver.queryData("getCityBoundByareacode",param,function(data){
            var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
			if(coverLayer != null){
				coverLayer.removeAllFeatures();
			}
            if (data.length==0){
				$.cookie('areaCode', '', { expires: -1 });
                return;
            }
            var userName = GDYB.GridProductClass.currentUserName;
            if (userName!=null){
                $.cookie("areaCode",areaCode);
            }
            var bounds=data[0].bounds;
            bounds=bounds.substr(1,bounds.length-3);
            var jsonObj=bounds.split(" ");
            var pointArray = [];
            for(var i=0;i<jsonObj.length;){
                var lon = jsonObj[i++];
                var lat = jsonObj[i++];
                var point = new WeatherMap.Geometry.Point(lon, lat);
                pointArray.push(point);
            }
            if (isCover){
                var linearRings = new WeatherMap.Geometry.LinearRing(pointArray);
                var worldPointList = [];
                worldPointList.push(new WeatherMap.Geometry.Point(-180, -90));
                worldPointList.push(new WeatherMap.Geometry.Point(180, -90));
                worldPointList.push(new WeatherMap.Geometry.Point(180, 90));
                worldPointList.push(new WeatherMap.Geometry.Point(-180, 90));
                var linearRings1 = new WeatherMap.Geometry.LinearRing(worldPointList);
                var polygon=new WeatherMap.Geometry.Polygon([linearRings,linearRings1]);
                var polygonVector = new WeatherMap.Feature.Vector(polygon);
                polygonVector.style = {
                    strokeColor: "#ff0000",
                    fillColor: "#ffffff",
                    strokeWidth: 1,
                    fillOpacity: 1,
                    strokeOpacity: 0.4
                };
                coverLayer.addFeatures([polygonVector]);
                GDYB.GDYBPage.lineVector = polygonVector;
                GDYB.Page.curPage.map.setLayerIndex(coverLayer,999);
                GDYB.Page.curPage.map.zoomToExtent(linearRings.getBounds());
            }else{
                var lineString = new WeatherMap.Geometry.LineString(pointArray);
                var lineVector = new WeatherMap.Feature.Vector(lineString);
                lineVector.style = {
                    strokeColor: "#000000",
                    strokeWidth: 2
                };
                coverLayer.addFeatures([lineVector]);
                GDYB.GDYBPage.lineVector = lineVector;
                GDYB.Page.curPage.map.zoomToExtent(lineString.getBounds());
            }
        });
    }
	this.ToolsClick = function(obj){
		var flag = $(obj).attr("flag");
		var map = GDYB.Page.curPage.map;
		switch(flag){
			case 'zoomIn':map.zoomIn();
				break;
			case 'zoomOut':map.zoomOut();
				break;
			case 'pan':{
				startDragMap();
			};
				break;
			case 'drawLine':{
				isNotClear=true;
				stopDragMap();
				resetFlag();
				lineFlag = true;
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "line";
			};
				break;
			case 'drawPolygon':{
				isNotClear=true;
				stopDragMap();
				resetFlag();
				areaFlag = true;
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "polygon";
			};
				break;
			case 'drawrectangle':{
				isNotClear=true;
				stopDragMap();
				resetFlag();
				rectangFlag = true;
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "rectangle";
			};
				break;
			case 'drawcircle':{
				isNotClear=true;
				stopDragMap();
				resetFlag();
				circleFlag = true;
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "circle";
			};
				break;
			case 'fullScreen':{map.setCenter(new WeatherMap.LonLat(mapConfig.centerX,mapConfig.centerY), mapConfig.initLev);};
				break;
			case 'drawTxt':
				resetFlag();
				textFlag=true;
				stopDragMap();
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "text";
				isNotClear=true;
				break;
			case 'drawluoqu':{
				isNotClear=true;
				stopDragMap();
				resetFlag();
				luoquFlag = true;
				$("#dxWindows").empty();
				clearDraw();
				dxdrawCtr = "luoqu";
			};
				break;
			case 'clear':{
				isNotClear=false;
				resetFlag();
				clearDraw();
				startDragMap();
			};
				break;
		}
		//GDYB.Page.curPage.map.zoomToExtent(new WeatherMap.Bounds(91,32,110,43));
	}
	function resetFlag(){
		rectangFlag = false;
		circleFlag = false;
		lineFlag = false;
		areaFlag = false;
		luoquFlag = false;
		textFlag=false;
	}
	function drawCompleted(event) {
		var geometry = event.feature.geometry;
		dxdrawLayer.removeAllFeatures();
		var geoVector = new WeatherMap.Feature.Vector(geometry);
		var t  = new Array();
		if(!rectangFlag&&!textFlag){
			t  = geometry.components[0].components;
		}
		var lonLat ;
		var contentHtml = "";
		var content = "";
		var fid = "";
		switch(dxdrawCtr){
			case "drawPoint":{
				lonLat=new WeatherMap.LonLat(geometry.x,geometry.y);
				drawPoint=lonLat;

				}
				break;
			case "text":{
				lonLat=new WeatherMap.LonLat(geometry.x,geometry.y);
				drawPoint=lonLat;
				contentHtml="<input type='text' id ='txtContent'></input><button id='butAddTxt'>确定</button><button id='butAddClose'>取消</button>";
				mapToolsWindows(lonLat,contentHtml);
				$("#butAddClose").click(function(){
					$("#txtContent").val("");
					$("#MapToolsDiv").css("display","none");
				});
				$("#butAddTxt").click(function(){
					var map = GDYB.Page.curPage.map;
					var txt=$("#txtContent").val();
					var vectorLayer =map.getLayersByName("drawTextLayer");
					if (vectorLayer.length<=0)
					{
						var strategy = new WeatherMap.Strategy.GeoText();
						strategy.style = {
						  fontColor:"#FF7F00",
						  fontWeight:"bolder",
						  fontSize:"14px",
						  fontSize:"14px",
						  fill: true,
						  fillColor: "#FFFFFF",
						  fillOpacity: 1,
						  stroke: true,
						  strokeColor:"#8B7B8B"
						};
						var vectorLayer = new WeatherMap.Layer.Vector("drawTextLayer",{strategies: [strategy]});
						map.addLayers([vectorLayer]);
					}else{
						vectorLayer=vectorLayer[0];
					}
					var geoText = new WeatherMap.Geometry.GeoText(drawPoint.lon, drawPoint.lat,txt);
					var geotextFeature = new WeatherMap.Feature.Vector(geoText);
					vectorLayer.addFeatures([geotextFeature]);
					$("#txtContent").val("");
					$("#MapToolsDiv").css("display","none");
				});
			}
			break;
			case "line":{
				dxlineLayer.addFeatures(geoVector);
				var obj = dxlineLayer.features;
				fid = obj[obj.length-1].id;
				var distanceStr = "";
				distanceStr = getDistance(geometry);
				if(distanceStr.indexOf("NaN")>-1){
					content = "<span style='margin:1px 1px 1px 1px;color:#FC7A5B'>错误！请重试！</span>";
				}else{
					contentHtml = "<div title='总距离: "+distanceStr+"' style='background-color:#ffffff;border: 1px solid rgb(183,183,183);margin-top: -1px;'><span style='margin-left:2px;color:#78D2D2'> 总距离: "+distanceStr+"</span><span ><img style='margin:0px 2px 2px 5px;cursor: pointer;' title='点此关闭气泡' src='imgs/tools/closeTools.png' id='imgClose'/></span></div>"
					content = "<span style='background-color:#ffffff;margin:1px 1px 1px 1px;color:#FC7A5B'>"+distanceStr+"</span>"
				}
				lonLat = new WeatherMap.LonLat(t[t.length-1].x,t[t.length-1].y);
				//addResultWindows(lonLat,content,fid);
				mapToolsWindows(lonLat,contentHtml);
				$("#imgClose").click(function(){
					tMapTools.closeInfoWindows();
				});
			}
				break;
			case "polygon":{
				dxareaLayer.addFeatures(geoVector);
				var obj = dxareaLayer.features;
				fid = obj[obj.length-1].id;
				var areaStr = "";
				areaStr = getPolygonArea(geometry);
				if(areaStr.indexOf("NaN")>-1){
					content = "<span style='margin:1px 1px 1px 1px;color:#FC7A5B'>错误！请重试！</span>";
				}else{
					contentHtml = "<div title='总面积: "+areaStr+"' style='background-color:#ffffff;border: 1px solid rgb(183,183,183);margin-top: -1px;'><span style='margin-left:2px;color:#78D2D2'> 总面积: "+areaStr+"</span><span ><img style='margin:0px 2px 2px 5px;cursor: pointer;' title='点此关闭气泡' src='imgs/tools/close.png' id='imgClose'/></span></div>"
					content = "<span style='background-color:#ffffff;margin:1px 1px 1px 1px;color:#FC7A5B'>"+areaStr+"</span>"
				}
				lonLat = new WeatherMap.LonLat(t[t.length-2].x,t[t.length-2].y);
				mapToolsWindows(lonLat,contentHtml);
				$("#imgClose").click(function(){
					tMapTools.closeInfoWindows();
				});
				//addResultWindows(lonLat,content,fid);
			}
				break;
			case "rectangle":{
				dxdrawRectang.deactivate();
				dxrectangLayer.addFeatures(geoVector);
				//var curlayer = GDYB.Page.curPage.map.getLayersByName("stationlayer")[0];
				//inRange(geoVector,curlayer);
			}
				break;
			case "circle":{
				dxdrawCircle.deactivate();
				dxcircleLayer.addFeatures(geoVector);
				var mj = getPolygonAreaValue(geometry);
				var r=mj/3.14;
				var dr=Math.sqrt(r);
				$('#showMaptitle').html('<span style="background-color: RGBA(255,255,255,0.61)">半径&nbsp;'+dr.toFixed(2)+'&nbsp;千米</span>');
				//var curlayer = GDYB.Page.curPage.map.getLayersByName("stationlayer")[0];
				//inRange(geoVector,curlayer);
			}
				break;
			case "luoqu":{
				dxdrawLuoqu.deactivate();
				dxluoquLayer.addFeatures(geoVector);
				//var curlayer = GDYB.Page.curPage.map.getLayersByName("stationlayer")[0];
				//inRange(geoVector,curlayer);
			}
				break;
			default :{}
				break;
		}
		//startDragMap();
		//stopDragMap();
		/*var gc = new BMap.Geocoder();
		 gc.getLocation(point, function (rs) {
		 var addComp = rs.addressComponents;
		 //$("#waterAddress").val(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);FC7A5B
		 });*/
	}
	function addText(){
		var txt=$("#txtContent").val();
		var geoLayer=map.getLayer("getxt");
		if (geoLayer.length<=0)
		{
			geoLayer=new WeatherMap.Layer.PlottingLayer("geoTxt");
			map.addLayers([geoLayer]);
		}else{
			geoLayer=geoLayer[0];
		}
		geoLayer.createTextWC(txt,drawPoint, {});
	}
	function inRange(rangeLayer,oldLayer){
		var obj = oldLayer.features;

		if(obj.length>0){
			var realArray =[] ;
			for(var i = 0 ;i<obj.length;i++){
				var xflag = false;
				var yflag = false;
				var left = obj[i].geometry.bounds.left;
				var right = obj[i].geometry.bounds.right;
				var top = obj[i].geometry.bounds.top;
				var bottom = obj[i].geometry.bounds.bottom;
				if(rangeLayer.geometry.bounds.left < left && right < rangeLayer.geometry.bounds.right ){
					xflag = true;
				}
				if(rangeLayer.geometry.bounds.bottom < bottom && top < rangeLayer.geometry.bounds.top ){
					yflag = true;
				}
				if(xflag && yflag){
					realArray.push(obj[i]);
				}

			}
			//array['test']='2';
			//console.log(array+""+array['test']);
			//for (var m = TableClass.length - 1; m >= 0; m--) {
			//    item = TableClass[m];
			//    console.log(item.name+"|"+item.code)
			//}
			var jsonStr={},msg="",item;
			var num,_key,_value;
			var curobjName = GDYB.Page.curPage.className;
			var titlestr = "选取结果";
			if(curobjName=="SZMSPageClass")
			{;
				msg= "选取的站点数：";
				var equipmentstr = "";
				if($("#allequipment").find(".active").length > 0) {
					var equipment = $("#allequipment").find(".active")[0];
					equipmentstr =  $(equipment).text();
					if(equipmentstr!="自动气象站" && equipmentstr!="加密区域站" ){
						titlestr = "选取装备结果";
					}
					//sumstr = "本区域"+ equipmentstr +"总数：";
					msg = "选中的"+ equipmentstr +"数量："+realArray.length;
				}
			}
			else
			{
				for(var n=0;n<realArray.length;n++)
				{
					num=realArray[n].data.type.toString().indexOf('|');_key=realArray[n].data.type.toString().substr(0,num);
					_value=1;
					$.each(jsonStr,function(key){
						if(key.indexOf(_key)>-1)
						{
							_value=jsonStr[key]+1;
						}
					});
					jsonStr[_key]=_value;
				}
				var count=0;
				for (var m = TableClass.length - 1; m >= 0; m--) {
					item = TableClass[m];
					var cname=item.code;
					//console.log(cname+"|"+item.name+"\r\n");
					$.each(jsonStr,function(key){
						if(cname==key)
						{
							++count;
							if(count%3==1)
							{
								msg+=item.name+":"+jsonStr[key]+"个;\r\n";
							}
							else
							{
								msg+=item.name+":"+jsonStr[key]+"个;";
							}
						}
					});
				}
			}
			var inRangeHtml = "";
			inRangeHtml = "<div  style='border: 1px solid #B7B7B7;font-size:13px; width: 269px;height:62px;overflow-y:hidden;overflow-x:hidden;bolder;background-color: RGBA(255,255,255,0.75);text-align:center '>"
				+"<div style='width: 100%;height: 28px;line-height:28px;border-bottom:1px solid #dfdfdf;font-family: Microsoft YaHei;font-size: 13px;background-color: rgb(249,249,249);'><span style='margin-left:5px;color: #FF00FF;float: left; '> "+titlestr+" </span><div onclick='GDYB.dMapTools.removeThisElement(this)'title='关闭' style='float: right;width: 30px;height: 25px;cursor: pointer;font-size: 18px;font-weight: bold;color: #cccccc;font-family: cursive;'><span style='margin-left: 7px;'>x</span></div></div>"
				+'<div style="text-align: center;font-size: 14px;">'
				+'<span style="float:left;margin:8px 5px 2px 5px;">'+ msg +'</span>'
				//  +'<span style="float:left;margin:8px 5px 2px 5px;">'+ countstr +'</span>'
				//   +'<span style="float:left;margin:8px 5px 2px 10px;color:#03b8cf;font-weight:bolder"><strong>'+realArray.length+'</strong></span>'
				+"</div>"
				+"</div>";
			//$(".mapLayer").find(".moreMapLayer").css("display","none");
			$("#totleInfo").append(inRangeHtml);
			$("#totleInfo").show();
			/*
			 var d = dialog({
			 title: titlestr,
			 content: '<div style="height: 30px;width:240px;text-align: center;">'
			 //+'<div style="margin-left:8%;">'
			 //+'<span style="float:left;margin:0px 5px 0px 5px;">'+ sumstr +'</span>'
			 //+'<span style="float:left;margin:0px 5px 0px 10px;color:blueviolet;">'+obj.length+'</span>'
			 //+'</div>'
			 +'<br/>'
			 +'<div style="margin-left:8%;">'
			 +'<span style="float:left;margin:0px 5px 0px 5px;">'+ countstr +'</span>'
			 +'<span style="float:left;margin:0px 5px 0px 10px;color:#03b8cf;font-weight:bolder; "><strong>'+realArray.length+'</strong></span>'
			 +'</div>'
			 +'</div>',
			 okValue:'关闭',
			 ok: function () { }
			 });
			 d.showModal();
			 */
		}
	}

	this.removeThisElement = function (element){
		$(element).parent().parent().hide().empty();
	}

	function clearDraw(){
		if (!isNotClear)
		{
			var map = GDYB.Page.curPage.map;
			var vectorLayer =map.getLayersByName("drawTextLayer");
			if (vectorLayer.length>=1)
			{
				vectorLayer=vectorLayer[0];
				vectorLayer.removeAllFeatures();
			}
			dxdrawLayer.removeAllFeatures();
			dxlineLayer.removeAllFeatures();
			dxareaLayer.removeAllFeatures();
			dxrectangLayer.removeAllFeatures();
			dxcircleLayer.removeAllFeatures();
			dxluoquLayer.removeAllFeatures();
		}
		if(lineFlag){
			dxdrawLine.activate();
		}else{
			dxdrawLine.deactivate();
		}
		if(textFlag){
			dxdrawText.activate();
		}else{
			dxdrawText.deactivate();
		}
		if(areaFlag){
			dxdrawPolygon.activate();
		}else{
			dxdrawPolygon.deactivate();
		}
		if(rectangFlag){
			dxdrawRectang.activate();
		}else{
			dxdrawRectang.deactivate();
		}
		if(circleFlag){
			dxdrawCircle.activate();
		}else{
			dxdrawCircle.deactivate();
		}
		if(luoquFlag){
			dxdrawLuoqu.activate();
		}else{
			dxdrawLuoqu.deactivate();
		}
		$("#MapToolsDiv").css("display","none");
		if(lineFlag == false && areaFlag == false){
			$("#dxWindows").empty();
		}
	}

	this.closeInfoWindows = function(){
		$("#MapToolsDiv").css("display","none");
		$("#MapToolsDiv").attr("hflag","true");
		var cflag = $(".dxWindow").length;
		if(cflag<2){
			if(lineFlag){
				dxlineLayer.removeAllFeatures();
				$("#dxWindows").empty();
			}
			if(areaFlag){
				dxareaLayer.removeAllFeatures();
				$("#dxWindows").empty();
			}
		}else{
			$(".dxWindow").each(function(){
				$(this).css("display","block");
			});
		}
	}

	this.closeSmall = function(obj){
		var t = $(obj);
		var fid = t.parent(0).attr("fid");
		if(lineFlag){
			dxlineLayer.removeFeatures(dxlineLayer.getFeatureById(fid));
		}
		if(areaFlag){
			dxareaLayer.removeFeatures(dxareaLayer.getFeatureById(fid));
		}
		t.parent(0).remove();
	}

	function mapToolsWindows(lonLat,contentHTML){
		var map = GDYB.Page.curPage.map;
		var pixel = map.getPixelFromLonLat(lonLat);
		if(contentHTML.length>0){
			$("#mtsContent").html(contentHTML);
			var height = parseInt($("#MapToolsDiv").css("height"));
			var width = $("#MapToolsDiv").css("width");
			var bt = "B";
			var lr = "L";
			if(pixel.y>height||((parseInt($("#map_div").css("height"))-pixel.y)<height)){
				bt = "B";
			}
			else{
				bt = "T";
			}
			if((document.body.offsetWidth-pixel.x)>(parseInt(width)-50)){
				lr = "L";
			}
			else{
				lr = "R";
			}
			$(".mtsContentImg").css("display","none");
			$("#mtsContent"+bt+lr).css("display","block");
			$("#MapToolsDiv").css("top",pixel.y+65);  //加上左侧和右侧面板
			$("#MapToolsDiv").css("left",pixel.x+200);
			if(bt == "B"){
				$("#MapToolsDiv").css("margin-top","-"+(height+2)+"px");
			}
			else{
				$("#MapToolsDiv").css("margin-top","4px")
			}
			if(lr == "L"){
				$("#MapToolsDiv").css("margin-left","-1px");
			}
			else{
				$("#MapToolsDiv").css("margin-left","-"+width);
			}
			$("#MapToolsDiv").css("display","block");
			map.events.register("move", map, function(event){
				//$("#MapToolsDiv").css("display", "none");
			});
			/*
			 map.events.register("move", map, function(event){
			 var pixel = map.getPixelFromLonLat(lonLat);
			 var ctop = parseInt($("#map_div").css("height"))-75;
			 var cleft = parseInt($("#map_div").css("width"))-56;
			 if($("#MapToolsDiv").css("display")=="block") {
			 if (pixel.y > ctop || pixel.x > cleft || pixel.y < 75 || pixel.x < 56) {
			 $("#MapToolsDiv").css("display", "none");
			 } else {
			 $("#MapToolsDiv").css("top", pixel.y);
			 $("#MapToolsDiv").css("left", pixel.x);
			 }
			 }
			 });
			 */
		}

	}

	function addResultWindows(lonLat,content,fid){
		var map = GDYB.Page.curPage.map;
		var pixel = map.getPixelFromLonLat(lonLat);
		var cflag = 0;
		if($(".dxWindow").length>0){
			cflag = $(".dxWindow").length+1;
		}
		$("#dxWindows").append("<div id='dxWindow"+cflag+"' hflag='' fid='"+fid+"' class='dxWindow' style='background-color:#ffffff;position: absolute;height:18px;line-height:18px;font-size:10px;;z-index: 99'></div>");
		$("#dxWindow"+cflag).html(content);
		$("#dxWindow"+cflag).append("<span title='关闭'  onclick='GDYB.dMapTools.closeSmall(this)'><img  style='line-height:16px;margin:0px 0px 2px 1px;' src='imgs/tools/lclose.png' /></span>");
		var width = $("#dxWindow"+cflag).css("width");
		$("#dxWindow"+cflag).css("top",pixel.y);
		$("#dxWindow"+cflag).css("left",pixel.x);
		$("#dxWindow"+cflag).css("margin-top","14px");
		$("#dxWindow"+cflag).css("margin-left","-"+width);
		$("#dxWindow"+cflag).css("position","absolute");
		$("#dxWindow"+cflag).css("border","1px solid red ");

		if(cflag<2){
			if(!(content.indexOf("错误")>-1)){
				$("#dxWindow"+cflag).css("display","none");
			}
		}else{
			$(".dxWindow").each(function(){
				if($(this).attr("hflag") != "hyes"){
					$(this).css("display","block");
				}
			});
			$("#dxWindow"+cflag).css("display","none");
		}
		map.events.register("move", map, function(event){
			var top = parseInt($("#map_div").css("height"))-85;
			var left = parseInt($("#map_div").css("width"))-66;
			$(".dxWindow").each(function(){
				var lonLat = null;
				if(lineFlag){
					var t =  dxlineLayer.getFeatureById($(this).attr("fid")).geometry.components[0].components;
					lonLat = new WeatherMap.LonLat(t[t.length-1].x,t[t.length-1].y);
				}
				if(areaFlag){
					var t =  dxareaLayer.getFeatureById($(this).attr("fid")).geometry.components[0].components;
					lonLat = new WeatherMap.LonLat(t[t.length-2].x,t[t.length-2].y);
				}
				var pixel = map.getPixelFromLonLat(lonLat);
				var ctop = parseInt($(this).css("top"));
				var cleft = parseInt($(this).css("left"));
				if($(this).css("display")=="block") {
					if (ctop > top ||ctop< 66 || cleft > left || cleft < 85) {
						$(this).css("display","none");
						$(this).attr("hflag","hyes");
					} else {
						$(this).css("top", pixel.y);
						$(this).css("left", pixel.x);
					}
				}else {
					if (85 < ctop < top && 86 < cleft < left) {
						$(this).css("display", "block");
						$(this).css("top", pixel.y);
						$(this).css("left", pixel.x);
						$(this).attr("hflag","");
					}
				}
			});
		});
	}

	//计算距离
	function getDistance(geoRegion){
		var measureParam = new WeatherMap.REST.MeasureParameters(geoRegion);
		var pointsArr = new Array();
		pointsArr = geoRegion.components[0].components;
		var distance = 0;
		var len = pointsArr.length;
		if(len > 2){
			var p1;
			var p2;
			for(var i=0; i<len-1; i=i+1)
			{
				p1 = pointsArr[i];
				p2 = pointsArr[i+1];
				var a = degtoRad(p1.x - p2.x);
				var b = degtoRad(p1.y-p2.y);
				var s = 2 * Math.asin(Math.sqrt(Math.abs(Math.pow(Math.sin(a / 2), 2)
						+ Math.cos(p1.x) * Math.cos(p2.x)
						* Math.pow(Math.sin(b / 2), 2))));
				distance += s;
				var testStr = distance+"123";
			}
			distance = distance * 6378137.0;
		}else{
			p1 = pointsArr[len-1];
			p2 = pointsArr[0];
			var a = degtoRad(p1.x - p2.x);
			var b = degtoRad(p1.y-p2.y);
			var s = 2 * Math.asin(Math.sqrt(Math.abs(Math.pow(Math.sin(a / 2), 2)
					+ Math.cos(p1.x) * Math.cos(p2.x)
					* Math.pow(Math.sin(b / 2), 2))));
			distance = s * 6378137.0;
		}
		distance = Math.abs(distance);
		var disStr = "";
		if(distance<1000){
			disStr = Number(distance).toFixed(0) + " 米";
		}else{
			disStr = Number(distance/1000).toFixed(3) + " 千米";
		}
		return disStr;
	}

	//计算面积
	function getPolygonArea(geoRegion){
		var pointsArr = new Array();
		pointsArr = geoRegion.components[0].components;
		var area = 0;
		var len = pointsArr.length;
		if(len > 2){
			var p1;
			var p2;
			for(var i=0; i<len-1; i=i+1)
			{
				p1 = pointsArr[i];
				p2 = pointsArr[i+1];
				area += degtoRad(p2.x - p1.x) * (2 + Math.sin(degtoRad(p1.y)) + Math.sin(degtoRad(p2.y)));
			}
			area = area * 6378137.0 * 6378137.0 / 2.0;
		}
		area = Math.abs(area);
		var areaStr = null;
		if(area<1000000){
			areaStr = Number(area).toFixed(0) + " 平方米";
		}else{
			areaStr = Number(area/1000000).toFixed(3) + " 平方千米";
		}
		return areaStr;
	}
	function getPolygonAreaValue(geoRegion){
		var pointsArr = new Array();
		pointsArr = geoRegion.components[0].components;
		var area = 0;
		var len = pointsArr.length;
		if(len > 2){
			var p1;
			var p2;
			for(var i=0; i<len-1; i=i+1)
			{
				p1 = pointsArr[i];
				p2 = pointsArr[i+1];
				area += degtoRad(p2.x - p1.x) * (2 + Math.sin(degtoRad(p1.y)) + Math.sin(degtoRad(p2.y)));
			}
			area = area * 6378137.0 * 6378137.0 / 2.0;
		}
		area = Math.abs(area);
		var areaStr = null;
		if(area<1000000){
			areaStr = Number(area).toFixed(0);
		}else{
			areaStr = Number(area/1000000).toFixed(3);
		}
		return areaStr;
	}

	function degtoRad(val){
		return val*Math.PI/180;
	}

	function startDragMap(){
		var map = GDYB.Page.curPage.map;
		for(var i =0; i < map.events.listeners.mousemove.length; i++) {
			var handler = map.events.listeners.mousemove[i];
			if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag"){
				handler.obj.active = true;
			}
		}

		for(var i=0;i< map.controls.length;i++) {
			if(map.controls[i].displayClass == "smControlDrawFeature"){
				map.controls[i].deactivate();
			}
		}

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

	this.clear = function(){
		dxdrawLayer.removeAllFeatures();
		dxlineLayer.removeAllFeatures();
		dxareaLayer.removeAllFeatures();
		dxcircleLayer.removeAllFeatures();
		dxrectangLayer.removeAllFeatures();
		$("#MapToolsDiv").css("display","none");
		$("#dxWindows").empty();
	}

	this.drawPoints = function (layer,style,type){
		var sumcount = Math.floor(50+Math.random()*50);
		var pointArray = [];
		var datas = randomPoint(sumcount,110.85,113.55,35.46,40.07,type);
		for(var i = 0;i<datas.length;i++){
			var geometry = new WeatherMap.Geometry.Point(datas[i].lon,datas[i].lat);
			pointArray.push(geometry);
		}
		var features = [];
		for(var i = 0;i<pointArray.length;i++){
			var pointFeature = new WeatherMap.Feature.Vector(pointArray[i],datas[i],style);
			features.push(pointFeature);
		}
		layer.addFeatures(features);
	}

	this.drawRealPoints = function (layer,style,type,points){
		var pointArray = [];
		var datas = points;
		var realDatas = [];
		for(var i = 0;i<datas.length;i++){
			datas[i].type = type;
			if(typeof(datas[i].起点经度) != "undefined"){
				datas[i].经度 = (datas[i].起点经度*1+datas[i].终点经度*1)/2;
				datas[i].纬度 = (datas[i].起点纬度*1+datas[i].终点纬度*1)/2;
			}
			if(!(t.isEmpty(datas[i].经度)&& t.isEmpty(datas[i].纬度))){
				if(datas[i].经度 == 0 || datas[i].纬度 == 0){
					continue;
				}
				realDatas.push(datas[i]);
				var geometry = new WeatherMap.Geometry.Point(datas[i].经度,datas[i].纬度);
				pointArray.push(geometry);
			}
		}
		var features = [];
		for(var i = 0;i<pointArray.length;i++){
			var pointFeature = new WeatherMap.Feature.Vector(pointArray[i],realDatas[i],style);
			features.push(pointFeature);
		}
		layer.addFeatures(features);
	}

	this.drawClassfiyPoints = function (layer,type,points){
		for(var k =0;k<type.length;k++){
			var pointArray = [];
			var datas = points;
			var newPoints = [];
			var features = [];
			//console.log(type[k].split("|")[0]);
			var style = {
				strokeOpacity: 1,
				graphicWidth:20,
				graphicHeight:22,
				externalGraphic:"imgs/qp_img/"+type[k].split("|")[0]+".png"
			}
			for(var i = 0;i<datas.length;i++){
				datas[i].type = type[k];
				if(typeof(datas[i].起点经度) != "undefined"){
					datas[i].经度 = (datas[i].起点经度*1+datas[i].终点经度*1)/2;
					datas[i].纬度 = (datas[i].起点纬度*1+datas[i].终点纬度*1)/2;
				}
				var typeStr = "险情等级";
				var putFlag = false;
				var singleFlag = type[k].split("|")[1];
				var swFlag = "";
				if(singleFlag != "singleFlag"){
					swFlag = type[k].split("|")[0].substring(0,type[k].split("|")[0].length-1);
				}else{
					swFlag = type[k].split("|")[0].substring(0,type[k].split("|")[0].length);
				}
				if(type[k].indexOf("singleFlag")>-1){
					newPoints.push(datas[i]);
					var geometry = new WeatherMap.Geometry.Point(datas[i].经度,datas[i].纬度);
					pointArray.push(geometry);
				}else{
					if(type[k].indexOf("Guott00")>-1){
						if(swFlag == "Guott003"){
							putFlag = true;
						}else{
							typeStr = "险情等级";
							putFlag = checkLike(datas[i], typeStr, type[k])
						};
					}else if(type[k].indexOf("Dizj00")>-1) {
						if (swFlag == "Dizj003") {
							typeStr = "救援队伍级别";
							putFlag = checkJydw(datas[i], typeStr, singleFlag);
						} else{
							typeStr = "类别";
							putFlag = checkLike(datas[i], typeStr, type[k]);
						}
					}else if(type[k].indexOf("Meitt00")>-1) {
						/*typeStr = "年生产能力";
						 putFlag = checkRange(datas[i],typeStr,type[k]);*/
						if (swFlag == "Meitt001"){
							typeStr = "瓦斯等级";
							putFlag = checkLike(datas[i],typeStr,type[k]);
						}else{
							typeStr = "救援队伍级别";
							putFlag = checkJydw(datas[i],typeStr,singleFlag);
						}
					}else if(type[k].indexOf("Shuilt00")>-1){
						typeStr = "库型";
						putFlag = checkLike(datas[i],typeStr,type[k]);
					}else if(type[k].indexOf("Anjj00")>-1){

					}else if(type[k].indexOf("Jiaott00")>-1){
						if(swFlag == "Jiaott005"){
							typeStr = "救援队伍级别";
							putFlag = checkJydw(datas[i],typeStr,singleFlag);
						}
					}
					debugger;
					if(typeof(datas[i][typeStr]) != "undefined"){
						if(putFlag) {
							newPoints.push(datas[i]);
							var geometry = new WeatherMap.Geometry.Point(datas[i].经度, datas[i].纬度);
							pointArray.push(geometry);
						}
					}
				}
			}
			for(var j = 0;j<pointArray.length;j++){
				var pointFeature = new WeatherMap.Feature.Vector(pointArray[j],newPoints[j],style);
				features.push(pointFeature);
			}
			layer.addFeatures(features);
		}
	}

	function randomPoint(pcount,px0,px1,py0,py1,type){
		var px = 112.55;
		var py = 37.87;
		var areaArray = [];
		for(var i = 0;i< pcount;i++){
			var xtemp = (px0+Math.random()*(px1-px0)).toFixed(2);
			var ytemp = (py0+Math.random()*(py1-py0)).toFixed(2);
			var pointdatas = {};
			pointdatas.lon = xtemp;
			pointdatas.lat = ytemp;
			pointdatas.data = "测试数据";
			pointdatas.type = type;
			areaArray.push(pointdatas);
		}
		return areaArray;
	}

	this.windowInfoXY = function(lonLat,contentHTML){
		var map = GDYB.Page.curPage.map;
		var pixel =  map.getPixelFromLonLat(lonLat);
		//$("#mtsContent").html(contentHTML);
		$(contentHTML).appendTo($("#mtsContent").empty()).find("#cpButton").click(function(){
			t.closeMyInfoWin();
		});
		var height = parseInt($("#MapToolsDiv").css("height"));
		var width = parseInt($("#MapToolsDiv").css("width"));
		//console.log(pixel.y+"|"+height+"|"+pixel.x+"|"+width);
		var bt = "B";
		var lr = "L";
		if(pixel.y>height||((parseInt($("#map").css("height")+2)-pixel.y)<height)){
			bt = "B";
		}else{
			bt = "T";
		}
		if((parseInt($("#map").css("width"))-pixel.x)>(parseInt(width)-35)){
			lr = "L";
		}else{
			lr = "R";
		}
		$(".mtsContentImg").css("display","none");
		$("#mtsContent"+bt+lr).css("display","block");
		$("#MapToolsDiv").css("top",pixel.y);
		$("#MapToolsDiv").css("left",pixel.x);
		if(bt == "B"){
			$("#MapToolsDiv").css("margin-top","-"+(height-60)+"px");
		}else{
			$("#MapToolsDiv").css("margin-top","55px")
		}
		if(lr == "L"){
			$("#MapToolsDiv").css("margin-left","200px");
		}else{
			$("#MapToolsDiv").css("margin-left","-"+(width-10)+"px");
		}
		$("#MapToolsDiv").css("display","block");
		map.events.register("move", map, function(event){
			if($("#MapToolsDiv").css("display")=="block")
			{
				var pixel = map.getPixelFromLonLat(lonLat);
				$("#MapToolsDiv").css("top",pixel.y);
				$("#MapToolsDiv").css("left",pixel.x);
			}
		});
	}

	this.closeMyInfoWin = function(){
		$("#MapToolsDiv").css("display","none").attr("hflag","remove");
	}

	this.getLayerToClose = function (layerType){
		//var types = "liveRain,fy2,liveRain,Tmp,rader,forecast";
		//var typesArray = types.split(",");
		var Curmap = GDYB.Page.curPage.map;
		var tempLayer;
		switch(layerType){
			case "stationlayer":{
				Curmap .getLayersByName("stationlayer")[0].removeAllFeatures();
			}
				break;
			case "liveRain":{
				Curmap.getLayersBy("cltype",layerType)[0].removeMap(Curmap);
			}
				break;
			case "fy2":{
				//Curmap.getLayersBy("cltype",layerType)[0].removeMap(Curmap);
				var layer = Curmap.getLayersBy("cltype",layerType)[0];
				Curmap.removeLayer(layer);
				layer.destroy();
			}
				break;
			case "Tmp":{
				tempLayer = Curmap.getLayersBy("cltype",layerType)[0];
			}
				break;
			case "rader":{
				tempLayer = Curmap.getLayersBy("name",layerType)[0];
			}
				break;
			case "forecast":{
				tempLayer = Curmap.getLayersBy("cltype",layerType)[0];
			}
				break;
		}
		if(tempLayer != null || typeof(tempLayer) != "undefined") {
			//console.log(tempLayer);
			tempLayer.removeAllFeatures();
			//tempLayer.redraw();
			//tempLayer.setVisibility(false);
			tempLayer.removeMap(Curmap);
			//Curmap.removeLayer(tempLayer);
			console.log("map已删除图层!");
		}
		/*
		 for(var str in typesArray){
		 var testLayer = tmap.getLayersBy("cltype",str)[0];
		 if(testLayer != null || typeof(testLayer) != "undefined"){
		 console.log(testLayer);
		 break;
		 }
		 }

		 for(var i = 0;i<typesArray.length;i++){
		 var testLayer = tmap.getLayersBy("cltype",typesArray[i])[0];
		 if(testLayer == null || typeof(testLayer) == "undefined"){
		 testLayer = tmap.getLayersBy("name",typesArray[i])[0];
		 }
		 console.log(typesArray[i]);
		 console.log(testLayer);
		 }
		 */
	}

	this.getStationData = function(dcode) {
		var stations = [];
		$.ajax({
			type: 'post',
			url: dUrl+'services/data/query',
			data: {'param': '{"Function":"getStationColums","CustomParams":{"departmentcode":'+dcode+'},"Type":2}'},
			dataType: 'json',
			//设置数据同步
			async: false ,
			success: function (columdata) {
				$.ajax({
					type: 'post',
					url: dUrl+'services/data/query',
					data: {'param': '{"Function":"getStationData","CustomParams":{"departmentcode":'+dcode+'},"Type":2}'},
					dataType: 'json',
					//设置数据同步
					async: false ,
					success: function (data) {
						for (var i = 0; i < data.length; i++){
							var station = {};
							for (var k = 0; k < columdata.length; k++) {
								station[columdata[k].namefield] = data[i][columdata[k].dbfield];
							}
							stations.push(station);
						}
						console.log(dcode);
						chkTag=dcode;
						chkArray=stations;
					},
					error:function(){
						//alert("获取相关数据失败！");
						layer.alert('获取相关数据失败！', {
							icon: 2
							, time: 3000 //2秒关闭（如果不配置，默认是3秒）
						});
					}
				});
			},
			error:function(){
				//alert("获取相关数据失败！");
				layer.alert('获取相关数据失败！', {
					icon: 2
					, time: 3000 //2秒关闭（如果不配置，默认是3秒）
				});
			}
		});
		return stations;
	}
	this.sdWindows = function(lonLat,contentHTML){
		var map =  GDYB.Page.curPage.map;
		var pixel =  map.getPixelFromLonLat(lonLat);
		$(contentHTML).appendTo($("#mtsContent").empty()).find("#cpButton").css("cursor","pointers").click(function(){
			$("#MapToolsDiv").css("display","none").attr("hflag","remove");
		});
		var height = parseInt($("#MapToolsDiv").css("height"));
		var width = $("#MapToolsDiv").css("width");
		var bt = "B";
		var lr = "L";
		if(pixel.y>height||((parseInt($("#accordion").css("height"))-pixel.y)<height)){
			bt = "B";
		}
		else{
			bt = "T";
		}
		if((document.body.offsetWidth-pixel.x)>(parseInt(width)-50)){
			lr = "L";
		}
		else{
			lr = "R";
		}
		$(".mtsContentImg").css("display","none");
		$("#mtsContent"+bt+lr).css("display","block");
		$("#MapToolsDiv").css("top",pixel.y);
		$("#MapToolsDiv").css("left",pixel.x);
		if(bt == "B"){
			$("#MapToolsDiv").css("margin-top","-"+(height+2)+"px");
		}
		else{
			$("#MapToolsDiv").css("margin-top","4px")
		}
		if(lr == "L"){
			$("#MapToolsDiv").css("margin-left","-50px");
		}
		else{
			$("#MapToolsDiv").css("margin-left","-"+width);
		}
		$("#MapToolsDiv").css("display","block");
		map.events.register("move", map, function(event){
			var top = parseInt($("#map").css("height"))-85;
			var left = parseInt($("#map").css("width"))-66;
			if($("#MapToolsDiv").css("display")=="block"){
				var pixel = map.getPixelFromLonLat(lonLat);
				$("#MapToolsDiv").css("top",pixel.y);
				$("#MapToolsDiv").css("left",pixel.x);
			}
			//debugger;
			var pixel = map.getPixelFromLonLat(lonLat);
			var curObj = $("#MapToolsDiv");
			if($(curObj).attr("hflag") =="remove"){
				return;
			}
			var ctop = parseInt($(curObj).css("top"));
			var cleft = parseInt($(curObj).css("left"));
			if($(curObj).css("display")=="block") {
				if (ctop > top ||ctop< 66 || cleft > left || cleft < 85) {
					$(curObj).css("display","none").attr("hflag","hyes");
				} else {
					$(curObj).css({"top":pixel.y,"left":pixel.x});
				}
			}else {
				if (85 < ctop < top && 86 < cleft < left) {
					$(curObj).css({"display": "block","top":pixel.y,"left": pixel.x}).attr("hflag","");
				}
			}
		});
	}

	/**
	 * 获取当前时间
	 * @param  {String}  isZh  是否中文 optional
	 * @param  {String}  adjustTime  手动调时 optional
	 */
	this.getMyCurTime = function(isZh,adjustTime,aim){
		var bjSj = new Date();
		var bjSjMiles = 0;
		if(!(adjustTime == null || typeof(adjustTime) == "undefined" || adjustTime*1 == 0 )){
			bjSjMiles = bjSj.getTime()+(adjustTime*1*60*1000);
		}else{
			bjSjMiles = bjSj.getTime();
		}
		var myCurTime = getTimeStr(bjSjMiles);
		var timeTemp = "";
		if(isZh){
			timeTemp =  myCurTime.substr(0,4) + "年" + myCurTime.substr(4,2)+ "月" + myCurTime.substr(6,2) + "日" + myCurTime.substr(8,2) + "时"+myCurTime.substr(10,2)+"分";
		}else{
			timeTemp =  myCurTime.substr(0,4)+"-"+myCurTime.substr(4,2)+"-"+myCurTime.substr(6,2)+" "+myCurTime.substr(8,2)+":"+myCurTime.substr(10,2)+":00";
		}
		//console.log(timeTemp);
		if(aim == "hour"){
			if(timeTemp.indexOf("时")>-1){
				//console.log(timeTemp.substring(0,timeTemp.indexOf("时")+1));
				return  timeTemp.substring(0,timeTemp.indexOf("时")+1);
			}else{
				//console.log(timeTemp.substring(0,timeTemp.indexOf(":")));
				return  timeTemp.substring(0,timeTemp.indexOf(":"))+":00"
			}
		}else if(aim == "day"){
			if(timeTemp.indexOf("日")>-1){
				//console.log(timeTemp.substring(0,timeTemp.indexOf("时")+1));
				return  timeTemp.substring(0,timeTemp.indexOf("日")+1);
			}else{
				//console.log(timeTemp.substring(0,timeTemp.indexOf(":")));
				return  timeTemp.substring(0,timeTemp.indexOf(" "));
			}
		}else{
			return timeTemp;
		}
	};
	/**
	 * 获取选择时间，可选校准adjustTime 单位分钟
	 * * @param  {String}  oldtime  需要转换的时间 optional
	 * @param  {String}  isZh  是否中文 optional
	 * @param  {String}  adjustTime  手动调时 单位分钟 optional
	 */
	this.getMyTime = function(oldtime,isZh,adjustTime,aim){
		var curTimeStr =  oldtime;
		var bjSj = new Date(curTimeStr);
		var bjSjMiles = 0;
		if(!(adjustTime == null || typeof(adjustTime) == "undefined" || adjustTime*1 == 0 )){
			bjSjMiles = bjSj.getTime()+(adjustTime*1*60*1000);
		}else{
			bjSjMiles = bjSj.getTime();
		}
		var myCurTime = getTimeStr(bjSjMiles);
		var timeTemp = "";
		if(isZh){
			timeTemp = myCurTime.substr(0,4) + "年" + myCurTime.substr(4,2)+ "月" + myCurTime.substr(6,2) + "日 " + myCurTime.substr(8,2) + "时"+myCurTime.substr(10,2)+"分";
		}else{
			timeTemp = myCurTime.substr(0,4)+"-"+myCurTime.substr(4,2)+"-"+myCurTime.substr(6,2)+" "+myCurTime.substr(8,2)+":"+myCurTime.substr(10,2)+":00";
		}
		if(typeof(aim) == "undefined" || aim == null || aim == ""){
			return timeTemp;
		}
		if(aim == "hour"){
			if(timeTemp.indexOf("时")>-1){
				//console.log(timeTemp.substring(0,timeTemp.indexOf("时")+1));
				return  timeTemp.substring(0,timeTemp.indexOf("时")+1);
			}else{
				//console.log(timeTemp.substring(0,timeTemp.indexOf(":")));
				return  timeTemp.substring(0,timeTemp.indexOf(":"))+":00"
			}
		}else if(aim == "day"){
			if(timeTemp.indexOf("日")>-1){
				//console.log(timeTemp.substring(0,timeTemp.indexOf("时")+1));
				return  timeTemp.substring(0,timeTemp.indexOf("日")+1);
			}else{
				//console.log(timeTemp.substring(0,timeTemp.indexOf(":")));
				return  timeTemp.substring(0,timeTemp.indexOf(" "));
			}
		}else{
			return timeTemp;
		}
	};
	/**
	 * 按小时获取山东市级区划 AQI
	 * @param  {String}  observTime  查询时间 optional
	 */
	this.getSDAQIHour = function(observTime,typeStr){
		var realDatas = [];
		$.ajax({
			type: 'post',
			url: ENVIServiceUrl+'services/data/query',
			//data: {'param': '{"Function":"getStationAQI","CustomParams":{"observTime":'+'"2014-06-09 06:00:00"'+'},"Type":2}'},
			data: {'param': '{"Function":"getStationAQI","CustomParams":{"observTime":"'+observTime+'"},"Type":2}'},
			dataType: 'json',
			timeout:6500,
			//设置数据同步；异步禁止：async: false ,
			async: false,
			success: function (data) {
				//剥离相同市级单位数据，选相同期各市第一个数据站
				var tempArray = [];
				for(var k in data){
					var stID = "";
					if(data[k].stationName.indexOf("_")>-1){
						stID = data[k].stationName.split("_")[0];
					}else{
						stID = data[k].stationName
					}
					if(stID.indexOf("市") < 0){
						stID += "市";
					}
					if($.inArray(stID,tempArray)<0){
						//简单规避无效值
						if(data[k][typeStr]*1 <99999){
							data[k].stationName = stID;
							realDatas.push(data[k]);
							tempArray.push(stID);
						}
					}
				}
			},
			error:function(){
				//alert("获取相关数据失败！");
				layer.alert('获取相关数据失败！', {
					icon: 2
					, time: 2000 //2秒关闭（如果不配置，默认是3秒）
				});
			}
		});
		return realDatas;
	};
	/**
	 * 山东市级区划 AQI 气泡事件
	 * @param  {String}  curLayer  需要绑定的图层 optional
	 */
	this.SDAQICallBack = function(curLayer){
		var callbacks = {
			click: function (currentFeature) {
				debugger;
				//var date = new Date(currentFeature.attributes.observTime);
				var endTime = currentFeature.attributes.observTime;
				var startTime = t.getMyTime(endTime,false,-1*24*60);
				console.log(startTime + " | " + endTime);
				var list = t.getSDAQIHourDetail(currentFeature.attributes.lat,startTime,endTime);
				displayStationChart(list,currentFeature);
			},
			clickout: function (currentFeature) {
				t.closeAQIWin();
			},
			/*out: function (currentFeature) {
			 t.closeMyInfoWin();
			 }*/
		};
		var selectFeature = new WeatherMap.Control.SelectFeature(curLayer, {
			callbacks: callbacks
		});
		GDYB.Page.curPage.map.addControl(selectFeature);
		selectFeature.activate();
	};
	function dateToTimeStation(nowDate){
		return nowDate.getFullYear()+(Array(2).join(0)+(nowDate.getMonth()+1)).slice(-2)+(Array(2).join(0)+nowDate.getDate()).slice(-2)+(Array(2).join(0)+nowDate.getHours()).slice(-2)+(Array(2).join(0)+(nowDate.getMinutes()-nowDate.getMinutes()%10)).slice(-2);
	}
	//单站2日数据图表展示
	function displayStationChart(list,currentFeature){
		//currentFeature.attributes = tempFeature;
		if(list.length==0)
			return;
		var lonLat = new WeatherMap.LonLat(currentFeature.attributes.lon,currentFeature.attributes.lat);
		var tempTime = currentFeature.attributes.observTime;
		var endTime = t.getMyTime(tempTime,true,0);
		var startTime = t.getMyTime(tempTime,true,-1*24*60);
		var curStationName = "";
		if(currentFeature.attributes.stationName.indexOf("_")>-1){
			curStationName = currentFeature.attributes.stationName.split("_")[0];
		}else{
			curStationName = currentFeature.attributes.stationName
		}
		var title = curStationName +"&nbsp;"+ startTime +"到" + endTime +" 空气数据";
		var contentHTML = "";
		contentHTML = "<div id='waterWindowInfo' style='font-size:12px;width: 565px;'>";
		contentHTML += "<div class='typhoonInfoTitle' style='height: 25px;border-bottom: 1px solid #e6e6e6;'><span style='line-height: 25px;margin-left: 10px;;font-weight: bold;font-size: 14px;text-align: center'>环境数据单站信息查询</span>"+
			"<span onclick='dmt.closeAQIWin()'title='关闭' style='float: right;margin: 0px 5px 5px 0px;cursor:pointer;font-size: 20px;font-family: cursive;'>x</span></div>";
		contentHTML += '<div style="text-align: center;font-size: 16px;margin-top: 5px;">'+title+'</div>';
		contentHTML += '<div style="height: 300px;"><span class="chartScaleSpan" style="color: rgb(31,199,255);">AQI</span><span class="chartScaleSpan" style="margin-top: 90px;color: rgb(255,0,0)">PM2.5</span><span class="chartScaleSpan" style="margin-top: 135px;color: rgb(51,255,0)">PM10</span><span class="chartScaleSpan" style="margin-top: 180px;color: rgb(255,0,255)">O3</span>';
		contentHTML += '<canvas id="preChart" height="300" width="535" style="position: absolute;margin-left:24px;"></canvas></div>';
		//contentHTML += '<canvas id="stationChart" height="300" width="540" style="position: absolute;margin-left:24px;"></canvas></div>';
		contentHTML +='<div style="height: 50px;margin-top: 10px;margin-left:24px;">' +
			'<div class="chartLegend" style="background-color: RGB(31,199,255);"></div>' +
			'<span class="chartLegendSpan">AQI</span>' +
			'<div class="chartLegend" style="background-color: rgb(255,0,0);"></div><span class="chartLegendSpan">PM2.5</span>' +
			'<div class="chartLegend" style="background-color: rgb(51,255,0);"></div><span class="chartLegendSpan">PM10</span>' +
			'<div class="chartLegend" style="background-color: rgb(255,0,255);"></div><span class="chartLegendSpan">O3</span></div>';
		windowInfoXY(lonLat,contentHTML);
		/*var stationChartData = {
		 labels : [],
		 datasets : [
		 {
		 fillColor : "rgba(151,187,205,0)",
		 strokeColor : "rgba(255,0,0,1)",
		 pointColor : "rgba(151,187,205,0)",
		 pointStrokeColor : "#fff",
		 data : []
		 },
		 {
		 fillColor : "rgba(151,187,205,0)",
		 strokeColor : "rgba(51,255,0,1)",
		 pointColor : "rgba(151,187,205,0)",
		 pointStrokeColor : "#fff",
		 data : []
		 },
		 {
		 fillColor : "rgba(151,187,205,0)",
		 strokeColor : "rgba(255,0,255,1)",
		 pointColor : "rgba(151,187,205,0)",
		 pointStrokeColor : "#fff",
		 data : []
		 }
		 ]
		 };*/
		var stationBarData = {
			labels : [],
			datasets : [
				{
					fillColor : "rgba(31,199,255, 0.6)",
					strokeColor : "rgba(31,199,255,1)",
					pointColor : "rgba(31,199,255,0)",
					pointStrokeColor : "#fff",
					scaleShowLabels : false,
					bezierCurve : false,
					pointDot:false,
					data : []
				},{
					fillColor : "rgba(255,0,0,0.6)",
					strokeColor : "rgba(255,0,0,1)",
					pointColor : "rgba(255,0,0,0)",
					pointStrokeColor : "#fff",
					scaleShowLabels : false,
					bezierCurve : false,
					pointDot:false,
					data : []
				},
				{
					fillColor : "rgba(51,255,0,0.6)",
					strokeColor : "rgba(51,255,0,1)",
					pointColor : "rgba(51,255,0,0)",
					pointStrokeColor : "#fff",
					scaleShowLabels : false,
					bezierCurve : false,
					pointDot:false,
					data : []
				},
				{
					fillColor : "rgba(255,0,255,0.6)",
					strokeColor : "rgba(255,0,255,1)",
					pointColor : "rgba(255,0,255,0)",
					pointStrokeColor : "#fff",
					scaleShowLabels : false,
					bezierCurve : false,
					pointDot:false,
					data : []
				}
			]
		};
		for(var i=0;i<list.length;i++){
			if(i != 0 && i%2 == 0) {
				stationBarData.datasets[0].data.push(reAQIvalue(list[i]["AQI"]));
				stationBarData.datasets[1].data.push(reAQIvalue(list[i]["PM25"]));
				stationBarData.datasets[2].data.push(reAQIvalue(list[i]["PM10"]));
				stationBarData.datasets[3].data.push(reAQIvalue(list[i]["O3"]));
				//"2014-06-08 03:00:00"
				//console.log(list[i].observTime.substr(8, 2) + "/" + list[i].observTime.substr(11, 2));
				stationBarData.labels.push(list[i].observTime.substr(8, 2) + "/" + list[i].observTime.substr(11, 2));
				//stationChartData.labels.push(list[i].observTime.substr(8, 2) + "/" + list[i].observTime.substr(11, 2));
				//stationChartData.datasets[0].data.push(list[i]["PM25"]);
				//stationChartData.datasets[1].data.push(list[i]["PM10"]);
				//stationChartData.datasets[2].data.push(list[i]["SO2"]);
			}
		}
		//var stationChart = new Chart(document.getElementById("stationChart").getContext("2d"));
		var preChart = new Chart(document.getElementById("preChart").getContext("2d"));
		var config = {
			animation:true,
			animationEasing:"easeOutQuart",
			animationSteps:60,
			barDatasetSpacing:1,
			barShowStroke:true,
			barStrokeWidth:2,
			barValueSpacing:5,
			onAnimationComplete:null,
			scaleFontColor:"#666",
			scaleFontFamily:"'Arial'",
			scaleFontSize:12,
			scaleFontStyle:"normal",
			scaleGridLineColor:"#ffffff",
			scaleGridLineWidth:2,
			scaleLabel:"<%=value%>",
			scaleLineColor:"#ffffff",
			scaleLineWidth:1,
			scaleOverlay:false,
			scaleOverride:false,
			scaleShowGridLines:true,
			scaleShowLabels:true,
			scaleStartValue:0,
			scaleStepWidth:null,
			scaleSteps:null,
			Expand:0,
			deviationY:500
		}
		preChart.Bar(stationBarData);
		//preChart.Bar(stationBarData,config);
		//stationChart.Line(stationChartData);
	}

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
			if($("#myInfoWindow").css("display")=="block")
			{
				var pixel = GDYB.Page.curPage.map.getPixelFromLonLat(lonLat);
				$("#myInfoWindow").css("top",pixel.y);
				$("#myInfoWindow").css("left",pixel.x);
			}
		});
	}
	//校对AQI无效值
	function reAQIvalue (vobj){
		if(vobj*1 > 1000){
			return "1000";
		}else if(vobj*1 < 0){
			return "0";
		}else{
			return vobj;
		}
	}

	this.closeAQIWin = function(){
		$("#myInfoWindow").css("display","none");
	}

	/**
	 * 实况监测报警初始化
	 */
	this.warningFlashInit = function(){
		var curmap = GDYB.Page.curPage.map;
		if (!(curmap.getLayersByName("markersLayer")[0])) {
			var markersLayer = new WeatherMap.Layer.Markers('markersLayer');
			curmap.addLayer(markersLayer);
		}
		curmap.getLayersByName("markersLayer")[0].clearMarkers();
		if (!(curmap.getLayersByName("animatorLayer")[0])) {
			var animatorLayer = new WeatherMap.Layer.AnimatorVector('animatorLayer', {
				rendererType: 'GlintAnimator'
			}, {
				repeat: true,
				speed: 1,
				startTime: 1,
				endTime: 1,
				frameRate: 20
			});
			animatorLayer.renderer.pointStyle = {
				pointRadius: 6,
				fillOpacity: 0.6
			};
			curmap.addLayer(animatorLayer);
		}
		curmap.getLayersByName("animatorLayer")[0].removeAllFeatures();
	}
	//获取报警阈值
	this.getWarningHold = function() {
		//"http://10.76.10.166:8081/WMGridService/services/ForecastfineService/getWarningHold";
		var url = gridServiceUrl+'services/ForecastfineService/getWarningHold';
		var data = "";
		var async = false;
		var error ="测试一下";
		var myData = t.getDataByAjaxPost(url,data,async,error);
		for(var i in myData){
			if(myData[i].type == "TEM_Max"){
				temMaxHold = myData[i];
			}
			if(myData[i].type == "TEM_Min"){
				temMinHold = myData[i];
			}
			if(myData[i].type == "PRE_1h"){
				preHold = myData[i];
			}
			if(myData[i].type == "WIN_S_Avg_10mi"){
				windHold = myData[i];
			}
		}
	}
	//ajax通用化方法第一版
	this.getDataByAjaxPost = function(url,data,async,error){
		var yourData = null;
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			dataType: 'json',
			//设置数据同步
			async: async ,
			success: function (data) {
				yourData = data;
			},
			error:function(){
				//alertFuc(error);
			}
		});
		return yourData;
	}

	this.getDataRecall = function(recall,url,data,async,error) {
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			dataType: 'json',
			timeout:6500,
			//设置数据同步
			async: async ,
			success: function (dbData) {
				//recall&&recall(data);
				if($.isFunction(recall)){
					recall.call(dbData,dbData);
				}
			},
			error:function(){
				if(!(error == null || typeof(error) == "undefined" || error == "")){
					alertFuc(error);
				}
			}
		});
		//return yourData;
	}

	/**
	 * 实况监测报警数据加载动画
	 */
	this.ZHJCWarning = function() {
		var me = GDYB.Page.curPage;
		this.warningFlashInit();
		var markersLayer = me.map.getLayersByName("markersLayer")[0];
		var animatorLayer = me.map.getLayersByName("animatorLayer")[0];
		//debugger;
		var size = new WeatherMap.Size(42, 42);
		var offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
		var style = { //点样式
			stroke: false,
			pointRadius: 2
		};
		function queryForecasts() {
			return $.getJSON('/'+webRootName+'/test/warning-real-data.json');
		}
		function popup(attr) {
			var html = ''
				+'<div class="">'
				+'<div class="title">'+ attr.city + ' ' + attr.type + '</div>'
				+'</div>';
			var popup = new WeatherMap.Popup.FramedCloud(
				'marker_popup',
				new WeatherMap.LonLat(attr.lon, attr.lat),
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
		// 初始化图层
		queryForecasts().done(function(data) {
			if(data.length >0){
				data.forEach(function(attr, index) {
					var ICON_URL = '/'+webRootName+'/imgs/monitor/';
					var icon = ICON_URL + attr.type + '.gif';
					var marker = new WeatherMap.Marker(
						new WeatherMap.LonLat(attr.lon, attr.lat),
						new WeatherMap.Icon(icon, size, offset)
					);
					marker.attributes = attr;
					marker.events.on({
						click: function() {
							debugger;
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
					// me.forecastMarkersLayer.setVisibility(false);
					var point = new WeatherMap.Geometry.Point(attr.lon, attr.lat);
					var pointStyle = Object.assign({}, style, { //样式
						fillColor: attr.color
					});
					var pointFeature = new WeatherMap.Feature.Vector(point, {
						TIME: 1,
						FEATUREID: index
					}, pointStyle);
					pointFeatures.push(pointFeature);
				});
				/*
				 // 添加动画
				 var attr = data[0];
				 animatorLayer.addFeatures(pointFeatures);
				 // 延迟开始动画,等待地图准备
				 setTimeout(function() {
				 animatorLayer.animator.start();
				 }, 1000);*/
			}
		});
	}


	/**
	 * 按小时获取山东单市 AQI 详情
	 * @param  {String}  latStr  站点ID optional
	 * @param  {String}  startTime  起始时间 optional
	 * @param  {String}  endTime  结束时间 optional
	 */
	this.getSDAQIHourDetail = function(latStr,startTime,endTime){
		var stationDetail = [];
		$.ajax({
			type: 'post',
			url: ENVIServiceUrl+'services/data/query',
			data: {'param': '{"Function":"getStationAQIDetail","CustomParams":{"lat":"'+latStr+'","startTime":"'+ startTime+'","endTime":"'+ endTime+'"},"Type":2}'},
			dataType: 'json',
			timeout:6500,
			//设置数据同步；异步禁止：async: false ,
			async: false,
			success: function (data) {
				var cName = data[0].stationName.split("_")[0];
				for(var k in data) {
					data[k].stationName = cName;
					stationDetail.push(data[k]);
				}
			},
			error:function(){
				//alert("获取相关数据失败！");
				layer.alert('获取相关数据失败！', {
					icon: 2
					, time: 2000 //2秒关闭（如果不配置，默认是3秒）
				});
			}
		});
		return stationDetail;
	};
	/**
	 * 导出成图片
	 * @param  {String}  selector  导出元素 optional
	 * @param  {String}  filename  导出文件名 optional
	 */

	this.exportToImage= function(selector, filename) {
		$("#div_tools").find("img").removeClass("active");
		$(this).addClass("active");
		$("#Panel_Tools").css("display","none"); //去掉工具箱
		$("#mapSwitch_div").css("display","none");//去掉地图切换工具
		$(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
		$("#screenShotLegend").css({"height":"30px"/*,"border":"1px solid black"*/});
		$(".smControlMousePosition").css("display","none");
		var newDiv = $($(".smControlMousePosition")[1]).clone();
		newDiv.empty().attr("id","newDepartNameDiv").html($.cookie("departName")+'-'+$.cookie("showName")).css({"z-index":"99999","color":"red","font-size":"16px"}).show();
		$("#map").append(newDiv);
		var isLegend = false;
		setTimeout(function(){
			var legend_width = $("#div_legend").width();
			if($("#div_legend_items").html()!=""){
				isLegend = true;
			}
			SPDPrintBound('map',isLegend,function(img) {
				var legendmanager = new LegendManager("#screenShotLegend");
				$("#Panel_Tools").css("display", "block");
				$("#mapSwitch_div").css("display", "block");
				$(".smControlZoomIn.smButton").parent().css("display", "block");
				$("#newDepartNameDiv").remove();
				$(".smControlMousePosition").css("display","block");
				var $screenShotDiv = $('#screenShotDiv');
				if ($('#outPutMapDiv').html() != "") {
					$('#outPutMapDiv').empty();
					$('#hideDiv').empty();
					$("#screenShotLegend").empty();
					$("#titleDiv").empty();
					$("#titleDiv").append('<p style="display:inline-block" id="p_time"></p><p style="display:inline-block" id="p_small"></p>')
				}
				$("#titleDiv").empty();
				$("#titleDiv").append('<p style="display:inline-block" id="p_time"></p><p style="display:inline-block" id="p_small"></p>');
				var bstr = $("#div_Station").find("table.active button.active").text();
				var tempName = "";
				if($("#currentNav").html().length > 0 ){
					tempName =  t.getMyCurTime(false,0,"hour") +" "+ t.stripHTML($("#currentNav").html().split("&gt;")[1]).replace(/&nbsp;/g, "").replace(/\s*$|^\s*!/g, "")+((typeof(bstr) == 'undefined' || bstr.length <1)?"":("-"+bstr));
				}else{
					tempName = t.getMyCurTime(false,0,"hour").replace(/\s*$|^\s*!/g, "");
				}
				$('#titleDiv #p_time').editable(function (value, settings) {
					return (t.getFileName(value));
				}, {
					//placeholder: tempName,
					onblur: "submit",
					height: "100%",
					width: "100%",
				}).css({"color":"red","text-align":"center"});
				$('#titleDiv #p_time').html(tempName);
				var sufix = "";
				if(GDYB.Page.curPage.className == "SKZL"){
					if(showName.indexOf("TEM") > -1){
						sufix = "(°C)";
					}else if(showName.indexOf("PRE_") > -1){
						sufix = "(mm)"
					}else if(showName.indexOf("WIN_") > -1){
						sufix = " (m/s)";
					}else if(showName.indexOf("VIS") > -1){
						sufix = " (Km)";
					}else if(showName.indexOf("RHU") > -1){
						sufix = " (%)";
					}else if(showName.indexOf("PRS") > -1){
						sufix = " (hPa)";
					}
				}
				$('#titleDiv #p_small').html("&nbsp;<small style='color:RGB(55,156,226);font-size:12px'>&nbsp;" + sufix + "&nbsp;</small>");
				if($("#div_legend").html() != ""){
					$("#screenShotLegend").append($("#div_legend").html());
				}
				$('#outPutMapDiv').append(img);
				$('#outPutMapDiv').find("img").css("max-height","100%");
				$('#div_modal_screenShot').modal('show');
				//保存按钮
				$('.export-btn').off("click");
				$('.export-btn').on("click",function() {
					SPDprintDiv($('#screenShotDiv'),function(img) {
						var url = img.src;
						var  nameTem = t.getFileName($('#titleDiv #p_time').text());
						var filename = nameTem + '.png';
						var a = document.createElement('a');
						a.style.display = 'none';
						a.setAttribute('href', url);
						a.setAttribute('download', filename);
						document.body.appendChild(a);
						a.dispatchEvent(new MouseEvent('click'));
						document.body.removeChild(a);
						$('#div_modal_screenShot').modal('hide');
					});
				});
			});
		},1200);
	}

	this.exportToImageNew = function(selector, filename) {
		$("#div_tools").find("img").removeClass("active");
		$(this).addClass("active");
		$("#Panel_Tools").css("display","none"); //去掉工具箱
		$("#mapSwitch_div").css("display","none");//去掉地图切换工具
		$(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
		$("#screenShotLegend").css({"height":"30px"/*,"border":"1px solid black"*/});
		$(".smControlMousePosition").css("display","none");
		var newDiv = $($(".smControlMousePosition")[1]).clone();
		var departName = (typeof($.cookie("departName")) == "undefined" || $.cookie("departName") == "undefined")?"":$.cookie("departName");
		newDiv.empty().attr("id","newDepartNameDiv").html(departName).css({"z-index":"99999","color":"red","font-size":"16px"}).show();
		$("#map").append(newDiv);
		var isLegend = false;
		setTimeout(function(){
			var legend_width = $("#div_legend").width();
			if($("#div_legend_items").html()!=""){
				isLegend = true;
			}
			SPDPrintBound('map',isLegend,function(img) {
				var $screenShotDiv = $('#screenShotDiv');
				if ($('#outPutMapDiv').html() != "") {
					$('#outPutMapDiv').empty();
					$('#hideDiv').empty();
					$("#screenShotLegend").empty();
					$("#titleDiv").empty();
					$("#titleDiv").append('<p style="display:inline-block" id="p_time"></p><p style="display:inline-block" id="p_small"></p>')
				}
				$("#titleDiv").empty();
				$("#titleDiv").append('<p style="display:inline-block" id="p_time"></p><p style="display:inline-block" id="p_small"></p>');
				var bstr = $("#div_Station").find("table.active button.active").text();
				var tempName = "";
				if($("#currentNav").html().length > 0 ){
					tempName =  t.getMyCurTime(false,0,"hour") +" "+ t.stripHTML($("#currentNav").html().split("&gt;")[1]).replace(/&nbsp;/g, "").replace(/\s*$|^\s*!/g, "")+((typeof(bstr) == 'undefined' || bstr.length <1)?"":("-"+bstr));
				}else{
					tempName = t.getMyCurTime(false,0,"hour").replace(/\s*$|^\s*!/g, "");
				}
				$('#titleDiv #p_time').editable(function (value, settings) {
					return (t.getFileName(value));
				}, {
					//placeholder: tempName,
					onblur: "submit",
					height: "100%",
					width: "100%",
				}).css({"color":"red","text-align":"center"});
				$('#titleDiv #p_time').html(tempName);
				var sufix = "";
				if(GDYB.Page.curPage.className == "SKZL"){
					if(showName.indexOf("TEM") > -1){
						sufix = "(°C)";
					}else if(showName.indexOf("PRE_") > -1){
						sufix = "(mm)"
					}else if(showName.indexOf("WIN_") > -1){
						sufix = " (m/s)";
					}else if(showName.indexOf("VIS") > -1){
						sufix = " (Km)";
					}else if(showName.indexOf("RHU") > -1){
						sufix = " (%)";
					}else if(showName.indexOf("PRS") > -1){
						sufix = " (hPa)";
					}
				}
				/*
				else{
					$("#Panel_Tools").css("display", "block");
					$("#mapSwitch_div").css("display", "block");
					$(".smControlZoomIn.smButton").parent().css("display", "block");
					$(".smControlMousePosition").css("display","block");
					$("#newDepartNameDiv").remove();
					$("#myTitle").remove();
					$('#div_modal_screenShot').modal('hide');
					return;
				}
				*/
				$('#titleDiv #p_small').html("&nbsp;<small style='color:RGB(55,156,226);font-size:12px'>&nbsp;" + sufix + "&nbsp;</small>");
				if($("#div_legend").html() != ""){
					$("#screenShotLegend").append($("#div_legend").html());
				}
				$('#outPutMapDiv').append(img);
				$('#outPutMapDiv').find("img").css("max-height","100%");
				$('#div_modal_screenShot').modal('show');
				//保存按钮
				$('a.close').on("click",function(){
					$("#Panel_Tools").css("display", "block");
					$("#mapSwitch_div").css("display", "block");
					$(".smControlZoomIn.smButton").parent().css("display", "block");
					$(".smControlMousePosition").css("display","block");
					$("#newDepartNameDiv").remove();
					$("#myTitle").remove();
					$('#div_modal_screenShot').modal('hide');
				});
				$('.export-btn').on("click",function() {
					$($("#map_title_div").clone().html($('#titleDiv').html())).attr("id","myTitle").css({"background-color":"","font-size":"15px","z-index":"9999","display":"block","border":"","top":"2%"}).appendTo($("#map"));
					var lvFlag = $("#div_legend").css("display");
					if($("#div_legend_items").html().length > 0){
						if(lvFlag == "block"){
							$("#div_legend").css("display","none");
						}
						var sLegend = $("#div_legend").clone().css("z-index","9999");
						$(sLegend).show().appendTo($("#map"));
					}
					var aqiFlag = $("#AQI_chart").css("display");
					if(aqiFlag == "block"){
						$("#AQI_chart").css("display","none");
						var sLegend = $("#AQI_chart").clone().css("z-index","9999");
						$(sLegend).show().appendTo($("#map"));
					}
					SPDprintDiv($('#map'),function(img) {
						var url = img.src;
						var  nameTem = t.getFileName($('#titleDiv #p_time').text());
						var filename = nameTem + '.png';
						var a = document.createElement('a');
						a.style.display = 'none';
						a.setAttribute('href', url);
						a.setAttribute('download', filename);
						document.body.appendChild(a);
						a.dispatchEvent(new MouseEvent('click'));
						document.body.removeChild(a);
						//var legendmanager = new LegendManager("#screenShotLegend");
						$("#Panel_Tools").css("display", "block");
						$("#mapSwitch_div").css("display", "block");
						$(".smControlZoomIn.smButton").parent().css("display", "block");
						$(".smControlMousePosition").css("display","block");
						$("#newDepartNameDiv").remove();
						$("#myTitle").remove();
						$(sLegend).remove();
						$("#div_legend").css("display",lvFlag);
						$("#AQI_chart").css("display",aqiFlag);
						$('#div_modal_screenShot').modal('hide');
					});
				});
			});
		},1200);
	}

	this.exportNewImage = function(selector, filename) {
		$("#div_tools").find("img").removeClass("active");
		$(this).addClass("active");
		$("#Panel_Tools").css("display","none"); //去掉工具箱
		$("#mapSwitch_div").css("display","none");//去掉地图切换工具
		$(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
		$(".smControlMousePosition").css("display","none");
		var newDiv = $($(".smControlMousePosition")[1]).clone();
		var departName = (typeof($.cookie("departName")) == "undefined" || $.cookie("departName") == "undefined")?"":$.cookie("departName");
		newDiv.empty().attr("id","newDepartNameDiv").html(departName).css({"z-index":"99999","color":"red","font-size":"16px"}).show();
		$("#map").append(newDiv);
		setTimeout(function(){
			$("#map_title_div").hide();
			var editTitle = $("#titleDiv").empty().clone();
			$(editTitle).append('<p id="p_time" title="点此编辑标题" style="cursor: help; display:inline-block"></p><p id="p_small" style="display:inline-block" ></p>');
			var bstr = $("#div_Station").find("table.active button.active").text();
			var tempName = "";
			var dateStr = "";
			var dataTime = GDYB.SKZLPage.myDateSelecter.getCurrentTime(false);
			if(t.stripHTML(bstr).indexOf("日") > -1){
				//dateStr = t.getMyCurTime(false,0,"day");
				dateStr = t.getMyTime(dataTime,false,0,"day");
			}else{
				//dateStr = t.getMyCurTime(false,0,"hour");
				dateStr = t.getMyTime(dataTime,false,0,"hour");
			}
			tempName =  dateStr +" "+ t.stripHTML((typeof(bstr) == 'undefined' || bstr.length <1)?"":bstr);
			if(tempName.indexOf("最") > -1){
				if(showName.indexOf("TEM") > -1 ){
					if(tempName.indexOf("气温") == -1){
						tempName += "气温"
					}
				}else{
					tempName += "地温"
				}
			}
			if(GDYB.SKZLPage.historyCheck) {
				var oneStartTime = GDYB.SKZLPage.myDateSelecter1.getCurrentTime(false);
				var oneEndTime = GDYB.SKZLPage.myDateSelecter2.getCurrentTime(false);
				tempName = t.getMyTime(oneStartTime,false,0,"hour").replace(/\s*$|^\s*!/g, "");
				tempName += " 到 ";
				tempName += t.getMyTime(oneEndTime,false,0,"hour").replace(/\s*$|^\s*!/g, "");
				tempName += " 时段降水";
			}
			var sufix = "";
			if(GDYB.Page.curPage === GDYB.SKZLPage){
				if(showName.indexOf("TEM") > -1 || showName.indexOf("GST") > -1){
					sufix = "(℃)";
				}else if(showName.indexOf("PRE_") > -1){
					sufix = "(mm)"
				}else if(showName.indexOf("WIN_") > -1){
					sufix = " (m/s)";
				}else if(showName.indexOf("VIS") > -1){
					sufix = " (Km)";
				}else if(showName.indexOf("RHU") > -1){
					sufix = " (%)";
				}else if(showName.indexOf("PRS") > -1){
					sufix = " (hPa)";
				}
			}else{
				tempName += t.stripHTML($("#currentNav").html().split("&gt;")[1]).replace(/&nbsp;/g, "").replace(/\s*$|^\s*!/g, "")
			}
			$(editTitle).find('#p_time').editable(function (value, settings) {
				return (t.getFileName(value));
			}, {
				//placeholder: tempName,
				onblur: "submit",
				height: "100%",
				width: "100%",
			}).css({"color":"red","text-align":"center"});
			$(editTitle).find('#p_time').html(tempName);

			//$(editTitle).find('#p_small').html("&nbsp;<small style='color:RGB(55,156,226);font-size:13px'>&nbsp;" + sufix + "&nbsp;</small>");
			$(editTitle).find('#p_small').html("&nbsp;" + sufix + "&nbsp;");
			var editTitleDiv = $("<div id='editTitleDiv'></div>").css({"position":"absolute","display":"block","left":"46%","top":"1%","margin-left":"-140px","text-align":"center","color":"red","font-size":"15px","z-index":"9999"})
			$(editTitle).appendTo($(editTitleDiv));
			var nlFlag = $("#mapLegend").css("visibility");
			if(nlFlag == "visible"){
				$("#mapLegend").css("visibility","hidden");
				var cLegend = $("#mapLegend").clone().css({"z-index":"9999","visibility":"visible"});
				$(cLegend).appendTo($("#map"));
			}
			var aqiFlag = $("#AQI_chart").css("display");
			if(aqiFlag == "block"){
				$("#AQI_chart").css("display","none");
				var sLegend = $("#AQI_chart").clone().css("z-index","9999");
				$(sLegend).show().appendTo($("#map"));
			}
			var sbutton = $("<span id='eSave' style='cursor: pointer;padding:1px;border:1px solid #ccc;color:white;font-size:14px;background-color: #77B4FE;border-radius: 3px;margin:0px 10px 0px 0px;'>保存</span>");
			var cbutton = $("<span id='eCancle' style='cursor: pointer;padding:1px;border:1px solid #ccc;color:white;font-size:14px;background-color: #77B4FE;border-radius: 3px;margin:0px 0px 0px 10px;'>取消</span>").click(function(){
				$('#newDepartNameDiv').remove();
				$("#Panel_Tools").css("display", "block");
				$("#mapSwitch_div").css("display", "block");
				$(".smControlZoomIn.smButton").parent().css("display", "block");
				$("#newDepartNameDiv").remove();
				$(".smControlMousePosition").css("display","block");
				$(editTitleDiv).remove();
				$(sLegend).remove();
				$(cLegend).remove();
				$("#mapLegend").css("visibility",nlFlag);
				$("#AQI_chart").css("display",aqiFlag);
				$("#map_title_div").show();
			});
			$(sbutton).appendTo($(editTitleDiv));
			$(cbutton).appendTo($(editTitleDiv));
			$(editTitleDiv).appendTo($("#map"));
			$(editTitleDiv).show();
			$(sbutton).click(function(){
				$(sbutton).hide();
				$(cbutton).hide();
				SPDprintDiv($('#map'),function(img) {
					var url = img.src;
					var  nameTem = t.getFileName($(editTitle).find('#p_time').text());
					var filename = nameTem + '.png';
					var a = document.createElement('a');
					a.style.display = 'none';
					a.setAttribute('href', url);
					a.setAttribute('download', filename);
					document.body.appendChild(a);
					a.dispatchEvent(new MouseEvent('click'));
					document.body.removeChild(a);
					$('#newDepartNameDiv').remove();
					$("#Panel_Tools").css("display", "block");
					$("#mapSwitch_div").css("display", "block");
					$(".smControlZoomIn.smButton").parent().css("display", "block");
					$("#newDepartNameDiv").remove();
					$(".smControlMousePosition").css("display","block");
					$(editTitleDiv).remove();
					$(sLegend).remove();
					$(cLegend).remove();
					$("#AQI_chart").css("display",aqiFlag);
					$("#mapLegend").css("visibility",nlFlag);
					$("#map_title_div").show();
				});
			});
		},1200);
	}

	function  SPDPrintBound  (id,isLegend,callback) {
		var el = document.getElementById(id);
		if(el){
			html2canvas(el , {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas)
				{
					var img = new Image();
					img.src = canvas.toDataURL("image/png");
					if($.isFunction(callback)){
						callback(img);
					}
				}
			});
		}
	}

	function SPDprintDiv(container,callback){//控件id
		var $div =$(container);
		var bstr = $div.css("border");
		$div.css("border","1px solid rgba(255,255,255,1)");
		var memContext,memCanvas = document.createElement("canvas");
		var width = $div.width();
		var height = $div.height();
		memCanvas.width = width;
		memCanvas.height = height;
		memCanvas.style.width = width+"px";
		memCanvas.style.height = height+"px";
		memContext = memCanvas.getContext("2d");
		if($div.length > 0){
			html2canvas($div , {
				allowTaint: true,
				taintTest: false,
				onrendered: function(canvas)
				{
					var ctxLegend= canvas.getContext("2d");
					var offsetX = width * 0.03 || 0;
					var offsetY = height* 0.05 || 0;
					memContext.putImageData(ctxLegend.getImageData(0,0,width,height),0,0);
					var img = new Image();
					img.src = memCanvas.toDataURL("image/png");
					if($.isFunction(callback)){
						$div.css("border",bstr);
						callback.call(img,img);
					}
				}
			});
		}
	}
	/**
	 * 过滤 HTML 标签
	 * @param  {String}  objStr  原始字符串 optional
	 */
	this.stripHTML = function(objStr) {
		var reTag = /<(?:.|\s)*?>/g;
		return objStr.replace(reTag,"");
	}

	//判断对象是否为空
	this.isEmpty = function (obj){
		var emptyFlag = false;
		if(this.isArray(obj)){
			if(obj.length < 1){
				emptyFlag = true;
			}
		}else{
			if(typeof(obj) == 'undefined' || obj == null || obj.toString() == 'undefined' ||  obj.toString().replace(/\s*$|^\s*!/g, "").length < 1){
				emptyFlag = true;
			}
		}
		return emptyFlag;
	}

	//替换无效标点和数据
	this.checkEmpty = function(obj){
		var reObj = (obj == null || typeof(obj) == 'undefined' || obj.toString() == 'undefined' || obj.toString().replace(/ /gm,'').length < 1) ? '&emsp;--':obj;
		return reObj.toString().replace(/\s*$|^\s*!/g, "");
	}

	//阿里也在用的判断数组的方法
	this.isArray = function(Obj){
		return Object.prototype.toString.call(Obj) === '[object Array]';
	}

	//去除字符串中所有文件名不可用标点
	this.getFileName = function(str){
		return str.replace(/[|\~|\`|\&nbsp;|\&gt;|\&lt;|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\||\\|\[|\]|\{|\}|\;|\"|\'|\,|\<|\.|\>|\/|\?|\，|\。|\、|\—|\；|\‘|\“|\”]/g,"")
	}

	//排序函数
	this.NumberSort = function(array){
		array.sort(function (a,b) {
			return a - b;
		});
		var newArray = [];
		for(var i in array){
			if($.inArray(array[i],newArray) < 0){
				newArray.push(array[i]);
			}
		}
		return newArray;
	}

	function getTimeStr(tmile,type){
		//格林尼治时间 ，返回类型 雷达/标准
		var dateTemp = new Date(tmile);
		var year = dateTemp.getFullYear();
		var month = dateTemp.getMonth()+1;
		var day = dateTemp.getDate();
		var hour = dateTemp.getHours();
		var minutes =dateTemp.getMinutes();
		var seconds = 0;
		if(type == "rad"){
			if (minutes >= 0 && minutes < 6) {
				minutes = 0;
			} else if (minutes >= 6 && minutes < 12) {
				minutes = 6;
			} else if (minutes >= 12 && minutes < 18) {
				minutes = 12;
			} else if (minutes >= 18 && minutes < 24) {
				minutes = 18;
			} else if (minutes >= 24 && minutes < 30) {
				minutes = 24;
			}else if (minutes >= 30 && minutes < 36) {
				minutes = 30;
			}else if (minutes >= 36 && minutes < 42) {
				minutes = 36;
			} else if (minutes >= 42 && minutes < 48) {
				minutes = 42;
			}else if (minutes >= 48&& minutes < 54) {
				minutes = 48;
			}else if (minutes >= 54 && minutes < 60) {
				minutes = 54;
			}
		}
		return year+ (Array(2).join(0)+month).slice(-2) + (Array(2).join(0)+day).slice(-2) + (Array(2).join(0)+hour).slice(-2)+(Array(2).join(0)+minutes).slice(-2)+(Array(2).join(0)+seconds).slice(-2);
	}

}


/*一些备注
 over:function(currentFeature){},
 out:function(currentFeature){},
 click: function(currentFeature){},
 clickout: function(lastFeature){},
 rightclick:function(currentFeature){},
 dblclick: function(currentFeature){}
 //console.log();样式
 //console.log("%c所以到哪里都像快乐被燃起", "color:#f47983;font-size:14px");
 //console.log("%c。。。", "color:#faff72;font-size:14px");
 //console.log("就好像%c你曾在我隔壁的班级", "color:#3de1ad;font-size:14px");
 //console.log("%c", "padding:200px 400px;line-height:400px;background:url('http://b397.photo.store.qq.com/psb?/V103DOtu0hGs42/rtzmi9L.BSf*xbcGmHVh7lhsN6tQykBlvHRIUKiIH94!/b/dI0BAAAAAAAA&bo=kAGQAQAAAAACKQ0!&rf=viewer_4') no-repeat;");
 //构造对象
 for (var i = 0; i < columdata.length; i++) {
 station[columdata[i].namefield] = "";
 }
 //构造集合
 var stationCollect = {};
 for(var i=0;i<data.length;i++){
 if(typeof(stationCollect[data[i].StationNum]) == "undefined"){
 stationCollect[data[i].StationNum] = [];
 }
 stationCollect[data[i].StationNum].push(data[i]);
 }
 //对象赋值
 for (var i = 0; i < data.length; i++){
 for (var k = 0; k < columdata.length; k++) {
 station[columdata[k].namefield] = data[i][columdata[k].dbfield];
 }
 }
9802
8934
6014
 */
