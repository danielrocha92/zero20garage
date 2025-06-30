import React, { useState } from "react";
import "./PainelOrcamentos.css";

const PainelOrcamentos = () => {
  const [formData, setFormData] = useState({
    nomeCliente: "",
    telefone: "",
    veiculo: "",
    servicos: "",
    valorTotal: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("enviando");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxML-zqFjDhbX_nTdfj_xXXai8tW3rCCjst9CGWqUINgv1ktynBVALYkSxgwx3OKB54DQ/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      if (result.result === "success") {
        setStatus("sucesso");
        setFormData({
          nomeCliente: "",
          telefone: "",
          veiculo: "",
          servicos: "",
          valorTotal: "",
        });
      } else {
        setStatus("erro");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setStatus("erro");
    }
  };

  return (
    <div className="painel-orcamentos">
      <h1 className="titulo-claro">Painel de Orçamentos</h1>
      <form onSubmit={handleSubmit} className="form-orcamento">
        <input
          type="text"
          name="nomeCliente"
          placeholder="Nome do Cliente"
          value={formData.nomeCliente}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="veiculo"
          placeholder="Veículo"
          value={formData.veiculo}
          onChange={handleChange}
          required
        />
        <textarea
          name="servicos"
          placeholder="Serviços e observações"
          value={formData.servicos}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="valorTotal"
          placeholder="Valor Total (R$)"
          value={formData.valorTotal}
          onChange={handleChange}
          required
        />
        <button type="submit">Enviar Orçamento</button>
      </form>

      {status === "enviando" && <p>Enviando...</p>}
      {status === "sucesso" && <p className="sucesso">Orçamento enviado com sucesso!</p>}
      {status === "erro" && <p className="erro">Erro ao enviar. Tente novamente.</p>}
    </div>
  );
};

export default PainelOrcamentos;
