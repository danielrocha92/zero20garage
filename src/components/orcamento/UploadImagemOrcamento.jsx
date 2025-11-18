import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/UploadImagemOrcamento.css';
import { AiOutlineUpload, AiOutlineDelete, AiOutlineEye, AiOutlineClose } from 'react-icons/ai';

const UploadImagemOrcamento = ({ orcamentoId, onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [imagemAtual, setImagemAtual] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const API_BASE_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos';

  const getImageUrl = (img) => img?.imageUrl || img?.url || '';
  const handleImageError = (e) => e.currentTarget.src = 'https://via.placeholder.com/150';

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
    selectedFiles.forEach(file => formData.append('imagens', file));
    try {
      const res = await axios.post(`${API_BASE_URL}/${orcamentoId}/imagens`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        onUploadProgress: (event) => {
          const percent = Math.round((event.loaded * 100) / event.total);
          setProgress(percent);
        },
      });
      const novasImagens = res.data.imagens || [];
      const updatedImages = [...imagemAtual, ...novasImagens];
      setImagemAtual(updatedImages);
      setSelectedFiles([]);
      if (onUploaded) onUploaded(updatedImages);
    } catch (err) {
      console.error('Erro no upload:', err);
      setError(err.response?.data?.erro || 'Erro desconhecido ao enviar imagens.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemoveSelectedFile = (idx) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviewFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveUploadedImage = async (img) => {
    // Mova a declaração da variável para o escopo correto
    const prevImagemAtual = imagemAtual;
    try {
      const identifier = img.public_id || getImageUrl(img);

      const updatedImages = prevImagemAtual.filter(item => getImageUrl(item) !== getImageUrl(img));
      setImagemAtual(updatedImages);

      await axios.delete(`${API_BASE_URL}/${orcamentoId}/imagens/${identifier}`, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      });

      if (onUploaded) onUploaded(updatedImages);
    } catch (err) {
      console.error('Erro ao remover imagem:', err);
      setError('Erro ao remover a imagem.');
      setImagemAtual(prevImagemAtual);
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
                  aria-label="Remover imagem da seleção"
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
                    <AiOutlineEye size={20} className="action-icon" aria-label="Visualizar imagem" onClick={() => setModalImage(imgSrc)} />
                    <AiOutlineDelete
                      size={20}
                      className="action-icon"
                      aria-label="Excluir imagem"
                      onClick={() => handleRemoveUploadedImage(img)}
                    />
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
            <AiOutlineClose size={24} className="modal-close" aria-label="Fechar visualização" onClick={() => setModalImage(null)} />
            <img src={modalImage} alt="Visualização" className="modal-image" onError={handleImageError} />
          </div>
        </div>
      )}

      {error && <p className="upload-error">{error}</p>}
    </div>
  );
};

export default UploadImagemOrcamento;