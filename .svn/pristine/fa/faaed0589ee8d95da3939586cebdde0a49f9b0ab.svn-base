/**
 * @author:wangkun
 * @date:2017-03-09
 * @param:
 * @return:
 * @description:公共模块
 */
define(function(){
	depart:null;//部门
	return{
		/**
		 * @author:wangkun
		 * @date:2017-03-09
		 * @return:
		 * @description:AJAX
		 * @param           {[type]} url       [url]
		 * @param           {[type]} paramdata [参数]
		 * @param           {[type]} errortext [失败提示信息]
		 * @param           {[type]} recall    [回调函数]
		 */
		AJAX: function(url, paramdata, ft, errortext, recall) {
			$.ajax({
				type: 'post',
				url: url,
				async: ft,
				data: {
					'para': paramdata
				},
				dataType: 'json',
				error: function() {
					console.log(errortext);
				},
				success: function(data) {
					recall(data);
				}
			});
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-09
		 * @param:departcode-部门code
		 * @return:行政区划边界
		 * @description:获取行政区域边界
		 */
		GetBound:function(departcode){
			var url = gridServiceUrl+"services/AdminDivisionService/getDivisionInfo";
			var param={areaCode:departcode};
			param=JSON.stringify(param);
			var errtext="获取区域信息失败!";
			var result=null;
			var com=require('Common');
			com.AJAX(url, param,false, errtext, function(data){
				result=data;
			});
			console.log("执行完成!");
			return result;
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-11
		 * @param:
		 * @return:
		 * @description:根据用户获取部门
		 */
		GetDepartByUser:function(username){
			var url = gridServiceUrl + "services/AreaService/getDepartByUser";
			var param = {
				userName: username
			};
			param = JSON.stringify(param);
			var errtext = "获取部门信息失败!";
			var com = require(['Common']);
			com.AJAX(url, param, false, errtext, function(data) {
				depart = data;
				console.log("部门获取成功!");
			});
			return depart;
		},
		/**
		* @author:wangkun
		* @date:2017-03-10
		* @param:
		* @return:s
		* @description:画警戒线
		*/
		DrawAlarmLine: function(bound){
			var map=GDYB.Page.curPage.map;
			var centerX = bound.geometry.center.x;
			var centerY = bound.geometry.center.y;
			var points = bound.geometry.points;
			var size = points.length;
			var pts = [];
			for (var i = 0; i < size; i++) {
				var x = points[i].x;
				var y = points[i].y;
				var z = Math.sqrt((x - centerX) * (x - centerX) * 100 * 100 + (y - centerY) * (y - centerY) * 100 * 100);
				z += 100; //加30公里
				var angel = Math.atan(Math.abs(y - centerY) / Math.abs(x - centerX)); //角度
				var newX = Math.cos(angel) * z;
				var newY = Math.sin(angel) * z;
				var newXP = newX / 100;
				var newYP = newY / 100;
				if (x < centerX) { //减
					newXP = centerX - newXP;
				} else { //加
					newXP = centerX + newXP;
				}
				if (y < centerY) { //减
					newYP = centerY - newYP;
				} else { //加
					newYP = centerY + newYP;
				}
				var pt = new WeatherMap.Geometry.Point(newXP, newYP);
				pts.push(pt);
			}
			var line = new WeatherMap.Geometry.LineString(pts);
			var lineVector = new WeatherMap.Feature.Vector(line);
			lineVector.style = {
				strokeColor: "#FF0000",
				strokeWidth: 2
			};
			var testLayer = new WeatherMap.Layer.Vector("jingjie", {
				renderers: ["Canvas2"]
			});
			testLayer.id = "jingjie";
			testLayer.addFeatures([lineVector]);
			map.addLayer(testLayer);
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-12
		 * @param:
		 * @return:
		 * @description:初始化时间
		 */
		InitDateTime:function(id){
			require(['dtpicker'], function(dp) { //初始化日期
				$('#' + id).datetimepicker({
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
					showMeridian: 1,
					format: "yyyy-mm-dd hh:ii"
				});
				$("#"+ id).datetimepicker('setDate', new Date());
			});
		}
	}
});
