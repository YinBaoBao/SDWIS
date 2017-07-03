/**
 * Created by Ly_productListName on 2017-05-10.
 * function: 动态获取产品名称列表
 */
 function ly_GetProductName(beginTime,endTime){
		/*
			return function(){
				var xhr = createXHR();
				xhr.onreadystatechange = function(){
					if (xhr.readyState == 4){
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
							alert(xhr.responseText);
						} else {
							alert("Request was unsuccessful: " + xhr.status);
						}
					}
				};
				xhr.open("get", "example.txt", true);
				xhr.send(null);
			}*/
	var param='{"startDate":"'+beginTime+'","endDate":"'+endTime+'"}';
	$.ajax({
		type: 'post',
		url:  basicUserUrl + "/ProductService/getProductByName", //ENVIServiceUrl+'services/data/query',
		data: {'para': param},//data: {'param': '{"Function":"getProductName","CustomParams":{"startDate":"'+beginTime+'","endDate":"'+endTime+'"},"Type":2}'},
		dataType: 'json',
		timeout:6500,
		//设置数据同步；异步禁止：async: false ,
		async: false,
		success: function (data) {
			//剥离相同市级单位数据，选相同期各市第一个数据站
            //alert(data);
			//var container = $("#span_tzxx");
			//var container = document.getElementById("#span_tzxx");
			// for( var i=0,len=data.length; i<len;i++){
            //
			// 	container.append('<p>'+data[i].productName.toString()+'</p>');
            //
             //       // cNode[i].appendChild(document.createElement("<p>"+data[i].productName.toString()+"</p>"));
			// }

			for (var i in data) {
				data[i].state = data[i].state == undefined ?  '' : data[i].state;
			}

			$.each(data,function(i,value){
				$("#span_tzxx").append("<div class='reportList'><p>"+value.productName.toString()+"</p><div>"+value.lastDate+"</div><p>"+value.state+"</p></div>");
			});

		},
		error:function(){

			//console.log(obj);
		}
	});


}


