import { initializeApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

type ViteEnv = Record<string, string | undefined>;

const env = ((import.meta as ImportMeta & { env?: ViteEnv }).env ?? {}) as ViteEnv;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);
const firebaseServices = hasFirebaseConfig
  ? (() => {
      const app = initializeApp(firebaseConfig);
      return {
        auth: getAuth(app),
        db: getFirestore(app),
      };
    })()
  : null;

export const db = firebaseServices?.db as Firestore;
export const auth = firebaseServices?.auth as Auth;

export const getFirebaseServices = () => {
  if (!firebaseServices) {
    throw new Error("Firebase is not configured for this runtime.");
  }

  return firebaseServices;
};
