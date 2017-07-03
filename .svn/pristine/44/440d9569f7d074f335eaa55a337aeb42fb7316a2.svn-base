/**
 * Created by wangkun on 2017/1/11.
 * title:短临服务-显示和监测
 */
function QDLJCPageClass() {
	this.className = "QDLJC";
	var t = this;
	t.MyTime=null;
	t.MapLayer = new Map(); //存放地图图层
	this.renderMenu=function(){
		/*$("#menu").css("background-color","#2591F1");*/
		/*$("#menu_bd").html(`
			<div class="datetime">
				<div id="dateSelect"></div>
			</div>
			<div class="space"></div>
			<div id="live">
				<div class="title"><img src="imgs/live.png"><span>实况</span></div>
				<div class="col7" id="rain"><span>降水：</span><button id="24">24h</button><button id="12">12h</button><button id="6">6h</button><button id="3">3h</button><button id="1">1h</button><button id="0.5">30m</button></div>
				<div class="space5"></div>
				<div class="col4" id="wind"><span>大风：</span><button id="17-25">17-25</button><button id="17-25">25-30</button><button id="30">>=30</button></div>
				<div class="space5"></div>
				<div class="col5"><button id="bb">冰雹</button><button id="flash">闪电</button><button id="leib">雷暴</button><button id="vis">能见度</button><button id="regimen">水情</button></div>
				<div class="space5"></div>
				<div class="col5"><button id="temp">气温</button><button id="maxtemp">最高</button><button id="mintemp">最低</button></div>
			</div>
			<div id="radar">
				<div class="title"><img src="imgs/radar.png"><span>雷达</span></div>
				<div class="newcol"><button id="mosaic">三维拼图</button><button id="cr">组合反射率</button><button id="top">回波顶高</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="vil">垂直液态水含量</button><button id="fbzz">风暴识别与追踪</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="qpe">QPE</button><button id="qpf">QPF</button><button id="titan">TITAN</button><button id="trec">TREC</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crjk">回波监控预警</button><button id="sdt">速度图</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crforcast">反射率预报</button></div>
			</div>
			<div id="satellite">
				<div class="title"><img src="imgs/satellite.png"><span>卫星</span></div>
				<div class="newcol"><button id="infrared">红外</button><button id="minfrared">中红外</button><button id="moisture">水汽</button><button id="vlight">可见光</button></div>
			</div>
			<div id="monitorsignal">
				<div class="title"><img src="imgs/monitorsignal.png"><span>预警信号</span></div>
				<div class="newcol"><button id="by">暴雨</button><button  id="tf">台风</button><button  id="gw">高温</button><button  id="hc">寒潮</button><button  id="dw">大雾</button></div>
				<div class="newcol"><button  id="df">大风</button><button  id="ld">雷电</button><button  id="bb">冰雹</button><button  id="lbdf" style="flex:2;">雷暴大风</button></div>
			</div>
			<div id="objectiveproduct">
				<div class="title"><img src="imgs/objectiveproduct.png"><span>客观产品</span></div>
				<div class="newcol"><button>强回波</button><button>强回波预报</button></div>
				<div class="newcol"><span>外推：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>EC：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>GFS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MESO：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MARS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
			</div>
			<div id="alarm">
				<div class="half" style="justify-content: flex-end;">
					<span>报警</span>
					<div id="bj" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
				<div class="half">
					<span>声音</span>
					<div id="voice" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
			</div>
		`);*/
		$("#menu_bd").html(`
			<div class="datetime">
				<div id="dateSelect"></div>
			</div>
			<div id="live">
				<div class="title"><img src="imgs/live.png"><span>实况</span></div>
				<div class="newcol" id="rain"><span>降水：</span><button id="24">24h</button><button id="12">12h</button><button id="6">6h</button></div>
				<div class="newcol" id="rain"><span></span><button id="3">3h</button><button id="1">1h</button><button id="0.5">30min</button></div>
				<div class="space5"></div>
				<div class="newcol" id="wind"><span>大风：</span><button id="17-25">17-25</button><button id="17-25">25-30</button><button id="30">>=30</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="bb">冰雹</button><button id="flash">闪电</button><button id="leib">雷暴</button><button id="vis">能见度</button><button id="regimen">水情</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="temp">气温</button><button id="maxtemp">最高</button><button id="mintemp">最低</button></div>
			</div>
			<div id="radar">
				<div class="title"><img src="imgs/radar.png"><span>雷达</span></div>
				<div class="newcol"><button id="mosaic">三维拼图</button><button id="cr">组合反射率</button><button id="top">回波顶高</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="vil">垂直液态水含量</button><button id="fbzz">风暴识别与追踪</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="qpe">QPE</button><button id="qpf">QPF</button><button id="titan">TITAN</button><button id="trec">TREC</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crjk">回波监控预警</button><button id="sdt">速度图</button></div>
				<div class="space5"></div>
				<div class="newcol"><button id="crforcast">反射率预报</button></div>
			</div>
			<div id="satellite">
				<div class="title"><img src="imgs/satellite.png"><span>卫星</span></div>
				<div class="newcol"><button id="infrared">红外</button><button id="minfrared">中红外</button><button id="moisture">水汽</button><button id="vlight">可见光</button></div>
			</div>
			<div id="monitorsignal">
				<div class="title"><img src="imgs/monitorsignal.png"><span>预警信号</span></div>
				<div class="newcol"><button id="by">暴雨</button><button  id="tf">台风</button><button  id="gw">高温</button><button  id="hc">寒潮</button><button  id="dw">大雾</button></div>
				<div class="newcol"><button  id="df">大风</button><button  id="ld">雷电</button><button  id="bb">冰雹</button><button  id="lbdf" style="flex:2;">雷暴大风</button></div>
			</div>
			<div id="objectiveproduct">
				<div class="title"><img src="imgs/objectiveproduct.png"><span>客观产品</span></div>
				<div class="newcol"><button>强回波</button><button>强回波预报</button></div>
				<div class="newcol"><span>外推：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>EC：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>GFS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MESO：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
				<div class="newcol"><span>MARS：</span><button>短强</button><button>大风</button><button>冰雹</button></div>
			</div>
			<div id="alarm">
				<div class="half" style="justify-content: flex-end;">
					<span>报警</span>
					<div id="bj" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
				<div class="half">
					<span>声音</span>
					<div id="voice" class="switch">
						<div class="open1 parent">
							<div class="open2 child"></div>
						</div>
					</div>
				</div>
			</div>
		`);
		InitEvent();
		InitDateTIme();
		/**
		 * @author:wangkun
		 * @date:2017-03-29
		 * @param:
		 * @return:
		 * @description:初始化事件
		 */
		function InitEvent(){
			t.MyTime=new DateSelecter(1, 1); //最小视图为分钟
			t.MyTime.intervalMinutes = 6; //6分钟
			$("#dateSelect").append(t.MyTime.div);
		}
		//DisplayAlarmArea();
		/**
		 * @author:wangkun
		 * @date:2017-03-10
		 * @param:
		 * @return:
		 * @description:初始化时间
		 */
		function InitDateTIme(){
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
			$("#datetimepicker").datetimepicker('setDate', new Date());
		}
	}
}
QDLJCPageClass.prototype = new PageBase();
