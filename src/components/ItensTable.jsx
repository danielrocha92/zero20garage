// src/components/ItensTable.jsx
import React from "react";
import { formatCurrency, parseCurrency } from "../hooks/useCurrencyFormatter";
import "./OrcamentoGenerico.css";

const ItensTable = ({ tipo, itens, setItens }) => {
  const handleChange = (index, field, value) => {
    const newItens = [...itens];
    if (field === "valorUnitario" || field === "valorTotal") {
      newItens[index][field] = parseCurrency(value);
    } else {
      newItens[index][field] = value;
    }
    setItens(newItens);
  };

  const addItem = () => {
    setItens([...itens, { descricao: "", quantidade: 1, valorUnitario: 0, valorTotal: 0 }]);
  };

  const removeItem = (index) => {
    const newItens = itens.filter((_, i) => i !== index);
    setItens(newItens);
  };

  return (
    <div className="section">
      <h3>{tipo === "pecas" ? "Peças" : "Serviços"}</h3>
      <table className="items-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.descricao}
                  onChange={(e) => handleChange(index, "descricao", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantidade}
                  onChange={(e) => handleChange(index, "quantidade", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formatCurrency(item.valorUnitario)}
                  onChange={(e) => handleChange(index, "valorUnitario", e.target.value)}
                />
              </td>
              <td>{formatCurrency(item.quantidade * item.valorUnitario)}</td>
              <td>
                <button type="button" onClick={() => removeItem(index)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addItem}>Adicionar {tipo}</button>
    </div>
  );
};

export default ItensTable;