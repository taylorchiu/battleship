var React = require('react');

var Square = React.createClass({
	getClasses: function(){
    var squareClasses = 'square'
    switch(this.props.status){
      case 0:
        squareClasses += ' open';
        break;
      case 1:
        squareClasses += ' ship';
        break;
      case 2:
        squareClasses += ' damage';
        break;
      case 3:
        squareClasses += ' missed';
        break;
    }
    return squareClasses;
  },

  handleClick: function(evt){
    evt.preventDefault;
    this.props.handleSelect(this);
  },

  render: function(){
    return(
			<div className={this.getClasses()}
					 id={this.props.id}
					 onClick={this.handleClick}>
				{this.props.value}
			</div>
		)
	}
});

module.exports = Square;