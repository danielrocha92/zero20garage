// src/components/OrcamentoImpresso.jsx
import React, { useRef } from 'react';
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

 const handleSharePdf = async () => {
  if (!orcamento) return alert('Nenhum orçamento selecionado');

  try {
    const resp = await fetch('https://SEU-SERVICE-URL.onrender.com/api/orcamento/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orcamento: {
          ...orcamento,
          logoUrl: '/assets/images/logo.png' // serve do backend via /assets
        }
      })
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error('Erro ao gerar PDF: ' + text);
    }

    const blob = await resp.blob();
    const filename = `Orcamento_OS_${orcamento.ordemServico || 'SemOS'}_${orcamento.cliente || 'SemCliente'}.pdf`;

    // tenta share API de arquivos
    if (navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: 'application/pdf' })] })) {
      try {
        await navigator.share({
          files: [new File([blob], filename, { type: 'application/pdf' })],
          title: filename,
          text: `Orçamento ${orcamento.ordemServico || ''} - ${orcamento.cliente || ''}`
        });
        return;
      } catch (err) {
        console.warn('navigator.share falhou:', err);
      }
    }

    // fallback: abrir em nova aba (mobile geralmente exibe o PDF completo)
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

    // também forçar download (opcional)
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    alert('Erro ao gerar/baixar PDF. Veja console.');
  }
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
