// src/services/firebaseBlog.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

// Configuração do Firebase (use a mesma que você me mostrou antes)
const firebaseConfig = {
  apiKey: "AIzaSyC2yLYIEdl21s2CDCI5B-5IYA9XKyuC7J8",
  authDomain: "blogsharezero20garage.firebaseapp.com",
  projectId: "blogsharezero20garage",
  storageBucket: "blogsharezero20garage.firebasestorage.app",
  messagingSenderId: "691838476330",
  appId: "1:691838476330:web:ddd1577da5d67f0233e353",
  measurementId: "G-XG6LVSJ0GB"
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
