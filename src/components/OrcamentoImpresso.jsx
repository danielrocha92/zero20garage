// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react'; // useEffect não é mais necessário aqui
import { useReactToPrint } from 'react-to-print';
import './OrcamentoImpresso.css';
import backgroundImage from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null); // É uma boa prática inicializar com null

  const logoBackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100px',
    height: '50px',
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .logo-impresso-div {
        background-image: url(${backgroundImage}) !important;
        background-size: contain !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        width: 100px !important;
        height: 50px !important;
      }
    `,
    onAfterPrint: () => {
      console.log("Impressão finalizada ou cancelada.");
    }
  });

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado para visualização.</div>;
  }

// Função de clique do botão corrigida e mais segura
const handlePrintButtonClick = () => {
  // 1. Verifica se a referência ao componente de impressão está válida
  if (componentRef.current) {
    // 2. Se estiver válida, chama a função de impressão
    handlePrint();
  } else {
    // 3. Se não, informa o erro e, opcionalmente, o usuário
    console.error("A referência ao conteúdo de impressão não foi encontrada. Impressão abortada.");
    alert("Ocorreu um erro ao preparar a impressão. Por favor, tente novamente.");
  }
};

  return (
    <div className="orcamento-impresso-container">
      {/* O conteúdo para impressão */}
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          <div className="logo-impresso-div" style={logoBackgroundStyle} aria-label="Logo Zero20Garage"></div>
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

      {/* Botões de ação fora da área de impressão */}
      <div className="print-buttons">
        <button onClick={handlePrintButtonClick} className="print-btn">Imprimir Orçamento</button>
        <button onClick={onClose} className="back-btn">Voltar ao Painel</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;