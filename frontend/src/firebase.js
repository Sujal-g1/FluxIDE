

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "fluxide-67eec.firebaseapp.com",
  projectId: "fluxide-67eec",
  storageBucket: "fluxide-67eec.firebasestorage.app",
  messagingSenderId: "253953315835",
  appId: "1:253953315835:web:554accfb7acb4307e6315e",
  measurementId: "G-F0BB2RZHGB"

  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()