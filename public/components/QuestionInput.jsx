import React from 'react';

var QuestionInput = React.createClass({
  updateResponse() {
    let key = this.props.index;
    let question = this.refs.questionInput.value;
    this.props.updateQuestion(question)
  },

  render() {
    return (
      <div>
        <label>Question: </label>
        <input ref='questionInput' type='text' onKeyUp={this.updateResponse} />
      </div>
    )
  }
});

export default QuestionInput;
