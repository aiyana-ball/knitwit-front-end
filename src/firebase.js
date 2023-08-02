import { collection, getFirestore, doc, getDoc, getDocs } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from "firebase/app";

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
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      })
      .catch((error) => {
          console.log("Error getting document:", error);
      });
}
