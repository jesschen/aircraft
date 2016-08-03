var ResultLayer = cc.LayerColor.extend({

    ctor : function() {
		var self = this;
		self._super();

		// 背景
		var bg = new cc.Sprite(res.bg3);
		bg.setPosition(cc.visibleRect.center);
		bg.y -= cc.visibleRect.bottom.y * (1-cc.scaleY);
        self.addChild(bg);

		// 重试按钮
		var retry = self.createButton(140, 488, 360, 70,function(){
			app.restartGame();
		});
        self.addChild(retry);

		// 下载按钮
		var download = self.createButton(140, 350, 360, 90,function(){
			window.location.href = 'http://game.qq.com';
		});
        self.addChild(download);

		// 延时显示成绩
		self.scheduleOnce(self.showScore, 0.4);
    },
	
	// 显示成绩
	showScore : function() {
		var self = this;
		var container = new cc.Node();
        self.addChild(container);

		// 文字
		var friendName = (app.friendName || '基友'), textContent = app.isWin ? ('恭喜你与' + friendName + '合力战胜了敌人！') : ('很遗憾，你和' + friendName + '被敌人干掉了！');
		var centerX = cc.visibleRect.center.x;
		var text = new cc.LabelTTF(textContent, "黑体", 35);
		text.color = cc.color(248,210,21);
		text.x = centerX;
		text.y = cc.visibleRect.top.y - 200 * cc.scaleY;
        container.addChild(text);

		// 地板
		var scoreTag = new cc.Sprite(res.score_board);
		scoreTag.x = centerX;
		scoreTag.y = cc.visibleRect.top.y - 330 * cc.scaleY;
        container.addChild(scoreTag);

		var scoreNum = new cc.LabelTTF(util.toFriendlyNumber(app.score), "斜体", 60);
		scoreNum.color = cc.color(248,210,21);
//		scoreNum.anchorX = 0;
//		scoreNum.anchorY = 0.5;
		scoreNum.x = centerX;
		scoreNum.y = cc.visibleRect.top.y - 360 * cc.scaleY;
        container.addChild(scoreNum);
		
		// 动画
		container.setContentSize(defs.DESIGN_WIDTH, defs.DESIGN_HEIGHT);
		container.anchorX = 0.5;
		container.anchorY = (scoreTag.y + text.y) / defs.DESIGN_HEIGHT / 2;
		container.x = container.anchorX * defs.DESIGN_WIDTH;
		container.y = container.anchorY * defs.DESIGN_HEIGHT;

		var offsetX = -10, offsetY = 400;
		container.scale = 5;
		container.x += offsetX;
		container.y += offsetY;

		container.runAction( cc.sequence(
			 cc.spawn(cc.scaleTo(0.3, 1), cc.moveBy(0.3, -offsetX, -offsetY)).easing(cc.easeIn(2))
		));

		// 屏幕抖一下
		var actShake = cc.moveBy(0.03, cc.p(3,10));
		self.runAction(cc.sequence(cc.delayTime(0.3)
			, cc.repeat(cc.sequence(actShake, actShake.reverse()),6)
			, cc.callFunc(function(){
				self.y = 0;
				self.x = 0;
			})
		));

	},

	// 创建按钮
	createButton : function(x, y, cx, cy, callback) {
		var item = new cc.MenuItem(callback, this);
/*
		var d = new cc.DrawNode();
		d.setContentSize(cx, cy);
		d.setLineWidth(2);
		d.setDrawColor(cc.color(0,255,255));
		d.drawRect(cc.p(0,0), cc.p(d.width,d.height), cc.color(0,0,0,80));
		item.addChild(d);
*/
		item.setAnchorPoint(0,0);
		item.setContentSize(cx, cy);
		var menu = new cc.Menu(item);
		menu.x = x;
		menu.y = y;
		return menu;
	},
});
