/*
 * 页面基类
 * by zouwei, 2015-05-10
 * */
function PageBase(){}
//地图对象
PageBase.prototype.map = null;
PageBase.prototype.map1 = null;
PageBase.prototype.map2 = null;
PageBase.prototype.map3 = null;
PageBase.prototype.map4 = null;
PageBase.prototype.baseLayer = null;
PageBase.prototype.baseLayerLabel = null;

//PageBase.prototype.nTickCount = 0;
//当前地图模式，四分屏还是单地图
PageBase.prototype.is4Screen = false;
//当前页面是否全屏模式
PageBase.prototype.isFullScreen = false;
//渲染左侧菜单区域里的按钮
PageBase.prototype.renderMenu = function(){};
//创建地图
PageBase.prototype.initMap = function(options){
	var that =this;
	if(!options)options = {};
	$("#map_div").css("display", "");

	var navigatnion = new WeatherMap.Control.Navigation();
	navigatnion.handleRightClicks = true; //响应右键双击缩小
	var map = new WeatherMap.Map(options.id||"map",{controls:[
		navigatnion,
		new WeatherMap.Control.Zoom()],projection: "EPSG:4326"});
	map.addControl(new WeatherMap.Control.MousePosition());
	this.initMapLayer(map);
	//var layer = new WeatherMap.Layer.CloudLayer();

	//本地缓存地图
	/*
	 var layer = new WeatherMap.Layer.LocalTiledCacheLayer();
	 layer.name = "BaseLayer";
	 map.addLayers([layer]);
	 this.baseLayer = layer;

	 //白板图更换成ArcGIS服务
	 var layer=new WeatherMap.Layer.LocalTiledCacheLayerWhiteMap();
	 layer.name = "BaseLayer";
	 map.addLayers([layer]);
	 this.baseLayer = layer;
	 */


//    var layerLabel = new WeatherMap.Layer.LocalTiledCacheLayer();
//    map.addLayers([layerLabel]);
//    layerLabel.dir = "tianditu/map/label/";

//    //天地图-地图
//    var layer = new WeatherMap.Layer.TianDiTuLayer();
//    layer.setFormat("vec");
//    layer.setName("tianDiTuLayer_vec");
//    var layerLabel = new WeatherMap.Layer.TianDiTuLayer();
//    layerLabel.setFormat("cva");
//    layerLabel.setName("tianDiTuLayer_cva");
//    //只能有一个为baseLayer
//    layerLabel.setIsBaseLayer(false);
//    map.addLayers([layer,layerLabel]);

	//天地图-地形
//    var layer = new WeatherMap.Layer.TianDiTuLayer();
//    layer.setFormat("ter");
//    layer.setName("tianDiTuLayer_ter");
//    var layerLabel = new WeatherMap.Layer.TianDiTuLayer();
//    layerLabel.setFormat("cta");
//    layerLabel.setName("tianDiTuLayer_cta");
//    //只能有一个为baseLayer
//    layerLabel.setIsBaseLayer(false);
//    map.addLayers([layer,layerLabel]);

	//map.setCenter(new WeatherMap.LonLat(options.x||11339634.286396, options.y||4588716.5813769), options.z||4);

	//魔术棒工具
	GDYB.MagicTool.init(map);

	//查看栅格值
	var bDrag = false;
	map.events.register("mousemove", map, function(event){
		if(!bDrag)
		{
			if(GDYB.RadarDataClass.datasetGrid != null){
				var datasetGrid = GDYB.RadarDataClass.datasetGrid;
				$("#div_showGridValue").css("display","block");
				$("#div_showGridValue").css("left",event.xy.x+20);
				$("#div_showGridValue").css("top",event.xy.y+20);
				var lonlat = this.getLonLatFromPixel(event.xy);
				var dValue = "-";
				var str = "无";
				var pt = datasetGrid.xyToGrid(lonlat.lon, lonlat.lat);
				if(pt != null) {
					dValue = datasetGrid.getValue(0, pt.x, pt.y);
					if (dValue < 15)
						str = "无";
					else if (dValue < 25)
						str = "可能有毛毛雨或强降雨边缘区域";
					else if (dValue < 35)
						str = "雨有些急，需要带伞";
					else if (dValue < 50)
						str = "雨很急，雨伞不一定撑得住";
					else if (dValue < 70)
						str = "降水强度很大，雨伞都不能打";
					$("#div_showGridValue").html("经度：" + Math.floor(lonlat.lon * 10000) / 10000 + "<br/>" +
						"纬度：" + Math.floor(lonlat.lat * 10000) / 10000 + "<br/>" +
						"回波：" + dValue + " dBZ" + "<br/>" +
						"降水：" + str);
				}
			}
			else if(GDYB.GridProductClass.datasetGrid != null){
//                var datasetGrid = GDYB.GridProductClass.datasetGrid;
//                $("#div_showGridValue").css("display","block");
//                $("#div_showGridValue").css("left",event.xy.x+20);
//                $("#div_showGridValue").css("top",event.xy.y+20);
//                var lonlat = this.getLonLatFromPixel(event.xy);
//                var dValue = "-";
//                var pt = datasetGrid.xyToGrid(lonlat.lon, lonlat.lat);
//                dValue = datasetGrid.getValue(0, pt.x, pt.y;
//                $("#div_showGridValue").html("经度："+Math.floor(lonlat.lon * 10000)/10000+"<br/>"+
//                    "纬度：" + Math.floor(lonlat.lat * 10000)/10000 + "<br/>" +
//                    "格点值："+dValue + "<br/>");
			}
		}
		else
		{
			$("#div_showGridValue").css("display","none");
		}
	});

	map.events.register("movestart", map, function(event){
		bDrag = true;
		$("#div_showGridValue").css("display","none");
	});

	map.events.register("moveend", map, function(event){
		bDrag = false;
	});

	/*map.events.register("keydown", map, function(event){
		alert(event);
	});*/
	map.events.register("zoomend", map, function(event){
		var layerRiver=map.getLayersByName("sdRiver");
		if (layerRiver.length>0)
		{
			layerRiver=layerRiver[0];
			var layerRoad=map.getLayersByName("sdRiver")[0];
			var scal=map.getScale();
			if (scal>1/288896)
			{
				layerRiver.setVisibility(layerRiver.displayInLayerSwitcher);
				layerRoad.setVisibility(layerRoad.displayInLayerSwitcher);
			}else if (scal>1/1155583)
			{
				layerRiver.setVisibility(layerRiver.displayInLayerSwitcher);
			}else{
				layerRiver.setVisibility(false);
				layerRoad.setVisibility(false);
			};
		}

	});
//    //图层被添加，将标签显示到最上面。这样也不好看
//    map.events.register("addlayer", map, function(event){
//        //var layerLabel = this.getBy("layers","name","tianDiTuLayer_cva");
//        this.setLayerIndex(layerLabel, 999);
//    });
	var userName = $.cookie("userName");
	var password = $.cookie("password");
	var testLayer=  GDYB.GridProductClass.layerBoundaryRegion = new WeatherMap.Layer.Vector("vectorLine", {renderers: ["Canvas2"]});
	testLayer.id = "mapCoverLayer";
	map.addLayer(testLayer);
	map.setLayerIndex(testLayer,98);
	setTimeout(function(){
		var areaCode = $.cookie("areaCode");
		if (areaCode){
			dmt.locationMapByCode(areaCode,false);
		}else{
			map.setCenter(new WeatherMap.LonLat(mapConfig.centerX,mapConfig.centerY), mapConfig.initLev); //格点数据范围中心点
		}

	}, 300);
	return map;
};
PageBase.prototype.clearMapLayer=function(map){
	if (this.baseLayerLabel!=null)
	{
		map.removeLayer(this.baseLayerLabel);
		this.baseLayerLabel=null;
	}
	if (this.baseLayer!=null)
	{
		map.removeLayer(this.baseLayer);
		this.baseLayer=null;
	}
	var layers=map.getLayersByName("sdRoad");
	if (layers.length>0)
	{
		map.removeLayer(layers[0]);
	}
	layers=map.getLayersByName("sdRiver");
	if (layers.length>0)
	{
		map.removeLayer(layers[0]);
	}
}
PageBase.prototype.initMapLayer=function(map){
	var layer = new WeatherMap.Layer.ArcgisWMTSLayer();
	layer.setFormat("vec");
	layer.setLayerName("china2");
	layer.initialize();

	var layerRoad=new WeatherMap.Layer.ArcgisWMTSLayer();
	layerRoad.setLayerName("sdRoad");
	layerRoad.setIsBaseLayer(false);
	layerRoad.setVisibility(false);
	layerRoad.initialize();

	var layerRiver=new WeatherMap.Layer.ArcgisWMTSLayer();
	layerRiver.setLayerName("sdRiver");
	layerRiver.setIsBaseLayer(false);
	layerRiver.setVisibility(false);
	layerRiver.initialize();

	var layerLabel = new WeatherMap.Layer.ArcgisWMTSLayer();
	layerLabel.setLayerName("sdLabels");
	layerLabel.setIsBaseLayer(false);
	layerLabel.initialize();

	var layerCity = new WeatherMap.Layer.ArcgisWMTSLayer();
	layerCity.setLayerName("sdCity");
	layerCity.setIsBaseLayer(false);
	layerCity.initialize();
	map.addLayers([layer,layerCity,layerRoad,layerRiver,layerLabel]);
    //map.addLayers([layer,layerRiver,layerLabel]);
    this.baseLayerLabel=layerLabel;
	this.baseLayer = layer;
}
//初始化边界
PageBase.prototype.oldInitBound = function(map,data,testLayer){
	if(data!= null) {
		$.cookie('departCode', data.departCode, { expires: 60 });
		var depart = data;
		var url = gridServiceUrl+"services/AdminDivisionService/getDivisionInfo";
		$.ajax({
			data: {"para": "{areaCode:'"+data.departCode+"'}"},
			url: url,
			dataType: "json",
			type: "POST",
			success: function (data) {
				if(data != null) {
					//var areaData = JSON.parse(data);
					var areaData = data;
					if(depart.parentID == 0){
						map.setCenter(new WeatherMap.LonLat(areaData.geometry.center.x, areaData.geometry.center.y), 6);
					}
					else if(depart.parentID == 1) {
						map.setCenter(new WeatherMap.LonLat(areaData.geometry.center.x, areaData.geometry.center.y), 8);
					}
					else{
						map.setCenter(new WeatherMap.LonLat(areaData.geometry.center.x, areaData.geometry.center.y), 9);
					}
					map.setCenter(new WeatherMap.LonLat(mapConfig.centerX,mapConfig.centerY), mapConfig.initLev);
					map.events.register("addlayer", map, function(event){
						map.setLayerIndex(testLayer,98);
						if(GDYB.GridProductClass.layerLuoquCenter != null)
							map.setLayerIndex(GDYB.GridProductClass.layerLuoquCenter,99); //这个落区中心一定要放到最上层，否则无法移动
					});
					var pointArray = [];
					var pointList = areaData.geometry.points;
					for(var i=0;i<pointList.length;i++){
						var lon = pointList[i].x;
						var lat = pointList[i].y;
						var point = new WeatherMap.Geometry.Point(lon, lat);
						pointArray.push(point);
					}
					var worldPointList = [];
					worldPointList.push(new WeatherMap.Geometry.Point(-180, -90));
					worldPointList.push(new WeatherMap.Geometry.Point(180, -90));
					worldPointList.push(new WeatherMap.Geometry.Point(180, 90));
					worldPointList.push(new WeatherMap.Geometry.Point(-180, 90));
					var linearRings1 = new WeatherMap.Geometry.LinearRing(worldPointList);
					var linearRings = new WeatherMap.Geometry.LinearRing(pointArray);
					GDYB.Page.curPolygon = new WeatherMap.Geometry.Polygon([linearRings]);//截图获取边界add by pope 20160926
					var polygon = new WeatherMap.Geometry.Polygon([linearRings,linearRings1]);
					var polygonVector = new WeatherMap.Feature.Vector(polygon);
					polygonVector.style = {
						strokeColor: "#ffffff",
						fillColor: "#ffffff",
						strokeWidth: 0.1,
						fillOpacity: 1,
						strokeOpacity: 0.4
					};
					//testLayer.addFeatures([polygonVector]);
					//GDYB.GDYBPage.polygonVector = polygonVector;

					var line = new WeatherMap.Geometry.LineString(pointArray);
					var lineVector = new WeatherMap.Feature.Vector(line);
					lineVector.style = {
						strokeColor: "#000000",
						strokeWidth: 0.1,
						strokeOpacity: 0
					};
					testLayer.addFeatures([lineVector]);
                    GDYB.GDYBPage.lineVector = lineVector;
				}
			},
			error: function(e){
				console.error("获取用户所在地区失败："+ e.statusText);
			}
		});
	}
}


