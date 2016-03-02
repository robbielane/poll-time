import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const socket = io();


var NewPoll = React.createClass({
  componentDidMount() {
    socket.on('statusMessage', function (message) {
      console.log('you are connected')
    });
  },

  createNewPoll() {
    socket.emit('test')
  },

  render() {
    return (
      <div>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Create new Poll</button>
      </div>
    )
  }
});

ReactDOM.render(<NewPoll />, document.querySelector('#main'));
