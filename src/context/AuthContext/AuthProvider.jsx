import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init.js";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // logout function can be added here
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }


  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }

  useEffect(() =>{

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    })
    return () => unsubscribe();
  }, []  )

  return (
    <AuthContext.Provider
      value={{ registerUser, signInUser, signInGoogle, user, loading, logout,updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;