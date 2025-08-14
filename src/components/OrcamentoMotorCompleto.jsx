import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css';

// Lista de itens que devem ter apenas um campo de texto para especificação e não devem ter o botão "+ Detalhe"
const itemsWithSingleTextInput = [
  "Arruela encosto",
  "Bronzina de biela",
  "Bronzina de mancal",
  "Litros de aditivo",
  "Litros de óleo",
  "Pistão",
  "Válvulas admissão",
  "Válvulas escape",
  "Outros",
];

// Os dados de itens e serviços completos para o motor (ajustados para o modelo da imagem)
const itensMotorCompletoData = [
  { nome: "Pistão", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
  { nome: "Anel", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
  { nome: "Bronzina de biela", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
  { nome: "Bronzina de mancal", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
  { nome: "Arruela encosto", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
  { nome: "Bomba de óleo", temQuantidade: false },
  { nome: "Bomba d’água", temQuantidade: false },
  { nome: "Tubo d’água", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  { nome: "Litros de óleo", temQuantidade: false, subItens: [{ label: "Quantidade e Tipo", type: "text", initialValue: "" }] },
  { nome: "Litros de aditivo", temQuantidade: false, subItens: [{ label: "Quantidade e Tipo", type: "text", initialValue: "" }] },
  {
    nome: "Correias",
    temQuantidade: false,
    subItens: [
      { label: "Dent kit", type: "checkbox" },
      { label: "Capa", type: "checkbox" },
      { label: "Acessórios kit", type: "checkbox" },
      { label: "Corrente kit", type: "checkbox" }
    ]
  },
  { nome: "Válvula termostática", temQuantidade: false },
  { nome: "Kit junta motor aço", temQuantidade: false },
  { nome: "Retentor traseiro virab.", temQuantidade: false },
  { nome: "Engrenagem virab.", temQuantidade: false },
  { nome: "Retentor eixo comando", temQuantidade: false },
  { nome: "Retentor válvula", temQuantidade: false },
  {
    nome: "Comando de Válvula",
    temQuantidade: false,
    subItens: [
      { label: "Admissão", type: "checkbox" },
      { label: "Escape", type: "checkbox" }
    ]
  },
  {
    nome: "Mangueiras Radiador",
    temQuantidade: false,
    subItens: [
      { label: "Inferior", type: "checkbox" },
      { label: "Superior", type: "checkbox" }
    ]
  },
  { nome: "Válvulas escape", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Válvulas admissão", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "" }] },
  { nome: "Velas", temQuantidade: false },
  { nome: "Anti Chamas", temQuantidade: false },
  { nome: "Silicone", temQuantidade: false },
  { nome: "Parafusos cabeçote", temQuantidade: false },
  { nome: "Bobina", temQuantidade: false },
  { nome: "Tuchos", temQuantidade: false },
  { nome: "Cebolinha de óleo", temQuantidade: false },
  { nome: "Sensor de temperatura", temQuantidade: false },
  { nome: "Cabo de vela", temQuantidade: false },
  { nome: "Biela", temQuantidade: false },
  { nome: "Embreagem", temQuantidade: false },
  { nome: "Desengripante e Limpa contato", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: " ", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

const servicosMotorCompletoData = [
  { nome: "Bloco usinagem completa", temQuantidade: false },
  {
    nome: "Cabeçote",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox" },
      { label: "Limpeza e Revisão", type: "checkbox" },
      { label: "Novo", type: "checkbox" },
      { label: "Recuperação altura", type: "checkbox" }
    ]
  },
  {
    nome: "Bielas",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox" },
      { label: "Nova", type: "checkbox" }
    ]
  },
  {
    nome: "Virabrequim",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox" },
      { label: "Novo", type: "checkbox" }
    ]
  },
  { nome: "Montagem de Motor Técnica", temQuantidade: false },
  { nome: "Volante Usinagem completa", temQuantidade: false },
  { nome: "Banho (cárter, suportes, parafusos etc)", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

const OrcamentoMotorCompleto = ({ onSubmit, editingData, showMessageBox, message, showMessage, hideMessageBox, isErrorMessage }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10),
    ordemServico: '',
    pecas: itensMotorCompletoData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      total: 0,
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    servicos: servicosMotorCompletoData.map(servico => ({
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
      setFormData(prev => {
        const newPecas = itensMotorCompletoData.map(item => {
          const editedItemString = editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome));
          let selecionado = !!editedItemString;
          let quantidade = item.temQuantidade ? (editedItemString?.match(/:\s*(\d+)/)?.[1] || 1) : 0;
          let medida = item.temQuantidade ? (parseFloat(editedItemString?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0;

          let subItensAtualizados = item.subItens ? item.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedItemString) {
              const regex = new RegExp(`${sub.label}(?::\\s*([^;)]+))?`);
              const match = editedItemString.match(regex);
              if (match) {
                if (sub.type === "checkbox") {
                  subValue = true;
                } else if (match[1]) {
                  subValue = match[1].trim();
                }
              }
            }
            return { ...sub, value: subValue };
          }) : [];

          // Para itens sem subItens mas que foram marcados com 'X' ou alguma especificação
          if (!item.subItens && selecionado && itemsWithSingleTextInput.includes(item.nome)) {
            const textOnlyRegex = new RegExp(`^${item.nome}\\s*:\\s*(.+)$`);
            const textOnlyMatch = editedItemString.match(textOnlyRegex);
            if (textOnlyMatch && textOnlyMatch[1]) {
              subItensAtualizados = [{ label: " ", type: "text", value: textOnlyMatch[1].trim() }];
            }
          }

          return {
            ...item,
            selecionado,
            quantidade,
            medida,
            subItens: subItensAtualizados,
          };
        });

        const newServicos = servicosMotorCompletoData.map(servico => {
          const editedServicoString = editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome));
          let selecionado = !!editedServicoString;
          let quantidade = servico.temQuantidade ? (editedServicoString?.match(/:\s*(\d+)/)?.[1] || 1) : 0;
          let medida = servico.temQuantidade ? (parseFloat(editedServicoString?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0;

          let subItensAtualizados = servico.subItens ? servico.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedServicoString) {
              const regex = new RegExp(`${sub.label}(?::\\s*([^;)]+))?`);
              const match = editedServicoString.match(regex);
              if (match) {
                if (sub.type === "checkbox") {
                  subValue = true;
                } else if (match[1]) {
                  subValue = match[1].trim();
                }
              }
            }
            return { ...sub, value: subValue };
          }) : [];

          return {
            ...servico,
            selecionado,
            quantidade,
            medida,
            subItens: subItensAtualizados,
          };
        });

        const dataValida = editingData.data && editingData.data.toString().trim() !== '';
        const dataFormatada = dataValida ? new Date(editingData.data).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);


        return {
          ...prev,
          nome: editingData.cliente || '',
          telefone: editingData.telefone || '',
          veiculo: editingData.veiculo || '',
          placa: editingData.placa || '',
          data: dataFormatada,
          ordemServico: editingData.ordemServico || '',
          totalPecasManual: parseFloat(editingData.valorTotalPecas) || 0,
          totalServicosManual: parseFloat(editingData.valorTotalServicos) || 0,
          totalMaoDeObraManual: parseFloat(editingData.totalMaoDeObra) || 0,
          totalGeralManual: parseFloat(editingData.valorTotal) || 0,
          formaPagamento: editingData.formaPagamento || '',
          garantia: editingData.garantia || '',
          observacoes: editingData.observacoes || '',
          status: editingData.status || 'Aberto',
          pecas: newPecas,
          servicos: newServicos,
        };
      });
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

    // Filtra apenas os itens selecionados e formata
    const pecasSelecionadasFormatadas = formData.pecas
      .filter(peca => peca.selecionado)
      .map(peca => {
        let nomeCompleto = peca.nome;
        // Se houver quantidade e medida, adiciona
        if (peca.temQuantidade && peca.quantidade > 0) {
          nomeCompleto += `: : ${peca.quantidade}`;
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

    const servicosSelecionadasFormatadas = formData.servicos
      .filter(servico => servico.selecionado)
      .map(servico => {
        let nomeCompleto = servico.nome;
        // Se houver quantidade e medida, adiciona (embora na imagem não apareça para serviços)
        if (servico.temQuantidade && servico.quantidade > 0) {
          nomeCompleto += `: : ${servico.quantidade}`;
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
        <h1>ORÇAMENTO - MOTOR COMPLETO/PARCIAL</h1>
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

        {/* Totais e Pagamento */}
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
              <input type="text" id="garantia" name="garantia" value={formData.garantia} onChange={handleInputChange} placeholder="Ex: 90 dias ou 5.000 Km" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group" style={{ width: '100%' }}>
              <label htmlFor="observacoes">Observações:</label>
              <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="4"></textarea>
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Salvar Orçamento</button>
          <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>Cancelar</button>
        </div>

      </form>

      {/* Caixa de Mensagem */}
      {showMessageBox && (
        <div className="message-box-overlay" onClick={hideMessageBox}>
          <div className={`message-box ${isErrorMessage ? 'error' : 'success'}`} onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
            <button onClick={hideMessageBox}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrcamentoMotorCompleto;