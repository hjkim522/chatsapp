import React, { useState } from 'react';
import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const cb = () => {
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
    <div>
      <div>email<input onChange={(event) => {setEmail(event.target.value)}} value={email}></input></div>
      <div>password<input onChange={(event) => {setPassword(event.target.value)}} value={password}></input></div>
      <button className="button" onClick={cb}>Sign in</button>
      <button className="button" onClick={() => { history.push("/signup"); }}>Sign up</button>
    </div>
  );
}

export default Signin;
