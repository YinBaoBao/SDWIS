/**
 * 短临预报通用模块
 * @author POPE
 * @date   2016-08-18
 */
function DLYBCommonClass() {
    if(!(this instanceof DLYBCommonClass)){
        return new DLYBCommonClass();
    }
    this.element =[];
    this.panel = "";
    this.myDateSelecter1 =null;
    this.myDateSelecter2 =null;
    this.myDateSelecter3 =null;
    this.myDateSelecter4 =null;
}
var fnDLYB = DLYBCommonClass.prototype;
//渲染强天气实况面板
fnDLYB.renderQTQSKPanelDom = function(container) {
    var that = this;
    var htmlStr = "<div id='div_type' class=''><div style='background:rgba(173, 210, 248,0.8);color:#000000;font-size:15px'>强天气实况</div>" //rgb(103, 170, 255)
        + "<div id='m_Element'>"
        +"<div style='height: 22px;margin: 5px 0px 0px 5px;'><a id='rhjc_df' class='rhjcHourSpan active' flag='0'>大风</a><img src='./imgs/dafeng1.png' style='margin: 0px 0px 0px 5px;'><img src='./imgs/dafeng2.png' style='margin: 0px 0px 0px 5px;'><img src='./imgs/dafeng3.png' style='margin: 0px 0px 0px 5px;'></div>"
        +"<div style='height: 22px;margin: 5px 0px 0px 5px;'><a id='rhjc_dq' class='rhjcHourSpan active' flag='1'>短强</a><img src='./imgs/duanqiang1.png' style='margin: 0px 0px 0px 5px;'><img src='./imgs/duanqiang2.png' style='margin: 0px 0px 0px 5px;'><img src='./imgs/duanqiang3.png' style='margin: 0px 0px 0px 5px;'></div>"
        +"<div style='height: 22px;margin: 5px 0px 0px 5px;'><a id='rhjc_bb' class='rhjcHourSpan active' flag='2'>冰雹</a><img src='./imgs/bingbao.png' style='margin: 0px 10px 0px 5px;float: left;'><a id='rhjc_sd' class='rhjcHourSpan active' flag='3'>闪电</a><img src='./imgs/shandian.png' style='margin: 0px 10px 0px 5px;float: left;'></div>"
        +"<div style='height: 22px;margin: 5px 0px 0px 5px;'><a id='rhjc_lb' class='rhjcHourSpan active' flag='4'>雷暴</a><img src='./imgs/leibao.png' style='margin: 0px 15px 0px 5px;float: left;'></div>"
        +"</div>"
        +"<div id='m_time'>"
        +"<div style='margin-top: 15px;'>"
        +"<input id='timeRadio' name='timeRange' type='radio' style='margin: -3px 5px 0px 0px;outline: none;' checked />"
        +"<label for='timeRadio' style='display: inline-block;cursor: pointer;line-height: 22px;'>实时</label>"
        +"<span id='nowTime' style='display: inline-block;margin-left: 0px;' class='dateSelect'></span>"
        +"</div>"
        +"<div id='m_TimeRange'>"
        +"<input id='hourRadio' name='timeRange' type='radio' style='margin: -3px 5px 0px 0px;outline: none;' />"
        +"<label for='hourRadio' style='display: inline-block;cursor: pointer;line-height: 22px;'>时段</label><a id='time24hour' class='rhjcHourSpan' style='padding: 0px;float: right;margin-right: 0px;'>24H</a><a id='time12hour' class='rhjcHourSpan' style='padding: 0px;float: right;'>12H</a><a id='time6hour' class='rhjcHourSpan' style='padding: 0px;float: right;'>6H</a>"
        +"<div style='height: 26px;margin-top: 10px;'><span style='float: left;margin-left: 0px;'>从:</span><div id='dateSelect1' class='dateSelect'></div></div>"
        +"<div style='height: 26px;margin-top: 5px;'><span style='float: left;margin-left: 0px;'>到:</span><div id='dateSelect2' class='dateSelect'></div></div>"
        +"</div>"
        +"</div>"
        +"<div id='query_action' class='btn_line3 menuDiv_bottom1' style='height: 30px;padding-left: 0px;margin-top: 10px;'>"
        +"<div id='btnQuery'  class='rhjcQueryTime'>查询</div>"
        +"<div class='rhjcQueryTime'>动画</div>"
        +"<div class='rhjcQueryTime'>停止</div>"
        +"<select id='animationSelect' style='float: left;width: 40px;height: 22px;padding: 2px;margin-left: 0px;'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>"
        +"</div>"
        +"<div id='timeListDiv' class='timeListDiv'></div>"
        +"</div>"
        +"</div>";
        //+"<div id='ldytDiv'></div>";
    $(container).append(htmlStr);
    this.myDateSelecter1 = new DateSelecter(1,1); //最小视图为天
    this.myDateSelecter1.changeHours(-6*60);
    this.myDateSelecter1.intervalMinutes = 60*24; //12小时
    $("#dateSelect1").append(this.myDateSelecter1.div); //开始时间

    this.myDateSelecter2 = new DateSelecter(1,1); //最小视图为天
    this.myDateSelecter2.intervalMinutes = 60*24; //12小时
    $("#dateSelect2").append(this.myDateSelecter2.div); //截止时间

    this.myDateSelecter3 = new DateSelecter(1,1); //最小视图为天
    this.myDateSelecter3.intervalMinutes = 60*24; //12小时
    $("#nowTime").append(this.myDateSelecter3.div); //实时
    //that.initStrongWeatherTime();//初始化时间段每个时次的时间
    that._eventSK();//实况要素点击事件
};
//时间列表点击事件
fnDLYB.eventTime =function(){
    var that = this;
    $("#timeListDiv").find("div").click(function(){
        var divElementActive = $("#timeListDiv").find("div.active");
        if(divElementActive.attr("id") == this.id){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }
            else{
                $(this).addClass("active");
            }
            that.displayStrongWeather();
            return;
        }
        divElementActive.removeClass("active");
        $(this).addClass("active");
        that.displayStrongWeather();
    });
}
//实况要素点击事件
fnDLYB._eventSK =function(){
    var that = this;
    //点击实况要素
    $("#m_Element").find("a").click(function(){
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }
        else{
            $(this).addClass("active");
        }
        that.getElements();
        //return;
        //displayTextData(this.textContent, this.id, t.myDateSelecter.getCurrentTime(false));
    });
    //点击时段
    $("#m_TimeRange").find("a").click(function(){
        $('#hourRadio').attr("checked",true);
        that.timeRangeId = this.id;
        that.myDateSelecter1.setCurrentTime(that.myDateSelecter1.getNowTime());//复原成现在的时间
        //that.myDateSelecter1.changeHours(that.timeCount*60);
        switch(this.id){
            case "time6hour":
                that.myDateSelecter1.changeHours(-6*60);
                that.timeCount = 6;
                break;
            case "time12hour":
                that.myDateSelecter1.changeHours(-12*60);
                that.timeCount = 12;
                break;
            case "time24hour":
                that.myDateSelecter1.changeHours(-24*60);
                that.timeCount = 24;
                break;
        }
        var btnElementActive = $("#m_TimeRange").find("a.active");
        if(btnElementActive.attr("id") == this.id)
        {
            btnElementActive.removeClass("active");
            return;
        }
        btnElementActive.removeClass("active");
        $(this).addClass("active");
        //displayTextData(this.textContent, this.id, t.myDateSelecter.getCurrentTime(false));
    });
    $("#btnQuery").on("click", function () {
        that.getElements();
        var beginTime = that.myDateSelecter1.getCurrentTime(false);
        var endTime = that.myDateSelecter2.getCurrentTime(false);
        var realTime = that.myDateSelecter2.getCurrentTime(false);
        var id = $('#m_time input:radio:checked').attr("id");
        switch(id){
            case "timeRadio": //实时
                GDYB.CimissDataClass.getStrongWeatherDataByRealTime(realTime,that.element,function(){});
                break;
            case "hourRadio"://时段
                $("#timeListDiv").empty();
                that.initStrongWeatherTime();//初始化时间段每个时次的时间
                that.eventTime();//时间列表点击事件
                GDYB.CimissDataClass.getStrongWeatherDataByTimeRange(beginTime,endTime,that.element,function(){});
                break;
        }
    });
};
//获取实况要素
fnDLYB.getElements = function(){
    var that = this;
    var btnElementActive = $("#m_Element").find("a.active");//实况要素
    if(btnElementActive.length > 0){
        var len = btnElementActive.length;
        for(var i =len;i--;){
            that.element.push(btnElementActive[i].id);
        }
    }
    return that.element;
};
//渲染雷达云图面板
fnDLYB.renderLDYTPanelDom = function(container){
    var that = this;
    var htmlStr = "<div id='div_type2' class=''><div style='background:rgba(173, 210, 248,0.8);color:#000000;font-size:15px'>雷达云图</div>"
        +"<div id='div_Radar'>"
        +"<div class='title2'>雷达</div>"
        +"<div class='btn_line'><button id='swan_2dcrmosaic'>三维拼图</button><button id='swan_2det'>回波顶高</button></div>"
        //+"<div style='height: 22px;margin: 5px 0px 0px 20px;'><a id='swan_2dcrmosaic' class='rhjcHourSpan active' flag='0'>三维拼图</a><a id='swan_2det' class='rhjcHourSpan active' flag='0'>回波顶高</a><a id='swan_2dcr' class='rhjcHourSpan active' flag='0'>组合反射率</a></div>"
        //+"<div style='height: 22px;margin: 5px 0px 0px 20px;'><a id='swan_2dcrmosaic' class='rhjcHourSpan active' flag='0'>三维拼图</a><a id='swan_2det' class='rhjcHourSpan active' flag='0'>回波顶高</a><a id='swan_2dcr' class='rhjcHourSpan active' flag='0'>组合反射率</a></div>"
        //+"<div style='height: 22px;margin: 5px 0px 0px 20px;'><a id='swan_2dcrmosaic' class='rhjcHourSpan active' flag='0'>三维拼图</a><a id='swan_2det' class='rhjcHourSpan active' flag='0'>回波顶高</a><a id='swan_2dcr' class='rhjcHourSpan active' flag='0'>组合反射率</a></div>"
        +"<div class='btn_line'><button id='swan_2dcr' class='active'>组合反射率</button><button id='swan_2dvil'>液态含水量</button></div>"
        +"<div class='btn_line'><button id='swan_2dppi0'>基本反射率0.5</button><button id='swan_2dppi1'>基本反射率1.5</button></div>"
        +"<div class='btn_line' style='display:block'><button id='swan_titan' class='active'>TITAN</button><button id='swan_trec'>TREC</button><button id='awx_mcs'>MCS</button></div>"
        +"</div>"
        +"<div id='div_Cloud'>"
        +"<div class='title2'>云图</div>"
        +"<div class='btn_line'><button id='fy2_ir1'>IR1</button><button id='fy2_ir2'>IR2</button></div>"
        +"<div class='btn_line'><button id='fy2_ir3'>IR3</button><button id='fy2_ir4'>IR4</button><button id='fy2_vis'>VIS</button></div></div></div>"
        +"<div id='div_datetime'>"
        +"<div class='title1'>时间</div>"
        +"<div id='dateSelect4' class='dateSelect'></div>"
        +"</div>";
    $(container).append(htmlStr);

    that.myDateSelecter4 = new DateSelecter(1,1); //最小视图为天
    that.myDateSelecter4.intervalMinutes = 60*24; //12小时
    $("#dateSelect4").append(that.myDateSelecter4.div);
    that._eventLDYT();//添加事件
    that.getRadar();//获取雷达
    that.getMicaps();//获取云图
    //点击上翻
    that.myDateSelecter4.leftBtn.click(function(){
        that.getRadar();//获取雷达
        that.getMicaps();//获取云图
    });

    //点击下翻
    that.myDateSelecter4.rightBtn.click(function(){
        that.getRadar();//获取雷达
        that.getMicaps();//获取云图
    });

    //点击时次
    that.myDateSelecter4.input.change(function(){
        that.getRadar();//获取雷达
        that.getMicaps();//获取云图
    });
};
//雷达云图点击事件
fnDLYB._eventLDYT =function(){
    var that = this;
    $("#div_Radar").find("button").click(function(){ //点击雷达
        that.myDateSelecter4.intervalMinutes = 6; //6分钟一次
        if($(this).hasClass("active")){
            $(this).removeClass("active");
        }
        else{
            $(this).addClass("active");
        }
        that.getRadar();
    });

    $("#div_Cloud").find("button").click(function(){ //点击Micaps第13类云图
        that.myDateSelecter4.intervalMinutes = 60; //1小时一次
        that.myDateSelecter4.setCurrentTime(that.myDateSelecter4.getCurrentTimeClock()); //置为整点
        var btnElementActive = $("#div_Cloud").find("button.active");
        if(btnElementActive.attr("id") == this.id){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }
            else{
                $(this).addClass("active");
            }
            that.getMicaps();
            return;
        }
        btnElementActive.removeClass("active");
        $(this).addClass("active");
        that.getMicaps();
    });
};
//获取雷达
fnDLYB.getRadar=function(){
    var btnElementActive = $("#div_Radar").find("button.active");//雷达
    if(btnElementActive.length > 0){
        var len = btnElementActive.length;
        for(var i =len;i--;){
            this.displayRadar(btnElementActive[i].id);
        }
    }
}
//显示雷达
fnDLYB.displayRadar = function(element){
    //var btnRadarElement = $("#div_Radar").find("button.active");
    //var element = btnRadarElement.attr("id");
    var level = 0; //仰角
    var datetime = this.myDateSelecter4.getCurrentTime(false);
    GDYB.RadarDataClass.displayRadarData(null, element, level, datetime,GridForecast.curMap);
};
//获取云图
fnDLYB.getMicaps=function(){
    var btnElementActive = $("#div_Cloud").find("button.active");//云图
    this.displayMicaps(btnElementActive.attr("id"), 1000, this.myDateSelecter4.getCurrentTime(false), 0);
}
//显示云图
fnDLYB.displayMicaps=function(element, level, datetime, hourspan){
    GDYB.MicapsDataClass.displayMicapsData(null, element, level, datetime, hourspan,GridForecast.curMap);
}
//显示CIMISS强天气数据
fnDLYB.displayStrongWeather=function(){
    var divElementActive = $("#timeListDiv").find("div.active");
    var time = divElementActive.text();
    //layer.msg(divElementActive.text());
    GDYB.CimissDataClass.displayLiveDataByTime(time);
}
//初始化时间段每个时次的时间
fnDLYB.initStrongWeatherTime = function(){
    var that = this;
    var beginTime = that.myDateSelecter1.getCurrentTime(false);
    var endTime = that.myDateSelecter2.getCurrentTime(false);
    var hourLater = beginTime;
    var hourCount = that.getHourCount(beginTime,endTime);
    if(hourCount>0){
        var div ="<div id ='time0' class='active'>"+ hourLater +"</div>";
        $("#timeListDiv").append(div);
        for(var i =0;i<hourCount;i++){
            hourLater = that.getHourLater(hourLater);
            var id ="time"+ (i+1);
            div ="<div id ='"+id+"'>"+ hourLater +"</div>";
            $("#timeListDiv").append(div);
        }
    }
    //var html ="<div id ='time1'>2016-09-01 23:00:00 000</div>"
    //    +"<div id ='time2'>2016-09-02 02:00:00 000</div>"
    //    +"<div id ='time3'>2016-09-02 05:00:00 000</div>"
    //    +"<div id ='time4'>2016-09-02 08:00:00 000</div>"
    //    +"<div id ='time5'>2016-09-02 12:00:00 000</div>"
    //    +"<div id ='time6'>2016-09-02 15:00:00 000</div>";

}
//获取两个时间相差的小时数
fnDLYB.getHourCount = function(beginTime,endTime){
    var date1 = new Date(beginTime); //开始时间
    var date2 = new Date(endTime); //结束时间
    var date3 = date2.getTime()-date1.getTime(); //时间差的毫秒数

    var days = Math.floor(date3/(24*3600*1000));//计算出相差天数
    var leave1=date3%(24*3600*1000); //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1/(3600*1000));//计算出小时数
    return hours;
}
//获取一个小时后的时间
fnDLYB.getHourLater = function (time) {
    var myDate = new Date(time);
    myDate.setHours(myDate.getHours()+1,00,00);
    myDate.setMinutes(myDate.getMinutes(),00);
    var Y = myDate.getFullYear();
    var M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1);
    var D = (myDate.getDate() < 10 ? '0'+(myDate.getDate()) : myDate.getDate());
    var h = (myDate.getHours() < 10 ? '0'+(myDate.getHours()) : myDate.getHours());
    var m = (myDate.getMinutes() < 10 ? '0'+(myDate.getMinutes()) : myDate.getMinutes());
    var s = (myDate.getSeconds() < 10 ? '0'+(myDate.getSeconds()) : myDate.getSeconds());
    var result = Y+"-"+M+"-"+D+" "+h+":"+m+":"+s;
    return result;
};