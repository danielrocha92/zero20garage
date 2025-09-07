// src/services/firebaseUpload.js
import { initializeApp, getApps } from "firebase/app"; // removi getApp
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyChLSQrE2uma5PHXEmbzgxRLE6WbwCw0CM",
  authDomain: "zero20-upload-api-e3a14.firebaseapp.com",
  projectId: "zero20-upload-api-e3a14",
  storageBucket: "zero20-upload-api-e3a14.firebasestorage.app",
  messagingSenderId: "571940430324",
  appId: "1:571940430324:web:bfe8e1170901824b7dd9a1",
  measurementId: "G-3WXV8S717C"
};

// Inicializar app Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const db = getFirestore(app);
const auth = getAuth(app);

export const authenticateUser = async () => {
  try {
    await signInAnonymously(auth);
    console.log("✅ Autenticado anonimamente no Firebase (Upload)");
  } catch (error) {
    console.error("❌ Erro ao autenticar:", error);
  }
};

export { db };
