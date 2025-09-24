import React, { useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';
import 'dayjs/locale/pt-br';
dayjs.locale('pt-br');

const CategorizedItemsSection = ({ title, itemsByCategory, totalValue, formatValue }) => {
  const categories = Object.keys(itemsByCategory || {});
  if (categories.length === 0) return null;

  const hasItems = categories.some(category =>
    Array.isArray(itemsByCategory[category]) && itemsByCategory[category].length > 0
  );
  if (!hasItems) return null;

  return (
    <section className="orcamento-section">
      <h2 className="section-title">{title}</h2>
      <div className="section-grid">
        {categories.map(category => (
          <div key={category} className="section-card">
            <h3 className="section-subtitle">{category}</h3>
            <ul className="section-list">
              {Array.isArray(itemsByCategory[category]) &&
                itemsByCategory[category].map((item, index) => {
                  let itemName;
                  if (typeof item === 'string') itemName = item.trim();
                  else if (item && typeof item === 'object' && item.name) itemName = item.name;
                  else return null;
                  if (!itemName) return null;

                  return (
                    <li key={index} className="list-item">
                      <input type="checkbox" className="checkbox-box" />
                      <span>{itemName}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
      <div className="section-total">
        <span>Valor total de {title}:</span>
        <strong>{formatValue(totalValue)}</strong>
      </div>
    </section>
  );
};

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  const formatValue = value => {
    const num = Number(value);
    if (isNaN(num) || num === 0) return '___________';
    return `R$ ${num.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const isCloudinaryUrl = url => typeof url === 'string' && url.includes('/upload/');
  const getCloudinaryOriginal = useCallback(url => {
    if (!isCloudinaryUrl(url)) return url;
    const [base, after] = url.split('/upload/');
    const parts = after.split('/');
    return base + '/upload/' + parts.slice(1).join('/');
  }, []);

  const toPngDataUrlFromSrc = useCallback(async src => {
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.crossOrigin = 'anonymous';
        i.onload = () => resolve(i);
        i.onerror = () => reject(new Error('Erro ao carregar imagem: ' + src));
        i.src = src;
      });
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (e) {
      console.error('Erro na conversão da imagem para DataURL:', e);
      return null;
    }
  }, []);

  const getOriginalImageAsDataUrl = useCallback(async img => {
    if (typeof img === 'string') return await toPngDataUrlFromSrc(getCloudinaryOriginal(img));
    if (img instanceof File) {
      const objectUrl = URL.createObjectURL(img);
      const dataUrl = await toPngDataUrlFromSrc(objectUrl);
      URL.revokeObjectURL(objectUrl);
      return dataUrl;
    }
    if (img?.imagemUrl) return await toPngDataUrlFromSrc(img.imagemUrl);
    if (img?.data?.data) return `data:image/jpeg;base64,${img.data.data}`;
    return null;
  }, [toPngDataUrlFromSrc, getCloudinaryOriginal]);

  const appendOriginalImagesToPdf = async (pdf, imagens) => {
    if (!imagens || imagens.length === 0) return;
    const dataUrls = [];
    for (const it of imagens) {
      const dataUrl = await getOriginalImageAsDataUrl(it);
      if (dataUrl) dataUrls.push(dataUrl);
    }
    if (!dataUrls.length) return;
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 20;
    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text('Imagens originais (alta resolução)', margin, margin + 2);
    let y = margin + 10;
    let pageNum = pdf.getNumberOfPages();
    for (let idx = 0; idx < dataUrls.length; idx++) {
      const dataUrl = dataUrls[idx];
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = dataUrl;
      });
      const maxW = pageW - margin * 2;
      const ratio = Math.min(1, maxW / img.width);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const imgX = (pageW - drawW) / 2;
      if (y + drawH > pageH - margin) {
        pdf.setFontSize(10);
        pdf.text(`Página ${pageNum}`, pageW / 2, pageH - 10, { align: 'center' });
        pdf.addPage();
        y = margin;
        pageNum = pdf.getNumberOfPages();
      }
      pdf.addImage(dataUrl, 'PNG', imgX, y, drawW, drawH);
      y += drawH + 10;
    }
    pdf.setFontSize(10);
    pdf.text(`Página ${pageNum}`, pageW / 2, pageH - 10, { align: 'center' });
  };

  const handleSharePdf = async () => {
    if (!componentRef.current || isPdfGenerating) return;
    setIsPdfGenerating(true);
    const element = componentRef.current;
    const prevInlineWidth = element.style.width || '';
    const prevMaxWidth = element.style.maxWidth || '';
    const prevBodyOverflow = document.body.style.overflow || '';
    try {
      element.style.width = '794px';
      element.style.maxWidth = 'none';
      document.body.style.overflow = 'visible';
      element.classList.add('force-print-layout');
      await sleep(300);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth
      });
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210;
      const margin = 20;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width + 2 * margin;
      const pdf = new jsPDF('portrait', 'mm', [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, 'PNG', margin, margin, pdfWidth - 2 * margin, (canvas.height * pdfWidth) / canvas.width);
      await appendOriginalImagesToPdf(pdf, orcamento?.imagens || []);
      const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
      pdf.save(filename);
    } catch (error) {
      console.error('Erro ao gerar PDF contínuo:', error);
    } finally {
      element.style.width = prevInlineWidth;
      element.style.maxWidth = prevMaxWidth;
      document.body.style.overflow = prevBodyOverflow;
      element.classList.remove('force-print-layout');
      setIsPdfGenerating(false);
    }
  };

  const handleVoltarPainel = () => {
    if (onClose) onClose(orcamento.id || orcamento._id);
    setTimeout(() => {
      const el = document.getElementById('ancora-historico-orcamentos');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (!orcamento)
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado.</div>;

  const pecasPorCategoria = orcamento.pecasSelecionadas || {};
  const servicosPorCategoria = orcamento.servicosSelecionados || {};
  const showServices = Object.keys(servicosPorCategoria).length > 0 || Number(orcamento.valorTotalServicos) > 0 || Number(orcamento.totalMaoDeObra) > 0;
  const showImages = orcamento.imagens && orcamento.imagens.length > 0;
  const showObservacoes = orcamento.observacoes && orcamento.observacoes.trim() !== '';

  let formattedDate = '___________';
  if (orcamento?.data) {
    const dateToFormat = typeof orcamento.data === 'object' && orcamento.data._seconds
      ? dayjs.unix(orcamento.data._seconds)
      : dayjs(orcamento.data);
    if (dateToFormat.isValid()) formattedDate = dateToFormat.format('DD/MM/YYYY HH:mm');
  }

  const ImagensVeiculo = ({ imagens }) => (
    <section className="imagens">
      <h2>Imagens do Veículo</h2>
      <div className="imagens-grid">
        {imagens.map((img, idx) => {
          const src = img?.imagemUrl || (typeof img === 'string' ? img : '');
          if (!src) return null;
          return (
            <div key={idx} className="thumb-wrapper">
              <img src={src} alt={`Foto ${idx + 1}`} className="thumb-img" />
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
        </div>

        <section className="info-section">
          <table className="info-table">
            <tbody>
              <tr>
                <td><span>Veículo:</span> {orcamento?.veiculo || '___________'}</td>
                <td><span>OS:</span> {orcamento?.ordemServico || '___________'}</td>
              </tr>
              <tr>
                <td><span>Cliente:</span> {orcamento?.cliente || '___________'}</td>
                <td><span>Data:</span> {formattedDate}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {Object.keys(pecasPorCategoria).length > 0 && (
          <CategorizedItemsSection
            title="Peças"
            itemsByCategory={pecasPorCategoria}
            totalValue={orcamento.valorTotalPecas}
            formatValue={formatValue}
          />
        )}

        {showServices && (
          <>
            {Object.keys(servicosPorCategoria).length > 0 && (
              <CategorizedItemsSection
                title="Serviços - Retífica"
                itemsByCategory={servicosPorCategoria}
                totalValue={orcamento.valorTotalServicos}
                formatValue={formatValue}
              />
            )}
            <div className="total-section">
              <span>Valor total de mão de obra:</span>
              <strong>{formatValue(orcamento.totalMaoDeObra)}</strong>
            </div>
          </>
        )}

        <div className="final-total">
          <span>TOTAL GERAL:</span>
          <strong>{formatValue(orcamento.valorTotal)}</strong>
        </div>

        {showObservacoes && (
          <div className="extra-info-section-impresso">
            <p><strong>Forma de Pagamento:</strong> {orcamento.formaPagamento || '___________'}</p>
            <p><strong>Observações:</strong> {orcamento.observacoes}</p>
          </div>
        )}

        {showImages && <ImagensVeiculo imagens={orcamento.imagens} />}

        <section className="policy-footer">
          <h4>Política de Garantia, Troca e Devolução</h4>
          <p>A garantia dos serviços realizados pela Zero 20 Garage é válida apenas se o veículo for utilizado conforme as orientações da oficina, incluindo manutenções em dia, uso adequado de combustíveis e respeito aos prazos de revisão. Clientes com pagamentos pendentes não terão direito à garantia, sendo que a mesma só pode ser ativada mediante apresentação do orçamento.</p>
          <p>O documento comprova a realização dos serviços e/ou compra das peças para o motor completo, mediante contato com a oficina para análise do problema. A Zero 20 Garage preza pela qualidade dos serviços prestados e realiza todos os procedimentos com base em diagnósticos técnicos e profissionais qualificados.</p>
          <p>Em casos de avarias, se o veículo apresentar danos ou acidentes ocasionados por fenômenos da natureza ou da ação de terceiros, a garantia não será válida.</p>
          <p>Em caso de uso incorreto ou desgaste natural de componentes, o cliente poderá solicitar a análise do caso.</p>
          <p>Não haverá reembolso de peças já instaladas no veículo, sob nenhuma circunstância.</p>
          <p className="policy-acceptance">Ao aceitar o orçamento e iniciar o serviço com a Zero 20 Garage, o cliente declara estar ciente e de acordo com os termos descritos acima.</p>
        </section>
      </div>

      <div className="orcamento-impresso-actions">
        <button className="button btn-primary" onClick={handleSharePdf} disabled={isPdfGenerating}>
          {isPdfGenerating ? 'Gerando PDF...' : 'Gerar PDF'}
        </button>
        <button className="button btn-secondary" onClick={handleVoltarPainel} disabled={isPdfGenerating}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;
