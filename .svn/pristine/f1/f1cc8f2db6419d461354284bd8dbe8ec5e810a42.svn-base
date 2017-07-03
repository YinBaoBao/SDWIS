/**
 * @module CIMISS数据获取和展示
 * @author POPE
 * @date   2016-07-20
 */
;(function(window,docunment){}(window, document));
var m_begintime = null;
var m_layerPlot = null;
var m_layerContour = null;
var m_layerFillRangeColor = null;
var m_clipRegion = null;
var showName ="";
var m_style = null;
var strategy = null;
function CimissDataClass() {
	if(!(this instanceof CimissDataClass)){
		return new CimissDataClass();
	}
	this.map = null;                    //地图
	this.isInitialized = false;         //是否已初始化
	this.layerPlot = null;              //填图图层
	this.currentElement = null;         //当前要素
	this.currentDateTime = null;        //当前时次
	this.layerLabel = null;             //填值图层
	this.layerPlot = null;              //填图图层
	this.layerContour = null;           //等值线图层
	this.layerPolygon = null;           //色斑图
	this.layerFillRangeColor = null;     //填色图层
	this.clipRegion = null;             //裁剪多边形
}

var fnCimiss = CimissDataClass.prototype;

fnCimiss.init = function(){

}

//按时间检索高空数据要素
fnCimiss.getUparEleByTime = function (elements, times ,callbackName,callback) {
	var data ={
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":"getUparEleByTime",
		"dataCode":"UPAR_CHN_LIGHT_MUL", //中国闪电定位数据要素
		//"elements":elements,
		"elements":GridForecast.CiMissConfig.elements+","+elements,
		"times":times,
		//"distinct":true,
		"orderBy":"Lat:asc", //排序字段，按照纬度升序排序，从南到北
		"dataFormat":"jsonp",
		"callbackName":callbackName
	}
	this.getDataByAjax(data,callback);
}
//按时间段检索高空数据要素
fnCimiss.getUparEleByTimes = function (elements, times ,callbackName,callback) {
	var data ={
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":"getUparLightEleInRectByTimeRange",
		"dataCode":"UPAR_CHN_LIGHT_MUL", //中国闪电定位数据要素
		"elements":elements,
		//"elements":"Lat,Lon,Layer_Num,Lit_Current,MARS_3,Pois_Err,Pois_Type,Lit_Prov,Lit_City,Lit_Cnty,"+elements,
		"timeRange":times,
		"minLat":"34.25",
		"maxLat":"38.23",
		"minLon":"114.36",
		"maxLon":"122.43",
		//"distinct":true,
		"orderBy":"Lat:asc", //排序字段，按照纬度升序排序，从南到北
		"dataFormat":"jsonp",
		"callbackName":callbackName
	}
	this.getDataByAjax(data,callback);
}
//按时间获取地面逐小时资料
fnCimiss.getSurfEleInRegionByTime = function(elements,times,stals,eleValueRanges,callbackName,callback){
	var data ={
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":"getSurfEleInRegionByTime",
		"dataCode":"SURF_CHN_MUL_HOR", //中国地面逐小时资料
		"times":times,
		"adminCodes":GridForecast.CiMissConfig.AreaCode,
		"elements":elements,
		//"orderBy":"Lat:asc", //排序字段，按照纬度升序排序，从南到北
		"orderBy":"Datetime:asc", //排序字段，起报时间，低-高
		"dataFormat":"jsonp",
		//"staLevels":"011,012,013,014",
		"staLevels":stalDeal(stals),
		//"eleValueRanges":eleValueRanges,//要素值范围
		"callbackName":callbackName
	}
	if(!(eleValueRanges == "" || typeof(eleValueRanges) == "undefined")){
		data.eleValueRanges = eleValueRanges;
	}
	//$.getJSON(GridForecast.CiMissConfig.url,data, function(d){
	//    if(d !=null && d.DS !=null && d.DS.length > 0 ) {
	//    }
	//});
	this.getDataByAjax(data,callback);
}
//按时间段获取地面逐分钟降水资料
fnCimiss.getSurfEleInRegionByMinute = function(elements,times,timeAjust,stals,eleValueRanges,callbackName,callback){
	//接收时间转化为10分钟
	function getMyCimissMinutes(yourTime,ajust){
		var timeAdd = new Date();
		var newTime = new Date(yourTime).setMinutes(timeAdd.getMinutes());
		//保证时间的准确性，从格林尼治时间计算时间：调整的时间+世界时
		var myDate = new Date(newTime+(ajust*60*1000)-8*60*60*1000);
		var Y = myDate.getFullYear();
		var M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1);
		var D = (myDate.getDate() < 10 ? '0'+(myDate.getDate()) : myDate.getDate());
		var h = (myDate.getHours() < 10 ? '0'+(myDate.getHours()) : myDate.getHours());
		var m = (myDate.getMinutes() < 10 ? '0'+(myDate.getMinutes()) : myDate.getMinutes());
		var s = (myDate.getSeconds() < 10 ? '0'+(myDate.getSeconds()) : myDate.getSeconds());
		var result = Y+""+M+""+D+""+h+""+m+""+s;
		return result;
	}
	function minutesDeal(timeObj,ajust){
		if(isArray(timeObj)){
			var timeArray ="[";
			for(var i= 0;i<timeObj.length;i++){
				var tempTime = getMyCimissMinutes(timeObj[i],0);
				if(i == (timeObj.length-1)){
					timeArray+=tempTime+"]";
				}else{
					timeArray+=tempTime+",";
				}
			}
			return timeArray;
		}
		return "["+getMyCimissMinutes(timeObj,ajust)+","+getMyCimissMinutes(timeObj,0)+"]";
	}
	var data ={
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":"getSurfEleInRegionByTimeRange",
		"dataCode":"SURF_CHN_PRE_MIN", //中国地面逐分钟降水资料
		"timeRange":minutesDeal(times,timeAjust),
		"adminCodes":GridForecast.CiMissConfig.AreaCode,
		"elements":elements,
		//"staLevels":"011,012,013,014",
		"staLevels":stalDeal(stals),
		//"eleValueRanges":eleValueRanges,//要素值范围
		"orderBy":"Lat:desc", //排序字段，按照纬度降序排序，从北到南
		"dataFormat":"jsonp",
		"callbackName":callbackName
	}
	if(!(eleValueRanges == "" || typeof(eleValueRanges) == "undefined")){
		data.eleValueRanges = eleValueRanges;
	}
	this.getDataByAjax(data,callback);
}
//按时间段获取地面逐小时资料
fnCimiss.getSurfEleInRegionByTimeRange = function(elements, timeRange ,stals,eleValueRanges,callbackName,callback){
	var data ={
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":"getSurfEleInRegionByTimeRange",
		"dataCode":"SURF_CHN_MUL_HOR", //中国地面逐小时资料
		"timeRange":timeRange,
		"adminCodes":GridForecast.CiMissConfig.AreaCode,
		"elements":elements,
		//"staLevels":"011,012,013,014",
		"staLevels":stalDeal(stals),
		//"eleValueRanges":eleValueRanges,//要素值范围
		"orderBy":"Lat:desc", //排序字段，按照纬度降序排序，从北到南
		"dataFormat":"jsonp",
		//"limitCnt":2500,
		"callbackName":callbackName
	}
	if(!(eleValueRanges == "" || typeof(eleValueRanges) == "undefined")){
		data.eleValueRanges = eleValueRanges;
	}
	this.getDataByAjax(data,callback);
}
//ajax请求cimiss数据
fnCimiss.getDataByAjax = function (data,callback) {
	var that =this;
	$.ajax({
		data:data,
		url:GridForecast.CiMissConfig.url,
		dataType:"jsonp",
		type:"get", //jquery是不支持post方式跨域的
		timeout:60000,
		success:function(d){

		},
		error : function(err) {
			/*
			console.log(err);
			//请求超时后
			$("#div_progress_title").html("<font style='color:red'>暂无数据 ！</font>");
			setTimeout(function() {
				$("#div_progress").css("display", "none");
			},1000);
			layer.alert('<font style="color:red">暂无数据 ！</font>', {
				icon: 2
				, time: 2000 //2秒关闭（如果不配置，默认是3秒）
			});
			 */
			if($.isFunction(callback)){
				callback.call(that,err);
			}

		}
	});
};
/**
 * 时间格式处理
 */
