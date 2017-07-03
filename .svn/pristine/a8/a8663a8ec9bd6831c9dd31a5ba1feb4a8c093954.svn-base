require.config({
	baseUrl:'js/app',
	paths:{
		'pagebase':'../Pages/PageBase',
		'paneltool':'../Panels/Panel_Tools',
		'dtpicker':'../libs/datetimepicker.min'
	},
	shim:{
	}
});
require([],function(){
   var title=window.document.title;
	if(title=="短时临近预报系统"){
		require(['DLIndex'],function(dl){
			dl.Init();
			$(".navigation button:first").click();
		});
	   // jc.Init();
	}
	else{
		console.log(title+"未找到!");
	}
});
