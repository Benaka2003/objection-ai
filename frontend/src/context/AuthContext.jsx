import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    console.log("AUTH USER:", firebaseUser);
    setUser(firebaseUser);
    setLoading(false);
  });

  return unsubscribe;
}, []);
  async function signup(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
  }

  async function login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  }

  async function loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);
    return credential.user;
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
