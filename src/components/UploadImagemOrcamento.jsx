// src/components/UploadImagemOrcamento.jsx
import { useState, useEffect, useCallback } from "react";
import "./UploadImagemOrcamento.css";

const API_BASE_URL = "https://api-orcamento-n49u.onrender.com/api/orcamentos";

const UploadImagemOrcamento = ({ orcamentoId, authToken, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Limpa previews quando o componente desmonta
  useEffect(() => {
    return () => {
      selectedFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [selectedFiles]);

  const handleFileChange = useCallback(
    async (event) => {
      const files = Array.from(event.target.files || []);
      if (!files.length) return;

      const filesWithPreview = files.map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
        key: f.name + "-" + Date.now() + "-" + Math.random(),
      }));

      setSelectedFiles((prev) => [...prev, ...filesWithPreview]);

      // 🚫 Se não houver orcamentoId ou authToken, apenas exibe pré-visualização
      if (!orcamentoId || !authToken) {
        setError("Crie o orçamento antes de enviar imagens.");
        return;
      }

      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        files.forEach((f) => formData.append("files", f));

        const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens`, {
          method: "POST",
          body: formData,
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          data = null;
        }

        if (res.ok && data?.images) {
          onUploaded?.((prev) => [...(prev || []), ...data.images]);
        } else {
          switch (res.status) {
            case 404:
              setError("Rota de upload não encontrada. Verifique o backend.");
              break;
            case 401:
            case 403:
              setError("Você não tem permissão para enviar imagens.");
              break;
            default:
              setError("Erro ao enviar imagens. Verifique sua conexão e tente novamente.");
          }
          console.error("Erro no upload:", res.status, data || text);
        }
      } catch (err) {
        console.error("Falha no upload:", err);
        setError("Falha ao enviar imagens. Verifique sua conexão.");
      } finally {
        setUploading(false);
      }
    },
    [orcamentoId, authToken, onUploaded]
  );

  const handleDeleteSelected = (key) => {
    setSelectedFiles((prev) => {
      const updated = prev.filter((f) => {
        if (f.key === key) URL.revokeObjectURL(f.preview);
        return f.key !== key;
      });
      return updated;
    });
  };

  const handleDeleteUploaded = async (img) => {
    if (!orcamentoId || !img.public_id || !authToken) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens/${img.public_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        onUploaded?.((prev) => (prev || []).filter((i) => i.public_id !== img.public_id));
      } else {
        const text = await res.text();
        setError(`Erro ao excluir imagem: ${text}`);
        console.error("Erro ao excluir imagem:", text);
      }
    } catch (err) {
      console.error("Falha na exclusão:", err);
      setError("Falha ao excluir a imagem. Verifique sua conexão.");
    }
  };

  return (
    <div className="upload-imagem-orcamento p-6 rounded-lg shadow-md border-2 border-gray-200 max-w-md mx-auto my-8 bg-gray-100">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Imagens do Veículo</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        disabled={uploading}
        className="mb-4"
      />

      {uploading && <p className="text-center text-blue-500 mb-2">Enviando imagem(s)...</p>}
      {error && <p className="text-center text-red-500 mb-2">{error}</p>}

      {selectedFiles.length > 0 && (
        <div className="selected-images mb-4">
          <h4>Pré-visualização ({selectedFiles.length}):</h4>
          <div className="image-list grid grid-cols-2 gap-4">
            {selectedFiles.map((f) => (
              <div key={f.key} className="image-item relative">
                <img src={f.preview} alt={f.file.name} className="image-preview w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  onClick={() => handleDeleteSelected(f.key)}
                >
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
          <div className="image-list grid grid-cols-2 gap-4">
            {imagemAtual.map((img) => (
              <div key={img.public_id} className="image-item relative">
                <img src={img.url} alt={`Imagem ${img.public_id}`} className="image-preview w-full h-32 object-cover rounded" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
                  onClick={() => handleDeleteUploaded(img)}
                >
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
