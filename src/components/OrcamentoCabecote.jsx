import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css'; // Importe o CSS para este componente

// Os dados de itens e serviços completos, conforme a imagem fornecida
const itensCabecoteData = [
  { nome: "Bomba d'água", temQuantidade: true },
  { nome: "Tubo d'água", temQuantidade: true },
  { nome: "Filtro de óleo", temQuantidade: true },
  { nome: "Filtro de ar", temQuantidade: true },
  { nome: "Filtro de combustível", temQuantidade: true },
  {
    nome: "Litros de Óleo",
    temQuantidade: false,
    subItens: [
      { label: "20w50", type: "checkbox", initialValue: false },
      { label: "10W40", type: "checkbox", initialValue: false },
      { label: "5W30", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Litros de aditivo", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  {
    nome: "Correias", temQuantidade: false,
    subItens: [
      { label: "Dent kit", type: "checkbox", initialValue: false },
      { label: "Capa", type: "checkbox", initialValue: false },
      { label: "Acessórios kit", type: "checkbox", initialValue: false },
      { label: "Corrente kit", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Válvula termostática", temQuantidade: true },
  { nome: "Kit junta motor aço", temQuantidade: true },
  { nome: "Retentor eixo comando", temQuantidade: true },
  { nome: "Retentor válvula", temQuantidade: true },
  {
    nome: "Comando de Válvula", temQuantidade: false,
    subItens: [
      { label: "Admin", type: "checkbox", initialValue: false },
      { label: "Escape", type: "checkbox", initialValue: false },
    ]
  },
  {
    nome: "Mangueiras Radiador", temQuantidade: false,
    subItens: [
      { label: "Inferior", type: "checkbox", initialValue: false },
      { label: "Superior", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Válvulas escape", temQuantidade: true },
  { nome: "Válvulas admissão", temQuantidade: true },
  { nome: "Velas", temQuantidade: true },
  { nome: "Anti Chamas", temQuantidade: true },
  { nome: "Silicone", temQuantidade: true },
  { nome: "Parafusos cabeçote", temQuantidade: true },
  { nome: "Bobina", temQuantidade: true },
  { nome: "Tuchos", temQuantidade: true },
  { nome: "Cebolinha de óleo", temQuantidade: true },
  { nome: "Sensor de temperatura", temQuantidade: true },
  { nome: "Cabo de vela", temQuantidade: true },
  { nome: "Biela", temQuantidade: true },
  { nome: "Embreagem", temQuantidade: true },
  { nome: "Outros", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

const servicosCabecoteData = [
  { nome: "Usinagem Completa", temQuantidade: false },
  { nome: "Limpeza e Revisão", temQuantidade: false },
  { nome: "Novo", temQuantidade: false },
  { nome: "Recuperação de Altura", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

const OrcamentoCabecote = ({ onSubmit, editingData, showMessageBox, message, showMessage, hideMessageBox, isErrorMessage }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10),
    ordemServico: '',
    pecas: itensCabecoteData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      total: 0,
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    servicos: servicosCabecoteData.map(servico => ({
      ...servico,
      selecionado: false,
      quantidade: servico.temQuantidade ? 1 : 0,
      medida: 0,
      total: 0,
      subItens: servico.subItens ? servico.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalMaoDeObraManual: 0,
    totalGeralManual: 0,
    formaPagamento: '',
    garantia: '',
    observacoes: '',
    status: 'Aberto',
  });

  useEffect(() => {
    if (editingData) {
      setFormData(prev => ({
        ...prev,
        nome: editingData.cliente || '',
        telefone: editingData.telefone || '',
        veiculo: editingData.veiculo || '',
        placa: editingData.placa || '',
        data: editingData.data ? new Date(editingData.data).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        ordemServico: editingData.ordemServico || '',
        totalPecasManual: parseFloat(editingData.valorTotalPecas) || 0,
        totalServicosManual: parseFloat(editingData.valorTotalServicos) || 0,
        totalMaoDeObraManual: parseFloat(editingData.totalMaoDeObra) || 0,
        totalGeralManual: parseFloat(editingData.valorTotal) || 0,
        formaPagamento: editingData.formaPagamento || '',
        garantia: editingData.garantia || '',
        observacoes: editingData.observacoes || '',
        status: editingData.status || 'Aberto',
        pecas: itensCabecoteData.map(item => {
          const editedItem = editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome));
          let selecionado = !!editedItem;

          let subItensAtualizados = item.subItens ? item.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedItem) {
              const regex = new RegExp(`${sub.label}:\\s*([^;)]+)`);
              const match = editedItem.match(regex);
              if (match && match[1]) {
                if (sub.type === "checkbox") {
                  subValue = true;
                } else {
                  subValue = match[1].trim();
                }
              } else if (sub.type === "checkbox" && editedItem.includes(sub.label)) {
                subValue = true;
              }
            }
            return { ...sub, value: subValue };
          }) : [];

          if (!item.subItens && selecionado) {
            const textOnlyRegex = new RegExp(`^${item.nome}\\s*:\\s*(.+)$`);
            const textOnlyMatch = editedItem.match(textOnlyRegex);
            if (textOnlyMatch && textOnlyMatch[1]) {
              subItensAtualizados = [{ label:"", type: "text", value: textOnlyMatch[1].trim() }];
            }
          }

          return {
            ...item,
            selecionado,
            quantidade: item.temQuantidade ? (editedItem?.match(/:\s*(\d+)/)?.[1] || 1) : 0,
            medida: item.temQuantidade ? (parseFloat(editedItem?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0,
            subItens: subItensAtualizados,
          };
        }),
        servicos: servicosCabecoteData.map(servico => {
          const editedServico = editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome));
          let selecionado = !!editedServico;

          let subItensAtualizados = servico.subItens ? servico.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedServico) {
              const regex = new RegExp(`${sub.label}\\s*[:]?\\s*([^;)]+)?`);
              const match = editedServico.match(regex);
              if (match) {
                if (sub.type === "checkbox") {
                  subValue = true;
                } else if (match[1]) {
                  subValue = match[1].trim();
                }
              } else if (sub.type === "checkbox" && editedServico.includes(sub.label)) {
                subValue = true;
              }
            }
            return { ...sub, value: subValue };
          }) : [];

          return {
            ...servico,
            selecionado,
            quantidade: servico.temQuantidade ? (editedServico?.match(/:\s*(\d+)/)?.[1] || 1) : 0,
            medida: servico.temQuantidade ? (parseFloat(editedServico?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0,
            subItens: subItensAtualizados,
          };
        }),
      }));
    }
  }, [editingData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePecaChange = (index, field, value) => {
    const newPecas = [...formData.pecas];
    newPecas[index][field] = value;
    if (field === 'selecionado' && !value) {
      // Reset sub-items if deselected
      newPecas[index].subItens = newPecas[index].subItens ? newPecas[index].subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [];
    }
    setFormData(prev => ({ ...prev, pecas: newPecas }));
  };

  const handleServicoChange = (index, field, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index][field] = value;
    if (field === 'selecionado' && !value) {
      // Reset sub-items if deselected
      newServicos[index].subItens = newServicos[index].subItens ? newServicos[index].subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [];
    }
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };

  const handleSubItemTextChange = (itemType, itemIndex, subItemIndex, value) => {
    const items = [...formData[itemType]];
    items[itemIndex].subItens[subItemIndex].value = value;
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleSubItemCheckboxChange = (itemType, itemIndex, subItemIndex, isChecked) => {
    const items = [...formData[itemType]];
    items[itemIndex].subItens[subItemIndex].value = isChecked;
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleManualTotalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filtra apenas os itens selecionados e formata como na imagem
    const pecasSelecionadasFormatadas = formData.pecas
      .filter(peca => peca.selecionado)
      .map(peca => {
        let nomeCompleto = peca.nome;
        if (peca.temQuantidade && peca.quantidade > 0) {
          nomeCompleto += `: : ${peca.quantidade}`;
        }
        if (peca.temQuantidade && peca.medida > 0) {
          nomeCompleto += ` Medida: ${peca.medida}`;
        }
        const subItensFormatados = peca.subItens
          .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map(sub => {
            if (sub.type === "checkbox") {
              return sub.label;
            } else {
              return `${sub.label}: ${sub.value}`;
            }
          })
          .join('; ');

        if (subItensFormatados) {
          nomeCompleto += ` (${subItensFormatados})`;
        }
        return nomeCompleto;
      });

    const servicosSelecionadasFormatadas = formData.servicos
      .filter(servico => servico.selecionado)
      .map(servico => {
        let nomeCompleto = servico.nome;
        if (servico.temQuantidade && servico.quantidade > 0) {
          nomeCompleto += `: : ${servico.quantidade}`;
        }
        if (servico.temQuantidade && servico.medida > 0) {
          nomeCompleto += ` Medida: ${servico.medida}`;
        }
        const subItensFormatados = servico.subItens
          .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map(sub => {
            if (sub.type === "checkbox") {
              return sub.label;
            } else {
              return `${sub.label}: ${sub.value}`;
            }
          })
          .join('; ');

        if (subItensFormatados) {
          nomeCompleto += ` (${subItensFormatados})`;
        }
        return nomeCompleto;
      });

    const orcamentoFinal = {
      cliente: formData.nome,
      telefone: formData.telefone,
      veiculo: formData.veiculo,
      placa: formData.placa,
      data: formData.data,
      ordemServico: formData.ordemServico,
      pecasSelecionadas: pecasSelecionadasFormatadas,
      servicosSelecionados: servicosSelecionadasFormatadas,
      valorTotalPecas: formData.totalPecasManual,
      valorTotalServicos: formData.totalServicosManual,
      totalMaoDeObra: formData.totalMaoDeObraManual,
      valorTotal: formData.totalGeralManual,
      formaPagamento: formData.formaPagamento,
      garantia: formData.garantia,
      observacoes: formData.observacoes,
      status: formData.status,
    };

    onSubmit(orcamentoFinal);
  };

  return (
    <div className="orcamento-form-container">
      <div className="form-header">
        <h1>ORÇAMENTO - GERAL</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="ordemServico">OS:</label>
                    <input type="text" id="ordemServico" name="ordemServico" value={formData.ordemServico} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="nome">Cliente:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="data">Data:</label>
                    <input type="date" id="data" name="data" value={formData.data} onChange={handleInputChange} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="veiculo">Veículo:</label>
                    <input type="text" id="veiculo" name="veiculo" value={formData.veiculo} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="placa">Placa:</label>
                    <input type="text" id="placa" name="placa" value={formData.placa} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Seção de Peças */}
        <section className="section-form">
          <h2>Peças</h2>
          <table className="items-table">
            <tbody>
              {formData.pecas.map((peca, index) => (
                <tr key={index}>
                  {/* Checkbox principal do item */}
                  <td className="checkbox-cell">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`peca-${index}-${peca.nome.replace(/\s+/g, '')}`}
                        name={`peca-${peca.nome.replace(/\s+/g, '')}`}
                        checked={peca.selecionado}
                        onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {peca.nome}:
                    </label>
                  </td>

                  {/* Container para inputs de quantidade e medida, se existirem */}
                  <td className="subitems-cell" colSpan="2">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            {sub.type === "checkbox" ? (
                              // Sub-item com a classe custom-checkbox
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  id={`peca-${index}-sub-${sIdx}-${sub.type}`}
                                  name={`peca-${index}-sub-${sIdx}-${sub.type}`}
                                  checked={sub.value}
                                  onChange={(e) => handleSubItemCheckboxChange('pecas', index, sIdx, e.target.checked)}
                                />
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label className="sub-item-label" htmlFor={`peca-${index}-sub-${sIdx}-${sub.type}`}>
                                  {sub.label}:
                                </label>
                                <input
                                  type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                                  id={`peca-${index}-sub-${sIdx}-${sub.type}`}
                                  name={`peca-${index}-sub-${sIdx}-${sub.type}`}
                                  placeholder={sub.label}
                                  value={sub.value}
                                  onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
                                  step={sub.type === "measure" ? "0.01" : "1"}
                                  className="small-input"
                                />
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-line-form">
            <span className="label">Valor total de Peças:</span>
            <input
              type="number"
              id="totalPecasManual"
              className="value-display input-total"
              name="totalPecasManual"
              value={formData.totalPecasManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
        </section>

        {/* Seção de Serviços */}
        <section className="section-form">
          <h2>Serviços no Cabeçote - Retifica</h2>
          <table className="items-table">
            <tbody>
              {formData.servicos.map((servico, index) => (
                <tr key={index}>
                  <td className="checkbox-cell">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`servico-${index}-${servico.nome.replace(/\s+/g, '')}`}
                        name={`servico-${servico.nome.replace(/\s+/g, '')}`}
                        checked={servico.selecionado}
                        onChange={() => handleServicoChange(index, 'selecionado', !servico.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {servico.nome}
                    </label>
                  </td>
                  <td className="subitems-cell" colSpan="2">
                    {servico.selecionado && servico.subItens && (
                      <div className="sub-items-container">
                        {servico.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            {sub.type === "checkbox" ? (
                              // Sub-item com a classe custom-checkbox
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  id={`servico-${index}-sub-${sIdx}-${sub.type}`}
                                  name={`servico-${index}-sub-${sIdx}-${sub.type}`}
                                  checked={sub.value}
                                  onChange={(e) => handleSubItemCheckboxChange('servicos', index, sIdx, e.target.checked)}
                                />
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label className="sub-item-label" htmlFor={`servico-${index}-sub-${sIdx}-${sub.type}`}>
                                  {sub.label}:
                                </label>
                                <input
                                  type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                                  id={`servico-${index}-sub-${sIdx}-${sub.type}`}
                                  name={`servico-${index}-sub-${sIdx}-${sub.type}`}
                                  placeholder={sub.label}
                                  value={sub.value}
                                  onChange={(e) => handleSubItemTextChange('servicos', index, sIdx, e.target.value)}
                                  step={sub.type === "measure" ? "0.01" : "1"}
                                  className="small-input"
                                />
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-line-form">
            <span className="label">Valor total de Serviços:</span>
            <input
              type="number"
              id="totalServicosManual"
              className="value-display input-total"
              name="totalServicosManual"
              value={formData.totalServicosManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
        </section>

        {/* Seção de Totais, Pagamento e Observações */}
        <section className="summary-section">
          <div className="total-line-form">
            <span className="label">Valor total de Mão de Obra Mecânica:</span>
            <input
              type="number"
              id="totalMaoDeObraManual"
              className="value-display input-total"
              name="totalMaoDeObraManual"
              value={formData.totalMaoDeObraManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
          <div className="total-line-form total-geral">
            <span className="label">TOTAL GERAL:</span>
            <input
              type="number"
              id="totalGeralManual"
              className="value-display input-total-geral"
              name="totalGeralManual"
              value={formData.totalGeralManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
          <div className="form-row">
            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="formaPagamento">Forma de pagamento:</label>
              <input type="text" id="formaPagamento" name="formaPagamento" value={formData.formaPagamento} onChange={handleInputChange} placeholder="Pix, Débito e Crédito em até xx vezes sem juros" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="garantia">Garantia:</label>
              <input type="text" id="garantia" name="garantia" value={formData.garantia} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="observacoes">Observacoes:</label>
            <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Aberto">Aberto</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Concluido">Concluido</option>
            </select>
          </div>
        </section>

        {/* Caixa de Mensagem */}
        {message && (
          <div className="message-box-overlay" onClick={hideMessageBox}>
            <div className={`message-box ${isErrorMessage ? 'error' : 'success'}`} onClick={(e) => e.stopPropagation()}>
              <p>{message}</p>
              <button onClick={hideMessageBox}>OK</button>
            </div>
          </div>
        )}

        <button type="submit" className="action-btn">
          {editingData ? 'Atualizar Orçamento' : 'Salvar Orçamento'}
        </button>
      </form>
    </div>
  );
};

export default OrcamentoCabecote;