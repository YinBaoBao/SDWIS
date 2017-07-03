/*
* 格点订正工具
* by zouwei 2015-05-10
* */
function Panel_Tools(div){
    this.div = div;
    this.m_activeTool = null;
    this.brushSize = 5; //画刷大小
    this.dgLast = null; //上次编辑的格点，用于实现橡皮擦功能

    this.inputRangeDigitValue = null;
    this.inputRangeDigitAdd = null;
    this.inputRangeDigitIncrement = null;

    this.counties = null;
    this.CountyId =[];

    this.hasAddStampMouseWheelEvent = false; //是否已经添加盖章鼠标滚轮事件
    this.map = GDYB.Page.curPage.map;

    this.createPanelDom = function(){
        var that = this;
        this.panel = $("<div id=\"Panel_Tools\" class=\"dragPanel\">"
            +"<div class=\"title\"><span>工具箱</span><a class=\"closeBtn\">△</a></div>"
            +"<div class=\"body\">"
            +"<div id='div_tools'>"
            +"<img id='img_tool_pan' title=\"移动地图\" src=\"imgs/img_tool_pan.png\"/><img id='img_tool_drawluoqunone' title=\"绘制落区\" src=\"imgs/img_tool_drawluoqunone.png\"/><img id='img_tool_drawluoqu' title=\"区域赋值\" src=\"imgs/img_tool_drawluoqu.png\"/><img id='img_tool_pickluoqu' title=\"拾取落区\" src=\"imgs/img_tool_pickluoqu.png\"/><img id='img_tool_stamp' title=\"盖章\" src=\"imgs/img_tool_stamp.png\"/>"
            +"<img id='img_tool_brush' title=\"画刷\" src=\"imgs/img_tool_brush.png\"/><img id='img_tool_wind' title=\"风向订正\" src=\"imgs/img_tool_modifywind.png\"/><img id='img_tool_editcell' title=\"单元格编辑\" src=\"imgs/img_tool_editcell.png\"/><img id='img_tool_qhdz' title=\"区划订正\" src=\"imgs/img_tool_qhdz.png\"/><img id='img_tool_modifytrend' title=\"趋势订正\" src=\"imgs/img_tool_modifytrend.png\"/>"
            +"<img id='img_tool_erase' title=\"橡皮擦\" src=\"imgs/img_tool_erase.png\" style='display:none'/><img id='img_tool_importFromGrid' title=\"从市台站点预报导入格点场\" src=\"imgs/img_tool_importFromGrid.png\" style='display:none'/><img id='img_tool_importFromFile' title=\"从本地报文导入格点场\" src=\"imgs/img_tool_importFromFile.png\" style='display:none'/><input type=\"file\" id=\"btn_file\" style=\"display:none\"><img id='img_tool_calc' title=\"格点代数运算\" src=\"imgs/img_tool_calc.png\" style='display: none'/>"
			+"<img id='img_tool_undo' title=\"撤销\" src=\"imgs/img_tool_undo.png\"/><img id='img_tool_redo' title=\"重做\" src=\"imgs/img_tool_redo.png\"/><img id='img_tool_screenshot' title=\"截图\" src=\"imgs/img_tool_screenshot.png\" style='display:none'/>"
            +"</div>"

            //填色透明度可调 add by pope on 2016-11-16
            +"<div id=\"div_TransparencyPicker\" style='display'>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div id='transparencyBoundDiv' class=\"row1\"><span>边界透明度:</span>&nbsp;&nbsp;<span>0</span>&nbsp;&nbsp;<input type='range' id='m_transparencyBound' name='value2' value='0' style='vertical-align:right;width: 40%'/>&nbsp;&nbsp;<span>1</span></div>"
            +"<div id='transparencyDiv' class=\"row1\"><span>颜色透明度:</span>&nbsp;&nbsp;<span>0</span>&nbsp;&nbsp;<input type='range' id='m_transparency' name='value2' value='0' style='vertical-align:right;width: 40%'/>&nbsp;<span>255</span></div>"
            +"</div>"

            +"<div id='div_setting' style='display: none'>"
            +"<div id=\"div_gridValuePicker\" style='display'>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div style='margin: 5px;border:1px solid #999999;background: #fff;'>"
            +"<div style='text-align:center;background: #70a5ce;border-bottom:1px solid #999999;'><div id='div_title' style='display:inline-block;height: 30px;line-height:30px;text-align:center;color:#fff;font-size: 14px;font-weight: bold;'>日降水量</div><div style='margin-left: 10px; display: inline-block'><select id='selectFillColorType' style='background-color:rgba(225, 225, 235, 0);width:60px;height:25px;line-height:25px;margin-top:5px;font-size: 12px'><option value=\"国标\">国标</option><option value=\"值域\">值域</option></select></div></div>"
            +"<div id='div_GridValueItems'><table id='table_GridValueItems' style='width: 100%;text-align: center;text-align: left;margin-left: 10px'>"
            +"<tr><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='0.1_9.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#A6F38D;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>小雨</span></td><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='10_24.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#38A700;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>中雨</span></td></tr>"
            +"<tr><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='25_49.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#61B8FF;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>大雨</span></td><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='50_99.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#0000FE;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>暴雨</span></td></tr>"
            +"<tr><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='100_249.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#FA00FA;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>大暴雨</span></td><td style='padding:5px 0px 5px 0px;'><span style='display:inline-block;border:1px solid #000;width:26px;height:26px;'><span id='250_499.9' class='luoquButton' style=\"display:inline-block;width:24px;height:24px;background:#720000;border:3px solid #fff;\"></span></span><span style='vertical-align: top;line-height: 26px;'>特大暴雨</span></td></tr>"
            +"</table></div>"
            +"</div>"
            +"<div class=\"row1\" style='text-align: center;'><span>格点量级：</span></span><input id='gridValueDown' style='width: 36px;height: 25px;padding-left: 5px;font-weight: bold;' type='text' value=''/><span id='gridValueDownToUp'> - </span><input id='gridValueUp' style='width: 36px;height: 25px;padding-left: 5px;font-weight: bold;' type='text' value=''/><button id='gridClearUp'>全部清零</button></div>"
            +"</div>"

            +"<div id=\"div_windDirectionPicker\" style='display'>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div style='margin: 5px;border:1px solid #999999;background: #fff;'>"
            +"<div style='text-align:center;background: #70a5ce;border-bottom:1px solid #999999;'><div style='display:inline-block;height: 30px;line-height:30px;text-align:center;color:#fff;font-size: 14px;font-weight: bold;'>风向</div></div>"
            +"<div id='div_windDirectionItems'><table id='table_windDirectionItems' style='width: 100%;text-align: center;text-align: left;margin-left: 10px'>"
            +"<tr><td><span id='wd_null'>无</span></td><td style=''><span id='wd_0'>北风</span></td><td><span id='wd_45'>东北风</span></td></tr>"
            +"<tr><td><span id='wd_90'>东风</span></td><td><span id='wd_135'>东南风</span></td><td><span id='wd_180'>南风</span></td></tr>"
            +"<tr><td><span id='wd_225'>西南风</span></td><td><span id='wd_270'>西风</span></td><td><span id='wd_315'>西北风</span></td></tr>"
            +"</table></div>"
            +"</div>"
            +"</div>"

            +"<div id=\"div_IncreaseValuePicker\" style='display'>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div style='margin: 5px;background: #fff;'>"
            +"<div id=\"div_IncreaseValueItems\"><table id=\"table_IncreaseValueItems\" style=\"width: 100%;text-align: center;\"></table></div>"
            +"</div>"
            +"<div id='addSubDiv' class=\"row1\" style='font-size: 20px;padding-left: 8px;'><input type=checkbox id='input_add' style='width: 20px;height: 18px;'/><span style='width: 25px;height: 20px;margin-left: 5px'>+</span><input type=checkbox id='input_sub' style='width: 20px;height: 18px;margin-left: 10px;'/><span style='width: 25px;height: 20px;margin-left: 5px;'>-</span><input id='increaseValue' style='width: 90px;height: 25px;margin-left: 10px;margin-bottom:0px;margin-left:20px;text-align: center;font-size: 18px;' type='text' value='1'/></div>"
            +"<div id='stampSizeDiv' class=\"row1\"><span>大小：</span>&nbsp;&nbsp;<span>1</span>&nbsp;&nbsp;<input type='range' id='rangeStampSize' name='value2' style='width: 110px'/>&nbsp;&nbsp;<span>30</span></div>"
            +"</div>"

            +"<div id=\"div_setting_brushSize\">"
            +"<div class=\"row1\"><span>大小：</span>&nbsp;&nbsp;<span>1</span>&nbsp;&nbsp;<input type='range' id='rangeBrushSize' style='width: 110px'/>&nbsp;&nbsp;<span>10</span></div>"
            +"</div>"

            +"<div id=\"div_setting_brushSizeFix\">"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div class=\"row1\"><input id=\"radioPoint\" type=\"radio\" name=\"brushSizeFixRadiobutton\" value=\"radiobutton\" checked>两点画线<input style='margin-left: 10px;' id=\"radioLine\" type=\"radio\" name=\"brushSizeFixRadiobutton\" value=\"radiobutton\">连续画线</div>"
            +"<div class=\"row1\"><input type=checkbox id='checkboxBrushSizeFix' style='width: 18px;height: 18px;vertical-align:middle;'/><span style='vertical-align:middle;'>固定：</span>&nbsp;&nbsp;<span style='vertical-align:middle;'>1</span>&nbsp;&nbsp;<input type='range' id='rangeBrushSizeFix' name='value2' style='width: 90px'/>&nbsp;&nbsp;<span style='vertical-align:middle;'>10</span></div>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            // +"<div class=\"row1\"><input id=\"radioLine\" type=\"radio\" name=\"brushSizeFixRadiobutton\" value=\"radiobutton\">连续画线</div>"
            +"</div>"

            +"<div id=\"div_setting_importSetting\">"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div class=\"row1\" style=\"\"><span  id='div_setting_importSetting_Titile' style='color: #333; font-weight: bold;'></span></div>"
            +"<div class=\"row1\" style=\"\"><span>影响半径：</span><input type='number' id='importSettingRadius' name='value2' min='1' max='10' value='0' style='margin-bottom: 0px;width: 60px;height: 24px'/><button id='btnImport' style='margin-left: 10px;width: 50px'>导入</button></div>"
            +"<div class=\"row1\" style=\"\" id='div_setting_importSetting_Tip'><span style='color: red'>请导入当前时次的精细化报文。</span></div>"
            +"</div>"

            +"<div id=\"div_setting_calc\">" /*计算器*/
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div class=\"row1\" id='div_setting_express' style='border: solid 1px #8797aa;height: 32px;width: 137px;text-align: right;font-weight: bold;margin-left: 37px;margin-top: 10px;color: red;'></div>"
            +"<div class=\"row1\"><table id='table_calc' style='margin-left: 32px;'><tbody>"
                +"<tr><td>←</td><td>H</td><td>C</td><td>=</td></tr>"
                +"<tr><td>7</td><td>8</td><td>9</td><td>/</td></tr>"
                +"<tr><td>4</td><td>5</td><td>6</td><td>*</td></tr>"
                +"<tr><td>1</td><td>2</td><td>3</td><td>-</td></tr>"
                +"<tr><td colspan='2'>0</td><td>.</td><td>+</td></tr>"
            +"</tbody></table></div>"
//            +"<div class=\"row1\">预定义表达式：</div>"
//            +"<div class=\"row1\"><table id='table_express' style='margin-left: 32px;'><tbody>"
//            +"<tr><td>H66*0.5</td><td>H72*0.5</td></tr>"
//            +"<tr><td>H66*1.0</td><td>H72*1.0</td></tr>"
//            +"</tbody></table></div>"
//            +"<div class=\"row1\"><button id='button_processNULL6369' style='margin-left: 22px;'>处理63、69时次空值</button></div>"
//            +"<div class=\"row1\"><button id='button_processNULL51576369' style='margin-left: 22px;'>处理51、57、63、69时次空值</button></div>"
//            +"<div class=\"row1\"><button id='button_processNULLALL' style='margin-left: 22px;'>处理所有时效空值</button></div>"
            +"</div>"

            +"<div id='div_setting_method' style='display: none'>"
            +"<div class='smallTitle'><span>保持空间分布趋势</span><div class='checkboxCircle'><label id='labelKeepSpatial' value='1' style='background:rgb(52,152,219)'></label></div></div>"
            +"<div class='smallTitle'><span>距离反比权重插值</span><div class='checkboxCircle'><label id='labelIDW' value='0'></label></div></div>"
            +"<div class='smallTitle'><span>以单一值方式赋值</span><div class='checkboxCircle'><label id='labelDefault' value='0'></label></div></div>"
            +"<div class='smallTitle' style='background-color: rgb(255,235,205)'><span>仅赋值到站点</span><div class='checkboxCircle'><label id='labelStation' value='0'></label></div></div>"
            +"<div style='display:none' class='smallTitle' style='background-color: rgb(255,235,205)'><span>赋值到站点所在区县格点值</span><div class='checkboxCircle'><label id='labelStationGrid' value='0'></label></div></div>"
            +"</div>"

            +"<div id='div_setting_method_input' style='display: none'>"
            +"<div class='smallTitle'><span>键盘赋值</span><div class='checkboxCircle'><label id='labelKey' style='background:rgb(52,152,219)' value='1'></label></div></div>"
            +"<div class='smallTitle'><span>鼠标赋值</span><div class='checkboxCircle'><label id='labelMouse' value='0'></label></div></div>"
            +"</div>"

            +"<div id='div_setting_method_pick' style='display: none'>"
            +"<div class='smallTitle'><span>量级范围以上的格点</span><div class='checkboxCircle'><label id='labelDown' style='background:rgb(52,152,219)' value='1'></label></div></div>"
            +"<div class='smallTitle'><span>量级范围之间的格点</span><div class='checkboxCircle'><label id='labelDown2Up' value='0'></label></div></div>"
            +"</div>"

            +"<div id='div_setting_method_wind' style='display: none'>"
            +"<div class='smallTitle'><span>风速订正</span><div class='checkboxCircle'><label id='labelWindSpeed' style='background:rgb(52,152,219)' value='1'></label></div></div>"
            +"<div class='smallTitle'><span>风向订正</span><div class='checkboxCircle'><label id='labelWindDirection' value='0'></label></div></div>"
            +"</div>"

            +"<div id='div_setting_assignment' style='display: none'>"
            +"<div style=\"background-color: #3c85bc;height: 2px;margin-bottom: 5px;margin-top: 5px\"/>" /*分隔线*/
            +"<div id=\"div_qhPicker\" style=\"display: none\">"
            +"<div class=\"row1\"><select id='selectClimaticRegionType_QH' style='width:222px;height:30px;line-height:30px;margin-top:5px;'></select><span><span></span></div>"
            +"<div class=\"row1\"><select id='selectClimaticRegionItem_QH' style='width:222px;height:30px;line-height:30px;margin-top:5px;'></select></div>"
            +"<div class=\"row1\"><select id='selectCounty' style='width:222px;height:30px;line-height:30px;margin-top:5px;'></select></div></div>"
            +"<div class=\"row1\">"
            +"<button id='selectAll' class=\"button button-rounded\" style=\"width:60px;line-height:24px;height:30px;padding: 0 2px;\">全部</button>"
            +"<button id='clearAll' class=\"button button-rounded\" style=\"width:60px;line-height:24px;height:30px;padding: 0 2px;\">清除</i></button>"
            +"</div>"

            +"<div class=\"row1\" style='display: none'><span>赋值：</span></span><span id='spanMinValue' style='width: 24px;outline: none;text-align: right;vertical-align:middle;display:-moz-inline-box;display:inline-block;'>27</span><input type='range' id='rangeValue' name='value1' min='27' max='37' style='vertical-align:middle;width: 108px'/><span id='spanMaxValue'>37</span></div>"
            +"<div class=\"row1\" style='display: none'><span>加减：</span><span style='width: 24px;outline: none;text-align: right;vertical-align:middle;display:-moz-inline-box;display:inline-block;'>-10</span><input type='range' id='rangeAdd' name='value2' min='-10' max='10' style='vertical-align:middle;width: 110px'/><span>10</span></div>"
            +"<div class=\"row1\" style='display: none'><span>增量：</span><span style='width: 24px;outline: none;text-align: right;vertical-align:middle;display:-moz-inline-box;display:inline-block;'>-10</span><input type='range' id='rangeIncrement' name='value3' min='-10' max='10' style='vertical-align:middle;width: 110px'/><span>10</span></div>"
            +"<div class=\"row1\" style='padding: 5px 0px 5px 5px;'><span>=</span><div id=\"divRangeDigitValue\" style='display: inline-block'/><span style='margin:0 3px;'>+</span><div id=\"divRangeDigitAdd\" style='display: inline-block'/><span style='margin: 0 3px;'>x</span><div id=\"divRangeDigitIncrement\" style='display: inline-block'/><span>%</span></div>"

            +"<div class=\"row1\" style='text-align: center;'>"
            +"<span class=\"button-dropdown\" data-buttons=\"dropdown\"\">"
            +"<button class=\"button button-rounded\" style=\"width:60px;line-height:24px;height:30px;padding: 0 2px;\">+1<i style=\"margin-left:4px\" class=\"fa fa-caret-down\"></i></button>"
            +"<ul class=\"button-dropdown-list\">"
            +"<li><a>+1</a></li>"
            +"<li><a>+0.5</a></li>"
            +"<li><a>+0.3</a></li>"
            +"<li><a>+0.2</a></li>"
            +"<li><a>+0.1</a></li>"
            +"</ul>"
            +"</span>"
            +"<span class=\"button-dropdown\" data-buttons=\"dropdown\">"
            +"<button class=\"button button-rounded\" style=\"width:60px;line-height:24px;height:30px;padding: 0 2px;\">-1<i style=\"margin-left:4px\" class=\"fa fa-caret-down\"></i></button>"
            +"<ul class=\"button-dropdown-list\">"
            +"<li><a>-1</a></li>"
            +"<li><a>-0.5</a></li>"
            +"<li><a>-0.3</a></li>"
            +"<li><a>-0.2</a></li>"
            +"<li><a>-0.1</a></li>"
            +"</ul>"
            +"</span>"
            +"<div id='div_setting_assignment_spatial' class=\"row1\" style='text-align: center;'>"
            +"<button id='btn_move' style=\"width:40px;line-height:24px;height:30px;padding: 0 2px;\">移动</button><button id='btn_copy' style=\"width:40px;line-height:24px;height:30px;padding: 0 2px;\">复制</button><button id='btn_modify' style=\"width:40px;line-height:24px;height:30px;padding: 0 2px;\">修改</button><button id='btn_modifyWindDirection' style=\"display:none;width:40px;line-height:24px;height:30px;padding: 0 2px;\">风向</button>"
            +"</div>"

            +"<div id='div_setting_ModifyWindDirection' style='display: none'>"
            +"<div class='smallTitle' style='text-align: left;'><span>改变风向</span><div class='checkboxCircle'><label id='labelModifyWindDirection' style='background:rgb(52,152,219)' value='1'></label></div></div>"
            +"</div>"

            +"</div>"
            +"</div>"

            +"</div>"
            /*滑块提示*/
            +"<div id=\"divRangeTip\" style=\"display:none;width:30px;height: 20px;position:absolute;top:0px;left:0px;background-color: #FFFFFF00;color: #000000;z-index: 99;text-align:center;font-size: 12px;\"></div>"
            +"</div>")
            .appendTo(this.div);

        var t = this;

        this.inputRangeDigitValue = new InputRangeDigit($("#divRangeDigitValue"));
        this.inputRangeDigitAdd = new InputRangeDigit($("#divRangeDigitAdd"), -10, 10);
        this.inputRangeDigitIncrement = new InputRangeDigit($("#divRangeDigitIncrement"), -10, 10);


		$("#labelDefault").click(function(){
            $("#labelDefault").attr("value", 1);
            $("#labelDefault").css("background","rgb(52,152,219)");
            $("#labelKeepSpatial").attr("value", 0);
            $("#labelKeepSpatial").css("background","");
            $("#labelIDW").attr("value", 0);
            $("#labelIDW").css("background","");
            GDYB.GridProductClass.luoquCorrectType = 2; //按默认方式赋值
        });

        $("#labelKeepSpatial").click(function(){
            $("#labelDefault").attr("value", 0);
            $("#labelDefault").css("background","");
            $("#labelKeepSpatial").attr("value", 1);
            $("#labelKeepSpatial").css("background","rgb(52,152,219)");
            $("#labelIDW").attr("value", 0);
            $("#labelIDW").css("background","");
            GDYB.GridProductClass.luoquCorrectType = 0; //保持空间分布趋势
        });

        $("#labelIDW").click(function(){
            $("#labelDefault").attr("value", 0);
            $("#labelDefault").css("background","");
            $("#labelKeepSpatial").attr("value", 0);
            $("#labelKeepSpatial").css("background","");
            $("#labelIDW").attr("value", 1);
            $("#labelIDW").css("background","rgb(52,152,219)");
            GDYB.GridProductClass.luoquCorrectType = 1; //距离反比权重插值
        });

        $("#labelStation").click(function(){
            if($("#labelStation").attr("value") == 0){
                $("#labelStation").attr("value", 1);
                $("#labelStation").css("background","rgb(52,152,219)");
                GDYB.GridProductClass.luoquCorrectJustOnStation = true;
            }
            else{
                $("#labelStation").attr("value", 0);
                $("#labelStation").css("background","");
                GDYB.GridProductClass.luoquCorrectJustOnStation = false;
            }
        });

        //赋值到站点所在区县格点值 add by pope on 20161228
        $("#labelStationGrid").click(function(){
            if($("#labelStationGrid").attr("value") == 0){
                $("#labelStationGrid").attr("value", 1);
                $("#labelStationGrid").css("background","rgb(52,152,219)");
                GDYB.GridProductClass.luoquCorrectStationOnGrid = true;
            }
            else{
                $("#labelStationGrid").attr("value", 0);
                $("#labelStationGrid").css("background","");
                GDYB.GridProductClass.luoquCorrectStationOnGrid = false;
            }
        });

        $("#labelKey").click(function(){
            $("#labelKey").attr("value", 1);
            $("#labelKey").css("background","rgb(52,152,219)");
            $("#labelMouse").attr("value", 0);
            $("#labelMouse").css("background","");
            isKey = $("#labelKey").attr("value") == 1;

            //隐藏格点值选择器
            $("#div_gridValuePicker").css("display", "none");
        });

        $("#labelMouse").click(function(){
            $("#labelKey").attr("value", 0);
            $("#labelKey").css("background","");
            $("#labelMouse").attr("value", 1);
            $("#labelMouse").css("background","rgb(52,152,219)");
            isKey = $("#labelKey").attr("value") == 1;

            //显示格点值选择器
            $("#div_gridValuePicker").css("display", "block");
			//隐藏输入框
			$("#divInputValue").css("display", "none");
        });

        $("#labelDown2Up").click(function(){
            $("#labelDown2Up").attr("value", 1);
            $("#labelDown2Up").css("background","rgb(52,152,219)");
            $("#labelDown").attr("value", 0);
            $("#labelDown").css("background","");
            GDYB.MagicTool.isBetweenMinAndMax = true;

            //显示最大值
            $("#gridValueDownToUp").css("display", "inline-block");
            $("#gridValueUp").css("display", "inline-block");
        });

        $("#labelDown").click(function(){
            $("#labelDown2Up").attr("value", 0);
            $("#labelDown2Up").css("background","");
            $("#labelDown").attr("value", 1);
            $("#labelDown").css("background","rgb(52,152,219)");
            GDYB.MagicTool.isBetweenMinAndMax = false;

            //隐藏最大值
            $("#gridValueDownToUp").css("display", "none");
            $("#gridValueUp").css("display", "none");
        });

        var isWindSpeedBrush = true;

        $("#labelWindSpeed").click(function(){
            $("#v").attr("value", 1);
            $("#labelWindSpeed").css("background","rgb(52,152,219)");
            $("#labelWindDirection").attr("value", 0);
            $("#labelWindDirection").css("background","");

            isWindSpeedBrush = true;

            //停止风向订正
            GDYB.GridProductClass.drawFreePath.deactivate();
            //显示风速值选择
            $("#div_gridValuePicker").css("display", "block");
        });

        $("#labelWindDirection").click(function(){
            $("#labelWindSpeed").attr("value", 0);
            $("#labelWindSpeed").css("background","");
            $("#labelWindDirection").attr("value", 1);
            $("#labelWindDirection").css("background","rgb(52,152,219)");

            isWindSpeedBrush = false;

            //开始风向订正
            GDYB.GridProductClass.drawFreePath.activate();
            //隐藏风速选择
            $("#div_gridValuePicker").css("display", "none");
        });

        $("#labelModifyWindDirection").click(function(){
            GDYB.MagicTool.isModifyWindDirection = !GDYB.MagicTool.isModifyWindDirection;
            if(GDYB.MagicTool.isModifyWindDirection){
                $("#labelModifyWindDirection").attr("value", 1);
                $("#labelModifyWindDirection").css("background","rgb(52,152,219)");
            }
            else{
                $("#labelModifyWindDirection").attr("value", 0);
                $("#labelModifyWindDirection").css("background","");
            }
        });

        $("#selectFillColorType").change(function(e){
            GDYB.GridProductClass.setFillColorType($("#selectFillColorType").val());
        });

        $("#table_windDirectionItems").find("span").click(function(){
            $("#table_windDirectionItems").find("span").removeClass("active");
            $(this).addClass("active");
            var wd = this.id.split("_")[1];
            if(wd == "null")
                GDYB.GridProductClass.currentWindDirection = null;
            else
                GDYB.GridProductClass.currentWindDirection = Number(wd);
        });

        //点击工具
        $("#div_tools").find("img").click(function(){

            if(GDYB.GDYBPage.myPanel_QSDZ != null && this.id != "img_tool_pan" && this.id != "img_tool_undo" && this.id != "img_tool_redo")
                GDYB.GDYBPage.myPanel_QSDZ.hide();

            if($(this).hasClass("active")) {
                if(this.id == "img_tool_drawluoqu"){
                    startDrawLuoqu();
                }
                //return;
            }

            if(this.id != "img_tool_undo" && this.id != "img_tool_redo") {
                t.toInitialState();
                $("#div_tools").find("img").removeClass("active");
                t.m_activeTool = this.id;
            }

            if(this.id != "img_tool_pan" && this.id != "img_tool_modifytrend"){
                $("#div_setting").css("display", "block");
            }

            if(this.id != "img_tool_pan" && GDYB.GridProductClass.dataCache.caches == null){
                $("#div_modal_confirm_content").html("请先下载初始场。");
                $("#div_modal_confirm").modal();
                $("#div_modal_confirm").find("a").unbind();
                return;
            }

            if(this.id == "img_tool_drawluoqunone"){ //绘制落区
                if(GDYB.GridProductClass.drawLuoqu == null || GDYB.GridProductClass.datasetGrid == null){
                    alert("请先打开格点数据");
                    return;
                }
                else {
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    GDYB.GridProductClass.currentGridValueDown = GDYB.GridProductClass.datasetGrid.noDataValue;
                    GDYB.GridProductClass.currentGridValueUp = GDYB.GridProductClass.datasetGrid.noDataValue;
                    startDrawLuoqu();

                    if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax"){
                        $("#btn_modifyWindDirection").css("display", "inline-block");
                    }
                }
            }
            else if(this.id == "img_tool_drawluoqu"){ //区域赋值
                if(GDYB.GridProductClass.drawLuoqu == null){
                    alert("请先打开格点数据");
                    return;
                }
                else {
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    $("#div_gridValuePicker").css("display", "block");
                    if(GDYB.GridProductClass.currentElement == "w" || GDYB.GridProductClass.currentElement == "tcc" || GDYB.GridProductClass.currentElement == "air"){
                        $("#div_setting_method").css("display", "none");
                        $("#labelDefault").attr("value", 1);
                        $("#labelDefault").css("background","rgb(52,152,219)");
                        $("#labelKeepSpatial").attr("value", 0);
                        $("#labelKeepSpatial").css("background","");
                        $("#labelIDW").attr("value", 0);
                        $("#labelIDW").css("background","");
                        GDYB.GridProductClass.luoquCorrectType = 2;
                    }
                    else{
                        $("#div_setting_method").css("display", "block");
                        $("#labelDefault").attr("value", 0);
                        $("#labelDefault").css("background","");
                        $("#labelKeepSpatial").attr("value", 1);
                        $("#labelKeepSpatial").css("background","rgb(52,152,219)");
                        $("#labelIDW").attr("value", 0);
                        $("#labelIDW").css("background","");
                        GDYB.GridProductClass.luoquCorrectType = 0;
                    }
                    startDrawLuoqu();

                    if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax"){
                        $("#btn_modifyWindDirection").css("display", "inline-block");
                        $("#div_windDirectionPicker").css("display", "block");
                    }
                }
            }
            else if(this.id == "img_tool_pickluoqu") { //拾取落区
                $("#div_gridValuePicker").css("display", "block");
                if(GDYB.GridProductClass.datasetGrid == null){
                    alert("请先打开格点数据");
                    return;
                }
                else {
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    $("#div_setting_method_pick").css("display", "block");
                    $("#div_setting_assignment").css("display", "block");
                    GDYB.GridProductClass.action = GDYB.CorrectAction.pickLuoqu;

                    if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax"){
                        $("#btn_modifyWindDirection").css("display", "inline-block");
                    }

                    //GDYB.Page.curPage.map.div.style.cursor = "Crosshair";
                    that.map.div.style.cursor = "Crosshair";
                    GDYB.MagicTool.geoline = null; //清空选择
                }
                startDragMap();
            }
            else if(this.id == "img_tool_modifyluoqu") { //修改落区
                if(GDYB.GridProductClass.datasetGrid == null){
                    alert("请先打开格点数据");
                }
                else if(GDYB.GridProductClass.currentGridValueDown == null){
                    alert("请先选择量级");
                }
                else{
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    GDYB.GridProductClass.drawLuoqu.deactivate();  //关闭绘制落区
                    GDYB.GridProductClass.drawFreePath.deactivate();  //关闭风向订正
                    //启动修改落区
                    GDYB.GridProductClass.action = GDYB.CorrectAction.modifyLuoqu;
                }
                startDragMap();
            }
            else if(this.id == "img_tool_clearluoqu") { //清除落区
                clearLuoqu();
            }
            else if(this.id == "img_tool_qhdz") { //区划订正
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_qhPicker").css("display", "block");
                $("#div_setting_assignment").css("display", "block");
                $("#div_setting_assignment_spatial").css("display", "none");
                initType();
            }
            else if(this.id == "img_tool_modifytrend") { //趋势订正
                if(!GDYB.GDYBPage.myPanel_QSDZ){
                    GDYB.GDYBPage.myPanel_QSDZ = new Panel_QSDZ($("body")); //#map_div
                }
                else{
                    GDYB.GDYBPage.myPanel_QSDZ.show();
                    GDYB.GDYBPage.myPanel_QSDZ.refreshClimaticRegionItem($("#selectClimaticRegionType_QS").val(), $("#selectClimaticRegionItem_QS").val());
                }
            }
            else if(this.id == "img_tool_modifywind") { //风场订正
                if(GDYB.GridProductClass.datasetGrid == null)
                    alert("请先打开风场数据");
                else {
                    if(GDYB.GridProductClass.currentElement != "10uv"  && GDYB.GridProductClass.currentElement != "wmax"){
                        alert("当前要素不是风场");
                        return;
                    }
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    stopDragMap();
                }
            }
            else if(this.id == "img_tool_stamp") { //盖章
                $("#div_tools").find("img").removeClass("active");
				$("#div_IncreaseValuePicker").css("display", "block");
                $("#stampSizeDiv").css("display", "block");

                if(GDYB.GridProductClass.currentElement == "w"){
                    $("#table_IncreaseValueItems").html("<tbody>"
                        +"<tr><td id=\"0\"><span>0</span></td><td id=\"1\"><span>1</span></td><td id=\"2\"><span>2</span></td><td id=\"3\"><span>3</span></td><td id=\"4\"><span>4</span></td></tr>"
                        +"<tr><td id=\"5\"><span>5</span></td><td id=\"6\"><span>6</span></td><td id=\"7\"><span>7</span></td><td id=\"8\"><span>8</span></td><td id=\"9\"><span>9</span></td></tr>"
                        +"<tr><td id=\"10\"><span>10</span></td><td id=\"11\"><span>11</span></td><td id=\"12\"><span>12</span></td><td id=\"13\"><span>13</span></td><td id=\"14\"><span>14</span></td></tr>"
                        +"<tr><td id=\"15\"><span>15</span></td><td id=\"16\"><span>16</span></td><td id=\"17\"><span>17</span></td><td id=\"18\"><span>18</span></td><td id=\"19\"><span>19</span></td></tr>"
                        +"<tr><td id=\"20\"><span>20</span></td><td id=\"21\"><span>21</span></td><td id=\"22\"><span>22</span></td><td id=\"23\"><span>23</span></td><td id=\"24\"><span>24</span></td></tr>"
                        +"<tr><td id=\"25\"><span>25</span></td><td id=\"26\"><span>26</span></td><td id=\"27\"><span>27</span></td><td id=\"28\"><span>28</span></td><td id=\"29\"><span>29</span></td></tr>"
                        +"<tr><td id=\"30\"><span>30</span></td><td id=\"31\"><span>31</span></td><td id=\"53\"><span>53</span></td></tr>"
                        +"</tbody>");
                    // $("#input_add")[0].checked = false;
                    $("#input_sub")[0].checked = false;
                }
                else{
                    $("#table_IncreaseValueItems").html("<tbody>"
                        +"<tr><td id=\"1\"><span>1</span></td><td id=\"2\"><span>2</span></td><td id=\"3\"><span>3</span></td><td id=\"4\"><span>4</span></td><td id=\"5\"><span>5</span></td></tr>"
                        +"<tr><td id=\"6\"><span>6</span></td><td id=\"7\"><span>7</span></td><td id=\"8\"><span>8</span></td><td id=\"9\"><span>9</span></td><td id=\"10\"><span>10</span></td></tr>"
                        +"<tr><td id=\"15\"><span>15</span></td><td id=\"20\"><span>20</span></td><td id=\"25\"><span>25</span></td><td id=\"30\"><span>30</span></td><td id=\"35\"><span>35</span></td></tr>"
                        +"<tr><td id=\"40\"><span>40</span></td><td id=\"45\"><span>45</span></td><td id=\"50\"><span>50</span></td><td id=\"75\"><span>75</span></td><td id=\"100\"><span>100</span></td></tr>"
                        +"</tbody>");
                    // $("#input_add")[0].checked = true;
                    $("#input_sub")[0].checked = false;
                }
                //盖章的增减幅度值点击事件
                $("#table_IncreaseValueItems").find("td").click(function(){
                    if(this.id == null || this.id == "")
                        return;
                    $("#increaseValue").val(this.id);
                });

                stopDragMap();

                if(GDYB.GridProductClass.currentElement == "10uv"  || GDYB.GridProductClass.currentElement == "wmax")
                    $("#div_setting_method_wind").css("display", "block");

                t.updateBrush();

                //停止鼠标滚动缩放地图、停止双击缩放地图
                var map = that.map;
                for(var ckey in map.controls){
                    var control = map.controls[ckey];
                    if(control.CLASS_NAME == "WeatherMap.Control.Navigation"){
                        control.disableZoomWheel();
                        for(var hkey in control.handlers){
                            var handler = control.handlers[hkey];
                            if(handler.CLASS_NAME == "WeatherMap.Handler.Click"){
                                handler.double = false;
                                break;
                            }
                        }
                        break;
                    }
                }

                //响应地图鼠标滚动事件，实现盖章的尺寸
                function addEvent( obj,type,fn ) {
                    var isFirefox = typeof document.body.style.MozUserSelect != 'undefined';
                    if( obj.addEventListener )
                        obj.addEventListener( isFirefox ? 'DOMMouseScroll' : type,fn,false );
                    else
                        obj.attachEvent( 'on'+type,fn );
                    return fn;
                }
				$("#rangeStampSize").val(t.brushSize);
				$("#rangeStampSize").css( 'background', 'linear-gradient(to right, #379CE2, white '+(t.brushSize/30)*100+'%, white)' );
                if(!t.hasAddStampMouseWheelEvent) {
                    var mapDiv = document.getElementById("map");
                    addEvent(mapDiv, 'mousewheel', function (e) {
                        if (t.m_activeTool == "img_tool_stamp") {
                            t.brushSize += e.which * e.wheelDelta / Math.abs(e.wheelDelta);
                            t.brushSize = t.brushSize <= 0 ? 1 : t.brushSize;
                            $("#rangeStampSize").val(t.brushSize);
                            t.updateBrush();
                        }
                    });
                    t.hasAddStampMouseWheelEvent = true;
                }
            }
            else if(this.id == "img_tool_brush") { //画刷
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");

                $("#div_IncreaseValuePicker").css("display", "block");
                $("#stampSizeDiv").css("display", "none");

                $("#div_gridValuePicker").css("display", "block");
                $("#div_setting_brushSize").css("display", "block");

				$("#rangeBrushSize").val(t.brushSize);
				$("#rangeBrushSize").css( 'background', 'linear-gradient(to right, #379CE2, white '+(t.brushSize/10)*100+'%, white)' );

				//增加加减数值
                $("#table_IncreaseValueItems").html("<tbody>"
                    +"<tr><td id=\"0.1\"><span>0.1</span></td><td id=\"1\"><span>1</span></td><td id=\"2\"><span>2</span></td><td id=\"3\"><span>3</span></td><td id=\"4\"><span>4</span></td><td id=\"5\"><span>5</span></td></tr>"
                    +"<tr><td id=\"10\"><span>10</span></td><td id=\"20\"><span>20</span></td><td id=\"30\"><span>30</span></td><td id=\"40\"><span>40</span></td><td id=\"50\"><span>50</span></td><td id=\"100\"><span>100</span></td></tr>"
                    +"</tbody>");
                // $("#input_add")[0].checked = true;
                $("#input_sub")[0].checked = false;

                //盖章的增减幅度值点击事件
                $("#table_IncreaseValueItems").find("td").click(function(){
                    if(this.id == null || this.id == "")
                        return;
                    $("#increaseValue").val(this.id);
                });

                stopDragMap();
//                if(GDYB.GridProductClass.currentElement == "10uv")
//                    GDYB.GridProductClass.drawFreePath.activate();

                if(GDYB.GridProductClass.currentElement == "10uv"  || GDYB.GridProductClass.currentElement == "wmax")
                    $("#div_setting_method_wind").css("display", "block");


                t.updateBrush();
                //停止鼠标滚动缩放地图、停止双击缩放地图
                var map = that.map;
                for(var ckey in map.controls){
                    var control = map.controls[ckey];
                    if(control.CLASS_NAME == "WeatherMap.Control.Navigation"){
                        control.disableZoomWheel();
                        for(var hkey in control.handlers){
                            var handler = control.handlers[hkey];
                            if(handler.CLASS_NAME == "WeatherMap.Handler.Click"){
                                handler.double = false;
                                break;
                            }
                        }
                        break;
                    }
                }

                //响应地图鼠标滚动事件，实现画刷的尺寸
                function addEvent( obj,type,fn ) {
                    var isFirefox = typeof document.body.style.MozUserSelect != 'undefined';
                    if( obj.addEventListener )
                        obj.addEventListener( isFirefox ? 'DOMMouseScroll' : type,fn,false );
                    else
                        obj.attachEvent( 'on'+type,fn );
                    return fn;
                }

                if(!t.hasAddStampMouseWheelEvent) {
                    var mapDiv = document.getElementById("map");
                    addEvent(mapDiv, 'mousewheel', function (e) {
                        if (t.m_activeTool == "img_tool_brush") {
                            t.brushSize += e.which * e.wheelDelta / Math.abs(e.wheelDelta);
                            t.brushSize = t.brushSize <= 0 ? 1 : t.brushSize;
                            $("#rangeBrushSize").val(t.brushSize);
							t.updateBrush();
                        }
                    });
                    t.hasAddStampMouseWheelEvent = true;
                }
            }
            else if(this.id == "img_tool_wind"){ //风向订正，两点订正
                if(GDYB.GridProductClass.currentElement != "10uv"  && GDYB.GridProductClass.currentElement != "wmax"){
                    alert("当前要素不是风场");
                    return;
                }
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_setting_brushSizeFix").css("display", "block");
				var rangeBrushSizeFixValue = 5;
				$("#rangeBrushSizeFix").val(rangeBrushSizeFixValue);
				$("#rangeBrushSizeFix").css( 'background', 'linear-gradient(to right, #379CE2, white '+(rangeBrushSizeFixValue/10)*100+'%, white)' );
                if($("#checkboxBrushSizeFix")[0].checked)
                    t.brushSize = Number($("#rangeBrushSizeFix").val());
                else {
                    t.brushSize = -1;
                }
                var drawFreePath = GDYB.GridProductClass.drawFreePath;
                var drawWindDirection = GDYB.GridProductClass.drawWindDirection;
                stopDragMap();
                drawWindDirection.activate();
                $("input:radio[name='brushSizeFixRadiobutton']").change(function (){ //监听radio按钮事件
                    var id = $("input:radio[name='brushSizeFixRadiobutton']:checked").attr("id");
                    switch(id){
                        case "radioPoint": //两点画线
                            drawFreePath.deactivate(); //停止连续画线
                            drawWindDirection.activate();
                            break;
                        case "radioLine"://连续画线
                            drawWindDirection.deactivate();//停止两点画线
                            drawFreePath.activate();
                            break;
                    }
                    stopDragMap();
                });
            }
            else if(this.id == "img_tool_erase"){ //橡皮擦
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_setting_brushSize").css("display", "block");

                stopDragMap();
                if(GDYB.GridProductClass.dataStack.stack.length > 1)
                    t.dgLast = GDYB.GridProductClass.dataStack.get(GDYB.GridProductClass.dataStack.stack.length - 2); //-1是最后一个，-2是上一次编辑前的格点，要的就是它

                t.updateBrush();
            }
            else if(this.id == "img_tool_calc") //格点代数运算
            {
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_setting_calc").css("display", "block");
            }
            else if(this.id == "img_tool_showArea") { //显示重点关注区域

            }
            else if(this.id == "img_tool_editcell") { //单元格编辑
                if(GDYB.GridProductClass.datasetGrid == null){
                    alert("请先打开格点数据");
                    return;
                }
                else {
                    $("#div_tools").find("img").removeClass("active");
                    $(this).addClass("active");
                    //$("#div_gridValuePicker").css("display", "block");
                    $("#div_setting_method_input").css("display", "block");
                    GDYB.GridProductClass.action = GDYB.CorrectAction.editCell;
                    that.map.div.style.cursor = "text";
                    //GDYB.Page.curPage.map.div.style.cursor = "text";

                    $("#gridValueDownToUp").css("display", "none");
                    $("#gridValueUp").css("display", "none");
                }
            }
            else if(this.id == "img_tool_undo") { //撤销
                var datasetGrid = GDYB.GridProductClass.dataStack.undo();
                if(datasetGrid != null) {
                    GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, GDYB.GridProductClass.currentHourSpan, function(dataCache){
                        if(dataCache != null){
                            dataCache.data = datasetGrid; //因为撤销和恢复是copy出来的对象，需要重新关联
                        }
                        GDYB.GridProductClass.datasetGrid = datasetGrid;
                        GDYB.GridProductClass.layerFillRangeColor.setDatasetGrid(datasetGrid);
                        GDYB.GridProductClass.layerFillRangeColor.refresh();
                        GDYB.GridProductClass.updateStationLayer();
                        if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null)
                            GDYB.FilterTool.refresh(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueUp);
                    });
                }
            }
            else if(this.id == "img_tool_redo") { //重做
                var datasetGrid = GDYB.GridProductClass.dataStack.redo();
                if(datasetGrid != null) {
                    GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, GDYB.GridProductClass.currentHourSpan, function(dataCache){
                        if(dataCache != null){
                            dataCache.data = datasetGrid; //因为撤销和恢复是copy出来的对象，需要重新关联
                        }
                        GDYB.GridProductClass.datasetGrid = datasetGrid;
                        GDYB.GridProductClass.layerFillRangeColor.setDatasetGrid(datasetGrid);
                        GDYB.GridProductClass.layerFillRangeColor.refresh();
                        GDYB.GridProductClass.updateStationLayer();
                        if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null)
                            GDYB.FilterTool.refresh(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueUp);
                    });
                }
            }
            else if(this.id == "img_tool_screenshot") { //截图
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#Panel_Tools").css("display","none"); //去掉工具箱
                $("#mapSwitch_div").css("display","none");//去掉地图切换工具
                $(".smControlZoomIn.smButton").parent().css("display","none");//去除缩放工具条
                if(GDYB.GridProductClass.currentElement == "tmax" ||GDYB.GridProductClass.currentElement == "tmin"||GDYB.GridProductClass.currentElement == "w"||GDYB.GridProductClass.currentElement == "2t"){
                    $("#screenShotLegend").css("height","30px");
                }
                else{
                    $("#screenShotLegend").css("height","5px");
                }
                var isLegend = false,print = new SPDPrint();
                var bounds = GDYB.Page.curPolygon.getBounds();
                var legend_width = $("#div_legend").width();
                if($("#div_legend_items").html()!=""){
                    isLegend = true;
                }
                print.SPDPrintBound('map',bounds,GDYB.Page.curPage.map,isLegend,function(img) {
                    var m_obj = this;
                    var legendmanager = new LegendManager("#screenShotLegend");
                    //legendmanager.showLegend(styles,"", false);
                    //legendmanager.showEditor("638px", "550px", function (newStyles) {});
                    $("#Panel_Tools").css("display","block");
                    $("#mapSwitch_div").css("display","block");
                    $(".smControlZoomIn.smButton").parent().css("display","block");
                    var $screenShotDiv =$('#screenShotDiv');

                    if ($('#outPutMapDiv').html() != "") {
                        $('#outPutMapDiv').empty();
                        $('#hideDiv').empty();
                        $("#screenShotLegend").empty();
                        $("#titleDiv").empty();
                        $("#titleDiv").append(' <p id="p_time"></p>')
                    }
                    if($("#map_title_div").length >0 && $("#map_title_div").html() != "") {
                        $("#hideDiv").append($('#map_title_div div').html());
                        $("#titleDiv").prepend($('#hideDiv p'));
                        $('#hideDiv p').remove();
                        $("#p_time").prepend($('#hideDiv').html());
                        $('#titleDiv p').editable(function(value, settings) {
                            return(value);
                        }, {
                            placeholder:"",
                            onblur:"submit",
                            height: "100%"
                            //width: "100%"
                        });
                    }
                    //$("#titleDiv").DisDrag();
                    //$("#titleDiv").Drag();
                    $("#screenShotLegend").append($("#div_legend").html());
                    $('#outPutMapDiv').append(img);
                    var width = $screenShotDiv.width();
                    var height = $screenShotDiv.height();
                    $('#div_modal_screenShot').modal('show');
                    //$('#div_modal_screenShot').modal('show').css({
                    //    width: width,
                    //    'margin-left': function () {
                    //        return -($(this).width() / 2);
                    //    }
                    //});
                    //保存按钮
                    $('.export-btn').off("click");
                    $('.export-btn').on("click",function() {
                        print.SPDprintDiv('#screenShotDiv',function(img) {
                            var url = img.src;
                            var filename = 'map.png';
                            var a = document.createElement('a');
                            a.style.display = 'none';
                            a.setAttribute('href', url);
                            a.setAttribute('download', filename);
                            document.body.appendChild(a);
                            a.dispatchEvent(new MouseEvent('click'));
                            document.body.removeChild(a);
                            //var downloadMime = 'image/octet-stream';
                            //var type = print.fixType("png");
                            //var downloadData = url.replace(type, downloadMime);
                            //document.location.href = downloadData;
                        });
                    });
                });
            }
            else if(this.id == "img_tool_importFromGrid"){ //从市台站点预报导入格点场
//                var importFromGrid = new ImportFromGrid();
//                importFromGrid.run();
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_setting_importSetting").css("display", "block");
                $("#div_setting_importSetting_Tip").css("display", "none");
                $("#div_setting_importSetting_Titile").html("从市台站点预报导入格点场：");
            }
            else if(this.id == "img_tool_importFromFile"){ //从本地报文导入格点场
//                document.getElementById("btn_file").click();
                $("#div_tools").find("img").removeClass("active");
                $(this).addClass("active");
                $("#div_setting_importSetting").css("display", "block");
                $("#div_setting_importSetting_Tip").css("display", "block");
                $("#div_setting_importSetting_Titile").html("从本地报文导入格点场：");
            }
        });

        $("#btnImport").click(function(){
            if(t.m_activeTool == "img_tool_importFromGrid"){
                var radius = $("#importSettingRadius").val();
                if(radius == "" || isNaN(radius)){
                    alert("影响半径设置有误，请输入整数");
                    return;
                }
                var importFromGrid = new ImportFromGrid();
                importFromGrid.radius = Number(radius);
                importFromGrid.run();
            }
            else if(t.m_activeTool == "img_tool_importFromFile"){
                $("#btn_file").val("");
                document.getElementById("btn_file").click();
            }
        });

        //导入报文
        $("#btn_file").change(function(){
            if(this.files.length == 0)
                return;
            var radius = $("#importSettingRadius").val();
            if(radius == "" || isNaN(radius)){
                alert("影响半径设置有误，请输入整数");
                return;
            }
            var file = this.files[0];
            var importFromFile = new ImportFromFile();
            importFromFile.radius = Number(radius);
            importFromFile.run(file);
        });

        //点击移动落区
        $("#btn_move").click(function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                if(t.m_activeTool == "img_tool_drawluoqunone" || t.m_activeTool == "img_tool_drawluoqu")
                {
                    GDYB.GridProductClass.drawLuoqu.activate();
                    GDYB.GridProductClass.action = GDYB.CorrectAction.none;
                }
                else if(t.m_activeTool == "img_tool_pickluoqu")
                    GDYB.GridProductClass.action = GDYB.CorrectAction.pickLuoqu;

                $("#div_setting_ModifyWindDirection").css("display", "none");
            }
            else {
                $(this).addClass("active");
                GDYB.MagicTool.isCopy = false;
                GDYB.GridProductClass.action = GDYB.CorrectAction.moveLuoqu;
                that.map.div.style.cursor = "Move";
                //GDYB.Page.curPage.map.div.style.cursor = "Move";

                GDYB.GridProductClass.drawFreePath.deactivate();
                $("#btn_modify").removeClass("active");

                //矢量落区转栅格落区
                if(t.m_activeTool == "img_tool_drawluoqunone" || t.m_activeTool == "img_tool_drawluoqu"){
                    GDYB.GridProductClass.drawLuoqu.deactivate();  //关闭绘制落区
                    if(GDYB.GridProductClass.layerLuoqu.features.length > 0) {
                        GDYB.MagicTool.pickFromRegion(GDYB.GridProductClass.layerLuoqu.features[0].geometry);
                        GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
                        GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
                    }
                }

                if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax")
                    $("#div_setting_ModifyWindDirection").css("display", "block");
            }
        });

        //点击计算器
        $("#table_calc").find("td").click(function(){
            var content = $(this).html();
            if(content == "="){
                calc();
            }
            else if(content == "←"){
                var express = $("#div_setting_express").html();
                if(express.length > 0)
                    $("#div_setting_express").html(express.substr(0, express.length-1));
            }
            else if(content == "C"){
                    $("#div_setting_express").html("");
            }
            else{
                var express = $("#div_setting_express").html();
                express+=content;
                $("#div_setting_express").html(express);
            }
        });

        //点击预定义表达式
        $("#table_express").find("td").click(function(){
            $("#div_setting_express").html($(this).html());
        });

        //算术表达式
        function calc(){
            //var express = "H12*3/4+2*H24";
            var express = $("#div_setting_express").html();
            if(express.length == 0){
                alert("表达式不能为空");
                return;
            }

            //取出所有变量（时效）
            var variables = [];
            var fromindex = 0;
            while(fromindex < express.length){
                var nIndexOfH = express.indexOf("H", fromindex);
                if(nIndexOfH < 0)
                    break;
                var operators = [];
                operators.push(express.indexOf("+", nIndexOfH));
                operators.push(express.indexOf("-", nIndexOfH));
                operators.push(express.indexOf("*", nIndexOfH));
                operators.push(express.indexOf("/", nIndexOfH));
                var operatorNext = express.length; //如果最后没有运算符，则取到最末
                for(var key in operators){
                    var operator = operators[key];
                    if(operator >=0 && operator < operatorNext){
                        operatorNext = operator;
                    }
                }
                fromindex = operatorNext;

                var variable = express.substring(nIndexOfH, operatorNext);
                var hourSpan = express.substring(nIndexOfH+1, operatorNext);
                variables.push({variable:variable, hourSpan:Number(hourSpan)});
            }

            //逐个格点循环，实例化变量，并构建表达式
            if(variables.length > 0) {
                var dg = GDYB.GridProductClass.datasetGrid;
                var strVariables = null;
                var variable = null;
                var hourSpan = null;
                var dataCache = null;
                var dgTemp = null;
                for (var i = 0; i < dg.rows; i++) {
                    for (var j = 0; j < dg.cols; j++) {
                        calcDetail(i,j);
                    }
                }
            }

            function calcDetail(i,j){
                strVariables = "";
                var num = 0;
                for(var key in variables){
                    variable = variables[key].variable;
                    hourSpan = variables[key].hourSpan;
                    GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion,
                    GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, hourSpan,function(dataCache){
                        if(dataCache == null || dataCache.data == null){
                            alert(hourSpan+"小时数据为空，无法计算");
                            return;
                        }
                        num++;
                        dgTemp = dataCache.data;
                        strVariables+= variable + "=" + dgTemp.getValue(0, j, i) + ";";
                        if(num == variables.length){
                            var val = eval(strVariables + express);
                            dg.setValue(0, j, i, Math.round(val*10)/10);
                        }
                        if(num == variables.length && i == dg.rows && j== dg.cols){
                            GDYB.GridProductClass.layerFillRangeColor.refresh();
                        }
                    });
                }
            }
        }

        $("#button_processNULL6369").click(function(){
            var result = confirm("按默认方案处理，将作用于所有要素，是否继续？");
            if (!result)
                return;
            var elements = ["r3", "2t", "10uv", "rh", "tcc"];
            var hourSpansOfNULL = [63, 69];
            for(var key in elements) {
                processNULL( elements[key], hourSpansOfNULL);
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();
            GDYB.GDYBPage.updateHourSpanStatus();
        });

        $("#button_processNULL51576369").click(function(){
            var result = confirm("按默认方案处理，将作用于所有要素，是否继续？");
            if (!result)
                return;
            var elements = ["r3", "2t", "10uv", "rh", "tcc"];
            var hourSpansOfNULL = [51, 57, 63, 69];
            for(var key in elements) {
                processNULL( elements[key], hourSpansOfNULL);
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();
            GDYB.GDYBPage.updateHourSpanStatus();
        });

        $("#button_processNULLALL").click(function(){
            var result = confirm("按默认方案处理，将作用于所有要素，是否继续？");
            if (!result)
                return;
            var elements = ["r12", "tmax", "tmin", "wmax", "w", "air", "r3", "2t", "10uv", "rh", "tcc", "vis"];
            for(var key in elements) {
                var element = elements[key];
                var hourSpansOfNULL = GDYB.GDYBPage.getHourSpan(element);
                processNULL(element, hourSpansOfNULL);
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();
            GDYB.GDYBPage.updateHourSpanStatus();
        });

        function processNULL(element, hourSpansOfNULL){
            var hourSpans = GDYB.GDYBPage.getHourSpan(element);
            var currentMakeTime = GDYB.GridProductClass.currentMakeTime;
            var currentVersion = GDYB.GridProductClass.currentVersion;
            var datetime = GDYB.GridProductClass.currentDateTime;
            var brain = (element == "r3" || element == "r12");
            var bwind = (element == "10uv" || element == "wmax");
            for (var keyOfHourSpanNULL in hourSpansOfNULL) {
                var hourSpan = hourSpansOfNULL[keyOfHourSpanNULL];
                var keyOfHourSpan;
                for(keyOfHourSpan in hourSpans){
                    if(hourSpans[keyOfHourSpan] == hourSpan){
                        break;
                    }
                }
                if(Number(keyOfHourSpan) >= hourSpans.length) //未找到
                    continue;
                var hourSpanSrc = null;
                if(hourSpan < 72)
                    hourSpanSrc = hourSpans[Number(keyOfHourSpan)+1];
                else
                    hourSpanSrc = hourSpans[Number(keyOfHourSpan)-1];
                GDYB.GridProductClass.dataCache.getData(currentMakeTime, currentVersion, datetime, element, hourSpan, function(dataCache){
                    if(dataCache == null || dataCache.data == null ||dataCache != null && dataCache.data != null && dataCache.data.dMin == 0 && dataCache.data.dMax == 0 && dataCache.status == 0){
                        GDYB.GridProductClass.dataCache.getData(currentMakeTime, currentVersion, datetime, element, hourSpanSrc,function(dataCacheSrc){
                            if (dataCacheSrc != null && dataCacheSrc.data != null) {
                                var datasetGrid = GDYB.GridProductClass.createDatasetGrid(currentMakeTime, currentVersion, datetime, element, hourSpan);
                                var datasetGridSrc = dataCacheSrc.data;
                                for(var i=0; i<datasetGrid.rows; i++){
                                    for(var j=0; j<datasetGrid.cols; j++){
                                        if(brain && hourSpan < 72){
                                            datasetGrid.setValue(0, j, i, datasetGridSrc.getValue(0, j, i)/2);
                                            datasetGridSrc.setValue(0, j, i, datasetGridSrc.getValue(0, j, i)/2);
                                        }
                                        else {
                                            datasetGrid.setValue(0, j, i, datasetGridSrc.getValue(0, j, i));
                                            if (bwind)
                                                datasetGrid.setValue(1, j, i, datasetGridSrc.getValue(1, j, i));
                                        }
                                    }
                                }
                                GDYB.GridProductClass.dataCache.setDataStatus(currentMakeTime, currentVersion, datetime, element, hourSpan, 1, datasetGrid); //置为已修改
                                if(brain && hourSpan < 72)
                                    GDYB.GridProductClass.dataCache.setDataStatus(currentMakeTime, currentVersion, datetime, element, hourSpanSrc, 1, datasetGridSrc); //置为已修改
                            }
                        });
                    }
                });
            }
        }

        //点击复制落区，复制仅一次有效，不可能连续复制。复制后可以连续移动
        $("#btn_copy").click(function(){
            GDYB.MagicTool.isCopy = true;
            GDYB.GridProductClass.action = GDYB.CorrectAction.moveLuoqu;
            that.map.div.style.cursor = "Move";
            //GDYB.Page.curPage.map.div.style.cursor = "Move";
            alert("复制成功，请移动落区。");
            $("#btn_move").addClass("active");

            GDYB.GridProductClass.drawFreePath.deactivate();
            $("#btn_modify").removeClass("active");

            //矢量落区转栅格落区
            if(t.m_activeTool == "img_tool_drawluoqunone" || t.m_activeTool == "img_tool_drawluoqu"){
                GDYB.GridProductClass.drawLuoqu.deactivate();  //关闭绘制落区
                if(GDYB.GridProductClass.layerLuoqu.features.length > 0) {
                    GDYB.MagicTool.pickFromRegion(GDYB.GridProductClass.layerLuoqu.features[0].geometry);
                    GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
                    GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
                }
            }

            if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax")
                $("#div_setting_ModifyWindDirection").css("display", "block");
        });

        //点击修改落区
        $("#btn_modify").click(function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                GDYB.GridProductClass.drawFreePath.deactivate();
                GDYB.GridProductClass.action = GDYB.CorrectAction.none;
                if(t.m_activeTool == "img_tool_drawluoqunone" || t.m_activeTool == "img_tool_drawluoqu")
                    GDYB.GridProductClass.drawLuoqu.activate();
                else if(t.m_activeTool == "img_tool_pickluoqu")
                    GDYB.GridProductClass.action = GDYB.CorrectAction.pickLuoqu;
            }
            else {
                $(this).addClass("active");
                GDYB.GridProductClass.drawLuoqu.deactivate();  //关闭绘制落区
                GDYB.GridProductClass.drawFreePath.activate();
                GDYB.GridProductClass.action = GDYB.CorrectAction.modifyLuoqu;

                $("#btn_move").removeClass("active");

                //矢量落区转栅格落区
                if(t.m_activeTool == "img_tool_drawluoqunone" || t.m_activeTool == "img_tool_drawluoqu"){
                    if(GDYB.GridProductClass.layerLuoqu.features.length > 0) {
                        GDYB.MagicTool.pickFromRegion(GDYB.GridProductClass.layerLuoqu.features[0].geometry);
                        GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
                        GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
                    }
                }
            }
        });

        //点击风向订正
        $("#btn_modifyWindDirection").click(function(){
            GDYB.GridProductClass.drawLuoqu.deactivate();  //关闭绘制落区
            GDYB.GridProductClass.drawFreePath.activate();
            GDYB.GridProductClass.action = GDYB.CorrectAction.none;
        });

        //<------（预定义区域）区划订正相关
        function initType(){
            $("#selectClimaticRegionType_QH").empty();
            var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionTypes";
            $.ajax({
                data: {"para": "{departCode:'"+GDYB.GridProductClass.currentUserDepart.departCode+"'}"},
                url: url,
                dataType: "json",
                success: function (data) {
                    if(data.length > 0) {
						for(var i=0; i<data.length; i++) {
							$("#selectClimaticRegionType_QH").append("<option value='" + data[i].datasetName + "'>" + data[i].typeName + "</option>");
						}
                        fillClimaticRegionItem(data[0].datasetName);
                    }
                },
                type: "POST"
            });
        }

        $("#selectClimaticRegionType_QH").change(function(){
            var datasetname = $(this).val();
            if(datasetname == "T_CLIMATICREGION_CITY")
                $("#selectCounty").css("display", "block");
            else
                $("#selectCounty").css("display", "none");
            fillClimaticRegionItem(datasetname);
        });

        function fillClimaticRegionItem(datasetname){
            $("#selectClimaticRegionItem_QH").empty();
            var m_Arr =[];
            var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionItemNames";
            $.ajax({
                data: {"para": "{datasetname:'" + datasetname + "',departCode:'" + GDYB.GridProductClass.currentUserDepart.departCode + "'}"},
                url: url,
                dataType: "json",
                success: function (data) {
                    if(data!=null && data.length > 0) {
                        // if(datasetname == "T_CLIMATICREGION_CITY" && GDYB.GridProductClass.currentUserDepart.departCode.length == 4) //如果是地市边界，默认选中本市
						var regionId;
						for(var i=0; i<data.length; i++) {
							var obj= {},item = data[i];
							regionId = data[0].regionId;
							if(GDYB.GridProductClass.isCty){ //市级区划订正只能订正本地市 add by pope on 20170507
								if(GDYB.GridProductClass.currentUserDepart.departName.indexOf(item.regionName) > -1){
									regionId = obj.id = item.regionId;
									obj.text =item.regionName;
									m_Arr.push(obj);
									break;
								}
							}
							else{
								obj.id = item.regionId;
								obj.text = item.regionName;
								m_Arr.push(obj);
							}
						}
						var $sel = $("#selectClimaticRegionItem_QH").select2({
							data: m_Arr
						});
						$sel.val(regionId).trigger("change");
						showClimaticRegionItem(datasetname, regionId);
                    }
                },
                type: "POST"
            });
        }

        //显示区域
        $("#selectClimaticRegionItem_QH").change(function(){
            var datasetName = $("#selectClimaticRegionType_QH").val();
            var regionId = $(this).val();
            showClimaticRegionItem(datasetName, regionId);
        });

        //显示气候区划
        function showClimaticRegionItem(datasetName, regionId) {
            var url=gridServiceUrl+"services/ClimaticRegionService/getClimaticRegionItem";
            $.ajax({
                data: {"para": "{datasetName:'" + datasetName+ "',regionId:" + regionId + "}"},
                url: url,
                dataType: "json",
                success: function (data) {
                    var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(data);
                    var fAttributes = feature.attributes;

                    if(GDYB.GridProductClass.layerMarkers != null){
                        GDYB.GridProductClass.layerMarkers.clearMarkers();
                    }
                    //地图展示
                    if(GDYB.GridProductClass.layerClimaticRegion != null) {
                        GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
                        fAttributes["FEATUREID"] = regionId;
                        feature.style = {
                            strokeColor: "#a548ca",
                            strokeWidth: 2,
                            fillColor: "#FF0000",
                            fillOpacity: "0"
                        };
                        var features = [];
                        feature.geometry.calculateBounds();
                        features.push(feature);
                        GDYB.GridProductClass.layerClimaticRegion.addFeatures(features);
                    }

                    if(datasetName == "T_CLIMATICREGION_CITY")
                        fillCounty(feature.attributes["CODE"]);
                },
                type: "POST"
            });
        }

        function fillCounty(areaCode){
            $("#selectCounty").css("display", "block");
            var level = "cnty";
            var m_Arr=[];
            var url=gridServiceUrl+"services/AdminDivisionService/getDivisionInfos";
            $.ajax({
                data: {"para": "{areaCode:'"+areaCode+"',level:'"+level+"'}"},
                url: url,
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if(typeof(data) != "undefined" && data.length>0)
                    {
                        t.counties = [];
                        $("#selectCounty").empty();
                        // $("#selectCounty").append("<option value='-1'>全部</option>");
                        for(var key in data) {
                            var feature = GDYB.FeatureUtilityClass.getFeatureFromJson(JSON.parse(data[key]));
                            feature.geometry.calculateBounds();
                            t.counties.push(feature);
                            //add by pope on 20161213 多选
                            var obj= {};
                            obj.id = Number(key);
                            obj.text = feature.attributes["NAME"];
                            t.CountyId.push(obj.id);
                            m_Arr.push(obj);
                            // $("#selectCounty").append("<option value='" + Number(key) + "'>" + feature.attributes["NAME"] + "</option>");
                        }
                        $("#selectCounty").select2({
                            multiple:true,
                            placeholder:'请选择',
                            data: m_Arr
                        });
                    }
                },
                error: function(e){
                    alert("获取县级行政区划边界失败："+ e.statusText);
                }
            });
        }

        //显示县界
        $("#selectCounty").change(function(){
            var key = $(this).val();
            if(key < 0){
                showClimaticRegionItem($("#selectClimaticRegionType_QH").val(), $("#selectClimaticRegionItem_QH").val()); //如果是全部县，则显示市边界
            }
            else{
                showCounty(key);
            }
            // $("#selectCounty").trigger("close");
        });
        //全部
        $("#selectAll").on("click",function(){
            // var arr = t.CountyId;
            // $("#selectCounty").val(arr).trigger("change");
            $("#selectCounty").val(null).trigger("change");
            showClimaticRegionItem($("#selectClimaticRegionType_QH").val(), $("#selectClimaticRegionItem_QH").val()); //如果是全部县，则显示市边界
        });
        //清除
        $("#clearAll").on("click",function(){
            $("#selectCounty").val(null).trigger("change");
        });

        function showCounty(key){
            if(t.counties == null || t.counties.length <= key){
                return;
            }
            GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
            if(key!=null && key.length>0){
                for(var i =0;i<key.length;i++){
                    var feature = t.counties[key[i]];
                    GDYB.GridProductClass.layerClimaticRegion.addFeatures([feature]);
                }
            }
        }
        //（预定义区域）区划订正相关----->

        //开始绘制落区
        function startDrawLuoqu(){
            GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
            GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
            //$(this).addClass("active"); //只能画一次，就不激活了。如果要支持连续画落区，就放开。另外还有GridProductClass中的drawCompleted事件中停止绘制的代码
            GDYB.GridProductClass.drawLuoqu.activate();
            if(GDYB.GridProductClass.drawFreePath!=null){//add by wangkun,如果没有风向订正会报错，修改后不会对以前造成影响
                GDYB.GridProductClass.drawFreePath.deactivate();  //关闭风向订正
            }
            if(t.m_activeTool != "img_tool_drawluoqunone") {
                var gridValueDown = $("#gridValueDown").val();
                var gridValueUp = $("#gridValueUp").val();
                if (gridValueDown != "")
                    GDYB.GridProductClass.currentGridValueDown = Number(gridValueDown);
                else
                    GDYB.GridProductClass.currentGridValueDown = null;
                if (gridValueUp != "")
                    GDYB.GridProductClass.currentGridValueUp = Number(gridValueUp);
                else
                    GDYB.GridProductClass.currentGridValueUp = null;
                if($("#labelKeepSpatial").attr("value") == 1)
                    GDYB.GridProductClass.luoquCorrectType = 0;
                else if($("#labelIDW").attr("value") == 1)
                    GDYB.GridProductClass.luoquCorrectType = 1;
                else if($("#labelDefault").attr("value") == 1)
                    GDYB.GridProductClass.luoquCorrectType = 2;


                if($("#labelStation").attr("value") == 1)
                    GDYB.GridProductClass.luoquCorrectJustOnStation = true;
                else
                    GDYB.GridProductClass.luoquCorrectJustOnStation = false;
            }

            stopDragMap();

            //关闭拾取落区
            if($("#buttonPickLuoqu").hasClass("active")){
                $("#buttonPickLuoqu").removeClass("active");
                GDYB.GridProductClass.action = GDYB.CorrectAction.none;
            }
            //关闭拾取落区
            if($("#buttonModifyLuoqu").hasClass("active")){
                $("#buttonModifyLuoqu").removeClass("active");
                GDYB.GridProductClass.action = GDYB.CorrectAction.none;
            }
        }

        function clearLuoqu(){
            if(GDYB.GridProductClass.layerLuoqu != null)
                GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
            if(GDYB.GridProductClass.layerLuoquCenter != null)
                GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
            if(GDYB.GridProductClass.layerMagic != null)
                GDYB.GridProductClass.layerMagic.removeAllFeatures();
        }

        function stopDragMap() {
            //var map = GDYB.Page.curPage.map;
            var map = that.map;
            for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                var handler = map.events.listeners.mousemove[i];
                if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                {
                    handler.obj.active = false;
                }
            }
        }

        function startDragMap() {
            //var map = GDYB.Page.curPage.map;
            var map = that.map;
            for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                var handler = map.events.listeners.mousemove[i];
                if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                {
                    handler.obj.active = true;
                }
            }
        }

        $("#gridValueDown").change(function(){
            var valueDown = Number($(this).val());
            var valueUp = Number($("#gridValueUp").val());
            if(valueUp < valueDown)
            {
//                alert("下限值不能大于上限值");
                valueUp = valueDown;
                $("#gridValueUp").val(valueUp);
            }
            GDYB.GridProductClass.currentGridValueDown = valueDown;
            GDYB.GridProductClass.currentGridValueUp = valueUp;

            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null)
                GDYB.FilterTool.refresh(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueUp);
        });
        $("#gridValueUp").change(function(){
            var valueDown = Number($("#gridValueDown").val());
            var valueUp = Number($(this).val());
            if(valueUp < valueDown)
            {
//                alert("上限值不能小于下限值");
                valueDown = valueUp;
                $("#gridValueDown").val(valueDown);
            }
            GDYB.GridProductClass.currentGridValueDown = valueDown;
            GDYB.GridProductClass.currentGridValueUp = valueUp;

            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null)
                GDYB.FilterTool.refresh(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueUp);
        });

        $("#rangeValue").change(function(){
            var method = 0;
            var value = $(this).val();
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
                //replaceGrid(Number(value), method);
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
            $("#divRangeTip").css("display", "none");
        });
        $("#rangeValue").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });
        $("#rangeAdd").change(function(){
            var method = 1;
            var value = $(this).val();
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
                //replaceGrid(Number(value), method);
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
            $(this).val(0); //回到中点
            $("#divRangeTip").css("display", "none");
        });
        $("#rangeAdd").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });
        $("#rangeIncrement").change(function(){
            var method = 2;
            var value = $(this).val()/100.0;
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
//                replaceGrid(Number(value), method);
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
            $(this).val(0); //回到中点
            $("#divRangeTip").css("display", "none");
        });
        $("#rangeIncrement").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val()+"%");
            }
        });

        t.inputRangeDigitValue.change(function(){
            var method = 0;
            var value = this.val();
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
                //replaceGrid(Number(value), method);
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
        });

        t.inputRangeDigitAdd.change(function(){
            var method = 1;
            var value = this.val();
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
                //replaceGrid(Number(value), method);
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
            this.val(0);
        });

        t.inputRangeDigitIncrement.change(function(){
            var method = 2;
            var value = this.val()/100.0;
            if(t.m_activeTool == "img_tool_pickluoqu" && GDYB.MagicTool.geoline == null){ //替换
                GDYB.FilterTool.updateGrid(Number(value), method);
            }
            else{
                GDYB.GridProductClass.updateGrid(Number(value), method);
            }
            this.val(0);
        });

        this.registerEnvents();

        //格点单元格编辑的实现
        var pt = null;
        var isKey = true; //是否通过键盘赋值
        //var map = GDYB.Page.curPage.map ||GridForecast.curMap;
        var map = that.map;
        map.events.register("click", map, function (event) {
            if (GDYB.GridProductClass.action != GDYB.CorrectAction.editCell || GDYB.GridProductClass.datasetGrid == null)
                return;
            $("#divInputValue_input").blur(); //让其失去焦点，使上一次完成更新
            var datasetGrid = GDYB.GridProductClass.datasetGrid;
            var ptPixel = event.xy;
            var lonlat = this.getLonLatFromPixel(ptPixel);
            pt = datasetGrid.xyToGrid(lonlat.lon, lonlat.lat);
            if(isKey){
                var lonlatCenter = datasetGrid.gridToXY(pt.x, pt.y);
                var ptPixcelCenter = this.getPixelFromLonLat({lon:lonlatCenter.x,lat:lonlatCenter.y});
                $("#divInputValue").css("display", "block");
                $("#divInputValue").css("top", (ptPixcelCenter.y -  $("#divInputValue")[0].offsetHeight/2)+"px");
                $("#divInputValue").css("left", (ptPixcelCenter.x - $("#divInputValue")[0].offsetWidth/2)+"px");
                $("#divInputValue_input").val(datasetGrid.getValue(0, pt.x, pt.y));
                $("#divInputValue_input").focus();
                $("#divInputValue_input").select();
            }
            else{
                datasetGrid.setValue(0, pt.x, pt.y, GDYB.GridProductClass.currentGridValueDown);
                GDYB.GridProductClass.layerFillRangeColor.refresh();
                GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime,  GDYB.GridProductClass.currentElement,  GDYB.GridProductClass.currentHourSpan, 1, GDYB.GridProductClass.datasetGrid); //更新已修改状态
                GDYB.GridProductClass.dataStack.push( GDYB.GridProductClass.datasetGrid); //压入堆栈
                GDYB.GridProductClass.updateStationLayer();
            }
        });

        $("#divInputValue_input").blur(function(){
        });

        $("#divInputValue_input").change(function(){
            if(pt == null || $("#divInputValue_input").val() == "")
                return;
            var strVal = $("#divInputValue_input").val();
            if(isNaN(strVal)){
                alert("不是数字");
                return;
            }
            $("#divInputValue").css("display", "none");
            GDYB.GridProductClass.datasetGrid.setValue(0, pt.x, pt.y, Number(strVal));
            GDYB.GridProductClass.layerFillRangeColor.refresh();
            GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime,  GDYB.GridProductClass.currentElement,  GDYB.GridProductClass.currentHourSpan, 1, GDYB.GridProductClass.datasetGrid); //更新已修改状态
            GDYB.GridProductClass.dataStack.push( GDYB.GridProductClass.datasetGrid); //压入堆栈
            GDYB.GridProductClass.updateStationLayer();
        });

        //画刷、橡皮擦的实现
        var modified = false;
        var mouseState = 0; //0-鼠标按下，1-鼠标移动，2-鼠标弹起

        map.events.register("mousedown", map, function(event){
            if(t.m_activeTool == "img_tool_erase" || t.m_activeTool == "img_tool_brush" && isWindSpeedBrush) {
                if (event.which == 1) {
                    mouseState = 0;
                    brush(event.xy);
                }
            }
        });

        map.events.register("mousemove", map, function(event){
            if(t.m_activeTool == "img_tool_erase"  || t.m_activeTool == "img_tool_brush" && isWindSpeedBrush){
                if(event.which == 1){
                    mouseState = 1;
                    brush(event.xy);
                }
            }
        });

        map.events.register("mouseup", map, function(event){
            mouseState = 2;
            if(t.m_activeTool == "img_tool_erase" || t.m_activeTool == "img_tool_brush" && isWindSpeedBrush) {
                if (event.which == 1) {
                    if(GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax"){
                        GDYB.GridProductClass.layerFillRangeColor.refresh();
                    }
                }
            }
        });

        function brush(xy){
            //var map = GDYB.Page.curPage.map;
            var map = that.map;
            var dg = GDYB.GridProductClass.datasetGrid;
            var increase = getIncrease();
            if(dg != null && (t.m_activeTool == "img_tool_erase" && t.dgLast != null || t.m_activeTool == "img_tool_brush" && isWindSpeedBrush)){
                var lonlat = map.getLonLatFromPixel(xy);
                var pt = dg.xyToGrid(lonlat.lon, lonlat.lat);
                if (pt != null) {
                    if(true) {
                        var radius = Math.floor((t.brushSize-1)/2);
                        var x0 = pt.x;
                        var y0 = pt.y;

                        var left = x0 - radius;
                        var right = x0 + (t.brushSize-radius-1);
                        var top = y0 - radius;
                        var bottom = y0 + (t.brushSize-radius-1);

                        var hasTag = typeof(dg.tag)!="undefined";
                        for (var y = top; y <= bottom; y++) {
                            for (var x = left; x <= right; x++) {
                                if (y < 0 || y >= dg.rows || x < 0 || x >= dg.cols)
                                    continue;

                                var targetValue = null;
                                var tag = null;
                                if(t.m_activeTool == "img_tool_erase") {
                                    targetValue = t.dgLast.getValue(0, x, y);
                                    if(hasTag)
                                        tag = t.dgLast.tag[y][x];
                                }
                                else if(t.m_activeTool == "img_tool_brush"){
                                    targetValue = GDYB.GridProductClass.currentGridValueDown;
                                    //add by pope 20160929 仿照盖章功能添加格点数值加减
                                    switch(mouseState){ //0-鼠标按下，1-鼠标移动，2-鼠标弹起
                                        case 0:
                                            if(parseFloat(dg.getValue(0, x, y)) && parseFloat(dg.getValue(0, x, y))!=0){
                                                if(increase.isAdd){
                                                    targetValue = Math.round((parseFloat(dg.getValue(0, x, y)) + increase.value)*10)/10;
                                                }
                                            }
                                            break;
                                        case 1:
                                            break;
                                        case 2:
                                            break;
                                    }

                                    if(hasTag){
                                        if(typeof(GDYB.GridProductClass.currentGridTag)!="undefined")
                                            tag = Number(GDYB.GridProductClass.currentGridTag);
                                        else
                                            tag = dg.defaultTag;
                                    }
                                }

                                if(tag == null && dg.getValue(0, x, y) == targetValue ||
                                    tag != null && dg.getValue(0, x, y) == targetValue && dg.tag[y][x] == tag)
                                    continue;
                                dg.setValue(0, x, y, targetValue);
                                if(hasTag)
                                    dg.tag[y][x] = tag;
                                modified = true;
                            }
                        }

                        GDYB.GridProductClass.layerFillRangeColor.refreshPart(left, bottom, right, top);
                    }
                }
            }
        }

        //橡皮擦后，更新已修改状态
        map.events.register("mouseup", map, function (event) {
            if(modified){
                modified = false;
                GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, GDYB.GridProductClass.currentHourSpan, 1,GDYB.GridProductClass.datasetGrid);
                GDYB.GridProductClass.dataStack.push(GDYB.GridProductClass.datasetGrid); //压入堆栈
                GDYB.GridProductClass.updateStationLayer();
            }
        });

        $("#rangeBrushSize").change(function(){
            t.brushSize = Number($(this).val());
            $("#divRangeTip").css("display", "none");
            t.updateBrush();
        });
        $("#rangeBrushSize").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });

        $("#rangeBrushSizeFix").change(function(){
            t.brushSize = Number($(this).val());
            $("#divRangeTip").css("display", "none");
        });
        $("#rangeBrushSizeFix").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });
		//当前图层格点数据全部清零
		$("#gridClearUp").click(function(){
			var map = that.map;
			var dg = GDYB.GridProductClass.datasetGrid;
			var rows = dg.rows;
			var cols = dg.cols;
			for (var i = 0; i < rows; i++) {
				for (var j = 0; j < cols; j++) {
					dg.setValue(0, j, i, 0);
				}
			}
			GDYB.GridProductClass.layerFillRangeColor.setDatasetGrid(dg);
			GDYB.GridProductClass.layerFillRangeColor.refresh();
			GDYB.GridProductClass.updateStationLayer();
		});

        // 边界图层透明度选择框 add by pope on 2016-11-22
        var m_transparencyBoundValue = 10;
        $("#m_transparencyBound").val(m_transparencyBoundValue);
		$("#m_transparencyBound").css( 'background', 'linear-gradient(to right, #379CE2, white '+(m_transparencyBoundValue/10)*100+'%, white)' );
        $("#m_transparencyBound").change(function(){
            if(GDYB.GridProductClass.layerBoundaryRegion!=null){
                GDYB.GridProductClass.layerBoundaryRegion.setOpacity(Number($(this).val())/10);// = Number($(this).val());
            }
            $("#divRangeTip").css("display", "none");
        });
        $("#m_transparencyBound").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html(Number($(this).val())/10);
            }
        });
        $("#m_transparencyBound").mouseover(function(e){
            var tip = $("#divRangeTip");
            tip.css("display", "block");
            tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
            tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
            tip.html(Number($(this).val())/10);
        });
        $("#m_transparencyBound").mouseout(function(e){
            $("#divRangeTip").css("display", "none");
        });

        // 填色图层透明度选择框 add by pope on 2016-11-16
        var transparencyValue = 100;
        $("#m_transparency").val(transparencyValue);
		$("#m_transparency").css( 'background', 'linear-gradient(to right, #379CE2, white '+(transparencyValue/255)*100+'%, white)' );
        $("#m_transparency").change(function(){
            if(GDYB.GridProductClass.layerFillRangeColor!=null){
                GDYB.GridProductClass.layerFillRangeColor.alpha = Number($(this).val());
                GDYB.GridProductClass.layerFillRangeColor.refresh();
            }
            $("#divRangeTip").css("display", "none");
        });
        $("#m_transparency").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });
        $("#m_transparency").mouseover(function(e){
            var tip = $("#divRangeTip");
            tip.css("display", "block");
            tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
            tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
            tip.html($(this).val());
        });
        $("#m_transparency").mouseout(function(e){
            $("#divRangeTip").css("display", "none");
        });

        $("#rangeStampSize").change(function(){
            t.brushSize = Number($(this).val());
            $("#divRangeTip").css("display", "none");
            t.updateBrush();
        });
        $("#rangeStampSize").mousemove(function(e){
            if(e.which == 1 && e.offsetX >= 0 && e.offsetX <= this.offsetWidth) {
                var tip = $("#divRangeTip");
                tip.css("display", "block");
                tip.css("top", (this.offsetTop - tip[0].offsetHeight)+"px");
                tip.css("left", (e.offsetX + this.offsetLeft - tip[0].offsetWidth/2)+"px");
                tip.html($(this).val());
            }
        });

        $("#checkboxBrushSizeFix").change(function(){
            if($("#checkboxBrushSizeFix")[0].checked)
                t.brushSize = Number($("#rangeBrushSizeFix").val());
            else
                t.brushSize = -1;
        });

        $("#input_add").click(function(){
            if(this.checked)
                $("#input_sub")[0].checked = false;
        });

        $("#input_sub").click(function(){
            if(this.checked)
                $("#input_add")[0].checked = false;
        });

        function getIncrease(){
            var val = Number($("#increaseValue").val());
            var isAdd = false;
            if($("#input_add")[0].checked){
                isAdd=true;
            }
            else if($("#input_sub")[0].checked){
                isAdd=true;
                val = val*-1;
            }
            return {value:val,isAdd:isAdd};
        }

        //盖章实现
        map.events.register("mousedown", map, function(event){
            if(t.m_activeTool == "img_tool_stamp"){
                if (event.which == 1) {
                    stamp(event.xy);
                }
            }
        });

        function stamp(xy){
            //var map = GDYB.Page.curPage.map;
            var map = that.map;
            var dg = GDYB.GridProductClass.datasetGrid;
            var increase = getIncrease();
            if(dg != null && t.m_activeTool == "img_tool_stamp"){
                var lonlat = map.getLonLatFromPixel(xy);
                var pt = dg.xyToGrid(lonlat.lon, lonlat.lat);
                if (pt != null) {
                    if(true) {
                        var radius = Math.floor((t.brushSize-1)/2);
                        var x0 = pt.x;
                        var y0 = pt.y;
                        var left = x0 - radius;
                        var right = x0 + (t.brushSize-radius-1);
                        var top = y0 - radius;
                        var bottom = y0 + (t.brushSize-radius-1);

                        var bWind = GDYB.GridProductClass.currentElement == "10uv" || GDYB.GridProductClass.currentElement == "wmax";
                        var maxThanZero = GDYB.GridProductClass.currentElement == "r3" ||
                            GDYB.GridProductClass.currentElement == "r12" ||
                            GDYB.GridProductClass.currentElement == "rh" ||
                            GDYB.GridProductClass.currentElement == "tcc" ||
                            GDYB.GridProductClass.currentElement == "vis";
                        for (var y = top; y <= bottom; y++) {
                            for (var x = left; x <= right; x++) {
                                if (y < 0 || y >= dg.rows || x < 0 || x >= dg.cols)
                                    continue;

                                var targetValue;
                                if(increase.isAdd)
                                    targetValue = Math.round((dg.getValue(0, x, y) + increase.value)*10)/10;
                                else
                                    targetValue = increase.value;
                                if( dg.getValue(0, x, y) == targetValue)
                                    continue;
                                if(targetValue < 0 && maxThanZero)
                                    targetValue = 0;
                                dg.setValue(0, x, y, targetValue);
                                modified = true;
                            }
                        }

                        GDYB.GridProductClass.layerFillRangeColor.refreshPart(left, bottom, right, top);
                    }
                }
            }
        }

        //格点值替换功能实现
        function replaceGrid(newValue, method){
            var dg = GDYB.GridProductClass.datasetGrid;
            if(dg == null)
                return;
            var min = GDYB.GridProductClass.currentGridValueDown;
            var max = GDYB.GridProductClass.currentGridValueUp;
            var maxThanZero = GDYB.GridProductClass.currentElement == "r3" ||
                GDYB.GridProductClass.currentElement == "r12" ||
                GDYB.GridProductClass.currentElement == "rh" ||
                GDYB.GridProductClass.currentElement == "tcc" ||
                GDYB.GridProductClass.currentElement == "vis";
            var rows = dg.rows;
            var cols = dg.cols;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var val = dg.getValue(0, j, i);
                    if(min <= val && val < max) {
                        if(method == 0)
                            val = newValue;
                        else if(method == 1)
                            val += newValue;
                        else if(method == 2)
                            val *= (1+newValue);
                        if (val < 0 && maxThanZero)
                            val = 0;
                        dg.setValue(0, j, i, Math.round(val*10)/10);
                    }
                }
            }
            GDYB.GridProductClass.layerFillRangeColor.refresh();

            GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, GDYB.GridProductClass.currentHourSpan, 1, dg); //更新已修改状态
            GDYB.GridProductClass.dataStack.push(GDYB.GridProductClass.datasetGrid); //压入堆栈
            GDYB.GridProductClass.updateStationLayer();

            var dZValues = [];
            dZValues.push(GDYB.GridProductClass.currentGridValueDown);
            dZValues.push(GDYB.GridProductClass.currentGridValueUp);
            t.addContour(dZValues);
        }
    };

    //恢复初始状态
    this.toInitialState = function(){
        $("#div_tools").find("img").removeClass("active");
        $("#div_setting").css("display", "none");
        $("#div_gridValuePicker").css("display", "none");
        $("#div_windDirectionPicker").css("display", "none");
        $("#div_IncreaseValuePicker").css("display", "none");
        $("#div_setting_assignment").css("display", "none");
        $("#div_setting_method").css("display", "none");
        $("#div_setting_method_input").css("display", "none");
        $("#div_setting_method_pick").css("display", "none");
        $("#div_setting_method_wind").css("display", "none");
        $("#div_setting_brushSize").css("display", "none");
        $("#div_setting_brushSizeFix").css("display", "none");
        $("#div_setting_importSetting").css("display", "none");
        $("#div_setting_calc").css("display", "none");
        $("#div_qhPicker").css("display", "none");
        $("#btn_modifyWindDirection").css("display", "none");
        $("#divInputValue").css("display", "none");
        $("#div_setting_ModifyWindDirection").css("display", "none");

        $("#gridValueDownToUp").css("display", "inline-block");
        $("#gridValueUp").css("display", "inline-block");
        $("#div_setting_assignment_spatial").css("display", "block");

        $("#btn_move").removeClass("active");
        $("#btn_copy").removeClass("active");
        $("#btn_modify").removeClass("active");

        this.m_activeTool = null;
        this.dgLast = null;

        if(this.inputRangeDigitValue != null)
            this.inputRangeDigitValue.val(0);
        if(this.inputRangeDigitAdd != null)
            this.inputRangeDigitAdd.val(0);
        if(this.inputRangeDigitIncrement != null)
            this.inputRangeDigitIncrement.val(0);

        $("#labelStation").attr("value", 0);
        $("#labelStation").css("background","");
        GDYB.GridProductClass.luoquCorrectJustOnStation = false;

        stopDrawLuoqu();
        if(GDYB.GridProductClass.layerMagic != null)
            GDYB.GridProductClass.layerMagic.removeAllFeatures();
//        if(GDYB.GridProductClass.layerClimaticRegion != null)
//            GDYB.GridProductClass.layerClimaticRegion.removeAllFeatures();
        if(GDYB.GridProductClass.drawFreePath != null)
            GDYB.GridProductClass.drawFreePath.deactivate();
        if(GDYB.GridProductClass.drawWindDirection != null)
            GDYB.GridProductClass.drawWindDirection.deactivate();
        GDYB.GridProductClass.action = GDYB.CorrectAction.none;
        GDYB.GridProductClass.currentGridTag = null;

        var  imagesLocation=WeatherMap.Util.getImagesLocation();
        this.map.div.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),default";
        //GDYB.Page.curPage.map.div.style.cursor="url('"+imagesLocation+"cursors/Pan.cur'),default";

        if(GDYB.GridProductClass.layerMapping != null)
            GDYB.GridProductClass.layerMapping.removeAllFeatures();

        //恢复鼠标滚动缩放地图、恢复双击缩放地图
        var map = GDYB.Page.curPage.map;
        for(var ckey in map.controls){
            var control = map.controls[ckey];
            if(control.CLASS_NAME == "WeatherMap.Control.Navigation"){
                control.enableZoomWheel();
                for(var hkey in control.handlers){
                    var handler = control.handlers[hkey];
                    if(handler.CLASS_NAME == "WeatherMap.Handler.Click"){
                        handler.double = true;
                        break;
                    }
                }
                break;
            }
        }

        //清除滤镜工具
        GDYB.FilterTool.clear();

        //停止绘制落区
        function stopDrawLuoqu(){
            startDragMap();
            if(GDYB.GridProductClass.drawLuoqu != null)
                GDYB.GridProductClass.drawLuoqu.deactivate();
            if(GDYB.GridProductClass.layerLuoqu != null)
                GDYB.GridProductClass.layerLuoqu.removeAllFeatures();
            if(GDYB.GridProductClass.layerLuoquCenter != null)
                GDYB.GridProductClass.layerLuoquCenter.removeAllFeatures();
        }

        function startDragMap()
        {
            var map = GDYB.Page.curPage.map;
            for(var i =0; i < map.events.listeners.mousemove.length; i++) {
                var handler = map.events.listeners.mousemove[i];
                if(handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag")
                {
                    handler.obj.active = true;
                }
            }
        }
    };

    this.updateBrush = function(){
        var style = {
            fillColor: "#cc0000",
            fillOpacity: 0.75,
            fill:false,
            strokeColor: "#000000",
            strokeWidth: 1.0,
            strokeOpacity:1.0,
            stroke: true
        };
        var geoRect = new WeatherMap.Geometry.Rectangle(0, 0, GDYB.GridProductClass.datasetGrid.deltaX * this.brushSize, GDYB.GridProductClass.datasetGrid.deltaY * this.brushSize);
        var feature = new WeatherMap.Feature.Vector(geoRect, null, style);
        GDYB.GridProductClass.layerMapping.removeAllFeatures();
        GDYB.GridProductClass.layerMapping.addFeatures([feature]);
    };

    this.registerEnvents = function(){
        var t = this;
        //销毁格点值点击
        $("#table_GridValueItems").find("td").unbind("click");
        //注册格点值点击
        $("#table_GridValueItems").find("td").click(function(){
            if(this.id == null || this.id == "")
                return;
            $("#gridValueDown").val(this.id.split("_")[0]);
            $("#gridValueUp").val(this.id.split("_")[1]);
            GDYB.GridProductClass.currentGridValueDown = Number($("#gridValueDown").val());
            GDYB.GridProductClass.currentGridValueUp = Number($("#gridValueUp").val());
            if(GDYB.GridProductClass.currentGridValueUp > GDYB.GridProductClass.currentGridValueDown)
                GDYB.GridProductClass.currentGridValueUp -= 0.1; //最小精度0.1，因为配置中是左闭右开，所以上限需要减去一个最小量
            GDYB.GridProductClass.currentGridTag = $(this).attr("tag");
            //startDrawLuoqu();
            //维持状态
            if($("#img_tool_drawluoqu").hasClass("active") || $("#img_tool_drawluoqunone").hasClass("active"))
            {
                GDYB.GridProductClass.drawLuoqu.activate();
                GDYB.GridProductClass.drawFreePath.deactivate(); //两者决不能同时进行
                if(GDYB.GridProductClass.layerMagic)
                    GDYB.GridProductClass.layerMagic.removeAllFeatures();
                $("#btn_move").removeClass("active");
                $("#btn_modify").removeClass("active");
                $("#btn_modifyWindDirection").removeClass("active");
            }

            //如果是拾取落区，把符合条件的格点轮廓提取出来
            if($("#img_tool_pickluoqu").hasClass("active")){
//                var dZValues = [];
//                dZValues.push(GDYB.GridProductClass.currentGridValueDown);
//                dZValues.push(GDYB.GridProductClass.currentGridValueUp);
//                t.addContour(dZValues);
                if(GDYB.GridProductClass.layerMagic != null){
                    GDYB.GridProductClass.layerMagic.removeAllFeatures();
                    GDYB.MagicTool.geoline = null;
                }
                GDYB.FilterTool.refresh(GDYB.GridProductClass.currentGridValueDown, GDYB.GridProductClass.currentGridValueUp);
            }
        });
    };
    this.init();
    this.panel.css({
        "top":"5px",
        "right":"10px"
    });

    this.updateUI = function(element, elementName, toInitialState){
        var t = this;
        $("#div_title")[0].innerHTML = elementName;
        var strHtml = "";
        if(GDYB.GridProductClass.layerFillRangeColor != null && GDYB.GridProductClass.layerFillRangeColor.items != null) {
            var styles = GDYB.GridProductClass.layerFillRangeColor.items;
            if(GDYB.GridProductClass.currentElement == "w") //如果是天气现象，仅列举无雨的天气。有雨天气现象由降水量决定，不在人工订正
                styles = heatMap_WOfNoRainStyles;
            if(typeof(styles[0].caption) == "undefined"){
                strHtml = "<table id='table_GridValueItems' style='width: 100%;text-align: center;'>";
                var cols = 5;
                var count = 1;
                var strTD = "";
                for (var key in styles) {
                    var style = styles[key];
                    var strTag = typeof(style.tag)=="undefined"?"":" tag='"+style.tag+"'";
                    strTD += "<td id='" + style.start + "_" + style.end+"'" + strTag + "><span style='display:inline-block;width:32px;height:32px;border:1px solid #adadad;text-align:center;line-height:32px;background:rgb(" + style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")'>" + style.start + "</span></td>";
                    if (count % cols == 0) {
                        strHtml += "<tr>" + strTD + "</tr>";
                        strTD = "";
                    }
                    else if (count == styles.length) {
                        strHtml += "<tr>" + strTD + "</tr>";
                    }
                    count++;
                }
                strHtml += "</table>";
            }
            else{
                strHtml = "<table id='table_GridValueItems' style='width: 100%;text-align: left;'>";
                var cols = 3;
                var count = 1;
                var strTD = "";
                for (var key in styles) {
                    var style = styles[key];
                    var strTag = typeof(style.tag)=="undefined"?"":" tag='"+style.tag+"'";
                    strTD += "<td id='" + style.start + "_" + style.end + "'" + strTag + " style='padding:5px 0px 0px 0px;text-align: center;'><span style='display:inline-block;border:1px solid #000;width:22px;height:22px;'><span class='luoquButton' style='display:inline-block;width:20px;height:20px;border:3px solid #fff;;background:rgb(" + style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")'></span></span><span style='vertical-align: top;display: inline-block;width: 60px;text-overflow: ellipsis;white-space:nowrap;overflow: hidden;'>" + style.caption + "</span></td>";
                    if (count % cols == 0) {
                        strHtml += "<tr>" + strTD + "</tr>";
                        strTD = "";
                    }
                    else if (count == styles.length) {
                        strHtml += "<tr>" + strTD + "</tr>";
                    }
                    count++;
                }
                strHtml += "</table>";
            }
        }

        $("#div_GridValueItems").html(strHtml);
        this.registerEnvents();

        //获取第一个按钮的值，作为初始值
        var tds = $("#table_GridValueItems").find("td");
        if(tds.length > 0) {
            var td = tds[0];
            if (typeof(td.id) != "undefined" && td.id != "") {
                var id = td.id;
                $("#gridValueDown").val(id.split("_")[0]);
                $("#gridValueUp").val(id.split("_")[1]);
                GDYB.GridProductClass.currentGridValueDown = Number($("#gridValueDown").val());
                GDYB.GridProductClass.currentGridValueUp = Number($("#gridValueUp").val());
                GDYB.GridProductClass.currentGridTag = $(td).attr("tag");
            }
        }

        var min = 0;
        var max = 0;
        if(element == "r3"){
            min = 0;
            max = 100;
        }
        else if(element == "r12"){
            min = 0;
            max = 100;
        }
        else if(element == "2t" || element == "tmin" || element == "tmax"){
            min = 0;
            max = 45;
        }
        else if(element == "10uv" || element == "wmax"){
            min = 0;
            max = 62;
        }
        else if(element == "w"){
            min = 0;
            max = 53;
        }
        else if(element == "air"){
            min = 1;
            max = 6;
        }
        else if(element == "rh"){
            min = 0;
            max = 100;
        }
        else if(element == "tcc"){
            min = 0;
            max = 10;
        }
        else if(element == "vis"){
            min = 0;
            max = 10;
        }
        $("#spanMinValue").html(min);
        $("#spanMaxValue").html(max);
        $("#rangeValue").attr("min", min);
        $("#rangeValue").attr("max", max);
        t.inputRangeDigitValue.min = min;
        t.inputRangeDigitValue.max = max;

        if(typeof(toInitialState) == "undefined" || toInitialState)
            this.toInitialState();
    };

    //显示赋值DIV
    this.showDivSettingAssignment = function(element, elementName){
        $("#div_setting_assignment").css("display", "block");
    };

    //隐藏赋值DIV
    this.hideDivSettingAssignment = function(element, elementName){
        $("#div_setting_assignment").css("display", "none");
    };

    //更新等值线
    this.addContour = function(dZValues){
        GDYB.GridProductClass.layerContour.removeAllFeatures();
        var contour = new Contour();
        var result = contour.analysis(GDYB.GridProductClass.datasetGrid, dZValues);
        var features = [];
        if(result.length > 0){
            for(var key in result) {
                var geoline = result[key].geoline;
                var dZValue = result[key].dZValue;
                var feature = new WeatherMap.Feature.Vector(geoline);
                feature.attributes.dZValue = dZValue.toString();
                features.push(feature);
            }
        }
        GDYB.GridProductClass.layerContour.addFeatures(features);
    };
    this.hiddenSingleTool=function(ids){
        ids.forEach(function(e){
            $("#"+e).hide();
        })
    }
	//滑块滑动样式
	var change = function($input) {
		/*内容可自行定义*/
	}

	$('#m_transparencyBound').RangeSlider({ min: 0,   max: 10,  step: 1,  cb: change});
	$('#m_transparency').RangeSlider({ min: 0,   max: 255,  step: 1,  cb: change});
	$('#rangeBrushSizeFix').RangeSlider({ min: 1,   max: 10,  step: 1,  cb: change});
	$('#rangeStampSize').RangeSlider({ min: 1,   max: 30,  step: 1,  cb: change});
	$('#rangeBrushSize').RangeSlider({ min: 1,   max: 10,  step: 1,  cb: change});
}
Panel_Tools.prototype = new DragPanelBase();

$.fn.RangeSlider = function(cfg){
	this.sliderCfg = {
		min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
		max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
		step: cfg && Number(cfg.step) ? cfg.step : 1,
		cb: cfg && cfg.cb ? cfg.cb : null
	};

	var $input = $(this);
	var min = this.sliderCfg.min;
	var max = this.sliderCfg.max;
	var step = this.sliderCfg.step;
	var cb = this.sliderCfg.cb;

	$input.attr('min', min)
		.attr('max', max)
		.attr('step', 1);

	$input.bind("input", function(e){
		$input.attr('value', this.value);
		var per =  this.value/(max - min)*100;
		$input.css( 'background', 'linear-gradient(to right, #379CE2, white ' + per + '%, white)' );

		if ($.isFunction(cb)) {
			cb(this);
		}
	});
};
