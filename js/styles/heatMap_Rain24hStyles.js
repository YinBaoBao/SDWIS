/**
 * Created by yujinsheng
 * 降水填色风格
 * 开始值，结束值，开始颜色，结束颜色
 * 包含最小值，不包含最大值，也即左闭右开
 */
    var heatMap_Rain24hStyles = [
	{start:0.0,end:0.0,caption:"无雨",startColor:{red:255,green:255,blue:255},endColor:{red:171,green:235,blue:167}},
	{start:0.1,end:10.0,caption:"小雨",startColor:{red:171,green:235,blue:167},endColor:{red:89,green:191,blue:103}},//171,235,167
	{start:10.0,end:25.0,caption:"中雨",startColor:{red:89,green:191,blue:103},endColor:{red:117,green:189,blue:255}},//89,191,103
	{start:25.0,end:50.0,caption:"大雨",startColor:{red:117,green:189,blue:255},endColor:{red:41,green:45,blue:231}},//117,189,255
	{start:50.0,end:100.0,caption:"暴雨",startColor:{red:41,green:45,blue:231},endColor:{red:195,green:45,blue:251}},//41,45,231
	{start:100.0,end:250.0,caption:"大暴雨",startColor:{red:195,green:45,blue:251},endColor:{red:141,green:45,blue:105}},//195,45,251
	{start:250.0,end:500.0,caption:"特大暴雨",startColor:{red:141,green:45,blue:105},endColor:{red:141,green:45,blue:105}}//141,45,105
];
