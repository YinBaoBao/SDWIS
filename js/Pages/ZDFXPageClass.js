/**
 * add by wangkun on 2017/03/29
 * title:诊断分析
 */
function ZDFXPageClass(){
	this.className = "ZDFXPageClass";
	var t = this;
	t.MyTime=null;
    	this.renderMenu = function() {
    	$("#menu_bd").html(`
			<div id="currentNav"></div><div class="btitle"></div>
    		<div class="datetime">
			<div id="dateSelect"></div>
		</div>
		<span>诊断分析</span>
    	`);
    	var sr=new SmallRadar();
    	sr.Initi("map_div");
    	var paneltool=new Panel_Tools($("#map_div"));
    	$("#Panel_Tools").addClass("delete");
    	InitEvent();
    	/**
	 * @author:wangkun
	 * @date:2017-03-29
	 * @param:
	 * @return:
	 * @description:初始化事件
	 */
	function InitEvent(){
		t.MyTime=new DateSelecter(1, 1); //最小视图为分钟
		t.MyTime.intervalMinutes = 6; //6分钟
		$("#dateSelect").append(t.MyTime.div);
	}
    }
}
ZDFXPageClass.prototype = new PageBase();
