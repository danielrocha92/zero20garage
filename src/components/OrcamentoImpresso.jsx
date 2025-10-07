// src/components/OrcamentoImpresso.jsx
import React, { useRef } from "react";
import "./OrcamentoImpresso.css";
import logo from "../assets/images/background.jpg";
import { usePdfGenerator } from "../hooks/usePdfGenerator";
import { useExcelExporter } from "../hooks/useExcelExporter";
import { formatDate, formatValue } from "../utils/formatters";
import BudgetSection from "./BudgetSection";

// Componente para as imagens, pode até ficar no mesmo arquivo se for pequeno.
const ImagensVeiculo = ({ imagens }) => (
  <section className="items-section imagens-section">
    <h2>Imagens do Veículo</h2>
    <div className="imagens-container">
      {imagens.map((img, idx) => (
        <div key={idx} className="thumb-wrapper">
          <img src={img?.imagemUrl || ""} alt={`Foto ${idx + 1}`} className="thumb-img" />
        </div>
      ))}
    </div>
  </section>
);

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);
  const { generatePdf, isGenerating: isPdfGenerating } = usePdfGenerator(componentRef);
  const { exportToExcel } = useExcelExporter();

  const handleVoltarPainel = () => {
    if (onClose) onClose(orcamento.id || orcamento._id);
    // ... lógica de scroll
  };

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado.</div>;
  }

  const showObservacoes = orcamento.observacoes?.trim() !== "";
  const showImages = orcamento.imagens?.length > 0;

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        {/* Cabeçalho */}
        <div className="header-impresso">
          <h1 className="titulo-impresso">
            ORÇAMENTO - {orcamento.tipo === "motor" ? "MOTOR COMPLETO/PARCIAL" : "CABEÇOTE"}
          </h1>
          <img src={logo} alt="Logo Zero20Garage" className="logo-impresso" />
        </div>

        {/* Informações */}
        <section className="info-section">
          <div className="info-container">
            <div className="info-row">
              <div className="info-item">OS: <span>{orcamento.ordemServico || ""}</span></div>
              <div className="info-item">Cliente: <span>{orcamento.cliente || ""}</span></div>
              <div className="info-item">Data: <span>{formatDate(orcamento.data || new Date())}</span></div>
            </div>
            <div className="info-row" id="info-row-veiculo">
              <div className="info-item">Veículo: <span>{orcamento.veiculo || ""}</span></div>
              <div className="info-item">Placa: <span>{orcamento.placa || ""}</span></div>
              <div className="info-item">Telefone: <span>{orcamento.telefone || ""}</span></div>
            </div>
          </div>
        </section>

        {/* Peças e Serviços */}
        <BudgetSection
          title="Peças"
          items={orcamento.pecasSelecionadas}
          total={orcamento.valorTotalPecas}
          totalLabel="Valor total de Peças"
        />

        <BudgetSection
          title="Serviços - Retífica"
          items={orcamento.servicosSelecionados}
          total={orcamento.valorTotalServicos}
          totalLabel="Valor total de Serviços"
        />

        {Number(orcamento.totalMaoDeObra) > 0 && (
            <div className="total-line-impresso">
                <span>Valor total de mão de obra:</span>
                <strong>{formatValue(orcamento.totalMaoDeObra)}</strong>
            </div>
        )}

        {/* Total Geral */}
        <div className="total-line-impresso final-total">
          <span>TOTAL GERAL:</span>
          <strong>{formatValue(orcamento.valorTotal)}</strong>
        </div>

        {/* Informações Extras */}
        <div className="extra-info-section-impresso">
            <p><strong>Forma de Pagamento:</strong> {orcamento.formaPagamento || ""}</p>
            {showObservacoes && <p><strong>Observações:</strong> {orcamento.observacoes}</p>}
        </div>

        {/* Imagens e Política */}
        {showImages && <ImagensVeiculo imagens={orcamento.imagens} />}

        <section className="policy-footer">
          {/* ... conteúdo da política de garantia ... */}
        </section>

      </div>

      {/* Ações */}
      <div className="orcamento-impresso-actions">
        <button className="ctn-button" onClick={() => generatePdf(orcamento)} disabled={isPdfGenerating}>
          {isPdfGenerating ? "Gerando PDF..." : "Gerar PDF"}
        </button>
        <button className="ctn-button" onClick={() => exportToExcel(orcamento)} disabled={isPdfGenerating}>
          Exportar Excel
        </button>
        <button className="ctn-button" onClick={handleVoltarPainel} disabled={isPdfGenerating}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
