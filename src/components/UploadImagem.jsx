import {
  useState,
  useCallback
} from 'react';

// URL para o seu servidor backend.
// Note: Em produção, esta URL deve ser configurada via variáveis de ambiente.
const API_URL = 'http://localhost:8080/api/orcamentos';

const UploadImagemOrcamento = ({
  orcamentoId
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/${orcamentoId}/imagens`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro no upload. Por favor, tente novamente.');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);

    } catch (err) {
      console.error('Erro no upload:', err);
      setError(err.message || 'Erro desconhecido ao carregar a imagem.');
    } finally {
      setLoading(false);
    }
  }, [orcamentoId]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto my-8 border-2 border-gray-200">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Imagens do Veículo
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Selecione uma imagem para o orçamento
      </p>

      {loading && (
        <div className="flex items-center justify-center p-4">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-blue-500">Carregando...</span>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {!loading && !imageUrl && (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
          <label htmlFor="file-upload" className="cursor-pointer">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L15 16m-4-4l-4.586 4.586m4.586-4.586l.001.001m0 0l-4.586 4.586"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17v-1a4 4 0 00-4-4h-2a4 4 0 00-4 4v1m4 4v-1m4 1v-1m-2-4v-1a4 4 0 00-4-4h-2a4 4 0 00-4 4v1m4 4v-1m-4 1v-1"></path>
            </svg>
            <p className="text-gray-500 text-sm font-medium">Clique para fazer o upload</p>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Imagem do Veículo</h3>
          <img
            src={imageUrl}
            alt="Imagem do orçamento"
            className="rounded-lg w-full h-auto object-cover border-2 border-gray-300"
          />
        </div>
      )}

    </div>
  );
};

export default UploadImagemOrcamento;
