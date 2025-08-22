import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css';

const OrcamentoGenerico = ({ onSubmit, editingData, showMessage, hideMessageBox, message, isErrorMessage, orcamentoData, titulo }) => {
  const itensData = orcamentoData.itens;
  const servicosData = orcamentoData.servicos;

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10),
    ordemServico: '',
    pecas: itensData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    servicos: servicosData.map(servico => ({
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
    imagens: [],
  });

  useEffect(() => {
    if (!editingData) return;

    const parsedDate = new Date(editingData.data);
    const validDate = !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    setFormData(prev => ({
      ...prev,
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
      pecas: itensData.map(pecaData => {
        const pecaEdit = editingData.pecasSelecionadas.find(p => p.includes(pecaData.nome));
        const quantidadeMatch = pecaEdit ? pecaEdit.match(/::\s*(\d+)/) : null;
        const quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1], 10) : (pecaData.temQuantidade ? 1 : 0);

        return {
          ...pecaData,
          selecionado: !!pecaEdit,
          quantidade: quantidade,
          subItens: pecaData.subItens ? pecaData.subItens.map(sub => ({
            ...sub,
            value: !!pecaEdit && pecaEdit.includes(sub.label) ? true : sub.initialValue
          })) : []
        };
      }),
      servicos: servicosData.map(servicoData => {
        const servicoEdit = editingData.servicosSelecionados.find(s => s.includes(servicoData.nome));
        const quantidadeMatch = servicoEdit ? servicoEdit.match(/::\s*(\d+)/) : null;
        const quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1], 10) : (servicoData.temQuantidade ? 1 : 0);

        return {
          ...servicoData,
          selecionado: !!servicoEdit,
          quantidade: quantidade,
          subItens: servicoData.subItens ? servicoData.subItens.map(sub => ({
            ...sub,
            value: !!servicoEdit && servicoEdit.includes(sub.label) ? true : sub.initialValue
          })) : []
        };
      }),
      imagens: editingData.imagens || [],
    }));
  }, [editingData, itensData, servicosData]);

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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      imagens: [...prev.imagens, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      showMessage('Cliente é obrigatório!', true);
      return;
    }

    const pecasSelecionadasFormatadas = formData.pecas
      .filter(p => p.selecionado)
      .map(peca => {
        let nomeCompleto = peca.nome;
        if (peca.temQuantidade && peca.quantidade > 0) nomeCompleto += `:: ${peca.quantidade}`;
        if (peca.temQuantidade && peca.medida > 0) nomeCompleto += ` Medida: ${peca.medida}`;
        const subItensFormatados = peca.subItens
          .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map(sub => sub.type === "checkbox" ? sub.label : `${sub.label}: ${sub.value}`)
          .join('; ');
        if (subItensFormatados) nomeCompleto += ` (${subItensFormatados})`;
        return nomeCompleto;
      });

    const servicosSelecionadasFormatadas = formData.servicos
      .filter(s => s.selecionado)
      .map(servico => {
        let nomeCompleto = servico.nome;
        if (servico.temQuantidade && servico.quantidade > 0) nomeCompleto += `:: ${servico.quantidade}`;
        if (servico.temQuantidade && servico.medida > 0) nomeCompleto += ` Medida: ${servico.medida}`;
        const subItensFormatados = servico.subItens
          .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map(sub => sub.type === "checkbox" ? sub.label : `${sub.label}: ${sub.value}`)
          .join('; ');
        if (subItensFormatados) nomeCompleto += ` (${subItensFormatados})`;
        return nomeCompleto;
      });

    onSubmit({
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
    });
  };

  const gerarOpcoesQuantidade = () => {
    const opcoes = [];
    for (let i = 1; i <= 100; i++) opcoes.push(<option key={i} value={i}>{i}</option>);
    return opcoes;
  };

  return (
    <div className="client-vehicle-section">
      <h1>{titulo}</h1>

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
                  <td className="subitems-cell">
                    {peca.selecionado && peca.subItens && peca.subItens.length > 0 && (
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
                  <td className="quantidade-cell">
                    {peca.selecionado && peca.temQuantidade ? (
                      <>
                        <label className="quantidade-label">Qtd:</label>
                        <select
                          name="quantidade"
                          value={peca.quantidade}
                          onChange={(e) => handlePecaChange(index, 'quantidade', parseInt(e.target.value))}
                          className="quantidade-select"
                        >
                          {gerarOpcoesQuantidade()}
                        </select>
                      </>
                    ) : null}
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
          <h2>Serviços Retífica</h2>
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
                  <td className="subitems-cell">
                    {servico.selecionado && servico.subItens && servico.subItens.length > 0 && (
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
                  <td className="quantidade-cell">
                    {servico.selecionado && servico.temQuantidade && (
                      <>
                        <label className="quantidade-label">Qtd:</label>
                        <select
                          name="quantidade"
                          value={servico.quantidade}
                          onChange={(e) => handleServicoChange(index, 'quantidade', parseInt(e.target.value))}
                          className="quantidade-select"
                        >
                          {gerarOpcoesQuantidade()}
                        </select>
                      </>
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
            <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} rows="3" />
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Aberto">Aberto</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Rejeitado">Rejeitado</option>
              <option value="Concluido">Concluido</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fotos do serviço:</label>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              multiple
              onChange={handleImageChange}
            />
            <div className="preview-imagens">
              {formData.imagens && formData.imagens.map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                  alt={`Foto ${idx + 1}`}
                  style={{ maxWidth: 120, margin: 4, borderRadius: 8 }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Ações */}
        <div className="form-actions">
          <button type="submit" className="action-btn">Salvar Orçamento</button>
        </div>
      </form>

      {message && (
        <div className="message-box-overlay" onClick={hideMessageBox}>
          <div className={`message-box ${isErrorMessage ? 'error' : 'success'}`}>
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrcamentoGenerico;
