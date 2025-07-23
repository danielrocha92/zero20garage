import React, { useState } from 'react';
import OrcamentoCabecote from './OrcamentoCabecote'; // Assuming these components exist
import OrcamentoMotorCompleto from './OrcamentoMotorCompleto'; // Assuming these components exist
import HistoricoOrcamentos from './HistoricoOrcamentos'; // Import the HistoricoOrcamentos component
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
// Removed 'autoTable' import from here as it's only used in HistoricoOrcamentos
// import "./PainelOrcamentos.css"; // Assuming this CSS is provided externally or will be handled by Tailwind
import { useNavigate } from 'react-router-dom';

const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxIrUxPxlq0R_wYNJYBV8gTk94L_obQ_cHlwnoCPCE3/dev';

const PainelOrcamentos = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('motor');
  const [historico, setHistorico] = useState([]); // State to hold the history of budgets
  const [message, setMessage] = useState(''); // State for displaying messages to the user
  const [showMessage, setShowMessage] = useState(false); // State to control message box visibility

  const [showModal, setShowModal] = useState(false); // State to control the view/edit modal visibility
  const [modalType, setModalType] = useState('view'); // State to determine the type of modal (view or edit)
  const [orcamentoSelecionado, setOrcamentoSelecionado] = useState(null); // State to hold the selected budget for modal

  // Function to display a message box with a given message
  const showMessageBox = (msg) => {
    setMessage(msg);
    setShowMessage(true);
  };

  // Function to hide the message box
  const hideMessageBox = () => {
    setShowMessage(false);
    setMessage('');
  };

  // Function to handle saving a new budget
  const handleSalvar = async (dados) => {
    // Certifique-se de que valorTotalPecas e valorTotalServicos são números antes de salvar
    // Eles devem ser calculados e fornecidos como números pelos componentes OrcamentoCabecote/OrcamentoMotorCompleto
    const envio = {
      ...dados,
      tipo,
      data: new Date().toLocaleString('pt-BR'), // Add current date and time
    };
    setHistorico((prev) => [envio, ...prev]); // Add new budget to the history
    try {
      // Send budget data to Google Sheets via a web app URL
      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(envio),
      });
      const result = await res.json();
      // Display success or error message based on the response
      result.status === 'success'
        ? showMessageBox('Orçamento enviado com sucesso para o Google Sheets.')
        : showMessageBox('Erro ao enviar para o Google Sheets.');
    } catch (err) {
      console.error(err);
      showMessageBox('Erro ao conectar com o servidor. Tente novamente.');
    }
  };

  // Function to export all budgets in the history to an Excel file
  const exportarExcel = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');

    // Map history data to a flat structure suitable for Excel
    const excelData = historico.map(h => ({
      Data: h.data,
      Tipo: h.tipo,
      Cliente: h.cliente || '', // Ensure client name is included
      Veículo: h.veiculo || '', // Ensure vehicle is included
      Placa: h.placa || '', // Ensure plate is included
      Telefone: h.telefone || '', // Ensure phone is included
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
        if (s.temQuantidade) d += ` (Qtd: ${s.quantidade}, Medida: ${s.medida})`;
        if (s.checkbox && s.subItens?.length > 0) {
          const sub = s.subItens.map(sub => `${sub.label}: ${sub.value}`).join(', ');
          d += ` [Detalhes: ${sub}]`;
        }
        return d;
      }).join('; ') || '',
      Observações: h.observacoes || '', // Ensure observations are included
      'Forma de Pagamento': h.formaPagamento || '',
      Garantia: h.garantia || ''
    }));

    // Create a new worksheet and workbook, then append the worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orçamentos');

    // Write the workbook to an array buffer and save it as an Excel file
    const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'painel-orcamentos.xlsx');
  };

  // Function to export all budgets in the history to a multi-page PDF
  const exportarPDFCompleto = () => {
    if (historico.length === 0) return showMessageBox('Nenhum dado para exportar.');

    const doc = new jsPDF();
    const red = "#ff0000";
    const gray = 150;
    let y = 20;

    // Iterate over each budget in the history to create a multi-page PDF
    historico.forEach((h, i) => {
      doc.setFontSize(14);
      doc.text("ORÇAMENTO – MOTOR COMPLETO/PARCIAL", 60, y);
      y += 10;

      doc.setFontSize(12);
      doc.text(`Veículo: ${h.veiculo || 'N/A'}`, 10, y);
      y += 7;
      doc.text(`OS: ${h.os || 'N/A'}    Cliente: ${h.cliente || 'N/A'}    Data: ${h.data}`, 10, y);
      y += 10;

      doc.setFont(undefined, 'bold');
      doc.text("Peças", 10, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      // Sort parts by name for consistent display
      const pecasOrdenadas = [...(h.detalhesPecas || [])].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

      // Divide parts into two columns for better layout
      const half = Math.ceil(pecasOrdenadas.length / 2);
      const coluna1 = pecasOrdenadas.slice(0, half);
      const coluna2 = pecasOrdenadas.slice(half);

      // Helper function to render a column of items (parts or services)
      const renderColuna = (col, x) => {
        let localY = y;
        col.forEach(p => {
          if (p.checkbox) {
            doc.setTextColor(red);
            doc.text(`☒`, x, localY); // Checked checkbox symbol
            doc.setTextColor(0); // Reset color to black
            doc.text(`${p.nome}`, x + 5, localY); // Item name
            localY += 6;

            // Display sub-items only for selected (checked) items
            p.subItens?.forEach(sub => {
              if (sub.value && sub.value !== false) {
                doc.setTextColor(red);
                doc.text(`   • ${sub.label}: ${sub.value}`, x + 5, localY);
                localY += 5;
              }
            });
          } else {
            doc.setTextColor(gray);
            doc.text(`☐ ${p.nome}`, x, localY); // Ensure name is printed for unselected items
            doc.setTextColor(0); // Reset color to black
            localY += 6;
          }
        });
        return localY;
      };

      // Render both columns and get the maximum Y position
      const y1 = renderColuna(coluna1, 10);
      const y2 = renderColuna(coluna2, 110);
      y = Math.max(y1, y2) + 5; // Set Y to the lowest point of both columns plus some padding

      doc.setTextColor(0); // Reset text color to black
      doc.setFont(undefined, 'bold');
      // Garante que valorTotalPecas é um número antes de formatar
      doc.text(`Valor total de Peças: R$ ${parseFloat(h.valorTotalPecas || 0).toFixed(2)}`, 10, y);
      y += 10;

      // SERVICES section
      doc.setFont(undefined, 'bold');
      doc.text("Serviços", 10, y);
      doc.setFont(undefined, 'normal');
      y += 7;

      const servicosOrdenados = [...(h.detalhesServicos || [])].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      );

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
          doc.text(`☐ ${s.nome}`, 10, y); // Ensure name is printed for unselected items
          doc.setTextColor(0);
          y += 6;
        }
      });

      doc.setTextColor(0);
      doc.setFont(undefined, 'bold');
      // Garante que valorTotalServicos é um número antes de formatar
      doc.text(`Valor total de Serviços: R$ ${parseFloat(h.valorTotalServicos || 0).toFixed(2)}`, 10, y);
      y += 10;

      // Garante que os totais são números antes de somar
      const total = (parseFloat(h.valorTotalPecas || 0) + parseFloat(h.valorTotalServicos || 0)).toFixed(2);
      doc.text(`TOTAL GERAL: R$ ${total}`, 10, y);
      y += 10;

      doc.setFont(undefined, 'normal');
      doc.text("Forma de pagamento: Pix, Débito e Crédito em até 10 vezes sem juros", 10, y);
      y += 15;

      // Add a new page if content exceeds current page height or if it's not the last budget
      if (y > 270) { // Check if content overflows the page
        doc.addPage();
        y = 20; // Reset Y for the new page
      }
      if (i < historico.length - 1) { // Add new page for each budget except the last one
        doc.addPage();
        y = 20; // Reset Y for the new page
      }
    });

    doc.save('painel-orcamentos-zero20.pdf'); // Save the complete PDF
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token
    navigate('/orcamento'); // Redirect to the budget page
  };

  // Function to open the view/edit modal
  const openModal = (type, orc) => {
    setModalType(type);
    setOrcamentoSelecionado({ ...orc }); // Set the selected budget for the modal
    setShowModal(true);
  };

  // Function to close the view/edit modal
  const closeModal = () => {
    setShowModal(false);
    setOrcamentoSelecionado(null);
  };

  // Function to handle editing an existing budget
  const handleEditar = () => {
    setHistorico(historico.map(h => h === orcamentoSelecionado.original ? {
      ...h,
      ...orcamentoSelecionado, // Update the original budget with edited data
    } : h));
    setShowModal(false); // Close the modal
    window.open('https://docs.google.com/spreadsheets/u/0/', '_blank'); // Open Google Sheets
  };

  // Helper function to render input fields for the modal based on budget data
  const renderModalFields = () => {
    if (!orcamentoSelecionado) return null;
    // Filter out the 'original' key as it's for internal reference
    const keys = Object.keys(orcamentoSelecionado).filter(
      k => k !== 'original'
    );
    return keys.map(key => (
      <label key={key} className="block mb-4 text-gray-700">
        {/* Capitalize the first letter of the key for display */}
        <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
        {typeof orcamentoSelecionado[key] === 'boolean' ? (
          // Render checkbox for boolean values
          <input
            type="checkbox"
            checked={orcamentoSelecionado[key]}
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: e.target.checked
            })}
            disabled={modalType === 'view'} // Disable if in view mode
            className="ml-2 form-checkbox h-5 w-5 text-blue-600 rounded"
          />
        ) : typeof orcamentoSelecionado[key] === 'number' ? (
          // Render number input for numeric values
          <input
            value={orcamentoSelecionado[key]}
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: Number(e.target.value) // Convert input value to number
            })}
            disabled={modalType === 'view'} // Disable if in view mode
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        ) : Array.isArray(orcamentoSelecionado[key]) ? (
          // Render textarea for array values, displaying them as editable JSON
          <textarea
            value={JSON.stringify(orcamentoSelecionado[key], null, 2)}
            onChange={e => {
              let val = e.target.value;
              try {
                val = JSON.parse(val); // Attempt to parse JSON
              } catch (err) {
                // If parsing fails, keep as string
              }
              setOrcamentoSelecionado({
                ...orcamentoSelecionado,
                [key]: val
              });
            }}
            disabled={modalType === 'view'} // Disable if in view mode
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono"
          />
        ) : (
          // Render text input for other types of values
          <input
            value={orcamentoSelecionado[key] ?? ''} // Use nullish coalescing for empty strings
            onChange={e => setOrcamentoSelecionado({
              ...orcamentoSelecionado,
              [key]: e.target.value
            })}
            disabled={modalType === 'view'} // Disable if in view mode
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        )}
      </label>
    ));
  };

  return (
    <div className='painel-orcamentos-container bg-gray-50 min-h-screen p-8 font-sans'>
      {/* Message Box */}
      {showMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center justify-between animate-fade-in-down">
          <span>{message}</span>
          <button onClick={hideMessageBox} className="ml-4 text-white font-bold text-xl">&times;</button>
        </div>
      )}

      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0">Painel de Orçamentos</h1>
        <div className="flex space-x-4">
          <button
            onClick={exportarExcel}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Exportar Todos para Excel
          </button>
          <button
            onClick={exportarPDFCompleto}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Exportar Todos para PDF
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75"
          >
            Sair
          </button>
        </div>
      </header>

      <nav className="mb-8 flex justify-center space-x-6">
        <button
          onClick={() => setTipo('motor')}
          className={`py-3 px-8 rounded-full font-semibold text-lg transition duration-300 ease-in-out ${
            tipo === 'motor' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-50'
          }`}
        >
          Orçamento Motor Completo
        </button>
        <button
          onClick={() => setTipo('cabecote')}
          className={`py-3 px-8 rounded-full font-semibold text-lg transition duration-300 ease-in-out ${
            tipo === 'cabecote' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-800 border border-blue-300 hover:bg-blue-50'
          }`}
        >
          Orçamento Cabeçote
        </button>
      </nav>

      <main className="bg-white p-8 rounded-lg shadow-xl mb-8">
        {tipo === 'motor' ? (
          <OrcamentoMotorCompleto onSubmit={handleSalvar} />
        ) : (
          <OrcamentoCabecote onSubmit={handleSalvar} />
        )}
      </main>

      {/* Integrate HistoricoOrcamentos here, passing necessary props */}
      <HistoricoOrcamentos
        historico={historico}
        setHistorico={setHistorico}
        onExportAllExcel={exportarExcel} // Pass the parent's exportAllExcel function
        onViewOrEditOrcamento={openModal} // Pass PainelOrcamentos's openModal to HistoricoOrcamentos
      />

      {/* Custom Modal for View/Edit (from PainelOrcamentos) */}
      {showModal && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{modalType === 'view' ? 'Ver Orçamento' : 'Editar Orçamento'}</h3>
              {renderModalFields()}
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                >
                  Fechar
                </button>
                {modalType === 'edit' && (
                  <button
                    onClick={handleEditar}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                  >
                    Salvar
                  </button>
                )}
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelOrcamentos;
