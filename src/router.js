import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
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
