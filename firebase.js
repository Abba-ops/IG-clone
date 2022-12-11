// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAixwIg9ovbDLzEpXt0WVYZ12j00kS5ROw",
  authDomain: "ig-clone-fc67b.firebaseapp.com",
  projectId: "ig-clone-fc67b",
  storageBucket: "ig-clone-fc67b.appspot.com",
  messagingSenderId: "249474664267",
  appId: "1:249474664267:web:23c120d34524066983cace",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
