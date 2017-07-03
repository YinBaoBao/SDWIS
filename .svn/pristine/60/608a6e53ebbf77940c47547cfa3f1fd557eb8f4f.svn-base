/**
 * Created by zouwei on 2016/7/19.
 */
function ImportFromFile() {
    this.file = null;
    this.elementIndexs = {temp:1, rh:2, wdNum3:3, wsNum3:4, r3:6, tcc:7, vis:10, tmax:11, tmin:12, r12:16, w:19, wdNum12:20, wsNum12:21}; //要素所在列

    this.readForecast = function(recall){
        if(this.file == null)
            return;
        var t = this;
        t.forecastData = {};
        t.forecastData.stationNums = [];
        t.forecastData.items = [];
        t.stations = [];
        t.cells = {};
        //获取文件预报日期，add by wk
        var filename=t.file.name;
        var strdate=filename.split('-')[2];
        var newstrdate="";
        var strdatesize=strdate.length;
        for(var s=0;s<strdatesize;s++){
            newstrdate+=strdate[s];
            if(s==3||s==5){
                newstrdate+="/";
            }
            else if(s==7){
                newstrdate+=" ";
            }
            else if(s==9||s==11){
                newstrdate+=":";
            }
        }
        newstrdate+="00";
        var fileforcastdate=new Date(newstrdate).addHours(8);//转北京时

        var strdateTime = GDYB.GridProductClass.currentDateTime;
        var datetime=new Date(strdateTime.replace(/-/g,'/'));
        var mulhours=(fileforcastdate-datetime)/1000/60/60;

        var reader = new FileReader();
        reader.readAsText(t.file);
        reader.onload=function(f){
            var strLines = this.result.split("\r\n");
            var station = null;
            var hourSpanCount = 0; //时效个数
            var fieldCount = 0;    //预报产品个数
            var nindex = 0;
            var dg = GDYB.GridProductClass.datasetGrid;
            var noDataValue = dg.noDataValue;
            var itemIndexs = {}; //为了快速检索并赋值，这里创建一个索引
            for(var i in strLines){
                if(Number(i) < 5)
                    continue;
                var strLine = strLines[i];
                if(strLine.indexOf("NNNN") == 0)
                    break;
                strLine = $.trim(strLine);
                var strs = strLine.split(/[ ]+/);
                if(nindex == hourSpanCount) //站点信息
                {
                    t.forecastData.stationNums.push(strs[0]);
                    station = {stationNum:strs[0],
                        longitude:Number(strs[1]),
                        latitude:Number(strs[2]),
                        height:Number(strs[3])
                    };
                    t.stations.push(station);
                    t.cells[station.stationNum] = dg.xyToGrid(station.longitude, station.latitude);
                    hourSpanCount = Number(strs[4]);
                    fieldCount = Number(strs[5]);
                    nindex = 0;
                }
                else if(strs.length == (fieldCount+1)) //站点预报
                {
                    var hourSpan = Number(strs[0]);
                    hourSpan=hourSpan+mulhours;
                    if(t.stations.length == 1) {
                        itemIndexs[hourSpan] = {};
                        for(var key in t.elementIndexs){
                            var item = {element: key, hourSpan: hourSpan, datas: []};
                            t.forecastData.items.push(item);
                            itemIndexs[hourSpan][key] = t.forecastData.items.length - 1;
                        }
                    }

                    for(var key in t.elementIndexs){
//                        var item = getItem(key, hourSpan);
                        var item = t.forecastData.items[itemIndexs[hourSpan][key]];
                        if(item != null){
                            var val = Number(strs[Number(t.elementIndexs[key])]);
                            if(val == 999.9)
                                item.datas.push(noDataValue);
                            else{
                                //编码转量级
                                if(key == "wdNum12")
                                    val = getWDNum(val);
                                else if(key == "wsNum12")
                                    val = getWSNum(val);
                                item.datas.push(val);
                            }
                        }
                    }
                    nindex++;
                }
            }
            recall&&recall();
        };

//        function getItem(element, hourSpan){
//            var item = null;
//            for(var key in t.forecastData.items){
//                if(t.forecastData.items[key].element == element && t.forecastData.items[key].hourSpan == hourSpan){
//                    item = t.forecastData.items[key];
//                    break;
//                }
//            }
//            return item;
//        }

        //风向编码转风向
        function getWDNum(wdCode){
            var wd = 0.0;
            if(wdCode == 9)
                wd = 0.0;
            else if(wdCode == 8)
                wd = 360;
            else if(wdCode == 7)
                wd = 315;
            else if(wdCode == 6)
                wd = 270;
            else if(wdCode == 5)
                wd = 225;
            else if(wdCode == 4)
                wd = 180;
            else if(wdCode == 3)
                wd = 135;
            else if(wdCode == 2)
                wd = 90;
            else if(wdCode == 1)
                wd = 45;
            return wd;
        }

        //风级编码转风速
        function getWSNum(wsCode){
            var ws = 0.0;
            if(wsCode == 0) //≤3级，不能设置为0m/s，否则会导致风向丢失
                ws = 3.3;
            else if(wsCode == 1.0)
                ws = 5.6;
            else if(wsCode == 2.0)
                ws = 9.3;
            else if(wsCode == 3.0)
                ws = 12.3;
            else if(wsCode == 4.0)
                ws = 15.6;
            else if(wsCode == 5.0)
                ws = 18.9;
            else if(wsCode == 6.0)
                ws = 22.6;
            else if(wsCode == 7.0)
                ws = 26.4;
            else if(wsCode == 8.0)
                ws = 30.5;
            else if(wsCode == 9.0)
                ws = 34.8;
            return ws;
        }
    };

    this.run = function(file){
        var t = this;
        t.stations = null;
        t.cells = null;
        t.forecastData = null;
        t.file = file;
        $("#div_progress_title").html("正在从本地报文导入格点场...");
        $("#div_progress").css("display", "block");
        try {
            t.readForecast(function () {
                t.station2Grid(function () {
                    $("#div_progress").css("display", "none");
                    if (GDYB.GridProductClass.layerFillRangeColor != null)
                        GDYB.GridProductClass.layerFillRangeColor.refresh();
                    $("#div_modal_confirm_content").html("导入成功");
                    $("#div_modal_confirm").modal();
                    $("#div_modal_confirm").find("a").unbind();
                });
            });
        }
        catch(err){
            $("#div_progress").css("display", "none");
            $("#div_modal_confirm_content").html("导入失败："+err.message);
            $("#div_modal_confirm").modal();
            $("#div_modal_confirm").find("a").unbind();
        }
    };
}
ImportFromFile.prototype = new Import();