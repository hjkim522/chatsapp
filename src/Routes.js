import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signup from './Signup'
import Signin from './Signin'
import Signout from './Signout'
import CreateChat from './CreateChat'
import Chats from './Chats'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/signout">
          <Signout />
        </Route>
        <Route exact path="/chats">
          <CreateChat />
        </Route>
        <Route exact path="/chats/:channel">
          <Chats />
        </Route>
        <Route exact path="/">
          <CreateChat />
        </Route>
      </Switch>
    </Router>
  );
}
