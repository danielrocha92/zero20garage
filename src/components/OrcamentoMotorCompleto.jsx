// src/components/OrcamentoMotorCompleto.jsx
import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css';

// Dados das peças e serviços
const itensMotorCompletoData = [
  { nome: "Pistão", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
  { nome: "Anel", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
  { nome: "Bronzina de biela", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
  { nome: "Bronzina de mancal", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
  { nome: "Arruela encosto", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
  { nome: "Bomba de óleo", temQuantidade: false },
  { nome: "Bomba d’água", temQuantidade: false },
  { nome: "Tubo d’água", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  {
    nome: "Litros de Óleo",
    temQuantidade: false,
    subItens: [
      { label: "20w50", type: "checkbox", initialValue: false },
      { label: "10W40", type: "checkbox", initialValue: false },
      { label: "5W30", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Litros de aditivo", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
  {
    nome: "Correias",
    temQuantidade: false,
    subItens: [
      { label: "Dent kit", type: "checkbox", initialValue: false },
      { label: "Capa", type: "checkbox", initialValue: false },
      { label: "Acessórios kit", type: "checkbox", initialValue: false },
      { label: "Corrente kit", type: "checkbox", initialValue: false }
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
      { label: "Admissão", type: "checkbox", initialValue: false },
      { label: "Escape", type: "checkbox", initialValue: false }
    ]
  },
  {
    nome: "Mangueiras Radiador",
    temQuantidade: false,
    subItens: [
      { label: "Inferior", type: "checkbox", initialValue: false },
      { label: "Superior", type: "checkbox", initialValue: false }
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
  { nome: "Outros", temQuantidade: false, subItens: [{ label:"", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

const servicosMotorCompletoData = [
  {
    nome: "Bloco",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox", initialValue: false },
      { label: "Limpeza e Revisão", type: "checkbox", initialValue: false }
    ]
  },
  {
    nome: "Cabeçote",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox", initialValue: false },
      { label: "Limpeza e Revisão", type: "checkbox", initialValue: false },
      { label: "Novo", type: "checkbox", initialValue: false },
      { label: "Recuperação altura", type: "checkbox", initialValue: false }
    ]
  },
  {
    nome: "Bielas",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox", initialValue: false },
      { label: "Nova", type: "checkbox", initialValue: false }
    ]
  },
  {
    nome: "Virabrequim",
    temQuantidade: false,
    subItens: [
      { label: "Usinagem completa", type: "checkbox", initialValue: false },
      { label: "Novo", type: "checkbox", initialValue: false }
    ]
  },
  { nome: "Montagem de Motor Técnica", temQuantidade: false },
  { nome: "Volante Usinagem completa", temQuantidade: false },
  { nome: "Banho (cárter, suportes, parafusos etc)", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

const OrcamentoMotorCompleto = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage }) => {
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
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    servicos: servicosMotorCompletoData.map(servico => ({
      ...servico,
      selecionado: false,
      quantidade: servico.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: servico.subItens ? servico.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalMaoDeObraManual: 0,
    totalGeralManual: 0,
    formaPagamento: '',
    observacoes: '',
    status: 'Aberto',
  });

  useEffect(() => {
    if (editingData) {
      const parsedDate = new Date(editingData.data);
      const validDate = !isNaN(parsedDate.getTime())
        ? parsedDate.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);

      setFormData({
        nome: editingData.cliente || '',
        telefone: editingData.telefone || '',
        veiculo: editingData.veiculo || '',
        placa: editingData.placa || '',
        data: validDate,
        ordemServico: editingData.ordemServico || '',
        totalPecasManual: parseFloat(editingData.valorTotalPecas) || 0,
        totalServicosManual: parseFloat(editingData.valorTotalServicos) || 0,
        totalMaoDeObraManual: parseFloat(editingData.totalMaoDeObra) || 0,
        totalGeralManual: parseFloat(editingData.valorTotal) || 0,
        formaPagamento: editingData.formaPagamento || '',
        observacoes: editingData.observacoes || '',
        status: editingData.status || 'Aberto',
        pecas: itensMotorCompletoData.map(pecaData => {
          const pecaEdit = editingData.pecasSelecionadas.find(p => p.includes(pecaData.nome));
          return {
            ...pecaData,
            selecionado: !!pecaEdit,
            subItens: pecaData.subItens ? pecaData.subItens.map(sub => ({
              ...sub,
              value: !!pecaEdit && pecaEdit.includes(sub.label) ? true : sub.initialValue
            })) : []
          };
        }),
        servicos: servicosMotorCompletoData.map(servicoData => {
          const servicoEdit = editingData.servicosSelecionados.find(s => s.includes(servicoData.nome));
          return {
            ...servicoData,
            selecionado: !!servicoEdit,
            subItens: servicoData.subItens ? servicoData.subItens.map(sub => ({
              ...sub,
              value: !!servicoEdit && servicoEdit.includes(sub.label) ? true : sub.initialValue
            })) : []
          };
        }),
      });
    } else {
      setFormData({
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
          subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
        })),
        servicos: servicosMotorCompletoData.map(servico => ({
          ...servico,
          selecionado: false,
          quantidade: servico.temQuantidade ? 1 : 0,
          medida: 0,
          subItens: servico.subItens ? servico.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
        })),
        totalPecasManual: 0,
        totalServicosManual: 0,
        totalMaoDeObraManual: 0,
        totalGeralManual: 0,
        formaPagamento: '',
        observacoes: '',
        status: 'Aberto',
      });
    }
  }, [editingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePecaChange = (index, field, value) => {
    setFormData(prev => {
      const pecasAtualizadas = [...prev.pecas];
      pecasAtualizadas[index][field] = value;
      return { ...prev, pecas: pecasAtualizadas };
    });
  };

  const handleServicoChange = (index, field, value) => {
    setFormData(prev => {
      const servicosAtualizados = [...prev.servicos];
      servicosAtualizados[index][field] = value;
      return { ...prev, servicos: servicosAtualizados };
    });
  };

  const handleSubItemCheckboxChange = (tipo, index, subIndex, checked) => {
    setFormData(prev => {
      const itemsAtualizados = [...prev[tipo]];
      itemsAtualizados[index].subItens[subIndex].value = checked;
      return { ...prev, [tipo]: itemsAtualizados };
    });
  };

  const handleSubItemTextChange = (tipo, index, subIndex, value) => {
    setFormData(prev => {
      const itemsAtualizados = [...prev[tipo]];
      itemsAtualizados[index].subItens[subIndex].value = value;
      return { ...prev, [tipo]: itemsAtualizados };
    });
  };

  const handleManualTotalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      showMessage('Cliente é obrigatório!', true);
      return;
    }

    // Filtra e formata as peças selecionadas
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

    // Filtra e formata os serviços selecionados
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
        {/* Informações do Cliente e Veículo */}
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

        {/* Peças */}
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
                        checked={peca.selecionado}
                        onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {peca.nome}
                    </label>
                  </td>
                  <td className="subitems-cell" colSpan="2">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            {sub.type === "checkbox" ? (
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={sub.value}
                                  onChange={(e) => handleSubItemCheckboxChange('pecas', index, sIdx, e.target.checked)}
                                />
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label className="sub-item-label">{sub.label}:</label>
                                <input
                                  type="text"
                                  value={sub.value}
                                  onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
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
              name="totalPecasManual"
              value={formData.totalPecasManual}
              onChange={handleManualTotalChange}
              step="0.01"
              className="input-total"
            />
          </div>
        </section>

        {/* Serviços */}
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
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={sub.value}
                                  onChange={(e) => handleSubItemCheckboxChange('servicos', index, sIdx, e.target.checked)}
                                />
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label className="sub-item-label">{sub.label}:</label>
                                <input
                                  type="text"
                                  value={sub.value}
                                  onChange={(e) => handleSubItemTextChange('servicos', index, sIdx, e.target.value)}
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
              name="totalServicosManual"
              value={formData.totalServicosManual}
              onChange={handleManualTotalChange}
              step="0.01"
              className="input-total"
            />
          </div>
        </section>

        {/* Totais e Pagamento */}
        <section className="summary-section">
          <div className="total-line-form">
            <span className="label">Valor total de Mão de Obra Mecânica:</span>
            <input
              type="number"
              name="totalMaoDeObraManual"
              value={formData.totalMaoDeObraManual}
              onChange={handleManualTotalChange}
              step="0.01"
              className="input-total"
            />
          </div>

          <div className="total-line-form total-geral">
            <span className="label">TOTAL GERAL:</span>
            <input
              type="number"
              name="totalGeralManual"
              value={formData.totalGeralManual}
              onChange={handleManualTotalChange}
              step="0.01"
              className="input-total-geral"
            />
          </div>

          <div className="form-group">
            <label>Forma de pagamento:</label>
            <input type="text" name="formaPagamento" value={formData.formaPagamento} onChange={handleInputChange} placeholder="Pix, Débito e Crédito em até xx vezes sem juros" />
          </div>

          <div className="form-group">
            <label>Observações:</label>
            <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="4"></textarea>
          </div>
        </section>

        {/* Ações */}
        <div className="form-actions">
          <button type="submit" className="action-btn">Salvar Orçamento</button>
        </div>
      </form>

      {/* Caixa de Mensagem */}
      {message && (
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