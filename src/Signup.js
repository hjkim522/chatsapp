import React, { useState } from 'react';
import { firebaseApp, db, firebase } from './firebase'
import { useHistory } from 'react-router-dom'
import SignupView from './view/Signup'

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let history = useHistory();

  const onSignup = () => {
    if (firstName === "" || lastName === "") {
      alert("incomplete field");
      return;
    }

    //FIXME: user creation is not transactional
    let user = null;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(result);
      user = result.user;
      return result.user.updateProfile({displayName: firstName + " " + lastName});
    })
    .then((result) => {
      console.log(result);
      db.collection('user')
      .add({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        created: firebase.firestore.Timestamp.now().seconds
      })
      .then((ref) => {
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
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
      email={email} setEmail={setEmail}
      password={password} setPassword={setPassword}
      firstName={firstName} setFirstName={setFirstName}
      lastName={lastName} setLastName={setLastName} />
  );
}
