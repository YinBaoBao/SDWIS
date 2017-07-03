/**
 * Created by wangkun on 2017/1/11.
 * title:短临服务-显示和监测
 */
function DLYBPageClass() {
	var t = this;
	t.MapLayer = new Map(); //存放地图图层
	this.renderMenu=function(){
		//中尺度分析
		$("#menu_bd").html(`
			<div id="ZCD_Menu">
				<div class="title" style="text-align: center;">绘制落区</div>
				<div class="btitle"></div>
				<div id='div_tools'>
					<img id="img_tool_drawluoqunone" title="绘制落区" src="imgs/img_tool_drawluoqunone.png"/>
				</div>
				<div class="btitle"></div>
				<div id="fillInArea">
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#yxxt">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">影响系统</a>
							</h4>
						</div>
						<div id="yxxt" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<input>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#sd">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">湿度</a>
							</h4>
						</div>
						<div id="sd" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<input>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#bwdd">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">不稳定度</a>
							</h4>
						</div>
						<div id="bwdd" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea>我省鲁西北地区△T850-500在>28℃；济南探空K=26℃，si=6.57，CAPE=0；青岛探空K=-18℃，si=15.96，CAPE=0；威海探空K=1℃，si=10.16，CAPE=1。</textarea>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#08d">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">08点数值预报检验</a>
							</h4>
						</div>
						<div id="08d" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea>08时850hPa实况风场与02时6小时T639预报基本一致。</textarea>
							</div>
						</div>
					</div>
					<div class="panel panel-default" style="margin-bottom:0;">
						<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" style="padding:4px;" href="#zhfx">
							<h4 class="panel-title" style="width:100%;height:100%;">
								<a href="#">综合分析</a>
							</h4>
						</div>
						<div id="zhfx" class="panel-collapse collapse in">
							<div class="panel-body" style="display:flex;flex-flow:row wrap;padding:4px;">
								<textarea>今天白天，受高空槽影响，我省鲁西北地屈△T850-500大于28℃，具有一定的不稳定能量，但整层湿度较小，考虑今天白天我省鲁西北地区局部的雷阵雨天气。</textarea>
							</div>
						</div>
					</div>
					<div id="uploadPic">附图<input type="file"></div>
				</div>
				<div class="btitle"></div>
				<div class="btn_line"><button>提交</button><button>重置</button></div>
			</div>
		`);
		this.Initi();
	}
	this.renderMenu1 = function() {

		$("#menu_bd").html(`
			<div class="panel panel-default" id="ldsk">
				<div class="panel-heading">
					<h3 class="panel-title">雷达实况</h3>
				</div>
				<div class="panel-body">
                    <div style="height:30px;width:300px;">
                        <div id="lddt" style="position: relative;left:10px;top:0px"></div>
                    </div>
                    <div class='btn_line'><button id="swan_2dcr">回波强度</button><button id="swan_titan">风暴追踪</button><button id="swan_2det">回波顶高</button><button id="swan_2dvil">液态水含量</button></div>
					<div class='btn_line'><button id="swan_qpf">QPF</button><button>自动刷新</button></div>
				</div>
			</div>
		`); //客观预报
		$("#menu_bd").append(`
			<div class="panel panel-default" id="kgyb">
				<div class="panel-heading">
					<h3 class="panel-title">客观预报</h3>
				</div>
				<div class="panel-body">
					<div class="divsp text-center">
						<div class='btn_line'><button id="zdjs">整点降水</button><button id="lbgl">雷暴概率</button></div>
					</div>
					<div class="text-center">
						<div class='btn_line'><button id="bbgl">冰暴概率</button><button id="lbdf">雷暴大风</button></div>
					</div>
				</div>
			</div>
		`); //客观预报
		$("#menu_bd").append(`
			<div id="jkys" class="panel panel-default">
				<div class="panel-heading">
					<h3 class="panel-title">监控要素</h3>
				</div>
				<div class="panel-body">
					<div class="divsp text-center">
						<div class='btn_line'><button id="wind">大风</button><button id="qjs">强降水</button></div>
					</div>
					<div class="text-center">
						<div class='btn_line'><button id="leid">雷</button><button id="bb">冰雹</button></div>
					</div>
				</div>
			</div>
		`); //监控要素
		//增加消息面板
		strHtml = '<div id="small_msg" style="width:40px;height:30px;position:absolute;left:20px;bottom:20px;display:none;"><span class="glyphicon glyphicon-comment" style="font-size:30px;cursor:pointer;"></span></div>';
		strHtml += '<div id="big_msg" style="width:50%;height:210px;position:absolute;left:0px;bottom:2px;">';
		strHtml += '</div>';
		$("#map_div").append(strHtml);
		//增加图层控件
		var map = GDYB.Page.curPage.map;
		map.addControl(new WeatherMap.Control.LayerSwitcher());
		CreateMsgPanel();
		t.Initi();
		t.CreateLayer();
		//setInterval(t.DownNewQDL,5000);


		function CreateMsgPanel() { //创建消息面板
			$("#big_msg").html(`
				<div id="msgstatus" class="full">
				 	<div class="panel panel-default full">
						<div class="panel-heading" style="height:35px;"><span>消息状态</span><button class="close">&times;</button></div>
						<div class="panel-body" style="display:flex;height:175px">
							<div style="flex:10;overflow-y:auto;">
								<table class="table table-bordered table-hover">
									<thead>
										<tr><th>区域</th><th>要素</th><th>状态</th><th>开始时间</th></tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			`);
			strHtml = '<tr><td>青岛</td><td>暴雨</td><td class="warning">开始预警</td><td>2017-1-12</td></tr>';
			strHtml += '<tr><td>烟台</td><td>大风</td><td class="warning">开始预警</td><td>2017-1-11</td></tr>';
			strHtml += '<tr><td>东营</td><td>暴雨</td><td class="warning">开始预警</td><td>2017-1-10</td></tr>';
			$("#msgstatus tbody").append(strHtml);
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-01-18
	 * @param:
	 * @return:
	 * @description:初始化界面样式和事件
	 */
	this.Initi=function(){
		/*$("#menu_bd button").addClass("btn");
		$("#menu_bd button").addClass("btn-default");
		$("#menu_bd button").addClass("w90");
		$("#ldsk button").bind("click", BtnCheck);
		$("#ldsk button").bind("click", t.DisplayRaster);
		$("#small_msg").bind("click", t.MsgSwitch);
		$("#big_msg .close").bind("click", t.MsgSwitch);
		$("#jkys button").bind("click", BtnCheck);
		$("#jkys button").bind("click", t.DownNewQDL);*/
		InitTime();
		//InitiTimer();
		function InitiTimer(){
			t.DateUpdateTimer=setInterval(function(){
				t.lddt.rightBtn.click();
				console.log("updatetime");
			},1000*60*6);//一分钟更新一次
		}
		function BtnCheck() {
			var elementid = this.id;
			var elementname = this.innerHTML;
			var layer = t.MapLayer.get(elementid);
			var b=false;
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(this).addClass("active");
				b=true;
			}
			if(layer!=undefined){
				layer.setVisibility(b);
			}
		}
		function InitTime() {
			t.lddt = new DateSelecter(0);
			t.lddt.intervalMinutes = 6; //6分钟一次
			$("#date").append(t.lddt.div);

			t.lddt.leftBtn.click(function() {//点击上翻
				t.DisplayRaster();
			});
			t.lddt.rightBtn.click(function() {//点击下翻
				t.DisplayRaster();
			});
			t.lddt.input.change(function() {//点击时次
				t.DisplayRaster();
			});
		}
	}
	/**
	 * @author:wangkun
	 * @date:2017-01-18
	 * @param:
	 * @return:
	 * @description:显示雷达产品
	 */
	this.DisplayRaster = function() { //显示雷达数据
		var elementid = this.id;
		if(elementid=="ldauto")return;
		var elementName = this.innerHTML;
		var elements = $("#ldsk button.active");
		if (elements.length == 0)
			return;
		elementid = $("#ldsk button.active")[0].id;
		var level = 0;
		var datetime = t.lddt.getCurrentTime(false);
		GDYB.RadarDataClass.displayRadarData(function() {
			t.CalAffect();
		}, elementid, level, datetime, null);
		var item = GDYB.GridProductClass.getFillColorItems(elementid);
		GDYB.Legend.update(item);
	}
	this.CalAffect = function() { //计算影响
		t.CalRain();
	}
	this.CalRain = function() { //计算降水
		var datasetgrid = GDYB.RadarDataClass.layerFillRangeColor.datasetGrid;
		//获取降水区域
		//GDYB.FilterTool.refresh(20, 30);
	}
	this.MsgSwitch = function() { //消息切换
		var id = this.id;
		if (id === "small_msg") {
			$("#small_msg").hide("fast");
			$("#big_msg").show("slow");
		} else {
			$("#big_msg").hide("fast");
			$("#small_msg").show("slow");
		}
	}
	this.MsgProcess = function(e) { //消息过程
		/*var len=$("#msgProcess").length;
		if(len==0){
			var strHtml='<div id="msgProcess" style="width:80%;height:70%;position:absolute;left:left:50%;top:50%;border:1px solid black;">';
			strHtml+='</div>';
			$("#map_div").append(strHtml);
		}*/
		var txt = "我有一块钱!";
		$("#msgtext").html(txt);
	}
	this.TableDataChange = function() {

	}
	this.DownNewQDL1 = function() { //下载强对流
		//获取要素
		var elementIDs = [];
		$("#jkys button.active").each(function(i, e) {
			var id = e.id;
			elementIDs.push(id);
		});
		timer.Start(1);
		//多线程
		var p1 = new Promise((resolve, reject) => {
			for (var i = 0; i < 100000000; i++) {
				var x = "ab";
				var y = "cdef";
				var tt = x + y;
			}
			resolve("p1p");
			return "p1p";
		});
		var p2 = new Promise((resolve, reject) => {
			for (var i = 0; i < 10000000; i++) {
				var x = "ab";
				var y = "cdef";
				var tt = x + y;
			}
			resolve("p2p");
			return "p2p";
		});
		var p = Promise.all([p1, p2]).then(value => {
			console.log(value);
			timer.Stop(1);
			var times = timer.GetTime(1);
			console.log(times);
		});
		/*t.AJAX("qjs","强降水",function(data){
			var datasetGrid=gu.ConvertToDatasetGrid(data);
			t.QJSLayer.setDatasetGrid(datasetGrid);
		});*/
	}
	this.AJAX = function(url, param, recall1, recall2) {
		$.ajax({
			data: {
				"para": param
			},
			url: url,
			dataType: "json",
			type: "POST",
			success: function(data) {
				recall1(data);
			},
			error: function(e) {
				recall2(e);
			}
		});
	}
	this.DownNewQDL = function() { //下载新数据
		var url = gridServiceUrl + "services/TxtGridService/getGrid";
		var arrP = []; //存放任务
		var mapElement = new Map();
		$("#jkys button.active").each(function(i, e) {
			var elementID = e.id;
			var elementName = e.innerHTML;
			var param = "{element:'" + elementID + "'}";
			mapElement.set(i, {
				elementid: elementID,
				elementname: elementName
			});
			var promise = new Promise((resolve, reject) => {
				t.AJAX(url, param, resolve, reject);
			});
			arrP.push(promise);
		});
		Promise.all(arrP).then(su => {
			var size = su.length;
			var ed=new Map();//名称与数据
			for (var index = 0; index < size; index++) {
				var data = su[index];
				var dataCount = data.length;
				var elementid = mapElement.get(index).elementid;
				var layer=t.MapLayer.get(elementid);
				var elementname = mapElement.get(index).elementname;
				var datasetgrids=[];
				for (var c = 0; c < dataCount; c++) {
					//if(c>3)continue;
					var gridata = data[c];
					var datasetGrid = gu.ConvertToDatasetGrid(gridata);
					var item=layer.items;
					var features=gu.CalDZM(datasetGrid,item,c);
					layer.addFeatures(features);
					datasetgrids.push(datasetGrid);
					//layer.setDatasetGrid(datasetGrid);
				}
				ed.set(elementid,datasetgrids);
				layer.animator.start();
			}
			t.CalArea(ed);
		}, fail => {
			console.log(fail);
		});
	}
	this.CreateLayer = function() { //创建所有动画图层
		var map = GDYB.Page.curPage.map;
		//t.TestAnimatorLayer=new WeatherMap.Layer.AnimatorVector("动画图层", {}, {speed: 0.5, startTime: 0,frameRate: 1,endTime: 11});
		//map.addLayers([t.TestAnimatorLayer]);
		$("#jkys button").each((i, e) => {
			var elementid = e.id;
			var elementName = e.innerHTML;
			var layer = new WeatherMap.Layer.AnimatorVector(elementName, {},{
				speed: 0.5,
				startTime:0,
				frameRate: 1,
				endTime: 11
			});
			//layer.isAlwaySmooth = true;
			//layer.isSmooth = true;
			//var style=GDYB.GridProductClass.getFillColorItems(elementid);
			layer.items = [{start: -9999,end: 1,startColor: {red: 0,green: 0,blue: 0},endColor: {red: 0,green: 0,blue: 0}},{
				start: 1,end: 100,startColor: {red: 255,green: 255,blue: 0},
				endColor: {red: 255,green: 255,blue: 0}
			}];
			layer.setVisibility(false);
			t.MapLayer.set(elementid, layer);
			map.addLayers([layer]);
		});
	}
	/**
	 * @author wangkun
	 * @copyright spd
	 * @date 2017.01.17
	 * @param datasetgrid-格点
	 * @description 计算区域
	 */
	this.CalArea = function(ed) {
			var areaCode = 37;
			var param = "{areaCode:'" + areaCode + "'}";
			var url = gridServiceUrl + "services/AdminDivisionService/getChildDivisionInfo";
			var promise = new Promise((resolve, reject) => {
				$.ajax({
					data: {
						"para": param
					},
					url: url,
					dataType: "json",
					type: "POST",
					success: function(data) {
						resolve(data);
					},
					error: function(e) {
						reject(e);
					}
				});
			});
			var elements=new Map();
			$("#jkys button").each(function(i, e) {
				var elementid=e.id;
				var elementname=e.innerHTML;
				elements.set(elementid,elementname);
			});
			promise.then(su => {
				var size = su.length;
				var msgs=[];
				for(var elementid of ed.keys()){
					var areanames=[];//里面区域不重复
					var datasetgrids=ed.get(elementid);
					var datasize=datasetgrids.length;
					for(var d=0;d<datasize;d++){
						var datasetgrid=datasetgrids[d];
						for(var i=0;i<size;i++){
							var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(JSON.parse(su[i]));
							feature.geometry.calculateBounds();
							b = GDYB.GridProductClass.containMinMax(datasetgrid, feature.geometry, 1, 100);
							if (b) {
								var areaname = feature.attributes["NAME"];
								var b=areanames.find((e)=>e===areaname);
								if(b!=undefined)continue;
								areanames.push(areaname);
								var elementname=elements.get(elementid);
								t.AddWarningInfo(areaname, elementname);
								var msg={areaname:areaname,
									elementname:elementname,
									content:"",
									stime:"2017.01.17"
								}
								msgs.push(msg);
							}
						}
					}
					t.AutoSendMsg(msgs);
				}
			}, err => {
				console.log(su);
			});
	}
	/**
	 * @author wangkun
	 * @copyright spd
	 * @date 2017.01.17
	 * @param
	 * @description 增加预警区域
	 */
	this.AddWarningInfo = function(areaname, elementname) {
		var datetime=new Date();
		var strDateTime=datetime.format("yy-MM-dd hh:mm:ss");
		var strHtml = '<tr><td>' + areaname + '</td><td>' + elementname + '</td><td class="warning">开始预警</td><td>'+strDateTime+'</td></tr>';
		$("#msgstatus tbody").append(strHtml);
		$("table button").removeClass("btn");
		$("table button").removeClass("btn-default");
		$("table button").addClass("btn");
		$("table button").addClass("btn-default");
	}
	/**
	 * @author:wangkun
	 * @date:2017-01-18
	 * @param:msgs-全部消息内容(数组)
	 * @return:
	 * @description:自动发送消息
	 */
	this.AutoSendMsg = function(msgs) {
		var url = gridServiceUrl + "services/MsgService/WriteDLMsg";
		var size = msgs.length;
		//var arrP = []; //存放任务
		var param=JSON.stringify(msgs);
		t.AJAX(url, param, function(){}, function(){});
		/*for (var i = 0; i < size; i++) {
			var msg = msgs[i];
			var strJson=JSON.stringify(msg);
			var promise = new Promise((resolve, reject) => {
				t.AJAX(url, strJson, resolve, reject);
			});
			arrP.push(promise);
		}
		Promise.all(arrP).then(su=>{
			console.log("发送成功!");
		},
		fail=>{
			console.log("发送失败!");
		});*/
	}
}
DLYBPageClass.prototype = new PageBase();
