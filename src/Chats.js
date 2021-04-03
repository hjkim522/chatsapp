import React, { useState, useEffect } from 'react';
import { firebaseApp, db, firebase } from './firebase'
import { useParams, useHistory } from 'react-router-dom'
import Signin from './Signin'
import ChatsView from './view/Chats'

function Chats() {
  let { channel } = useParams();
  let history = useHistory();
  const [initialized, setInitialzed] = useState(false);
  const [user, setUser] = useState();
  const [content, setContent] = useState();
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const messagesRef = db.collection("channel").doc(channel).collection("message")
    messagesRef.orderBy("created").onSnapshot((snapshot) => {
      console.log("messages updated");
      //TODO: Pagination is required
      //TODO: Update delta only, avoid the copy if possible
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(messages);
      setMessages(messages);
    })
  }, [channel]);

  const onSend = () => {
    console.log(content);

    if (!user) {
      console.log("not signed in");
      return;
    }
    if (!content) {
      console.log("skipping empty message");
      return;
    }

    db.collection("channel").doc(channel).collection("message")
    .add({
      uid: user.uid,
      displayName: user.displayName,
      content: content,
      created: firebase.firestore.Timestamp.now(),
    })
    .then((ref) => {
      setContent("");
    })
  };

  const onExit = () => {
    history.push("/chat");
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
      <ChatsView
        channel={channel}
        onSend={onSend}
        onExit={onExit}
        content={content}
        setContent={setContent}
        messages={messages}
        setMessages={setMessages} />
    );
  }
}

export default Chats;
