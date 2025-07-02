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

        {item.filhos && (
          <div className="sub-items">
            {item.filhos.map((filho) => (
              <label key={filho.nome} className="checkbox-wrapper sub-item-label">
                <input
                  type="checkbox"
                  checked={selectedState[filho.nome] !== undefined}
                  onChange={() => handleToggle(filho, isService, item)}
                />
                {filho.nome}
                {selectedState[filho.nome] !== undefined && (
                  <input
                    type="number"
                    className="value-input"
                    placeholder="R$"
                    value={selectedState[filho.nome]?.valor || 0}
                    onChange={(e) => handleValueChange(filho.nome, e.target.value, 'valor', isService)}
                  />
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Funções placeholder para os botões de ação
  const salvarGoogleSheets = (data) => {
    console.log("Dados para Google Sheets:", data);
    alert("Funcionalidade de salvar no Google Sheets a ser implementada!");
  };

  const exportarExcel = (data) => {
    console.log("Dados para Excel:", data);
    alert("Funcionalidade de exportar para Excel a ser implementada!");
  };

  const exportarPDF = (data) => {
    console.log("Dados para PDF:", data);
    alert("Funcionalidade de exportar para PDF a ser implementada!");
  };

  return (
    <div className="orcamento-container">
      <div className="orcamento-header">
        <h2 className="orcamento-title">ORÇAMENTO - RETÍFICA DE MOTORES</h2>
        {/* Assumindo que zero20-logo.png está em src/assets */}
      </div>

      {/* Seção de Dados do Cliente */}
      <div className="client-details">
        <div className="client-detail-item">
          <span className="label">Veículo:</span>
          <input
            type="text"
            name="veiculo"
            value={dadosCliente.veiculo}
            onChange={handleClienteInputChange}
            className="input-field"
            placeholder="Ex: Corsa 2001"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">OS:</span>
          <input
            type="text"
            name="ordemServico"
            value={dadosCliente.ordemServico}
            onChange={handleClienteInputChange}
            className="input-field"
            placeholder="Ex: 143"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">Cliente:</span>
          <input
            type="text"
            name="cliente"
            value={dadosCliente.cliente}
            onChange={handleClienteInputChange}
            className="input-field"
            placeholder="Nome do cliente"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">Data:</span>
          <input
            type="text"
            name="data"
            value={dadosCliente.data}
            onChange={handleClienteInputChange}
            className="input-field"
            readOnly
          />
        </div>
      </div>

      {/* Seção de Peças */}
      <h3 className="section-title">Peças</h3>
      <div className="parts-grid">
        {itensPecas.map((item) => renderItem(item, false))}
      </div>
      <h3 className="total-line">Valor total de Peças: R$ {totalPecas.toFixed(2)}</h3>

      {/* Seção de Serviços */}
      <h3 className="section-title">Serviços de Retífica</h3>
      <div className="services-grid">
        {servicosMotor.map((item) => renderItem(item, true))}
      </div>
      <h3 className="total-line">Valor total de Serviços: R$ {totalServicos.toFixed(2)}</h3>

      {/* Seção de Mão de Obra Mecânica */}
      <div className="total-line mao-de-obra">
        <span className="label">Valor total de Mão de Obra Mecânica:</span>
        <input
          type="number"
          name="maoDeObraMecanica"
          value={dadosCliente.maoDeObraMecanica}
          onChange={handleClienteInputChange}
          className="input-field total-input"
          placeholder="R$"
        />
      </div>

      {/* Total Geral */}
      <h2 className="grand-total">TOTAL GERAL: R$ {totalGeral.toFixed(2)}</h2>

      {/* Informações adicionais */}
      <div className="additional-info">
        <p className="payment-info">
          Forma de pagamento: Pix, Débito e Crédito em até 10 vezes sem juros
        </p>
        <p className="garantia-info">
          Garantia: <input
            type="text"
            name="garantia"
            value={dadosCliente.garantia}
            onChange={handleClienteInputChange}
            className="input-field inline-input"
          />
        </p>
      </div>


      {/* Botões de Ação */}
      <div className="orcamento-buttons-container">
        <button
          className="action-btn save-google-sheets-btn"
          onClick={() =>
            salvarGoogleSheets({
              dadosCliente,
              pecasSelecionadas: selecionadosPecas,
              servicosSelecionados: selecionadosServicos,
              totalGeral,
            })
          }
        >
          Salvar no Google Sheets
        </button>
        <button
          className="action-btn download-excel-btn"
          onClick={() =>
            exportarExcel({
              dadosCliente,
              pecasSelecionadas: selecionadosPecas,
              servicosSelecionados: selecionadosServicos,
              totalGeral,
            })
          }
        >
          Baixar Excel
        </button>
        <button
          className="action-btn download-pdf-btn"
          onClick={() =>
            exportarPDF({
              dadosCliente,
              pecasSelecionadas: selecionadosPecas,
              servicosSelecionados: selecionadosServicos,
              totalGeral,
            })
          }
        >
          Baixar PDF
        </button>
      </div>
    </div>
  );
}