/**
 * 趋势订正通用模块
 * @author POPE
 * @date   2016-10-27
 */
function QSDZCommonClass() {
    if(!(this instanceof QSDZCommonClass)){
        return new QSDZCommonClass();
    }
}
var fnQSDZ = QSDZCommonClass.prototype;
//温度订正算法
fnQSDZ.CalTemperature = function(oldval,newval,hourSpan,element){
    var result = false,that =this;
    element = element ||GDYB.GridProductClass.currentElement;
    hourSpan = hourSpan.substring(0,hourSpan.length-1);
    var increment = parseFloat(newval) - parseFloat(oldval);
    var temMaxData = GDYB.Page.elementData.objLabelsTemMaxValues.dValues;
    var temMinData = GDYB.Page.elementData.objLabelsTemMinValues.dValues;
    var temData = GDYB.Page.elementData.objLabelsTemValues.dValues;
    var maxValue = Math.max.apply(null, temMaxData);//日高温最大值
    var minValue = Math.min.apply(null, temMinData);//日低温最小值
    switch (element){
        case "tmax": //日最高温
            that.getdValuesByhourSpans(hourSpan,"2t",function(hourSpanData){
                var a = hourSpanData;
                result =true;
            });
            break;
        case "tmin": //日最低温
            that.getdValuesByhourSpans(hourSpan,"2t",function(hourSpanData){
                var a = hourSpanData;
                result =true;
            });
            break;
        case "2t": //气温

            break;
    }
}
//通过时效获取要素时效数据
fnQSDZ.getdValuesByhourSpans = function(hourSpan,element,callback){
    element = element ||GDYB.GridProductClass.currentElement;
    GDYB.GridProductClass.dataCache.getData(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, element , hourSpan, function(hourSpanData){
        if($.isFunction(callback)){
            callback.call(hourSpanData,hourSpanData);
        }
    });
}
//设置要素时效数据
fnQSDZ.setdValues =function(hourSpan,datasetGrid){
    GDYB.GridProductClass.dataCache.setDataStatus(GDYB.GridProductClass.currentMakeTime, GDYB.GridProductClass.currentVersion, GDYB.GridProductClass.currentDateTime, GDYB.GridProductClass.currentElement, hourSpan, 1, datasetGrid);
}
