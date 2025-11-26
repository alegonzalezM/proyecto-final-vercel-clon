// Import the functions you need from the SDKs you need
import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "test-back-node-b1678",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "656229187187",
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore(app);

export {db}