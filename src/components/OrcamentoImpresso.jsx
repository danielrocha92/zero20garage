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

  // utilitário sleep
  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const handleSharePdf = async () => {
    if (!componentRef.current) {
      console.error("A referência ao conteúdo do orçamento não foi encontrada. Geração do PDF abortada.");
      return;
    }

    setTimeout(async () => {
      const element = componentRef.current;
      const prevInlineWidth = element.style.width || '';

      try {
        console.log("Iniciando a captura do conteúdo para PDF...");

        // Configurações (ajuste se quiser)
        const MAX_CAPTURE_WIDTH_PX = 794; // largura máxima priorizada (mobile)
        const SCALE = 1.5;                // resolução do canvas (1.5 é balanceado)
        const SLICE_HEIGHT_PX = 2000;     // altura por fatia (evitar limites do canvas)

        // Dimensões do conteúdo em CSS pixels
        const contentWidthPx = Math.min(element.scrollWidth || element.offsetWidth || MAX_CAPTURE_WIDTH_PX, MAX_CAPTURE_WIDTH_PX);
        const contentHeightPx = Math.ceil(element.scrollHeight || element.offsetHeight || SLICE_HEIGHT_PX);

        console.log(`Dimensões do conteúdo: largura ${contentWidthPx}px x altura ${contentHeightPx}px`);

        // Tentar captura única (caso simples)
        try {
          const singleCanvas = await html2canvas(element, {
            scale: SCALE,
            useCORS: true,
            logging: false,
            width: contentWidthPx,
            height: contentHeightPx,
            windowWidth: contentWidthPx,
            windowHeight: contentHeightPx
          });

          const coveredHeightPx = Math.round(singleCanvas.height / SCALE);
          console.log(`Canvas único: altura coberta ${coveredHeightPx}px (esperado ${contentHeightPx}px)`);
          if (coveredHeightPx >= contentHeightPx) {
            // usa captura única
            const imgData = singleCanvas.toDataURL('image/png');
            const PX_TO_MM = 25.4 / 96;
            const pdfWidthMm = contentWidthPx * PX_TO_MM;
            const pdfHeightMm = contentHeightPx * PX_TO_MM;

            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: [Number(pdfWidthMm.toFixed(2)), Number(pdfHeightMm.toFixed(2))]
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);

            const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
            pdf.save(filename);
            console.log('PDF gerado com captura única.');
            return;
          } else {
            console.warn('Captura única incompleta — entrando em modo fatias.');
          }
        } catch (errSingle) {
          console.warn('Falha ao tentar captura única (proceder com fatias):', errSingle);
        }

        // --- Fluxo de fatias (fallback) ---
        const slices = [];
        for (let offset = 0; offset < contentHeightPx; offset += SLICE_HEIGHT_PX) {
          const sliceHeightPx = Math.min(SLICE_HEIGHT_PX, contentHeightPx - offset);

          // Criar wrapper que conterá a fatia visível
          const wrapper = document.createElement('div');
          wrapper.style.position = 'absolute';
          wrapper.style.left = '-9999px';
          wrapper.style.top = '0';
          wrapper.style.width = `${contentWidthPx}px`;
          wrapper.style.height = `${sliceHeightPx}px`;
          wrapper.style.overflow = 'hidden';
          wrapper.style.background = '#ffffff';
          wrapper.style.boxSizing = 'border-box';

          // Clonar o conteúdo e deslocá-lo via top negativo (melhor compatibilidade que transform)
          const clone = element.cloneNode(true);
          clone.style.boxSizing = 'border-box';
          clone.style.width = `${contentWidthPx}px`;
          clone.style.maxWidth = `${contentWidthPx}px`;
          clone.style.position = 'relative';
          clone.style.left = '0';
          clone.style.top = `-${offset}px`; // desloca o clone para exibir apenas a fatia
          clone.style.margin = '0';

          wrapper.appendChild(clone);
          document.body.appendChild(wrapper);

          // pequeno delay para garantir paint no mobile
          await sleep(220);

          try {
            const canvasSlice = await html2canvas(wrapper, {
              scale: SCALE,
              useCORS: true,
              logging: false,
              width: contentWidthPx,
              height: sliceHeightPx,
              windowWidth: contentWidthPx,
              windowHeight: sliceHeightPx
            });

            // validação básica
            if (Math.round(canvasSlice.height / SCALE) < 1) {
              throw new Error('Canvas da fatia ficou vazio.');
            }

            slices.push({
              canvas: canvasSlice,
              heightPx: sliceHeightPx
            });

            console.log(`Fat ia capturada: offset ${offset}px, altura ${sliceHeightPx}px`);
          } catch (errSlice) {
            console.error('Erro na captura da fatia (offset', offset, '):', errSlice);
            // remove wrapper antes de propagar erro
            if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
            throw errSlice;
          } finally {
            // limpa wrapper
            if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
          }
        } // fim loop fatias

        // --- Montar PDF contínuo juntando as fatias ---
        const PX_TO_MM = 25.4 / 96;
        const pdfWidthMm = contentWidthPx * PX_TO_MM;
        const pdfHeightMm = contentHeightPx * PX_TO_MM;

        // OBS: alguns visualizadores podem ter problemas com páginas enormes; caso extremo poderemos alternar para multi-page
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [Number(pdfWidthMm.toFixed(2)), Number(pdfHeightMm.toFixed(2))]
        });

        let cursorYmm = 0;
        for (let i = 0; i < slices.length; i++) {
          const { canvas: sliceCanvas, heightPx } = slices[i];
          const imgData = sliceCanvas.toDataURL('image/png');
          const sliceHeightMm = heightPx * PX_TO_MM;

          pdf.addImage(imgData, 'PNG', 0, cursorYmm, pdfWidthMm, sliceHeightMm);
          cursorYmm += sliceHeightMm;
        }

        const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
        pdf.save(filename);

        console.log(`PDF contínuo gerado com ${slices.length} fatias. Largura ${contentWidthPx}px, Altura total ${contentHeightPx}px.`);
      } catch (error) {
        console.error("Erro ao gerar o PDF definitivo:", error);
        alert('Erro ao gerar PDF. Veja o console para detalhes.');
      } finally {
        element.style.width = prevInlineWidth;
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
              A garantia dos serviços realizados pela Zero 20 Garage é válida apenas se o veículo for utilizado conforme as orientações da oficina, incluindo manutenção em dia, uso adequado de combustíveis e respeito aos prazos de revisão. Clientes com pagamentos pendentes não terão direito à garantia, sendo necessário regularizar quaisquer débitos antes de acioná-la. O prazo para solicitar garantia é de 3 meses para serviços de cabeçote e 6 meses para motor completo, mediante contato com a oficina para análise do problema.
              A Zero 20 Garage preza pela qualidade dos serviços prestados e realiza todos os procedimentos com base em diagnósticos técnicos e profissionais qualificados. Em casos excepcionais, se o veículo apresentar falhas recorrentes relacionadas exclusivamente à execução da mão de obra e sem qualquer vínculo com mau uso, falta de manutenção ou desgaste natural de componentes, o cliente poderá solicitar a análise do caso.
              Não haverá reembolso de peças já instaladas no veículo, sob nenhuma circunstância.
            </p>
            <p className="consent-text">
              Ao aceitar o orçamento e iniciar o serviço com a Zero 20 Garage, o cliente declara estar ciente e de acordo com os termos descritos acima.
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