//初始化边界
PageBase.prototype.newInitBound = function(map,data,testLayer,level,callback){
	if(data!= null) {
		var depart = data;
		var para = {};
		para.areaCode = data.departCode;
		para.level = level;
		para = JSON.stringify(para); //对象转换为json
		var url= gridServiceUrl+"services/AdminDivisionService/getDivisionInfos";
		$.ajax({
			data: {"para": para},
			url: url,
			dataType: "json",
			type: "POST",
			success: function (data) {
				if(typeof(data) != "undefined") {
					// var areaDatas = eval("("+data+")");//转换为json对象
					var areaDatas =[];
					for( var k =0;k<data.length;k++){
						var objData = $.parseJSON(data[k]);
						areaDatas.push(objData);
					}
					if(depart.parentID == 0 && level == "cnty"){
						GDYB.GridProductClass.cntyDatas = areaDatas;
					}
					var len = areaDatas.length;
					var lineVectors = [];
					for(var i = 0; i<len ; i++){
						var areaData = areaDatas[i];
						var pointArray = [];
						var pointList = areaData.geometry.points;
						var l = pointList.length;
						for(var j=0; j<l; j++){
							if(pointList[j]!=null){
								var lon = pointList[j].x;
								var lat = pointList[j].y;
								var point = new WeatherMap.Geometry.Point(lon, lat);
								pointArray.push(point);
							}
						}

						var line = new WeatherMap.Geometry.LineString(pointArray);
						var lineVector = new WeatherMap.Feature.Vector(line);
						if(depart.parentID == 0 && level == "cnty"){
							lineVector.style = {
								lable:areaData.fieldValues[3],
								strokeColor: "#7F7F7F",
								strokeWidth: 0.1,
								strokeOpacity:1
							};
						}
						else {
							lineVector.style = {
								lable:areaData.fieldValues[3],
								strokeColor: "#000000",
								strokeWidth: 0.1,
								strokeOpacity:0
							};
						}
						lineVectors.push(lineVector);
					}
					testLayer.addFeatures(lineVectors);
					GDYB.GDYBPage.lineVector = lineVector;
				}
				if($.isFunction(callback)){
					callback.call(testLayer,testLayer);
				}
			},
			error: function(e){
				console.error("获取用户所在地区失败："+ e.statusText);
			}
		});
		var alertAreasLayer = new WeatherMap.Layer.Vector("警戒区域");
		map.addLayers([alertAreasLayer]);
		var alertAreas = new AlertAreas();
		alertAreas.displayAlertAreas(alertAreasLayer,data.departCode);
	}
}

