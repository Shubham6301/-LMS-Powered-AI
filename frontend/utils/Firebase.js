import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "lms-ai-a7372.firebaseapp.com",
  projectId: "lms-ai-a7372",
  storageBucket: "lms-ai-a7372.firebasestorage.app",
  messagingSenderId: "460514634502",
  appId: "1:460514634502:web:442a5fb67ea37fe7c34c87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}