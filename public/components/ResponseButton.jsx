import React from 'react';

var ResponseButton = React.createClass({
  render() {
    let name = this.props.name
    return (
      <div className='poll-button col-sm-3'>
        <button
          onClick={this.props.handleVote.bind(null, name)}
          disabled={this.props.voted}
          className='btn btn-default'>{name}
        </button>
      </div>
    )
  }
});

export default ResponseButton;
