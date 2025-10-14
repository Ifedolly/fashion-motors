// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX0hiTc3gs5UkQQq0qP3WoBQDo4otAxKg",
  authDomain: "fashion-motors-app.firebaseapp.com",
  projectId: "fashion-motors-app",
  storageBucket: "fashion-motors-app.firebasestorage.app",
  messagingSenderId: "84767951527",
  appId: "1:84767951527:web:d84aad967d02195e122982",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore for use across the app
export const auth = getAuth(app);
export const db = getFirestore(app);
