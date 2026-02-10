"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthState,
  AuthContextType,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

/* =========================
   INITIAL STATE
========================= */

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

/* =========================
   ACTIONS
========================= */

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_FAILURE"; payload: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "UPDATE_USER"; payload: Partial<User> };

/* =========================
   REDUCER
========================= */

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

/* =========================
   CONTEXT
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/* =========================
   PROVIDER
========================= */

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /* 🔁 AUTO LOGIN (Firebase session restore) */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        dispatch({ type: "AUTH_LOGOUT" });
        return;
      }

      const user: User = {
        id: firebaseUser.uid, // 🔥 SAME AS booking.userId
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "User",
        role: "CUSTOMER",
      };

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "AUTH_SUCCESS", payload: user });
    });

    return () => unsub();
  }, []);

  /* 🔐 LOGIN */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: "AUTH_START" });

      const res = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = res.user;

      const user: User = {
        id: firebaseUser.uid, // ✅ CRITICAL
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || credentials.email.split("@")[0],
        role: "CUSTOMER",
      };

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "AUTH_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: "Invalid email or password",
      });
      throw error;
    }
  };

  /* 📝 REGISTER */
  const register = async (
    credentials: RegisterCredentials
  ): Promise<void> => {
    try {
      dispatch({ type: "AUTH_START" });

      const res = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = res.user;

      const user: User = {
        id: firebaseUser.uid, // ✅ SAME UID
        email: firebaseUser.email || "",
        name: credentials.name || "User",
        role: "CUSTOMER",
      };

      localStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "AUTH_SUCCESS", payload: user });
    } catch (error) {
      dispatch({
        type: "AUTH_FAILURE",
        payload: "Registration failed",
      });
      throw error;
    }
  };

  /* ✏️ UPDATE USER (PROFILE EDIT) */
  const updateUser = (data: Partial<User>): void => {
    dispatch({ type: "UPDATE_USER", payload: data });

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...JSON.parse(storedUser), ...data })
      );
    }
  };

  /* 🚪 LOGOUT */
  const logout = async (): Promise<void> => {
    await signOut(auth);
    localStorage.removeItem("user");
    dispatch({ type: "AUTH_LOGOUT" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError: () => {},
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
