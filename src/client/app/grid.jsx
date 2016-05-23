var React = require('react');
var Row = require('./row');

var Grid = React.createClass({
	GRID_SIZE: 10,
	ROW_NAMES: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
						  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

	renderRows: function(){
		var rowsArray = this.ROW_NAMES.slice(0, this.GRID_SIZE),
				self = this,
				rows;
		rows = rowsArray.map(function(el){
			return(
				<Row key={rowsArray.indexOf(el)}
						 id={'row-'+el}
						 rowName={el}
						 gridSize={self.GRID_SIZE}/>
			)
		});
		rows.unshift(<Row key='header'
											id='row-header'
											gridSize={this.GRID_SIZE}
											headerRow={true}/>)
		return rows;
	},

	render: function(){
		var rows = this.renderRows();
		return(
			<div className='initial-grid'>
				<div className='top-labels'>

				</div>
				{rows}
			</div>
		)
	}
});

module.exports = Grid;