// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg5HONTV1PMkUi9PvqkNjToHb5DevvGtY",
  authDomain: "advanced-web-f30c5.firebaseapp.com",
  projectId: "advanced-web-f30c5",
  storageBucket: "advanced-web-f30c5.appspot.com",
  messagingSenderId: "650804668528",
  appId: "1:650804668528:web:b9bd8088f7a07d0741acb5",
  measurementId: "G-PBJ1XNSDJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);