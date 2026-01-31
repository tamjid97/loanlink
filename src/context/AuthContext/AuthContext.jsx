import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.init"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register user
  const registerUser = async (email, password, name, photoURL) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: name,
        photoURL: photoURL,
      });
      setUser(res.user);
      toast.success("Registration successful!");
      return res.user;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      throw err;
    }
  };

  // Login user
  const signInUser = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      toast.success("Login successful!");
      return res.user;
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.info("Logged out successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  // Update profile
  const updateUserProfile = async (profile) => {
    try {
      if (!auth.currentUser) throw new Error("No user logged in");
      await updateProfile(auth.currentUser, profile);
      setUser({ ...auth.currentUser, ...profile });
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, registerUser, signInUser, logout, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};