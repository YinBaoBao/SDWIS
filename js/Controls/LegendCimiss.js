/**
 * Cimiss图例控件
 * Copy by Dnn on 2017-04-20.
 */
function LegendCimiss(){
    this.update = function(styles){
		//获取最大/小样式索引
		function getIndex (styles,hold) {
			for (var i in styles){
				var realValue = Math.floor(styles[i].end*10)/10;
				if(realValue*1 > hold*1){
					return i;
				}
			}
			return -1;
		}
		var range = [];
		for(var index in fnColors.CimissData){
			range.push(fnColors.CimissData[index][showName]*1);
		}
		if(range.length < 1){
			return;
		}
		range = dmt.NumberSort(range);
		var vMin = Math.floor(range[0]*10)/10;
		var vMax = Math.ceil(range[range.length-1]*10)/10;
		var minIndex = (getIndex(styles,vMin)-1)|| 0;
		var maxIndex = 0;
		if(styles != null){
			maxIndex = getIndex(styles,vMax)>-1?(getIndex(styles,vMax)):(styles.length-1)
		}
        var strLegendItem = "";
        var strLegendItemText = "";
        var items=[]; //把原始的颜色存起来
		var displaySpace = [];
		var displaySpaceIndex = [];
        for(var key in styles){
            var style = styles[key];
            var value = Math.floor(style.end*10)/10;
			var rgb = "rgb("+ style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")";
			items.push(rgb);
			if((key >= minIndex*1) && (key <= maxIndex*1)){
				var visible = "true";
				rgb = "rgb("+ style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")";
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
				displaySpace.push(value);
				displaySpaceIndex.push(key);
			}
        }
        $("#displaySpace").val(displaySpace);
        $("#displaySpaceIndex").val(displaySpaceIndex);
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
            //GDYB.GridProductClass.layerFillRangeColor.refresh();
            m_layerFillRangeColor.refresh();
        });
    };

	this.showLegendItem =  function showLegend(element, caption, visible, styles, order,itemName) {
		if(element == "WIN_S_Max_24h" || element == "WIN_S_Inst_Max_24h") {
			element = element.split("_24h")[0];
		}
		if(typeof(visible) == 'undefined' || typeof(styles) == 'undefined' || visible == "hidden" || styles == null){
			$("#mapLegend").css("visibility", "hidden");
			return;
		}
		var indexs = [];
		var values = [];
		//图例选择器
		function SubLegend(arrayObj,oStyle){
			//获取最大/小样式索引
			function getIndex (styles,hold) {
				for (var i in styles){
					var realValue = Math.floor(styles[i].end*10)/10;
					if(realValue*1 > hold*1){
						return i;
					}
				}
				return -1;
			}
			var range = [];
			for(var index in arrayObj){
				range.push(arrayObj[index][element]*1);
			}
			if(range.length < 1){
				return;
			}
			range = dmt.NumberSort(range);
			var vMin = Math.floor(range[0]*10)/10;
			var vMax = Math.ceil(range[range.length-1]*10)/10;
			var minIndex = getIndex(oStyle,vMin)|| 0;
			var maxIndex = 0;
			if(oStyle != null){
				maxIndex = getIndex(oStyle,vMax)>-1?(getIndex(oStyle,vMax)):(oStyle.length-1)
			}
			var lStyle = [];
			for(var x = minIndex*1;x <= maxIndex*1;x++){
				lStyle.push(oStyle[x]);
				indexs.push(x);
				values.push(oStyle[x].start);
			}
			return lStyle;
		}
		var realStyle = [];
		if( !(styles == null || styles == "")){
			realStyle = SubLegend(fnColors.CimissData,styles);
		}else{
			$("#mapLegend").empty().css("visibility", "hidden");
			return;
		}
		if (visible != "hidden") {
				var htmlL = "<div class='LegendTitle'><span>" + caption + "</span></div>";
				var num = 0;
				var top, minValue, maxValue, colorArr, colors, style, bw;
				var ks,js = 0;
				//判断用那个方法解析样式文件
				if (typeof(realStyle[0].start) == "undefined") {
					switch (order) {
						case "desc":
							for (var j = 0; j < realStyle.length - 1; j++) {
								minValue = realStyle[j][0];
								maxValue = realStyle[j][1];
								colorArr = realStyle[j][2];
								top = (j + 1) * 23;
								for (var m in colorArr) {
									if (m == "fillColor") {
										colors = objs[m];
									}
								}
								if (maxValue == "999") {
									bw = ">" + minValue;
								}
								else {
									bw = minValue + "~" + maxValue;
								}
								htmlL += "<div style='top:" + top + "px;color:#8D1A53;'><i style='background-color:" + colors + ";'></i><span>" + bw + "</span></div>";
							}
							break;
						default:
							for (var j = realStyle.length - 1; j >= 0; j--) {
								minValue = realStyle[j][0];
								maxValue = realStyle[j][1];
								colorArr = realStyle[j][2];
								top = (num + 1) * 23;
								num++;
								for (var m in colorArr) {
									if (m == "fillColor") {
										colors = objs[m];
									}
								}
								if (maxValue == "999") {
									bw = ">" + minValue;
								}
								else {
									bw = minValue + "~" + maxValue;
								}
								htmlL += "<div style='top:" + top + "px;color:#8D1A53;'><i style='background-color:" + colors + ";'></i><span>" + bw + "</span></div>";
							}
							break;
					}

				}else {
					switch (order) {
						case "desc":
							for (var i = realStyle.length - 1; i >= 0; i--) {
								style = realStyle[i];
								top = (num + 1) * 23;
								++num;
								if(itemName=="caption")
								{
									bw=style.caption;
								}
								else
								{
									minValue = style.start;
									maxValue = style.end;
									if (maxValue == "999") {
										bw = ">" + minValue;
									}
									else {
										bw = minValue + "~" + maxValue;
									}
								}
								colors = rgbToHex(style.startColor["red"].toString(), style.startColor["green"].toString(), style.startColor["blue"].toString());
								htmlL += "<div style='top:" + top + "px;color:#8D1A53;'><i style='background-color:" + colors + ";'></i><span>" + bw + "</span></div>";
							}
							break;
						default:
							for (var i in realStyle) {
								style = realStyle[i];
								top = (num + 1) * 23;
								++num;
								if(itemName=="caption") {
									bw=style.caption;
								}
								else
								{
									minValue = style.start;
									maxValue = style.end;
									if (maxValue == "999") {
										bw = ">" + minValue;
									}
									else {
										bw = minValue + "~" + maxValue;
									}
								}
								colors = rgbToHex(style.startColor["red"].toString(), style.startColor["green"].toString(), style.startColor["blue"].toString());
								console.log(colors);
								htmlL += "<div style='top:" + top + "px;color:#8D1A53;'><i style='background-color:" + colors + ";'></i><span>" + bw + "</span></div>";
							}
							break;
					}
				}
				$("#mapLegend").html(htmlL);
				$("#mapLegend").css("height", top + 25);
				$("#mapLegend").css("visibility", visible);
		}else {
			$("#mapLegend").css("visibility", visible);
		}
		$("#displaySpace").val(values);
		$("#displaySpaceIndex").val(indexs);
	}
	var rgbToHex = function(r,g,b) {
		var hex = "#";
		hex += ("0" + Number(r).toString(16)).slice(-2);
		hex += ("0" + Number(g).toString(16)).slice(-2);
		hex += ("0" + Number(b).toString(16)).slice(-2);
		return hex;
	}
}
