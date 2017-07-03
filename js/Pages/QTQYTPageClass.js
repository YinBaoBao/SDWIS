/**
 * Created by Administrator on 2016/7/5.
 */

function QTQYTPageClass(){
    var t = this;
    this.renderMenu = function() {
        var htmlStr = "<div id='div_type' class=''><div class='title1'>风云</div>"
            + "<div id='div_Station'>"
            + "</div>"
            + "</div>";
        $("#menu_bd").html(htmlStr);
        t.myDateSelecter = new DateSelecter();
        $("#dateSelect").append(t.myDateSelecter.div);
    }
}
QTQYTPageClass.prototype = new PageBase();