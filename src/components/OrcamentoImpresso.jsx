// src/components/OrcamentoImpresso.jsx
import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SignatureCanvas from 'react-signature-canvas';
import './OrcamentoImpresso.css';
import backgroundImage from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);
  const sigCanvasRef = useRef(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const logoBackgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100px',
    height: '50px',
  };

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
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
                  <span className="checkbox-box checkbox-filled"></span>
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {pecasColuna2.map((item, index) => (
                <li key={`peca2-${index}`}>
                  <span className="checkbox-box checkbox-filled"></span>
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
                  <span className="checkbox-box checkbox-filled"></span>
                  <span className="item-text">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="item-list-impresso">
              {servicosColuna2.map((item, index) => (
                <li key={`servico2-${index}`}>
                  <span className="checkbox-box checkbox-filled"></span>
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
          </div>
          <div className="signature-area">
            <div className="signature-line-group">
              <div className="signature-line">
                <span className="signature-label">Cliente:</span>
                <span className="signature-input-line">{orcamento?.cliente || ''}</span>
              </div>
              <div className="signature-line">
                <span className="signature-label">RG / CPF:</span>
                <span className="signature-input-line"></span>
              </div>
            </div>
            <div className="policy-consent">
              <input
                type="checkbox"
                id="policy-consent"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className='checkbox-box-impresso'
              />
              <label htmlFor="policy-consent">
                Li e concordo com os termos e condições de garantia, troca e devolução.
              </label>
            </div>
            <div className="signature-block">
              <span className="signature-label">Assinatura Eletrônica (Cliente):</span>
              <SignatureCanvas
                ref={sigCanvasRef}
                penColor="black"
                canvasProps={{ className: 'sig-canvas' }}
              />
              <button onClick={clearSignature} className="clear-sig-btn">Limpar Assinatura</button>
            </div>
          </div>
        </section>
      </div>

      <div className="print-buttons">
        <button onClick={handleSharePdf} className="print-btn">Compartilhar PDF</button>

        {/* Alterado para enviar o ID do orçamento ao fechar */}
        <button onClick={() => onClose(orcamento.id || orcamento._id)} className="back-btn">
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
