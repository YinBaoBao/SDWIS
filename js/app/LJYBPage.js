/**
 * @author:wangkun
 * @date:2017-03-12
 * @description:
 */
define(['pagebase'],function(){
	return {
		Init:function(){
			this.prototype = new PageBase();
    			this.prototype.active();
    			GDYB.Page.curPage=this.prototype;

			$("#menu").css("width","60");
			$("#menu").css("padding","0");
			$("#map").css("left","60");
			$("#menu").html(`
		    		<div class="resimport">
					<div id="">EC</div>
					<div id="">GFS</div>
					<div id="">MESO</div>
					<div id="">MARS</div>
					<div id="">CHAF</div>
					<div id="">QPF</div>
					<div id="">中央台</div>
					<div id="">本地</div>
		    		</div>
    			`);
			$("#map_div").append(`
				<div class="delete opration panel panel-default">
					<div class="paneltitle panel-heading">
						<span class="pull-left">操作</span><span class="pull-right titleclose">△</span>
					</div>
					<div class="panel-body">
						<div><span>预报员：</span><span>郭俊建</span></div>
						<p></p>
						<div><span>时   间：</span><input  type="text" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii"></div>
						<p></p>
						<div><button class="btn btn-default">下载</button><button class="btn btn-default">提交</button><button class="btn btn-default" id="makeproduct">生成产品</button></div>
					</div>
				</div>
    			`);
			$("#map_div").append(`
				<div id="creatingProductWindow" class="delete" style="display: none;left:calc(50% - 420px);">
					<div class="cp_heading">
						<button type="button" class="close" title="close it" style="position: absolute;right: 20px;top:15px;">&times;</button>
						<div style="font-size: 24px;color: #0d3d88;text-align: center;height: 40px;line-height: 40px;margin-top:10px;letter-spacing: 5px;">0-2小时临近预报</div>
						<div style="border-bottom: 1px #bbbbbb solid; width: 90%;margin: 10px auto;font-size: 15px;">山东省气象台<span id="nowTime" style="margin-left:120px;">2017年3月2日&nbsp;&nbsp;08时31分</span><div style="float: right">预报员：<span id="forecasters">郭俊建</span></div></div>
					</div>
					<div class="cp_body">
						<div style="margin: 0 auto;width: 90%;">
							<p>前1时次大雾天湖水库，红安白须公礁，麻城双墩岛和白牛岭，北海斜阳岛等站出现大于17ms/s极大风。</p>
							<p>大雾，红安有强对流回波，向东南方向移动。</p>
							<p>预计未来6小时，大雾、红安、麻城等地，有短时间强雷雨大风天气，局地有冰雹，阵风8-10级。</p>
							<img src="imgs/div_mapPic.png" width="100%" height="300px">
						</div>
					</div>
					<div class="cp_foot">
						<div style="float: left;margin: 20px;"><a>报文浏览↓↓↓</a></div><div style="float:right;margin-right:50px;"><button>确&nbsp;&nbsp;&nbsp;&nbsp;定</button>&nbsp;&nbsp;&nbsp;&nbsp;<button>取&nbsp;&nbsp;&nbsp;&nbsp;消</button></div>
					</div>
				</div>
    			`);
			require(['Common'],function(com){
				com.InitDateTime('datetimepicker');
			});
			//引入工具箱
			require(['paneltool'],function(){
				var paneltool=new Panel_Tools($("#map_div"));
			});
			$("#Panel_Tools").addClass("delete");
			LoadRadarUI();
			require(['DSYBPage'],function(self){
				$("#makeproduct").bind("click",self.MakeProduct);
			});
			InitEvent();
			function InitEvent(){
				$(".opration").draggable();
				$(".close").bind("click",Close);
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:加载雷达界面
			 */
			function LoadRadarUI(){
				require(['SmallRadar'],function(sr){
					sr.Init("map_div");
				});
			}
			$("#makeproduct").click(function(){
				$("#creatingProductWindow").css("display","block");
			});
			function  Close(){
				var parent=$(this).parent();
				if(parent[0].id!=""){
					parent.css("display","none");
				}
				else{
					parent.parent().css("display","none");
				}
			}
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-13
		 * @param:
		 * @return:
		 * @description:生成产品
		 */
		MakeProduct:function(){
			$("#productview").css("display","block");
		}
	}
});
