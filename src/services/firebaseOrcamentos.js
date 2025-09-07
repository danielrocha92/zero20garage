// src/services/firebaseOrcamentos.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyhrOjuAI3s6eTPMFVnOsn0Dlktk5w7D8",
  authDomain: "zero20garage-api-orcamentos.firebaseapp.com",
  projectId: "zero20garage-api-orcamentos",
  storageBucket: "zero20garage-api-orcamentos.firebasestorage.app",
  messagingSenderId: "263074742758",
  appId: "1:263074742758:web:ae7adeaba8dacfb0669627",
  measurementId: "G-57KJ2XYV73"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig, "orcamentos") : getApp("orcamentos");

const auth = getAuth(app);
const db = getFirestore(app);

export async function authenticateUser() {
  try {
    await signInAnonymously(auth);
    console.log("✅ Firebase Orcamentos: usuário autenticado anonimamente.");
  } catch (error) {
    console.error("❌ Erro Firebase Orcamentos:", error);
  }
}

export { app, auth, db };
