var React = require('react');
var Row = require('./row');


var Grid = React.createClass({
	GRID_SIZE: 10,
	ROW_NAMES: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
						  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

	renderRows: function(){
		var rowsArray = ROW_NAMES[0..GRID_SIZE];
		rows = rowsArray.map(function(el, index){
			return(
				<Row key={index} id={'row-' + el} />
			)
		});
		return rows;
	},

	render: function(){
		var rows = this.renderRows();
		return(
			<div className='initial-grid'>
				{rows}
			</div>
		)
	}
});

module.exports = Grid;