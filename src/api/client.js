// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api-orcamento-n49u.onrender.com",
  timeout: 15000,
});

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

    // Tratamento especial para 429 vindo do backend
    if (error.response && error.response.status === 429) {
      return Promise.reject(new Error("Limite de requisições atingido. Tente novamente mais tarde."));
    }
    // Cancels não devem aparecer como erro de UI
    if (axios.isCancel(error)) return Promise.reject(error);

    return Promise.reject(error);
  }
);

export default api;
