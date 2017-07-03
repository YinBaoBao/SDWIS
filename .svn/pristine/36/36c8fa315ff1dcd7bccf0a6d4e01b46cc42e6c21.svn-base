/*
* SWAN雷达数据类
* by zouwei, 2015-08-25
* */
function RadarDataClass() {
    this.datasetGrid = null;            //格点数据集
    this.layerFillRangeColor = null;    //填色图层
    this.currentElement = null;         //当前要素
    this.currentLevel = null;           //当前仰角
    this.currentDateTime = null;        //当前时间
    this.layerVector = null;            //矢量图层，用于TITAN等
    this.currentElementName = null;     //矢量图层，用于TITAN等

    this.displayRadarData=function(recall, element, level, datetime,curMap){
        this.currentElement = element;
        this.currentLevel = level;
        this.currentDateTime = datetime;
        var map = GDYB.Page.curPage.map || GDYB.Page.curMap;
        this.addLayer(map);
        if(element == "swan_titan"){
            this.addVector(recall, map);
        }
        else if(element == "awx_mcs") {
            this.addMCS(recall, map);
        }
        else{
            this.addGrid(recall, map);
        }
    };
    //add by wangkun 显示最新雷达数据
    this.displayNewRadarData=function(recall, element,level, curMap,elementname,showtime){
        this.currentElement = element;
        this.currentElementName=elementname;
        this.currentLevel = level;
        var map = GDYB.Page.curPage.map || GDYB.Page.curMap;
        this.addLayer(map);
        if(element == "swan_titan"){
            this.addVector(recall, map);
        }
        else if(element == "awx_mcs") {
            this.addMCS(recall, map);
        }
        else{
            this.addGrid(recall, map,showtime);
        }
    };

    this.addLayer = function(pMap){
        if(this.layerFillRangeColor == null) {
            this.layerFillRangeColor = new WeatherMap.Layer.FillRangeColorLayer(
                "RadarMap",
                {
                    "radius": 40,
                    "featureWeight": "value",
                    "featureRadius": "geoRadius"
                }
            );
            this.layerFillRangeColor.isSmooth = true;
            this.layerFillRangeColor.isAlwaySmooth = true;
            this.layerFillRangeColor.isShowGridline = false;
            this.layerFillRangeColor.isShowLabel = false;
            pMap.addLayers([this.layerFillRangeColor]);
        }

        if(this.currentElement == "swan_trec"){
            this.layerFillRangeColor.items = heatMap_10uvStyles;
            this.layerFillRangeColor.isWind = true;
            this.layerFillRangeColor.isShowFillColor = false;
            this.layerFillRangeColor.isShowAll = true;
        }
        else{
            this.layerFillRangeColor.items = heatMap_RadarStyles;
            this.layerFillRangeColor.isWind = false;
        }

        if(this.layerVector == null){
            this.layerVector = new WeatherMap.Layer.Vector("layerVector", {renderers: ["Canvas"]});
            this.layerVector.style = {
                fillColor: "#ff0000",
                strokeColor: "#ff0000",
                strokeWidth: 1.0,
                pointRadius:2
            };
            pMap.addLayers([this.layerVector]);
        }
    };

    this.addVector = function(recall, pMap){
        var t = this;
        $("#div_progress_title").html("正在下载数据...");
        $("#div_progress").css("display", "block");
        var url=dataSericeUrl+"services/SwanRadarService/getVector";
        console.log(url)
        $.ajax({
            data:{"para":"{element:'"+ t.currentElement + "',level:'"+ t.currentLevel + "',datetime:'"+ t.currentDateTime + "'}"},
            url:url,
            dataType:"json",
            success:function(data){
                try
                {
                    if(data.length > 0) {
                        var features = [];
                        var ptsTemp = [];
                        for (var key in data) {
                            var jgeo = data[key];
                            var geo = null;
                            var style = null;
                            if (jgeo.type == "POINT") {
                                geo = new WeatherMap.Geometry.Point(jgeo.point.x, jgeo.point.y);
                                ptsTemp.push(new WeatherMap.Geometry.Point(jgeo.point.x, jgeo.point.y));
                            }
                            else if (jgeo.type == "LINE") {
                                var pointArray = new Array();
                                var pt = null;
                                for (var keyOfPoint in jgeo.points) {
                                    pt = jgeo.points[keyOfPoint];
                                    pointArray.push(new WeatherMap.Geometry.Point(pt.x, pt.y));
                                }
                                geo = new WeatherMap.Geometry.LineString(pointArray);
                                geo.calculateBounds();
                            }
                            if(jgeo.fields["ForecastMinute"] == 0){
                                style =  {
                                    pointRadius:2,
                                    fillColor: "rgb(255,134,53)",
                                    strokeColor: "rgb(255,134,53)",
                                    strokeWidth: 2.0
                                };
                            }
                            else if(jgeo.fields["ForecastMinute"] == 30){
                                style =  {
                                    pointRadius:2,
                                    fillColor: "rgb(255,0,0)",
                                    strokeColor: "rgb(255,0,0)",
                                    strokeWidth: 2.0
                                };
                            }
                            else if(jgeo.fields["ForecastMinute"] == 60){
                                style =  {
                                    pointRadius:2,
                                    fillColor: "rgb(3,91,81)",
                                    strokeColor: "rgb(3,91,81)",
                                    strokeWidth: 2.0
                                };
                            }
                            if(geo != null) {
                                var feature = new WeatherMap.Feature.Vector(geo, null, style);
                                features.push(feature);
                            }
                        }
                        t.layerVector.removeAllFeatures();
                        t.layerVector.addFeatures(features);
                    }
                    else{
                        t.layerVector.removeAllFeatures();
                    }
                }
                catch (err)
                {
                    alert(err.description);
                }
                $("#div_progress").css("display", "none");
                recall&&recall();
            },
            error: function (e) {
                $("#div_progress").css("display", "none");
            },
            type:"POST"
        });
    };

    this.addMCS = function(recall, pMap){
        var t = this;
        $("#div_progress_title").html("正在下载数据...");
        $("#div_progress").css("display", "block");
        var url=dataSericeUrl+"services/AWXService/getMCS";
        $.ajax({
            data:{"para":"{element:'"+ t.currentElement + "',level:'"+ t.currentLevel + "',datetime:'"+ t.currentDateTime + "'}"},
            url:url,
            dataType:"json",
            success:function(data){
                try
                {
                    if(typeof(data) != "undefined") {
                        var result = GDYB.FeatureUtilityClass.getRecordsetFromJson(data);
                        var features = [];
                        var len = result.features.length;
                        for (var i = 0; i < len; i++) {
                            var feature = result.features[i];
                            var style = {
                                fill: false,
                                strokeColor: "#ff0000",
                                strokeWidth: 2.0
                            };
                            if(feature.attributes["值"] == 211){
                                style = {
                                    fill: false,
                                    strokeColor: "#0000ff",
                                    strokeWidth: 2.0
                                };
                            }
                            else if(feature.attributes["值"] == 221){
                                style = {
                                    fill: false,
                                    strokeColor: "#00ff00",
                                    strokeWidth: 2.0
                                };
                            }
                            else if(feature.attributes["值"] == 241){
                                style = {
                                    fill: false,
                                    strokeColor: "#ff0000",
                                    strokeWidth: 2.0
                                };
                            }
                            feature.style = style;
                            features.push(feature);
                        }
                        t.layerVector.removeAllFeatures();
                        t.layerVector.addFeatures(features);
                    }
                    else{
                        t.layerVector.removeAllFeatures();
                    }
                }
                catch (err)
                {
                    alert(err.description);
                }
                $("#div_progress").css("display", "none");
                recall&&recall();
            },
            error: function (e) {
                $("#div_progress").css("display", "none");
            },
            type:"POST"
        });
    };

    this.addGrid = function(recall, pMap,showtime){
        var t = this;

        $("#div_progress_title").html("正在下载数据...");
        $("#div_progress").css("display", "block");

        getGrid(function(datasetGrid){
            //if(datasetGrid != null && datasetGrid.grid.length > 0)  //为空也要赋值，清空数据
            {
                t.datasetGrid = datasetGrid;
                if(t.layerFillRangeColor != null){
                    t.layerFillRangeColor.setDatasetGrid(datasetGrid);
                    t.layerFillRangeColor.refresh();
                }
                recall&&recall();
            }
        },null);

        function getGrid(recall){
            var t1 = new Date().getTime();
            var dataparam="";
            var url="";
            if(t.currentDateTime==undefined){
                url=dataSericeUrl+"services/SwanRadarService/getNewGrid";
                dataparam="{element:'"+ t.currentElement + "',level:'"+ t.currentLevel + "'}";
            }
            else{
                url=dataSericeUrl+"services/SwanRadarService/getGrid";
                dataparam="{element:'"+ t.currentElement + "',level:'"+ t.currentLevel + "',datetime:'"+ t.currentDateTime + "'}";
            }
            $.ajax({
                data:{"para":dataparam},
                url:url,
                dataType:"json",
                success:function(data){
                    var datasetGrid = null;
                    try
                    {
                        if(typeof(data) != "undefined")
                        {
                            var dvalues = data.dvalues;
                            if(dvalues != null && dvalues.length > 0)
                            {
                                var bWind = t.currentElement == "swan_trec";
                                var dimensions = bWind? 2 : 1; //维度，风场有两维
                                datasetGrid = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, bWind?2:1);
                                datasetGrid.noDataValue = data.noDataValue;
                                var grid = [];
                                for(var i=0;i<data.rows;i++){
                                    var nIndexLine = data.cols * i * dimensions;
                                    for(var j=0;j<data.cols;j++){
                                        var nIndex = nIndexLine + j * dimensions;
                                        if (bWind){
                                            grid.push(dvalues[nIndex+1]); //风速在前
                                            grid.push(dvalues[nIndex]);   //风向在后
                                        }
                                        else
                                            grid.push(dvalues[nIndex]);
                                    }
                                }
                                datasetGrid.grid = grid;
                            }
                        }
                        else
                        {
                            alertFuc("无数据");
                        }
                    }
                    catch (err)
                    {
                        alert(err.description);
                    }
                    if(showtime!=undefined){
                        $("#"+t.currentElement).remove();
                        var strHtml='<div id="'+t.currentElement+'">'+t.currentElementName+":"+data.nwpmodelTime+'</div>';
                        $("#productTime").append(strHtml);
                    }
                    $("#div_progress").css("display", "none");
                    recall&&recall(datasetGrid);
                },
                error: function (e) {
                    $("#div_progress").css("display", "none");
                },
                type:"POST"
            });
        }
    };
}

