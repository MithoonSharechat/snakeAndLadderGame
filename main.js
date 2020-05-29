let snakes = [
		[62, 5],
		[33, 6],
		[49, 9],
		[88, 16],
		[41, 20],
		[56, 53],
		[98, 64],
		[93, 73],
		[95, 75]
];
let ladders = [
	[2, 37],
	[27, 46],
	[10, 32],
	[51, 68],
	[61, 79],
	[65, 84],
	[71, 91],
	[81, 100]
];

let players = ['Gaurav', 'Sagar'];

let SnakeGameController = require('./controller/SnakeGameController');
let Helper = require('./Utility/Helper');
let helper = new Helper();
let snakeGameController = new SnakeGameController(helper);
snakeGameController.setUpGame(ladders, snakes, players, 100);
snakeGameController.startGame();