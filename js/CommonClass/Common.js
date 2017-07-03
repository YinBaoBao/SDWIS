/**
 * @module 通用模块
 * @author POPE
 * @date   2017-03-13
 */
function Common() {
	if (!(this instanceof Common)) {
		return new Common();
	}
}
var fnCn = Common.prototype;
/**
 * 绘制要素
 * @param {object} jsonObject - 要素对象.
 * @param {string} queryMethod - 请求方法.
 * @param {string} type - 展示类型.
 */
fnCn.getRecordsetFromJson = function (jsonObject, queryMethod, type) {
	if (!jsonObject) {
		return;
	}
	var feature = null,
		features = null;
	if (jsonObject.features) {
		features = [];
		for (var i = 0, fe = jsonObject.features, len = fe.length; i < len; i++) {
			feature = this.getFeatureFromJson(fe[i], queryMethod, type);
			features.push(feature);
		}
	}
	return new WeatherMap.REST.Recordset({
		datasetName: jsonObject.datasetName,
		fieldCaptions: jsonObject.fieldCaptions,
		fields: jsonObject.fields,
		fieldTypes: jsonObject.fieldTypes,
		features: features
	});
};
fnCn.getFeatureFromJson = function (jsonObject, queryMethod, type) {
	if (!jsonObject) return;
	var self = this, names = jsonObject.fieldNames, values = jsonObject.fieldValues, geo = jsonObject.geometry, attr = {}, feature;
	if (geo) {
		if (geo.type == "REGION") //解决多边形岛洞问题，其他几何对象创建方法不变
			geo = self.getGeoRegionFromJson(geo);
		else if (geo.type == "POINT")
			geo = WeatherMap.REST.ServerGeometry.fromJson(geo).toGeoPoint();
		else if (geo.type == "LINE")
			geo = WeatherMap.REST.ServerGeometry.fromJson(geo).toGeoLine();
	}
	for (var i in names) {
		attr[names[i]] = values[i];
	}
	attr.Longitude = jsonObject.geometry.center.x; //经度
	attr.Latitude = jsonObject.geometry.center.y; //纬度
	if (queryMethod) attr.queryMethod = queryMethod;
	if (type) attr.type = type;
	feature = new WeatherMap.Feature.Vector(geo, attr);
	if (geo && geo.id) feature.fid = geo.id;
	return feature;
};
fnCn.getGeoRegionFromJson = function (jsonObject) {
	if (!jsonObject) {
		return;
	}
	var nStart = 0;
	var lines = [];
	for (var p = 0; p < jsonObject.parts.length; p++) {
		var pts = [];
		var ptCount = jsonObject.parts[p];
		for (var i = nStart; i < nStart + ptCount; i++) {
			var pt = new WeatherMap.Geometry.Point(jsonObject.points[i].x, jsonObject.points[i].y);
			pts.push(pt);
		}
		nStart += ptCount;
		var line = new WeatherMap.Geometry.LinearRing(pts);
		lines.push(line);
	}
	return new WeatherMap.Geometry.Polygon(lines);
};
fnCn.AJAX = function (url, paramdata, ft, errorrecall, successrecall) {
	$.ajax({
		type: 'post',
		url: url,
		async: ft,
		data: {
			'para': paramdata
		},
		dataType: 'json',
		error: function () {
			errorrecall();
		},
		success: function (data) {
			successrecall(data);
		}
	});
}
/**
 * @author:wangkun
 * @date:2017-05-03
 * @param:
 * @return:
 * @description:临近预报绘制完成
 */
