import React from 'react';
import { History } from 'react-router';
import h from '../helpers';


var Home = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  createNewPoll() {
    var pollId = h.generateId();
    this.context.router.push('/polls/new');
  },

  render() {
    return (
      <div className='home col-sm-4 col-sm-offset-4'>
        <h1>Welcome to Poll-Time</h1>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Create new Poll</button>
      </div>
    )
  }
});

export default Home;
