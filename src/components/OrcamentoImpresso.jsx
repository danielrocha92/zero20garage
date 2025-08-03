// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';
import backgroundImage from '../assets/images/background.jpg'; // Mantido conforme solicitação do usuário

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);

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
      return;
    }

    setTimeout(async () => {
      try {
        console.log("Iniciando a captura do conteúdo para PDF...");
        const canvas = await html2canvas(componentRef.current, {
          scale: 2, // Aumenta a escala para melhor qualidade do PDF
          useCORS: true, // Importante se tiver imagens de outras origens
          logging: true, // Habilita logs para depuração
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const margin = 10; // mm
        const contentWidth = pdfWidth - (margin * 2);
        const contentHeight = pdfHeight - (margin * 2);

        const imgHeight = (canvas.height * contentWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
        heightLeft -= contentHeight;

        while (heightLeft > -1 * contentHeight) {
          position = heightLeft - imgHeight + margin;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
          heightLeft -= contentHeight;
        }

        const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
        pdf.save(filename);
        console.log(`PDF "${filename}" gerado e salvo com sucesso.`);

      } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
      }
    }, 100);
  };

  if (!orcamento) {
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado para visualização.</div>;
  }

  // Dados de peças e serviços do modelo para simular o layout
  // Estes são exemplos estáticos baseados na imagem para preencher as colunas
  const pecasModeloColuna1 = [
    "Pistão", "Anel", "Bronzina de mancal", "Bronzina de biela",
    "Arruela encosto", "Bomba de óleo", "Bomba d'água", "Tubo d'água",
    "Filtro de óleo", "Filtro de ar", "Filtro de combustível",
    "Litros de óleo", "Litros de aditivo", "Correias",
    "Dent kit | Capa | Acessórios kit | Corrente kit", "Válvula term",
    "Kit junta motor aço", "Retentor traseiro virab.", "Engrenagem virab."
  ];

  const pecasModeloColuna2 = [
    "Retentor eixo comando", "Retentor válvula", "Comando de Válvula: Admis | Escape",
    "Mangueiras Radiador: Inferior | Superior", "Válvulas escape",
    "Válvulas admissão", "Velas", "Anti Chamas", "Silicone",
    "Parafusos cabeçote", "Bobina", "Tuchos", "Cebolinha de óleo",
    "Sensor de temperatura", "Retentor eixo comando", "Retentor traseiro virab.",
    "Retentor válvula", "Silicone", "Tubo d'água", "Biela", "Embreagem",
    "Desengripante e Limpa contato", "Outros"
  ];

  const servicosModeloColuna1 = [
    "Bloco usinagem completa", "Cabeçote: Usinagem completa | Limpeza e Revisão | Novo | Recuperação altura",
    "Bielas: Usinagem | Nova", "Volante Usinagem completa",
    "Banho (cárter, suportes, parafusos etc)"
  ];

  const servicosModeloColuna2 = [
    "Viraquim: Usinagem completa | Novo", "Montagem de motor Técnica"
  ];

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          <div className="logo-impresso-div" style={logoBackgroundStyle} aria-label="Logo Zero20Garage"></div>
        </div>

        <section className="info-section">
          <table className="info-table">
            <tbody>
              <tr>
                <td>Veículo: <span className="input-line">{orcamento?.veiculo || ''}</span></td>
                <td>OS: <span className="input-line">{orcamento?.ordemServico || ''}</span></td>
                <td>Cliente: <span className="input-line">{orcamento?.cliente || ''}</span></td>
                <td>Data: <span className="input-line">{orcamento?.data || ''}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="items-section">
          <h2>Peças</h2>
          <div className="items-columns">
            <ul className="item-list-impresso">
              {pecasModeloColuna1.map((item, index) => (
                <li key={`peca1-${index}`}>
                  <span className="checkbox-box"></span>
                  <span className="item-text">{item}</span>
                  <span className="input-line-small"></span> {/* Linha para preenchimento */}
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {pecasModeloColuna2.map((item, index) => (
                <li key={`peca2-${index}`}>
                  <span className="checkbox-box"></span>
                  <span className="item-text">{item}</span>
                  <span className="input-line-small"></span> {/* Linha para preenchimento */}
                </li>
              ))}
            </ul>
          </div>
          <div className="total-line-impresso">
            <span>Valor total de Peças:</span>
            <strong>R$ {Number(orcamento?.valorTotalPecas || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="items-section">
          <h2>Serviços - Retífica</h2>
          <div className="items-columns">
            <ul className="item-list-impresso">
              {servicosModeloColuna1.map((item, index) => (
                <li key={`servico1-${index}`}>
                  <span className="checkbox-box"></span>
                  <span className="item-text">{item}</span>
                  <span className="input-line-small"></span> {/* Linha para preenchimento */}
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {servicosModeloColuna2.map((item, index) => (
                <li key={`servico2-${index}`}>
                  <span className="checkbox-box"></span>
                  <span className="item-text">{item}</span>
                  <span className="input-line-small"></span> {/* Linha para preenchimento */}
                </li>
              ))}
            </ul>
          </div>
          <div className="total-line-impresso">
            <span>Valor total de Serviços:</span>
            <strong>R$ {Number(orcamento?.valorTotalServicos || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
        </section>

        <section className="summary-section-impresso">
          <div className="total-line-impresso">
            <span>Valor total de mão de Obra:</span>
            <strong>R$ {Number(orcamento?.totalMaoDeObra || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          <div className="total-line-impresso final-total">
            <span>TOTAL GERAL:</span>
            <strong>R$ {Number(orcamento?.valorTotal || 0).toFixed(2).replace('.', ',')}</strong>
          </div>
          {/* Removidos campos que não aparecem no modelo original para manter fidelidade */}
          {/* <p><strong>Forma de Pagamento:</strong> {orcamento?.formaPagamento || 'N/A'}</p>
          <p><strong>Garantia:</strong> {orcamento?.garantia || 'N/A'}</p>
          <p><strong>Observações:</strong> {orcamento?.observacoes || 'N/A'}</p>
          <p><strong>Status:</strong> {orcamento?.status || 'N/A'}</p> */}
        </section>
      </div>

      {/* Botões de ação fora da área de impressão */}
      <div className="print-buttons">
        <button onClick={handleSharePdf} className="print-btn">Compartilhar PDF</button>
        <button onClick={onClose} className="back-btn">Voltar ao Painel</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
