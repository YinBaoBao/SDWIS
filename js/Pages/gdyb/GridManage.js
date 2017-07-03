/**
 * @module 格点预报管理
 * @author POPE
 * @date   2017-05-10
 */
function GridManage(){
	if(!(this instanceof GridManage)){
		return new GridManage();
	}
	this.className = "GridManage";
}

var fnGM = GridManage.prototype;
/**
 * @author:POPE
 * @date:2017-05-10
 * @param: {string} isLand - 是否陆地要素.
 * @callback: callback - 回调函数.
 * @description:下载全部要素初始场
 */
fnGM.downAllElement = function(isLand,type,callback){
	var elements = [],elementNames = [],buttons;
	if(isLand){
		buttons = $("#div_element").find("button[flag!='sea']");
	}
	else {
		buttons = $("#div_element").find("button[flag='sea']");
	}
	for(var key in buttons){
		var elementId = buttons[key].id;
		var elementName = buttons[key].innerHTML;
		if(elementId && elementName) {
			elements.push(elementId);
			if(isLand){
				elementNames.push("陆地-"+ elementName);
			}
			else{
				elementNames.push("海洋-"+ elementName);
			}
		}
	}
	//递归请求
	var nIndex = -1;
	down();
	function down(){
		nIndex++;
		//全部请求完成
		if(nIndex >= elements.length) {
			$.isFunction(callback) && callback.call(null);
			return;
		}
		var element = elements[nIndex];
		var elementName = elementNames[nIndex];
		var hourspans = GDYB.GDYBPage.getHourSpan(element);
		var date = GDYB.GDYBPage.myDateSelecter.getCurrentTime(false);
		// var type = GDYB.GridProductClass.currentType;
		var maketime = GDYB.GridProductClass.currentMakeTime;
		var level = 1000;
		var recalls = [];
		recalls.push(down);
		GDYB.GridProductClass.cache(recalls, type, maketime, date, element, elementName, level, hourspans);
	}
};
/**
 * @author:POPE
 * @date:2017-05-10
 * @param: {string} isLand - 是否陆地要素.
 * @callback: callback - 回调函数.
 * @description:提交全部要素
 */
fnGM.saveAllElement = function(isLand,type,callback){
	var elements = [],elementNames = [],buttons,nIndex = -1,messages = "",userName = GDYB.GridProductClass.currentUserName,typeName ='',version = GDYB.GridProductClass.currentVersion;
	if(isLand){
		buttons = $("#div_element").find("button[flag!='sea']");
	}
	else {
		buttons = $("#div_element").find("button[flag='sea']");
	}
	switch (type){
		case 'cty':
			typeName = '市台-';
			version = 'p';
			break;
		case 'prvn':
			typeName = '省台-';
			break;
	}
	for(var key in buttons){
		if(buttons[key].id) {
			elements.push(buttons[key].id);
			elementNames.push(buttons[key].innerHTML);
		}
	}
	save();
	//递归请求
	function save(message){
		nIndex++;
		if(message) messages += message +"<br/>";
		if(nIndex >= elements.length) {
			$.isFunction(callback) && callback.call(null,messages);
			return;
		}
		var forecaster = $("#selectYuBaoYuan").val() || '',issuer = $("#selectQianFaRen").val() || '',element = elements[nIndex],elementName = elementNames[nIndex];
		var hourspans = GDYB.GDYBPage.getHourSpan(element);
		// var type = GDYB.GridProductClass.currentType;
		GDYB.GridProductClass.saveGridProducts(save, type, userName, forecaster, issuer, element, hourspans,version);
	}
}

/**
 * @author:POPE
 * @date:2017-06-25
 * @callback: callback - 回调函数.
 * @description:获取格点数据
 */
fnGM.getGridData = function(element,type,level,hourSpan,maketime,version,datetime,callback){
	var url = gridServiceUrl + "services/GridService/getGrid";
	$.ajax({
		data:{"para":"{element:'"+ element + "',type:'"+ type + "',level:'"+ level + "',hourspan:"+ hourSpan + ",maketime:'" + maketime + "',version:'" + version + "',datetime:'"+ datetime + "'}"},
		url:url,
		dataType:"json",
		success:function(data){
			var datasetGrid = null,dvalues = data.dvalues,rows = data.rows,cols = data.cols;
			if (dvalues && dvalues.length > 0) {
				var bWind = (element == "10uv" || element == "wmax"); //是否为风场，风场具有两个字段（风向、风速），在dvalues中交叉表示
				var hasTag = (!bWind)&&(dvalues.length == rows*cols*2);
				var dimensions = (bWind||hasTag) ? 2 : 1; //维度，风场有两维；带有Tag属性也是两维
				var dMin = 9999;
				var dMax = -9999;
				datasetGrid = new WeatherMap.DatasetGrid(data.left, data.top, data.right, data.bottom, rows, cols, bWind?2:1); //只有风是两要素
				datasetGrid.noDataValue = data.noDataValue;
				var grid = [],tag = [];
				for (var i = 0; i < rows; i++) {
					var tagLine = [];
					var nIndexLine = cols * i * dimensions;
					for (var j = 0; j < cols; j++) {
						var nIndex = nIndexLine + j * dimensions;
						var z;
						if (bWind) {
							z = dvalues[nIndex + 1];
							grid.push(Math.round(dvalues[nIndex+1])); //风速在前
							grid.push(Math.round(dvalues[nIndex]));   //风向在后
						}
						else {
							z = dvalues[nIndex];
							grid.push(Math.round(dvalues[nIndex] * 10) / 10);
							if(hasTag)
								tagLine.push(dvalues[nIndex+1]);
						}
						if (z != 9999 && z != -9999) {
							if (z < dMin)
								dMin = z;
							if (z > dMax)
								dMax = z;
						}
					}
					if(hasTag)
						tag.push(tagLine);
				}
				datasetGrid.grid = grid;
				datasetGrid.dMin = dMin;
				datasetGrid.dMax = dMax;
				if(hasTag){
					datasetGrid.tag = tag;
					datasetGrid.defaultTag = 0;
				}
			}
			$.isFunction(callback)&&callback.call(null,datasetGrid);
		},
		type:"POST"
	});
}
