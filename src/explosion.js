var explosion = {
	_animation : null,


	play : function(parent, x, y, scale) {

		if (!this._animation) {
			var frames = [];
			for (var i=1; i<=35; i++)
				frames.push(cc.spriteFrameCache.getSpriteFrame('explosion_' + ((i+100)+"").substr(1,2) + ".png"));
			this._animation = new cc.Animation(frames, 0.04);
			this._animation.retain();
		}
		
		var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("explosion_01.png"));
		sprite.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
		sprite.x = x;
		sprite.y = y;
		sprite.scale = scale;
		parent.addChild(sprite, 20);

		sprite.runAction(cc.sequence(cc.animate(this._animation), cc.callFunc(function(){
			parent.removeChild(sprite);
		})));
	},


	playHitted : function(parent, x, y) {

		var s1 = new cc.Sprite(res.hit);
		s1.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
		s1.x = x;
		s1.y = y;
		s1.scale = 0.5;
		s1.rotation = util.randRangeInt(0,360);
		parent.addChild(s1, 20);
		s1.runAction(cc.sequence(cc.scaleTo(0.2, 1),cc.fadeOut(0.2), cc.callFunc(function(){
			parent.removeChild(s1);
		})));
	},
};
