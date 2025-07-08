// src/components/OrcamentoCabecote.jsx
import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css'; // Importa o novo CSS para formulários

// Dados de itens e serviços para o orçamento de Cabeçote
const itensCabecoteData = [
  { nome: "Anel (Cabeçote)", temQuantidade: true, subItens: [] },
  { nome: "Tuchos", temQuantidade: true, subItens: [] },
  { nome: "Anti Chamas (Cabeçote)", temQuantidade: true, subItens: [] },
  { nome: "Guias de Válvula", temQuantidade: true, subItens: [] },
  { nome: "Retentor de Válvula", temQuantidade: true, subItens: [] },
  { nome: "Assentos de Válvula", temQuantidade: true, subItens: [] },
  { nome: "Válvulas de Admissão", temQuantidade: true, subItens: [] },
  { nome: "Válvulas de Escape", temQuantidade: true, subItens: [] },
  { nome: "Parafusos do Cabeçote", temQuantidade: true, subItens: [] },
  { nome: "Junta do Cabeçote", temQuantidade: true, subItens: [] },
  { nome: "Comando de Válvula", temQuantidade: true, subItens: [] }, // Alterado para subItens genéricos
  { nome: "Retentor Eixo Comando", temQuantidade: true, subItens: [] },
  { nome: "Outras Peças Cabeçote", temQuantidade: true, subItens: [] },
];

const servicosCabecoteData = [
  { nome: "Usinagem Completa", subItens: [] },
  { nome: "Limpeza e Revisão", subItens: [] },
  { nome: "Recuperação de Altura", subItens: [] },
  { nome: "Montagem de Cabeçote", subItens: [] },
  { nome: "Teste de estanqueidade", subItens: [] },
  { nome: "Troca de selos", subItens: [] },
  { nome: "Jateamento", subItens: [] },
  { nome: "Retífica de Válvulas", subItens: [] },
  { nome: "Troca de retentores de válvulas", subItens: [] },
  { nome: "Substituição de Válvulas", subItens: [] },
  { nome: "Reparo de Roscas", subItens: [] },
  { nome: "Descarbonização Completa", subItens: [] },
  { nome: "Outros Serviços de Cabeçote", subItens: [] },
];

