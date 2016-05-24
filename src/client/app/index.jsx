var React = require('react');
import {render} from 'react-dom';
var Grid = require('./grid');

var BattleshipApp = React.createClass({
	// KEY: { 0: openWater,
	// 			  1: ship,
	// 			  2: damagedShip,
	// 			  3: missedShot
	// 			}

	BOARD: [
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

	ORIENTATIONS: [ 'vertical', 'horizontal'],

	getInitialState: function() {
    return {
			gameBoardA: this.BOARD.slice(),
			gameBoardB: this.BOARD.slice()
    }
  },

	newGame: function(){
		var newBoardA = this.placeShips();
				// newBoardB = this.placeShips();
		this.setState({
			gameBoardA: newBoardA
		});
	},

	getRandomInt: function(min, max) {
	  // will return a random integer between the min and max (inclusive)
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	placeShips: function(){
		// 5 ships with lengths 5, 4, 4, 3, 2
		var shipLengths = [5, 4, 4, 3, 2],
				orientation,
				startRow,
				startIndex,
				self = this,
				board = this.BOARD.slice();
		shipLengths.forEach(function(length){
			console.log('PLACING SHIP LENGTH ' + length);
			// save a copy of the board in case we need to undo changes
			var originalBoard = board;
			// randomly choose vertical or horizontal orientation of ship
			orientation = self.ORIENTATIONS[self.getRandomInt(0,1)]
			if(orientation == 'vertical'){
				// ship must start in top section going down
				startIndex = self.getRandomInt(0,9);
				startRow = self.getRandomInt(0,9-length);
				for(var i = startRow; i < startRow + length; i++){
					if (board[i][startIndex] == 1){
						// ships can't intersect
						// start again with new starting point
						console.log('oops theres gonna be a problem');
						startRow = self.getRandomInt(0,9-length);
						// this should be recursive until ship is placed
					}else{
						// place ship piece
						console.log('placing vertical ship: ' + i + startIndex);
						board[i][startIndex] = 1;
					}
				}
			}else if(orientation == 'horizontal'){
				// ship must start in left section going right
				startRow = self.getRandomInt(0,9);
				startIndex = self.getRandomInt(0,9-length);
				for(var i = startIndex; i < startIndex + length; i++){
					if(board[startRow][i] == 1){
						// ships can't intersect
						// start again with new starting point
						console.log('oops theres gonna be a problem');
						startIndex = self.getRandomInt(0,9-length);
						// this should be recursive until ship is placed
					}else{
						// place ship
						console.log('placing horizontal ship: ' + startRow + i);
						board[startRow][i] = 1;
					}
				}
			}
		});
		console.log('board ' + board);	
		return board;
	},


	handleSelect: function(){

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