// src/components/OrcamentoImpresso.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrcamentoMotor.css"; // CSS específico para este componente
import logo from '../assets/images/logo.png';

// Importa os dados de itens e serviços
import { itens, servicos } from "./DadosOrcamentoCompleto";

// Helper para dividir um array em duas colunas (aproximadamente)
const splitIntoColumns = (arr) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

export default function OrcamentoImpresso() {
  // Estado para controlar a seleção de cada item principal (checkbox)
  const [selecionados, setSelecionados] = useState({}); // Para peças
  const [servicosSelecionados, setServicosSelecionados] = useState({}); // Para serviços

  // Estado para controlar a seleção de sub-itens (checkboxes dentro de submenus)
  const [subItensSelecionados, setSubItensSelecionados] = useState({}); // Para sub-itens de peças
  const [subServicosSelecionados, setSubServicosSelecionados] = useState({}); // Para sub-itens de serviços

  // Estado para quantidades de itens do tipo 'quantidade'
  const [quantidades, setQuantidades] = useState({});

  // Estados para os valores totais digitados manualmente
  const [totalPecasDigitado, setTotalPecasDigitado] = useState(0);
  const [totalServicosDigitado, setTotalServicosDigitado] = useState(0);
  const [maoDeObraMecanicaDigitado, setMaoDeObraMecanicaDigitado] = useState(0);
  const [totalGeralDigitado, setTotalGeralDigitado] = useState(0);

  const [dadosCliente, setDadosCliente] = useState({
    veiculo: "",
    ordemServico: "",
    cliente: "",
    // MUDANÇA AQUI: Inicializa a data no formato YYYY-MM-DD para o input type="date"
    data: new Date().toISOString().split('T')[0],
  });

  // Efeito para recalcular o total geral sempre que os totais de peças, serviços ou mão de obra mudam
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
    const parsedQtd = parseInt(qtd, 10); // Use radix 10 for parseInt
    setQuantidades((prev) => ({ ...prev, [nomeItem]: parsedQtd > 0 ? parsedQtd : 1 })); // Garante no mínimo 1
  }

  // Lida com o checkbox principal de um item (que pode ser simples ou pai de submenu)
  function handleItemToggle(item, isServico = false) {
    const setSelectionState = isServico ? setServicosSelecionados : setSelecionados;
    const setSubSelectionState = isServico ? setSubServicosSelecionados : setSubItensSelecionados;

    setSelectionState((prev) => {
      const newState = { ...prev };
      if (newState[item.nome]) {
        // Se desmarcando o pai, desmarca todos os filhos também no estado de sub-itens
        delete newState[item.nome];
        if (item.filhos) {
          setSubSelectionState(subPrev => {
            const newSubState = { ...subPrev };
            item.filhos.forEach(filho => delete newSubState[filho.nome]);
            return newSubState;
          });
        }
        // Para itens de quantidade, reseta a quantidade para 1 se desmarcado
        if (item.tipo === "quantidade") {
            setQuantidades(prevQtd => {
              const newQtdState = { ...prevQtd };
              delete newQtdState[item.nome]; // ou newQtdState[item.nome] = 1; se quiser manter 1
              return newQtdState;
            });
        }
      } else {
        // Se marcando o pai
        newState[item.nome] = true;
        // Para itens de quantidade, garante que tenha pelo menos 1 ao marcar
        if (item.tipo === "quantidade" && !quantidades[item.nome]) {
            setQuantidades(prevQtd => ({ ...prevQtd, [item.nome]: 1 }));
        }
      }
      return newState;
    });
  }

  // Lida com o checkbox de um sub-item
  function handleSubItemToggle(filho, pai, isServico = false) {
    const setSubSelectionState = isServico ? setSubServicosSelecionados : setSubItensSelecionados;
    const setParentSelectionState = isServico ? setServicosSelecionados : setSelecionados;

    setSubSelectionState((prev) => {
      const newState = { ...prev };
      if (newState[filho.nome]) {
        delete newState[filho.nome];
        // Opcional: Se desmarcar o último filho, desmarca o pai?
        // Neste design, o pai pode ficar marcado mesmo sem filhos,
        // mas se a ideia é que o pai só esteja marcado se HOUVER algum filho,
        // você precisaria de mais lógica aqui para verificar se ainda há filhos marcados
        // e, se não houver, desmarcar o pai. Por enquanto, mantemos o pai marcado
        // se ele foi explicitamente marcado ou se algum filho o marcou.
      } else {
        newState[filho.nome] = true;
        // Se um filho está sendo marcado, o pai também deve estar marcado automaticamente
        setParentSelectionState(parentPrev => ({ ...parentPrev, [pai.nome]: true }));
      }
      return newState;
    });
  }

  // --- Função para montar o resumo final para envio (PDF/Excel/Sheets) ---
  const getFullResumoForExport = () => {
    const allSelectedItems = [];

    // Processa itens de Peças
    itens.forEach(item => {
      if (item.tipo === "simples" && selecionados[item.nome]) {
        allSelectedItems.push({
          nome: item.nome,
          tipo: "peca",
          quantidade: 1
        });
      } else if (item.tipo === "quantidade" && selecionados[item.nome]) {
        allSelectedItems.push({
          nome: item.nome,
          tipo: "peca",
          quantidade: quantidades[item.nome] || 1
        });
      } else if (item.tipo === "submenu") {
        // Para submenus, adicionamos o pai se ele foi marcado, OU se algum filho foi marcado
        const isParentExplicitlySelected = selecionados[item.nome];
        const isAnyChildSelected = item.filhos.some(f => subItensSelecionados[f.nome]);

        if (isParentExplicitlySelected || isAnyChildSelected) {
            // Adiciona o nome do grupo pai para contexto no resumo, mas sem valor/qtd específica
            // Se você não quiser o pai no resumo se só os filhos estiverem marcados, remova este push condicional
            // allSelectedItems.push({
            //     nome: item.nome,
            //     tipo: "peca_grupo", // Tipo diferente para identificar grupo
            //     quantidade: 0
            // });

            // Adiciona os filhos selecionados
            item.filhos.forEach(filho => {
                if (subItensSelecionados[filho.nome]) {
                    allSelectedItems.push({
                        nome: `${item.nome}: ${filho.nome}`, // Ex: "Comando de Válvula: Admissão"
                        tipo: "peca",
                        quantidade: 1
                    });
                }
            });
        }
      }
    });

    // Processa itens de Serviços
    servicos.forEach(item => {
      if (item.tipo === "simples" && servicosSelecionados[item.nome]) {
        allSelectedItems.push({
          nome: item.nome,
          tipo: "servico",
          quantidade: 1
        });
      } else if (item.tipo === "submenu") {
        const isParentExplicitlySelected = servicosSelecionados[item.nome];
        const isAnyChildSelected = item.filhos.some(f => subServicosSelecionados[f.nome]);

        if (isParentExplicitlySelected || isAnyChildSelected) {
            // allSelectedItems.push({
            //     nome: item.nome,
            //     tipo: "servico_grupo",
            //     quantidade: 0
            // });
            item.filhos.forEach(filho => {
                if (subServicosSelecionados[filho.nome]) {
                    allSelectedItems.push({
                        nome: `${item.nome}: ${filho.nome}`,
                        tipo: "servico",
                        quantidade: 1
                    });
                }
            });
        }
      }
    });

    return allSelectedItems;
  };

  // Funções de exportação
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
        responseType: responseType || 'json',
      });

      if (responseType === 'blob') {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Limpa o elemento link
        window.URL.revokeObjectURL(url); // Libera o objeto URL
      } else {
        alert("Orçamento salvo no Google Sheets com sucesso!");
      }
    } catch (err) {
      console.error(`Erro ao ${fileName.split('.')[0]}:`, err.response?.data || err.message);
      alert(`Erro ao ${fileName.split('.')[0]}. Verifique o console para detalhes.`);
    }
  };

  const salvarGoogleSheets = () => exportData("/api/orcamentos/sheets", "sheets", "json");
  const exportarExcel = () => exportData("/api/orcamentos/excel", `orcamento-${dadosCliente.cliente}.xlsx`, "blob");
  const exportarPDF = () => exportData("/api/orcamentos/pdf", `orcamento-${dadosCliente.cliente}.pdf`, "blob");

  // Divide os itens de peças em duas colunas para o layout visual
  const [pecasCol1, pecasCol2] = splitIntoColumns(itens);

  return (
    <div className="orcamento-impresso-container">
      <div className="header-info">
        <div className="client-data">
          <p>Veículo: <input type="text" name="veiculo" value={dadosCliente.veiculo} onChange={handleDadosClienteChange} /></p>
          <p>OS: <input type="text" name="ordemServico" value={dadosCliente.ordemServico} onChange={handleDadosClienteChange} /></p>
          <p>Cliente: <input type="text" name="cliente" value={dadosCliente.cliente} onChange={handleDadosClienteChange} /></p>
          {/* MUDANÇA AQUI: Campo de input de data */}
          <p>Data:
            <input
              type="date" // Altera o tipo para 'date' para ativar o seletor de calendário nativo
              name="data"
              value={dadosCliente.data} // O valor deve ser uma string YYYY-MM-DD
              onChange={handleDadosClienteChange}
            />
          </p>
        </div>
        <div className="logo-placeholder">
            <img src={logo} alt="Logo Zero Garage" /> {/* Certifique-se de ter sua logo em src/assets/images/ ou ajuste o caminho */}
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