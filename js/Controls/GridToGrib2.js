/**
 * 格点生成Grib2
 * change by fanjibing on 2017/5/24.
 */
function GridToGrib2(){ 
	var fn = GridToGrib2.prototype;
	this.className = "GridToGrib2";
	var hour = 8;
	var fileinfos = null;
	var myDateSelecter = null; 
	fn.init=function(parentDiv){
		var html='<div class="modal-header"><a class="close" data-dismiss="modal">×</a><h3>上传grib2</h3></div>'
		+'<div id="div_modal_grib2_content" class="modal-body"><div id="div_modal_grib2_titile" style="text-align: center;font-size: 14px;margin-bottom: 12px;font-weight: bold;"></div>'
		+'<div id="div_modal_grib2_table"></div></div>'
		+'<div class="modal-footer"><button id="btn_grib2" class="btn btn-success" style="font-weight: bold;">生成并上传grib2</button><button id="btn_h20" class="btn">20时</button>'
		+'<button id="btn_h08" class="btn">08时</button></div>'
		parentDiv.html(html);
		parentDiv.css("display", "block");
        parentDiv.modal('show').removeClass("hide");
        parentDiv.find("a").unbind();
		var date = new Date();
		hour = date.getHours()<12?8:20;
//                var strdate = date.getFullYear() +"年" + (date.getMonth()+1) + "月" + date.getDate() + "日 " + (Array(2).join(0)+hour).slice(-2) + "时";
//                $("#div_modal_grib2_titile").html(strdate);
		myDateSelecter = new DateSelecter(2, 2); //最小视图为天
		myDateSelecter.intervalMinutes = 60*24;
		 $("#div_modal_grib2_titile").html("");
		$("#div_modal_grib2_titile").append(myDateSelecter.div);
		$(".dateBtn").css("display", "none");
		myDateSelecter.input.css("border", "none");
		myDateSelecter.input.css("font-size", "16px");
		myDateSelecter.input.css("font-weight", "bold");
		myDateSelecter.setCurrentTime(date.getFullYear() +"-" + (Array(2).join(0)+(date.getMonth()+1)).slice(-2) + "-" + (Array(2).join(0)+date.getDate()).slice(-2) + " " + (Array(2).join(0)+hour).slice(-2) + ":00:00");
		myDateSelecter.input.change(function(){
			fn.displayGrib2Files();
		});
		this.displayGrib2Files();
		$("#btn_h20").click(function(){
                hour = 20;
                var date = myDateSelecter.getCurrentTimeReal();
                myDateSelecter.setCurrentTime(date.getFullYear() +"-" + (Array(2).join(0)+(date.getMonth()+1)).slice(-2) + "-" + (Array(2).join(0)+date.getDate()).slice(-2) + " " + (Array(2).join(0)+hour).slice(-2) + ":00:00");
                fn.displayGrib2Files();
        });
		$("#btn_h08").click(function(){
                hour = 8;
				var date = myDateSelecter.getCurrentTimeReal();
                myDateSelecter.setCurrentTime(date.getFullYear() +"-" + (Array(2).join(0)+(date.getMonth()+1)).slice(-2) + "-" + (Array(2).join(0)+date.getDate()).slice(-2) + " " + (Array(2).join(0)+hour).slice(-2) + ":00:00");
                fn.displayGrib2Files();
        });
		//生成grib2
		$("#btn_grib2").click(function() {
            if (!confirm("是否手动触发grib2格式输出？该过程可能需要大概1分钟。"))
                return;
            var strdate = myDateSelecter.getCurrentTime(false);
            var url = gridServiceUrl + "services/AppService/exportGrib2";
            $.ajax({
				type: 'post',
                data: {"para": "{forecastTime:'" + strdate + "'}"},
                url: url,
                dataType: "json",
                success: function (data) {
                    if (data == true) {
                        var date = myDateSelecter.getCurrentTimeReal();
                        var makeTimeHour = hour == 8 ? 5 : 16; //获取制作时间，就这样写吧
                        var makeTime = date.getFullYear() + "-" + (Array(2).join(0) + (date.getMonth() + 1)).slice(-2) + "-" + (Array(2).join(0) + date.getDate()).slice(-2) + " " + (Array(2).join(0) + makeTimeHour).slice(-2) + ":00:00";
                        var param = "{makeTime:'" + makeTime + "'}";
                        $.ajax({
                            type: 'post',
                            url: gridServiceUrl + "services/GridService/getGrib2Files",
                            data: {'para': param},
                            dataType: 'json',
                            error: function () {
                                alert("获取grib2文件列表错误！");
                            },
                            success: function (data) {
								console.log("上传Grib返回结果为："+data);
                                fileinfos = data;
                                if (fileinfos == null || fileinfos.length == 0) {
                                    alert("上传失败，请检查要素是否都已经提交订正结果，然后重试上传。");
                                    return;
                                } else {
                                    var iSucess = 0;
                                    for (var i = 0; i < fileinfos.length; i++) {
                                        var fileinfo = fileinfos[i];
                                        if (fileinfo.status != 0) {
                                            iSucess++;
                                        }
                                    }
									console.log("上传成功要素"+iSucess+"--总要求要素"+fileinfos.length);
                                    if (iSucess == fileinfos.length) {
                                        var dataServer = new DataServer();
                                        var values = '[{"productname":"' + strdate + '","productowner":"' + $.cookie("showName") + '","productcontent":"' + strdate + '","productImg":"","productpdf":"","productType":"GRIB2"}]';
                                        dataServer.updateData("product.add", values, function (data) {
                                            if (data > 0) {
                                                fn.displayGrib2Files();
                                                alert("产品上传成功。");
                                            }
                                        });
                                    } else {
                                        alert("有上传失败的要素，请检查要素是否都已经提交订正结果，然后重试上传。");
                                    }
                                }
                            }
                        });
                    } else {
                        alert("上传失败，请检查要素是否都已经提交订正结果，然后重试上传。");
                    }
                }
            });
        });
	}
	fn.displayGrib2Files=function(){
		var date = myDateSelecter.getCurrentTimeReal();
		var makeTimeHour = hour==8?5:16; //获取制作时间，就这样写吧
		var makeTime = date.getFullYear() +"-" + (Array(2).join(0)+(date.getMonth()+1)).slice(-2) + "-" + (Array(2).join(0)+date.getDate()).slice(-2) + " " + (Array(2).join(0)+makeTimeHour).slice(-2) + ":00:00";
		var param = "{makeTime:'"+ makeTime+"'}";
		$.ajax({
			type: 'post',
			url: gridServiceUrl+"services/GridService/getGrib2Files",
			data: {'para': param},
			dataType: 'json',
			error: function () {
				alert("获取grib2文件列表错误！");
			},
			success: function (data) {
				fileinfos = data;
				if(fileinfos == null || fileinfos.length == 0)
					return;
				var contentHtml = '<table id="div_modal_grib2_files" style="margin:auto;text-align: center;" border="1"><tbody><tr><td>要素</td><td style="width:500px;">文件名</td><td>状态</td></tr>';
				for(var i=0;i<fileinfos.length; i++) {
					var fileinfo = fileinfos[i];
					contentHtml += "<tr>"+ "<td>" + fileinfo.tag + "</td>"
							+"<td style='width:600px;color:#"+(fileinfo.status==0?"ff0000":"000000")+"'>" + fileinfo.fileName + "</td>" 
							+ "<td>" + (fileinfo.status==0?"<img src='imgs/img_error.png' title='未生成'>":"<img src='imgs/img_right.png' title='已生成'>") + "</td>" + "</tr>";
				}
				contentHtml += '</tbody></table>';
				$("#div_modal_grib2_table").html(contentHtml);
			}
		});
	}
}