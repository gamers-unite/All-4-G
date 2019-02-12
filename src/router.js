import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
<<<<<<< HEAD
import Home from './components/Home';
import Request from './components/Request';
import Profile from "./components/Profile";

export default (
  <Switch>
    <Route path="/profile" component={Profile} />
    <Route path='/home' component={Request}/>
    <Route exact path='/' component={Home}/>
  </Switch>
)
=======
import Home from "./components/Home";
import Request from "./components/Request";
import Profile from "./components/Profile";

export default (
    <Switch>
        <Route path="/home" component={Request} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/" component={Home} />
    </Switch>
);
>>>>>>> master
