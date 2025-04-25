import React, { useState } from 'react';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Contato.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.mensagem.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Digite um e-mail válido.');
      return;
    }

    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('mensagem', formData.mensagem);

    fetch('/api/enviar-formulario', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Formulário enviado com sucesso!');
        setFormData({ nome: '', email: '', mensagem: '' });
      })
      .catch((error) => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container-escuro">
        <section className="section">
          <div className='section'>
          <div className='highlight-item'>
              <h2 className="title">Entre em Contato</h2>
              <p>Estamos aqui para ajudar. Entre em contato conosco pelos canais abaixo:</p>
              <ul className="contact-list">
                <li>
                  <FaMapMarkerAlt aria-hidden="true" style={{ fontSize: '2em', margin: '1rem' }} />
                  <a
                    href="https://www.google.com/maps/place/ZERO+20+GARAGE/@-23.326345,-46.5770842,17z/data=!3m1!4b1!4m6!3m5!1s0x94ceede375ca12c9:0xa22173d27f744745!8m2!3d-23.3263499!4d-46.5745093!16s%2Fg%2F11sgrc1ckt?authuser=0&entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    translate="no"
                    aria-label="Endereço Zero 20 Garage"
                  >
                    Avenida Laura Gomes Hannickel, 153 - Capoavinha, Mairiporã - SP
                  </a>
                </li>
                <li>
                  <FaPhoneAlt aria-hidden="true" style={{ fontSize: '2em', margin: '1rem' }} />
                  <a href="tel:+5511941097471" aria-label="Ligar para (11) 94109-7471">
                    (11) 94109-7471
                  </a>
                </li>
                <li>
                  <FaEnvelope aria-hidden="true" style={{ fontSize: '2em', margin: '1rem' }} />
                  <a href="mailto:contato@zero20garage.com" aria-label="Enviar e-mail para contato@zero20garage.com">
                    contato@zero20garage.com
                  </a>
                </li>
                <li>
                  <FaWhatsapp aria-hidden="true" style={{ fontSize: '2em', margin: '1rem' }} />
                  <a
                    href="https://wa.me/5511941097471?text=Olá! Gostaria de mais informações sobre os serviços."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Enviar mensagem via WhatsApp"
                  >
                    Enviar Mensagem
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="map-section">
          <div className='item'>
            <h2>Localização</h2>
          </div>
          <div className="google-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.799744734953!2d-46.5745093!3d-23.3263499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ceede375ca12c9%3A0xa22173d27f744745!2sZERO%2020%20GARAGE!5e0!3m2!1spt-BR!2sbr!4v1711478418134!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Zero20 Garage no Google Maps"
            ></iframe>
          </div>
        </section>

        <section className="section">
          <div className='item'>
            <h2>Envie uma Mensagem</h2>
            <form onSubmit={handleSubmit} className="contato-form">
              <div className="form-group">
                <label htmlFor="nome">Seu Nome:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Digite seu nome"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Seu E-mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Digite seu e-mail"
                />
              </div>
              <div className="form-group">
                <label htmlFor="mensagem">Sua Mensagem:</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  placeholder="Digite sua mensagem"
                ></textarea>
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Contato;
