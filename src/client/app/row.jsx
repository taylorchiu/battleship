var React = require('react');
var Square = require('./square');

var Row = React.createClass({
	renderSquares: function(){
		var squares = [],
				gridSize = this.props.gridSize;
		// create the header column
		squares.push(<Square key={0}
												 id='square-header'
												 value={this.props.rowName}/>);
		for(var i = 1; i <= gridSize; i++){
			var value = this.props.headerRow ? i : '';
			squares.push(<Square key={i}
													 id={'square-' + i}
													 value={value}/>)
		};
		return squares;
	},

	render: function(){
		var squares = this.renderSquares();		
		return(
			<div className='row' id={this.props.id}>
				{squares}
			</div>
		)
	}
});

module.exports = Row;