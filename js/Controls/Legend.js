/**
 * Legend.js 图例控件
 * Created by zouwei on 2015-11-12.
 */
function Legend(){
	this.update = function(styles){
		var strLegendItem = "";
		var strLegendItemText = "";
		var items=[]; //把原始的颜色存起来
		for(var key in styles){
			var style = styles[key];
			var value = Math.floor(style.end*10)/10;
			var visible = "true";
			var rgb = "rgb("+ style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")";
			items.push(rgb);
			if(typeof(style.visible) != "undefined" && !style.visible)
			{
				rgb = "rgb(255, 255, 255)";
				visible = "false";
			}
			var strvalue = value;
			if(typeof(style.legend) != "undefined")
				strvalue = style.legend;
			if(typeof(style.tag) != "undefined")
				strLegendItem+="<div class='item' style='cursor:pointer;background-color:" + rgb + "' visible='"+ visible +"' key='"+key +"' val='"+value +"' tag='"+style.tag+"'>"+strvalue+"</div>";
			else
				strLegendItem+="<div class='item' style='cursor:pointer;background-color:" + rgb + "' visible='"+ visible +"' key='"+key +"' val='"+value+"'>"+strvalue+"</div>";
		}
		$("#div_legend_items").html(strLegendItem);
		//$("#div_legend_itemTexts").html(strLegendItemText);

		//注册点击事件
		$("#div_legend_items").find("div").click(function(){
			var key = Number($(this).attr("key"));
			var legenItemValue = Number($(this).attr("val"));
			var legenItemTag = $(this).attr("tag");
			var bvisible = typeof(this.attributes["visible"]) == "undefined" || this.attributes["visible"].value == "true";
			if(bvisible)
			{
				$(this).css("background-color", "rgb(255, 255, 255)");
				$(this).attr("visible", "false");
			}
			else
			{
				var rgb = items[key];
				$(this).css("background-color", rgb);
				$(this).attr("visible", "true");
			}

			for(var key in styles) {
				var style = styles[key];
				var value = Math.floor(style.end * 10) / 10;
				if(value == legenItemValue)
				{
					if(typeof(legenItemTag) == "undefined") {
						style["visible"] = !bvisible;
						break;
					}
					else if(style.tag == legenItemTag){
						style["visible"] = !bvisible;
						break;
					}
				}
			}
			if(GDYB.GridProductClass.layerFillRangeColor != null){
				GDYB.GridProductClass.layerFillRangeColor.refresh();
			}
			if(GDYB.Page.curPage.map.getLayersByName("AQILayer")[0] != null){
				GDYB.Page.curPage.map.getLayersByName("AQILayer")[0].refresh();
			}
		});
	};
}
