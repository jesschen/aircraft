var Aircraft = cc.Sprite.extend({
	_type		: null,
	_weapon		: null,
	_hp			: 0,
	_fireIndex	: 0,
	_fireProg	: 0,
	_hpSlot		: null,
	_destroied	: false,
	_isBoss		: false,

    ctor : function(info) {
		var self = this;
		var type = self._type = util.clone(AircraftType[info.type]);
		util.copyTo(type, info);
        self._super(type.texture);

		self.scheduleUpdate();
		self.fixPath();

		// 起点偏移
		if (type.posX) self.x += type.posX;
		if (type.posY) self.y += type.posY;

		// 当前血量，及分值
		self._hp = type.hp;
		self._score = type.score;

		// 计算实体半径，用于碰撞检测
		self.resetEntityRadius();

		var weapon = self._weapon = WeaponType[type.weapon];
		if (weapon)
			self._fireProg = weapon.fireRegular[0].delay - type.fireDelay;
    },

	// 停止开火及移动
	stop : function() {
		this.unscheduleUpdate();
		this.stopAllActions();
	},

	// 计算碰撞半径
	resetEntityRadius : function() {
		var entityRadius = this._type.entityRadius;
		if (!entityRadius) {
			entityRadius = (this.width + this.height) / 2 * 0.5;
		}
		this._entityRadius = entityRadius;
	},

	// 设置移动路径
	fixPath : function() {
		var self = this;
		if (self._type.path === undefined)
			return;

		var path = PathType[self._type.path];

		// 设置路径
		var time = 1000 / self._type.speed;
		var acts = self.createPathActions(path, time, MyBezierBy);

		// 延时
		if (self._type.pathDelay)
			acts.unshift(cc.delayTime(self._type.pathDelay/1000));

		// 是否存在重复循环路径
		if (self._type.repeatPath) {
			var time = 1000 / self._type.repeatSpead;
			var repeatActs = cc.sequence(self.createPathActions(PathType[self._type.repeatPath], time, cc.BezierBy)).repeatForever();
			repeatActs.retain();
			acts.push(cc.callFunc(function(){
				self.runAction(repeatActs);
				repeatActs.release();
			}));
			self.runAction(cc.sequence(acts));
		}
		else {
			acts.push(cc.callFunc(self.onPathEnded, self));
			self.runAction(cc.sequence(acts));
		}
	},
	createPathActions : function(path, time, ACT)
	{
		var acts = [], points = path.points;
		if (path.type == 'line') {
			// 旋转一定角度
			var angle = util.calcAngle(0, 0, points[0][0], points[0][1]);
			acts.push(cc.rotateBy(0, -angle));
			acts.push(cc.moveBy(time, points[0][0], points[0][1]));
		}
		for (var i=0; i<=points.length-3; i+=3) {
			var pp = [cc.p(points[i][0],points[i][1]), cc.p(points[i+1][0],points[i+1][1]), cc.p(points[i+2][0],points[i+2][1])];
			acts.push(new ACT(time, pp));
		}
		return acts;
	},

	update: function (dt) {
		var self = this;
		self._super(dt);
		self.checkFire(dt*1000);

	},

	// 开火检查
	checkFire : function(dt) {
		var self = this;
		if (self._weapon){
			self._fireProg += dt;

			var fireRegular = self._weapon.fireRegular;
			for (;;) {
				var fireInfo = fireRegular[self._fireIndex];
				if (self._fireProg < fireInfo.delay)
					break;
				self._fireProg = 0;
				self._fireIndex = (self._fireIndex+1) % fireRegular.length;

				// 计算开火角度
				var fireAngle = fireInfo.angle;
				if (fireAngle == 'p1') {
					if (self.parent._gameEnd)
						fireAngle = 0;
					else
						fireAngle = util.calcAngle(self.x, self.y, self.parent._p1.x, self.parent._p1.y);
				}

				var muzzles = fireInfo.muzzles || self._weapon.muzzles;
				for (var i=0; i<muzzles.length; i++) {
					var bullet = self.createBullet(muzzles[i], fireAngle);
					self.shoot(bullet);
				}
			}
		}
	},

	// 创建子弹
	createBullet : function(info, fireAngle) {
		var bulletType = BulletType[info.bullet];
		var bullet = null;
		if (cc.isString(bulletType.texture)) {
			bullet = new cc.Sprite(bulletType.texture);
		}
		else{
			var animation = res['_bulletAnimation_'+info.bullet];
			if (!animation) {
				animation = res['_bulletAnimation_'+info.bullet] = new cc.Animation(bulletType.texture, 0.1);
			}
			bullet = new cc.Sprite(bulletType.texture[0]);
			bullet.runAction(cc.repeatForever(cc.animate(animation)));
		}
		bullet.x = this.x + (info.posX || 0);
		bullet.y = this.y
		bullet._speed = info.speed;
		bullet._angle = info.angle + fireAngle;
		bullet._acceleration = info.acceleration;

		// 跟踪弹
		if (info.tracking)
			bullet._trackTarget = this.parent._p1;

		bullet.setRotation(-bullet._angle);

		// 计算实体半径，用于碰撞检测
		var entityRadius = bulletType.entityRadius;
		if (!entityRadius) {
			entityRadius = (bullet.width + bullet.height) / 2;
		}
		entityRadius = 1;
		bullet._entityRadius = entityRadius;
		return bullet;
	},

	hertBlink : function() {
	},

	// 显示血槽
	showHpSlot : function(inFront) {
		var self = this;
		if (!self._hpSlot) {
			var slot = self._hpSlot = new cc.DrawNode();
			slot.setLineWidth(0);
			slot.setDrawColor(cc.color(0,0,0,0));
			slot.drawRect(cc.p(0,0),cc.p(3,self.height), cc.color(128,128,128,128), 0);
			if (inFront)
				slot.x = self.width + 10;
			else
				slot.x = -10;
			self.addChild(slot);

			var curr = self._hpSlotCurr = new cc.DrawNode();
			curr.setLineWidth(0);
			curr.setDrawColor(cc.color(0,0,0,0));
			curr.x = slot.x;
			if (!inFront) {
				curr.y = self.height;
				curr.anchorY = 1;
			}
			self.addChild(curr);
		}

		var len = Math.max(0, self._hp / self._type.hp * self.height);
		var curr = self._hpSlotCurr;
		curr.clear();
		curr.drawRect(cc.p(0,0),cc.p(3, len), cc.color(200,0,0), 0);
		curr.setContentSize(3, len);
	},

	// 虚函数，发射子弹
	shoot : function(bullet) {
	},

	// 虚函数，路径走完事件
	onPathEnded : function() {
	},

});
