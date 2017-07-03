/**
 * SideWrapper.js 左侧竖条响应代码
 * Created by zouwei on 2015-10-3.
 */
function SideWrapper(){
    this.activeButton = "";
    var t = this;

    //设置当前按钮，设置模式来源及模式时间
    this.setActive = function(activeButton, nwpModelTime){
        t.activeButton = activeButton;
        if(typeof(activeButton) == "undefined" || activeButton == "" || activeButton == "undefined")
            $("#nav_bg_slider").css("display","none");
        else{
            var btn = $("#"+t.activeButton)[0];
            if(typeof(btn) != "undefined") {
                $("#nav_bg_slider").css("top", btn.offsetTop);
                $("#nav_bg_slider").css("display", "block");
                $("#" + activeButton).attr("title", nwpModelTime);
            }
        }
    };

    //注册事件
    this.register = function(){
        $("#sideWrapper").find("li").click(function(){
            if(this.id == "menu_weather" || this.activeButton == this.id)
                return;
            GDYB.GridProductClass.changeElement = true;
            if((this.id == "InitialField" || this.id == "prvn" || this.id == "cty"  || this.id == "nn"||  this.id == "ec" || this.id == "gp" || this.id == "japan" || this.id == "t639" || this.id == "bj")
                && GDYB.GridProductClass.dataCache == null)
            {
                $("#div_modal_confirm_content").html("请先下载初始场。");
                $("#div_modal_confirm").modal();
                $("#div_modal_confirm").find("a").unbind();
                return;
            } 
            if(this.id == "InitialField"){
                $("#div_modal_content").html("是否重新调入初始场");
                $("#div_modal").modal();
                $("#div_modal").find("a").unbind();
                $("#div_modal").find("a").click(function(){
                    if(typeof(this.id) != "undefined"){
                        if(this.id == "btn_ok")
                        {
                            var url=gridServiceUrl+"services/GridService/getGridDefaultSchemes";
                            $.ajax({
                                data:{"para":"{}"},
                                url:url,
                                dataType:"json",
                                success:function(data){
                                    var defaultSchemes = data;
                                    var modelType = null;
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked) {
                                        modelType = getModelByElement();
                                        if(modelType == null)
                                            alert("初始场默认方案中没有该要素的配置");
                                        else
                                            GDYB.GridProductClass.callModel(modelType, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);
                                    }
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                    {
                                        modelType = getModelByElement();
                                        if(modelType == null)
                                            alert("初始场默认方案中没有该要素的配置");
                                        else
                                            GDYB.GDYBPage.callModels(modelType, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);
                                    }
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(modelType, defaultSchemes, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);

                                    //匹配要素-模式方案
                                    function getModelByElement(){
                                        var modelType = null;
                                        if(typeof(defaultSchemes) != "undefined" && defaultSchemes.length > 0){
                                            var makeTime = GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* (\d*):\d*:\d*/,"$1")+":"+GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* \d*:(\d*):\d*/,"$1");
                                            for(var key in defaultSchemes){
                                                var scheme = defaultSchemes[key];
                                                if(scheme.type == GDYB.GridProductClass.currentType && scheme.makeTime == makeTime && scheme.element == GDYB.GridProductClass.currentElement){
                                                    modelType = scheme.model;
                                                    break;
                                                }
                                            }
                                        }
                                        return modelType;
                                    }
                                },
                                error: function (e) {
                                    alert("获取初始场默认方案错误");
                                },
                                type:"POST"
                            });
                        }
                    }
                });
            }
//            else if(this.id == "last") //调入上一期预报，与调入数值模式不同的是：服务端在处理时必须要早于当前预报时间，因为格点产品会提前生成，而模式不会
//            {
//                var typeModel = GDYB.GridProductClass.currentType;
//                var element = GDYB.GridProductClass.currentElement;
//                var forecastTime = GDYB.GridProductClass.currentDateTime;
//                var url=gridServiceUrl+"services/GridService/getGridProductLastDate";
//                $.ajax({
//                    data:{"para":"{element:'"+ element + "',type:'" + typeModel + "',forecastTime:'" + forecastTime + "'}"},
//                    url:url,
//                    dataType:"text",
//                    success:function(data){
//                        if(data == ""){
//                            alert("没有找到上一期");
//                            return;
//                        }
//                        $("#div_modal_content").html("是否调入上一期预报（" + data + "）");
//                        $("#div_modal").modal();
//                        $("#div_modal").find("a").unbind();
//                        $("#div_modal").find("a").click(function(){
//                            if(typeof(this.id) != "undefined"){
//                                if(this.id == "btn_ok")
//                                {
//                                    if($("#inputCurrentElementCurrentHourspan")[0].checked)
//                                        GDYB.GridProductClass.callModel(typeModel);
//                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
//                                        GDYB.GDYBPage.callModels(typeModel);
//                                    else if($("#inputAllElementAllHourspan")[0].checked)
//                                        GDYB.GDYBPage.callModelsAll(typeModel);
//                                }
//                            }
//                        });
//                    },
//                    error: function (e) {
//                        alert("没有找到上一期");
//                    },
//                    type:"POST"
//                });
//            }
            else if(this.id == "prvn" || this.id == "cty") //调入格点产品，与调入模式不同的是，格点产品制作时间与预报时间不同
            {
                var id = this.id;
                var typeModel = id;
                var element = GDYB.GridProductClass.currentElement;
                var forecastTime = GDYB.GridProductClass.currentDateTime;
                var url=gridServiceUrl+"services/GridService/getGridProductLastDate";
                $.ajax({
                    data:{"para":"{element:'"+ element + "',type:'" + typeModel + "',forecastTime:'" + forecastTime + "'}"},
                    url:url,
                    dataType:"text",
                    success:function(data){
                        if(typeof(data) == "undefined" || data == null || data == ""){
                            alert("没有找到上一期");
                            return;
                        }
                        $("#div_modal_content").html("是否调入"+(id == "prvn"?"省台指导":"市台订正")+"预报：");

                        //初始化制作时间
                        $("#div_modal_content").css("float", "left");
                        $("#divImportModelType_dateSelectContainer").css("display", "block");
                        if(typeModel == "bj" || typeModel == "prvn" || typeModel == "cty")
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=0;
                        else
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=7;
                        var myDateSelecter = new DateSelecter(2,2,"yyyy-mm-dd"); //最小视图为天
                        myDateSelecter.intervalMinutes = 60*12; //12小时
                        myDateSelecter.setCurrentTime(data.substr(0, 10));
                        $("#divImportModelType_selectMakeTime").html("<option value='5'>05时</option><option value='10'>10时</option><option value='16'>16时</option>");
                        $("#divImportModelType_selectMakeTime").val(parseInt(data.substr(11, 2)));
                        $("#divImportModelType_dateSelect").append(myDateSelecter.div);
                        $("#divImportModelType_dateSelect").find("img").css("display","none");
                        $("#divImportModelType_dateSelect").find("input").css("border","none").css("font-size","14px").css("box-shadow","none").css("font-weight","bold");

                        $("#div_modal").modal();
                        $("#div_modal").find("a").unbind();
                        $("#div_modal").find("a").click(function(){
                            if(typeof(this.id) != "undefined"){
                                if(this.id == "btn_ok")
                                {
                                    data = $("#divImportModelType_dateSelect").find("input").val().substr(0, 10)+" "+(Array(2).join(0)+$("#divImportModelType_selectMakeTime").val()).slice(-2)+":00:00";
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked)
                                        GDYB.GridProductClass.callModel(typeModel, data, "p");
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModels(typeModel, data, "p");
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(typeModel, null, data, "p");
                                }
                            }
                            //清空制作时间
                            $("#div_modal_content").css("float", "none");
                            $("#divImportModelType_dateSelect").html("");
                            $("#divImportModelType_dateSelectContainer").css("display", "none");
                        });
                    },
                    error: function (e) {
                        alert("没有找到上一期");
                    },
                    type:"POST"
                });
            }
            else if(this.id == "nn" || this.id == "ec" || this.id == "gp" || this.id == "japan" || this.id == "t639" || this.id == "bj") //调入模式
            {
                var typeModel = this.id;
                var element = GDYB.GridProductClass.currentElement;
                var url=gridServiceUrl+"services/GridService/getNWPModelLastDate";
                $.ajax({
                    data:{"para":"{element:'"+ element + "',type:'"+typeModel + "'}"},
                    url:url,
                    dataType:"text",
                    success:function(data){
                        //$("#div_modal_content").html("是否调入模式数据（" + data + "）");
                        $("#div_modal_content").html("是否调入模式数据：");

                        //初始化预报时间
                        $("#div_modal_content").css("float", "left");
                        $("#divImportModelType_dateSelectContainer").css("display", "block");
                        if(typeModel == "bj" || typeModel == "prvn" || typeModel == "cty")
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=0;
                        else
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=7;
                        var myDateSelecter = new DateSelecter(2,2,"yyyy-mm-dd"); //最小视图为天
                        myDateSelecter.intervalMinutes = 60*12; //12小时
                        myDateSelecter.setCurrentTime(data.substr(0, 10));
                        $("#divImportModelType_selectMakeTime").html("<option value='8'>08时</option><option value='20'>20时</option>");
                        $("#divImportModelType_selectMakeTime").val(parseInt(data.substr(11, 2)));
                        $("#divImportModelType_dateSelect").append(myDateSelecter.div);
                        $("#divImportModelType_dateSelect").find("img").css("display","none");
                        $("#divImportModelType_dateSelect").find("input").css("border","none").css("font-size","14px").css("box-shadow","none").css("font-weight","bold");

                        $("#div_modal").modal();
                        $("#div_modal").find("a").unbind();
                        $("#div_modal").find("a").click(function(){
                            if(typeof(this.id) != "undefined"){
                                if(this.id == "btn_ok")
                                {
                                    data = $("#divImportModelType_dateSelect").find("input").val().substr(0, 10)+" "+(Array(2).join(0)+$("#divImportModelType_selectMakeTime").val()).slice(-2)+":00:00";
                                    var days = $("#divImportModelType_selectDays").val();
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked)
                                        GDYB.GridProductClass.callModel(typeModel, data, "p");
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModels(typeModel, data, "p", Number(days)*24);
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(typeModel, null, data, "p", Number(days)*24);
                                }
                            }

                        });
                        //当模态框完全对用户隐藏时触发。
                        $('#div_modal').on('hidden.bs.modal', function () {
                            //清空预报时间
                            $("#div_modal_content").css("float", "none");
                            $("#divImportModelType_dateSelect").html("");
                            $("#divImportModelType_dateSelectContainer").css("display", "none");
                        });
                    },
                    error: function (e) {
                        alert("没有找到数值模式");
                    },
                    type:"POST"
                });
            }

            else if(this.id == "zdzckb") //调入自动站参考报
            {
                $("#div_modal_zdz").modal();
                //在调用 show 方法后触发。
                $('#div_modal_zdz').on('show.bs.modal', function () {

                });
                var myDateSelecter = new DateSelecter(); //最小视图为小时
                myDateSelecter.intervalMinutes = 60*24; //12小时
                $("#dateSelect_zdz").append(myDateSelecter.div);
                $("#dateSelect_zdz").find("img").css("display","none");
                $("#dateSelect_zdz").find("input").css("border","none").css("font-size","14px").css("box-shadow","none").css("font-weight","bold");

                $("#div_modal_zdz").find("a").off();
                $("#div_modal_zdz").find("a").on("click",function(){
                    var id = this.id;
                    switch (id){
                        case "btn_ok_zdz":
                            $("#div_progress_title").html("正在导入高低温站点数据,请稍候...");
                            $("#div_progress").css("display", "block");
                            var datetime = myDateSelecter.getCurrentTime(false);
                            if( GDYB.GridProductClass.dataCache.caches == null){
                                layer.close(load);
                                layer.alert("请先下载初始场");
                            }
                            else{
                                //var cimissdata = new CimissDataClass();
                                //cimissdata.getTemData(datetime, function () {});
                                // updateStationToGrid(datetime,function(dataGridMin){
                                //     $("#div_progress").css("display", "none");
                                //     // layer.alert("导入成功");
                                //     if (GDYB.GridProductClass.layerFillRangeColor != null){
                                //         GDYB.GridProductClass.layerFillRangeColor.refresh();
                                //     }
                                // });
                                var radius = $("#importRadius").val();
                                if(radius == "" || isNaN(radius)){
                                    layer.alert("影响半径设置有误，请输入整数");
                                    return;
                                }
                                var importFromStation = new ImportFromStation();
                                importFromStation.radius = Number(radius);
                                importFromStation.curDatetime = datetime;
                                importFromStation.run(function () {
                                    $("#div_progress").css("display", "none");
                                    if (GDYB.GridProductClass.layerFillRangeColor != null){
                                        GDYB.GridProductClass.layerFillRangeColor.refresh();
                                    }
                                    layer.alert("导入成功");
                                });
                            }
                            break;
                    }
                });
                //当模态框完全对用户隐藏时触发。
                $('#div_modal_zdz').on('hidden.bs.modal', function () {
                    $("#dateSelect_zdz").html("");
                });
                //更新自动站高温低温到格点
                function updateStationToGrid(datetime,callback){
                    var fromElementMax = "maxTemp_24h";
                    var fromElementMin = "minTemp_24h";
                    var toElementMax = "tmax";
                    var toElementMin = "tmin";
                    var hourSpan =24;
                    GDYB.GridProductClass.getTextData(fromElementMax,datetime,function(data){
                        //data包含了高温和低温数据，需要分类
                        var maxTempData = [];
                        var minTempData = [];
                        var tempData = [];
                        if(data!= null && data.features.length > 0) {
                            tempData = data.features;
                            //获取站点数据
                            var areaCode = GDYB.GridProductClass.currentUserDepart.departCode;
                            GDYB.GridProductClass.getStations(areaCode,function(stations){
                                var stationData = getTemStations(tempData,stations);
                                GDYB.GridProductClass.updateStationToGrid(stationData,fromElementMax,toElementMax,hourSpan,function(dataGrid,count1){ //更新高温
                                    GDYB.GridProductClass.updateStationToGrid(stationData,fromElementMin,toElementMin,hourSpan,function(dataGrid,count2){ //更新低温
                                        layer.alert(count1+"-"+count2);
                                        if($.isFunction(callback)){
                                            callback.call(dataGrid,dataGrid);
                                        }
                                    });
                                });
                            });
                        }
                        else{
                            $("#div_progress").css("display", "none");
                            layer.alert("没有数据！");
                        }
                    });
                }
                //组装站点数据和高温低温数据
                function getTemStations(tempDatas,stations){
                    var result= [],objTem ={};
                    var sLen = stations.length;
                    var tLen = tempDatas.length;
                    for(var i =0;i<tLen;i++){
                        var tempData = tempDatas[i];
                        for(var j =0;j<sLen;j++){
                            var station = stations[j];
                            if(station.stationNum == tempData.fieldValues[1]){
                                objTem.lat = station.latitude; //纬度
                                objTem.lon = station.longitude; //经度
                                objTem.stationName = station.stationName;//站名
                                objTem.stationNum = station.stationNum;//站号
                                objTem.maxTemp_24h = tempData.fieldValues[2];//24小时高温
                                objTem.minTemp_24h = tempData.fieldValues[3];//24小时低温
                                objTem.avgTemp_24h = tempData.fieldValues[4];//24小时平均温度
                                objTem.maxTempTime_24h = tempData.fieldValues[5];//24小时高温出现时间
                                objTem.minTempTime_24h = tempData.fieldValues[6];//24小时低温出现时间
                                result.push(objTem);
                            }
                        }
                    }
                    return result;
                }
            }

            else if(this.id=="zdyb"){
                if(GDYB.GridProductClass.currentUserName != "admin"){
                    alert("仅管理员可以进入");
                    return;
                }
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy();
                GDYB.Page.curPage = GDYB.ZDYBSZPageClass;
                GDYB.ZDYBSZPageClass.active();

                $("#gridws").remove();
            }

            else if(this.id=="qygl"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy();
                GDYB.Page.curPage = GDYB.XTGLPage;
                GDYB.XTGLPage.active();
            }
            else if(this.id == "menu_qtqsk"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy2();
                GDYB.Page.curPage = GDYB.QTQSKPage;
                GDYB.QTQSKPage.active();
                $("#gridws").remove();
            }
            else if(this.id == "menu_qtqld"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy2();
                GDYB.Page.curPage = GDYB.QTQLDPage;
                GDYB.QTQLDPage.active();
                $("#gridws").remove();
            }
            else if(this.id == "menu_qtqyt"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy2();
                GDYB.Page.curPage = GDYB.QTQYTPage;
                GDYB.QTQYTPage.active();
                $("#gridws").remove();
            }
            else if(this.id == "menu_rhjc"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy2();
                GDYB.Page.curPage = GDYB.LJYBRHJCPage;
                GDYB.LJYBRHJCPage.active();
                $("#gridws").remove();
            }
            else if(this.id == "menu_qdlyb"){
                $("#"+t.activeButton).removeClass("active");
                $(this).addClass("active");
                t.activeButton = this.id;
                GDYB.Page.curPage&&GDYB.Page.curPage.destroy2();
                GDYB.Page.curPage = GDYB.LJYBQDLPage;
                GDYB.LJYBQDLPage.active();
                $("#gridws").remove();
            }

            else //数据浏览
            {
                if(this.id == "menu_fxt"){
                    window.open("http://172.22.96.101/ybzhfxt/ybzhfxt.html");
//                    window.location.href="http://172.22.96.101/ybzhfxt/ybzhfxt.html";
                }
                else {
                    $("#" + t.activeButton).removeClass("active");
                    $(this).addClass("active");
                    t.activeButton = this.id;
                    if (t.activeButton == "menu_skzl") {
                        GDYB.Page.curPage && GDYB.Page.curPage.destroy();
                        GDYB.Page.curPage = GDYB.SKZLPage;
                        GDYB.SKZLPage.active();
                    }
                    else if (t.activeButton == "menu_wxld") {
                        GDYB.Page.curPage && GDYB.Page.curPage.destroy();
                        GDYB.Page.curPage = GDYB.WXLDPage;
                        GDYB.WXLDPage.active();
                    }
                    else if (t.activeButton == "menu_szms") {
                        GDYB.Page.curPage && GDYB.Page.curPage.destroy();
                        GDYB.Page.curPage = GDYB.SZMSPage;
                        GDYB.SZMSPage.active();
                    }
                }
            }
        });

        $("#sideWrapper").find("li").hover(function(){
            if(this.id == "menu_weather")
                return;
            $("#nav_bg_slider").css("display","block");
            $("#nav_bg_slider").css("top", this.offsetTop);
        });

        $("#sideWrapper").mouseleave(function(){
            if(t.activeButton == "")
                $("#nav_bg_slider").css("display","none");
            else
                $("#nav_bg_slider").css("top", $("#"+t.activeButton)[0].offsetTop);
        });
    };
}