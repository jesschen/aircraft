ScoreBoard = cc.Node.extend({
	_scoreLabel : null,	// 成绩文本
	_prevScore	: 0,
	_score		: 0,

	ctor : function() {
		var self = this;
		self._super();
		self.scheduleUpdate();

		var text = new cc.LabelTTF("分数：", "微软雅黑", 24);
		text.enableStroke(cc.color(0, 0, 0, 1), 2);
		text.anchorX = 0;
		self.addChild(text);

		// 成绩字
		var label = this._scoreLabel = new cc.LabelTTF("0", "微软雅黑", 36);
		label.enableStroke(cc.color(0, 0, 0, 1), 2);
		label.anchorX = 0;
		label.x = text.width;
		self.addChild(label);
	},

	update: function (dt) {
		var self = this;
		if (self._prevScore < self._score) {
			self._prevScore += Math.ceil((self._score - self._prevScore)/8);
			self._scoreLabel.string = util.toFriendlyNumber(self._prevScore);
		}
	},

	addScore : function(score) {
		var self = this;
		self._score += score;
		return;
	},

});
