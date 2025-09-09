// src/components/UploadImagemOrcamento.jsx

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import "./UploadImagemOrcamento.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://api-orcamento-n49u.onrender.com";

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const dropRef = useRef(null);

  // --- Revoke object URLs ao desmontar ---
  useEffect(() => {
    return () => selectedFiles.forEach((f) => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // --- Drag & Drop ---
  useEffect(() => {
    const dropArea = dropRef.current;
    if (!dropArea) return;

    const handleDragOver = (e) => {
      e.preventDefault();
      dropArea.classList.add("drag-over");
    };
    const handleDragLeave = () => dropArea.classList.remove("drag-over");
    const handleDrop = (e) => {
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

  // --- Normaliza arquivos selecionados ---
  const handleFiles = (files) => {
    if (!files.length) return;
    const filesWithPreview = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      key: f.name + "-" + Date.now() + "-" + Math.random(),
      uploaded: false,
      progress: 0,
      error: null,
    }));
    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
  };

  const handleFileChange = (e) => handleFiles(Array.from(e.target.files || []));

  // --- Upload de todos os arquivos ---
  const handleUploadAll = useCallback(async () => {
    const filesToUpload = selectedFiles.filter((f) => !f.uploaded && !f.error);
    if (!filesToUpload.length || !orcamentoId) return;

    setUploading(true);

    try {
      const formData = new FormData();
      filesToUpload.forEach((f) => formData.append("files", f.file));

      const response = await axios.post(
        `${API_BASE_URL}/api/upload/${orcamentoId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setSelectedFiles((prev) =>
              prev.map((f) =>
                filesToUpload.some((fu) => fu.key === f.key)
                  ? { ...f, progress: percent }
                  : f
              )
            );
          },
        }
      );

      if (response.status === 200) {
        // Mescla imagens existentes com as novas
        const normalized = response.data.files.map((f) => ({
          url: f.url || f.secure_url,
          public_id: f.public_id,
        }));
        onUploaded([...imagemAtual, ...normalized]);
        setSelectedFiles([]);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setSelectedFiles((prev) =>
        prev.map((f) =>
          filesToUpload.some((fu) => fu.key === f.key)
            ? { ...f, uploaded: false, error: "Falha" }
            : f
        )
      );
    } finally {
      setUploading(false);
    }
  }, [selectedFiles, orcamentoId, imagemAtual, onUploaded]);

  // --- Deletar arquivo selecionado ---
  const handleDeleteSelected = (key) => {
    setSelectedFiles((prev) =>
      prev.filter((f) => {
        if (f.key === key) URL.revokeObjectURL(f.preview);
        return f.key !== key;
      })
    );
  };

  // --- Deletar imagem enviada ---
  const handleDeleteUploaded = async (img) => {
    if (!orcamentoId || !img.public_id) return;
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/upload/${orcamentoId}/${img.public_id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        onUploaded(imagemAtual.filter((i) => i.public_id !== img.public_id));
      }
    } catch (error) {
      console.error("Erro ao deletar imagem:", error);
    }
  };

  return (
    <div className="upload-imagem-orcamento">
      {/* Dropzone */}
      <div
        ref={dropRef}
        className="dropzone"
        onClick={() => {
          const fileInput = dropRef.current?.querySelector("input");
          if (fileInput) fileInput.click();
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
          {selectedFiles.map((f) => (
            <div key={f.key} className="image-item">
              <img src={f.preview} alt={f.file.name || "Pré-visualização"} />
              <div className="progress-bar">
                <div style={{ width: `${f.progress}%` }} />
              </div>
              {!f.uploaded && !f.error && (
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteSelected(f.key)}
                >
                  Cancelar
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleUploadAll}
            disabled={uploading || selectedFiles.every((f) => f.uploaded || f.error)}
          >
            {uploading ? "Enviando..." : "Enviar todas"}
          </button>
        </div>
      )}

      {/* Imagens já enviadas */}
      {imagemAtual.length > 0 && (
        <div className="existing-images">
          {imagemAtual.map((img) => (
            <div key={img.public_id} className="image-item">
              <img src={img.url} alt="Imagem enviada" />
              <button
                className="btn-delete"
                onClick={() => handleDeleteUploaded(img)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;
