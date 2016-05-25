var React = require('react');
import {render} from 'react-dom';
var Grid = require('./grid');

var BattleshipApp = React.createClass({

	ORIENTATIONS: [ 'vertical', 'horizontal'],
	SHIP_LENGTHS: [5, 4, 4, 3, 2], // 5 ships with lengths 5, 4, 4, 3, 2


	getInitialState: function() {
    return {
			gameBoardA: [
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0]
									],
			gameBoardB: [
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0],
										[0,0,0,0,0,0,0,0,0,0]
									]
    }
  },

	newGame: function(){
		var newBoardA = this.placeShips(this.getInitialState().gameBoardA),
				newBoardB = this.placeShips(this.getInitialState().gameBoardB);
		this.setState({
			gameBoardA: newBoardA,
			gameBoardB: newBoardB
		});
	},

	getRandomInt: function(min, max) {
	  // will return a random integer between the min and max (inclusive)
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	placeShips: function(board){
		var shipLengths = this.SHIP_LENGTHS,
				self = this;

		shipLengths.forEach(function(length){
				var orientation = self.ORIENTATIONS[self.getRandomInt(0,1)],
						startRow,
						startIndex;
				if(orientation == 'vertical'){
					startRow = self.getRandomInt(0,9-length);
					startIndex = self.getRandomInt(0,9);
				}else if(orientation == 'horizontal'){
					startRow = self.getRandomInt(0,9);
					startIndex = self.getRandomInt(0,9-length);
				}
				board = self.placeShip(board, orientation, length, startRow, startIndex);
		});
		return board;
	},

	placeShip: function(board, orientation, length, startRow, startIndex){
		// recursively place each ship until all ships are placed and don't overlap
		var shipPlaced,
				self = this,
				newBoard;
		while(!shipPlaced){
			if(self.checkOverlap(board, orientation, length, startRow, startIndex) == false){
				shipPlaced = true;
				newBoard = self.buildShip(board, orientation, length, startRow, startIndex);
			}else{
				startIndex = self.getRandomInt(0,9);
				startRow = self.getRandomInt(0,9-length);
				self.placeShip(board, orientation, length, startRow, startIndex);
				newBoard = board;
			}
			return shipPlaced = newBoard;
		}
		return newBoard;
	},

	checkOverlap: function(board, orientation, length, startRow, startIndex){
		// make sure ships being placed on the board don't overlap
		var overlap = false;
		if(orientation == 'vertical'){
			for(var i = startRow; i < startRow + length; i++){
				if(board[i][startIndex] == 1){
					overlap = true;
				}
			}
		}else if(orientation == 'horizontal'){
			for(var i = startIndex; i < startIndex + length; i++){
				if(board[startRow][i] == 1){
					overlap = true;
				}
			}
		}
		return overlap;
	},

	buildShip: function(board, orientation, length, startRow, startIndex){
		if(orientation == 'vertical'){
			for(var i = startRow; i < startRow + length; i++){
				board[i][startIndex] = 1;
			}
		}else if(orientation == 'horizontal'){
			for(var i = startIndex; i < startIndex + length; i++){
				board[startRow][i] = 1;
			}
		}
		return board;
	},

	findSum: function(array){
		var sum = array.reduce(function(a, b) {
		  return a + b;
		});
		return sum
	},

	flattenArray: function(nestedArray){
		var newArray = nestedArray.reduce(function(a, b) {
		  return a.concat(b);
		}, []);
		return newArray;
	},

	determineWinner: function(){
		// TODO: refactor to know when each ship was sunk
		var total_possible = (2*this.findSum(this.SHIP_LENGTHS));
		var playerA = this.findSum(this.flattenArray(this.state.gameBoardA)),
				playerB = this.findSum(this.flattenArray(this.state.gameBoardB));
		if(playerA == total_possible){
			alert('Player A is the winner!');
		}else if(playerB == total_possible){
			alert('Player B is the winner!');
		}
	},

	handleSelect: function(square){
		var newState,
				gameBoard = square.props.gameBoard,
				status = gameBoard[square.props.row][square.props.index],
		 		newStatus = status;
    switch(status){
      case 0:
        newStatus += 3;
        console.log('Missed!');
        break;
      case 1:
        newStatus += 1;
        console.log('Boom! You hit a ship');
        break;
      case 2:
        console.log('You already shot here, silly');
        break;
      case 3:
        console.log('You already shot here, silly');
        break;
    }
    gameBoard[square.props.row][square.props.index] = newStatus;
    this.setState({
    	gameBoard: gameBoard
    });
    this.determineWinner();
	},

	render: function(){
		return(
			<div>
				<h3> Battleship! </h3>
				<button onClick={this.newGame} className='button-new-board'>New Game</button>
				<h4>Player A</h4>
				<Grid key='A'
							handleSelect={this.handleSelect}
							gameBoard={this.state.gameBoardA}/>
				<br/>
				<h4>Player B</h4>
				<Grid key='B'
							handleSelect={this.handleSelect}
							gameBoard={this.state.gameBoardB}/>
			</div>
		)
	}
});

render(<BattleshipApp/>, document.getElementById('app'));