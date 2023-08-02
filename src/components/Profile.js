import React, { useContext } from 'react';
import { signInWithGoogle } from '../firebase'; // import signInWithGoogle from firebase.js
import UserContext from '../UserContext';

function Profile({ onSignIn}) {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <p>Welcome, {user.displayName}!</p>
      ) : (
        <button onClick={onSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}

export default Profile;
