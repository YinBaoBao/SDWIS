/**
 * @module 页面布局
 * @author POPE
 * @date   2017-01-11
 */
function Layout(){
    if(!(this instanceof Layout)){
        return new Layout();
    }
    this.element = layui.use('element');
	this.layer = null;
	this.$panel = null;
	this.Grid = null;
}
var fnLay = Layout.prototype;
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:显示
 */
fnLay.show  = function () {
	var self = this;
	self.createLayDom();
	// self.addRiskSurveyLayNav("#menu_bd"); //添加风险普查列表
	if(layui.element!=null){
		self.initLayElement('nav(riskSurvey)');
	}
	else{
		layui.use('element',function () { //调用element模块
			self.initLayElement('nav(riskSurvey)'); //
		});
	}
}

/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:显示山洪预警联防
 */
fnLay.showZHYJ=function(){
    var self = this;
    var htmlStr = "<div id='zhyjContent' class=''><div class='title1'>预警信息管理</div>"
        +"<div id='warningManage'>"
        +"<div class='btn_line'><button  id='lastWarn'>最新预警</button><button  id='warnSelect'>预警查询</button><button  id='warnCreate'>预警制作</button></div>"
        +"</div><div class='title1'>预警信息发布</div>"
        +"<div id='warningPublish'>"
        +"<div class='btn_line'><button  id='warnPushAuto'>一键式发布</button><button  id='warnPushDef'>自定义发布</button><button  id='warnMonitor'>发布监控</button></div>"
        +"</div><div class='title1'>预警API接口</div>"
        +"<div id='warningAPI'>"
        +"<div class='btn_line'><button  id='warnAPIList'>API接口列表</button><button  id='warnAPIDes'>API接口说明</button><button  id='warnAPIRole'>API接口授权</button></div>"
        +"</div>"
        +"</div>";
    $("#menu_bd").html(htmlStr);
    $("#zhyjContent").find("button").click(function(){
        var btnElementActive = $("#zhyjContent").find("button.active");
        if(btnElementActive.attr("id") == this.id)
        {
            //doClearThing();
            btnElementActive.removeClass("active");
            return;
        }else{
            if (this.id=="warnCreate"){
                self.createLayDom();
                self.initWarnCreateLay();
            }else if (this.id=="warnSelect"){
                self.createLayDom();
                self.initWarnSelectLay();
            }else if (this.id=="lastWarn"){
                self.createLayDom();
                self.initLastWarnLay();
            }else if (this.id=="warnPushAuto"){
                self.createLayDom();
                self.initPushAuto();
            }else if (this.id=="warnPushDef"){
                self.createLayDom();
                self.initPushDef();
            }
            btnElementActive.removeClass("active");
            $(this).addClass("active");
        }
    });
};
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description: 产品制作 fixme
 */