fnCn.ljDrawCompleted = function () {
	if (GDYB.GridProductClass.layerLuoqu.features.length > 1) {
		var count = GDYB.GridProductClass.layerLuoqu.features.length;
		for (var i = count - 2; i >= 0; i--)
			GDYB.GridProductClass.layerLuoqu.removeFeatures(GDYB.GridProductClass.layerLuoqu.features[i]);
	}
	//落区中心全部删除
	if (GDYB.GridProductClass.layerLuoquCenter.features.length > 0) {
		var count = GDYB.GridProductClass.layerLuoquCenter.features.length;
		for (var i = count - 1; i >= 0; i--)
			GDYB.GridProductClass.layerLuoquCenter.removeFeatures(GDYB.GridProductClass.layerLuoquCenter.features[i]);
	}
	if (GDYB.GridProductClass.luoquCorrectStationOnGrid) {
		GDYB.GridProductClass.updateGridByStation(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueDown);
	} else {
		//保持空间分布趋势
		if (GDYB.GridProductClass.luoquCorrectType == 0) {
			if (GDYB.GridProductClass.currentGridValueDown != null && GDYB.GridProductClass.currentGridValueDown != null) {
				//客户端订正
				GDYB.GridProductClass.updateGridBySpatial(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueDown);
			}
		}
		//如果不保持空间趋势，而是距离反比插
		else if (GDYB.GridProductClass.luoquCorrectType == 1 && GDYB.GridProductClass.currentGridValueDown != null && GDYB.GridProductClass.currentGridValueDown != null && GDYB.GridProductClass.currentGridValueDown != GDYB.GridProductClass.datasetGrid.noDataValue && GDYB.GridProductClass.currentGridValueUp != GDYB.GridProductClass.datasetGrid.noDataValue) {
			//添加落区中心点，作为极大值点
			var feature = GDYB.GridProductClass.layerLuoqu.features[0];
			var bounds = feature.geometry.bounds;
			var centerLonLat = {
				x: bounds.left + (bounds.right - bounds.left) / 2,
				y: bounds.bottom + (bounds.top - bounds.bottom) / 2
			};
			var pointMax = new WeatherMap.Geometry.Point(centerLonLat.x, centerLonLat.y);
			var pointVectorMax = new WeatherMap.Feature.Vector(pointMax);
			pointVectorMax.attributes.z = GDYB.GridProductClass.currentGridValueDown;
			GDYB.GridProductClass.layerLuoquCenter.addFeatures([pointVectorMax]);

			GDYB.GridProductClass.dragFeature.activate();

			//距离反比权重订正
			GDYB.GridProductClass.layerLuoquCenter.borderValue = GDYB.GridProductClass.currentGridValueDown;
			//if(GDYB.GridProductClass.currentGridValueDown != null && GDYB.GridProductClass.currentGridValueUp != null)
			GDYB.GridProductClass.updateGridByIDW(feature.geometry);

			//停止落区绘制
			GDYB.GridProductClass.drawLuoqu.deactivate();
		}
		//默认方式
		else if (GDYB.GridProductClass.luoquCorrectType == 2) {
			if (GDYB.GridProductClass.currentGridValueDown != null) {
				GDYB.GridProductClass.updateGridBySpatial(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueDown);
			}
		}
	}
	GDYB.GridProductClass.layerFillRangeColor.refresh();
}
/**
 * @author:wangkun
 * @date:2017-05-03
 * @param:
 * @return:
 * @description:禁用图标
 */
fnCn.disablePanelToolImg = function () {
	var imgids = ["img_tool_drawluoqunone", "img_tool_wind", "img_tool_editcell", "img_tool_qhdz", "img_tool_modifytrend", "img_tool_importFromGrid", "img_tool_importFromFile"];
	imgids.forEach(item => {
		$("#" + item).addClass("disabled");
	});
}
/**
 * @author:wangkun
 * @date:2017-04-01
 * @param:
 * @return:
 * @description:上传格点到服务器
 */
fnCn.uploadGridToLocal = function (elementid, ljords, maketime, datasetgrid, sucrecall, errrecall) {
	var rows = datasetgrid.rows;
	var cols = datasetgrid.cols;
	var left = datasetgrid.left;
	var bottom = datasetgrid.bottom;
	var width = datasetgrid.right - left;
	var height = datasetgrid.top - bottom;
	var values = datasetgrid.grid;
	var param = {
		element: elementid,
		ljords: ljords,
		left: left,
		bottom: bottom,
		width: width,
		height: height,
		rows: rows,
		cols: cols,
		values: values,
		maketime: maketime
	};
	param = JSON.stringify(param);
	var url = gridServiceUrl + "services/TxtGridService/SaveGridToTxt";
	fnCn.AJAX(url, param, true, sucrecall, errrecall);
}
/**
 * @author:wangkun
 * @date:2017-04-04
 * @param:
 * @return:
 * @description:地图截图
 */
