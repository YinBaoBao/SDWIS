/**
 * Created by luckyD on 2017/04/25
 */
function CPZSPageClass(){
	this.myDateSelecter = null;
	this.currentPosition = {lon:118.2,lat:36.4};
    this.numbers = [12,24,36,48,60,72,84,96,108,120,132,144,156,168,180,192,204,216,228,240];
    this.hourSpan = null;
    var t = this;

    this.renderMenu = function() {
        t.myDateSelecter = new DateSelecter(2,2);
        t.myDateSelecter.intervalMinutes = 60*24; //24小时
        $("#dateSelect").html(this.myDateSelecter.div);
        t.showTimeSlide();//添加底部时间进度条
        t.hourSpan = t.numbers[0];
        //regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件
        $("#dateSelect").find("img").css("display","none");
        $("#dateSelect").find("input").css({"border":"none","box-shadow":"none","color":"white","width":"78px","height":"27px","font-weight":"200"});

		//右侧菜单
		var strHtml = '';
		strHtml += '<div id="zoom" class="">'
			+'<div id="zoomIn" class="zoomTip" title="Zoom in" data-toggle="tooltip" data-placement="left">+</div>'
			+'<div id="zoomOut" class="zoomTip" title="Zoom out" data-toggle="tooltip" data-placement="left">-</div>'
			+'</div>'
			+'<div id="elementDiv" class="">'
			+'<div id="menuLand">'
			+'<div style="font-size: 12px;padding: 5px 0 2px;color: #12ab21;background-color: #eee;">陆</div>'
			+'<div class="listMenu" value="r12" title="日降水量" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-jiangshuiliang"></i></div>'
			+'<div class="listMenu" value="tmax" title="日最高温" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-wendumax"></i></div>'
			+'<div class="listMenu" value="tmin" title="日最低温" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-wendumin"></i></div>'
			+'<div class="listMenu" value="wmax" title="日最大风" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-dafeng"></i></div>'
			+'<div class="listMenu" value="w" title="天气" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-tianqi"></i></div>'
			+'<div class="listMenu" value="r3" title="降水量" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-shui"></i></div>'
			+'<div class="listMenu" value="2t" title="气温" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-qiwen"></i></div>'
			+'<div class="listMenu" value="10uv" title="风" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-feng"></i></div>'
			+'<div class="listMenu" value="rh" title="相对湿度" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-shidu"></i></div>'
			+'<div class="listMenu" value="tcc" title="云量" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-yun"></i></div>'
			+'<div class="listMenu" value="vis" title="能见度" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-nengjiandu"></i></div>'
			+'<div class="listMenu" value="air" title="空气污染等级" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-wuran"></i></div>'
			+'</div>'
			+'<div id="menuOcean" style="display: none;">'
			+'<div style="font-size: 12px;padding: 5px 0 2px;color: #0d3d88;background-color: #eee;">海</div>'
			+'<div class="listMenu" value="seawmax" title="日最大风" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-dafeng"></i></div>'
			+'<div class="listMenu" value="seavis" title="能见度" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-nengjiandu"></i></div>'
			+'<div class="listMenu" value="sear12" title="日降水量" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-jiangshuiliang"></i></div>'
			+'<div class="listMenu" value="seatmax" title="日最高温" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-wendumax"></i></div>'
			+'<div class="listMenu" value="seatmin" title="日最低温" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-wendumin"></i></div>'
			+'</div>'
			+'<div class="listMenu" id="landOrOcean" flag="land" title="海洋" data-toggle="tooltip" data-placement="left"><i class="iconfont icon-3dian"></i></div>'
			+'</div>';
		$("#rightPanel").html(strHtml);
		
        $("#zoomIn").click(function(){
            GDYB.Page.curPage.map.zoomIn();
        });
        $("#zoomOut").click(function(){
            GDYB.Page.curPage.map.zoomOut();
        });

		//添加导航栏提示
		$(function () {
			options={
				delay: { show: 0, hide: 100 },
				trigger:'hover'
			};
			$("[data-toggle='tooltip']").tooltip(options);
		});
		$("#landOrOcean").click(function(){
			if($(this).attr("flag")=="land"){
				$("#menuLand").css("display","none");
				$("#menuOcean").css("display","block");
				$(this).attr({"flag":"ocean","data-original-title":"陆地"});
				GDYB.Page.curPage.map.setCenter(new WeatherMap.LonLat(122.3, 37.8), 7);//切换地图中心点
			}else{
				$("#menuLand").css("display","block");
				$("#menuOcean").css("display","none");
				$(this).attr({"flag":"land","data-original-title":"海洋"});
				GDYB.Page.curPage.map.setCenter(new WeatherMap.LonLat(118.2, 36.4), 7);//切换地图中心点
			}
		});

        //初始化参数
        initProductType();
        //初始化制作时间和预报时间
        var dateNow = new Date();
        if(GDYB.GridProductClass.currentMakeTime == null) {
            dateNow.setMinutes(0);
            dateNow.setSeconds(0);
        }
        else{
            var curTimeStr = GDYB.GridProductClass.currentMakeTime;
            var year = parseInt(curTimeStr.replace(/(\d*)-\d*-\d* \d*:\d*:\d*/,"$1"));
            var month = parseInt(curTimeStr.replace(/\d*-(\d*)-\d* \d*:\d*:\d*/,"$1"));
            var day = parseInt(curTimeStr.replace(/\d*-\d*-(\d*) \d*:\d*:\d*/,"$1"));
            var hour = parseInt(curTimeStr.replace(/\d*-\d*-\d* (\d*):\d*:\d*/,"$1"));
            var minutes = 0;
            var seconds = 0;
            dateNow.setFullYear(year,month - 1,day);
            dateNow.setHours(hour, minutes, seconds, 0);
        }
        if(dateNow.getHours()<5 || dateNow.getHours()>16)
            $("#selectMakeTime").val(5);
        else
            $("#selectMakeTime").val(16);
        var makeTimeHour = $("#selectMakeTime").val();
        setForecastTime(dateNow, makeTimeHour);

        //改变制作时间
        this.myDateSelecter.input.change(function(){
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            t.showTimeSlide();
            onChangeDateTime();
        });

        //改变制作时次
        $("#selectMakeTime").change(function() {
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            t.showTimeSlide();
            onChangeDateTime();
        });

        //改变产品类型
        $("#selectProductType").change(function() {
            initProductType();
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            t.showTimeSlide();
            onChangeDateTime();
			hidforcastDiv();
        });

        //改变要素
        $("#elementDiv").find(".listMenu").click(function() {
            if($(this).hasClass("active"))
                return;
            $("#elementDiv").find(".listMenu").removeClass("active");
            $(this).addClass("active");
            var element = $(this).attr("value");
            t.numbers = GDYB.GDYBPage.getHourSpan(element);
            t.hourSpan = t.numbers[0];
            //regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件
            t.showTimeSlide();
            onChangeDateTime();
			hidforcastDiv();
        });

        //鼠标点击事件
        var map= t.map;
        map.events.register("click", map, function(event){
            t.currentPosition = this.getLonLatFromPixel(event.xy);
            if(GDYB.GridProductClass.layerMarkers == null){
                GDYB.GridProductClass.layerMarkers = new WeatherMap.Layer.Markers("layerMarkers");
                GDYB.Page.curPage.map.addLayers([GDYB.GridProductClass.layerMarkers]);
            }
            GDYB.GridProductClass.layerMarkers.clearMarkers();
            var size = new WeatherMap.Size(25,30);
            var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
            var icon = new WeatherMap.Icon('imgs/marker.png', size, offset);
            GDYB.GridProductClass.layerMarkers.addMarker(new WeatherMap.Marker(new WeatherMap.LonLat(t.currentPosition.lon,t.currentPosition.lat),icon));

            t.displayGridValueSerial(); //时间改变，同时更新图表
            t.displayWeatherDescription(); //天气概况
        });

    };

    //展示格点产品
    this.displayGridProduct = function(t){
        var t = typeof(t)=="undefined"?this:t;
        var type = GDYB.GridProductClass.currentType;
        var element = $("#elementDiv").find($(".active")).attr("value");
        var elementName = $("#elementDiv").find($(".active")).attr("data-original-title");
        var maketime = GDYB.GridProductClass.currentMakeTime;
        var version = GDYB.GridProductClass.currentVersion;
        var datetime = t.myDateSelecter.getCurrentTime(false);
        var hourspan = t.hourSpan;
        var fromModel;
        var level = 1000;
        if(type == null || element == null || hourspan == null)
            return;

        //获取上一次时效
        var i=0;
        var hourspans = GDYB.GDYBPage.getHourSpan(element);
        for(i; i<hourspans.length; i++){
            if(hourspans[i] == hourspan)
                break;
        }
        var hourspanLast = 0;
        if(i>0)
            hourspanLast = hourspans[i-1];

        if(GDYB.GridProductClass.datasetGridInfos == null && GDYB.GridProductClass.datasetGridInfos.length > 0)
            GDYB.GridProductClass.getGridInfo(null, type, element, datetime);
        GDYB.GridProductClass.displayGridProduct(function(){
        }, type, level, element, maketime, version, datetime, hourspan, fromModel, elementName, hourspanLast);
    };

    function initProductType(){
        var strProductType = $("#selectProductType").val();
        var arrayProductType = strProductType.split('_');
        GDYB.GridProductClass.currentType = arrayProductType[0];
        GDYB.GridProductClass.currentVersion = arrayProductType[1];
    }

    //根据制作时间，设置预报时间
    function setForecastTime(datetime, makeTimeHour){
        if(typeof(datetime) == "undefined")
            datetime = t.myDateSelecter.getCurrentTimeReal();
        if(typeof(makeTimeHour) == "undefined")
            makeTimeHour = $("#selectMakeTime").val();
        if(GDYB.GridProductClass.currentType == "prvn"){
            if(makeTimeHour == 5)
                datetime.setHours(8);
            else
                datetime.setHours(20);
        }
        else if(GDYB.GridProductClass.currentType == "cty" || GDYB.GridProductClass.currentType == "cnty"){
            if(makeTimeHour == 5 || makeTimeHour == 10)
                datetime.setHours(8);
            else
                datetime.setHours(20);
        }
        t.myDateSelecter.setCurrentTime(datetime.format("yyyy-MM-dd hh:mm:ss"));

        datetime.setHours(makeTimeHour);
        GDYB.GridProductClass.currentMakeTime = datetime.format("yyyy-MM-dd hh:mm:ss");
        GDYB.GridProductClass.currentDateTime = t.myDateSelecter.getCurrentTime(false);
    }

    function onChangeDateTime(){
        t.displayGridValueSerial(); //时间改变，同时更新图表
        t.displayWeatherDescription(); //天气概况

        if($("#elementDiv").find($(".active")).attr("value")=="10uv"||$("#elementDiv").find($(".active")).attr("value")=="wmax"||$("#elementDiv").find($(".active")).attr("value")=="seawmax"){
            t.clearLayer();
            t.displayStream();
            $(GDYB.Page.curPage.baseLayer.div).css("filter","brightness(0.4)");
        }else{
            t.clearLayer();
            t.displayGridProduct();
            $(GDYB.Page.curPage.baseLayer.div).css("filter","brightness(1)");
        }
    }

    //展示趋势图
    this.displayGridValueSerial = function(){
        var t = this;
        if(typeof(t.currentPosition)=="undefined")
            return;
        var arrayPoint = [];
        arrayPoint.push({x:t.currentPosition.lon,y:t.currentPosition.lat});
        var strPoints = JSON.stringify(arrayPoint);

        var arrayElement = [];
        arrayElement.push({name:"2t", element:"2t",hourSpans:JSON.stringify(this.getHourSpan("2t"))});
		arrayElement.push({name:"r3", element:"r3",hourSpans:JSON.stringify(this.getHourSpan("r3"))});
        arrayElement.push({name:"wd3", element:"10uv",hourSpans:JSON.stringify(this.getHourSpan("10uv"))});
        arrayElement.push({name:"ws3", element:"10uv",hourSpans:JSON.stringify(this.getHourSpan("10uv"))});
        /*arrayElement.push({name:"rh", element:"rh",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("rh"))});
        arrayElement.push({name:"tcc", element:"tcc",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("tcc"))});
        arrayElement.push({name:"vis", element:"vis",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("vis"))});*/
        var strElements = JSON.stringify(arrayElement);

        var url=gridServiceUrl+"services/GridService/grid2points"; //格点转任意点
        $.ajax({
            data: {"para": "{type:'"+ GDYB.GridProductClass.currentType + "',makeTime:'" + GDYB.GridProductClass.currentMakeTime
            + "',version:'" + GDYB.GridProductClass.currentVersion + "',elements:"+ strElements + ",points:" + strPoints +"}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(data != null && data.items != null && data.items.length > 0)
                {
                    updateChartTable(data.items, t.myDateSelecter.getCurrentTimeReal());
                }
            },
            error:function(e){

            },
            type: "POST"
        });
        showforcastDiv();
    };
    //趋势图读取时次
    this.getHourSpan = function(element){
        var hourspans = null;
        if(element == "r12" || element == "w" || element == "air" || element == "wmax"){
            hourspans = [12,24,36,48,60,72];
        }
        else if(element == "tmax" || element == "tmin"){
            hourspans = [24,48,72];
        }
        else{
            hourspans = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72];
        }
        return hourspans;
    };

    //展示天气概况
    this.displayWeatherDescription = function(){
        var t = this;
        if(typeof(t.currentPosition)=="undefined")
            return;
        var arrayPoint = [];
        arrayPoint.push({x:t.currentPosition.lon,y:t.currentPosition.lat});
        var strPoints = JSON.stringify(arrayPoint);

        var dateNow = new Date();
        var timeNow = dateNow.getTime();
        var dateStartForecast = t.myDateSelecter.getCurrentTimeReal();
        var timeStartForecast = dateStartForecast.getTime();
        if(timeNow > timeStartForecast) {
            var hourOffset = (timeNow - timeStartForecast) / 1000 / 3600;
            if(hourOffset < 72) { //超过三天的预报，看未来3小时预报已没啥意义了
                var hourSpan3 = 3 + Math.floor(hourOffset/3)*3;
                var hourSpan12 = 12 + Math.floor(hourOffset/12)*12;
                var hourSpan24 = 24 + Math.floor(hourOffset/24)*24;

                var arrayElement = [];
                arrayElement.push({name: "2t", element:"2t", hourSpans: [hourSpan3]});
                arrayElement.push({name: "r3", element:"r3", hourSpans: [hourSpan3]});
                arrayElement.push({name: "wd3", element:"10uv", hourSpans: [hourSpan3]});
                arrayElement.push({name: "ws3", element:"10uv", hourSpans: [hourSpan3]});
                arrayElement.push({name: "rh", element:"rh", hourSpans: [hourSpan3]});
                arrayElement.push({name: "tcc", element:"tcc", hourSpans: [hourSpan3]});
                arrayElement.push({name: "vis", element:"vis", hourSpans: [hourSpan3]});
                arrayElement.push({name: "w", element:"w", hourSpans: [hourSpan12, hourSpan24]});
                arrayElement.push({name: "r12", element:"r12", hourSpans: [hourSpan12, hourSpan24]});
                arrayElement.push({name: "wd", element:"wmax", hourSpans: [hourSpan24]});
                arrayElement.push({name: "ws", element:"wmax", hourSpans: [hourSpan24]});
                arrayElement.push({name: "tmin", element:"tmin", hourSpans: [hourSpan24]});
                arrayElement.push({name: "tmax", element:"tmax", hourSpans: [hourSpan24]});
                arrayElement.push({name: "air", element:"air", hourSpans: [hourSpan24]});
                var strElements = JSON.stringify(arrayElement);

                var url = gridServiceUrl + "services/GridService/grid2points"; //格点转任意点
                $.ajax({
                    data: {"para": "{type:'" + GDYB.GridProductClass.currentType + "',makeTime:'" + GDYB.GridProductClass.currentMakeTime
                    + "',version:'" + GDYB.GridProductClass.currentVersion + "',elements:" + strElements + ",points:" + strPoints + "}"},
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.items != null &&  data.items.length > 0) {
                            updateWeatherDescription(data.items, hourSpan3, hourSpan12, hourSpan24);
                        }
                    },
                    error: function (e) {

                    },
                    type: "POST"
                });
            }
            else{
                $("#weatherDescription").html("无");
            }
        }
        else{
            $("#weatherDescription").html("无");
        }
    };

    /**
     * @author luckyD on 2017/4/11
     * @description 底部时间滑动条
     */
    this.showTimeSlide = function(){
        var myDate = t.myDateSelecter.getCurrentTimeReal();
        myDate.setHours(0);
        var weekday = ["周日","周一","周二","周三","周四","周五","周六"];
        var dateList = [];
        for(var i=0;i<240;i++){
            var year = myDate.getFullYear();
            var mon = (myDate.getMonth()+1).toString().length>1?(myDate.getMonth()+1):("0"+(myDate.getMonth()+1));
            var day = myDate.getDate().toString().length>1?myDate.getDate():("0"+myDate.getDate());
            var dayOfWeek = weekday[parseInt(myDate.getDay())];
            var hour = myDate.getHours().toString().length>1?myDate.getHours():("0"+myDate.getHours());
            dateList.push(year+"/"+mon+"/"+day+"/"+dayOfWeek+"/"+hour+":00");
            myDate.setHours(myDate.getHours()+1);
        }
		var makeTime = $("#selectMakeTime").val();
        timeSlide("progress-bar",0.5/(t.numbers[0]/3),dateList,makeTime,showMap,null);
    };

    function showMap(folderName,b){
        var year = folderName.toString().split("/")[0];
        var mon = folderName.toString().split("/")[1];
        var day = folderName.toString().split("/")[2];
        var hour = folderName.toString().split("/")[4].substr(0,2);
        var minutes = 0;
        var seconds = 0;
        var myDate = new Date();
        myDate.setFullYear(year,mon-1,day);
        myDate.setHours(hour, minutes, seconds, 0);
        var datetime = t.myDateSelecter.getCurrentTimeReal(false);
        var difTimeHour = (myDate.getTime() - datetime.getTime())/3600000;
        t.hourSpan = (Math.floor(difTimeHour/ t.numbers[0]))* t.numbers[0];
        if(difTimeHour% t.numbers[0]==0){
            b = true;
        }
        if(b){
            if($("#elementDiv").find($(".active")).attr("value")=="10uv"||$("#elementDiv").find($(".active")).attr("value")=="wmax"){
                t.clearLayer();
                t.displayStream();
            }else{
                t.clearLayer();
                t.displayGridProduct();
            }
        }
    }

    /**
     * @author luckyD
     * 2017-4-11
     * @description 风场动画
     */
    this.layerFillRangeColor = null; //填色图层
    this.layerStream = null; //流场图层

    //清除图层
    this.clearLayer = function(){
        if(t.layerFillRangeColor != null)
            t.layerFillRangeColor.setDatasetGrid(null);
        if(t.layerStream != null)
            t.layerStream.visibility = false;
        if(GDYB.GridProductClass.layerFillRangeColor != null)
            GDYB.GridProductClass.layerFillRangeColor.setDatasetGrid(null);
    };

    this.displayStream = function(){
        if(this.layerStream == null){
            this.layerStream = new WeatherMap.Layer.StreamLayer("layerStream");
            this.layerStream.resolution = 2;//风场流线密度
            GDYB.Page.curPage.map.addLayer(this.layerStream);
        }else{
            if(this.layerStream.visibility == false){
                this.layerStream.visibility = true;
            }
        }
        if(this.layerFillRangeColor == null){
            this.layerFillRangeColor = new WeatherMap.Layer.FillRangeColorLayer(
                "layerFillRangeColor",
                {
                    "radius":40,
                    "featureWeight":"value",
                    "featureRadius":"geoRadius"
                }
            );
            GDYB.Page.curPage.map.addLayers([this.layerFillRangeColor]);
            this.layerFillRangeColor.alpha = 50;
            this.layerFillRangeColor.isAlwaySmooth = true;
            this.layerFillRangeColor.isSmooth = true;
            this.layerFillRangeColor.isShowLabel = false;
            this.layerFillRangeColor.items = heatMap_10uvStyles;
        }
        var maketime = GDYB.GridProductClass.currentMakeTime;
        var datetime = t.myDateSelecter.getCurrentTime(false);
        var element = $("#elementDiv").find($(".active")).attr("value");
        var houspan = t.hourSpan;
        //this.addGrid(null, '2013-01-01 01:00:00');
        this.addStream(null, "prvn", maketime, datetime, element, houspan);
    };

    //加载流场
    //type：类型，prvn-省台预报，bj-中央台预报,ec-欧洲中心，japan-日本预报，等等
    //maketime：制作时间
    //datetime：预报时间
    //hourspan：预报时效
    this.addStream = function(recall, type, maketime, datetime, element, hourspan){
        var t = this;
        var level = 1000;
        var version = "p";
        var url = gridServiceUrl + "services/GridService/getUV";
        $.ajax({
            url: url,
            data:{"para":"{element:'"+ element + "',type:'"+ type + "',level:'"+ level + "',hourspan:"+ hourspan + ",maketime:'" + maketime + "',version:'" + version + "',datetime:'"+ datetime + "'}"},
            dataType: "json",
            success: function (data) {
                if(typeof(data) != "undefined") {
                    var dvalues = data.dvalues;
                    if (dvalues != null && dvalues.length > 0) {
                        var dimensionsUV = 2; //维度，UV风场有两维
                        var dimensionsWS = 1; //维度，风速场有一维
                        var dMin = 9999;
                        var dMax = -9999;
                        var dgUV = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, dimensionsUV); //u、v
                        dgUV.noDataValue = data.noDataValue;
                        var dgWS = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, data.rows, data.cols, dimensionsWS); //风速
                        dgWS.noDataValue = data.noDataValue;
                        var gridUV = [];
                        var gridWS = [];
                        for (var i = 0; i < data.rows; i++) {
                            var nIndexLine = data.cols * i * dimensionsUV;
                            for (var j = 0; j < data.cols; j++) {
                                var nIndex = nIndexLine + j * dimensionsUV;
                                gridUV.push(Math.round(dvalues[nIndex+1])); //风速在前
                                gridUV.push(Math.round(dvalues[nIndex]));   //风向在后

                                var ws = Math.sqrt(dvalues[nIndex]*dvalues[nIndex]+dvalues[nIndex + 1]*dvalues[nIndex + 1]);
                                gridWS.push(ws);
                                if (ws != 9999 && ws != -9999) {
                                    if (ws < dMin)
                                        dMin = ws;
                                    if (ws > dMax)
                                        dMax = ws;
                                }
                            }
                        }
                        dgUV.grid = gridUV;
                        //dgUV.dMin = dMin;
                        //dgUV.dMax = dMax;
                        t.layerStream.setDatasetGrid(dgUV);

                        dgWS.grid = gridWS;
                        dgWS.dMin = dMin;
                        dgWS.dMax = dMax;
                        t.layerFillRangeColor.setDatasetGrid(dgWS);
                    }
                }
            },
            error: function(e) {
            },
            type: "POST"
        });
    };
}

CPZSPageClass.prototype = new PageBase();
