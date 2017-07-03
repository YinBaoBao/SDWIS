/**
 * @module 数据处理服务
 * @author POPE
 * @date   2017-03-09
 */
function DataService(){
	if(!(this instanceof DataService)){
		return new DataService();
	}
}
var fnDS = DataService.prototype;

fnDS.getCommonData = function(queryMethod,callback){
	var url = ENVIServiceUrl+'services/data/query';
	var columns ='*',condition ='1>0';
	var param ="{\"Function\":\""+ queryMethod+"\",\"CustomParams\":{\"columns\":\"" + columns + "\", \"clauses\":\"" + condition + "\"},\"Type\":2}";
	$.ajax({
		type: 'post',
		url: url,
		data: {"param": param},
		dataType: 'json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				data[i].queryMethod = queryMethod;
				if(data[i].latitude!=null && data[i].latitude!=''){
					data[i].latitude = Math.floor(data[i].latitude * 100) / 100
				}
				if(data[i].longitude!=null && data[i].longitude!=''){
					data[i].longitude = Math.floor(data[i].longitude * 100) / 100
				}
				if(data[i].HydrologicalControlStationLatitude!=null && data[i].HydrologicalControlStationLatitude!=''){
					data[i].HydrologicalControlStationLatitude = Math.floor(data[i].HydrologicalControlStationLatitude * 100) / 100
				}
				if(data[i].HydrologicalControlStationLongitude!=null && data[i].HydrologicalControlStationLongitude!=''){
					data[i].HydrologicalControlStationLongitude = Math.floor(data[i].HydrologicalControlStationLongitude * 100) / 100
				}
				if(data[i].WarningPointLatitude!=null && data[i].WarningPointLatitude!=''){
					data[i].WarningPointLatitude = Math.floor(data[i].WarningPointLatitude * 100) / 100
				}
				if(data[i].WarningPointLongitude!=null && data[i].WarningPointLongitude!=''){
					data[i].WarningPointLongitude = Math.floor(data[i].WarningPointLongitude * 100) / 100
				}
			}
			$("#div_progress").css("display", "none");
			$.isFunction(callback)&&callback.call(null,data);
		},
		error:function(){
			layer.alert("获取数据失败，请检查网络连接或联系管理员！");
			$("#div_progress").css("display", "none");
		}
	});
}
fnDS.getJSON = function (url,callback) {
	$.ajax({
		type:"GET",
		url:url,
		dataType: "json",
		success: function(data){
			$.isFunction(callback)&&callback.call(null,data);
		},
		error: function(e){
			layer.alert("获取数据失败，请检查网络连接或联系管理员！");
		}
	});
}
