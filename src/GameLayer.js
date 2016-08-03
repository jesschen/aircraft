var GameLayer = cc.Layer.extend({
	_ground		: null,
	_scoreBoard	: null,
	_p1			: null,
	_p2			: null,
	_bullets	: null,
	_bombs		: null,
	_enemies	: null,
	_lastTouchPos : null,
	_enemyGenerator : null,
	_touchListener : null,
	_gameEnd	: false,
	_skillCasting : false,
	_skillMenu	: null,
	_startTime	: 0,

    ctor : function() {
		var self = this;
        self._super();

		// 地面
        self.addChild(self._ground = new Ground());

		// 底部文字
		self.createBottomText();

		// 得分面板
		var scoreBoard = self._scoreBoard = new ScoreBoard();
		scoreBoard.x = cc.visibleRect.topRight.x - 260;
		scoreBoard.y = cc.visibleRect.top.y - 40;
        self.addChild(scoreBoard, 20);

		// 飞机
		self.createRoles();
		self.updateHpSlot();

		// 基友合体技按钮
		var btn = new cc.MenuItemImage(res.skillBtn, res.skillBtn, self.castSkill, self);
        btn.attr({
			x : cc.visibleRect.topRight.x -  15 * cc.scaleX,
			y : cc.visibleRect.topRight.y -  600 * cc.scaleY,
			anchorX : 1,
			anchorY : 0,
        });

        var menu = self._skillMenu = new cc.Menu(btn);
		menu.y = 0;
		menu.x = 140;
		menu.opacity = 0;
        self.addChild(menu, 10);
		menu.runAction(cc.sequence(cc.delayTime(3)
			, cc.spawn(cc.moveTo(0.2, 0, 0), cc.fadeIn(0.5))
		));
    },

	// 创建底标语
	createBottomText : function() {
		var self = this;

		var text = new cc.LabelTTF("那年与小伙伴一起  战胜敌机获取宝藏", "微软雅黑", 28);
		text.color = cc.color(0,0,0);
		text.x = cc.visibleRect.bottom.x,
		text.y = cc.visibleRect.bottom.y + 90 * cc.scaleY,
		text.anchorY = 0,
        self.addChild(text);

		// 延迟消失
		text.runAction(cc.sequence(cc.delayTime(2)
			, cc.spawn(cc.moveBy(1, 0, -90), cc.fadeOut(1))
			, cc.callFunc(function(){text.removeFromParent(true);})
		));
	},

	// 创建飞机
	createRoles : function() {
		var self = this;

		var p1 = self._p1 = new Hero({type:'P1'});
		p1.rotation = -90;
		p1.x = cc.visibleRect.bottom.x - 80;
		p1.y = cc.visibleRect.bottom.y - p1.height/2;
		p1.retain();
        self.addChild(p1, 3);

		var p2 = self._p2 = new Hero({type:'P2'});
		p2.x = p1.x + 100;
		p2.y = p1.y;
		p2.rotation = -90;
		p2.retain();
        self.addChild(p2, 3);

		// 延迟出现
		p1.runAction(cc.sequence(cc.delayTime(1.0), 
			cc.moveBy(0.3, 0, 250).easing(cc.easeOut(3))
		));

		p2.runAction(cc.sequence(cc.delayTime(1.2), 
			cc.moveBy(0.3, 0, 250).easing(cc.easeOut(3))
			, cc.delayTime(0.5)
			, cc.callFunc(self.start, self)
		));
	},

	// 显示血槽
	updateHpSlot : function(inFront) {
		var self = this, slotLength = 140;
		if (!self._hpSlot11) {

			var slot = self._hpSlot11 = new cc.Sprite(res.hp_slot);
			slot.anchorX = 0;
			slot.anchorY = 1;
			slot.x = cc.visibleRect.topLeft.x + 40;
			slot.y = self._scoreBoard.y + slot.height/2;
			self.addChild(slot, 20);

			var curr = self._hpSlotCurr11 = new cc.DrawNode();
			curr.setLineWidth(0);
			curr.setDrawColor(cc.color(0,0,0,0));
			curr.x = slot.x + 39;
			curr.y = slot.y - 23;
			self.addChild(curr, 19);
		}

		var len = Math.max(0, self._p1._hp / self._p1._type.hp * slotLength);
		var curr = self._hpSlotCurr11;
		curr.clear();
		curr.drawRect(cc.p(0,0),cc.p(len, 22), cc.color(255,44,44), 0);
	},

	// 开始游戏
	start : function() {
		var self = this;
		self.scheduleUpdate();
		self._bullets = [];
		self._bombs = [];
		self._enemies = [];
		self._enemyGenerator = new EnemyGenerator(self);
		self._startTime = Date.now() / 1000;

		// touch事件
		self._touchListener = cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
                onTouchBegan: self.onTouchBegan,
				onTouchMoved: self.onTouchMoved,
                onTouchEnded: self.onTouchEnded,
			}, this);


		// 准备出怪
		self._plotIndex	= 0;
		self._plotTime = 0;
	},

	// 停止
	stop : function() {
		cc.eventManager.removeListener(this._touchListener);
		this._touchListener = null;
		this._enemyGenerator = null;
		this._gameEnd = true;
	},

	// 结束游戏
	gameOver : function() {
		var self = this;
		self.stop();
		self._p1.stop();
		self._p2.stop();
		self.runAction(cc.sequence(
			cc.delayTime(0.2), cc.callFunc(function (){

				// 爆炸主机和僚机
				explosion.play(self, self._p1.x, self._p1.y, 1);
				explosion.play(self, self._p2.x, self._p2.y, 1);
				self.removeChild(self._p1);
				self.removeChild(self._p2);
				//self._p1 = null;
				//self._p2 = null;
			})
			, cc.delayTime(1.6), cc.callFunc(function(){
				self._p1.release();
				self._p2.release();
				app.goResult(self._scoreBoard._score, false);
			})
		));
	},

	// 胜利
	gameWin : function() {
		var self = this;
		self.stop();
		self._p1.stop();
		self._p2.stop();
		self.runAction(cc.sequence(
			cc.delayTime(0.7), cc.callFunc(function (){

				// 爆炸所有敌机
				for(var i=self._enemies.length-1; i>=0; i--)
					self.killEnemy(self._enemies[i]);

				// 爆炸所有子弹
				for(var i=self._bombs.length-1; i>=0; i--) {
					var bomb = self._bombs[i];
					explosion.playHitted(self, bomb.x, bomb.y);
					self.removeChild(bomb);
				}
				self._bombs = [];

				// 将玩家剩余的HP加入分中
				self._scoreBoard.addScore(self._p1._hp * self._p1._hp * 10);
			})
			, cc.delayTime(0.5), cc.callFunc(function(){
				self._p1.release();
				self._p2.release();
				app.goResult(self._scoreBoard._score, true);
			})
		));
	},

	// touch事件
	onTouchBegan : function(touch, event) {
		var self = event.getCurrentTarget();
		self._lastTouchPos = touch.getLocation();
		return true;
	},
	onTouchEnded: function (touch, event) {
		var self = event.getCurrentTarget();
		self._lastTouchPos = null;
	},
	onTouchMoved: function (touch, event) {
		var self = event.getCurrentTarget();
		var curr = touch.getLocation();
		var prev = self._lastTouchPos;
		self._lastTouchPos = curr;
		if (prev) {
			var p1 = self._p1;
			var x = p1.x + curr.x - prev.x;
			var y = p1.y + curr.y - prev.y;
			p1.x = Math.max(cc.visibleRect.left.x, Math.min(cc.visibleRect.right.x, x));
			p1.y = Math.max(cc.visibleRect.bottom.y, Math.min(cc.visibleRect.top.y, y));
		}
	},

	// 使用技能
	castSkill : function() {
		var self = this;
		self._skillCasting = defs.SKILL_PERIOD;

		// 技能按钮飞出
		self._skillMenu.runAction(cc.sequence(
			cc.moveBy(0.2, 140, 0), cc.callFunc(function(){
				self.removeChild(self._skillMenu);
				self._skillMenu = null;
			})
		));


		// 僚机飞到主机上方
		var p1 = self._p1, p2 = self._p2;
		p2.runAction(cc.sequence(cc.moveTo(0.2, p1.x, p1.y)
			, cc.callFunc(playJujiao)
		));

		// 播放聚焦动画
		function playJujiao() {
			if (!res.animationJujiao) {
				var frames = [];
				for (var i=0; i<=4; i++)
					frames.push(cc.spriteFrameCache.getSpriteFrame('jujiao' + i + '.png'));
				res.animationJujiao = new cc.Animation(frames, 0.1);
				res.animationJujiao.retain();
			}
		
			var sprite = new cc.Sprite('#jujiao0.png');
			sprite.x = p2.x;
			sprite.y = p2.y;
			self.addChild(sprite, 20);

			sprite.runAction(cc.sequence(cc.animate(res.animationJujiao), cc.callFunc(function(){
				self.removeChild(sprite);
				appearShield();
			})));
		};

		// 主机出现护盾
		function appearShield() {
			var shield = p1._shield = new cc.Sprite(res.shield);
			shield.x = p1.width/2;
			shield.y = p1.height/2;
			shield.opacity = 0;
			p1.addChild(shield);
			shield.runAction(cc.repeatForever(cc.sequence(
				   cc.spawn(cc.scaleTo(1, 0.9), cc.fadeTo(1,255))
				 , cc.spawn(cc.scaleTo(1, 1), cc.fadeTo(1,160))
			)));

			// 僚机放大消失
			p2.runAction(cc.sequence(
				  cc.spawn(cc.scaleTo(1, 2), cc.fadeOut(1))
				, cc.callFunc(function(){p2.removeFromParent(true);})
			));

			// 碰撞半径加大
			p1._entityRadius = shield.width/2;

			// 更换子弹
			p1._weapon = WeaponType.skill;
		};
	},

	// 停止技能
	stopSkill : function() {
		var self = this;
		self._skillCasting = 0;

		// 恢复碰撞半径
		var p1 = self._p1, p2 = self._p2;
		p1.resetEntityRadius();
		
		// 更换子弹
		p1._weapon = WeaponType.P1;

		// 僚机出现
        self.addChild(p2, 3);
		p2.scale = 1;
		p2.runAction(cc.fadeIn(1));
		p2.scheduleUpdate();

		// 护盾消失
		var shield = p1._shield;
		p1._shield = null;
		shield.runAction(cc.sequence(
			  cc.fadeOut(1)
			, cc.callFunc(function(){shield.removeFromParent(true);})
		));
	},

	// 更新
	update : function(dt) {
		var self = this;
        self._super(dt);

		// P2跟随P1
		if (!self._gameEnd) {
			if (!self._skillCasting) {
				var angle = (Date.now()/1000 - self._startTime) / 1 * Math.PI + Math.PI/2;
				var p2x = self._p1.x + 100 * Math.sin(angle);
				var p2y = self._p1.y + 100 * Math.cos(angle);
				self._p2.x += (p2x - self._p2.x) /1;
				self._p2.y += (p2y - self._p2.y) /1;
			}
			else {
				self._skillCasting -= dt;
				if (self._skillCasting <= 0)
					self.stopSkill();
			}
		}

		self.updateBulletPosition(dt);
		self.updateBombPosition(dt);
		if (self._enemyGenerator) {
			self._ground.move(0.5);
			self._enemyGenerator.update(dt);
			self.checkEnemyCollision();
		}
	},

	// 创建子弹
	createBullet : function(isP1) {
		var self = this;
		var b = new cc.Sprite(isP1 ? res.bullet1 : res.bullet2);
		var aircraft = isP1 ? self._p1 : self._p2;
		b.x = aircraft.x;
		b.y = aircraft.y + aircraft.height/2 - b.height/2;
        self.addChild(b, 1);
		self._bullets.push(b);
	},

	// 添加我方子弹
	addBullet : function(bullet) {
		if (this._bullets) {
			this._bullets.push(bullet);
			this.addChild(bullet, 1);
		}
	},

	// 更新子弹位置，并判断碰撞
	updateBulletPosition : function(dt) {
		var self = this;
		self.updateBulletPositionAndCheckCollision(dt, self._bullets, self._enemies, function(bullet, enemy){
			explosion.playHitted(self, bullet.x, bullet.y);
			
			enemy._hp -= 1;
			if (enemy._hp) {
				enemy.showHpSlot(true);
				enemy.hertBlink();
			} else {
				self.killEnemy(enemy);
			}
		});
	},

	// 更新敌方子弹位置，并判断碰撞
	updateBombPosition : function(dt) {
		var self = this;
		var heros = self._gameEnd ? [] : [self._p1];
		var gameOver = false;
		self.updateBulletPositionAndCheckCollision(dt, self._bombs, heros, function(bomb, hero){
			if (!self._gameEnd) {
				explosion.playHitted(self, bomb.x, bomb.y);

				if (!self._skillCasting) {
					hero._hp -= 1;
					hero.hertBlink();
					self.updateHpSlot();
					if (hero._hp <= 0)
						gameOver = true;
				}
			}
		});
		if (gameOver)
			self.gameOver();
	},

	// 敌机与主机碰撞检测
	checkEnemyCollision : function() {
		var self = this;
		var gameOver = false;
		self.checkBulletCollision(self._p1, self._enemies, function(hero,enemy){
			if (!self._gameEnd && !enemy._isBoss) {
				self.killEnemy(enemy);

				if (!self._skillCasting) {
					hero._hp -= 2;
					hero.hertBlink();
					self.updateHpSlot();
					if (hero._hp <= 0)
						gameOver = true;
				}
			}
		});
		if (gameOver)
			self.gameOver();
	},

	// 添加怪物
	addEnemy : function(enemy) {
		this._enemies.push(enemy);
		this.addChild(enemy, 2);
	},

	// 消灭敌机
	killEnemy :  function(enemy) {
		explosion.play(this, enemy.x, enemy.y, enemy._isBoss ? 3 : 1);
		this.removeEnemy(enemy);
		this._scoreBoard.addScore(enemy._score);
	},

	// 删除怪物
	removeEnemy : function(enemy, index) {
		if (index === undefined)
			cc.arrayRemoveObject(this._enemies, enemy);
		else
			this._enemies.splice(index,1);
		this.removeChild(enemy);
		enemy._destroied = true;
//		cc.log("Enemy number:" + this._enemies.length);
	},

	// 新建敌方子弹
	addBomb : function(bomb) {
		this._bombs.push(bomb);
		this.addChild(bomb, 1);
	},

	// 更新子弹位置，并检查碰撞
	updateBulletPositionAndCheckCollision : function(dt, bulletArray, aircraftArray, collisionCallback) {

		// 遍历子弹，移动、出界判断、敌机碰撞判断
		var layerRect = cc.rect(cc.visibleRect.left.x, cc.visibleRect.bottom.y, cc.visibleRect.width, cc.visibleRect.height);
		for (var i=bulletArray.length-1; i>=0; i--) {
			var b = bulletArray[i];

			// 更新跟踪弹的角度
			if (b._trackTarget && cc.sys.isObjectValid(b._trackTarget)) {
				var targetAngle = util.calcAngle(b.x, b.y, b._trackTarget.x, b._trackTarget.y);
				var delta = targetAngle - b._angle;
				while (delta >= 180) delta -= 360;
				while (delta < -180) delta += 360;
				if (delta > 2)
					delta = 2;
				else if (delta < -2)
					delta = -2;
				b._angle += delta;
				b.rotation = -b._angle;
			}

			// 更新移动速度
			if (b._acceleration)
				b._speed += b._acceleration * dt;

			// 移动位置
			var distance = b._speed * dt;
			var r = b._angle * 2*Math.PI/360;
			var dx = distance * Math.cos(r);
			var dy = distance * Math.sin(r);
			b.x += dx;
			b.y += dy;

			// 是否出界
			var bulletEnded = false;
			if (!cc.rectOverlapsRect(layerRect, b.getBoundingBox()))
				bulletEnded = true;

			// 碰撞检查
			if (!bulletEnded && this.checkBulletCollision(b, aircraftArray, collisionCallback))
				bulletEnded = true;

			// 删除消亡的子弹
			if (bulletEnded) {
				this.removeChild(b);
				bulletArray.splice(i,1);
			}
		}
	},

	// 子弹碰撞检查
	checkBulletCollision : function(bullet, aircraftArray, collisionCallback) {

		var bulletPosition = bullet.getPosition();
		for (var i=aircraftArray.length-1; i>=0; i--) {
			var aircraft = aircraftArray[i];
			var distance = cc.pDistance(bulletPosition, aircraft.getPosition());
			if (distance <= aircraft._entityRadius + bullet._entityRadius) {
				collisionCallback(bullet, aircraft);
				return true;
			}
		}
		return false;
	},
	
});
