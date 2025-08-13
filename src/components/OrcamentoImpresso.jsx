// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';
import backgroundImage from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);

  const logoBackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100px',
    height: '50px',
  };

  const handleSharePdf = async () => {
    if (!componentRef.current) {
      console.error("A referência ao conteúdo do orçamento não foi encontrada. Geração do PDF abortada.");
      return;
    }

    setTimeout(async () => {
      try {
        console.log("Iniciando a captura do conteúdo para PDF...");
        const canvas = await html2canvas(componentRef.current, {
          scale: 2,
          useCORS: true,
          logging: true,
          width: 794,
          windowWidth: 794
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 10;
        const contentWidth = pdfWidth - (margin * 2);
        const imgHeight = (canvas.height * contentWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, imgHeight);

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

  const pecas = orcamento.pecasSelecionadas || [];
  const servicos = orcamento.servicosSelecionados || [];
  const pecasMidPoint = Math.ceil(pecas.length / 2);
  const pecasColuna1 = pecas.slice(0, pecasMidPoint);
  const pecasColuna2 = pecas.slice(pecasMidPoint);

  const servicosMidPoint = Math.ceil(servicos.length / 2);
  const servicosColuna1 = servicos.slice(0, servicosMidPoint);
  const servicosColuna2 = servicos.slice(servicosMidPoint);

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
              {pecasColuna1.map((item, index) => (
                <li key={`peca1-${index}`}>
                  <input type="checkbox" className="checkbox-box" checked readOnly />
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {pecasColuna2.map((item, index) => (
                <li key={`peca2-${index}`}>
                  <input type="checkbox" className="checkbox-box" checked readOnly />
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="total-line-impresso">
            <span>Valor total de Peças:</span>
            {orcamento?.valorTotalPecas
              ? <strong>R$ {Number(orcamento.valorTotalPecas).toFixed(2).replace('.', ',')}</strong>
              : <strong>___________</strong>}
          </div>
        </section>

        <section className="items-section">
          <h2>Serviços - Retífica</h2>
          <div className="items-columns">
            <ul className="item-list-impresso">
              {servicosColuna1.map((item, index) => (
                <li key={`servico1-${index}`}>
                  <input type="checkbox" className="checkbox-box" checked readOnly />
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {servicosColuna2.map((item, index) => (
                <li key={`servico2-${index}`}>
                  <input type="checkbox" className="checkbox-box" checked readOnly />
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="total-line-impresso">
            <span>Valor total de Serviços:</span>
            {orcamento?.valorTotalServicos
              ? <strong>R$ {Number(orcamento.valorTotalServicos).toFixed(2).replace('.', ',')}</strong>
              : <strong>___________</strong>}
          </div>
        </section>

        <section className="summary-section-impresso">
          <div className="total-line-impresso">
            <span>Valor total de mão de Obra:</span>
            {orcamento?.totalMaoDeObra
              ? <strong>R$ {Number(orcamento.totalMaoDeObra).toFixed(2).replace('.', ',')}</strong>
              : <strong>___________</strong>}
          </div>
          <div className="total-line-impresso final-total">
            <span>TOTAL GERAL:</span>
            {orcamento?.valorTotal
              ? <strong>R$ {Number(orcamento.valorTotal).toFixed(2).replace('.', ',')}</strong>
              : <strong>___________</strong>}
          </div>
        </section>

        <section className="policy-footer">
          <div className="policy-box">
            <h4>Política de Garantia, Troca e Devolução</h4>
            <p className="policy-text">
              (INSERIR POLÍTICA AQUI) - A garantia cobre defeitos de fabricação e de montagem. Não cobre danos causados por mau uso, negligência ou acidentes. Peças eletrônicas não possuem garantia após a instalação. Devoluções e trocas devem ser solicitadas em até 7 dias após o serviço, mediante apresentação do orçamento e nota fiscal.
            </p>
            <p className="consent-text">
              Ao dar "OK" a este documento, o cliente declara estar ciente e de acordo com os termos e condições da política de garantia, troca e devolução aqui descritos.
            </p>
          </div>
        </section>
      </div>

      <div className="print-buttons">
        <button onClick={handleSharePdf} className="print-btn">Compartilhar PDF</button>

        <button onClick={() => onClose(orcamento.id || orcamento._id)} className="back-btn">
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;