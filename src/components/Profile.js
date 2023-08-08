import React, { useContext } from 'react';
import UserContext from '../UserContext';

function Profile() {
  const { user, signIn, signOut } = useContext(UserContext);
  // const photoURL = user.photoURL.replace('s96-c', 's200-c');
  const photoURL = user ? user.photoURL.replace('s96-c', 's125-c') : null;


  return (
    <div>
      <h1>{user && <img src={photoURL} alt="Profile" />}</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <button onClick={signIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Profile;
