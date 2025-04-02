import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

interface FirebaseConfig {
  appId: string;
  apiKey: string;
  projectId: string;
  authDomain: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  appId: import.meta.env.VITE_FIREBASE_API_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
