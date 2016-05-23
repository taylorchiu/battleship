var React = require('react');
import {render} from 'react-dom';
var Grid = require('./grid');

var BattleshipApp = React.createClass({
	getNewBoard: function(){
		alert('Are you sure?');
	},

	render: function(){
		return(
			<div>
				<h3> Battleship! </h3>
				<button onClick={this.getNewBoard} className='button-new-board'>New Game</button>
				<Grid />
			</div>
		)
	}
});

render(<BattleshipApp/>, document.getElementById('app'));