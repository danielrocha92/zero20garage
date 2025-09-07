import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Variáveis globais fornecidas pelo ambiente Canvas.
// Elas são necessárias para a inicialização do Firebase.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Lógica de Autenticação
const authenticateUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Usuário já está autenticado, resolve a promessa
        resolve(user);
      } else {
        try {
          // Tenta autenticar o usuário com o token personalizado ou anonimamente
          if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
          } else {
            await signInAnonymously(auth);
          }
          resolve(auth.currentUser);
        } catch (error) {
          console.error("Erro na autenticação:", error);
          reject(error);
        }
      }
    });
  });
};

// Exporta as instâncias de db e auth para serem usadas em outros componentes
export { db, auth, authenticateUser };
