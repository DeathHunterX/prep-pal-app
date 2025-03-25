import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqJ8RRujUJyWbAXA9PuE7hJ1QF00cjVKw",
  authDomain: "preppal-6755a.firebaseapp.com",
  projectId: "preppal-6755a",
  storageBucket: "preppal-6755a.firebasestorage.app",
  messagingSenderId: "117847009139",
  appId: "1:117847009139:web:6a9829d235cb91ba630706",
  measurementId: "G-535DCRV1RG",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
