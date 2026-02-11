import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase configuration
 * (Hardcoded is OK for now since these are public keys)
 */
const firebaseConfig = {
  apiKey: "AIzaSyCRd-F-tT-xKujHY1S7vP0usaP8W0DJsvg",
  authDomain: "eventforce-ffabe.firebaseapp.com",
  projectId: "eventforce-ffabe",
  storageBucket: "eventforce-ffabe.appspot.com",
  messagingSenderId: "960896096381",
  appId: "1:960896096381:web:375914fb7ee3f0e0c9b914",
};

/**
 * 🔥 IMPORTANT
 * Prevent multiple Firebase app instances
 */
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

/**
 * Firebase services (SINGLETONS)
 */
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * ❌ DO NOT USE getAnalytics in Next.js (SSR issue)
 * If you want analytics later, we’ll add it client-only
 */




// // lib/firebase.ts

// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// /**
//  * Firebase configuration
//  * (Public keys are safe to expose in frontend apps)
//  */
// const firebaseConfig = {
//   apiKey: "AIzaSyCRd-F-tT-xKujHY1S7vP0usaP8W0DJsvg",
//   authDomain: "eventforce-ffabe.firebaseapp.com",
//   projectId: "eventforce-ffabe",
//   storageBucket: "eventforce-ffabe.appspot.com",
//   messagingSenderId: "960896096381",
//   appId: "1:960896096381:web:375914fb7ee3f0e0c9b914",
// };

// /**
//  * 🔥 Prevent Firebase from initializing during SSR
//  * This avoids production black screen crashes in Next.js
//  */
// let app;

// if (typeof window !== "undefined") {
//   app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// }

// /**
//  * Firebase services (singletons)
//  * These will only exist on the client
//  */
// export const auth = app ? getAuth(app) : null;
// export const db = app ? getFirestore(app) : null;