//获取cimiss格式时间，参数times格式：2016-07-20 10:00:00
fnCimiss.getCimissTime = function (time) {
	var myDate = new Date(time);
	myDate.setHours(myDate.getHours()-8,00,00);
	myDate.setMinutes(myDate.getMinutes(),00);
	var Y = myDate.getFullYear();
	var M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1);
	var D = (myDate.getDate() < 10 ? '0'+(myDate.getDate()) : myDate.getDate());
	var h = (myDate.getHours() < 10 ? '0'+(myDate.getHours()) : myDate.getHours());
	var m = (myDate.getMinutes() < 10 ? '0'+(myDate.getMinutes()) : myDate.getMinutes());
	var s = (myDate.getSeconds() < 10 ? '0'+(myDate.getSeconds()) : myDate.getSeconds());
	var result = Y+""+M+""+D+""+h+""+m+""+s;
	return result;
};
fnCimiss.getStringCimissTime = function (time) {
	var myDate = new Date(time);
	myDate.setHours(myDate.getHours()-8,00,00);
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
//通过类型获取cimiss格式时间，参数times格式：2016-07-20 10:00:00，如3,6,12,24小时雨量的时间
fnCimiss.getCimissTimeByType = function (time,type) {
	var myDate = new Date(time);
	switch (type){
		default:
			myDate.setHours(myDate.getHours()-8,00,00);
			break;
		case "0" :
			myDate.setHours(myDate.getHours()-8,00,00);
			break;
		case "1" :
			myDate.setHours(myDate.getHours()-9,00,00);
			break;
		case "2" :
			myDate.setHours(myDate.getHours()-10,00,00);
			break;
		case "3" :
			myDate.setHours(myDate.getHours()-11,00,00);
			break;
		case "4" :
			myDate.setHours(myDate.getHours()-12,00,00);
			break;
		case "5" :
			myDate.setHours(myDate.getHours()-13,00,00);
			break;
		case "6" :
			myDate.setHours(myDate.getHours()-14,00,00);
			break;
		case "7" :
			myDate.setHours(myDate.getHours()-15,00,00);
			break;
		case "8" :
			myDate.setHours(myDate.getHours()-16,00,00);
			break;
		case "9" :
			myDate.setHours(myDate.getHours()-17,00,00);
			break;
		case "10" :
			myDate.setHours(myDate.getHours()-18,00,00);
			break;
		case "11" :
			myDate.setHours(myDate.getHours()-19,00,00);
			break;
		case "12" :
			myDate.setHours(myDate.getHours()-20,00,00);
			break;
		case "13" :
			myDate.setHours(myDate.getHours()-21,00,00);
			break;
		case "14" :
			myDate.setHours(myDate.getHours()-22,00,00);
			break;
		case "15" :
			myDate.setHours(myDate.getHours()-23,00,00);
			break;
		case "16" :
			myDate.setHours(myDate.getHours()-24,00,00);
			break;
		case "17" :
			myDate.setHours(myDate.getHours()-25,00,00);
			break;
		case "18" :
			myDate.setHours(myDate.getHours()-26,00,00);
			break;
		case "19" :
			myDate.setHours(myDate.getHours()-27,00,00);
			break;
		case "20" :
			myDate.setHours(myDate.getHours()-28,00,00);
			break;
		case "21" :
			myDate.setHours(myDate.getHours()-29,00,00);
			break;
		case "22" :
			myDate.setHours(myDate.getHours()-30,00,00);
			break;
		case "23" :
			myDate.setHours(myDate.getHours()-31,00,00);
			break;
		case "24" :
			myDate.setHours(myDate.getHours()-32,00,00);
			break;
		case "48" :
			myDate.setHours(myDate.getHours()-56,00,00);
			break;
		case "72" :
			myDate.setHours(myDate.getHours()-80,00,00);
			break;
	}
	myDate.setMinutes(myDate.getMinutes(),00);
	var Y = myDate.getFullYear();
	var M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1);
	var D = (myDate.getDate() < 10 ? '0'+(myDate.getDate()) : myDate.getDate());
	var h = (myDate.getHours() < 10 ? '0'+(myDate.getHours()) : myDate.getHours());
	var m = (myDate.getMinutes() < 10 ? '0'+(myDate.getMinutes()) : myDate.getMinutes());
	var s = (myDate.getSeconds() < 10 ? '0'+(myDate.getSeconds()) : myDate.getSeconds());
	var result = Y+""+M+""+D+""+h+""+m+""+s;
	return result;
};
//根据传进来的时间和类型获取08或者20的cimiss时间，默认获取08时间
fnCimiss.getTimeByType =function(time,type){
	var m_time,result = "";
	switch (type){
		default:
		case "08":
			m_time = "08:00:00";
			break;
		case "20":
			m_time = "20:00:00";
			break;
	}
	var tem1 = time.split(" ")[0];
	var tem2 = tem1 + " " + m_time;
	var date1 = new Date(time);
	var date2 =new Date(tem2);
	if(Date.parse(date1) > Date.parse(date2)){
		result = this.getCimissTime(tem2);
	}
	else{
		result = this.getCimissTime(this.getBeforeDay(tem1)+ " " + m_time);
	}
	return result;
};
//获取前一天日期
fnCimiss.getBeforeDay = function(day) {
	var today = new Date(day);
	var yesterday_milliseconds = today.getTime()-1000*60*60*24;
	var yesterday = new Date();
	yesterday.setTime(yesterday_milliseconds);
	var strYear = yesterday.getFullYear();
	var strDay = yesterday.getDate();
	var strMonth = yesterday.getMonth()+1;
	if(strMonth<10)
	{
		strMonth="0"+strMonth;
	}
	var strYesterday=strYear+"-"+strMonth+"-"+strDay;
	return strYesterday;
};

// 24/48/72 小时 20-20 时间
fnCimiss.get20Hours = function(curDay,justDay) {
	var beginTime,endTime = "";
	var today = new Date(curDay);
	var year = today.getFullYear();
	var month = today.getMonth()+1;
	var day = today.getDate();
	var today20Str = year + "-" + month + "-" + day + " " + "20:00:00";
	var today20 = new Date(today20Str);
	if(today < today20){
		today20 = new Date(today20.getTime()-1000*60*60*24);
		today20Str = year + "-" + (today20.getMonth()+1) + "-" + today20.getDate() + " 20:00:00";
	}
	var past_milliseconds = today20.getTime()+1000*60*60*24*(justDay*1);
	var pastDay =  new Date(past_milliseconds);
	var pastDay20Str = year + "-" + (pastDay.getMonth()+1) + "-" + pastDay.getDate() + " 20:00:00";
	beginTime = fnCimiss.getCimissTime(pastDay20Str);
	endTime = fnCimiss.getCimissTime(today20Str);
	return "[" + beginTime + "," + endTime +"]" ;
};


