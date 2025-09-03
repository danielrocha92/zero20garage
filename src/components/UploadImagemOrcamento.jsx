import axios from "axios";
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
    if (!selectedFiles.length) {
      setError('Nenhum arquivo selecionado.');
      return;
    }

    // ✅ Adiciona a verificação do orcamentoId
    if (!orcamentoId) {
      setError('O ID do orçamento não foi fornecido.');
      return;
    }

    setUploading(true);
    setError(null);
    let uploadedUrls = [...imagemAtual];

    for (const fileItem of selectedFiles) {
      const formData = new FormData();
      formData.append('file', fileItem.file);
      // ✅ Adiciona o orcamentoId no FormData
      formData.append('orcamentoId', orcamentoId);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/upload-image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Atualiza a lista de URLs com a nova URL
        uploadedUrls.push({ url: response.data.url });

        setSelectedFiles(prev =>
          prev.map(f =>
            f.key === fileItem.key ? { ...f, uploaded: true, error: null } : f
          )
        );

        console.log(`✅ Upload bem-sucedido para o arquivo ${fileItem.file.name}`);

      } catch (err) {
        console.error(`❌ Erro no upload de ${fileItem.file.name}:`, err);
        setError(`Erro ao enviar ${fileItem.file.name}.`);
        setSelectedFiles(prev =>
          prev.map(f =>
            f.key === fileItem.key ? { ...f, uploaded: false, error: 'Falha no envio' } : f
          )
        );
      }
    }

    setUploading(false);
    // Chama a função onUploaded para atualizar o estado no componente pai
    onUploaded(uploadedUrls);
  }, [selectedFiles, orcamentoId, imagemAtual, onUploaded]);

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
