import React, { useState } from 'react';

/**
 * Componente Formulario
 * Um formulário simples para coletar nome, email e mensagem.
 * Ele chama a função onSubmit passada como prop com os dados do formulário.
 * @param {Object} props - As propriedades do componente.
 * @param {Function} props.onSubmit - Função a ser chamada quando o formulário é submetido,
 * recebendo os dados do formulário como argumento.
 */
const Formulario = ({ onSubmit }) => {
  // Estado para armazenar os dados do formulário.
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  /**
   * Lida com a mudança nos campos de entrada do formulário.
   * Atualiza o estado formData com o novo valor do campo.
   * @param {Object} e - O evento de mudança.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Lida com a submissão do formulário.
   * Previne o comportamento padrão de recarregar a página e chama a função onSubmit.
   * @param {Object} e - O evento de submissão.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col">
        <label htmlFor="nome" className="mb-1 font-semibold text-gray-700">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 font-semibold text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="mensagem" className="mb-1 font-semibold text-gray-700">Mensagem:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows="5"
          required
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        ></textarea>
      </div>
      <button
        type="submit"
        className="p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Gerar PDF
      </button>
    </form>
  );
};

export default Formulario;
