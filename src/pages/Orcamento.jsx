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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Formulário enviado:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <div className="orcamento-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container">
        <section className="orcamento-section">
          <h2>Solicite um Orçamento</h2>
          <p>Preencha o formulário abaixo para receber um orçamento detalhado e personalizado.</p>
          <form className="orcamento-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
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
              <label htmlFor="email">E-mail:</label>
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
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Digite seu telefone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="servico">Serviço Desejado:</label>
              <select
                id="servico"
                name="servico"
                value={formData.servico}
                onChange={handleChange}
                required
              >
                <option value="">Selecione um serviço</option>
                <option value="retifica">Retífica de Motores</option>
                <option value="manutencao">Manutenção Preventiva</option>
                <option value="revisao">Revisão Completa</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mensagem">Mensagem:</label>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                rows="4"
                placeholder="Digite sua mensagem"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Solicitar Orçamento
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Orcamento;