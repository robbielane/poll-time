import React from 'react';

var ResponseInput = React.createClass({
  updateResponse() {
    let key = this.props.index;
    let newResponse = this.refs.responseInput.value;
    this.props.updateResponse(key, newResponse)
  },

  render() {
    return (
      <div>
        <label>Response: </label>
        <input ref='responseInput' type='text' onKeyUp={this.updateResponse} />
      </div>
    )
  }
});

export default ResponseInput;
