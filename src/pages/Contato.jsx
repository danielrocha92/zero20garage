import React, { useState } from 'react';
import './Contato.css';
import DynamicHeader from '../components/DynamicHeader';
import Layout from '../components/Layout';

function Contato() {
  const messages = [
    {
      title: 'Fale Conosco',
      subtitle: 'Estamos prontos para atender você',
    },
    {
      title: 'Entre em Contato',
      subtitle: 'Tire suas dúvidas ou agende um serviço',
    },
    {
      title: 'Estamos Aqui',
      subtitle: 'Visite nossa oficina ou ligue para nós',
    },
  ];

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    alert('Sua mensagem foi enviada com sucesso!');
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <Layout>
    <div className="contato">
      <DynamicHeader messages={messages} />
      <div className="contato-container">
        <div className="contato-info">
          <h2>Entre em Contato</h2>
          <p>Estamos aqui para ajudar. Entre em contato conosco pelos canais abaixo:</p>
          <ul>
            <li><strong>Endereço:</strong> Avenida Laura Gomes Hannickel, 153 - CAPOAVINHA, Mairiporã - SP</li>
            <li><strong>Telefone:</strong> (11) 94109-7471</li>
            <li><strong>E-mail:</strong> contato@zero20garage.com</li>
          </ul>
        </div>
        <div className="contato-form">
          <h2>Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>*Seu Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>*E-mail:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>*Mensagem:</label>
              <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
    </Layout>
// Compare this snippet from src/pages/Contato.jsx:
  );
}

export default Contato;