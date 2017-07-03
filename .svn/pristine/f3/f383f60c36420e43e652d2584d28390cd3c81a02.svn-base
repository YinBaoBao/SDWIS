
/**
 * @requires WeatherMap/Layer/CanvasLayer.js
 * @requires WeatherMap/Layer/Grid.js
 * @requires WeatherMap/Tile/Image.js
 */

/**
 * Class: WeatherMap.Layer.ArcgisWMTS
 * 接ArcGIS Server发布的WMTS服务图层类。
 *     用于显示ArcGIS Server的WMTS地图服务，使用<WeatherMap.Layer.ArcgisWMTSLayer>的
 *     构造函数可以创建天地图图层，更多信息查看：
 *
 * Inherits from:
 *  - <WeatherMap.Layer.CanvasLayer>
 */
//var formatType = "vec";
WeatherMap.Layer.ArcgisWMTSLayer = WeatherMap.Class(WeatherMap.CanvasLayer, {
    //dir:"Map",
    format:"vec",
	servicesName:"",
	levelOffset:1,
	//isLabel:true,
    scales_1:[1/295829355.45,1/147914677.73,1/73957338.86,1/36978669.43,1/18489334,1/9244667.36,1/4622333.68,1/2311166.84,1/1155583.42,
			1/577791.71,1/288895.85,1/144447.93,1/72223.96,1/36111.98,1/18055.99,1/9028.00,1/4514.00,1/2257.00,1/1128.50,1/564.25],
    /**
     * APIProperty: layerType
     * {String} 图层类型.(vec:矢量图层，img:影像图层，ter:地形图层)
     */
    //layerType:"vec",    //(vec:矢量图层，cva:矢量标签图层，img:影像图层,cia:影像标签图层，ter:地形,cta:地形标签图层)

    /**
     * APIProperty: isLabel
     * {Boolean} 是否是标签图层.
     */
    //isLabel:false,

    /**
     * Property: attribution
     * {String} The layer attribution.
     */
    /**
     * Property: url  http://192.168.1.201:6080/arcgis/rest/services/YNGXPT/MapServer/WMTS/1.0.0/WMTSCapabilities.xml
	 * http://192.168.1.201:6080/arcgis/rest/services/YNGXPT/MapServer/WMTS/tile/1.0.0/YNGXPT/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png
	 *                http://192.168.1.201:6080/arcgis/rest/services/YNGXPT/MapServer/WMTS/tile/1.0.0/WMTS/default/nativeTileMatrixSet/1/153/205.png 
     * {String} 图片url.
     */
	url:"http://10.76.10.160:6080/arcgis/rest/services/SERVICESNAME/MapServer/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=SERVICESNAME&STYLE=default&TILEMATRIXSET=default028mm&TILEMATRIX=${TileMatrix}&TILEROW=${TileRow}&TILECOL=${TileCol}&FORMAT=image%2Fpng",
	//url:"http://127.0.0.1:6080/arcgis/rest/services/shandong/MapServer/tile/${TileMatrix}/${TileRow}/${TileCol}",
	//arcgis/rest/services/YNGXPT/MapServer/tile/${TileMatrix}/${TileRow}/${TileCol}",
    //cva_url:"http://t${num}.tianditu.com/DataServer?T=cva_${proj}&x=${x}&y=${y}&l=${z}",

    /**
     * Property: zOffset
     * {Number} 图片url中z值偏移量
     */
    //zOffset:1,
    /**
     * Constructor: WeatherMap.Layer.Tianditu
     * 创建天地图图层
     *
     * Example:
     * (code)
     * var tiandituLayer = new WeatherMap.Layer.Tianditu();
     * (end)
     */
    initialize: function (options) {
        var me = this;
        //me.name = "ArcgisWMTSLayer";
		var lt = this.format;
		var resStart;
		var resLength;
		if(lt=="vec"){
				resStart = 0;
				resLength = 17;
				levelOffset = 1;
			}
			else if(lt=="img"){
				resStart = 0;
				resLength = 17;
				levelOffset = 1;
			}
			else if(lt=="ter"){
				resStart = 0;
				resLength = 13;
				levelOffset = 1;
			}
        var resolutions=[0.7039144146041691,0.35195720849181505,0.17597860424590753,0.08798930093322327,0.043994651656342136,0.021997324638440566,0.01649799288396517,0.010998663508950785,0.008248996441982586,0.005499331754475392,0.00412450535937431,0.0027496646875071933,0.0020622503002261493,0.0013748335334840996,0.0010311251501130747,6.874167667420498E-4,3.437083833710249E-4,1.7185419168551245E-4,8.592709584275622E-5,4.296354792137811E-5,2.1477015038677383E-5,1.0740886980344528E-5]; //分辨率
		options = WeatherMap.Util.extend({
            maxExtent: new WeatherMap.Bounds(
                 -180,
                -90,
                180,
                90
            ), 
            tileOrigin:new WeatherMap.LonLat(-400, 400),
            resolutions:resolutions
            //第19级分辨率为0.298817952474，但由于绝大部分城市和地区在此级别都无图，所以暂不增加
//            resolutions: [156605.46875, 78302.734375, 39151.3671875, 19575.68359375, 9787.841796875, 4893.9208984375, 2446.96044921875, 1223.48022460937, 611.740112304687, 305.870056152344, 152.935028076172, 76.4675140380859, 38.233757019043, 19.1168785095215, 9.55843925476074, 4.77921962738037, 2.38960981369019, 1.19480490684509, 0.597402453422546]
            //scales: [1/5000000,1/4000000,1/3000000,1/2500000,1/2000000,1/1600000,1/1000000,1/500000,1/300000]
        }, options);
		WeatherMap.CanvasLayer.prototype.initialize.apply(me, [me.name, me.url, null, options]);
        //this.scales = [1/5000000,1/5000000,1/4000000,1/3000000,1/2500000,1/2000000,1/1600000,1/1000000,1/500000,1/300000];
    },

    /**
     * Method: getTileUrl
     * 获取每个tile的图片url
     *
     * Parameters:
     * xyz - {Object}
     */
    getTileUrl:function(xyz){
        var me = this; 
		url = me.url; 
        var x = xyz.x;
        var y = xyz.y; 
        var z = xyz.z;
		var lt = this.format; 
        url = WeatherMap.String.format(url, { 
			Style: "default",
			TileMatrixSet:"nativeTileMatrixSet",
			TileCol:x,
            TileRow:y,
            TileMatrix:z
        });  
        return url;
    },

    /**
     * Method: setMap
     * Set the map property for the layer. This is done through an accessor
     *     so that subclasses can override this and take special action once
     *     they have their map variable set.
     *
     *     Here we take care to bring over any of the necessary default
     *     properties from the map.
     *
     * Parameters:
     * map - {<WeatherMap.Map>}
     */
    setMap: function(map) {
        WeatherMap.CanvasLayer.prototype.setMap.apply(this, [map]);
    },

    setFormat: function(format){
      this.format = format;
    },
	setLayerName:function(layerName){
		this.name=layerName;
		this.servicesName=layerName;
		var re = /SERVICESNAME/g;
		this.url=this.url.replace(re,this.servicesName);  
	}, 
    CLASS_NAME: 'WeatherMap.Layer.ArcgisWMTSLayer'
});