fnLay.showCP=function(){
	var self = this;
	var htmlStr = ""
		+"<div id='dateSelect' style='clear:both;'></div>"
		+"<div class='btitle'></div>"
		+"<div class='btn_line'><button id='r12'>日降水量</button></div>"
		+"<div class='btitle'></div>"
		+"<div id='yubaoshixiao' class='' style='width:220px'>"
		+"</div>"
		+"<div id='yubaoshixiaoshuoming' style='height: 30px;margin:5px; font-size:12px'>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(250, 165, 26, 1.0)), to(rgba(244, 122, 32, 1.0)));background: linear-gradient(to bottom,rgba(250, 165, 26, 1.0) 0,rgba(244, 122, 32, 1.0) 100%); border-radius:20px;'/><span>已打开</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(200, 200, 255, 1.0)), to(rgba(51, 133, 255, 1.0)));background: linear-gradient(to bottom,rgba(200, 200, 255, 1.0) 0,rgba(51, 133, 255, 1.0) 100%); border-radius:20px;'/><span>已修改</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(200, 255, 200, 1.0)), to(rgba(0, 255, 0, 1.0)));background: linear-gradient(to bottom,rgba(200, 255, 200, 1.0) 0,rgba(0, 255, 0, 1.0) 100%); border-radius:20px;'/><span>已提交</span>"
		+"<div style='background: -webkit-gradient(linear, left top, left bottom, from(rgba(225, 225, 235, 1.0)), to(rgba(225, 225, 235, 1.0)));background: linear-gradient(to bottom,rgba(225, 225, 235, 1.0) 0,rgba(225, 225, 235, 1.0) 100%); border-radius:20px;'/><span>无数据</span>"
		+"</div>"
		+"<div class='btitle'></div>"
		+"<div class='btn_line'><button id='creatingPro'>生成产品</button><button id='toCountry'>上报国家局</button></div>";
	$("#menu_bd").html(htmlStr);
	var creatingCPWin = ""
		+"<div id='CPSCWin' style='display: none;'>"
		+"<div id='cpTitle'>生成产品</div>"
		+"<div style='border: 1px #999 solid;margin: 10px auto;width: 95%;height: 220px;'><textarea id='contentText'></textarea></div>"
		+"<div class='btn_line' style='text-align: center;'><button id='commitBtn'>提交</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button id='cancelBtn'>取消</button></div>"
		+"</div>";
	$("#map_div").append(creatingCPWin);
	self.myDateSelecter = new DateSelecter(2,2); //最小视图为天
	self.myDateSelecter.intervalMinutes = 60*24; //12小时
	$("#dateSelect").append(self.myDateSelecter.div);
	//预报时效
	self.yubaoshixiaoTools = new YuBaoshixiaoTools($("#yubaoshixiao"), self.myDateSelecter.getCurrentTimeReal());
	self.yubaoshixiaoTools.supportMultiSelect = true;
	//显示格点订正工具箱
	if(!$("#Panel_Tools").length>0){
		self.myPanel_Tools = new Panel_Tools($("#map_div"));
	}
	$("#Panel_Tools").css("display","block");
	$("#creatingPro").click(function(){
		$("#CPSCWin").css("display","block");
	});
	$("#cancelBtn").click(function(){
		$("#CPSCWin").css("display","none");
	});
};
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:自定义灾害预警信息发布
 */
fnLay.initPushDef=function(){
    var width = (document.body.clientWidth-270) +"px";
    var height = "420px";
    var layContainer = $('#layerDiv');
    var title = "自定义灾害预警信息发布";
	var option ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
    var html="<div id='divWarnContent' style='position: absolute;left:10px;width:500px;'><div id='divAlertArea'><span>选择区域：</span><select><option>山东全省</option><option>济南市</option><option>青岛市</option><option>烟台市</option></select>"
    +"&nbsp;&nbsp;&nbsp;&nbsp;<span>选择区县：</span><select><option>市中区</option><option>历下区</option><option>天桥区</option></select></div>"
    +"<div style='position: absolute;top:30px;left:10px'><span>选择显示屏：</span><br><input type='checkbox'>济南显示屏1</input><br><input type='checkbox'>济南显示屏2</input><br><input type='checkbox'>济南显示屏3</input></div>"
    +"<div style='position: absolute;top:30px;left:160px'><span>选择大喇叭：</span><br><input type='checkbox'>济南大喇叭1</input><br><input type='checkbox'>济南大喇叭2</input><br><input type='checkbox'>济南大喇叭3</input></div>"
    +"<div style='position: absolute;top:30px;left:260px'><span>其他发布方式：</span><br><input type='checkbox'>电子邮件</input><br><input type='checkbox'>自动传真</input><br><input type='checkbox'>手机短信</input><br></div>"
    +"</div>"
    layContainer.html(html);
    this.showLayer(option);
}
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:灾害预警信息发布进展
 */
fnLay.initPushAuto=function(){
    var width = "260px";
    var height = "120px";
    var layContainer = $('#layerDiv');
    var title = "灾害预警信息发布进展";
    var html="<div id='divWarnPush' style='position: absolute;left:10px'>"
        +"<span>开始发布最新制作的灾害预警信息...</span></div>";
	var option ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
    layContainer.html(html);
    this.showLayer(option);
    setTimeout(function(){
        var layContainer = $('#layerDiv');
        var html="<br><div style='position: absolute;left:10px'>完成最新灾害预警信息发布。</div>"
        layContainer.html(layContainer.html()+html);
    },5000);

}
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:最新灾害预警信息
 */
