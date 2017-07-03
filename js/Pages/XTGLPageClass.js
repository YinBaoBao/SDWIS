/**
 * @author wyp
 * 2015-12-23
 * @description 系统管理页面
 */

function XTGLPageClass(){
	  this.areaName = null;
	  this.forcusAreaName = null;
	  this.departCode = null;
	  this.mmg = null;
	  
	 // var departCode;
	
	 //渲染左侧菜单区域里的按钮
    this.renderMenu = function() {
        var t = this;
        var htmlStr = "<div>"
            + "<div class='title1'>操作</div>"
            + "<div class='btn_line' style='padding: 0px 0px 5px 0px;'><div class='btn_line'><button style='margin-top:10px;' id='addAreaType'>添加类型</button><button style='margin-top:10px;' id='addArea'>绘制区域</button><button style='margin-top:10px;' id='export'>导入区域</button></div>"
            + "<div class='title1'>类型</div>"
            + "<div style='height: 400px;width: 260px;margin-left: 46px;margin-top: 10px;overflow: auto'><table id='tableAreaType'><tr><td tag='1' class='tdAreaType'>关注区域</td></tr><tr><td tag='2' class='tdAreaType'>气候区域</td></tr></table></div>"
            + "<div style='margin-left:46px'><a style='margin-right: 20px;' href="+host+":8080/gdyb/xml/AreaTemplate.xlsx target='_blank'>下载区域模板</a></div>"
            + "</div>";

        $("#menu_bd").html(htmlStr);
        GDYB.GridProductClass.init();
        GDYB.GridProductClass.currentUserArea = $.cookie("departCode");
        GDYB.GridProductClass.layerFocusArea.visibility = true;
        GDYB.GridProductClass.areaType = 1; //默认关注区
        GDYB.GridProductClass.areaTypeName = "关注区"; //默认关注区
        GDYB.GridProductClass.showFocusAreaByType();
        // 表格显示
        var gridString = "<div id='gridws' style='position:absolute;bottom:0px;width: 100%;'><div style='z-index:999;' class='bottomPanelImg'><img src='imgs/top.png'></div><div id='gridDiv' flag='active' style='padding: 0px 2px 5px 2px;background-color: #fff;'>"
            + "<table id='mmg' class='mmg'>"
            + "<tr>"
            + "<th rowspan='' colspan=''></th>"
            + "</tr>"
            + "</table></div></div>";

        $("#map_div").append(gridString);

        var items;
        var cols = [
            { title: 'id', name: 'id', width: 100, sortable: true, hidden: true, align: 'center'  },
            { title: '区域名称', name: 'name', width: 200, sortable: true, align: 'center'  },
            { title: '区域中心经度', name: 'centerX', width: 100, sortable: true, align: 'center' },
            { title: '区域中心纬度', name: 'centerY', width: 100, sortable: true, align: 'center'},
            { title: '代表站号', name: 'stationCode', width: 100, sortable: true, align: 'center'},
            { title: '代表站名', name: 'stationName', width: 100, sortable: true, align: 'center'},
            { title: '站点经度', name: 'stationX', width: 100, sortable: true, align: 'center'},
            { title: '站点纬度', name: 'stationY', width: 100, sortable: true, align: 'center'},
            { title: '创建时间', name: 'createDate', width: 200, sortable: true, align: 'center'},
            { title: '创建人', name: 'createUser', width: 100, sortable: true, align: 'center'},
//            { title: '状态', name: 'status', width: 50, sortable: true, align: 'center'},
            { title: '操作', name: '', width: 200, align: 'center', lockWidth: true, lockDisplay: true, renderer: function (val) {
                return '<button class="btn btn-info" style="margin: 5px;">修改</button><button  class="btn btn-danger" style="margin: 5px;">删除</button>'
            }}

        ];


        // 为bottomPanel绑定事件
        $(".bottomPanelImg").click(function () {
            var flag = $(this).next().attr("flag");
            if (flag == "active") {
                $(this).find("img").attr("src", "imgs/bottom.png");
                $(this).next().hide();
                $("#div_legend").hide();
                $(this).next().attr("flag", "hide");
            } else {
                $(this).find("img").attr("src", "imgs/top.png");
                $(this).next().show();
                $(this).next().attr("flag", "active");
            }


        });

        //点击类型
        $("body").on("click", ".tdAreaType", function(){
            var tdActive = $("#tableAreaType").find("td.active");
            if(tdActive.attr("id") == this.id)
                return;
            tdActive.removeClass("active");
            $(this).addClass("active");

            GDYB.GridProductClass.areaType = $(this).attr("tag");
            GDYB.GridProductClass.areaTypeName = $(this).html();
            GDYB.GridProductClass.showFocusAreaByType();

            // 刷新表格
            refreshTable();;
        });

        // 添加类型
        $("#addAreaType").click(function () {
            var d = dialog({
                title: '添加区域类型',
                content: '区域类型名称：<input id="inputAreaTypeName" style="height:28px;width:220px;" autofocus>',
                ok: function () {
                    var val = $("#inputAreaTypeName").val();
                    if (!val && typeof(val) != "undefined") {
                        this.title("名称不能为空，请重新输入!");
                        return false;
                    }
                    else{
                        var tdActive = $("#tableAreaType").find("td.active");
                        $(tdActive).removeClass("active");
                        $("#tableAreaType").append("<tr><td tag='-1' class='tdAreaType active'>"+val+"</td></tr>");
                        GDYB.GridProductClass.areaType = -1;
                        GDYB.GridProductClass.areaTypeName = val;
                        refreshTable();
                        GDYB.GridProductClass.showFocusAreaByType();
                    }
                },
                cancelValue: '取消',
                cancel: function () {
                }
            });
            d.showModal();
        });


        // 添加区域
        $("#addArea").click(function () {
            var tdActive = $("#tableAreaType").find("td.active");
            if(typeof(tdActive) == "undefined" || tdActive.length == 0) {
                $("#div_modal_confirm_content").html("请选择区域类型");
                $("#div_modal_confirm").modal();
                $("#div_modal_confirm").find("a").unbind();
                return;
            }

            drawForcusArea();
        });


        //为导入区域绑定事件
        $("#export").click(function () {
            var url = gridServiceUrl + "services/AreaService/exportAreas";
            var d = dialog({
                title: '导入区域',
                content: '<form id="areaExportForm" action=' + url + ' enctype="multipart/form-data" method="post"><div><input id="areaInputValue" style="height:30px;width:220px;float:left;" name="areaInputValue" type="text"><a href="javascript:;" style="height:30px;" class="a-upload"><input type="file" style="height:30px;" name="selectFile" id="selectFile" onChange="$(this).parent().prev().val(this.value)">浏览</a></div></form>',
                ok: function () {
                    var areaValue = $("#areaInputValue").val();
                    var array = new Array();
                    array = areaValue.split(".");
                    if (array[1] != "xlsx") {
                        this.title("请上excel文件!");
                        return false;
                    } else {

                        $("#areaExportForm").ajaxSubmit(function (data) {
                            alert(data);

                            initType(function(){
                                refreshTable(); // 刷新表格
                            });
                        });

                    }

                },
                cancelValue: '取消',
                cancel: function () {
                }
            });
            d.showModal();


        });

        function refreshTable(){
            var departCode = $.cookie("departCode");
            var type =  GDYB.GridProductClass.areaType;
            var param = "{departCode:'" + departCode + "',type:" + type + "}";
            $.ajax({
                type: 'post',
                url: gridServiceUrl + "services/AreaService/getAreasByDepartAndType",
                data: {'para': param},
                dataType: 'text',
                success: function (data) {
                    var dataObj = eval(data);
                    t.mmg.load(dataObj);

                },
                error: function () {

                }

            });
        }

        function drawForcusArea() {
            //var map = GDYB.Page.curPage.map;
            var map = GDYB.Page.curMap;
            map.addLayers([GDYB.GridProductClass.layerFocusArea]);
            GDYB.GridProductClass.drawFocusArea = new WeatherMap.Control.DrawFeature(GDYB.GridProductClass.layerFocusArea, WeatherMap.Handler.PolygonFree);
            map.addControl(GDYB.GridProductClass.drawFocusArea);
            GDYB.GridProductClass.layerFocusArea.visibility = true;
            GDYB.GridProductClass.showFocusAreaByType();
            GDYB.GridProductClass.drawFocusArea.activate();
            stopDragMap();


            function stopDragMap() {
                //var map = GDYB.Page.curPage.map;
                var map = GDYB.Page.curMap;
                for (var i = 0; i < map.events.listeners.mousemove.length; i++) {
                    var handler = map.events.listeners.mousemove[i];
                    if (handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag") {
                        handler.obj.active = false;
                    }
                }
            }


            GDYB.GridProductClass.drawFocusArea.events.on({"featureadded": drawCompletedFocusArea});


            // 画完区域监听
            function drawCompletedFocusArea(e) {
                if (typeof(e.feature) != "undefined" && e.feature != null) {
                    var d = dialog({
                        title: '区域名称',
                        content: '区域名称：<input id="areainput" style="height:28px;width:220px;" autofocus>',
                        ok: function () {
                            var val = $("#areainput").val();
                            var selectVal = $("#areaSelect").val();
                            if (typeof(val) == "undefined" || val.length == 0) {
                                this.title("名称不能为空，请重新输入!");
                                return false;
                            }
                            else {
                                GDYB.GridProductClass.forcusAreaName = val;
                                saveArea(e.feature.geometry);
                            }
                        },
                        cancelValue: '取消',
                        cancel: function () {
                        }
                    });
                    d.showModal();
                }

                function saveArea(geo){
                    var name = GDYB.GridProductClass.forcusAreaName;
                    var type = GDYB.GridProductClass.areaType;
                    var typeName = GDYB.GridProductClass.areaTypeName;
                    var centerX = geo.bounds.left + (geo.bounds.right - geo.bounds.left) / 2.0;
                    centerX = Math.round(centerX*1000000)/1000000;
                    var centerY = geo.bounds.bottom + (geo.bounds.top - geo.bounds.bottom) / 2.0;
                    centerY = Math.round(centerY*1000000)/1000000;
                    var coordinates = "";
                    var createUser = GDYB.GridProductClass.currentUserName;
                    var departCode = GDYB.GridProductClass.currentUserDepart.departCode;
                    var status = 0;

                    var lineString = geo.components[0];
                    var pts = lineString.components;
                    for (var i = 0; i < pts.length; i++) {
                        var pt = pts[i];
                        coordinates += Math.floor(pt.x * 10000) / 10000 + "," + Math.floor(pt.y * 10000) / 10000 + ";";
                    }
                    coordinates = coordinates.substr(0, coordinates.length - 1);

                    var url = gridServiceUrl + "services/AreaService/addArea";
                    $.ajax({
                        data: {"para": "{name:'" + name + "',centerX:" + centerX + ",centerY:" + centerY + ",coordinates:'" + coordinates
                            + "',createUser:'" + createUser + "',departCode:'" + departCode + "',status:" + status + "',type:" + type + ",typeName:'" + typeName + "'}"},
                        url: url,
                        dataType: "json",
                        success: function (data) {
                            if (data) {
                                alert("添加成功");
                                //刷新类型
                                if(type<0) {
                                    initType(function () {
                                        refreshTable(); //刷新表格
                                    }, typeName);
                                }
                                else
                                    refreshTable(); //刷新表格
                            } else {
                                alert("添加失败");
                            }


                            GDYB.GridProductClass.drawFocusArea.deactivate();
                            startDragMap();
                        },
                        type: "POST"
                    });
                }

                function startDragMap() {
                    //var map = GDYB.Page.curPage.map;
                    var map = GDYB.Page.curMap;
                    for (var i = 0; i < map.events.listeners.mousemove.length; i++) {
                        var handler = map.events.listeners.mousemove[i];
                        if (handler.obj.CLASS_NAME == "WeatherMap.Handler.Drag") {
                            handler.obj.active = true;
                        }
                    }
                }
            }


        }

        //初始化类型，如果curTypeName未定义，则选中最后一个
        function initType(recall, curTypeName){
            $("#tableAreaType").html("");
            var departCode = $.cookie("departCode");
            var param = "{departCode:'"+departCode+"'}";
            $.ajax({
                type: 'post',
                url: gridServiceUrl + "services/AreaService/getAreaType",
                data: {'para': param},
                dataType: 'json',
                error: function () {
                    alert('获取区域类型列表错误');
                },
                success: function (data) {
                    if(typeof(data) != "undefined")
                    {
                        var isCurType = false;
                        $("#tableAreaType").append("<tr><td tag='1' class='tdAreaType"+ (curTypeName=="关注区"?" active":"") + "'>关注区</td></tr>"); //默认显示关注区
                        var nindex = 0;
                        for(var key in data)
                        {
                            nindex++;
                            if(Number(key) == 1)
                                continue;
                            if(typeof(curTypeName) != "undefined")
                                isCurType = curTypeName == data[key];
                            if(isCurType || typeof(curTypeName) == "undefined" && Object.getOwnPropertyNames(data).length == nindex) {
                                $("#tableAreaType").append("<tr><td tag='"+key+"' class='tdAreaType active'>"+data[key]+"</td></tr>");
                                GDYB.GridProductClass.areaType = key;
                                GDYB.GridProductClass.areaTypeName = data[key];
                            }
                            else{
                                $("#tableAreaType").append("<tr><td tag='"+key+"' class='tdAreaType'>"+data[key]+"</td></tr>");
                            }
                        }
                        if(recall != null)
                            recall&&recall();
                    }
                }
            });
        }


        //初始化表格
        function initGrid() {
            // 加载表格数据
            var departCode = $.cookie("departCode");
            var type = GDYB.GridProductClass.areaType;
            var param = "{departCode:'" + departCode + "',type:" + type + "}";
            $.ajax({
                type: 'post',
                url: gridServiceUrl + "services/AreaService/getAreasByDepartAndType",
                data: {'para': param},
                dataType: 'text',
                error: function () {
                    alert('获取关注区域数据失败');
                },
                success: function (data) {
                    // mmgrid
                    items = eval(data);
                    t.mmg = $('.mmg').mmGrid({
                        height: 200,
                        cols: cols,
                        remoteSort: true,
                        items: items,
                        sortName: 'SECUCODE',
                        sortStatus: 'asc'

                    });
                    t.mmg.on('cellSelected', function (e, item, rowIndex, colIndex) {
                        if ($(e.target).is('.btn-danger') && confirm('你确定要删除该行记录吗?')) {
                            e.stopPropagation(); //阻止事件冒泡
                            var dataParam = '{"id":' + item.id + '}';
                            //删除区域
                            $.ajax({
                                type: 'post',
                                url: gridServiceUrl + "services/AreaService/deleteArea",
                                data: {'para': dataParam},
                                dataType: 'text',
                                error: function () {
                                    alert('删除失败');
                                },
                                success: function (data) {
                                    if (data = true) {
                                        alert("删除成功");
                                        t.mmg.removeRow(rowIndex);
                                        GDYB.GridProductClass.showFocusAreaByType();
                                    }


                                }
                            });
                        } else if ($(e.target).is('.btn-info')) {
                            var d = dialog({
                                title: '修改区域',
                                content: '区域名称：<input style="height:28px;" id="areaNameUpdate" value="'+item.name+'"><br>代表站号：<input style="height:28px;" id="inputStationCode" value="'+item.stationCode+'"><br>代表站名：<input style="height:28px;" id="inputStationName" value="'+item.stationName+'"><br>站点经度：<input style="height:28px;" id="inputStationX" value="'+item.stationX+'"><br>站点纬度：<input style="height:28px;" id="inputStationY" value="'+item.stationY+'">',
                                ok: function () {
                                    // 校验修改内容
                                    var areaNameUpdateValue = $("#areaNameUpdate").val();
                                    if (!areaNameUpdateValue && typeof(areaNameUpdateValue) != "undefined") {
                                        this.title("修改名称不能为空！");
                                        return false;
                                    } else {
                                        var id = item.id;
                                        var name = $("#areaNameUpdate").val();
                                        var stationCode = $("#inputStationCode").val();
                                        var stationName = $("#inputStationName").val();
                                        var stationX = $("#inputStationX").val();
                                        var stationY = $("#inputStationY").val();
                                        if(isNaN(stationX) || isNaN(stationY)){
                                            alert("错误，站点经纬度输入有误！");
                                            return;
                                        }
                                        var param = '{"id":' + id + ',"name":' + name + ',"stationCode":' + stationCode + ',"stationName":' + stationName + ',"stationX":' + stationX + ',"stationY":' + stationY + '}';
                                        $.ajax({
                                            type: 'post',
                                            url: gridServiceUrl + "services/AreaService/updateArea2",
                                            data: {'para': param},
                                            dataType: 'text',
                                            error: function () {
                                                alert('修改失败');
                                            },
                                            success: function (data) {
                                                if (data = true) {
                                                    alert("修改成功");
                                                    item.name = name;
                                                    item.stationCode = stationCode;
                                                    item.stationName = stationName;
                                                    item.stationX = stationX;
                                                    item.stationY = stationY;
                                                    t.mmg.updateRow(item, rowIndex);
                                                }


                                            }
                                        });


                                    }


                                },
                                okValue: '确定',
                                cancelValue: '取消',
                                cancel: function () {
                                }


                            });
                            d.showModal();

                        }
                        else{
                            //GDYB.Page.curPage.map.setCenter(new WeatherMap.LonLat(item.centerX, item.centerY), 7);
                            GDYB.Page.curMap.setCenter(new WeatherMap.LonLat(item.centerX, item.centerY), 7);
                        }
                    }).on('loadSuccess', function (e, data) {
                        //这个事件需要在数据加载之前注册才能触发
                        console.log('loadSuccess!');
                        console.log(data);
                        console.log(t.mmg.rowsLength());
                    }).load();


                }
            });


        }

        initType(function(){
            initGrid();
        },"关注区");
    };

}


XTGLPageClass.prototype = new PageBase();
