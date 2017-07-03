/**
 * Created by zouwei on 2016/7/19.
 */
function Import(){
    this.stations = null;
    this.cells = null;
    this.forecastData = null;
    this.elements = {r12:"r12",tmax:"tmax",tmin:"tmin",w:"w",air:"air",r3:"r3",temp:"2t",rh:"rh",tcc:"tcc",vis:"vis",wsNum12:"wmax",wdNum12:"wmax",wsNum3:"10uv",wdNum3:"10uv"};
    this.radius = 0;

    this.readForecast = function(){
    };

    this.run = function(){
    };

    this.station2Grid = function(recall){
        if(this.cells == null || this.forecastData == null)
            return;
        var t = this;
        var makeTime = GDYB.GridProductClass.currentMakeTime;
        var dateTime = GDYB.GridProductClass.currentDateTime;
        var version = GDYB.GridProductClass.currentVersion;
        var stationNums = this.forecastData.stationNums;
        var numX = 0;
        var numY = 0;
        for(var key in this.forecastData.items){
            station2GridDetail(key);
            numY++;
        }
        function station2GridDetail(key){
            var item = t.forecastData.items[key];
            var elementCustom = item.element;
            var element = t.elements[elementCustom];
            var isWDIR = elementCustom.indexOf("wd")==0; //wd开头
            var isWSPD = elementCustom.indexOf("ws")==0; //ws开头
            var isThanZero = (element=="r3" || element=="r12" || element=="10uv" || element=="wmax");
            var hourSpan = item.hourSpan;

            //判断一下，如果是不存在的时效，则跳过
            var hourSpans = GDYB.GDYBPage.getHourSpan(element);
            if(hourSpans.indexOf(hourSpan) < 0){
                numX++;
                if(numX == numY)
                    recall&&recall();
                return;
            }

            GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, element, hourSpan, function(dataCache){
                if(dataCache != null && dataCache.data != null){
                    var dg = dataCache.data;
                    var datas = item.datas;
                    if(datas.length == 0)
                        return;
                    var grids = []; //记录原始值，以及与站点距离。
                    if(element != "w" && element != "air" && !isWDIR && t.radius > 0) { //天气现象、风向、空气污染不影响周边地区
                        for(var i=0; i<dg.rows; i++){
                            var gridRow = [];
                            for(var j=0; j<dg.cols; j++){
                                gridRow.push({d:dg.noDataValue, v:dg.getValue(0, j, i)});
                            }
                            grids.push(gridRow);
                        }
                    }
                    var dirty = false;
                    for(var keyOfData in datas){
                        var data = datas[keyOfData];
                        if(data == dg.noDataValue)
                            continue;
                        dirty = true;
                        var stationNum = stationNums[keyOfData];
                        var cell = t.cells[stationNum];
                        dg.setValue(isWDIR?1:0, cell.x, cell.y, data);
                        if(grids.length > 0) {
                            grids[cell.y][cell.x].d = 0;
                            var v = grids[cell.y][cell.x].v;
                            if(v != dg.noDataValue)
                                setValueForNearGrid(dg, grids, cell.x, cell.y, data - v, t.radius, isThanZero);
                        }
                    }
                    if(dirty && !isWDIR)
                        GDYB.GridProductClass.dataCache.setDataStatus(makeTime, version, dateTime, element, hourSpan, 1, dg); //更新已修改
                    grids = null;
                }
                numX++;
                if(numX == numY)
                    recall&&recall();
            });
        }
    };

    //临近格点赋值，不考虑风向
    function setValueForNearGrid(dg, grids, j, i, v, maxRadius, isThanZero){
        if(v == 0)
            return;
        var radius = 1;
        var val;
        while(true){
            if(radius >= maxRadius )
                break;
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
}