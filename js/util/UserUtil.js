/**
 * @author: wangkun
 * @date:   2017/5/2.
 * @description 用户
 */
function UserUtil() {
    this._init_();
}
UserUtil.prototype = {
    constructor: UserUtil,
    _init_: function () {
        this.name = "用户";
    },
    /**
     * @author:wangkun
     * @date:2017-05-02
     * @return:
     * @description:获取预报员
     */
    getForcastor: function (recall) {
        var url = userServiceUrl + "services/UserService/getForecastor";
        var userName = $.cookie("userName");
        if (userName == undefined || userName == "") {
            layer.msg("未登陆,不能获取预报员!");
            return;
        }
        var param = {
            userName: userName
        };
        param = JSON.stringify(param);
        fnCn.AJAX(url,param,true,function(){
            layer.msg("获取预报员失败!");
        },
        function(data){
            recall(data);
        })
    }
}