/**
 * Created by wangkun on 2017/3/11.
 * title:上级指导
 */
define([],function(){
	return {
		Init:function(){
			this.prototype = new PageBase();
    			this.prototype.active();
    			GDYB.Page.curPage=this.prototype;
    			$("#Panel_Tools").remove();
			$("#menu").css("width","300");
			$("#menu").css("padding","20");
			$("#menu").html(`
				<div id="sjzd" class="container-fluid">
					<div id="datetime" class="datetime">
						<div style="border-bottom:1px solid white;line-height:30px;padding:10px;"><span class="glyphicon glyphicon-chevron-left"></span><input  type="text" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii"><span class="glyphicon glyphicon-chevron-right"></span></div>
					</div>
					<div class="space"></div>
					<div class="row">
						<div>中央台：</div><div>临近预报</div><div>短时预报</div>
					</div>
					<div class="row">
						<div>省&nbsp;&nbsp;&nbsp;&nbsp;台：</div><div>临近预报</div><div>短时预报</div>
					</div>
					<div class="row">
						<div>类     型：</div><div>短强</div><div>冰雹</div><div>雷电</div>
					</div>
					<div class="row">
						<div></div><div>大风</div><div>龙卷</div><div></div>
					</div>
				</div>
			`);
			InitDateTime();
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:初始化日期
			 */
			function InitDateTime(){
				require(['dtpicker'],function(dp){//初始化日期
					$('#datetimepicker').datetimepicker({
						 weekStart: 1,
						todayBtn: 1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						forceParse: 0,
						showMeridian: 1,
						format: "yyyy-mm-dd hh:ii"
					});
					$("#datetimepicker").datetimepicker( 'setDate' , new Date());
				});
			}
		}
	}
});
