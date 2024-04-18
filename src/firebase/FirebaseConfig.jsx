import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyBrTmWHyz7lM-tzoptDz-4ug7nCof477hY",
  authDomain: "myecom-f1f4c.firebaseapp.com",
  projectId: "myecom-f1f4c",
  storageBucket: "myecom-f1f4c.appspot.com",
  messagingSenderId: "525745233349",
  appId: "1:525745233349:web:7c77f7bb4966a816047fac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB,auth}