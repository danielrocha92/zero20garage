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
  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Modal de visualização/edição/exclusão
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view'); // 'view' | 'edit'
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
      if (result.status === 'success') {
        showMessageBox('Orçamento enviado com sucesso para o Google Sheets.');
      } else {
        showMessageBox('Erro ao enviar para o Google Sheets.');
        console.error(result);
      }
    } catch (err) {
      console.error('Erro na conexão com Google Sheets:', err);
      showMessageBox('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  const exportarExcel = () => {
    if (historico.length === 0) {
      showMessageBox('Nenhum dado para exportar.');
      return;
    }
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Nome: h.nome,
      'Valor Total': h.valorTotal,
      'Peças': h.detalhesPecas
        ? h.detalhesPecas.map(p => {
            let itemDetails = `${p.nome}`;
            if (p.temQuantidade) {
                itemDetails += ` (Qtd: ${p.quantidade}, Medida: ${p.medida})`;
            }
            if (p.subItens && p.subItens.length > 0) {
                const subItemString = p.subItens.map(sub => `${sub.label}: ${sub.value}`).join(', ');
                itemDetails += ` [Detalhes: ${subItemString}]`;
            }
            return itemDetails;
        }).join('; ')
        : '',
      'Serviços': h.detalhesServicos
        ? h.detalhesServicos.map(s => {
            let serviceDetails = `${s.nome}`;
            if (s.temQuantidade) {
                serviceDetails += ` (Qtd: ${s.quantidade}, Medida: ${s.medida})`;
            }
            if (s.subItens && s.subItens.length > 0) {
                const subItemString = s.subItens.map(sub => `${sub.label}: ${sub.value}`).join(', ');
                serviceDetails += ` [Detalhes: ${subItemString}]`;
            }
            return serviceDetails;
        }).join('; ')
        : '',
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
    if (historico.length === 0) {
      showMessageBox('Nenhum dado para exportar.');
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(12);
    let y = 10;
    historico.forEach((h, i) => {
      doc.text(`Orçamento #${i + 1}`, 10, y);
      y += 8;
      doc.text(`Data: ${h.data} | Tipo: ${h.tipo}`, 10, y);
      y += 8;
      doc.text(`Nome: ${h.nome} | Valor Total: R$ ${parseFloat(h.valorTotal).toFixed(2)}`, 10, y);
      y += 8;
      if (h.detalhesPecas && h.detalhesPecas.length > 0) {
        doc.text('Peças:', 10, y);
        y += 7;
        h.detalhesPecas.forEach((p) => {
            let itemText = `- ${p.nome}`;
            if (p.temQuantidade) {
                itemText += ` | Qtd: ${p.quantidade} | Medida: ${p.medida}`;
            }
            if (p.total !== undefined && p.total !== null) {
                itemText += ` | Total: R$ ${parseFloat(p.total).toFixed(2)}`;
            }
            doc.text(itemText, 12, y);
            y += 7;
            if (p.subItens && p.subItens.length > 0) {
                p.subItens.forEach((sub) => {
                    const subItemValue = sub.type === "checkbox" ? (sub.value ? 'Sim' : 'Não') : sub.value;
                    doc.text(`    • ${sub.label}: ${subItemValue}`, 16, y);
                    y += 6;
                });
            }
        });
      }
      if (h.detalhesServicos && h.detalhesServicos.length > 0) {
        doc.text('Serviços:', 10, y);
        y += 7;
        h.detalhesServicos.forEach((s) => {
            let serviceText = `- ${s.nome}`;
            if (s.temQuantidade) {
                serviceText += ` | Qtd: ${s.quantidade} | Medida: ${s.medida}`;
            }
            if (s.total !== undefined && s.total !== null) {
                serviceText += ` | Total: R$ ${parseFloat(s.total).toFixed(2)}`;
            }
            doc.text(serviceText, 12, y);
            y += 7;
            if (s.subItens && s.subItens.length > 0) {
                s.subItens.forEach((sub) => {
                    const subItemValue = sub.type === "checkbox" ? (sub.value ? 'Sim' : 'Não') : sub.value;
                    doc.text(`    • ${sub.label}: ${subItemValue}`, 16, y);
                    y += 6;
                });
            }
        });
      }
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });
    doc.save('painel-orcamentos.pdf');
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/orcamento');
  };

  // Funções de ver, editar, excluir
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
    // Redirecionamento simulado (ou use o link de cada orçamento salvo, se disponível)
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
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} />
        )}
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === 'delete' ? (
              <>
                <h3>Excluir Orçamento</h3>
                <p>Tem certeza que deseja excluir este orçamento?</p>
                <div style={{marginTop: 20}}>
                  <button onClick={handleExcluir} style={{color: 'red'}}>Excluir</button>
                  <button onClick={closeModal} style={{marginLeft: 10}}>Cancelar</button>
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
                {/* Adapte para outros campos! */}
                <div style={{marginTop: 20}}>
                  <button onClick={closeModal}>Fechar</button>
                  {modalType === 'edit' && (
                    <button onClick={handleEditar} style={{marginLeft: 10}}>Salvar</button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Message Box */}
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