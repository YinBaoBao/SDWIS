/**
 * Created by Administrator on 2016/5/13.
 */
/*
大风
 雾
 霜冻
 短强
 寒潮
 暴雪
 霾
 高温
 冰雹
 沙尘暴
 闪电
 雷暴
 */
var plotStyles_rhjc = [
    {
        field:"大风",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/dafeng1.png"
                },
                {
                    value: 2,
                    image: "./imgs/qdl/dafeng2.png"
                },
                {
                    value: 3,
                    image: "./imgs/qdl/dafeng3.png"
                }
            ]
    },
    //雾
    {
        field:"雾",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/wu.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/wu.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/wu.png"
                }
            ]
    },
    //霜冻
    {
        field:"霜冻",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/shuangd.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/shuangd.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/shuangd.png"
                }
            ]
    },
    {
        field:"短时强降水",
        type:"symbol",
        visible:"true",
        offsetX: 0,
        offsetY: 0,
        rotationField:null,
        decimal:1,
        noDataValue:9999.0,
        style: {
            graphicWidth:12,
            graphicHeight:12,
            graphicXOffset:-6,
            graphicYOffset:-6,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/duanqiang1.png"
                },
                {
                    value: 2,
                    image: "./imgs/qdl/duanqiang2.png"
                },
                {
                    value: 3,
                    image: "./imgs/qdl/duanqiang3.png"
                }
            ]
    },
    //寒潮
    {
        field:"寒潮",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/hanc.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/hanc.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/hanc.png"
                }
            ]
    },
    //暴雪
    {
        field:"暴雪",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/baox.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/baox.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/baox.png"
                }
            ]
    },
    //霾
    {
        field:"霾",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/mai.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/mai.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/mai.png"
                }
            ]
    },
    //高温
    {
        field:"高温",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/gaow.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/gaow.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/gaow.png"
                }
            ]
    },
    {
        field:"冰雹",      //字段名
        type:"symbol",	    //显示类型（label-文本、symbol-符号）
        visible:"true",
        offsetX: 10,	        //X偏移量
        offsetY: -20,	    //Y偏移量
        rotationField:null,	//旋转角度字段
        decimal:null,          //小数位数，如果为null，不做处理（特别是字符类型字段一定要为null）
        noDataValue:9999.0, //无效值
        style: {
            graphicWidth:12,
            graphicHeight:12,
            graphicXOffset:4,
            graphicYOffset:3,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/bingbao.png"
                }
            ]
    },
    //沙尘暴
    {
        field:"沙尘暴",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: -20,
        rotationField:null,
        decimal:null,
        noDataValue:9999.0,
        style: {
            graphicWidth:14,
            graphicHeight:14,
            graphicXOffset:-19,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/zhjc/shacb.png"
                },
                {
                    value: 2,
                    image: "./imgs/zhjc/shacb.png"
                },
                {
                    value: 3,
                    image: "./imgs/zhjc/shacb.png"
                }
            ]
    },
    {
        field:"闪电",
        type:"symbol",
        visible:"true",
        offsetX: -10,
        offsetY: 20,
        rotationField:null,
        decimal:1,
        noDataValue:9999.0,
        style: {
            graphicWidth:12,
            graphicHeight:12,
            graphicXOffset:-6,
            graphicYOffset:-6,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/shandian1.png"
                },
                {
                    value: 2,
                    image: "./imgs/qdl/shandian2.png"
                }
            ]
    },

    {
        field:"雷暴",
        type:"symbol",
        visible:"true",
        offsetX: 10,
        offsetY: 20,
        rotationField:null,
        decimal:1,
        noDataValue:9999.0,
        style: {
            graphicWidth:12,
            graphicHeight:12,
            graphicXOffset:5,
            graphicYOffset:-19,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/leibao.png"
                }
            ]
    },
    {
        field:"雨量",
        type:"symbol",
        visible:"true",
        offsetX: 0,
        offsetY: 0,
        rotationField:null,
        decimal:1,
        noDataValue:9999.0,
        style: {
            graphicWidth:6,
            graphicHeight:6,
            graphicXOffset:-6,
            graphicYOffset:-16,
            graphicOpacity:1.0,
            fillOpacity:1.0,
            fontFamily:"Arial",
            fontColor:"rgb(255, 0, 0)",
            fontSize:"14px",
            fill: false,
            stroke: false
        },
        symbols:
            [
                {
                    value: 1,
                    image: "./imgs/qdl/yuliang1.png"
                },
                {
                    value: 2,
                    image: "./imgs/qdl/yuliang2.png"
                },
                {
                    value: 3,
                    image: "./imgs/qdl/yuliang3.png"
                }
                ,
                {
                    value: 4,
                    image: "./imgs/qdl/yuliang4.png"
                }
            ]
    }
];
