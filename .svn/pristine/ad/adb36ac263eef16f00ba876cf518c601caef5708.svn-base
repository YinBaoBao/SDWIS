/**
 * 县界填色
 * Created by POPE on 2016/12/26.
 */
function FillColors() {
    if(!(this instanceof FillColors)){
        return new FillColors();
    }
}
var fnColors = FillColors.prototype;
fnColors.layerCntyColor = null;
fnColors.CimissData = null;
//填充颜色
fnColors.fill =function () {
    var self = this;
    var areaDatas = GDYB.GridProductClass.cntyDatas;
	for(var i in areaDatas) {
		var areaData = areaDatas[i];
		var stationCode = areaData.fieldValues[6];
		self.fillCnty(areaData,stationCode);
	}
}
//填充区县
fnColors.fillCnty =function (areaData,stationCode) {
    var self = this;
    var element = GDYB.GridProductClass.currentElement || "TEM";
    var pointArray = [];
    var pointList = areaData.geometry.points;
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
    var fillColor = self.getColor(stationCode,element);
    var style = {
        fill:true,
        fillColor:fillColor,
        fillOpacity:1,
        strokeColor:"#A660C7",
        strokeOpacity:0,
        strokeWidth:4,
        pointRadius:6
    }
    var feature = new WeatherMap.Feature.Vector(region,null,style);
	if(fnColors.layerCntyColor == null){
		fnColors.layerCntyColor = new WeatherMap.Layer.Vector("CntyColor", {renderers: ["Canvas2"]});
		var map = GDYB.Page.curPage.map;
		map.addLayer(fnColors.layerCntyColor);
		if(m_layerPlot != null){
			map.setLayerIndex(m_layerPlot,99);
		}
	}
	fnColors.layerCntyColor.addFeatures(feature);
}
//填充颜色
fnColors.fill_bak =function () {
    var self =this;
    var beginDate = new Date();
    var element = GDYB.GridProductClass.currentElement;
    var areaDatas = GDYB.GridProductClass.cntyDatas;
    var stations = GDYB.GridProductClass.stations;
    var c_stations =[];
    for(var key in stations){
        var station = stations[key];
        if(station.type == 1){
            c_stations.push(station);
        }
    }
    var len = areaDatas.length;
    for(var i = 0; i<len ; i++){
        var areaData = areaDatas[i];
        var code = areaData.fieldValues[1];
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
        var fillColor = "#A660C7";
        var longitude = 0;
        var latitude = 0;
        var linearRings = new WeatherMap.Geometry.LinearRing(pointArray);
        var region = new WeatherMap.Geometry.Polygon([linearRings]);
        region.calculateBounds();
        var le = c_stations.length;
        for(var k = 0; k<le ; k++){
            var c_station = c_stations[k];
            var areaCode = c_station.areaCode;
            var m_lon = c_station.longitude;
            var m_lat = c_station.latitude;
            // if(c_station.stationName =="柳州市"){
            //     layer.alert("柳州市");
            // }
            if(areaCode == code){
                longitude = m_lon;
                latitude = m_lat;
                break;
            }
        }
        fillColor = self.getColor(longitude,latitude,element);
        var style = {
            fill:true,
            fillColor:fillColor,
            fillOpacity:1,
            strokeColor:"#A660C7",
            strokeOpacity:0,
            strokeWidth:4,
            pointRadius:6
        }
        var feature = new WeatherMap.Feature.Vector(region,null,style);
        if(fnColors.layerCntyColor == null){
			fnColors.layerCntyColor = new WeatherMap.Layer.Vector("CntyColor", {renderers: ["Canvas2"]});
			var map = GDYB.Page.curPage.map;
			map.addLayer(fnColors.layerCntyColor);
		}
		fnColors.layerCntyColor.addFeatures(feature);
    }
}
//去掉填充
fnColors.noFill =function () {
    if (GDYB.GridProductClass.layerCntyColor != null){
        GDYB.GridProductClass.layerCntyColor.removeAllFeatures();
    }
}
//获取颜色
fnColors.getColor =function (stationCode,element) {
    var self = this;
    var result ="RGBA(255,255,255,0.39)";
    var value = self.getValue(stationCode) ;
	var colorItems = null;
    if(m_style != null){
		colorItems = m_style;
	}else{
		colorItems = self.getFillColorItems(element);
	}
    var len = colorItems.length;
    for(var i =0;i<len; i++){
        var colorItem = colorItems[i];
        if(value >=colorItem.start && value<colorItem.end){
            result = "RGBA("+ colorItem.startColor.red +","+colorItem.startColor.green+","+colorItem.startColor.blue+",1)";
            // result = colorItem.startColor;
            break;
        }
    }
    return result;
}
//获取值
fnColors.getValue = function (stationNum) {
    var result = 0;
	for(var k in fnColors.CimissData){
		if(typeof(fnColors.CimissData[k].Station_Id_d) != "undefined"){
			var stationID = fnColors.CimissData[k].Station_Id_d;
			if(stationNum == stationID){
				result = Math.floor(fnColors.CimissData[k][GDYB.GridProductClass.currentElement]*10) / 10;
			}
		}
	}
    return result;
}
//获取填充样式
fnColors.getFillColorItems = function(element){
	debugger;
    var items = null;
    switch (element){
        case "2t":
            items = heatMap_TempStyles;
            break;
        case "rh":
            items = heatMap_RHStyles;
            break;
        case "tcc":
            items = heatMap_TCCStyles;
            break;
        case "r1":
        case "r3":
        case "r6":
        case "r12":
        case "r24":
            items = heatMap_Rain24Styles;
            break;
        case "10uv":
        case "wmax":
        case "wind":
        case "uv":
            items = heatMap_10uvStyles;
            break;
        case "vis":
            items = heatMap_VISStyles;
            break;
        case "air":
            items = heatMap_AirStyles;
            break;
        case "w":
            items = heatMap_WStyles;
            break;
        case "leid":
            items = heatMap_LeiDianStyles;
            break;
        case "dsbb":
        case "dsleid":
        case "dswind":
        case "dsqjs":
        case "bb":
            items = heatMap_YesNo;
            break;
        case "rh6h":
        case "rh2h":
            items = heatMap_BLQWStyles;
            break;
        default:
            items = heatMap_TempStyles;
            break;
    }
    return items;
};
