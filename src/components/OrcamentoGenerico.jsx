// src/components/OrcamentoGenerico.jsx
import React, { useState } from "react";
import ClienteVeiculoForm from "./ClienteVeiculoForm";
import ItensTable from "./ItensTable";
import TotaisForm from "./TotaisForm";
import MessageBox from "./MessageBox";
import "./OrcamentoGenerico.css";

const OrcamentoGenerico = () => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    placa: "",
    veiculo: "",
  });

  const [pecas, setPecas] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [totais, setTotais] = useState({ pecas: 0, servicos: 0, maoObra: 0 });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTotaisChange = (field, value) => {
    setTotais({ ...totais, [field]: value });
  };

  const hideMessageBox = () => {
    setMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Orçamento enviado:", { formData, pecas, servicos, totais });
      setMessage("Orçamento salvo com sucesso!");
      setIsError(false);
    } catch (err) {
      setMessage("Erro ao salvar orçamento.");
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="orcamento-form">
      <ClienteVeiculoForm formData={formData} handleChange={handleChange} />
      <ItensTable tipo="pecas" itens={pecas} setItens={setPecas} />
      <ItensTable tipo="servicos" itens={servicos} setItens={setServicos} />
      <TotaisForm totais={totais} onChange={handleTotaisChange} />
      <button type="submit" className="btn-submit">Salvar Orçamento</button>
      <MessageBox message={message} isError={isError} onClose={hideMessageBox} />
    </form>
  );
};

export default OrcamentoGenerico;