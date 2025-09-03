import axios from "axios";
import { useState, useEffect, useCallback, useRef } from "react";

// API base pega da variável de ambiente
const API_BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:8080";

const UploadImagemOrcamento = ({ orcamentoId, imagemAtual = [], onUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    return () => selectedFiles.forEach(f => URL.revokeObjectURL(f.preview));
  }, [selectedFiles]);

  // Drag & Drop
  useEffect(() => {
    const dropArea = dropRef.current;

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

  const handleUploadAll = useCallback(async () => {
    if (!selectedFiles.length) return setError("Nenhum arquivo selecionado.");
    if (!orcamentoId) return setError("O ID do orçamento não foi fornecido.");

    setUploading(true);
    setError(null);
    let uploadedUrls = [...imagemAtual];

    for (const fileItem of selectedFiles) {
      const formData = new FormData();
      formData.append("file", fileItem.file);
      formData.append("orcamentoId", orcamentoId);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setSelectedFiles(prev =>
              prev.map(f => f.key === fileItem.key ? { ...f, progress: percent } : f)
            );
          }
        });

        const uploadedImage = {
          url: response.data.url,
          public_id: response.data.public_id
        };
        uploadedUrls.push(uploadedImage);

        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: true, error: null, progress: 100 } : f)
        );

      } catch (err) {
        console.error(err);
        setError(`Erro ao enviar ${fileItem.file.name}`);
        setSelectedFiles(prev =>
          prev.map(f => f.key === fileItem.key ? { ...f, uploaded: false, error: "Falha" } : f)
        );
      }
    }

    setUploading(false);
    onUploaded(uploadedUrls);
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
      if (res.ok) onUploaded(prev => prev.filter(i => i.public_id !== img.public_id));
    } catch { setError("Falha ao excluir imagem"); }
  };

  return (
    <div>
      <div
        ref={dropRef}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          cursor: "pointer"
        }}
      >
        Arraste e solte imagens aqui ou clique para selecionar
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: "none" }}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div>
          <h4>Pré-visualização:</h4>
          {selectedFiles.map(f => (
            <div key={f.key} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
              <img src={f.preview} alt={f.file.name || "Pré-visualização de imagem"} width={100} style={{ marginRight: "10px" }} />
              <div style={{ display: "inline-block", verticalAlign: "top" }}>
                <div style={{ width: "200px", height: "10px", background: "#eee", marginBottom: "5px" }}>
                  <div style={{
                    width: `${f.progress}%`,
                    height: "100%",
                    background: f.uploaded ? "green" : "blue",
                    transition: "width 0.2s"
                  }} />
                </div>
                <div>{f.uploaded ? "Enviado ✅" : f.error ? f.error : `${f.progress}%`}</div>
              </div>
              <button onClick={() => handleDeleteSelected(f.key)} disabled={uploading} style={{ marginLeft: "10px" }}>Excluir</button>
            </div>
          ))}
          <button onClick={handleUploadAll} disabled={uploading} style={{ marginTop: "10px" }}>
            {uploading ? "Enviando..." : "Enviar todas as imagens"}
          </button>
        </div>
      )}

      {imagemAtual.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Imagens enviadas:</h4>
          {imagemAtual.map(img => (
            <div key={img.public_id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <img src={img.url} alt={`Imagem enviada do orçamento ${img.public_id}`} width={100} style={{ marginRight: "10px" }} />
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
