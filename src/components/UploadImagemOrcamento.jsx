import React, { useState, useEffect, useCallback, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "./UploadImagemOrcamento.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

// Limites
const MAX_FILE_SIZE_MB = 5; // 5 MB por arquivo
const MAX_FILES = 5; // Limite de arquivos para envio

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  // --- Definição de handleFiles com useCallback ---
  const handleFiles = useCallback((files) => {
    if (!files.length) return;

    // Filtrando arquivos inválidos (tipo e tamanho)
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith("image/");
      const isSizeOk = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024; // Limite de tamanho
      return isImage && isSizeOk;
    });

    if (selectedFiles.length + validFiles.length > MAX_FILES) {
      alert(`Limite de ${MAX_FILES} arquivos por upload`);
      return;
    }

    const filesWithPreview = validFiles.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
      uploaded: false,
      progress: 0,
      error: null
    }));

    setSelectedFiles(prev => [...prev, ...filesWithPreview]);
  }, [selectedFiles]); // A função `handleFiles` agora depende de `selectedFiles`.

  // --- Revoke object URLs quando desmonta ---
  useEffect(() => {
    return () => selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // --- Carregar imagens existentes ao editar ---
  useEffect(() => {
    if (!orcamentoId) return;

    const fetchImagens = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/upload/${orcamentoId}`);

        if (!res.ok) {
          const errorText = await res.text();
          console.error(`Erro ao buscar imagens: ${res.status} - ${errorText}`);
          onUploaded([]); // Evita travar a tela
          return;
        }

        const data = await res.json();
        onUploaded(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error("Erro de rede ou JSON inválido ao buscar imagens:", err);
        onUploaded([]); // Mantém consistência mesmo em erro
      }
    };

    fetchImagens();
  }, [orcamentoId, onUploaded]);

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
  }, [handleFiles]); // Agora `handleFiles` é uma dependência.

  const handleFileChange = (event) => handleFiles(Array.from(event.target.files || []));

  // --- Upload ---
  const handleUploadAll = useCallback(async () => {
    if (!selectedFiles.length || !orcamentoId) return;
    setUploading(true);
    let uploadedUrls = [...imagemAtual];

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

        uploadedUrls = [...uploadedUrls, ...response.data.files];

        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: true, progress: 100, error: null } : f)
        );

      } catch (err) {
        console.error("Erro ao fazer upload:", err);
        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: false, error: "Falha" } : f)
        );
      }
    }

    onUploaded(uploadedUrls);
    setUploading(false);
  }, [selectedFiles, orcamentoId, imagemAtual, onUploaded]);

  const handleDeleteSelected = key => {
    setSelectedFiles(prev => prev.filter(f => {
      if (f.key === key) URL.revokeObjectURL(f.preview);
      return f.key !== key;
    }));
  };

  const handleDeleteUploaded = async img => {
    if (!orcamentoId || !img.public_id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload/${orcamentoId}/${img.public_id}`, { method: "DELETE" });
      if (res.ok) onUploaded(imagemAtual.filter(i => i.public_id !== img.public_id));
    } catch (err) {
      console.error("Erro ao excluir imagem:", err);
    }
  };

  return (
    <div className="upload-imagem-orcamento">
      <h3>Imagens do Orçamento</h3>
      <p className="description">Para adicionar uma imagem, arraste e solte-a na área abaixo ou clique para selecionar.</p>

      {/* Dropzone */}
      <div
        ref={dropRef}
        className="dropzone"
        onClick={() => dropRef.current.querySelector('input').click()}
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

      {/* Pré-visualização e botões */}
      {selectedFiles.length > 0 && (
        <div className="image-list">
          <h4>Imagens para Enviar</h4>
          {selectedFiles.map(f => (
            <div key={f.key} className="image-item">
              <img src={f.preview} alt={f.file.name || "Pré-visualização"} />
              <div className="file-info">
                <span>{f.file.name}</span>
                {f.progress > 0 && <span className="progress-text">{f.progress}%</span>}
              </div>
              <div className="progress-bar">
                <div style={{ width: `${f.progress}%` }} />
              </div>
              {!f.uploaded && !f.error && (
                <button className="btn-delete" onClick={() => handleDeleteSelected(f.key)}>Cancelar</button>
              )}
              {f.error && <span className="error-text">Falha</span>}
            </div>
          ))}
          <button
            onClick={handleUploadAll}
            disabled={uploading || selectedFiles.every(f => f.uploaded || f.error)}
            className="upload-all-btn"
          >
            {uploading ? "Enviando..." : "Enviar todas"}
          </button>
        </div>
      )}

      {/* Imagens já enviadas */}
      {imagemAtual.length > 0 && (
        <div className="existing-images">
          <h4>Imagens Enviadas</h4>
          {imagemAtual.map(img => (
            <div key={img.public_id} className="image-item">
              <img src={img.url} alt={`Imagem enviada`} />
              <button className="btn-delete" onClick={() => handleDeleteUploaded(img)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
      {(selectedFiles.length === 0 && imagemAtual.length === 0) &&
        <p className="no-images-message">Nenhuma imagem carregada.</p>
      }
    </div>
  );
};

export default UploadImagemOrcamento;
