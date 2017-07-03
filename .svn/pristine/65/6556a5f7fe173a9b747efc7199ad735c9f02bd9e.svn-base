/**
 * @author: wangkun
 * @date:2017-06-08
 * @description 警戒区
 */
function AlertAreas() {
    this._init_();
}
AlertAreas.prototype = {
    constructor: AlertAreas,
    _init_: function () {
        this.name = "警戒区";
    },
    /**
     * @author:wangkun
     * @date:2017-06-08
     * @return:
     * @description:显示警戒区
     */
    displayAlertAreas: function (layer,areacode) {
        var url = gridServiceUrl + "services/AdminDivisionService/getAlertAreas";
        var param = {
            areaCode:areacode
        };
        param = JSON.stringify(param);
        $.ajax({
            type: 'post',
            url: url,
            async: true,
            data: {
                'para': param
            },
            dataType: 'json',
            error: function () {
                alert("获取警戒区域失败!");
            },
            success: function (data) {
                var levelSize = data.length;
                for(var i=0;i<levelSize;i++){
                    var areaData = JSON.parse(data[i]);
                    var levelIndex = -1;
                    for(var f=0;f<areaData.fieldNames.length;f++){
                        if(areaData.fieldNames[f]==="level"){
                            levelIndex = f;
                            break;
                        }
                    }
                    if(levelIndex==-1){
                        alert("缓冲数据不正确!");
                        return;
                    }
                    var levelVal = parseInt(areaData.fieldValues[levelIndex]);
                    var points = areaData.geometry.points;
                    var ptCount = points.length;
                    var pointArray = [];
                    for (var j = 0; j < ptCount; j++) {
                        var lon = points[j].x;
                        var lat = points[j].y;
                        var point = new WeatherMap.Geometry.Point(lon, lat);
                        pointArray.push(point);
                    }
                    var linearRings = new WeatherMap.Geometry.LinearRing(pointArray);
                    var lineFeature = new WeatherMap.Feature.Vector(linearRings);
                    var color = "blue";
                    if(levelVal==1){
                        color = "red";
                    }
                    else if(levelVal==2){
                        color = "orange";
                    }
                    var style = {
                        strokeColor: color,
                        strokeOpacity: 1,
                        strokeWidth: 2,
                        strokeDashstyle:"dot",
                        fillOpacity:0
                    }
                    lineFeature.style= style;
                    layer.addFeatures([lineFeature]);
                }
            }
        });
    }
}