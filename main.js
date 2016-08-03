/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

var m = {
	onEnter : function() {
		document.body.style.height = window.innerHeight + "px";
		document.body.style.width = window.innerWidth + "px";

		this.initCocos();
	},

	// 初始化cocos
	initCocos : function() {
		var self = this;
		cc.game.onStart = function(){
			cc.view.enableAutoFullScreen(false);

			// 显示精灵边框
		//	cc.SPRITE_DEBUG_DRAW = 1;

			// Pass true to enable retina display, disabled by default to improve performance
			cc.view.enableRetina(false);
			// Adjust viewport meta
			cc.view.adjustViewPort(true);
			// Setup the resolution policy and design resolution size
			cc.view.setDesignResolutionSize(defs.DESIGN_WIDTH, defs.DESIGN_HEIGHT, cc.ResolutionPolicy.NO_BORDER);
			// The game will be resized when browser size change
			cc.view.resizeWithBrowserSize(true);

			if (cc.visibleRect.width / cc.visibleRect.height > defs.DESIGN_WIDTH / defs.DESIGN_HEIGHT) {
				cc.scaleY = cc.scaleAny = cc.visibleRect.height / defs.DESIGN_HEIGHT;
				cc.scaleX = 1;
			}
			else {
				cc.scaleX = cc.scaleAny = cc.visibleRect.width / defs.DESIGN_WIDTH;
				cc.scaleY = 1;
			}

			//load resources
			self.loadResources();
		};
		cc.game.run();
	},

	// 加载资源
	loadResources : function() {
		var self = this;
		var elemNum = $1("loading-num");
		cc.loader.load(g_resources,
			function (result, count, loadedCount) {
				var percent = (loadedCount / count * 100) | 0;
				percent = Math.min(percent, 100);
				elemNum.textContent = percent;
			}, function () {
				self.onLoaded();
			});
	},

	// 缓存PLIST
	fixResources : function () {
		for (var key in res) {
			var url = res[key];
			if (cc.isString(url) && url.lastIndexOf(".xml") == url.length - 4) {
				cc.spriteFrameCache.addSpriteFrames(url);
			}
		}
	},

	// 资源加载完成事件
	onLoaded : function() {
		this.fixResources();
		var elemLoading = $1("loading");
		elemLoading.parentNode.removeChild(elemLoading);
		$1("pages").style.display = "block";
		util.bindClickEvent("#next", this.onNextPage.bind(this));
		util.bindClickEvent("#start", this.onStartGame.bind(this));
		this.showPage(1);
	},

	// 显示第二页
	onNextPage : function() {
		this.showPage(2);
	},

	// 开始游戏
	onStartGame : function() {
		app.friendName = $1("friendName").value;

		var pages = $1("pages");
		pages.parentNode.removeChild(pages);
		$1("gameCanvas").style.display = "block";

		app.startGame();
	},

	// 显示指定页
	showPage : function(n) {
		var pages = $2("page");
		for (var i=0; i<pages.length; i++) {
			pages[i].style.display = "none";
		}
		$1("page" + n).style.display = "block";
	},
};
addEventListener("load", m.onEnter.bind(m));
