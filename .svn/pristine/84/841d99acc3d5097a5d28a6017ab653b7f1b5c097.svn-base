/**
 * Created by gisboy on 2017/6/12.
 */
function ProductTempMO(id,productName,productTypeId,areaCode){
    this.id=id;
    this.productName=productName,
    this.productTypeId=productTypeId,
    this.areacode=areaCode,
    this.createDate=null,
    this.productItemMap=new HashMap();
    this.productType=null;
    this.productItem=null;
    this.dataServer=new DataServer();
}
ProductTempMO.prototype.getProductTempById=function(id,callback){
    var param='{id:'+id+'}';
    this.dataServer.requestServlet("getProductTemplateById",id,param,function(data){
        callback(data);
    });
}
ProductTempMO.prototype.getProductType=function(param,callback){
    if (this.productType==null){
        this.dataServer.queryData("getProductTypeforTemplate",param,function(data){
            this.productType=data;
            callback(this.productType);
        });
    }else{
        callback(this.productType);
    }

}
ProductTempMO.prototype.getProductItem=function(callback){
    if (this.productItem==null){
        this.dataServer.queryData("getProductItem","{}",function(data){
            this.productItem=data;
            callback(this.productItem);
        });
    }else{
        callback(this.productItem);
    }
}