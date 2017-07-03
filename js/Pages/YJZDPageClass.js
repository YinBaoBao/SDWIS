/**
 * modify by wangkun on 2017/03/11
 * title:临近预报
 */
function YJZDPageClass() {
	this.className = "YJZDPageClass";
	this.datetimeC = null;
	this.filedatetime = "";
	this.elements = [{ id: 'hail', name: '冰雹', val: 1 }, { id: 'thunder', name: '雷电', val: 2 }, { id: 'gale', name: '大风', val: 17 }, { id: 'rainstorm', name: '暴雨', val: 20 }, { id: 'tornado', name: '龙卷', val: 19 }];
	this.curVal = 0;//当前值
	this.maketime = null;//制作时间
	this.forcasttime = null;//预报时间
	this.type = "prvn";
	this.hourspan = 2;
	this.version = "p";
	this.lu = null;
	this.chartUtil = null;
	var t = this;
	t.MyTime = null;
	this.renderMenu = function () {
		$("#menu_bd").html(`
			<div id="yjzd">
				<div class="yjzd-title-content"><div class="child-title">预报员：</div><select class="child-content" id="forcastor"></select></div>
				<div class="space5"></div>
				<div class="yjzd-title-content"><div class="child-title">时间：</div><div class="child-content"><div id="mydatetime"></div></div></div>
				<div class="space5"></div>
				<div id="type" class="yjzd-title-content"><div class="child-title">类型：</div><div class="child-content"><button>暴雨</button><button>雷电</button><button>冰雹</button><button>大风</button><button>龙卷</button></div></div>
				<div class="space5"></div>
				<div id="level" class="yjzd-title-content"><div class="child-title">级别：</div><div><button>蓝色</button><button>黄色</button><button>橙色</button><button>红色</button></div></div>
				<div class="space5"></div>
				<textarea id="resultTxt" placeholder="消息内容...">
				</textarea>
				<div class="row-btn"><button id="callLJForcast">调入临近预报</button><button id="makeproduct">生成预警指导</button></div>
				<div id="downContentDiv">
					<div style="margin: 10px auto">
						<span>历史预警指导：</span><button id="traceManage">留痕管理</button>
					</div>
					<div id="yjzdMessageHis">
						<ul>
						</ul>
					</div>
					<hr style="border: 1px #999999 solid; width: 100%; margin: 10px auto">
					<div id="zdContent" placeholder="指导内容..."></div>
				</div>
				<div id="chart-div">
					<div id="msgWindow-div"></div>
					<div id="msgSend-div">
						<input type="text"/>
						<button id="send-msg" style="float:right;">发送消息</button>
					</div>
				</div>
			</div>
		`);
		$("#map_div").append(`
			<div class="layui-progress layui-progress-big delete" lay-showPercent="true" id="num-progress" lay-filter="down">
				<div class="layui-progress-bar" lay-percent="0%"></div>
			</div>
		`);
		$("#map_div").append(`
				<div id="manageWindow" class="delete" style="display: none">
					<div class="windowContent">
						<div id="forecastNoticeDiv">
							<div class="tableBanner">
								<table style="width:100%;">
									<tr><th width="7%">编号</th><th width="10%">发布时间</th><th width="8%">预报员</th><th width="8%">天气类型</th><th width="30%">内容</th><th width="20%">影响区域</th><th width="15%">通知方式</th></tr>
								</table>
							</div>
							<div id="forecastNoticeData">
								<table class="warning-signal-detail-table">
								</table>
							</div>
						</div>
						<div id="contactStateDiv">
							<div class="tableBanner">
								<table id="traceHead">
									<tr><th>群组</th><th>姓名</th><th>电话</th><th>电话状态</th><th>短信</th><th>短信状态</th><th>传真</th><th>传真状态</th><th>Notes</th><th>Notes状态</th></tr>
								</table>
							</div>
							<div class="contactStateData">
								<table id="traceContent">
								</table>
							</div>
						</div>
						<div id="chattingRecordsDiv">
							<span><span style="color: blue">南宁气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-12&nbsp;18:03:43</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red">自动回复，已读，已发布预警</span><br>
							<span><span style="color: blue">来宾气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;18:15:28</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red">自动回复，已读，暂不考虑</span><br>
							<span><span style="color: blue">柳州气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;10:21:15</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;请问省台，我们这边应该发蓝色预警还是黄色预警？O(∩_∩)O谢谢<br>
							<span><span style="color: blue">钦州气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;10:23:03</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;黄色预警<br>
						</div>
						<a id="turnbackToMap">返回</a>
						<a id="export_btn">导出</a>
					</div>
				</div>
			`);
		$("#map_div").append(`
				<div id="productWindow" class="panel panel-default" style="display: none;">
					<div class="panel-heading">
						<div class="div-title">0-2小时预警指导</div><span class="close">&times;</span>
					</div>
					<div class="panel-body">
						<div id="productInfo" class="between-single-row" style="border-bottom:1px solid gray;">
							<div><span>部门:</span><span id="departName">山东气象台</span></div>
							<div id="productDateTime">2017-04-11 17:38:00</div>
							<div><span>预报员:</span><span id="forcastor">郭俊建</span></div>
						</div>
						<textarea id="productTxt"></textarea>
						<div>
							<img id="curimg" src="imgs/div_mapPic.png"></img>
						</div>
						<div class="space10"></div>
						<div id="noteDeaprt" class="product_title_content">
							<div class="child_title">通知单位：</div>
						</div>
						<div class="space5"></div>
						<div id="noteMethod" class="product_title_content">
							<div class="child_title">通知方式：</div>
							<button id="tel" class="active">电话</button>
							<button id="shortMsg" class="active">短信</button>
							<button id="fax" class="active">传真</button>
							<button id="notes" class="active">Notes</button>
						</div>
						<div class="space5"></div>
						<div class="text-center">
							<button id="submitForcastSignal" class="btn btn-default">确定</button><button id="submitCancel" class="btn btn-default">取消</button>
						</div>
					</div>
				</div>
			`);
		$("#turnbackToMap").click(function () {
			$("#manageWindow").css("display", "none");
		});
		var sr = new SmallRadar();
		sr.Initi("map_div");
		var paneltool = new Panel_Tools($("#map_div"));
		$("#Panel_Tools").addClass("delete");
		var userUtil = new UserUtil();
		t.lu = new LayerUtil();
		var map = GDYB.Page.curPage.map;
		GDYB.GridProductClass.init();
		InitRes();
		t.getWarningGuide();
		/**
		 * @author:wangkun
		 * @date:2017-03-29
		 * @param:
		 * @return:
		 * @description:初始化事件
		 */
		function InitRes() {
			layui.use('element', function () {
				var element = layui.element(); //Tab的切换功能，切换事件监听等，需要依赖element模块
				element.init();
			});
			t.datetimeC = new DateSelecter(1, 1, "", true); //最小视图为分钟
			t.datetimeC.intervalMinutes = 6; //6分钟
			var date = new Date();
			var moreMin = date.getMinutes() % 6;
			t.datetimeC.changeHours(-moreMin);
			$("#mydatetime").append(t.datetimeC.div);
			$("#mydatetime input").css("width", "135px");
			$("#callLJForcast").on("click", t.callLJForcast);
			$("#makeproduct").on("click", t.makeProduct);
			$("#type button").on("click", function () {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
			$("#level button").on("click", function () {
				$(this).siblings().removeClass("active");
				$(this).addClass("active");
			});
			$("#submitCancel").on("click", function () {
				$("#productWindow").css("display", "none");
			});
			$(".close").on("click", function () {
				$("#productWindow").css("display", "none");
			});
			$("#noteMethod button").on("click", function () {
				if ($(this).hasClass("active")) {
					$(this).removeClass("active");
				}
				else {
					$(this).addClass("active");
				}
			});
			$("#submitForcastSignal").on("click", t.submitForcastSignal);
			$("#send-msg").on("click", t.sendMsg);
			$("#traceManage").click(function () {
				$("#manageWindow").css("display", "block");
				t.showWarningGuideDetail();
			});
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
			paneltool.updateUI("rh", "融合2小时");
			GDYB.Legend.update(newStyle);
			GDYB.GridProductClass.currentType = t.type;
			GDYB.GridProductClass.currentVersion = t.version;
			GDYB.GridProductClass.currentHourSpan = t.hourspan;
			var curDateTime = t.datetimeC.getCurrentDateTime();
			t.maketime = curDateTime.format("yyyy-MM-dd hh:mm:ss");
			t.filedatetime = curDateTime.format("yyyyMMddhhmm");
			t.forcasttime = t.maketime;
			GDYB.GridProductClass.currentMakeTime = t.maketime;
			GDYB.GridProductClass.currentDateTime = t.forcasttime;
			setTimeout(function () {
				GDYB.GridProductClass.dataCache.initCachesFromMemory(tempElement, [2]);//初始化缓存数据,这儿使用定时器的原因是异步
			}, 1000);
			t.chartUtil = new ChartUtil();
			t.chartUtil.initi();
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
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-05
	 * @param:
	 * @return:
	 * @description:调入临近预报
	 */
	this.callLJForcast = function () {
		var curDateTime = t.datetimeC.getCurrentDateTime();
		t.maketime = curDateTime.format("yyyy-MM-dd hh:mm:ss");
		t.forcasttime = t.maketime;
		GDYB.GridProductClass.currentMakeTime = t.maketime;
		GDYB.GridProductClass.currentDateTime = t.forcasttime;
		var index = 0;
		var size = t.elements.length;
		var element = layui.element();
		DownGrid();
		/**
		 * @author:wangkun
		 * @date:2017-03-31
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
			}
			if (index == size) {
				layer.msg("下载完成!");
				var datasetgrids = [];
				t.elements.forEach(item => {
					var elename = item.name;
					var layers = t.lu.getLayerByName(elename);
					var dataSetGrid = layers[0].datasetGrid;
					var style = t.chooseStyle(elename);
					datasetgrids.push({ name: item.name, datasetgrid: dataSetGrid, style: style });
				});
				fnCn.convertGridToText(datasetgrids, "resultTxt", t.loadEffectArea);
				return;
			}
			index++;
			GDYB.GridProductClass.getGrid(DownGrid, item.id, t.type, "1000", t.hourspan, t.maketime, t.version, t.forcasttime, false);
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-04
	 * @param:
	 * @return:
	 * @description:显示所有要素
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
	 * @date:2017-04-09
	 * @param:
	 * @return:
	 * @description:选择style
	 */
	this.chooseStyle = function (elename) {
		var style = null;
		if (elename === "大风") {
			style = heatMap_GaleStyles;
		}
		else if (elename === "冰雹") {
			style = heatMap_HailStyles;
		}
		else if (elename === "雷电") {
			style = heatMap_ThunderStyles;
		}
		else if (elename === "暴雨") {
			style = heatMap_HeavyRainStyles;
		}
		else if (elename === "龙卷") {
			style = heatMap_TornadoStyles;
		}
		return style;
	},
		/**
		 * @author:wangkun
		 * @date:2017-04-10
		 * @param:data-影响区域，数组
		 * @return:
		 * @description:加载影响区域
		 */
		this.loadEffectArea = function (data) {
			$("#noteDeaprt span").remove();//清空button
			data.forEach(item => {
				$("#noteDeaprt").append("<span>" + item + "市气象台</span>")
			});
		}
	/**
	 * @author:wangkun
	 * @date:2017-03-13
	 * @param:
	 * @return:
	 * @description:制作产品
	 */
	this.makeProduct = function () {
		var forcastor = $("#forcastor").find("option:selected").text();
		var departname = $.cookie("showName");
		$("#strForcastor").html(forcastor);
		$("#strDepartName").html(departname);
		$("#nowTime").html(t.maketime);
		$("#productWindow").css("display", "block");
		var img = fnCn.getMapImg();
		$("#curimg").attr("src", img.src);
		var content = $("#resultTxt").val()
		$("#productTxt").val(content);
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-10
	 * @param:
	 * @return:
	 * @description:提交预警指导
	 */
	this.submitForcastSignal = function () {
		var forcastor = $("#strForcastor").text();//预报员
		var departname = $("#strDepartName").text();//部门
		var type = $("#type button.active").text();
		var level = $("#level button.active").text();
		if (type == "" || level == "") {
			alert("类型和等级不能为空!");
			return;
		}
		var content = $("#productTxt").html();
		var effectarea = "";
		$("#noteDeaprt span").each((index, item) => {
			effectarea += $(item).text() + "、";
		});
		effectarea = effectarea.substring(0, effectarea.length - 1);
		var recoverychannel = "";
		$("#noteMethod button").each((index, item) => {
			recoverychannel += $(item).text() + "、";
		});
		recoverychannel = recoverychannel.substring(0, recoverychannel.length - 1);
		var url = msgServiceUrl + "services/WarningGuideService/submitWarningGuideDetail";
		var param = {
			forcastor: forcastor,
			departname: departname,
			type: type,
			level: level,
			issuetime: me.datetime,
			content: content,
			effectarea: effectarea,
			recoverychannel: recoverychannel
		};
		param = JSON.stringify(param);
		fnCn.AJAX(url, param, true, function () {
			console.log("提交预警信号失败!");
		}, function (data) {
			console.log("提交预警信号成功!");
			t.getWarningGuide();
		});
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-07
	 * @param:
	 * @return:
	 * @description:获取预警指导
	 */
	this.getWarningGuide = function () {
		var departname = $.cookie("showName");
		var areaname = departname.replace("气象台", "");
		var param = {
			areaname: areaname
		};
		param = JSON.stringify(param);
		var url = msgServiceUrl + "services/WarningGuideService/getWarningGuide";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取预警信号失败!");
		}, function (data) {
			t.reloadWarningGuide(data);
		});
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-10
	 * @param:
	 * @return:
	 * @description:加载预警指导
	 */
	this.reloadWarningGuide = function (data) {
		if (data == undefined || data.length < 1)
			return;
		$("#yjzdMessageHis ul").html("");
		var size = data.length;
		data.forEach(item => {
			var type = item.type;
			var level = item.level;
			var strDate = item.date;
			var caption = type + level + "预警指导";
			var msgID = item.id;
			strDate = strDate.substring(2, 16);
			var strHtml = "<li msgid=" + msgID + "><span>" + caption + "</span><span class='date'>" + strDate + "</span></li>";
			$("#yjzdMessageHis ul").append(strHtml);
		});
		registerLiClick();
		$("#yjzdMessageHis li:first").click();//显示第一个
		function registerLiClick() {
			$("#yjzdMessageHis li").on("click", fnCn.checkOneBtn);
			$("#yjzdMessageHis li").on("click", t.hosProClick);
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-12
	 * @param:
	 * @return:
	 * @description:历史预警指导点击事件
	 */
	this.hosProClick = function () {
		var productID = $(this).attr("msgid");
		var param = {
			productid: productID
		};
		param = JSON.stringify(param);
		var url = msgServiceUrl + "services/WarningGuideService/getWarningGuideByID";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取产品详情失败!");
		}, function (data) {
			t.displayHosPro(data);
		});
		//清空消息
		$("#msgWindow-div").html("");
		//重新加载消息
		var url = msgServiceUrl + "services/WarningGuideService/getMsgByProductID";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取聊天消息失败!");
		}, function (data) {
			t.displayHosMsg(data);
		});
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-12
	 * @param:
	 * @return:
	 * @description:显示历史产品
	 */
	this.displayHosPro = function (data) {
		if (data == undefined) {
			return;
		}
		data.forEach(item => {
			var content = item.content;
			$("#zdContent").html(content);
		});
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-13
	 * @param:
	 * @return:
	 * @description:显示历史聊天消息
	 */
	this.displayHosMsg = function (datas) {
		if (typeof (datas) == "undefined") {
			return;
		}
		var count = datas.length;
		for (var i = 0; i < count; i++) {
			var msg = datas[i];
			var departname = msg.departname;
			var datetime = msg.datetime;
			var content = msg.content;
			var newHtml = "<div><span class='msg-departname'>" + departname + "</span><span class='msg-datetime'>" + datetime + "</span></div>";
			newHtml += "<div><span>" + content + "</span></div>";
			$("#msgWindow-div").append(newHtml);
			var scrollHeight = $("#msgWindow-div")[0].scrollHeight;
			$("#msgWindow-div").scrollTop(scrollHeight);
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-12
	 * @param:
	 * @return:
	 * @description:发送消息
	 */
	this.sendMsg = function () {
		var content = $("#msgSend-div input:first").val();
		if (content == undefined || content == "") {
			console.log("内容为空");
			return;
		}
		var msgid = $("#yjzdMessageHis li.active").attr("msgid");
		var nowDateTime = new Date();
		var strNowDateTime = nowDateTime.format("yyyy-MM-dd hh:mm:ss");
		console.log(strNowDateTime);
		t.chartUtil.sendMsg(msgid, content, strNowDateTime);
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-08
	 * @param:
	 * @return:
	 * @description:显示预警详细信息
	 */
	this.showWarningGuideDetail = function () {
		var departname = $.cookie("showName");
		var param = {
			departName: departname
		};
		param = JSON.stringify(param);
		var url = msgServiceUrl + "services/WarningGuideService/getTop6";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取预警信号失败!");
		}, function (data) {
			if (data == undefined || data == null) {
				console.log("预警信息数据为空!");
				return;
			}
			$("#forecastNoticeData table").html("");
			data.forEach(item => {
				var id = item.id;
				var type = item.signalType;
				var level = item.signalLevel;
				var date = item.issueTime;
				var forcastor = item.forcastor;
				var departname = item.departName;
				var content = item.issueContent;
				var effectarea = item.effectArea;
				var recoverychannel = item.recoveryChannel;
				var changes = item.changes;
				var trHtml = "<tr><td class='wsID'>" + id + "</td><td class='wsdatetime'>" + date + "</td><td class='wsforcastor'>" + forcastor + "</td>"
					+ "<td class='wstype'>" + type + "</td><td class='wscontent'>" + content + "</td><td class='wseffectarea'>" + effectarea + "</td>"
					+ "<td class='wsrecoverychannel'>" + recoverychannel + "</td></tr>";
				$("#forecastNoticeData table").append(trHtml);
			});
			$("#forecastNoticeData table td").on("click", t.displayTrace);
			$("#forecastNoticeData table td").on("click", t.displayMsgInTrace);
			$("#forecastNoticeData table td:first").click();
		});
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-21
	 * @param:
	 * @return:
	 * @description:显示留痕
	 */
	this.displayTrace = function () {
		var productID = Number(this.parentNode.firstChild.innerText);
		if (productID == undefined || productID == null)
			return;
		$(this.parentNode).addClass("active");
		$(this.parentNode).siblings().removeClass("active");
		//清空
		$("#traceContent").empty();
		var param = {
			productid: productID
		};
		param = JSON.stringify(param);
		var url = msgServiceUrl + "services/WarningGuideService/getTraceByProductID";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取产品详情失败!");
		}, display);
		function display(data) {
			if (data == null || data == undefined)
				return;
			var size = data.length;
			for (var i = 0; i < size; i++) {
				var item = data[i];
				var groupName = item.groupName;
				var name = item.name;
				var telNumber = item.telNumber;
				var telStatus = item.telStatus;
				var telClass = telStatus == 0 ? "fail" : "suc";
				telStatus = telStatus == 0 ? "失败" : "成功";
				var msgNumber = item.msgNumber;
				var msgStatus = item.msgStatus;
				var msgClass = msgStatus == 0 ? "fail" : "suc";
				msgStatus = msgStatus == 0 ? "失败" : "成功";
				var faxNumber = item.faxNumber;
				var faxStatus = item.faxStatus;
				var faxClass = faxStatus == 0 ? "fail" : "suc";
				faxStatus = faxStatus == 0 ? "失败" : "成功";
				var notesNumber = item.notesNumber;
				var notesStatus = item.notesStatus;
				var noteClass = notesStatus == 0 ? "fail" : "suc";
				notesStatus = notesStatus == 0 ? "失败" : "成功";
				var tr = "<tr><td>" + groupName + "</td><td>" + name + "</td><td>" + telNumber + "</td><td class=" + telClass + ">" + telStatus + "</td><td>" + msgNumber + "</td><td class=" + msgClass + ">" + msgStatus + "</td><td>" + faxNumber + "</td><td class=" + faxClass + ">" + faxStatus + "</td><td>" + notesNumber + "</td><td class=" + noteClass + ">" + notesStatus + "</td></tr>";
				$("#traceContent").append(tr);
			}
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-04-21
	 * @param:
	 * @return:
	 * @description:点击产品，显示聊天
	 */
	this.displayMsgInTrace = function () {
		$("#chattingRecordsDiv").empty();
		var productID = Number(this.parentNode.firstChild.innerText);
		if (productID == undefined || productID == null)
			return;
		var param = {
			productid: productID
		};
		param = JSON.stringify(param);
		var url = msgServiceUrl + "services/WarningGuideService/getMsgByProductID";
		fnCn.AJAX(url, param, true, function () {
			console.log("获取聊天消息失败!");
		}, display);
		function display(data) {
			if (data == null || data == undefined)
				return;
			var size = data.length;
			for (var i = 0; i < size; i++) {
				var msg = data[i];
				var departname = msg.departname;
				var datetime = msg.datetime;
				var content = msg.content;
				var newHtml = "<div><span class='msg-departname'>" + departname + "</span><span class='msg-datetime'>" + datetime + "</span></div>";
				newHtml += "<div><span>" + content + "</span></div>";
				$("#chattingRecordsDiv").append(newHtml);
			}
		}
	}
}
YJZDPageClass.prototype = new PageBase();
