import React, { useState, useEffect } from "react";
import "./OrcamentoMotor.css";

// Dados iniciais das peças
const itensPecas = [
  { nome: "Pistão", valor: 0, tipo: "quantidade" },
  { nome: "Anel", valor: 0, tipo: "quantidade" },
  { nome: "Bronzina de mancal", valor: 0, tipo: "quantidade" },
  { nome: "Bronzina de biela", valor: 0, tipo: "quantidade" },
  { nome: "Arruela encosto", valor: 0, tipo: "quantidade" },
  { nome: "Bomba de óleo", valor: 0, tipo: "simples" },
  { nome: "Bomba d’água", valor: 0, tipo: "simples" },
  { nome: "Tubo d’água", valor: 0, tipo: "simples" },
  { nome: "Filtro de óleo", valor: 0, tipo: "simples" },
  { nome: "Filtro de ar", valor: 0, tipo: "simples" },
  { nome: "Filtro de combustível", valor: 0, tipo: "simples" },
  { nome: "Litros de óleo", valor: 0, tipo: "quantidade" },
  { nome: "Litros de aditivo", valor: 0, tipo: "quantidade" },
  {
    nome: "Correias",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Dent kit", valor: 0 },
      { nome: "Capa", valor: 0 },
      { nome: "Acessórios kit", valor: 0 },
      { nome: "Corrente kit", valor: 0 },
    ],
  },
  { nome: "Válvula termostática", valor: 0, tipo: "simples" },
  { nome: "Kit junta motor aço", valor: 0, tipo: "simples" },
  { nome: "Retentor traseiro virab.", valor: 0, tipo: "simples" },
  { nome: "Engrenagem virab.", valor: 0, tipo: "simples" },
  { nome: "Retentor eixo comando", valor: 0, tipo: "simples" },
  { nome: "Retentor válvula", valor: 0, tipo: "simples" },
  {
    nome: "Comando de válvula",
    valor: 0,
    tipo: "submenu",
    filhos: [{ nome: "Admis", valor: 0 }, { nome: "Escape", valor: 0 }],
  },
  {
    nome: "Mangueiras Radiador",
    valor: 0,
    tipo: "submenu",
    filhos: [{ nome: "Inferior", valor: 0 }, { nome: "Superior", valor: 0 }],
  },
  { nome: "Válvulas escape", valor: 0, tipo: "quantidade" }, // Alterado para quantidade se a qtde variar
  { nome: "Válvulas admissão", valor: 0, tipo: "quantidade" }, // Alterado para quantidade se a qtde variar
  { nome: "Velas", valor: 0, tipo: "quantidade" }, // Pode ser por quantidade (4 velas, etc.)
  { nome: "Anti Chamas", valor: 0, tipo: "simples" },
  { nome: "Silicone", valor: 0, tipo: "simples" },
  { nome: "Parafusos cabeçote", valor: 0, tipo: "simples" },
  { nome: "Bobina", valor: 0, tipo: "simples" },
  { nome: "Tuchos", valor: 0, tipo: "quantidade" }, // Pode ser por quantidade
  { nome: "Cebolinha de óleo", valor: 0, tipo: "simples" },
  { nome: "Sensor de temperatura", valor: 0, tipo: "simples" },
  { nome: "Cabo de vela", valor: 0, tipo: "simples" },
  { nome: "Biela", valor: 0, tipo: "quantidade" }, // Pode ser por quantidade
  { nome: "Embreagem", valor: 0, tipo: "simples" },
  { nome: "Desengripante e Limpa contato", valor: 0, tipo: "simples" },
  { nome: "Outros: Balancinho + Escoras", valor: 0, tipo: "simples" },
];

// Dados iniciais dos serviços
const servicosMotor = [
  {
    nome: "Retífica de Cabeçote",
    valor: 0,
    tipo: "submenu", // Submenu com checkboxes individuais para serviços
    filhos: [
      { nome: "Usinagem Completa", valor: 0 },
      { nome: "Limpeza e Revisão", valor: 0 },
      { nome: "Retífica Nova", valor: 0 },
      { nome: "Recuperação de Altura", valor: 0 },
    ],
  },
  { nome: "Retífica de Bloco (Usinagem Completa)", valor: 0, tipo: "simples" },
  {
    nome: "Retífica de Bielas",
    valor: 0,
    tipo: "submenu",
    filhos: [{ nome: "Usinagem", valor: 0 }, { nome: "Biela Nova", valor: 0 }],
  },
  {
    nome: "Retífica de Virabrequim",
    valor: 0,
    tipo: "submenu",
    filhos: [{ nome: "Usinagem Completa", valor: 0 }, { nome: "Virabrequim Novo", valor: 0 }],
  },
  { nome: "Retífica de Volante (Usinagem Completa)", valor: 0, tipo: "simples" },
  { nome: "Montagem de Motor Técnica", valor: 0, tipo: "simples" },
  { nome: "Banho (cárter, suportes, parafusos etc)", valor: 0, tipo: "simples" },
];

