var app = {
	// 开始游戏
	startGame : function() {
        var scene = new MyScene(GameLayer);
	    cc.director.runScene(new cc.TransitionFade(0.6, scene));
	},
	// 重新游戏
	restartGame : function() {
        var scene = new MyScene(GameLayer);
//	    cc.director.runScene(new cc.TransitionFadeBL(0.3, scene));
//	    cc.director.runScene(new cc.TransitionPageTurn(0.3, scene, true));
	    cc.director.runScene(new cc.TransitionSlideInL(0.3, scene));
	},

	// 显示结果页
	goResult : function(score, winOrFailed) {
		this.score = score;
		this.isWin = winOrFailed;

        var scene = new MyScene(ResultLayer);
//	    cc.director.runScene(new cc.TransitionFadeTR(0.3, scene));
//	    cc.director.runScene(new cc.TransitionPageTurn(0.3, scene));
	    cc.director.runScene(new cc.TransitionSlideInR(0.3, scene));
	}
};

var MyScene = cc.Scene.extend({
	_LC : null,

	ctor : function(l) {
		this._super();
		this._LC = l;
	},
    onEnter:function () {
        this._super();
        this.addChild(new this._LC());
    },
});
