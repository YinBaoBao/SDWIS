/**
 * 融合监测
 * Created by POPE on 2016/9/14.
 */
function Panel_RHJC(div){
    this.div = div;
    this.panel ="";
}
Panel_RHJC.prototype = new DragPanelBase();
var fnRHJC = Panel_RHJC.prototype;
fnRHJC.createPanelDom = function() {
    this.panel = $("<div id=\"Panel_RHJC\" class='panelToolRHJC' >"
        //+"<div class=\"title\"><span id='rhjc_title'>融合监测</span></div>"
        +"<div class=\"title\"><span id='rhjc_title'>融合监测</span><a class=\"closeBtn\">△</a></div>"
        +"<div class=\"body\">"
        +"<div id='ystjContent' class='ystjContent'></div>"
        +"<div id='menu_bd2'></div>"
        +"</div>"
        +"</div></div>").appendTo(this.div);
    var dlybcommonclass =new DLYBCommonClass();
    dlybcommonclass.renderQTQSKPanelDom("#ystjContent");//渲染强天气实况面板
    dlybcommonclass.renderLDYTPanelDom("#menu_bd2");//渲染雷达云图面板
}



