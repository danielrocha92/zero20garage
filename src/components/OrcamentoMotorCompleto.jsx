// src/components/OrcamentoImpresso.jsx
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
      {/* conteúdo visual mantido no arquivo */}
    </div>
  );
}
//     <section className="orcamento-impresso">
//       <header className="orcamento-header">  