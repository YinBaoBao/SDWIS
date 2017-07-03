/**
 * Created by zouwei on 2016/3/7.
 * modify by wangkun on 2016/10/10
 */
Date.prototype.addDays = function(day){
    return this.addHours(day * 24);
};
Date.prototype.addHours = function(hour){
    return this.addMinutes(60*hour);
};
Date.prototype.addMinutes = function(minute){
    return this.addSeconds(minute*60);
};
Date.prototype.addSeconds = function(second){
    return this.add(second * 1000);
};
Date.prototype.add = function(milliseconds){
    var m = this.getTime() + milliseconds;
    return new Date(m);
};
Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}
/*Array扩展 start*/
function ArrayIsContain(srcA,targetA){
    var i = srcA.length;
    while (i--) {
        if (srcA[i] === targetA) {
            return true;
        }
    }
    return false;
}
/*Array扩展 end*/
function alertFuc(content){
    $("#map_alert_div").html(content);

    if($("#map_alert_div").css("display") == "none") {
        $("#map_alert_div").css("display", "block");

        var int = self.setInterval(function(){
            tickcount++;
            var left = 45 + tickcount;
            $("#map_alert_div").css("left", left + "%");
            if (left >= 55) {
                clearInterval(int);
                $("#map_alert_div").css("display", "none");
            }
        }, 100);
        var tickcount = 0;
        function moveAlert() {

        }
    }
}
function getGridServiceUrl(strDateTime){
    var url = gridServiceUrl;
    try{
        var dtNowTime = new Date();
        var dtDateTime = new Date(strDateTime.replace(/-/g,"/"));
        var days = (dtNowTime.getTime() - dtDateTime.getTime())/(24 * 60 * 60 * 1000);
        url = days<7?gridServiceUrl:gridServiceUrl_his;
    }
    catch(err) {
        alertFuc(err.message);
    }
    return url;
}
//短时预报完成绘制
function drawDSCompleted() {
    var element=GDYB.GridProductClass.currentElement;
    var hourspan=GDYB.GridProductClass.currentHourSpan;
    var hourspanTotal=GDYB.GridProductClass.currentHourSpan;
    var maketime=GDYB.GridProductClass.currentMakeTime;
    var datetime=GDYB.GridProductClass.currentDateTime;
    var version=GDYB.GridProductClass.currentVersion;
    var val=GDYB.GridProductClass.currentGridValue==null?GDYB.GridProductClass.currentGridValueDown:GDYB.GridProductClass.currentGridValue;
    if (GDYB.GridProductClass.layerLuoqu.features.length > 0) {
        var feature = GDYB.GridProductClass.layerLuoqu.features[GDYB.GridProductClass.layerLuoqu.features.length-1];
        var geoRegion = feature.geometry;
        GDYB.GridProductClass.fillRegion(GDYB.GridProductClass.datasetGrid, geoRegion,val, 3, GDYB.GridProductClass.currentElementName, false);
        GDYB.GridProductClass.layerFillRangeColor.refresh();
    }
    GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
    GDYB.GridProductClass.dataStack.push(GDYB.GridProductClass.datasetGrid);
    GDYB.GridProductClass.dataCache.setDataStatus(maketime, version, datetime, element, hourspan, 1,GDYB.GridProductClass.datasetGrid); //更新状态
}
function GetMapImg(){
    var map = GDYB.Page.curPage.map;
    var size = map.getCurrentSize();
    var memCanvas = document.createElement("canvas");
    memCanvas.width = size.w;
    memCanvas.height = size.h;
    memCanvas.style.width = size.w+"px";
    memCanvas.style.height = size.h+"px";
   var memContext = memCanvas.getContext("2d");
   for(var i = 0; i<map.layers.length; i++){
        if(typeof(map.layers[i].canvasContext) != "undefined") {
                var layerCanvas = map.layers[i].canvasContext.canvas;
                memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
        }
        else if(typeof(map.layers[i].renderer) != "undefined" && typeof(map.layers[i].renderer.canvas) != "undefined"){
            if(typeof(map.layers[i].renderer.canvas) == "undefined")
                continue;
            var layerCanvas = map.layers[i].renderer.canvas.canvas;
            memContext.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height);
        }
    }
    var img = new Image();
    img.src = memCanvas.toDataURL("image/png");
    return img;
}
//反演成文字
function convertToText(recall){
    var areas = [];
    var areaCode=GDYB.GridProductClass.currentUserDepart.departCode;
    var level=GDYB.GridProductClass.currentType;
    var datasetGrid=GDYB.GridProductClass.datasetGrid;
    var elements=GDYB.GridProductClass.layerFillRangeColor.items;
    var url=gridServiceUrl+"services/AdminDivisionService/getChildDivisionInfo";
    $.ajax({
        data: {"para": "{areaCode:'"+areaCode+"',level:'"+level+"'}"},
        url: url,
        dataType: "json",
        type: "POST",
        success: function (data) {
            var strContent="";
            if(typeof(data) != "undefined" && data.length>0)
            {
                for(var key in data)
                {
                    var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(JSON.parse(data[key]));
                    feature.geometry.calculateBounds();
                    areas.push(feature);
                }
                for (var keyOfElement in elements) {
                    if(keyOfElement==0)
                        continue;
                    var strArea = "";
                    for (var key in areas) {
                        var feature = areas[key];
                        if (GDYB.GridProductClass.contain(datasetGrid, feature.geometry, elements[keyOfElement].start))
                            strArea += feature.attributes["NAME"] + "、";
                    }
                    if (strArea.length > 0) {
                        strArea = strArea.substr(0, strArea.length - 1);
                        if (strContent.length > 0)
                            strContent += "，"
                        strContent += strArea + "等地将出现" + elements[keyOfElement].caption;
                    }
                }
                var date = new Date();
                if(strContent==""){
                    strContent="无预警信息。"
                }
                else{
                    var maketime =  date.getFullYear() + "年" + (Array(2).join(0)+(date.getMonth()+1)).slice(-2) + "月" + (Array(2).join(0)+date.getDate()).slice(-2) + "日" + (Array(2).join(0)+date.getHours()).slice(-2) + "时" + (Array(2).join(0)+date.getMinutes()).slice(-2)+"分";
                    strContent = GDYB.GridProductClass.currentUserDepart.departName + maketime + "发布临近预报：预计未来2小时，"+strContent+"。请注意防范。";
                }
                recall&&recall(strContent);
            }
        },
        error: function(e){
            alert("获取行政区划边界失败："+ e.statusText);
        }
    });
}
//add by fanjibing 增加权限验证，判断当前机器IP和用户是否有相应的权限
function checkLoginAndAuthority(authority){
	var password=$.cookie("password");
	if (password==null)
	{
		showLogin();
		return false;
	}else{
		/*暂时不开启机器验证*/
		return true;
		var access = $.cookie("access");
		if (access && access.indexOf(authority)>=0){
			return true;
		}else{
			alert("对不起，你机器IP没有访问相应的权限，请联系管理员。");
			return false;
		}
	}
}
var loginSucessHandle=null;
var redirectUrl="";
//主要用于导航页验证跳转
function checkLoginAndOpenUrl(authority,url){
	redirectUrl=url;
	var password=$.cookie("password");
	if (password==null)
	{
		loginSucessHandle=function(){
			window.location.href=redirectUrl;
		}
		showLogin();
		return false;
	}else{
		window.location.href=url;
		/*暂时不开启机器验证*/
		return true;
		var access = $.cookie("access");
		if (access && access.indexOf(authority)>=0){
			return true;
		}else{
			alert("对不起，你机器IP没有访问相应的权限，请联系管理员。");
			return false;
		}
	}
}
//弹出式登录框
function showLogin(){
	$("#loginPanel").css("display","block");
}
function closeLogin(){
	$("#loginPanel").css("display","none");
}
function login(){
	var userName = $("#userName").val();
	var password = $("#password").val();
	var param = '{"userName":'+userName+',"password":'+password+'}';
	$.ajax({
		type: 'post',
		url: basicUserUrl + "/UserService/login",
		data: {'para': param},
		dataType: 'text',
		error: function () {
			alert('登录出错!');
		},
		success: function (data) {
			if(data == "[]"){
				alert("用户名或密码错误");
			}
			else{
				var user = jQuery.parseJSON(data);
				m_user = user[0];
				if ($("#ck_rmbUser")[0].checked) {
					$.cookie("rmbUser", "true", { expires: 60 }); //存储一个带60天期限的cookie
				}
				else {
					$.cookie("rmbUser", "false", { expire: -1 });
				}
				$.cookie("userName", m_user.userName, { expires: 60 });
				$.cookie("showName", m_user.showName, { expires: 60 });
				$.cookie("password", password, { expires: 60 });
				$.cookie("departCode", m_user.DepartCode, { expires: 60 });
				$.cookie("departName", m_user.DepartName, { expires: 60 });
				$.cookie("access", (m_user.access==""?"GDYB,DLYB,YBZZ,SHYJ":m_user.access), { expires: 60 }); //根据机器IP可以访问的模块
				$("#loginPanel").css("display","none");
				/*
				if (GDYB&&GDYB.GridProductClass)
				{
					GDYB.GridProductClass.currentUserName = m_user.userName;
				}*/ 
				if(typeof($("#span_user")[0]) != "undefined" && typeof($("#a_exit")[0]) != "undefined"){
					$("#span_user")[0].innerHTML =m_user.DepartName+'-'+m_user.showName;
					$("#a_exit")[0].innerHTML = "退出";
				}
				loginSucessHandle&&loginSucessHandle();
			}
		}
	});
}//end login
