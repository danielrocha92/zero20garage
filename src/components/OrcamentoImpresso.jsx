// src/components/OrcamentoImpresso.jsx
import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './OrcamentoImpresso.css'; // CSS para o layout de impressão
import backgroundImage from '../assets/images/background.jpg'; // Certifique-se de que o caminho está correto

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef();

  // Função para lidar com a impressão
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Orçamento_OS_${orcamento.ordemServico || 'SemOS'}_${orcamento.cliente || 'SemCliente'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    `,
  });

  // Efeito para acionar a impressão automaticamente ao carregar (opcional)
  useEffect(() => {
    // Você pode remover esta linha se preferir que o usuário clique no botão "Imprimir"
    // handlePrint();
  }, []);

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado para visualização.</div>;
  }

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          <img src="https://placehold.co/100x50/cccccc/333333?text=LOGO" alt="Logo Zero20Garage" className="logo-impresso" />
        </div>

        <section className="info-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="info-table">
            <tbody>
              <tr>
                <td><strong>OS:</strong> {orcamento.ordemServico || 'N/A'}</td>
                <td><strong>Cliente:</strong> {orcamento.cliente || 'N/A'}</td>
                <td><strong>Data:</strong> {orcamento.data || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Veículo:</strong> {orcamento.veiculo || 'N/A'}</td>
                <td><strong>Placa:</strong> {orcamento.placa || 'N/A'}</td>
                <td><strong>Telefone:</strong> {orcamento.telefone || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="items-section">
          <h2>Peças</h2>
          <ul className="item-list-impresso">
            {orcamento.pecasSelecionadas && orcamento.pecasSelecionadas.length > 0 ? (
              orcamento.pecasSelecionadas.map((peca, index) => (
                <li key={`peca-${index}`}>{peca}</li>
              ))
            ) : (
              <li>Nenhuma peça orçada.</li>
            )}
          </ul>
          <div className="total-line-impresso">
            <span>Valor Total de Peças:</span>
            <strong>R$ {Number(orcamento.valorTotalPecas || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="items-section">
          <h2>Serviços</h2>
          <ul className="item-list-impresso">
            {orcamento.servicosSelecionados && orcamento.servicosSelecionados.length > 0 ? (
              orcamento.servicosSelecionados.map((servico, index) => (
                <li key={`servico-${index}`}>{servico}</li>
              ))
            ) : (
              <li>Nenhum serviço orçado.</li>
            )}
          </ul>
          <div className="total-line-impresso">
            <span>Valor Total de Serviços:</span>
            <strong>R$ {Number(orcamento.valorTotalServicos || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="summary-section-impresso">
          <div className="total-line-impresso">
            <span>Valor Total de Mão de Obra Mecânica:</span>
            <strong>R$ {Number(orcamento.totalMaoDeObra || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="total-line-impresso final-total">
            <span>TOTAL GERAL:</span>
            <strong>R$ {Number(orcamento.valorTotal || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          <p><strong>Forma de Pagamento:</strong> {orcamento.formaPagamento || 'N/A'}</p>
          <p><strong>Garantia:</strong> {orcamento.garantia || 'N/A'}</p>
          <p><strong>Observações:</strong> {orcamento.observacoes || 'N/A'}</p>
          <p><strong>Status:</strong> {orcamento.status || 'N/A'}</p>
        </section>
      </div>

      <div className="print-buttons">
        <button onClick={handlePrint} className="print-btn">Imprimir Orçamento</button>
        <button onClick={onClose} className="back-btn">Voltar ao Painel</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
