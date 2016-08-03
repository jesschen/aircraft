Ground = cc.Node.extend({
	_ground			: null,
	_groundTile1	: null,
	_groundTile2	: null,

	ctor : function() {
		var self = this;
		self._super();

		// 地面
		var g = self._ground = new cc.Node();
		g.x = cc.visibleRect.bottom.x;
		g.y = cc.visibleRect.bottom.y;
		self.addChild(g);

		var tile = self._groundTile1 = new cc.Sprite(res.bg2);
		tile.anchorY = 0;
		g.addChild(tile);
	},

	// 拖屛
	move : function(len) {
		var self = this;

		var g = self._ground;
		g.y -= len;

		if (self._groundTile1.y + g.y <= 0) {
			var last = self._groundTile2;
			self._groundTile2 = self._groundTile1;
			if (!last) {
				last = new cc.Sprite(res.bg2);
				last.anchorY = 0;
				g.addChild(last);
			}
			self._groundTile1 = last;
			last.y = self._groundTile2.y + last.height;
		}
	},
});
