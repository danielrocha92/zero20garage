import React, { useState } from "react";
import "./OrcamentoMotor.css"; // Ensure this CSS file is created as well

const itens = [
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
  { nome: "Válvulas escape", valor: 0, tipo: "simples" },
  { nome: "Válvulas admissão", valor: 0, tipo: "simples" },
  { nome: "Velas", valor: 0, tipo: "simples" },
  { nome: "Anti Chamas", valor: 0, tipo: "simples" },
  { nome: "Silicone", valor: 0, tipo: "simples" },
  { nome: "Parafusos cabeçote", valor: 0, tipo: "simples" },
  { nome: "Bobina", valor: 0, tipo: "simples" },
  { nome: "Tuchos", valor: 0, tipo: "simples" },
  { nome: "Cebolinha de óleo", valor: 0, tipo: "simples" },
  { nome: "Sensor de temperatura", valor: 0, tipo: "simples" },
  { nome: "Cabo de vela", valor: 0, tipo: "simples" },
  { nome: "Biela", valor: 0, tipo: "simples" },
  { nome: "Embreagem", valor: 0, tipo: "simples" },
  { nome: "Desengripante e Limpa contato", valor: 0, tipo: "simples" },
  { nome: "Outros", valor: 0, tipo: "simples" },
];

const servicos = [
  {
    nome: "Cabeçote",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Usinagem Completa", valor: 0 },
      { nome: "Limpeza e Revisão", valor: 0 },
      { nome: "Novo", valor: 0 },
      { nome: "Recuperação de Altura", valor: 0 },
    ],
  },
  // Removed other services to match the image, if they are needed, they can be added back
];

