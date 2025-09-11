import React, { useState } from 'react';
import './UploadImagemOrcamento.css';
import { AiOutlineUpload, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';  // Ícones para upload, excluir e visualizar

const UploadImagemOrcamento = ({ orcamentoId, authToken, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // Para controlar a barra de progresso

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSelectedFiles(files);
    setProgress(0);

    if (!orcamentoId) return; // sem orçamento vinculado, apenas preview
    setUploading(true);

    const form = new FormData();
    files.forEach((f) => form.append('file', f));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'https://api-orcamento-n49u.onrender.com'}/api/orcamentos/${orcamentoId}/imagens`,
        {
          method: 'POST',
          body: form,
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
        }
      );

      if (!res.ok) {
        console.error('Erro no upload:', await res.text());
        return;
      }

      const data = await res.json();
      if (res.ok) {
        onUploaded?.(data); // Retorna imagens atualizadas
      }
    } catch (err) {
      console.error('Falha no upload:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-imagem-orcamento">
      {/* Área de upload */}
      <label htmlFor="file-upload" className="dropzone">
        <AiOutlineUpload size={40} />
        <span>{uploading ? 'Enviando imagens...' : 'Clique aqui'}</span>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {/* Exibição do progresso de upload */}
      {uploading && <div className="progress-bar"><div style={{ width: `${progress}%` }} /></div>}

      {/* Pré-visualização das imagens selecionadas */}
      {selectedFiles.length > 0 && (
        <div className="selected-images">
          <h4>Pré-visualização ({selectedFiles.length}):</h4>
          <div className="image-list">
            {selectedFiles.map((f, idx) => {
              const objectUrl = URL.createObjectURL(f);
              return (
                <div key={idx} className="image-item">
                  <img
                    src={objectUrl}
                    alt={f.name}
                    className="image-preview"
                    onLoad={() => URL.revokeObjectURL(objectUrl)}
                  />
                  <AiOutlineDelete className="delete-icon" onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exibição das imagens já enviadas */}
      {imagemAtual.length > 0 && (
        <div className="existing-images">
          <h4>Imagens já enviadas:</h4>
          <div className="image-list">
            {imagemAtual.map((img, idx) => (
              <div key={img.public_id || img.url || idx} className="image-item">
                <img
                  src={img.url || img.uri || img}
                  alt={`Imagem ${idx + 1}`}
                  className="image-preview"
                />
                <div className="image-actions">
                  <AiOutlineEye size={20} className="action-icon" />
                  <AiOutlineDelete size={20} className="action-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;
