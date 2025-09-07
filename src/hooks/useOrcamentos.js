import { useState, useEffect, useCallback } from "react";
import api from "../api/client";

export function useOrcamentos({ search = "", page = 1, limit = 10, autoRefreshMs = 0 } = {}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrcamentos = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = { search, page, limit };
      const res = await api.get("/api/orcamentos", { params });

      // backend deve retornar { orcamentos: [...], totalCount: 123 }
      setData(res.data.orcamentos || []);
      const totalCount = res.data.totalCount || 0;
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (e) {
      setError(
        e.response?.status === 429 || e.message?.includes("Limite de requisições")
          ? "Limite de requisições atingido. Tente novamente mais tarde."
          : e.message
      );
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  // fetch inicial e ao mudar search/page
  useEffect(() => {
    fetchOrcamentos();
  }, [fetchOrcamentos]);

  // auto-refresh
  useEffect(() => {
    if (!autoRefreshMs) return;
    const id = setInterval(fetchOrcamentos, autoRefreshMs);
    return () => clearInterval(id);
  }, [fetchOrcamentos, autoRefreshMs]);

  return { data, loading, error, totalPages, refetch: fetchOrcamentos };
}