fnLay.initLastWarnLay=function(){
    var width = (document.body.clientWidth-270) +"px";
    var height = "420px";
    var layContainer = $('#layerDiv');
    var title = "最新灾害预警信息";
	var option ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
    var html="<div id='divWarnContent' style='position: absolute;left:10px'><div id='divAlert'><span>信息编号：</span><input type='text' style='width:231px' value='山东气象台-20170119-093000'><span>&nbsp;发布者：</span><input type='text' style='width:200px' value='shandong@CMA.gov.cn'>"
        +"<span>发起时间：</span><input type='text' style='width:226px' value='2017-01-19T09：30：00'><br>"
        +"<span>信息状态：</span><input type='text' class='divWarnText' value='演练信息'/>"
        +"<span>信息类型:&nbsp;</span> <input type='text' class='divWarnText' value='警告信息'/>"
        +"<span>&nbsp;&nbsp;说&nbsp;&nbsp;&nbsp;明：</span><input type='text' style='width:497px' value='本信息为测试信息，收到无无需任何操作'><br>"
        +"<span>发布范围：</span><input type='text' class='divWarnText' value='公开信息'/>"
        +"<span>&nbsp;&nbsp;等&nbsp;&nbsp;&nbsp;&nbsp;级：</span><input type='text' style='width:82px' value='应急责任人'>"
        +"<span>&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;域：</span><input type='text' style='width:496px' value='济南市'><br>"
        +"<span>预警信息：</span><textarea  style='width:231px' value=''/>"
        +"<span>&nbsp;&nbsp;事&nbsp;&nbsp;&nbsp;件：</span><textarea style='width:496px' value=''/>"
        +"</div><br>"
        +"<div id='divInfo'><span>事件类别：</span><input type='text' class='divWarnText' value='气象灾害'/>"
        +"<span>事件类型：</span><input type='text' class='divWarnText' value='台风'/>"
		+"<span>&nbsp;&nbsp;紧急性：</span><input type='text' class='divWarnText' value='现在'/>"
        +"<span>&nbsp;&nbsp;严重性：</span><input type='text' class='divWarnText' value='重大'/>"
        +"<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确定性：</span><input type='text' class='divWarnText' value='已发生'/><br>"
        +"<span>发生时间：</span><input type='text' style='width:83px' value='下午2点40分'><span>&nbsp;&nbsp;标&nbsp;&nbsp;&nbsp;&nbsp;题：</span><input type='text' style='width:224px' value='济南市台风红色预警'><span>&nbsp;关&nbsp;键&nbsp;词：</span><input type='text' style='width:83px' value='17级台风'>"
        +"<span>应对措施：</span><input type='text' class='divWarnText' value='躲避'/><br>"
        +"<span>事件描述：</span><textarea  style='width:300px'/>"
        +"<span>措施说明：</span><textarea  style='width:420px'/><br>"
        +"<span>网格资源：</span><input type='text' style='width:300px' value='http://www.'><span>&nbsp;&nbsp;联&nbsp;系&nbsp;人&nbsp;：</span><input type='text' style='width:150px' value=''><span>联系电话：</span><input type='text' style='width:194px' value=''><br>"
        +"<table><tr><td style='width:380px'><div id='divArea' style='width:380px'><span>区域描述：</span><input type='text' style='width:300px' value='济南市、青岛市'><br><span>区域代码：</span><input type='text' style='width:60px' value=''><span>海拔：</span><input type='text' style='width:60px' value=''><span>最大海拔：</span><input type='text' style='width:60px' value=''></div></td>"
        +"<td style='align:left'><div><span>附件描述：</span><input type='text' style='width:300px' value='台风17级'><br><span>上传的附件：</span><a href='#'>17级台风说明及应急预案</a></div></td></tr></table>"
        +"</div></div>"
    layContainer.html(html);
    this.showLayer(option);
}
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:灾害预警信息查询
 */
fnLay.initWarnSelectLay=function(){
    var width = (document.body.clientWidth-400) +"px";
    var height = "380px";
    var layContainer = $('#layerDiv');
    var title = "灾害预警信息查询";
	var option ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
    var html="<div id='divSelect' style='height:20px;width:500px;'><div style='position: absolute;left:10px;top:3px'>开始时间：</div><div id='dateSelectStart' style='position: absolute;left:80px;top:0px'></div><div style='position: absolute;left:280px;top:3px'>结束时间：</div><div id='dateSelectEnd' style='position: absolute;left:360px;top:0px'></div><div style='position: absolute;left:550px;top:0px'><input type='checkbox' value=''/>地图显示&nbsp;&nbsp;<button>查询</button></div></div>"
    var table ="<div id='divTable'><table class='layui-table' lay-skin='line'>"
        +"<thead><tr><th>信息编号</th><th>发起时间</th><th>信息状态</th>"
        +"<th>信息类型</th><th>发布范围</th></tr></thead><tbody></tbody>"
        +"</table>";
    layContainer.html(html+table);
    var myDateSelecter = new DateSelecter(0);
    $("#dateSelectStart").append(myDateSelecter.div);
    var myDateSelecter2 = new DateSelecter(0);
    $("#dateSelectEnd").append(myDateSelecter2.div);
    this.showLayer(option);
}
/**
 * @author:fanjibing
 * @date:2017-01-11
 * @description:灾害预警信息制作
 */
