/**
 * @author:wangkun
 * @date:2017-03-08
 * @description:强天气监测模块
 */
define(function(){
	var datetime=null;//日期
		return{
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:
			 */
			Init:function(){
				//this.prototype = new PageBase();
				//this.prototype.active(false);
				//GDYB.Page.curPage=this.prototype;
				require(['DLIndex'],function(dl){
					dl.InitMenu();
				});
				$("#menu").html(`
					<div id="datetime" class="datetime">
						<div style="border-bottom:1px solid white;line-height:30px;padding:10px;"><span class="glyphicon glyphicon-chevron-left"></span><input  type="text" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii"><span class="glyphicon glyphicon-chevron-right"></span></div>
					</div>
					<div class="space"></div>
					<div id="live">
						<div class="title"><img><span>实况</span></div>
						<div class="con"><p>降水：</p><span>24h</span><span>12h</span><span>6h</span><span>3h</span><span>1h</span><span>30min</span></div>
						<div class="con"><p>大风：</p><span>17-25</span><span>25-30</span><span>>=30</span></div>
						<div class="con"><span>冰雹</span><span>闪电</span><span>雷暴</span><span>能见度</span><span>水情</span></div>
						<div class="con"><span>气温</span><span>最高</span><span>最底</span><span></span><span></span></div>
					</div>
					<div id="radar">
						<div class="title"><img><span>雷达</span></div>
						<div class="con"><span>三维拼图</span><span>组合反射率</span><span>回波顶高</span></div>
						<div class="con"><span>垂直液态水含量</span><span>风暴识别与追踪</span></div>
						<div class="con"><span>QPE</span><span>QPF</span><span>TITAN</span><span>TREC</span></div>
						<div class="con"><span>反射率预报</span><span>回波监控预警</span></div>
					</div>
					<div id="satellite">
						<div class="title"><img><span>卫星</span></div>
						<div class="con"><span>红外</span><span>中红外</span><span>水汽</span><span>可见光</span></div>
					</div>
					<div id="monitorsignal">
						<div class="title"><img><span>预警信号</span></div>
						<div class="con"><span>暴雨</span><span>台风</span><span>高温</span><span>寒潮</span><span>大雾</span></div>
						<div class="con"><span>大风</span><span>雷电</span><span>冰雹</span><span>雷暴大风</span></div>
					</div>
					<div id="objectiveproduct">
						<div class="title"><img><span>客观产品</span></div>
						<div class="con"><span>强回波</span><span>强回波预报</span><span></span></div>
						<div class="con"><p>外推：</p><span>短强</span><span>大风</span><span>冰雹</span></div>
						<div class="con"><p>EC：</p><span>短强</span><span>大风</span><span>冰雹</span></div>
						<div class="con"><p>GFS：</p><span>短强</span><span>大风</span><span>冰雹</span></div>
						<div class="con"><p>MESO：</p><span>短强</span><span>大风</span><span>冰雹</span></div>
						<div class="con"><p>MARS：</p><span>短强</span><span>大风</span><span>冰雹</span></div>
					</div>
					<div id="alarm">
						<div></div>
						<div><label for="baojin">报警</label><input type="checkbox"></div>
						<div><label for="voice">声音</label><input type="checkbox"></div>
						<div></div>
					</div>
				`);
				require(['datetimepicker'],function(dp){//初始化日期
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
				//test
				/*require(['mullegend','../styles/heatMap_HailStyles'],function(ml){
					ml.Add("冰雹",heatMap_HailStyles);
				});
				require(['mullegend','../styles/heatMap_TempStyles'],function(ml){
					ml.Add("气温",heatMap_TempStyles);
				});*/
			}
		}
	}
);
