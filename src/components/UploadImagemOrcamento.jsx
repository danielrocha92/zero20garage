import React, { useState } from "react";
import "./UploadImagemOrcamento.css";

const API_BASE_URL = "https://api-orcamento-n49u.onrender.com/api/orcamentos";

const UploadImagemOrcamento = ({ orcamentoId, authToken, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  // --- Upload de novas imagens ---
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Cria URLs locais para preview
    const filesWithPreview = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
    }));
    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);

    if (!orcamentoId) return; // apenas preview se não houver ID

    setUploading(true);
    try {
      const form = new FormData();
      files.forEach((f) => form.append("files", f));

      const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens`, {
        method: "POST",
        body: form,
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.images) {
        // Adiciona as novas imagens de forma segura
        onUploaded?.((prev) => [...(prev || []), ...data.images]);
      } else {
        console.error("Erro no upload:", data || "Resposta inválida do servidor");
      }
    } catch (err) {
      console.error("Falha no upload:", err);
    } finally {
      setUploading(false);
    }
  };

  // --- Excluir imagens selecionadas antes do upload ---
  const handleDeleteSelected = (key) => {
    setSelectedFiles((prev) => {
      const updated = prev.filter((f) => {
        if (f.key === key) URL.revokeObjectURL(f.preview);
        return f.key !== key;
      });
      return updated;
    });
  };

  // --- Excluir imagens já enviadas ---
  const handleDeleteUploaded = async (img) => {
    if (!orcamentoId || !img.public_id) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens/${img.public_id}`, {
        method: "DELETE",
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
      });

      if (res.ok) {
        onUploaded?.((prev) => (prev || []).filter((i) => i.public_id !== img.public_id));
      } else {
        const text = await res.text();
        console.error("Erro ao excluir imagem:", text);
      }
    } catch (err) {
      console.error("Falha na exclusão:", err);
    }
  };

  return (
    <div className="upload-imagem-orcamento">
      <input
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {uploading && <p className="loading-message">Enviando imagem(s)...</p>}

      {selectedFiles.length > 0 && (
        <div className="selected-images">
          <h4>Pré-visualização ({selectedFiles.length}):</h4>
          <div className="image-list">
            {selectedFiles.map((f) => (
              <div key={f.key} className="image-item">
                <img src={f.preview} alt={f.file.name} className="image-preview" />
                <button type="button" className="btn-delete" onClick={() => handleDeleteSelected(f.key)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div className="existing-images">
          <h4>Imagens já enviadas:</h4>
          <div className="image-list">
            {imagemAtual.map((img) => (
              <div key={img.public_id} className="image-item">
                <img src={img.url} alt={`Imagem ${img.public_id}`} className="image-preview" />
                <button type="button" className="btn-delete" onClick={() => handleDeleteUploaded(img)}>
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;
