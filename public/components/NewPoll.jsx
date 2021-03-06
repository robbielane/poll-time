import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import io from 'socket.io-client';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import ResponseInput from './ResponseInput.jsx';
import QuestionInput from './QuestionInput.jsx';

momentLocalizer(Moment);
const socket = io();

var NewPoll = React.createClass({
  getInitialState() {
    return {
      question: null,
      responses: { 1: null, 2: null },
      urls: { admin: null, poll: null },
      hideResults: false,
      end: null
    }
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  addInput(e) {
    e.preventDefault;
    let key = (Object.keys(this.state.responses).length + 1);
    this.state.responses[key] = '';
    this.setState({ responses: this.state.responses });
  },

  createNewPoll() {
    let pollId = h.generateId();
    let pollData = this.generatePollData();
    socket.emit('newPoll', pollId, pollData);
    this.generateLinks(pollId);
  },

  generatePollData() {
    let pollData = {
      question: this.state.question,
      hideResults: this.refs.results.checked,
      end: this.state.end,
      responses: {}
    };
    for (const key of Object.keys(this.state.responses)) {
      const val = this.state.responses[key];
      pollData['responses'][val] = 0;
    }
    return pollData
  },

  generateLinks(pollId) {
    let hostname = window.location.hostname;
    let port = window.location.port ? `:${window.location.port}` : ''
    this.state.urls.poll = `http://${hostname}${port}/polls/${pollId}`
    this.state.urls.admin = `http://${hostname}${port}/polls/${pollId}/admin`
    this.setState({ links: this.state.links });
  },

  updateResponse(key, response) {
    this.state.responses[key] = response.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
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
        <div key={key} className='urls'>
          <p>{key}: <a href={this.state.urls[key]} >{this.state.urls[key]}</a></p>
        </div>
      )
    }
  },

  updateEnd(name, value) {
    this.setState({ end: new Date(value) })
  },

  render() {
    return (
      <div className="response-form col-sm-6 col-sm-offset-3">
        <QuestionInput updateQuestion={this.updateQuestion} />
        {Object.keys(this.state.responses).map(this.renderForm)}
        <label> End Time: </label>
        <DateTimePicker
          format='lll'
          placeholder="Leave Blank to End Poll Manually"
          defaultValue={this.state.end}
          onChange={this.updateEnd.bind(null, 'end')}/>
        <div className='form-control check'>
          <input type='checkbox' defaultChecked={this.state.hideResults} ref='results' />
          <label> Hide Results From Voters</label>
        </div>
        <button onClick={this.addInput} className='btn btn-warning btn-default'>Add Another Response</button>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Submit</button>
        {Object.keys(this.state.urls).map(this.renderUrl)}
      </div>
    )
  }
});

export default NewPoll;
