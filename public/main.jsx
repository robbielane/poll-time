import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, History } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import NewPoll from './components/NewPoll.jsx';


var routes = (
   <Router history={browserHistory}>
     <Route path="/" component={Home}/>
     <Route path="/polls/new" component={NewPoll}/>
     <Route path="/polls/:pollId" component={App}/>
   </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
