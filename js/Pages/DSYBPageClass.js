/**
 * modify by wangkun on 2017/03/11
 * title:临近预报
 */
function DSYBPageClass() {
	this.className = "DSYB";
	this.elements = [{ id: 'hail', name: '冰雹', val: 1 }, { id: 'thunder', name: '雷电', val: 2 }, { id: 'gale', name: '大风', val: 7 }, { id: 'rainstorm', name: '暴雨', val: 20 }, { id: 'tornado', name: '龙卷', val: 19 }];
	this.curVal = 0;//当前值
	this.maketime = null;//制作时间
	this.forcasttime = null;//预报时间
	this.type = "prvn";
	this.hourspan = 24;
	this.version = "p";
	this.lu = null;
	var t = this;
	t.MyTime = null;
	this.renderMenu = function () {
		$("#menu_bd").html(`
			<div id="currentNav"></div><div class="btitle"></div>
    		<div class="datetime">
			<div id="dateSelect"></div>
		</div>
		<div class="space"></div>
		<div class="newcol"><span>预报员：</span><select id="forcastor"></select></div>
		<div>
			<div  class="title"><span>操作</span></div>
			<div class="newcol"><button id="down">下载</button><button id="submit">提交</button><button id="makeproduct">生成产品</button></div>
		</div>
		<div class="space"></div>
		<div>
			<div  class="title"><span>调入模式</span></div>
			<div class="newcol"><button>EC</button><button>GFS</button><button>MESO</button><button>MARS</button></div>
			<div class="newcol"><button>CHAF</button><button>QPF</button><button>中央台</button><button>本地</button></div>
		</div>
    	`);
		$("#map_div").append(`
			<div class="layui-progress layui-progress-big delete" lay-showPercent="true" id="num-progress" lay-filter="down">
				<div class="layui-progress-bar" lay-percent="0%"></div>
			</div>
		`);
		$("#map_div").append(`
			<div id="creatingProductWindow" class="delete" style="display: none;left:calc(50% - 420px);">
				<div class="cp_heading">
					<button type="button" class="close" title="close it" style="position: absolute;right: 20px;top:15px;">&times;</button>
					<div style="font-size: 24px;color: #0d3d88;text-align: center;height: 40px;line-height: 40px;margin-top:10px;letter-spacing: 5px;">0-24小时临近预报</div>
					<div style="border-bottom: 1px #bbbbbb solid; width: 90%;margin: 10px auto;font-size: 15px;"><span id="strDepartName">广西气象台</span><span id="nowTime" style="margin-left:120px;">2017年3月2日&nbsp;&nbsp;08时31分</span><div style="float: right">预报员：<span id="strForcastor">曾小团</span></div></div>
				</div>
				<div class="cp_body">
					<div style="margin: 0 auto;width: 90%;">
						<textarea id="productTxt">前1时次大雾天湖水库，</textarea>
						<img id="curimg" src="imgs/div_mapPic.png" width="100%" height="300px">
					</div>
				</div>
				<div class="cp_foot">
					<div style="float: left;margin: 20px;"><a>报文浏览↓↓↓</a></div><div style="float:right;margin-right:50px;"><button id="submitPro">确&nbsp;&nbsp;&nbsp;&nbsp;定</button>&nbsp;&nbsp;&nbsp;&nbsp;<button id="close">取&nbsp;&nbsp;&nbsp;&nbsp;消</button></div>
				</div>
			</div>
    	`);
		var sr = new SmallRadar();
		sr.Initi("map_div");
		var paneltool = new Panel_Tools($("#map_div"));
		$("#Panel_Tools").addClass("delete");
		fnCn.disablePanelToolImg();//禁用图标
		var userUtil = new UserUtil();
		t.lu = new LayerUtil();
		var map = GDYB.Page.curPage.map;
		GDYB.GridProductClass.init();
		InitRes();
		createBaseLayer();
    	/**
		 * @author:wangkun
		 * @date:2017-03-29
		 * @param:
		 * @return:
		 * @description:初始化事件
		 */
		function InitRes() {
			t.MyTime = new DateSelecter(1, 1); //最小视图为分钟
			t.MyTime.intervalMinutes = 60; //6分钟
			$("#dateSelect").append(t.MyTime.div);

			layui.use('element', function () {
				var element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
				element.init();
			});
			$("#down").on("click", t.down);
			$("#submit").on("click", t.submit);
			$("#makeproduct").on("click", t.makeProduct);
			$("#close").on("click", function () {
				$("#creatingProductWindow").css("display", "none");
			});
			$("#submitPro").on("click", t.submitProduct);
			//加载预报员
			userUtil.getForcastor(loadForcastor);
			//初始化图层
			var newStyle = heatMap_GaleStyles.concat(heatMap_HailStyles).concat(heatMap_HeavyRainStyles).concat(heatMap_ThunderStyles).concat(heatMap_TornadoStyles);
			var eleSize = t.elements.length;
			var tempElement = [];
			for (var i = 0; i < eleSize; i++) {
				var item = t.elements[i];
				var name = item.name;
				var id = item.id;
				var layer = t.lu.addLayer(name, "");
				if (i == 0) {//把第一个赋给
					GDYB.GridProductClass.layerFillRangeColor = layer;
				}
				tempElement.push(id);
				if (name === "冰雹" || name === "雷电" || name === "大风" || name === "龙卷") {
					layer.isShowLabel = false;
				}
				layer.items = newStyle;
			}
			paneltool.updateUI("rh", "融合24小时");
			GDYB.Legend.update(newStyle);
			GDYB.GridProductClass.currentType = t.type;
			GDYB.GridProductClass.currentVersion = t.version;
			GDYB.GridProductClass.currentHourSpan = t.hourspan;
			var curDateTime = t.MyTime.getCurrentDateTime();
			t.maketime = curDateTime.format("yyyy-MM-dd hh:mm:ss");
			t.filedatetime = curDateTime.format("yyyyMMddhhmm");
			t.datetime = t.maketime;
			GDYB.GridProductClass.currentMakeTime = t.maketime;
			GDYB.GridProductClass.currentDateTime = t.datetime;
			setTimeout(function () {
				GDYB.GridProductClass.dataCache.initCachesFromMemory(tempElement, [24]);//初始化缓存数据,这儿使用定时器的原因是异步
			}, 1000);
		}
		/**
		 * @author:wangkun
		 * @date:2017-03-29
		 * @param:
		 * @return:
		 * @description:加载预报员
		 */
		function loadForcastor(data) {
			if (typeof (data) === 'undefined' || data.length == 0) {
				layer.msg("预报员为空!");
				return;
			}
			var size = data.length;
			var strHtml = "";
			for (var i = 0; i < size; i++) {
				var item = data[i];
				var name = item.name;
				strHtml += "<option>" + name + "</option>";
			}
			$("#forcastor").html(strHtml);
		}
		/**
		 * @author:wangkun
		 * @date:2017-05-02
		 * @param:
		 * @return:
		 * @description:创建基本图层
		 */
		function createBaseLayer() {
			if (GDYB.GridProductClass.layerLuoqu == null) {
				GDYB.GridProductClass.layerLuoqu = t.lu.addLayer("落区", 'vector');
				GDYB.GridProductClass.layerLuoqu.style = {
					strokeColor: "#ff0000",
					strokeWidth: 2.0,
					fillColor: "#ff0000",
					fillOpacity: "0"
				};
			}
			if (GDYB.GridProductClass.layerLuoquCenter == null) {
				GDYB.GridProductClass.layerLuoquCenter = t.lu.addLayer("落区中心", 'vector');
				GDYB.GridProductClass.layerLuoquCenter.style = {
					fillColor: "#00cc00",
					fillOpacity: 0.75,
					pointRadius: 10,
					strokeColor: "#cc0000",
					strokeWidth: 1.0,
					strokeOpacity: 1.0,
					stroke: true
				};
			}
			if (GDYB.GridProductClass.layerFreePath == null) {
				GDYB.GridProductClass.layerFreePath = t.lu.addLayer("自由线条", 'vector');
				GDYB.GridProductClass.layerFreePath.style = {
					strokeColor: "#ff0000",
					strokeWidth: 2.0,
					fillColor: "#ff0000",
					fillOpacity: "0"
				};
			}
			GDYB.GridProductClass.drawLuoqu = new WeatherMap.Control.DrawFeature(GDYB.GridProductClass.layerLuoqu, WeatherMap.Handler.PolygonFree);
			map.addControl(GDYB.GridProductClass.drawLuoqu);
			GDYB.GridProductClass.drawLuoqu.events.on({ "featureadded": fnCn.ljDrawCompleted });
			GDYB.GridProductClass.drawFreePath = new WeatherMap.Control.DrawFeature(GDYB.GridProductClass.layerFreePath, WeatherMap.Handler.PathFree);
			map.addControl(GDYB.GridProductClass.drawFreePath);
		}
	},
		/**
		 * @author:wangkun
		 * @date:2017-05-02
		 * @param:
		 * @return:
		 * @description:下载
		 */
		this.down = function () {
			var curDateTime = t.MyTime.getCurrentDateTime();
			t.maketime = curDateTime.format("yyyy-MM-dd hh:mm:ss");
			t.filedatetime = curDateTime.format("yyyyMMddhhmm");
			t.datetime = t.maketime;
			GDYB.GridProductClass.currentMakeTime = t.maketime;
			GDYB.GridProductClass.currentDateTime = t.datetime;
			index = 0;
			var size = t.elements.length;
			var element = layui.element();
			DownGrid();
			/**
			 * @author:wangkun
			 * @date:2017-04-04
			 * @param:
			 * @return:
			 * @description:
			 */
			function DownGrid(datasetgrid) {
				var per = 100 * index / size;
				element.progress('down', per + '%');
				var item = t.elements[index];
				if (datasetgrid != undefined) {
					t.display(t.elements[index - 1].id, t.elements[index - 1].name, datasetgrid);
					if (index == 1) {
						GDYB.GridProductClass.datasetGrid = datasetgrid;
					}
				}
				if (index == size) {
					layer.msg("下载完成!");
					$("#div_GridValueItems td").on("click", RegisterLayerSelect);
					return;
				}
				index++;
				GDYB.GridProductClass.getGrid(DownGrid, item.id, t.type, "1000", t.hourspan, t.maketime, t.version, t.datetime, false);
			}
			function RegisterLayerSelect() {
				var name = this.innerText;
				var elementid = "";
				if (name.indexOf("雹") > -1) {
					elementid = "hail";
				} else if (name.indexOf("雷") > -1) {
					elementid = "thunder";
				} else if (name.indexOf("风") > -1) {
					elementid = "gale";
				} else if (name.indexOf("雨") > -1) {
					elementid = "rainstorm";
				} else if (name.indexOf("龙") > -1) {
					elementid = "tornado";
				}
				t.changeElement(elementid);
			}
		}
	/**
	 * @author:wangkun
	 * @date:2017-04-04
	 * @param:elementid-要素id,elementname-要素名，dataSetGrid-数据集
	 * @return:
	 * @description:显示
	 */
	this.display = function (elementid, elementname, dataSetGrid) {
		var layers = t.lu.getLayerByName(elementname);
		var grid = dataSetGrid.grid;
		var noVal = dataSetGrid.noDataValue; //不显示0
		var size = grid.length;
		for (var i = 0; i < size; i++) {
			var val = grid[i];
			if (val == 0 || val == -9999) {
				if (elementid === "rainstorm") {
					grid[i] = 0;
				}
				else {
					grid[i] = noVal;
				}
			} else {
				if (elementid === "hail") {//特殊处理
					grid[i] = 1;
				}
				else if (elementid === "thunder") {
					grid[i] = 2;
				}
				else if (elementid === "gale") {
					grid[i] = 17;
				}
				else if (elementid === "tornado") {
					grid[i] = 19;
				}
				else {
					grid[i] = val;
				}
			}
		}
		if (layers.length > 0) {
			layers[0].setDatasetGrid(dataSetGrid);
		} else {
			console.log("未找到图层！");
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-05-02
	 * @param:
	 * @return:
	 * @description:改变要素
	 */
	this.changeElement = function (elementid) {
		GDYB.GridProductClass.currentElement = elementid;
		var eleSize = t.elements.length;
		var elename = "";
		for (var i = 0; i < eleSize; i++) {
			var item = t.elements[i];
			if (item.id === elementid) {
				elename = item.name;
				break;
			}
		}
		if (elename === "") {
			return;
		}
		var layers = t.lu.getLayerByName(elename);
		GDYB.GridProductClass.layerFillRangeColor = layers[0];
		t.lu.moveToTop(layers[0]);//图层置顶
		var dataSetGrid = layers[0].datasetGrid;
		GDYB.GridProductClass.datasetGrid = dataSetGrid;
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-01
	 * @param:
	 * @return:
	 * @description:上传
	 */
	this.submit = function () {
		var eleSize = t.elements.length;
		for (var i = 0; i < eleSize; i++) {
			var item = t.elements[i];
			var elementid = item.id;
			var elementname = item.name;
			var layers = t.lu.getLayerByName(elementname);
			if (layers.length < 1) {
				console.log("图层为零，有错，请检查!");
			}
			else {
				var layerT = layers[0];
				var dataSetGrid = layerT.datasetGrid;
				fnCn.uploadGridToLocal(elementid, "lj", t.maketime, dataSetGrid, function () {
					layer.msg(elementname + ":提交失败!");
				},
					function () {
						layer.msg(elementname + ":提交成功!");
					});
			}
		}
	}
	this.makeProduct = function () {
		var forcastor = $("#forcastor").find("option:selected").text();
		var departname = $.cookie("showName");
		$("#strForcastor").html(forcastor);
		$("#strDepartName").html(departname);
		$("#nowTime").html(t.maketime);
		$("#creatingProductWindow").css("display", "block");
		var img = fnCn.getMapImg();
		$("#curimg").attr("src", img.src);
		var imgContent = img.src.replace("data:image/png;base64,", "");
		var datasetgrids = [];
		t.elements.forEach(item => {
			var elename = item.name;
			var layers = t.lu.getLayerByName(elename);
			var dataSetGrid = layers[0].datasetGrid;
			var style = t.chooseStyle(elename);
			datasetgrids.push({ name: item.name, datasetgrid: dataSetGrid, style: style });
		});
		fnCn.convertGridToText(datasetgrids, "productTxt");
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-09
	 * @param:
	 * @return:
	 * @description:选择style
	 */
	this.chooseStyle=function(elename){
		var style=null;
		if(elename==="大风"){
			style=heatMap_GaleStyles;
		}
		else if(elename==="冰雹"){
			style=heatMap_HailStyles;
		}
		else if(elename==="雷电"){
			style=heatMap_ThunderStyles;
		}
		else if(elename==="暴雨"){
			style=heatMap_HeavyRainStyles;
		}
		else if(elename==="龙卷"){
			style=heatMap_TornadoStyles;
		}
		return style;
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-05
	 * @param:
	 * @return:
	 * @description:提交产品
	 */
	this.submitProduct=function(){
		var content=$("#productTxt").html();
		var src=$("#curimg").attr("src");
		var filename="ds"+t.filedatetime+".doc";
		var imgContent=src.replace("data:image/png;base64,","");
		var forcastor=$("#forcastor").find("option:selected").text();
		var departname=$.cookie("showName");
		fnCn.submitDLProduct(filename,forcastor,departname,t.datetime,content,imgContent,function(){
			layer.msg("生成成功!");
			$("#creatingProductWindow").css("display", "none");
		},function(){
			layer.msg("生成失败!");
		});
	}
}
DSYBPageClass.prototype = new PageBase();
