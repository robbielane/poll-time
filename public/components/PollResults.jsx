import React from 'react';

var PollResults = React.createClass({
  renderResponse(key) {
    return <li key={key}>{key}: {this.props.responses[key]}</li>
  },

  render() {
    return (
      <div>
        <ul>
          {Object.keys(this.props.responses).map(this.renderResponse)}
        </ul>
      </div>
      )
  }
});

export default PollResults;
