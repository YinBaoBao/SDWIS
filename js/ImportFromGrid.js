/**
 * Created by zouwei on 2016/7/19.
 */
function ImportFromGrid() {
    this.getStation = function(recall){
        var t = this;
        if(t.stations == null){
            var areaCode = GDYB.GridProductClass.currentUserDepart.departCode;
            var url=gridServiceUrl+"services/GridService/getStationsForecast";
            $.ajax({
                data:{"para":"{areaCode:'"+ areaCode + "'}"},
                url:url,
                dataType:"json",
                success:function(data){
                    t.stations = data;
                    //经纬度转格点行列
                    t.cells = {};
                    var dg = GDYB.GridProductClass.datasetGrid;
                    for(var key in t.stations){
                        var station = t.stations[key];
                        t.cells[station.stationNum] = dg.xyToGrid(station.longitude, station.latitude);
                    }
                    recall&&recall();
                },
                error: function (e) {
                    alert("获取站点数据错误");
                },
                type:"POST"
            });
        }
        else{
            recall&&recall();
        }
    };

    this.readForecast = function(recall){
        var t = this;
        var arrayElement = [];
        for(var key in t.elements){
            var element = t.elements[key];
            var hourSpans = GDYB.GDYBPage.getHourSpan(element);
            arrayElement.push({name:key, element:element, hourSpan:hourSpans[0], statistic:"none", hourSpans:hourSpans});
        }
        var strElements = JSON.stringify(arrayElement);

//        var productId = 5; //城镇预报
//        var stationType = 1;
        var productId = 9; //乡镇预报
        var stationType = 4;
        var type = "cty";

        var url=getGridServiceUrl(GDYB.GridProductClass.currentMakeTime)+"services/GridService/grid2station";
        $.ajax({
            type: "POST",
            data: {"para": "{departCode:'" + GDYB.GridProductClass.currentUserDepart.departCode + "',productId:'" + productId + "',type:'" + type + "',stationType:'" + stationType + "',makeTime:'" + GDYB.GridProductClass.currentMakeTime + "',elements:" + strElements + "}"},
            url: url,
            dataType: "json",
            error:function(){
                alert("格点转站点错误");
            },
            success: function (data) {
                if(typeof(data) != "undefined" && data.stationNums.length > 0 && data.items.length > 0){
                    t.forecastData = data;
                    recall&&recall();
                }
                else{
                    alert("无数据");
                    $("#div_progress").css("display", "none");
                }
            }
        });
    };

    this.run = function(){
        var t = this;
        t.forecastData = null;
        $("#div_progress_title").html("正在从市台站点预报导入格点场...");
        $("#div_progress").css("display", "block");
        try {
            t.getStation(function () {
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

ImportFromGrid.prototype = new Import();