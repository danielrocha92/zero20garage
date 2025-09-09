// src/components/UploadImagemOrcamento.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "./UploadImagemOrcamento.css";

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded, apiBaseUrl }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  // --- Revoke object URLs quando desmonta ---
  useEffect(() => {
    return () => selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // --- Carregar imagens existentes ao editar ---
  useEffect(() => {
    if (!orcamentoId) return;
    const fetchImagens = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/api/upload/${orcamentoId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const normalizedData = data.map(img => ({
          url: img.url,
          public_id: img.public_id,
        }));
        onUploaded(normalizedData);
      } catch (error) {
        console.error("Erro ao buscar imagens existentes:", error);
      }
    };
    fetchImagens();
  }, [orcamentoId, apiBaseUrl, onUploaded]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [
      ...prevFiles,
      ...files.map(file => ({
        key: URL.createObjectURL(file), // Usar URL como key
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
      })),
    ]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDeleteSelected = (key) => {
    setSelectedFiles(prevFiles => prevFiles.filter(f => f.key !== key));
  };

  const handleUploadAll = async () => {
    setUploading(true);
    const formData = new FormData();

    selectedFiles.filter(f => !f.uploaded).forEach(f => {
      formData.append('files', f.file);
    });

    try {
      const response = await axios.post(`${apiBaseUrl}/api/upload/${orcamentoId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setSelectedFiles(prevFiles =>
            prevFiles.map(f => (f.uploaded || f.error ? f : { ...f, progress }))
          );
        },
      });

      if (response.status === 200) {
        const uploadedImages = response.data.files;
        onUploaded(uploadedImages);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setSelectedFiles(prevFiles =>
        prevFiles.map(f => (f.uploaded ? f : { ...f, error: true }))
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteUploaded = async (publicId) => {
    try {
      await axios.delete(`${apiBaseUrl}/api/upload/${orcamentoId}/${publicId}`);
      onUploaded(imagemAtual.filter(img => img.public_id !== publicId));
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Imagens do Orçamento</h2>

      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        ref={dropRef}
      >
        <AiOutlinePlus size={24} />
        <p>Arraste e solte ou clique para adicionar imagens</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={uploading}
        />
      </div>

      {/* Pré-visualização */}
      {selectedFiles.length > 0 && (
        <div className="image-list">
          {selectedFiles.map(f => (
            <div key={f.key} className="image-item">
              <img src={f.preview} alt={f.file.name || "Pré-visualização"} />
              <div className="progress-bar">
                <div style={{ width: `${f.progress}%` }} />
              </div>
              {!f.uploaded && !f.error && (
                <button className="btn-delete" onClick={() => handleDeleteSelected(f.key)}>Cancelar</button>
              )}
            </div>
          ))}
          <button
            onClick={handleUploadAll}
            disabled={uploading || selectedFiles.every(f => f.uploaded || f.error)}
          >
            {uploading ? "Enviando..." : "Enviar todas"}
          </button>
        </div>
      )}

      {/* Imagens já enviadas */}
      {imagemAtual.length > 0 && (
        <div className="existing-images">
          {imagemAtual.map(img => (
            <div key={img.public_id} className="image-item">
              <img src={img.url} alt={`Imagem enviada`} />
              <button className="btn-delete" onClick={() => handleDeleteUploaded(img.public_id)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;