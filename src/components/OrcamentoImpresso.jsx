import React, { useRef, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';
import logo from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose, onDeleteImage }) => {
  const componentRef = useRef(null);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const formatValue = (value) => {
    const num = Number(value);
    if (isNaN(num) || num === 0) return '___________';
    return `R$ ${num.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const isCloudinaryUrl = (url) => typeof url === 'string' && url.includes('/upload/');
  const getCloudinaryOriginal = useCallback((url) => {
    if (!isCloudinaryUrl(url)) return url;
    const [base, after] = url.split('/upload/');
    const parts = after.split('/');
    return base + '/upload/' + parts.slice(1).join('/');
  }, []);

  const toPngDataUrlFromSrc = useCallback(async (src) => {
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

  const getOriginalImageAsDataUrl = useCallback(async (img) => {
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

  if (!orcamento) return <div className="orcamento-impresso-container">Nenhum orçamento selecionado.</div>;

  const pecas = orcamento.pecasSelecionadas || [];
  const servicos = orcamento.servicosSelecionados || [];
  const showServices = servicos.length > 0 || Number(orcamento.valorTotalServicos) > 0 || Number(orcamento.totalMaoDeObra) > 0;
  const showImages = orcamento.imagens && orcamento.imagens.length > 0;
  const showObservacoes = orcamento.observacoes && orcamento.observacoes.trim() !== '';

  let formattedDate = '___________';
  if (orcamento?.data) {
    const dateToFormat = typeof orcamento.data === 'object' && orcamento.data._seconds
      ? dayjs.unix(orcamento.data._seconds)
      : dayjs(orcamento.data);
    if (dateToFormat.isValid()) formattedDate = dateToFormat.format('DD/MM/YYYY HH:mm');
  }

  const handleDeleteImage = (idx) => {
    // A função de exclusão da nuvem deve ser implementada no componente pai
    // e passada como prop 'onDeleteImage'
    if (!onDeleteImage) return;
    onDeleteImage(idx);
  };

  const ImagensVeiculo = ({ imagens }) => {
    return (
      <section className="imagens-section">
        <h2>Imagens do Veículo</h2>
        <div className="imagens-container">
          {imagens.map((img, idx) => {
            const src = img?.imagemUrl || (typeof img === 'string' ? img : '');
            return (
              <div key={idx} className="thumb-wrapper">
                <img src={src} alt={`Foto ${idx + 1}`} className="thumb-img" />
                <button className="delete-img-btn" onClick={() => handleDeleteImage(idx)}>
                  Excluir
                </button>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        <div className="header-impresso">
          <h1>ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}</h1>
          <img src={logo} alt="Logo Zero20Garage" className="logo-impresso" />
        </div>

        <section className="info-section">
          <table className="info-table">
            <tbody>
              <tr>
                <td>Veículo: <span>{orcamento?.veiculo || '___________'}</span></td>
                <td>OS: <span>{orcamento?.ordemServico || '___________'}</span></td>
                <td>Cliente: <span>{orcamento?.cliente || '___________'}</span></td>
                <td>Data: <span>{formattedDate}</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="items-section">
          <h2>Peças</h2>
          <div className="items-columns">
            {pecas.map((item, i) => (
              <div key={i} className="list-item-impresso">
                <input type="checkbox" checked readOnly className="checkbox-box" />
                <span className="item-text">{item}</span>
              </div>
            ))}
          </div>
          <div className="total-line-impresso">
            <span>Valor total de Peças:</span> <strong>{formatValue(orcamento.valorTotalPecas)}</strong>
          </div>
        </section>

        {showServices && (
          <>
            <section className="items-section">
              <h2>Serviços - Retífica</h2>
              <div className="items-columns">
                {servicos.map((item, i) => (
                  <div key={i} className="list-item-impresso">
                    <input type="checkbox" checked readOnly className="checkbox-box" />
                    <span className="item-text">{item}</span>
                  </div>
                ))}
              </div>
              <div className="total-line-impresso">
                <span>Valor total de Serviços:</span> <strong>{formatValue(orcamento.valorTotalServicos)}</strong>
              </div>
            </section>
            <div className="total-line-impresso">
              <span>Valor total de mão de obra:</span> <strong>{formatValue(orcamento.totalMaoDeObra)}</strong>
            </div>
          </>
        )}

        <div className="total-line-impresso final-total">
          <span>TOTAL GERAL:</span> <strong>{formatValue(orcamento.valorTotal)}</strong>
        </div>

        <div className="extra-info-section-impresso">
          <p className="payment-method"><strong>Forma de Pagamento:</strong> {orcamento.formaPagamento || '___________'}</p>
          {showObservacoes && <p className="observations"><strong>Observações:</strong> {orcamento.observacoes}</p>}
        </div>

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
        <button className='button' onClick={handleSharePdf} disabled={isPdfGenerating}>
          {isPdfGenerating ? 'Gerando PDF...' : 'Gerar PDF'}
        </button>
        <button className='button' onClick={handleVoltarPainel} disabled={isPdfGenerating}>Voltar</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;