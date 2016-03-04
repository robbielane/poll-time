import React from 'react';

var PollResults = React.createClass({
  calulateLength(key) {
    let responses = this.props.responses;
    let values = Object.keys(responses).map( key => { return responses[key] });
    let total = values.reduce( (a,b) => { return a + b });
    let percentage = Math.floor((responses[key] / total) * 100);
    return percentage + '%'
  },

  renderResponse(key) {
    let barLength = { width: this.calulateLength(key) };
    return (
      <div key={key}>
        <p>{key}:</p>
        <div
          className='bar'
          style={barLength}>
          <span className='bar-number'>{this.props.responses[key]}</span>
        </div>
      </div>
      )
  },

  render() {
    return (
      <div className='col-sm-10 col-sm-offset-1'>
        <div className='poll-results'>
          {Object.keys(this.props.responses).map(this.renderResponse)}
        </div>
      </div>
      )
  }
});

export default PollResults;
