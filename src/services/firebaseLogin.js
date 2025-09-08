// Importar as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// A configuração do seu projeto Firebase.
// Esta é a mesma configuração que você forneceu.
const firebaseConfig = {
  apiKey: "AIzaSyDZEG2BIV8nLF27usGvE3FwWLW1aNfLCMk",
  authDomain: "zero20garage-10bc0.firebaseapp.com",
  projectId: "zero20garage-10bc0",
  storageBucket: "zero20garage-10bc0.firebasestorage.app",
  messagingSenderId: "436903228814",
  appId: "1:436903228814:web:b1dbd8aa5ad0549312a0df",
  measurementId: "G-6YVS5KNQXF"
};

// Inicializa o Firebase App com a sua configuração.
const app = initializeApp(firebaseConfig);

// Obtém a instância do serviço de autenticação.
const auth = getAuth(app);

/**
 * Função para realizar o login anônimo do usuário.
 * Útil para permitir que os usuários interajam com a aplicação
 * sem a necessidade de criar uma conta.
 * @returns {Promise<UserCredential>} - Promessa que resolve com as credenciais do usuário.
 */
export async function loginAnonymously() {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Usuário autenticado anonimamente:", userCredential.user);
    // Você pode retornar as credenciais para uso posterior.
    return userCredential;
  } catch (error) {
    console.error("Erro ao fazer login anônimo:", error);
    // Você pode tratar o erro de forma mais detalhada aqui.
    throw error;
  }
}

// Exemplo de uso:
// Para usar esta função em outro arquivo JavaScript, você faria:
// import { loginAnonymously } from './firebaseLogin.js';
//
// async function main() {
//   try {
//     const userCredential = await loginAnonymously();
//     // Agora você pode usar o objeto userCredential para interagir com o Firestore, por exemplo.
//   } catch (error) {
//     // Lida com o erro de login
//   }
// }
//
// main();
