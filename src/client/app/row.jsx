var React = require('react');
var Square = require('./square');

var Row = React.createClass({
	renderSquares: function(){
		var squares = this.props.grid_size.forEach(function(el, index){
			return(
				<Square key={index} id={'square-' + index} />
			)
		});
		return squares;
	},

	render: function(){
		// var squares = this.renderSquares();		
		return(
			// {squares}
			<div> a row</div>
		)
	}
});

module.exports = Row;