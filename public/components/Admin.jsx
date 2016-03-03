import React from 'react';
import io from 'socket.io-client';

import PollResults from './PollResults.jsx'

const socket = io();

var Admin = React.createClass({
  getInitialState() {
    return {
      pollId: null,
      question: null,
      responses: {}
    }
  },

  componentDidMount() {
    socket.on('pollData', this.handleData.bind(this));
  },

  handleData(data) {
    let pollId    = this.props.routeParams.pollId
    let question  = data[pollId].question;
    let responses = data[pollId].responses;
    this.setState({ pollId: pollId, question: question, responses: responses })
  },

  render() {
    return (
      <div className='poll-results'>
        <PollResults responses={this.state.responses} />
      </div>
    )
  }
});

export default Admin;
