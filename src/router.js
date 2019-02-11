import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Home from './components/Home';
import Request from './components/Request';

export default (
  <Switch>
    <Route path='/home' component={Request}/>
    <Route exact path='/' component={Home}/>
  </Switch>
)