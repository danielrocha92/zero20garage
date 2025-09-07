// src/hooks/useOrcamentos.js
import { useState, useEffect, useRef, useCallback } from "react";
import api from "../api/client";

// TTL do cache (1 minuto)
const TTL_MS = 60 * 1000;

// Cache simples em memória
const cache = {
  data: null,
  timestamp: 0,
};

// Hook de debounce
function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function useOrcamentos({ search = "", page = 1, limit = 10, autoRefreshMs = 0 } = {}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebouncedValue(search, 500);
  const mountedRef = useRef(false);

  const fetchData = useCallback(async ({ force = false } = {}) => {
    const now = Date.now();

    // Usa cache se válido
    if (!force && cache.data && now - cache.timestamp < TTL_MS && !debouncedSearch) {
      setData(cache.data);
      setTotalPages(Math.ceil(cache.data.length / limit));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.get("/hooks/useOrcamentos", {
        params: { search: debouncedSearch, page, limit },
      });

      const fetchedData = res.data.data || res.data || [];

      setData(fetchedData);
      setTotalPages(Math.ceil(fetchedData.length / limit));

      // Atualiza cache apenas se não estiver buscando
      if (!debouncedSearch) {
        cache.data = fetchedData;
        cache.timestamp = Date.now();
      }
    } catch (err) {
      if (err.response?.status === 429 || err.message?.includes("RESOURCE_EXHAUSTED")) {
        setError("Limite de requisições atingido. Tente novamente mais tarde.");
      } else {
        setError(err.message || "Erro ao carregar dados");
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, limit]);

  // Fetch inicial e quando search/page mudar
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      fetchData({ force: false });
    } else {
      fetchData({ force: true });
    }
  }, [fetchData]);

  // Auto-refresh, se configurado
  useEffect(() => {
    if (!autoRefreshMs) return;
    const id = setInterval(() => fetchData({ force: true }), autoRefreshMs);
    return () => clearInterval(id);
  }, [autoRefreshMs, fetchData]);

  return { data, loading, error, totalPages, refetch: () => fetchData({ force: true }) };
}
