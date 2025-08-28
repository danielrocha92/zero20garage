// src/services/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import firebaseConfig from '../firebase/config';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default app;
