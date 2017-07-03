/**
 * 图例管理模块 Created by Pope on 2016/5/10.
 */
$.fn.getHexBackgroundColor = function() {
    var rgb = $(this).css('background-color');
    rgb = rgb.match(/^rgb((d+),s*(d+),s*(d+))$/);
    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
    return rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function LegendManager(TLContainer,layer){
    //构造函数
    if(!(this instanceof LegendManager)){
        return new LegendManager(TLContainer,layer);
    }
    this.styles = null;
    this.htmlStr = null;
    this.TLContainer = TLContainer;
    this.EditTLContainer ="#EditTL";
    this.layer = layer;
}
var fnLegend = LegendManager.prototype;
fnLegend.init =function(){

}
//返回修改后的Styles对象
fnLegend.getLegendStyles = function(){
    return this.styles;
}
//返回整个图例的样式
fnLegend.getLegendCSS = function(){
    return this.htmlStr;
}
//返回初始化样式
fnLegend.getInitStyles = function(){
    return this.styles;
}
//显示图例
fnLegend.showLegend = function(styles,company,isname){
    fn.company = company;
    fn.isname = isname;
    var m_company = company || "";
    var tatolHeight = 250;
    var minheight = tatolHeight/styles.length;
    var strColor = "";
    var strValue = "";
    var count = 7;
    var minVal = 0;
    var maxVal = 0;
    var lbl1 = 0;
    var lbl2 = 0;
    var step = 0;
    var html = '<h4 style="text-align: center"><strong>图&nbsp;&nbsp;&nbsp;&nbsp;例</strong></h4>';
    var dw =  '<div style="clear:both"></div> <div><h5 style="text-align: center">'+m_company+'</h5></div>';
    this.showNewLegend(styles,dw);
    //if(isname){
    //    $(this.TLContainer).append(html);
    //}
    //if(styles.length<=10){
    //    this.showNewLegend(styles,dw);
    //}
    //else {
    //    count = 7;
    //    for (var j = 0; j < styles.length; j++) {
    //        var styleElements = styles[j];
    //        lbl1 = styleElements.start;
    //        lbl2 = styleElements.end;
    //        if (lbl1 != undefined && lbl2 != undefined) {
    //            if (minVal == 0 || minVal >= lbl1) {
    //                minVal = lbl1;
    //            }
    //            if (maxVal <= lbl2) {
    //                maxVal = lbl2;
    //            }
    //            var colorObj = styleElements.startColor;
    //            var fillColor = "rgb(" + colorObj.red + "," + colorObj.green + "," + colorObj.blue + ")";
    //
    //            if (colorObj != undefined) {
    //                strColor = "<div style='width: 30px;height: " + minheight + "px;background-color: " + fillColor + "'></div>"+strColor;
    //            }
    //            else {
    //                strColor = "<div style='width: 30px;height: " + minheight + "px;'></div>"+strColor;
    //            }
    //        }
    //        else {
    //            //雷达或云图样式
    //            lbl1 = styleElements.start;
    //            lbl2 = styleElements.end;
    //            if (minVal == 0 || minVal >= lbl1) {
    //                minVal = lbl1;
    //            }
    //            if (maxVal <= lbl2) {
    //                maxVal = lbl2;
    //            }
    //            var colorObj = "rgb(" + styleElements.startColor.red + "," + styleElements.startColor.green + "," + styleElements.startColor.blue + ")";
    //
    //            if (styleElements.startColor != undefined) {
    //                strColor += "<div style='width: 30px;height: " + minheight + "px;background-color: " + colorObj + "'></div>";
    //            }
    //            else {
    //                strColor += "<div style='width: 30px;height: " + minheight + "px;'></div>";
    //            }
    //        }
    //    }
    //    step = Math.round((lbl1 - minVal) / count);
    //    var m_height =(tatolHeight / count);
    //    var last_height =(tatolHeight / (count + 1)) + 4;
    //    for (var i = 0; i < count; i++) {
    //        if (i == 0) {
    //            strValue = "<div style='height: " + m_height + "px;line-height: " + m_height*2 + "px'><span style='margin-left: 5px'>" + minVal.toString() + "</span></div>";
    //        } else {
    //            strValue = "<div style='height: " + m_height + "px;line-height: " + m_height*2 + "px'><span style='margin-left: 5px'>" + minVal.toString() + "</span></div>" + strValue;
    //        }
    //        minVal += step;
    //    }
    //    //strValue += "<tr><td style='padding-bottom: 0' height=" + last_height + "px;><span>" + maxVal.toString() + "</span></td></tr>";
    //    var htmlStr = "<div style='border-style:solid;border-width:1px;border-color:rgba(25, 25, 25, 0.91);float:left;height: 250px;'>" + strColor + "</div>";
    //    htmlStr += "<div style='float:left;height: 250px;'>" + strValue + "</div>";
    //    htmlStr += dw;
    //    $(this.TLContainer).append(htmlStr);
    //    //$(this.TLContainer).append(dw);
    //    this.htmlStr = htmlStr;
    //    this.styles = styles;
    //}
}
fnLegend.showNewLegend = function(styles,dw){
    var lengendStr = "";
    var lblStr = "";
    var tatolHeight = 250;
    var minheight = tatolHeight/styles.length;
    for(var i in styles){
        var styleElements = styles[i];
        var lbl1 = styleElements.start;
        var lbl2 = styleElements.end;
        var colorObj = styleElements.startColor;
        var fillColor = "rgb(" + colorObj.red + "," + colorObj.green + "," + colorObj.blue + ")";
        var strColor ="";
        var strValue = ";"
        if(colorObj != undefined){
            strColor = "<div style='width: 30px;height: " + minheight + "px;background-color: " + fillColor +  "'></div>";
            strValue = "<div style='height: " + minheight + "px;line-height: " + minheight*2 + "px'><span style='margin-left: 5px'>" + lbl1.toString() +"</span></div>";
            //str = "<div><div style='float:left; border-style:solid;border-width:1px;border-color:rgba(25, 25, 25, 0.91);width: 30px;height: " + minheight + "px;background-color: " + colorObj.fillColor +  "'></div><div style='height: " + minheight + "px;'><span>" + lbl1.toString() +"</span></div></div>";
        }else{
            strColor = "<div style='width: 30px;height: " + minheight + "px;'></div>";
            strValue = "<div style='height: " + minheight + "px;line-height: " + minheight*2 + "px'><span style='margin-left: 5px'>" + lbl1.toString() +"</span></div>";
            //str = "<div><div style='float:left; border-style:solid;border-width:1px;border-color:rgba(25, 25, 25, 0.91);width: 30px;height: " + minheight + "px;'></div><div style='height: " + minheight + "px;'><span>" + lbl1.toString() +"</span></div></div>";
        }

        lengendStr = strColor + lengendStr;
        lblStr = strValue + lblStr;
    }
    var htmlStr = "<div style='border-style:solid;border-width:1px;border-color:rgba(25, 25, 25, 0.91); float: left'>" + lengendStr + "</div>";
    htmlStr += "<div style='float:left;'>" + lblStr + "</div>";
    htmlStr += dw;
    $(this.TLContainer).append(htmlStr);
    this.styles = styles;
    this.htmlStr = htmlStr;
}
fnLegend.showMyLegend = function(styles,company){
    var m_company = company || "";
    var tatolHeight = 250;
    var minheight = tatolHeight/styles.length;
    var strColor = "";
    var strValue = "";
    var count = 7;
    var minVal = 0;
    var maxVal = 0;
    var lbl1 = 0;
    var lbl2 = 0;
    var step = 0;
    var html = '<h4 style="text-align: center"><strong>图&nbsp;&nbsp;&nbsp;&nbsp;例</strong></h4>'
        +'<h5 style="text-align: center">'+m_company+'</h5>';
    $(this.TLContainer).append(html);
    if(styles.length<=10){
        this.showNewLegend(styles);
    }
    else {
        count = 7;
        for (var j = 0; j < styles.length; j++) {
            var styleElements = styles[j];
            lbl1 = styleElements.start;
            lbl2 = styleElements.end;

            if (lbl1 != undefined && lbl2 != undefined) {
                if (minVal == 0 || minVal >= lbl1) {
                    minVal = lbl1;
                }
                if (maxVal <= lbl2) {
                    maxVal = lbl2;
                }
                var colorObj = "rgb(" + styleElements.startColor.red + "," + styleElements.startColor.green + "," + styleElements.startColor.blue + ")";

                if (colorObj != undefined) {
                    strColor += "<tr><td><div style='width: 30px;height: " + minheight + "px;background-color: " + colorObj + "'></div></td></tr>";
                }
                else {
                    strColor += "<tr><td><div style='width: 40px;height: " + minheight + "px;'></div></td></tr>";
                }
            }
            else {
                //雷达或云图样式
                lbl1 = styleElements.start;
                lbl2 = styleElements.end;
                if (minVal == 0 || minVal >= lbl1) {
                    minVal = lbl1;
                }
                if (maxVal <= lbl2) {
                    maxVal = lbl2;
                }
                var colorObj = "rgb(" + styleElements.startColor.red + "," + styleElements.startColor.green + "," + styleElements.startColor.blue + ")";

                if (styleElements.startColor != undefined) {
                    strColor += "<tr><td><div style='width: 30px;height: " + minheight + "px;background-color: " + colorObj + "'></div></td></tr>";
                }
                else {
                    strColor += "<tr><td><div style='width: 40px;height: " + minheight + "px;'></div></td></tr>";
                }
            }
        }
        step = Math.round((lbl1 - minVal) / count);
        var m_height =(tatolHeight / count);
        var last_height =(tatolHeight / (count + 1)) + 4;
        for (var i = 0; i < count; i++) {
            if (i == 0) {
                strValue += "<tr><td><span>" + minVal.toString() + "</span></td></tr>";
            } else {
                strValue += "<tr><td height=" + m_height + "px;><span>" + minVal.toString() + "</span></td></tr>";
            }
            minVal += step;
        }
        //strValue += "<tr><td style='padding-bottom: 0' height=" + last_height + "px;><span>" + maxVal.toString() + "</span></td></tr>";
        var htmlStr = "<div style='float:left;height: 250px;'><table>" + strColor + "</table></div>";
        htmlStr += "<div style='float:left;;height: 250px; text-align:center'><table>" + strValue + "</table></div>";
        $(this.TLContainer).append(htmlStr);
        this.htmlStr = htmlStr;
        this.styles = styles;
    }
}
fnLegend.showLegend2 = function(styles){
    var lengendStr = "";
    var tatolHeight = 250;
    var minheight = tatolHeight/styles.length;
    for(var i in styles){
        var styleElements = styles[i];
        var lbl1 = styleElements[0];
        var lbl2 = styleElements[1];
        var colorObj = styleElements[2];
        var str;
        if(colorObj.fillColor != undefined){
            str = "<tr><td><div style='width: 30px;height: " + minheight + "px;background-color: " + colorObj.fillColor +  "'></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
        }else{
            str = "<tr><td><div style='width: 30px;height: " + minheight + "px;'></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
        }
        lengendStr = lengendStr + str;
    }
    var htmlStr = "<table style='width: 30px;'>"+ lengendStr + "</table>";
    $(this.TLContainer).append(htmlStr);
    this.styles = styles;
    this.htmlStr = htmlStr;
}
fnLegend.showLegend3 = function(styles){
    var lengendStr = "";
    var count,m_length,k;
    var n_styles =[];
    var tatolHeight = 250;
    if(styles.length>10){
        if(styles.length<=20){
            m_length = 3;
        }
        else if(styles.length>20 && styles.length<=30){
            m_length =4;
        }
        else if(styles.length>30 && styles.length<=40){
            m_length =5;
        }
        else if(styles.length>40 && styles.length<=50){
            m_length =6;
        }
        count = Math.floor(styles.length/m_length);//向下取整
        for(i = 0; i<= styles.length; i+=m_length){
            var m = i+m_length-1;
            if(m<styles.length){
                var maxqj =styles[m][1];
                styles[i][1] = maxqj;
            }
            if(i+m_length>styles.length && i!=styles.length-1){
                styles[i][1] = styles[styles.length-1][0];
            }
            n_styles.push(styles[i]);//重构新的数组
            k = i;
        }
        if(k != styles.length-1){
            n_styles.push(styles[styles.length-1]);
        }
        styles = n_styles;
    }

    var minheight = tatolHeight/styles.length;
    for(var i = 0; i<styles.length; i++){
        var styleElements = styles[i];
        var lbl1 = styleElements[0];
        var lbl2 = styleElements[1];
        var colorObj = styleElements[2];
        var str;
        if(colorObj.fillColor != undefined){
            str = "<tr><td><div style='width: 30px;height: " + minheight + "px;background-color: " + colorObj.fillColor +  "'></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
        }else{
            str = "<tr><td><div style='width: 30px;height: " + minheight + "px;'></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
        }
        lengendStr = lengendStr + str;
    }
    var htmlStr = "<table style='width: 30px;'>"+ lengendStr + "</table>";
    $(this.TLContainer).append(htmlStr);
    this.htmlStr = htmlStr;
    this.styles = styles;
}
//显示图例编辑器
fnLegend.showEditor = function(width,height,SaveCallback){
    var that = this;
    var width = width || "638px";
    var height = height || "660px";
    this.appendDialog();
    $(that.TLContainer).on('click', function(){
        $(that.EditTLContainer).empty();
        var div,html = "";
        var styles = that.styles;
        for(var i = 0; i<styles.length; i++){
            var styleElements = styles[i];
            var lbl1 = styleElements.start;
            var lbl2 = styleElements.end;
            var colorObj = "rgb(" + styleElements.startColor.red + "," + styleElements.startColor.green + "," + styleElements.startColor.blue + ")";
            var fillColor = rgb2hex(colorObj);
            div ='<div class="row" style="cursor: pointer">'+
                '<div class="col-md-6 color">'+
                '<div class="row">'+
                '<div class="col-md-2">'+
                '<input type="checkbox" name="TLCK" class="form-control" >'+
                '</div>'+
                '<div class="col-md-10">'+
                '<div><input type="text" class="form-control myminicolors" value="'+ fillColor +'"></div>'+
                '</div></div>'+
                '</div>'+
                '<div class="col-md-6 qj">'+
                '<div class="row">'+
                '<div class="col-md-5">'+
                '<input type="text" class="form-control" value="'+lbl1+'">'+
                '</div>'+
                '<div class="col-md-2">'+
                '<label style="margin-bottom: 0">至</label>'+
                '</div>'+
                '<div class="col-md-5">'+
                '<input type="text" class="form-control" value="'+lbl2+'">'+
                '</div></div></div>'+
                '</div>';
            html += div;
        }
        $(that.EditTLContainer).append(html);
        that.useColor();
        that.sorTable(that.EditTLContainer);//排序
        that.showLayer(width,height);
        that._event(SaveCallback);//添加事件
    });
}
//显示图例编辑器
fnLegend.showEditor2 = function(width,height,SaveCallback){
    var that = this;
    var width = width || "638px";
    var height = height || "660px";
    this.appendDialog();
    $(that.TLContainer).on('click', function(){
        $(that.EditTLContainer).empty();
        var div,mColor,t;
        var html ="";
        var t01 = $(that.TLContainer+" table tr").length;
        $(that.TLContainer).find("table").find("tr").each(function(i) {
            $(this).find("td").each(function(j){
                t = $(this).text();
                if(t ==""){
                    var mRgb = $(this).find("div").css('background-color');
                    mColor = that.RgbToHex(mRgb);
                }
                else{
                    t = t.split('~');
                }
            });
            div ='<div class="row" style="cursor: pointer">'+
                '<div class="col-md-6 color">'+
                '<div class="row">'+
                '<div class="col-md-2">'+
                '<input type="checkbox" name="TLCK" class="form-control" >'+
                '</div>'+
                '<div class="col-md-10">'+
                '<div><input type="text" class="form-control myminicolors" value="'+mColor+'"></div>'+
                '</div></div>'+
                '</div>'+
                '<div class="col-md-6 qj">'+
                '<div class="row">'+
                '<div class="col-md-5">'+
                '<input type="text" class="form-control" value="'+t[0]+'">'+
                '</div>'+
                '<div class="col-md-2">'+
                '<label style="margin-bottom: 0">至</label>'+
                '</div>'+
                '<div class="col-md-5">'+
                '<input type="text" class="form-control" value="'+t[1]+'">'+
                '</div></div></div>'+
                '</div>';
            html+=div;
        });
        $(that.EditTLContainer).append(html);
        that.useColor();
        that.sorTable(that.EditTLContainer);//排序
        that.showLayer(width,height);
        that._event(SaveCallback);//添加事件
    });
}
//保存图例
fnLegend.SaveTL = function(SaveCallback){
    $(this.TLContainer).empty();
    var m_styles =[];
    $(this.EditTLContainer).children(".row").each(function(i){
        var temArr = {};
        var color = $(this).find(".color").find("input").eq(1).val();
        var rgbColor = color.colorRgb();
        var strRGBcolor = rgbColor.substr(4, rgbColor.length - 5);
        var arrRGB = strRGBcolor.split(",");
        var lbl1 = $(this).find(".qj").find("input").eq(0).val();
        var lbl2 = $(this).find(".qj").find("input").eq(1).val();
        temArr.start = parseFloat(lbl1);
        temArr.end = parseFloat(lbl2);
        if(color != undefined && color != ""){
            temArr.endColor = {
                red : 255,
                green : 0,
                blue : 0
            };
            temArr.startColor = {
                red : parseFloat(arrRGB[0]),
                green : parseFloat(arrRGB[1]),
                blue : parseFloat(arrRGB[2])
            };
        }
        m_styles.push(temArr);
    });
    this.styles = m_styles;
    this.showLegend(this.styles, fn.company, fn.isname);
    if($.isFunction(SaveCallback)){
        SaveCallback.call(this,m_styles);
    }
    layer.msg('保存成功！', {
        icon: 1,
        time: 1000 //2秒关闭（如果不配置，默认是3秒）
    }, function(){
        //do something
    });
}
fnLegend.SaveTL2 = function(SaveCallback){
    $(this.TLContainer).empty();
    var t = $(this.EditTLContainer).children(".row").length;
    var lengendStr = "";
    var a ={};
    var m_styles =[];
    var tatolHeight = 250;
    var minheight = tatolHeight/t;
    $(this.EditTLContainer).children(".row").each(function(i){
        var temArr =[];
        var color = $(this).find(".color").find("input").eq(1).val();
        var lbl1 = $(this).find(".qj").find("input").eq(0).val();
        var lbl2 = $(this).find(".qj").find("input").eq(1).val();
        //var colorObj = styleElements[2];
        var str;
        if(color != undefined && color != ""){
            str = "<tr><td><div style='width: 30px;height: " + minheight + "px;background-color: " + color +  "'></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
            a ={
                strokeColor: "#ff0000",
                strokeWidth: 0.5,
                stroke:false,
                fillColor: color,
                fillOpacity: "0.5"
            }
        }
        else{
            str = "<tr><td><div></div></td><td><span>" + lbl1.toString() + "~" + lbl2.toString() +"</span></td></tr>";
            a = {
                stroke: false,
                fill: false
            }
        }
        temArr.push(parseFloat(lbl1));
        temArr.push(parseFloat(lbl2));
        temArr.push(a);
        m_styles.push(temArr);
        //class='colorBlock'
        lengendStr = lengendStr + str;
    });
    var htmlStr = "<table style='width: 30px;'>"+ lengendStr + "</table>";
    $(this.TLContainer).html(htmlStr);
    this.htmlStr = htmlStr;
    this.styles = m_styles;
    if($.isFunction(SaveCallback)){
        SaveCallback.call(this,m_styles);
    }
    layer.msg('保存成功！', {
        icon: 1,
        time: 1000 //2秒关闭（如果不配置，默认是3秒）
    }, function(){
        //do something
    });
}
//添加图例
fnLegend.addTL = function(){
   var div ='<div class="row" style="cursor: pointer">'+
       '<div class="col-md-6 color">'+
       '<div class="row">'+
       '<div class="col-md-2">'+
       '<input type="checkbox" name="TLCK" class="form-control" >'+
       '</div>'+
       '<div class="col-md-10">'+
       '<div><input type="text" class="form-control myminicolors"></div>'+
       '</div></div>'+
       '</div>'+
       '<div class="col-md-6 qj">'+
       '<div class="row">'+
       '<div class="col-md-5">'+
       '<input type="text" class="form-control">'+
       '</div>'+
       '<div class="col-md-2">'+
       '<label style="margin-bottom: 0">至</label>'+
       '</div>'+
       '<div class="col-md-5">'+
       '<input type="text" class="form-control">'+
       '</div></div></div>'+
       '</div>';
   $(this.EditTLContainer).append(div);
   this.IsOrNotSorTable(this.EditTLContainer);
   this.useColor();
}
//删除图例
fnLegend.deleteTL = function(container){
    if($(container).length > 0){
        layer.confirm('确定要移除该图例?', {icon: 3, title:'提示'}, function(index){
            $(container).parent().parent().parent().parent().remove();
            layer.msg('移除图例成功', {
                icon: 1,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
            }, function(){
                //do something
            });
        });
    }
   else{
        layer.msg('请选择要移除的图例', {
            icon: 1,
            time: 1000 //2秒关闭（如果不配置，默认是3秒）
        }, function(){
            //do something
        });
    }

}
//事件绑定函数
fnLegend._event = function(SaveCallback){
    var that = this;
    $("#saveTL").on('click',function(){
        that.SaveTL(SaveCallback);
    });
    $("#addTL").on('click',function(){
        that.addTL();
    });
    $("#deleteTL").on('click',function(){
        var container = "input[name='TLCK']:checked"; //获取被选中的checkbox  type='checkbox' input[name='TLCK']:checked
        that.deleteTL(container);
    });
}
//元素排序
fnLegend.sorTable =function(container){
    $(container).sortable({
        revert: true,
        cancel: 'input' //阻止排序动作在匹配的元素上发生
    });
    this.IsOrNotSorTable(container);
}
fnLegend.IsOrNotSorTable =function(container){
    $('input').focus(function () {
        $(container).sortable('disable');//禁止
    }).blur(function () {
        $(container).sortable('enable');//激活
    });
}
fnLegend.useColor =function(){
    $('.myminicolors').each( function() {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function(hex, opacity) {
                if( !hex ) return;
                if( opacity ) hex += ', ' + opacity;
                try {
                    console.log(hex);
                } catch(e) {}
            },
            theme: 'bootstrap'
        });
    });
}
fnLegend.showLayer =function(width,height){
    layer.open({
        type: 1,
        title:"图例编辑器",
        shade: 0,
        offset: ['100px', '100px'],
        shift:4,
        maxmin: true,
        moveType: 1,
        area: [width, height],
        //shadeClose: true, //点击遮罩关闭
        content: $("#mDialog")
    });
}
fnLegend.appendDialog = function () {
    var html ='<div id="mDialog" class="well" style="width:620px;display: none">'+
        '<nav id="DHT" class="navbar navbar-default">'+
        '<div class="container-fluid">'+
        '<a type="text" id="addTL" class="btn btn-default">添加</a>'+
        '<a type="text" id="saveTL" class="btn btn-default">保存</a>'+
        '<a type="text" id="deleteTL"  class="btn btn-default">移除</a>'+
        '</div>'+
        '</nav>'+
        '<div class="row">'+
        '<div class="col-md-6">'+
        '<label>图例颜色</label>'+
        '</div>'+
        '<div class="col-md-6">'+
        '<label>图例区间</label>'+
        '</div>'+
        '</div>'+
        '<div id="EditTL" style="width:600px;" class="row">'+
        '</div>'+
        '</div>';
    $('body').append(html);
}
//RGB颜色转换为16进制
fnLegend.RgbToHex = function(rgb){
    var regexp = /[0-9]{0,3}/g;
    var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
    var hexColor = "#"; var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    for (var i = 0; i < re.length; i++) {
        var r = null, c = re[i], l = c;
        var hexAr = [];
        while (c > 16){
            r = c % 16;
            c = (c / 16) >> 0;
            hexAr.push(hex[r]);
        } hexAr.push(hex[c]);
        if(l < 16&&l != ""){
            hexAr.push(0)
        }
        hexColor += hexAr.reverse().join('');
    }
    return hexColor;
}
