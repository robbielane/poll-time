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
      responses: {},
      voted: false,
      active: true
    }
  },

  componentDidMount() {
    socket.emit('pollRequest', this.props.routeParams.pollId);
    socket.on('pollData', this.handleData);
    if (localStorage[this.state.pollId]) { this.setState({ voted: true})};
  },

  handleData(data, pollId) {
    if (pollId === this.state.pollId) {
      this.setState(data);
    }
  },

  handleVote(vote) {
    localStorage.setItem(this.state.pollId, true)
    this.setState({ voted: true})
    socket.emit('vote', vote, this.state.pollId);
  },

  renderResponse(key) {
    return (
      <ResponseButton key={key} handleVote={this.handleVote} name={key} voted={this.state.voted} />
    )
  },

  render() {
    let results = this.state.hideResults ? null : <PollResults responses={this.state.responses} />;
    let active
    if (this.state.active) {
      active = Object.keys(this.state.responses).map(this.renderResponse)
    } else {
      active = <h3>This Poll has ended</h3>
    }
    return (
      <div className='poll container-fluid'>
        <h2>{this.state.question}</h2>
        {active}
        {results}
      </div>
      )
  }
});

export default App;
