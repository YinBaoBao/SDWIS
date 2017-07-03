/**
 * @author:wangkun
 * @date:2017-03-12
 * @description:
 */
define([],function(){
	return {
		Init:function(){
			this.prototype = new PageBase();
			GDYB.Page.curPage=this.prototype;
			this.prototype.active();
			$("#menu").css("width","0");
			$("#menu").css("padding","0");
			$("#menu").html(``);
			$("#map_div").append(`
				<div id="yjzdOperateDiv" class="delete">
					<div class="upContentDiv">
						<div class="title">
							<span class="pull-left">操作</span>
							<span class="pull-right">^</span>
						</div>
						<div class="changeDiv" style="margin: 4px 8px">
							<p><span>预报员：</span><span id="selectYuBaoYuan" style="color: #FF0000">郭俊健</span></td></p>
							<p><span>时间：</span><span id="selectDate" style="color: #FF0000">2017-3-12</span></p>
							<p><span>类型：</span>
								<a>暴雨</a><a>大风</a><a>雷电</a><a>冰雹</a><a>雷雨大风</a>
							</p>
							<p><span>级别：</span>
								<a>蓝色</a><a>黄色</a><a>橙色</a><a>红色</a>
							</p>
							<div id="stationMsg">
								<div>
									<p>前1时次大雾天湖水库，红安白须公礁，麻城双墩岛和白牛岭，北海斜阳岛等站出现大于17ms/s极大风。</p>
									<p>大雾，红安有强对流回波，向东南方向移动。</p>
									<p>预计未来6小时，大雾、红安、麻城等地，有短时间强雷雨大风天气，局地有冰雹，阵风8-10级。</p>
								</div>
							</div>
							<div id="operateBtn"><a>调入临近预报</a><a>绘制预警区落</a><a id="makeproduct">生成预警指导</a></div>
						</div>
					</div>
					<hr style="border: 1px 0 #999999 solid; width: 90%; margin: 10px auto">
					<div id="downContentDiv">
						<div style="margin: 3px auto">
							<span>历史预警指导：</span><a id="traceManage">留痕管理…</a>
						</div>
						<div id="yjzdMessageHis">
							<ul>
								<li id="pro_1">暴雨蓝色预警指导1<span>2017-03-02&nbsp;&nbsp;07:51:00</span><div class="chatTips"></div></li>
								<li id="pro_2">暴雨蓝色预警指导2<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
								<li id="pro_3">暴雨蓝色预警指导3<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
								<li id="pro_4">暴雨蓝色预警指导4<span>2017-03-02&nbsp;&nbsp;07:51:00</span><div class="chatTips"></div></li>
								<li id="pro_5">暴雨蓝色预警指导5<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
						</div>
						<hr style="border: 1px 0 #999999 solid; width: 100%; margin: 10px auto">
						<div id="yjzdMessageTip">山东省气象台</div>
					</div>
				</div>
				`);
			$("#map_div").append(`
				<div id="manageWindow" class="delete" style="display: none">
					<div class="windowContent">
						<div id="forecastNoticeDiv">
							<div class="tableBanner">
								<table>
									<tr><th width="100">编号</th><th width="200">发布时间</th><th width="140">预报员</th><th width="160">天气类型</th><th width="360">内容</th><th width="222">影响区域</th><th width="180">通知单位</th><th width="220">通知方式</th></tr>
								</table>
							</div>
							<div id="forecastNoticeData">
								<table>
									<tr><td width="100">3280</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
									<tr><td width="100">3281</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
									<tr><td width="100">3282</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
									<tr><td width="100">3283</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
									<tr><td width="100">3284</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
									<tr><td width="100">3285</td><td width="200">2017-03-10&nbsp;18:03:05</td><td width="140">郭俊建</td><td width="160">短时强降雨，冰雹</td><td width="360" style="text-align: left;">预计未来两小时济南，滨城，东营，局部有冰雹，大风13-14级</td><td width="222">济南，滨城，东营</td><td width="180">滨城，东营</td><td width="220">电话，传真，短信</td></tr>
								</table>
							</div>
						</div>
						<div id="contactStateDiv">
							<div class="tableBanner">
								<table>
									<tr><th width="200">群组</th><th width="100">姓名</th><th width="200">电话</th><th width="160">电话状态</th><th width="200">短信</th><th width="160">短信状态</th><th width="200">传真</th><th width="160">传真状态</th><th width="240">Notes</th><th width="160">Notes状态</th></tr>
								</table>
							</div>
							<div class="contactStateData">
								<table>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160" style="background: #f1a325;">失败</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160" style="background: #f1a325;">失败</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160" style="background: #f1a325;">失败</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160" style="background: #f1a325;">失败</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160" style="background: #f1a325;">失败</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160" style="background: #f1a325;">失败</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
									<tr><td width="200">省前关键岗</td><td width="100">白龙</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">18628104949</td><td width="160">成功</td><td width="200">0531-8527888</td><td width="160">成功</td><td width="240"><a>bailong@cma.gov</a></td><td width="160">成功</td></tr>
								</table>
							</div>
						</div>
						<div id="chattingRecordsDiv">
							<span><span style="color: blue">青岛气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-12&nbsp;18:03:43</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red">自动回复，已读，已发布预警</span><br>
							<span><span style="color: blue">莱芜气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;18:15:28</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red">自动回复，已读，暂不考虑</span><br>
							<span><span style="color: blue">德州气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;10:21:15</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;请问省台，我们这边应该发蓝色预警还是黄色预警？O(∩_∩)O谢谢<br>
							<span><span style="color: blue">山东气象台</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999">2017-03-13&nbsp;10:23:03</span></span><br>
							&nbsp;&nbsp;&nbsp;&nbsp;黄色预警<br>
						</div>
						<a id="turnbackToMap">返回</a>
						<a id="export_btn">导出</a>
					</div>
				</div>
			`);
			$("#map_div").append(`
				<div id="creatingProductWindow" class="delete" style="display: none;left:calc(50% - 420px);top:3%;">
					<div class="contentPW">
							<div class="cp_head">
							<button type="button" class="close" onclick="Iclose()" title="close it" style="position: absolute;right: 20px;top:15px;">&times;</button>
							<div style="font-size: 24px;color: #0d3d88;text-align: center;height: 40px;line-height: 40px;margin-top:10px;letter-spacing: 5px;">0-2小时预警指导</div>
							<div style="border-bottom: 1px #bbbbbb solid; width: 90%;margin: 10px auto;font-size: 15px;">山东省气象台<span id="nowTime" style="margin-left:120px;">2017年3月2日&nbsp;&nbsp;08时31分</span><div style="float: right">预报员：<span id="forecasters">郭俊建</span></div></div>
						</div>
						<div class="cp_body">
							<div style="margin: 0 auto;width: 90%;">
								<p>前1时次大雾天湖水库，红安白须公礁，麻城双墩岛和白牛岭，北海斜阳岛等站出现大于17ms/s极大风。</p>
								<p>大雾，红安有强对流回波，向东南方向移动。</p>
								<p>预计未来6小时，大雾、红安、麻城等地，有短时间强雷雨大风天气，局地有冰雹，阵风8-10级。</p>
								<img src="imgs/div_mapPic.png" width="100%" height="300px">
							</div>
						</div>
						<div class="cp_foot">
							<div><span style="float: left;height: 30px;line-height: 30px;">通知单位：</span>
								<ul><li>潍坊市气象台</li><li>莱芜市气象台</li><li>淄博市气象台</li></ul>
							</div>
							<div style="clear: both;"></div>
							<div><span style="float: left;height: 30px;line-height: 30px;">通知方式：</span>
								<input id="tz_telephone" name="mycheckbox" type="checkbox" value="" title="电话" style="margin-left: 25px;"><span>电话</span>
								<input id="tz_message" name="mycheckbox" type="checkbox" value="" title="短信"><span>短信</span>
								<input id="tz_e_mail" name="mycheckbox" type="checkbox" value="" title="传真"><span>传真</span>
								<input id="tz_telephone" name="mycheckbox" type="checkbox" value="" title="Notes"><span>Notes</span>
							</div>
							<div style="float:right">
								<button>确&nbsp;&nbsp;&nbsp;&nbsp;定</button>&nbsp;&nbsp;&nbsp;&nbsp;
								<button>取&nbsp;&nbsp;&nbsp;&nbsp;消</button>
							</div>
						</div>
					</div>
				</div>
    			`);
			$("#map_div").append(`
				<div id="messageDivs" class="messageDiv delete" style="display: none;">
					<div class="contentMsg" style="top:calc(50% - 280px);left:calc(50% - 500px);">
						<div class="messageTitle" onmousedown="dragPanel(document.getElementById('messageDivs'),event)">
							<div>临近预报<span id="chatTitle"></span></div>
							<label id="chatClose1" title="关闭">x</label>
							<span></span>
						</div>
						<div id="noticeDiv">
							<p>前1时次大雾天湖水库，红安白须公礁，麻城双墩岛和白牛岭，北海斜阳岛等站出现大于17ms/s极大风。</p>
							<p>大雾，红安有强对流回波，向东南方向移动。</p>
							<p>预计未来6小时，大雾、红安、麻城等地，有短时间强雷雨大风天气，局地有冰雹，阵风8-10级。</p>
						</div>
						<div id="addStation">
							<i class="glyphicon glyphicon-user"></i>
							<input type="text" placeholder="填写单位名称，点击添加">
							<button>Add</button>
						</div>
						<div id="stationList">
							<ul>
								<li>山东省气象台<span>在线</span></li>
								<li>济南市气象台<span>在线</span></li>
								<li>淄博市气象台<span>在线</span></li>
								<li>莱芜市气象台<span>在线</span></li>
							</ul>
						</div>
						<div id="divMessage" class="divMessage"></div>
						<div class="messageUL">
							<div id="divReadW" style="margin-top: 5px;"></div>
							<div id="divUnreadW" style="color: rgb(150,150,150);margin-top: 10px;"></div>
						</div>
						<div id="inputTextDiv">
							<button id="chatSend" >发送</button>
							<textarea id="chatText" class="messageText"></textarea>
						</div>
					</div>
				</div>
			`);
			$("#traceManage").click(function(){
				$("#manageWindow").css("display","block");
			});
			$("#turnbackToMap").click(function(){
				$("#manageWindow").css("display","none");
			});
			$("#makeproduct").click(function(){
				$("#creatingProductWindow").css("display","block");
			});

			//聊天界面事件
			//打开界面
			$("#yjzdMessageHis").find("li").click(function(){
				GDYB.Chat.productId = this.id;
				//displayMessage(GDYB.Chat.productId);
				$("#chatTitle").html("【"+GDYB.Chat.productId+"】");
				$("#messageDivs").css("display","block");
			});
			//关闭界面
			$("#chatClose").click(function(){
				$("#messageDivs").css("display","none");
				$("#divMessage").html("");
			});
			$("#chatClose1").click(function(){
				$("#messageDivs").css("display","none");
				$("#divMessage").html("");
			});
			//添加ctrl键功能
			$("#chatText").keyup(function(e){
				if(e.keyCode!=17) return;
				GDYB.Chat.ctrlFlag = false;
			});
			//键盘的回车发送
			$("#chatText").keydown(function(event){
				if (event.keyCode == 13) {
					if(GDYB.Chat.ctrlFlag){
						this.value += "\n";
						return;
					}
					event.preventDefault();
					var message = "";
					var productId = GDYB.Chat.productId;
					var productName = GDYB.Chat.productName;
					var updateTime = GDYB.Chat.getNowTimes();
					var content = $(this).val();
					var departName = GDYB.GridProductClass.currentUserDepart.departName;
					var departCode = GDYB.GridProductClass.currentUserDepart.departCode;
					var userName = GDYB.GridProductClass.currentUserName;
					var showName = "null";
					message = '{"productId":"'+productId+'","productName":"'+productName+'","updateTime":"'+updateTime+'","content":"'+content+'","departName":"'+departName+'","departCode":"'+departCode+'","userName":"'+userName+'","showName":"'+showName+'"}';
					GDYB.Chat.sendMessage(message);
				}
				else if(event.keyCode==17) {
					GDYB.Chat.ctrlFlag = true;
				}
			});
			//发送按钮发送
			$("#chatSend").click(function(event){
				var message = "";
				var productId = GDYB.Chat.productId;
				var productName = GDYB.Chat.productName;
				var updateTime = GDYB.Chat.getNowTimes();
				var content = $("#chatText").val();
				var departName = GDYB.GridProductClass.currentUserDepart.departName;
				var departCode = GDYB.GridProductClass.currentUserDepart.departCode;
				var userName = GDYB.GridProductClass.currentUserName;
				var showName = "null";
				message = '{"productId":"'+productId+'","productName":"'+productName+'","updateTime":"'+updateTime+'","content":"'+content+'","departName":"'+departName+'","departCode":"'+departCode+'","userName":"'+userName+'","showName":"'+showName+'"}';
				GDYB.Chat.sendMessage(message);
			});
			//添加信息框拖拽
			var winInfoDrag;
			document.onmouseup=function(){
				if(!winInfoDrag)return;
				document.all?winInfoDrag.releaseCapture():window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
				winInfoDrag="";
			};
			document.onmousemove=function (d){
				if(!winInfoDrag)return;
				if(!d)d=event;
				$(winInfoDrag).css("left",(d.clientX-b)+"px");
				//a.style.top=(d.clientY-c)+"px";
				$(winInfoDrag).css("top",(d.clientY-c)+"px");
			};
			function dragPanel(o,e){
				winInfoDrag=o;
				document.all?winInfoDrag.setCapture():window.captureEvents(Event.MOUSEMOVE);
				var left = $(winInfoDrag).css("left");
				var top = $(winInfoDrag).css("top");
				b=e.clientX-parseInt(left);
				c=e.clientY-parseInt(top);
			};
		}
	}
});
