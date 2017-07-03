var setting = {
	view: {
		addHoverDom: addHoverDom,
		removeHoverDom: removeHoverDom,
		selectedMulti: false
	},
	edit: {
		enable: true,
		editNameSelectAll: true,
		showRemoveBtn: true,
		showRenameBtn: true
	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeDrag: beforeDrag,
		beforeEditName: beforeEditName,
		beforeRemove: beforeRemove,
		beforeRename: beforeRename,
		onRemove: onRemove,
		onRename: onRename,
		onClick: zTreeOnClick
	}
};
//pId = id 就能确定属于哪个一级菜单
var log, className = "dark";
var selectProduct,selectItemId;
//var productTempMap=new HashMap();
var cssName=["display","font-family","font-size","color","text-align","font-weight","height"];
function beforeDrag(treeId, treeNodes) {
	return false;
}
function beforeEditName(treeId, treeNode) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
	setTimeout(function() {
		if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
			setTimeout(function() {
				zTree.editName(treeNode);
			}, 0);
		}
	}, 0);
	return false;
}
function beforeRemove(treeId, treeNode) {
	className = (className === "dark" ? "":"dark");
	showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.selectNode(treeNode);
	return confirm("确认删除" + treeNode.name + " 吗？");

}
function onRemove(e, treeId, treeNode) {
	//showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
	alert("删除"+treeNode.name+"成功！");
}
function beforeRename(treeId, treeNode, newName, isCancel) {
	className = (className === "dark" ? "":"dark");
	showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
	if (newName.length == 0) {
		setTimeout(function() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.cancelEditName();
			alert("节点名称不能为空.");
		}, 0);
		return false;
	}
	return true;
}
function onRename(e, treeId, treeNode, isCancel) {
	showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
}
function showRemoveBtn(treeId, treeNode) {
	return !treeNode.isFirstNode;
}
function showRenameBtn(treeId, treeNode) {
	return !treeNode.isLastNode;
}
function showLog(str) {
	if (!log) log = $("#log");
	log.append("<li class='"+className+"'>"+str+"</li>");
	if(log.children("li").length > 8) {
		log.get(0).removeChild(log.children("li")[0]);
	}
}
function getTime() {
	var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
	return (h+":"+m+":"+s+ " " +ms);
}

var newCount = 1;
function addHoverDom(treeId, treeNode) {
	if(treeNode.level!=1){
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		var btn = $("#addBtn_"+treeNode.tId);
	}
	if (btn) btn.bind("click", function(){
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
		return false;
	});
};
function removeHoverDom(treeId, treeNode) {
	$("#addBtn_"+treeNode.tId).unbind().remove();
};
function selectAll() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
}
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
            //productTempMap=new HashMap();
            for(var i=0;i<itemArray.length;i++){
                var obj=itemArray[i];

                var value=obj.value;
                if (value!=null)value=value.replace(/<BR>/g,"\r\n");
                selectProduct.set(obj.item,value);
                for(var j=0;j<cssName.length;j++){
                    $("#"+obj.item).css(cssName[j],obj[cssName[j]]);
                    //selectProduct.set(obj.item+"!"+cssName[j],obj[cssName[j]]);
                }
                //productTempMap.add(obj.item,obj);
            }
        });
        console.log(treeNode);
    }
};
$(document).ready(function(){
	var dataServer=new DataServer();
    var productMO=new ProductTempMO();
    var productItems=null;
    productMO.getProductItem(function(data){
        productItems=data;
    });
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
	$("#selectAll").bind("click", selectAll);
	$("#templateItem").find("a").on("click",function(){
		var aId=$(this).attr("id");
		selectItemId=aId.substring(2);
		$("#"+selectItemId).focus();
	});
	$("#content").find("input").on("click",function(){
		selectItemId=$(this).attr("id"); 
	}); 
	$("#content").find("textarea").on("click",function(){
		selectItemId=$(this).attr("id"); 
	});
	$("#itemProper").find("select").on("change",changeCSS);
	$("#itemProper").find("input").on("change",changeCSS);
    $("#itemProper").find("select").on("blur",changeCSS);
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
            var json='{"productTemplate":[';
            for(var i=0;i<productItems.length;i++){
                var item=productItems[i];
                json+='{"item":"'+item.code+'",';
                json+='"value":"'+ $("#"+item.code).val()+'",';
                for(var j=0;j<cssName.length;j++){
                    json+='"'+cssName[j]+'":"'+ $("#"+item.code).css(cssName[j])+'",';
                }
                json=json.substring(0,json.length-1);
                json+='},';
            }
        json=json.substring(0,json.length-1);
        json+=']}';
        json=json.replace(/\n/g,"<BR>");
        var myJSONString = JSON.stringify(json);/*
        var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, "\\\"")
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");*/
        var myEscapedJSONString=myJSONString;
        var param='[{"producttypeid":"'+selectProduct.get("id")+'","createer":"fanjibing","areacode":"37","remark":""}]';
        dataServer.requestServlet("producttemplate.add",myEscapedJSONString,param,function(data){
            if (Number(data)>0){
                alert("保存成功。");
            }else {
                alert("保存失败。");
            }
        });
	});
});
function changeCSS(){
	var aId=$(this).attr("id");
	var cssName=aId.substring(2);
	$("#"+selectItemId).css(cssName,$(this).val());
    //productTempMap.set(selectItemId+"!"+cssName,$(this).val());
}
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