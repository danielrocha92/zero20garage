// src/services/firebaseBlog.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Configuração do Firebase (use a mesma que você me mostrou antes)
const firebaseConfig = {
  apiKey: "AIzaSyDZEG2BIV8nLF27usGvE3FwWLW1aNfLCMk",
  authDomain: "zero20garage-10bc0.firebaseapp.com",
  projectId: "zero20garage-10bc0",
  storageBucket: "zero20garage-10bc0.firebasestorage.app",
  messagingSenderId: "436903228814",
  appId: "1:436903228814:web:b1dbd8aa5ad0549312a0df",
  measurementId: "G-6YVS5KNQXF"
};

// Inicializar o app só uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Autenticação anônima (para permitir salvar/ler sem precisar de login)
export const authenticateUser = async () => {
  try {
    await signInAnonymously(auth);
    console.log("✅ Autenticado anonimamente no Firebase");
  } catch (error) {
    console.error("❌ Erro ao autenticar:", error);
  }
};

export { db };
