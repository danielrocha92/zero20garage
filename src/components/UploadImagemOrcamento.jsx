import React, { useState } from 'react';
import './UploadImagemOrcamento.css';

const UploadImagemOrcamento = ({ orcamentoId, authToken, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSelectedFiles(files);

    if (!orcamentoId) return; // sem orçamento vinculado, apenas preview
    setUploading(true);

    try {
      const form = new FormData();
      files.forEach(f => form.append('file', f)); // O nome do campo de arquivo é 'file', não 'imagem'

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL || 'https://api-orcamento-n49u.onrender.com'}/api/orcamentos/${orcamentoId}/imagens`,
        {
          method: 'POST',
          body: form,
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : undefined,
        }
      );

      // lê como texto primeiro
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text); // tenta converter em JSON
      } catch {
        console.error('Resposta do servidor não é JSON:', text);
        // Em vez de alert(), que não funciona bem no Canvas, vamos usar um console.error
        console.error('Falha no upload: resposta inválida do servidor. Veja console.');
        return;
      }

      if (res.ok) {
        onUploaded?.(data); // retorna imagens atualizadas
      } else {
        console.error('Erro no upload:', data);
        // Em vez de alert(), que não funciona bem no Canvas, vamos usar um console.error
        console.error(`Erro no upload: ${data?.msg || data?.error || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error('Falha no upload:', err);
      // Em vez de alert(), que não funciona bem no Canvas, vamos usar um console.error
      console.error('Falha no upload de imagens. Veja console.');
    } finally {
      setUploading(false);
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div className="existing-images">
          <h4>Imagens já enviadas:</h4>
          <div className="image-list">
            {imagemAtual.map((img, idx) => (
              <div key={img.public_id || img.url || idx} className="image-item">
                <img src={img.url || img.uri || img} alt={`Imagem ${idx + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;
