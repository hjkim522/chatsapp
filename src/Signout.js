import { firebaseApp } from './firebase'
import { useHistory } from 'react-router-dom'

function Signout() {
  let history = useHistory();

  firebaseApp.auth().signOut()
  .then((result) => {
    console.log(result);
    history.push("/");
  })
  .catch((error) => {
    console.log(error);
    alert(error.message);
  })

  return (
    <div>Signing out...</div>
  );
}

export default Signout;