export default function OrcamentoCabecote() {
  const [selecionados, setSelecionados] = useState({}); // {nomeItem: valor, ...}
  const [servicosSelecionados, setServicosSelecionados] = useState({}); // {nomeServico: valor, ...}
  const [resumoServico, setResumoServico] = useState([]);

  const [dadosCliente, setDadosCliente] = useState({
    veiculo: "",
    ordemServico: "",
    cliente: "",
    data: new Date().toLocaleDateString('pt-BR'), // Auto-fill current date
    maoDeObraMecanica: 0, // Added for "Mão de Obra Mecânica"
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setDadosCliente((prev) => ({ ...prev, [name]: value }));
  }

  const updateResumoServico = (item, type, action, value = 0, quantity = 1) => {
    setResumoServico((prevResumo) => {
      let newResumo = [...prevResumo];
      const existingIndex = newResumo.findIndex(
        (r) => r.nome === item.nome && r.tipo === type
      );

      if (action === "add") {
        if (existingIndex === -1) {
          newResumo.push({ nome: item.nome, tipo: type, valor: value, quantidade: quantity });
        } else {
          newResumo[existingIndex] = { ...newResumo[existingIndex], valor: value, quantidade: quantity };
        }
      } else if (action === "remove") {
        newResumo = newResumo.filter((r) => !(r.nome === item.nome && r.tipo === type));
      } else if (action === "update") {
        if (existingIndex !== -1) {
          newResumo[existingIndex] = { ...newResumo[existingIndex], valor: value, quantidade: quantity };
        }
      }
      return newResumo;
    });
  };

  function toggleSelecionado(item, isServico = false) {
    const alvo = isServico ? servicosSelecionados : selecionados;
    const setAlvo = isServico ? setServicosSelecionados : setSelecionados;
    const tipoItem = isServico ? "servico" : "peca";

    if (alvo[item.nome] !== undefined) {
      const novo = { ...alvo };
      delete novo[item.nome];
      updateResumoServico(item, tipoItem, "remove");

      if (item.filhos) {
        item.filhos.forEach((filho) => {
          delete novo[filho.nome];
          updateResumoServico(filho, tipoItem, "remove");
        });
      }
      setAlvo(novo);
    } else {
      const novo = { ...alvo, [item.nome]: item.valor || 0 };
      updateResumoServico(item, tipoItem, "add", item.valor || 0, 1);

      if (item.filhos) {
        item.filhos.forEach((filho) => {
          novo[filho.nome] = filho.valor || 0;
          updateResumoServico(filho, tipoItem, "add", filho.valor || 0, 1);
        });
      }
      setAlvo(novo);
    }
  }

  function toggleFilhoSelecionado(filho, pai, isServico = false) {
    const alvo = isServico ? servicosSelecionados : selecionados;
    const setAlvo = isServico ? setServicosSelecionados : setSelecionados;
    const tipoItem = isServico ? "servico" : "peca";

    if (alvo[filho.nome] !== undefined) {
      const novo = { ...alvo };
      delete novo[filho.nome];
      setAlvo(novo);
      updateResumoServico(filho, tipoItem, "remove");
    } else {
      setAlvo({ ...alvo, [filho.nome]: filho.valor || 0 });
      updateResumoServico(filho, tipoItem, "add", filho.valor || 0, 1);
      if (alvo[pai.nome] === undefined) {
          setAlvo(prev => ({ ...prev, [pai.nome]: pai.valor || 0 }));
          updateResumoServico(pai, tipoItem, "add", pai.valor || 0, 1);
      }
    }
  }

  function handleValorChange(nome, valor, isServico = false, quantity = 1) {
    const alvo = isServico ? servicosSelecionados : selecionados;
    const setAlvo = isServico ? setServicosSelecionados : setSelecionados;
    const tipoItem = isServico ? "servico" : "peca";

    const itemObj = itens.find(i => i.nome === nome) || servicos.find(s => s.nome === nome) ||
                    itens.flatMap(i => i.filhos || []).find(f => f.nome === nome) ||
                    servicos.flatMap(s => s.filhos || []).find(f => f.nome === nome);

    setAlvo({ ...alvo, [nome]: parseFloat(valor) || 0 });
    updateResumoServico(itemObj, tipoItem, "update", parseFloat(valor) || 0, quantity);
  }

  function handleQuantidadeChange(nome, quantidadeStr, isServico = false) {
      const quantidade = parseInt(quantidadeStr) || 1;
      const alvo = isServico ? servicosSelecionados : selecionados;
      const setAlvo = isServico ? setServicosSelecionados : setSelecionados;
      const tipoItem = isServico ? "servico" : "peca";

      const itemObj = itens.find(i => i.nome === nome) || servicos.find(s => s.nome === nome) ||
                       itens.flatMap(i => i.filhos || []).find(f => f.nome === nome) ||
                       servicos.flatMap(s => s.filhos || []).find(f => f.nome === nome);

      const valorAtual = alvo[nome] !== undefined ? alvo[nome] : 0;
      setAlvo(prev => ({ ...prev, [nome]: valorAtual }));
      updateResumoServico(itemObj, tipoItem, "update", valorAtual, quantidade);
  }

  const totalPecas = resumoServico
    .filter((item) => item.tipo === "peca")
    .reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  const totalServicos = resumoServico
    .filter((item) => item.tipo === "servico")
    .reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  const totalGeral = totalPecas + totalServicos + parseFloat(dadosCliente.maoDeObraMecanica || 0);


  return (
    <div className="orcamento-container">
      <div className="orcamento-header">
        <h2 className="orcamento-title">ORÇAMENTO - CABEÇOTE</h2>
      </div>

      <div className="client-details">
        <div className="client-detail-item">
          <span className="label">Veículo:</span>
          <input
            type="text"
            name="veiculo"
            value={dadosCliente.veiculo}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">OS:</span>
          <input
            type="text"
            name="ordemServico"
            value={dadosCliente.ordemServico}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">Cliente:</span>
          <input
            type="text"
            name="cliente"
            value={dadosCliente.cliente}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="client-detail-item">
          <span className="label">Data:</span>
          <input
            type="text"
            name="data"
            value={dadosCliente.data}
            onChange={handleInputChange}
            className="input-field"
            readOnly // Date is auto-filled
          />
        </div>
      </div>

      <h3 className="section-title">Peças</h3>
      <div className="parts-grid">
        {itens.map((item) => (
          <div key={item.nome} className="grid-item">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={
                  selecionados[item.nome] !== undefined ||
                  (item.filhos &&
                    item.filhos.some((f) => selecionados[f.nome] !== undefined))
                }
                onChange={() => toggleSelecionado(item)}
              />
              {item.nome}
            </label>

            {selecionados[item.nome] !== undefined && !item.filhos && (
              <div className="item-inputs">
                {item.tipo === "quantidade" && (
                  <input
                    type="number"
                    className="quantity-input"
                    placeholder="Qtd."
                    min="1"
                    value={resumoServico.find(r => r.nome === item.nome && r.tipo === 'peca')?.quantidade || 1}
                    onChange={(e) => handleQuantidadeChange(item.nome, e.target.value)}
                  />
                )}
                <input
                  type="number"
                  className="value-input"
                  placeholder="R$"
                  value={selecionados[item.nome]}
                  onChange={(e) => handleValorChange(item.nome, e.target.value, false, resumoServico.find(r => r.nome === item.nome && r.tipo === 'peca')?.quantidade || 1)}
                />
              </div>
            )}

            {item.filhos && (selecionados[item.nome] !== undefined || item.filhos.some(f => selecionados[f.nome] !== undefined)) && (
              <div classNameNam="sub-items">
                {item.filhos.map((filho) => (
                  <label key={filho.nome} className="checkbox-wrapper sub-item-label">
                    <input
                      type="checkbox"
                      checked={selecionados[filho.nome] !== undefined}
                      onChange={() => toggleFilhoSelecionado(filho, item)}
                    />
                    {filho.nome}
                    {selecionados[filho.nome] !== undefined && (
                      <input
                        type="number"
                        className="value-input"
                        placeholder="R$"
                        value={selecionados[filho.nome]}
                        onChange={(e) => handleValorChange(filho.nome, e.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <h3 className="total-line">Valor total de Peças: R$ {totalPecas.toFixed(2)}</h3>

      <h3 className="section-title">Serviços no Cabeçote - Retifica</h3>
      <div className="services-grid">
        {servicos.map((item) => (
          <div key={item.nome} className="grid-item">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={
                  servicosSelecionados[item.nome] !== undefined ||
                  (item.filhos &&
                    item.filhos.some((f) => servicosSelecionados[f.nome] !== undefined))
                }
                onChange={() => toggleSelecionado(item, true)}
              />
              {item.nome}
            </label>

            {item.filhos && (servicosSelecionados[item.nome] !== undefined || item.filhos.some(f => servicosSelecionados[f.nome] !== undefined)) && (
              <div className="sub-items">
                {item.filhos.map((filho) => (
                  <label key={filho.nome} className="checkbox-wrapper sub-item-label">
                    <input
                      type="checkbox"
                      checked={servicosSelecionados[filho.nome] !== undefined}
                      onChange={() => toggleFilhoSelecionado(filho, item, true)}
                    />
                    {filho.nome}
                    {servicosSelecionados[filho.nome] !== undefined && (
                      <input
                        type="number"
                        className="value-input"
                        placeholder="R$"
                        value={servicosSelecionados[filho.nome]}
                        onChange={(e) => handleValorChange(filho.nome, e.target.value, true)}
                      />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <h3 className="total-line">Valor total de Serviços: R$ {totalServicos.toFixed(2)}</h3>

      <div className="total-line mao-de-obra">
        <span className="label">Valor total de Mão de Obra Mecânica:</span>
        <input
          type="number"
          name="maoDeObraMecanica"
          value={dadosCliente.maoDeObraMecanica}
          onChange={handleInputChange}
          className="input-field total-input"
          placeholder="R$"
        />
      </div>

      <h2 className="grand-total">TOTAL GERAL: R$ {totalGeral.toFixed(2)}</h2>

      <p className="payment-info">
        Forma de pagamento: Pix, Débito e Crédito em até 10 vezes sem juros
      </p>

      {/* Summary Section (can be hidden or toggled if not strictly needed in the final print) */}
      <div className="resumo-servico-container">
        <h3 className="section-title">Resumo de Serviço no Veículo</h3>
        {resumoServico.length === 0 ? (
          <p>Nenhum item ou serviço selecionado para o resumo.</p>
        ) : (
          <ul className="resumo-list">
            {resumoServico.map((item, index) => (
              <li key={`${item.tipo}-${item.nome}-${index}`} className="resumo-item">
                <span className="resumo-item-nome">{item.nome}</span>
                {item.quantidade > 1 && <span className="resumo-item-quantidade"> (x{item.quantidade})</span>}
                <span className="resumo-item-valor">R$ {(item.valor * item.quantidade).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="orcamento-buttons-container">
        <button
          className="action-btn save-google-sheets-btn"
          onClick={() =>
            salvarGoogleSheets({
              dadosCliente,
              itensSelecionados: selecionados,
              servicosSelecionados,
              resumoServico,
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
              itensSelecionados: selecionados,
              servicosSelecionados,
              resumoServico,
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
              itensSelecionados: selecionados,
              servicosSelecionados,
              resumoServico,
            })
          }
        >
          Baixar PDF
        </button>
      </div>
    </div>
  );
}

// Placeholder functions (as provided in your original code)
function salvarGoogleSheets(data) {
  console.log("Salvar no Google Sheets:", data);
  alert("Dados prontos para salvar no Google Sheets! Verifique o console.");
}

function exportarExcel(data) {
  console.log("Exportar para Excel:", data);
  alert("Dados prontos para exportar para Excel! Verifique o console.");
}

function exportarPDF(data) {
  console.log("Exportar para PDF:", data);
  alert("Dados prontos para exportar para PDF! Verifique o console.");
}