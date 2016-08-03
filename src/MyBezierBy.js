
var MyBezierBy = cc.BezierBy
if (!cc.sys.isNative)
{
MyBezierBy = cc.BezierBy.extend({

    update : function (dt) {
 		var self = this;
 		var target = self.target;
		dt = self._computeEaseTime(dt);
		if (target)
		{
			// 计算位置
            var cfg = self._config;
            var xa = 0;
            var xb = cfg[0].x;
            var xc = cfg[1].x;
            var xd = cfg[2].x;

            var ya = 0;
            var yb = cfg[0].y;
            var yc = cfg[1].y;
            var yd = cfg[2].y;

            var x = cc.bezierAt(xa, xb, xc, xd, dt);
            var y = cc.bezierAt(ya, yb, yc, yd, dt);

            var prevPos = self._previousPosition;
            var startPos = self._startPosition;
            if (cc.ENABLE_STACKABLE_ACTIONS) {
                startPos.x += target.x - prevPos.x;
                startPos.y += target.y - prevPos.y;
			}
            x += startPos.x;
            y += startPos.y;

			// 计算角度
			var angle = util.calcAngle(prevPos.x, prevPos.y, x, y);
			angle = -angle;
			target.setRotation(angle);

			prevPos.x = x;
	        prevPos.y = y;
			target.setPosition(x, y);
        }
    },

});
}

