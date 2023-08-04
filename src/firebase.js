import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initializeApp } from "firebase/app"; 
import React, { createContext, useState } from 'react';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "knitwit-5feb6.firebaseapp.com",
  projectId: "knitwit-5feb6",
  storageBucket: "knitwit-5feb6.appspot.com",
  messagingSenderId: "4115727155",
  appId: "1:4115727155:web:2798d870ff36c4ae98f446",
  measurementId: "G-L67YPMJSM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const getAccountData = () => {
  console.log("getting account data")
  const docRef = doc(db, "account", "Pm7D9gMXPK1QAr0Wyp8m");
  getDoc(docRef)
    .then((doc) => {
    if (doc.exists()) {
      console.log("Document data:", doc.data());
    } else {
      console.log("No such document!");
    }
})
.catch((error) => {
    console.log("Error getting document:", error);
});
}

// sign in
export const signInWithGoogle = () => {
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives a Google Access Token. Used it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // Create a user document in Firestore
        const userDocRef = doc(db, 'account', user.uid)
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          // additional user fields (photo?)
        }, { merge: true });
        return user;
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

// sign out
export const firebaseSignOut = () => {
  return signOut(auth)
    .then(() => {
      console.log('User signed out');
      return 'signed out';
    })
    .catch((error) => {
      console.log('Error signing out: ', error);
    });
};

// user context
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const handleSignIn = () => {
    signInWithGoogle().then((user) => {
      setUser(user);
    });
  };

  const handleSignOut = () => {
    firebaseSignOut().then(() => {
      setUser(null);
    });
  };

  return (
    <UserContext.Provider value = {{ user, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </UserContext.Provider>
  );
};