fnCn.getMapImg = function () {
	var map = GDYB.Page.curPage.map;
	var size = map.getCurrentSize();
	var memCanvas = document.createElement("canvas");
	memCanvas.width = size.w;
	memCanvas.height = size.h;
	memCanvas.style.width = size.w + "px";
	memCanvas.style.height = size.h + "px";
	var memContext = memCanvas.getContext("2d");
	for (var i = 0; i < map.layers.length; i++) {
		if (typeof (map.layers[i].canvasContext) != "undefined") {
			var layerCanvas = map.layers[i].canvasContext.canvas;
			memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
		} else if (typeof (map.layers[i].renderer) != "undefined" && typeof (map.layers[i].renderer.canvas) != "undefined") {
			if (typeof (map.layers[i].renderer.canvas) == "undefined")
				continue;
			var layerCanvas = map.layers[i].renderer.canvas.canvas;
			memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
		}
	}
	var img = new Image();
	img.src = memCanvas.toDataURL("image/png");
	return img;
}
fnCn.convertGridToText = function (datasetgrids, id, areaRecall) {
	var me = this;
	var areacode = "37";
	var url = gridServiceUrl + "services/AdminDivisionService/getChildDivisionInfo";
	var param = {
		areaCode: areacode
	};
	param = JSON.stringify(param);
	fnCn.AJAX(url, param, false, function () {
		layer.msg("反演文字失败!");
	}, function (data) {
		if (data == undefined) {
			layer.msg("获取区域信息失败!");
			return;
		}
		var strContent = "";
		var areas = [];
		var effectAreas = [];
		var featureUtilityClass = new FeatureUtilityClass();
		data.forEach(item => {
			var feature = featureUtilityClass.getFeatureFromJson(JSON.parse(item));
			feature.geometry.calculateBounds();
			areas.push(feature);
		});
		datasetgrids.forEach(item => {
			var name = item.name;
			var datasetgrid = item.datasetgrid;
			var style = item.style;
			style.forEach(itemStyle => {
				var strArea = "";
				areas.forEach(itemArea => {
					if (GDYB.GridProductClass.contain(datasetgrid, itemArea.geometry, itemStyle.start)) {
						var areaname = itemArea.attributes["NAME"];
						var find = effectAreas.find(areaItem => areaItem === areaname);
						if (find == undefined) {
							effectAreas.push(areaname);
						}
						strArea += areaname + "、";
					}
				});
				if (strArea.length > 0) {
					strArea = strArea.substr(0, strArea.length - 1);
					if (strContent.length > 0)
						strContent += "&#13;&#10;"
					strContent += strArea + "等地将出现" + itemStyle.caption;
				}
			});
		});
		$("#" + id).html(strContent);
		if (areaRecall != undefined)
			areaRecall(effectAreas);
	});
}
fnCn.submitDLProduct = function (productname, forcastor, areaname, datetime, content, img, sucrecall, errrecall) {
	var param = {
		templateName: "ljforcast.ftl",
		productName: productname,
		forcastor: forcastor,
		areaname: areaname,
		datetime: datetime,
		content: content,
		img_forcast: img
	};
	param = JSON.stringify(param);
	var url = archiveServiceUrl + "services/ArchiveService/createProduct";
	fnCn.AJAX(url, param, true, errrecall, sucrecall);
}
/**
 * @author:wangkun
 * @date:2017-04-10
 * @param:
 * @return:
 * @description:单选按钮
 */
fnCn.checkOneBtn = function () {
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
}
/**
 * @author:wangkun
 * @date:2017-04-10
 * @param:
 * @return:
 * @description:选择多个按钮
 */
fnCn.checkMulBtn = function () {
	if ($(this).hasClass("active")) {
		$(this).removeClass("active");
	}
	else {
		$(this).addClass("active");
	}
}