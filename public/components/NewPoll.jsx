import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import io from 'socket.io-client';

import ResponseInput from './ResponseInput.jsx';
import QuestionInput from './QuestionInput.jsx';

const socket = io();

var NewPoll = React.createClass({
  getInitialState() {
    return {
      question: null,
      responses: { 1: null, 2: null },
      urls: { admin: null, poll: null }
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
    let pollData = {};
    pollData['question'] = this.state.question;
    pollData['responses'] = {};
    for (const key of Object.keys(this.state.responses)) {
      const val = this.state.responses[key];
      pollData['responses'][val] = 0;
    }
    socket.emit('newPoll', pollId, pollData);
    this.generateLinks(pollId);
    // this.context.router.push(`/polls/${pollId}`);
  },

  generateLinks(pollId) {
    this.state.urls.poll = `http://localhost:3000/polls/${pollId}`
    this.state.urls.admin = `http://localhost:3000/polls/${pollId}/admin`
    this.setState({ links: this.state.links });
  },

  updateResponse(key, response) {
    this.state.responses[key] = response;
    this.setState({ responses: this.state.responses });
  },

  updateQuestion(question) {
    this.state.question = question;
    this.setState({ question: this.state.question });
  },

  renderForm(key) {
    return <ResponseInput key={key} index={key} updateResponse={this.updateResponse}/>
  },

  renderUrl(key) {
    if (this.state.urls.poll) {
      return (
        <div key={key}>
          <p>{key}: <a href={this.state.urls[key]} >{this.state.urls[key]}</a></p>
        </div>
      )
    }
  },

  render() {
    return (
      <div className="response-form col-sm-6 col-sm-offset-3">
        <QuestionInput updateQuestion={this.updateQuestion} />
        {Object.keys(this.state.responses).map(this.renderForm)}
        <button onClick={this.addInput} className='btn btn-warning btn-default'>Add Another Response</button>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Submit</button>
        {Object.keys(this.state.urls).map(this.renderUrl)}
      </div>
    )
  }
});

export default NewPoll;
