import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote';
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import "./PainelOrcamentos.css";
import { useNavigate } from 'react-router-dom';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrUxPxlq0R_wYNJYBV8gTk94L_obQ_cHlwnoCPCE3/dev';

const PainelOrcamentos = () => {
  const navigate = useNavigate(); // ✅ Correto: fora de funções internas

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null);

  const showMessageBox = (msg) => {
    setMessage(msg);
    setShowMessage(true);
  };

  const hideMessageBox = () => {
    setShowMessage(false);
    setMessage('');
  };

  const handleSalvar = async (dados) => {
    const envio = {
      ...dados,
      tipo,
      data: new Date().toLocaleString('pt-BR'),
    };
    setHistorico((prev) => [envio, ...prev]);
    try {
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });
      const result = await res.json();
      result.status === 'success'
        ? showMessageBox('Orçamento enviado com sucesso para o Google Sheets.')
        : showMessageBox('Erro ao enviar para o Google Sheets.');
    } catch (err) {
      console.error(err);
      showMessageBox('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Nome: h.nome,
      'Valor Total': h.valorTotal,
      'Peças': h.detalhesPecas?.map(p => {
        let d = `${p.nome}`;
        if (p.temQuantidade) d += ` (Qtd: ${p.quantidade}, Medida: ${p.medida})`;
        if (p.subItens?.length > 0) {
          const sub = p.subItens.map(s => `${s.label}: ${s.value}`).join(', ');
          d += ` [Detalhes: ${sub}]`;
        }
        return d;
      }).join('; ') || '',
      'Serviços': h.detalhesServicos?.map(s => {
        let d = `${s.nome}`;
        if (s.temQuantidade) d += ` (Qtd: ${s.quantidade}, Medida: ${s.medida})`;
        if (s.subItens?.length > 0) {
          const sub = s.subItens.map(s => `${s.label}: ${s.value}`).join(', ');
          d += ` [Detalhes: ${sub}]`;
        }
        return d;
      }).join('; ') || '',
      'Forma de Pagamento': h.formaPagamento || '',
      Garantia: h.garantia || ''
    }));
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  const exportarPDF = () => {
  if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');

  const doc = new jsPDF();
  const red = "#ff0000";
  let y = 20;

  historico.forEach((h, i) => {
    doc.setFontSize(14);
    doc.text("ORÇAMENTO – MOTOR COMPLETO/PARCIAL", 60, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Veículo: ${h.veiculo || 'Corsa 2001'}`, 10, y);
    y += 7;
    doc.text(`OS: ${h.os || '143'}    Cliente: ${h.nome}    Data: ${h.data}`, 10, y);
    y += 10;

    doc.setFont(undefined, 'bold');
    doc.text("Peças", 10, y);
    doc.setFont(undefined, 'normal');
    y += 7;

    // Ordenar peças por nome
    const pecasOrdenadas = [...(h.detalhesPecas || [])].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );

    const coluna1 = pecasOrdenadas.slice(0, Math.ceil(pecasOrdenadas.length / 2));
    const coluna2 = pecasOrdenadas.slice(Math.ceil(pecasOrdenadas.length / 2));

    const renderColuna = (col, x) => {
      let localY = y;
      col.forEach(p => {
        if (p.checkbox) {
          doc.setTextColor(red);
          doc.text(`☒ ${p.nome}`, x, localY);
          localY += 6;

          p.subItens?.forEach(sub => {
            const valor = sub.type === 'checkbox'
              ? (sub.value ? '☒' : '☐')
              : sub.value;
            if (valor && valor !== false) {
              doc.setTextColor(red);
              doc.text(`   • ${sub.label}: ${valor}`, x + 5, localY);
              localY += 5;
            }
          });

        } else {
          doc.setTextColor(150); // cinza claro para não marcados
          doc.text(`☐ ${p.nome}`, x, localY);
          localY += 6;
        }
      });
      return localY;
    };

    const y1 = renderColuna(coluna1, 10);
    const y2 = renderColuna(coluna2, 110);
    y = Math.max(y1, y2) + 5;

    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text(`Valor total de Peças: R$ ${parseFloat(h.valorTotalPecas).toFixed(2)}`, 10, y);
    y += 10;

    // SERVIÇOS
    doc.setFont(undefined, 'bold');
    doc.text("Peças", 10, y); // palavra 'Peças' no modelo refere-se aos serviços
    doc.setFont(undefined, 'normal');
    y += 7;

    const servicosOrdenados = [...(h.detalhesServicos || [])].sort((a, b) =>
      a.nome.localeCompare(b.nome)
    );

    servicosOrdenados.forEach(s => {
      if (s.checkbox) {
        doc.setTextColor(red);
        doc.text(`☒ ${s.nome}`, 10, y);
        y += 6;

        s.subItens?.forEach(sub => {
          const val = sub.type === 'checkbox' ? (sub.value ? '☒' : '☐') : sub.value;
          if (val && val !== false) {
            doc.text(`   • ${sub.label}: ${val}`, 15, y);
            y += 5;
          }
        });
      } else {
        doc.setTextColor(150);
        doc.text(`☐ ${s.nome}`, 10, y);
        y += 6;
      }
    });

    doc.setTextColor(0);
    doc.setFont(undefined, 'bold');
    doc.text(`Valor total de Serviços: R$ ${parseFloat(h.valorTotalServicos).toFixed(2)}`, 10, y);
    y += 10;

    const total = (parseFloat(h.valorTotalPecas) + parseFloat(h.valorTotalServicos)).toFixed(2);
    doc.text(`TOTAL GERAL: R$ ${total}`, 10, y);
    y += 10;

    doc.setFont(undefined, 'normal');
    doc.text("Forma de pagamento: Pix, Débito e Crédito em até 10 vezes sem juros", 10, y);
    y += 15;

    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save('painel-orcamentos-zero20.pdf');
};

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/orcamento');
  };

  const openModal = (type, orc) => {
    setModalType(type);
    setOrcamentoSelecionado({ ...orc });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setOrcamentoSelecionado(null);
  };

  const handleEditar = () => {
    setHistorico(historico.map(h => h === orcamentoSelecionado.original ? orcamentoSelecionado : h));
    setShowModal(false);
    window.open('https://docs.google.com/spreadsheets/u/0/', '_blank');
  };

  const handleExcluir = () => {
    if (window.confirm('Deseja excluir este orçamento?')) {
      setHistorico(historico.filter(h => h !== orcamentoSelecionado.original));
      setShowModal(false);
    }
  };

  return (
    <div className='painel-orcamentos-container'>
      <h1 className='titulo-claro'>Painel de Orçamentos</h1>
      <div className="painel-header">
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </div>

      <h3 className='subtitulo-claro'>
        Tipo de Orçamento:{' '}
        <div className='tipo-orcamento-selector'>
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="motor">Motor Completo</option>
            <option value="cabecote">Cabeçote</option>
          </select>
        </div>
      </h3>

      <div className='orcamento-form-wrapper'>
        {tipo === 'motor'
          ? <OrcamentoMotorCompleto onSubmit={handleSalvar} />
          : <OrcamentoCabecote onSubmit={handleSalvar} />
        }
      </div>

      <section className='historico-section'>
        <h2>Histórico</h2>
        <div className='historico-buttons-group'>
          <button onClick={exportarExcel} className='action-btn'>Exportar Excel</button>
          <button onClick={exportarPDF} className='action-btn'>Exportar PDF</button>
        </div>

        {historico.length === 0 ? (
          <p className='no-historico-message'>Nenhum orçamento salvo ainda.</p>
        ) : (
          <table className='historico-table'>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((h, idx) => (
                <tr key={idx}>
                  <td>{h.data}</td>
                  <td>{h.tipo}</td>
                  <td>{h.nome}</td>
                  <td>R$ {parseFloat(h.valorTotal).toFixed(2)}</td>
                  <td>
                    <button onClick={() => openModal('view', { ...h, original: h })}>Ver</button>
                    <button onClick={() => openModal('edit', { ...h, original: h })}>Editar</button>
                    <button onClick={() => openModal('delete', { ...h, original: h })}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === 'delete' ? (
              <>
                <h3>Excluir Orçamento</h3>
                <p>Tem certeza que deseja excluir este orçamento?</p>
                <div style={{ marginTop: 20 }}>
                  <button onClick={handleExcluir} style={{ color: 'red' }}>Excluir</button>
                  <button onClick={closeModal} style={{ marginLeft: 10 }}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <h3>{modalType === 'view' ? 'Ver Orçamento' : 'Editar Orçamento'}</h3>
                <label>
                  Nome:
                  <input
                    value={orcamentoSelecionado.nome}
                    onChange={e => setOrcamentoSelecionado({ ...orcamentoSelecionado, nome: e.target.value })}
                    disabled={modalType === 'view'}
                  />
                </label>
                <label>
                  Valor Total:
                  <input
                    value={orcamentoSelecionado.valorTotal}
                    onChange={e => setOrcamentoSelecionado({ ...orcamentoSelecionado, valorTotal: e.target.value })}
                    disabled={modalType === 'view'}
                    type="number"
                  />
                </label>
                <div style={{ marginTop: 20 }}>
                  <button onClick={closeModal}>Fechar</button>
                  {modalType === 'edit' && (
                    <button onClick={handleEditar} style={{ marginLeft: 10 }}>Salvar</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showMessage && (
        <div className="message-box-overlay">
          <div className="message-box">
            <p>{message}</p>
            <button onClick={hideMessageBox}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelOrcamentos;