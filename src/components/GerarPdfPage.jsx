import React, { useState } from 'react';
// Certifique-se de que este CSS está importado no seu projeto, por exemplo, em GerarPdfPage.css
import '../styles/GerarPdfPage.css';

/**
 * Componente Formulario
 * Um formulário simples para coletar nome, email e mensagem.
 */
const GerarPdfPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="nome" className="label">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="label">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input-field"
        />
      </div>
      <div className="form-group">
        <label htmlFor="mensagem" className="label">Mensagem:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows="5"
          required
          className="textarea-field"
        ></textarea>
      </div>
      <button
        type="submit"
        className="submit-button"
      >
        Gerar PDF
      </button>
    </form>
  );
};

export default GerarPdfPage;