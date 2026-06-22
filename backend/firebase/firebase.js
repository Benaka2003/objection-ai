import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9jRvtRE2RONs9vzS_uj5vXzgkZnxCAT8",
  authDomain: "objectionai-fc4b9.firebaseapp.com",
  projectId: "objectionai-fc4b9",
  storageBucket: "objectionai-fc4b9.firebasestorage.app",
  messagingSenderId: "362399808702",
  appId: "1:362399808702:web:843de3d0d1d40dbf43b2ef",
  measurementId: "G-GLQVTWMVV9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;