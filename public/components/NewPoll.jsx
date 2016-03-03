import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import io from 'socket.io-client';

const socket = io();

var NewPoll = React.createClass({
  getInitialState() {
    return {
      responses: { 1: '', 2: '' }
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  addInput() {
    let key = (Object.keys(this.state.responses).length + 1);
    this.state.responses[key] = '';
    this.setState({ responses: this.state.responses });
  },

  createNewPoll() {
    let pollId = h.generateId();
    let responses = {};
    for (const key of Object.keys(this.state.responses)) {
      const val = this.state.responses[key];
      responses[val] = 0;
    }
    socket.emit('newPoll', pollId, responses);
    this.context.router.push(`/polls/${pollId}`);
  },

  updateResponse(key, response) {
    this.state.responses[key] = response;
    this.setState({ responses: this.state.responses });
  },

  renderForm(key) {
    return <ResponseInput key={key} index={key} updateResponse={this.updateResponse}/>
  },

  render() {
    return (
      <div className="response-form col-sm-6 col-sm-offset-3">
        {Object.keys(this.state.responses).map(this.renderForm)}
        <button onClick={this.addInput} className='btn btn-warning btn-default'>Add Another Response</button>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Submit</button>
      </div>
    )
  }
});

var ResponseInput = React.createClass({
  updateResponse() {
    let key = this.props.index;
    let newResponse = this.refs.responseInput.value;
    this.props.updateResponse(key, newResponse)
  },

  render() {
    return (
      <input ref='responseInput' type='text' onKeyUp={this.updateResponse} />
    )
  }
});

export default NewPoll;
