var React = require('react');

var Square = React.createClass({
	render: function(){
		return(
			<div className='square' id={this.props.id}>
				{this.props.value}
			</div>
		)
	}
});

module.exports = Square;