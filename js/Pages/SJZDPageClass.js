/**
 * Created by wangkun on 2017/3/29.
 * title:短临服务-上级指导
 */
function SJZDPageClass() {
	this.className = "SJZD";
	var t = this;
	t.MyTime=null;
	t.MapLayer = new Map(); //存放地图图层
	this.renderMenu=function(){
		$("#menu_bd").html(`
			<div id="currentNav"></div><div class="btitle"></div>
			<div class="datetime">
				<div id="dateSelect"></div>
			</div>
			<div class="space"></div>
			<div class="newcol">
				<span>中央台：</span><button>临近预报</button><button>短时预报</button>
			</div>
			<div class="newcol">
				<span>省&nbsp;&nbsp;&nbsp;&nbsp;台：</span><button>临近预报</button><button>短时预报</button>
			</div>
			<div class="newcol">
				<span></span><button>QPE</button><button>QPF</button>
			</div>
		`);
		InitEvent();
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
	}
}
SJZDPageClass.prototype = new PageBase();
