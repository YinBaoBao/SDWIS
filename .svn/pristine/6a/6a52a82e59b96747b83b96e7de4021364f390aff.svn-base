/**
 * @author:wangkun
 * @date:2017-03-08
 * @description:多个Ledend
 */
define([],function(){
	var aLegend=[];//存放Legend的
		return{
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:初始化
			 */
			Init:function(){
				aLegend=[];
				console.log("多图例初始化完成!");
			},
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:增加
			 */
			Add:function(name,styles){
				//决断是否存在
				var index=aLegend.findIndex((item,index,arr)=>{
					return item==name;
				});
				if(index>-1){//更新
					var self=require('StackLegend');
					self.Update(name,styles);
				}
				else{//增加
					var strLegendItem = '<div id="'+name+'" class="legenditem">';
					var items=[]; //把原始的颜色存起来
					styles.forEach((style,key)=>{
						var value = Math.floor(style.end*10)/10;
					            var visible = "true";
					            var rgb = "rgb("+ style.startColor.red + "," + style.startColor.green + "," + style.startColor.blue + ")";
					            items.push(rgb);
					            if(typeof(style.visible) != "undefined" && !style.visible)
					            {
					                rgb = "rgb(255, 255, 255)";
					                visible = "false";
					            }
					            var strvalue = value;
					            if(typeof(style.legend) != "undefined")
					                strvalue = style.legend;
					            if(typeof(style.tag) != "undefined")
					                strLegendItem+="<div class='item' style='cursor:pointer;background-color:" + rgb + "' visible='"+ visible +"' key='"+key +"' val='"+value +"' tag='"+style.tag+"'>"+strvalue+"</div>";
					            else
					                strLegendItem+="<div class='item' style='cursor:pointer;background-color:" + rgb + "' visible='"+ visible +"' key='"+key +"' val='"+value+"'>"+strvalue+"</div>";
					});
					aLegend.push(name);
					strLegendItem+='<h3>'+name+'</h3></div>';
					$("#div_legend").append(strLegendItem);
				}
			},
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:更新
			 */
			Update:function(name,styles){

			},
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:移除
			 */
			Remove:function(name){
				var tempLegends=aLegend.slice();
				aLegend=[];
				tempLegends.forEach((index,item)=>{
					if(item!=name){
						aLegend.push(name);
					}
				});
				$("#"+name).empty();
			},
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:移除所有
			 */
			RemoveAll:function(){
				$("#div_legend").empty();
				aLegend=[];
			}
		}
	}
);