//创建4分屏地图
PageBase.prototype.screen4Map = function(){

//    //测试多用户并发
//    var elements = ["r12", "tmax", "tmin", "wmax", "w", "air", "r3", "2t", "10uv", "rh", "tcc", "vis"];
//    for(var i=0; i<20; i++) {
//        for (var key in elements) {
//            var element = elements[key];
//            GDYB.GridProductClass.getGrids(null, element, element, "prvn", "1000", GDYB.GDYBPage.getHourSpan(element), "2016-04-27 16:00:00", "p", "2016-04-27 20:00:00");
//            GDYB.GridProductClass.dataCache = null; //销毁
//            GDYB.GridProductClass.dataCache = new DataCache();//重建
//        }
//    }
//    return;

	$("#map").html("").css("display","none");
	$(".mapd").css("display","block");
	$(".screen4Map").html("");
	this.map1 = this.initMap({id:"map1"});
	this.map2 = this.initMap({id:"map2"});
	this.map3 = this.initMap({id:"map3"});
	this.map4 = this.initMap({id:"map4"});

	var t = this;

	this.map1.events.register("moveend", this.map1, function(){
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});
	this.map1.events.register("zoomend", this.map1, function(){
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});

	this.map2.events.register("moveend", this.map2, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});
	this.map2.events.register("zoomend", this.map2, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});

	this.map3.events.register("moveend", this.map3, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});
	this.map3.events.register("zoomend", this.map3, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map4.setCenter(this.getCenter(), this.getZoom());
	});

	this.map4.events.register("moveend", this.map4, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
	});
	this.map4.events.register("zoomend", this.map4, function(){
		t.map1.setCenter(this.getCenter(), this.getZoom());
		t.map2.setCenter(this.getCenter(), this.getZoom());
		t.map3.setCenter(this.getCenter(), this.getZoom());
	});
};
//创建单一屏幕地图
PageBase.prototype.screen1Map = function(){
	//  remved by kunge
	// if(GridForecast.isDLYB){
	// 	if(GridForecast.curMap == null){
	// 		$("#map").html("").css("display","block");
	// 		$(".mapd").css("display","none");
	// 		$(".screen4Map").html("");
	// 		this.map = GridForecast.curMap =  this.initMap({id:"map"});
	// 	}
	// 	else{
	// 		this.map = GridForecast.curMap;
	// 	}
	// }
	// else{}
	$("#map").html("").css("display","block");
	$(".mapd").css("display","none");
	$(".screen4Map").html("");
	GDYB.Page.curMap = this.map = this.initMap({id:"map"});
};
//进入全屏
PageBase.prototype.launchFullScreen = function(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}

