// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4s-jqXp1tlvvmzuCLFaR7wA_lmCFc7kE",
  authDomain: "yt-clone-40df8.firebaseapp.com",
  projectId: "yt-clone-40df8",
  storageBucket: "yt-clone-40df8.appspot.com",
  messagingSenderId: "814919894202",
  appId: "1:814919894202:web:f8adeac40b5b62a21b6e83",
  measurementId: "G-49P600N0Y2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithRedirect };
export default db;
//npm install firebase
//npm install -g firebase-tools
