import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'
import Signin from './Signin'
import CreateChatView from './view/CreateChat'

export default function CreateChat() {
  const [channel, setChannel] = useState("");
  const [initialized, setInitialzed] = useState(false);
  const [user, setUser] = useState();
  let history = useHistory();

  useEffect(() => {
    console.log("initializing");
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("not signed in");
        //TODO: handle this case
      }
      setInitialzed(true);
    });
  }, []);

  useEffect(() => {
    console.log("initialized: " + initialized);
  }, [initialized]);

  const onCreateChat = () => {
    if (!user) {
      alert("not signed in");
      return;
    }
    //TODO: use interactive validation 
    const channelRegexr = /^[a-z][a-z0-9]*$/gi;
    if (!channelRegexr.test(channel)) {
      alert("invalid channel name");
      return;
    }
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
      <CreateChatView
        onCreateChat={onCreateChat}
        channel={channel}
        setChannel={setChannel} />
    )
  }
}
