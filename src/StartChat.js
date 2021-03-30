import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'

function StartChat() {
  let history = useHistory();

  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log(user);
    } else {
      // No user is signed in.
      return (<div>not signed in.</div>) // not working because already returned haha
    }
  });

  //displayName
  const cb = () => {
    history.push("/signup");
  };

  return (
    <div>
      <div><input></input></div>
      <button className="button" onClick={cb}>Start</button>
    </div>
  );
}

export default StartChat;
