import React, { useState } from 'react';
import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'
import SigninView from './view/Signin'

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSignin = () => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      setEmail("");
      setPassword("");
      history.push("/chats");
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    })
  }

  return (
    <SigninView
      onSignin={onSignin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword} />
  );
}
