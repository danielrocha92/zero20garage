import React, { useState } from 'react';
import './Orcamento.css';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import { supabase } from '../supabaseClient';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import emailjs from 'emailjs-com';



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

  // Função para lidar com o envio do formulário
  // Adicionando a função de envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      // 1. Salvar no Supabase
      const { error } = await supabase.from('orcamentos').insert([formData]);

      if (error) {
        console.error('Erro ao enviar dados:', error.message);
        setSuccess(false);
        return;
      }

      // 2. Gerar PDF
      const doc = new jsPDF();
      doc.text('Orçamento - ZERO 20 GARAGE™', 10, 10);
      doc.text(`Nome: ${formData.nome}`, 10, 20);
      doc.text(`Email: ${formData.email}`, 10, 30);
      doc.text(`Telefone: ${formData.telefone}`, 10, 40);
      doc.text(`Serviço: ${formData.servico}`, 10, 50);
      doc.text(`Mensagem: ${formData.mensagem}`, 10, 60);
      const pdfBase64 = doc.output('datauristring'); // base64 inline

      // 3. Gerar Excel
      const wb = XLSX.utils.book_new();
      const wsData = [[
        'Nome', 'Email', 'Telefone', 'Serviço', 'Mensagem'
      ], [
        formData.nome, formData.email, formData.telefone, formData.servico, formData.mensagem
      ]];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');
      const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

      // 4. Enviar via EmailJS
      await emailjs.send('service_mbg69sw', 'template_rg6i0fj', {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        servico: formData.servico,
        mensagem: formData.mensagem,
        pdf: pdfBase64,
        excel: excelBase64,
      }, 'NxziW1zSC820uuLvF');

      // 5. Resetar formulário e exibir sucesso
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
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container-escuro">
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
                <label
                htmlFor="servico">Serviço Desejado:</label>
                <select
                className='option'
                  id="servico"
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  required
                >
                  <option
                  className='option' value="">Selecione um serviço</option>
                  <option
                  className='option' value="retifica">Retífica de Motores</option>
                  <option
                  className='option' value="manutencao">Manutenção Preventiva</option>
                  <option
                  className='option' value="revisao">Revisão Completa</option>
                  <option
                  className='option'  value="outro">Outro</option>
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
                {success ? 'Formulário enviado com sucesso!' : 'Ocorreu um erro ao enviar o formulário. Tente novamente!'}
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
