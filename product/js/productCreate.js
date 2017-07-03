var setting = {
	view: {
		selectedMulti: false
	},
	edit: {
		enable: false,
		editNameSelectAll: false,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		onClick: zTreeOnClick
	}
};
//pId = id 就能确定属于哪个一级菜单
var log, className = "dark";
var selectProduct,selectItemId;
var productTemp=null;
var cssName=["display","font-family","font-size","color","text-align","font-weight","height"];

function getTime() {
	var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

var newCount = 1;
function zTreeOnClick(event, treeId, treeNode) {
    //选中节点的click事件
    if(treeNode.level!=0){
        //alert(treeNode.id + ", " + treeNode.name);
        selectProduct = new Product( "product" );
        selectProduct.set("id",treeNode.id);
        selectProduct.set("name",treeNode.name);
        selectProduct.set( "theme_header", treeNode.name );
        var productMO=new ProductTempMO();
        productMO.getProductTempById(treeNode.id,function(data){
            //var temp=data.content.replace(/'/g, "\"");
			if (data<0||data.length==0)return;
            var json=JSON.parse(data);
            var itemArray=json.productTemplate;
            productTemp=json.productTemplate;
            for(var i=0;i<itemArray.length;i++){
                var obj=itemArray[i];
                if (obj.display!="none"){
                    setRealVale(obj);
                    for(var j=0;j<cssName.length;j++){
                        $("#"+obj.item).css(cssName[j],obj[cssName[j]]);
                    }
                }else{
                    $("#"+obj.item).css("display","none");
                }
            }
        });
        console.log(treeNode);
    }
};
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
function setRealVale(obj){
    if (obj.value==null){
        selectProduct.set(obj.item,"");
        return;
    }
    if(obj.item=="theme_no"){
		selectProduct.set(obj.item,obj.value);
    }else if (obj.item=="theme_unit"&&obj.value.substr(0,1)=="<"){
        selectProduct.set(obj.item,$.cookie("departName")+"气象台");
    }else if(obj.item=="theme_time"){
        var date=new Date();
        selectProduct.set(obj.item,date.format(obj.value));
    }else if (obj.value.indexOf("yyyy")>=0){
        var leftIndex=obj.value.indexOf("<");
        var rightIndex=obj.value.indexOf(">");
        var date=new Date();
        console.log(obj.value.substr(leftIndex+1,rightIndex-leftIndex-1));
        var temp=obj.value.substr(0,leftIndex)+date.format(obj.value.substr(leftIndex+1,rightIndex-leftIndex-1))+obj.value.substr(rightIndex+1);
        selectProduct.set(obj.item,temp);
    }else if (obj.item=="theme_content1"||obj.item=="theme_content2"||obj.item=="theme_warn"){
        var value=obj.value.replace(/<BR>/g,"\r\n");
        selectProduct.set(obj.item,value);

    }else if (obj.item=="theme_createer"){
        selectProduct.set(obj.item,"预报员："+$.cookie("showName"));
    }else{
        selectProduct.set(obj.item,(obj.value==null?"":obj.value));
    }
}
$(document).ready(function(){
	var dataServer=new DataServer();
    var productMO=new ProductTempMO();
	var departCode=$.cookie("departCode");
	var param='{"areacode":"'+departCode+'"}';
    productMO.getProductType(param,function(data){
        var typeArray=[];
        for(var i=0;i<data.length;i++){
            var item=data[i];
            if (item.parentid==0){
                typeArray.push({id:+item.id,pId:+item.parentid,name:item.name,open:true,areacode:item.areacode});
            }else{
                typeArray.push({id:+item.id,pId:+item.parentid,name:item.name,areacode:item.areacode});
            }
        }
        $.fn.zTree.init($("#treeDemo"), setting, typeArray);
    })
    var id=GetQueryString("id");
    selectProduct = new Product( "product" );
    productMO.getProductTempById(id,function(data){
        //var temp=data.content.replace(/'/g, "\"");
        if (data<0||data.length==0)return;
        var json=JSON.parse(data);
        var itemArray=json.productTemplate;
        productTemp=json.productTemplate;
        for(var i=0;i<itemArray.length;i++){
            var obj=itemArray[i];
            if (obj.display!="none"){
                setRealVale(obj);
                for(var j=0;j<cssName.length;j++){
                    $("#"+obj.item).css(cssName[j],obj[cssName[j]]);
                }
            }else{
                $("#"+obj.item).css("display","none");
            }
        }
    });
    $("#productReSet").on("click",function(){
            if (confirm("你确定要删除模板吗？")){
                var param='[{"producttypeid":"'+selectProduct.get("id")+'"}]';
                dataServer.requestServlet("producttemplate.delete",param,param,function(data){
                    if (Number(data)>0){
                        alert("删除成功。");
                    }else {
                        alert("删除失败。");
                    }
                });
            }
    })
	$("#productSave").on("click",function(){
		var json='[';
		 for(var i=0;i<productTemp.length;i++){
			var obj=productTemp[i];
			json+='{"item":"'+obj.item+'",';
			if ($("#"+obj.item).css("display")!="none")
			{
				json+='"value":"'+ $("#"+obj.item).val()+'",';
			}else{
				json+='"value":"",';
			}  
			for(var j=0;j<cssName.length;j++){
				json+='"'+cssName[j]+'":"'+ $("#"+obj.item).css(cssName[j])+'",';
			}
			json=json.substring(0,json.length-1);
			json+='},';
		} 
        json=json.substring(0,json.length-1);
        json+=']';
        json=json.replace(/\n/g,"<BR>");
        var myJSONString = JSON.stringify(json);
        var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, "\\\"")
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
        var param='[{"producttypeid":"'+selectProduct.get("id")+'","createer":"fanjibing","areacode":"37","remark":""}]';
        dataServer.requestServlet("product.add",myEscapedJSONString,param,function(data){
            if (Number(data)>0){
                alert("保存成功。");
            }else {
                alert("保存失败。");
            }
        });
	});
});
//双向绑定
function DataBinder( object_id ) {
	// Use a jQuery object as simple PubSub
	var pubSub = jQuery({});

	// We expect a `data` element specifying the binding
	// in the form: data-bind-<object_id>="<property_name>"
	var data_attr = "bind-" + object_id,
			message = object_id + ":change";

	// Listen to change events on elements with the data-binding attribute and proxy
	// them to the PubSub, so that the change is "broadcasted" to all connected objects
	jQuery( document ).on( "change", "[data-" + data_attr + "]", function( evt ) {
		var $input = jQuery( this );
		pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
	});

	// PubSub propagates changes to all bound elements, setting value of
	// input tags or HTML content of other tags
	pubSub.on( message, function( evt, prop_name, new_val ) {
		jQuery( "[data-" + data_attr + "=" + prop_name + "]" ).each( function() {
			var $bound = jQuery( this );
			if ( $bound.is("input, textarea, select") ) {
				$bound.val( new_val );
			} else {
				$bound.html( new_val );
			}
		});
	}); 
	return pubSub;
}
function Product( uid ) {
	var binder = new DataBinder( uid ), 
	proudct = {
		attributes: {},

		// The attribute setter publish changes using the DataBinder PubSub
		set: function( attr_name, val ) {

			this.attributes[ attr_name ] = val;
			binder.trigger( uid + ":change", [ attr_name, val, this ] );
		},

		get: function( attr_name ) {
			return this.attributes[ attr_name ];
		}, 
		_binder: binder
	}; 
	// Subscribe to the PubSub
	binder.on( uid + ":change", function( evt, attr_name, new_val, initiator ) {
		if ( initiator !== proudct ) {
			proudct.set( attr_name, new_val );
		}
	}); 
	return proudct;
}