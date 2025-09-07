import { useState } from "react";
import Layout from "../../components/Layout";
import { useOrcamentos } from "../../hooks/useOrcamentos";

const ITEMS_PER_PAGE = 10;

export default function OrcamentoLista() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

const { data, loading, error, refetch, totalPages } = useOrcamentos({
  search: query,
  page,
  limit: ITEMS_PER_PAGE,
  autoRefreshMs: 60000,
});


  const handlePrev = () => setPage(p => Math.max(1, p - 1));
  const handleNext = () => setPage(p => p + 1);

  return (
    <Layout>
      <div style={{ padding: 16 }}>
        <h1>Orçamentos</h1>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="Buscar por cliente..."
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
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
              {data.map(o => (
                <li key={o.id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                  <strong>{o.cliente || "Sem nome"}</strong>
                  <div>ID: {o.id}</div>
                  <div>Total: {o.valorTotal ?? "-"}</div>
                  <div>Data: {o.data ?? "-"}</div>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                <button onClick={handlePrev} disabled={page === 1}>Anterior</button>
                    <span>Página {page} de {totalPages}</span>
                <button onClick={handleNext} disabled={page === totalPages}>Próxima</button>
            </div>

          </>
        )}
      </div>
    </Layout>
  );
}
