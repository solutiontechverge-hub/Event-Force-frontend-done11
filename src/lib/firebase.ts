import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRd-F-tT-xKujHY1S7vP0usaP8W0DJsvg",
  authDomain: "eventforce-ffabe.firebaseapp.com",
  projectId: "eventforce-ffabe",
  storageBucket: "eventforce-ffabe.firebasestorage.app",
  messagingSenderId: "960896096381",
  appId: "1:960896096381:web:375914fb7ee3f0e0c9b914",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
