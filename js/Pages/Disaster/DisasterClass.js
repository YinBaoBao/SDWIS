/**
 * Created by xianchao on 2015/12/18.
 */
function DisasterClass() {

    this.strategy = null;
    var counties = [];
    var shanhonggou = [];
    var zhongxiaohe = [];
    var t = this;
    this.stationLayer = [];
    this.strategy = null;
    this.RootContainer = null;
    var mgStations = [];
    var mwsStations = [];
    var extentBounds = null; // 记录上一次关于区域气象站的视野范围
    var featureUtility = new FeatureUtilityClass();
    var countryScale = 5.0e-8;
    var provinceScale = 5.0e-7;
    var disasterDataTypes = [];
    var currentMenu; // 记录当前哪个菜单被选择
    this.highLayer = null;
    this.init = function() {
        initDaisasterTypes();
        initDataLayers();
        weaMap.disaster.getCountyBounds();
        //map.events.on({"zoomend" : zoomend});
        //map.events.on({"moveend" : moveend});
        weaMap.disaster.getDisasterTypes();
        //var height = $("#accordion").css("height");
        //$("#MapDiv").css("height",(parseInt(height)-75)+"px");
    }
    this.clearLayer =function(name){
        if(map.getLayersByName(name).length != 0) {
            //map.getControl(name + "Select").deactivate();
            //map.removeControl(map.getControl(name + "Select"));
            t.stationLayer[name].removeAllFeatures();
            //map.removeLayer(t.stationLayer[name]);
            //t.stationLayer[name] = null;
            //mgStations = null;
        }
    }

    function initDataLayers() {
        // 1. 中小河中气象站点查询结果图层
        var layersArray = ["mwsstation", "mgstation", "t_ShanHongYinHuanDian",
            "t_ZhongXiaoHeYinHuanDian", "t_ZhongXiaoHeYuJingZhiBiao",
            "t_ZhongXiaoHeShuiKuJiBenDiaoCha", "t_ShanHongYuJingZhiBiao",
            "t_ShanHongDiaoCha_ShuiKu", "t_ZhongXiaoHeJiBenQingKuang",
            "t_ZhongXiaoHeLiuYuDiaoCha", "t_ZhongXiaoHeDiFangJiBenXinXi",
            "t_ZhongXiaoHeQiXiangDiaoChao", "t_ZhongXiaoHeShuiWenZhan",
            "t_ZhongXiaoHeHongShuiZaiQing", "t_ShanHongGouDiaoCha",
            "t_ShanHongGouRenKouJingJiDiaoCha", "t_ShanHongDiFangFenDuan",
            "t_ShanHongGouQiXiangZhan", "t_ShanHongGouShuiWenZhan",
            "t_ShanHongGouZaiQingShunShi"];
        for (var i = 0; i < layersArray.length; i++) {
            initItemLayer(layersArray[i]);
            //addPlotLayer(layersArray[i],"YHDName");
        }
        var kaywordResultLayerName = "keyWordsResultLayer";
        initItemLayer(kaywordResultLayerName);
        //2. 行政区划初始化
        t.strategy = new WeatherMap.Strategy.GeoText();
        t.stationLayer["county"] = new WeatherMap.Layer.Vector("county", {strategies: [t.strategy]});
        //设置标签的样式
        t.strategy.style = {
            fontColor: "#FF7F00",
            fontWeight: "",
            fontSize: "12px",
            fill: true,
            fillColor: "rgba(60,60,60,0.8)",
            //fillColor: "#000000",
            fillOpacity: 1,
            stroke: true,
            labelYOffset: -18,
            strokeColor: "#ffffff"
        };
        //map.addLayer(t.stationLayer["county"]);
        //3. 中小河
        t.stationLayer["zhongxiaohe"] = new WeatherMap.Layer.Vector("zhongxiaohe");
        t.stationLayer["zhongxiaohe"].style = {
            fill: true,
            stroke: true,
            fontSize:"6px",
            strokeColor: "#EE6F22",
            fillColor : "#86390B",
            fillOpacity:0.2,
            strokeWidth:0.5
        }
        //map.addLayer(t.stationLayer["zhongxiaohe"]);
        //var selectFeatureZhongXiaoHe = new WeatherMap.Control.SelectFeature(t.stationLayer["zhongxiaohe"],
        //{
        //    callbacks: shanhongzhongxiaoheCallbacks
        //});
        //selectFeatureZhongXiaoHe.id = "zhongxiaoheSelect";
        //map.addControl(selectFeatureZhongXiaoHe);
        //selectFeatureZhongXiaoHe.activate();
        //3. 山洪沟

        t.stationLayer["shanhonggou"] = new WeatherMap.Layer.Vector("shanhonggou");
        t.stationLayer["shanhonggou"].style = {
            fill: true,
            stroke: true,
            fontSize:"6px",
            strokeColor: "#BFA640",
            fillColor : "#37C8B9",
            strokeWidth:0.5
        }
        //map.addLayer(t.stationLayer["shanhonggou"]);
        //var selectFeatureShanHong = new WeatherMap.Control.SelectFeature(t.stationLayer["shanhonggou"],
        //    {
        //        callbacks: shanhongzhongxiaoheCallbacks
        //    });
        //selectFeatureShanHong.id = "shanhonggouSelect";
        //map.addControl(selectFeatureShanHong);
        //selectFeatureShanHong.activate();

        t.RootContainer = new WeatherMap.Layer.Vector.RootContainer("RootContainer");
        t.RootContainer.layers = [t.stationLayer["county"],
            t.stationLayer["zhongxiaohe"], t.stationLayer["shanhonggou"], t.stationLayer["mwsstation"],
            t.stationLayer["mgstation"], t.stationLayer["t_ShanHongYinHuanDian"],
            t.stationLayer["t_ZhongXiaoHeYinHuanDian"], t.stationLayer["t_ZhongXiaoHeYuJingZhiBiao"],
            t.stationLayer["t_ZhongXiaoHeShuiKuJiBenDiaoCha"], t.stationLayer["t_ShanHongYuJingZhiBiao"],
            t.stationLayer["t_ShanHongDiaoCha_ShuiKu"], t.stationLayer["t_ZhongXiaoHeJiBenQingKuang"],
            t.stationLayer["t_ZhongXiaoHeLiuYuDiaoCha"], t.stationLayer["t_ZhongXiaoHeDiFangJiBenXinXi"],
            t.stationLayer["t_ZhongXiaoHeQiXiangDiaoChao"], t.stationLayer["t_ZhongXiaoHeShuiWenZhan"],
            t.stationLayer["t_ZhongXiaoHeHongShuiZaiQing"], t.stationLayer["t_ShanHongGouDiaoCha"],
            t.stationLayer["t_ShanHongGouRenKouJingJiDiaoCha"], t.stationLayer["t_ShanHongDiFangFenDuan"],
            t.stationLayer["t_ShanHongGouQiXiangZhan"], t.stationLayer["t_ShanHongGouShuiWenZhan"],
            t.stationLayer["t_ShanHongGouZaiQingShunShi"], t.stationLayer["keyWordsResultLayer"]];
        map.addLayers(t.RootContainer.layers);
        //map.setLayerIndex(t.stationLayer["shanhonggou"],99);
        shanhonggouLayer = t.RootContainer.layers[2];
        addZhongXiaoHeCallback();
    }

    function addZhongXiaoHeCallback() {
        var selectFeatureZhongXiaoHe = new WeatherMap.Control.SelectFeature(t.RootContainer.layers,
            {
                callbacks: callbacks
            });
        selectFeatureZhongXiaoHe.id = "testSelect";
        map.addControl(selectFeatureZhongXiaoHe);
        selectFeatureZhongXiaoHe.activate();
    }

    function deactivateById(id) {
        map.getControl(id).deactivate();
        map.removeControl(map.getControl(id));
    }
    function addPlotLayer(layerName,field){
        //填值/填图
        t.stationLayer[layerName] = new WeatherMap.Layer.Vector(layerName,{renderers: ["Plot"]});
        t.stationLayer[layerName].renderer.plotWidth = 5;
        t.stationLayer[layerName].renderer.plotHeight = 5;
        //设置统一风格
        t.stationLayer[layerName].style = {
            pointRadius: 1.0
        };
        //设置子项风格
        t.stationLayer[layerName].renderer.styles = [
            {
                field:field,
                type:"label",
                visible:"true",
                offsetX: 0,
                offsetY: 0,
                rotationField:null,
                decimal:1,
                noDataValue:0.0,
                style: {
                    labelAlign:"rb",
                    fontFamily:"Arial",
                    fontColor:"rgb(0, 0, 128)",
                    fontSize:"12px",
                    fill: false,
                    stroke: false
                },
                symbols:null
            }
        ];
    }

    function initItemLayer(layerName, style) {
        t.stationLayer[layerName] = new WeatherMap.Layer.Vector(layerName);
        if(style != null) {
            t.stationLayer[layerName].stype = style;
        }
        //map.addLayer(t.stationLayer[layerName]);
        var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer[layerName],
            {
                callbacks: callbacks
            });
        selectFeature.id = layerName + "Select";
        map.addControl(selectFeature);
        selectFeature.activate();
    }

    function moveend(e) {
        if($("#clearImage").css("display") == "none") {
            refreshStation(e);
            refreshOthers(e);
        }
        //getShanHongGouRelateInfo();
    }
    function zoomend(e) {
        //var scale = map.getScale();
        //alert(scale);
        //refreshStation(e);
        //refreshOthers(e);
        //山洪沟查询
        //getShanHongGouRelateInfo();
    }

    function  initDaisasterTypes() {
        var disasterDataTypeItem1 = {
            tableName:'t_DiZhiZaiHaiHuaPo',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'滑坡点名称', // 气泡弹框的名字
            lableTitle:'HPDName' // 地图上标签的名字
        };
        var disasterDataTypeItem2 = {
            tableName:'t_DiZhiZaiHaiHuaPoFangZhi',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'滑坡点名称', // 气泡弹框的名字
            lableTitle:'HPDName' // 地图上标签的名字
        };
        var disasterDataTypeItem3 = {
            tableName:'t_DiZhiZaiHaiHuaPoYingXiang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'滑坡点名称', // 气泡弹框的名字
            lableTitle:'HPDName' // 地图上标签的名字
        };
        var disasterDataTypeItem4 = {
            tableName:'t_DiZhiZaiHaiJinQiYingXiang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'滑坡点名称', // 气泡弹框的名字
            lableTitle:'HPDName' // 地图上标签的名字
        };
        var disasterDataTypeItem5 = {
            tableName:'t_NiSHiLiuJinQiYingXiang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'泥石流沟名', // 气泡弹框的名字
            lableTitle:'NSLGName' // 地图上标签的名字
        };
        var disasterDataTypeItem6 = {
            tableName:'t_NiShiLiuFangZhiCuoShi',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'泥石流沟名', // 气泡弹框的名字
            lableTitle:'NSLGName' // 地图上标签的名字
        };
        var disasterDataTypeItem7 = {
            tableName:'t_NiShiLiuJiBenQingKuang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'泥石流沟名', // 气泡弹框的名字
            lableTitle:'NSLGName' // 地图上标签的名字
        };
        var disasterDataTypeItem8 = {
            tableName:'t_NiShiLiuQianZaiYingXiang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'泥石流沟名', // 气泡弹框的名字
            lableTitle:'NSLGName' // 地图上标签的名字
        };
        var disasterDataTypeItem9 = {
            tableName:'t_ShanHongDiaoCha_ShuiKu',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'水库名称', // 气泡弹框的名字
            lableTitle:'SKName' // 地图上标签的名字
        };
        var disasterDataTypeItem10 = {
            tableName:'t_ShanHongGouDiaoCha_HengDuanMian',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'分段主沟名称', // 气泡弹框的名字
            lableTitle:'FDZGDName' // 地图上标签的名字
        };
        var disasterDataTypeItem11 = {
            tableName:'t_ShanHongYinHuanDian',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'隐患点名称', // 气泡弹框的名字
            lableTitle:'YHDName' // 地图上标签的名字
        };
        var disasterDataTypeItem12 = {
            tableName:'t_ZhongXiaoHeJiBenQingKuang',
            longitude:'HYlongitude',
            latitude: 'HYlatitude',
            infoTitle:'中小河流名称', // 气泡弹框的名字
            lableTitle:'ZXHLName' // 地图上标签的名字
        };
        var disasterDataTypeItem13 = {
            tableName:'t_ZhongXiaoHeShuiKuJiBenDiaoCha',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'水库名称', // 气泡弹框的名字
            lableTitle:'SKName' // 地图上标签的名字
        };
        var disasterDataTypeItem14 = {
            tableName:'t_ZhongXiaoHeYinHuanDian',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'隐患点名称', // 气泡弹框的名字
            lableTitle:'YHDName' // 地图上标签的名字 StationName
        };
        var disasterDataTypeItem15 = {
            tableName:'t_ZhongXiaoHeDiFangJiBenXinXi',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'段名', // 气泡弹框的名字
            lableTitle:'DName' // 地图上标签的名字
        };
        var disasterDataTypeItem16 = {
            tableName:'t_ZhongXiaoHeJiBenQingKuang_HeDaoBiJiang',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'河道比降段名', // 气泡弹框的名字
            lableTitle:'HDBJDName' // 地图上标签的名字
        };
        var disasterDataTypeItem17 = {
            tableName:'t_ZhongXiaoHeJiBenQingKuang_HeDaoCaoLv',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'河道糙率段名', // 气泡弹框的名字
            lableTitle:'HDCLDName' // 地图上标签的名字
        };
        var disasterDataTypeItem18 = {
            tableName:'t_ZhongXiaoHeJiBenQingKuang_HengDuanMian',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'纵横断面编号', // 气泡弹框的名字
            lableTitle:'ZHDMMBH' // 地图上标签的名字
        };
        var disasterDataTypeItem19 = {
            tableName:'t_ZhongXiaoHeYuJingZhiBiao',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'中小河名', // 气泡弹框的名字
            lableTitle:'YJDName' // 地图上标签的名字
        };
        var disasterDataTypeItem20 = {
            tableName:'t_ShanHongDiFangFenDuan',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'分段主沟名称', // 气泡弹框的名字
            lableTitle:'FDZGDName' // 地图上标签的名字
        };
        var disasterDataTypeItem21 = {
            tableName:'t_ShanHongGouDiaoCha',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'分段主沟名称', // 气泡弹框的名字
            lableTitle:'FDZGDName' // 地图上标签的名字
        };
        var disasterDataTypeItem22 = {
            tableName:'t_ShanHongGouZaiQingShunShi',
            longitude:'longitude',
            latitude: 'latitude',
            infoTitle:'采集点名称', // 气泡弹框的名字
            lableTitle:'CJDName' // 地图上标签的名字
        };
        disasterDataTypes.push(disasterDataTypeItem1);
        disasterDataTypes.push(disasterDataTypeItem2);
        disasterDataTypes.push(disasterDataTypeItem3);
        disasterDataTypes.push(disasterDataTypeItem4);
        disasterDataTypes.push(disasterDataTypeItem5);
        disasterDataTypes.push(disasterDataTypeItem6);
        disasterDataTypes.push(disasterDataTypeItem7);
        disasterDataTypes.push(disasterDataTypeItem9);
        disasterDataTypes.push(disasterDataTypeItem8);
        disasterDataTypes.push(disasterDataTypeItem10);
        disasterDataTypes.push(disasterDataTypeItem11);
        disasterDataTypes.push(disasterDataTypeItem12);
        disasterDataTypes.push(disasterDataTypeItem13);
        disasterDataTypes.push(disasterDataTypeItem14);
        disasterDataTypes.push(disasterDataTypeItem15);
        disasterDataTypes.push(disasterDataTypeItem16);
        disasterDataTypes.push(disasterDataTypeItem17);
        disasterDataTypes.push(disasterDataTypeItem18);
        disasterDataTypes.push(disasterDataTypeItem19);
        disasterDataTypes.push(disasterDataTypeItem20);
        disasterDataTypes.push(disasterDataTypeItem21);
        disasterDataTypes.push(disasterDataTypeItem22);
    }
    /**
     * 查询山洪沟相关信息
     */
    function getShanHongGouRelateInfo() {
        if(t.stationLayer["shanhonggou"] == null) {
            return;
        }
        var scale = map.getScale();
        var extent = map.getExtent();
        if(scale >= 0.000006) {
            // 山洪隐患点
            weaMap.disaster.queryTable("t_ShanHongYinHuanDian", "point", extent);
        } else {
            map.getControl("t_ShanHongYinHuanDianSelect").deactivate();
            //map.removeControl(map.getControl("t_ShanHongYinHuanDianSelect"));
            //map.removeLayer(t.stationLayer["t_ShanHongYinHuanDian"]);
            //t.stationLayer["t_ShanHongYinHuanDian"] = null;
            mgStations = null;
            //map.removeLayer(t.stationLayer["t_ShanHongYinHuanDian"]);
        }
    }

    /**
     * 通用属性查询接口
     */
    this.queryTable = function(tableName, type, extent) {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            data: {'param': '{"Function":"queryDisasterByBounds","CustomParams":{"tableName"="' + tableName +
            '","startLongitude"=' + extent.left + ',"endLongitude"=' + extent.right +
            ',"startLatitude"=' + extent.bottom + ',"endLatitude"=' + extent.top + '},"Type":2}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    queryTableSuccess(data, tableName, type);
                }
            },
            error: function () {
                alert("获取灾害信息失败");
            }
        });
    }

    function queryTableSuccess(data, tableName, type) {
        if(t.stationLayer[tableName] == null) {
            t.stationLayer[tableName] = new WeatherMap.Layer.Vector(tableName, {renderers: ["Canvas"]});
            map.addLayer(t.stationLayer[tableName]);
            var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer[tableName],
                {
                    callbacks: callbacks
                });
            selectFeature.id = tableName + "Select";
            map.addControl(selectFeature);
            selectFeature.activate();
        }
        var tableDatas = jQuery.parseJSON(data);
        if(type == "point") {
            t.drawPointData(tableDatas, tableName);
        } else if(type == "line") {
            t.drawLineData(tableDatas, tableName);
        }
    }

    this.drawPointData = function(tableDatas, tablename) {
       /* if(t.stationLayer[tablename] != null) {
            // 清空图层信息
            map.removeLayer(t.stationLayer[tablename]);
            map.getControl(tablename + "Select").deactivate();
            map.removeControl(map.getControl(tablename + "Select"));
        }

        t.stationLayer[tablename] = new WeatherMap.Layer.Vector(tableName, {renderers: ["Canvas"]});
        map.addLayer(t.stationLayer[tablename]);
        var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer[tablename],
            {
                callbacks: callbacks
            });
        selectFeature.id = tablename + "Select";
        map.addControl(selectFeature);
        selectFeature.activate();*/
        var vectorFeas = [];
        var fillColor ="#ff0000";
        for (var i = 0; i < tableDatas.length; i++) {
            var feature = new Object();
            for(var k=0; k < disasterDataTypes.length; k++) {
                var itemDisasterDataType = disasterDataTypes[k];
                var tempTbName = itemDisasterDataType.tableName;
                if(tempTbName == tablename) {
                    if(tableDatas[i][itemDisasterDataType.lableTitle] != null) {
                        feature.name = tableDatas[i][itemDisasterDataType.lableTitle];
                    }
                }
            }
            //feature.name = tableDatas[i].name;
            feature.lon = tableDatas[i].longitude;
            feature.lat = tableDatas[i].latitude;
            feature.type = "pointStation";
            feature.tableName = tablename;
            feature.id = tableDatas[i].id;
            if(tablename == 't_NiShiLiuQianZaiYingXiang') {
                feature.泥石流沟名 = tableDatas[i].NSLGName;
                feature.泥石流沟代码 = tableDatas[i].NSLGCode;
                feature.行政区位 = tableDatas[i].XZQW;
                feature.行政区位编码 = tableDatas[i].XZQWCode;
                feature.海拔高度 = tableDatas[i].Height;
                feature.影响面积 = tableDatas[i].YXMJ;
                feature.影响户数 = tableDatas[i].YXHS;
                feature.影响人口 = tableDatas[i].YXRK;
                feature.影响资产 = tableDatas[i].YXZC;
                feature.易发程度 = tableDatas[i].YFCD;
                feature.泥石流类型 = tableDatas[i].NSLLX;
                feature.发展阶段 = tableDatas[i].FZJD;

            } else if(tablename == 't_DiZhiZaiHaiHuaPoYingXiang') {
                feature.滑坡点名称 = tableDatas[i].HPDName;
                feature.滑坡点代码 = tableDatas[i].HPDCode;
                feature.行政区位编码 = tableDatas[i].XZQWCode;
                feature.海拔高度 = tableDatas[i].Height;
                feature.影响面积 = tableDatas[i].YXMJ;
                feature.影响户数 = tableDatas[i].YXHS;
                feature.影响人口 = tableDatas[i].YXRK;
                feature.影响资产 = tableDatas[i].YXZC;
                feature.目前稳定状况 = tableDatas[i].MQWDZK;

            }
            else if(tablename == 't_ShanHongYinHuanDian') {
                feature.YHDName = tableDatas[i].YHDName;
            }
            else if(tablename == 't_ShanHongDiaoCha_ShuiKu'||tablename == 't_ZhongXiaoHeShuiKuJiBenDiaoCha') {
                fillColor = "#000079"; //蓝色
            }
            //else if(tablename == 't_ShanHongYinHuanDian') {
            //    fillColor = "##F75000"; //橙色..
            //}

            var point = new WeatherMap.Geometry.Point(tableDatas[i].longitude, tableDatas[i].latitude);
            var pointVector = new WeatherMap.Feature.Vector(point, feature);

            pointVector.style = {
                fillColor: fillColor,
                fillOpacity: 0.8,
                strokeOpacity: 0.5,
                //strokeColor:"#ff0000",
                fontColor: "#ffffff",
                fontOpacity: "1",
                fontFamily: "隶书",
                fontSize: "1em",
                strokeColor: "#ffff00",
                pointRadius:3
                //externalGraphic:"images/station/MWSStation.ico"
            };

            vectorFeas.push(pointVector);
        }
        t.stationLayer[tablename].removeAllFeatures();
        t.stationLayer[tablename].addFeatures(vectorFeas);
    }

    this.drawLineData = function(tableDatas, tablename) {
        //if(t.stationLayer[tablename] != null) {
        //    // 清空图层信息
        //    map.removeLayer(t.stationLayer[tablename]);
        //    map.getControl(tablename + "Select").deactivate();
        //    map.removeControl(map.getControl(tablename + "Select"));
        //}
        //
        //t.stationLayer[tablename] = new WeatherMap.Layer.Vector(tableName, {renderers: ["Canvas"]});
        //map.addLayer(t.stationLayer[tablename]);
        //var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer[tablename],
        //    {
        //        callbacks: callbacks
        //    });
        //selectFeature.id = tablename + "Select";
        //map.addControl(selectFeature);
        //selectFeature.activate();
        var labelFeas = [];
        var vectorFeas = [];
        for(var i=0;i<tableDatas.length;i++){
            var feature = tableDatas[i];
            var attributeName = '';
            var flag = false;
            for(var k=0; k < disasterDataTypes.length; k++) {
                var itemDisasterDataType = disasterDataTypes[k];
                var itemTableName = itemDisasterDataType.tableName;
                var lon, lat;
                if(itemTableName == tablename) {
                    attributeName = itemDisasterDataType.lableTitle;
                    lon = itemDisasterDataType.longitude;
                    lat = itemDisasterDataType.latitude;
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                attributeName = 'StationName';
                lon = 'longitude';
                lat = 'latitude';
            }
            var textStr = judgeDate(feature[attributeName]);
            if(textStr.length>6){
                textStr = textStr.substr(0,textStr.length/2)+"\n"+textStr.substr(textStr.length/2);
            }
            var label = new WeatherMap.Geometry.GeoText((feature.StartLongitude + feature.EndLongitude) / 2,
                (feature.StartLatitude + feature.EndLatitude) / 2, textStr);
            var pointList = [];
            var startPoint = new WeatherMap.Geometry.Point(feature.StartLongitude, feature.StartLatitude);
            var endPoint = new WeatherMap.Geometry.Point(feature.EndLongitude, feature.EndLatitude);
            pointList.push(startPoint);
            pointList.push(endPoint);
            var line = new WeatherMap.Geometry.LineString(pointList);

            var featureCopy = [];
            for(var j=0; j<cols.length; j++) {
                for(var attName in feature) {
                    if(attName == cols[j].name) {
                        featureCopy[cols[j].title] = feature[attName];
                    }
                }
            }
            featureCopy.type = 'DisasterLine';
            featureCopy.id = feature.id;
            featureCopy.tableName = tablename;
            var lineVector = new WeatherMap.Feature.Vector(line, featureCopy);
            lineVector.style = {
                fillColor: "#F9A01A",
                strokeColor: "red",
                pointRadius: 4,
                strokeWidth: 2
            };
            vectorFeas.push(lineVector);
            labelFeas.push(new WeatherMap.Feature.Vector(label, featureCopy));
        }
        t.stationLayer[tablename].addFeatures(labelFeas);
        t.stationLayer[tablename].addFeatures(vectorFeas);
    }

    /**
     * 刷新隐患点，水库等信息。
     * @param e
     */
    function refreshOthers(e) {
        if("山洪沟" != currentMenu && "中小河" != currentMenu) {
            return;
        }
        var scale = map.getScale();
        if(scale >= 0.0000017338541055125438) {
            if("中小河" == currentMenu){
                var extent = map.getExtent();
                var flag = false;
                if(extentBounds  == null) {
                    extentBounds = extent;
                    extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                    extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                    extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                    extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                    flag = true;
                } else {
                    if(extentBounds.left <= extent.left &&
                        extentBounds.right >= extent.right &&
                        extentBounds.top >= extent.top &&
                        extentBounds.bottom <= extent.bottom) {
                        if(t.stationLayer["t_ZhongXiaoHeYinHuanDian"] == null) {
                            weaMap.disaster.queryTable("t_ZhongXiaoHeYinHuanDian", "point", extentBounds);
                        }
                        if(t.stationLayer["t_ZhongXiaoHeYuJingZhiBiao"] == null) {
                            weaMap.disaster.queryTable("t_ZhongXiaoHeYuJingZhiBiao", "point", extentBounds);
                        }
                        if(t.stationLayer["t_ZhongXiaoHeShuiKuJiBenDiaoCha"] == null) {
                            weaMap.disaster.queryTable("t_ZhongXiaoHeShuiKuJiBenDiaoCha", "point", extentBounds);
                        }
                    } else {
                        extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                        extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                        extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                        extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                        flag = true;
                    }
                }
                if(flag) {
                    weaMap.disaster.queryTable("t_ZhongXiaoHeYinHuanDian", "point", extentBounds);
                    weaMap.disaster.queryTable("t_ZhongXiaoHeYuJingZhiBiao", "point", extentBounds);
                    weaMap.disaster.queryTable("t_ZhongXiaoHeShuiKuJiBenDiaoCha", "point", extentBounds);
                }

            } else if("山洪沟" == currentMenu) {
                var extent = map.getExtent();
                var flag = false;
                if(extentBounds  == null) {
                    extentBounds = extent;
                    extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                    extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                    extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                    extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                    flag = true;
                } else {
                    if(extentBounds.left <= extent.left &&
                        extentBounds.right >= extent.right &&
                        extentBounds.top >= extent.top &&
                        extentBounds.bottom <= extent.bottom) {
                        if(t.stationLayer["t_ShanHongYinHuanDian"] == null) {
                            weaMap.disaster.queryTable("t_ShanHongYinHuanDian", "point", extentBounds);
                        }
                        if(t.stationLayer["t_ShanHongYuJingZhiBiao"] == null) {
                            weaMap.disaster.queryTable("t_ShanHongYuJingZhiBiao", "point", extentBounds);
                        }
                        if(t.stationLayer["t_ShanHongDiaoCha_ShuiKu"] == null) {
                            weaMap.disaster.queryTable("t_ShanHongDiaoCha_ShuiKu", "point", extentBounds);
                        }
                    } else {
                        extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                        extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                        extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                        extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                        flag = true;
                    }
                }
                if(flag) {
                    weaMap.disaster.queryTable("t_ShanHongYinHuanDian", "point", extentBounds);
                    weaMap.disaster.queryTable("t_ShanHongYuJingZhiBiao", "point", extentBounds);
                    weaMap.disaster.queryTable("t_ShanHongDiaoCha_ShuiKu", "point", extentBounds);
                }
            }
        } else if($('#disasterTable').mmGrid().rows().length == 0){
            //if(!$("#t_ZhongXiaoHeYinHuanDian #t_ZhongXiaoHeYinHuanDian").hasClass("active")) {
            //    removeLayer("t_ZhongXiaoHeYinHuanDian");
            //}
            if(!$("#t_ZhongXiaoHeYinHuanDian #t_ZhongXiaoHeYuJingZhiBiao").hasClass("active")) {
                removeLayer("t_ZhongXiaoHeYuJingZhiBiao");
            }
            if(!$("#t_ZhongXiaoHeYinHuanDian #t_ZhongXiaoHeShuiKuJiBenDiaoCha").hasClass("active")) {
                removeLayer("t_ZhongXiaoHeShuiKuJiBenDiaoCha");
            }
            //if(!$("#t_ShanHongYinHuanDian #t_ShanHongYinHuanDian").hasClass("active")) {
            //    removeLayer("t_ShanHongYinHuanDian");
            //}
            //if(!$("#t_ShanHongYinHuanDian #t_ShanHongYuJingZhiBiao").hasClass("active")) {
            //    removeLayer("t_ShanHongYuJingZhiBiao");
            //}
            if(!$("#t_ShanHongYinHuanDian #t_ShanHongDiaoCha_ShuiKu").hasClass("active")) {
                removeLayer("t_ShanHongDiaoCha_ShuiKu");
            }
            removeLayer("t_ShanHongYinHuanDian");
            removeLayer("t_ShanHongYuJingZhiBiao");
            removeLayer("t_ZhongXiaoHeYinHuanDian");
        }
        //var children = $("#t_ZhongXiaoHeYinHuanDian").children();
        //for(var i=0; i<children.length; i++) {
        //    var item = children.get(i);
        //    var id = item.id;
        //    if("t_ZhongXiaoHeYinHuanDian" == id || "t_ZhongXiaoHeYuJingZhiBiao" == id || "t_ZhongXiaoHeShuiKuJiBenDiaoCha" == id) {
        //
        //    }
        //}
    }

    function refreshStation(e) {
        //判断当前比例尺，到县一级的时候，显示气象站、水文站等。
        if("山洪沟" != currentMenu && "中小河" != currentMenu) {
            return;
        }
        var scale = map.getScale();
        if(scale >= 8.669270527562719e-7) {
            //县一级。
            if(t.stationLayer["mgstation"] == null) {
                weaMap.disaster.getMeteoStation();
            }
        } else {
            if(!$("#t_ZhongXiaoHeYinHuanDian #t_MeteoStation").hasClass("active") &&
               !$("#t_ShanHongYinHuanDian #t_MeteoStation").hasClass("active")) {
                // 删除图层
                if(map.getLayersByName("mgstation").length != 0) {
                    //map.getControl("mgstationSelect").deactivate();
                    //map.removeControl(map.getControl("mgstationSelect"));
                    //map.removeLayer(t.stationLayer["mgstation"]);
                    //t.stationLayer["mgstation"] = null;
                    t.stationLayer["mgstation"].removeAllFeatures();
                    mgStations = null;

                }
            }
        }
        if(scale >= 0.0000017338541055125438 || $("#t_ZhongXiaoHeYinHuanDian #t_MWSStation").hasClass("active")
            || $("#t_ShanHongYinHuanDian #t_MWSStation").hasClass("active")) {
            //区域站
            //if(t.stationLayer["mwsstation"] == null) {
                var extent = map.getExtent();
                if(extentBounds  == null){
                    extentBounds = extent;
                    extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                    extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                    extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                    extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                    weaMap.disaster.getMWSStation(extentBounds);
                } else {
                    if(extentBounds.left <= extent.left &&
                    extentBounds.right >= extent.right &&
                    extentBounds.top >= extent.top &&
                    extentBounds.bottom <= extent.bottom) {
                        if(map.getControl("mwsstationSelect") != null) {
                            map.getControl("mwsstationSelect").activate();
                        }
                        return;
                    } else {
                        // 清理
                        if(map.getControl("mwsstationSelect") != null) {
                            map.getControl("mwsstationSelect").deactivate();
                            map.removeControl(map.getControl("mgstationSelect"));
                        }
                        map.removeLayer(t.stationLayer["mwsstation"]);
                        t.stationLayer["mwsstation"] = null;
                        mwsStations = null;
                        //查询
                        extentBounds.left = extent.left - (extent.right - extent.left) / 2;
                        extentBounds.right = extent.right + (extent.right - extent.left) / 2;
                        extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
                        extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
                        weaMap.disaster.getMWSStation(extentBounds);
                    }
                }

            //}
        } else {
            if(!$("#t_ZhongXiaoHeYinHuanDian #t_MWSStation").hasClass("active") &&
                !$("#t_ShanHongYinHuanDian #t_MWSStation").hasClass("active")) {
                // 删除图层
                if(map.getLayersByName("mwsstation").length != 0) {
                    //map.getControl("mwsstationSelect").deactivate();
                    //map.removeControl(map.getControl("mwsstationSelect"));
                    //map.removeLayer(t.stationLayer["mwsstation"]);
                    //t.stationLayer["mwsstation"] = null;
                    t.stationLayer["mwsstation"].removeAllFeatures();
                    mwsStations = null;
                    extentBounds = null;
                }
            }
        }
    }

    /**
     * 查询气象站
     */
    this.getMWSStation = function(extent) {
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/getMWSStation',
            data: {'para': '{"bounds":"' + extent.toString() + '"}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    getMWSStationSuccess(data);
                }
            },
            error: function () {
                //
            }
        });
    }

    function getMWSStationSuccess(data) {
        if(t.stationLayer["mwsstation"] == null) {
            t.stationLayer["mwsstation"] = new WeatherMap.Layer.Vector("mwsstation", {renderers: ["Canvas"]});
            map.addLayer(t.stationLayer["mwsstation"]);
            var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer["mwsstation"],
                {
                    callbacks: callbacks
                });
            selectFeature.id = "mwsstationSelect";
            map.addControl(selectFeature);
            selectFeature.activate();
        }
        mwsStations = jQuery.parseJSON(data);
        drawMWSStations();
    }

    /**
     * 查询气象站
     */
    this.getMeteoStation = function() {
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/getMGStation',
            data: {'param': ''},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    getMGStationSuccess(data);
                }
            },
            error: function () {
                //
            }
        });
    }

    function getMGStationSuccess(data) {
        if(t.stationLayer["mgstation"] == null) {
            t.stationLayer["mgstation"] = new WeatherMap.Layer.Vector("mgstation", {renderers: ["Canvas"]});
            map.addLayer(t.stationLayer["mgstation"]);
            var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer["mgstation"],
                {
                    callbacks: callbacks
                });
            selectFeature.id = "mgstationSelect";
            map.addControl(selectFeature);
            selectFeature.activate();
        }
        mgStations = jQuery.parseJSON(data);
        drawMGStations();
    }

    function drawMWSStations() {
        var vectorFeas = [];
        for (var i = 0; i < mwsStations.length; i++) {
            var feature = new Object();
            feature.name = mwsStations[i].name;
            feature.lon = mwsStations[i].x;
            feature.lat = mwsStations[i].y;
            feature.type = "mwsstation";
            var point = new WeatherMap.Geometry.Point(mwsStations[i].x, mwsStations[i].y);
            var pointVector = new WeatherMap.Feature.Vector(point, feature);
            pointVector.style = {
                fillColor: "#ff8000",
                fillOpacity: 0.8,
                strokeOpacity: 0.5,
                strokeColor:"#ff0000",
                fontColor: "#ffffff",
                fontOpacity: "1",
                fontFamily: "隶书",
                fontSize: "1em",
                pointRadius:3
                //strokeColor: "#000000",
                //graphicWidth:20,
                //graphicHeight:20,
                //externalGraphic:"images/station/MWSStation.ico"
            };
            vectorFeas.push(pointVector);
        }
        t.stationLayer["mwsstation"].addFeatures(vectorFeas);
    }

    function drawMGStations() {
        var vectorFeas = [];
        for (var i = 0; i < mgStations.length; i++) {
            var feature = new Object();
            feature.name = mgStations[i].name;
            feature.lon = mgStations[i].x;
            feature.lat = mgStations[i].y;
            feature.type = "mgstation";
            var point = new WeatherMap.Geometry.Point(mgStations[i].x, mgStations[i].y);
            var pointVector = new WeatherMap.Feature.Vector(point, feature);
            pointVector.style = {
                fillColor: "#ff8000",
                fillOpacity: 0.8,
                strokeOpacity: 0.5,
                strokeColor:"#ff0000",
                fontColor: "#ffffff",
                fontOpacity: "1",
                fontFamily: "隶书",
                fontSize: "1em",
                //strokeColor: "#000000",
                pointRadius:5,
                //externalGraphic:"images/station/MGStation.ico"
            };
            vectorFeas.push(pointVector);
        }
        t.stationLayer["mgstation"].addFeatures(vectorFeas);
    }

    /**
     * 灾情相关
     */
    this.getDisasterTypes = function() {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            data: {'param': '{"Function":"getDisasterTypes","CustomParams":{},"Type":2}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    getDisasterTypesSuccess(data);
                }
            },
            error: function () {
                //
            }
        });
    }

    function getDisasterTypesSuccess(data) {
        //var list = jQuery.parseJSON(data);
        var list = initMenu();
        var zhLevels = new Array();
        var tempLevel = "";
        var disasterContent = '';
        for(var i=0; i<list.length; i++) {
            if (tempLevel != list[i].ZHLevel) {
                tempLevel = list[i].ZHLevel;
                if(disasterContent != '' || i == list.length - 1) {
                    disasterContent += "</div>"
                }
                disasterContent += '<div class="dis_menu_head" id="'+list[i].ZHLevel+'">'+list[i].ZHLevel+'</div>';
                disasterContent += '<div style="display:none" id="'+list[i].EnName+'" class="dis_menu_body">';
                //if(i==0){
                //    disasterContent += '<div style="display:block" id="'+list[i].EnName+'" class="dis_menu_body">';
                //}
                //else{
                //    disasterContent += '<div style="display:none" id="'+list[i].EnName+'" class="dis_menu_body">';
                //}
            }
            disasterContent += '<a class="dis_menu_body_item" href="#" enname="' + list[i].EnName + '" id ="' + list[i].EnName + '">' + list[i].ZHName + '</a>';
        }
        $("#leftInfoPanel").append(disasterContent);
        //添加统计的相关菜单
        var zhongxiaoheTongji = '<div href="#" id="zhongxiaohexiantongji"><span style="padding-left: 38px;display: block;border-bottom:1px solid #e1e1e1; cursor:pointer">按县统计</span>';
        zhongxiaoheTongji += '<a href="#" id="zhongxiaohexiantongjizaiqing" style="display: none">灾情统计</a>';
        zhongxiaoheTongji += '<a href="#" id="zhongxiaohexiantongjiyinhuandian" style="display: none">隐患点信息统计</a>';
        zhongxiaoheTongji += '<a href="#" id="zhongxiaohexiantongjishuiku" style="display: none">水库信息统计</a>';
        zhongxiaoheTongji += '<a href="#" id="zhongxiaohexiantongjixingzhengcun" style="display: none">行政村信息统计</a>';
        zhongxiaoheTongji += '<a href="#" id="zhongxiaohexiantongjitudi" style="display: none">土地利用情况统计</a>';
        zhongxiaoheTongji += '</div>';
        $("#t_ZhongXiaoHeYinHuanDian").append(zhongxiaoheTongji);

        var shanhonggouTongji = '<div href="#" id="shanhonggoutongji"><span style="padding-left: 38px;display: block;border-bottom:1px solid #e1e1e1;cursor:pointer ">按县统计</span>';
        shanhonggouTongji += '<a href="#" id="shanhonggouxiantongjizaiqing" style="display: none">灾情统计</a>';
        shanhonggouTongji += '<a href="#" id="shanhonggouxiantongjiyinhuandian" style="display: none">隐患点信息统计</a>';
        shanhonggouTongji += '<a href="#" id="shanhonggouxiantongjishuiku" style="display: none">水库信息统计</a>';
        shanhonggouTongji += '<a href="#" id="shanhonggouxiantongjixingzhengcun" style="display: none">行政村信息统计</a>';
        shanhonggouTongji += '<a href="#" id="shanhonggouxiantongjitudi" style="display: none">土地利用情况统计</a>';
        shanhonggouTongji += '</div>';
        $("#t_ShanHongYinHuanDian").append(shanhonggouTongji);

        var dizhizaihaiTongji = '<div href="#" id="dizhizaihaitongji"><span style="padding-left: 38px;display: block;border-bottom:1px solid #e1e1e1;cursor:pointer ">隐患点统计</span>';
        dizhizaihaiTongji += '<a href="#" id="dizhizaihaiyinhuandiangeshu" style="display: none">按县统计</a>';
        dizhizaihaiTongji += '<a href="#" id="yinhuandianbyshanhonggou" style="display: none">按山洪沟统计</a>';

        $("#t_DiZhiZaiHaiHuaPoYingXiang").append(dizhizaihaiTongji);

        var nishiliuTongji = '<div href="#" id="nishiliutongji"><span style="padding-left: 38px;display: block;border-bottom:1px solid #e1e1e1;cursor:pointer ">隐患点统计</span>';
        nishiliuTongji += '<a href="#" id="nishiliuyinhuandiangeshu" style="display: none">按县统计</a>';
        nishiliuTongji += '<a href="#" id="yinhuandianbyzhongxiaohe" style="display: none">按流域统计</a>';
        $("#t_NiShiLiuQianZaiYingXiang").append(nishiliuTongji);

        $("#leftInfoPanel div.dis_menu_head").click(function(){
            if($(this).hasClass("dis_current")) {
                $(this).removeClass("dis_current").next("div.dis_menu_body").slideToggle(300).siblings("div.dis_menu_body").slideUp("slow");
            } else {
                $(this).addClass("dis_current").next("div.dis_menu_body").slideToggle(300).siblings("div.dis_menu_body").slideUp("slow");
                var childrenItems = $(this).next("div.dis_menu_body").siblings("div.dis_menu_body").children();
                for(var i=0; i<childrenItems.length; i++) {
                    var item = childrenItems[i];
                    clearLayer(item.id);
                }
            }

            $(this).siblings().removeClass("dis_current");
            var id = $(this).attr("id");
            currentMenu = id;
            /*var disasterItemCSS = $(this).parent().find(".disasterItemClass").css("display");
            $(".disasterItemClass").css("display","none");
            if(disasterItemCSS == 'none') {
                $(this).parent().find(".disasterItemClass").css("display", "block");
            } else {
                $(this).parent().find(".disasterItemClass").css("display", "none");
            }*/
            var list = $(".active");// $($(".active")[2]).parent().find(".disasterTitle").attr("id")==$(this).attr("id")
            if(list.length != 0&&($(list[0]).parent().attr("id")!=$(this).next().attr("id"))){
                $(".active").css("background-color","");
                $(".active").removeClass("active");
            }
            if($(this).hasClass("dis_current")) {
                if("山洪沟" == id) {
                    // 清除中小河
                    clearLayer("zhongxiaohe");
                    weaMap.disaster.getShanHongGou();
                } else if("中小河" == id) {
                    // 清除山洪沟
                    clearLayer("shanhonggou");
                    weaMap.disaster.getZhongXiaoHe();
                } else {
                    clearLayer("zhongxiaohe");
                    clearLayer("shanhonggou");
                }
                //清除高亮图层或关键字查询的图层
                //this.clearKeyWordQueryResult();
            }
        });
        $(".dis_menu_body div").click(function() {
            if( $(this).find("a").css("display") == 'none') {
                $(this).find("a").css("display", "block");
            } else {
                $(this).find("a").css("display", "none");
            }

        });

        $(".dis_menu_body .dis_menu_body_item").click(function(){
            var id = $(this).attr("id");
            if($(this).hasClass("active")){
                //添加中小河和山洪沟的事件响应
                //addZhongXiaoHeCallback();
                $(this).removeClass("active");
                $(this).css("background-color","");
                if(id == 't_MeteoStation') {
                    removeLayer("mgstation");
                }
                if(id == 't_MWSStation') {
                    removeLayer("mwsstation");
                    extentBounds = null;
                } else if(
                    id == 't_ZhongXiaoHeYinHuanDian' ||
                    id == 't_ShanHongYinHuanDian' ||
                    id == 't_ShanHongDiaoCha_ShuiKu' ||
                    id == 't_ZhongXiaoHeYuJingZhiBiao' ||
                    id == 't_ZhongXiaoHeShuiKuJiBenDiaoCha' ||
                    id == 't_NiSHiLiuJinQiYingXiang' ||
                    id == 't_NiShiLiuFangZhiCuoShi' ||
                    id == 't_NiShiLiuJiBenQingKuang' ||
                    id == 't_NiShiLiuQianZaiYingXiang') {
                    removeLayer(id)
                } else if(id == 't_DiZhiZaiHaiHuaPoYingXiang' ||
                    //id == 't_ZhongXiaoHeYinHuanDian' ||
                    //id == 't_ShanHongYinHuanDian' ||
                    id == 't_ShanHongYuJingZhiBiao') {
                    // 清除热力图
                    clearHeatData();
                }
            }
            else{
                $(this).addClass("active");
                $(this).css("background-color","#92D3E6");
                //使山洪沟和中小河图层停止事件响应
                //deactivateById("zhongxiaoheSelect");
                if(id == 't_MeteoStation') {
                    weaMap.disaster.getMeteoStation();
                } else if(id == 't_MWSStation') {
                    getExtent();
                    weaMap.disaster.getMWSStation(extentBounds);
                } else if(
                    //id == 't_ShanHongYuJingZhiBiao' ||
                    id == 't_ShanHongDiaoCha_ShuiKu' ||
                    id == 't_ShanHongYinHuanDian' ||
                    id == 't_ZhongXiaoHeYinHuanDian' ||
                    id == 't_ZhongXiaoHeYuJingZhiBiao' ||
                    id == 't_ZhongXiaoHeShuiKuJiBenDiaoCha' ||
                    id == 't_NiSHiLiuJinQiYingXiang' ||
                    id == 't_NiShiLiuFangZhiCuoShi' ||
                    id == 't_NiShiLiuJiBenQingKuang' ||
                    id == 't_NiShiLiuQianZaiYingXiang') {
                    getExtent();
                    weaMap.disaster.queryTable(id, "point", extentBounds);
                } else if(id == 't_DiZhiZaiHaiHuaPoYingXiang') {
                    weaMap.disaster.queryHeatData("statisticdizhizaihaiyinhuandianbycounty-heat", 100);
                } else if(id == 't_ZhongXiaoHeYinHuanDian') {
                    //热力图
                    //weaMap.disaster.queryHeatData("statisticyinhuandianbycounty-heat", 100);
                } else if(id == 't_ShanHongYinHuanDian') {
                    //weaMap.disaster.queryHeatData("statisticyinhuandianbyshanhongou-heat", 100);
                } else if (id == 't_ShanHongYuJingZhiBiao') {
                    weaMap.disaster.queryHeatData("statisticyujingdianbyshanhongou-heat", 50);
                }
            }
        });

        $(".dis_menu_body div a").click(function(event){
            event.stopPropagation();
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(this).css("background-color","");
                cleanTable();
            } else {
                $(this).siblings().removeClass("active");
                $(this).siblings().css("background-color","");
                $(this).addClass("active");
                $(this).css("background-color","#92D3E6");
                var id = $(this).attr("id");
                var method = '';
                if("zhongxiaohexiantongjizaiqing" == id) {
                    // 灾情统计
                    method = 'statisticszhongxiaohexiantongjizaiqing';
                    queryStatisticsDataByCode(id, method);
                } else if("zhongxiaohexiantongjiyinhuandian" == id) {
                    //隐患点信息统计
                    method = 'statisticszhongxiaohexiantongjiyinhuandian';
                    queryStatisticsDataByCode(id,  method);
                } else if("zhongxiaohexiantongjishuiku" == id) {
                    //水库
                    method = "statisticszhongxiaohexiantongjishuiku";
                    queryStatisticsDataByCode(id,  method);
                } else if("zhongxiaohexiantongjixingzhengcun" == id) {
                    //    行政村信息统计
                    method = "statisticsxingzhengcun";
                    queryStatisticsDataByCode(id,  method);
                } else if("zhongxiaohexiantongjitudi" == id) {
                    //土地利用情况统计
                    method = "statisticsshanhonggoutudiliyong";
                    queryStatisticsDataByCode(id,  method);
                } else if("shanhonggouxiantongjizaiqing" == id) {
                    //灾情统计
                    method = 'statisticszhongxiaohexiantongjizaiqing';
                    queryStatisticsDataByCode(id,  method);
                } else if("shanhonggouxiantongjiyinhuandian" == id) {
                    //隐患点信息统计
                    method = 'statisticszhongxiaohexiantongjiyinhuandian';
                    queryStatisticsDataByCode(id,  method);
                } else if("shanhonggouxiantongjishuiku" == id) {
                    //水库
                    method = "statisticszhongxiaohexiantongjishuiku";
                    queryStatisticsDataByCode(id,  method);
                } else if("shanhonggouxiantongjixingzhengcun" == id) {
                    //行政村信息统计
                    method = "statisticsxingzhengcun";
                    queryStatisticsDataByCode(id,  method);
                } else if("shanhonggouxiantongjitudi" == id) {
                    //土地利用情况统计
                    method = "statisticsshanhonggoutudiliyong";
                    queryStatisticsDataByCode(id,  method);
                } else if("dizhizaihaiyinhuandiangeshu" == id) {
                    // 地质灾害隐患点
                    method = "statisticstdizhizaihaihuapoyingxiang";
                    queryStatisticsDataByCode(id,  method);
                } else if("nishiliuyinhuandiangeshu" == id) {
                    method = "statisticsnishiliuyinhuandiangeshu";
                    queryStatisticsDataByCode(id,  method);
                } else if("yinhuandianbyshanhonggou" == id) {
                    //按山洪沟统计隐患点
                    method = "statisticyinhuandianbyshanhonggou";
                    queryStatisticsDataByCode(id,  method);
                } else if("yinhuandianbyzhongxiaohe" == id) {
                    //按流域统计隐患点
                    method = "statisticyinhuandianbyzhongxiaohe";
                    queryStatisticsDataByCode(id,  method);
                }
            }
        });

        /*$(".disasterTitle").click(function(){
            var id = $(this).attr("id");
            var disasterItemCSS = $(this).parent().find(".disasterItemClass").css("display");
            $(".disasterItemClass").css("display","none");
            if(disasterItemCSS == 'none') {
                $(this).parent().find(".disasterItemClass").css("display", "block");
            } else {
                $(this).parent().find(".disasterItemClass").css("display", "none");
            }
            var list = $(".active");// $($(".active")[2]).parent().find(".disasterTitle").attr("id")==$(this).attr("id")
            if(list.length != 0&&($(list[0]).parent().find(".disasterTitle").attr("id")!=$(this).attr("id"))){
                $(".active").css("background-color","");
                $(".active").removeClass("active");
            }
            if($(this).parent().find(".disasterItemClass").css("display") == "block") {
                if("山洪沟" == id) {
                    weaMap.disaster.getShanHongGou();
                } else if("中小河" == id) {
                    weaMap.disaster.getZhongXiaoHe();
                }
            }

        });

        $(".disasterItemClass").click(function(){
            var id = $(this).attr("id");
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                $(this).css("background-color","");
                if(id == 't_MeteoStation') {
                    removeLayer("mgstation");
                }
                if(id == 't_MWSStation') {
                    removeLayer("mwsstation");
                } else if(id == 't_ShanHongYinHuanDian' ||
                    id == 't_ShanHongYuJingZhiBiao' ||
                    id == 't_ShanHongDiaoCha_ShuiKu' ||
                    id == 't_ZhongXiaoHeYinHuanDian' ||
                    id == 't_ZhongXiaoHeYuJingZhiBiao' ||
                    id == 't_ZhongXiaoHeShuiKuJiBenDiaoCha' ||
                    id == 't_DiZhiZaiHaiHuaPoYingXiang'||
                    id == 't_NiSHiLiuJinQiYingXiang' ||
                    id == 't_NiShiLiuFangZhiCuoShi' ||
                    id == 't_NiShiLiuJiBenQingKuang' ||
                    id == 't_NiShiLiuQianZaiYingXiang') {
                    removeLayer(id)
                }
            }
            else{
                $(this).addClass("active");
                $(this).css("background-color","#92D3E6");
                if(id == 't_MeteoStation') {
                    if (t.stationLayer["mgstation"] == null) {
                        weaMap.disaster.getMeteoStation();
                    }
                } else if(id == 't_MWSStation') {
                    if (t.stationLayer["mwsstation"] == null) {
                        getExtent();
                        weaMap.disaster.getMWSStation(extentBounds);
                    }
                } else if(id == 't_ShanHongYinHuanDian' ||
                            id == 't_ShanHongYuJingZhiBiao' ||
                            id == 't_ShanHongDiaoCha_ShuiKu' ||
                            id == 't_ZhongXiaoHeYinHuanDian' ||
                            id == 't_ZhongXiaoHeYuJingZhiBiao' ||
                            id == 't_ZhongXiaoHeShuiKuJiBenDiaoCha' ||
                            id == 't_NiSHiLiuJinQiYingXiang' ||
                            id == 't_NiShiLiuFangZhiCuoShi' ||
                            id == 't_NiShiLiuJiBenQingKuang' ||
                            id == 't_NiShiLiuQianZaiYingXiang') {
                    getExtent();
                    weaMap.disaster.queryTable(id, "point", extentBounds);
                } else if(id == 't_DiZhiZaiHaiHuaPoYingXiang') {
                    // 省，市 只查询数目
                    //queryProvinceStatisticsDisaster();
                    getDataBySacle(id);
                }
            }
        });*/
    }

    function createDisasterTable(name, columns) {
        var pageCnt = 1;
        var tableName = "";
        var cols = [];
        for (var i = 0; i < columns.length; i++) {
            var item = columns[i];
            var col = new Object();
            col.title = item;
            col.name = item;
            col.sortable = true;
            col.align = 'center';
            cols.push(col);
        }
        var contentHtml = "";
        contentHtml += '<div id="waterPageGro" style="float:right;height: 10px;"><div class="pageGro"></div></div>';
        $("#bottomPanelDetail").html('<div style="background-color: #eeeeee;border: 1px solid #AAAAAB;"><span>"' + name + '"</span>' + contentHtml + '</div><div id="disasterTableDiv"><table id="disasterTable" class="mmg"> </table></div>');
        return cols;
    }

    function queryStatisticsDataByCode(id, method) {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            data: {'param': '{"Function":"' + method + '","CustomParams":{},"Type":2}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    queryStatisticsDataByCodeSuccess(data, id);
                }
            },
            error: function () {
                alert("获取灾害信息失败");
            }
        });
    }

    function queryStatisticsDataByCodeSuccess(data, tableName) {
        // 填充表格数据
        var list = jQuery.parseJSON(data);
        if(list != null && list.length > 0) {
            cols = [];
            for(var p in list[0]) {
                var col = new Object();
                col.title = p;
                col.name = p;
                col.sortable = true;
                col.align = 'center';
                cols.push(col);
            }

            for(var i=0; i<cols.length; i++) {
                if(cols[i].name == '县' || cols[i].name == '流域' || cols[i].name == '地区' || cols[i].name == '山洪沟') {
                    if(i != 0) {
                        var temp = cols[i];
                        cols[i] = cols[0];
                        cols[0] = temp;
                        break;
                    }

                }
            }

            var contentHtml = "";
            contentHtml += '<div id="waterPageGro" style="float:right;height: 10px;"><div class="pageGro"></div></div>';
            $("#bottomPanelDetail").html('<div style="background-color: #eeeeee;border: 1px solid #AAAAAB;"><span>"' + name + '"</span>' + contentHtml + '</div><div id="disasterTableDiv"><table id="disasterTable" class="mmg"> </table></div>');
            mmg = $('#disasterTable').mmGrid({
                height: 200
                , cols: cols
                , remoteSort: true
                , sortName: 'SECUCODE'
                , sortStatus: 'asc'
                , multiSelect: false
                , checkCol: false
                , fullWidthRows: true
                , autoLoad: false
            });
            mmg.tableName = tableName;
            mmg.load(list);
        }
    }


    function clearLayer(name){
        if(map.getLayersByName(name).length != 0) {
            //map.getControl(name + "Select").deactivate();
            //map.removeControl(map.getControl(name + "Select"));
            t.stationLayer[name].removeAllFeatures();
            //map.removeLayer(t.stationLayer[name]);
            //t.stationLayer[name] = null;
            //mgStations = null;
        }
    }
    function getDataBySacle(id) {
        var currentScale = map.getScale();
        if (currentScale <= countryScale) {
            //国家级
            queryProvinceStatisticsDisaster(id);
        } else if (currentScale > countryScale && currentScale <= provinceScale) {
            // 省级
            queryCityStatisticsDisaster(id);
        } else {
            //查询具体的点
            var extent = map.getExtent();
            weaMap.disaster.queryTable(id, "point", extent);
        }
    }

    /**
     * 查询市统计数据
     */
    function queryCityStatisticsDisaster(tableName) {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            data: {'param': '{"Function":"queryDataByCity","CustomParams":{"tableName"="' + tableName+ '"},"Type":2}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    var itemCurrentData = {};
                    itemCurrentData.data = data;
                    itemCurrentData.type = 'city';
                    itemCurrentData.tableName = tableName;
                    //currentData.push(itemCurrentData);
                    drawPoint(data, tableName);
                }
            },
            error: function () {
                alert("获取灾害信息失败");
            }
        });
    }
    /**
     * 查询省统计数据
     */
    function queryProvinceStatisticsDisaster(tableName) {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            data: {'param': '{"Function":"queryDataByProvince","CustomParams":{"tableName"="' + tableName+ '"},"Type":2}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    var itemCurrentData = {};
                    itemCurrentData.data = data;
                    itemCurrentData.type = 'province';
                    itemCurrentData.tableName = tableName;
                    //currentData.push(itemCurrentData);
                    drawPoint(data, tableName);
                }
            },
            error: function () {
                alert("获取灾害信息失败");
            }
        });
    }

    function drawPoint(data, id) {
        var list = jQuery.parseJSON(data);
        if (list == null || list.length == 0) {
            return;
        }
        var vectorFeas = [];
        for (var i = 0; i < list.length; i++) {
            var feature = list[i];
            var cnt = feature.cnt;
            var resultData = list[i];
            var point = new WeatherMap.Geometry.Point(resultData.longitude, resultData.latitude);
            var pointVector = new WeatherMap.Feature.Vector(point, feature);
            pointVector.style = {
                fillColor: "#ff8000",
                fillOpacity: 0.8,
                strokeOpacity: 0.5,
                label: cnt + "",
                fontColor: "#ffffff",
                fontOpacity: "1",
                fontFamily: "隶书",
                fontSize: "1em",
                strokeColor: "#000000",
                pointRadius: Math.sqrt(cnt / 12) + 10
            };
            vectorFeas.push(pointVector);
        }
        if(t.stationLayer[id] == null) {
            t.stationLayer[id] = new WeatherMap.Layer.Vector(id, {renderers: ["Canvas"]});
        }
        t.stationLayer[id].addFeatures(vectorFeas);
        map.addLayer(t.stationLayer[id]);
    }

    function getExtent() {
        var extent = map.getExtent();
        if(extentBounds  == null) {
            extentBounds = extent;
            extentBounds.left = extent.left - (extent.right - extent.left) / 2;
            extentBounds.right = extent.right + (extent.right - extent.left) / 2;
            extentBounds.bottom = extent.bottom - (extent.top - extent.bottom) / 2;
            extentBounds.top = extent.top + (extent.top - extent.bottom) / 2;
        }
    }

    function removeLayer(layeName) {
        //map.getControl(layeName + "Select").deactivate();
        t.stationLayer[layeName].removeAllFeatures();
        if(map.getControl(layeName + "Select") != null) {
            map.getControl(layeName + "Select").deactivate();
            map.removeControl(map.getControl(layeName + "Select"));
            //map.removeLayer(t.stationLayer[layeName]);
            //t.stationLayer[layeName] = null;
        }
    }
    /**
     * 手动添加菜单，不从数据库中读取
     */
    function initMenu() {
        var list = [];

        //1
        var item = new Object();
        item.ZHLevel = '中小河';
        item.EnName = 't_ZhongXiaoHeYinHuanDian';
        item.ZHName = '隐患点';
        list.push(item);
        //item = new Object();
        //item.ZHLevel = '中小河';
        //item.EnName = 't_ZhongXiaoHeYuJingZhiBiao';
        //item.ZHName = '预警点'; //预警指标
        //list.push(item);
        item = new Object();
        item.ZHLevel = '中小河';
        item.EnName = 't_ZhongXiaoHeShuiKuJiBenDiaoCha';
        item.ZHName = '水库';
        list.push(item);
        item = new Object();
        item.ZHLevel = '中小河';
        item.EnName = 't_MeteoStation';
        item.ZHName = '气象站';
        list.push(item);
        item = new Object();
        item.ZHLevel = '中小河';
        item.EnName = 't_MWSStation';
        item.ZHName = '区域气象站';
        list.push(item);
        //2
        item = new Object();
        item.ZHLevel = '滑坡'; //地质灾害隐患点
        item.EnName = 't_DiZhiZaiHaiHuaPoYingXiang';
        item.ZHName = '影响范围';
        list.push(item);
        //3
        item = new Object();
        item.ZHLevel = '山洪沟';
        item.EnName = 't_ShanHongYinHuanDian'; //t_ShanHongYinHuanDian
        item.ZHName = '隐患点';
        list.push(item);
        //item = new Object();
        //item.ZHLevel = '山洪沟';
        //item.EnName = 't_ShanHongYuJingZhiBiao';
        //item.ZHName = '预警点';
        //list.push(item);
        item = new Object();
        item.ZHLevel = '山洪沟';
        item.EnName = 't_ShanHongDiaoCha_ShuiKu';
        item.ZHName = '水库';
        list.push(item);
        item = new Object();
        item.ZHLevel = '山洪沟';
        item.EnName = 't_MeteoStation';
        item.ZHName = '气象站';
        list.push(item);
        item = new Object();
        item.ZHLevel = '山洪沟';
        item.EnName = 't_MWSStation';
        item.ZHName = '区域气象站';
        list.push(item);
        //4
        item = new Object();
        item.ZHLevel = '泥石流';
        item.EnName = 't_NiShiLiuQianZaiYingXiang';
        item.ZHName = '潜在影响';
        list.push(item);
        return list;
    }

    this.showDisasterItem = function(obj) {
        alert(obj);
    }
    /**
     * 初始化县界图层
     */
    function initCountyLayer() {
        if(t.stationLayer["county"] == null) {
            t.strategy = new WeatherMap.Strategy.GeoText();
            t.stationLayer["county"] = new WeatherMap.Layer.Vector("county", {renderers: ["Canvas"]}, {strategies: [t.strategy]});
            //设置标签的样式
            t.strategy.style = {
                fontColor: "#FF7F00",
                fontWeight: "",
                fontSize: "12px",
                fill: true,
                fillColor: "rgba(60,60,60,0.8)",
                fillOpacity: 1,
                stroke: true,
                labelYOffset: -18,
                strokeColor: "#ffffff"
            };
            //t.stationLayer["county"].style = {
            //    fill: false,
            //    stroke: true,
            //    fontSize:"3px",
            //    strokeColor: "#BFA640",
            //    fillColor : "#37C8B9",
            //    strokeWidth:0.5
            //}
        }
        map.addLayer(t.stationLayer["county"]);
    }

    /**
     * 初始化山洪沟图层
     */
    function initShanHongGouLayer() {
        if(t.stationLayer["shanhonggou"] == null) {
            t.stationLayer["shanhonggou"] = new WeatherMap.Layer.Vector("shanhonggou", {renderers: ["Canvas"]});
            t.stationLayer["shanhonggou"].style = {
                fill: true,
                stroke: true,
                fontSize:"6px",
                strokeColor: "#BFA640",
                fillColor : "#37C8B9",
                strokeWidth:0.5
            }
        }
        map.addLayer(t.stationLayer["shanhonggou"]);
        var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer["shanhonggou"],
            {
                callbacks: callbacks
            });
        selectFeature.id = "shanhonggouSelect";
        map.addControl(selectFeature);
        selectFeature.activate();
    }

    function initZhongXiaoHeLayer() {
        if(t.stationLayer["zhongxiaohe"] == null) {
            t.stationLayer["zhongxiaohe"] = new WeatherMap.Layer.Vector("zhongxiaohe");
            t.stationLayer["zhongxiaohe"].style = {
                fill: true,
                stroke: true,
                fontSize:"6px",
                strokeColor: "#EE6F22",
                fillColor : "#86390B",
                fillOpacity:0.2,
                strokeWidth:0.5
            }
        }
        map.addLayer(t.stationLayer["zhongxiaohe"]);
        var selectFeature = new WeatherMap.Control.SelectFeature(t.stationLayer["zhongxiaohe"],
            {
                callbacks: callbacks
            });
        selectFeature.id = "zhongxiaoheSelect";
        map.addControl(selectFeature);
        selectFeature.activate();
    }

    this.getZhongXiaoHe = function() {
        if(t.stationLayer["zhongxiaohe"] == null) {
            return;
        }
        if(t.stationLayer["zhongxiaohe"].features.length != 0) {
            return;
        }
        //initZhongXiaoHeLayer();
        $('#loadingImage').css("display", "block");
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/getJiangXiZhongXiaoHe',
            data: {'param': ''},
            dataType: 'json',
            success: function (data) {
                if(data!=null){
                    getZhongXiaoHeSuccess(data);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function  getZhongXiaoHeSuccess(data) {
        zhongxiaohe = data;
        drawZhongXiaoHe();
    }

    function drawZhongXiaoHe() {
        var result = featureUtility.getRecordsetFromJson(zhongxiaohe);
        var features = [];
        var length = result.features.length;
        for(var i=0; i<length; i++) {
            var feature = result.features[i];
            feature.attributes.type = "zhongxiaohe";
            feature.style = {
                fill: true,
                stroke: true,
                //strokeColor: "#A3300E",
                //strokeColor: "#0920F7",
                strokeColor: "#0000FF",
                strokeWidth:1,
                fillOpacity:0,
                //fillColor:zhongxiaoheColorConfig[Math.round(Math.random() * zhongxiaoheColorConfig.length - 1)],
                fillColor:"#91BCD8",

                strokeOpacity:0.5,
                //label: feature.attributes.name,
                //fontColor:"#BDDDD8",
                fontSize:10
            }
            //if(i < zhongxiaoheColorConfig.length) {
            //    feature.style = {
            //        fill: true,
            //        stroke: true,
            //        strokeColor: "#D7CBF7",
            //        strokeWidth:0.5,
            //        fillOpacity:0.8,
            //        fillColor:zhongxiaoheColorConfig[i],
            //        strokeOpacity:0.5,
            //        //label: feature.attributes.name,
            //        fontColor:"#0000FF",
            //        fontSize:10
            //    }
            //} else {
            //    feature.style = {
            //        fill: true,
            //        stroke: true,
            //        strokeColor: "#D7CBF7",
            //        strokeWidth:0.5,
            //        fillOpacity:0.8,
            //        fillColor:zhongxiaoheColorConfig[Math.round(Math.random() * zhongxiaoheColorConfig.length)],
            //        strokeOpacity:0.5,
            //        //label: feature.attributes.name,
            //        fontColor:"#0000FF",
            //        fontSize:10
            //    }
            //}

            features.push(feature);
        }
        //map.removeLayer(t.stationLayer["county"]);
        $('#loadingImage').css("display", "none");
        t.stationLayer["zhongxiaohe"].addFeatures(features);
        //map.getControl("zhongxiaoheSelect").activate();
        //map.setLayerIndex(t.stationLayer["zhongxiaohe"], 99);
    }

    this.getShanHongGou = function() {
        if(t.stationLayer["shanhonggou"] == null) {
            return;
        }
        if(t.stationLayer["shanhonggou"].features.length != 0) {
            return;
        }
        $('#loadingImage').css("display", "block");
        //initShanHongGouLayer();
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/getJiangXiShanHongGou',
            data: {'param': ''},
            dataType: 'json',
            success: function (data) {
                if(data!=null){
                    getShanHongGouSuccess(data);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function getShanHongGouSuccess(data) {
        //shanhonggou = jQuery.parseJSON(data);
        shanhonggou = data;
        drawShanHongGou();
    }

    function drawShanHongGou() {
        var result = featureUtility.getRecordsetFromJson(shanhonggou);
        var features = [];
        var length = result.features.length;
        for(var i=0; i<length; i++) {
            var feature = result.features[i];
            //feature.style = {
            //    fill: false,
            //    stroke: true,
            //    strokeColor: "#0920F7",
            //    strokeWidth: 1,
            //    fillOpacity: 0.8,
            //    strokeOpacity: 0.5,
            //    fontSize: 10
            //}
            if(i < shanhonggouColorConfig.length) {
                feature.style = {
                    fill: true,
                    stroke: true,
                    strokeColor: "#B5BFBE",
                    strokeWidth:0.3,
                    fillOpacity:0.5,
                    strokeOpacity:1,
                    fillColor: shanhonggouColorConfig[i]
                }
            } else {
                feature.style = {
                    fill: true,
                    stroke: true,
                    strokeColor: "#E6EAEA",
                    strokeWidth:0.3,
                    fillOpacity:0.5,
                    strokeOpacity:1,
                    fillColor: shanhonggouColorConfig[Math.round(Math.random() * shanhonggouColorConfig.length)]
                }
            }

            feature.attributes.type = "shanhonggou";
            features.push(feature);
        }
        $('#loadingImage').css("display", "none");
        t.stationLayer["shanhonggou"].addFeatures(features);
        //map.setLayerIndex(VectorLayer,99);
        //map.getControl("shanhonggouSelect").activate();
        //map.setLayerIndex(t.stationLayer["shanhonggou"], 99);
    }

    function drawShanHongGoubak2() {
        for(var k=0; k<shanhonggou.length; k++) {
            //var cooridates = shanhonggou[k].parts;
            var parts = [];
            parts = shanhonggou[k].parts;
            //parts = cooridates.split(";")
            var itemPolygons = [];
            var polygon ;
            var feature = new Object();
            feature.shgName = shanhonggou[k].shgName;
            feature.lyName = shanhonggou[k].lyName;
            feature.type = "shanhonggou";
            var center = shanhonggou[k].center;
            feature.lon = center.split(",")[0] - 0;
            feature.lat = center.split(",")[1] - 0;
            if(parts.length == 1) {
                //单面
                var pts = [];
                for(var m = 0; m < parts.length; m++) {
                    var points = parts[m].points;
                    for(var n = 0; n < points.length; n++) {
                        var point = new WeatherMap.Geometry.Point(points[n].x, points[n].y);
                        pts.push(point);
                    }
                }
                var line = new WeatherMap.Geometry.LinearRing(pts);
                polygon = new WeatherMap.Geometry.Polygon([line], feature);
            } else { //多面
                for(var i = 0; i < parts.length; i++) {
                    var pts = [];
                    var points = parts[i].points;
                    for(var j = 0; j < points.length; j++) {
                        var point = new WeatherMap.Geometry.Point(points[j].x, points[j].y);
                        pts.push(point);
                    }
                    var line = new WeatherMap.Geometry.LinearRing(pts);
                    var itemPolygon = new WeatherMap.Geometry.Polygon([line]);
                    itemPolygons.push(itemPolygon);
                }

                polygon = new WeatherMap.Geometry.MultiPolygon(itemPolygons);
            }
            var polygonVector = new WeatherMap.Feature.Vector(polygon, feature);
            polygonVector.style = {
                fill: true,
                stroke: true,
                //label: counties[k].xname,
                fontSize:"6px",
                strokeColor: "#BFA640",
                fillColor : "#37C8B9",
                strokeWidth:0.5
            }
            t.stationLayer["shanhonggou"].addFeatures(polygonVector);
        }
    }

    function drawShanHongGouBak() {
        for(var k=0; k<shanhonggou.length; k++) {
            var cooridates = shanhonggou[k].cooridates;
            var parts = [];
            parts = cooridates.split(";")
            var itemPolygons = [];
            //var feature = [];
            //var featureItem = new Object();
            //featureItem.lyName = shanhonggou[k].lyName;
            //featureItem.shgName = shanhonggou[k].shgName;
            //feature.push(featureItem);
            var polygon ;
            if(parts.length == 1) {
                //单面
                var pointsStr = parts[0].split(" ");
                var pts = [];
                for (var m = 0; m < pointsStr.length; m += 2) {
                    var pointStr = [];
                    pointStr = pointsStr[m].split(",");
                    var pointX = pointStr[0] - 0;
                    var pointY = pointStr[1] - 0;
                    var point = new WeatherMap.Geometry.Point(pointX, pointY);
                    pts.push(point);
                }
                var line = new WeatherMap.Geometry.LinearRing(pts);
                polygon = new WeatherMap.Geometry.Polygon([line]);
            } else { //多面
                for (var i = 0; i < parts.length; i+=2) {
                    var pointsStr = parts[i].split(" ");
                    var pts = [];
                    for (var j = 0; j < pointsStr.length; j += 2) {
                        var pointStr = [];
                        pointStr = pointsStr[j].split(",");
                        var pointX = pointStr[0] - 0;
                        var pointY = pointStr[1] - 0;
                        var point = new WeatherMap.Geometry.Point(pointX, pointY);
                        pts.push(point);
                    }
                    var line = new WeatherMap.Geometry.LinearRing(pts);
                    var itemPolygon = new WeatherMap.Geometry.Polygon([line]);
                    itemPolygons.push(itemPolygon);
                }
                polygon = new WeatherMap.Geometry.MultiPolygon(itemPolygons);
            }
            var polygonVector = new WeatherMap.Feature.Vector(polygon);
            polygonVector.style = {
                fill: true,
                stroke: true,
                //label: counties[k].xname,
                fontSize:"6px",
                strokeColor: "#BFA640",
                fillColor : "#37C8B9",
                strokeWidth:0.5
            }
            t.stationLayer["shanhonggou"].addFeatures(polygonVector);
        }
    }

    /**
     * 查询江西县的边界，属性等信息
     */
    this.getCountyBounds = function() {
        //initCountyLayer();
        if(counties != null && counties.size > 0) {
            return;
        }
        $('#loadingImage').css("display", "block");
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/getJiangXiCountyRegion',
            data: {'param': ''},
            dataType: 'json',
            success: function (data) {
                if(data!=null){
                    getCountyBoundsSuccess(data);
                }
            },
            error: function () {
                alert("error");
            }
        });
    }

    function getCountyBoundsSuccess(data) {
        counties = data;
        drawCounty();
    }

    function drawCounty() {
        var result = featureUtility.getRecordsetFromJson(counties);
        //var result = counties;
        var features = [];
        var length = result.features.length;
        var labelFeas = [];
        for(var i=0; i<length; i++) {
            var feature = result.features[i];
            feature.attributes.type = "county";
            feature.style = {
                fill: false,
                stroke: true,
                label: feature.attributes.XName,
                fontSize:"12px",
                strokeColor: "#000000",
                //strokeColor: "#FF0000",
                //fontColor:"#757575",
                fontColor:"#000079",
                strokeWidth:0.8
            }
            //var label = new WeatherMap.Geometry.GeoText(counties.features[i].geometry.center.x, counties.features[i].geometry.center.y, feature.attributes.XName);
            //labelFeas.push(new WeatherMap.Feature.Vector(label, feature));
            features.push(feature);
        }
        $('#loadingImage').css("display", "none");
        t.stationLayer["county"].addFeatures(features);
        //t.stationLayer["county"].addFeatures(labelFeas);
    }

    this.queryHeatData = function(method, radius) {
        $.ajax({
            type: 'post',
            url: serviceUrl + 'data/query',
            async: false,
            data: {'param': '{"Function":"' + method + '","CustomParams":{},"Type":2}'},
            dataType: 'json',
            success: function (data) {
                if(data!=null){
                    queryHeatDataSuccess(data, radius);
                }
            },
            error: function () {
                alert("获取表结构失败");
            }
        });
    }

    function queryHeatDataSuccess(data, radius) {
        clearHeatData();
        heatLayer = new WeatherMap.Layer.HeatMapLayer(
            "heatMap",
            {
                "radius":radius,
                "featureWeight":"value",
                "featureRadius":"geoRadius"
            }
        );
        var heatPoints = [];
        for(var i=0; i<data.length; i++) {
            heatPoints[i] = new WeatherMap.Feature.Vector(
                new WeatherMap.Geometry.Point(
                    data[i].longitude, data[i].latitude
                ),
                {
                    "value": data[i].cnt,
                    "geoRadius":null
                }
            );
        }
        heatLayer.addFeatures(heatPoints);
        map.addLayer(heatLayer);
    }

    function clearHeatData() {
        if(heatLayer != null) {
            heatLayer.removeAllFeatures();
            map.removeLayer(heatLayer);
            heatLayer = null;
        }
    }

    this.cleanLayerByName = function(layerName) {
        if(t.stationLayer[layerName] != undefined && t.stationLayer[layerName] != null) {
            //map.removeLayer(t.stationLayer[layerName]);
            //map.getControl(layerName + "Select").deactivate();
            //map.removeControl(map.getControl(layerName + "Select"));
            //t.stationLayer[layerName] = null;
            t.stationLayer[layerName].removeAllFeatures();
        }
    }

    this.keyWordQuery = function() {
        var keyWord = $("#searchValue").val();
        if(keyWord == null || "" == keyWord) {
            $("#searchValue").val("查询内容为空");
        }
        queryByKeyWord(keyWord);
    }

    function queryByKeyWord(keyWord) {
        $.ajax({
            type: 'post',
            url: disasterUrl + '/DisasterService/keyWrodsQuery',
            data: {'para': '{"keyWord":"' + keyWord + '"}'},
            dataType: 'text',
            success: function (data) {
                if(data!=null){
                    queryByKeyWordSuccess(data);
                }
            },
            error: function () {
                //
            }
        });
    }

    function queryByKeyWordSuccess(data) {
        var result = jQuery.parseJSON(data);
        var colNames = new Object();
        var list = new Array();
        if (result == null || result.length == 0) {
            return;
        }
        cols = new Array();
        var gisResult = result.gisResult;
        var tableResult = result.tableResult;
        for (var j = 0; j < gisResult.length; j++) {
            //1. 从gisResult中取到结果绘制在地图上。
            var gisRegion = featureUtility.getRecordsetFromJson(jQuery.parseJSON(gisResult[j]));
            if(gisRegion.features == null) {
                continue;
            }
            if(gisRegion.features.length != 0) {
                addKeyWordTable(gisRegion.features[0], colNames);
            }
            for(var i =0; i< gisRegion.features.length; i++) {
                list.push(gisRegion.features[i].attributes);
            }

            var features = [];
            var length = gisRegion.features.length;
            var labelFeas = [];
            for (var i = 0; i < length; i++) {
                var feature = gisRegion.features[i];
                feature.style = {
                    fill: false,
                    stroke: true,
                    //label: feature.attributes.XName,
                    fontSize: "12px",
                    strokeColor: "#FF0000",
                    fontColor: "#757575",
                    strokeWidth: 2
                }
                features.push(feature);
            }
            t.stationLayer["keyWordsResultLayer"].addFeatures(features);
        }
        //把tableResult中的点描在地图上。
        var vectorFeas = [];
        for(var j = 0; j < tableResult.length; j++) {
            var tableItem = tableResult[j];
            var point = new WeatherMap.Geometry.Point(tableItem.longitude, tableItem.latitude);
            var pointVector = new WeatherMap.Feature.Vector(point, feature);
            pointVector.style = {
                fillColor: "#ff8000",
                fillOpacity: 0.8,
                strokeOpacity: 0.5,
                strokeColor:"#ff0000",
                fontColor: "#ffffff",
                fontOpacity: "1",
                fontFamily: "隶书",
                fontSize: "1em",
                pointRadius:3
            };
            vectorFeas.push(pointVector);
        }
        t.stationLayer["keyWordsResultLayer"].addFeatures(vectorFeas);

        for (var j = 0; j < tableResult.length; j++) {
            var tableItem = tableResult[j];
            addKeyWord(tableResult[0], colNames);
            list.push(tableItem);
        }

        for(var p in colNames) {
            var col = new Object();
            col.title = p;
            col.name = p;
            col.sortable = true;
            col.align = 'center';
            cols.push(col);
        }
        var name ="中小河与山洪沟信息";
        var contentHtml = "";
        contentHtml += '<div id="waterPageGro" style="float:right;height: 10px;"><div class="pageGro"></div></div>';
        $("#bottomPanelDetail").html('<div style="background-color: #eeeeee;border: 1px solid #AAAAAB;"><span>"' + name + '"</span>' + contentHtml + '</div><div id="disasterTableDiv"><table id="disasterTable" class="mmg"> </table></div>');
        mmg = $('#disasterTable').mmGrid({
            height: 200
            , cols: cols
            , remoteSort: true
            , sortName: 'SECUCODE'
            , sortStatus: 'asc'
            , multiSelect: false
            , checkCol: false
            , fullWidthRows: true
            , autoLoad: false
        });
        mmg.tableName = tableName;
        mmg.load(list);
        //2. 从gisResult中取到属性。
        //3. 和tableResult中属性合并，展示在表格中
        mmg.on('cellSelected', function(e, item, rowIndex, colIndex){
            if(item.longitude != undefined && item.latitude != undefined) {
                // Point
                map.panTo(new WeatherMap.LonLat(item.longitude, item.latitude));
            }
        });
        //添加清除按钮
        $('#cleanSearchImg').css("display", "block");
    }

    function addKeyWord(feature, colNames) {
        for(var p in feature) {
            colNames[p] = 1;
        }
    }

    function addKeyWordTable(feature, colNames) {
        for(var p in feature.attributes) {
            colNames[p] = 1;
        }
    }

    /**
     * 清除关键字查询的结果
     */
    this.clearKeyWordQueryResult = function() {
        t.stationLayer["keyWordsResultLayer"].removeAllFeatures();
        hideBottomPanel("disasterTable");
        $('#cleanSearchImg').css("display", "none");
        $("#searchValue").attr("value", null);
        mmg = null;
    }
}