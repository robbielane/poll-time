import React from 'react';
import io from 'socket.io-client';

const socket = io();

var App = React.createClass({
  componentDidMount() {
    socket.on('statusMessage', function (message) {
      console.log('you are connected');
    })
  },

  render() {
    return (
      <div>New Poll Page</div>
    )
  }
});

export default App;
