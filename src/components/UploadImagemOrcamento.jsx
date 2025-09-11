import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import axios from 'axios';
import './UploadImagemOrcamento.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  // --- Revoke object URLs quando desmonta ---
  useEffect(() => {
    return () => {
      // Limpa os arquivos selecionados
      selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
      // Limpa os arquivos já enviados
      imagemAtual.forEach(f => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    }
  }, [selectedFiles, imagemAtual]);

  const fetchImagens = useCallback(async () => {
    if (!orcamentoId) return;
    try {
      const res = await axios.get(`${API_BASE_URL}/api/upload/${orcamentoId}`);
      onUploaded(res.data);
    } catch (err) {
      console.error("Erro ao buscar imagens:", err);
    }
  }, [orcamentoId, onUploaded]);

  // --- Carregar imagens existentes ao editar ---
  useEffect(() => {
    fetchImagens();
  }, [fetchImagens]);

  // --- Drag & Drop ---
  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const handleDragOver = e => { e.preventDefault(); dropArea.classList.add("drag-over"); };
    const handleDragLeave = () => dropArea.classList.remove("drag-over");
    const handleDrop = e => {
      e.preventDefault();
      dropArea.classList.remove("drag-over");
      handleFiles(Array.from(e.dataTransfer.files || []));
    };

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver);
      dropArea.removeEventListener("dragleave", handleDragLeave);
      dropArea.removeEventListener("drop", handleDrop);
    };
  }, []);

  const handleFiles = (files) => {
    if (!files.length) return;
    const filesWithPreview = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
      uploaded: false,
      progress: 0,
      error: null
    }));
    setSelectedFiles(prev => [...prev, ...filesWithPreview]);
  };

  const handleFileChange = (event) => handleFiles(Array.from(event.target.files || []));

  // --- Upload ---
  const handleUploadAll = useCallback(async () => {
    if (!selectedFiles.length || !orcamentoId) return;
    setUploading(true);
    let allUploadedFiles = [...imagemAtual];

    for (const fileItem of selectedFiles) {
      const formData = new FormData();
      formData.append("files", fileItem.file);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/upload/${orcamentoId}`, formData, {
          onUploadProgress: progressEvent => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setSelectedFiles(prev =>
              prev.map(f => f.key === fileItem.key ? { ...f, progress: percent } : f)
            );
          }
        });

        allUploadedFiles = [...allUploadedFiles, ...response.data];

        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: true, progress: 100, error: null } : f)
        );

      } catch (err) {
        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: false, error: "Falha no envio" } : f)
        );
      }
    }

    onUploaded(allUploadedFiles);
    setSelectedFiles([]); // Limpa a lista de arquivos selecionados
    setUploading(false);
  }, [selectedFiles, orcamentoId, imagemAtual, onUploaded]);

  const handleDeleteSelected = useCallback(key => {
    setSelectedFiles(prev => prev.filter(f => {
      if (f.key === key) URL.revokeObjectURL(f.preview);
      return f.key !== key;
    }));
  }, []);

  const handleDeleteUploaded = useCallback(async img => {
    if (!orcamentoId || !img.public_id) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/upload/${orcamentoId}/${img.public_id}`);
      onUploaded(prev => prev.filter(i => i.public_id !== img.public_id));
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  }, [orcamentoId, onUploaded]);

  return (
    <div className="upload-imagem-orcamento">
      {/* Dropzone */}
      <div
        ref={dropRef}
        className="dropzone"
        onClick={() => {
          const input = dropRef.current?.querySelector('input[type="file"]');
          if (input) input.click();
        }}
      >
        <AiOutlinePlus size={32} />
        <span>Arraste e solte imagens ou clique aqui</span>
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
              <img src={f.preview} alt={f.file?.name || "Pré-visualização"} />
              <div className="progress-bar">
                <div style={{ width: `${f.progress}%` }} />
              </div>
              {!f.uploaded && !f.error && (
                <button className="btn-delete" onClick={() => handleDeleteSelected(f.key)}>Cancelar</button>
              )}
              {f.error && <span className="upload-error">{f.error}</span>}
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
              <img src={img.url} alt="Imagem enviada" />
              <button className="btn-delete" onClick={() => handleDeleteUploaded(img)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;