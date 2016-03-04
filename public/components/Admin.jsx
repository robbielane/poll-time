import React from 'react';
import io from 'socket.io-client';

import PollResults from './PollResults.jsx'

const socket = io();

var Admin = React.createClass({
  getInitialState() {
    return {
      pollId: this.props.routeParams.pollId,
      question: null,
      responses: {},
      active: true
    }
  },

  componentDidMount() {
    socket.emit('pollRequest', this.props.routeParams.pollId);
    socket.on('pollData', this.handleData);
  },

  handleData(data, pollId) {
    if (pollId === this.state.pollId) {
      this.setState(data);
    }
  },

  handleEndPoll() {
    if (confirm('Are you sure?')) {
      socket.emit('endPoll', this.state.pollId)
      this.setState({ active: false });
    };
  },

  render() {
    return (
      <div className='admin'>
        <h2>{this.state.question}</h2>
        <PollResults responses={this.state.responses} />
        <button
          onClick={this.handleEndPoll}
          className='close-btn btn btn-danger'
        disabled={!this.state.active}>
          Close Poll
        </button>
      </div>
    )
  }
});

export default Admin;
