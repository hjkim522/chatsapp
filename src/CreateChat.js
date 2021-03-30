import React, { useState, useEffect } from 'react';
import { firebaseApp } from './firebase'
// import { firebaseApp, db, firebase } from './firebase'
import { useHistory } from 'react-router-dom'
import Signin from './Signin'

function CreateChat() {
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
        //TODO: handle this case too
      }
      setInitialzed(true);
    });
  }, []);

  useEffect(() => {
    console.log("initialized: " + initialized);
  }, [initialized]);

  const cb = () => {
    if (!user) {
      alert("not signed in");
      return;
    }
    //TODO: use interactive validation 
    //https://upmostly.com/tutorials/form-validation-using-custom-react-hooks
    const channelRegexr = /^[a-z][a-z0-9]+$/gi;
    if (!channelRegexr.test(channel)) {
      alert("invalid channel name");
      return;
    }
    history.push("/chats/" + channel);
    // let docRef = db.collection("channel").doc(channel);
    // db.runTransaction(async (transaction) => {
    //   return transaction.get(docRef).then((doc) => {
    //     if (!doc.exists) {
    //       transaction.set(docRef, {
    //         ownerUid: user.uid,
    //         created: firebase.firestore.Timestamp.now().seconds
    //       });
    //     }
    //   });
    // })
    // .then(() => {
    //   console.log("transaction successfully committed!");
    //   history.push("/chats/" + channel);
    // })
    // .catch((error) => {
    //   console.log("transaction failed: ", error);
    //   alert('faied to create a channel');
    // });
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

export default CreateChat;
