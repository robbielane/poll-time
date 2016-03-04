import React from 'react';
import io from 'socket.io-client';

import PollResults from './PollResults.jsx'

const socket = io();

var Admin = React.createClass({
  getInitialState() {
    return {
      pollId: this.props.routeParams.pollId,
      question: null,
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

  render() {
    return (
      <div>
        <PollResults responses={this.state.responses} />
      </div>
    )
  }
});

export default Admin;
