var React = require('react');
var Row = require('./row');

var Grid = React.createClass({
	renderRows: function(){
		var rowsArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
				self = this,
				rows;
		rows = rowsArray.map(function(el, index){
			return(
				<Row key={index}
						 id={'row-'+el}
						 rowIndex={index}
						 rowName={el}
						 gameBoard={self.props.gameBoard}
						 handleSelect={self.props.handleSelect}/>
			)
		});
		rows.unshift(<Row key='header'
											id='row-header'
											headerRow={true}
											handleSelect={self.props.handleSelect}/>)
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