import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css'; // Importe o CSS para este componente

// Lista de itens que devem ter apenas um campo de texto para especificação e não devem ter o botão "+ Detalhe"
const itemsWithSingleTextInput = [
  "Válvula de Admissão",
  "Válvula de Escape",
  "Guia de Válvula",
  "Sede de Válvula",
];

// Os dados de itens e serviços completos para o cabeçote
const itensCabecoteData = [
  { nome: "Válvula de Admissão", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Válvula de Escape", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Retentor de Válvula", temQuantidade: false },
  { nome: "Guia de Válvula", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Sede de Válvula", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Tucho Hidráulico", temQuantidade: false },
  { nome: "Junta do Cabeçote", temQuantidade: false },
  { nome: "Parafuso do Cabeçote", temQuantidade: false },
  { nome: "Comando de Válvulas", temQuantidade: false },
  { nome: "Molas de Válvula", temQuantidade: false },
  { nome: "Balanceiro", temQuantidade: false },
  { nome: "Prisioneiros", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

const servicosCabecoteData = [
  { nome: "Plainar Cabeçote", temQuantidade: false },
  { nome: "Teste de Trinca (Hidráulico/Magnaflux)", temQuantidade: false },
  { nome: "Retífica de Sedes e Válvulas", temQuantidade: false },
  { nome: "Troca de Guias de Válvula", temQuantidade: false },
  { nome: "Troca de Retentores de Válvula", temQuantidade: false },
  { nome: "Banho Químico (Limpeza)", temQuantidade: false },
  { nome: "Esmerilhamento de Válvulas", temQuantidade: false },
  { nome: "Montagem do Cabeçote", temQuantidade: false },
  { nome: "Regulagem de Válvulas", temQuantidade: false },
  { nome: "Solda (se necessário)", temQuantidade: false },
  { nome: "Recuperação de Rosca", temQuantidade: false },
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

  // Efeito para carregar dados de edição
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
              subItensAtualizados = [{ label: "Especificação/Medida", type: "text", value: textOnlyMatch[1].trim() }];
            }
          }

          return {
            ...item,
            selecionado,
            quantidade: item.temQuantidade ? (editedItem?.match(/Qtd:\s*(\d+)/)?.[1] || 1) : 0,
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
            quantidade: servico.temQuantidade ? (editedServico?.match(/Qtd:\s*(\d+)/)?.[1] || 1) : 0,
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

  const handleAddSubItem = (itemType, itemIndex) => {
    const items = [...formData[itemType]];
    if (!items[itemIndex].subItens) {
      items[itemIndex].subItens = [];
    }
    // Adiciona um novo sub-item genérico (texto)
    items[itemIndex].subItens.push({ label: 'Novo Detalhe', type: 'text', value: '' });
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleRemoveSubItem = (itemType, itemIndex, subItemIndex) => {
    const items = [...formData[itemType]];
    items[itemIndex].subItens.splice(subItemIndex, 1);
    setFormData(prev => ({ ...prev, [itemType]: items }));
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
        // Se houver quantidade e medida, adiciona
        if (peca.temQuantidade && peca.quantidade > 0) {
          nomeCompleto += `: Qtd: ${peca.quantidade}`;
        }
        if (peca.temQuantidade && peca.medida > 0) {
          nomeCompleto += ` Medida: ${peca.medida}`;
        }
        // Adiciona sub-itens formatados
        const subItensFormatados = peca.subItens
          .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map(sub => {
            if (sub.type === "checkbox") {
              return sub.label; // Apenas o label se for checkbox marcado
            } else {
              return `${sub.label}: ${sub.value}`; // Label: Valor para texto
            }
          })
          .join('; '); // Junta com ponto e vírgula para legibilidade

        if (subItensFormatados) {
          nomeCompleto += ` (${subItensFormatados})`;
        }
        return nomeCompleto;
      });

    const servicosSelecionadosFormatadas = formData.servicos
      .filter(servico => servico.selecionado)
      .map(servico => {
        let nomeCompleto = servico.nome;
        // Se houver quantidade e medida, adiciona (embora na imagem não apareça para serviços)
        if (servico.temQuantidade && servico.quantidade > 0) {
          nomeCompleto += `: Qtd: ${servico.quantidade}`;
        }
        if (servico.temQuantidade && servico.medida > 0) {
          nomeCompleto += ` Medida: ${servico.medida}`;
        }
        // Adiciona sub-itens formatados
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
      servicosSelecionados: servicosSelecionadosFormatadas,
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
        <h1>ORÇAMENTO - CABEÇOTE</h1> {/* Título específico para cabeçote */}
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
                  <td className="checkbox-cell">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`peca-${index}-${peca.nome.replace(/\s+/g, '')}`} // Adicionado id
                        name={`peca-${peca.nome.replace(/\s+/g, '')}`} // Adicionado name
                        checked={peca.selecionado}
                        onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {peca.nome}
                    </label>
                  </td>
                  <td className="inputs-cell">
                    {peca.selecionado && peca.temQuantidade && (
                      <div className="item-inputs">
                        <div>
                          <label htmlFor={`peca-${index}-quantidade`} className="input-label">Qtd:</label>
                          <input
                            type="number"
                            id={`peca-${index}-quantidade`}
                            name={`peca-${index}-quantidade`} // Adicionado name
                            value={peca.quantidade}
                            onChange={(e) => handlePecaChange(index, 'quantidade', parseInt(e.target.value) || 0)}
                            min="0"
                            className="quantity-input small-input"
                          />
                        </div>
                        <div>
                          <label htmlFor={`peca-${index}-medida`} className="input-label">Medidas:</label>
                          <input
                            type="number"
                            id={`peca-${index}-medida`}
                            name={`peca-${index}-medida`} // Adicionado name
                            placeholder="Medidas"
                            value={peca.medida}
                            onChange={(e) => handlePecaChange(index, 'medida', parseFloat(e.target.value) || 0)}
                            step="0.01"
                            className="value-input small-input"
                          />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label" htmlFor={`peca-${index}-sub-${sIdx}-${sub.type}`}>
                              {sub.label}:
                            </label>
                            {sub.type === "checkbox" ? (
                              <input
                                type="checkbox"
                                id={`peca-${index}-sub-${sIdx}-${sub.type}`} // Adicionado id
                                name={`peca-${index}-sub-${sIdx}-${sub.type}`} // Adicionado name
                                checked={sub.value}
                                onChange={(e) => handleSubItemCheckboxChange('pecas', index, sIdx, e.target.checked)}
                                className="small-input"
                              />
                            ) : (
                              <input
                                type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                                id={`peca-${index}-sub-${sIdx}-${sub.type}`} // Adicionado id
                                name={`peca-${index}-sub-${sIdx}-${sub.type}`} // Adicionado name
                                placeholder={
                                  sub.type === "quantity" ? `Qtd` :
                                    sub.type === "measure" ? `Medida` :
                                      `Insira o texto`
                                }
                                value={sub.value}
                                onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
                                step={sub.type === "measure" ? "0.01" : "1"}
                                className="small-input"
                              />
                            )}
                            {!itemsWithSingleTextInput.includes(peca.nome) && (
                              <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('pecas', index, sIdx)}>X</button>
                            )}
                          </div>
                        ))}
                        {peca.subItens.length > 0 && !itemsWithSingleTextInput.includes(peca.nome) && (
                          <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('pecas', index)}>+ Detalhe</button>
                        )}
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
              id="totalPecasManual" // Adicionado id
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
          <h2>Serviços</h2>
          <table className="items-table">
            <tbody>
              {formData.servicos.map((servico, index) => (
                <tr key={index}>
                  <td className="checkbox-cell">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={`servico-${index}-${servico.nome.replace(/\s+/g, '')}`} // Adicionado id
                        name={`servico-${servico.nome.replace(/\s+/g, '')}`} // Adicionado name
                        checked={servico.selecionado}
                        onChange={() => handleServicoChange(index, 'selecionado', !servico.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {servico.nome}
                    </label>
                  </td>
                  <td className="inputs-cell">
                    {servico.selecionado && servico.temQuantidade && (
                      <div className="item-inputs">
                        <div>
                          <label htmlFor={`servico-${index}-quantidade`} className="input-label">Qtd:</label>
                          <input
                            type="number"
                            id={`servico-${index}-quantidade`}
                            name={`servico-${index}-quantidade`} // Adicionado name
                            value={servico.quantidade}
                            onChange={(e) => handleServicoChange(index, 'quantidade', parseInt(e.target.value) || 0)}
                            min="0"
                            className="quantity-input small-input"
                          />
                        </div>
                        <div>
                          <label htmlFor={`servico-${index}-medida`} className="input-label">Medidas:</label>
                          <input
                            type="number"
                            id={`servico-${index}-medida`}
                            name={`servico-${index}-medida`} // Adicionado name
                            placeholder="Medidas"
                            value={servico.medida}
                            onChange={(e) => handleServicoChange(index, 'medida', parseFloat(e.target.value) || 0)}
                            step="0.01"
                            className="value-input small-input"
                          />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {servico.selecionado && servico.subItens && (
                      <div className="sub-items-container">
                        {servico.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label" htmlFor={`servico-${index}-sub-${sIdx}-${sub.type}`}>
                              {sub.label}:
                            </label>
                            {sub.type === "checkbox" ? (
                              <input
                                type="checkbox"
                                id={`servico-${index}-sub-${sIdx}-${sub.type}`} // Adicionado id
                                name={`servico-${index}-sub-${sIdx}-${sub.type}`} // Adicionado name
                                checked={sub.value}
                                onChange={(e) => handleSubItemCheckboxChange('servicos', index, sIdx, e.target.checked)}
                                className="small-input"
                              />
                            ) : (
                              <input
                                type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                                id={`servico-${index}-sub-${sIdx}-${sub.type}`} // Adicionado id
                                name={`servico-${index}-sub-${sIdx}-${sub.type}`} // Adicionado name
                                placeholder={
                                  sub.type === "quantity" ? `Qtd` :
                                    sub.type === "measure" ? `Medida` :
                                      `Insira o texto`
                                }
                                value={sub.value}
                                onChange={(e) => handleSubItemTextChange('servicos', index, sIdx, e.target.value)}
                                step={sub.type === "measure" ? "0.01" : "1"}
                                className="small-input"
                              />
                            )}
                            <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('servicos', index, sIdx)}>X</button>
                          </div>
                        ))}
                        {servico.subItens.length > 0 && !itemsWithSingleTextInput.includes(servico.nome) && (
                          <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('servicos', index)}>+ Detalhe</button>
                        )}
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
              id="totalServicosManual" // Adicionado id
              className="value-display input-total"
              name="totalServicosManual"
              value={formData.totalServicosManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
        </section>

        {/* Totais e Pagamento */}
        <section className="summary-section">
          <div className="total-line-form">
            <span className="label">Valor total de Mão de Obra Mecânica:</span>
            <input
              type="number"
              id="totalMaoDeObraManual" // Adicionado id
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
              id="totalGeralManual" // Adicionado id
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
            <label htmlFor="observacoes">Observações:</label>
            <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Aberto">Aberto</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </section>

        {showMessage && (
          <div className={`message-box ${isErrorMessage ? 'error' : 'success'}`}>
            <span>{message}</span>
            <button type="button" onClick={hideMessageBox}>&times;</button>
          </div>
        )}

        <button type="submit" className="submit-btn">
          {editingData ? 'Atualizar Orçamento' : 'Salvar Orçamento'}
        </button>
      </form>
    </div>
  );
};

export default OrcamentoCabecote;
