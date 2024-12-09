import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEXWx5bNJcPAAVltcUFBsVsvbAFpqmH9Y",
  authDomain: "books-list-firebase.firebaseapp.com",
  projectId: "books-list-firebase",
  storageBucket: "books-list-firebase.firebasestorage.app",
  messagingSenderId: "1032727188289",
  appId: "1:1032727188289:web:a99eebb4df73b8cb6987c0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
