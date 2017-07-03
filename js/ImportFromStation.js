/**
 * Created by POPE on 2016/12/12.
 */
function ImportFromStation() {
    if(!(this instanceof ImportFromStation)){
        return new ImportFromStation();
    }
    this.stations = null;
    this.cells= {};
    this.forecastData = null;
    this.elements = {r12:"r12",tmax:"tmax",tmin:"tmin",w:"w",air:"air",r3:"r3",temp:"2t",rh:"rh",tcc:"tcc",vis:"vis",wsNum12:"wmax",wdNum12:"wmax",wsNum3:"10uv",wdNum3:"10uv"};
    this.radius = 0;
    this.curDatetime =null;//请求要素时间
}

var fnImport = ImportFromStation.prototype;
//获取站点，经纬度转格点行列
fnImport.getStation = function(callback){
    var t = this;
    if(t.stations == null){
        var areaCode = GDYB.GridProductClass.currentUserDepart.departCode;
        var url=gridServiceUrl+"services/GridService/getStations";
        $.ajax({
            data:{"para":"{areaCode:'"+ areaCode + "'}"},
            url:url,
            dataType:"json",
            success:function(data){
                t.stations = data;
                var dg = GDYB.GridProductClass.datasetGrid;
                for(var key in t.stations){
                    var station = t.stations[key];
                    t.cells[station.stationNum] = dg.xyToGrid(station.longitude,station.latitude);
                }
                if($.isFunction(callback)){
                    callback.call(null);
                }
            },
            error: function (e) {
                alert("获取站点数据错误");
            },
            type:"POST"
        });
    }
    else{
        if($.isFunction(callback)){
            callback.call(null);
        }
    }
};
//获取数据
fnImport.getTextData = function(element,datetime,callback){
    var t =this;
    var url=dataSericeUrl+"services/TextDataService/getData";
    $.ajax({
        data:{"para":"{element:'"+ element + "',datetime:'"+ datetime + "'}"},
        url:url,
        dataType:"json",
        success:function(data){
            t.forecastData = t.getMaxMinTemData(data);
            if($.isFunction(callback)){
                callback.call(null,data);
            }
        },
        error:function(){
        },
        type:"POST"
    });
}
//组装高温低温数据
fnImport.getMaxMinTemData =function(data){
    var result= [];
    if(data!= null && data.features.length > 0) {
        var len = data.features.length;
        for(var i =0;i< len;i++){
            var item = data.features[i];
            var objTem ={};
            objTem.longitude = item.geometry.center.x;//经度
            objTem.latitude = item.geometry.center.y;//纬度
            objTem.stationNum = item.fieldValues[1];//站号
            objTem.maxTemp_24h = item.fieldValues[2];//24小时高温
            objTem.minTemp_24h = item.fieldValues[3];//24小时低温
            objTem.avgTemp_24h = item.fieldValues[4];//24小时平均温度
            objTem.maxTempTime_24h = item.fieldValues[5];//24小时高温出现时间
            objTem.minTempTime_24h = item.fieldValues[6];//24小时低温出现时间
            result.push(objTem);
        }
    }
    return result;
}
//站点数据转换成格点
fnImport.station2Grid = function(fromElement,toElement,hourSpan,callback){
    var t = this;
    var makeTime = GDYB.GridProductClass.currentMakeTime;
    var dateTime = GDYB.GridProductClass.currentDateTime;
    var version = GDYB.GridProductClass.currentVersion;
    var isThanZero = (toElement=="r3" || toElement=="r12" || toElement=="10uv" || toElement=="wmax");
    GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, toElement, hourSpan, function(dataCache){
        if(dataCache != null && dataCache.data != null){
            var dg = dataCache.data;
            var datas = t.forecastData;
            var len = datas.length;
            if(datas!= null && len > 0){
                var grids = []; //记录原始值，以及与站点距离。
                if(t.radius > 0) {
                    for(var i=0; i<dg.rows; i++){
                        var gridRow = [];
                        for(var j=0; j<dg.cols; j++){
                            gridRow.push({d:dg.noDataValue, v:dg.getValue(0, j, i)});
                        }
                        grids.push(gridRow);
                    }
                }
                for(var j =0; j<len; j++){
                    var data = datas[j];
                    var val = parseFloat(data[fromElement]);
                    // var stationNum = data.stationNum;
                    // var cell = t.cells[stationNum];
                    var cell = dg.xyToGrid(data.longitude,data.latitude);
                    if(cell!=null){
                        if(val != dg.noDataValue){
                            dg.setValue(0, cell.x, cell.y, val);
                            if(grids.length > 0) {
                                grids[cell.y][cell.x].d = 0;
                                var v = grids[cell.y][cell.x].v;
                                if(v != dg.noDataValue){
                                    var m_val = val - v;
                                    t.setValueForNearGrid(dg, grids, cell.x, cell.y, m_val, t.radius, isThanZero);
                                }
                            }
                        }
                    }
                }
                GDYB.GridProductClass.dataCache.setDataStatus(makeTime, version, dateTime, toElement, hourSpan, 1, dg); //更新已修改
                if($.isFunction(callback)){
                    callback.call(null);
                }
            }
            else{
                $("#div_progress").css("display", "none");
                layer.alert("请求高低温站点数据为空！");
            }
        }
        else{
            $("#div_progress").css("display", "none");
            layer.alert("当前高低温要素格点数据为空！");
        }
    });
};
//临近格点赋值，不考虑风向
fnImport.setValueForNearGrid = function(dg, grids, j, i, v, maxRadius, isThanZero){
    if(v == 0)
        return;
    var radius = 1;
    var val;
    while(true){
        if(radius >= maxRadius ){
            break;
        }
        var left = Math.max(0, j-radius),right = Math.min(dg.cols-1, j+radius), bottom = Math.max(0, i-radius), top = Math.min(dg.rows-1, i+radius);
        for(var jj=left;jj<=right;jj++){
            if(jj>=0 && jj<dg.cols){
                if(grids[bottom][jj].v != dg.noDataValue && (grids[bottom][jj].d == dg.noDataValue || radius<grids[bottom][jj].d)){ //距离更近或无效值
                    val = Math.floor((grids[bottom][jj].v+v)*10)/10; //必须用原始值计算
                    dg.setValue(0, jj, bottom, isThanZero?Math.max(0, val):val);
                    grids[bottom][jj].d = radius;
                }
                if(grids[top][jj].v != dg.noDataValue && (grids[top][jj].d == dg.noDataValue || radius<grids[top][jj].d)){
                    val = Math.floor((grids[top][jj].v+v)*10)/10;
                    dg.setValue(0, jj, top, isThanZero?Math.max(0, val):val);
                    grids[top][jj].d = radius;
                }
            }
        }
        for(var ii=bottom+1;ii<top;ii++){
            if(ii>=0 && ii<dg.rows){
                if(grids[ii][left].v != dg.noDataValue && (grids[ii][left].d == dg.noDataValue || radius<grids[ii][left].d)){
                    val = Math.floor((grids[ii][left].v+v)*10)/10;
                    dg.setValue(0, left, ii, isThanZero?Math.max(0, val):val);
                    grids[ii][left].d = radius;
                }
                if(grids[ii][right].v != dg.noDataValue && (grids[ii][right].d == dg.noDataValue || radius<grids[ii][right].d)){
                    val = Math.floor((grids[ii][right].v+v)*10)/10;
                    dg.setValue(0, right, ii, isThanZero?Math.max(0, val):val);
                    grids[ii][right].d = radius;
                }
            }
        }
        radius++;
    }
}
//执行转换
fnImport.run = function(callback){
    var t = this;
    try {
        var fromElement = "maxTemp_24h";
        var toElement = "tmax";
        var hourSpan =24;
        t.getTextData(fromElement,t.curDatetime,function () {
            t.getStation(function () {
                t.station2Grid(fromElement,toElement,hourSpan,function () {//转换高温
                    fromElement = "minTemp_24h";
                    toElement = "tmin";
                    t.station2Grid(fromElement,toElement,hourSpan,function () {//转换低温
                        if($.isFunction(callback)){
                            callback.call(null);
                        }
                    });
                });
            });
        });
    }
    catch(err){
        $("#div_progress").css("display", "none");
        layer.alert("导入失败！" +err);
    }
};

