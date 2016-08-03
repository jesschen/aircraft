var WeaponType = {
	P1_old: {
		muzzles: [			// 同时发射的子弹列表
				{bullet: 'P1', speed:400, angle: -5},
				{bullet: 'P1', speed:400, angle: 0},
				{bullet: 'P1', speed:400, angle: 5}
			],
		fireRegular: [		// 发射周期
			{delay:200, angle:90,},
		],
	},
	P2: {
		muzzles: [
				{bullet: 'P2', speed:400, angle: 0},
			],
		fireRegular: [
			{delay:400, angle:90,},
		],
	},
	P1: {
		fireRegular: [
			{delay:300, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: -5},
				{bullet: 'P1', speed:800, angle: 0},
				{bullet: 'P1', speed:800, angle: 5}]
			},
		],
	},
	skill: {
		fireRegular: [
			{delay:300, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
			{delay:100, angle:90,muzzles: [
				{bullet: 'P1', speed:800, angle: 0, posX: 0},
				{bullet: 'P1', speed:800, angle: 0, posX: -60},
				{bullet: 'P1', speed:800, angle: 0, posX: 60},
				{bullet: 'P2', speed:800, angle: 0, posX: -40},
				{bullet: 'P2', speed:800, angle: 0, posX: -20},
				{bullet: 'P2', speed:800, angle: 0, posX: 20},
				{bullet: 'P2', speed:800, angle: 0, posX: 40},
			]},
		],
	},
	P2: {
		muzzles: [
				{bullet: 'P2', speed:400, angle: 0},
			],
		fireRegular: [
			{delay:400, angle:90,},
		],
	},

	// 一发子弹，直线向前
	11: {
		muzzles: [
				{bullet: 0, speed:200, angle: 0}
			],
		fireRegular: [
			{delay:3000, angle:-90,},
		],
	},

	// 两发子弹，向前
	12: {
		muzzles: [
				{bullet: 0, speed:200, angle: -7},
				{bullet: 0, speed:200, angle: 0},
				{bullet: 0, speed:200, angle: 7},
			],
		fireRegular: [
			{delay:3000, angle:-90,},
		],
	},

	// 只发一发子弹
	13: {
		muzzles: [
				{bullet: 0, speed:200, angle: 0}
			],
		fireRegular: [
			{delay:100000, angle:-90,},
		],
	},

	// 一发子弹，瞄准主机
	21: {
		muzzles: [
				{bullet: 0, speed:200, angle: 0}
			],
		fireRegular: [
			{delay:2000, angle:'p1',},
			{delay:400, angle:'p1',},
		],
	},

	// 一发跟踪导弹
	31: {
		muzzles: [
				{bullet: 'missile', speed:200, acceleration:200, tracking:true, angle: 0}
			],
		fireRegular: [
			{delay:100000, angle:-90},
		],
	},

	// 小BOSS武器
	SmallBoss: {
		fireRegular: [
			{delay:2000, angle:-85, muzzles:[
					{bullet: 2, speed:200, angle: -30},
					{bullet: 2, speed:200, angle: -20},
					{bullet: 2, speed:200, angle: -10},
					{bullet: 2, speed:200, angle: 0},
					{bullet: 2, speed:200, angle: 10},
					{bullet: 2, speed:200, angle: 20},
					{bullet: 2, speed:200, angle: 30}
				]},
			{delay:2000, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:500, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:500, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:500, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:500, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
		],
	},

	Boss: {
		fireRegular: [
			{delay:1000, angle:-90, muzzles: [
				{bullet: 2, speed:100, angle: -30},
				{bullet: 2, speed:100, angle: -20},
				{bullet: 2, speed:100, angle: -10},
				{bullet: 2, speed:100, angle: 0},
				{bullet: 2, speed:100, angle: 10},
				{bullet: 2, speed:100, angle: 20},
				{bullet: 2, speed:100, angle: 30}],
			},
			{delay:300, angle:-90, muzzles: [
				{bullet: 2, speed:100, angle: -30},
				{bullet: 2, speed:100, angle: -20},
				{bullet: 2, speed:100, angle: -10},
				{bullet: 2, speed:100, angle: 0},
				{bullet: 2, speed:100, angle: 10},
				{bullet: 2, speed:100, angle: 20},
				{bullet: 2, speed:100, angle: 30}],
			},
			{delay:200, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:200, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:200, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},
			{delay:200, angle:'p1', muzzles:[{bullet:3, speed:250, angle:0}]},

			{delay:500, angle:'p1', muzzles:[{bullet: 'missile', speed:200, acceleration:200, tracking:true, angle: 0}]},
			{delay:500, angle:'p1', muzzles:[{bullet: 'missile', speed:200, acceleration:200, tracking:true, angle: 0}]},
			{delay:500, angle:'p1', muzzles:[{bullet: 'missile', speed:200, acceleration:200, tracking:true, angle: 0}]},

			{delay:100, angle:-90, muzzles: [
				{bullet: 2, speed:100, angle: -30},
				{bullet: 2, speed:100, angle: -20},
				{bullet: 2, speed:100, angle: -10},
				{bullet: 2, speed:100, angle: 0},
				{bullet: 2, speed:100, angle: 10},
				{bullet: 2, speed:100, angle: 20},
				{bullet: 2, speed:100, angle: 30}],
			},
			{delay:300, angle:-90, muzzles: [
				{bullet: 2, speed:100, angle: -30},
				{bullet: 2, speed:100, angle: -20},
				{bullet: 2, speed:100, angle: -10},
				{bullet: 2, speed:100, angle: 0},
				{bullet: 2, speed:100, angle: 10},
				{bullet: 2, speed:100, angle: 20},
				{bullet: 2, speed:100, angle: 30}],
			},

			{delay:800, angle:-80, muzzles:[{bullet:3, speed:500, angle:0}]},
			{delay:800, angle:-90, muzzles:[{bullet:3, speed:500, angle:0}]},
			{delay:800, angle:-100, muzzles:[{bullet:3, speed:500, angle:0}]},
			{delay:800, angle:-110, muzzles:[{bullet:3, speed:500, angle:0}]},
		],
	},
};
