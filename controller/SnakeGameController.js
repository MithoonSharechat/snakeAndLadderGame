let Board = require('../models/Board');
let Player = require('../models/Player');
let Cell = require('../models/Cell');
let Snake = require('../models/Snake');
let Ladder = require('../models/Ladder');

class SnakeGameController {

	constructor(helper) {
		this.helper = helper;
	}

	setUpGame(ladders, snakes, players, totalNumberOfCells) {
		let cells=[];
		for (let index =0; index<totalNumberOfCells+1; index++) {
			let cell = new Cell(index);
			cells.push(cell);
		}
		let playersList=[];
		for (let index =0; index<players.length; index++) {
			let player = new Player(players[index], 0);
			playersList.push(player);
		}
		for (let index =0; index<snakes.length; index++) {
			let snake = new Snake(snakes[index][1]);
			cells[snakes[index][0]].snake = snake;
		}
		for (let index =0; index<ladders.length; index++) {
			let ladder = new Ladder(ladders[index][1]);
			cells[ladders[index][0]].ladder = ladder;
		}
		this.board = new Board(cells, playersList);
		return;
	}

	startGame() {
		while(true) {
			let numPlayers = this.board.players.length;
			let gameOver = false;
			for (let index = 0; index<numPlayers; index++) {
				let player = this.board.players[index];
				let dieValue = this.helper.getRandomNumber();
				player = this.updateFinalPos(player, dieValue);
				if (player.pos == this.board.cells.length -1) {
					console.log("Player " + player.name + " won the game");
					gameOver = true;
					break;
				}
				this.board.players[index] = player;
			}
			if (gameOver) {
				break;
			}
		}
	}

	updateFinalPos(player, dieValue) {
		console.log("Player "+ player.name + " got a value of " + dieValue + " on the die");
		let newPosOfPlayer = player.pos + dieValue;
		if (newPosOfPlayer > this.board.cells.length -1) {
			return player;
		}
		if (this.board.cells[newPosOfPlayer].snake) {
			console.log("player " + player.name + " is bitten by snake");
			newPosOfPlayer = this.board.cells[newPosOfPlayer].snake.tailPos;
		}
		if (this.board.cells[newPosOfPlayer].ladder) {
			console.log("player " + player.name + " has used the ladder");
			newPosOfPlayer = this.board.cells[newPosOfPlayer].ladder.finalPos;
		}
		player.pos = newPosOfPlayer;
		return player;
	}



}

module.exports = SnakeGameController;
