// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';
import logo from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);

  // === Formatador de moeda ===
  const formatarMoeda = (valor) => {
    if (valor === null || valor === undefined || valor === '' || Number(valor) === 0) {
      return '___________';
    }
    return `R$ ${Number(valor).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  // === Geração de PDF (mantive seu código original) ===
  const handleSharePdf = async () => {
    if (!componentRef.current) return;
    const element = componentRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`orcamento-${orcamento?.ordemServico || 'sem-os'}.pdf`);
  };

  const handleVoltarPainel = () => {
    if (onClose) onClose(orcamento.id || orcamento._id);
    setTimeout(() => {
      const el = document.getElementById('ancora-historico-orcamentos');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado.</div>;
  }

  const pecas = orcamento.pecasSelecionadas || [];
  const servicos = orcamento.servicosSelecionados || [];

  let formattedDate = '___________';
  if (orcamento?.data) {
    const dateToFormat =
      typeof orcamento.data === 'object' && orcamento.data._seconds
        ? dayjs.unix(orcamento.data._seconds)
        : dayjs(orcamento.data);
    if (dateToFormat.isValid()) {
      formattedDate = dateToFormat.format('DD/MM/YYYY HH:mm');
    }
  }

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          <img src={logo} alt="Logo" style={{ maxWidth: 70, height: 'auto' }} />
        </div>

        <section className="info-section">
          <table className="info-table">
            <tbody>
              <tr>
                <td>Veículo: <span>{orcamento?.veiculo || ''}</span></td>
                <td>OS: <span>{orcamento?.ordemServico || ''}</span></td>
                <td>Cliente: <span>{orcamento?.cliente || ''}</span></td>
                <td>Data: <span>{formattedDate}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Peças */}
        {pecas.length > 0 && (
          <section className="items-section">
            <h2>Peças</h2>
            <ul className="item-list-impresso">
              {pecas.map((item, i) => (
                <li key={i}>
                  <input type="checkbox" checked readOnly /> {item}
                </li>
              ))}
            </ul>
            <div className="total-line-impresso">
              Valor total de Peças: <strong>{formatarMoeda(orcamento?.valorTotalPecas)}</strong>
            </div>
          </section>
        )}

        {/* Serviços */}
        {servicos.length > 0 && (
          <section className="items-section">
            <h2>Serviços</h2>
            <ul className="item-list-impresso">
              {servicos.map((item, i) => (
                <li key={i}>
                  <input type="checkbox" checked readOnly /> {item}
                  {orcamento?.observacoesServicos?.[i] && (
                    <p style={{ fontSize: '0.8rem', marginLeft: '1.5rem', color: '#666' }}>
                      {orcamento.observacoesServicos[i]}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            <div className="total-line-impresso">
              Valor total de Serviços: <strong>{formatarMoeda(orcamento?.valorTotalServicos)}</strong>
            </div>
          </section>
        )}

        {/* Totais */}
        <section className="summary-section-impresso">
          <div className="total-line-impresso">
            Mão de Obra Mecânica: <strong>{formatarMoeda(orcamento?.totalMaoDeObra)}</strong>
          </div>
          <div className="total-line-impresso final-total">
            TOTAL GERAL: <strong>{formatarMoeda(orcamento?.valorTotal)}</strong>
          </div>
        </section>

        {/* Forma de pagamento */}
        {orcamento?.formaPagamento && (
          <section className="extra-info-section-impresso" style={{ fontSize: '0.9rem' }}>
            <strong>Forma de Pagamento:</strong> {orcamento.formaPagamento}
          </section>
        )}

        {/* Observações */}
        {orcamento?.observacoes && orcamento.observacoes.trim() !== '' && (
          <section className="extra-info-section-impresso">
            <strong>Observações:</strong> {orcamento.observacoes}
          </section>
        )}

        {/* Imagens */}
        {orcamento?.imagens && orcamento.imagens.length > 0 && (
          <section className="imagens-section">
            <h2>Imagens do Veículo</h2>
            <div className="imagens-container">
              {orcamento.imagens.map((img, i) => (
                <img key={i} src={img} alt={`Foto ${i + 1}`} style={{ maxWidth: 120, margin: 4 }} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="orcamento-impresso-actions" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 12 }}>
        <button className="button" onClick={handleSharePdf}>Gerar PDF</button>
        <button className="button" onClick={handleVoltarPainel}>Voltar</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;