// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIqcsuG-kbwUvOVaMiUnZN0GKz3v_JOvg",
  authDomain: "netflixgpt-6e942.firebaseapp.com",
  projectId: "netflixgpt-6e942",
  storageBucket: "netflixgpt-6e942.firebasestorage.app",
  messagingSenderId: "883353873588",
  appId: "1:883353873588:web:6984521832f4ee4a923be1",
  measurementId: "G-TJ9SNYDV0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();