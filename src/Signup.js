import React, { useState } from 'react';
import { firebaseApp, db, firebase } from './firebase'
import { useHistory } from 'react-router-dom'
import SignupView from './view/Signup'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSignup = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //FIXME: not transactional
      console.log(result)
      db.collection('user')
      .add({
        uid: result.user.uid,
        email: result.user.email,
        created: firebase.firestore.Timestamp.now().seconds
      })
      .then((ref) => {
        setEmail("");
        setPassword("");
        history.push("/chats");
      })
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    })
  }

  return (
    <SignupView
      onSignup={onSignup}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword} />
  );
}
