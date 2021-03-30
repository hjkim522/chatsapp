import React, { useReducer, useState } from 'react';
import { firebaseApp, db, firebase } from './firebase'

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cb = () => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      setEmail("");
      setPassword("");
      alert('Successfully signed in!');
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    })
  }

  return (
    <div>
      <div>email<input onChange={(event) => {setEmail(event.target.value)}} value={email}></input></div>
      <div>password<input onChange={(event) => {setPassword(event.target.value)}} value={password}></input></div>
      <button className="button" onClick={cb}>Sign in</button>
    </div>
  );
}

export default Signin;
