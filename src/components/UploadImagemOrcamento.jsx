// src/components/UploadImagemOrcamento.jsx
import React, { useRef, useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';

// Base da API (defina REACT_APP_API_BASE no .env se necessário)
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

export default function UploadImagemOrcamento(props) {
  const { orcamentoId, authToken, imagemAtual, onChange } = props;

  const [file, setFile] = useState(null);
  const inicialPreview =
    imagemAtual && (imagemAtual.url || imagemAtual.imageUrl) ? (imagemAtual.url || imagemAtual.imageUrl) : null;
  const [preview, setPreview] = useState(inicialPreview);
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  function onFile(e) {
    const f = e && e.target && e.target.files && e.target.files[0];
    if (!f) return;
    setFile(f);
    try {
      setPreview(URL.createObjectURL(f));
    } catch (err) {
      setPreview(null);
    }
  }

  async function capturaDaCamera() {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot(); // data URL base64
    if (!imageSrc) return;
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    const f = new File([blob], 'camera-' + Date.now() + '.png', { type: 'image/png' });
    setFile(f);
    setPreview(imageSrc);
  }

  async function obterAssinatura(folder) {
    const headers = authToken ? { Authorization: 'Bearer ' + authToken } : undefined;
    const resp = await axios.post(API_BASE + '/api/upload/signature', { folder: folder }, { headers: headers });
    return resp.data; // { timestamp, signature, upload_preset, folder, cloudName, apiKey }
  }

  async function uploadCloudinary() {
    if (!file) {
      window.alert('Selecione um arquivo ou capture uma foto antes de enviar.');
      return;
    }
    setLoading(true);
    try {
      const folder = 'zero20garage/orcamentos/' + orcamentoId;
      const sig = await obterAssinatura(folder);

      const form = new FormData();
      form.append('file', file);
      form.append('api_key', sig.apiKey);
      form.append('timestamp', sig.timestamp);
      form.append('signature', sig.signature);
      form.append('upload_preset', sig.upload_preset);
      form.append('folder', sig.folder);

      const cloudUrl = 'https://api.cloudinary.com/v1_1/' + sig.cloudName + '/image/upload';
      const response = await axios.post(cloudUrl, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      const data = response.data;

      // Notifica microserviço para anexar a URL/public_id ao orçamento
      const attachBody = { url: data.secure_url, public_id: data.public_id };
      const attachHeaders = authToken ? { Authorization: 'Bearer ' + authToken } : undefined;
      await axios.post(API_BASE + '/api/orcamentos/' + orcamentoId + '/imagem', attachBody, { headers: attachHeaders });

      setPreview(data.secure_url);
      if (typeof onChange === 'function') onChange(attachBody);
      window.alert('Imagem anexada com sucesso!');
    } catch (e) {
      // Tenta fornecer mensagem legível
      const msg =
        (e && e.response && e.response.data && (e.response.data.error || e.response.data.msg)) || e.message || String(e);
      // eslint-disable-next-line no-console
      console.error('Erro uploadCloudinary:', e);
      window.alert('Falha no upload: ' + msg);
    } finally {
      setLoading(false);
    }
  }

  async function substituirImagem() {
    if (!imagemAtual) return uploadCloudinary();
    const confirmar = window.confirm('Substituir a imagem atual? A anterior será removida do orçamento.');
    if (!confirmar) return;
    // Tenta deletar a antiga no backend (se suportado)
    try {
      const headers = authToken ? { Authorization: 'Bearer ' + authToken } : undefined;
      // axios.delete aceita { data: {...} } para enviar body no DELETE
      await axios.delete(API_BASE + '/api/orcamentos/' + orcamentoId + '/imagem', {
        headers: headers,
        data: { public_id: imagemAtual.public_id },
      });
    } catch (err) {
      // se falhar aqui, não bloqueia o novo upload
      // eslint-disable-next-line no-console
      console.warn('Falha ao tentar remover imagem antiga (continuando):', err);
    }
    await uploadCloudinary();
  }

  return (
    <div className="upload-imagem-orcamento" style={{ maxWidth: 360 }}>
      <h3>Imagem do Orçamento</h3>

      {preview && (
        <div style={{ marginBottom: 12 }}>
          <img src={preview} alt="preview" style={{ maxWidth: '100%', borderRadius: 8 }} crossOrigin="anonymous" />
        </div>
      )}

      <label style={{ display: 'block', marginBottom: 8 }}>
        Selecionar arquivo:
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={onFile}
          style={{ display: 'block', marginTop: 6 }}
        />
      </label>

      <div style={{ margin: '12px 0' }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          style={{ width: '100%', maxWidth: 320, borderRadius: 8 }}
          videoConstraints={{ facingMode: { ideal: 'environment' } }}
        />
        <div style={{ marginTop: 8 }}>
          <button type="button" onClick={capturaDaCamera} disabled={loading} style={{ marginRight: 8 }}>
            Capturar da câmera
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {!imagemAtual && (
          <button type="button" onClick={uploadCloudinary} disabled={loading || !file}>
            Anexar
          </button>
        )}
        {imagemAtual && (
          <button type="button" onClick={substituirImagem} disabled={loading || !file}>
            Substituir imagem
          </button>
        )}
      </div>

      {loading && <p>Enviando...</p>}
    </div>
  );
}

UploadImagemOrcamento.propTypes = {
  orcamentoId: PropTypes.string.isRequired,
  authToken: PropTypes.string,
  imagemAtual: PropTypes.object,
  onChange: PropTypes.func,
};
