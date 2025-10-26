// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
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

// Initialize Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Ensure user stays logged in across navigations
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

export { auth, db };
