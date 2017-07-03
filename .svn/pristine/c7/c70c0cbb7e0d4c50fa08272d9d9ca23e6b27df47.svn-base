/**
 * 预报产品制作
 * @author rexer
 */

var ProductPageClass;

~ function(P) {
    // 页面类型
    var PAGE_SEC = {
        TEXT: 0,
        MAP: 1,
        IMAGE: 2,
        TABLE: 3,
        WORD: 4
    };

    // 产品类型
    var PRODUCT_SEC = [
        { id: 'gdyb', name: '格点预报', page: PAGE_SEC.MAP },
        { id: 'pro_1', name: '短期常规天气预报', page: PAGE_SEC.TABLE },
        { id: 'pro_2', name: '中期常规天气预报', page: PAGE_SEC.TABLE },
        { id: 'pro_3', name: '17地市城市预报', page: PAGE_SEC.TABLE },
        { id: 'pro_4', name: '全国主要城市天气预报', page: PAGE_SEC.TEXT },
        { id: 'pro_5', name: '大城市天气预报', page: PAGE_SEC.TABLE },
        { id: 'pro_6', name: '气象风险预警业务', page: PAGE_SEC.TABLE },
        { id: 'pro_7', name: '每日气象服务专报', page: PAGE_SEC.WORD },
        { id: 'pro_8', name: '森林火险等级预报', page: PAGE_SEC.WORD },
    ];

    // 缓存页面信息
    var PAGE = null;
    // 地图
    var mapInstance = null;

    /**
     * 创建页面
     */
    var PageCreator = {
        reset: function() {
            PAGE.panel.empty();
            mapInstance = null;
        },
        initPage: function() {},
        // 地图页面
        initMapPage: function() {
            PAGE.panel.append(`
            	<div id="menu_bd" class="condition h" style="width:300px;"></div>
				<div id="map-container" class="h" style="width:calc(100% - 300px);">
					<div id="map" class="map-flow"></div>
				</div>
			`);
        },
        initTextPage: function() {

        },
        initTablePage: function() {

        },
        initWordPage: function() {

        },
    };

    /**
     * 继承PageBase
     */
    ProductPageClass = P.prototype.extend({
        // 初始化页面
        renderMenu: function() {
            var _self = this;
            var $content = $('.content')
                .append('<div class="flex-wrapper"><ul id="product-menu" class="m0 p0"></ul><div id="product-panel"></div></div>')

            PAGE = {
                content: $content,
                panel: $content.find('#product-panel'),
                menu: $content.find('#product-menu')
            };

            // 产品类型导航
            PRODUCT_SEC.forEach(function(item, index) {
                PAGE.menu.append(`
					<li class="radio-btn" data-type="` + item.id + `" data-page="` + item.page + `">
						<a>
							<img src="imgs/img_level.png">
							<span>` + item.name + `</span>
						</a>
					</li>
				`);
            });

            PAGE.menu.on('click', 'li', function(event) {
                event.preventDefault();
                var $this = $(this);
                if ($this.hasClass('active')) return;
                $this.addClass('active').siblings('.active').removeClass('active');
                // 分发
                var dataType = $this.attr('data-type'),
                    pageType = $this.attr('data-page');
                _self.dispatch(dataType, Number(pageType));
            });

            // 默认加载
            PAGE.menu.find('li').eq(0).click();
        },
        // 分发
        dispatch: function(productId, pageType) {

            // 页面dispatch
            PageCreator.reset();
            switch (pageType) {
                case PAGE_SEC.MAP:
                    PageCreator.initMapPage();
                    var map = this.initMap();
                    mapInstance = new Map4Product(map);
                    break;
                case PAGE_SEC.TEXT:
                    PageCreator.initTextPage();
                    break;
                case PAGE_SEC.TABLE:
                    PageCreator.initTablePage();
                    break;
                case PAGE_SEC.WORD:
                    PageCreator.initWordPage();
                    break;
                default:
                    PageCreator.initPage();
                    break;
            }

            // 任务dispatch
            var resolved = ProductCreator.dispatch(productId, {
                Map: mapInstance,
                PAGE: PAGE
            }, this);

            if (resolved === false) {
                // 失败
            }
        }
    });

}(PageBase);
