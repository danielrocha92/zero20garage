// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';

// importe o arquivo do logo (ajuste o caminho conforme sua estrutura)
import logo from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);

  // utilitário sleep
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // ---------- Utilitários para Cloudinary & Imagens ----------
  const isCloudinaryUrl = (url) => typeof url === 'string' && url.includes('/upload/');

  // cria uma miniatura eficiente para a UI (sem alterar o arquivo original)
  const getCloudinaryThumb = (url) => {
    if (!isCloudinaryUrl(url)) return url;
    const base = url.split('/upload/')[0] + '/upload/';
    const after = url.split('/upload/')[1] || '';
    const [firstSeg, ...rest] = after.split('/');
    // se já começar com versão (v123...), não tem transformações
    if (/^v\d+$/i.test(firstSeg)) {
      return base + 'w_240,c_limit,q_auto,f_auto/' + after;
    }
    // já tem transformações, prefixa as nossas
    return base + 'w_240,c_limit,q_auto,f_auto,' + firstSeg + '/' + rest.join('/');
  };

  // retorna URL "original" (remove transformações entre /upload/ e /v123/ se houver)
  const getCloudinaryOriginal = (url) => {
    if (!isCloudinaryUrl(url)) return url;
    const base = url.split('/upload/')[0] + '/upload/';
    const after = url.split('/upload/')[1] || '';
    const parts = after.split('/');
    if (parts.length === 0) return url;
    // se o primeiro segmento já é versão, está "original"
    if (/^v\d+$/i.test(parts[0])) return url;
    // remove o primeiro segmento (transformações) e mantém o restante
    return base + parts.slice(1).join('/');
  };

  // carrega uma imagem (URL ou objectURL) e retorna um dataURL PNG "seguro" para o jsPDF
  const toPngDataUrlFromSrc = async (src) => {
    const img = await new Promise((resolve, reject) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = src;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  };

  // devolve dataURL PNG da imagem original (Cloudinary ou File)
  const getOriginalImageAsDataUrl = async (img) => {
    try {
      if (typeof img === 'string') {
        const originalUrl = getCloudinaryOriginal(img);
        return await toPngDataUrlFromSrc(originalUrl);
      }
      if (img instanceof File || (img && img.type && img.size)) {
        const objectUrl = URL.createObjectURL(img);
        const dataUrl = await toPngDataUrlFromSrc(objectUrl);
        URL.revokeObjectURL(objectUrl);
        return dataUrl;
      }
    } catch (e) {
      console.warn('Falha ao preparar imagem para PDF:', e);
    }
    return null;
  };

  // anexa páginas com as imagens originais em alta ao PDF
  const appendOriginalImagesToPdf = async (pdf, imagens) => {
    if (!imagens || imagens.length === 0) return;

    // prepara todos os dataURLs primeiro (sequencialmente para reduzir pico de memória)
    const dataUrls = [];
    for (const it of imagens) {
      const dataUrl = await getOriginalImageAsDataUrl(it);
      if (dataUrl) dataUrls.push(dataUrl);
    }
    if (dataUrls.length === 0) return;

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 10;

    // primeira página de imagens
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text('Imagens originais (alta resolução)', margin, margin + 2);

    let first = true;
    for (let idx = 0; idx < dataUrls.length; idx++) {
      const dataUrl = dataUrls[idx];

      // cria <img> para obter dimensões
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = dataUrl;
      });

      // cálculo de escala para caber dentro da página
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2 - (first ? 10 : 0); // deixa espaço para o título na primeira
      const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;

      const startY = first ? margin + 10 : margin;
      pdf.addImage(dataUrl, 'PNG', margin, startY, drawW, drawH);

      // para múltiplas imagens, abre nova página para a próxima
      if (idx < dataUrls.length - 1) {
        pdf.addPage();
        first = false;
      }
    }
  };

  const handleSharePdf = async () => {
    if (!componentRef.current) {
      console.error('A referência ao conteúdo do orçamento não foi encontrada. Geração do PDF abortada.');
      return;
    }

    setTimeout(async () => {
      const element = componentRef.current;

      const prevInlineWidth = element.style.width || '';
      const prevMaxWidth = element.style.maxWidth || '';
      const prevBodyOverflow = document.body.style.overflow || '';

      try {
        // 🔒 Forçar largura e estabilidade
        element.style.width = '794px';
        element.style.maxWidth = 'none';
        document.body.style.overflow = 'visible';
        element.classList.add('force-print-layout');

        const MAX_CAPTURE_WIDTH_PX = 794;
        const SCALE = 1.5;
        const SLICE_HEIGHT_PX = 2000;

        const contentWidthPx = Math.min(
          element.scrollWidth || element.offsetWidth || MAX_CAPTURE_WIDTH_PX,
          MAX_CAPTURE_WIDTH_PX
        );
        const contentHeightPx = Math.ceil(
          element.scrollHeight || element.offsetHeight || SLICE_HEIGHT_PX
        );

        let pdf = null;

        // --- Tentativa de captura única ---
        try {
          const singleCanvas = await html2canvas(element, {
            scale: SCALE,
            useCORS: true,
            logging: false,
            width: contentWidthPx,
            height: contentHeightPx,
            windowWidth: contentWidthPx,
            windowHeight: contentHeightPx,
          });

          const coveredHeightPx = Math.round(singleCanvas.height / SCALE);

          if (coveredHeightPx >= contentHeightPx) {
            const imgData = singleCanvas.toDataURL('image/png');
            const PX_TO_MM = 25.4 / 96;
            const pdfWidthMm = contentWidthPx * PX_TO_MM;
            const pdfHeightMm = contentHeightPx * PX_TO_MM;

            pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'mm',
              format: [Number(pdfWidthMm.toFixed(2)), Number(pdfHeightMm.toFixed(2))],
            });

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);
          }
        } catch (errSingle) {
          console.warn('Falha ao tentar captura única:', errSingle);
        }

        // --- Fallback: captura por fatias ---
        if (!pdf) {
          const slices = [];
          for (let offset = 0; offset < contentHeightPx; offset += SLICE_HEIGHT_PX) {
            const sliceHeightPx = Math.min(SLICE_HEIGHT_PX, contentHeightPx - offset);

            const wrapper = document.createElement('div');
            wrapper.style.position = 'absolute';
            wrapper.style.left = '-9999px';
            wrapper.style.top = '0';
            wrapper.style.width = `${contentWidthPx}px`;
            wrapper.style.height = `${sliceHeightPx}px`;
            wrapper.style.overflow = 'hidden';
            wrapper.style.background = '#ffffff';
            wrapper.style.boxSizing = 'border-box';

            const clone = element.cloneNode(true);
            clone.style.boxSizing = 'border-box';
            clone.style.width = `${contentWidthPx}px`;
            clone.style.maxWidth = `${contentWidthPx}px`;
            clone.style.position = 'relative';
            clone.style.left = '0';
            clone.style.top = `-${offset}px`;
            clone.style.margin = '0';

            wrapper.appendChild(clone);
            document.body.appendChild(wrapper);

            await sleep(220);

            try {
              const canvasSlice = await html2canvas(wrapper, {
                scale: SCALE,
                useCORS: true,
                logging: false,
                width: contentWidthPx,
                height: sliceHeightPx,
                windowWidth: contentWidthPx,
                windowHeight: sliceHeightPx,
              });

              slices.push({
                canvas: canvasSlice,
                heightPx: sliceHeightPx,
              });
            } finally {
              if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
            }
          }

          // Montar PDF com fatias
          const PX_TO_MM = 25.4 / 96;
          const pdfWidthMm = contentWidthPx * PX_TO_MM;
          const pdfHeightMm = contentHeightPx * PX_TO_MM;

          pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [Number(pdfWidthMm.toFixed(2)), Number(pdfHeightMm.toFixed(2))],
          });

          let cursorYmm = 0;
          for (let i = 0; i < slices.length; i++) {
            const { canvas: sliceCanvas, heightPx } = slices[i];
            const imgData = sliceCanvas.toDataURL('image/png');
            const sliceHeightMm = heightPx * PX_TO_MM;

            pdf.addImage(imgData, 'PNG', 0, cursorYmm, pdfWidthMm, sliceHeightMm);
            cursorYmm += sliceHeightMm;
          }
        }

        // 👉 Anexa as imagens originais em páginas próprias (alta resolução)
        await appendOriginalImagesToPdf(pdf, orcamento?.imagens || []);

        const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
        pdf.save(filename);
      } catch (error) {
        console.error('Erro ao gerar o PDF definitivo:', error);
      } finally {
        // 🧹 Reverter alterações temporárias
        element.style.width = prevInlineWidth;
        element.style.maxWidth = prevMaxWidth;
        document.body.style.overflow = prevBodyOverflow;
        element.classList.remove('force-print-layout');
      }
    }, 100);
  };

  const handleVoltarPainel = () => {
    if (onClose) onClose(orcamento.id || orcamento._id);
    setTimeout(() => {
      const el = document.getElementById('ancora-historico-orcamentos');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Lógica para renderização condicional
  const mostrarServicos =
    servicos.length > 0 ||
    (orcamento.valorTotalServicos && orcamento.valorTotalServicos > 0) ||
    (orcamento.totalMaoDeObra && orcamento.totalMaoDeObra > 0);

  // Lógica para formatar a data
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
        {/* Cabeçalho com logo alinhado à direita */}
        <div
          className="header-impresso"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <h1 style={{ margin: 0 }}>
            ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}
          </h1>
          <img
            src={logo}
            alt="Logo Zero20Garage"
            className="logo-impresso"
            style={{ maxWidth: 70, height: 'auto', marginLeft: 'auto' }}
          />
        </div>

        <section className="info-section">
          <table className="info-table">
            <tbody>
              <tr>
                <td>
                  Veículo: <span className="input-line">{orcamento?.veiculo || ''}</span>
                </td>
                <td>
                  OS: <span className="input-line">{orcamento?.ordemServico || ''}</span>
                </td>
                <td>
                  Cliente: <span className="input-line">{orcamento?.cliente || ''}</span>
                </td>
                <td>
                  Data:
                  <span className="data-orcamento">
                    <span className="data-formatada">{formattedDate}</span>
                  </span>
                </td>
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
            {orcamento?.valorTotalPecas ? (
              <strong>R$ {Number(orcamento.valorTotalPecas).toFixed(2).replace('.', ',')}</strong>
            ) : (
              <strong>___________</strong>
            )}
          </div>
        </section>

        {mostrarServicos && (
          <>
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
                {orcamento?.valorTotalServicos ? (
                  <strong>
                    R$ {Number(orcamento.valorTotalServicos).toFixed(2).replace('.', ',')}
                  </strong>
                ) : (
                  <strong>___________</strong>
                )}
              </div>
            </section>

            <section className="summary-section-impresso">
              <div className="total-line-impresso">
                <span>Valor total de mão de Obra Mecânica:</span>
                <span>
                  {orcamento?.totalMaoDeObra ? (
                    <strong>R$ {Number(orcamento.totalMaoDeObra).toFixed(2).replace('.', ',')}</strong>
                  ) : (
                    <strong>___________</strong>
                  )}
                </span>
              </div>
            </section>
          </>
        )}

        <section className="summary-section-impresso">
          <div className="total-line-impresso final-total">
            <span>TOTAL GERAL:</span>
            {orcamento?.valorTotal ? (
              <strong>R$ {Number(orcamento.valorTotal).toFixed(2).replace('.', ',')}</strong>
            ) : (
              <strong>___________</strong>
            )}
          </div>
        </section>

        <section className="extra-info-section-impresso">
          <div className="info-line">
            <strong>Forma de Pagamento:</strong>
            <span>{orcamento?.formaPagamento || '___________'}</span>
          </div>
          <div className="info-line">
            <strong>Observações:</strong>
            <span>{orcamento?.observacoes || '___________'}</span>
          </div>
        </section>

        <section className="policy-footer">
          <div className="policy-box">
            <h4>Política de Garantia, Troca e Devolução</h4>
            <p className="policy-text">
              A garantia dos serviços realizados pela Zero 20 Garage é válida apenas se o veículo for
              utilizado conforme as orientações da oficina, incluindo manutenção em dia, uso adequado de
              combustíveis e respeito aos prazos de revisão. Clientes com pagamentos pendentes não terão
              direito à garantia, sendo necessário regularizar quaisquer débitos antes de acioná-la. O
              prazo para solicitar garantia é de 3 meses para serviços de cabeçote e 6 meses para motor
              completo, mediante contato com a oficina para análise do problema. A Zero 20 Garage preza
              pela qualidade dos serviços prestados e realiza todos os procedimentos com base em
              diagnósticos técnicos e profissionais qualificados. Em casos excepcionais, se o veículo
              apresentar falhas recorrentes relacionadas exclusivamente à execução da mão de obra e sem
              qualquer vínculo com mau uso, falta de manutenção ou desgaste natural de componentes, o
              cliente poderá solicitar a análise do caso. Não haverá reembolso de peças já instaladas no
              veículo, sob nenhuma circunstância.
            </p>
            <p className="consent-text">
              Ao aceitar o orçamento e iniciar o serviço com a Zero 20 Garage, o cliente declara estar
              ciente e de acordo com os termos descritos acima.
            </p>
          </div>
        </section>

        {/* Miniaturas (rápidas) na tela; PDF terá as originais em páginas extras */}
        <section className="imagens-section">
          <h2>Imagens do Veículo</h2>
          <div className="imagens-container">
            {orcamento.imagens &&
              orcamento.imagens.map((img, idx) => {
                const thumbSrc =
                  typeof img === 'string'
                    ? getCloudinaryThumb(img)
                    : URL.createObjectURL(img);
                return (
                  <img
                    key={idx}
                    src={thumbSrc}
                    alt={`Foto ${idx + 1}`}
                    crossOrigin="anonymous"
                    loading="lazy"
                    style={{ maxWidth: 120, margin: 4, borderRadius: 8 }}
                    onLoad={(e) => {
                      // revoga objectURL gerado para File após carregar
                      if (typeof img !== 'string') URL.revokeObjectURL(thumbSrc);
                    }}
                  />
                );
              })}
          </div>
        </section>
      </div>

      <div className="print-buttons">
        <button onClick={handleSharePdf} className="print-btn">
          Compartilhar PDF
        </button>
        <button onClick={handleVoltarPainel} className="back-btn">
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
