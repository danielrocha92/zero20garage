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
let authenticationPromise = null;

export async function authenticateUser() {
  if (auth.currentUser) return auth.currentUser;
  if (authenticationPromise) return authenticationPromise;

  authenticationPromise = signInAnonymously(auth)
    .then((userCredential) => {
      console.log("✅ Firebase Orcamentos: usuário autenticado anonimamente.");
      return userCredential.user;
    })
    .catch((error) => {
      if (error?.code === 'auth/admin-restricted-operation') {
        console.error("❌ Login anônimo desativado. Ative Authentication > Sign-in method > Anonymous no projeto zero20garage-api-orcamentos.");
      } else {
        console.error("❌ Erro Firebase Orcamentos:", error);
      }
      throw error;
    });

  return authenticationPromise;
}

export { app, auth, db };
