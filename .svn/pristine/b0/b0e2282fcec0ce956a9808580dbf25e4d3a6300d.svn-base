/**
 * @author:wangkun
 * @date:2017-03-29
 * @param:
 * @return:
 * @description:雷达窗口
 */
function SmallRadar(){
	/**
	 * @author:wangkun
	 * @date:2017-03-29
	 * @param:
	 * @return:
	 * @description:初始化
	 */
	this.Initi=function(divid){
		$("#"+divid).append(`
			<div id="radar_div" class="delete">
				<div class="paneltitle panel-heading"><span class="pull-left">操作</span><span class="pull-right titleclose">△</span></div>
				<div class="panel-body">
					<div class="newcol"><span>大风：</span><button><img src="imgs/dafeng1.png"></button><button><img src="imgs/dafeng2.png"></button><button><img src="imgs/dafeng3.png"></button></div>
					<div class="space5"></div>
					<div class="newcol"><span>短强：</span><button><img src="imgs/duanqiang1.png"></button><button><img src="imgs/duanqiang2.png"></button><button><img src="imgs/duanqiang3.png"></button></div>
					<div class="space5"></div>
					<div class="newcol"><span>冰雹：</span><button><img src="imgs/bingbao.png"></button><span>闪电</span><button><img src="imgs/shandian.png"></button><span>雷暴：</span><button><img src="imgs/leibao.png"></button></div>
					<div class="space5"></div>
					<div class="newcol"><span style="flex:2.5;">35dbz回波：</span><button style="flex:2;">液态含水量</button><button>TITAN </button><button>TREC</button><button>MCS</button></div>
				</div>
			</div>
		`)
		$("#radar_div").draggable();
		$("#radar_div .titleclose").bind("click",function(){
			$("#radar_div panel-body").toggle();
		});
		$("#radar_div button").bind("click",EleCheck);
		function EleCheck(){
			if($(this).hasClass(".active")){
				$(this).removeClass(".active");
			}
			else{
				$(this).addClass(".active");
			}
		}
	}
}
