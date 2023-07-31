// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2c23UM96pJe07kAiavjfPWDBxVLrrZ3U",
  authDomain: "knitwit-5feb6.firebaseapp.com",
  projectId: "knitwit-5feb6",
  storageBucket: "knitwit-5feb6.appspot.com",
  messagingSenderId: "4115727155",
  appId: "1:4115727155:web:2798d870ff36c4ae98f446",
  measurementId: "G-L67YPMJSM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
