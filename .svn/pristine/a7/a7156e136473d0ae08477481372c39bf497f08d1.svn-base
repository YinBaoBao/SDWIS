/**
 * @author: wangkun
 * @date:   2017-05-02
 * @description 图层
 */
function ChartUtil() {
	this._init_();
}
ChartUtil.prototype = {
	constructor: ChartUtil,
	_init_: function () {
		this.name = "聊天";
	},
    socket:null,
    departName:null,
    connectStatus:false,//连接状态
    /**
     * @author:wangkun
     * @date:2017-04-11
     * @param:
     * @return:
     * @description:聊天初始化
     */
    initi: function () {
        this.departName = $.cookie("showName");
        if (window.location.protocol == 'http:') {
            this.connect('ws://' + window.location.host + '/SPDMessageService/websocket');
        } else {
            this.connect('wss://' + window.location.host + '/SPDMessageService/websocket');
        }
    },
    /**
     * @author:wangkun
     * @date:2017-04-11
     * @param:
     * @return:
     * @description:连接
     */
    connect: function (host) {
        if ('WebSocket' in window) {
                this.socket = new WebSocket(host);
        } else if ('MozWebSocket' in window) {
                this.socket = new MozWebSocket(host);
        } else {
            alert('当前浏览器不支持实时推送');
            return;
        }
        this.socket.onopen = function () {
            connectStatus=true;
            console.log("打开连接!");
        };
        this.socket.onclose = function () {
            connectStatus=false;
            console.log('连接关闭!');
        };
        this.socket.onmessage =  this.displayMsg;
        console.log("连接成功!");
    },
    /**
     * @author:wangkun
     * @date:2017-04-11
     * @param:
     * @return:
     * @description:发送消息
     */
    sendMsg:function(msgid,content,datetime){
        var obj={
            msgid:msgid,
            departname:this.departName,
            datetime:datetime,
            content:content
        };
        var strJson = JSON.stringify(obj);
        this.socket.send(strJson);
    },
    /**
     * @author:wangkun
     * @date:2017-04-12
     * @param:data-未处理的消息
     * @return:
     * @description:显示消息
     */
    displayMsg:function(udata){
        var data=udata.data;
        var msg = JSON.parse(data);
        var msgid=msg.msgid;
        //从列表中找，是否包含msgid的产品
        var find=false;
        var activeProductID=$("#yjzdMessageHis li.active").attr("msgid");
        if(msgid==activeProductID){
            var departname=msg.departname;
            var datetime=msg.datetime;
            var content=msg.content;
            var newHtml="<div><span class='msg-departname'>"+departname+"</span><span class='msg-datetime'>"+datetime+"</span></div>";
            newHtml+="<div><span>"+content+"</span></div>";
            $("#msgWindow-div").append(newHtml);
            var scrollHeight=$("#msgWindow-div")[0].scrollHeight;
            $("#msgWindow-div").scrollTop(scrollHeight);
        }
    }
}