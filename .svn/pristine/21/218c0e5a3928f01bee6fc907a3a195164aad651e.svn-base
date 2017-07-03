/**
 * @author:wangkun
 * @date:2017-03-12
 * @description:雷达小界面
 */
define([],function(){
	return {
		Init:function(div){
			$("#"+div).append(`
				<div id="radar_div" class="delete">
					<div class="paneltitle panel-heading"><span class="pull-left">操作</span><span class="pull-right titleclose">△</span></div>
					<div class="panel-body">
						<div><span>大风：</span><a><img src="imgs/dafeng1.png"></a><a><img src="imgs/dafeng2.png"></a><a><img src="imgs/dafeng3.png"></a></div>
						<p></p>
						<div><span>短强：</span><a><img src="imgs/duanqiang1.png"></a><a><img src="imgs/duanqiang2.png"></a><a><img src="imgs/duanqiang3.png"></a></div>
						<p></p>
						<div><span>冰雹：</span><a><img src="imgs/bingbao.png"></a><span>闪电</span><a><img src="imgs/shandian.png"></a><span>雷暴：</span><a><img src="imgs/leibao.png"></a></div>
						<p></p>
						<div><span>35dbz回波：</span><button>液态含水量</button><button>TITAN </button><button>TREC</button><button>MCS</button></div>
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
});
