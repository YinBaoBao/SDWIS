/*
 * 趋势订正
 * by zouwei 2015-05-10
 * */
function Panel_QSDZ(div){
    var stationX = 0.0; //代表站经度
    var stationY = 0.0; //代表站纬度
    var hourSpans = []; //时效数组
    var gridValues = []; //格点值数组

    this.counties = null;
    this.CountyId =[];

    this.div = div;

    this.hide = function(){
        this.panel.css({"display":"none"});

        //退出时，移除区划和绘制的落区
        if(GDYB.GridProductClass.layerMarkers != null)
            GDYB.GridProductClass.layerMarkers.clearMarkers();
        if(GDYB.GridProductClass.layerClimaticRegion != null)
            GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
        if(GDYB.GridProductClass.layerLuoqu != null)
            GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
        if(GDYB.GridProductClass.layerLuoquCenter != null)
            GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
    };

    this.createPanelDom = function(){

        this.panel = $("<div id=\"Panel_QSDZ\" class=\"dragPanel\" style='height: 260px;border: none'>"
            +"<div class=\"title\"><span>趋势订正</span><a id=\"closeBtn\" class=\"closeBtn2\"><img src=\"imgs/delete.png\"></a><a id=\"qsdzZoomIn\" class=\"ZoomIn\"><img src=\"imgs/fullscreen.png\"></a></div>" //closeBtn
            +"<div class=\"body\" style='height: auto'>"
            +"<div id='divLeft' style='float:left'>"

            +"<div id='divElement_QS' style='display: none;'><span>选择要素：</span><select id='selectElement_QS' style='width:100px;height:25px;line-height:25px;margin-top:5px;'><option>风速</option><option>风向</option></select></div>"
            +"<div style=''><span>区划类型：</span><select id='selectClimaticRegionType_QS' style='width:100px;height:25px;line-height:25px;margin-top:5px;'><option>无</option></select></div>"
            +"<div style=''><span>选择区域：</span><select id='selectClimaticRegionItem_QS' style='width:100px;height:25px;line-height:25px;margin-top:5px;'><option>无</option></select></div>"
            +"<div style='' id='divCounty_QS'><span>选择子域：</span><select id='selectCounty_QS' style='width:100px;height:25px;line-height:25px;margin-top:5px;'><option>无</option></select></div>"
            +"<div id='divBtnTool' style='float:left;margin-right: 0px;'>"
            +"<button id='btnSelectAll' style='width: 80px'>全部</button><button id='btnClearAll' style='width: 80px;margin-left: 10px'>清除</button>"
            +"</div>"
            +"<div id='divStation' style=''><span>代表站点：</span><input  id='inputStation' type='text' style='width:100px;margin-top:5px;height: 25px;' value='济南（54823）'/></div>"
            +"<div id='divTool' style='float:right;margin-right: 0px;'>"
            +"<button id='btnDrawLuoqu' style='width: 80px'>绘制区域</button><button id='btnApply_QS' style='width: 80px;margin-left: 10px'>应用</button>"
            //+"<button id='btnWmaxTo10uv' style='width: 80px'>日最大风->10米风</button><button id='btn10uvToWmax' style='width: 80px;margin-left: 10px'>10米风->日最大风</button>"
            +"</div>"
            +"</div>"
            +"<div id='divRight' style='float: left'>"
//            +"<div id='divTable_QS'  style='margin-left: 20px;'>"
//            +"</div>"
            +"<div id='divChart' style='width:100%;height: 100%;overflow-x: auto;overflow-y:hidden'>"
            +"<canvas id='canvas'></canvas>"
            +"</div>"
            +"</div>"
            +"</div>"
            +"</div>")
            .appendTo(this.div);

        //var canvas = document.getElementById("canvas");
        //cavas.width = $("#divChart").width;
        //GDYB.ChartClass.displayChart();
    };


    var t = this;
    t.init(function () {
        t.panel.find(".ZoomIn").on("click",function(){
            var img = $(this).find("img");
            if(img.attr("src")=="imgs/fullscreen.png"){ //放大
                img.attr("src","imgs/fullscreen_exit.png");
                $("#Panel_QSDZ").height(560);
                $("#divRight").height(550);
                $("#divLeft").height(550);
                $("#divChart").height(540);
                $("#canvas").height(530);
                $("#canvas").empty();
            }
            else{  //缩小
                img.attr("src","imgs/fullscreen.png");
                $("#Panel_QSDZ").height(260);
                $("#divRight").height(250);
                $("#divLeft").height(250);
                $("#divChart").height(240);
                $("#canvas").height(230);
                $("#canvas").empty();

            }
            var obj = this;
            // var canvas ="<canvas id='canvas'></canvas>";
            // $("#canvas").empty();
            // $("#divChart").append();
            // $("#canvas").height(560);
            // $("#Panel_QSDZ").css("height","260px");
            refreshChart();
        });
    });
    t.panel.css({
        "width":"100%",
        "bottom":"0px",
        "left":"0px"
    });

    var widthParent = parseInt($("#Panel_QSDZ").css("width"));
    var heihtParent = parseInt($("#Panel_QSDZ").css("height"));
    var widthLeft = parseInt($("#divLeft").css("width"));
    $("#divRight").css("width", widthParent-widthLeft - 25);
    $("#divRight").css("height", heihtParent-40);

    //refreshChart();
    //$("#inputStation").change(this.refreshChart);

    if(GDYB.GridProductClass.currentElement == "wmax" || GDYB.GridProductClass.currentElement == "10uv"){
        $("#divElement_QS").css("display", "block");
    }
    else{
        $("#divElement_QS").css("display", "none");
    }

    initType();
    function initType(){
        $("#selectClimaticRegionType_QS").empty();
        var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionTypes";
        $.ajax({
            data: {"para": "{departCode:'"+GDYB.GridProductClass.currentUserDepart.departCode+"'}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(data.length > 0)
                {
                    for(var i=0; i<data.length; i++)
                    {
                        $("#selectClimaticRegionType_QS").append("<option value='" + data[i].datasetName + "'>" + data[i].typeName + "</option>");
                    }
                    fillClimaticRegionItem(data[0].datasetName);
                }
            },
            type: "POST"
        });
    }

    $("#selectClimaticRegionType_QS").change(function(){
        var datasetname = $(this).val();
        if(datasetname == "T_CLIMATICREGION_CITY")
            $("#divCounty_QS").css("display", "block");
        else
            $("#divCounty_QS").css("display", "none");
        fillClimaticRegionItem(datasetname);
    });

    function fillClimaticRegionItem(datasetName){
        $("#selectClimaticRegionItem_QS").empty();
        var m_Arr =[];
        var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionItemNames";
        $.ajax({
            data: {"para": "{datasetname:'" + datasetName + "',departCode:'" + GDYB.GridProductClass.currentUserDepart.departCode + "'}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(data!=null && data.length > 0)
                {
                    for(var i=0; i<data.length; i++) {
                        //add by pope on 20161213
                        var obj= {};
                        obj.id = data[i].regionId;
                        obj.text = data[i].regionName;
                        m_Arr.push(obj);
                        // $("#selectClimaticRegionItem_QS").append("<option value='" + data[i].regionId + "'>" + data[i].regionName + "</option>");
                    }
                    var $sel =$("#selectClimaticRegionItem_QS").select2({
                        data: m_Arr
                    });
                    //t.refreshClimaticRegionItem(datasetName, data[0].regionId);
                    if(datasetName == "T_CLIMATICREGION_CITY" && GDYB.GridProductClass.currentUserDepart.departCode.length == 4) //如果是地市边界，默认选中本市
                    {
                        var selectedIndex = 0;
                        for(var key in data){
                            var item = data[key];
                            if(GDYB.GridProductClass.currentUserDepart.departName.indexOf(item.regionName) >= 0) //本来气候区划并无行政区划代码，故此用名称模糊匹配
                            {
                                selectedIndex = Number(key);
                                break;
                            }
                        }
                        var regionId = data[selectedIndex].regionId;
                        $sel.val(regionId).trigger("change");
                        // $("#selectClimaticRegionItem_QS").val(regionId);
                        t.refreshClimaticRegionItem(datasetName, regionId);
                    }
                    else{
                        t.refreshClimaticRegionItem(datasetName, data[0].regionId);
                    }
                }
            },
            type: "POST"
        });
    }

    $("#selectClimaticRegionItem_QS").change(function(){
        t.refreshClimaticRegionItem($("#selectClimaticRegionType_QS").val(), $(this).val());
    });

    //刷新数据
     this.refreshClimaticRegionItem =  function(datasetName, regionId)
    {
        showClimaticRegionItem(datasetName, regionId);
    }

    //显示气候区划
    function showClimaticRegionItem(datasetName, regionId) {
              var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionItem";
        $.ajax({
            data: {"para": "{datasetName:'" + datasetName+ "',regionId:" + regionId + "}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(GDYB.GridProductClass.layerClimaticRegion != null){
                    GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
                }
                if(GDYB.GridProductClass.layerMarkers != null){
                    GDYB.GridProductClass.layerMarkers.clearMarkers();
                }

                var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(data);
                var fAttributes = feature.attributes;
                fAttributes["FEATUREID"] = regionId;//fAttributes["SMID"];

                stationX = Number(fAttributes["STATIONX"]);
                stationY = Number(fAttributes["STATIONY"]);

                //显示代表站
                $("#inputStation").val(fAttributes["STATIONNAM"] + "("+fAttributes["STATIONCOD"]+")"); //SHP文件字段名有长度限制吗，最后一个E都放不下

                var size = new WeatherMap.Size(25,30);
                var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
                var icon = new WeatherMap.Icon('imgs/marker.png', size, offset);
                GDYB.GridProductClass.layerMarkers.addMarker(new WeatherMap.Marker(new WeatherMap.LonLat(stationX,stationY),icon));

                //气候区划
                feature.style = {
                    strokeColor: "#a548ca",
                    strokeWidth: 2.0,
                    //fillColor: "#90fa64",
                    fillColor: "#FF0000",
                    fillOpacity: "0.3",
                    fill:false
                };
                var features = [];
                features.push(feature);
                GDYB.GridProductClass.layerClimaticRegion.addFeatures(features);

                refreshChart(); //必须要让该线程结束，也即stationX、stationY变化后，才能刷新地图，否则stationX、stationY会匹配错误

                if(GDYB.GridProductClass.layerLuoqu != null)
                    GDYB.GridProductClass.layerLuoqu.removeAllFeatures(); //移除落区
                if(GDYB.GridProductClass.layerLuoquCenter != null)
                    GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures(); //移除落区中心点

                if(datasetName == "T_CLIMATICREGION_CITY")
                    fillCounty(feature.attributes["CODE"]);
            },
            type: "POST"
        });
    }

    function fillCounty(areaCode){
        $("#selectCounty_QS").css("display", "inline-block");
        var level = "cnty";
        var m_Arr=[];
        var url=gridServiceUrl+"services/AdminDivisionService/getDivisionInfos";
        $.ajax({
            data: {"para": "{areaCode:'"+areaCode+"',level:'"+level+"'}"},
            url: url,
            dataType: "json",
            type: "POST",
            success: function (data) {
                if(typeof(data) != "undefined" && data.length>0)
                {
                    t.counties = [];
                    $("#selectCounty_QS").empty();
                    // $("#selectCounty_QS").html("");
                    // $("#selectCounty_QS").append("<option value='-1'>全部</option>");
                    for(var key in data)
                    {
                        var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(JSON.parse(data[key]));
                        feature.geometry.calculateBounds();
                        t.counties.push(feature);
                        //add by pope on 20161213 多选
                        var obj= {};
                        obj.id = Number(key);
                        obj.text = feature.attributes["NAME"];
                        t.CountyId.push(obj.id);
                        m_Arr.push(obj);
                        // $("#selectCounty_QS").append("<option value='" + Number(key) + "'>" + feature.attributes["NAME"] + "</option>");
                    }
                    $("#selectCounty_QS").select2({
                        multiple:true,
                        placeholder:'请选择',
                        data: m_Arr
                    });
                }
            },
            error: function(e){
                alert("获取县级行政区划边界失败："+ e.statusText);
            }
        });
    }

    //显示县界
    $("#selectCounty_QS").change(function(){
        var key = $(this).val();
        if(key < 0){
            showClimaticRegionItem($("#selectClimaticRegionType_QS").val(), $("#selectClimaticRegionItem_QS").val()); //如果是全部县，则显示市边界
        }
        else{
            showCounty(key);
        }
    });
    //全部
    $("#btnSelectAll").on("click",function(){
        // var arr = t.CountyId;
        // $("#selectCounty_QS").val(arr).trigger("change");
        $("#selectCounty").val(null).trigger("change");
        showClimaticRegionItem($("#selectClimaticRegionType_QS").val(), $("#selectClimaticRegionItem_QS").val()); //如果是全部县，则显示市边界
    });
    //清除
    $("#btnClearAll").on("click",function(){
        $("#selectCounty_QS").val(null).trigger("change");
    });

    function showCounty(key){
        if(t.counties == null || t.counties.length <= key){
            return;
        }
        GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
        if(key!=null && key.length>0){
            for(var i =0;i<key.length;i++){
                var feature = t.counties[key[i]];
                GDYB.GridProductClass.layerClimaticRegion.addFeatures([feature]);
                //add by wangkun 修改为直接请求数据库
                var stationName=feature.attributes["STATIONNAM"];
                var stationCode=feature.attributes["STATIONCOD"];
                var areaCode=feature.attributes["CODE"];
                //显示代表站
                $("#inputStation").val(stationName + "("+stationCode+")"); //SHP文件字段名有长度限制吗，最后一个E都放不下
                var url=gridServiceUrl+"services/GridService/getStations";
                $.ajax({
                    data: {"para": "{areaCode:'"+areaCode+"'}"},
                    url: url,
                    dataType: "json",
                    type: "POST",
                    success: function (data) {
                        if(typeof(data) != "undefined" && data.length>0)
                        {
                            stationX=data[0].longitude;
                            stationY=data[0].latitude;
                            GDYB.GridProductClass.layerMarkers.clearMarkers();
                            var size = new WeatherMap.Size(25,30);
                            var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
                            var icon = new WeatherMap.Icon('imgs/marker.png', size, offset);
                            GDYB.GridProductClass.layerMarkers.addMarker(new WeatherMap.Marker(new WeatherMap.LonLat(stationX,stationY),icon));
                            refreshChart(); //必须要让该线程结束，也即stationX、stationY变化后，才能刷新地图，否则stationX、stationY会匹配错误
                            if(GDYB.GridProductClass.layerLuoqu != null)
                                GDYB.GridProductClass.layerLuoqu.removeAllFeatures(); //移除落区
                            if(GDYB.GridProductClass.layerLuoquCenter != null)
                                GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures(); //移除落区中心点
                        }
                    },
                    error: function(e){
                        alert("获取站点信息失败："+ e.statusText);
                    }
                });
            }
        }
    }

    /*//初始化（刷新）图表
    function refreshChart1(element){
        if(typeof(element) == "undefined")
            element = GDYB.GridProductClass.currentElement;
        hourSpans = [];
        gridValues = [];
        var isWindDirection = (element == "wmax" || element == "10uv") && $("#selectElement_QS").val() == "风向";
        var x = stationX;
        var y = stationY;
        var strLabels = [];
        var dValues = [];
        var dataCache = GDYB.GridProductClass.dataCache;

        var xnum = 0;
        var ynum = 0;
        function getEachData(hourSpan){
            dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element,hourSpan,function(data){
                var datasetGrid = data.data;
                var cell = datasetGrid.xyToGrid(x, y);
                var val = isWindDirection?datasetGrid.getValue(1, cell.x, cell.y):datasetGrid.getValue(0, cell.x, cell.y);
                if(val == datasetGrid.noDataValue) //如果是无效值，暂时用0表示。
                    val = 0;
                dValues.push(val);
                xnum ++;
                if(xnum == ynum){
                    GDYB.ChartClass.lineChartData = {
                        labels : strLabels,
                        datasets : [
                            {
                                fillColor : "rgba(255,200,150,0.5)",
                                strokeColor : "rgba(243,150,0,1)",
                                pointColor : "rgba(243,150,0,1)",
                                pointStrokeColor : "#fff",
                                data : dValues
                            }
                        ]

                    };
                    GDYB.ChartClass.displayChart2();
                }
            })
        }
        var elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element);
        var c = document.getElementById("canvas");
        //c.width = document.getElementById("divChart").clientWidth-document.getElementById("divLeft").clientWidth;
        //c.width = parseInt($("#divRight").css("width"));
        c.width = (Object.getOwnPropertyNames(elementData).length>40)?1500:parseInt($("#divRight").css("width"));
        c.height = parseInt($("#divRight").css("height")) - 24; //减去滚动条的高度
        $(c).css("width", c.width + "px");
        for(var key in elementData)
        {
            ynum++;
            strLabels.push(key + "h");
            hourSpans.push(key);
            getEachData(key);
        }
    }*/
    function refreshChart(element){
        if(typeof(element) == "undefined"){
            element = GDYB.GridProductClass.currentElement;
        }
        t.element = element;
        hourSpans = []; //重置时效
        gridValues = []; //重置格点值
        var isWindDirection = (element == "wmax" || element == "10uv") && $("#selectElement_QS").val() == "风向";
        var dataCache = GDYB.GridProductClass.dataCache;
        var dg = GDYB.GridProductClass.datasetGrid;
        var objData = null;
        switch (element){
            case "tmax": //日最高温
            case "tmin": //日最低温
            case "2t": //气温
                getTemperatureDatasets(element,dataCache,isWindDirection);
                break;
            case "r12": //日降水
            case "r3": //降水
                getPrecipitationDatasets(element,dataCache,isWindDirection);
                break;
            case "wmax": //日最大风
            case "10uv": //风
                getWindDatasets(element,dataCache,isWindDirection);
                break;
            default :
                getDatasets(element,dataCache,isWindDirection);
                break;
        }
    }

    function displayChart(objData){
        if(objData!=null){
            var c = document.getElementById("canvas");
            c.width = (Object.getOwnPropertyNames(objData.elementData).length>40)?1500:parseInt($("#divRight").css("width"));
            c.height = parseInt($("#divRight").css("height")) - 24; //减去滚动条的高度
            $(c).css("width", c.width + "px");

            GDYB.ChartClass.lineChartData = {
                labels : objData.strLabels,
                datasets : objData.datasets
            };
            GDYB.ChartClass.displayChart({bezierCurve : false});
        }
    }

    //获取其他要素数据
    function getDatasets(element,dataCache,isWindDirection){
        var result ={};
        result.datasets = [];
        result.strLabels = [];
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element);

        getdValues(element,result.elementData,isWindDirection, function(objLabelsValues){
            result.strLabels = objLabelsValues.strLabels;
            var transparent = 1;
            var styles = {
                fillColor : "rgba(0,191,255,0)",
                strokeColor :"rgba(0,191,255,"+transparent+")",
                pointColor : "rgba(0,191,255,"+transparent+")",
                pointStrokeColor : "#fff",
                data : objLabelsValues.dValues
            };
            if(styles != null){
                result.datasets.push(styles);
                displayChart(result);
            }
        });
    }
    //获取温度
    function getTemperatureDatasets(element,dataCache,isWindDirection){
        var result ={},elementDatas=[];
        result.datasets = [];
        result.strLabels = [];
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "tmax");
        elementDatas.push(result.elementData);
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "tmin");
        elementDatas.push(result.elementData);
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "2t");
        elementDatas.push(result.elementData);

        var styles1 = null;
        var styles2 = null;
        var styles3 = null;
        var transparent1 = 1; //透明度
        var transparent2 = 1; //透明度
        var transparent3 = 1; //透明度
        switch (element){
            case "tmax": //日最高温
                 transparent2 = 0.3;
                 transparent3 = 0.3;
                break;
            case "tmin": //日最低温
                 transparent1 = 0.3;
                 transparent3 = 0.3;
                break;
            case "2t": //气温
                 transparent1 = 0.3;
                 transparent2 = 0.3;
                break;
        }
        var prompt = "";
        //日高温
        getdValues("tmax",elementDatas[0],isWindDirection,function(objLabelsTemMaxValues){
            GDYB.Page.elementData.TemMaxValues = objLabelsTemMaxValues.dValues.slice(0);
            for(var i=0;i<objLabelsTemMaxValues.strLabels.length;i++){
                objLabelsTemMaxValues.dValues.splice(i*8, 0, "0","0","0","0","0","0","0");
            }
            styles1 = {
                fillColor : "rgba(255,0,0,0)",
                strokeColor :"rgba(255,0,0,"+transparent1+")",
                pointColor : "rgba(255,0,0,"+transparent1+")",
                pointStrokeColor : "#fff",
                data : objLabelsTemMaxValues.dValues
            };
            if(objLabelsTemMaxValues.text != "")
                prompt += "日最高温缺少"+objLabelsTemMaxValues.text + "时效数据;\n";
            if(styles1 != null && styles2 != null &&styles3 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });
        //日低温
        getdValues("tmin",elementDatas[1],isWindDirection,function(objLabelsTemMinValues){
            GDYB.Page.elementData.TemMinValues = objLabelsTemMinValues.dValues.slice(0);
            for(var i=0;i<objLabelsTemMinValues.strLabels.length;i++){
                objLabelsTemMinValues.dValues.splice(i*8, 0, "0","0","0","0","0","0","0");
            }
            styles2 = {
                fillColor : "rgba(0,0,255,0)",
                strokeColor :"rgba(0,0,255,"+transparent2+")",
                pointColor : "rgba(0,0,255,"+transparent2+")",
                pointStrokeColor : "#fff",
                data : objLabelsTemMinValues.dValues
            };
            if(objLabelsTemMinValues.text != "")
                prompt += "日最低温缺少"+objLabelsTemMinValues.text + "时效数据;\n";
            if(styles1 != null && styles2 != null &&styles3 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });
        //7天气温
        getdValues("2t",elementDatas[2],isWindDirection,function(objLabelsTemValues){
            result.strLabels = objLabelsTemValues.strLabels;
            GDYB.Page.elementData.TemValues = objLabelsTemValues.dValues.slice(0);;
            styles3 = {
                fillColor : "rgba(0,255,0,0)",
                strokeColor :"rgba(0,255,0,"+transparent3+")",
                pointColor : "rgba(0,255,0,"+transparent3+")",
                pointStrokeColor : "#fff",
                data : objLabelsTemValues.dValues
            };
            if(objLabelsTemValues.text != "")
                prompt += "气温缺少"+objLabelsTemValues.text + "时效数据，不能进行趋势订正";
            if(styles1 != null && styles2 != null &&styles3 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });


        function combination(){
            switch (element){
                case "tmax": //日最高温
                    result.datasets.push(styles2);
                    result.datasets.push(styles3);
                    result.datasets.push(styles1);
                    break;
                case "tmin": //日最低温
                    result.datasets.push(styles3);
                    result.datasets.push(styles1);
                    result.datasets.push(styles2);
                    break;
                case "2t": //气温
                    result.datasets.push(styles1);
                    result.datasets.push(styles2);
                    result.datasets.push(styles3);
                    break;
            }
            displayChart(result);
        }
    }
    //获取降水
    function getPrecipitationDatasets(element,dataCache,isWindDirection){
        var result ={},elementDatas=[];
        result.datasets = [];
        result.strLabels = [];
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "r12");
        elementDatas.push(result.elementData);
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "r3");
        elementDatas.push(result.elementData);

        var styles1 = null;
        var styles2 = null;
        var transparent1 = 1; //透明度
        var transparent2 = 1; //透明度
        switch (element){
            case "r12": //日降水
                transparent2 = 0.3; //透明度
                break;
            case "r3": //降水
                transparent1 = 0.3; //透明度
                break;
        }
        var prompt = "";
        //日降水
        getdValues("r12",elementDatas[0],isWindDirection, function(objLabelsR12Values){
            GDYB.Page.elementData.R12Values = objLabelsR12Values.dValues.slice(0);
            for(var i=0;i<objLabelsR12Values.strLabels.length;i++){
                objLabelsR12Values.dValues.splice(i*4, 0, "0","0","0");
            }
            styles1 = {
                fillColor : "rgba(255,0,0,0)",
                strokeColor :"rgba(255,0,0,"+transparent1+")",
                pointColor : "rgba(255,0,0,"+transparent1+")",
                pointStrokeColor : "#fff",
                data : objLabelsR12Values.dValues
            };
            if(objLabelsR12Values.text != "")
                prompt += "日降水缺少"+objLabelsR12Values.text + "时效数据;\n";
            if(styles1 != null && styles2 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });
        //降水
        getdValues("r3",elementDatas[1],isWindDirection, function(objLabelsR3Values){
            result.strLabels = objLabelsR3Values.strLabels;
            styles2 = {
                fillColor : "rgba(0,0,255,0)",
                strokeColor :"rgba(0,0,255,"+transparent2+")",
                pointColor : "rgba(0,0,255,"+transparent2+")",
                pointStrokeColor : "#fff",
                data : objLabelsR3Values.dValues
            };
            if(objLabelsR3Values.text != "")
                prompt += "降水量缺少"+objLabelsR3Values.text + "时效数据，不能进行趋势订正";
            if(styles1 != null && styles2 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });


        function combination(){
            switch (element){
                case "r12": //日降水
                    result.datasets.push(styles2);
                    result.datasets.push(styles1);
                    break;
                case "r3": //降水
                    result.datasets.push(styles1);
                    result.datasets.push(styles2);
                    break;
            }
            displayChart(result);
        }
    }
    //获取风
    function getWindDatasets(element,dataCache,isWindDirection){
        var result ={},elementDatas=[];
        result.datasets = [];
        result.strLabels = [];
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "wmax");
        elementDatas.push(result.elementData);
        result.elementData = dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, "10uv");
        elementDatas.push(result.elementData);

        var styles1 = null;
        var styles2 = null;
        var transparent1 = 1; //透明度
        var transparent2 = 1; //透明度
        switch (element){
            case "wmax": //日最大风
                transparent2 = 0.3; //透明度
                break;
            case "10uv": //风
                transparent1 = 0.3; //透明度
                break;
        }
        var prompt = "";
        //日最大风
        getdValues("wmax",elementDatas[0],isWindDirection,function(objLabelsWmaxValues) {
            GDYB.Page.elementData.WmaxValues = objLabelsWmaxValues.dValues.slice(0);
            for (var i = 0; i < objLabelsWmaxValues.strLabels.length; i++) {
                objLabelsWmaxValues.dValues.splice(i * 4, 0, "0", "0", "0");
            }
            styles1 = {
                fillColor: "rgba(255,0,0,0)",
                strokeColor: "rgba(255,0,0," + transparent1 + ")",
                pointColor: "rgba(255,0,0," + transparent1 + ")",
                pointStrokeColor: "#fff",
                data: objLabelsWmaxValues.dValues
            };
            if (objLabelsWmaxValues.text != "")
                prompt += "日最大风缺少" + objLabelsWmaxValues.text + "时效数据;\n";
            if(styles1 != null && styles2 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });
        //风
        getdValues("10uv",elementDatas[1],isWindDirection, function(objLabels10uvValues){
            result.strLabels = objLabels10uvValues.strLabels;
            styles2 = {
                fillColor : "rgba(0,0,255,0)",
                strokeColor :"rgba(0,0,255,"+transparent2+")",
                pointColor : "rgba(0,0,255,"+transparent2+")",
                pointStrokeColor : "#fff",
                data : objLabels10uvValues.dValues
            };
            if(objLabels10uvValues.text != "")
                prompt += "风缺少"+objLabels10uvValues.text + "时效数据，不能进行趋势订正";
            if(styles1 != null && styles2 != null){
                if(prompt.length != 0)
                    layer.alert(prompt);
                combination();
            }
        });

        function combination(){
            switch (element){
                case "wmax": //日最大风
                    result.datasets.push(styles2);
                    result.datasets.push(styles1);
                    break;
                case "10uv": //风
                    result.datasets.push(styles1);
                    result.datasets.push(styles2);
                    break;
            }
            displayChart(result);
        }
    }
    //获取要素时效和对应的值
    function getdValues(element,elementData,isWindDirection,recall){
        var result = {strLabels:[],dValues:[]};
        var xnum = 0,ynum = 0,Spans = [],dValuesData = {},text = "";
		for(var i in elementData) {
			Spans.push(i);
		}
		ynum = Spans.length;
        for(var key in elementData) {
            result.strLabels.push(key + "h");
            if(element == t.element)
                hourSpans.push(key);
            // Spans.push(key);
            getEachData(key);
        }

        function getEachData(hourSpan){
            GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element,hourSpan,function(dataCache){
                if(dataCache != null && dataCache.data != null){
                    var datasetGrid = dataCache.data;
                    var cell = datasetGrid.xyToGrid(stationX, stationY);
                    var val = isWindDirection?datasetGrid.getValue(1, cell.x, cell.y):datasetGrid.getValue(0, cell.x, cell.y);
                    if(val == datasetGrid.noDataValue) //如果是无效值，暂时用0表示。
                        val = 0;
                    //result.dValues.push(val);
                    dValuesData[hourSpan] = val;
                }
                else{
                    text += hourSpan+", ";
                }
                xnum ++;
                if(xnum == ynum){
                    for(var i=0;i<Spans.length;i++){
                        result.dValues.push(dValuesData[Spans[i]]);
                    }
                    if(text != "")
                        text.substr(0,text.length-2);
                    result["text"] = text;
                    recall&&recall(result);
                }
            })
        }
    }

    //通过时效获取要素时效数据
    function getdValuesByhourSpans(hourSpan,element,callback){
        element = element ||GDYB.GridProductClass.currentElement;
        GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element , hourSpan, function(hourSpanData){
            if($.isFunction(callback)){
                callback.call(hourSpanData,hourSpanData);
            }
        });
    }
    //温度订正算法
    function CalTemperature(oldval,newval,hourSpan,element){
        element = element ||GDYB.GridProductClass.currentElement;
        hourSpan = hourSpan.substring(0,s.length-1);
        var temMaxData = GDYB.Page.elementData.objLabelsTemMaxValues.dValues;
        var temMinData = GDYB.Page.elementData.objLabelsTemMinValues.dValues;
        var temData = GDYB.Page.elementData.objLabelsTemValues.dValues;
        var maxValue = Math.max.apply(null, temMaxData);//日高温最大值
        var minValue = Math.min.apply(null, temMinData);//日低温最小值

        hourSpan = hourSpan.substring(0,s.length-1);
        switch (element){
            case "tmax": //日最高温
                getdValuesByhourSpans(hourSpan,"2t",function(hourSpanData){

                });
                break;
            case "tmin": //日最低温
                getdValuesByhourSpans(hourSpan,"2t",function(hourSpanData){

                });
                break;
            case "2t": //气温

                break;
        }
    }
    //日低温订正算法
    function CalMinTemperature(tmaxData,tminData,tData){
        var a=[1,2,3,5];
        var t_max = Math.max.apply(null, tmaxData);//日高温最大值
        var t_min = Math.min.apply(null, tmaxData);//日高温最小值

        var m_max = Math.max.apply(null, tminData);//日低温最大值
        var m_min = Math.min.apply(null, tminData);//日低温最小值
    }
    //温度订正算法
    function CalTemperature(tmaxData,tminData,tData){
        var a=[1,2,3,5];
        var t_max = Math.max.apply(null, tmaxData);//日高温最大值
        var t_min = Math.min.apply(null, tmaxData);//日高温最小值

        var m_max = Math.max.apply(null, tminData);//日低温最大值
        var m_min = Math.min.apply(null, tminData);//日低温最小值
    }

    //绘制区域
    $("#btnDrawLuoqu").click(function(){
        GDYB.GridProductClass.currentGridValueDown = GDYB.GridProductClass.datasetGrid.noDataValue;
        GDYB.GridProductClass.currentGridValueUp = GDYB.GridProductClass.datasetGrid.noDataValue;
        startDrawLuoqu();
        isDrawing = true;

        function startDrawLuoqu(){
            GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
            GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
            GDYB.GridProductClass.drawLuoqu.activate();
            GDYB.GridProductClass.drawFreePath.deactivate();
            stopDragMap();

            function stopDragMap()
            {
                var map = GDYB.Page.curPage.map;
                //var map = GDYB.Page.curMap;
                for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                    var handler = map.events.listeners.mousemove[i];
                    if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                    {
                        handler.obj.active = false;
                    }
                }
            }
        }
    });

    $("#div_element").find("button").click(function(){
        var element = this.id;
        if(element == "wmax" || element == "10uv"){
            $("#divElement_QS").css("display", "block");
        }
        else{
            $("#divElement_QS").css("display", "none");
        }

        if(t.panel.css("display") != "none")
            refreshChart(element);
    });

    $("#selectElement_QS").change(function(){
        refreshChart();
    });

    //落区绘制完成
    var isDrawing = false;
    GDYB.GridProductClass.drawLuoqu.events.on({"featureadded": drawCompleted});
    function drawCompleted() {
        if(isDrawing){
            isDrawing = false;
            addLuoquCenter();
            stopDrawLuoqu();

            //添加落区中心点
            function addLuoquCenter(){
                var feature = GDYB.GridProductClass.layerLuoqu.features[0];
                var bounds = feature.geometry.bounds;
                var centerLonLat = {x:bounds.left + (bounds.right - bounds.left)/2, y:bounds.bottom+(bounds.top - bounds.bottom)/2};
                var pointCenter = new WeatherMap.Geometry.Point(centerLonLat.x, centerLonLat.y);
                var featureCenter = new WeatherMap.Feature.Vector(pointCenter);
                GDYB.GridProductClass.layerLuoquCenter.addFeatures([featureCenter]);

                GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures(); //移除气候区划
                stationX = centerLonLat.x;
                stationY = centerLonLat.y;
                refreshChart();
            }

            function stopDrawLuoqu(){
                startDragMap();
                if(GDYB.GridProductClass.drawLuoqu != null)
                    GDYB.GridProductClass.drawLuoqu.deactivate();

                function startDragMap()
                {
                    var map = GDYB.Page.curPage.map;
                    //var map = GDYB.Page.curMap;
                    for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                        var handler = map.events.listeners.mousemove[i];
                        if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                        {
                            handler.obj.active = true;
                        }
                    }
                }
            }
        }
    };

    //落区中心点移动
    GDYB.GridProductClass.dragFeature.onComplete = function(feature, pixel){
        if(feature != null && feature.geometry.CLASS_NAME == "WeatherMap.Geometry.Point") {
            stationX = feature.geometry.x;
            stationY = feature.geometry.y;
            refreshChart();
        }
    };

    //点击应用
    $("#btnApply_QS").click(function(){
        if(GDYB.ChartClass.lineChartData == null){
            return;
        }
        var geos = [];
        if(GDYB.GridProductClass.layerLuoqu != null && GDYB.GridProductClass.layerLuoqu.features.length != 0){
            for(var i =0;i<GDYB.GridProductClass.layerLuoqu.features.length;i++){
                var geo = GDYB.GridProductClass.layerLuoqu.features[i].geometry;
                geos.push(geo);
            }
        }
        else if(GDYB.GridProductClass.layerClimaticRegion != null && GDYB.GridProductClass.layerClimaticRegion.features.length != 0){
            for(var j =0;j<GDYB.GridProductClass.layerClimaticRegion.features.length;j++){
                var geo = GDYB.GridProductClass.layerClimaticRegion.features[j].geometry;
                geos.push(geo);
            }
        }
        if(geos.length < 0) {
            $("#div_modal_confirm_content").html("请选择或者绘制区域。");
            $("#div_modal_confirm").modal();
            $("#div_modal_confirm").find("a").unbind();
            return;
        }

        var isWindDirection = (GDYB.GridProductClass.currentElement == "wmax" || GDYB.GridProductClass.currentElement == "10uv") && $("#selectElement_QS").val() == "风向";

        //var method = 2; //固定增量方式订正，无法解决基准格点值为0的情况，无法除以0，比如降水为0，订正为10，无法知道增加的百分比为多少
        var method = isWindDirection?0:1; //由于上面的问题，只能统一加减值
        //var datas = GDYB.ChartClass.lineChartData.datasets[0].data;
        var datas = getDataByElement(GDYB.GridProductClass.currentElement);
        GDYB.GridProductClass.layerFillRangeColor.refresh();
        var len = datas.length;
        for(var i=0; i<len; i++)
        {
            qsdzSetValue(i,len);
        }
        var num = 0;
        function qsdzSetValue(i){
            var hourSpan = hourSpans[i];
            GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, hourSpan, function(hourSpanData){
                if(hourSpanData != null && hourSpanData.data != null){
                    var datasetGrid = hourSpanData.data;
                    var x = stationX;
                    var y = stationY;
                    var cell = datasetGrid.xyToGrid(x, y);
                    var valSrc = isWindDirection?datasetGrid.getValue(1, cell.x, cell.y) : datasetGrid.getValue(0, cell.x, cell.y);
                    var increment = datas[i]-valSrc;
                    if(increment != 0) {
                        for(var k =0;k<geos.length;k++){
                            var geo =geos[k];
                            GDYB.GridProductClass.fillRegion(datasetGrid, geo, isWindDirection?datas[i]:increment, method, GDYB.GridProductClass.currentElement, isWindDirection);
                        }
                        GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, hourSpan, 1, datasetGrid); //更新已修改状态
                    }
                }
                num++;
                if(num == datas.length){
                    GDYB.GridProductClass.dataCache.clearMem();
                    GDYB.GridProductClass.layerFillRangeColor.refresh();
                    //交叉订正
                    GDYB.GDYBPage.CheckReasonable(function(){
                        refreshChart();
                    });
                }
                /*if(hourSpan == GDYB.GridProductClass.currentHourSpan){
                    GDYB.GridProductClass.layerFillRangeColor.refresh();
                }*/
            });
        }
        function getDataByElement(element){
            var datasets = GDYB.ChartClass.lineChartData.datasets;
            var datas = datasets[datasets.length-1].data;
            var result = remove(datas,"0");
            return result;
        }
        //删除数组中指定的字符
        function remove(arr, str) {
            var arrNew = [];
            for(var i = 0; i < arr.length; i++){
                if(str !== arr[i]) {
                    arrNew.push(arr[i]);
                }
            }
            return arrNew;
        }
    });
    //日最大风->风
    $("#btnWmaxTo10uv").on("click",function(){
        var elementSrc= "wmax";
        var elementTarget ="10uv";
        var cc = new CrossCorrection();
        cc.cal(function(){

        }, elementSrc, elementTarget);
    });
    //风->日最大风
    $("#btn10uvToWmax").on("click",function(){
        var elementSrc= "10uv";
        var elementTarget ="wmax";
        var cc = new CrossCorrection();
        cc.cal(function(){

        }, elementSrc, elementTarget);
    });
}

Panel_QSDZ.prototype = new DragPanelBase();
