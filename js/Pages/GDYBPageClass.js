	/*
 * 格点预报页面
 * by zouwei, 2015-05-10
 * */
var isLand = true;//判断是否为海洋格点服务
function GDYBPageClass(){
    this.className = "GDYBPageClass";
    this.myPanel_FXDZ = null;
    this.myPanel_QSDZ = null;
    this.myPanel_QHDZ = null;
    this.myPanel_LQDZ = null;
    this.myPanel_Tools = null;
    this.myDateSelecter = null;
    this.yubaoshixiaoTools = null;
    this.productType = "prvn"; //当前产品类型：PRVN-省/区级产品（Province）；CTY：市级产品(City)；CNTY：县级产品（County）
	this.yuBaoSource = 'bj'; //预报来源
    this.polygonVector = null;
    this.lineVector = null;
    this.registerKeyDown = false;
    var t = this;
	var gm = new GridManage(); //格点管理模块
    //渲染左侧菜单区域里的按钮
    this.renderMenu = function() {
    	var self = this;
		var htmlStr = "<div id='currentNav'>格点预报-->陆地-气温</div><div class='btitle'></div>"
			+"<div id='div_datetime'>"
			+"<div style='height: 20px;'><span class='title1' style='position:relative;'>制作时间：</span><select id='selectMakeTime' style='height:20px; width:65px; border-radius:15px; position:absolute; left:78px; font-size:8px;''><option id='option_5' value='5'>05时</option><option id='option_10' style='display:none' value='10'>10时</option><option  id='option_16' value='16'>16时</option></select></div>"
			+"<div id='dateSelect' style='clear:both;text-align: center;'></div>"
			+"</div>"
			+"<div class='btitle'></div>"
			+"<div id='div_forecastSetting' style='margin-top:5px;'>"
			+"<div id='div_Port' style='height: 20px;display:none;'><span class='title1' style='position:relative;'>值班类型：</span><select id='selectPort' style='height:20px; width:65px; border-radius:15px; position:absolute; left:78px; font-size:8px;'><option value=''>请选择</option><option value='关键岗'>关键岗</option><option value='值班岗'>值班岗</option><option value='全部'>全部</option><option value='首席岗'>首席岗</option></select></div>"
			+"<div id='div_YuBaoYuan' style='height: 20px;display:none;'><span class='title1' style='position:relative;'>预报员：</span><select id='selectYuBaoYuan' style='height:20px; width:65px; border-radius:15px; position:absolute; left:78px; font-size:8px;''></select></div>"
			+"<div id='div_MoShi' style='height: 20px;'><span class='title1' style='position:relative; '>预报来源：</span><span id ='sourceTitle'></span><select id='selectYuBaoSource' style='height:20px; width:65px; border-radius:15px; position:absolute; left:140px; font-size:8px;''><option value=''>请选择</option><option value='bj'>中央台</option><option value='prvn'>省台指导</option><option value='cty'>市台指导</option><option value='ec'>欧洲中心</option><option value='t639'>T639</option><option value='gp'>GRAPES</option><option value='japan'>日本</option><option value='cmaq' style='display:none'>CMAQ</option><option value='wrfchem' style='display:none'>WRFCHEM</option><option value='huc'>科研所</option></select></div>"
			+"<div id='div_QianFaRen' style='height: 20px;display:none;'><span class='title1' style='position:relative; '>签发人：</span><select id='selectQianFaRen' style='height:20px; width:65px; border-radius:15px; position:absolute; left:78px; font-size:8px;''></select></div>"
			+"</div>"
			+"<div class='btitle'></div>"
			+"<div id='div_element' class=''>"
			+"<table class='active'><tr><td><button id='tmax' flag='land'>日最高温</button></td><td><button id='tmin' flag='land'>日最低温</button></td><td><button id='2t' flag='land'>气温</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='r12' flag='land'>日降水量</button></td><td><button id='r3' flag='land'>降水量</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='wmax' flag='land'>日最大风</button></td><td><button id='10uv' flag='land'>风</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='w' flag='land'>天气</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='vis' flag='land'>能见度</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='rh' flag='land'>相对湿度</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='air' flag ='sea'>空气污染等级</button></td><td><button id='pm25' flag ='sea'>PM2.5</button></td></tr><tr><td><button id='pm10' flag ='sea'>PM10</button></td><td><button id='o3' flag ='sea'>O3</button></td></tr><tr><td><button id='co' flag ='sea'>CO</button></td><td><button id='so2' flag ='sea'>SO2</button></td></tr><tr><td><button id='no2' flag ='sea'>NO2</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='tcc' flag='land'>云量</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='seawmax' flag ='sea'>海洋日最大风</button></td><td><button id='sea10uv' flag ='sea'>海洋大风</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='seavis' flag ='sea'>海洋能见度</button></td></tr></table>"
			+"<table class='' style='display:none'><tr><td><button id='sear12' flag ='sea'>海洋日降水量</button></td><td><button id='sear3' flag ='sea'>海洋降水量</button></td></tr></table>"
			+"<table class='active'><tr><td><button id='seatmax' flag ='sea'>海洋日最高温</button></td></tr></table>"
			+"<table class='active'><tr><td><button id='seatmin' flag ='sea'>海洋日最低温</button></td></tr></table>"
			+"</div>"
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
			+"<div id='div_display' class=''><div class='title1' style='display:none;'>显示方式</div>"
			+"<table class='btn_line1'><tr><td><button id='buttonDisplayPlot' style='outline:none;margin:2px;'>填值</button></td><td><button id='buttonDisplayFill' style='outline:none;margin:2px;'>填色</button></td><td><button id='buttonDisplayContour' style='outline:none; margin:2px;'>等值线</button></td><td><button id='buttonDisplayIsoSurface' style='outline:none; margin:2px;'>色斑图</button></td></tr></table>"
			+"<table class='btn_line1'><tr><td><button id='buttonDisplayNationStation' style='outline:none;margin:2px;'>国家站</button></td><td><button id='buttonDisplayLocalStation' style='outline:none; margin:2px;'>区域站</button></td><td><button id='buttonDisplayTown' style='outline:none; margin:2px;'>乡镇点</button></td><td><button id='buttonDisplayHighStation' style='outline:none; margin:2px;'>高山站</button></td</tr></table>"
			+"<table class='btn_line1'><tr><td><button id='buttonDisplayNationStationName' style='outline:none;margin:2px;display:none;'>站名</button></td><td><button id='buttonDisplaySeaStation' style='outline:none; margin:2px;display:none;'>海洋站</button></td><td><button id='buttonDisplayFocus' style='outline:none; margin:2px;display:none;'>关注区</button></td><td><button id='btnHideMap' style='outline:none; margin:2px;display:none;'>行政区</button></td><td><button id='btnPlay' style='outline: none; margin:2px'>动画</button></td></tr></table>"
			+"</div>"
			+"<div class='btitle'></div>"
			+"<div id='div_operation' class=''>"
			+"<div class='title1' style='display:none;'>操作</div>"
			+"<table class='btn_line1'><tr><td><button id='btnDown' style='outline: none;width:75px;'>下载初始场</button></td><td><button id='btnCheck' style='outline: none;width:75px;'>一致性检查</button></td><td><button id='btnSave' style='outline: none;width:75px;'>提交</button></td></tr></table>"
			+"</div>";
		$("#menu_bd").html(htmlStr);
		this.myDateSelecter = new DateSelecter(2,2); //最小视图为天
		this.myDateSelecter.intervalMinutes = 60*24; //12小时
		$("#dateSelect").append(this.myDateSelecter.div);
		$('#sourceTitle').html('中央台');
		GDYB.GridProductClass.currentUserName=$.cookie("userName");
		var departCodeLen = $.cookie('departCode').length;
		switch (departCodeLen){
			case 4:
				self.yuBaoSource = 'prvn';
				$('#sourceTitle').html('省台指导');
				// $("#selectYuBaoSource").val(self.yuBaoSource);//通过value值，设置对应的选中项
				GDYB.GridProductClass.isCty = true;
				self.productType ="cty";
				var hours = [24,48,72];
				this.yubaoshixiaoTools = new YuBaoshixiaoTools($("#yubaoshixiao"), this.myDateSelecter.getCurrentTimeReal(),0,hours);
				//使水系图层不可见
				var map = GDYB.Page.curPage.map;
				var layer=map.getLayersByName("sdRiver");
				if (layer!=null&&layer.length>0)
				{
					layer[0].displayInLayerSwitcher=false; //用于保存当前是可见或不可见，在放大缩小地图时会用到
					layer[0].setVisibility(false);
				}
				break;
			default:
				this.yubaoshixiaoTools = new YuBaoshixiaoTools($("#yubaoshixiao"), this.myDateSelecter.getCurrentTimeReal());
				break;
		}
        this.yubaoshixiaoTools.supportMultiSelect = true;
        //显示格点订正工具箱
        this.myPanel_Tools = new Panel_Tools($("#map_div"));
		$("#selectYuBaoSource").change(function(){
			self.yuBaoSource = this.value;
			$('#sourceTitle').html($("#selectYuBaoSource option:selected").text());
			//增加是否调入模式数据
			GDYB.GridProductClass.changeElement = true;
            if((this.value == "InitialField" || this.value == "prvn" || this.value == "cty"  || this.value == "nn"||  this.value == "ec" || this.value == "gp" || this.value == "japan" || this.value == "t639" || this.value == "bj"|| this.value == "huc")
                && GDYB.GridProductClass.dataCache == null)
            {
                $("#div_modal_confirm_content").html("请先下载初始场。");
                $("#div_modal_confirm").modal();
                $("#div_modal_confirm").find("a").off('click');
                return;
            }
            if(this.value == "InitialField"){
                $("#div_modal_content").html("是否重新调入初始场");
                $("#div_modal").modal();
                $("#div_modal").find("a").off('click').on('click',function(){
                    if(typeof(this.id) != "undefined"){
                        if(this.id == "btn_ok")
                        {
                            var url=gridServiceUrl+"services/GridService/getGridDefaultSchemes";
                            $.ajax({
                                data:{"para":"{}"},
                                url:url,
                                dataType:"json",
                                success:function(data){
                                    var defaultSchemes = data;
                                    var modelType = null;
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked) {
                                        modelType = getModelByElement();
                                        if(modelType == null)
                                            alert("初始场默认方案中没有该要素的配置");
                                        else
                                            GDYB.GridProductClass.callModel(modelType, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);
                                    }
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                    {
                                        modelType = getModelByElement();
                                        if(modelType == null)
                                            alert("初始场默认方案中没有该要素的配置");
                                        else
                                            GDYB.GDYBPage.callModels(modelType, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);
                                    }
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(modelType, defaultSchemes, GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion);

                                    //匹配要素-模式方案
                                    function getModelByElement(){
                                        var modelType = null;
                                        if(typeof(defaultSchemes) != "undefined" && defaultSchemes.length > 0){
                                            var makeTime = GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* (\d*):\d*:\d*/,"$1")+":"+GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* \d*:(\d*):\d*/,"$1");
                                            for(var key in defaultSchemes){
                                                var scheme = defaultSchemes[key];
                                                if(scheme.type == GDYB.GridProductClass.currentType && scheme.makeTime == makeTime && scheme.element == GDYB.GridProductClass.currentElement){
                                                    modelType = scheme.model;
                                                    break;
                                                }
                                            }
                                        }
                                        return modelType;
                                    }
                                },
                                error: function (e) {
                                    alert("获取初始场默认方案错误");
                                },
                                type:"POST"
                            });
                        }
                    }
                });
            }
            else if(this.value == "prvn" || this.value == "cty") //调入格点产品，与调入模式不同的是，格点产品制作时间与预报时间不同
            {
                var id = this.value;
                var typeModel = id;
                var element = GDYB.GridProductClass.currentElement;
                var forecastTime = GDYB.GridProductClass.currentDateTime;
                var url=gridServiceUrl+"services/GridService/getGridProductLastDate";
                $.ajax({
                    data:{"para":"{element:'"+ element + "',type:'" + typeModel + "',forecastTime:'" + forecastTime + "'}"},
                    url:url,
                    dataType:"text",
                    success:function(data){
                        if(typeof(data) == "undefined" || data == null || data == ""){
                            alert("没有找到上一期");
                            return;
                        }
                        $("#div_modal_content").html("是否调入"+(id == "prvn"?"省台指导":"市台订正")+"预报：");

                        //初始化制作时间
                        $("#div_modal_content").css("float", "left");
                        $("#divImportModelType_dateSelectContainer").css("display", "block");
                        if(typeModel == "bj" || typeModel == "prvn" || typeModel == "cty")
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=0;
                        else
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=7;
                        var myDateSelecter = new DateSelecter(2,2,"yyyy-mm-dd"); //最小视图为天
                        myDateSelecter.intervalMinutes = 60*12; //12小时
                        myDateSelecter.setCurrentTime(data.substr(0, 10));
                        $("#divImportModelType_selectMakeTime").html("<option value='5'>05时</option><option value='16'>16时</option>");
                        $("#divImportModelType_selectMakeTime").val(parseInt(data.substr(11, 2)));
                        $("#divImportModelType_dateSelect").append(myDateSelecter.div);
                        $("#divImportModelType_dateSelect").find("img").css("display","none");
                        $("#divImportModelType_dateSelect").find("input").css("border","none").css("font-size","14px").css("box-shadow","none").css("font-weight","bold");

                        $("#div_modal").modal();
                        $("#div_modal").find("a").unbind();
                        $("#div_modal").find("a").click(function(){
                            if(typeof(this.id) != "undefined"){
                                if(this.id == "btn_ok")
                                {
                                    data = $("#divImportModelType_dateSelect").find("input").val().substr(0, 10)+" "+(Array(2).join(0)+$("#divImportModelType_selectMakeTime").val()).slice(-2)+":00:00";
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked)
                                        GDYB.GridProductClass.callModel(typeModel, data, "p");
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModels(typeModel, data, "p");
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(typeModel, null, data, "p");
                                }
                            }
                            //清空制作时间
                            $("#div_modal_content").css("float", "none");
                            $("#divImportModelType_dateSelect").html("");
                            $("#divImportModelType_dateSelectContainer").css("display", "none");
                        });
                    },
                    error: function (e) {
                        alert("没有找到上一期");
                    },
                    type:"POST"
                });
            }
            else if(this.value == "nn" || this.value == "ec" || this.value == "gp" || this.value == "japan" || this.value == "t639" || this.value == "bj"|| this.value == "huc") //调入模式
            {
                var typeModel = this.value;
                var element = GDYB.GridProductClass.currentElement;
                var url=gridServiceUrl+"services/GridService/getNWPModelLastDate";
                $.ajax({
                    data:{"para":"{element:'"+ element + "',type:'"+typeModel + "'}"},
                    url:url,
                    dataType:"text",
                    success:function(data){
                        //$("#div_modal_content").html("是否调入模式数据（" + data + "）");
                        $("#div_modal_content").html("是否调入模式数据：");

                        //初始化预报时间
                        $("#div_modal_content").css("float", "left");
                        $("#divImportModelType_dateSelectContainer").css("display", "block");
                        if(typeModel == "bj" || typeModel == "prvn" || typeModel == "cty")
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=0;
                        else
                            $("#divImportModelType_selectDays ").get(0).selectedIndex=7;
                        var myDateSelecter = new DateSelecter(2,2,"yyyy-mm-dd"); //最小视图为天
                        myDateSelecter.intervalMinutes = 60*12; //12小时
                        myDateSelecter.setCurrentTime(data.substr(0, 10));
                        $("#divImportModelType_selectMakeTime").html("<option value='8'>08时</option><option value='20'>20时</option>");
                        $("#divImportModelType_selectMakeTime").val(parseInt(data.substr(11, 2)));
                        $("#divImportModelType_dateSelect").append(myDateSelecter.div);
                        $("#divImportModelType_dateSelect").find("img").css("display","none");
                        $("#divImportModelType_dateSelect").find("input").css("border","none").css("font-size","14px").css("box-shadow","none").css("font-weight","bold");
						$("#div_modal").css("display", "block");
						$("#div_modal_content").css("display", "block");
                        $("#div_modal").modal('show');
                        $("#div_modal").find("a").unbind();
                        $("#div_modal").find("a").click(function(){
                            if(typeof(this.id) != "undefined"){
                                if(this.id == "btn_ok")
                                {
                                    data = $("#divImportModelType_dateSelect").find("input").val().substr(0, 10)+" "+(Array(2).join(0)+$("#divImportModelType_selectMakeTime").val()).slice(-2)+":00:00";
                                    var days = $("#divImportModelType_selectDays").val();
                                    if($("#inputCurrentElementCurrentHourspan")[0].checked)
                                        GDYB.GridProductClass.callModel(typeModel, data, "p");
                                    else if($("#inputCurrentElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModels(typeModel, data, "p", Number(days)*24);
                                    else if($("#inputAllElementAllHourspan")[0].checked)
                                        GDYB.GDYBPage.callModelsAll(typeModel, null, data, "p", Number(days)*24);
                                }
                            }

                        });
                        //当模态框完全对用户隐藏时触发。
                        $('#div_modal').on('hidden.bs.modal', function () {
                            //清空预报时间
                            $("#div_modal_content").css("float", "none");
                            $("#divImportModelType_dateSelect").html("");
                            $("#divImportModelType_dateSelectContainer").css("display", "none");
                        });
                    },
                    error: function (e) {
                        alert("没有找到数值模式");
                    },
                    type:"POST"
                });
            }
			$("#selectYuBaoSource").val('');//重置预报来源
		});
        //选择值班类型（开始下载数据）
        $("#selectPort").change(function(){
            if($("#selectPort").val() == ""){
                GDYB.GridProductClass.currentPost = null;
                GDYB.GridProductClass.currentVersion = null;
                return;
            }
            else if($("#selectPort").val() == "关键岗"){
                GDYB.GridProductClass.currentPost = {min:0, max:72, des:"前三天", name:$("#selectPort").val() }; //左开右闭
                GDYB.GridProductClass.currentVersion = "r";
                $("#div_YuBaoYuan").css("display", "block");
                $("#div_YuBaoYuan").css("float", "none");
                $("#div_QianFaRen").css("display", "none");
            }
            else if($("#selectPort").val() == "值班岗")
            {
                GDYB.GridProductClass.currentPost = {min:72, max:216, des:"后四天", name:$("#selectPort").val() }; //左开右闭
                GDYB.GridProductClass.currentVersion = "r";
                $("#div_YuBaoYuan").css("display", "block");
                $("#div_YuBaoYuan").css("float", "none");
                $("#div_QianFaRen").css("display", "none");
            }
            else if($("#selectPort").val() == "全部")
            {
                GDYB.GridProductClass.currentPost = {min:0, max:216, des:"全部", name:$("#selectPort").val() }; //左开右闭
                GDYB.GridProductClass.currentVersion = "r";
                $("#div_YuBaoYuan").css("display", "block");
                $("#div_YuBaoYuan").css("float", "none");
                $("#div_QianFaRen").css("display", "none");
            }
            else if($("#selectPort").val() == "首席岗")
            {
                GDYB.GridProductClass.currentPost = {min:0, max:216, des:"全部", name:$("#selectPort").val() }; //左开右闭
                GDYB.GridProductClass.currentVersion = "p";
                $("#div_YuBaoYuan").css("display", "none");
                $("#div_YuBaoYuan").css("float", "none");
                $("#div_QianFaRen").css("display", "block");
            }
            t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
            regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件

            getGridInfosAndUpdateElementStatus();
            GDYB.GridProductClass.dataCache.initInfos();

//            //下载全部要素
//            GDYB.GridProductClass.dataCache = null; //销毁内存，否则崩溃
//            GDYB.GridProductClass.datasetGridInfos = [];
//            downAllElement(function(){
//                {
//					if(GDYB.GridProductClass.currentType == "prvn" && $("#selectMakeTime").val() == 16 || GDYB.GridProductClass.currentType == "cty" && $("#selectMakeTime").val() == 10){
//						callLast(function(){
//							//打开第一个要素
//							var btnElementActive = $("#div_element").find("button.active");
//							var element = "r12";
//							if(typeof(btnElementActive) != "undefined" && btnElementActive != null)
//								element = btnElementActive.attr("id");
//							$("#div_element").find("button.active").removeClass("active");
//							$("#div_element").find("#"+element).addClass("active");
//
//							GDYB.GridProductClass.getGridInfo(function(){
//								checkHourSpan(t.displayGridProduct, t.productType, element, t.myDateSelecter.getCurrentTime(false));
//							}, GDYB.GridProductClass.currentUserDepart.departCode ,t.productType, element, t.myDateSelecter.getCurrentTime(false));
//						});
//					}
//                    else{
//						//打开第一个要素
//						var btnElementActive = $("#div_element").find("button.active");
//						var element = "r12";
//						if(typeof(btnElementActive) != "undefined" && btnElementActive != null)
//							element = btnElementActive.attr("id");
//						$("#div_element").find("button.active").removeClass("active");
//						$("#div_element").find("#"+element).addClass("active");
//
//						GDYB.GridProductClass.getGridInfo(function(){
//							checkHourSpan(t.displayGridProduct, t.productType, element, t.myDateSelecter.getCurrentTime(false));
//						}, GDYB.GridProductClass.currentUserDepart.departCode ,t.productType, element, t.myDateSelecter.getCurrentTime(false));
//					}
//                }
//            });
        });

        //点击要素
        $("#div_element").find("button").click(function(){
            if($(this).hasClass("disabled")) //无效按钮，直接返回
                return;
            var btnElementActive = $("#div_element").find("button.active");
            if(btnElementActive.attr("id") == this.id)
                return;
            btnElementActive.removeClass("active");
            $(this).addClass("active");

            GDYB.GridProductClass.changeElement = true;
            if(GDYB.GridProductClass.dataCache == null) //未下载（缓存），不允许显示和编辑
                return;

            var elementSrc = btnElementActive.attr("id");
            var element = this.id;
            if(element == "r3" || element == "r12")
                t.yubaoshixiaoTools.supportMultiSelect = true;
            else
                t.yubaoshixiaoTools.supportMultiSelect = false;
            openElement(element, elementSrc);
        });

        //打开要素
        function openElement(elementTo, elementFrom){

            try {
                t.CheckReasonable(SwitchElement);
            }
            catch (e){
                alert(e.message);
            }

            function SwitchElement(){
                //切换时效面板
                t.yubaoshixiaoTools.numbers = t.getHourSpan(elementTo);
                t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
                regesterYuBaoShiXiaoEvent();

                if(GDYB.GridProductClass.currentPost == null) //只适用于格点预报，不适用于数值模式，所以写在GDYBPageClass中判断
                    return;

//                if(GDYB.GridProductClass.currentType == "prvn" && GDYB.GridProductClass.currentPost.name == "首席岗"){
//                    GDYB.GridProductClass.getGridInfo(function () {
//                        callRInfo(checkHourSpan(t.displayGridProduct, t.productType, element, t.myDateSelecter.getCurrentTime(false)), element);
//                    }, GDYB.GridProductClass.currentUserDepart.departCode, t.productType, element, t.myDateSelecter.getCurrentTime(false));
//                }
//                else
                {
                    //先查询格点产品信息
                    GDYB.GridProductClass.getGridInfo(function () {
						self.checkHourSpan(t.displayGridProduct, t.productType, elementTo, t.myDateSelecter.getCurrentTime(false));
                    }, GDYB.GridProductClass.currentUserDepart.departCode, t.productType, elementTo, t.myDateSelecter.getCurrentTime(false));
                }
            };
        }

        //全部时效一次性请求过来，放到缓存中
        function cache(recall, element, elementName, hourspans){
            var date = t.myDateSelecter.getCurrentTime(false);
            var type = t.productType;
            var level = 1000;
            var recalls = [];
            if(recall != null) {
                recalls.push(t.updateHourSpanStatus);
                recalls.push(recall);
            }
            GDYB.GridProductClass.cache(recalls, type, GDYB.GridProductClass.currentMakeTime, date, element, elementName, level, hourspans);
        };

        //下载全部要素
        function downAllElement(recall){
            var elements = [];
            var elementNames = [];
            var buttons = $("#div_element").find("button");
            for(var key in buttons){
            	var elementId = buttons[key].id;
            	var elementName = buttons[key].innerHTML;
                if(elementId && elementName) {
					if(!isLand && (elementId.indexOf("sea") > -1 || elementId.indexOf("air") > -1)){
						elements.push(elementId);
						elementNames.push("海洋-"+ elementName);
					}
					else{
						elements.push(elementId);
						elementNames.push("陆地-"+ elementName);
					}
                }
            }

            //递归请求
            var nIndex = -1;
            down();
            function down(){
                nIndex++;
                if(nIndex >= elements.length) //全部请求完成
                {
//                    //下载全部产品信息
//                    GDYB.GridProductClass.getGridInfos(function(){
//                        t.updateElementStatus();
//                    }, GDYB.GridProductClass.currentUserDepart.departCode, GDYB.GridProductClass.currentType, t.myDateSelecter.getCurrentTime(false), GDYB.GridProductClass.currentVersion, elements);

                    recall&&recall();
                    return;
                }
                var element = elements[nIndex];
                var elementName = elementNames[nIndex];
                var hourspans = t.getHourSpan(element);
                var date = t.myDateSelecter.getCurrentTime(false);
                var type = GDYB.GridProductClass.currentType;
                var maketime = GDYB.GridProductClass.currentMakeTime;
                var level = 1000;
                var recalls = [];
                recalls.push(down);
                GDYB.GridProductClass.cache(recalls, type, maketime, date, element, elementName, level, hourspans);
            }
        };

        //提交全部要素
        function saveAllElement(){
            var elements = [];
            var elementNames = [];
            var buttons = $("#div_element").find("button");
            for(var key in buttons){
                if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
                {
                    elements.push(buttons[key].id);
                    elementNames.push(buttons[key].innerHTML);
                }
            }

            var nIndex = -1;
            var messages = "";
            save();

            //递归请求
            function save(message){
                nIndex++;
                if("undefined" != typeof(message))
                    messages+=message+"<br/>";
                if(nIndex >= elements.length)
                {
                    messages+='<h5 style="color: red;font-size: 15px;font-family: 微软雅黑;margin-top: 10px;">请重新提交以上失败的要素！</h5>';
                    $("#div_modal_confirm_content").html(messages);
                    $("#div_modal_confirm").modal();
                    $("#div_modal_confirm").find("a").unbind();
                    return;
                }

                var forecaster = $("#selectYuBaoYuan").val();
                var issuer = $("#selectQianFaRen").val();
                var element = elements[nIndex];
                //var elementName = elementNames[nIndex];
                var hourspans = t.getHourSpan(element);
                var type = GDYB.GridProductClass.currentType;
                GDYB.GridProductClass.saveGridProducts(save, type, userName, forecaster, issuer, element, hourspans);
            }
        }
		//提交全部要素(陆地)
		function saveLandElement(){
			var elements = [];
			var elementNames = [];
			var buttons = $("#div_element").find("button").not("[id^='sea']");
			for(var key in buttons){
				if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
				{
					elements.push(buttons[key].id);
					elementNames.push(buttons[key].innerHTML);
				}
			}

			var nIndex = -1;
			var messages = "";
			save();

			//递归请求
			function save(message){
				nIndex++;
				if("undefined" != typeof(message))
					messages+=message+"<br/>";
				if(nIndex >= elements.length)
				{
					messages+='<h5 style="color: red;font-size: 15px;font-family: 微软雅黑;margin-top: 10px;">请重新提交以上失败的要素！</h5>';
					$("#div_modal_confirm_content").html(messages);
					$("#div_modal_confirm").modal();
					$("#div_modal_confirm").find("a").unbind();
					return;
				}

				var forecaster = $("#selectYuBaoYuan").val();
				var issuer = $("#selectQianFaRen").val();
				var element = elements[nIndex];
				//var elementName = elementNames[nIndex];
				var hourspans = t.getHourSpan(element);
				var type = GDYB.GridProductClass.currentType;
				GDYB.GridProductClass.saveGridProducts(save, type, userName, forecaster, issuer, element, hourspans);
			}
		}
		//提交全部要素(海洋)
		function saveOceanElement(){
			var elements = [];
			var elementNames = [];
			var buttons = $("#div_element").find("button[flag^='sea']");
			for(var key in buttons){
				if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
				{
					elements.push(buttons[key].id);
					elementNames.push(buttons[key].innerHTML);
				}
			}

			var nIndex = -1;
			var messages = "";
			save();

			//递归请求
			function save(message){
				nIndex++;
				if("undefined" != typeof(message))
					messages+=message+"<br/>";
				if(nIndex >= elements.length)
				{
					messages+='<h5 style="color: red;font-size: 15px;font-family: 微软雅黑;margin-top: 10px;">请重新提交以上失败的要素！</h5>';
					$("#div_modal_confirm_content").html(messages);
					$("#div_modal_confirm").modal();
					$("#div_modal_confirm").find("a").unbind();
					return;
				}

				var forecaster = $("#selectYuBaoYuan").val();
				var issuer = $("#selectQianFaRen").val();
				var element = elements[nIndex];
				//var elementName = elementNames[nIndex];
				var hourspans = t.getHourSpan(element);
				var type = GDYB.GridProductClass.currentType;
				GDYB.GridProductClass.saveGridProducts(save, type, userName, forecaster, issuer, element, hourspans);
			}
		}



        //点击动画
        var play;
        $("#btnPlay").click(function(){
            if($("#btnPlay").hasClass("active"))
            {
                $("#btnPlay").removeClass("active");
                $("#btnPlay").html("播放");
                clearInterval(play);
            }
            else
            {
                $("#btnPlay").addClass("active");
                $("#btnPlay").html("停止");
                var nIndex = 0;
                var hourspans = t.yubaoshixiaoTools.numbers;
                play = setInterval(function(){
                    $("#yubaoshixiao").find("td").removeClass("active");
                    if(nIndex >= hourspans.length)
                        nIndex = 0;
                    var hourspan = hourspans[nIndex++];
                    t.yubaoshixiaoTools.hourSpan = hourspan;
                    $("#yubaoshixiao").find("#"+hourspan+"h").addClass("active");
                    t.displayGridProduct();
                },500);
            }
        });

        //键盘按键事件，实现上翻、下翻
        if(!t.registerKeyDown) {
            t.registerKeyDown = true;
            $(document).keydown(function (event) {
                if (typeof(GDYB.Page.curPage.className) == "undefined" || GDYB.Page.curPage.className != t.className)
                    return;
                if (document.activeElement.id == "table_yubaoshixiao") {  //时效上下翻
                    var offset = 0;
                    if (event.keyCode == 37 || event.keyCode == 38)  //左上
                        offset = -1;
                    else if (event.keyCode == 39 || event.keyCode == 40) //右下
                        offset = 1;

                    if (offset != 0) {
                        var hourspans = t.yubaoshixiaoTools.numbers;
                        var hourSpan = t.yubaoshixiaoTools.hourSpan;
                        var nIndex = -1;
                        for (var hKey in hourspans) {
                            if (hourspans[hKey] == hourSpan) {
                                nIndex = Number(hKey);
                                break;
                            }
                        }
                        nIndex += offset
                        if (nIndex >= hourspans.length)
                            nIndex = 0;
                        else if (nIndex < 0)
                            nIndex = hourspans.length - 1;
                        hourSpan = hourspans[nIndex];
                        $("#table_yubaoshixiao").find("td").removeClass("active");
                        t.yubaoshixiaoTools.hourSpan = hourSpan;
                        $("#table_yubaoshixiao").find("#" + hourSpan + "h").addClass("active");
                        t.displayGridProduct();
                    }
                }
                else if (document.activeElement.parentNode.parentNode.id == "div_element") { //要素上下翻
                    var offset = 0;
                    if (event.keyCode == 37 || event.keyCode == 38)  //左上
                        offset = -1;
                    else if (event.keyCode == 39 || event.keyCode == 40) //右下
                        offset = 1;
                    if (offset != 0) {
                        var nIndex = -1;
                        var btnElementActive = $("#div_element").find("button.active");
                        var id = btnElementActive.attr("id");
                        var btns = $("#div_element").find("button");
                        for (var i = 0; i < btns.length; i++)
                            if (id == btns[i].id) {
                                nIndex = i;
                                break;
                            }
                        nIndex += offset;
                        if (nIndex >= btns.length)
                            nIndex = 0;
                        else if (nIndex < 0)
                            nIndex = btns.length - 1;
                        var btn = btns[nIndex];
                        btnElementActive.removeClass("active");
                        $("#" + btn.id).addClass("active");
                        openElement(btn.id, id);
                    }
                }
            });
        }

        //点击下载
        $("#btnDown").click(function(){
			if(GDYB.GridProductClass.currentPost == null){
                layer.alert('请选择值班类型', {
                    icon: 2
                    //, time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
                return;
            }
            $("#div_progress_title").html("正在下载...");
            $("#div_progress").css("display", "block");
            GDYB.GridProductClass.changeElement = true;
            GDYB.GridProductClass.dataCache.clearFile(function(){
                GDYB.GridProductClass.dataCache = null; //销毁内存，否则崩溃
                //GDYB.GridProductClass.datasetGridInfos = []; //这个不销毁
				switch (departCodeLen){
					case 4: //下载市级要素
						self.downCityElement(function () {
							self.openElement(function () {
								self.init();
							});
						});
						break;
					default:
						var type = GDYB.GridProductClass.currentType;
						gm.downAllElement(isLand,type,function(){
							self.openElement();
						});
						break;
				}
            });
        });

        //点击一致性检查 add by pope on 2016-11-12
		$("#btnCheck").on("click",function(){
			if(!GDYB.GridProductClass.dataCache) return; //未下载（缓存），不允许显示和编辑
			//一致性校验
			// GDYB.GDYBPage.CheckReasonable(function () {
			//
			// });
			layer.closeAll();
			if($(this).hasClass('active')){
				$(this).removeClass("active");
				GDYB.GridProductClass.isConsistencyCheck = false;
				GDYB.ConsistencyCheck.hideGrid();
			}
			else{
				$(this).addClass("active");
				GDYB.ConsistencyCheck.initPanel();
				GDYB.GridProductClass.isConsistencyCheck = true;
			}
		});
        //点击保存
        $("#btnSave").click(function(){
            t.CheckReasonable(function(){
                var userName = GDYB.GridProductClass.currentUserName,range = GDYB.GridProductClass.currentPost;
                if(userName == "fuwuzhongxin" || userName == "guest"){ //服务中心和宾客无提交权限，临时写在前端
                    layer.alert("无提交权限");
                    return;
                }
				if (userName && range) {
					$("#span_SaveTheElementAllHourSpan")[0].innerHTML = "该要素所有时效" + "(" + GDYB.GridProductClass.currentPost.des + ")";
					if (isLand)
						$("#span_SaveAllElementAllHourSpan")[0].innerHTML = "全部(陆地)要素所有时效" + "(" + GDYB.GridProductClass.currentPost.des + ")";
					else
						$("#span_SaveAllElementAllHourSpan")[0].innerHTML = "全部(海洋)要素所有时效" + "(" + GDYB.GridProductClass.currentPost.des + ")";
					$("#div_modal_SaveGrid").modal();
					$("#div_modal_SaveGrid").find("a").off('click').on('click', function () {
						var id = this.id, forecaster = $("#selectYuBaoYuan").val(),issuer = $("#selectQianFaRen").val();
						switch (id) {
							case 'btn_ok':
								if ($("#saveCurrentElementCurrentHourspan")[0].checked)
									GDYB.GridProductClass.saveGridProduct(t.productType, userName, forecaster, issuer);
								else if ($("#saveCurrentElementAllHourspan")[0].checked)
									GDYB.GridProductClass.saveGridProducts(function (message) {
										$("#div_modal_confirm_content").html(message);
										$("#div_modal_confirm").modal();
										$("#div_modal_confirm").find("a").off('click');
									}, t.productType, userName, forecaster, issuer, GDYB.GridProductClass.currentElement, t.getHourSpan(GDYB.GridProductClass.currentElement));
								else if ($("#saveCurrentAllElementAllHourspan"[0].checked)) {
									var type = GDYB.GridProductClass.currentType;
									gm.saveAllElement(isLand, type, function (messages) {
										messages += '<h5 style="color: red;font-size: 15px;font-family: 微软雅黑;margin-top: 10px;">请重新提交以上失败的要素！</h5>';
										$("#div_modal_confirm_content").html(messages);
										$("#div_modal_confirm").modal();
										$("#div_modal_confirm").find("a").off('click');
										gm.getGridData('tmax','cty',GDYB.GridProductClass.currentLevel,'24',GDYB.GridProductClass.currentMakeTime,GDYB.GridProductClass.currentVersion,GDYB.GridProductClass.currentDateTime,function (datasetGrid) {
											if(!datasetGrid){
												gm.saveAllElement(isLand, 'cty');
											}
										});
									});
								}
								break;
						}
					});
				}
				else{
					layer.alert('请登录或者选择值班类型', {
						icon: 3
						//, time: 2000 //2秒关闭（如果不配置，默认是3秒）
					});
				}
            });
        });

        $("#btnHideMap").click(function(){
            //var testLayer = GDYB.Page.curPage.map.getLayer("mapCoverLayer");
            var testLayer = GDYB.Page.curPage.map.getLayer("mapCoverLayer");
            if($("#btnHideMap").hasClass("active"))
            {
                $("#btnHideMap").removeClass("active")
//                $("#btnHideMap").html("隐藏周边地图");
                testLayer.removeFeatures([t.polygonVector]);
            }
            else{
                $("#btnHideMap").addClass("active")
//                $("#btnHideMap").html("显示周边地图");
                testLayer.removeFeatures([t.lineVector]);
                testLayer.addFeatures([t.polygonVector]);
                testLayer.addFeatures([t.lineVector]);
            }
        });

        //生成格点报
        $("#btnExportMicaps").click(function(){
            var userName = GDYB.GridProductClass.currentUserName;
            if(userName == null)
            {
                alert("未登录");
                return;
            }
            if(confirm("是否生成格点报？") == false)
                return;
            var elements = "";
            var doms = $("#div_element").find("button");
            for(var i=0; i<doms.length; i++)
                elements+=doms[i].id+",";
            if(elements.length > 0){
                elements = elements.substr(0, elements.length-1);
                GDYB.GridProductClass.exportToMicaps(null, GDYB.GridProductClass.currentType, elements, GDYB.GridProductClass.currentMakeTime);
            }
        });

        //请求并检查时效
        function checkHourSpan(recall, type, element, datetime){
//            var hourspans = t.yubaoshixiaoTools.numbers;
//            var btnElement = $("#div_element").find("button.active");
//            var element = btnElement.attr("id");
//            var elementName = btnElement[0].innerHTML;
//            cache(recall, element, elementName, hourspans);
            t.updateHourSpanStatus();
            recall&&recall();
        };

        //填值显隐
        $("#buttonDisplayPlot").click(function(){
            if($("#buttonDisplayPlot").hasClass("active")){
                $("#buttonDisplayPlot").removeClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isShowLabel = false;
            }
            else{
                $("#buttonDisplayPlot").addClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isShowLabel = true;
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();
        });
        //填色显隐
        $("#buttonDisplayFill").click(function(){
            if($("#buttonDisplayFill").hasClass("disabled"))
                return;
            if($("#buttonDisplayFill").hasClass("active")){
                $("#buttonDisplayFill").removeClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isShowFillColor = false;
            }
            else{
                $("#buttonDisplayFill").addClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isShowFillColor = true;
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();
        });
        //等值线
        $("#buttonDisplayContour").click(function(){
            if($("#buttonDisplayContour").hasClass("disabled"))
                return;
            if(GDYB.GridProductClass.layerContour == null || GDYB.GridProductClass.layerContour.visibility)
                $("#buttonDisplayContour").removeClass("active");
            else
                $("#buttonDisplayContour").addClass("active");
            GDYB.GridProductClass.layerContour.setVisibility(!GDYB.GridProductClass.layerContour.visibility);
            if(GDYB.GridProductClass.layerContour.visibility && GDYB.GridProductClass.layerContour.features.length == 0){ //可见，但无要素，请求一下
                //GDYB.GridProductClass.addContour(null, GDYB.Page.curPage.map);
                GDYB.GridProductClass.addContour(null, GDYB.Page.curPage.map);
            }

        });
        //色斑图
        $("#buttonDisplayIsoSurface").click(function(){
            if($("#buttonDisplayIsoSurface").hasClass("disabled"))
                return;

            if($("#buttonDisplayIsoSurface").hasClass("active")){
                $("#buttonDisplayIsoSurface").removeClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isSmooth = true;
                GDYB.GridProductClass.layerFillRangeColor.refresh();
            }
            else{
                $("#buttonDisplayIsoSurface").addClass("active");
                GDYB.GridProductClass.layerFillRangeColor.isSmooth = false;
                GDYB.GridProductClass.layerFillRangeColor.refresh();
            }
        });

        //国家站显示
        $("#buttonDisplayNationStation").click(function(){
            // var fillcolors = new FillColors();
            if($("#buttonDisplayNationStation").hasClass("active")){
                $("#buttonDisplayNationStation").removeClass("active");
                GDYB.GridProductClass.layerPlotNationStation.removeAllFeatures();
                GDYB.GridProductClass.layerPlotNationStation.visibility = false;
                // fillcolors.noFill();
            }
            else{
                GDYB.GridProductClass.showStation(function(){
                    if(GDYB.GridProductClass.layerPlotNationStation != null && GDYB.GridProductClass.layerPlotNationStation.visibility && GDYB.GridProductClass.layerPlotNationStation.features.length > 0){
                        $("#buttonDisplayNationStation").addClass("active");
                    }
                    //fillcolors.fill();  //change by fanjb 不再显示行政区划面着色，显示时，地图不能放大缩小
                }, 1);
            }
        });

        //国家站显示 add by pope 20161231
        $("#buttonDisplayNationStationName").click(function(){
            if($("#buttonDisplayNationStationName").hasClass("active")){
                $("#buttonDisplayNationStationName").removeClass("active");
                GDYB.GridProductClass.layerPlotNationStationName.removeAllFeatures();
                GDYB.GridProductClass.layerPlotNationStationName.visibility = false;
            }
            else{
                GDYB.GridProductClass.showStationName(function(){
                    if(GDYB.GridProductClass.layerPlotNationStationName != null && GDYB.GridProductClass.layerPlotNationStationName.visibility && GDYB.GridProductClass.layerPlotNationStationName.features.length > 0){
                        $("#buttonDisplayNationStationName").addClass("active");
                    }
                }, 1);
            }
        });

        //区域站显示
        $("#buttonDisplayLocalStation").click(function(){
            if($("#buttonDisplayLocalStation").hasClass("active")){
                $("#buttonDisplayLocalStation").removeClass("active");
                GDYB.GridProductClass.layerPlotLocalStation.removeAllFeatures();
                GDYB.GridProductClass.layerPlotLocalStation.visibility = false;
            }
            else{
                GDYB.GridProductClass.showStation(function(){
                    if(GDYB.GridProductClass.layerPlotLocalStation != null && GDYB.GridProductClass.layerPlotLocalStation.visibility && GDYB.GridProductClass.layerPlotLocalStation.features.length > 0){
                        $("#buttonDisplayLocalStation").addClass("active");
                    }
                }, 2);
            }
        });

        //乡镇显示
        $("#buttonDisplayTown").click(function(){
            if($("#buttonDisplayTown").hasClass("active")){
                $("#buttonDisplayTown").removeClass("active");
                GDYB.GridProductClass.layerPlotTown.removeAllFeatures();
                GDYB.GridProductClass.layerPlotTown.visibility = false;
            }
            else{
                GDYB.GridProductClass.showStationForecast(function(){
                    if(GDYB.GridProductClass.layerPlotTown != null && GDYB.GridProductClass.layerPlotTown.visibility && GDYB.GridProductClass.layerPlotTown.features.length > 0){
                        $("#buttonDisplayTown").addClass("active");
                    }
                }, 4);
            }
        });

        //高山站显示
        $("#buttonDisplayHighStation").click(function(){
            if($("#buttonDisplayHighStation").hasClass("active")){
                $("#buttonDisplayHighStation").removeClass("active");
                GDYB.GridProductClass.layerPlotHighStaion.removeAllFeatures();
                GDYB.GridProductClass.layerPlotHighStaion.visibility = false;
            }
            else{
                GDYB.GridProductClass.showStation(function(){
                    if(GDYB.GridProductClass.layerPlotHighStaion != null && GDYB.GridProductClass.layerPlotHighStaion.visibility && GDYB.GridProductClass.layerPlotHighStaion.features.length > 0){
                        $("#buttonDisplayHighStation").addClass("active");
                    }
                }, -1, 800);
            }
        });

        //海洋站
        $("#buttonDisplaySeaStation").click(function(){
            if($("#buttonDisplaySeaStation").hasClass("active")){
                $("#buttonDisplaySeaStation").removeClass("active");
                GDYB.GridProductClass.layerPlotSeaStaion.removeAllFeatures();
                GDYB.GridProductClass.layerPlotSeaStaion.visibility = false;
                GDYB.GridProductClass.layerSeaLanes.removeAllFeatures();
                GDYB.GridProductClass.layerSeaLanes.visibility = false;
            }
            else{
                GDYB.GridProductClass.showStationForecast(function(){
                    if(GDYB.GridProductClass.layerPlotSeaStaion != null && GDYB.GridProductClass.layerPlotSeaStaion.visibility && GDYB.GridProductClass.layerPlotSeaStaion.features.length > 0){
                        $("#buttonDisplaySeaStation").addClass("active");
                    }
                }, 5);
                GDYB.GridProductClass.showSeaLanes();
            }
        });

        //添加关注区域，一次添加一个
        $("#buttonAddFocus").click(function(){
            GDYB.GridProductClass.layerFocusArea.visibility = true;
            $("#buttonDisplayFocus").addClass("active");
            openFocusArea();

            GDYB.GridProductClass.drawFocusArea.activate();
            GDYB.GridProductClass.drawLuoqu.deactivate();     //关闭绘制落区
            GDYB.GridProductClass.drawFreePath.deactivate();  //关闭风向订正
            stopDragMap();
            alert("请在地图上绘制关注区域");


            function stopDragMap()
            {
                var map = GDYB.Page.curPage.map;
                //var map = GDYB.Page.curMap;
                for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                    var handler = map.events.listeners.mousemove[i];
                    if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                    {
                        handler.obj.active = false;
                    }
                }
            }
        });

        //显示关注区域
        $("#buttonDisplayFocus").click(function(){
            if($("#buttonDisplayFocus").hasClass("active"))
            {
                GDYB.GridProductClass.layerFocusArea.removeAllFeatures();
                $(this).removeClass("active");
                GDYB.GridProductClass.layerFocusArea.visibility = false;
            }
            else
            {
                openFocusArea();
            }
        });

        function openFocusArea(){
            GDYB.GridProductClass.layerFocusArea.visibility = true;
            GDYB.GridProductClass.showFocusArea(function(){
                if(GDYB.GridProductClass.layerFocusArea != null && GDYB.GridProductClass.layerFocusArea.visibility && GDYB.GridProductClass.layerFocusArea.features.length > 0){
                    $("#buttonDisplayFocus").addClass("active");
                }
            });
        }

        //初始化默认值
        //$("#ec").addClass("active");
        $("#prvn").addClass("active");
        $("#r12").addClass("active");
        // self.initSomething();
        // GDYB.GridProductClass.currentElement = "r12";

        $("#selectYuBaoYuan").empty();
        $("#selectQianFaRen").empty();
        var userName = GDYB.GridProductClass.currentUserName;
        if (!userName){
            alert("请注意，您尚未登录！");
        }
        else {
            /*
            var param = '{"userName":'+userName+'}';
            $.ajax({
                type: 'post',
                url: userServiceUrl + "services/UserService/getForecastor",
                data: {'para': param},
                dataType: 'text',
                error: function () {
                    alert('获取预报员错误!');
                },
                success: function (data) {
                    if(data == "[]"){
                        alert("未查询到预报员");
                    }
                    else{
                        var forecastors = jQuery.parseJSON(data);
                        for(var key in forecastors){
                            var forecastor = forecastors[key];
                            $("#selectYuBaoYuan").append("<option value='" + forecastor.name + "'>" + forecastor.name + "</option>");
                        }
                    }
                }
            });

            $.ajax({
                type: 'post',
                url: userServiceUrl + "services/UserService/getIssuer",
                data: {'para': param},
                dataType: 'text',
                error: function () {
                    alert('获取签发人错误!');
                },
                success: function (data) {
                    if(data == "[]"){
                        alert("未查询到签发人");
                    }
                    else{
                        var issuers = jQuery.parseJSON(data);
                        for(var key in issuers){
                            var issuer = issuers[key];
                            $("#selectQianFaRen").append("<option value='" + issuer.name + "'>" + issuer.name + "</option>");
                        }
                    }
                }
            });*/
        }

        $("#buttonDisplayPlot").addClass("disabled");
        $("#buttonDisplayFill").addClass("disabled");
        $("#buttonDisplayContour").addClass("disabled");
        $("#buttonDisplayIsoSurface").addClass("disabled");

        $(".datetimepicker").css({
            "margin-top":"0px"
        });

		//点击上翻
		t.myDateSelecter.leftBtn.click(function(){
			onChangeDateTime();
		});
		//点击下翻
		t.myDateSelecter.rightBtn.click(function(){
			onChangeDateTime();
		});

        //点击时次
        this.myDateSelecter.input.change(function(){
            onChangeDateTime();
        });

        regesterYuBaoShiXiaoEvent();

        //注册时效点击事件
        function regesterYuBaoShiXiaoEvent(){
            $("#yubaoshixiao").find("td").click(function (event) {
                if(typeof(this.id) != "undefined" && this.id != "")
                    if(GDYB.GridProductClass.currentPost == null) //只适用于格点预报，不适用于数值模式，所以写在GDYBPageClass中判断
                        return;
                t.displayGridProduct();
                clearDisplay();
            });

            //屏蔽预报时效右键菜单，增加自定义菜单
            var divtable = document.getElementById ('yubaoshixiao');
            var tds = $(divtable).find("td");
            for(var key in tds){
                var td = tds[key];
                td.oncontextmenu = function (event)
                {
                    if(this.localName == "td"){
                        hourspanHover = this.innerHTML;
                        $("#divContextMenu").css("display", "block");
                        $("#divContextMenu").css("top", event.pageY+"px");
                        $("#divContextMenu").css("left", event.pageX+"px");
                    }
                    return false;
                };
            }
            // clearDisplay();
        }


        function onChangeDateTime(){
            setForecastTime();
            t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
            regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件 ,改进：可以使用委托，响应未来需要响应的标签

            if(GDYB.GridProductClass.currentPost == null) //只适用于格点预报，不适用于数值模式，所以写在GDYBPageClass中判断
                return;
        }

        //点击制作时间
        $("#selectMakeTime").change(function(){
            var datetime = t.myDateSelecter.getCurrentTimeReal();
            var makeTimeHour = $("#selectMakeTime").val();

            setForecastTime(datetime, makeTimeHour);
            t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
            regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件

            getGridInfosAndUpdateElementStatus();
            GDYB.GridProductClass.dataCache.initInfos();
        });

        function getGridInfosAndUpdateElementStatus(){
            if(GDYB.GridProductClass.currentPost == null) //只适用于格点预报，不适用于数值模式，所以写在GDYBPageClass中判断
                return;
            //获取所有要素
            var elements = [];
            var buttons = $("#div_element").find("button");
            for(var key in buttons){
                if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
                    elements.push(buttons[key].id);
            }
            GDYB.GridProductClass.getGridInfos(function(){
                    t.updateElementStatus();
                }, GDYB.GridProductClass.currentUserDepart.departCode, GDYB.GridProductClass.currentType,
                t.myDateSelecter.getCurrentTime(false), GDYB.GridProductClass.currentVersion, elements);
        }

        //根据制作时间，设置预报时间
        function setForecastTime(datetime, makeTimeHour){
            if(typeof(datetime) == "undefined")
                datetime = t.myDateSelecter.getCurrentTimeReal();
            if(typeof(makeTimeHour) == "undefined")
                makeTimeHour = $("#selectMakeTime").val();
            if(GDYB.GridProductClass.currentType == "prvn"){
                if(makeTimeHour == 5)
                    datetime.setHours(8);
                else
                    datetime.setHours(20);
            }
            else if(GDYB.GridProductClass.currentType == "cty" || GDYB.GridProductClass.currentType == "cnty"){
                if(makeTimeHour == 5 || makeTimeHour == 10)
                    datetime.setHours(8);
                else
                    datetime.setHours(20);
            }
            t.myDateSelecter.setCurrentTime(datetime.format("yyyy-MM-dd hh:mm:ss"));

            datetime.setHours(makeTimeHour);
            GDYB.GridProductClass.currentMakeTime = datetime.format("yyyy-MM-dd hh:mm:ss");
            GDYB.GridProductClass.currentDateTime = t.myDateSelecter.getCurrentTime(false);
        }

        //GridProductClass初始化
        GDYB.GridProductClass.init(function(){
			self.initSomething();
			if ( $.cookie("showName")!=null) {
				GDYB.GridProductClass.currentForecaster=$.cookie("showName");
			}
            $("#div_Port").css("display", "none");
            $("#div_YuBaoYuan").css("display", "none");
            $("#div_YuBaoYuan").css("float", "none");
            $("#div_QianFaRen").css("display", "none");
            $("#option_10").css("display", "none"); //省台不做10点预报
            //初始化制作时间和预报时间
            var dateNow = new Date();
            if(GDYB.GridProductClass.currentMakeTime == null) {
                dateNow.setMinutes(0);
                dateNow.setSeconds(0);
            }
            else{
                var curTimeStr = GDYB.GridProductClass.currentMakeTime;
                var year = parseInt(curTimeStr.replace(/(\d*)-\d*-\d* \d*:\d*:\d*/,"$1"));
                var month = parseInt(curTimeStr.replace(/\d*-(\d*)-\d* \d*:\d*:\d*/,"$1"));
                var day = parseInt(curTimeStr.replace(/\d*-\d*-(\d*) \d*:\d*:\d*/,"$1"));
                var hour = parseInt(curTimeStr.replace(/\d*-\d*-\d* (\d*):\d*:\d*/,"$1"));
                var minutes = 0;
                var seconds = 0;
                dateNow.setFullYear(year,month - 1,day);
                dateNow.setHours(hour, minutes, seconds, 0);
                if(GDYB.GridProductClass.currentPost != null)
                    $("#selectPort").val(GDYB.GridProductClass.currentPost.des);
            }
            if(dateNow.getHours()<=12)
                $("#selectMakeTime").val(5);
            else
                $("#selectMakeTime").val(16);

            var makeTimeHour = $("#selectMakeTime").val();
            setForecastTime(dateNow, makeTimeHour);
			if(GDYB.GridProductClass.currentType == "prvn") {
                GDYB.GridProductClass.currentPost = {min:0, max:216, des:"全部", name:$("#selectPort").val() }; //左开右闭
				GDYB.GridProductClass.currentVersion = "r";
				t.yubaoshixiaoTools.createDom(t.myDateSelecter.getCurrentTimeReal());
				regesterYuBaoShiXiaoEvent(); //由于createDom重构了页面，需要重新注册事件，否则无法响应事件

				getGridInfosAndUpdateElementStatus();
				GDYB.GridProductClass.dataCache.initInfos();
            }
            else
            {
                // $("#div_MoShi").css("display", "none");
                $("#2t").css("display", "none");
                $("#r3").css("display", "none");
                GDYB.GridProductClass.currentPost = {min:0, max:216, des:"全部", name:"首席岗" }; //左开右闭，市台默认就是首席岗，直接审核，并且制作全部时效数据
                GDYB.GridProductClass.currentVersion = "p";
                $("#div_Port").css("display", "none");
                //$("#div_YuBaoYuan").css("margin-left", "40px");
            }
            if(GDYB.GridProductClass.currentType == "prvn" && GDYB.GridProductClass.currentPost == null){
                layer.alert('请选择值班类型', {
                    icon: 3
                    //, time: 2000 //2秒关闭（如果不配置，默认是3秒）
                });
            }

            if(GDYB.GridProductClass.currentType == "prvn") {
                if(GDYB.GridProductClass.currentPost != null){ //第二次切换到该页面，打开显示上次的数据
                    var element = GDYB.GridProductClass.currentElement;
                    $("#div_element").find("button.active").removeClass("active");
                    $("#div_element").find("#"+element).addClass("active");
                    openElement(element, null);
                }
            }
            else{
            }
            getGridInfosAndUpdateElementStatus();
            GDYB.GridProductClass.dataCache.initInfos();

			/**
			 * @author:POPE
			 * @date:2017-05-06
			 * @description:下载市级要素
			 */
			switch (departCodeLen){
				case 4: //GDYB.GridProductClass.dataCache.caches == null
					self.downCityElement(function () {
						self.openElement(function () {
							self.init();
						});
					});
					break;
			}
        });
    };
	/**
	 * @author:POPE
	 * @date:2017-05-08
	 * @description: 初始化某些东西
	 */
	this.initSomething = function () {
		var self = this;
		switch (self.curId){
			case 'gdyb_temp': //陆地-气温
				GDYB.GridProductClass.currentElement = "tmax";
				break;
			case 'land-rain': //陆地-降水
				GDYB.GridProductClass.currentElement = "r12";
				break;
			case 'land-wind': //陆地-大风
				GDYB.GridProductClass.currentElement = "wmax";
				break;
			case 'land-vis': //陆地-能见度
				GDYB.GridProductClass.currentElement = "vis";
				break;
			case 'land-rh': //陆地-相对湿度
				GDYB.GridProductClass.currentElement = "rh";
				break;
			case 'w': //天气
				GDYB.GridProductClass.currentElement = "w";
				break;
			case 'air-pollution': //空气污染
				GDYB.GridProductClass.currentElement = "air";
				break;
			case 'tcc': //云量
				GDYB.GridProductClass.currentElement = "tcc";
				break;
			case 'sea-wind': //海洋-大风
				GDYB.GridProductClass.currentElement = "seawmax";
				break;
			case 'sea-vis': //海洋-能见度
				GDYB.GridProductClass.currentElement = "seavis";
				break;
			case 'sea-rain':  //海洋-降水
				GDYB.GridProductClass.currentElement = "sear12";
				break;
			case 'sea-maxTem': //海洋-日最高温
				GDYB.GridProductClass.currentElement = "seatmax";
				break;
			case 'sea-minTem': //海洋-日最低温
				GDYB.GridProductClass.currentElement = "seatmin";
				break;
		}
		$('#'+GDYB.GridProductClass.currentElement).addClass('active');
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @description: 初始化函数
	 */
    this.init =function () {
		GDYB.GridProductClass.showStation(function(){
			if(GDYB.GridProductClass.layerPlotNationStation && GDYB.GridProductClass.layerPlotNationStation.visibility && GDYB.GridProductClass.layerPlotNationStation.features.length > 0){
				$("#buttonDisplayNationStation").addClass("active");
			}
		}, 1);
		if(GDYB.GridProductClass.layerFillRangeColor){
			$("#buttonDisplayPlot").removeClass("active");
			$("#buttonDisplayFill").removeClass("active");
			GDYB.GridProductClass.layerFillRangeColor.isShowLabel = false;
			GDYB.GridProductClass.layerFillRangeColor.isShowFillColor = false;
			GDYB.GridProductClass.layerFillRangeColor.refresh();
		}
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @callback: callback - 回调函数.
	 * @description: （市台，05和16时）调入省台指导产品（仅数据为空的时效）
	 */
	this.callPRVN = function(callback){
		var maketime =  GDYB.GridProductClass.currentMakeTime;
		var version = GDYB.GridProductClass.currentVersion;
		var forecattime = t.myDateSelecter.getCurrentTime(false);
		if(GDYB.GridProductClass.currentType != "cty")
			return;
		var elements = [];
		var buttons = $("#div_element").find("button");
		for(var key in buttons){
			if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
			{
				var element = buttons[key].id;
				var elementName = buttons[key].innerHTML;
				var dataCache = GDYB.GridProductClass.dataCache.getData(maketime, version, forecattime, element);
				var hourspans = t.getHourSpan(element);
				if(dataCache == null){
					elements.push({element:element, elementName:elementName, hourSpans:hourspans});
				}
				else{
					var hourspansLost = [];
					for(var hKey in hourspans){
						var hourspan = hourspans[hKey];
						if(typeof(dataCache[hourspan]) == "undefined" || dataCache[hourspan].data == null)
							hourspansLost.push(hourspan);
					}
					if(hourspansLost.length != 0)
						elements.push({element:element, elementName:elementName, hourSpans:hourspansLost});
				}
			}
		}

		//递归请求
		var nIndex = -1;
		down();
		function down(){
			nIndex++;
			if(nIndex >= elements.length)
			{
				$.isFunction(callback) && callback.call(null);
				return;
			}
			var e = elements[nIndex];
			var element = e.element;
			var elementName = e.elementName;
			var hourspans = e.hourSpans;
			var date = t.myDateSelecter.getCurrentTime(false);
			var type = "prvn";
			var level = 1000;
			var recalls = [];
			recalls.push(down);
			GDYB.GridProductClass.cache(recalls, type, maketime, date, element, elementName, level, hourspans);
		}
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @callback: callback - 回调函数.
	 * @description:调入（同一次预报的）上一期预报（仅数据为空的时效）,省台:16点，调入10点预报,市台:10点，调入05点预报
	 */
	this.callLast= function(callback){
		//计算（同一次预报的）上一期时间
		var type = GDYB.GridProductClass.currentType;
		var maketime =  GDYB.GridProductClass.currentMakeTime;
		var year = parseInt(maketime.replace(/(\d*)-\d*-\d* \d*:\d*:\d*/, "$1"));
		var month = parseInt(maketime.replace(/\d*-(\d*)-\d* \d*:\d*:\d*/, "$1"));
		var day = parseInt(maketime.replace(/\d*-\d*-(\d*) \d*:\d*:\d*/, "$1"));
		var hour = parseInt(maketime.replace(/\d*-\d*-\d* (\d*):\d*:\d*/, "$1"));
		var makeHour = hour;
		var lastHour = -1;
		switch (type){
			case 'prvn':
				if(makeHour == 16)
					lastHour = 10;
				else{
					$.isFunction(callback) && callback.call(null);
					return;
				}
				break;
			case 'cty':
				if(makeHour == 10)
					lastHour = 5;
				else{
					$.isFunction(callback) && callback.call(null);
					return;
				}
				break;
		}
		var makeTimeLast = year + "-" + (Array(2).join(0)+month).slice(-2) + "-" + (Array(2).join(0)+day).slice(-2) + " " + (Array(2).join(0)+lastHour).slice(-2)+ ":00:00";

		//获取无数据的要素和时次
		var version = GDYB.GridProductClass.currentVersion;
		var forecattime = t.myDateSelecter.getCurrentTime(false);
		var elements = [],buttons;
		if(isLand){
			buttons = $("#div_element").find("button[flag!='sea']");
		}
		else {
			buttons = $("#div_element").find("button[flag='sea']");
		}
		for(var key in buttons){
			if(typeof(buttons[key].id) != "undefined" && buttons[key].id != "")
			{
				var element = buttons[key].id;
				var elementName = buttons[key].innerHTML;
				var dataCache = GDYB.GridProductClass.dataCache.getData(maketime, version, forecattime, element);
				var hourspans = t.getHourSpan(element);
				if(dataCache == null){
					elements.push({element:element, elementName:elementName, hourSpans:hourspans});
				}
				else{
					var hourspansLost = [];
					for(var hKey in hourspans){
						var hourspan = hourspans[hKey];
						if(typeof(dataCache[hourspan]) == "undefined" || dataCache[hourspan].data == null)
							hourspansLost.push(hourspan);
					}
					if(hourspansLost.length != 0)
						elements.push({element:element, elementName:elementName, hourSpans:hourspansLost});
				}
			}
		}
		//递归请求
		var nIndex = -1;
		down();
		function down(){
			nIndex++;
			if(nIndex >= elements.length)
			{
				$.isFunction(callback) && callback.call(null);
				return;
			}
			var e = elements[nIndex];
			var element = e.element;
			var elementName = e.elementName;
			var hourspans = e.hourSpans;
			var level = 1000;

			var recalls = [];
			recalls.push(down);
			GDYB.GridProductClass.cache(recalls, type, makeTimeLast, forecattime, element, elementName, level, hourspans, "p"); //这里必须是审核发布版
		}
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @callback: callback - 回调函数.
	 * @description:打开要素
	 */
	this.openElement = function (callback) {
		var self = this;
		var element = GDYB.GridProductClass.currentElement || 'tmax';
		switch (GDYB.GridProductClass.currentType){
			case 'prvn':
				if($("#selectMakeTime").val() == 16){
					self.callLast(function(){
						GDYB.GridProductClass.getGridInfo(function () {
							self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
							$.isFunction(callback) && callback.call(null);
						}, GDYB.GridProductClass.currentUserDepart.departCode, self.productType, element, self.myDateSelecter.getCurrentTime(false));
					});
				}
				else{
					GDYB.GridProductClass.getGridInfo(function () {
						self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
						$.isFunction(callback) && callback.call(null);
					}, GDYB.GridProductClass.currentUserDepart.departCode, self.productType, element, self.myDateSelecter.getCurrentTime(false));
				}
				break;
			default:
				GDYB.GridProductClass.getGridInfo(function(){
					self.checkHourSpan(self.displayGridProduct, self.productType, element, self.myDateSelecter.getCurrentTime(false));
					$.isFunction(callback) && callback.call(null);
				}, GDYB.GridProductClass.currentUserDepart.departCode ,self.productType, element, self.myDateSelecter.getCurrentTime(false));
				break;
		}
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @callback: callback - 回调函数.
	 * @description:请求并检查时效
	 */
	this.checkHourSpan= function(callback, type, element, datetime){
		var self = this;
		self.updateHourSpanStatus();
		$.isFunction(callback) && callback.call(null);
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @callback: callback - 回调函数.
	 * @description:下载市级要素
	 */
    this.downCityElement = function (callback) {
    	var self = this,element = {
			yuBaoSource: self.yuBaoSource, //prvn
			elements: ['tmax','tmin','2t','r12','r3'],
			elementNames: ['日最高温','日最低温','气温','日降水量','降水量']
		};
		self.downElements(element,callback);
	};
	/**
	 * @author:POPE
	 * @date:2017-05-06
	 * @param: {Object} arrElement - 要素集合.
	 * @callback: callback - 回调函数.
	 * @description:下载要素
	 */
	this.downElements = function(arrElement, callback) {
		var elements = arrElement.elements,elementNames = arrElement.elementNames,nIndex = -1;
		//递归请求
		down();
		function down() {
			nIndex++;
			//全部请求完成
			if (nIndex >= elements.length) {
				$.isFunction(callback) && callback.call(null);
				return;
			}
			var element = elements[nIndex],
				elementName = elementNames[nIndex],
				hourspans = t.getHourSpan(element),
				date = t.myDateSelecter.getCurrentTime(false),
				type = arrElement.yuBaoSource || GDYB.GridProductClass.currentType,
				maketime = GDYB.GridProductClass.currentMakeTime,
				level = 1000,
				version = 'p',
				recalls = [];
			recalls.push(down);
			GDYB.GridProductClass.cache(recalls, type, maketime, date, element, elementName, level, hourspans,version);
		}
	};

    //检查合理性
    this.CheckReasonable = function (recall) {
        var nIndex = -1;
        CheckRelation();
        function CheckRelation(){
            nIndex++;
            if(nIndex >= CrossRelation.length){
                recall&&recall();
                return;
            }
            var relation = CrossRelation[nIndex];
            if(relation.reasonable){
                var elementSrc = relation.src;
                var element = relation.target;
                console.log("检查合理性：" + elementSrc+"-->"+element+" 一致");
                CheckRelation(); //递归
            }
            else{
                //交叉订正
                var elementSrc = relation.src;
                var element = relation.target;
                console.log("检查合理性：" + elementSrc+"-->"+element+" 不一致");
                var makeTime = GDYB.GridProductClass.currentMakeTime;
                var dateTime = GDYB.GridProductClass.currentDateTime;
                var version =  GDYB.GridProductClass.currentVersion;
                if(GDYB.GridProductClass.dataCache) {
                    if (elementSrc == "r12" && element == "r3") {
                        var elementTarget = "r3";
                        var elementNameTarget = "降水量";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([function () {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            var cc = new CrossCorrection();
                            cc.cal(CheckRelation, elementSrc, elementTarget);
                        }
                    }

                    if ((elementSrc == "tmax" || elementSrc == "tmin")  && element == "2t") {
                        var elementAnother = elementSrc == "tmax" ? "tmin" : "tmax";
                        var elementNameAnother = elementAnother == "tmax" ? "日最高气温" : "日最低气温";
                        var elementTarget = element;
                        var dataCacheAnother = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheAnother == null) {
                            GDYB.GridProductClass.getGrids([crossCorrection_2t], elementAnother, elementNameAnother, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementAnother), makeTime, version, dateTime);
                        }
                        else {
                            crossCorrection_2t();
                        }

                        function crossCorrection_2t() {
                            var elementTarget = "2t";
                            var elementNameTarget = "气温";
                            var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                            if (dataCacheTarget == null) {
                                GDYB.GridProductClass.getGrids([function () {
                                    var cc = new CrossCorrection();
                                    cc.cal(CheckRelation, elementSrc, elementTarget);
                                }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                            }
                            else {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }
                        };
                    }

                    if (elementSrc == "wmax" && element == "10uv") {
                        var elementTarget = "10uv";
                        var elementNameTarget = "风";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([function () {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            var cc = new CrossCorrection();
                            cc.cal(CheckRelation, elementSrc, elementTarget);
                        }
                    }

                    if (elementSrc == "10uv"  && element == "wmax") {
                        var elementTarget = "wmax";
                        var elementNameTarget = "日最大风";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([function () {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            var cc = new CrossCorrection();
                            cc.cal(CheckRelation, elementSrc, elementTarget);
                        }
                    }

                    if (elementSrc == "r3"  && element == "r12") {
                        var elementTarget = "r12";
                        var elementNameTarget = "日降水量";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([function () {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);

                                //打破合理性
                                for (var key in CrossRelation) {
                                    var relation = CrossRelation[key];
                                    if (relation.src == "r12" && relation.target == "w") {
                                        relation.reasonable = false;
                                    }
                                }
                            }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            var cc = new CrossCorrection();
                            cc.cal(CheckRelation, elementSrc, elementTarget);

                            //打破合理性
                            for (var key in CrossRelation) {
                                var relation = CrossRelation[key];
                                if (relation.src == "r12" && relation.target == "w") {
                                    relation.reasonable = false;
                                }
                            }
                        }
                    }

                    if (elementSrc == "r3"  && element == "tcc") {
                        var elementTarget = "tcc";
                        var elementNameTarget = "云量";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([function () {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            var cc = new CrossCorrection();
                            cc.cal(CheckRelation, elementSrc, elementTarget);
                        }
                    }

                    if (elementSrc == "2t"  && (element == "tmax" || element == "tmin")) {
                        var elementTarget = "tmax";
                        var elementTargetName = "日最高气温";
                        var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                        if (dataCacheTarget == null) {
                            GDYB.GridProductClass.getGrids([crossCorrection_tmax_tmin], elementTarget, elementTargetName, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                        }
                        else {
                            crossCorrection_tmax_tmin();
                        }

                        function crossCorrection_tmax_tmin() {
                            var elementTarget = "tmin";
                            var elementNameTarget = "日最低气温";
                            var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                            if (dataCacheTarget == null) {
                                GDYB.GridProductClass.getGrids([function () {
                                    var cc = new CrossCorrection();
                                    cc.cal(CheckRelation, elementSrc, elementTarget);
                                }], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                            }
                            else {
                                var cc = new CrossCorrection();
                                cc.cal(CheckRelation, elementSrc, elementTarget);
                            }
                        };
                    }

                    if((elementSrc == "tcc" || elementSrc == "r12") && element=="w") {
                        var elementSrcName = "";
                        if (elementSrc == "tcc")
                            elementSrcName = "云量";
                        else if (elementSrc == "r12")
                            elementSrcName = "日降水量";
                        var maketime = GDYB.GridProductClass.currentMakeTime;
                        var version = GDYB.GridProductClass.currentVersion;
                        var dataCache = GDYB.GridProductClass.dataCache;
                        var currentDateTime = dateTime;
                        var dataCacheTCC = dataCache.getData(maketime, version, currentDateTime, "tcc");
                        if (dataCacheTCC == null){
                            alert("交叉订正：请先下载云量。");
                            CheckRelation();
                        }
                        else {
                            var dataCacheR12 = dataCache.getData(maketime, version, currentDateTime, "r12");
                            if (dataCacheR12 == null)
                                alert("交叉订正：请先下载日降水量。");
                            else {
                                var elementTarget = "w";
                                var elementNameTarget = "天气现象";
                                var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                                if (dataCacheTarget == null) {
                                    GDYB.GridProductClass.getGrids([correctWeather], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                                }
                                else {
                                    correctWeather();
                                }

                                function correctWeather() {
                                    var cc = new CrossCorrection();
                                    cc.cal(CheckRelation, elementSrc, elementTarget);
                                }
                            }
                        }
                    }
                    //add by pope on 20161029 雨量和相对湿度关联，>=中雨时，相对湿度低于80的，提到75-80
                    if(elementSrc == "r3" && element=="rh") {
                        var maketime = GDYB.GridProductClass.currentMakeTime;
                        var version = GDYB.GridProductClass.currentVersion;
                        var dataCache = GDYB.GridProductClass.dataCache;
                        var currentDateTime = dateTime;
                        var dataCacheR3 = dataCache.getData(maketime, version, currentDateTime, "r3");
                        if (dataCacheR3 == null){
                            alert("交叉订正：请先下载降雨量。");
                            CheckRelation();
                        }
                        else {
                            var dataCacheRH = dataCache.getData(maketime, version, currentDateTime, "rh");
                            if (dataCacheRH == null)
                                alert("交叉订正：请先下载相对湿度。");
                            else {
                                var elementTarget = "rh";
                                var elementNameTarget = "相对湿度";
                                var dataCacheTarget = GDYB.GridProductClass.dataCache.getData(makeTime, version, dateTime, elementTarget);
                                if (dataCacheTarget == null) {
                                    GDYB.GridProductClass.getGrids([correctRH], elementTarget, elementNameTarget, GDYB.GridProductClass.currentType, "1000", t.getHourSpan(elementTarget), makeTime, version, dateTime);
                                }
                                else {
                                    correctRH();
                                }

                                function correctRH() {
                                    var cc = new CrossCorrection();
                                    cc.cal(CheckRelation, elementSrc, elementTarget);
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /*
     * 如果格点产品存在，则直接打开；
     * 如果格点产品没有，点击调入模式才能打开
     * 外部需要调用（SideWrapper.js）
     * */
    this.displayGridProduct = function(fromModel) {
        //var btnModel = $("#div_model").find("button.active");
        //var btnType = $("#div_type").find("button.active");
        var btnElement = $("#div_element").find("button.active"),element,elementName;
		var type = t.productType;//btnType.attr("id");
        if(btnElement[0]){
			element = btnElement.attr("id");
			elementName = btnElement[0].innerHTML;
		}
		else{
			element = 'tmax';
			elementName = '日最高温';
		}
        var maketime = GDYB.GridProductClass.currentMakeTime;
        var version = GDYB.GridProductClass.currentVersion;
        var datetime = t.myDateSelecter.getCurrentTime(false);
        var hourSpan = t.yubaoshixiaoTools.hourSpan;
        var level = 1000;
        if(!type || !element || !hourSpan)
            return;

        if(!GDYB.GridProductClass.dataCache) //未下载（缓存），不允许显示和编辑
            return;

        if(GDYB.GridProductClass.datasetGridInfos == null && GDYB.GridProductClass.datasetGridInfos.length > 0)
            GDYB.GridProductClass.getGridInfo(null, type, element, datetime);

        //获取上一次效
        var i=0;
        for(i; i<t.yubaoshixiaoTools.numbers.length; i++){
            if(t.yubaoshixiaoTools.numbers[i] == hourSpan)
                break;
        }
        var hourspanLast = 0;
        if(i>0)
            hourspanLast = t.yubaoshixiaoTools.numbers[i-1];

        //多选时效的处理
        var tds = $(".yubaoshixiao_table").find("td.active");
        if(tds.length > 1) //是否多选
        {
            //以-1特殊时效为标记，符合到当前流程中
            hourSpan = -1;
            //组合：计算累计值
            var hourSpans = [];
            var dg = GDYB.GridProductClass.createDatasetGrid(maketime, version, datetime, element, hourSpan);
			var num = 0;
            for(var key=0;key<tds.length;key++){
                var hour = Number($(tds[key]).html());
                if(isNaN(hour))
                    continue;
                getEachGrid(hour);
            }
            function getEachGrid(hour){
                GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element, hour, function(dataCache){
                    if(dataCache != null && dataCache.data != null){
                        var dgTemp = dataCache.data;
                        for(var i=0;i<dg.rows; i++){
                            for(var j=0;j<dg.cols; j++){
                                if(dgTemp.getValue(0, j, i) != dgTemp.noDataValue)
                                    dg.setValue(0, j, i, Math.round((dg.getValue(0, j, i) + dgTemp.getValue(0, j, i))*10.0)/10.0);
                            }
                        }
                        hourSpans.push(hour);
                    }
                    num++;
                    if(num == tds.length){
                        GDYB.GridProductClass.dataCache.setDataStatus(maketime, version, datetime, element, hourSpan, 0,dg); //更新状态
                        var caches = GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element);
                        caches[hourSpan].hourSpans = hourSpans; //增加时效集合属性，以便后续拆分
                        displayGridDetail();
                    }
                });
            }
        }
        else //上次是否多选
        {
            var isExit = GDYB.GridProductClass.dataCache.CheckFileExit(maketime, version, datetime, element, -1);
            if(!isExit) {
                GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element, -1,function(dataCache){
                    if (dataCache != null && dataCache.data != null) {
                        //拆分：计算分时值
                        var dg = dataCache.data;
                        var rows = dg.rows;
                        var cols = dg.cols;
                        var hourSpans = dataCache.hourSpans;
                        //1.遍历各时效，记录所有的目标数据集
                        var arrayDataset = [];
                        var arrayHours = [];
                        var numY = 0;
                        var numX = 0;
                        for (var key in hourSpans) {
                            var hour = hourSpans[key];
                            getEachTargetGrid(hour);
                            numY ++;
                        }
                        function getEachTargetGrid(hour){
                            GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element, hour,function(dataCacheHourSpan){
                                if (dataCacheHourSpan != null && dataCacheHourSpan.data != null) {
                                    arrayDataset.push(dataCacheHourSpan.data);
                                    arrayHours.push(hour);
                                }
                                numX++;
                                if(numX == numY){
                                    crossDetail();
                                }
                            });
                        }

                        function crossDetail(){
                            //2.计算累计值，存到数组中。如果是降水计算累计值，气温和风计算极值，请参考“交叉订正”
                            var arryTotalValues = [];
                            if (true) //应该是element为降水、日降水
                            {
                                for (var i = 0; i < rows; i++) {
                                    var arrayTotalValueRow = [];
                                    for (var j = 0; j < cols; j++) {
                                        var dValueTotal = 0.0;
                                        for (var dd = 0; dd < arrayDataset.length; dd++) {
                                            var dgTemp = arrayDataset[dd];
                                            var dValueTemp = dgTemp.getValue(0, j, i);
                                            if (dValueTemp != dgTemp.noDataValue && dValueTemp >= 0)
                                                dValueTotal += dValueTemp;
                                        }
                                        arrayTotalValueRow.push(dValueTotal);
                                    }
                                    arryTotalValues.push(arrayTotalValueRow);
                                }
                            }

                            //3.遍历所有数据集，更新格点值
                            if (arrayDataset.length > 0) {
                                for (var d = 0; d < arrayDataset.length; d++) {
                                    var dgTarget = arrayDataset[d];
                                    if (dgTarget != null) {
                                        for (var i = 0; i < rows; i++) {
                                            for (var j = 0; j < cols; j++) {
                                                //5.获取当前值
                                                var dValue = dgTarget.getValue(0, j, i);
                                                var dValueSrc = dg.getValue(0, j, i);
                                                if (dValueSrc == dg.noDataValue || dValue == dgTarget.noDataValue) //如果日雨量为无效值，或者当前格点没有降水，则不订正逐时雨量
                                                {
                                                }
                                                else if (dValue == 0.0) {
                                                    var dValueTotal = arryTotalValues[i][j];
                                                    if (dValueTotal == 0.0) {
                                                        dgTarget.setValue(0, j, i, Math.round(dValueSrc / arrayDataset.length * 10.0) / 10.0); //如果逐3小时降水都为0，则均分12小时降水
                                                    }
                                                }
                                                else {
                                                    var dValueTotal = arryTotalValues[i][j];
                                                    if (dValueTotal == 0.0) //如果都没有降水
                                                    {
                                                    }
                                                    else {
                                                        if (dValueSrc != dValueTotal) //如果它们相同，原则上说明没有订正过，无需计算。从数学角度看，也无需计算
                                                        {
                                                            dgTarget.setValue(0, j, i, Math.round(dValueSrc * dValue / dValueTotal * 10.0) / 10.0); //7.计算目标值，并赋值
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GDYB.GridProductClass.dataCache.setDataStatus(maketime, version, datetime, element, arrayHours[d], dataCache.status,dgTarget); //更新状态
                                    }
                                }
                            }
                            delete dataCache.data;
                            displayGridDetail();
                        }
                    }
                    else{
                        displayGridDetail();
                    }
                });
            }
            else{
                displayGridDetail();
            }
        }

        function displayGridDetail(){
            $("#buttonDisplayPlot").addClass("disabled");
            $("#buttonDisplayFill").addClass("disabled");
            $("#buttonDisplayContour").addClass("disabled");
            $("#buttonDisplayIsoSurface ").addClass("disabled");
            GDYB.GridProductClass.displayGridProduct(function(){

                //显示等值线
                if (GDYB.GridProductClass.layerContour.visibility) {
                    GDYB.GridProductClass.addContour(function () {
                        if (GDYB.GridProductClass.layerContour.visibility) {
                            if (GDYB.GridProductClass.layerContour.features.length == 0) {
                                $("#buttonDisplayContour").removeClass("active");
                                $("#buttonDisplayContour").addClass("disabled");
                            }
                            else {
                                $("#buttonDisplayContour").removeClass("disabled");
                                $("#buttonDisplayContour").addClass("active");
                            }
                        }
                        else {
                            $("#buttonDisplayContour").removeClass("disabled");
                        }
                    }, GDYB.Page.curPage.map); //GDYB.Page.curPage.map
                }
                else {
                    $("#buttonDisplayContour").removeClass("disabled");
                }

                if(GDYB.GridProductClass.layerFillRangeColor.visibility)
                {
                    if(GDYB.GridProductClass.layerFillRangeColor.grid != null &&
                        GDYB.GridProductClass.layerFillRangeColor.grid.length == 0)
                    {
                        $("#buttonDisplayPlot").removeClass("active");
                        $("#buttonDisplayPlot").addClass("disabled");
                        $("#buttonDisplayFill").removeClass("active");
                        $("#buttonDisplayFill").addClass("disabled");
                    }
                    else
                    {
                        $("#buttonDisplayPlot").removeClass("disabled");
                        if(GDYB.GridProductClass.layerFillRangeColor.isShowLabel)
                            $("#buttonDisplayPlot").addClass("active");
                        $("#buttonDisplayFill").removeClass("disabled");
                        if(GDYB.GridProductClass.layerFillRangeColor.isShowFillColor)
                            $("#buttonDisplayFill").addClass("active");
                    }
                }
                else
                {
                    $("#buttonDisplayPlot").removeClass("disabled");
                    $("#buttonDisplayFill").removeClass("disabled");
                }

                if(GDYB.GridProductClass.layerFillRangeColor != null){
                    if(GDYB.GridProductClass.layerFillRangeColor.visibility){
                        if (GDYB.GridProductClass.layerFillRangeColor.datasetGrid == null || GDYB.GridProductClass.layerFillRangeColor.datasetGrid.grid == null) {
                            $("#buttonDisplayIsoSurface").removeClass("active");
                            $("#buttonDisplayIsoSurface").addClass("disabled");
                        }
                        else {
                            if(GDYB.GridProductClass.layerFillRangeColor.isSmooth){
                                $("#buttonDisplayIsoSurface").removeClass("disabled");
                                $("#buttonDisplayIsoSurface").removeClass("active");
                            }
                            else {
                                $("#buttonDisplayIsoSurface").removeClass("disabled");
                                $("#buttonDisplayIsoSurface").addClass("active");
                            }
                        }
                    }
                    else{
                        $("#buttonDisplayIsoSurface").removeClass("disabled");
                    }
                }
                clearDisplay();
            }, type, level, element, maketime, version, datetime, hourSpan, fromModel, elementName, hourspanLast);
        }
    }

    this.bindBtnEvents = function(){
        var t = this;
        //创建可拖拽面板
        $("#fx").click(function(){
            if(!t.myPanel_FXDZ){
                t.myPanel_FXDZ = new Panel_FXDZ($("#map_div"));
            }
            else{
                t.myPanel_FXDZ.show();
            }
        });
        $("#qs").click(function(){
            if(!t.myPanel_QSDZ){
                t.myPanel_QSDZ = new Panel_QSDZ($("body"));
            }
            else{
                t.myPanel_QSDZ.show();
            }
            //t.myPanel_QSDZ.initChart();
        });
        $("#qh").click(function(){
            if(!t.myPanel_QHDZ){
                t.myPanel_QHDZ = new Panel_QHDZ($("#map_div"));
            }
            else{
                t.myPanel_QHDZ.show();
            }
        });
        $("#lq").click(function(){
            if(!t.myPanel_LQDZ){
                t.myPanel_LQDZ = new Panel_LQDZ($("#map_div"));
            }
            else{
                t.myPanel_LQDZ.show();
            }
        });
    };

    //更新时效状态
     this.updateHourSpanStatus = function(){
        var hourspans = t.yubaoshixiaoTools.numbers;
        var maketime = GDYB.GridProductClass.currentMakeTime;
        var date = t.myDateSelecter.getCurrentTime(false);
        var version = GDYB.GridProductClass.currentVersion;
        var btnElement = $("#div_element").find("button.active");
        var element = btnElement.attr("id");
        var bContain = false;
        var dataCaches = GDYB.GridProductClass.dataCache.getData(maketime, version, date, element);
        if(dataCaches != null){
            for(var i=0; i<hourspans.length; i++){
                var hourspan = hourspans[i];
                var dataCache = dataCaches[hourspan];
                if(dataCache == null || dataCache.data == null || dataCache.status == -1) { //无数据
                    $("#yubaoshixiao").find("#" + hourspan + "h").addClass("disabled");
                }
                else{
                    $("#yubaoshixiao").find("#" + hourspan + "h").removeClass("disabled");

                    if(dataCache.status == 1){ //已修改
                        $("#yubaoshixiao").find("#"+hourspan+"h").addClass("modified");
                        $("#yubaoshixiao").find("#" + hourspan + "h").removeClass("disabled"); //如果复制过来，可能从无到有
                    }
                    else if(dataCache.status == 2){ //已提交
                        $("#yubaoshixiao").find("#"+hourspan+"h").addClass("saved");
                    }
                    else if(dataCache.status == 4){ //已（提交并）主观订正
                        $("#yubaoshixiao").find("#"+hourspan+"h").addClass("subjective");
                    }
                }
                if(hourspan == t.yubaoshixiaoTools.hourSpan)
                    bContain = true;
            }
        }
        if(!bContain)
        {
            t.yubaoshixiaoTools.hourSpan = hourspans[0];
        }
        $("#yubaoshixiao").find("#"+t.yubaoshixiaoTools.hourSpan+"h").addClass("active");
    };

    //更新要素按钮（提交）状态：下载和提交时更新
    this.updateElementStatus = function(){
        var t = this;
        var btns = $("#div_element").find("button");
        //var element = btnElement.attr("id");
        for(var i=0;i<$(btns).length;i++){
            var btn =  btns[i];
            var element = $(btn).attr("id");
            //获取产品状态（判断是否已提交）
            try {
                var type = GDYB.GridProductClass.currentType;
                var maketime = GDYB.GridProductClass.currentMakeTime;
                var version = GDYB.GridProductClass.currentVersion;
                var datetime = GDYB.GridProductClass.currentDateTime;
                var hourSpans = t.getHourSpan(element);
                var saved = true;
                //var dataCaches = GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element);
                //if(dataCaches != null){
                    for (var j = 0; j < hourSpans.length; j++) {
                        var hourSpan = hourSpans[j];
                        if(GDYB.GridProductClass.currentPost.min <=hourSpan && hourSpan<=GDYB.GridProductClass.currentPost.max){
                            var gridinfo = GDYB.GridProductClass.getGridInfoFromCache(type, element, datetime, hourSpan);
                            //var dataCache = dataCaches[hourSpan];
                            //if(gridinfo == null || typeof(gridinfo.userName) == "undefined" || gridinfo.userName == "" || dataCache == null || dataCache.data == null){
                            if(gridinfo == null || typeof(gridinfo.userName) == "undefined" || gridinfo.userName == ""){
                                saved = false;
                                break;
                            }
                        }
                    }
                    $(btn).removeClass("saved");
                    if (saved)
                        $(btn).addClass("saved");
                //}
            }
            catch(err)
            {
                alert(err.message);
            }
        }
    };

    /*
     * 调入数值模式（该要素所有时效）
     * */
    this.callModels = function(modelType, maketime, version, totalHourSpan){
        var btnElement = $("#div_element").find("button.active");
        var element = btnElement.attr("id");
        var elementName = btnElement[0].innerHTML;
        var hourspans = t.getHourSpan(element);
        var level = 1000;
        var type = t.productType;
        var datetime = GDYB.GridProductClass.currentDateTime;
        var recalls = [];
        recalls.push(this.updateHourSpanStatus);
        recalls.push(this.displayGridProduct);
        recalls.push(function(msg){
            if(typeof(msg) != "undefined") {
                $("#div_modal_confirm_content").html(msg);
                $("#div_modal_confirm").modal();
                $("#div_modal_confirm").find("a").unbind();
            }
        });
        if(typeof(totalHourSpan) != "undefined"){
            var count = hourspans.length;
            for(var i=count-1; i>=0; i--){
                if(hourspans[i] > totalHourSpan)
                    hourspans.splice(i, 1);
            }
        }
        GDYB.GridProductClass.callModels(recalls, type, maketime, version, datetime, element, elementName, level, hourspans, modelType);
    };

    /*
    * 调入数值模式（全部要素所有时效）
    * modelType：模式类型
    * defaultSchemes：初始场缺省方案（如果defaultSchemes有值，以它为准）
    * */
    this.callModelsAll = function(modelType, defaultSchemes, maketime, version, totalHourSpan) {
        var elements = [];
        var elementNames = [];
        if (isLand)
		{
			var buttons = $("#div_element").find("button[flag='land']");
			for (var key in buttons) {
				var id=buttons[key].id;
				if (typeof(id) != "undefined" && id != "" ) {
					elements.push(buttons[key].id);
					elementNames.push(buttons[key].innerHTML);
				}
			}
		}else{
			var buttons = $("#div_element").find("button[flag='sea']");
			for (var key in buttons) {
				var id=buttons[key].id;
				if (typeof(id) != "undefined" && id != "" &&id.indexOf("sea")>0) {
					elements.push(buttons[key].id);
					elementNames.push(buttons[key].innerHTML);
				}
			}
		}


        //递归请求
        var nIndex = -1;
        var messages = "";
        callModels();

        function callModels(message) {
            nIndex++;
            if (typeof(message) != "undefined"){
                messages += message + "<br/>";
            }
            if (nIndex >= elements.length) //请求完成
            {
                if (messages.length > 0) {
                    if(modelType == "nn"){
                        messages = "（济南指导报只有日最高温、日最低温和气温）<br/>" + messages;
                        $("#div_modal_confirm_content").html(messages);
                        $("#div_modal_confirm").modal();
                        $("#div_modal_confirm").find("a").unbind();
                    }
                    else{
                        messages += "是否根据默认方案和要素间关联初始化？<br/>";
                        $("#div_modal_confirm_content").html(messages);
                        $("#div_modal_confirm").modal();
                        $("#div_modal_confirm").find("a").unbind();
                        $("#div_modal_confirm").find("a").click(function(){
                            if(typeof(this.id) != "undefined"){
                                if(this.id == "btn_ok")
                                {
                                    $("#div_progress_title").html("正在处理要素间的关联...");
                                    $("#div_progress").css("display", "block");
                                    setTimeout(function() {
                                        checkDataCache(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime);
                                        $("#div_progress").css("display", "none");
                                    },1000);
                                }
                            }
                        });
                    }
                }
                return;
            }
            var element = elements[nIndex];
            var elementName = elementNames[nIndex];
            var hourspans = t.getHourSpan(element);
            var datetime = GDYB.GridProductClass.currentDateTime;
            var level = 1000;
            var type = t.productType;
            var recalls = [];
            recalls.push(callModels);

            if(modelType == "nn" && element != "tmax" && element != "tmin" && element != "2t"){
                callModels();
                return;
            }

            //匹配要素-模式方案
            if (typeof(defaultSchemes) != "undefined" && defaultSchemes != null && defaultSchemes.length > 0) {
                var makeTime = GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* (\d*):\d*:\d*/, "$1") + ":" + GDYB.GridProductClass.currentMakeTime.replace(/\d*-\d*-\d* \d*:(\d*):\d*/, "$1");
                for (var key in defaultSchemes) {
                    var scheme = defaultSchemes[key];
                    if (scheme.type == GDYB.GridProductClass.currentType && scheme.makeTime == makeTime && scheme.element == GDYB.GridProductClass.currentElement) {
                        modelType = scheme.model;
                        break;
                    }
                }
            }
            if (typeof(totalHourSpan) != "undefined") {
                var count = hourspans.length;
                for (var i = count - 1; i >= 0; i--) {
                    if (hourspans[i] > totalHourSpan)
                        hourspans.splice(i, 1);
                }
            }

            GDYB.GridProductClass.callModels(recalls, type, maketime, version, datetime, element, elementName, level, hourspans, modelType);
        }

        function checkDataCache(maketime, version, datetime) {
            var msg = "";

            //默认方案处理空气污染和能见度等空值
            for (var key in elements) {
                var element = elements[key];
                var elementName = elementNames[key];
                if(element != "air" && element != "vis")
                    continue;
                var hourSpans = t.getHourSpan(element);
                if (typeof(totalHourSpan) != "undefined")
                    spliceHourSpan(hourSpans, totalHourSpan);

                if (t.isNullElement(element)) {
                    t.createDataCache(maketime, version, datetime, element, hourSpans);
                    msg += elementName + "<br/>";
                }
            }

            //交叉订正
            //气温-->日最高、最低
            var isNull2T = t.isNullElement("2t");
            if(!isNull2T){
                var isNullTMAX = t.isNullElement("tmax");
                var isNullTMIN = t.isNullElement("tmin");
                if(isNullTMAX && isNullTMIN){
                    var hourSpans = t.getHourSpan("tmax");
                    if (typeof(totalHourSpan) != "undefined")
                        spliceHourSpan(hourSpans, totalHourSpan);
                    t.createDataCache(maketime, version, datetime, "tmax", hourSpans);
                    t.createDataCache(maketime, version, datetime, "tmin", hourSpans);

                    //打破合理性
                    for (var key in CrossRelation) {
                        var relation = CrossRelation[key];
                        if (relation.src == "2t" && relation.target == "tmax") {
                            relation.reasonable = false;
                        }
                        if (relation.src == "2t" && relation.target == "tmin") {
                            relation.reasonable = false;
                        }
                    }
                    msg += "日最高温<br/>";
                    msg += "日最低温<br/>";
                }
            }

            //日雨量+云量-->天气
            var isNullR12 = t.isNullElement("r12");
            var isNullTCC = t.isNullElement("tcc");
            if(!isNullR12 && !isNullTCC){
                var isNullW = t.isNullElement("w");
                if(isNullW){
                    var hourSpans = t.getHourSpan("w");
                    if (typeof(totalHourSpan) != "undefined")
                        spliceHourSpan(hourSpans, totalHourSpan);
                    t.createDataCache(maketime, version, datetime, "w", hourSpans);

                    //打破合理性
                    for (var key in CrossRelation) {
                        var relation = CrossRelation[key];
                        if (relation.src == "r12" && relation.target == "w") {
                            relation.reasonable = false;
                        }
                        if (relation.src == "tcc" && relation.target == "w") {
                            relation.reasonable = false;
                        }
                    }
                    msg += "天气现象<br/>";
                }
            }

            //风-->日最大风
            var isNull10UV = t.isNullElement("10uv");
            if(!isNull10UV){
                var isNullWMAX = t.isNullElement("wmax");
                if(isNullWMAX){
                    var hourSpans = t.getHourSpan("wmax");
                    if (typeof(totalHourSpan) != "undefined")
                        spliceHourSpan(hourSpans, totalHourSpan);
                    t.createDataCache(maketime, version, datetime, "wmax", hourSpans);

                    //打破合理性
                    for (var key in CrossRelation) {
                        var relation = CrossRelation[key];
                        if (relation.src == "10uv" && relation.target == "wmax") {
                            relation.reasonable = false;
                        }
                    }
                    msg += "日最大风<br/>";
                }
            }

            t.CheckReasonable(function(){
                if(msg != "") {
                    $("#div_modal_confirm_content").html("已通过默认方案和要素间关联，初始化要素：<br/>"+msg);
                    $("#div_modal_confirm").modal();
                    $("#div_modal_confirm").find("a").unbind();
                }
            });
        }

        function spliceHourSpan(hourSpans, totalHourSpan){
            var count = hourSpans.length;
            for (var i = count - 1; i >= 0; i--) {
                if (hourSpans[i] > totalHourSpan)
                    hourSpans.splice(i, 1);
            }
        }
    };

    this.createDataCache = function(maketime, version, datetime, element, hourSpans){
        for (var j = 0; j < hourSpans.length; j++) {
            var hourSpan = hourSpans[j];
            var dataCaches = GDYB.GridProductClass.dataCache.getData(maketime, version, datetime, element);
            if (dataCaches==null || dataCaches[hourSpan] == null || dataCaches[hourSpan].data == null) {
                var datasetGrid = GDYB.GridProductClass.createDatasetGrid(maketime, version, datetime, element, hourSpan);
                //GDYB.GridProductClass.dataCache.addData(maketime, version, datetime, element, hourSpan, datasetGrid, 0);
            }
        }
    };

    this.isNullElement = function(element){
        var isNull = true;
        var hourSpans = this.getHourSpan(element);
        for (var j = 0; j < hourSpans.length; j++) {
            var hourSpan = hourSpans[j];
            var dataCaches = GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element);
            if (dataCaches != null && dataCaches[hourSpan] != null && dataCaches[hourSpan].data != null) {
                isNull = false;
                break;
            }
        }
        return isNull;
    };

    this.getHourSpan = function(element){
        var hourspans = null;
        if(element == "r12" || element == "sear12" || element == "w" || element == "wmax"){
            if (GDYB.GridProductClass.isCty){
                if (element == "r12"){
                    hourspans = [12,24,36,48,60,72];
                }else{
                    hourspans = [24,48,72];
                }
            }else{
                hourspans = [12,24,36,48,60,72,84,96,108,120,132,144,156,168,180,192,204,216];
            }
        }
        else if(element == "tmax" || element == "tmin" ||element == "seatmax" || element == "seatmin" || element =="seawmax" || element == "air"){
            if (GDYB.GridProductClass.isCty){
                hourspans = [24,48,72];
            }else{
                hourspans = [24,48,72,96,120,144,168,192,216];
            }
        }
        else if(element=="rh2h"){
            hourspans=[2];
        }
        else if(element=="rh6h"){
            hourspans=[6];
        }
        else if(element=="dsbb"||element=="dsleid"||element=="dsqjs"||element=="dswind"||element=="bb"||element=="leid"||element=="qjs"||element=="wind"){
            hourspans = [1,2,3,4,5,6,7,8,9,10,11,12];
        }
        else{
            hourspans = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,192,195,198,201,204,207,210,213,216];
        }
        return hourspans;
    };
}
// 清除显示方式 add by pope on 20161228
function clearDisplay() {
    //国家站
    if($("#buttonDisplayNationStation").hasClass("active")){
        // GDYB.GridProductClass.layerPlotNationStation.removeAllFeatures();
        // GDYB.GridProductClass.layerPlotNationStation.visibility = false;
        // fillcolors.noFill();
        // GDYB.GridProductClass.showStation(function(){
        //     if(GDYB.GridProductClass.layerPlotNationStation != null && GDYB.GridProductClass.layerPlotNationStation.visibility && GDYB.GridProductClass.layerPlotNationStation.features.length > 0){
        //     }
        //     fillcolors.fill();
        // }, 1);
        // var fillcolors = new FillColors();
        // fillcolors.noFill();
        // fillcolors.fill();
    }
    //区域站
    if($("#buttonDisplayLocalStation").hasClass("active")){
        GDYB.GridProductClass.layerPlotLocalStation.removeAllFeatures();
        GDYB.GridProductClass.layerPlotLocalStation.visibility = false;
        GDYB.GridProductClass.showStation(function(){
            if(GDYB.GridProductClass.layerPlotLocalStation != null && GDYB.GridProductClass.layerPlotLocalStation.visibility && GDYB.GridProductClass.layerPlotLocalStation.features.length > 0){
            }
        }, 2);
    }
    //乡镇点
    if($("#buttonDisplayTown").hasClass("active")){
        GDYB.GridProductClass.layerPlotTown.removeAllFeatures();
        GDYB.GridProductClass.layerPlotTown.visibility = false;
        GDYB.GridProductClass.showStationForecast(function(){
            if(GDYB.GridProductClass.layerPlotTown != null && GDYB.GridProductClass.layerPlotTown.visibility && GDYB.GridProductClass.layerPlotTown.features.length > 0){
            }
        }, 4);
    }
    //高山站
    if($("#buttonDisplayHighStation").hasClass("active")){
        GDYB.GridProductClass.layerPlotHighStaion.removeAllFeatures();
        GDYB.GridProductClass.layerPlotHighStaion.visibility = false;
        GDYB.GridProductClass.showStation(function(){
            if(GDYB.GridProductClass.layerPlotHighStaion != null && GDYB.GridProductClass.layerPlotHighStaion.visibility && GDYB.GridProductClass.layerPlotHighStaion.features.length > 0){
            }
        }, -1, 800);
    }
    //海洋站
    if($("#buttonDisplaySeaStation").hasClass("active")){
        GDYB.GridProductClass.layerPlotSeaStaion.removeAllFeatures();
        GDYB.GridProductClass.layerPlotSeaStaion.visibility = false;
        GDYB.GridProductClass.layerSeaLanes.removeAllFeatures();
        GDYB.GridProductClass.layerSeaLanes.visibility = false;
        GDYB.GridProductClass.showStationForecast(function(){
            if(GDYB.GridProductClass.layerPlotSeaStaion != null && GDYB.GridProductClass.layerPlotSeaStaion.visibility && GDYB.GridProductClass.layerPlotSeaStaion.features.length > 0){
            }
        }, 5);
        GDYB.GridProductClass.showSeaLanes();
    }
}
GDYBPageClass.prototype = new PageBase();
