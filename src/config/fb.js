// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBu7cEdZJgn__GSspow4hAuEoLYiLS1sAo",
  authDomain: "Ctm2024-6e18c.firebaseapp.com",
  projectId: "tm2024-6e18c",
  storageBucket: "tm2024-6e18c.appspot.com",
  messagingSenderId: "582705125093",
  appId: "1:582705125093:web:bd87dbb4c0c0001e08a60c"
};

initializeApp(firebaseConfig);
export const app=initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth(app);