fnLay.initWarnCreateLay =function () {
    var width = (document.body.clientWidth-400) +"px";
    var height = "420px";
    var layContainer = $('#layerDiv');
    var title = "灾害预警信息制作";
	var option ={
		width: width,
		height: height,
		content: layContainer,
		title: title
	};
    var html="<div id='divWarnContent' style='position: absolute;left:10px'><div id='divAlert'><span>信息编号：</span><input type='text' style='width:231px' value='山东气象台-20170119-093000'><span  style='color:#FF0000'>*</span><span>发布者：</span><input type='text' style='width:200px' value='shandong@CMA.gov.cn'><span style='color:#FF0000'>*</span>"
        +"<span>发起时间：</span><input type='text' style='width:220px' value='2017-01-19T09：30：00'><span  style='color:#FF0000'>*</span><br>"
        +"<span>信息状态：</span><select><option value='Actual'>真实信息</option><option value='Exercise'>演练信息</option><option value='System'>体系制度</option><option value='Test'>测试信息</option><option value='Draft'>草案信息</option></select><span style='color:#FF0000'>*</span>"
        +"<span>信息类型:</span><select><option value='Alert'>警告信息</option><option value='Update'>更新信息</option><option value='Cancel'>取消信息</option><option value='ACK'>应答信息</option><option value='Error'>错误信息</option></select><span style='color:#FF0000'>*</span>"
        +"<span>说&nbsp;&nbsp;&nbsp;明：</span><input type='text' style='width:497px' value='本信息为测试信息，收到无无需任何操作'><br>"
        +"<span>发布范围：</span><select><option value='Public'>&nbsp;&nbsp;公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开</option><option value='Restricted'>&nbsp;&nbsp;限&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;制</option><option value='Private'>&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密</option></select><span style='color:#FF0000'>*</span>"
        +"<span>等&nbsp;&nbsp;&nbsp;&nbsp;级：</span><input type='text' style='width:82px' value='应急责任人'>"
        +"<span>&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;域：</span><input type='text' style='width:496px' value='济南市'><br>"
        +"<span>预警信息：</span><input type='textarea' style='width:231px' value=''>"
        +"<span>&nbsp;&nbsp;事&nbsp;&nbsp;&nbsp;件：</span><input type='textarea' style='width:496px' value=''>"
        +"</div><br>"
        +"<div id='divInfo'><span>事件类别：</span><select><option value='Geo'>地质灾害</option><option value='Met'>气象灾害</option><option value='Safety'>公共安全</option>"
        +"<option value='Security'>保密安全</option><option value='Rescue'>应急救助</option><option value='Fire'>火险</option><option value='Health'>医疗卫生</option>"
        +"<option value='Env'>环境污染</option><option value='Transport'>公共交通</option><option value='Infra'>基础设施</option><option value='CBRNE'>生化辐射</option><option value='Other'>其它</option></select><span style='color:#FF0000'>*</span>"
        +"<span>事件类型:</span><select><option value='Geo'>台风</option><option value='Met'>暴雨</option><option value='Safety'>泥土流&nbsp;</option></select><span style='color:#FF0000'>*</span>"
        +"<span>紧急性：</span><select><option value='Immediate'>现在</option><option value='Expected'>临近</option><option value='Future'>将来</option><option value='Past'>过去</option><option value='Unknown'>不确定</option></select><span style='color:#FF0000'>*</span>"
        +"<span>严重性：</span><select><option value='Extreme'>重大</option><option value='Severe'>严重</option><option value='Moderate'>中等</option><option value='Minor'>轻微</option><option value='Unknown'>不确定</option></select><span style='color:#FF0000'>*</span>"
        +"<span>确定性：</span><select><option value='Observed'>已发生</option><option value='Likely'>很可能</option><option value='Unlikely'>未必发生</option><option value='Unknown'>不确定</option></select><span style='color:#FF0000'>*</span><br>"
        +"<span>发生时间：</span><input type='text' style='width:83px' value='下午2点40分'><span  style='color:#FF0000'>*</span><span>标&nbsp;&nbsp;&nbsp;&nbsp;题：</span><input type='text' style='width:230px' value='济南市台风红色预警'><span>关&nbsp;键&nbsp;词：</span><input type='text' style='width:83px' value='17级台风'>"
        +"<span>应对措施：</span><select><option value='Shelter'>躲避</option><option value='Evacuate'>撤离</option><option value='Prepare'>准备</option><option value='Execute'>实施</option>"
        +"<option value='Avoid'>避免</option><option value='Monitor'>监控</option><option value='Assess'>评估</option><option value='AllClear'>解除</option><option value='NONE'>无行动</option></select><br>"
        +"<span>事件描述：</span><textarea  style='width:300px'/>"
        +"<span>措施说明：</span><textarea  style='width:420px'/><br>"
        +"<span>网格资源：</span><input type='text' style='width:300px' value='http://www.'><span>&nbsp;&nbsp;联&nbsp;系&nbsp;人&nbsp;：</span><input type='text' style='width:150px' value=''><span>联系电话：</span><input type='text' style='width:194px' value=''><br>"
        +"<table><tr><td style='width:380px'><div id='divArea' style='width:380px'><span>区域描述：</span><input type='text' style='width:300px' value='济南市、青岛市'><span  style='color:#FF0000'>*</span><br><span>区域代码：</span><input type='text' style='width:60px' value=''><span>海拔：</span><input type='text' style='width:60px' value=''><span>最大海拔：</span><input type='text' style='width:60px' value=''></div></td>"
        +"<td style='align:left'><div><span>附件描述：</span><input type='text' style='width:300px' value='台风17级'><span  style='color:#FF0000'>*</span><br><input type='file' style='width:160px' value=''></div></td></tr><tr><td></td><td><input type='button' value='保存'/>&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' value='保存并发布'/></td></tr></table>"
        +"</div></div>"
    layContainer.html(html);
    this.showLayer(option);
}

