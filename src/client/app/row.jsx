var React = require('react');
var Square = require('./square');

var Row = React.createClass({
	renderSquares: function(){
		var squares = [];
		// create the header column
		squares.push(<Square key='header'
												 id='square-header'
												 value={this.props.rowName}/>);
		for(var i = 0; i < 10; i++){
			var value = this.props.headerRow ? i+1 : this.props.gameBoard[this.props.rowIndex][i];
			squares.push(<Square key={i}
													 id={'square-' + i}
													 value={value}
													 handleSelect={this.props.handleSelect}/>)
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