/**
 * 一致性检查
 * Created by POPE on 2016/11/14.
 */
function Panel_YZXJC(div){
    if(!(this instanceof Panel_YZXJC)){
        return new Panel_YZXJC();
    }
    this.div = div;
    this.tab1 = "";
    this.map = GDYB.Page.curPage.map;
}
var fnYZXJC = Panel_YZXJC.prototype;

fnYZXJC.initPanel = function (callback) {
    var self = this;
    self.createDom();
    self.checkConsistent(function (dataArr) {
        self.showTab();
        if($.isFunction(callback)){
            callback.call(null,dataArr);
        }
    });
}
fnYZXJC.createDom = function() {
    var self = this;
    var div =+'<div class="body">'
        +'<div class="btn-group" data-toggle="buttons">'
        +'<a id="m_Correction" class="btn">订正</a>'
        +'<a id="m_Correction_2t" class="btn">订正3小时</a>'
        +'</div>'
        +'<div id="yzxjcContent" class="ystjContent" style="height:600px; overflow:scroll; overflow-x:hidden;"></div>'
        +'</div>';
    self.tab1 = $(div).appendTo(this.div);
}

//创建一致性信息列表
fnYZXJC.createTable =function (data) {
    var that = this;
    var table ='<table id = "yzxjcTable" class="yzxjcTable" style="text-align:center;">'
        +'<thead class="fixedThead">'
        +'<tr>'
        +'<th width="40" style="text-align:center;">3t时效</th>'
        +'<th width="40" style="text-align:center;">时效</th>'
        +'<th width="60" style="text-align:center;">格点位置</th>'
        +'<th width="60" style="text-align:center;">日最高温</th>'
        +'<th width="40" style="text-align:center;">气温</th>'
        +'<th width="60" style="text-align:center;">日最低温</th>'
        +'<th width="100" style="text-align:center;">检查类型</th>'
        +'<th style="text-align:center;display:none;">X坐标</th>'
        +'<th style="text-align:center;display:none;">Y坐标</th>'
        +'</tr>'
        +'</thead>'
        +'<tbody class="scrollTbody">'
        +'</tbody>'
        +'</table>';
    $("#yzxjcContent").append(table);
    if(data!= null && data.length>0){
        var tr = '';
        data.length = 2000;
        var len = data.length;
        for(var i =0; i<len;i++){
            var x = data[i].x;
            var y = data[i].y;
            var grid = "("+x + "," + y +")";
            var checkType = data[i].checkType;
            var temHourSpan = data[i].temHourSpan; //3t时效
            var maxMinTemHourSpan = data[i].maxMinTemHourSpan; //高低温时效
            var dValueMaxTem = data[i].dValueMaxTem; //日最高气温
            var dValueMinTem = data[i].dValueMinTem; //日最低气温
            var dValueTem = data[i].dValueTem; //2t气温
            tr+='<tr >' +
                '<td width="40" flag = "temHourSpan">'+temHourSpan+'</td>' +
                '<td width="40" flag = "maxMinTemHourSpan">'+maxMinTemHourSpan+'</td>' +
                '<td width="60" flag = "grid">'+grid+'</td>' +
                '<td width="60" flag = "dValueMaxTem">'+dValueMaxTem+'</td>' +
                '<td width="40" flag = "dValueTem">'+dValueTem+'</td>' +
                '<td width="60" flag = "dValueMinTem">'+dValueMinTem+'</td>' +
                '<td width="100" flag = "checkType">'+checkType+'</td>' +
                '<td style="display:none;" flag = "x">'+x+'</td>' +
                '<td style="display:none;" flag = "y">'+y+'</td>' +
                '</tr>';
        }
        $('#yzxjcTable tbody').append(tr);
        that._event(data); //订正
    }
}
// 一致性检查
fnYZXJC.checkConsistent =function(callback) {
    $("#yzxjcContent").empty();
    this.TemConsistent(callback);
}
//气温、日最高气温、日最低气温一致性检查
fnYZXJC.TemConsistent =function(callback) {
    var that =this;
    var dataArr =[];
    var dataCache = GDYB.GridProductClass.dataCache;
    var makeTime = GDYB.GridProductClass.currentMakeTime;
    var version = GDYB.GridProductClass.currentVersion;
    var currentDateTime = GDYB.GridProductClass.currentDateTime;

    var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
    var temHourSpans = that.getHourSpan("2t");

    dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
        dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
            dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
                if(dataCacheTem!=null){
                    var count =0;
                    var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
                    var yLen = temHourSpans.length; //2t时效
                    for(var i =0; i<xLen; i++){
                        var maxMinTemHourSpan = maxMinTemHourSpans[i];
                        if(dataCacheMaxTem[maxMinTemHourSpan]!=null && dataCacheMinTem[maxMinTemHourSpan]!=null){
                            var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
                            var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
                            if(dgMaxTem!=null && dgMinTem!=null){
                                var cols = dgMaxTem.cols;
                                var rows = dgMaxTem.rows;
                                for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
                                    var k = i + count;
                                    count++;
                                    if(k <= yLen){
                                        var temHourSpan = temHourSpans[k];
                                        if(dataCacheTem[temHourSpan]!=null){
                                            var dgTem = dataCacheTem[temHourSpan].data;
                                            if(dgTem!=null && dgTem.grid!=null){
                                                for (var m = 0; m < rows; m++) {
                                                    for (var n = 0; n < cols; n++) {
                                                        var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
                                                        var dValueTem = dgTem.getValue(0, n, m);//气温
                                                        var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温
                                                        var m_obj = {};
                                                        var index= -1;
                                                        if(dValueMaxTem < dValueTem){
                                                            m_obj.maxMinTemHourSpan = maxMinTemHourSpan;
                                                            m_obj.temHourSpan = temHourSpan;
                                                            m_obj.dValueMaxTem = dValueMaxTem;
                                                            m_obj.dValueMinTem = dValueMinTem;
                                                            m_obj.dValueTem = dValueTem;
                                                            m_obj.x = m; //格点行
                                                            m_obj.y = n; //格点列
                                                            m_obj.jclx = "温度要素一致性检查"; //检查类型
                                                            m_obj.checkType = "日最高温度<3小时气温"; //检查类型
                                                            // m_obj.checkType = "不符合日最高温度>3小时气温>日最低温度"; //错误类型
                                                            dataArr.push(m_obj);
                                                            // index = that.findElem(dataArr,m_obj);
                                                            // if(index ==-1){
                                                            //     dataArr.push(m_obj);
                                                            // }
                                                        }
                                                        else if(dValueTem < dValueMinTem){
                                                            m_obj.maxMinTemHourSpan = maxMinTemHourSpan;
                                                            m_obj.temHourSpan = temHourSpan;
                                                            m_obj.dValueMaxTem = dValueMaxTem;
                                                            m_obj.dValueMinTem = dValueMinTem;
                                                            m_obj.dValueTem = dValueTem;
                                                            m_obj.x = m; //格点行
                                                            m_obj.y = n; //格点列
                                                            m_obj.jclx = "温度要素一致性检查"; //检查类型
                                                            m_obj.checkType = "日最低温度>3小时气温"; //错误类型
                                                            dataArr.push(m_obj);
                                                            // index = that.findElem(dataArr,m_obj);
                                                            // if(index ==-1){
                                                            //     dataArr.push(m_obj);
                                                            // }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    that.createTable(dataArr); //添加信息列表
                    if($.isFunction(callback)){
                        callback.call(null,dataArr);
                    }
                }
                else{
                    layer.closeAll();
                    layer.alert("3小时温度无数据！");
                }
            });
        });
    });
}
fnYZXJC.findElem = function(arrayToSearch,obj){
    var len = arrayToSearch.length;
    for(var i = len;i--;) {   //递减到0
        if(arrayToSearch[i].hourSpan== obj.hourSpan && arrayToSearch[i].dValueMaxTem== obj.dValueMaxTem && arrayToSearch[i].dValueTem== obj.dValueTem && arrayToSearch[i].dValueMinTem== obj.dValueMinTem){
            return i;
        }
    }
    return -1;
}
//日最高气温、日最低气温-3小时气温
fnYZXJC.tmaxTminConsistent =function(cc,callback) {
    var elementSrc ="tmax";//日最高气温
    var elementTarget ="2t";//3小时温度
    cc.cal(function () { //日最高气温-3小时气温
        elementSrc ="tmin";//日最低气温
        cc.cal(function () { //日最低气温-3小时气温
            if($.isFunction(callback)){
                callback.call(null);
            }
        }, elementSrc, elementTarget);
    }, elementSrc, elementTarget);
}
fnYZXJC.getHourSpan = function(element){
    return GDYB.GDYBPage.getHourSpan(element);
};
//一致性检查事件 add by pope on 2016-11-12
fnYZXJC._event= function(data){
    var that =this;
    //订正最高低温度
    $("#m_Correction").on("click",function(){
        that.correctionMaxMinTemp(function (msg) {
            layer.alert("订正完毕!");
            if (GDYB.GridProductClass.layerFillRangeColor != null){
                GDYB.GridProductClass.layerFillRangeColor.refresh();
            }
        });
        // if(data!=null){
        //     var msg = layer.msg('正在订正，请稍候...', {
        //         icon: 1,
        //         time: 0
        //     });
        //     dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
        //         dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
        //             var count = 0;
        //             var len = data.length;
        //             for(var i = len;i--;) {   //递减到0
        //                 var maxTempValue = 0;
        //                 var minTempValue = 0;
        //                 var item = data[i];
        //                 var hourSpan = item.hourSpan;
        //                 var dValueMaxTem = item.dValueMaxTem;
        //                 var dValueMinTem = item.dValueMinTem;
        //                 var dValueTem = item.dValueTem;
        //                 var x = item.x; //格点行
        //                 var y = item.y; //格点列
        //                 var dgMaxTem = dataCacheMaxTem[hourSpan].data;
        //                 var dgMinTem = dataCacheMinTem[hourSpan].data;
        //                 if(dgMaxTem!=null){
        //                     if(dValueMaxTem<dValueTem){
        //                         maxTempValue = dValueTem;
        //                         dgMaxTem.setValue(0, y, x, maxTempValue);
        //                         count++;
        //                     }
        //                 }
        //                 if(dgMinTem!=null){
        //                     if(dValueMinTem>dValueTem){
        //                         minTempValue = dValueTem;
        //                         dgMinTem.setValue(0, y, x, minTempValue);
        //                         count++;
        //                     }
        //                 }
        //             }
        //             var l =maxMinTemHourSpans.length;
        //             for(var j = l;j--;) {   //递减到0
        //                 var hourSpanUpdate = maxMinTemHourSpans[j];
        //                 var dgMaxTemUpdate = dataCacheMaxTem[hourSpanUpdate].data;
        //                 var dgMinTemUpdate = dataCacheMinTem[hourSpanUpdate].data;
        //                 if(dgMaxTemUpdate!=null){
        //                     dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", hourSpanUpdate, 1, dgMaxTemUpdate); //更新已修改状态
        //                 }
        //                 if(dgMaxTemUpdate!=null){
        //                     dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", hourSpanUpdate, 1, dgMinTemUpdate); //更新已修改状态
        //                 }
        //             }
        //             // layer.close(msg);
        //             layer.alert("订正完毕,共订正了"+count+"个格点");
        //         });
        //     });
        //
        // }
    });
    //订正3小时温度
    $("#m_Correction_2t").on("click",function(){
        that.correctionTemp(function (msg) {
            layer.alert("订正完毕!");
            if (GDYB.GridProductClass.layerFillRangeColor != null){
                GDYB.GridProductClass.layerFillRangeColor.refresh();
            }
        });
        // if(data!=null){
        //     var msg = layer.msg('正在订正，请稍候...', {
        //         icon: 1,
        //         time: 0
        //     });
        //     dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
        //         dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
        //             var count = 0;
        //             var len = data.length;
        //             for(var i = len;i--;) {   //递减到0
        //                 var maxTempValue = 0;
        //                 var minTempValue = 0;
        //                 var item = data[i];
        //                 var hourSpan = item.hourSpan;
        //                 var dValueMaxTem = item.dValueMaxTem;
        //                 var dValueMinTem = item.dValueMinTem;
        //                 var dValueTem = item.dValueTem;
        //                 var x = item.x; //格点行
        //                 var y = item.y; //格点列
        //                 var dgMaxTem = dataCacheMaxTem[hourSpan].data;
        //                 var dgMinTem = dataCacheMinTem[hourSpan].data;
        //                 if(dgMaxTem!=null){
        //                     if(dValueMaxTem<dValueTem){
        //                         maxTempValue = dValueTem;
        //                         dgMaxTem.setValue(0, y, x, maxTempValue);
        //                         count++;
        //                     }
        //                 }
        //                 if(dgMinTem!=null){
        //                     if(dValueMinTem>dValueTem){
        //                         minTempValue = dValueTem;
        //                         dgMinTem.setValue(0, y, x, minTempValue);
        //                         count++;
        //                     }
        //                 }
        //             }
        //             var l =maxMinTemHourSpans.length;
        //             for(var j = l;j--;) {   //递减到0
        //                 var hourSpanUpdate = maxMinTemHourSpans[j];
        //                 var dgMaxTemUpdate = dataCacheMaxTem[hourSpanUpdate].data;
        //                 var dgMinTemUpdate = dataCacheMinTem[hourSpanUpdate].data;
        //                 if(dgMaxTemUpdate!=null){
        //                     dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", hourSpanUpdate, 1, dgMaxTemUpdate); //更新已修改状态
        //                 }
        //                 if(dgMaxTemUpdate!=null){
        //                     dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", hourSpanUpdate, 1, dgMinTemUpdate); //更新已修改状态
        //                 }
        //             }
        //             // layer.close(msg);
        //             layer.alert("订正完毕,共订正了"+count+"个格点");
        //         });
        //     });
        //
        // }
    });

    //一致性检查点击事件
    $("#yzxjcTable").find("tr").on("click",function(){
        var element = GDYB.GridProductClass.currentElement;
        var datasetGrid = GDYB.GridProductClass.datasetGrid;
        var trData ={};//存储当前行数据
        var trElementActive = $("#yzxjcTable").find("tr.active");
        trElementActive.removeClass("active");
        $(this).addClass("active");
        var elementValue,tds =$(this).find("td");
        var len = tds.length;
        for(var i =len;i--;){
            var td = tds[i];
            var flag = $(td).attr("flag");
            if(flag!=null && flag!=""){
                trData[flag]= $(td).text();
            }
        }
        $("#yubaoshixiao").find("td").removeClass("active");
        $("#yubaoshixiao").find("#"+trData.hourSpan+"h").addClass("active");
        GDYB.GDYBPage.yubaoshixiaoTools.hourSpan = trData.hourSpan;
        GDYB.GDYBPage.displayGridProduct();
        var x = Number(trData.x);
        var y = Number(trData.y);
        var coordinate = datasetGrid.gridToXY(y,x);

        //标记图层上添加标记
        if(GDYB.GridProductClass.layerGridMarkers!=null){
            GDYB.GridProductClass.layerGridMarkers.clearMarkers();
            var size = new WeatherMap.Size(21,25);
            var offset = new WeatherMap.Pixel(-(size.w/2), -size.h);
            var icon = new WeatherMap.Icon('imgs/marker.png',size,offset);
            var lonLat = new WeatherMap.LonLat(coordinate.x,coordinate.y);
            that.map.setCenter(new WeatherMap.LonLat(coordinate.x, coordinate.y), 18);
            GDYB.GridProductClass.layerGridMarkers.addMarker(new WeatherMap.Marker(lonLat,icon));
        }

        // switch (element){
        //     case "tmax":
        //         elementValue = trData.dValueMaxTem;
        //         break;
        //     case "tmin":
        //         elementValue = trData.dValueMinTem;
        //         break;
        //     case "3t":
        //         elementValue = trData.dValueTem;
        //         break;
        // }
        // if(GDYB.GridProductClass.layerMagic != null){
        //     GDYB.GridProductClass.layerMagic.removeAllFeatures();
        //     GDYB.MagicTool.geoline = null;
        // }
        // GDYB.FilterTool.refresh(elementValue, elementValue);
    });
}
//订正最高低温度
fnYZXJC.correctionMaxMinTemp =function (callback) {
    var that =this;
    var dataCache = GDYB.GridProductClass.dataCache;
    var makeTime = GDYB.GridProductClass.currentMakeTime;
    var version = GDYB.GridProductClass.currentVersion;
    var currentDateTime = GDYB.GridProductClass.currentDateTime;

    var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
    var temHourSpans = that.getHourSpan("2t");

    var msg = layer.msg('正在订正，请稍候...', {
        icon: 1,
        time: 0
    });
    dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
        dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
            dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
                if(dataCacheTem!=null){
                    var count =0;
                    var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
                    var yLen = temHourSpans.length; //2t时效
                    for(var i =0; i<xLen; i++){
                        var maxMinTemHourSpan = maxMinTemHourSpans[i];
                        var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
                        var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
                        if(dgMaxTem!=null && dgMinTem!=null){
                            var cols = dgMaxTem.cols;
                            var rows = dgMaxTem.rows;
                            for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
                                var k = i + count;
                                count++;
                                if(k <= yLen){
                                    var temHourSpan = temHourSpans[k];
                                    if(dataCacheTem[temHourSpan]!=null){
                                        var dgTem = dataCacheTem[temHourSpan].data;
                                        for (var m = 0; m < rows; m++) {
                                            for (var n = 0; n < cols; n++) {
                                                var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
                                                var dValueTem = dgTem.getValue(0, n, m);//气温
                                                var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温

                                                if(dValueMaxTem < dValueTem){
                                                    dgMaxTem.setValue(0, n, m, dValueTem);
                                                }
                                                else if(dValueTem < dValueMinTem){
                                                    dgMinTem.setValue(0, n, m, dValueTem);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //更新状态
                            dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", maxMinTemHourSpan, 1, dgMaxTem); //更新已修改状态
                            dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", maxMinTemHourSpan, 1, dgMinTem); //更新已修改状态
                        }
                    }
                    if($.isFunction(callback)){
                        callback.call(null,msg);
                    }
                }
                else{
                    layer.closeAll();
                    layer.alert("3小时温度无数据！");
                }
            });
        });
    });
}
//订正3小时温度
fnYZXJC.correctionTemp =function (callback) {
    var that =this;
    var dataCache = GDYB.GridProductClass.dataCache;
    var makeTime = GDYB.GridProductClass.currentMakeTime;
    var version = GDYB.GridProductClass.currentVersion;
    var currentDateTime = GDYB.GridProductClass.currentDateTime;

    var maxMinTemHourSpans = that.getHourSpan("tmax"); //tmax和tmin时效一致
    var temHourSpans = that.getHourSpan("2t");

    var msg = layer.msg('正在订正，请稍候...', {
        icon: 1,
        time: 0
    });
    dataCache.getDatas(makeTime, version, currentDateTime, "tmax",maxMinTemHourSpans,function (dataCacheMaxTem) {
        dataCache.getDatas(makeTime, version, currentDateTime, "tmin",maxMinTemHourSpans,function (dataCacheMinTem) {
            dataCache.getDatas(makeTime, version, currentDateTime, "2t",temHourSpans,function (dataCacheTem) {
                if(dataCacheTem!=null){
                    var count =0;
                    var xLen = maxMinTemHourSpans.length; //tmax和tmin时效
                    var yLen = temHourSpans.length; //2t时效
                    for(var i =0; i<xLen; i++){
                        var maxMinTemHourSpan = maxMinTemHourSpans[i];
                        var dgMaxTem = dataCacheMaxTem[maxMinTemHourSpan].data;
                        var dgMinTem = dataCacheMinTem[maxMinTemHourSpan].data;
                        if(dgMaxTem!=null && dgMinTem!=null){
                            var cols = dgMaxTem.cols;
                            var rows = dgMaxTem.rows;
                            for(var j =0; j<8; j++){ //为了和2t时效中8个时效比较
                                var k = i + count;
                                count++;
                                if(k <= yLen){
                                    var temHourSpan = temHourSpans[k];
                                    if(dataCacheTem[temHourSpan]!=null){
                                        var dgTem = dataCacheTem[temHourSpan].data;
                                        for (var m = 0; m < rows; m++) {
                                            for (var n = 0; n < cols; n++) {
                                                var dValueMaxTem = dgMaxTem.getValue(0, n, m); //日最高气温
                                                var dValueTem = dgTem.getValue(0, n, m);//气温
                                                var dValueMinTem = dgMinTem.getValue(0, n, m); //日最低气温

                                                if(dValueMaxTem < dValueTem){
                                                    dgTem.setValue(0, n, m, dValueMaxTem);
                                                }
                                                else if(dValueTem < dValueMinTem){
                                                    dgTem.setValue(0, n, m, dValueMinTem);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            //更新状态
                            dataCache.setDataStatus(makeTime, version, currentDateTime, "tmax", maxMinTemHourSpan, 1, dgMaxTem); //更新已修改状态
                            dataCache.setDataStatus(makeTime, version, currentDateTime, "tmin", maxMinTemHourSpan, 1, dgMinTem); //更新已修改状态
                        }
                    }
                    if($.isFunction(callback)){
                        callback.call(null,msg);
                    }
                }
                else{
                    layer.closeAll();
                    layer.alert("3小时温度无数据！");
                }
            });
        });
    });
}
fnYZXJC.showTab =function () {
    var self = this;
    layer.tab({
        offset: 'rb',
        area: ['600px', '600px'],
        tab: [{
            title: '一致性检查',
            content: self.tab1
        },
        {
            title: '高低温检查对比',
            content: '内容2'
        }]
    });
}
