import React from 'react';

var QuestionInput = React.createClass({
  updateQuestion() {
    let key = this.props.index;
    let question = this.refs.questionInput.value;
    this.props.updateQuestion(question)
  },

  render() {
    return (
      <div className='form-group'>
        <label>Question: </label>
        <input ref='questionInput'
          type='text'
          onKeyUp={this.updateQuestion}
        className='form-control'/>
      </div>
    )
  }
});

export default QuestionInput;
