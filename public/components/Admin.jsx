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

  handleData(data) {
    this.setState(data);
  },

  handleEndPoll() {
    this.setState({ active: false });
    socket.emit('endPoll', this.state.pollId)
  },

  render() {
    return (
      <div>
        <PollResults responses={this.state.responses} />
        <button onClick={this.handleEndPoll} className='close-btn btn btn-danger'>
          Close Poll
        </button>
      </div>
    )
  }
});

export default Admin;
