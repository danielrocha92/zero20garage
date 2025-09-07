import { useState } from "react";
import Layout from "../../components/Layout";
import { useOrcamentos } from "../../hooks/useOrcamentos";

export default function OrcamentoLista() {
  const [query, setQuery] = useState("");

  // Hook atualizado com startAfter
  const { data, loading, error, refetch, loadMore, hasMore } = useOrcamentos({
    search: query,
    pageSize: 10,
    autoRefreshMs: 60000,
  });

  return (
    <Layout>
      <div style={{ padding: 16 }}>
        <h1>Orçamentos</h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="Buscar por cliente..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: 8, minWidth: 240 }}
          />
          <button onClick={refetch}>Atualizar</button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        {!loading && data.length === 0 && <p>Nenhum orçamento encontrado.</p>}

        {data.length > 0 && (
          <>
            <ul style={{ display: "grid", gap: 8, listStyle: "none", padding: 0 }}>
              {data.map((o) => (
                <li key={o.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                  <strong>{o.cliente || "Sem nome"}</strong>
                  <div>ID: {o.id}</div>
                  <div>Total: {o.total ?? "-"}</div>
                  <div>Data: {o.data ?? "-"}</div>
                </li>
              ))}
            </ul>

            {hasMore && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                <button onClick={loadMore} disabled={loading}>
                  {loading ? "Carregando..." : "Carregar mais"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
