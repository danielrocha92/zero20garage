import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './Orcamento.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import emailjs from 'emailjs-com';
import PainelOrcamentos from '../../components/orcamento/PainelOrcamentos';

// Acessa a URL da API do ambiente. Usa uma URL de fallback para o ambiente de produção
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      const raw = value.replace(/\D/g, '').slice(0, 11);
      let formatted = raw;
      if (raw.length > 2 && raw.length <= 6) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
      } else if (raw.length > 6 && raw.length <= 10) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
      } else if (raw.length > 10) {
        formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
      } else if (raw.length > 0) {
        formatted = `(${raw}`;
      }
      setFormData({ ...formData, [name]: formatted });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const telDigits = (formData.telefone || '').replace(/\D/g, '');
    if (!telDigits || telDigits.length < 10) {
      setErrorMessage('Por favor, informe seu número de WhatsApp com DDD para envio do orçamento.');
      setSuccess(false);
      return;
    }

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
      {/* SEO On-Page: Helmet com title, description e canonical otimizados */}
      <Helmet>
        <title>Orçamento Online de Mecânica e Retífica | Zero 20 Garage - Mairiporã-SP</title>
        <meta name="description" content="Solicite um orçamento de revisão, manutenção automotiva ou retífica de motores em Mairiporã-SP. Rápido, grátis e sem compromisso!" />
        <link rel="canonical" href="https://zero20garage.com.br/orcamento" />
      </Helmet>
      <Breadcrumbs />


        {isAdmin ? (
          <PainelOrcamentos />
        ) : (
          <section className="form-section highlight-card">
            {/* SEO Semântica: H1 único por página com palavra-chave de conversão */}
            <h1 className="titulo-claro orcamento-h1">Solicite seu Orçamento de Mecânica Hoje!</h1>
            <h2 className="subtitulo-claro orcamento-h2">
              Sem surpresas, Transparência Total na Avaliação
            </h2>
            <p className="paragrafo-claro orcamento-intro-text">
              Preencha os detalhes e nossa equipe de especialistas de Mairiporã entrará em contato rápido. Se seu carro parou na rua localmente pela região da serra, avise-nos no campo de comentários!
            </p>

            <form className="orcamento-form-apple" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nome">
                  Nome: <span className="campo-obrigatorio">*</span>
                </label>
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
                <label htmlFor="email">
                  E-mail: <span className="campo-obrigatorio">*</span>
                </label>
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
                <label htmlFor="telefone">
                  WhatsApp: <span className="campo-obrigatorio">*</span>
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  placeholder="(11) 99999-9999"
                />
                <span className="campo-dica">Obrigatório com DDD para envio da proposta e contato direto.</span>
              </div>

              <div className="form-group">
                <label htmlFor="servico">Serviço Desejado:</label>
                <select
                  className='select-form'
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
                    ? 'Orçamento solicitado com sucesso! Entraremos em contato via WhatsApp.'
                    : errorMessage || 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
                </div>
              )}
            </form>
          </section>
        )}

    </div>
  );
}

export default Orcamento;