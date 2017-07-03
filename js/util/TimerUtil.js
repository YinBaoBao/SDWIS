/*
*作者:wangkun
*日期:2017.1.15
*功能:计时器
 */
var timer = (function(){
	return {
		data:{},
		Start:function(key){
			timer.data[key]=new Date();
		},
		Stop:function(key){
			var time=timer.data[key];
			if(time)
				timer.data[key]=new Date()-time;
		},
		GetTime:function(key){
			return timer.data[key];
		}
	}
})();