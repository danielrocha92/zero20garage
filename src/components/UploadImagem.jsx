// src/components/UploadImagemOrcamento.jsx
import { useState, useCallback } from 'react';

const API_URL = 'https://api-orcamento-n49u.onrender.com/api/orcamentos';

const UploadImagemOrcamento = ({ orcamentoId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await fetch(`${API_URL}/${orcamentoId}/imagens`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Erro no upload');

      const data = await response.json();
      if (data?.images) {
        setImages(prev => [...prev, ...data.images]);
      } else {
        throw new Error('Resposta do servidor inválida');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [orcamentoId]);

  const handleRemove = async (publicId) => {
    try {
      const response = await fetch(`${API_URL}/${orcamentoId}/imagens/${publicId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'), // token admin
        },
      });

      if (!response.ok) throw new Error('Erro ao remover a imagem');

      setImages(prev => prev.filter(img => img.public_id !== publicId));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-8 border-2 border-gray-200">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Imagens do Veículo
      </h2>

      {loading && <p className="text-blue-500 text-center">Carregando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-4">
        {images.map(img => (
          <div key={img.public_id} className="relative">
            <img
              src={img.url}
              alt="Veículo"
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => handleRemove(img.public_id)}
              className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImagemOrcamento;
