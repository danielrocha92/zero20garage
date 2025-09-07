import React, { useState, useEffect } from 'react';
import '../../components/OrcamentoForms.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import emailjs from 'emailjs-com';
import PainelOrcamentos from '../../components/PainelOrcamentos';

// Acessa a URL da API do ambiente. Usa uma URL de fallback para o ambiente de produção
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://api-orcamento-n49u.onrender.com";

function Orcamento() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token === "acesso-liberado") {
      setIsAdmin(true);
    }
  }, []);

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

      // Usa a variável de ambiente para a URL
      await fetch(`${API_BASE_URL}/api/orcamento`, {
        method: 'POST',
        body: JSON.stringify(formDataComData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await emailjs.send(
        'service_mbg69sw',
        'template_tso8mol',
        { ...formDataComData },
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
    <div className="page-escuro">
      <DynamicHeader page="orcamento" messages={messages} />
      <Breadcrumbs />

      <div className="container-escuro">
        {isAdmin ? (
          <PainelOrcamentos />
        ) : (
          <section className="orcamento-section">
            <div className="highlight-item">
              <h2 className="titulo-claro">Solicite um Orçamento</h2>
              <h3 className="subtitulo-claro">
                Preencha o formulário abaixo para receber um orçamento detalhado e personalizado.
              </h3>

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
                    placeholder="Descreva o serviço desejado, problemas do veículo, modelo/ano etc."
                  ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                  {loading ? 'Enviando...' : 'Solicitar Orçamento'}
                </button>

                {success !== null && (
                  <div className={`feedback ${success ? 'feedback-success' : 'feedback-error'}`}>
                    {success
                      ? 'Formulário enviado com sucesso!'
                      : 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
                  </div>
                )}
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Orcamento;