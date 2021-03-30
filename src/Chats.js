import React, { useState, useEffect } from 'react';
import { firebaseApp, db, firebase } from './firebase'
import { useParams, useHistory } from 'react-router-dom'
import Signin from './Signin'

function Chats() {
  let { channel } = useParams();
  let history = useHistory();
  const [initialized, setInitialzed] = useState(false);
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  //const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    const messagesRef = db.collection("channel").doc(channel).collection("message")
    messagesRef.orderBy("created").onSnapshot((snapshot) => {
      console.log("messages updated");
      //TODO: Pagination is requires
      //XXX: Can we update delta only?
      //XXX: Can we avoid the copy?
      // setMessages(snapshot.docs);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setData(data);
    })
  }, [channel]);

  const send = () => {
    console.log(message);

    if (!user) {
      console.log("not signed in");
      return;
    }
    if (!message) {
      console.log("skipping empty message");
      return;
    }

    db.collection("channel").doc(channel).collection("message")
    .add({
      uid: user.uid,
      contents: message,
      created: firebase.firestore.Timestamp.now().seconds,
    })
    .then((ref) => {
      setMessage("");
    })
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
        <div>{channel}</div>
        <div>messages</div>
        {data.map((message) => {
          return <div key={message.id}>{message.uid}: {message.contents}</div>
        })}
        <textarea onChange={(event) => { setMessage(event.target.value); }} value={message}></textarea>
        <button className="button" onClick={send}>Send</button>
        <button className="button" onClick={() => { history.push("/chats"); }}>Leave</button>
      </div>
    );
  }
}

export default Chats;
