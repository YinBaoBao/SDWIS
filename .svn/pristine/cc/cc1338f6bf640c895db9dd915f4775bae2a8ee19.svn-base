/**
 * Created by yuliangbo on 2016/4/15.
 * Alter by pope on 2016/9/26.
 */
(function( $ ){
    $.fn.html2canvas = function(options,callback) {
        if (options && options.profile && window.console && window.console.profile) {
            console.profile();
        }
        options = options || {};

        options.onrendered = options.onrendered || function( canvas ) {
                var $canvas = $(canvas);

                if (options && options.profile && window.console && window.console.profileEnd) {
                    console.profileEnd();
                }

                try {
                    var imgData = $canvas[0].toDataURL();
                    var w = $canvas[0].width,
                        h = $canvas[0].height;
                    callback(imgData, w, h);
                } catch(e) {
                    if ($canvas[0].nodeName.toLowerCase() === "canvas") {
                        // TODO, maybe add a bit less offensive way to present this, but still something that can easily be noticed
                        alert("Canvas is tainted, unable to read data");
                    }
                }
            };

        html2obj = html2canvas(this, options);
    };
})( jQuery );

//构造截图类
function SPDPrint(){
    if(!(this instanceof SPDPrint)){
        return new SPDPrint();
    }
}
var fnPrint = SPDPrint.prototype;
//获取边界
fnPrint.getBound = function () {
    var bounds = GDYB.Page.curPolygon.getBounds();
    var lt = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.left, bounds.top));
    var lb = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.left, bounds.bottom));
    var rt = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.right, bounds.top));
    var rb = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.right, bounds.bottom));
    console.log(lt.x+","+lt.y);
    console.log(lb.x+","+lb.y);
    console.log(rt.x+","+rt.y);
    console.log(rb.x+","+rb.y);
}

//根据DIV截图
fnPrint.SPDprintDiv=function(container,callback){//控件id
    var $div =$(container);
    var memContext,memCanvas = document.createElement("canvas");
    //var Div = document.getElementById(id);
    var width = $div.width()+5;
    var height = $div.height()+5;
    memCanvas.width = width;
    memCanvas.height = height;
    memCanvas.style.width = width+"px";
    memCanvas.style.height = height+"px";
    memContext = memCanvas.getContext("2d");
    if($div.length > 0){
        html2canvas($div , {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas)
            {
                var ctxLegend= canvas.getContext("2d");
                var offsetX = width * 0.03 || 0;
                var offsetY = height* 0.03 || 0;
                memContext.putImageData(ctxLegend.getImageData(0,0,width,height),0,0);
                var img = new Image();
                img.src = memCanvas.toDataURL("image/png");
                if($.isFunction(callback)){
                    callback.call(img,img);
                }
            }
        });
    }
}
//根据地图边界截图
fnPrint.SPDPrintBound = function (id,bounds,map,isLegend,callback) {
	debugger;
    var lt = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.left, bounds.top));
    var lb = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.left, bounds.bottom));
    var rt = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.right, bounds.top));
    var rb = map.getPixelFromLonLat(new WeatherMap.LonLat(bounds.right, bounds.bottom));
    var memContext,memCanvas = document.createElement("canvas");
    var width = rt.x - lb.x +5;
    var height = rb.y-lt.y+5;
    if(isLegend){
        height  += 55;
    }
    memCanvas.width = width;
    memCanvas.height = height;
    memCanvas.style.width = width+"px";
    memCanvas.style.height = height+"px";
    memContext = memCanvas.getContext("2d");
    var el = document.getElementById(id);
    if(el){
        html2canvas(el , {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas)
            {
                var ctxLegend=canvas.getContext("2d");
                memContext.putImageData(ctxLegend.getImageData(lt.x,lt.y,width,height),0,0);
                var m_obj ={};
                m_obj.x =lt.x;
                m_obj.y =lt.y;
                var img = new Image();
                img.src = memCanvas.toDataURL("image/png");
                if($.isFunction(callback)){
                    callback.call(m_obj,img);
                }
            }
        });
    }
}
fnPrint.fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
}

