import React from 'react';
import io from 'socket.io-client';

const socket = io();

var Poll = React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
  },

  render() {
    return (
      <div>New Poll Page</div>
    )
  }
});

export default Poll;
