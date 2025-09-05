import React, { useRef } from 'react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './OrcamentoImpresso.css';

// Logo da Zero20Garage (ajuste o caminho se necessário)
import logo from '../assets/images/background.jpg';

const OrcamentoImpresso = ({ orcamento, onClose }) => {
  const componentRef = useRef(null);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Função para formatar valores para R$ X.XXX,XX ou "__________"
  const formatValue = (value) => {
    const num = Number(value);
    if (isNaN(num) || num === 0) {
      return '___________';
    }
    return `R$ ${num.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  // === Cloudinary Helpers ===
  const isCloudinaryUrl = (url) => typeof url === 'string' && url.includes('/upload/');

  const getCloudinaryThumb = (url) => {
    if (!isCloudinaryUrl(url)) return url;
    const base = url.split('/upload/')[0] + '/upload/';
    const after = url.split('/upload/')[1] || '';
    const [firstSeg, ...rest] = after.split('/');
    if (/^v\d+$/i.test(firstSeg)) {
      return base + 'w_240,c_limit,q_auto,f_auto/' + after;
    }
    return base + 'w_240,c_limit,q_auto,f_auto,' + firstSeg + '/' + rest.join('/');
  };

  const getCloudinaryOriginal = (url) => {
    if (!isCloudinaryUrl(url)) return url;
    const base = url.split('/upload/')[0] + '/upload/';
    const after = url.split('/upload/')[1] || '';
    const parts = after.split('/');
    if (parts.length === 0) return url;
    if (/^v\d+$/i.test(parts[0])) return url;
    return base + parts.slice(1).join('/');
  };

  // === Conversão de imagem para DataURL ===
  const toPngDataUrlFromSrc = async (src) => {
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
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL('image/png');
    } catch (e) {
      console.error('Erro na conversão da imagem para DataURL:', e);
      return null;
    }
  };

  const getOriginalImageAsDataUrl = async (img) => {
    try {
      if (typeof img === 'string') {
        return await toPngDataUrlFromSrc(getCloudinaryOriginal(img));
      }
      if (img instanceof File) {
        const objectUrl = URL.createObjectURL(img);
        const dataUrl = await toPngDataUrlFromSrc(objectUrl);
        URL.revokeObjectURL(objectUrl);
        return dataUrl;
      }
      if (img && img.data && typeof img.data.data === 'string') {
        return `data:image/jpeg;base64,${img.data.data}`;
      }
    } catch (e) {
      console.warn('Falha ao preparar imagem para PDF:', e);
    }
    return null;
  };

  const appendOriginalImagesToPdf = async (pdf, imagens) => {
    if (!imagens || imagens.length === 0) return;

    const dataUrls = [];
    for (const it of imagens) {
      const dataUrl = await getOriginalImageAsDataUrl(it);
      if (dataUrl) dataUrls.push(dataUrl);
    }
    if (dataUrls.length === 0) return;

    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 10;

    pdf.addPage();
    pdf.setFontSize(14);
    pdf.text('Imagens originais (alta resolução)', margin, margin + 2);

    for (let idx = 0; idx < dataUrls.length; idx++) {
      const dataUrl = dataUrls[idx];
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = dataUrl;
      });

      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2 - 10;
      const ratio = Math.min(maxW / img.width, maxH / img.height, 1);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const imgX = (pageW - drawW) / 2;
      const imgY = margin + 10;

      pdf.addImage(dataUrl, 'PNG', imgX, imgY, drawW, drawH);

      if (idx < dataUrls.length - 1) pdf.addPage();
    }
  };

  // === Geração do PDF ===
  const handleSharePdf = async () => {
    if (!componentRef.current) return;

    setTimeout(async () => {
      const element = componentRef.current;

      const prevInlineWidth = element.style.width || '';
      const prevMaxWidth = element.style.maxWidth || '';
      const prevBodyOverflow = document.body.style.overflow || '';

      try {
        element.style.width = '794px';
        element.style.maxWidth = 'none';
        document.body.style.overflow = 'visible';
        element.classList.add('force-print-layout');

        const SCALE = 1.5;
        const contentWidthPx = element.scrollWidth || element.offsetWidth || 794;
        const contentHeightPx = element.scrollHeight || element.offsetHeight || 1123;

        let pdf;

        try {
          // 🔹 Aguarda um pequeno delay antes de capturar
          await sleep(300);

          const canvas = await html2canvas(element, { scale: SCALE, useCORS: true });
          const imgData = canvas.toDataURL('image/png');
          const PX_TO_MM = 25.4 / 96;
          const pdfWidthMm = contentWidthPx * PX_TO_MM;
          const pdfHeightMm = contentHeightPx * PX_TO_MM;

          pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [pdfWidthMm, pdfHeightMm],
          });

          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);
        } catch (errSingle) {
          console.warn('Erro na captura única:', errSingle);
        }

        // Adiciona imagens originais em nova página
        await appendOriginalImagesToPdf(pdf, orcamento?.imagens || []);

        const filename = `Orçamento_OS_${orcamento?.ordemServico || 'SemOS'}_${orcamento?.cliente || 'SemCliente'}.pdf`;
        pdf.save(filename);
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
      } finally {
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
    return <div className="orcamento-impresso-container">Nenhum orçamento selecionado.</div>;
  }

  // === Preparação dos dados ===
  const pecas = orcamento.pecasSelecionadas || [];
  const servicos = orcamento.servicosSelecionados || [];
  const pecasMid = Math.ceil(pecas.length / 2);
  const servicosMid = Math.ceil(servicos.length / 2);

  const showServices = (servicos.length > 0) || (Number(orcamento.valorTotalServicos) > 0) || (Number(orcamento.totalMaoDeObra) > 0);
  const showImages = orcamento.imagens && orcamento.imagens.length > 0;
  const showObservacoes = orcamento.observacoes && orcamento.observacoes.trim() !== '';

  let formattedDate = '___________';
  if (orcamento?.data) {
    const dateToFormat =
      typeof orcamento.data === 'object' && orcamento.data._seconds
        ? dayjs.unix(orcamento.data._seconds)
        : dayjs(orcamento.data);
    if (dateToFormat.isValid()) formattedDate = dateToFormat.format('DD/MM/YYYY HH:mm');
  }

  return (
    <div className="orcamento-impresso-container">
      <div className="orcamento-impresso-content" ref={componentRef}>
        {/* Cabeçalho */}
        <div className="header-impresso">
          <h1>
            ORÇAMENTO - {orcamento.tipo === 'motor' ? 'MOTOR COMPLETO/PARCIAL' : 'CABEÇOTE'}
          </h1>
          <img src={logo} alt="Logo Zero20Garage" className="logo-impresso" />
        </div>

        {/* Informações */}
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

        {/* Peças */}
        <section className="items-section">
          <h2>Peças</h2>
          <div className="items-columns">
            <ul>{pecas.slice(0, pecasMid).map((item, i) => <li key={i}>{item}</li>)}</ul>
            <ul>{pecas.slice(pecasMid).map((item, i) => <li key={i}>{item}</li>)}</ul>
          </div>
          <div className="total-line-impresso">
            Valor total de Peças: <strong>{formatValue(orcamento.valorTotalPecas)}</strong>
          </div>
        </section>

        {/* Serviços */}
        {showServices && (
          <>
            <section className="items-section">
              <h2>Serviços - Retífica</h2>
              <div className="items-columns">
                <ul>{servicos.slice(0, servicosMid).map((item, i) => <li key={i}>{item}</li>)}</ul>
                <ul>{servicos.slice(servicosMid).map((item, i) => <li key={i}>{item}</li>)}</ul>
              </div>
              <div className="total-line-impresso">
                Valor total de Serviços: <strong>{formatValue(orcamento.valorTotalServicos)}</strong>
              </div>
            </section>
            <div className="total-line-impresso">
              Valor total de mão de obra: <strong>{formatValue(orcamento.totalMaoDeObra)}</strong>
            </div>
          </>
        )}

        {/* Total Geral */}
        <div className="total-line-impresso final-total">
          TOTAL GERAL: <strong>{formatValue(orcamento.valorTotal)}</strong>
        </div>

        {/* Informações Extras */}
        <div className="extra-info-section-impresso">
          <p className="payment-method"><strong>Forma de Pagamento:</strong> {orcamento.formaPagamento || '___________'}</p>
          {showObservacoes && (
            <p className="observations"><strong>Observações:</strong> {orcamento.observacoes}</p>
          )}
        </div>

        {/* Política */}
        <section className="policy-footer">
          <h4>Política de Garantia, Troca e Devolução</h4>
          <p>
            A garantia dos serviços realizados pela Zero 20 Garage é válida apenas se o veículo for utilizado conforme as orientações da oficina, incluindo manutenções em dia, uso adequado de combustíveis e respeito aos prazos de revisão. Clientes com pagamentos pendentes não terão direito à garantia, sendo que a mesma só pode ser ativada mediante apresentação do orçamento. O documento comprova a realização dos serviços e/ou compra das peças para o motor completo, mediante contato com a oficina para análise do problema. A Zero 20 Garage preza pela qualidade dos serviços prestados e realiza todos os procedimentos com base em diagnósticos técnicos e profissionais qualificados. Em casos de avariações, se o veículo apresentar danos ou acidentes ocasionados por fenômenos da natureza ou da ação de terceiros, a garantia não será válida. Em caso de uso incorreto ou desgaste natural de componentes, o cliente poderá solicitar a análise do caso. Não haverá reembolso de peças já instaladas no veículo, sob nenhuma circunstância.
          </p>
          <p className="policy-acceptance">
            Ao aceitar o orçamento e iniciar o serviço com a Zero 20 Garage, o cliente declara estar ciente e de acordo com os termos descritos acima.
          </p>
        </section>

        {/* Imagens */}
        {showImages && (
          <section className="imagens-section">
            <h2>Imagens do Veículo</h2>
            <div className="imagens-container">
              {orcamento.imagens.map((img, idx) => {
                let thumbSrc = '';
                if (typeof img === 'string') thumbSrc = getCloudinaryThumb(img);
                else if (img instanceof File) thumbSrc = URL.createObjectURL(img);
                else if (img?.data?.data) thumbSrc = `data:image/jpeg;base64,${img.data.data}`;
                return <img key={idx} src={thumbSrc} alt={`Foto ${idx + 1}`} className="thumb-img" />;
              })}
            </div>
          </section>
        )}
      </div>

      {/* Ações */}
      <div className="orcamento-impresso-actions">
        <button className='button' onClick={handleSharePdf}>Gerar PDF</button>
        <button className='button' onClick={handleVoltarPainel}>Voltar</button>
      </div>
    </div>
  );
};

export default OrcamentoImpresso;