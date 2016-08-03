var AircraftTeamType = {

	// 三个普通小飞机，“一”字形
	0: {
		posX: 'rand',
		peroid: 1000,
		memberTempl: {speed:100,path:0},
		memberList: [
			{type:10, posX: 0},
			{type:10, posX: 90},
			{type:10, posX: 180}
			],
	},

	// 五个普通小飞机，“一”字形
	1: {
		posX: 'rand',
		peroid: 1000,
		memberTempl: {speed:100,path:0},
		memberList: [
			{type:10, posX: 0},
			{type:10, posX: 90},
			{type:10, posX: 180},
			{type:10, posX: 270},
			{type:10, posX: 360}
			],
	},

	// 三个飞机，“人”字形
	2: {
		posX: 'rand',
		peroid: 1000,
		memberTempl: {speed:100,path:0},
		memberList: [
			{type:20, posX: 0},
			{type:10, posX: -60, posY: 40},
			{type:10, posX: 60, posY: 40},
			],
	},

	// 五个飞机，“人”字形
	3: {
		posX: 'rand',
		peroid: 1500,
		memberTempl: {speed:100,path:0},
		memberList: [
			{type:21, posX: 0},
			{type:10, posX: -60, posY: 40},
			{type:10, posX: 60, posY: 40},
			{type:10, posX: -120, posY: 80},
			{type:10, posX: 120, posY: 80},
			],
	},

	// 五个飞机，“雁”形
	4: {
		posX: 'rand',
		peroid: 1500,
		memberTempl: {speed:100,path:0},
		memberList: [
			{type:30, posX: 0},
			{type:10, posX: -60, posY: -40},
			{type:10, posX: 60, posY: -40},
			{type:10, posX: -120, posY: -80},
			{type:10, posX: 120, posY: -80},
			],
	},

	// 六个飞机，“3x2”形
	5: {
		posX: 320,
		peroid: 1000,
		memberTempl: {speed:100, path:0, weapon: 13, fireDelay: 1000},
		memberList:  [
			{type:10, posX: 0},
			{type:10, posX:  150},
			{type:10, posX: -150},
			{type:10, posX: 0, posY: -60},
			{type:10, posX:  150, posY: -60},
			{type:10, posX: -150, posY: -60},
			],
	},

	// 5个飞机，从右侧曲线飞出，并发射跟踪火箭弹
	6: {
		posX: 640,
		startDelay: 1000,
		peroid: 1000,
		memberTempl: {speed:400, path:1, weapon: 31},
		memberList: [
			{type:20, fireDelay: 1200, pathDelay: 0},
			{type:20, fireDelay: 1200, pathDelay: 200},
			{type:20, fireDelay: 1200, pathDelay: 400},
			{type:20, fireDelay: 1200, pathDelay: 600},
			{type:20, fireDelay: 1200, pathDelay: 800},
			],
	},

	// 5个飞机，从左侧曲线飞出，并发射跟踪火箭弹，再飞回
	7: {
		posX: 70,
		startDelay: 1000,
		peroid: 2000,
		memberTempl: {speed:400, hp:10, path:2, weapon: 31},
		memberList: [
			{type:20, posX:   0, fireDelay: 800},
			{type:20, posX: 100, fireDelay: 800},
			{type:20, posX: 200, fireDelay: 800},
			{type:20, posX: 300, fireDelay: 800},
			],
	},

};
