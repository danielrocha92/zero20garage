// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importe o Firestore aqui

const firebaseConfig = {
  apiKey: "AIzaSyChLSQrE2uma5PHXEmbzgxRLE6WbwCw0CM",
  authDomain: "zero20-upload-api-e3a14.firebaseapp.com",
  projectId: "zero20-upload-api-e3a14",
  storageBucket: "zero20-upload-api-e3a14.firebasestorage.app",
  messagingSenderId: "571940430324",
  appId: "1:571940430324:web:d3a8579a3e31d9967dd9a1",
  measurementId: "G-BQGXRLEPCJ"
};

// Inicialize o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exporte a instância do Firestore para usar em outros lugares
export { db };