const OrcamentoCabecote = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10), // Data atual no formato YYYY-MM-DD
    pecas: itensCabecoteData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0, // Inicia quantidade como 1 se temQuantidade for true
      valorUnitario: 0,
      total: 0,
      subItens: item.subItens ? item.subItens.map(sub => ({ label: sub.label || sub, type: sub.type || 'text', value: '' })) : [],
    })),
    servicos: servicosCabecoteData.map(servico => ({
      ...servico,
      selecionado: false,
      valor: 0,
      total: 0,
      subItens: servico.subItens ? servico.subItens.map(sub => ({ label: sub.label || sub, type: sub.type || 'text', value: '' })) : [],
    })),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalMaoDeObraManual: 0, // Adicionado para consistência
    totalGeralManual: 0, // Adicionado para consistência
    formaPagamento: '',
    garantia: '',
  });

  // Efeito para recalcular o total de peças quando houver mudança
  useEffect(() => {
    const updatedPecas = formData.pecas.map(peca => ({
      ...peca,
      total: peca.selecionado ? (peca.quantidade * peca.valorUnitario) : 0
    }));
    setFormData(prev => ({ ...prev, pecas: updatedPecas }));
  }, [formData.pecas]);

  // Efeito para recalcular o total de serviços quando houver mudança
  useEffect(() => {
    const updatedServicos = formData.servicos.map(servico => ({
      ...servico,
      total: servico.selecionado ? parseFloat(servico.valor || 0) : 0
    }));
    setFormData(prev => ({ ...prev, servicos: updatedServicos }));
  }, [formData.servicos]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePecaChange = (index, field, value) => {
    const newPecas = [...formData.pecas];
    newPecas[index][field] = value;
    // Se desmarcar, zera quantidade e valor unitário
    if (field === 'selecionado' && !value) {
      newPecas[index].quantidade = newPecas[index].temQuantidade ? 1 : 0;
      newPecas[index].valorUnitario = 0;
      newPecas[index].total = 0;
      newPecas[index].subItens = newPecas[index].subItens.map(sub => ({ ...sub, value: '' })); // Limpa subItens
    }
    setFormData(prev => ({ ...prev, pecas: newPecas }));
  };

  const handleServicoChange = (index, field, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index][field] = value;
    // Se desmarcar, zera valor
    if (field === 'selecionado' && !value) {
      newServicos[index].valor = 0;
      newServicos[index].total = 0;
      newServicos[index].subItens = newServicos[index].subItens.map(sub => ({ ...sub, value: '' })); // Limpa subItens
    }
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };

  const handleAddSubItem = (itemType, itemIndex) => {
    const items = [...formData[itemType]];
    if (!items[itemIndex].subItens) {
      items[itemIndex].subItens = [];
    }
    items[itemIndex].subItens.push({ label: 'Novo Detalhe', type: 'text', value: '' }); // Adiciona um novo sub-item padrão
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

  const handleManualTotalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };


  const calculateTotalPecas = () => {
    return formData.pecas.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
  };

  const calculateTotalServicos = () => {
    return formData.servicos.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
  };

  const totalPecas = calculateTotalPecas();
  const totalServicos = calculateTotalServicos();
  const totalGeral = totalPecas + totalServicos + formData.totalMaoDeObraManual;


  const handleSubmit = (e) => {
    e.preventDefault();
    // Crie o objeto de orçamento final com todos os dados
    const orcamentoFinal = {
      ...formData,
      tipo: 'cabeçote', // Informa o tipo de orçamento
      valorTotal: totalGeral,
      detalhesPecas: formData.pecas.filter(p => p.selecionado || (p.subItens && p.subItens.some(sub => sub.value.trim() !== ''))).map(p => ({
        ...p,
        subItens: p.subItens ? p.subItens.filter(sub => sub.value.trim() !== '').map(sub => ({ label: sub.label, value: sub.value, type: sub.type })) : []
      })),
      detalhesServicos: formData.servicos.filter(s => s.selecionado || (s.subItens && s.subItens.some(sub => sub.value.trim() !== ''))).map(s => ({
        ...s,
        subItens: s.subItens ? s.subItens.filter(sub => sub.value.trim() !== '').map(sub => ({ label: sub.label, value: sub.value, type: sub.type })) : []
      })),
    };
    onSubmit(orcamentoFinal); // Chama a função onSubmit do PainelOrcamentos
  };

  return (
    <div className="orcamento-form-container">
      <div className="form-header">
        <h1>ORÇAMENTO - CABEÇOTE</h1>
        <img src="/path/to/your/logo.png" alt="Logo Zero Vinte Garage" className="header-logo" /> {/* Adicione o caminho correto para o logo */}
      </div>

      <form onSubmit={handleSubmit}>
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="nome">Cliente:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="data">Data:</label>
                    <input type="date" id="data" name="data" value={formData.data} onChange={handleInputChange} required />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="veiculo">Veículo:</label>
                    <input type="text" id="veiculo" name="veiculo" value={formData.veiculo} onChange={handleInputChange} required />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="placa">Placa:</label>
                    <input type="text" id="placa" name="placa" value={formData.placa} onChange={handleInputChange} required />
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="form-group">
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
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
                        checked={peca.selecionado}
                        onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {peca.nome}
                    </label>
                  </td>
                  <td className="inputs-cell">
                    {peca.selecionado && (
                      <div className="item-inputs">
                        {peca.temQuantidade && (
                          <input
                            type="number"
                            placeholder="Qtd"
                            value={peca.quantidade}
                            onChange={(e) => handlePecaChange(index, 'quantidade', parseInt(e.target.value) || 0)}
                            min="0"
                            className="quantity-input small-input"
                          />
                        )}
                        <input
                          type="number"
                          placeholder="Valor Unit."
                          value={peca.valorUnitario}
                          onChange={(e) => handlePecaChange(index, 'valorUnitario', parseFloat(e.target.value) || 0)}
                          step="0.01"
                          className="value-input small-input"
                        />
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label">{sub.label}:</label>
                            <input
                              type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                              placeholder={
                                sub.type === "quantity" ? `Qtd` :
                                  sub.type === "measure" ? `Medida` :
                                    ``
                              }
                              value={sub.value}
                              onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
                              step={sub.type === "measure" ? "0.01" : "1"}
                              className="small-input"
                            />
                            <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('pecas', index, sIdx)}>X</button>
                          </div>
                        ))}
                        <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('pecas', index)}>+ Detalhe</button>
                      </div>
                    )}
                  </td>
                  <td className="total-cell">
                    {peca.selecionado && (
                      <input
                        type="number"
                        placeholder="Total Item"
                        value={peca.total}
                        onChange={(e) => handlePecaChange(index, 'total', parseFloat(e.target.value) || 0)}
                        step="0.01"
                        className="value-input small-input"
                      />
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
                        checked={servico.selecionado}
                        onChange={() => handleServicoChange(index, 'selecionado', !servico.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {servico.nome}
                    </label>
                  </td>
                  <td className="inputs-cell">
                    {servico.selecionado && (
                      <div className="item-inputs">
                        <input
                          type="number"
                          placeholder="Valor"
                          value={servico.valor}
                          onChange={(e) => handleServicoChange(index, 'valor', parseFloat(e.target.value) || 0)}
                          step="0.01"
                          className="value-input small-input"
                        />
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {servico.selecionado && servico.subItens && (
                      <div className="sub-items-container">
                        {servico.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label">{sub.label}:</label>
                            <input
                              type={sub.type === "quantity" || sub.type === "measure" ? "number" : "text"}
                              placeholder={
                                sub.type === "quantity" ? `Qtd` :
                                  sub.type === "measure" ? `Medida` :
                                    ``
                              }
                              value={sub.value}
                              onChange={(e) => handleSubItemTextChange('servicos', index, sIdx, e.target.value)}
                              step={sub.type === "measure" ? "0.01" : "1"}
                              className="small-input"
                            />
                            <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('servicos', index, sIdx)}>X</button>
                          </div>
                        ))}
                        <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('servicos', index)}>+ Detalhe</button>
                      </div>
                    )}
                  </td>
                  <td className="total-cell">
                    {servico.selecionado && (
                      <input
                        type="number"
                        placeholder="Total Item"
                        value={servico.total}
                        onChange={(e) => handleServicoChange(index, 'total', parseFloat(e.target.value) || 0)}
                        step="0.01"
                        className="value-input small-input"
                      />
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
              className="value-display input-total"
              name="totalMaoDeObraManual"
              value={formData.totalMaoDeObraManual}
              onChange={handleManualTotalChange}
              step="0.01"
            />
          </div>
          <div className="total-geral-form">
            <span className="label">TOTAL GERAL:</span>
            <input
              type="number"
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
        </section>

        {/* Botões do Formulário */}
        <div className="form-buttons">
          <button type="submit" className="action-btn">Salvar Orçamento</button>
        </div>
      </form>
    </div>
  );
};

export default OrcamentoCabecote;