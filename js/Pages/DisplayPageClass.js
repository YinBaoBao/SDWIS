/**
 * Created by zouwei on 2016/3/4.
 */
function DisplayPageClass(){
    this.myDateSelecter = null;
    this.yubaoshixiaoTools = null;
    this.currentPosition = {lon:108.349,lat:22.82}; //市本站 
    var t = this;

    this.renderMenu = function(){
        //初始化布局
        var width = $("#content_div").css("width");
        var height = $("#content_div").css("height");
        var widthChart = $("#latticeForcast").css("width");
        var heightTable = $("#latticePrecipitation").css("height");
        var heightTopDiv = parseInt(height)-parseInt(heightTable) - 30;
        $("#top_div").css("height",heightTopDiv+"px");
        $("#bottom_div").css("height",(parseInt(heightTable))+"px");
        $("#mapContainer_div").css("width",(parseInt(width)-parseInt(widthChart) - 70)+"px");
        $(".forecastFiles").css("max-height",parseInt($("#cpxzDiv").css("height"))-31);//标题30px

        t.myDateSelecter = new DateSelecter(2, 2); //最小视图为天
        t.myDateSelecter.intervalMinutes = 60*24; //24小时
        $("#dateSelect").append(this.myDateSelecter.div);

        t.yubaoshixiaoTools = new YuBaoshixiaoTools($("#divHourSpan"), t.myDateSelecter.getCurrentTimeReal(), 1);
        t.yubaoshixiaoTools.hourSpan = t.yubaoshixiaoTools.numbers[0];
        regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件
        $("#divHourSpan").find("#"+t.yubaoshixiaoTools.hourSpan+"h").addClass("active");
        var heightMapTool = parseInt($("#divTool").css("height")) + parseInt($("#divHourSpan").css("height"))+2;
        $("#mapTool_div").css("height", heightMapTool);
        $("#map_div").css("height", (heightTopDiv-parseInt(heightMapTool))+"px");

        //初始化参数
        initProductType();
        GDYB.GridProductClass.isBrowseMode = true;

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
        if(dateNow.getHours()<10)
            $("#selectMakeTime").val(5);
        else if(dateNow.getHours() < 16)
            $("#selectMakeTime").val(10);
        else
            $("#selectMakeTime").val(16);
        var makeTimeHour = $("#selectMakeTime").val();
        setForecastTime(dateNow, makeTimeHour);

        //改变制作时间
        this.myDateSelecter.input.change(function(){
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            onChangeDateTime();
        });

        //点击上翻
        t.myDateSelecter.leftBtn.click(function(){
            onChangeDateTime();
        });

        //点击下翻
        t.myDateSelecter.rightBtn.click(function(){
            onChangeDateTime();
        });

        //改变制作时次
        $("#selectMakeTime").change(function() {
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            onChangeDateTime();
        });

        //改变产品类型
        $("#selectProductType").change(function() {
            initProductType();
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(datetime, makeTimeHour);
            t.displayGridProduct();
            t.displayGridValueSerial(); //产品类型改变，同时更新图表
            t.displayWeatherDescription(); //天气概况
        });

        //改变要素
        $("#selectElement").change(function() {
            var element = $("#selectElement").val();
            t.yubaoshixiaoTools.numbers = GDYB.GDYBPage.getHourSpan(element);
            t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
            t.yubaoshixiaoTools.hourSpan = t.yubaoshixiaoTools.numbers[0];
            $("#divHourSpan").find("#"+t.yubaoshixiaoTools.hourSpan+"h").addClass("active");
            regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件
            var heightMapTool = parseInt($("#divTool").css("height")) + parseInt($("#divHourSpan").css("height"))+2;
            $("#mapTool_div").css("height", heightMapTool);
            $("#map_div").css("height", (heightTopDiv-parseInt(heightMapTool))+"px");
            //GDYB.Page.curPage.map.updateSize();
            GDYB.Page.curMap.updateSize();

            t.displayGridProduct();
        });

        //注册时效点击事件
        function regesterYuBaoShiXiaoEvent(){
            $("#divHourSpan").find("td").click(function () {
                if(typeof(this.id) != "undefined" && this.id != "")
                    t.displayGridProduct();
            });
        };

        function initProductType(){
            var strProductType = $("#selectProductType").val();
            var arrayProductType = strProductType.split('_');
            GDYB.GridProductClass.currentType = arrayProductType[0];
            GDYB.GridProductClass.currentVersion = arrayProductType[1];
        }

        function onChangeDateTime(){
            t.displayGridProduct();
            t.displayGridValueSerial(); //时间改变，同时更新图表
            t.displayWeatherDescription(); //天气概况
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

        //鼠标点击事件
        var map= t.map;
        map.events.register("click", map, function(event){
            t.currentPosition = this.getLonLatFromPixel(event.xy);
            if(GDYB.GridProductClass.layerMarkers == null){
                GDYB.GridProductClass.layerMarkers = new WeatherMap.Layer.Markers("layerMarkers");
                //GDYB.Page.curPage.map.addLayers([GDYB.GridProductClass.layerMarkers]);
                GDYB.Page.curMap.addLayers([GDYB.GridProductClass.layerMarkers]);
            }
            GDYB.GridProductClass.layerMarkers.clearMarkers();
            var size = new WeatherMap.Size(25,30);
            var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
            var icon = new WeatherMap.Icon('imgs/marker.png', size, offset);
            GDYB.GridProductClass.layerMarkers.addMarker(new WeatherMap.Marker(new WeatherMap.LonLat(t.currentPosition.lon,t.currentPosition.lat),icon));

            t.displayGridLocation();
            t.displayGridValueSerial();
            t.displayWeatherDescription(); //天气概况
        });

        //键盘按键事件，实现上翻、下翻
        $(document).keydown(function (event) {
            if(document.activeElement.id == "table_yubaoshixiao"){  //时效上下翻
                var offset = 0;
                if(event.keyCode == 37 || event.keyCode == 38)  //左上
                    offset = -1;
                else if(event.keyCode == 39 || event.keyCode == 40) //右下
                    offset = 1;

                if(offset != 0){
                    var hourspans = t.yubaoshixiaoTools.numbers;
                    var hourSpan = t.yubaoshixiaoTools.hourSpan;
                    var nIndex = -1;
                    for(var hKey in hourspans){
                        if(hourspans[hKey] == hourSpan){
                            nIndex = Number(hKey);
                            break;
                        }
                    }
                    nIndex += offset
                    if(nIndex >= hourspans.length)
                        nIndex = 0;
                    else if(nIndex < 0)
                        nIndex = hourspans.length - 1;
                    hourSpan = hourspans[nIndex];
                    $("#table_yubaoshixiao").find("td").removeClass("active");
                    t.yubaoshixiaoTools.hourSpan = hourSpan;
                    $("#table_yubaoshixiao").find("#"+hourSpan+"h").addClass("active");
                    t.displayGridProduct();
                }
            }
        });

        //图表div显示隐藏
        $("#latticeControl").click(function(){
            if($(this).attr("title") == "隐藏"){
                $("#latticeForcast").hide();
                $(this).attr("title","显示图表").html("＜");
                $("#mapContainer_div").css("width","1860px");
                //GDYB.Page.curPage.map.updateSize();
                GDYB.Page.curMap.updateSize();
                $(this).removeClass("latticeControlShow1");
                $(this).addClass("latticeControlHide");
            }
            else{
                $("#latticeForcast").show();
                $(this).attr("title","隐藏").html(">>");
                $("#mapContainer_div").css("width","745px");
                //GDYB.Page.curPage.map.updateSize();
                GDYB.Page.curMap.updateSize();
                $(this).removeClass("latticeControlHide");
                $(this).addClass("latticeControlShow1");
            }
        });

        //表格的显示隐藏
        $(".bottomPanelShow").click(function(){
            if($(this).attr("flag") == "active"){
                $(this).attr("flag","noActive").css({
                    "bottom": "",
                    "background": "",
                    "border": "",
                    "height": "",
                    "line-height": "",
                    "margin-left": ""});
                $(this).find("img").attr("src","imgs/top.png");
                $("#top_div").css("height",heightTopDiv);
                $("#map_div").css("height", heightTopDiv-parseInt(heightMapTool));
                //GDYB.Page.curPage.map.updateSize();
                GDYB.Page.curMap.updateSize();
                $("#bottom_div").css("display","block");
            }
            else{
                $(this).attr("flag","active").css({
                    "bottom": "0px",
                    "background": "white",
                    "border": "1px solid #ccc",
                    "height": "14px",
                    "line-height": "10px",
                    "margin-left": "29%"});
                $(this).find("img").attr("src","imgs/bottom.png");
                $("#top_div").css("height",parseInt(height)-10);
                $("#map_div").css("height", parseInt(height)-parseInt(heightMapTool)-10);
                //GDYB.Page.curPage.map.updateSize();
                GDYB.Page.curMap.updateSize();
                $("#bottom_div").css("display","none");
            }
        });

        //导航点击事件
        $("#nav_menu").find("li").click(function(){
            if(this.id == "menu_gdzs"){
                $("#cpxzDiv").css("display","none");
                $("#menu").css("display","none");
                $("#gdzsDiv").css("display","block");
            }
            else if(this.id == "menu_cpxz"){
                $("#cpxzDiv").css("display","block");
                $("#gdzsDiv").css("display","none");
                $("#menu").css("display","block");

                var htmlStr = "<div id='div_datetime' style='padding-left:10px;height: 40px;'>"
                    +"<div id='dateSelect' style='margin: 10px 0px 0px 0px;float: left;width: 140px;height: 26px;'></div>" +
                    "<div id='zdybTimeTypeDiv' class='zdybTimeTypeDiv'><input type='radio' name='zdybtime' checked='true' style='height: 18px;'><span class='zdybTimeType'>全部</span>" +
                    "<input type='radio' name='zdybtime' style='height: 18px;'><span class='zdybTimeType'>早晨</span>" +
                    "<input type='radio' name='zdybtime' style='height: 18px;'><span class='zdybTimeType'>上午</span>" +
                    "<input type='radio' name='zdybtime' style='height: 18px;'><span class='zdybTimeType'>下午</span></div></div>"
                    +"<div id='zdybProductTypePanel' class=''></div>"
                    +"</div>";
                $("#menu_bd").html(htmlStr);
                t.myDateSelecter = new DateSelecter(2,2,"yyyy-mm-dd");
                t.myDateSelecter.intervalMinutes = 60*24; //24小时
                $("#dateSelect").html(t.myDateSelecter.div);
                $("#dateSelect").find("input").css("width","90px");
                //获取所有产品
                GDYB.GridProductClass.init(function(){
                    if(GDYB.GridProductClass.currentUserDepart.departCode.length == 2){
                        t.areaName = "qutai";
                    }
                    else{
                        t.areaName = "shitai";
                    }
                    getZDYBPublishTime();
                });
                //时间选择事件
                t.myDateSelecter.input.change(function(){
                    $("#zdybProductTypePanel").find(".productActive").click();
                });
                //时间选择事件
                t.myDateSelecter.leftBtn.click(function(){
                    $("#zdybProductTypePanel").find(".productActive").click();
                });
                //时间选择事件
                t.myDateSelecter.rightBtn.click(function(){
                    $("#zdybProductTypePanel").find(".productActive").click();
                });

                //时间类别选择
                $("#zdybTimeTypeDiv").find("input").click(function(){
                    var name = $(this).next().html();
                    var list = $("#zdybProductTypePanel").find("div.dis_menu_body_item");
                    if(name == "全部"){
                        $("#zdybProductTypePanel").find("div.dis_menu_body_item").css("display","block");
                    }
                    else if(name == "早晨"){
                        for(var i=0;i<list.length;i++){
                            if($(list[i]).attr("elementId")=="-1"){
                                continue;
                            }
                            var publishTime = t.elementData[parseInt($(list[i]).attr("elementId"))].publishTime;
                            if(publishTime>=0&&publishTime<8){
                                $(list[i]).css("display","block");
                            }
                            else{
                                $(list[i]).css("display","none");
                            }
                        }
                    }
                    else if(name == "上午"){
                        for(var i=0;i<list.length;i++){
                            if($(list[i]).attr("elementId")=="-1"){
                                continue;
                            }
                            var publishTime = t.elementData[parseInt($(list[i]).attr("elementId"))].publishTime;
                            if(publishTime>=8&&publishTime<12){
                                $(list[i]).css("display","block");
                            }
                            else{
                                $(list[i]).css("display","none");
                            }
                        }
                    }
                    else if(name == "下午"){
                        for(var i=0;i<list.length;i++){
                            if($(list[i]).attr("elementId")=="-1"){
                                continue;
                            }
                            var publishTime = t.elementData[parseInt($(list[i]).attr("elementId"))].publishTime;
                            if(publishTime>=12&&publishTime<24){
                                $(list[i]).css("display","block");
                            }
                            else{
                                $(list[i]).css("display","none");
                            }
                        }
                    }
                });
            }
        });

        initChartTable(); //初始化图表
        t.displayGridValueSerial(); //更新图表
        this.displayGridLocation(); //显示定位信息
        setTimeout(function(){
            t.displayGridProduct(t);
        }, 1000); //显示格点产品
        t.displayWeatherDescription(); //天气概况
    };

    //展示格点产品
    this.displayGridProduct = function(t){
        var t = typeof(t)=="undefined"?this:t;
        var type = GDYB.GridProductClass.currentType;
        var element = $("#selectElement").val();
        var elementName = $("#selectElement").find("option:selected").text();
        var maketime = GDYB.GridProductClass.currentMakeTime;
        var version = GDYB.GridProductClass.currentVersion;
        var datetime = t.myDateSelecter.getCurrentTime(false);
        var hourspan = t.yubaoshixiaoTools.hourSpan;
        var fromModel;
        var level = 1000;
        if(type == null || element == null || hourspan == null)
            return;

        //获取上一次效
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

    //显示当前位置
    this.displayGridLocation = function(){
        var t = this;
        var url=gridServiceUrl+"services/AdminDivisionService/getLocationInfo";
        $.ajax({
            data: {"para": "{x:"+ t.currentPosition.lon + ",y:" + t.currentPosition.lat +"}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(data != null)
                {
                    updateLocationInfo(t.currentPosition.lon, t.currentPosition.lat, data.province_name, data.city_name, data.county_name);
                }
            },
            error:function(e){

            },
            type: "POST"
        });
    };

    //展示趋势图
    this.displayGridValueSerial = function(){
        var t = this;
        var arrayPoint = [];
        arrayPoint.push({x:t.currentPosition.lon,y:t.currentPosition.lat});
        var strPoints = JSON.stringify(arrayPoint);

        var arrayElement = [];
        arrayElement.push({name:"2t", element:"2t",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("2t"))});
        arrayElement.push({name:"r3", element:"r3",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("r3"))});
        arrayElement.push({name:"wd3", element:"10uv",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("10uv"))});
        arrayElement.push({name:"ws3", element:"10uv",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("10uv"))});
        arrayElement.push({name:"rh", element:"rh",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("rh"))});
        arrayElement.push({name:"tcc", element:"tcc",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("tcc"))});
        arrayElement.push({name:"vis", element:"vis",hourSpans:JSON.stringify(GDYB.GDYBPage.getHourSpan("vis"))});
        var strElements = JSON.stringify(arrayElement);

        var url=getGridServiceUrl(GDYB.GridProductClass.currentMakeTime)+"services/GridService/grid2points"; //格点转任意点
        $.ajax({
            data: {"para": "{type:'"+ GDYB.GridProductClass.currentType + "',makeTime:'" + GDYB.GridProductClass.currentMakeTime
                + "',version:'" + GDYB.GridProductClass.currentVersion + "',elements:"+ strElements + ",points:" + strPoints +"}"},
            url: url,
            dataType: "json",
            success: function (data) {
                if(data != null && data.items.length > 0)
                {
                    updateChartTable(data.items, t.myDateSelecter.getCurrentTimeReal());
                }
            },
            error:function(e){

            },
            type: "POST"
        });
    };

    //展示天气概况
    this.displayWeatherDescription = function(){
        var t = this;
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

                var url = getGridServiceUrl(GDYB.GridProductClass.currentMakeTime) + "services/GridService/grid2points"; //格点转任意点
                $.ajax({
                    data: {"para": "{type:'" + GDYB.GridProductClass.currentType + "',makeTime:'" + GDYB.GridProductClass.currentMakeTime
                        + "',version:'" + GDYB.GridProductClass.currentVersion + "',elements:" + strElements + ",points:" + strPoints + "}"},
                    url: url,
                    dataType: "json",
                    success: function (data) {
                        if (data != null && data.items.length > 0) {
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

    //格点与站点下载
    function getZDYBPublishTime(){
        $.ajax({
            type: 'post',
            url: gridServiceUrl+"services/ForecastfineService/getZDYBPublishTime",
            data: {'para': '{"depart":"%'+ t.areaName+'%","areaCode":"%'+GDYB.GridProductClass.currentUserDepart.departCode+',%"}'},
            dataType: 'json',
            error: function () {
                alert('获取制作时间出错!');
            },
            success: function (data) {
                t.elementData = data;
                for(var i=0;i< data.length;i++){
                    if(GDYB.GridProductClass.currentUserDepart.departCode.length == 2){
                        t.elementData[i].gdybPublishTime = t.elementData[i].gdybPublishTime.split(",")[0];
                        t.elementData[i].endTime = t.elementData[i].endTime.split(",")[0];
                        t.elementData[i].gdybType = t.elementData[i].gdybType.split(",")[0];
                        t.elementData[i].makeTime = t.elementData[i].makeTime.split(",")[0];
                        t.elementData[i].regular = t.elementData[i].regular.split(",")[0];
                    }
                    else{
                        t.elementData[i].gdybPublishTime = t.elementData[i].gdybPublishTime.split(",")[1];
                        t.elementData[i].endTime = t.elementData[i].endTime.split(",")[1];
                        t.elementData[i].gdybType = t.elementData[i].gdybType.split(",")[1];
                        t.elementData[i].makeTime = t.elementData[i].makeTime.split(",")[1];
                        t.elementData[i].regular = t.elementData[i].regular.split(",")[1];
                    }
                }
                var contentProduct = '<div class="dis_menu_head" >格点预报</div><div class="dis_menu_body">' +
                    '<div class="dis_menu_body_item" href="#" elementId="-1" flag="05">05时格点预报</div>' +
                    '<div class="dis_menu_body_item" href="#" elementId="-1" flag="10">10时格点预报</div>' +
                    '<div class="dis_menu_body_item" href="#" elementId="-1" flag="16">16时格点预报</div></div>';
                var productName = "";
                for(var i=0;i<data.length;i++){
                    if(productName != data[i].type){
                        productName = data[i].type;
                        if(i!=0){
                            contentProduct += '</div>';
                        }
                        contentProduct += '<div class="dis_menu_head" >'+data[i].productName+'</div>' +
                            '<div class="dis_menu_body">';
                    }
                    contentProduct += '<div class="dis_menu_body_item" href="#" elementId="'+i+'">' + data[i].name + '</div>';
                }
                contentProduct += '</div>';
                $("#zdybProductTypePanel").html(contentProduct);
                $("#zdybProductTypePanel").find("div.dis_menu_body_item").click(function(){
                    $("#zdybProductTypePanel").find("div.dis_menu_body_item").css("background-color","");
                    $("#zdybProductTypePanel").find("div.productActive").removeClass("productActive");
                    $(this).css("background-color","rgb(158,195,255)");
                    $(this).addClass("productActive");
                    if($(this).attr("elementId")=="-1"){
                        $("#ZDYBAllContent").css("display","none");
                        $("#gdybProduct").css("display","block");
                        displayGridFiles($(this).attr("flag"));
                    }
                    else{
                        $("#ZDYBAllContent").css("display","block");
                        $("#gdybProduct").css("display","none");
                        displayZDYBFiles(this);
                    }

                });
                $("#zdybProductTypePanel div.dis_menu_head").click(function() {
                    if ($(this).hasClass("dis_current")) {
                        $(this).removeClass("dis_current").next("div.dis_menu_body").slideToggle(300);
                    } else {
                        $(this).addClass("dis_current").next("div.dis_menu_body").slideToggle(300).slideUp("slow");
                    }
                });

                $($("#zdybProductTypePanel").find(".dis_menu_body_item")[0]).click();
            }
        });
    }

    function displayGridFiles(e) {
        var makeTimeHour = e;
        var today = $("#dateSelect").find("input").val();
        var makeTime = today.substr(0, 10) + " " + makeTimeHour + ":00:00";
        var param = "{makeTime:'"+ makeTime+"'}";
        $("#gdybTitle").html("山东气象台"+today.substr(0, 4)+"年"+today.substr(5, 2)+"月"+today.substr(8, 2)+"日"+makeTimeHour+"时格点预报");
        $.ajax({
            type: 'post',
            url: gridServiceUrl+"services/GridService/getGridFiles",
            data: {'para': param},
            dataType: 'json',
            error: function () {
                alert("获取格点报文件列表错误！");
            },
            success: function (data) {
                if(data != null && data.length == 0)
                    return;
                //计算每个要素有多少个文件，rowspan
                var count = 0;
                var keyvalue = {};
                for(var i=0;i<data.length; i++){
                    if(i > 0 && data[i-1].tag != data[i].tag){
                        keyvalue[data[i-1].tag] = count;
                        count = 0;
                    }
                    else if(i==(data.length-1)){
                        keyvalue[data[i-1].tag] = count+1;
                        count = 0;
                    }
                    count++;
                }

                var contentHtml = "";
                for(var i=0;i<data.length; i++) {
                    var fileinfo = data[i];
                    var size = fileinfo.size / 1024;
                    size = size > 1024 ? Math.round(size / 1024 * 10.0) / 10.0 + "M" : Math.round(size * 10.0) / 10.0 + "KB";
                    var img = ""
                    if (i == 0 || data[i - 1].tag != data[i].tag) {
                        if(i!=0){
                            contentHtml += "</table>";
                        }
                        contentHtml += "<table class='tableFiles' border='1'><tr><td rowspan='" + keyvalue[fileinfo.tag] + "'><div>" + fileinfo.tag + "</div><div class='batchDown' style='color:#0000ff;cursor:pointer'>批量下载</div></td>" + "<td style='width:500px;color:#"+(fileinfo.status==0?"ff0000":"000000")+"'>" + fileinfo.fileName + "</td>" + "<td>" + size + "</td>" + "<td>" + (fileinfo.status==0?"<img src='imgs/img_error.png'>":"<img src='imgs/img_right.png'>") + "</td>" + "<td style='color:#0000ff;cursor:pointer'>"+(fileinfo.status==0?"":"<a href='../WMGridService/services/ForecastfineService/downloadForecast?filename="+fileinfo.fileName+"&filepath="+fileinfo.path+"/'>下载</a>")+"</td></tr>";
                    }
                    else {
                        contentHtml += "<tr><td style='width:500px;color:#"+(fileinfo.status==0?"ff0000":"000000")+"'>" + fileinfo.fileName + "</td>" + "<td>" + size + "</td>" + "<td>" + (fileinfo.status==0?"<img src='imgs/img_error.png'>":"<img src='imgs/img_right.png'>") + "</td>" + "<td style='color:#0000ff;cursor:pointer'>"+(fileinfo.status==0?"":"<a href='../WMGridService/services/ForecastfineService/downloadForecast?filename="+fileinfo.fileName+"&filepath="+fileinfo.path+"/'>下载</a>")+"</tr>";
                    }
                }
                $("#tableFiles").html(contentHtml);
                $(".batchDown").click(function(){
                    var list = $(this).parent().parent().parent().find("a");
                    for(var i=0;i<list.length;i++){
                        window.open(list[i].href);
                    }
                });
            }
        });
    }

    function displayZDYBFiles(obj){
        var nowTime = $("#dateSelect").find("input").val();
        var timeStr = nowTime.substr(0,4)+nowTime.substr(5,2)+nowTime.substr(8,2);
        var nowDate = new Date(nowTime.substr(5,2)+" "+nowTime.substr(8,2)+","+nowTime.substr(0,4));
        nowDate.setDate(nowDate.getDate()-1);
        var makeTime = nowDate.getFullYear()+(Array(2).join(0)+(nowDate.getMonth()+1)).slice(-2)+(Array(2).join(0)+nowDate.getDate()).slice(-2);
        var elementId = parseInt($(obj).attr("elementId"));
        var nowElement = t.elementData[elementId];
        var time = nowTime.substr(0,4)+"年"+nowTime.substr(5,2)+"月"+nowTime.substr(8,2)+"日";
        $("#zdybTitle").html(GDYB.GridProductClass.currentUserDepart.departName+"气象台"+time+nowElement.name);//标题
        var regular = nowElement.regular;
        regular = regular.replace("yyyymmdd(-1)",makeTime);
        regular = regular.replace("yyyymmdd",timeStr);
        regular = regular.replace("mmdd",(nowTime.substr(5,2)+nowTime.substr(8,2)));
        regular = regular.replace("dd",nowTime.substr(8,2));
        regular = regular.replace("cccc",GDYB.GridProductClass.currentUserDepart.codeOfTownForecast);
        regular = regular.replace("ds",GDYB.GridProductClass.currentUserDepart.codeOfGuidanceForecast);
        var areaName = "";
       /* if(t.areaName == "qutai"){
            areaName += "省台/";
        }
        else{
            areaName += "市台/";
        }*/
        $.ajax({
            type: 'post',
            url: gridServiceUrl + "services/ForecastfineService/getZDYBOutType",
            data: null,
            dataType: 'json',
            error: function () {
                alert('获取输出类型错误!');
            },
            success: function (data) {
                var list = [];
                var outType = [];
                if (nowElement.outType != null && nowElement.outType != "") {
                    list = nowElement.outType.split(",");
                }
                for (var i = 0; i < list.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (list[i] == data[j].type.toString()) {
                            outType.push(data[j]);
                        }
                    }
                }
                var productNameStr = "";
                for(var i=0;i<outType.length;i++){
                    productNameStr += areaName+nowElement.productName+"/"+outType[i].name+",";
                }
                productNameStr = productNameStr.substr(0,productNameStr.length-1);
                var regularList = regular.split(";");
                var regularStr = "";
                for(var i=0;i<regularList.length;i++){
                    regularStr += regularList[i]+",";
                }
                regularStr = regularStr.substr(0,regularStr.length-1);
                var param = '{"productName":"'+productNameStr+'","regular":"'+regularStr+'"}';
                $.ajax({
                    type: 'post',
                    url: gridServiceUrl+"services/ForecastfineService/zdybGetForecastName",
                    data: {'para': param},
                    dataType: 'json',
                    error: function () {
                        alert('获取文件名错误!');
                    },
                    success: function (data) {
                        var keyvalue = {};
                        for(var i=0;i<data.length;i++){
                            if(typeof (keyvalue[data[i].type]) == "undefined"){
                                keyvalue[data[i].type] = 1;
                            }
                            else{
                                keyvalue[data[i].type]++;
                            }
                        }
                        var contentHtml = "";
                        var type = "-1";
                        if(data.length != 0){
                            for(var i=0;i<data.length;i++){
                                if(data[i].type!=type){
                                    type = data[i].type;
                                    if(i!=0){
                                        contentHtml += "</table>";
                                    }
                                    contentHtml += "<table class='tableFiles' border='1'><tr><td rowspan='" + keyvalue[data[i].type] + "'><div>" + data[i].type + "</div><div class='batchDown' style='color:#0000ff;cursor:pointer'>批量下载</div></td>" + "<td style='width:500px;color:#"+(data[i].status==0?"ff0000":"000000")+"'>" + data[i].name + "</td>" + "<td>" + 0 + "</td>" + "<td>" + (data[i].status==0?"<img src='imgs/img_error.png'>":"<img src='imgs/img_right.png'>") + "</td>" + "<td style='color:#0000ff;cursor:pointer'>"+(data[i].status==0?"":"<a href='../WMGridService/services/ForecastfineService/downloadForecast?filename="+data[i].name+"&filepath="+data[i].path+"/'><span>下载</span></a>")+"</td></tr>";
                                }
                                else{
                                    contentHtml += "<tr><td style='width:500px;color:#"+(data[i].status==0?"ff0000":"000000")+"'>" + data[i].name + "</td>" + "<td>" + 0 + "</td>" + "<td>" + (data[i].status==0?"<img src='imgs/img_error.png'>":"<img src='imgs/img_right.png'>") + "</td>" + "<td style='color:#0000ff;cursor:pointer'>"+(data[i].status==0?"":"<a href='../WMGridService/services/ForecastfineService/downloadForecast?filename="+data[i].name+"&filepath="+data[i].path+"/'>下载</a>")+"</tr>";
                                }
                            }
                        }
                        $("#zdybtableFiles").html(contentHtml);
                        $(".batchDown").click(function(){
                            var list = $(this).parent().parent().parent().find("a");
                            for(var i=0;i<list.length;i++){
                                window.open(list[i].href);
                            }
                        });
                    }
                });
            }
        });

    }
}

DisplayPageClass.prototype = new PageBase();