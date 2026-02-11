"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import {
  AuthState,
  AuthContextType,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";

/* ========================= */

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* 🔥 SESSION RESTORE (MAIN AUTH CONTROL) */
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      dispatch({ type: "AUTH_LOGOUT" });
      return;
    }

    const userRef = doc(db, "users", firebaseUser.uid);
    let snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email || "",
        phone: firebaseUser.phoneNumber || "",
        role: "CUSTOMER",
        createdAt: new Date(),
      });

      snapshot = await getDoc(userRef);
    }

    const data = snapshot.data();

    const user: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email || "",
      name: data?.name || "",
      phone: data?.phone || "",
      role: data?.role || "CUSTOMER",
    };

    dispatch({ type: "AUTH_SUCCESS", payload: user });
  });

  return () => unsub();
}, []);


  /* 🔐 LOGIN */
  const login = async (credentials: LoginCredentials) => {
    await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );
    // 🔥 DO NOT dispatch here
    // onAuthStateChanged will handle it
  };

  /* 📝 REGISTER */
  const register = async (credentials: RegisterCredentials) => {
    const res = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );

    await setDoc(doc(db, "users", res.user.uid), {
      name: credentials.name,
      email: credentials.email,
      phone: credentials.phone || "",
      role: "CUSTOMER",
      createdAt: new Date(),
    });

    // 🔥 DO NOT dispatch here
    // onAuthStateChanged will handle it automatically
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser: () => {},
    clearError: () => {},
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
