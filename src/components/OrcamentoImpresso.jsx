// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react'; // useEffect e useState não são mais necessários para este propósito
import jsPDF from 'jspdf'; // Importa a biblioteca jsPDF
import html2canvas from 'html2canvas'; // Importa a biblioteca html2canvas
import './OrcamentoImpresso.css'; // CSS para o layout de impressão
import backgroundImage from '../assets/images/background.jpg'; // Mantido conforme solicitação do usuário

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null); // É uma boa prática inicializar com null

  const logoBackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Usando a variável importada
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100px',
    height: '50px',
  };

  // Função para gerar e compartilhar o PDF
  const handleSharePdf = async () => {
    if (!componentRef.current) {
      console.error("A referência ao conteúdo do orçamento não foi encontrada. Geração do PDF abortada.");
      // Não usamos alert() aqui, mas você pode ter um sistema de mensagens no seu app
      return;
    }

    // Adiciona um pequeno atraso para garantir que o DOM esteja completamente renderizado
    // antes de capturar com html2canvas.
    setTimeout(async () => {
      try {
        console.log("Iniciando a captura do conteúdo para PDF...");
        const canvas = await html2canvas(componentRef.current, {
          scale: 2, // Aumenta a escala para melhor qualidade do PDF
          useCORS: true, // Importante se tiver imagens de outras origens (como o logo se for URL externa)
          logging: true, // Habilita logs para depuração do html2canvas
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' para retrato, 'mm' para milímetros, 'a4' para tamanho A4

        const imgWidth = 210; // Largura do A4 em mm
        const pageHeight = 297; // Altura do A4 em mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
        pdf.save(filename); // Salva o PDF no dispositivo do usuário
        console.log(`PDF "${filename}" gerado e salvo com sucesso.`);

        // Opcional: Fechar o modal após a geração do PDF
        // onClose();

      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
        // Você pode ter um sistema de mensagens no seu app para informar o usuário
      }
    }, 100); // Pequeno atraso para garantir a renderização completa antes da captura
  };

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado para visualização.</div>;
  }

  return (
    <div className="orcamento-impresso-container">
      {/* O conteúdo para ser capturado no PDF */}
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
                <td><strong>OS:</strong> {orcamento?.ordemServico || 'N/A'}</td>
                <td><strong>Cliente:</strong> {orcamento?.cliente || 'N/A'}</td>
                <td><strong>Data:</strong> {orcamento?.data || 'N/A'}</td>
              </tr>
              <tr>
                <td><strong>Veículo:</strong> {orcamento?.veiculo || 'N/A'}</td>
                <td><strong>Placa:</strong> {orcamento?.placa || 'N/A'}</td>
                <td><strong>Telefone:</strong> {orcamento?.telefone || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="items-section">
          <h2>Peças</h2>
          <ul className="item-list-impresso">
            {orcamento?.pecasSelecionadas && orcamento.pecasSelecionadas.length > 0 ? (
              orcamento.pecasSelecionadas.map((peca, index) => (
                <li key={`peca-${index}`}>{peca}</li>
              ))
            ) : (
              <li>Nenhuma peça orçada.</li>
            )}
          </ul>
          <div className="total-line-impresso">
            <span>Valor Total de Peças:</span>
            <strong>R$ {Number(orcamento?.valorTotalPecas || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="items-section">
          <h2>Serviços</h2>
          <ul className="item-list-impresso">
            {orcamento?.servicosSelecionados && orcamento.servicosSelecionados.length > 0 ? (
              orcamento.servicosSelecionados.map((servico, index) => (
                <li key={`servico-${index}`}>{servico}</li>
              ))
            ) : (
              <li>Nenhum serviço orçado.</li>
            )}
          </ul>
          <div className="total-line-impresso">
            <span>Valor Total de Serviços:</span>
            <strong>R$ {Number(orcamento?.valorTotalServicos || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="summary-section-impresso">
          <div className="total-line-impresso">
            <span>Valor Total de Mão de Obra Mecânica:</span>
            <strong>R$ {Number(orcamento?.totalMaoDeObra || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="total-line-impresso final-total">
            <span>TOTAL GERAL:</span>
            <strong>R$ {Number(orcamento?.valorTotal || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          <p><strong>Forma de Pagamento:</strong> {orcamento?.formaPagamento || 'N/A'}</p>
          <p><strong>Garantia:</strong> {orcamento?.garantia || 'N/A'}</p>
          <p><strong>Observações:</strong> {orcamento?.observacoes || 'N/A'}</p>
          <p><strong>Status:</strong> {orcamento?.status || 'N/A'}</p>
        </section>
      </div>

      {/* Botões de ação fora da área de impressão */}
      <div className="print-buttons">
        <button onClick={handleSharePdf} className="print-btn">Compartilhar PDF</button> {/* Botão atualizado */}
        <button onClick={onClose} className="back-btn">Voltar ao Painel</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
