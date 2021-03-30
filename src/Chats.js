import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase'
import { useParams } from 'react-router-dom'
import Signin from './Signin'

function Chats() {
  let { channel } = useParams();
  const [initialized, setInitialzed] = useState(false);
  const [user, setUser] = useState();

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
        <div>{channel}</div>
        <button className="button">Send</button>
      </div>
    );
  }
}

export default Chats;
