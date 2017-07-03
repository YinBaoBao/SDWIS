Date.prototype.format = function(format) {  
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */  
    var o = {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(), // hour  
        "m+" : this.getMinutes(), // minute  
        "s+" : this.getSeconds(), // second  
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S" : this.getMilliseconds()  
        // millisecond  
    };  
  
    if (/(y+)/.test(format)) {  
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4  
                        - RegExp.$1.length));  
    }  
  
    for (var k in o) {  
        if (new RegExp("(" + k + ")").test(format)) {  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1  
                            ? o[k]  
                            : ("00" + o[k]).substr(("" + o[k]).length));  
        }  
    }  
    return format;  
}
Date.prototype.StrToDate = function(dateStr) {
	var temp = dateStr.replace(/-/g, "/");  
	var tempdate=new Date(temp);
	return tempdate;
}
Date.prototype.UTCStrToBeiJing=function(utcDateStr){
	var tempdate=Date.prototype.StrToDate2(utcDateStr);
	var bjDate=tempdate.DateAdd('h',8);
	return bjDate.format("yyyy-MM-dd hh:00");
} 
Date.prototype.UTCToBeiJing=function(){
	var tempdate=this;
	var bjDate=tempdate.DateAdd('h',8);
	return bjDate.format("yyyy-MM-dd hh:00");
}
Date.prototype.BeiJingStrToUTC=function(beijingDateStr){
	var bjDate=Date.prototype.StrToDate(beijingDateStr);
	var utcDate=bjDate.DateAdd('h', -8);
	return utcDate;
}
Date.prototype.BeiJingToUTC=function(){
	var bjDate=this;
	var utcDate=bjDate.DateAdd('h', -8);
	return utcDate;
}
Date.prototype.StrToDate2 = function(strDate) {
	//eg:20150802170000
	if (strDate==null||strDate==undefined)return null;
	var len=strDate.length;
	for(var i=len;i<14;i++){
		strDate+="0";
	} 
	strDate=strDate.substr(0,4)+"-"+strDate.substr(4,2)+"-"+strDate.substr(6,2)+" "+strDate.substr(8,2)+":"+strDate.substr(10,2)+":"+strDate.substr(12,2); 
	var tempdate=Date.prototype.StrToDate(strDate);
	return tempdate;
}
Date.prototype.AddMonths=function(value) {
	var date=this;
    date.setMonth(date.getMonth() + value);
    return date;
} 
//增加天   
Date.prototype.AddDays=function (value) {
    var date=this;
    date.setDate(date.getDate() + value);
    return date;
}

//增加时

Date.prototype.AddHours=function(value) {
	var date=this;
    date.setHours(date.getHours() + value);
    return date;

}
Date.prototype.AddMinutes=function(value) {
	var date=this;
    date.setMinutes(date.getMinutes() + value);
    return date;

}
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval)
    {
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number)); 
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }
}
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = Date.prototype.StrToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
} 
//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval)  
{   
  var myDate = this;  
  var partStr='';  
  var Week = ['日','一','二','三','四','五','六'];  
  switch (interval)  
  {   
      case 'y' :partStr = myDate.getFullYear();break;  
      case 'm' :partStr = myDate.getMonth()+1;break;  
      case 'd' :partStr = myDate.getDate();break;  
      case 'w' :partStr = Week[myDate.getDay()];break;  
      case 'ww' :partStr = myDate.WeekNumOfYear();break;  
      case 'h' :partStr = myDate.getHours();break;  
      case 'n' :partStr = myDate.getMinutes();break;  
      case 's' :partStr = myDate.getSeconds();break;  
  }  
  return partStr;  
}
//返回最近的一刻钟时间
Date.prototype.getLast15MinuteDate=function(){
	var myDate =this;
	var minute=myDate.getMinutes();
	if (minute<15){
		minute="00";
	}else if (minute<30){
		minute="15";
	}else if (minute<45){
		minute="30";
	}else{
		minute="45";
	}
	myDate.setMinutes(minute);
	myDate.setSeconds(0);
	return myDate
}
Date.prototype.getStandTimeStr=function(){
	var myDate =this;
	return myDate.format("yyyyMMddhhmm");
}
Date.prototype.getYMDHMStr=function(){
	var myDate =this;
	return myDate.format("yyyy-MM-dd hh:mm");
}