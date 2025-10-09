// src/components/OrcamentoImpresso.jsx
import React, { useRef } from "react";
import "../../styles/OrcamentoImpresso.css";
import logo from "../../assets/images/background.jpg";
import { usePdfGenerator } from "../../hooks/usePdfGenerator";
import { useExcelExporter } from "../../hooks/useExcelExporter";
import { formatDate, formatValue } from "../../utils/formatters";
import BudgetSection from "../BudgetSection";

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
          <table className="info-table">
            <tbody>
              <tr>
                <td className="info-item">OS: <span>{orcamento.ordemServico || ""}</span></td>
                <td className="info-item">Cliente: <span>{orcamento.cliente || ""}</span></td>
                <td className="info-item">Data: <span>{formatDate(orcamento.data || new Date())}</span></td>
              </tr>
              <tr>
                <td className="info-item">Veículo: <span>{orcamento.veiculo || ""}</span></td>
                <td className="info-item">Placa: <span>{orcamento.placa || ""}</span></td>
                <td className="info-item">Telefone: <span>{orcamento.telefone || ""}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Peças e Serviços */}
        <BudgetSection
          id="pecas-section"
          title="Peças"
          items={orcamento.pecasSelecionadas}
          total={orcamento.valorTotalPecas}
          totalLabel="Valor total de Peças"
        />

        <BudgetSection
          id="servicos-section"
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
          <h4>Política de Garantia, Troca e Devolução</h4>
          <p>A garantia dos serviços realizados pela Zero 20 Garage é válida apenas se o veículo for utilizado conforme as orientações da oficina, incluindo manutenções em dia, uso adequado de combustíveis e respeito aos prazos de revisão. Clientes com pagamentos pendentes não terão direito à garantia, sendo que a mesma só pode ser ativada mediante apresentação do orçamento.</p>
          <p>O documento comprova a realização dos serviços e/ou compra das peças para o motor completo, mediante contato com a oficina para análise do problema. A Zero 20 Garage preza pela qualidade dos serviços prestados e realiza todos os procedimentos com base em diagnósticos técnicos e profissionais qualificados.</p>
          <p>Em casos de avarias, se o veículo apresentar danos ou acidentes ocasionados por fenômenos da natureza ou da ação de terceiros, a garantia não será válida.</p>
          <p>Em caso de uso incorreto ou desgaste natural de componentes, o cliente poderá solicitar a análise do caso.</p>
          <p>Não haverá reembolso de peças já instaladas no veículo, sob nenhuma circunstância.</p>
          <p className="policy-acceptance">Ao aceitar o orçamento e iniciar o serviço com a Zero 20 Garage, o cliente declara estar ciente e de acordo com os termos descritos acima.</p>
        </section>

      </div>

      {/* Ações */}
      <div className="orcamento-impresso-actions">
        <button className="button" onClick={() => generatePdf(orcamento)} disabled={isPdfGenerating}>
          {isPdfGenerating ? "Gerando PDF..." : "Gerar PDF"}
        </button>
        <button className="button" onClick={() => exportToExcel(orcamento)} disabled={isPdfGenerating}>
          Exportar Excel
        </button>
        <button className="button" onClick={handleVoltarPainel} disabled={isPdfGenerating}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
