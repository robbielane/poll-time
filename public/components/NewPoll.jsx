import React from 'react';
import { History } from 'react-router';
import h from '../helpers';


var NewPoll = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  createNewPoll() {
    var pollId = h.generateId();
    this.context.router.push(`/polls/${pollId}`);
  },

  render() {
    return (
      <div>
        <button onClick={this.createNewPoll} className='btn btn-primary btn-default'>Create new Poll</button>
      </div>
    )
  }
});

export default NewPoll;
