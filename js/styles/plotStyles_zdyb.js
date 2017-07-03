/**
 * Created by Administrator on 2016/1/18.
 */

var plotStyle_zdyb = [
    {
        field:"w12",      //字段名
        type:"label",	    //显示类型（label-文本、symbol-符号）
        visible:"false",
        offsetX: 15,	        //X偏移量
        offsetY: 15,	    //Y偏移量
        rotationField:null,	//旋转角度字段
        decimal:null,          //小数位数，如果为null，不做处理（特别是字符类型字段一定要为null）
        valueScale:null,           //值缩放，显示的值=原始值*valueScale
        noDataValue:9999.0, //无效值
        style: {		    //风格
            labelAlign:"lt",
            fontFamily:"Arial",
            fontColor:"rgb(0, 0, 0)",
            fontSize:"12px",
            fill: false,
            stroke: false
        },
        symbols:null
    },
    {
        field:"w24",
        type:"label",
        visible:"true",
        offsetX: 15,
        offsetY: -15,
        rotationField:null,
        decimal:null,
        valueScale:null,
        noDataValue:9999.0,
        style: {
            labelAlign:"lt",
            fontFamily:"Arial",
            fontColor:"rgb(0, 0, 0)",
            fontSize:"12px",
            fill: false,
            stroke: false
        },
        symbols:null
    },
    {
        field:"tmax24",
        type:"label",
        visible:"true",
        offsetX: -15,
        offsetY: 15,
        rotationField:null,
        decimal:null,
        valueScale:null,
        noDataValue:9999.0,
        style: {
            labelAlign:"lt",
            fontFamily:"Arial",
            fontColor:"rgb(0, 0, 0)",
            fontSize:"12px",
            fill: false,
            stroke: false
        },
        symbols:null
    },
    {
        field:"tmin24",
        type:"label",
        visible:"true",
        offsetX: -15,
        offsetY: -15,
        rotationField:null,
        decimal:null,
        valueScale:null,
        noDataValue:9999.0,
        style: {
            labelAlign:"lt",
            fontFamily:"Arial",
            fontColor:"rgb(0, 0, 0)",
            fontSize:"12px",
            fill: false,
            stroke: false
        },
        symbols:null
    }
]
