import React, { useState } from 'react';
import '../styles/styles.css';
import DynamicHeader from '../components/DynamicHeader';

function Orcamento() {
  const messages = [
    {
      title: 'Formulário de Orçamento',
      subtitle: 'Para solicitar um orçamento a Zero 20 Garage, preencha abaixo suas informações e clique em enviar. Sua solicitação será respondida em tempo hábil.',
    },
    {
      title: 'Conte-nos sobre seu veículo',
      subtitle: 'Preencha os campos abaixo com as informações do seu veículo',
    },
    {
      title: 'Estamos Aqui para Ajudar',
      subtitle: 'Visite nossa oficina ou ligue para nós',
    },
  ];

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    marca: '',
    modelo: '',
    ano: '',
    motorizacao: '',
    orcamento: '',
    codigo: '',
    arquivo: null, // Novo campo para o arquivo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('telefone', formData.telefone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('cidade', formData.cidade);
    formDataToSend.append('estado', formData.estado);
    formDataToSend.append('marca', formData.marca);
    formDataToSend.append('modelo', formData.modelo);
    formDataToSend.append('ano', formData.ano);
    formDataToSend.append('motorizacao', formData.motorizacao);
    formDataToSend.append('orcamento', formData.orcamento);
    formDataToSend.append('codigo', formData.codigo);
    if (formData.arquivo) {
      formDataToSend.append('arquivo', formData.arquivo);
    }
  
    fetch('http://localhost:5000/api/orcamento', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Formulário enviado com sucesso!');
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          cidade: '',
          estado: '',
          marca: '',
          modelo: '',
          ano: '',
          motorizacao: '',
          orcamento: '',
          codigo: '',
          arquivo: null,
        });
      })
      .catch((error) => {
        console.error('Erro ao enviar o formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário.');
      });
  };

  return (
    <div className="container">
      <DynamicHeader messages={messages} />
      <section className="section">
      <h2>Solicite um Orçamento</h2>
      <p>Preencha o formulário abaixo para solicitar um orçamento.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>*Seu nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Telefone para contato:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
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
          <label>*Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="ES">Espírito Santo</option>
            {/* Adicione outros estados aqui */}
          </select>
        </div>
        <div className="form-group">
          <label>*Marca:</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Ano fabricação/ano modelo:</label>
          <input
            type="text"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Motorização:</label>
          <input
            type="text"
            name="motorizacao"
            value={formData.motorizacao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>*Orçamento:</label>
          <textarea
            name="orcamento"
            value={formData.orcamento}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Digite o código ao lado:</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
          <div className="form-group">
            <label>*Anexar Arquivo:</label>
            <input
              type="file"
              name="arquivo"
              onChange={(e) => setFormData({ ...formData, arquivo: e.target.files[0] })}
              required
            />
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
      </section>
    </div>
  );
}

export default Orcamento;