import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Configuração do Firebase para o frontend
const firebaseConfig = {
  apiKey: "AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz123456",
  authDomain: "zer20garage.firebaseapp.com",
  projectId: "zer20garage",
  storageBucket: "zer20garage.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Inicialização e autenticação do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Função para autenticar o usuário anonimamente
async function authenticateUser() {
  try {
    await signInAnonymously(auth);
    console.log('✅ Usuário autenticado anonimamente.');
  } catch (error) {
    console.error('❌ Erro na autenticação do Firebase:', error);
  }
}

authenticateUser();

export { db, auth, authenticateUser };
