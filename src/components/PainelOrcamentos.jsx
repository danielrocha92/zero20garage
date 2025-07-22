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
  const navigate = useNavigate();

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
        if (p.checkbox && p.subItens?.length > 0) {
          const sub = p.subItens.map(s => `${s.label}: ${s.value}`).join(', ');
          d += ` [Detalhes: ${sub}]`;
        }
        return d;
      }).join('; ') || '',
      'Serviços': h.detalhesServicos?.map(s => {
        let d = `${s.nome}`;
        if (s.temQuantidade) d += ` (Qtd: ${s.quantidade}, Medida: ${p.medida})`;
        if (p.checkbox && p.subItens?.length > 0) {
          const sub = p.subItens.map(s => `${s.label}: ${s.value}`).join(', ');
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
    const gray = 150;
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

      // Dividir em duas colunas 50/50
      const half = Math.ceil(pecasOrdenadas.length / 2);
      const coluna1 = pecasOrdenadas.slice(0, half);
      const coluna2 = pecasOrdenadas.slice(half);

      // Função para renderizar coluna
      const renderColuna = (col, x) => {
        let localY = y;
        col.forEach(p => {
          if (p.checkbox) {
            doc.setTextColor(red);
            doc.text(`☒`, x, localY);
            doc.setTextColor(0)
            doc.text(`${p.nome}`, x + 5, localY)
            localY += 6;

            // Exibe subitens SOMENTE para itens selecionados
            p.subItens?.forEach(sub => {
              if (sub.value && sub.value !== false) {
                doc.setTextColor(red);
                doc.text(`   • ${sub.label}: ${sub.value}`, x + 5, localY);
                localY += 5;
              }
            });
          } else {
            doc.setTextColor(gray);
            doc.text(`☐`, x, localY);
            doc.setTextColor(0);
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
      doc.text("Serviços", 10, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      const servicosOrdenados = [...(h.detalhesServicos || [])].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      // Reset text color to black after setting it to gray
      servicosOrdenados.forEach(s => {
        if (s.checkbox) {
          doc.setTextColor(red);
          doc.text(`☒`, 10, y);
          doc.setTextColor(0);
          doc.text(`${s.nome}`, 15, y);
          y += 6;

          s.subItens?.forEach(sub => {
            if (sub.value && sub.value !== false) {
              doc.setTextColor(red);
              doc.text(`   • ${sub.label}: ${sub.value}`, 15, y);
              y += 5;
            }
          });
        } else {
          doc.setTextColor(gray);
          doc.text(`☐`, 10, y);
          doc.setTextColor(0);
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

  // Edita todos os campos do orçamento
  const handleEditar = () => {
    setHistorico(historico.map(h => h === orcamentoSelecionado.original ? {
      ...h,
      ...orcamentoSelecionado,
    } : h));
    setShowModal(false);
    window.open('https://docs.google.com/spreadsheets/u/0/', '_blank');
  };

  // Renderização do modal ajustado para todos os campos
  const renderModalFields = () => {
    if (!orcamentoSelecionado) return null;
    const keys = Object.keys(orcamentoSelecionado).filter(
      k => k !== 'original'
    );
    return keys.map(key => (
      <label key={key} style={{ display: 'block', marginBottom: 10 }}>
        {key.charAt(0).toUpperCase() + key.slice(1)}:
        {typeof orcamentoSelecionado[key] === 'boolean' ? (
          <input
            type="checkbox"
            checked={orcamentoSelecionado[key]}
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: e.target.checked
            })}
            disabled={modalType === 'view'}
          />
        ) : typeof orcamentoSelecionado[key] === 'number' ? (
          <input
            value={orcamentoSelecionado[key]}
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: Number(e.target.value)
            })}
            disabled={modalType === 'view'}
            type="number"
          />
        ) : Array.isArray(orcamentoSelecionado[key]) ? (
          // Exibe arrays como JSON editável
          <textarea
            value={JSON.stringify(orcamentoSelecionado[key], null, 2)}
            onChange={e => {
              let val = e.target.value;
              try {
                val = JSON.parse(val);
              } catch (err) {}
              setOrcamentoSelecionado({
                ...orcamentoSelecionado,
                [key]: val
              });
            }}
            disabled={modalType === 'view'}
            rows={4}
            style={{ width: '100%' }}
          />
        ) : (
          <input
            value={orcamentoSelecionado[key] ?? ''}
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: e.target.value
            })}
            disabled={modalType === 'view'}
            type="text"
          />
        )}
      </label>
    ));
  };

  return (
    <div className='painel-orcamentos-container'>
      {/* ... rest of code remains the same ... */}

      {showModal && (
        <div className="modal-overlay fixed-center">
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
                {renderModalFields()}
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

      {/* ... rest of code remains the same ... */}
    </div>
  );
};

export default PainelOrcamentos;