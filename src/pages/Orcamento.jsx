import React, { useState } from 'react';
import './Orcamento.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import { supabase } from '../supabaseClient';


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

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const { nome, email, telefone, servico, mensagem } = formData;

    const { error } = await supabase.from('orcamentos').insert([
      { nome, email, telefone, servico, mensagem }
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setSuccess(false);
      alert('Erro ao enviar formulário.');
    } else {
      setSuccess(true);
      alert('Formulário enviado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        servico: '',
        mensagem: '',
      });
=======
  const { data, error } = await supabase.from('orcamentos').insert([formData]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from('orcamentos').insert([formData]);

      if (error) {
        console.error('Erro ao enviar dados:', error.message);
        alert('Erro ao enviar o orçamento. Tente novamente.');
      } else {
        alert('Orçamento enviado com sucesso!');
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          mensagem: '',
        });
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Erro inesperado. Tente novamente.');
>>>>>>> 49f59f0b158c72255581f0b1be1f6f79eaeca3ef
    }
  };



  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container-escuro">
        <section className="section">
          <div className='highlight-item'>
            <h2 className="title">Solicite um Orçamento</h2>
            <p className='paragraph'>Preencha o formulário abaixo para receber um orçamento detalhado e personalizado.</p>

            {success !== null && (
              <div className={`feedback ${success ? 'success' : 'error'}`}>
                {success ? 'Formulário enviado com sucesso!' : 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
              </div>
            )}

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

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Orcamento;
