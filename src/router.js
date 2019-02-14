import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Home from "./components/Home";
import GamePage from "./components/GamePage";
import Profile from "./components/Profile";

export default (
    <Switch>
        <Route path="/profile" component={Profile}/>
        <Route path='/:game' component={GamePage}/>
        <Route exact path="/" component={Home}/>
    </Switch>
);
