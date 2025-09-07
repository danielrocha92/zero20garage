import axios from "axios";

// Alteração da sintaxe: de import.meta.env para process.env
// E do prefixo: de VITE_ para REACT_APP_
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api-orcamento-n49u.onrender.com",
  timeout: 15000,
});

const baseURL = process.env.REACT_APP_API_BASE_URL;

if (!baseURL) {
  console.error("REACT_APP_API_BASE_URL is not defined!");
}

// Evita “tempestade” de requisições repetidas:
let inFlight = {};
api.interceptors.request.use((config) => {
  const key = `${config.method}:${config.baseURL}${config.url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`;
  if (inFlight[key]) {
    // cancela silenciosamente requisições idênticas enquanto uma já está em voo
    throw new axios.Cancel(`Duplicated request prevented: ${key}`);
  }
  inFlight[key] = true;
  config.metadata = { key };
  return config;
});

api.interceptors.response.use(
  (res) => {
    if (res.config.metadata?.key) delete inFlight[res.config.metadata.key];
    return res;
  },
  (error) => {
    const key = error.config?.metadata?.key;
    if (key) delete inFlight[key];

    if (axios.isCancel(error)) return Promise.reject(error);

    // Limite de requisições
    if (error.response && error.response.status === 429) {
      return Promise.reject(new Error("Limite de requisições atingido. Tente novamente mais tarde."));
    }

    // 404: rota não encontrada, retorna array vazio para não quebrar JSON
    if (error.response && error.response.status === 404) {
      return Promise.resolve({ data: [] });
    }

    return Promise.reject(error);
  }
);

export default api;
