import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos';

const UploadImagemOrcamento = ({ orcamentoId, token }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Buscar imagens atuais do orçamento ---
  const fetchOrcamento = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}`);
      const data = await res.json();
      const orcamento = data.find(o => o.id === orcamentoId);
      if (orcamento?.imagens) setImages(orcamento.imagens);
    } catch (err) {
      console.error('Erro ao buscar orçamento:', err);
    }
  }, [orcamentoId]);

  useEffect(() => {
    fetchOrcamento();
  }, [fetchOrcamento]);

  // --- Upload múltiplo ---
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      const res = await fetch(`${API_URL}/${orcamentoId}/imagens`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Erro no upload');

      const data = await res.json();
      if (data?.images) setImages(prev => [...prev, ...data.images]);
    } catch (err) {
      console.error('Erro no upload:', err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  // --- Excluir imagem ---
  const handleRemove = async (publicId) => {
    if (!window.confirm('Deseja remover esta imagem?')) return;

    try {
      const res = await fetch(`${API_URL}/${orcamentoId}/imagens/${publicId}`, {
        method: 'DELETE',
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {}
      });

      if (!res.ok) throw new Error('Erro ao remover imagem');

      setImages(prev => prev.filter(img => img.public_id !== publicId));
    } catch (err) {
      console.error('Erro ao remover imagem:', err);
      setError(err.message || 'Erro desconhecido');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto my-8 border-2 border-gray-200">
      <h2 className="text-xl font-semibold text-center mb-4">Imagens do Veículo</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col items-center justify-center mb-6 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-gray-500 text-sm font-medium">Clique ou arraste imagens para upload</p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {loading && (
        <p className="text-blue-500 text-center mb-4">Carregando...</p>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.public_id} className="relative border rounded-lg overflow-hidden">
              <img
                src={img.url}
                alt="Orçamento"
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleRemove(img.public_id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadImagemOrcamento;
