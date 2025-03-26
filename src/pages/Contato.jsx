import React, { useState } from 'react';
import '../styles/styles.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

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
    arquivo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mensagem', formData.mensagem);
    if (formData.arquivo) {
      formDataToSend.append('arquivo', formData.arquivo);
    }

    fetch('/api/enviar-formulario', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Formulário enviado com sucesso!');
        setFormData({ nome: '', email: '', mensagem: '', arquivo: null });
      })
      .catch((error) => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário.');
      });
  };

  return (
    <div className="home">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      {/* Informações de Contato */}
      <div className='container'>
      <section className="highlights">
        <div className="highlights-grid">
          <div className="highlight-item">
            <div className="contato-info">
              <h2>Entre em Contato</h2>
              <p>Estamos aqui para ajudar. Entre em contato conosco pelos canais abaixo:</p>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <p>
                    <strong>Endereço:</strong> Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP
                  </p>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <p>
                    <strong>Telefone:</strong>{' '}
                    <a href="tel:+5511941097471">(11) 94109-7471</a>
                  </p>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <p>
                    <strong>E-mail:</strong>{' '}
                    <a href="mailto:contato@zero20garage.com">contato@zero20garage.com</a>
                  </p>
                </li>
                <li>
                  <i className="fab fa-whatsapp"></i>
                  <p>
                    <strong>WhatsApp:</strong>{' '}
                    <a
                      href="https://wa.me/5511941097471?text=Olá! Gostaria de mais informações sobre os serviços."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Enviar Mensagem
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="highlights">
        <div className="formulario">
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
            <div className="form-group">
              <label>Anexar Arquivo:</label>
              <input
                type="file"
                name="arquivo"
                onChange={(e) => setFormData({ ...formData, arquivo: e.target.files[0] })}
              />
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>
      </div>
    </div>
  );
}

export default Contato;