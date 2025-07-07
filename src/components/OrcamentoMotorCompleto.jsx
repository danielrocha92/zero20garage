import React, { useState } from "react";
import "./OrcamentoMotor.css"; // Certifique-se que o arquivo existe

const OrcamentoMotorCompleto = () => {
  const [cliente, setCliente] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
    data: new Date().toISOString().split("T")[0],
  });

  return (
    <div className="orcamento-motor-container">
      <h1>Orçamento de Motor Completo</h1>

      <form>
        <label>Nome:</label>
        <input
          type="text"
          value={cliente.nome}
          onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
        />

        <label>Telefone:</label>
        <input
          type="text"
          value={cliente.telefone}
          onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
        />

        <label>Veículo:</label>
        <input
          type="text"
          value={cliente.veiculo}
          onChange={(e) => setCliente({ ...cliente, veiculo: e.target.value })}
        />

        <label>Placa:</label>
        <input
          type="text"
          value={cliente.placa}
          onChange={(e) => setCliente({ ...cliente, placa: e.target.value })}
        />

        <label>Data:</label>
        <input type="date" value={cliente.data} readOnly />
      </form>
    </div>
  );
};

export default OrcamentoMotorCompleto;