//    //测试地图输出图片
//    var img = GDYB.Page.curPage.map.getImage();
//    $("#map_title_div").html(img);

//    //测试地图输出图片
//     var map = GDYB.Page.curPage.map;
//    var size = map.getCurrentSize();
//    var memCanvas = document.createElement("canvas");
//    memCanvas.width = size.w;
//    memCanvas.height = size.h;
//    memCanvas.style.width = size.w+"px";
//    memCanvas.style.height = size.h+"px";
//    var memContext = memCanvas.getContext("2d");
//    for(var i = 0; i<map.layers.length; i++){
//        if(typeof(map.layers[i].canvasContext) != "undefined") {
//            var layerCanvas = map.layers[i].canvasContext.canvas;
//            memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
//        }
//        else if(typeof(map.layers[i].renderer) != "undefined" && typeof(map.layers[i].renderer.canvas) != "undefined"){
//            if(typeof(map.layers[i].renderer.canvas) == "undefined")
//                continue;
//            var layerCanvas = map.layers[i].renderer.canvas.canvas;
//            memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
//        }
//    }
//    var img = new Image();
//    img.src = memCanvas.toDataURL("image/png");
//    $("#map_title_div").html(img);

//    //测试文档产品输出
//    var img = GDYB.Page.curPage.map.getImage();
//    var url="http://127.0.0.1:8080/SPDArchiveService/services/ArchiveService/createProduct";
//    $.ajax({
//        //data: {"para": "{templateName:'hebei.ftl',year :'2016',productnum :'007',productdate:'2016-07-04',productcreate :17,startHour:8,endHour:14,productRain:34,maxName:'绵阳',maxRain:'123',waterName :'石家庄',waterMax:45,theme_image:'"+img.src.split(",")[1]+"'}"},
//        data: {"para": "{templateName:'nowcast.ftl',productName:'test.doc',year :'2016',issue :'007',content:'兰州中心气象台7月5日发布短时临近预报：XXXXX，请注意防范。',img_real:'"+img.src.split(",")[1]+"',img_forecast:'"+img.src.split(",")[1]+"'}"},
//        url: url,
//        dataType: "json",
//        success: function (data) {
//            alert(data);
//        },
//        error:function(data){
//        },
//        type: "POST"
//    });
};
//退出全屏
PageBase.prototype.exitFullScreen = function() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
};

