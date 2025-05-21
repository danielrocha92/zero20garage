import React, { useState } from 'react';
import './Orcamento.css';
import DynamicHeader from '../../components/DynamicHeader';
import WhatsAppButton from '../../components/WhatsAppButton';
// import { supabase } from '../../supabaseClient'; // Removido
import emailjs from 'emailjs-com';
import AnimatedPage from '../../components/AnimatedPage';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const formDataComData = {
        ...formData,
        data: new Date().toLocaleString('pt-BR'),
      };

      // ✅ Envia para o Google Sheets via proxy backend hospedado no Render
      await fetch('https://api-orcamento-n49u.onrender.com/api/orcamento', {
        method: 'POST',
        body: JSON.stringify(formDataComData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // ✅ Envia e-mail via EmailJS
      await emailjs.send(
        'service_mbg69sw',
        'template_tso8mol',
        {
          nome: formDataComData.nome,
          email: formDataComData.email,
          telefone: formDataComData.telefone,
          servico: formDataComData.servico,
          mensagem: formDataComData.mensagem,
          data: formDataComData.data,
        },
        'NxziW1zSC820uuLvF'
      );

      setSuccess(true);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        mensagem: '',
      });
    } catch (err) {
      console.error('Erro inesperado:', err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-black">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />
      <AnimatedPage />
      <div className="container-black">
        <section className="section">
          <div className='highlight-item'>
            <h1 className="title">Solicite um Orçamento</h1>
            <h3 className='subtitle'>Preencha o formulário abaixo para receber um orçamento detalhado e personalizado.</h3>

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
                  className='option'
                  id="servico"
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  required
                >
                  <option className='option' value="">Selecione um serviço</option>
                  <option className='option' value="retifica">Retífica de Motores</option>
                  <option className='option' value="manutencao">Manutenção Preventiva</option>
                  <option className='option' value="revisao">Revisão Completa</option>
                  <option className='option' value="outro">Outro</option>
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

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>
              {success !== null && (
                <div className={`feedback-success ${success ? 'success' : 'feedback-error'}`}>
                  {success
                    ? 'Formulário enviado com sucesso!'
                    : 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
                </div>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Orcamento;
