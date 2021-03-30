import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'
import Signin from './Signin'

function StartChat() {
  const [channel, setChannel] = useState("");
  const [initialized, setInitialzed] = useState(false);
  const [user, setUser] = useState();
  let history = useHistory();

  useEffect(() => {
    console.log("initialized: " + initialized);
  }, [initialized]);

  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      setUser(user);
    } else {
      console.log("not signed in");
    }
    setInitialzed(true);
  });

  const cb = () => {
    //TODO: create a channel if not exist

    history.push("/chats/" + channel);
  };

  if (!initialized) {
    return (
      <div>Loading...</div>
    );
  } else if (!user) {
    return (
      <Signin />
    )
  } else {
    return (
      <div>
        <div>channel<input onChange={(event) => {setChannel(event.target.value)}} value={channel}></input></div>
        <button className="button" onClick={cb}>Start</button>
      </div>
    )
  }
}

export default StartChat;
