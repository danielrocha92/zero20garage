import React, { useState } from 'react';
import './Orcamento.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

function Orcamento() {
  const messages = [
    {
      title: 'Solicite um Orçamento',
      subtitle: 'Preencha o formulário e receba um orçamento personalizado',
    },
    {
      title: 'Orçamento Rápido e Fácil',
      subtitle: 'Receba um orçamento em até 24 horas',
    },
    {
      title: 'Transparência e Confiança',
      subtitle: 'Orçamentos detalhados e sem compromisso',
    },
  ];

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    mensagem: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(null);

    // Simulação de envio de formulário
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      alert('Formulário enviado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        mensagem: '',
      });
    }, 2000); // Simulação de tempo de envio
  };

  return (
    <div className="orcamento-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container">
        <section className="orcamento-section">
          <h2>Solicite um Orçamento</h2>
          <p>Preencha o formulário abaixo para receber um orçamento detalhado e personalizado.</p>
          
          {success !== null && (
            <div className={`feedback ${success ? 'success' : 'error'}`}>
              {success ? 'Formulário enviado com sucesso!' : 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
            </div>
          )}

          <form className="orcamento-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome" aria-label="Nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Digite seu nome"
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" aria-label="E-mail">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Digite seu e-mail"
                aria-required="true"
                aria-invalid={formData.email && !/\S+@\S+\.\S+/.test(formData.email) ? 'true' : 'false'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefone" aria-label="Telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
                aria-required="false"
              />
            </div>
            <div className="form-group">
              <label 
              htmlFor="servico">Serviço Desejado:</label>
              <select
                className="option"
                id="servico"
                name="servico"
                value={formData.servico}
                onChange={handleChange}
                required
              >
                <option className="option"
                value="">Selecione um serviço</option>
                <option 
                className="option"
                value="retifica">Retífica de Motores</option>
                <option
                className="option"
                value="manutencao">Manutenção Preventiva</option>
                <option 
                className="option"
                value="revisao">Revisão Completa</option>
                <option 
                className="option"
                value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensagem" aria-label="Mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows="4"
                placeholder="Digite sua mensagem"
              ></textarea>
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Enviando...' : 'Solicitar Orçamento'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Orcamento;
