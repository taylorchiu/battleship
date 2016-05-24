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
		alert('Are you sure?');
		this.setState({
			gameBoardA: this.placeShips(this.BOARD.slice()),
			gameBoardB: this.placeShips(this.BOARD.slice())
		});
	},

	getRandomInt: function(min, max) {
	  // will return a random integer between the min and max (inclusive)
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	placeShips: function(board){
		console.log('PLACING BOARD ' + board);
		// 5 ships with lengths 5, 4, 4, 3, 2
		var shipLengths = [5, 4, 4, 3, 2],
				orientation,
				startRow,
				startIndex,
				self = this;
		shipLengths.forEach(function(length){
					console.log('PLACING SHIP LENGTH ' + length);
			// randomly choose vertical or horizontal orientation of ship
				orientation = self.ORIENTATIONS[self.getRandomInt(0,1)]
			if(orientation == 'vertical'){
				// ship must start in top section going down
				startRow = self.getRandomInt(0,9-length);
				startIndex = self.getRandomInt(0,9);
				for(var i = startRow; i < startRow + length; i++){
					console.log('i:' + i);
					console.log('startIndex:' + startIndex);
					console.log('startRow:' + startRow);
					if (board[i][startIndex] == 1){
						// ships can't intersect, find new starting point
						console.log('oops theres gonna be a problem');
					}else{
						// place ship
						board[i][startIndex] = 1;
					}
				}
			}else if(orientation == 'horizontal'){
				// ship must start in left section going right
				startRow = self.getRandomInt(0,9);
				startIndex = self.getRandomInt(0,9-length);
				for(var i = startRow; i < startRow + length; i++){
					console.log('i:' + i);
					console.log('startIndex:' + startIndex);
					console.log('startRow:' + startRow);
					if(board[startRow][i] == 1){
						// ships can't intersect, find new starting point
						console.log('oops theres gonna be a problem');
					}else{
						// place ship
						board[startRow][i] = 1;
					}
				}
			}
		})	
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