//获取自动站数据，并展示
fnCimiss.getAutomaticStationData = function (id,time,slevParm,callback) {
	//this.map = GDYB.Page.curMap;
	this.map = GDYB.Page.curPage.map;
	//add By fanjibing 解决切换模块后不显示数据问题
	if (this.layerPlot!=null){
		this.layerPlot=null;
	}
	var count =0;//计数器
	var eleValueRanges ="";//过滤条件
	var elements = GridForecast.CiMissConfig.elements;
	var timeRange,preTimeRnage,begintime,begintime08,begintime20;
	preTimeRnage = timeDeal(time);
	//console.log(preTimeRnage);
	var times = this.getCimissTime(time) || "20160501010000";
	$("#div_progress_title").html("正在查询 Cimiss 数据,请稍候...");
	$("#div_progress").css("display", "block");
	switch(id){
		case "rain_10min" ://10min雨量
			//eleValueRanges ="PRE:(0,900000)";
			elements +=",PRE";
			showName="PRE";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			//this.getSurfEleInRegionByMinuteRange(elements,timeRange,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			this.getSurfEleInRegionByMinute(elements,time,-10,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_1h" : //1小时雨量/正点雨量
			//eleValueRanges ="PRE_1h:(0,900000)";//获取大于0的1小时雨量
			elements +=",PRE_1h";
			showName="PRE_1h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			//getSurfEleInRegionSuccess(preSum);
			if(isArray(time)){
				this.getSurfEleInRegionByTimeRange(elements,preTimeRnage,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			}else{
				this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			}
			break;
		case "rain_3h" ://3小时雨量
			/*
			begintime = this.getCimissTimeByType(time,"3");
			timeRange="["+begintime+","+times+")";
			eleValueRanges ="PRE_1h:(0,900000)";
			elements +=",PRE_1h";
			showName="PRE_1h";
			 */
			//eleValueRanges ="PRE_3h:(0,900000)";//获取大于0的6小时雨量
			elements +=",PRE_3h";
			showName="PRE_3h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			if(isArray(time)){
				this.getSurfEleInRegionByTimeRange(elements,preTimeRnage,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			}else{
				this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			}
			break;
		case "rain_6h" ://6小时雨量
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			//累加计算时段数据
			begintime = this.getCimissTimeByType(time,"6");
			timeRange="["+begintime+","+times+")";
			//eleValueRanges ="PRE_1h:(0,900000)"; //近段CIMISS限制了数据过滤
			elements +=",PRE_1h";
			showName="PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			//直接获取字段数据
			 //eleValueRanges ="PRE_6h:(0,900000)";//获取大于0的6小时雨量
			 //elements +=",PRE_6h";
			 //showName="PRE_6h";
			//this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_12h" ://12小时雨量
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			begintime = this.getCimissTimeByType(time,"12");
			timeRange="["+begintime+","+times+")";
			//eleValueRanges ="PRE_1h:(0,900000)";
			elements +=",PRE_1h";
			showName="PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			 //eleValueRanges ="PRE_12h:(0,900000)";//获取大于0的12小时雨量
			 //elements +=",PRE_12h";
			 //showName="PRE_12h";
			//this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_24h" ://24小时雨量
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			timeRange=fnCimiss.get20Hours(time,-1);
			//eleValueRanges ="PRE_1h:(0,900000)";
			elements += ",PRE_1h";
			showName = "PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			 //eleValueRanges ="PRE_24h:(0,900000)";//获取大于0的24小时雨量
			 //elements +=",PRE_24h";
			 //showName="PRE_24h";
			//this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_48h" ://48小时雨量
			timeRange = fnCimiss.get20Hours(time,-2);
			//eleValueRanges ="PRE_1h:(0,900000)";//获取大于0的24小时雨量
			elements += ",PRE_1h";
			showName = "PRE_1h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_72h" ://72小时雨量
			timeRange = fnCimiss.get20Hours(time,-3);
			//eleValueRanges ="PRE_1h:(0,900000)";//获取大于0的24小时雨量
			elements += ",PRE_1h";
			showName = "PRE_1h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_08hToNow" ://08到当前雨量
			begintime08 = this.getTimeByType(time,"08");
			timeRange="["+begintime08+","+times+")";
			eleValueRanges ="PRE_1h:(0,900000)";//获取大于0的雨量
			elements +=",PRE_1h";
			showName="PRE_1h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "rain_20hToNow" ://20到当前雨量
			begintime20 = this.getTimeByType(time,"20");
			timeRange="["+begintime20+","+times+")";
			eleValueRanges ="PRE_1h:(0,900000)";//获取大于0的雨量
			elements +=",PRE_1h";
			showName="PRE_1h";
			m_style = heatMap_Rain24Styles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "newSplash" ://新接口闪电分布
			begintime = this.getCimissTimeByType(time,"1");
			timeRange="["+begintime+","+times+"]";
			eleValueRanges ="Lat:(0,)";//
			elements ="Lat,Lon,Layer_Num,Lit_Current,MARS_3,Pois_Err,Pois_Type,Lit_Prov,Lit_City,Lit_Cnty";
			showName="Lit_Current";
			m_style = null;
			this.addLayer();
			//getUparEleByTimeSuccess(SDSplash);
			this.getUparEleByTimes(elements,timeRange,"getUparEleByTimeSuccess",callback); //按时段获取闪电分布数据
			break;
		case "TEM" ://正点温度
			eleValueRanges ="TEM:(-50,99)";//获取大于0的1小时高温
			elements +=",TEM";
			showName="TEM";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			/*
			//数据测试
			getSurfEleInRegionSuccess(SDTEM);
			GDYB.GridProductClass.currentElement = "TEM";
			return;
			*/
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "TEM_Max" ://小时最高温度
			eleValueRanges ="TEM:(-50,99)";//获取大于0的1小时高温
			elements +=",TEM_Max";
			showName="TEM_Max";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "TEM_Min" ://小时最低温
			eleValueRanges ="TEM_Min:(-50,100)";//获取大于0的1小时低温
			elements +=",TEM_Min";
			showName="TEM_Min";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层d
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "GST" ://地面温度
			eleValueRanges ="GST:(-50,99)";//获取大于0的24小时高温
			elements +=",GST";
			showName="GST";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "GST_Max" ://24小时高温
			eleValueRanges ="GST_Max:(-50,99)";//获取大于0的24小时高温
			elements +=",GST_Max";
			showName="GST_Max";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			/*
			getSurfEleInRegionSuccess(SDGST_Max);
			GDYB.GridProductClass.currentElement = "GST_Max";
			return;
			*/
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "GST_Min" ://24小时低温
			eleValueRanges ="GST_Min:(-50,99)";//获取大于0的24小时低温
			elements +=",GST_Min";
			showName="GST_Min";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "TEM_Max_24h" ://24小时高温
			eleValueRanges ="TEM_Max_24h:(-50,99)";//获取大于0的24小时高温
			elements +=",TEM_Max_24h";
			showName="TEM_Max_24h";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "TEM_Min_24h" ://24小时低温
			eleValueRanges ="TEM_Min_24h:(-50,99)";//获取大于0的24小时低温
			elements +=",TEM_Min_24h";
			showName="TEM_Min_24h";
			m_style = heatMap_TempStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
    case "WIN_S_Max" ://正点风
			eleValueRanges ="WIN_S_Max:(0,900000)";//获取大于0的小时极大风速
			elements +=",WIN_S_Max,WIN_D_S_Max";
			showName="WIN_S_Max";
			m_style = heatMap_10uvStyles; // oldValue: null
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "WIN_S_Inst_Max" ://小时极大风速
			eleValueRanges ="WIN_S_Inst_Max:(0,900000)";//获取大于0的小时极大风速
			elements += ",WIN_S_Inst_Max,WIN_D_INST_Max";
			showName= "WIN_S_Inst_Max";
			m_style = heatMap_10uvStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "WIN_S_Max_24h" ://日最大风
			begintime08 = this.getTimeByType(time,"20");
			timeRange="["+begintime08+","+times+")";
			eleValueRanges ="WIN_S_Max:(0,9000)";//获取大于0的雨量
			elements +=",WIN_S_Max,WIN_D_S_Max";
			showName="WIN_S_Max_24h";
			m_style = heatMap_10uvStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "WIN_S_Inst_Max_24h" ://日极大风
			begintime08 = this.getTimeByType(time,"20");
			timeRange="["+begintime08+","+times+")";
			eleValueRanges ="WIN_S_Inst_Max:(0,9000)";//获取大于0的雨量
			elements +=",WIN_S_Inst_Max,WIN_D_Inst_Max";
			showName="WIN_S_Inst_Max_24h";
			m_style = heatMap_10uvStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTimeRange(elements,timeRange,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "WIN_S_Inst_Max_12h" ://日极大风
			eleValueRanges ="WIN_S_Inst_Max_12h:(0,900000)";//获取大于0的小时极大风速
			elements +=",WIN_S_Inst_Max_12h,WIN_D_Inst_Max_12h";
			showName="WIN_S_Inst_Max_12h";
			m_style = heatMap_10uvStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "PRS" ://小时气压
			eleValueRanges ="PRS:(0,900000)";//获取大于0的小时相对气压
			elements +=",PRS";
			showName="PRS";
			m_style = heatMap_HightPaStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "VIS" ://1小时能见度
			eleValueRanges ="VIS:(0,900000)";//获取大于0的1小时能见度
			elements +=",VIS";
			showName="VIS";
			m_style = heatMap_VISStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
		case "RHU" ://小时相对湿度
			eleValueRanges ="RHU:(0,900000)";//获取大于0的小时相对湿度
			elements +=",RHU";
			showName="RHU";
			m_style = heatMap_RHStyles;
			this.addLayer(); //添加图层
			this.getSurfEleInRegionByTime(elements,times,slevParm,eleValueRanges,"getSurfEleInRegionSuccess",callback);
			break;
	}
	GDYB.GridProductClass.currentElement = showName;
}

//计算两个日期是否相等，精确到时 2016-09-01 23:00:00
fnCimiss.isEqualTime=function(strDate1,strDate2) {
	var result = false;
	var date1 = new Date(strDate1);
	var date2 = new Date(strDate2);
	if(date1.getTime() == date2.getTime()){
		result = true;
	}
	return result;
}

//设置进度条
fnCimiss.setProgress=function(){
	$("#div_progress_title").html("正在查询 Cimiss 数据,请稍候...");
	$("#div_progress").css("display", "block");
}
//添加图层
fnCimiss.addLayer = function(){
	//var map = GDYB.Page.curPage.map;
	/*
	if(m_layerPlot != null){
		m_layerPlot.removeAllFeatures();
	}
	 if(this.layerContour)
	 this.layerContour.removeAllFeatures();
	 if(this.layerFillRangeColor != null)
	 this.layerFillRangeColor.setDatasetGrid(null);

	if(this.layerPolygon == null) {
		this.layerPolygon = new WeatherMap.Layer.Vector("layerIsoSurfaceTextData", {renderers: ["Canvas"]});
		this.map.addLayers([this.layerPolygon]);
	}
	 */

	//填值/填图
	if(this.layerPlot == null) {
		this.layerPlot = new WeatherMap.Layer.Vector("layerPlotCimissData", {renderers: ["Plot"]});
		this.map.addLayers([this.layerPlot]);
		//单站数据查询/自定义修改填值
		var callbacks = {
			click: function(currentFeature){
				$("#txtContent").val("");
				$("#MapToolsDiv").css("display","none");
				var oneStartTime = GDYB.SKZLPage.myDateSelecter.getCurrentTime(false);
				var oneEndTime = GDYB.SKZLPage.myDateSelecter.getCurrentTime(false);
				var iID = "SURF_CHN_MUL_HOR";
				if(GDYB.SKZLPage.historyCheck){
					oneStartTime = GDYB.SKZLPage.myDateSelecter1.getCurrentTime(false);
					oneEndTime = GDYB.SKZLPage.myDateSelecter2.getCurrentTime(false);
				}else{
					oneStartTime = dmt.getMyTime(oneEndTime,false,-24*60);
				}
				var eleStr = showName;
				if(showName == "preSum"){
					eleStr = "PRE_1h";
					showName = "PRE_1h";
				}else if(showName.indexOf("24h") > -1 || showName.indexOf("GST_") > -1){
					eleStr = showName.split("_24h")[0];
					iID = "SURF_CHN_MUL_DAY";
					oneStartTime = dmt.getMyTime(oneEndTime,false,-17*24*60);
					oneEndTime = dmt.getMyTime(oneEndTime,false,-24*60);
				}
				fnCimiss.getOneStation(eleStr,["" + oneStartTime + "","" + oneEndTime + ""],iID,"getSurfEleByTimeRangeAndStaID",currentFeature.attributes.Station_Id_c,"getOneStationSuccess",null);
				//getOneStationSuccess(OneStationData);
			},
			rightclick:function(currentFeature){
				fnCimiss.closeMyInfoWin();
				var lonLat = new WeatherMap.LonLat(currentFeature.geometry.x,currentFeature.geometry.y);
				var contentHtml="<input type='text' id ='txtContent' style='width:58px'/><button id='butAddTxt'>确定</button><button id='butAddClose'>取消</button>";
				mapToolsWindows(lonLat,contentHtml);
				$("#txtContent").val(currentFeature.attributes[showName]);
				$("#butAddClose").click(function(){
					$("#txtContent").val("");
					$("#MapToolsDiv").css("display","none");
				});
				$("#butAddTxt").click(function(){
					currentFeature.attributes[showName] = $("#txtContent").val();
					m_layerPlot.redraw();
					$("#txtContent").val("");
					$("#MapToolsDiv").css("display","none");
				});
			},
			clickout:function(currentFeature){
				fnCimiss.closeMyInfoWin();
				$("#txtContent").val("");
				$("#MapToolsDiv").css("display","none");
			}
		};
		var selectFeatureCimiss = new WeatherMap.Control.SelectFeature(this.layerPlot, {
			callbacks: callbacks
		});
		GDYB.Page.curPage.map.addControl(selectFeatureCimiss);
		selectFeatureCimiss.activate();
		this.layerPlot.renderer.plotWidth = 25;
		this.layerPlot.renderer.plotHeight = 25;
		m_layerPlot = this.layerPlot;
	}
	m_layerPlot.renderer.styles = plotStyles_skzl;

	//等值线图层
	if(this.layerContour == null) {
		this.layerContour = new WeatherMap.Layer.Vector("layerContour", {renderers: ["Contour"]});
		this.layerContour.renderer.labelField = "值";
		this.layerContour.style = {
			fontFamily:"Arial",
			fontColor:"#333",
			fontSize:"16px",
			fontWeight:"bold",
			strokeColor: "#ff0000",
			strokeWidth: 1.1
		};
		this.map.addLayers([this.layerContour]);
		m_layerContour = this.layerContour;
	}

	//填色图层
	if(this.layerFillRangeColor == null){
		this.layerFillRangeColor = new WeatherMap.Layer.FillRangeColorLayer(
			"layerMicapsGrid",
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
		this.layerFillRangeColor.items = m_style;
		this.map.addLayers([this.layerFillRangeColor]);
		//map.addLayers([this.layerFillRangeColor]);
		m_layerFillRangeColor = this.layerFillRangeColor;
	}

	//获取裁剪多边形
	if(this.clipRegion == null && typeof(GDYB.GDYBPage.lineVector) != "undefined" && GDYB.GDYBPage.lineVector != null){
		var pointArray = new Array();
		var pointList = GDYB.GDYBPage.lineVector.geometry.components;
		var linearRings = new WeatherMap.Geometry.LinearRing(pointList);
		this.clipRegion = new WeatherMap.Geometry.Polygon(linearRings);
		this.clipRegion.calculateBounds();
		m_clipRegion = this.clipRegion;
	}

	//默认不显示色板图/等值线
	/*
	m_layerFillRangeColor.setVisibility(false);
	m_layerFillRangeColor.isSmooth = true;
	m_layerContour.setVisibility(false);
	*/
};

/**
 * 2017-4-11 15:28:50
 * @description 站点发射点的颜色对象, 主要用作切换国家/省份站点点位的颜色
 * @action add
 * @author Sean
 *
 * @param {Number} sRadius 发射点半径
 * @param {String} sColor 发射点颜色
 *
 * @return {Object}
 */
fnCimiss.getPointStyleObj = function (sRadius, sColor) {
  sRadius = sRadius || 1;
  sColor = sColor || '#000000';
  return { pointRadius: sRadius, fillColor: "#0000ff", strokeWidth: 0, strokeColor: sColor ,display:"none"};
}

//按时间检索高空数据要素成功事件
function getUparEleByTimeSuccess(data){
	$("#div_progress").css("display", "none");
	if(data !=null && data.DS !=null && data.DS.length > 0 ){
		displayLightning(data.DS,showName);
	}
	//闪电分布渲染
	function displayLightning(data,EleName){
		var pointVectors = [];
		var LvlID = 0;
		var attribute = {};
		var pointVector = null;
		for(var i=0;i<data.length;i++){
			var point = new WeatherMap.Geometry.Point(parseFloat(data[i].Lon),parseFloat(data[i].Lat));
			if(data[i].Lit_Current > 0){
				LvlID = 1;
				attribute[EleName] = parseInt(LvlID);
			}
			else if(data[i].Lit_Current < 0){
				LvlID = 2;
				attribute[EleName] = parseInt(LvlID);
			}
			pointVector = new WeatherMap.Feature.Vector(point,attribute);
			pointVectors.push(pointVector);

		}
		m_layerPlot.addFeatures(pointVectors);
	}
}

//获取地面逐小时资料成功事件
function getSurfEleInRegionSuccess(data){
	if(data !=null && data.DS !=null && data.DS.length > 0 ){
		var newDatas  = [];
		var fStr = showName;
		if(showName == "WIN_S_Max_24h" || showName == "WIN_S_Inst_Max_24h"){
			fStr  = showName.split("_24h")[0];
			newDatas = filterWinMaxData(simpleFilter(data.DS),fStr);
		}else{
			newDatas = simpleFilter(data.DS);
			if(newDatas.length < 1){
				layer.alert('系统暂无 有效 数据!', {
					icon: 2
				});
				return;
			}
			newDatas = filterAutomaticStationData(newDatas);
		}
		/*for(var index in newDatas){
			if(newDatas[index]["Station_Name"].indexOf("沂水") > -1 ){
				console.log(newDatas[index]);
			}
		}*/
		//getMax(newDatas);
		fnColors.CimissData = newDatas;
		displayAutomaticStation(newDatas, fStr);
	}else{
		layer.alert('系统暂无 CIMISS 数据!', {
			icon: 2
		});
		return;
	}
}

function filterWinMaxData(old,showName){
	var sIDs = [];
	var newStationDatas = [];
	var vStrD = "";
	if(showName == "WIN_S_Max"){
		vStrD = "WIN_D_S_Max";
	}else{
		vStrD = "WIN_D_Inst_Max";
	}
	for(var index in old){
		var cursID = old[index].Station_Id_d;
		if($.inArray(cursID,sIDs) < 0 ){
			newStationDatas.push(old[index]);
			sIDs.push(cursID);
		}else{
			for(var i in newStationDatas){
				if(newStationDatas[i].Station_Id_d == cursID){
					if((old[index][showName]*1) > (newStationDatas[i][showName]*1)){
						newStationDatas[i][showName] = old[index][showName];
						newStationDatas[i][vStrD] = old[index][vStrD];
						newStationDatas[i]["Datetime"] = old[index]["Datetime"];
					}
				}
			}
		}
	}
	return newStationDatas;
}

//自动站实况资料渲染
function displayAutomaticStation (datas,showName){
	var wDirect = "";
	switch(showName){
		//正点风
		case "WIN_S_Max" :{
			wDirect = "WIN_D_S_Max";
		}
			break;
		//小时极大风
		case "WIN_S_Inst_Max" :{
			wDirect = "WIN_D_Inst_Max";
		}
			break;
	}
	var len = datas.length;
	var features = [];
	var noDisplay = 0;
	for(var i = len;i--;){   //递减到0
		var eachData = datas[i];
		var value = eachData[showName];
		var Station = datas[i]["Station_Name"];
		var dStationId = eachData.Station_Id_d;
		var dotColor = (dStationId.indexOf('5') == 0) ? '#0000ff' : '#0000ff';
		var pStyle = fnCimiss.getPointStyleObj(1.5, dotColor);
		var ZoomIndex = GDYB.Page.curPage.map.getZoom();
		if(ZoomIndex*1 > 10){
			pStyle = fnCimiss.getPointStyleObj(4.5, dotColor);
		}else if(ZoomIndex*1 > 7){
			pStyle = fnCimiss.getPointStyleObj(2, dotColor);
		}else{
			pStyle = fnCimiss.getPointStyleObj(1.5, dotColor);
		}
		var point = new WeatherMap.Geometry.Point(eachData.Lon, eachData.Lat);
		var pointVector = new WeatherMap.Feature.Vector(point, null, pStyle);
		if(showName.indexOf("WIN_")>-1){
			pointVector.attributes[showName] = getWindLevel(value);
			pointVector.attributes[wDirect] = parseInt(eachData[wDirect]);
			pointVector.attributes["StationName"] = Station;
			pointVector.attributes["Station_Id_c"] = eachData["Station_Id_c"];
			/** 2017-4-13 15:36:31 add Sean 用于风速的数值显示 */
			pointVector.attributes["WIN_S_Max_label"] = eachData[showName];
			pointVector.attributes["WIN_S_Max_label"] = eachData[showName];
		}else{
			if(((showName.indexOf("TEM") >-1 || showName.indexOf("GST") >-1 ) && (value*1 > 9999))){
				continue;
			}
			pointVector.attributes[showName] = value;
			pointVector.attributes["StationName"] = Station;
			pointVector.attributes["Station_Id_c"] = eachData["Station_Id_c"];
		}
		if(typeof(eachData.Station_Id_d) != "undefined"){
			if(eachData.Station_Id_d.indexOf("5") == 0){
				pointVector.attributes.stype = "nstation";
			}else{
				pointVector.attributes.stype = "rstation";
			}
		}
		features.push(pointVector);
	}
	console.log("不显示数据个数: "+noDisplay);
	var coverLayer=GDYB.Page.curPage.map.getLayer("mapCoverLayer");
	if (coverLayer!=null){
		GDYB.Page.curPage.map.setLayerIndex(coverLayer,999);
	}
	if(features.length < 1){
		layer.alert('系统暂无 有效 数据!', {
			icon: 2
		});
		return;
	}else{
		m_layerPlot.addFeatures(features);
	}
	if( showName.indexOf("TEM")>-1 || showName.indexOf("GST")>-1 || showName.indexOf("PRE")>-1|| showName.indexOf("preSum")>-1 || showName.indexOf("WIN")>-1|| showName.indexOf("PRS")>-1 || showName.indexOf("RHU")>-1|| showName.indexOf("VIS")>-1){
		//插值
		var fieldName = showName;
		var interpolate = new Interpolate();
		var datasetGrid = null;
		var bounds, deltaX, deltaY, pointCount, maxRadius = 0.4;
		deltaX = 0.1;deltaY = 0.05;
		if(m_clipRegion != null&&m_clipRegion.bounds != null){
			bounds = m_clipRegion.bounds;
		}else{
			if (GDYB.GDYBPage.lineVector!=null)
			{
				bounds=GDYB.GDYBPage.lineVector.geometry.components[0].bounds;
			}else{
				bounds=new WeatherMap.Bounds();
				bounds.extend(new WeatherMap.LonLat(114.7915,34.3779));
				bounds.extend(new WeatherMap.LonLat(122.7032,38.2127));
			}
		}
		datasetGrid = interpolate.run(features, fieldName, bounds, deltaX, deltaY, pointCount, maxRadius);
		//裁剪
		if(m_clipRegion != null&&m_clipRegion.bounds != null) {
			m_layerFillRangeColor.clipRegion = m_clipRegion;
		}
		m_layerFillRangeColor.items = m_style;
		m_layerFillRangeColor.isSmooth = true;
		m_layerFillRangeColor.alpha = 255;
		m_layerFillRangeColor.isAlwaySmooth = true;
		m_layerFillRangeColor.setDatasetGrid(null);
		m_layerFillRangeColor.setDatasetGrid(datasetGrid);
		m_layerFillRangeColor.refresh();
		var sdCity=GDYB.SKZLPage.map.getLayersByName("sdCity");
		if  (sdCity.length>0)
		{
			GDYB.SKZLPage.map.setLayerIndex(sdCity[0], 998);
		}
		GDYB.SKZLPage.map.setLayerIndex(GDYB.SKZLPage.baseLayerLabel, 999);
		//等值线
		var dZValues = getContourValues(showName, datasetGrid.dMin, datasetGrid.dMax);
		if(datasetGrid != null && dZValues.length > 0) {
			var contour = new WeatherMap.Analysis.Contour();
			var result = contour.analysis(datasetGrid, dZValues,23); //6为平滑度
			m_layerContour.renderer.labelField = "dZValue";
			m_layerContour.removeAllFeatures();
			var contours = [];
			if(result.length > 0){
				for(var key in result) {
					var geoline = result[key].geoline;
					var dZValue = result[key].dZValue;
					var feature = new WeatherMap.Feature.Vector(geoline);
					feature.attributes.dZValue = dZValue.toString();
					contours.push(feature);
				}
			}
			m_layerContour.clipRegion = m_clipRegion;
			m_layerContour.addFeatures(contours);
			m_layerContour.setVisibility(true);
		}
        GDYB.Page.curPage.map.setLayerIndex(m_layerContour,99);
		GDYB.Page.curPage.map.setLayerIndex(m_layerPlot,99);
	}
	$("#div_progress").css("display", "none");
}
function getWindLevel(value){
	var level = 1;
	if(value<=0.3)
		level = 1;
	else if(value<=1.6)
		level = 2
	else if(value<=3.4)
		level = 3
	else if(value<=5.5)
		level = 4
	else if(value<=8.0)
		level = 5
	else if(value<=10.8)
		level = 6
	else if(value<=13.9)
		level = 7
	else if(value<=17.2)
		level = 8
	else if(value<=20.8)
		level = 9
	else if(value<=24.5)
		level = 10
	else if(value<=28.5)
		level = 11
	else if(value<=32.7)
		level = 12
	else if(value<=36.9)
		level = 13
	else if(value<=41.4)
		level = 14
	else if(value<=46.1)
		level = 15
	else if(value<=50.9)
		level = 16
	else if(value<=56.0)
		level = 17
	else if(value<=61.2)
		level = 18
	return level;
}
function getContourValues(element, min, max){
	var dZValues = [];
	var dStep = 0;
	var dStart = 0;
	if(element == "TEM" || (element.indexOf("TEM_") > -1)){
		dStep = 2.0;
		dStart = Math.floor(min);
	}
	else if(element == "RHU"){
		dStep = 5.0;
		dStart = 0.0;
	}
	else if(element.indexOf("WIN_") > -1 ){
		dStep = 2.0;
		dStart = 0.0;
	}

	if(element.indexOf("PRE_") > -1) {
		dZValues = [0.1, 10.0, 25.0, 50.0, 100.0, 250.0];
	}
	else if(dStep > 0) {
		for(var d=dStart; d<=max; d+=dStep){
			dZValues.push(d);
		}
	}
	return dZValues;
}
fnCimiss.clearCimissDisplay = function(){
	var layerPlots = GDYB.Page.curPage.map.getLayersByName("layerPlotCimissData");
	$(layerPlots).each(function(i,e){
		e.removeAllFeatures();
	});
	var layerContours = GDYB.Page.curPage.map.getLayersByName("layerContour");
	$(layerContours).each(function(i,e){
		e.removeAllFeatures();
	});
	var layerRangerColors = GDYB.Page.curPage.map.getLayersByName("layerMicapsGrid");
	$(layerRangerColors).each(function(i,e){
		e.setDatasetGrid(null);
	});
}
function filterArray(receiveArray){
	var arrResult = []; //定义一个返回结果数组.
	var len = receiveArray.length;
	for (var i=0; i<len; ++i) {
		if(check(arrResult,receiveArray[i]) == -1) {//在这里做i元素与所有判断相同与否
			arrResult.push(receiveArray[i]);//　添加该元素到新数组。如果if内判断为false（即已添加过），则不添加。
		}
	}
	return arrResult;
}

function check(receiveArray,checkItem){
	var index = -1; //　函数返回值用于布尔判断
	var len = receiveArray.length
	for(var i=0; i<len; ++i){
		if(receiveArray[i].Lon == checkItem.Lon){
			//if(receiveArray[i].PRE_1h < checkItem.PRE_1h){
			//    receiveArray[i].PRE_1h = checkItem.PRE_1h;
			//}
			//if(receiveArray[i].WIN_S_Max < checkItem.WIN_S_Max){
			//    receiveArray[i].WIN_S_Max = checkItem.WIN_S_Max;
			//}
			if(parseFloat(receiveArray[i].PRE_1h)<999990 && parseFloat(receiveArray[i].WIN_S_Max)<999 && parseFloat(checkItem.PRE_1h)<999990 && parseFloat(checkItem.WIN_S_Max)<999){
				var a = parseFloat(receiveArray[i].PRE_1h) + parseFloat(checkItem.PRE_1h);
				var b = parseFloat(receiveArray[i].WIN_S_Max) + parseFloat(checkItem.WIN_S_Max);
				receiveArray[i].PRE_1h = a.toString();
				receiveArray[i].WIN_S_Max = b.toString();
			}
			index = i;
			break;
		}
	}
	return index;
}

//自动站数据累加
function filterAutomaticStationData(data){
	var arrResult = []; //定义一个返回结果数组.
	var len = data.length;
	for(var i = len;i--;){//递减到0
		if(checkAutomatic(arrResult,data[i]) == -1) {//在这里做i元素与所有判断相同与否
			if(typeof(data[i].Station_Id_d) != "undefined"){
				if(data[i].Station_Id_d.indexOf("5") == 0){
					data[i].stype = "nstation";
				}else{
					data[i].stype = "rstation";
				}
				if(typeof(data[i].VIS) != 'undefined'){
					data[i].VIS = (data[i].VIS*1/1000).toString();
				}
				arrResult.push(data[i]);//　添加该元素到新数组。如果if内判断为false（即已添加过），则不添加。
			}
		}
	}
	return arrResult;
}

//cimiss 站点数据提取市区数据
function filterCitiesData(data){
	var citiesData = [];
	var cityNO = [
		"371601",//滨州市
		"370301",// 淄博市
		"370101",// 济南市
		"370601",// 烟台市
		"370901",// 泰安市
		"371301",// 临沂市
		"371501",// 聊城市
		"370201",// 青岛市
		"370701",// 潍坊市
		"370401",// 枣庄市
		"371401",// 德州市
		"371201",// 莱芜市
		"370501",// 东营市
		"371001",// 威海市
		"370801",// 济宁市
		"371101",// 日照市
		"371701",// 菏泽市
	];
	var stationNO = [
		"54734",//滨州市
		"54830",// 淄博市
		"54823",// 济南市
		"54765",// 烟台市
		"54827",// 泰安市
		"54938",// 临沂市
		"54806",// 聊城市
		"54857",// 青岛市
		"54840",// 潍坊市
		"58024",// 枣庄市
		"54714",// 德州市
		"54806",// 莱芜市
		"54736",// 东营市
		"54774",// 威海市
		"54915",// 济宁市
		"54945",// 日照市
		"54906",// 菏泽市
	];
	var cityFlag = [];
	/*
	for(var index in data){
		if(($.inArray(data[index].Admin_Code_CHN,cityNO) > -1) && ($.inArray(data[index].Admin_Code_CHN,cityFlag) < 0)){
			citiesData.push(data[index]);
			cityFlag.push(data[index].Admin_Code_CHN);
		}
	}
	*/
	for(var index in data){
		if(($.inArray(data[index].Station_Id_d,stationNO) > -1) && ($.inArray(data[index].Station_Id_d,cityFlag) < 0)){
			citiesData.push(data[index]);
			cityFlag.push(data[index].Station_Id_d);
		}
	}
	return citiesData;
}

function checkAutomatic(receiveArray,checkItem){
	var index = -1; //　函数返回值用于布尔判断
	var len = receiveArray.length;
	for(var i=0; i<len; ++i){
		if(receiveArray[i].Station_Id_c == checkItem.Station_Id_c){
			var attrPre,attrTem = "";
			$.each(receiveArray[i],function(name,value){
				if(name.indexOf("PRE") > -1){
					attrPre = name;
				}
				//此处还可以添加条件
			})
			if(typeof(receiveArray[i][attrPre]) != "undefined"){
				var a = parseFloat(receiveArray[i][attrPre]) + parseFloat(checkItem[attrPre]);
				receiveArray[i][attrPre] = a.toString();
			}
			index = i;
			break;
		}
	}
	return index;
}

//计算两个日期的时间差
function TimeDifference(date1,date2) {
	var resultDifference;
	//var date1=new Date();  //开始时间
	//var date2=new Date();    //结束时间
	var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
	var days=Math.floor(date3/(24*3600*1000)); //计算出相差天数

	var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000));//计算出小时数

	var leave2=leave1%(3600*1000);     //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));//计算相差分钟数

	var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);//计算相差秒数
	resultDifference = "总共用时："+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒";
	return resultDifference;
}

