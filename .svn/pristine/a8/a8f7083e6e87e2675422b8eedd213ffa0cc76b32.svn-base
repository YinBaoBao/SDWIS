/**
 * 天气预警信息制作
 * @author rexer
 */

/*eslint no-unused-vars:off*/
/*eslint no-undef:off*/
var ZHYJPageClass = PageBase.prototype.extend({
	className: 'ZHYJPage',
	Grid: null, //表格插件实例
	// Produce: new AlertSignalProduce(), //预警制作实例
	drawStyle: { //绘制相关图层样式
		strokeColor: '#00e09e',
		fillColor: '#3de1ad',
		fillOpacity: 0.4
	},
	beforeDestroy: function() {
		$('#menu').removeClass('produce page-left');
		$('#map_div').removeClass('produce page-right');
	},
	renderMenu: function() {
		var me = this;

		// FIXME 缺失地理数据，制作类初始化后置
		/**
		 * 预警制作实例
		 * @type {AlertSignalProduce}
		 */

		this.Produce = new AlertSignalProduce({
            user:{
                userName: $.cookie("showName"),
                province: '山东',
                areaCode: $.cookie("departCode"),
                areaName: $.cookie("departName"),
                stationId: 54823,
                stationName: '济南',
                lat: 36.6,
                lon: 117
            }
        });
		// 获取市县级区域信息
		this.areaFeatures = [];
		T.downAreas([
			{ areaCode: '37', level: 'cnty' },
			{ areaCode: '37', level: 'cty' }
		]).done(function(areas) {
			console.time('dealAreas');
			var cityIndexMap = {}; //市级索引Map
			var lasts = []; //县级剩余
			for (var i = areas.length; i--;) {
				var area = areas[i],
					attr = area.attributes;
				var areaAttr = { code: Number(attr.CODE), name: attr.NAME };
				switch (Number(attr.LEVEL)) {
					case 1: //市级
						area.children = [];
						areaAttr.area = [];
						this.areaFeatures.push(area);
						cityIndexMap[attr.CODE] = this.areaFeatures.length - 1;
						break;
					case 2: //县级
						var parentCode = attr.PARENT || attr.CODE.substr(0, 4);
						var cityIndex = cityIndexMap[parentCode];
						if (cityIndex === undefined) lasts.push(area);
						break;
				}
			}
			// 添加剩下县级区域
			for (var j = 0, len = lasts.length; j < len; j++) {
				var area = lasts[j];
				var attr = area.attributes;
				var parentCode = attr.PARENT || attr.CODE.substr(0, 4);
				var cityIndex = cityIndexMap[parentCode];
				if (typeof cityIndex === 'number')
					this.areaFeatures[cityIndex].children.push(area);
			}
			console.timeEnd('dealAreas');
			cityIndexMap = null;
			lasts = null;
			i = null;
			j = null;

			// Debug 输出市 县 代码
			// console.log(`共计: ${areas.length}`);
			// console.log((this.areaFeatures.map(item => {
			// 	var attr = item.attributes,
			// 		children = item.children;
			// 	return `${attr.NAME} ${attr.CODE} ${children.length}: ${
			// 		children.map(item => {
			// 			return item.attributes.CODE;
			// 		}).join('\t')}`;
			// })).join('\n'));

		}.bind(this)).fail(function(err) {
			console.log(err);
			layer.msg(`基础数据准备失败，请重试：${err.message}`);
		});

		var signal_dict = this.Produce.CONST.signal_dict,
			firstSignalType = T.firstKey(signal_dict),
			firstSignalLevel = T.firstVal(signal_dict)[0];

		/**
		 * 初始化页面
		 */

		// 应用本页面样式
		$('#menu').addClass('produce page-left');
		$('#map_div').addClass('produce page-right');
		// 菜单栏
		$('#menu_bd').empty().append(`
<section style="margin-bottom: 10px;">
	<img id="signal-icon" src=${this.Produce.getAlertIcon(firstSignalType+firstSignalLevel)} style="position: absolute; width: 55px; right: 0; margin: 5px 32px 0;">
	<div class="title1">预警信号制作：</div>
	<div class="title2">信号类型</div>
	<div id="signal-type" class="btn_line radio" style="margin:0; padding-bottom:0;">
		${function(dict){
			var btns = '';
			for(var type in dict){
				btns +=`<button value="${type}">${type}</button>`;
			}
			return btns;
		}(signal_dict)}
	</div>
	<div class="title2">信号级别</div>
	<div id="signal-level" class="btn_line radio" style="margin:0;">
		${function(levels){
			var btns = '';
			for(var i=0;i<levels.length;i++){
				var level = levels[i];
				btns +=`<button value="${level}" style="width: 70px;">${level}</button>`;
			}
			return btns;
		}(T.firstVal(signal_dict))}
	</div>
	<div class="btn_line" style="text-align:center;">
		<a class="draw start popup-btn primary" style="width: 100px;">绘制落区</a>
		<a class="produce-btn popup-btn primary" style="width: 100px;">开始制作</a>
	</div>
</section>
<section style="margin-bottom: 10px;">
	<div class="title1" style="display:inline-flex;">预警信号列表：<div id="alert-grid-title" style="padding-left:20px;"></div></div>
	<div id="grid-wrapper" style="display:block; width:100%; height:400px; padding:0; margin:2px 0; border: 1px solid #ccc;">
		<div style="width: 100%;height: 100%;text-align: center;padding: 47%;">暂无数据</div>
	</div>
</section>
<section>
	<div class="title1">预警信号动画：</div>
	<div class="btn_line animator-ctrl">
		<button value="start">播放</button>
		<button value="stop">停止</button>
		<button value="pause">隐藏</button>
	</div>
</section>`);

		/**
		 * 绑定事件
		 */

		// 单选按钮组
		$('.radio').on('click', 'button', function(event) {
			event.preventDefault();
			if ($(this).hasClass('active')) {
				event.stopImmediatePropagation();
			} else {
				$(this).addClass('active').siblings('.active').removeClass('active');
			}
		});

		// 预警类型级别切换控制
		$('#signal-type').on('click', 'button', function() {
			var btns = '',
				levels = signal_dict[this.value];
			for (var i = 0; i < levels.length; i++) {
				var level = levels[i];
				btns += `<button ${i===0 ? 'class="active"' : ''} value="${level}" style="width: 70px;">${level}</button>`;
			}
			$('#signal-level').html(btns);
		}).find('button:first-child').addClass('active');

		$('#signal-level').find('button:first-child').addClass('active');

		$('#signal-type,#signal-level').on('click', 'button', function() {
			var signalType = $('#signal-type').find('.active').val(),
				signalLevel = $('#signal-level').find('.active').val(),
				signalIcon = me.Produce.getAlertIcon(signalType + signalLevel);
			$('#signal-icon').attr('src', signalIcon);
			me.Produce.updateSetting({
				signalType: signalType,
				signalLevel: signalLevel,
			});
			// 更新样式
			me.dxVectorLayer.style = me.getDrawStyle();
			if (me.dxVectorLayer.getVisibility())
				me.dxVectorLayer.redraw();
		});

		// 动画控制
		$('.animator-ctrl').on('click', 'button', function(event) {
			event.preventDefault();
			var ctrl = this.value;
			var animatorLayer = me.animatorLayer;
			if (!animatorLayer) return;
			var animator = animatorLayer.animator;
			if (!animator) return;

			switch (ctrl) {
				case 'start':
					me.toggleMarkerLayer(true);
					if (!animatorLayer.features.length) {
						animatorLayer.addFeatures(animatorLayer._FEATURES_);
					}
					animator.start();
					break;
				case 'pause':
					animator.pause();
					me.toggleMarkerLayer(false);
					break;
				case 'stop':
					animator.stop();
					animatorLayer.removeAllFeatures();
					break;
			}
		});

		/**
		 * 产品制作入口
		 */
		$('.content').on('click', '.produce-btn', function(event) {
			event.preventDefault();
			// 打开制作面板
			me.Produce.open();
		});

		/**
		 * 绘图入口
		 */
		$('.content').on('click', '.draw', function(event) {
			event.preventDefault();
			var $this = $(this);
			var beginning = $this.hasClass('start');
			// 切换状态
			$this.toggleClass('start btn-success primary')
				.text(beginning ? '完成绘制' : '绘制落区');

			// 开始绘制
			if (beginning) {
				me.clearDraw(); //重置绘图区
				me.draw();
				return;
			}

			// 完成绘制 -> 出图
			me.stopDraw();
			var features = me.dxVectorLayer.features;
			if (!T.isPretty(features)) return;
			var layerIndex = layer.load(0);
			// 获取选择区域 & 更新
			var polygon = features[0].geometry;
			me.getIntersects(polygon)
				.done(function(allowedFeatures, allowedAttrs) {
					// 更新地图
					me.draw2Luoqu(allowedFeatures);
					// 更新配置
					me.Produce.updateSetting({
						areas: allowedAttrs
					});
				})
				.always(function() {
					layer.close(layerIndex);
				});
		});

		// 复制常量属性
		this.CONST = this.Produce.CONST;

		/**
		 * 事件注册
		 */
		// 数据加载完成
		this.Produce.on('ready', this.init.bind(this));
		// 添加预警完成
		this.Produce.on('added', function(attr) {
			var me = this;
			// 地图绘制层关闭
			this.clearDraw();
			this.toggleMarkerLayer(true);
			// 添加新记录
			var instance = this.Grid;
			this.queryAlertSignalGeo({ alertId: attr.alertId })
				.done(function(data) {
					if (!T.isPretty(data)) return;
					data = data[0];
					var index = instance.countRows();
					var rowIndex = 0;
					// 更新地图
					me.addMarker(data, index);
					me.addAnimator(data, index);
					//更新表格
					var uData = [data].concat(instance.getSourceData());
					instance.updateSettings({ data: uData });
					instance.selectCell(0, 0);
				});
		}.bind(this));

	},
	// 初始化
	init: function() {
		this.forecastMarkersLayer = null; //地图标注层
		this.animatorLayer = null; //地图动画层
		this.popupFrame = null; //地图弹出层

		this.init4Map();
		this.loadData();
	},
	init4Map: function() {
		var me = this;
		var style = { //绘制相关图层样式
			strokeColor: '#00e09e',
			fillColor: '#3de1ad',
			fillOpacity: 0.4
		};
		// Marker图层
		if (!this.forecastMarkersLayer) {
			this.forecastMarkersLayer = new WeatherMap.Layer.Markers('forecastMarkersLayer');
			this.map.addLayer(this.forecastMarkersLayer);
		}
		this.forecastMarkersLayer.clearMarkers();
		// 动画图层
		if (!this.animatorLayer) {
			this.animatorLayer = new WeatherMap.Layer.AnimatorVector('animatorLayer', {
				rendererType: 'GlintAnimator'
			}, {
				repeat: true,
				speed: 1,
				startTime: 1,
				endTime: 1,
				frameRate: 20
			});
			this.animatorLayer.renderer.pointStyle = {
				pointRadius: 15,
				fillOpacity: 0.3
			};
			this.map.addLayer(this.animatorLayer);
		}
		this.animatorLayer.removeAllFeatures();

		//绘制图层
		if (!this.drawPolygon) {
			// 保存绘制结果图层
			this.dxVectorLayer = new WeatherMap.Layer.Vector('dxVectorLayer');
			// 绘制图层
			this.dxdrawLayer = new WeatherMap.Layer.Vector('dxdrawLayer');

			this.dxVectorLayer.style = this.drawStyle;
			this.dxdrawLayer.style = this.drawStyle;

			// 绘制控件
			this.drawPolygon = new WeatherMap.Control.DrawFeature(this.dxdrawLayer, WeatherMap.Handler.PolygonFree);
			this.drawPolygon.events.on({
				featureadded: function(eventArgs) {
					me.drawCompleted(eventArgs);
				}
			});
			this.map.addControl(this.drawPolygon);
			this.map.addLayer(this.dxVectorLayer);
		}

		// 标注图层
		if (!this.dxLabelLayer) {
			var strategy = new WeatherMap.Strategy.GeoText();
			strategy.style = {
				fontColor: '#000',
				fontWeight: 'normal',
				fontSize: '14px',
				fontSize: '14px',
				fill: true,
				fillColor: '#ffffff',
				fillOpacity: .8,
				stroke: true,
				strokeColor: '#c8c8c8'
			};
			this.dxLabelLayer = new WeatherMap.Layer.Vector("Label", { strategies: [strategy] });
			this.map.addLayer(this.dxLabelLayer);
		}

		// 清空弹出层
		this.map.removeAllPopup();
	},
	initGrid: function(data) {
		var me = this;
		var $container = $('#grid-wrapper').empty();
		var gridElement = $('<div class="alert-grid"></div>').appendTo($container)[0];

		function renderColor(instance, td, row, col) {
			var args = [].slice.call(arguments);
			var rowData = instance.getSourceDataAtRow(row);
			var level = rowData.signalLevel;
			var gbColor = me.getAlertColor(level);
			var color = level === '黄色' ? '#000' : '#fff';
			Handsontable.renderers.TextRenderer.apply(this, args);
			td.style.backgroundColor = gbColor;
			td.style.color = color;
		}
		var cols = [{
				title: '预警',
				data: 'type',
				readOnly: true,
				renderer: function(instance, td, row, col) {
					var args = [].slice.call(arguments);
					var rowData = instance.getSourceDataAtRow(row);
					args[5] = rowData.signalType + rowData.signalLevel;
					renderColor.apply(this, args);
				}
			},
			{
				title: '时间',
				data: 'issueTime',
				readOnly: true,
				type: 'date',
				dateFormat: 'YYYY-MM-DD HH:mm',
				renderer: function() {
					var args = [].slice.call(arguments);
					args[5] = moment(args[5]).format('YYYY-MM-DD HH:mm');
					renderColor.apply(this, args);
				}
			},
			{ title: '发布', data: 'city', readOnly: true, renderer: renderColor }, {
				title: '状态',
				data: 'changes',
				type: 'numeric',
				readOnly: true,
				renderer: function() {
					var args = [].slice.call(arguments);
					args[5] = me.Produce.getAlertChange(args[5]);
					renderColor.apply(this, args);
				}
			}
		];
		var instance = new Handsontable(gridElement, Handsontable.addon.paramize(cols, data, {
			height: 400,
			contextMenu: false,
			dropdownMenu: ['filter_by_condition', 'filter_action_bar', '---------', 'filter_by_value'],
			rowHeaders: false,
			multiSelect: false,
			currentRowClassName: 'highlightRow',
			currentColClassName: '',
			outsideClickDeselects: false //保持选中
		}));

		var currentRow = null;
		instance.addHook('afterSelectionEnd', function(row) {
			var currentData = this.getSourceDataAtRow(row);
			me.popup4Map(currentData, 'grid');
		});
		// 排序后默认选中第一行
		instance.addHook('afterColumnSort', function() {
			this.selectCell(0, 0);
		});

		// 表格信息
		$('#alert-grid-title').html(data.length > 0 ? `最新${data.length}预警` : '暂无数据');

		return this.Grid = instance;
	},
	/**
	 * 添加动画至地图
	 * @param  {Object}   attr  预警信号
	 * @param  {Number}   index 索引
	 */
	addAnimator: function(attr, index) {
		var style = { //点样式
			stroke: false,
			pointRadius: 2,
			outterRadius: 15
		};
		if (Number(attr.stationId) === 14) {
			style.outterRadius = 20;
		}
		var point = new WeatherMap.Geometry.Point(attr.longitude, attr.latitude);
		var pointStyle = Object.assign({}, style, { //样式
			fillColor: this.Produce.getAlertColor(attr.signalLevel)
		});
		var pointFeature = new WeatherMap.Feature.Vector(point, {
			TIME: 1,
			FEATUREID: index
		}, pointStyle);

		this.animatorLayer.addFeatures([pointFeature]);
		// 更新Features缓存
		this.animatorLayer._FEATURES_ = this.animatorLayer.features;
	},
	/**
	 * 添加标注至地图
	 * @param  {Object}   attr  预警信号
	 * @param  {Number}   index 索引
	 */
	addMarker: function(attr, index) {
		var me = this;
		var lonlat = new WeatherMap.LonLat(attr.longitude, attr.latitude);
		var size = new WeatherMap.Size(30, 25);
		if (Number(attr.stationId) === 14) {
			size = new WeatherMap.Size(60, 50)
		}
		var offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
		var alertName = attr.signalType + attr.signalLevel;
		var icon = this.Produce.getAlertIcon(alertName);

		var marker = new WeatherMap.Marker(
			new WeatherMap.LonLat(attr.longitude, attr.latitude),
			new WeatherMap.Icon(icon, size, offset)
		);
		marker.attributes = attr;
		marker.events.on({
			click: function() {
				me.popup4Map(this.attributes, 'click');
			},
			touchend: function() {
				me.popup4Map(this.attributes, 'touchend');
			},
			scope: marker
		});
		this.forecastMarkersLayer.addMarker(marker);
	},
	/**
	 * 弹出地图弹出层
	 */
	popup4Map: function(attr) {
		var stationId = attr.stationId,
			alertId = attr.alertId,
			markers = this.forecastMarkersLayer.markers,
			len = markers.length,
			results = [],
			i;
		for (i = 0; i < len; i++) {
			var attrI = markers[i].attributes;
			if (stationId === attrI.stationId && alertId != attrI.alertId) {
				results.push(attrI);
			}
		}

		// 按时间排序desc
		len = results.length;
		var exchange, tmp, j;
		for (i = 0; i < len; i++) {
			exchange = 0;
			for (j = len - 1; j > i; j--) {
				if (results[j].tnumber > results[j - 1].tnumber) {
					tmp = results[j - 1];
					results[j - 1] = results[j];
					results[j] = tmp;
					exchange = 1;
				}
			}
			if (!exchange) break;
		}

		this.addPopup([attr].concat(results));
	},
	/**
	 * 添加地图弹出层
	 * @param  {Object|Array:Object}   attr 预警信息
	 */
	addPopup: function(attrs) {
		if (!T.isPretty(attrs)) return;
		var lonlat = new WeatherMap.LonLat(attrs[0].longitude, attrs[0].latitude);
		var cards = attrs.map(attr => {
			return this.addCard4Popup(attr);
		});
		var html = `<div class="produce-mappopup">${cards.join('')}</div>`;
		var popup = new WeatherMap.Popup.FramedCloud(
			'marker_popup',
			lonlat,
			null,
			html,
			null,
			true
		);
		popup.setOpacity(0.0);
		this.map.removeAllPopup();
		this.map.addPopup(popup);
	},
	/**
	 * 添加预警信息卡片
	 */
	addCard4Popup: function(attr) {
		var alertName = attr.signalType + attr.signalLevel,
			alertChange = this.Produce.getAlertChange(attr.changes),
			alertIcon = this.Produce.getAlertIcon(alertName),
			// alertColor = this.getAlertColor(attr.signalLevel),
			// fColor = attr.signalLevel === '黄色' ? '#000' : '#fff',
			dateStr = moment(attr.issueTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm'),
			alertContext = attr.issueContent.replace(/<br>/g, '</p><p>').replace(/\n/g, '</p><p>');
		return `
<div class="alertsignal">
	<div class="thumbnail"><img src="${alertIcon}"></div>
	<section id=${attr.alertId}>
		<header>${alertChange}: ${alertName} <datetime style="font-family: Arial;font-size: 12px;font-weight: 400;">${dateStr}</datetime></header>
		<article><p>${alertContext}</p></article>
		<footer><button class="popup-btn-alter popup-btn" >更改</button></footer>
	</section>
</div>`;
	},
	/**
	 * 切换标注图层显隐
	 * @param  {Boolean}   visible [description]
	 */
	toggleMarkerLayer: function(visible) {
		visible = !!visible;
		this.forecastMarkersLayer.setVisibility(visible);
		this.animatorLayer.setVisibility(visible);
		if (!visible) {
			this.map.removeAllPopup();
		}
	},
	/**
	 * 清除绘制图层
	 * @return {[type]}   [description]
	 */
	clearDraw: function() {
		this.dxdrawLayer.removeAllFeatures();
		this.dxVectorLayer.removeAllFeatures();
		this.dxLabelLayer.removeAllFeatures();
	},
	/**
	 * 停止绘制
	 */
	stopDraw: function() {
		this.drawPolygon.activate();
		this.startDragMap();
	},
	/**
	 * 开始绘制
	 */
	draw: function() {
		var me = this;
		this.toggleMarkerLayer(false);
		this.stopDragMap();
		//激活控件
		this.drawPolygon.activate();
	},
	/**
	 * 完成绘制
	 * @param  {Object}   eventArgs  Event
	 */
	drawCompleted: function(eventArgs) {
		// 绘制geometry
		var geometry = eventArgs.feature.geometry.components;
		// 合并当前geometry
		if (this.dxVectorLayer.features.length === 1) {
			var geometryOld = this.dxVectorLayer.features[0].geometry;
			geometry = geometry.concat(geometryOld.components);
		}
		// 构建面
		var polygon = new WeatherMap.Geometry.Polygon(geometry);
		var geoVector = new WeatherMap.Feature.Vector(polygon);
		// 更新图层
		this.dxdrawLayer.removeAllFeatures();
		this.dxVectorLayer.removeAllFeatures();
		this.dxVectorLayer.style = this.getDrawStyle();
		this.dxVectorLayer.addFeatures([geoVector]);
		this.dxVectorLayer.redraw();
		// this.toggleMarkerLayer(true);
	},
	/**
	 * 绘制落区图
	 * @param  {Array:Feature}  features 选中区域
	 */
	draw2Luoqu: function(features) {
		var textFeatures = []
		// 计算中心点添加标注
		for (var i = features.length; i--;) {
			var geometry = features[i].geometry;
			var areaName = features[i].attributes.NAME;
			var point = geometry.getCentroid();
			var geoText = new WeatherMap.Geometry.GeoText(point.x, point.y, areaName);
			textFeatures.push(new WeatherMap.Feature.Vector(geoText));
		}
		this.dxLabelLayer.removeAllFeatures();
		this.dxVectorLayer.removeAllFeatures();
		this.dxLabelLayer.addFeatures(textFeatures);
		this.dxVectorLayer.addFeatures(features);
		this.dxVectorLayer.redraw();
	},
	/**
	 * 获取相交区划区域
	 * 全市相交添加市级区域，部分相交添加对应县级区域
	 * @param  {Polygon}   polygon 多边形
	 * @return {Promise}
	 */
	getIntersects: function(polygon) {
		console.time('intersects'); // Debug

		var defer = new $.Deferred();

		// 整理属性
		function getAttr(feature) {
			var attr = feature.attributes;
			return {
				name: attr.NAME,
				code: attr.CODE,
				pId: attr.PARENT
			};
		}

		var areaFeatures = this.areaFeatures;
		var allowedFeatures = [];
		var allowedAttrs = [];

		// 遍历市级
		for (var i = areaFeatures.length; i--;) {
			var cityFeature = areaFeatures[i],
				cityPolygon = cityFeature.geometry;
			// 市级相交
			if (polygon.intersects(cityPolygon)) {
				var countryFeatures = cityFeature.children;
				var flag = true; //是否为全市
				var allowedFeatures2 = [];
				var allowedAttrs2 = [];
				// 遍历县级
				for (var j = countryFeatures.length; j--;) {
					var countryFeature = countryFeatures[j],
						countryPolygon = countryFeature.geometry;
					// 县级相交
					if (polygon.intersects(countryPolygon)) {
						allowedFeatures2.push(countryFeature);
						allowedAttrs2.push(getAttr(countryFeature));
					} else {
						flag = false;
					}
				}
				if (flag) { //添加市级
					allowedFeatures.push(cityFeature);
					allowedAttrs.push(getAttr(cityFeature));
					continue;
				}
				// 添加县级
				allowedFeatures = allowedFeatures.concat(allowedFeatures2);
				allowedAttrs = allowedAttrs.concat(allowedAttrs2);
			}
		}

		defer.resolve(allowedFeatures, allowedAttrs);

		console.timeEnd('intersects'); // Debug

		return defer.promise();
	},
	/**
	 * 获取绘制层样式
	 * @return {Object}   样式
	 */
	getDrawStyle: function() {
		var signalLevel = $('#signal-level').find('.active').val(),
			fillColor = this.getAlertColor(signalLevel),
			strokeColor = this.Produce.getAlertColor(signalLevel);
		return $.extend({}, this.drawStyle, {
			strokeColor: strokeColor,
			fillColor: fillColor
		});
	},
	/**
	 * 激活Pan
	 */
	startDragMap: function() {
		var map = GDYB.Page.curPage.map;
		for (var i = 0; i < map.events.listeners.mousemove.length; i++) {
			var handler = map.events.listeners.mousemove[i];
			if (handler.obj.CLASS_NAME == 'WeatherMap.Handler.Drag') {
				handler.obj.active = true;
			}
		}
		for (var i = 0; i < map.controls.length; i++) {
			if (map.controls[i].displayClass == 'smControlDrawFeature') {
				map.controls[i].deactivate();
			}
		}
	},
	/**
	 * 注销Pan
	 */
	stopDragMap: function() {
		var map = GDYB.Page.curPage.map;
		for (var i = 0; i < map.events.listeners.mousemove.length; i++) {
			var handler = map.events.listeners.mousemove[i];
			if (handler.obj.CLASS_NAME == 'WeatherMap.Handler.Drag') {
				handler.obj.active = false;
			}
		}
	},
	/**
	 * 获取预警颜色（有偏移）
	 * @param  {String}   level  信号级别
	 * @return {String}          HEX
	 */
	getAlertColor: function(level) {
		switch (level) {
			case '蓝色':
				return '#1565C0';
			case '黄色':
				return '#FFEB3B';
			case '橙色':
				return '#ff9f07';
			case '红色':
				return '#E91E63';
		}
	},

	/**
	 * 加载预警信号数据
	 * 显示到地图和表格
	 */
	loadData: function() {
		var me = this;
		// 查询最近预警 20条
		this.queryAlertSignalGeo({ cnt: 20 }).done(function(data) {
			// 初始化图层
			if (!T.isPretty(data)) {
				me.initGrid([]);
			} else {
				me.initGrid(data);
				var size = data.length;
				// 时间正序添加
				for (var i = data.length; i--;) {
					me.addMarker(data[i], size - i - 1);
				}

				// 动画添加至最新预警
				me.addAnimator(data[0], 0);
				setTimeout(function() {
					me.animatorLayer.animator.start();
				}, 1000);
			}
		});
	},
	// 查询预警信号
	queryAlertSignalGeo: function(para) {
		return $.post(this.CONST.service + 'queryAlertSignalGeo', T.paramize(para));
	}
});
