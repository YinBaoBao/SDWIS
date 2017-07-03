/**
 * 带滑块的数字输入框
 * Created by zouwei on 2016/4/21.
 */
function InputRangeDigit(div, min, max){//div:容器
    this.div = div;
    this.input = null;
    this.img = null;
    this.sliderContainer = null;
    this.slider = null;
    this.min = -10;
    this.max = 10;
    this.recall = null;

    if(typeof(min) != "undefined" && typeof(max) != "undefined"){
        this.min = min;
        this.max = max;
    }

    //创建dom元素
    this.createDom = function(){
        var t = this;
        var inputId = div.attr("id")+"_"+"input";
        var imgId = div.attr("id")+"_"+"img";
        var sliderContainerId = div.attr("id")+"_"+"sliderContainer";
        var sliderId = div.attr("id")+"_"+"slider";
        this.div.html("<div>"
            +"<input id='"+inputId+"' style='width: 32px;height: 25px;margin: 0px'/>"
            +"<img id='"+imgId+"' src='imgs/img_inputRangeDigit.png' style='margin: 0px;'/></div>"
            +"<div id='"+sliderContainerId+"' style='display: none;position: absolute;margin-left:102px;margin-top:-55px;z-index:100;width: 14px;height: 110px;background-color: #EEEEEE;border: solid 1px rgb(112,112,112);'>"
            +"<div id='"+sliderId+"' style='background-color: #ff0000;height: 10px'></div></div>");
        this.input = $("#"+inputId+"");
        this.img = $("#"+imgId+"");
        this.sliderContainer = $("#"+sliderContainerId+"");
        this.slider = $("#"+sliderId+"");

        var widthInput = parseInt(t.input.css("width"));
        t.sliderContainer.css("margin-left",widthInput+1);

		this.input.change(function(){
			t.recall&& t.recall();
		});
		this.input.blur(function(){
			t.recall&& t.recall();
		});

        var mouseDown = false;
        this.img.mousedown(function(){
            t.sliderContainer.css("display", "block");
            var val = t.input.val();
            val=(val==""?0:parseInt(val));
            var heightContainer = parseInt(t.sliderContainer.css("height"));
            var heightSlider = parseInt(t.slider.css("height"));
            var range = heightContainer - heightSlider;
            var y = (val- t.min)/(t.max - t.min)*range;
            t.sliderContainer.css("margin-top", (y - heightContainer - heightSlider/2)+"px");
            t.slider.css("margin-top", (heightContainer - y - heightSlider)+"px");
            mouseDown = true;
        });

//        t.sliderContainer.mouseup(function(){
//            t.sliderContainer.css("display", "none");
//        });

//        t.sliderContainer.mousemove(function(e){
//            if(e.buttons != 1) //鼠标左键
//                return;
//            var y = e.offsetY;
//            if(e.target != this)
//                y+=parseInt(t.slider.css("margin-top"));
//            var heightContainer = parseInt(t.sliderContainer.css("height"));
//            var heightSlider = parseInt(t.slider.css("height"));
//            var range = heightContainer-heightSlider;
//            y-=heightSlider/2;
//            if(y>range || y<0)
//                return;
//            t.slider.css("margin-top", y);
//            y = range-y;
//            var val = t.min+y/range*(t.max - t.min);
//            val = Math.round(val);
//            t.input.val(val);
//        });

        this.sliderContainer.mousedown(function(e){
            mouseDown = true;
        });

        $(document).mousemove(function(e){
            if(!mouseDown)
                return;
            //if(e.buttons != 1) //鼠标左键
            if(e.which != 1) //鼠标左键
                return;
            if(t.sliderContainer.css("display") == "none")
                return;
            var top = t.sliderContainer.offset().top;
            var y = e.pageY - top;

            var heightContainer = parseInt(t.sliderContainer.css("height"));
            var heightSlider = parseInt(t.slider.css("height"));
            var range = heightContainer-heightSlider;
            y-=heightSlider/2;
            if(y>range || y<0)
                return;
            t.slider.css("margin-top", y);
            y = range-y;
            var val = t.min+y/range*(t.max - t.min);
            val = Math.round(val);
            t.input.val(val);
        });

        $(document).mouseup(function(e){
            if(mouseDown) {
                mouseDown = false;
                t.sliderContainer.css("display", "none");
                t.recall&& t.recall();
            }
        });
    };

    //点击事件
    this.change = function(recall){
        this.recall = recall;
    };

    this.val = function(val){
        if(typeof(val) == "undefined") {
            var val = this.input.val();
            val = (val == "" ? 0 : Number(val));
            return val;
        }
        else{
            this.input.val(val);
        }
    };

    this.createDom();
}