function getStringCimissTime(time) {
	var myDate = new Date(time);
	myDate.setHours(myDate.getHours()-8,00,00);
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
//计算两个日期是否相等，精确到时 2016-09-01 23:00:00
function isEqualTime(strDate1,strDate2) {
	var result = false;
	var date1 = new Date(strDate1);
	var date2 = new Date(strDate2);
	if(date1.getTime() == date2.getTime()){
		result = true;
	}
	return result;
}

//短临实时报警数据获取
fnCimiss.getWarningData = function(id,time,slevParm, callback){
	var eleValueRanges ="";//过滤条件
	var elements = GridForecast.CiMissConfig.elements;
	var timeRange,preTimeRnage,begintime;
	var times = this.getCimissTime(time) || "20160501010000";
	$("#div_progress_title").html("正在查询cimiss数据,请稍候...");
	$("#div_progress").css("display", "block");
	switch(id) {
		case "rain_30min" ://30min雨量
			eleValueRanges = "PRE:(0,900000)";
			elements += ",PRE";
			this.getSurfEleInRegionByMinute(elements, time,-30,slevParm,  eleValueRanges, "getWarningSuccess", callback);
			break;
		case "rain_1h" : //1小时雨量/正点雨量
			eleValueRanges = "PRE_1h:(0,900000)";//获取大于0的1小时雨量
			elements += ",PRE_1h";
			this.getSurfEleInRegionByTime(elements, times,slevParm,  eleValueRanges, "getWarningSuccess", callback);
			break;
		case "rain_3h" ://3小时雨量
			begintime = this.getCimissTimeByType(time, "3");
			timeRange = "[" + begintime + "," + times + ")";
			eleValueRanges = "PRE_1h:(0,900000)";
			elements += ",PRE_1h";
			this.getSurfEleInRegionByTime(elements, times,slevParm,  eleValueRanges, "getWarningSuccess", callback);
			break;
		case "rain_6h" ://6小时雨量
			begintime = this.getCimissTimeByType(time, "6");
			timeRange = "[" + begintime + "," + times + ")";
			eleValueRanges = "PRE_1h:(0,900000)";
			elements += ",PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements, timeRange, slevParm, eleValueRanges, "getWarningSuccess", callback);
			break;
		case "rain_12h" ://12小时雨量
			begintime = this.getCimissTimeByType(time, "12");
			timeRange = "[" + begintime + "," + times + ")";
			eleValueRanges = "PRE_1h:(0,900000)";
			elements += ",PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements, timeRange,slevParm,  eleValueRanges, "getWarningSuccess", callback);
			break;
		case "rain_24h" ://24小时雨量
			begintime = this.getCimissTimeByType(time, "24");
			timeRange = "[" + begintime + "," + times + ")";
			eleValueRanges = "PRE_1h:(0,900000)";
			elements += ",PRE_1h";
			this.getSurfEleInRegionByTimeRange(elements, timeRange,slevParm,  eleValueRanges, "getWarningSuccess", callback);
			break;
		case "WIN_S_Avg_10mi" ://10min分钟风
			eleValueRanges = "WIN_S_Avg_10mi:(0,900000)";
			elements += ",WIN_S_Avg_10mi,WIN_D_Avg_10mi";
			this.getSurfEleInRegionByTime(elements, times, slevParm, eleValueRanges, "getWarningSuccess", callback);
			break;
		case "WIN_S_Max" ://正点风
			eleValueRanges ="WIN_S_Max:(0,900000)";//获取大于0的小时极大风速
			elements +=",WIN_S_Max,WIN_D_S_Max";
			this.getSurfEleInRegionByTime(elements,times,slevParm, eleValueRanges,"getWarningSuccess",callback);
			break;
	}
}

//按时间段获取地面逐小时统计资料
fnCimiss.getStationStatis = function(elements,timeRange,dataCode,interId,stals,callbackName,callback){
	$("#div_progress_title").html("正在查询cimiss数据,请稍候...");
	$("#div_progress").css("display", "block");
	var data = {
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":interId,//接口ID：getSurfEleInRegionByTime 按时间区域检索地面要素数据
		"dataCode":dataCode, //接口类型：SURF_CHN_MUL_HOR中国地面逐小时资料 |SURF_CHN_MUL_DAY (中国地面日值资料)
		"adminCodes":GridForecast.CiMissConfig.AreaCode,
		//"elements":GridForecast.CiMissConfig.elements+","+elements,
		"elements":GridForecast.CiMissConfig.elements+","+elementsDeal(elements),
		"staLevels":stalDeal(stals),//"011,012,013",
		"orderBy":"Datetime:asc", //排序字段，按照数据时间从远到近
		"dataFormat":"jsonp",
		//"eleValueRanges":eleValueRanges,//要素值范围
		//"limitCnt":2500,
		"callbackName":callbackName
	};
	var newTimes = timeDeal(timeRange);
	if(isArray(timeRange)){
		data.timeRange = newTimes;
		//data.interfaceId = "getSurfEleInRegionByTimeRange";
	}else{
		data.times = newTimes;
		//data.interfaceId = "getSurfEleInRegionByTime";
	}
	this.getDataByAjax(data,callback);
	//getMultipleStationSuccess(preSum);
}

function getWarningSuccess(dbData){
	if(dbData.rowCount < 1){
		alertFuc("系统暂无 CIMISS 数据！");
		$("#div_progress").css("display", "none");
		return;
	}
	$("#div_progress").css("display", "none");
	var wData = simpleFilter(dbData.DS);
	GDYB.QDLJCPage.WarningDispaly(wData);
}

//简单过滤重复值和无效值
function simpleFilter(old){
	//简单数据过滤
	var newData = [];
	for(var i in old){
		var dflag = false;
		$.each(old[i],function(name,value){
			if(name == "Station_Name"){
				if(old[i]["Station_Name"].indexOf("沂水") > -1 ){
					//console.log(old[i]);
					//newData.push(old[i]);
				}
			}
			if(name.indexOf("PRE") > -1){
				if(old[i][name]*1 > 99999 || old[i][name]*1 <0 ){
					//old[i][name] = "0";
					dflag = true;
				}
			}else if(name.indexOf("WIN") > -1){
				if(typeof(old[i].WIN_D_INST_Max) != "undefined"){
					old[i]["WIN_D_Inst_Max"] = old[i]["WIN_D_INST_Max"];
					delete old[i].WIN_D_INST_Max;
				}
				if(old[i][name]*1 > 9999 || old[i][name]*1 < 0){
					//old[i][name] = "0";
					dflag = true;
				}
			}else if(name.indexOf("TEM") > -1){
				if(old[i][name]*1 > 999 || old[i][name]*1 < -999){
					dflag = true;
				}
			}
		});

		if(!dflag){
			newData.push(old[i]);
		}
	}
	return newData;
}

//按时间段获取单站地面逐小时资料
fnCimiss.getOneStation = function(elements,timeRange,dataCode,interId,staID,callbackName,callback){
	$("#div_progress_title").html("正在查询cimiss数据,请稍候...");
	$("#div_progress").css("display", "block");
	var data = {
		"userId":GridForecast.CiMissConfig.userId,
		"pwd":GridForecast.CiMissConfig.password,
		"interfaceId":interId,//接口ID：getSurfEleInRegionByTime 按时间区域检索地面要素数据
		"dataCode":dataCode, //接口类型：SURF_CHN_MUL_HOR中国地面逐小时资料 |SURF_CHN_MUL_DAY (中国地面日值资料)
		"elements":GridForecast.CiMissConfig.elements+","+elements,
		"staIds":stalDeal(staID),
		"orderBy":"Datetime:asc", //排序字段，按照纬度降序排序，从北到南
		"dataFormat":"jsonp",
		//"eleValueRanges":eleValueRanges,//要素值范围
		//"limitCnt":2500,
		"callbackName":callbackName
	};
	var newTimes = timeDeal(timeRange);
	if(isArray(timeRange)){
		data.timeRange = newTimes;
	}else{
		data.times = newTimes;
	}
	this.getDataByAjax(data,callback);
}

//转发单站请求成功数据
function getOneStationSuccess(dbData){
	if(dbData.rowCount < 1){
		$("#div_progress").css("display", "none");
		alertFuc("单站数据不全，取消展示！");
		return;
	}
	GDYB.SKZLPage.displayStationChart(dbData.DS)
	$("#div_progress").css("display", "none");
}

//历史降水查询
function getMultipleStationSuccess(dbData){
	if(dbData.rowCount < 1){
		alertFuc("系统暂无 CIMISS 数据！");
		$("#div_progress").css("display", "none");
		return;
	}
	$("#div_progress").css("display", "none");
	//var newData = dataFilter(simpleFilter(dbData.DS));
	var newData = simpleFilter(dbData.DS);
	if(newData.length < 1){
		layer.alert('系统暂无 有效 数据!', {
			icon: 2
		});
		return;
	}
	newData = filterAutomaticStationData(newData);
	fnColors.CimissData = newData;
	m_style = heatMap_Rain24Styles;
	showName = "PRE_1h";
	//getMax(newData);
	displayAutomaticStation(newData,showName);
}
function getMax(newData){
	var vMax = 0;
	var ObjMax = {};
	for(var imax in newData){
		var value = newData[imax][showName];
		if(value*1 > vMax*1){
			vMax = value*1;
			ObjMax = newData[imax];
		}
	}
	console.log(ObjMax);
}
//时段数据简单规则过滤
function dataFilter(oldData){
	var tempArray = [];
	var tempDatas = {};
	var realData = [];
	//保护数据，进行对象克隆
	function clone(obj){
		var result ={};
		for(var key in obj){
			result[key]=obj[key];
		}
		return result;
	}
	for(var index in oldData){
		var stID = "";
		stID = oldData[index].Station_Id_d;
		if($.inArray(stID,tempArray) < 0){
			tempDatas[stID] = clone(oldData[index]);
			if(typeof(oldData[index].TEM) != "undefined"){
				tempDatas[stID].temMax = tempDatas[stID].temMin = oldData[index].TEM;
				delete tempDatas[stID]["TEM"];
			}
			if(typeof(oldData[index].PRE_1h) != "undefined"){
				tempDatas[stID].preSum = oldData[index].PRE_1h;
				delete tempDatas[stID]["PRE_1h"];
				GDYB.GridProductClass.currentElement = "preSum";
			}
			if(typeof(oldData[index].RHU) != "undefined"){
				tempDatas[stID].RHUMax = tempDatas[stID].RHUMin = oldData[index].RHU;
				delete tempDatas[stID]["RHU"];
			}
			if(typeof(oldData[index].WIN_S_Avg_10mi) != "undefined"){
				tempDatas[stID].winMax = tempDatas[stID].winMin = oldData[index].WIN_S_Avg_10mi;
				tempDatas[stID].winMax_D = tempDatas[stID].winMin_D = oldData[index].WIN_D_Avg_10mi;
				delete tempDatas[stID]["WIN_S_Avg_10mi"];
				delete tempDatas[stID]["WIN_D_Avg_10mi"];
			}
			if(typeof(oldData[index].PRS) != "undefined"){
				tempDatas[stID].PRSMax = tempDatas[stID].PRSMin = oldData[index].PRS;
				delete tempDatas[stID]["PRS"];
			}
			tempArray.push(stID);
		}else{
			var tempObj = clone(oldData[index]);
			if(typeof(oldData[index].TEM) != "undefined"){
				tempObj.temMax = oldData[index].TEM*1 > tempDatas[stID].temMax*1 ? oldData[index].TEM : tempDatas[stID].temMax;
				tempObj.temMin = oldData[index].TEM*1 < tempDatas[stID].temMin*1 ? oldData[index].TEM : tempDatas[stID].temMin;
				delete tempObj["TEM"];
			}
			if(typeof(oldData[index].PRE_1h) != "undefined") {
				if(oldData[index].PRE_1h * 1 <10000){
					tempObj.preSum = (oldData[index].PRE_1h * 1 + tempDatas[stID].preSum * 1).toString();
				}else{
					tempObj.preSum = (tempDatas[stID].preSum * 1).toString();
				}
				delete tempObj["PRE_1h"];
			}
			if(typeof(oldData[index].RHU) != "undefined") {
				tempObj.RHUMax = oldData[index].RHU*1 > tempDatas[stID].RHUMax*1 ? oldData[index].RHU : tempDatas[stID].RHUMax;
				tempObj.RHUMin = oldData[index].RHU*1 < tempDatas[stID].RHUMin*1 ? oldData[index].RHU : tempDatas[stID].RHUMin;
				delete tempObj["RHU"];
			}
			if(typeof(oldData[index].WIN_S_Avg_10mi) != "undefined") {
				if(oldData[index].WIN_S_Avg_10mi*1 > tempDatas[stID].winMax*1 ){
					tempObj.winMax = oldData[index].WIN_S_Avg_10mi;
					tempObj.winMax_D = oldData[index].WIN_D_Avg_10mi;
				}else{
					tempObj.winMax = tempDatas[stID].winMax;
					tempObj.winMax_D = tempDatas[stID].winMax_D;
				}
				if(oldData[index].WIN_S_Avg_10mi*1 < tempDatas[stID].winMin*1 ){
					tempObj.winMin = oldData[index].WIN_S_Avg_10mi;
					tempObj.winMin_D = oldData[index].WIN_D_Avg_10mi;
				}else{
					tempObj.winMin = tempDatas[stID].winMin;
					tempObj.winMin_D = tempDatas[stID].winMin_D;
				}
				delete tempObj["WIN_S_Avg_10mi"];
				delete tempObj["WIN_D_Avg_10mi"];
			}
			if(typeof(oldData[index].PRS) != "undefined") {
				tempObj.PRSMax = oldData[index].PRS*1 > tempDatas[stID].PRSMax*1 ? oldData[index].PRS : tempDatas[stID].PRSMax;
				tempObj.PRSMin = oldData[index].PRS*1 < tempDatas[stID].PRSMin*1 ? oldData[index].PRS : tempDatas[stID].PRSMin;
				delete tempObj["PRS"];
			}
			tempDatas[stID] = tempObj;
		}
	}
	$.each(tempDatas,function(name,value){
		realData.push(value);
	});
	return realData;
}

//气泡关闭
fnCimiss.closeMyInfoWin = function(){
	$("#myInfoWindow").css("display","none");
}

function getWindLevel(value){
	var level = 1;
	if(value<=0.3)
		level = 1;
	else if(value<=1.6)
		level = 2
	else if(value<=3.4)
		level = 3
	else if(value<=5.5)
		level = 4
	else if(value<=8.0)
		level = 5
	else if(value<=10.8)
		level = 6
	else if(value<=13.9)
		level = 7
	else if(value<=17.2)
		level = 8
	else if(value<=20.8)
		level = 9
	else if(value<=24.5)
		level = 10
	else if(value<=28.5)
		level = 11
	else if(value<=32.7)
		level = 12
	else if(value<=36.9)
		level = 13
	else if(value<=41.4)
		level = 14
	else if(value<=46.1)
		level = 15
	else if(value<=50.9)
		level = 16
	else if(value<=56.0)
		level = 17
	else if(value<=61.2)
		level = 18
	return level;
}

function replaceInvalid(Obj){
	if(Obj*1 > 99999|| typeof(Obj) == "undefined" || Obj == null ){
		return 0;
	}
	return Obj;
}

function timeDeal(timeObj){
	if(isArray(timeObj)){
		var timeArray ="[";
		for(var i= 0;i<timeObj.length;i++){
			var tempTime = fnCimiss.getCimissTime(timeObj[i]);
			if(i == (timeObj.length-1)){
				timeArray+=tempTime+"]";
			}else{
				timeArray+=tempTime+",";
			}
		}
		return timeArray;
	}
	return fnCimiss.getCimissTime(timeObj);
}

function elementsDeal(eleObj){
	if(isArray(eleObj)){
		var elements = "";
		for(var i= 0;i<eleObj.length;i++){
			if(i == 0){
				elements += eleObj[i].toString();
			}else{
				elements += ","+eleObj[i].toString();
			}
		}
		return elements;
	}
	return eleObj;
}

function stalDeal(sts){
	if(isArray(sts)){
		var parms ="";
		for(var i= 0;i<sts.length;i++){
			if(i == (sts.length-1)){
				parms+=sts[i];
			}else{
				parms+=sts[i]+",";
			}
		}
		return parms;
	}
	return sts;
}

function isArray(Obj){
	return Object.prototype.toString.call(Obj) === '[object Array]';
}

function dateToTimes(nowDate){
	return nowDate.getFullYear()+"-"+(Array(2).join(0)+(nowDate.getMonth()+1)).slice(-2)+"-"+(Array(2).join(0)+nowDate.getDate()).slice(-2)+" "+(Array(2).join(0)+nowDate.getHours()).slice(-2)+":"+(Array(2).join(0)+nowDate.getMinutes()).slice(-2)+":"+(Array(2).join(0)+nowDate.getSeconds()).slice(-2)+".000";
}

function mapToolsWindows(lonLat,contentHTML){
	var map = GDYB.Page.curPage.map;
	var pixel = map.getPixelFromLonLat(lonLat);
	if(contentHTML.length>0) {
		$("#mtsContent").html(contentHTML);
		var height = parseInt($("#MapToolsDiv").css("height"));
		var width = $("#MapToolsDiv").css("width");
		var bt = "B";
		var lr = "L";
		if(pixel.y>height||((parseInt($("#map_div").css("height"))-pixel.y)<height)){
			bt = "B";
		}
		else{
			bt = "T";
		}
		if((document.body.offsetWidth-pixel.x)>(parseInt(width)-50)){
			lr = "L";
		}
		else{
			lr = "R";
		}
		$(".mtsContentImg").css("display","none");
		$("#mtsContent"+bt+lr).css("display","block");
		$("#MapToolsDiv").css("top",pixel.y+65);  //加上左侧和右侧面板
		$("#MapToolsDiv").css("left",pixel.x+200);
		if(bt == "B"){
			$("#MapToolsDiv").css("margin-top","-"+(height+2)+"px");
		}
		else{
			$("#MapToolsDiv").css("margin-top","4px")
		}
		if(lr == "L"){
			$("#MapToolsDiv").css("margin-left","-1px");
		}
		else{
			$("#MapToolsDiv").css("margin-left","-"+width);
		}
		$("#MapToolsDiv").css("display","block");
		GDYB.Page.curPage.map.events.register("move", map, function (event) {
			if ($("#MapToolsDiv").css("display") == "block") {
				var pixel = GDYB.Page.curPage.map.getPixelFromLonLat(lonLat);
				$("#MapToolsDiv").css("top", pixel.y+65);
				$("#MapToolsDiv").css("left", pixel.x+200);
			}
		});
	}
}

