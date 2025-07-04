// src/components/OrcamentoImpresso.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrcamentoMotor.css";
import logo from "../assets/images/logo.png";
import { itens, servicos } from "./DadosOrcamentoCompleto";

const splitIntoColumns = (arr) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

export default function OrcamentoImpresso() {
  const [selecionados, setSelecionados] = useState({});
  const [servicosSelecionados, setServicosSelecionados] = useState({});
  const [subItensSelecionados, setSubItensSelecionados] = useState({});
  const [subServicosSelecionados, setSubServicosSelecionados] = useState({});
  const [quantidades, setQuantidades] = useState({});

  const [totalPecasDigitado, setTotalPecasDigitado] = useState(0);
  const [totalServicosDigitado, setTotalServicosDigitado] = useState(0);
  const [maoDeObraMecanicaDigitado, setMaoDeObraMecanicaDigitado] = useState(0);
  const [totalGeralDigitado, setTotalGeralDigitado] = useState(0);

  const [dadosCliente, setDadosCliente] = useState({
    veiculo: "",
    ordemServico: "",
    cliente: "",
    data: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const pecas = parseFloat(totalPecasDigitado) || 0;
    const servicos = parseFloat(totalServicosDigitado) || 0;
    const maoObra = parseFloat(maoDeObraMecanicaDigitado) || 0;
    setTotalGeralDigitado(pecas + servicos + maoObra);
  }, [totalPecasDigitado, totalServicosDigitado, maoDeObraMecanicaDigitado]);

  function handleDadosClienteChange(e) {
    const { name, value } = e.target;
    setDadosCliente((prev) => ({ ...prev, [name]: value }));
  }

  function handleQuantidadeChange(nomeItem, qtd) {
    const parsedQtd = parseInt(qtd, 10);
    setQuantidades((prev) => ({ ...prev, [nomeItem]: parsedQtd > 0 ? parsedQtd : 1 }));
  }

  function handleItemToggle(item, isServico = false) {
    const setSelectionState = isServico ? setServicosSelecionados : setSelecionados;
    const setSubSelectionState = isServico ? setSubServicosSelecionados : setSubItensSelecionados;

    setSelectionState((prev) => {
      const newState = { ...prev };
      if (newState[item.nome]) {
        delete newState[item.nome];
        if (item.filhos) {
          setSubSelectionState((subPrev) => {
            const newSubState = { ...subPrev };
            item.filhos.forEach((filho) => delete newSubState[filho.nome]);
            return newSubState;
          });
        }
        if (item.tipo === "quantidade") {
          setQuantidades((prevQtd) => {
            const newQtdState = { ...prevQtd };
            delete newQtdState[item.nome];
            return newQtdState;
          });
        }
      } else {
        newState[item.nome] = true;
        if (item.tipo === "quantidade" && !quantidades[item.nome]) {
          setQuantidades((prevQtd) => ({ ...prevQtd, [item.nome]: 1 }));
        }
      }
      return newState;
    });
  }

  function handleSubItemToggle(filho, pai, isServico = false) {
    const setSubSelectionState = isServico ? setSubServicosSelecionados : setSubItensSelecionados;
    const setParentSelectionState = isServico ? setServicosSelecionados : setSelecionados;

    setSubSelectionState((prev) => {
      const newState = { ...prev };
      if (newState[filho.nome]) {
        delete newState[filho.nome];
      } else {
        newState[filho.nome] = true;
        setParentSelectionState((parentPrev) => ({ ...parentPrev, [pai.nome]: true }));
      }
      return newState;
    });
  }

  const getFullResumoForExport = () => {
    const allSelectedItems = [];

    itens.forEach((item) => {
      if (item.tipo === "simples" && selecionados[item.nome]) {
        allSelectedItems.push({ nome: item.nome, tipo: "peca", quantidade: 1 });
      } else if (item.tipo === "quantidade" && selecionados[item.nome]) {
        allSelectedItems.push({ nome: item.nome, tipo: "peca", quantidade: quantidades[item.nome] || 1 });
      } else if (item.tipo === "submenu") {
        const isParentExplicitlySelected = selecionados[item.nome];
        const isAnyChildSelected = item.filhos?.some((f) => subItensSelecionados[f.nome]);
        if (isParentExplicitlySelected || isAnyChildSelected) {
          item.filhos?.forEach((filho) => {
            if (subItensSelecionados[filho.nome]) {
              allSelectedItems.push({ nome: `${item.nome}: ${filho.nome}`, tipo: "peca", quantidade: 1 });
            }
          });
        }
      }
    });

    servicos.forEach((item) => {
      if (item.tipo === "simples" && servicosSelecionados[item.nome]) {
        allSelectedItems.push({ nome: item.nome, tipo: "servico", quantidade: 1 });
      } else if (item.tipo === "submenu") {
        const isParentExplicitlySelected = servicosSelecionados[item.nome];
        const isAnyChildSelected = item.filhos?.some((f) => subServicosSelecionados[f.nome]);
        if (isParentExplicitlySelected || isAnyChildSelected) {
          item.filhos?.forEach((filho) => {
            if (subServicosSelecionados[filho.nome]) {
              allSelectedItems.push({ nome: `${item.nome}: ${filho.nome}`, tipo: "servico", quantidade: 1 });
            }
          });
        }
      }
    });

    return allSelectedItems;
  };

  const exportData = async (endpoint, fileName, responseType) => {
    const resumoParaEnvio = getFullResumoForExport();
    try {
      const res = await axios.post(endpoint, {
        dadosCliente,
        resumoServico: resumoParaEnvio,
        totalPecas: totalPecasDigitado,
        totalServicos: totalServicosDigitado,
        maoDeObraMecanica: maoDeObraMecanicaDigitado,
        totalGeral: totalGeralDigitado,
      }, {
        responseType: responseType || "json",
      });

      if (responseType === "blob") {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert("Orçamento salvo no Google Sheets com sucesso!");
      }
    } catch (err) {
      console.error(`Erro ao ${fileName.split(".")[0]}:`, err.response?.data || err.message);
      alert(`Erro ao ${fileName.split(".")[0]}. Verifique o console para detalhes.`);
    }
  };

  const salvarGoogleSheets = () => exportData("/api/orcamentos/sheets", "sheets", "json");
  const exportarExcel = () => exportData("/api/orcamentos/excel", `orcamento-${dadosCliente.cliente}.xlsx`, "blob");
  const exportarPDF = () => exportData("/api/orcamentos/pdf", `orcamento-${dadosCliente.cliente}.pdf`, "blob");

  const [pecasCol1, pecasCol2] = splitIntoColumns(itens);

  return (
    <div className="orcamento-impresso-container">
      <div className="header-info">
        <div className="client-data">
          <p>Veículo: <input type="text" name="veiculo" value={dadosCliente.veiculo} onChange={handleDadosClienteChange} /></p>
          <p>OS: <input type="text" name="ordemServico" value={dadosCliente.ordemServico} onChange={handleDadosClienteChange} /></p>
          <p>Cliente: <input type="text" name="cliente" value={dadosCliente.cliente} onChange={handleDadosClienteChange} /></p>
          <p>Data:
            <input
              type="date"
              name="data"
              value={dadosCliente.data}
              onChange={handleDadosClienteChange}
            />
          </p>
        </div>
        <div className="logo-placeholder">
          <img src={logo} alt="Logo Zero Garage" />
        </div>
      </div>
      <h1 className="orcamento-impresso-title">ORÇAMENTO - CABEÇOTE</h1>

      <section className="section-pecas">
        <h2>Peças</h2>
        <div className="pecas-columns">
          {[pecasCol1, pecasCol2].map((col, colIndex) => (
            <div key={colIndex} className="pecas-column">
              {col.map((item) => (
                <div key={item.nome} className="item-wrapper">
                  <label>
                    <input
                      type="checkbox"
                      // O pai estará marcado se ele mesmo foi marcado OU se QUALQUER UM de seus filhos está marcado
                      checked={!!selecionados[item.nome] || (item.filhos && item.filhos.some(f => subItensSelecionados[f.nome]))}
                      onChange={() => handleItemToggle(item)}
                    />
                    {item.nome}
                  </label>
                  {item.tipo === "quantidade" && selecionados[item.nome] && (
                    <input
                      type="number"
                      min="1"
                      placeholder="Qtd"
                      value={quantidades[item.nome] || ''}
                      onChange={(e) => handleQuantidadeChange(item.nome, e.target.value)}
                      className="quantity-input"
                    />
                  )}
                  {item.filhos && (!!selecionados[item.nome] || item.filhos.some(f => subItensSelecionados[f.nome])) && ( // Exibe sub-itens se o pai estiver marcado OU se algum filho já estiver marcado
                    <div className="sub-items-list">
                      {item.filhos.map((filho) => (
                        <label key={filho.nome} className="sub-item-label">
                          <input
                            type="checkbox"
                            checked={!!subItensSelecionados[filho.nome]}
                            onChange={() => handleSubItemToggle(filho, item)}
                          />
                          {filho.nome}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="total-line-impresso">
          Valor total de Peças: R$ <input
            type="number"
            step="0.01" // Permite valores decimais
            value={totalPecasDigitado === 0 ? '' : totalPecasDigitado} // Exibe vazio para 0
            onChange={(e) => setTotalPecasDigitado(parseFloat(e.target.value) || 0)}
            className="input-total-valor"
            placeholder="0.00"
          />
        </p>
      </section>

      <section className="section-servicos">
        <h2>Serviços no Cabeçote - Retifica</h2>
        <div className="servicos-grid">
          {servicos.map((item) => (
            <div key={item.nome} className="item-wrapper">
              <label>
                <input
                  type="checkbox"
                  checked={!!servicosSelecionados[item.nome] || (item.filhos && item.filhos.some(f => subServicosSelecionados[f.nome]))}
                  onChange={() => handleItemToggle(item, true)}
                />
                {item.nome}
              </label>
              {item.filhos && (!!servicosSelecionados[item.nome] || item.filhos.some(f => subServicosSelecionados[f.nome])) && ( // Exibe sub-itens se o pai estiver marcado OU se algum filho já estiver marcado
                <div className="sub-items-list">
                  {item.filhos.map((filho) => (
                    <label key={filho.nome} className="sub-item-label">
                      <input
                        type="checkbox"
                        checked={!!subServicosSelecionados[filho.nome]}
                        onChange={() => handleSubItemToggle(filho, item, true)}
                      />
                      {filho.nome}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="total-line-impresso">
          Valor total de Serviços: R$ <input
            type="number"
            step="0.01"
            value={totalServicosDigitado === 0 ? '' : totalServicosDigitado}
            onChange={(e) => setTotalServicosDigitado(parseFloat(e.target.value) || 0)}
            className="input-total-valor"
            placeholder="0.00"
          />
        </p>
      </section>

      <p className="total-line-impresso">
        Valor total de Mão de Obra Mecânica: R$ <input
          type="number"
          step="0.01"
          value={maoDeObraMecanicaDigitado === 0 ? '' : maoDeObraMecanicaDigitado}
          onChange={(e) => setMaoDeObraMecanicaDigitado(parseFloat(e.target.value) || 0)}
          className="input-total-valor"
          placeholder="0.00"
        />
      </p>

      <p className="total-geral-impresso">
        TOTAL GERAL: R$ <input
          type="number"
          step="0.01"
          value={totalGeralDigitado.toFixed(2)} // Exibe formatado com 2 casas
          onChange={(e) => setTotalGeralDigitado(parseFloat(e.target.value) || 0)}
          className="input-total-final"
          placeholder="0.00"
        />
      </p>

      <p className="form-pagamento">(Forma de pagamento: Pix, Débito e Crédito em até 10x sem juros no cartão)</p>

      {/* Não há um resumo visual separado como na versão anterior,
          pois a imagem de referência não mostra um. O resumo é gerado
          internamente para as funções de exportação. */}

      <div className="orcamento-buttons-container">
        <button onClick={salvarGoogleSheets} className="action-btn">Salvar no Google Sheets</button>
        <button onClick={exportarExcel} className="action-btn">Exportar Excel</button>
        <button onClick={exportarPDF} className="action-btn">Exportar PDF</button>
      </div>
    </div>
  );
}