// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2yLYIEdl21s2CDCI5B-5IYA9XKyuC7J8",
  authDomain: "blogsharezero20garage.firebaseapp.com",
  projectId: "blogsharezero20garage",
  storageBucket: "blogsharezero20garage.firebasestorage.app",
  messagingSenderId: "691838476330",
  appId: "1:691838476330:web:ddd1577da5d67f0233e353",
  measurementId: "G-XG6LVSJ0GB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
