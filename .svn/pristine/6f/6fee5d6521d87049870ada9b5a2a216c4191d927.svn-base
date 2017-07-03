/**
 * Created by Dinlerkey on 2017/3/15.
 */
//websocket消息处理

function Chat(recall){
	this.socket = null;
	var t = this;
	this.productId = null;
	this.productName = null;
	this.ctrlFlag = false;
	this.connect = (function(host) {
		if ('WebSocket' in window) {
			t.socket = new WebSocket(host);
		} else if ('MozWebSocket' in window) {
			t.socket = new MozWebSocket(host);
		} else {
			alert('当前浏览器不支持实时推送');
			return;
		}

		t.socket.onopen = function () {
		};

		t.socket.onclose = function () {
			$("#chatText").keydown(null);
			//Console.log('Info: WebSocket closed.');
		};

		t.socket.onmessage = function (message) {
			if(message.data.indexOf(":")!=-1){
				var obj = JSON.parse(message.data.split(": ")[1].replace(/&quot;/g,'"'));
				//Console.log(obj.departName+":"+obj.content);
				recall(obj);
			}
		};
	});

	this.initialize = function() {
		if (window.location.protocol == 'http:') {
			t.connect('ws://' + window.location.host + '/examples/websocket/tc7/chat');
		} else {
			t.connect('wss://' + window.location.host + '/examples/websocket/tc7/chat');
		}
	};

	this.sendMessage = (function(message) {
		if (message != '') {
			message = message.replace(/\n/g,"000001");
			t.socket.send(message);
			$.ajax({
				type: "POST",
				data: {"para": message},
				url: gridServiceUrl+"services/ForecastfineService/updateForecastMessage",
				dataType: "json",
				success: function (data) {

				},
				error:function(data){
					alert("error");
				}
			});
			$("#chatText").val("");
		}
	});

	this.getNowTimes =function(){
		var nowDate = new Date();
		return nowDate.getFullYear()+"-"+(Array(2).join(0)+(nowDate.getMonth()+1)).slice(-2)+"-"+(Array(2).join(0)+nowDate.getDate()).slice(-2)+" "+(Array(2).join(0)+nowDate.getHours()).slice(-2)+":"+(Array(2).join(0)+nowDate.getMinutes()).slice(-2)+":"+(Array(2).join(0)+nowDate.getSeconds()).slice(-2);
	}
}

//websocket消息处理
function dealWithMessage(message){
	var divProductsOfRecent24H = null;
	var divMessage = $("#divMessage");

	if(divMessage != null){
		if(message.productId == GDYB.Chat.productId){
			if(message.departCode == GDYB.GridProductClass.currentUserDepart.departCode){
				var content = "<div style='margin-top: 5px;float: left;width: 100%;'>" +
					"<div style='text-align: right;margin-right: 20px;color: rgb(128,128,128);'><span style='color: rgb(164,137,138);'>"+message.updateTime.split("-")[1]+"-"+message.updateTime.split("-")[2] + "</span></div>" +
					"<div class='messageDetailMe'>"+message.content.replace("000001","")+"</div>" +
					"</div>";
			}
			else {
				var content = "<div style='margin-top: 5px;float: left;width: 100%;'>" +
					"<div style='margin-left: 20px;color: rgb(128,128,128);'>"+message.departName.split("气象台")[0]+" <span style='color: rgb(164,137,138);'>"+message.updateTime.split("-")[1]+"-"+message.updateTime.split("-")[2] + "</span></div>" +
					"<div class='messageDetail'>"+message.content.replace("000001","")+"</div>" +
					"</div>";
			}
			divMessage.append(content);
			$("#divMessage")[0].scrollTop = $("#divMessage")[0].scrollHeight;
		}
		else{
			var list = $("#menu_bd").find("#"+message.productId);
			for(var i=0;i<list.length;i++){
				if(list[i].id == message.productId){
					if($(list[i]).find("span").length == 0){
						$(list[i]).find("img").css("margin-right","5px");
						$(list[i]).find("img").before("<span style='color: white;border-radius: 100%;background-color: red;float: right;display: inline-block;height: 18px;width: 18px;text-align: center;line-height: 18px;' value='1'>1</span>");
					}
					else{
						var num = parseInt($(list[i]).find("span").html())
						$(list[i]).find("span").html((num+1));
					}
					break;
				}
			}
		}
	}
}

//数据库请求消息
function displayMessage(id){
	var url=gridServiceUrl+"services/GridService/getProductSendInfo";
	$.ajax({
		data: {"para": "{productId:'" + id + "'}"},
		url: gridServiceUrl+"services/ForecastfineService/getForecastMessage",
		dataType: "json",
		type: "POST",
		success: function (data) {
			var content = "";
			for(var i=0;i<data.length;i++){
				var className = "messageDetail";
				var style = "margin-left: 20px;"
				data[i].departName = data[i].departName.split("气象台")[0];
				data[i].content = data[i].content.replace("000001","\n");
				if(data[i].departCode == GDYB.GridProductClass.currentUserDepart.departCode){
					className = "messageDetailMe";
					style  = "text-align: right;margin-right: 20px;"
					data[i].departName = "";
				}
				content += "<div style='margin-top: 5px;float: left;width: 100%;'>" +
					"<div style='"+style+"color: rgb(128,128,128);'>"+ data[i].departName +" <span style='color: rgb(164,137,138);'>"+data[i].updateTime.split("-")[1]+"-"+data[i].updateTime.split("-")[2] + "</span></div>" +
					"<div class='"+className+"'>"+data[i].content+"</div>" +
					"</div>";
			}
			$("#divMessage").html(content);
			$("#divMessage")[0].scrollTop = $("#divMessage")[0].scrollHeight;
		},
		error: function(e){

		}
	});
}
