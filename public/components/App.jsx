import React from 'react';
import io from 'socket.io-client';

import PollResults from './PollResults.jsx'
import ResponseButton from './ResponseButton.jsx'

const socket = io();

var App = React.createClass({
  getInitialState() {
    return {
      pollId: null,
      question: null,
      responses: {}
    }
  },

  componentDidMount() {
    socket.on('pollData', this.handleData);
  },

  handleData(data) {
    let pollId    = this.props.routeParams.pollId
    let question  = data[pollId].question;
    let responses = data[pollId].responses;
    this.setState({ pollId: pollId, question: question, responses: responses })
  },

  handleVote(vote) {
    socket.emit('vote', vote, this.state.pollId);
  },

  renderResponse(key) {
    return (
      <ResponseButton key={key} handleVote={this.handleVote} name={key} />
    )
  },

  render() {
    return (
      <div className='poll container-fluid'>
        <h3>{this.state.question}</h3>
        {Object.keys(this.state.responses).map(this.renderResponse)}
        <PollResults responses={this.state.responses} />
      </div>
      )
  }
});

export default App;
