/**
 * Created by POPE on 2016/7/8.
 */
 //add by fanjibing
var host = "http://"+window.location.host;
console.log(host);
var baseHost1 = 'http://127.0.0.1:8080/';
var baseHost2 = 'http://127.0.0.1:8081/';
var dataSericeUrl =  host+"/WMDataService/";
var socket = "8081";
var gridServiceUrl = "http://10.76.10.166:"+socket+"/WMGridService/";//线上实时格点产品服务
if(host.indexOf("127.0") > -1){
	socket = "8080";
	var hostStr = host.substring(0,host.lastIndexOf(":"))+":"+socket;
	gridServiceUrl = hostStr+"/WMGridService/";//本地实时格点产品服务
}
var gridServiceUrl_his ="http://10.76.10.166:8081/WMGridService/";    //历史格点产品服务，部署的时候与实时端口不同
var userServiceUrl = host+"/WMUser/";
var msgServiceUrl = host+"/SPDMessageService/";
var ENVIServiceUrl = "http://10.76.10.166:8080/ENVIService/";
var nTickCount = 0;
var archiveServiceUrl = host+"/SPDArchiveService/";
var basicUserUrl = host+"/WMUser/services";
var webRootName = "SDWIS";
var czybPath = 'x:/home/qsyb/zhidao/'; //城镇预报路径
var dcsybPath = 'x:/CMACAST/SEVP/SCMOC/';// 大城市精细化预报路径
var zcdPath ='S:/micaps/high/tlogp/'; //中尺度分析控空数据路径
var mapConfig={
	centerX:118.2,
	centerY:36.4,
	initLev:7
}
//CIMISS 接口预配置
var GridForecast ={
	CiMissConfig:{
		"userId":"BEJN_QXT_shandong2",
		"password":"123456",
		"AreaCode":"370000", //
		"url":"http://10.76.89.55/cimiss-web/api",
		"elements":"Station_Name,City,Cnty,Station_Id_c,Station_Id_d,Admin_Code_CHN,Lat,Lon,Datetime",
		"PRE_1h":"PRE_1h",
		"PRE_3h":"PRE_3h",
		"PRE_6h":"PRE_6h",
		"PRE_12h":"PRE_12h",
		"PRE_24h":"PRE_24h",
		"TEM_Max":"TEM_Max",
		"TEM_Max_24h":"TEM_Max_24h",
		"TEM_Min_24h":"TEM_Min_24h",
		"WIN_S_Max":"WIN_S_Max",
		"RHU":"RHU",
		"VIS":"VIS"
	}
}

var temMaxHold = {
	blue:10,
	fieldname:"高温警报",
	id:1,
	orange:35,
	red:40,
	type:"TEM_Max",
	yellow:30
}
var temMinHold ={
	blue:-2,
	fieldname:"低温警报",
	id:2,
	orange:-20,
	red:-25,
	type:"TEM_Min",
	yellow:-15
}
var preHold ={
	blue:1,
	fieldname:"短时强降水",
	id:3,
	orange:2,
	red:2.5,
	type:"PRE_1h",
	yellow:1.5
}

var windHold ={
	blue:5,
	fieldname:"大风警报",
	id:4,
	orange:15,
	red:20,
	type:"WIN_S_Avg_10mi",
	yellow:10
}
