var EnemyGenerator = cc.Class.extend({
	_container : null,
	_plotIndex : 0,
	_plotTime : 0,
	_plotBoss : null,
	_createTeamDelay : 0,
	_creatingTeam : null,
	_teamList : [
		{type: 0, weight: 1000},
		{type: 1, weight: 1000},
		{type: 2, weight: 1000},
		{type: 3, weight: 1000},
		{type: 4, weight: 1000},
		{type: 5, weight: 1000},
		{type: 6, weight: 1000},
		{type: 7, weight: 1000},
		],
	_teamListSumWeight: 0,

    ctor : function(container) {
		this._container = container;
	},

	update: function(dt) {
		this.createTeamCheck(dt);
		this.checkPlot(dt);
	},

	// 根据地图创建敌机
	checkPlot :function(dt) {
		var self = this;
		if (self._plotBoss && self._plotBoss._destroied) {
			self._plotBoss = null;
			if (self._plotIndex >= plots.length) {
				self._container.gameWin();
				return;
			}
		}
		if (self._plotBoss || self._plotIndex >= plots.length)
			return;

		self._plotTime += dt * 1000;
		var plotInfo = plots[self._plotIndex];
		if (self._plotTime < plotInfo.delay)
			return;

		self._plotTime = 0;
		self._plotIndex ++;

		var enemy = self._plotBoss = new Enemy(plotInfo);
		enemy.y = cc.visibleRect.top.y + enemy.width/2;
		enemy._isBoss = true;
		self._container.addEnemy(enemy);
	},

	// 创建敌机编队检查
	createTeamCheck : function(dt) {
		var self = this;
		if ((self._createTeamDelay -= dt) > 0)
			return;

		if (self._creatingTeam) {
			self.createTeam(self._creatingTeam);
			self._creatingTeam = null;
			return;
		}

		if (!self._teamListSumWeight) {
			for (var i=0; i<self._teamList.length; i++)
				self._teamListSumWeight += self._teamList[i].weight;
		}
		var r = util.randRangeInt(0, self._teamListSumWeight-1);
		for (var i=0; i<self._teamList.length; i++) {
			var info = self._teamList[i]; 
			if ((r -= info.weight) < 0) {
				var teamType = AircraftTeamType[info.type];
				self._creatingTeam = teamType;
				self._createTeamDelay = (teamType.startDelay || 0)/1000;
				break;
			}
		}
	},

	createTeam: function(teamType) {
		var enemies = [];
		var leftBound = 0, rightBound = 0, topBound = 0, bottomBound = 0;
		for (var i=0; i<teamType.memberList.length; i++) {
			var info = util.copyTo(util.clone(teamType.memberList[i]), teamType.memberTempl);
			var enemy = new Enemy(info);
			leftBound   = Math.min(leftBound  , enemy.x - enemy.height/2);
			rightBound  = Math.max(rightBound , enemy.x + enemy.height/2);
			topBound    = Math.max(topBound   , enemy.y + enemy.width/2);
			bottomBound = Math.min(bottomBound, enemy.y - enemy.width/2);
			enemies.push(enemy);
		}

		var offsetY = cc.visibleRect.top.y - bottomBound;
		var offsetX = teamType.posX;
		if (offsetX == 'rand')
			offsetX = cc.visibleRect.left.x - leftBound + util.randRangeInt(0, cc.visibleRect.width - (rightBound-leftBound));

		for (var i=0; i<enemies.length; i++) {
			enemies[i].x += offsetX;
			enemies[i].y += offsetY;
			this._container.addEnemy(enemies[i]);
		}

		this._createTeamDelay = teamType.peroid/1000;
		if (this._plotBoss)
			this._createTeamDelay *= 3;
	},

	// 出怪检查
	checkCreateEnemy : function(dt) {
		var self = this;
		self._plotTime += dt * 1000;

		while (self._plotIndex < plots.length) {
			var enemyInfo = plots[self._plotIndex];
			if (self._plotTime < enemyInfo.delay)
				break;

			self._plotTime = 0;
			self._plotIndex ++;

			var enemy = new Enemy(enemyInfo);
			self._enemies.push(enemy);
			self.addChild(enemy, 2);
		}
	},
});
