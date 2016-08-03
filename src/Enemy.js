var Enemy = Aircraft.extend({


	// 发射子弹
	shoot : function(bullet) {
		var self = this;
		var r = bullet._angle * 2*Math.PI/360;
		bullet.x = self.x + self._entityRadius * Math.cos(r);
		bullet.y = self.y + self._entityRadius * Math.sin(r);
		self.parent.addBomb(bullet);
	},

	// 路径走完事件
	onPathEnded : function() {
		this.parent.removeEnemy(this);
	},

});
