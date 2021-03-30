import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signup from './Signup'
import Signin from './Signin'
import StartChat from './StartChat'
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
        <Route exact path="/start-chat">
          <StartChat />
        </Route>
        <Route exact path="/chats">
          <Chats />
        </Route>
      </Switch>
    </Router>
  );
}
