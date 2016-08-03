var AircraftType = {
	P1: {
		texture: res.p1,
		hp: 10,
		weapon: 'P1',
		fireDelay: 0,
	},
	P2: {
		texture: res.p2,
		hp: 10,
		weapon: 'P2',
		fireDelay: 0,
	},
	SmallBoss: {
		texture: res.enemy4,
		hp: 100,
		score: 1000,
		speed: 500,
		path:'BossAppear',
		repeatPath : 'Boss',
		repeatSpead: 200,
		weapon: 'SmallBoss',	
		fireDelay: 1000,
	},
	BOSS: {
		texture: res.boss,		// 图片资源
		hp: 200,				// 血量
		score: 2000,
		speed: 1000,			// 移动速度 
		path:'BossAppear',
		repeatPath : 'Boss',
		repeatSpead: 200,
		weapon: 'Boss',	
		fireDelay: 1000,
	},

	// 普通小飞机，不开火
	10: {
		texture: res.enemy1,
		hp: 3,
		score: 30,
	},

	// 小飞机，小量向前开火
	20: {
		texture: res.enemy2,
		hp: 4,
		score: 50,
		weapon: 11,				// 一发子弹，直线向前
		fireDelay: 1000,
	},
	21: {
		texture: res.enemy2,
		hp: 6,				
		score: 100,			
		weapon: 12,				// 两发子弹，向前
		fireDelay: 1000,	
	},

	// 小飞机，瞄准主机小量开火
	30: {
		texture: res.enemy3,
		hp: 7,				
		score: 200,			
		weapon: 21,				// 瞄准主机，间歇开火
		fireDelay: 1000,	
	},
};
