/**
 * @author:wangkun
 * @date:2017-03-08
 * @param:
 * @return:
 * @description:短临主模块
 */
define(['QDLJKPage','SJZDPage','LJYBPage','DSYBPage','YJZDPage'],function(qdljk,sjzd,ljyb,dsyb,yjzd){
	this.depart=null;//部门
	return{
		/**
		 * @author:wangkun
		 * @date:2017-03-08
		 * @param:
		 * @return:
		 * @description:初始化
		 */
		Init:function(){
			var self=require('DLIndex');
			self.Event();
			//mlegend.Init();
			InitDepart();
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:初始化部门
			 */
			function InitDepart(){
				var userName = $.cookie("userName");
				if(userName==undefined||userName==null)
					return;
				var url=gridServiceUrl+"services/AreaService/getDepartByUser";
				var param={userName:userName};
				param = JSON.stringify(param);
				var errtext="获取部门信息失败!"
				require(['Common'],function(com){
					var promise=new Promise(function(resolve,reject){
						com.AJAX(url, param,false, errtext, resolve);
					});
					promise.then(data=>{
						if(data!=undefined||data!=null){
					            	this.depart=data;
					            }
					            else{
					            	console.log("获取部门失败!");
					            }
					});
				});
			}
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-08
		 * @param:
		 * @return:
		 * @description:事件
		 */
		Event:function(){
			console.log("注册事件！");
			$(".navigation button").bind("click",ClearDiv);
			$(".navigation button").bind("click",NavClickEffect);
			$(".navigation button").bind("click",LoadPage);
			/*$(".mapLayer").hover(function(){
			        	var $this = $(this).find(".moreMapLayer");
			        	$this.css("display","block");
			        	},function(){
				        var $this = $(this).find(".moreMapLayer");
				        $this.css("display","none");
			});*/
			Log();
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:点击效果
			 */
			function NavClickEffect(){
				$(".navigation button").removeClass("active");
				$(this).addClass("active");
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-08
			 * @param:
			 * @return:
			 * @description:加载页面
			 */
			function LoadPage(){
				/*require(['mullegend'],function(ml){
					ml.RemoveAll();
				});*/
				var id=this.id;
				if(id=="qtqjc_btn"){
					/*var qdljk=new QDLJCPageClass();
					qdljk.renderMenu();*/
					qdljk.Init();
				}
				else if(id=="ljyb_btn"){
					ljyb.Init();
				}
				else if(id=="dsyb_btn"){
					dsyb.Init();
				}
				else if(id=="yjzd_btn"){
					yjzd.Init();
				}
				else if(id=="sjzd_btn"){
					sjzd.Init();
				}
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:显示用户名
			 */
			function Log(){
				var userName = $.cookie("userName");
				var password = $.cookie("password");
				if (userName != null && password != null) {
					if (typeof($("#span_user")[0]) != "undefined" && typeof($("#a_exit")[0]) != "undefined") {
						$("#span_user")[0].innerHTML = $.cookie("showName");
						$("#a_exit")[0].innerHTML = "退出";
					}
				} else {
					if (typeof($("#a_exit")[0]) != "undefined")
						$("#a_exit")[0].innerHTML = "登录";
				}
				$("#a_exit").click(function() {
					if (this.innerHTML == "退出") {
						GDYB.GridProductClass.currentUserName = null;

						$("#span_user")[0].innerHTML = "未登录";
						$.cookie('password', '', {
							expires: -1
						}); //如果退出，不记录密码
						$.cookie("rmbUser", 'false', {
							expire: -1
						}); //如果退出，不记录密码
						this.innerHTML = "登录";
					} else if (this.innerHTML == "登录") {
						window.location.href = "index.html";
					}
				});
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:把以class为delete的全部清掉
			 */
			function ClearDiv(){
				$(".delete").remove();
			}
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-09
		 * @param:
		 * @return:
		 * @description:返回部门
		 */
		GetDepart:function(){
			return this.depart;
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-10
		 * @param:
		 * @return:
		 * @description:初始化Menu
		 */
		InitMenu:function(){
			$("#menu").css("width","300");
			$("#menu").css("padding","20");
		}
	}
});
