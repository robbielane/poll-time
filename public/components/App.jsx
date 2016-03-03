import React from 'react';
import io from 'socket.io-client';

import PollResults from './PollResults.jsx'
import ResponseButton from './ResponseButton.jsx'

const socket = io();

var App = React.createClass({
  getInitialState() {
    return {
      pollId: this.props.routeParams.pollId,
      question: null,
      hideResults: null,
      responses: {}
    }
  },

  componentDidMount() {
    socket.emit('pollRequest', this.props.routeParams.pollId);
    socket.on('pollData', this.handleData);
  },

  handleData(data) {
    this.setState(data);
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
    let results = this.state.hideResults ? null : <PollResults responses={this.state.responses} />;
    return (
      <div className='poll container-fluid'>
        <h3>{this.state.question}</h3>
        {Object.keys(this.state.responses).map(this.renderResponse)}
        {results}
      </div>
      )
  }
});

export default App;
