import { useState, useEffect, useCallback } from "react";

// ✅ API base pega da variável de ambiente injetada pelo React
// Use .env.local com REACT_APP_API_BASE
const API_BASE_URL = (() => {
  // fallback seguro
  try {
    return process.env.REACT_APP_API_BASE || "http://localhost:8080";
  } catch {
    return "http://localhost:8080";
  }
})();

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Limpar URLs de preview quando o componente desmontar
  useEffect(() => {
    return () => selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // Selecionar arquivos
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const filesWithPreview = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
      progress: 0,
      uploaded: false,
      error: null
    }));

    setSelectedFiles(prev => [...prev, ...filesWithPreview]);
  };

  // Upload de todos os arquivos selecionados
  const handleUploadAll = useCallback(async () => {
    if (!orcamentoId) {
      setError("Crie o orçamento antes de enviar imagens.");
      return;
    }

    setUploading(true);
    setError(null);

    const updatedFiles = [...selectedFiles];

    for (let i = 0; i < updatedFiles.length; i++) {
      const f = updatedFiles[i];
      if (f.uploaded) continue;

      const formData = new FormData();
      formData.append("files", f.file);

      try {
        const res = await fetch(`${API_BASE_URL}/upload/${orcamentoId}`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro no servidor");
        }

        const data = await res.json();

        if (data?.images && data.images.length > 0) {
          f.uploaded = true;
          f.progress = 100;
          onUploaded?.(prev => [...(prev || []), ...data.images]);
        } else {
          f.error = data.message || "Erro ao enviar imagem";
        }
      } catch (err) {
        console.error("Falha no upload:", err);
        f.error = "Falha ao enviar imagem. Verifique sua conexão.";
      }

      setSelectedFiles([...updatedFiles]);
    }

    setUploading(false);
  }, [orcamentoId, onUploaded, selectedFiles]);

  // Excluir arquivo selecionado antes do envio
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
      const res = await fetch(`${API_BASE_URL}/upload/${orcamentoId}/${img.public_id}`, {
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

      {selectedFiles.length > 0 && (
        <div>
          <h4>Pré-visualização:</h4>
          {selectedFiles.map(f => (
            <div key={f.key} style={{ marginBottom: '10px' }}>
              <img src={f.preview} alt={f.file.name} width={100} style={{ marginRight: '10px' }} />
              {f.uploaded ? (
                <span style={{ color: 'green' }}>Enviado ✅</span>
              ) : f.error ? (
                <span style={{ color: 'red' }}>{f.error}</span>
              ) : (
                <span>Pronto para enviar</span>
              )}
              <button onClick={() => handleDeleteSelected(f.key)} disabled={uploading} style={{ marginLeft: '10px' }}>Excluir</button>
            </div>
          ))}

          <button onClick={handleUploadAll} disabled={uploading} style={{ marginTop: '10px' }}>
            {uploading ? 'Enviando...' : 'Enviar todas as imagens'}
          </button>
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div>
          <h4>Imagens enviadas:</h4>
          {imagemAtual.map(img => (
            <div key={img.public_id} style={{ marginBottom: '10px' }}>
              <img src={img.url} alt={img.public_id} width={100} style={{ marginRight: '10px' }} />
              <button onClick={() => handleDeleteUploaded(img)}>Excluir</button>
            </div>
          ))}
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImagemOrcamento;