export default function OrcamentoMotor() {
  const [selecionadosPecas, setSelecionadosPecas] = useState({}); // {nomeItem: {valor: X, quantidade: Y}, ...}
  const [selecionadosServicos, setSelecionadosServicos] = useState({}); // {nomeServico: {valor: X, quantidade: Y}, ...}

  const [dadosCliente, setDadosCliente] = useState({
    veiculo: "",
    ordemServico: "",
    cliente: "",
    data: new Date().toLocaleDateString('pt-BR'),
    maoDeObraMecanica: 0,
    garantia: "3 Meses / 5.000 Km", // Valor padrão para garantia
  });

  // Função genérica para lidar com a mudança de estado de seleção
  const handleToggle = (item, isService = false, parentItem = null) => {
    const setState = isService ? setSelecionadosServicos : setSelecionadosPecas;
    const currentState = isService ? selecionadosServicos : selecionadosPecas;

    setState(prev => {
      const newState = { ...prev };
      const itemName = item.nome;

      if (newState[itemName]) {
        // Remover item
        delete newState[itemName];
        // Se for um item pai, remove também os filhos
        if (item.filhos) {
          item.filhos.forEach(filho => delete newState[filho.nome]);
        }
      } else {
        // Adicionar item
        newState[itemName] = { valor: item.valor || 0, quantidade: item.tipo === "quantidade" ? 1 : 1 };
        // Se for um item filho, garante que o pai esteja selecionado
        if (parentItem && !newState[parentItem.nome]) {
          newState[parentItem.nome] = { valor: parentItem.valor || 0, quantidade: 1 };
        }
        // Se for um item pai, adiciona todos os filhos (com seus valores iniciais)
        if (item.filhos) {
          item.filhos.forEach(filho => {
            if (!newState[filho.nome]) { // Evita sobrescrever se já foi selecionado individualmente
                newState[filho.nome] = { valor: filho.valor || 0, quantidade: filho.tipo === "quantidade" ? 1 : 1 };
            }
          });
        }
      }
      return newState;
    });
  };

  // Função genérica para lidar com a mudança de valor/quantidade
  const handleValueChange = (itemName, value, type = 'valor', isService = false) => {
    const setState = isService ? setSelecionadosServicos : setSelecionadosPecas;
    setState(prev => {
      const currentItem = prev[itemName] || { valor: 0, quantidade: 1 };
      const parsedValue = parseFloat(value) || 0;
      const parsedQuantity = parseInt(value) || 1;

      return {
        ...prev,
        [itemName]: {
          ...currentItem,
          [type]: type === 'valor' ? parsedValue : parsedQuantity
        }
      };
    });
  };

  const handleClienteInputChange = (e) => {
    const { name, value } = e.target;
    setDadosCliente((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = (selectedItems) => {
    return Object.values(selectedItems).reduce((acc, item) => {
      return acc + (item.valor * item.quantidade);
    }, 0);
  };

  const totalPecas = calculateTotal(selecionadosPecas);
  const totalServicos = calculateTotal(selecionadosServicos);
  const totalMaoDeObra = parseFloat(dadosCliente.maoDeObraMecanica) || 0;
  const totalGeral = totalPecas + totalServicos + totalMaoDeObra;

  // Renderiza um item (checkbox + inputs)
  const renderItem = (item, isService = false, parentItem = null) => {
    const selectedState = isService ? selecionadosServicos : selecionadosPecas;
    const isSelected = selectedState[item.nome] !== undefined;

    return (
      <div key={item.nome} className="grid-item">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleToggle(item, isService, parentItem)}
          />
          {item.nome}
        </label>

        {isSelected && (
          <div className="item-inputs">
            {item.tipo === "quantidade" && (
              <input
                type="number"
                className="quantity-input"
                placeholder="Qtd."
                min="1"
                value={selectedState[item.nome]?.quantidade || 1}
                onChange={(e) => handleValueChange(item.nome, e.target.value, 'quantidade', isService)}
              />
            )}
            <input
              type="number"
              className="value-input"
              placeholder="R$"
              value={selectedState[item.nome]?.valor || 0}
              onChange={(e) => handleValueChange(item.nome, e.target.value, 'valor', isService)}
            />
          </div>
        )}

        import React, { useState } from "react";
import Select from "react-select";
import "./OrcamentoMotor.css";

const itensPecas = [
  {
    nome: "Correias",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Dent kit", valor: 0 },
      { nome: "Capa", valor: 0 },
      { nome: "Acessórios kit", valor: 0 },
      { nome: "Corrente kit", valor: 0 },
    ],
  },
  {
    nome: "Comando de válvula",
    valor: 0,
    tipo: "submenu",
    filhos: [{ nome: "Admis", valor: 0 }, { nome: "Escape", valor: 0 }],
  },
];

export default function OrcamentoMotor() {
  const [selecionadosPecas, setSelecionadosPecas] = useState({});

  const handleToggle = (item, parentItem = null) => {
    setSelecionadosPecas((prev) => {
      const newState = { ...prev };
      const itemName = item.nome;

      if (newState[itemName]) {
        delete newState[itemName];
      } else {
        newState[itemName] = { valor: item.valor || 0, quantidade: 1 };
        if (parentItem && !newState[parentItem.nome]) {
          newState[parentItem.nome] = { valor: parentItem.valor || 0, quantidade: 1 };
        }
      }
      return newState;
    });
  };

  const handleValueChange = (itemName, value, type = 'valor') => {
    setSelecionadosPecas((prev) => {
      const currentItem = prev[itemName] || { valor: 0, quantidade: 1 };
      const parsedValue = type === 'valor' ? parseFloat(value) || 0 : parseInt(value) || 1;

      return {
        ...prev,
        [itemName]: {
          ...currentItem,
          [type]: parsedValue,
        },
      };
    });
  };

  const renderItem = (item) => {
    const selectedState = selecionadosPecas;
    const isSelected = selectedState[item.nome] !== undefined;

    return (
      <div key={item.nome} className="grid-item">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => handleToggle(item)}
          />
          {item.nome}
        </label>

        {item.filhos && (
          <div className="sub-items">
            <label className="select-wrapper">
              <span>Selecione {item.nome}:</span>

              <Select
                isMulti
                className="multi-select-react"
                classNamePrefix="zerogarage"
                options={[
                  {
                    label: "Itens",
                    options: item.filhos.map((filho) => ({
                      value: filho.nome,
                      label: filho.nome,
                    })),
                  },
                ]}
                value={item.filhos
                  .filter((filho) => selectedState[filho.nome])
                  .map((filho) => ({
                    value: filho.nome,
                    label: filho.nome,
                  }))}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map((opt) => opt.value);
                  item.filhos.forEach((filho) => {
                    const isSelected = selectedValues.includes(filho.nome);
                    const alreadySelected = !!selectedState[filho.nome];

                    if (isSelected && !alreadySelected) {
                      handleToggle(filho, item);
                    } else if (!isSelected && alreadySelected) {
                      handleToggle(filho, item);
                    }
                  });
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 4,
                  colors: {
                    ...theme.colors,
                    primary: "#ff0000",
                    primary75: "#cc0000",
                    primary50: "#ff4d4d",
                    primary25: "#ffe6e6",
                    neutral0: "#1a1a1a",
                    neutral5: "#2c2c2c",
                    neutral10: "#444",
                    neutral20: "#666",
                    neutral30: "#999",
                    neutral80: "#fff",
                  },
                })}
              />
            </label>

            {item.filhos.map(
              (filho) =>
                selectedState[filho.nome] && (
                  <div key={`valor-${filho.nome}`} className="sub-item-valor">
                    <span>{filho.nome}:</span>
                    <input
                      type="number"
                      className="value-input dark-input"
                      placeholder="R$"
                      value={selectedState[filho.nome]?.valor || 0}
                      onChange={(e) =>
                        handleValueChange(filho.nome, e.target.value, "valor")
                      }
                    />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="orcamento-container">
      <h2>Peças com Submenus (react-select)</h2>
      <div className="parts-grid">
        {itensPecas.map((item) => renderItem(item))}
      </div>
    </div>
  );
}