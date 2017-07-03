/*
* 预报时效工具
* by zouwei, 2015-05-10
* */
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
	if(e.button == 2)
		return;
	if(e.srcElement.type == "textarea")
		return;
	winInfoDrag=o;
	document.all?winInfoDrag.setCapture():window.captureEvents(Event.MOUSEMOVE);
	var left = $(winInfoDrag).css("left");
	var top = $(winInfoDrag).css("top");
	b=e.clientX-parseInt(left);
	c=e.clientY-parseInt(top);
};
function YuBaoshixiaoTools(div, startDate, type,hourspans){//div:容器
    this.div = div;
    this.type = type;
    this.hourSpan;
    this.supportMultiSelect = false; //是否支持多选
    //数字数组
    if(hourspans!=undefined){
        this.numbers=hourspans;
    }
    else{
        this.numbers = [12,24,36,48,60,72,84,96,108,120,132,144,156,168,180,192,204,216];
    }
    //创建dom元素
    this.createDom = function(date){
        var t = this;
        this.div.html("");
        if(typeof(this.type)=="undefined" || this.type==0) {
            var title = $("<div style='display:none'>预报时效</div>").addClass("title1").appendTo(this.div);
            var h2008 = "<div style='margin-left: 6px;color: #9191CC;'><table style='text-align: right;'><tbody style=''><tr><td style='width: 60px;'>20时</td><td style='width: 60px;'>23时</td><td style='width: 60px;'>02时</td><td style='width: 60px;'>05时</td><td style='width: 60px;'>08时</td></tr></tbody></table></div>";
            var h0820 = "<div style='margin-left: 6px;color: #9191CC;'><table style='text-align: right;'><tbody style=''><tr><td style='width: 60px;'>08时</td><td style='width: 60px;'>11时</td><td style='width: 60px;'>14时</td><td style='width: 60px;'>17时</td><td style='width: 60px;'>20时</td></tr></tbody></table></div>";

            //计算小时，分为前12小时和后12小时两段
            var h12ago = "";
            var h12after = "";
            var startHour = date.getHours();
            h12ago+="<div style='margin-left: 6px;color: #9191CC;'><table style='text-align: right;'><tbody style=''><tr>";
            h12after+="<div style='margin-left: 6px;color: #9191CC;'><table style='text-align: right;'><tbody style=''><tr>";
            for(var h=0; h<=12; h+=3){
                var hour = startHour+h;
                if(hour>=24)
                    hour-=24;
                var hour12 = startHour+h+12;
                if(hour12>=24)
                    hour12-=24;
                h12ago+="<td style='width: 60px;'>"+(Array(2).join(0)+hour).slice(-2)+"时</td>";
                h12after+="<td style='width: 60px;'>"+(Array(2).join(0)+hour12).slice(-2)+"时</td>";
            }
            h12ago+="</tr></tbody></table></div>";
            h12after+="</tr></tbody></table></div>";

            //显示前12小时
            $(h12ago).appendTo(this.div);

            //显示日期
            if (typeof(date) != "undefined") {
                var t = this;
                var div = $("<div>").attr("style", "float:left;").appendTo(this.div);
                var tb = $("<table border=1 cellPadding=0 cellSpacing=0>").addClass("yubaoshixiao_table_day").appendTo(div);
                var tdHeight = 20;
                if (startHour < 12) {
                    var curTr = $("<tr>").appendTo(tb);
                    var day = date.getDay();
                    day = getWeek(day);
                    var td = $("<td>").attr("height", tdHeight).html(date.getDate() + "日 " + day).appendTo(curTr);
                }
                for (var i = 0; i < this.numbers.length; i++) {
                    if (i == 0 || this.numbers[i - 1] % 24 == 0) {
                        var curTr = $("<tr>").appendTo(tb);
                        date = date.addDays(1);
                        var day = date.getDay();
                        day = getWeek(day);
                        var delta = (this.numbers[this.numbers.length - 1]-this.numbers[i])>24?2:1;
                        var td = $("<td>").attr("height", tdHeight * delta).html(date.getDate() + "日 " + day).appendTo(curTr);
                    }
                }
            }

            //显示时效
            var div = $("<div>").attr("style", "").appendTo(this.div);
            var tb = $("<table id='table_yubaoshixiao' tabindex='2' border=1 cellPadding=0 cellSpacing=0>")
                .addClass("yubaoshixiao_table").appendTo(div);
            for (var i = 0; i < this.numbers.length; i++) {
                var delta = this.numbers[i] - (i == 0 ? 0 : this.numbers[i - 1]);
                var colspan = delta > 12 ? 12 : delta;
                var tdWidth = delta > 12 ? 12 * 20 : delta * 20;
                //if(delta==3){
                //    colspan = 12;
                //    tdWidth = 240;
                //}
                if (this.numbers[i] % 12 == delta || delta == 12 && this.numbers[i] % 12 == 0 || delta == 24) {
                    var curTr = $("<tr>").appendTo(tb);
                }
                var t = this;
                var td = $("<td>").attr("id", this.numbers[i] + "h").attr("colspan", colspan).css("width", tdWidth).html(this.numbers[i]).appendTo(curTr).click(function (event) {
                	//if($(this).hasClass("disabled"))
                    	//return;
                    if(t.supportMultiSelect) {
                        if (!event.ctrlKey && !event.shiftKey)
                            $(".yubaoshixiao_table").find("td.active").removeClass("active");
                        if (event.shiftKey) {
                            var hourEnd = Number($(this).html());
                            var tdActiveFirst = $("#table_yubaoshixiao").find("td.active")[0];
                            var hourStart = Number($(tdActiveFirst).html());
                            var hour = hourStart;
                            var delta = Math.abs(hourEnd - hourStart) / (hourEnd - hourStart);
                            while (hour != hourEnd && hour >= 0 && hour <= 216) {
                                hour += delta;
                                var td = $("#table_yubaoshixiao").find("#" + hour + "h")[0];
                                if (typeof(td) != "undefined")
                                    $(td).addClass("active");
                            }
                        }
                        else
                            $(this).addClass("active");
                        t.clickHandle($(this).html());
                    }
                    else{
                        $(".yubaoshixiao_table").find("td.active").removeClass("active");
                        $(this).addClass("active");
                        t.clickHandle($(this).html());
                    }
                });
                if (delta == 24){
                    td.css("height", "40px");
                }
            }

            //显示后12小时
            $(h12after).appendTo(this.div);
        }
        else if(this.type == 1) //用于格点预报展示页面
        {
            var div = $("<div>").attr("style", "").appendTo(this.div);
            var tb = $("<table id='table_yubaoshixiao' tabindex='2' border=1 cellPadding=0 cellSpacing=0>")
                .addClass("yubaoshixiao_table").appendTo(div);
            var maxCols = 20; //一排最多放20项
            var rows = Math.ceil(this.numbers.length/maxCols);
            var cols = (this.numbers.length<maxCols)?this.numbers.length:maxCols;
            var totalWidth = parseInt($("#"+this.div[0].id).css("width"))-2;
            var tdWidth = totalWidth/cols;
            for (var i = 0; i < this.numbers.length; i++) {
                if (i%maxCols==0) {
                    var curTr = $("<tr>").appendTo(tb);
                }
                var td = $("<td>").attr("id", this.numbers[i] + "h").css("width", tdWidth).html(this.numbers[i]).appendTo(curTr).click(function () {
                    if($(this).hasClass("disabled"))
                        return;
                    $(".yubaoshixiao_table").find("td.active").removeClass("active");
                    $(this).addClass("active");
                    t.clickHandle($(this).html());
                });
            }
        }
    };

    //点击事件
    this.clickHandle = function(number){
        this.hourSpan = number;
    };

    this.createDom(startDate);

    function getWeek(day) {
        if (day == 0)
            day = "周日";
        else if (day == 1)
            day = "周一";
        else if (day == 2)
            day = "周二";
        else if (day == 3)
            day = "周三";
        else if (day == 4)
            day = "周四";
        else if (day == 5)
            day = "周五";
        else if (day == 6)
            day = "周六";
        return day;
    }
}
