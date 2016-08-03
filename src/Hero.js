var Hero = Aircraft.extend({

    ctor : function(info) {
		var self = this;
        self._super(info);
    },

	// 发射子弹
	shoot : function(bullet) {
		this.parent.addBullet(bullet);
	},

});
