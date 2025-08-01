// src/components/OrcamentoImpresso.jsx
import React, { useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import './OrcamentoImpresso.css'; // CSS para o layout de impressão
import backgroundImage from '../assets/images/background.jpg'; // Mantido conforme solicitação do usuário

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef();

  // Estilo para a imagem de fundo no lugar do logo
  // Se a imagem 'logo.png' estiver na pasta 'public', referencie-a como '/logo.png'
  // OU, se for importada de assets, use a variável importada diretamente.
  // Como o usuário pediu para manter o import, usaremos backgroundImage diretamente.
  const logoBackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Usando a variável importada
    backgroundSize: 'contain', // Ajusta a imagem para caber dentro do elemento, mantendo a proporção
    backgroundPosition: 'center', // Centraliza a imagem
    backgroundRepeat: 'no-repeat', // Evita a repetição
    width: '100px', // Defina a largura do "logo"
    height: '50px', // Defina a altura do "logo"
    // Adicione outras propriedades de estilo conforme necessário para o logo
  };

  // Função para lidar com a impressão
  const handlePrint = useReactToPrint({
    content: () => {
      console.log("handlePrint: Conteúdo do ref NO MOMENTO DA IMPRESSÃO:", componentRef.current);
      return componentRef.current;
    },
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
      /* Estilo para o logo na impressão: DEVE usar um caminho público ou a URL resolvida do asset */
      /* Usando a URL resolvida de 'backgroundImage' para a impressão */
      .logo-impresso-div {
        background-image: url(${backgroundImage}) !important; /* Usando a variável importada */
        background-size: contain !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        width: 100px !important;
        height: 50px !important;
      }
    `,
    // Callback para ser executado após a renderização do conteúdo para impressão
    onAfterPrint: () => {
      console.log("Impressão finalizada ou cancelada.");
      // Opcional: Você pode adicionar lógica aqui após a impressão, como fechar o modal.
    }
  });

  // Efeito para acionar a impressão automaticamente ao carregar (opcional)
  // Removido o auto-print direto para evitar problemas de "nothing to print"
  // O botão "Imprimir Orçamento" agora é a única forma de iniciar a impressão.
  useEffect(() => {
    // Não há chamada automática de handlePrint() aqui.
    // A impressão será acionada apenas pelo clique do botão.
    console.log("OrcamentoImpresso montado. Ref atual NO MOUNT:", componentRef.current);
  }, []);

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado para visualização.</div>;
  }

  // Nova função para lidar com o clique do botão de impressão
  const handlePrintButtonClick = () => {
    console.log("Botão Imprimir clicado. Ref antes da verificação NO CLICK:", componentRef.current);
    // Verifica se o componente de impressão está disponível antes de tentar imprimir
    if (componentRef.current) {
      console.log("Componente de impressão está pronto. Acionando impressão com atraso...");
      // Adiciona um pequeno atraso para garantir que o DOM esteja completamente estável
      setTimeout(() => {
        console.log("Dentro do setTimeout. Ref antes de chamar handlePrint:", componentRef.current);
        handlePrint();
      }, 500); // Atraso de 500ms (ajustado para ser um pouco maior)
    } else {
      console.warn("Componente de impressão não está pronto. Tente novamente.");
      // Opcional: Exibir uma mensagem amigável para o usuário
      // showMessageBox("Conteúdo para impressão não está pronto. Tente novamente.", true);
    }
  };

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          {/* Substituindo a tag <img> por uma <div> com o estilo de fundo */}
          {/* Certifique-se de que o arquivo 'logo.png' está na pasta 'public' do seu projeto */}
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

      <div className="print-buttons">
        {/* Chama a nova função handlePrintButtonClick */}
        <button onClick={handlePrintButtonClick} className="print-btn">Imprimir Orçamento</button>
        <button onClick={onClose} className="back-btn">Voltar ao Painel</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
