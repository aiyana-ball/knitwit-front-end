import React, { useContext } from 'react';
import UserContext from '../UserContext';

function Profile() {
  const { user, signIn, signOut } = useContext(UserContext);


  return (
    <div>
      <h1>Profile Page</h1>
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
