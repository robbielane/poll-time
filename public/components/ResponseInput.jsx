import React from 'react';

var ResponseInput = React.createClass({
  updateResponse() {
    let key = this.props.index;
    let newResponse = this.refs.responseInput.value;
    this.props.updateResponse(key, newResponse)
  },

  render() {
    return (
      <div className='form-group'>
        <label>Response: </label>
        <input
          ref='responseInput'
          type='text'
          onKeyUp={this.updateResponse}
        className='form-control'/>
      </div>
    )
  }
});

export default ResponseInput;
