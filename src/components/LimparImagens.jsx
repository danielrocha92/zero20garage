// src/components/LimparImagensVisual.jsx
import React, { useState } from "react";
import axios from "axios";

export default function LimparImagensVisual() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState([]);
  const [erro, setErro] = useState(null);

  const handleLimparImagens = async () => {
    setLoading(true);
    setResultado([]);
    setErro(null);

    try {
      const res = await axios.get("http://localhost:8080/api/orcamentos/limpar-imagens");
      setResultado(res.data.removidas || []);
    } catch (err) {
      console.error("Erro ao limpar imagens:", err);
      setErro("Erro ao limpar imagens. Confira o console para detalhes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Limpar imagens inválidas</h2>
      <button onClick={handleLimparImagens} disabled={loading}>
        {loading ? "Processando..." : "Limpar imagens"}
      </button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {resultado.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Imagens removidas:</h3>
          {resultado.map((orcamento) => (
            <div key={orcamento.id} style={{ marginBottom: "20px" }}>
              <h4>Orçamento: {orcamento.id}</h4>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {orcamento.imagens.map((img) => (
                  <div key={img.public_id} style={{ textAlign: "center" }}>
                    <img
                      src={img.url}
                      alt="Imagem removida"
                      style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ccc" }}
                    />
                    <p style={{ fontSize: "10px" }}>{img.public_id}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
