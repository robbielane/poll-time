import React from 'react';
import io from 'socket.io-client';

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
      </div>
      )
  }
});

var ResponseButton = React.createClass({
  render() {
    let name = this.props.name
    return (
      <div className='poll-button col-sm-3'>
        <button onClick={this.props.handleVote.bind(null, name)} className='btn btn-default'>{name}</button>
      </div>
    )
  }
});

export default App;
