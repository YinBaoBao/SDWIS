/**
 * @author: wangkun
 * @date:   2017-05-02
 * @description 图层
 */
function LayerUtil() {
	this._init_();
}
LayerUtil.prototype = {
	constructor: LayerUtil,
	_init_: function () {
		this.name = "图层";
	},
	heatLayers: [],
    /**
     * @author:wangkun
     * @date:2017-05-02
     * @return:
     * @description:添加图层
     */
	addLayer: function (layername, layertype, url, bounds, options) {
		var map = GDYB.Page.curPage.map;
		var layer = null;
		var layers = this.getLayerByName(layername);
		if (layers.length > 0) {
			layer = layers[0];
		}
		else {
			if (layertype === "vector") {
				layer = new WeatherMap.Layer.Vector(layername);
			}
			else if (layertype === "image") {
				layer = new WeatherMap.Layer.Image(layername, url, bounds, options);
			}
			else if (layertype === "makers") {
				layer = new WeatherMap.Layer.Markers(layername, {});
			}
			else {
				layer = new WeatherMap.Layer.FillRangeColorLayer(
					layername, {
						"radius": 40,
						"featureWeight": "value",
						"featureRadius": "geoRadius"
					}
				);
				this.heatLayers.push(layer);
			}
			map.addLayer(layer);
		}
		return layer;
	},
	/**
	 * @author:wangkun
	 * @date:2017-03-30
	 * @param:layername-图层名
	 * @return:图层
	 * @description:获取图层
	 */
	getLayerByName:function(layername){
		var map = GDYB.Page.curPage.map;
		return map.getLayersByName(layername);
	},
	/**
	 * @author:wangkun
	 * @date:2017-03-30
	 * @param:
	 * @return:
	 * @description:移除图层
	 */
	removeByName:function(layername){
		var map = GDYB.Page.curPage.map;
		var layer = this.getLayer(layername);
		if (layer.length > 0) {
			map.removeLayer(layer[0]);
		}
	},
	/**
	 * @author:wangkun
	 * @date:2017-04-04
	 * @param:
	 * @return:
	 * @description:移动图层至顶部
	 */
	moveToTop:function(targetlayer){
		var map = GDYB.Page.curPage.map;
		var targetIndex = map.getLayerIndex(targetlayer);
		var layerCount = map.getNumLayers();
		var max = 0;
		var maxLayer = null;
		for (var i = layerCount - 1; i >= 0; i--) {
			var layer = map.layers[i];
			var index = map.getLayerIndex(layer);
			if (index > max) {
				max = index;
				maxLayer = layer;
			}
		}
		map.setLayerIndex(targetlayer, max + 1);
		map.setLayerIndex(maxLayer, targetIndex);
		map.setLayerIndex(targetlayer, max);
	}
}