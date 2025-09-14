import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadImagemOrcamento.css';
import { AiOutlineUpload, AiOutlineDelete, AiOutlineEye, AiOutlineClose } from 'react-icons/ai';

// API URLs
const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos'; // API de orçamentos
const API_UPLOAD_URL = 'https://api-orcamento-n49u.onrender.com/api/upload'; // Ajustado para backend

const UploadImagemOrcamento = ({ orcamentoId, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [imagemAtual, setImagemAtual] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const getImageUrl = (img) => {
    if (!img) return '';
    return img.url || img.imagemUrl || img.uri || '';
  };

  const handleImageError = (e) => {
    e.currentTarget.src = '/placeholder.png';
  };

  // --- Buscar imagens já enviadas ---
  useEffect(() => {
    if (!orcamentoId) return;
    const fetchOrcamento = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/${orcamentoId}`, {
          headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        });
        const validImages = (res.data.imagens || []).filter(img => getImageUrl(img));
        setImagemAtual(validImages);
      } catch (err) {
        console.error('Erro ao buscar imagens do orçamento:', err);
        setError('Não foi possível carregar as imagens deste orçamento.');
      }
    };
    fetchOrcamento();
  }, [orcamentoId, authToken]);

  // --- Preview dos arquivos selecionados ---
  useEffect(() => {
    const objectUrls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewFiles(objectUrls);
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
    setProgress(0);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return;

    setUploading(true);
    setProgress(0);
    setError(null);

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('imagem', file)); // ⚠️ deve bater com backend

    try {
      const res = await axios.post(`${API_UPLOAD_URL}/${orcamentoId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });

      // Atualiza lista de imagens sem perder as existentes
      const novasImagens = res.data.imagemUrl ? [res.data.imagemUrl] : [];
      setImagemAtual(prev => [...prev, ...novasImagens]);

      setSelectedFiles([]);
      if (onUploadSuccess) onUploadSuccess([...imagemAtual, ...novasImagens]);
    } catch (err) {
      console.error('Erro no upload:', err);
      setError(err.response?.data?.error || err.message || 'Erro desconhecido ao enviar imagens.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveSelectedFile = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviewFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveUploadedImage = async (public_id) => {
    try {
      await axios.delete(`${API_UPLOAD_URL}/${orcamentoId}/${public_id}`, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });
      setImagemAtual(prev => prev.filter(img => img.public_id !== public_id));
    } catch (err) {
      console.error('Erro ao remover imagem:', err);
      setError('Erro ao remover a imagem.');
    }
  };

  return (
    <div className="upload-imagem-orcamento">
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

      {uploading && (
        <div className="progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>
      )}

      {previewFiles.length > 0 && (
        <div className="selected-images">
          <h4>Pré-visualização ({previewFiles.length}):</h4>
          <div className="image-list">
            {previewFiles.map((url, idx) => (
              <div key={idx} className="image-item">
                <img
                  src={url}
                  alt={selectedFiles[idx]?.name || `Pré-visualização ${idx + 1}`}
                  className="image-preview"
                  onError={handleImageError}
                />
                <AiOutlineDelete
                  className="delete-icon"
                  onClick={() => handleRemoveSelectedFile(idx)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div className="existing-images">
          <h4>Imagens já enviadas:</h4>
          <div className="image-list">
            {imagemAtual.map((img, idx) => {
              const imgSrc = getImageUrl(img);
              return (
                <div key={img.public_id || idx} className="image-item">
                  <img
                    src={imgSrc}
                    alt={`Imagem ${idx + 1}`}
                    className="image-preview"
                    onClick={() => setModalImage(imgSrc)}
                    onError={handleImageError}
                  />
                  <div className="image-actions">
                    <AiOutlineEye
                      size={20}
                      className="action-icon"
                      onClick={() => setModalImage(imgSrc)}
                    />
                    {img.public_id && (
                      <AiOutlineDelete
                        size={20}
                        className="action-icon"
                        onClick={() => handleRemoveUploadedImage(img.public_id)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {modalImage && (
        <div className="modal-overlay" onClick={() => setModalImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <AiOutlineClose
              size={24}
              className="modal-close"
              onClick={() => setModalImage(null)}
            />
            <img
              src={modalImage}
              alt="Visualização"
              className="modal-image"
              onError={handleImageError}
            />
          </div>
        </div>
      )}

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

export default UploadImagemOrcamento;
