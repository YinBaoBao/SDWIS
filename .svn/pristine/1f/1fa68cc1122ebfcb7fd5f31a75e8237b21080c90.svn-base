/**
 * 数据处理服务
 */
 function DataServer() {
    var fn = DataServer.prototype;
    function customQuery(param, recallFun){
        $.ajax({
            data:{
                "param": param
            },
            url:ENVIServiceUrl+'services/data/query',
            type: "POST",
            dataType:"json",
            success: function(data) {
                recallFun(data);
            },
            error : function(err) {
            }
        });
    }
    fn.queryData=function(funcName,params,recallFun){
        $.ajax({
            data:{'param':'{"Function":"'+funcName+'","CustomParams":'+params+',"Type":2}'},
            url:ENVIServiceUrl+'services/data/query',
            type: "POST",
            dataType:"json",
            success: function(data) {
                recallFun(data);
            },
            error : function(err) { 
				alert(err.responseText);
            }
        });
    }
    //在查询element-sql配置文件中配置修改语句的执行
    fn.updateFromQuery=function(funcName,params,recallFun){
        $.ajax({
            data:{'param':'{"Function":"'+funcName+'","CustomParams":'+params+',"Type":5}'},
            url:ENVIServiceUrl+'services/data/query',
            type: "POST",
            dataType:"json",
            success: function(data) {
                recallFun(data);
            },
            error : function(err) {
                alert(err.responseText);
            }
        });
    }
    //在查询element-update配置文件中配置修改语句的执行
    fn.updateData=function(funcName,params,recallFun){
        $.ajax({
            data:{'param':'{"Function":"'+funcName+'","values":'+params+',"Type":2}'},
            url:ENVIServiceUrl+'services/data/update',
            type: "POST",
            dataType:"json",
            success: function(data) {
                recallFun(data);
            },
            error : function(err) { 
				alert(err.responseText);
            }
        });
    }
    //为服务产品模板管理私人定制servlet
    fn.requestServlet=function(funcName,content,params,recallFun){
        $.ajax({
            type:'post',
            url:ENVIServiceUrl+'/invoke',
            data:{'param':'{"Function":"'+funcName+'","content":'+content+',"values":'+params+',"Type":2}'},
            dataType:'text',
            success: function(data) {
                recallFun(data);
            },
            error : function(err) {
                alert(err.responseText);
            }
        });
    }
}  