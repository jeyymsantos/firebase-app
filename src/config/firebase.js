// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export {auth, fs, storage};
