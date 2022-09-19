// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
//import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiSXkElXnceZvd66hXIwoUCvfefgcd0DY",
  authDomain: "the-write-stuff-24a31.firebaseapp.com",
  projectId: "the-write-stuff-24a31",
  storageBucket: "the-write-stuff-24a31.appspot.com",
  messagingSenderId: "6093057514",
  appId: "1:6093057514:web:31bcfdb427055f9ee55693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();