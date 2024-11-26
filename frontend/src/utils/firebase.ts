// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFtxi5tTdKFnAJoq86b1-UJXS4X0xKOBE",
  authDomain: "flashcards-23354.firebaseapp.com",
  projectId: "flashcards-23354",
  storageBucket: "flashcards-23354.firebasestorage.app",
  messagingSenderId: "1068035227970",
  appId: "1:1068035227970:web:4a7261cc7e61ec3fa848db",
  measurementId: "G-WK90Q9MEPJ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
