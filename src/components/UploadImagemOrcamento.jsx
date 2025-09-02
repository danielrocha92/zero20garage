import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = "https://api-orcamento-n49u.onrender.com/api/orcamentos";

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // Upload
  const handleFileChange = useCallback(async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const filesWithPreview = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
    }));
    setSelectedFiles(prev => [...prev, ...filesWithPreview]);

    if (!orcamentoId) {
      setError("Crie o orçamento antes de enviar imagens.");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(f => formData.append("files", f));

      const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data?.images) {
        onUploaded?.(prev => [...(prev || []), ...data.images]);
      } else {
        setError(data.message || "Erro ao enviar imagens");
      }
    } catch (err) {
      console.error("Falha no upload:", err);
      setError("Falha ao enviar imagens. Verifique sua conexão.");
    } finally {
      setUploading(false);
    }
  }, [orcamentoId, onUploaded]);

  // Excluir pré-visualização
  const handleDeleteSelected = key => {
    setSelectedFiles(prev => prev.filter(f => {
      if (f.key === key) URL.revokeObjectURL(f.preview);
      return f.key !== key;
    }));
  };

  // Excluir imagem já enviada
  const handleDeleteUploaded = async img => {
    if (!orcamentoId || !img.public_id) return;

    try {
      const res = await fetch(`${API_BASE_URL}/${orcamentoId}/imagens/${img.public_id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onUploaded?.(prev => (prev || []).filter(i => i.public_id !== img.public_id));
      } else {
        const data = await res.json();
        setError(data.message || "Erro ao excluir imagem");
      }
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
      setError("Falha ao excluir imagem. Verifique sua conexão.");
    }
  };

  return (
    <div className="upload-imagem-orcamento">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>Enviando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {selectedFiles.length > 0 && (
        <div>
          <h4>Pré-visualização:</h4>
          {selectedFiles.map(f => (
            <div key={f.key}>
              <img src={f.preview} alt={f.file.name} width={100} />
              <button onClick={() => handleDeleteSelected(f.key)}>Excluir</button>
            </div>
          ))}
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div>
          <h4>Imagens enviadas:</h4>
          {imagemAtual.map(img => (
            <div key={img.public_id}>
              <img src={img.url} alt={img.public_id} width={100} />
              <button onClick={() => handleDeleteUploaded(img)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;