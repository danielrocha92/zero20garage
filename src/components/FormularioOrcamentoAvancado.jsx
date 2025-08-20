import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css';

// Inicializa itens com subitens e valores padrões
const inicializarItens = (itens) =>
  itens.map(item => ({
    ...item,
    selecionado: false,
    quantidade: item.temQuantidade ? 1 : 0,
    medida: 0,
    subItens: item.subItens ? item.subItens.map(sub => ({
      ...sub,
      value: sub.initialValue || (sub.type === "checkbox" ? false : '')
    })) : [],
  }));

// Formata os itens selecionados para envio
const formatarSelecionados = (items) =>
  items
    .filter(i => i.selecionado)
    .map(i => {
      let nomeCompleto = i.nome;
      if (i.temQuantidade && i.quantidade > 0) nomeCompleto += `: : ${i.quantidade}`;
      if (i.temQuantidade && i.medida > 0) nomeCompleto += ` Medida: ${i.medida}`;
      const subItensFormatados = i.subItens
        .filter(sub => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
        .map(sub => (sub.type === "checkbox" ? sub.label : `${sub.label}: ${sub.value}`))
        .join('; ');
      if (subItensFormatados) nomeCompleto += ` (${subItensFormatados})`;
      return nomeCompleto;
    });

const FormularioOrcamentoAvancado = ({
  itensData,
  servicosData,
  onSubmit,
  editingData,
  message,
  hideMessageBox,
  isErrorMessage
}) => {

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10),
    ordemServico: '',
    pecas: inicializarItens(itensData),
    servicos: inicializarItens(servicosData),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalMaoDeObraManual: 0,
    totalGeralManual: 0,
    formaPagamento: '',
    observacoes: '',
    status: 'Aberto',
  });

  // Popula dados de edição
  useEffect(() => {
    if (editingData) {
      setFormData(prev => ({
        ...prev,
        ...editingData,
        data: editingData.data ? new Date(editingData.data).toISOString().slice(0,10) : prev.data,
        pecas: itensData.map(item => {
          const editedItem = editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome));
          const selecionado = !!editedItem;
          const subItensAtualizados = item.subItens ? item.subItens.map(sub => {
            let value = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedItem) {
              const regex = new RegExp(`${sub.label}:\\s*([^;)]+)`);
              const match = editedItem.match(regex);
              if (match && match[1]) value = match[1].trim();
              else if (sub.type === "checkbox" && editedItem.includes(sub.label)) value = true;
            }
            return { ...sub, value };
          }) : [];
          return { ...item, selecionado, subItens: subItensAtualizados };
        }),
        servicos: servicosData.map(servico => {
          const editedServico = editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome));
          const selecionado = !!editedServico;
          const subItensAtualizados = servico.subItens ? servico.subItens.map(sub => {
            let value = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedServico) {
              const regex = new RegExp(`${sub.label}:\\s*([^;)]+)`);
              const match = editedServico.match(regex);
              if (match && match[1]) value = match[1].trim();
              else if (sub.type === "checkbox" && editedServico.includes(sub.label)) value = true;
            }
            return { ...sub, value };
          }) : [];
          return { ...servico, selecionado, subItens: subItensAtualizados };
        }),
      }));
    }
  }, [editingData, itensData, servicosData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (tipo, index, field, value) => {
    const items = [...formData[tipo]];
    items[index][field] = value;
    if (field === 'selecionado' && !value) {
      items[index].subItens = items[index].subItens.map(sub => ({
        ...sub,
        value: sub.initialValue || (sub.type === "checkbox" ? false : '')
      }));
    }
    setFormData(prev => ({ ...prev, [tipo]: items }));
  };

  const handleSubItemChange = (tipo, index, subIndex, value) => {
    const items = [...formData[tipo]];
    items[index].subItens[subIndex].value = value;
    setFormData(prev => ({ ...prev, [tipo]: items }));
  };

  const handleManualTotalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pecasSelecionadas = formatarSelecionados(formData.pecas);
    const servicosSelecionados = formatarSelecionados(formData.servicos);

    const orcamentoFinal = { ...formData, pecasSelecionadas, servicosSelecionados };
    onSubmit(orcamentoFinal);
  };

  return (
    <div className="orcamento-form-container">
      <h1>ORÇAMENTO AVANÇADO</h1>
      <form onSubmit={handleSubmit}>

        {/* Cliente e Veículo */}
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td><input type="text" name="ordemServico" value={formData.ordemServico} onChange={handleInputChange} placeholder="OS"/></td>
                <td><input type="text" name="nome" value={formData.nome} onChange={handleInputChange} placeholder="Cliente" required/></td>
                <td><input type="date" name="data" value={formData.data} onChange={handleInputChange}/></td>
              </tr>
              <tr>
                <td><input type="text" name="veiculo" value={formData.veiculo} onChange={handleInputChange} placeholder="Veículo"/></td>
                <td><input type="text" name="placa" value={formData.placa} onChange={handleInputChange} placeholder="Placa"/></td>
                <td><input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} placeholder="Telefone"/></td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Peças */}
        <section className="section-form">
          <h2>Peças</h2>
          <table className="items-table">
            <tbody>
              {formData.pecas.map((peca, i) => (
                <tr key={i}>
                  <td>
                    <label className="custom-checkbox">
                      <input type="checkbox" checked={peca.selecionado} onChange={() => handleItemChange('pecas', i, 'selecionado', !peca.selecionado)}/>
                      <span className="checkbox-box"></span>
                      {peca.nome}
                    </label>
                  </td>
                  <td colSpan="2">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            {sub.type === "checkbox" ? (
                              <label className="custom-checkbox">
                                <input type="checkbox" checked={sub.value} onChange={e => handleSubItemChange('pecas', i, sIdx, e.target.checked)}/>
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label>{sub.label}</label>
                                <input type="text" value={sub.value} onChange={e => handleSubItemChange('pecas', i, sIdx, e.target.value)} className="small-input"/>
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
          <input type="number" name="totalPecasManual" value={formData.totalPecasManual} onChange={handleManualTotalChange} placeholder="Total Peças"/>
        </section>

        {/* Serviços */}
        <section className="section-form">
          <h2>Serviços</h2>
          <table className="items-table">
            <tbody>
              {formData.servicos.map((s, i) => (
                <tr key={i}>
                  <td>
                    <label className="custom-checkbox">
                      <input type="checkbox" checked={s.selecionado} onChange={() => handleItemChange('servicos', i, 'selecionado', !s.selecionado)}/>
                      <span className="checkbox-box"></span>
                      {s.nome}
                    </label>
                  </td>
                  <td colSpan="2">
                    {s.selecionado && s.subItens && (
                      <div className="sub-items-container">
                        {s.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            {sub.type === "checkbox" ? (
                              <label className="custom-checkbox">
                                <input type="checkbox" checked={sub.value} onChange={e => handleSubItemChange('servicos', i, sIdx, e.target.checked)}/>
                                <span className="checkbox-box"></span>
                                {sub.label}
                              </label>
                            ) : (
                              <>
                                <label>{sub.label}</label>
                                <input type="text" value={sub.value} onChange={e => handleSubItemChange('servicos', i, sIdx, e.target.value)} className="small-input"/>
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
          <input type="number" name="totalServicosManual" value={formData.totalServicosManual} onChange={handleManualTotalChange} placeholder="Total Serviços"/>
        </section>

        {/* Totais e Observações */}
        <section className="summary-section">
          <input type="number" name="totalMaoDeObraManual" value={formData.totalMaoDeObraManual} onChange={handleManualTotalChange} placeholder="Total Mão de Obra"/>
          <input type="number" name="totalGeralManual" value={formData.totalGeralManual} onChange={handleManualTotalChange} placeholder="TOTAL GERAL"/>
          <input type="text" name="formaPagamento" value={formData.formaPagamento} onChange={handleInputChange} placeholder="Forma de pagamento"/>
          <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} placeholder="Observações"/>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Aberto">Aberto</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Rejeitado">Rejeitado</option>
            <option value="Concluido">Concluido</option>
          </select>
        </section>

        {/* Mensagem de alerta */}
        {message && (
          <div className={`message-box ${isErrorMessage ? 'error' : 'success'}`} onClick={hideMessageBox}>
            <p>{message}</p>
            <button onClick={hideMessageBox}>OK</button>
          </div>
        )}

        <button type="submit" className="save-button">Salvar Orçamento</button>
      </form>
    </div>
  );
};

export default FormularioOrcamentoAvancado;
