// src/components/UploadImagemOrcamento.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './UploadImagemOrcamento.css';
import { AiOutlineUpload, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

// URL base do backend para upload de imagens de orçamentos
const API_BASE_URL = 'https://zero20-upload-api.onrender.com/api/orcamentos';

const UploadImagemOrcamento = ({ orcamentoId, onUploadSuccess, imagemAtual = [] }) => {
  // Estado local
  const [selectedFiles, setSelectedFiles] = useState([]); // arquivos escolhidos mas ainda não enviados
  const [uploading, setUploading] = useState(false);      // indica se está enviando
  const [progress, setProgress] = useState(0);           // progresso do upload em %
  const [error, setError] = useState(null);             // mensagem de erro

  // Pega o token de autenticação do localStorage
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  /** Seleção de arquivos */
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setProgress(0);
    setError(null);
  };

  /** Upload de arquivos para o backend / Cloudinary */
  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    // Cria FormData para envio multipart/form-data
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('imagens', file));

    try {
      const res = await axios.post(
        `${API_BASE_URL}/${orcamentoId}/imagens`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        }
      );

      // Limpa os arquivos selecionados e envia para o componente pai
      setSelectedFiles([]);
      if (onUploadSuccess) onUploadSuccess(res.data.files);
    } catch (err) {
      console.error('Erro no upload:', err);
      setError(
        err.response?.data?.error ||
        err.message ||
        'Erro desconhecido ao enviar imagens.'
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  /** Remover arquivo ainda não enviado */
  const handleRemoveSelectedFile = (idx) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="upload-imagem-orcamento">
      {/* Área de upload */}
      <div className="upload-area">
        <label htmlFor="file-upload" className="dropzone">
          <AiOutlineUpload size={40} />
          <span>{uploading ? 'Enviando...' : 'Clique para selecionar'}</span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFiles.length}
          className="upload-btn"
        >
          {uploading ? 'Enviando...' : 'Enviar Imagens'}
        </button>
      </div>

      {/* Barra de progresso */}
      {uploading && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Pré-visualização das imagens selecionadas */}
      {selectedFiles.length > 0 && (
        <div className="selected-images">
          <h4>Pré-visualização ({selectedFiles.length}):</h4>
          <div className="image-list">
            {selectedFiles.map((file, idx) => {
              const objectUrl = URL.createObjectURL(file);
              return (
                <div key={idx} className="image-item">
                  <img
                    src={objectUrl}
                    alt={file.name}
                    className="image-preview"
                    onLoad={() => URL.revokeObjectURL(objectUrl)}
                  />
                  <AiOutlineDelete
                    className="delete-icon"
                    onClick={() => handleRemoveSelectedFile(idx)}
                  />
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

      {/* Mensagem de erro */}
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

export default UploadImagemOrcamento;
