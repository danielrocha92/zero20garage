// src/services/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../firebase/config";

// Evita inicializações duplicadas
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Cria a instância do Firestore vinculada ao app
export const db = getFirestore(app);

export default app;
