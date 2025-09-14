// src/services/firebaseUpload.js
import axios from 'axios';

/**
 * Faz upload de uma imagem para um orçamento específico.
 * @param {string} orcamentoId - ID do orçamento no backend
 * @param {File} arquivo - Arquivo de imagem selecionado pelo usuário
 * @returns {Promise<string>} - Retorna a URL da imagem após upload
 */
export const uploadImagemOrcamento = async (orcamentoId, arquivo) => {
  try {
    const formData = new FormData();
    formData.append('imagem', arquivo);

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/orcamentos/${orcamentoId}/imagens`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.url; // URL retornada pelo backend (Cloudinary)
  } catch (error) {
    console.error('Erro ao enviar imagem para o orçamento:', error);
    throw error;
  }
};
