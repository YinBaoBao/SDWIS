/**
 * 站内消息
 * @author rexer
 * @date   2017-01-14
 */

var Messenger = function(clazz) {
    var MessengerClass = clazz({
        init: function(rootElement) {
            this.container = document.querySelector(rootElement);
            this.PageCreator = new PageCreatorClass(this.container);

            // this.PageCreator.main();
            // this.PageCreator.mainTray();
            // this.PageCreator.chat();
            // this.PageCreator.alert();
        },
    });

    // UI
    var PageCreatorClass = clazz({
        init: function(container) {
            this.container = container;
        },
        // 主界面
        main: function() {
            return $('<div id="main-messenger" class="messenger main"></div>')
                .appendTo(this.container);
        },
        // 小图标
        tray: function() {
            return $(`
            	<div class="messenger tray z-depth-1">
            		<img clas="tray-icon">
            		<span class="tray-title"></span>
            	</div>`)
                .appendTo(this.container);
        },
        // 小图标
        mainTray: function() {
            return $(`
            	<div id="main-tray" class="messenger tray main z-depth-1">
            		<i title="我的消息" class="tray-icon fa fa-comments" aria-hidden="true"></i>
            	</div>`)
                .appendTo(this.container);
        },
        // 聊天界面
        chat: function() {
            return $(`
        		<div class="messenger main">
        			<header></header>
        			<content></content>
        		</div>
        	`).appendTo(this.container);
        },
        // 提醒
        alert: function() {
            return $(`
        		<div class="messenger alert"></div>
        	`);
        },
    });


    return new MessengerClass('body');

}(clazz);