/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {string} html - 添加的html内容
 * @description:创建弹出层面板
 */
fnLay.createLayDom = function(html) {
	$('<div id ="layerDiv" style="display:none;"></div>').html(html).appendTo('body');
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:显示导航栏按钮
 */
fnLay.showNavMenu = function () {
    var li ='<li id="riskSurvey">'
        +'<a data-index="3">'
        +'<img src="imgs/img_display.png" />'
        +'<span>风险普查</span>'
        +'</a>'
        +'</li>'
        +'<li id="riskAssessment">'
        +'<a data-index="3">'
        +'<img src="imgs/img_element.png" />'
        +'<span>风险评估</span>'
        +'</a>'
        +'</li>'
        +'<li id="monitoringAlarm">'
        +'<a data-index="3">'
        +'<img src="imgs/img_time.png" />'
        +'<span>监测报警</span>'
        +'</a>'
        +'</li>'
		+'<li id="zhyj">'
        +'<a data-index="4">'
        +'<img src="imgs/img_level.png" />'
        +'<span>灾害预警</span>'
        +'</a>'
        +'</li>'
        +'<li id="productMaker">'
        +'<a data-index="3">'
        +'<img src="imgs/img_level.png" />'
        +'<span>产品制作</span>'
        +'</a>'
        +'</li>';
    $("#nav_menu").html(li);
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} container - 面板容器.
 * @description:添加风险评估面板
 */
fnLay.addRiskAssessmentPanel =function (container) {
	var panel ='<fieldset class="layui-elem-field site-demo-button">'
		+'<legend>六种按钮主题</legend>'
		+'<div>'
		+'<button class="layui-btn layui-btn-primary">原始按钮</button>'
		+'<button class="layui-btn">默认按钮</button>'
		+'<button class="layui-btn layui-btn-normal">百搭按钮</button>'
		+'<button class="layui-btn layui-btn-warm">暖色按钮</button>'
		+'<button class="layui-btn layui-btn-danger">警告按钮</button>'
		+'<button class="layui-btn layui-btn-disabled">禁用按钮</button>'
		+'</div>'
		+'</fieldset>';
	$(container).append(panel);
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:清除左侧面板
 */
fnLay.clear =function () {
	$("#menu_bd").html("");
	$("#Panel_Tools").css("display","none");
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} container - 面板容器.
 * @description:初始化JqueryTable
 */
fnLay.initJqueryTable = function(container){
	var aSelected = [];
	/* Init the table */
	var tables = $(container).DataTable( {
		"bAutoWidth": true,
		"bProcessing": true,
		"asStripClasses":"even",
		"bSort":false,
		// "aaSorting": [],
		"bLengthChange":true,
		"bPaginate":true,
		"bScrollInfinite":true,
		"scrollY": "600px",
		"scrollCollapse": "true",
		"pagingType":   "simple_numbers", //simple - 只有上一页、下一页两个按钮,simple_numbers - 除了上一页、下一页两个按钮还有页数按钮，Datatables默认是这个full - 有四个按钮首页、上一页、下一页、末页,full_numbers - 除首页、上一页、下一页、末页四个按钮还有页数按钮
		"oLanguage": {
			"sLengthMenu": "每页显示: _MENU_ 条记录",
			"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			"sInfoEmpty": "没有数据",
			"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "上一页",
				"sNext": "下一页",
				"sLast": "尾页"
			},
			"sZeroRecords": "没有检索到数据",
			"sSearch": "查询:"
		},
		"aLengthMenu": [[10, 20, 30, -1], [10]], //[[10, 20, 30, -1], [10, 25, 50, "All"]]
		"fnRowCallback": function( nRow, aData, iDisplayIndex ) {
			if (jQuery.inArray(aData.DT_RowId, aSelected) !== -1 ) {
				$(nRow).addClass('row_selected');
			}
			return nRow;
		},
		buttons: [
			'copy', 'excel', 'pdf'
		]
	});
	/* Click event handler */
	// $(container + ' tbody tr').on('click', function () {
	//     var id = this.id;
	//     var index = jQuery.inArray(id, aSelected);
	//     if ( index === -1 ) {
	//         aSelected.push( id );
	//     } else {
	//         aSelected.splice( index, 1 );
	//     }
	//     $(this).toggleClass('row_selected');
	// });
	return tables;
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} option - 可选参数对象.
 * @callback callback
 * @description:显示弹出层
 */
fnLay.showLayer = function (option,callback) {
	var lay = layer.open({
		type: 1,
		title: option.title || '信息',
		zIndex:option.zIndex || 19980,
		anim:option.anim || 3,//弹出动画
		offset: option.offset || 'rb',
		maxmin: true,
		moveOut:true,
		shade: 0,
		area: [option.width, option.height],
		content: option.content,
		success: function(layero, index){
			layer.title(option.title, index);
			$.isFunction(callback)&&callback.call(null,layero,index);
		},
		end:function () {
			if(option.isEmpty && option.content.length >0){
				option.content.empty();
			}
		}
	});
	return lay;
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @param: {Object} cols - 列.
 * @param: {Object} data - 显示数据集合.
 * @param: {Object} opts - 可选参数对象.
 * @description:生成表格
 */
fnLay.grid = function(cols, data, opts) {
	var self = this,table,a = opts.panel.empty(),type=opts.type;
	var headers = [], columns = [],styles = [],header='<tr>';
	cols.forEach(function(item) {
		headers.push(item.title);
		columns.push(item.data);
		typeof(item.style)=="undefined" ? styles.push(""):styles.push(item.style);
		header += '<th>'+item.title+'</th>';
	});
	header +="</tr>";
	table = $('<table class="layui-table" lay-skin="line"><thead>'+header+'</thead><tbody></tbody></table>').appendTo(a);
	if(data!= null && data.length>0){
		var tbody ='';
		for(var i =0,len = data.length;i<len;i++){
			var tr ='<tr>';
			if(type =='getRivers_Warning'||type =='getMountainTorrents_Warning'||type =='getDebrisFlow_Warning'||type =='getLandslips_Warning'){
				for(var j =0,l = columns.length-1;j<l;j++){
					//columns[i] 对应的是数据对应的字段
					var columnData = data[i][columns[j]] || '';
					if(styles[j] != ""){
						tr+= '<td columnName = '+columns[j]+' style = '+styles[j]+':'+data[i][styles[j]]+'>'+ columnData+'</td>';
					}else{
						tr+= '<td columnName = '+columns[j]+'>'+ columnData +'</td>';
					}
				}
				tr += '<td><a id="'+type+'|'+data[i].id+'|'+'Edite'+'" style="cursor: pointer;padding: 8px 10px;">'+'编辑'+'</a><a id="'+type+'|'+data[i].id+'|'+'Delete'+'" style="cursor: pointer;padding: 8px 10px;">'+'刪除'+'</a></td></tr>';
			}else{
				for(var j =0,l = columns.length;j<l;j++){
					//columns[i] 对应的是数据对应的字段
					var columnData = data[i][columns[j]] || '';
					if(styles[j] != ""){
						tr+= '<td columnName = '+columns[j]+' style = '+styles[j]+':'+data[i][styles[j]]+'>'+ columnData+'</td>';
					}else{
						tr+= '<td columnName = '+columns[j]+'>'+ columnData +'</td>';
					}
				}
				tr += '</tr>';
			}
			tbody += tr;
		}
		table.find('tbody').html(tbody);
	}
	return table;
};
fnLay.Statis = function(cols, data, opts) {
	var self = this,table,a = opts.panel;
	var headers = [], columns = [],styles = [],header='<tr>';
	for(var t in cols) {
		if (typeof(cols[t].cTitle) != "undefined") {
			header += '<th style="text-align:center;font-size:16px" colspan="'+(cols.length-1)+'">'+cols[t].cTitle+'</th></tr><tr>'
		}else{
			headers.push(cols[t].title);
			columns.push(cols[t].data);
			header += '<th>'+cols[t].title+'</th>';
		}
	}
	/*cols.forEach(function(item) {
		headers.push(item.title);
		columns.push(item.data);
		header += '<th>'+item.title+'</th>';
	});*/
	header +="</tr>";
	table = $('<table class="layui-table" lay-skin="line"><thead>'+header+'</thead><tbody></tbody></table>').appendTo(a);
	if(data!= null){
		var tbody ='';
		$.each(data,function(name,value){
			var tr ='<tr>';
			for(var i in columns){
				if(typeof(value[columns[i]])!="undefined"){
					tr+= '<td columnName = '+columns[i]+'>'+ value[columns[i]] +'</td>';
				}else{
					tr+= '<td columnName = '+columns[i]+'> 0 </td>';
				}
			}
			tr += '</tr>';
			tbody += tr;
		});
		table.find('tbody').html(tbody);
	}
	return table;
};
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:产品制作
 */
fnLay.product =function () {
	var html ='<fieldset class="layui-elem-field layui-field-title" style="margin-top: 50px;">'
		+'<legend>方框风格的表单集合</legend>'
		+'</fieldset>'
		+'<form class="layui-form layui-form-pane" action="">'
		+'<div class="layui-form-item">'
		+'<label class="layui-form-label">长输入框</label>'
		+'<div class="layui-input-block">'
		+'<input type="text" name="title" autocomplete="off" placeholder="请输入标题" class="layui-input">'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item">'
		+'<label class="layui-form-label">短输入框</label>'
		+'<div class="layui-input-inline">'
		+'<input type="text" name="username" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">'
		+'</div>'
		+'</div>'

		+'<div class="layui-form-item">'
		+'	<div class="layui-inline">'
		+'<label class="layui-form-label">日期选择</label>'
		+'<div class="layui-input-block">'
		+'<input type="text" name="date" id="date" autocomplete="off" class="layui-input" onclick="layui.laydate({elem: this})">'
		+'</div>'
		+'</div>'
		+'<div class="layui-inline">'
		+'<label class="layui-form-label">行内表单</label>'
		+'<div class="layui-input-inline">'
		+'<input type="number" name="number" autocomplete="off" class="layui-input">'
		+'</div>'
		+'</div>'
		+'</div>'
		+'	<div class="layui-form-item">'
		+'<label class="layui-form-label">密码</label>'
		+'<div class="layui-input-inline">'
		+'<input type="password" name="password" placeholder="请输入密码" autocomplete="off" class="layui-input">'
		+'</div>'
		+'<div class="layui-form-mid layui-word-aux">请务必填写用户名</div>'
		+'</div>'

		+'<div class="layui-form-item">'
		+'<div class="layui-inline">'
		+'<label class="layui-form-label">范围</label>'
		+'<div class="layui-input-inline" style="width: 100px;">'
		+'<input type="text" name="price_min" placeholder="￥" autocomplete="off" class="layui-input">'
		+'</div>'
		+'<div class="layui-form-mid">-</div>'
		+'<div class="layui-input-inline" style="width: 100px;">'
		+'<input type="text" name="price_max" placeholder="￥" autocomplete="off" class="layui-input">'
		+'</div>'
		+'</div>'
		+'</div>'

		+'<div class="layui-form-item">'
		+'<label class="layui-form-label">单行选择框</label>'
		+'<div class="layui-input-block">'
		+'<select name="interest" lay-filter="aihao">'
		+'<option value=""></option>'
		+'<option value="0">写作</option>'
		+'<option value="1" selected="">阅读</option>'
		+'<option value="2">游戏</option>'
		+'<option value="3">音乐</option>'
		+'<option value="4">旅行</option>'
		+'</select>'
		+'</div>'
		+'</div>'

		+'<div class="layui-form-item">'
		+'<label class="layui-form-label">行内选择框</label>'
		+'<div class="layui-input-inline">'
		+'<select name="quiz1">'
		+'<option value="">请选择省</option>'
		+'<option value="浙江" selected="">浙江省</option>'
		+'<option value="你的工号">江西省</option>'
		+'<option value="你最喜欢的老师">福建省</option>'
		+'</select>'
		+'</div>'
		+'<div class="layui-input-inline">'
		+'<select name="quiz2">'
		+'<option value="">请选择市</option>'
		+'<option value="杭州">杭州</option>'
		+'<option value="宁波" disabled="">宁波</option>'
		+'<option value="温州">温州</option>'
		+'<option value="温州">台州</option>'
		+'<option value="温州">绍兴</option>'
		+'</select>'
		+'</div>'
		+'<div class="layui-input-inline">'
		+'<select name="quiz3">'
		+'<option value="">请选择县/区</option>'
		+'<option value="西湖区">西湖区</option>'
		+'<option value="余杭区">余杭区</option>'
		+'<option value="拱墅区">临安市</option>'
		+'</select>'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item" pane="">'
		+'<label class="layui-form-label">开关-开</label>'
		+'<div class="layui-input-block">'
		+'<input type="checkbox" checked="" name="open" lay-skin="switch" lay-filter="switchTest" title="开关">'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item" pane="">'
		+'<label class="layui-form-label">单选框</label>'
		+'<div class="layui-input-block">'
		+'<input type="radio" name="sex" value="男" title="男" checked="">'
		+'<input type="radio" name="sex" value="女" title="女">'
		+'<input type="radio" name="sex" value="禁" title="禁用" disabled="">'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item layui-form-text">'
		+'<label class="layui-form-label">文本域</label>'
		+'<div class="layui-input-block">'
		+'<textarea placeholder="请输入内容" class="layui-textarea"></textarea>'
		+'</div>'
		+'</div>'
		+'<div class="layui-form-item">'
		+'<button class="layui-btn" lay-submit="" lay-filter="demo2">跳转式提交</button>'
		+'</div>'
		+'</form>';
	$(html).appendTo('body');
	return $(html);
};
/**
 * @author:POPE
 * @date:2017-01-11
 * @description: 该函数在上面一个table数据加载完成后调用，把表头的宽度设置到会滚动的页头去
 */
fnLay.copyWidth = function () {
	var b = $('#data_tbody').prev().find('tr:last').find('th');
	var c = $('#scroll_head').find('tr:last').find('th');
	for (var i = 0; i < b.length; i++) {
		var newWith = b.eq(i).width();
		if ($.browser.msie) {
			newWith += 1;
		}
		c.eq(i).width(newWith);
	}
}
/**
 * @author:POPE
 * @date:2017-01-11
 * @description:handsontable参数配置
 */
fnLay.handsontable = {
	defaults: {
		rowHeaders: true,
		rowHeights: 30,
		height: '100%',
		width: '100%',
		stretchH: 'all', //拉伸所有单元格宽度
		manualColumnResize: true,
		manualRowResize: true,
		autoWrapCol: true,
		autoWrapRow: true,
		currentRowClassName: 'currentRow', //选中css
		currentColClassName: 'currentCol', //选中css
		manualColumnMove: true, //移动列
		manualRowMove: true, //移动行
		columnSorting: true,
		sortIndicator: true,
		filters: true,
		contextMenu: true, //右键菜单
		dropdownMenu: ['remove_col', '---------', 'make_read_only', '---------', 'alignment', '---------', 'filter_by_condition', 'filter_action_bar', '---------', 'filter_by_value'],
		minSpareRows: 0, //空行
		allowRemoveColumn: true,
		allowRemoveRow: true,
		renderAllRows: false,
		//以下属性与排序冲突，请勿使用
		// autoRowSize: true,
		// autoColumnSize: true,
	}
};