/**
 * 初始化content
 * @author rexer
 * @date    2017-01-11
 * @param   {Boolean}  [hasMap] 是否加载地图content, false为空content
 * @private
 */
PageBase.prototype._initContent = function(hasMap) {
	var content = document.querySelector('.content'),
		isMapContent = !!content.querySelector('#sideWrapper') &&
			!!content.querySelector('#nav_menu') &&
			!!content.querySelector('#workspace_div');

	if (hasMap === false) {
		content.innerHTML = '';
	} else if (!isMapContent) {
		var parser = new DOMParser();
		var htmlSource = T.getSync('land.html');
		var doc = parser.parseFromString(htmlSource, 'text/html');
		content.innerHTML = doc.querySelector('.content').innerHTML;
	}
};

//激活
PageBase.prototype.active = function(hasMap){
	//this._initContent(hasMap);//这儿暂时注释
	if(hasMap !== false){
		if(this.is4Screen){
			this.screen4Map();
		}
		else{
			this.screen1Map();
		}
	}
	var t = this;
	this.renderMenu(); //这个要放到创建地图之后,否则存在无法访问地图的问题
	$("#Screen4Btn").unbind("click");
	$("#Screen4Btn").click(function(){
		if(!t.is4Screen){
			t.screen4Map();
			t.is4Screen = true;
			this.innerHTML = "<img src=\"imgs/img_screen1.png\"/>";
		}
		else{
			t.screen1Map();
			t.is4Screen = false;
			this.innerHTML = "<img src=\"imgs/img_screen4.png\"/>";
		}
	});
	$("#ScreenFull").unbind("click");
	$("#ScreenFull").click(function(){
		if(!t.isFullScreen){
			t.launchFullScreen(document.documentElement);
			t.isFullScreen = true;
			this.innerHTML = "<img src=\"imgs/img_exitfullscreen.png\"/>";
		}
		else{
			t.exitFullScreen();
			t.isFullScreen = false;
			this.innerHTML = "<img src=\"imgs/img_launchfullscreen.png\"/>";
		}
	});
	this.bindBtnEvents();
};
//销毁
PageBase.prototype.destroy = function(){
	// callback
	if (T.isFunction(this.beforeDestroy)) {
	    this.beforeDestroy();
	}

	this.map = null;
	this.map1 = null;
	this.map2 = null;
	this.map3 = null;
	this.map4 = null;
	$("#map").html("");
	$(".screen4Map").html("");
	$("#menu_bd").html("");
	$(".datetimepicker").remove();
	$("#ZDYBDiv").remove();
	$("#ZDYBSet").remove();
	$(".delete").remove();
	GDYB.ZDYBPage.refreshTime = false;
	//

	//图层置为空
	GDYB.GridProductClass.layerLuoqu = null;
	GDYB.GridProductClass.layerLuoquCenter = null;
	GDYB.GridProductClass.layerLabel = null;
	GDYB.GridProductClass.layerFillRangeColor = null;
	GDYB.GridProductClass.layerPlot = null;
	GDYB.GridProductClass.layerPolygon = null;
	GDYB.GridProductClass.layerContour = null;
	GDYB.GridProductClass.layerClimaticRegion = null;
	GDYB.GridProductClass.layerMarkers = null;
	GDYB.GridProductClass.layerMagic = null;
	GDYB.GridProductClass.layerFocusArea = null;

	GDYB.GridProductClass.layerMapping = null;
	GDYB.GridProductClass.layerWindDirection = null;
	GDYB.GridProductClass.layerFreePath = null;

	GDYB.TextDataClass.layerPlot = null;
	GDYB.TextDataClass.layerLabel = null;
	GDYB.TextDataClass.layerContour = null;
	GDYB.TextDataClass.layerPolygon = null;

	GDYB.MicapsDataClass.layerPlot = null;
	GDYB.MicapsDataClass.layerFillRangeColor = null;
	GDYB.MicapsDataClass.layerContour = null;

	GDYB.RadarDataClass.layerFillRangeColor = null;


	$("#map_div").find(".dragPanel").remove();
	$("body").find("#Panel_RHJC").remove();
	GDYB.GDYBPage.myPanel_RHJC = null; //add by pope on 2016/08/15 融合检测面板
	GDYB.GDYBPage.myPanel_YZXJC = null; //add by pope on 2016/11/14 一致性检查面板
	GDYB.GDYBPage.myPanel_LQDZ = null;
	GDYB.GDYBPage.myPanel_QHDZ = null;
	GDYB.GDYBPage.myPanel_QSDZ = null;
	GDYB.GDYBPage.myPanel_FXDZ = null;
	GDYB.GDYBPage.myPanel_Tools = null;

	$("#map_title_div").html("");
	$("#map1_title_div").html("");
	$("#map2_title_div").html("");
	$("#map3_title_div").html("");
	$("#map4_title_div").html("");
	$("#ExportPics").show();
	$("#myInfoWindow").hide();
	$("#myInfoWindow").hide();
	GDYB.Legend.update(null);
	GDYB.LegendCimiss.update(null);
};
PageBase.prototype.destroy2 = function(){
	// callback
	if (T.isFunction(this.beforeDestroy)) {
	    this.beforeDestroy();
	}

	$("#menu_bd").html("");
	$(".datetimepicker").remove();
	$("#ZDYBDiv").remove();
	$("#ZDYBSet").remove();
	$("#map_div").find(".dragPanel").remove();
	$("body").find("#Panel_RHJC").remove();
	GDYB.GDYBPage.myPanel_RHJC = null; //add by pope 2016/08/15 融合检测面板
	GDYB.GDYBPage.myPanel_LQDZ = null;
	GDYB.GDYBPage.myPanel_QHDZ = null;
	GDYB.GDYBPage.myPanel_QSDZ = null;
	GDYB.GDYBPage.myPanel_FXDZ = null;
	GDYB.GDYBPage.myPanel_Tools = null;

	$("#map_title_div").html("");
	$("#map1_title_div").html("");
	$("#map2_title_div").html("");
	$("#map3_title_div").html("");
	$("#map4_title_div").html("");
};
PageBase.prototype.bindBtnEvents = function(){};
/**
 * 继承
 * @author rexer
 */
PageBase.prototype.extend = function(proto) {
	var Base = this.constructor;

	function Clazz() {
		Base.apply(this, arguments);
	}

	function inherit(Child, Parent) {
		function Bridge() {}
		Bridge.prototype = Parent.prototype;
		Child.prototype = new Bridge();
		Child.prototype.constructor = Child;
		for (var p in proto) {
			Child.prototype[p] = proto[p];
		}
		return Child;
	}

	return inherit(Clazz, Base);
};
