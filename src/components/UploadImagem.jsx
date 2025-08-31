import { useState, useCallback } from 'react';

const API_URL = 'http://localhost:8080/api/orcamentos';

const UploadImagemOrcamento = ({ orcamentoId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(
    async (event) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        for (const file of files) {
          formData.append('files', file);
        }

        const response = await fetch(`${API_URL}/${orcamentoId}/imagens`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro no upload.');

        const data = await response.json();
        if (data?.images) {
          setImages(prev => [...prev, ...data.images]);
        } else {
          throw new Error('Resposta do servidor inválida.');
        }
      } catch (err) {
        console.error('Erro no upload:', err);
        setError(err.message || 'Erro desconhecido.');
      } finally {
        setLoading(false);
      }
    },
    [orcamentoId]
  );

  const handleRemoveImage = async (publicId) => {
    try {
      const response = await fetch(`${API_URL}/${orcamentoId}/imagens`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) throw new Error('Erro ao remover imagem.');

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
      <p className="text-center text-gray-500 mb-6">
        Selecione uma ou mais imagens para o orçamento
      </p>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <span className="text-blue-500">Carregando...</span>
        </div>
      )}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="text-gray-500 text-sm font-medium">Clique para fazer upload</p>
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>

      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative">
              <img
                src={img.secure_url}
                alt={`Imagem ${idx + 1}`}
                className="rounded-lg w-full h-auto object-cover border-2 border-gray-300"
              />
              <button
                onClick={() => handleRemoveImage(img.public_id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
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
