// src/components/OrcamentoMotorCompleto.jsx
import React, { useState } from 'react';
import './OrcamentoForms.css'; // Certifique-se de que o CSS está acessível

// Os dados de itens e serviços completos para o motor
const itensMotorCompletoData = [
  { nome: "Anel", temQuantidade: true },
  { nome: "Anti Chamas", temQuantidade: true },
  { nome: "Arruela encosto", temQuantidade: true },
  {
    nome: "Biela",
    temQuantidade: true,
    subItens: [
      { label: "Usinagem", type: "quantity" }, // Primeiro item como quantidade
      { label: "Nova", type: "measure" }     // Segundo item como medida
    ]
  },
  { nome: "Bobina", temQuantidade: true },
  { nome: "Bomba d’água", temQuantidade: true },
  { nome: "Bomba de óleo", temQuantidade: true },
  { nome: "Bronzina de biela", temQuantidade: true },
  { nome: "Bronzina de mancal", temQuantidade: true },
  { nome: "Cabo de vela", temQuantidade: true },
  { nome: "Cebolinha de óleo", temQuantidade: true },
  {
    nome: "Comando de Válvula",
    temQuantidade: true,
    subItens: [
      { label: "Admissão", type: "text" },
      { label: "Escape", type: "text" }
    ]
  },
  {
    nome: "Correias",
    temQuantidade: true,
    subItens: [
      { label: "Dent kit", type: "text" },
      { label: "Capa", type: "text" },
      { label: "Acessórios kit", type: "text" },
      { label: "Corrente kit", type: "text" }
    ]
  },
  { nome: "Desengripante e Limpa contato", temQuantidade: true },
  { nome: "Embreagem", temQuantidade: true },
  { nome: "Engrenagem virab.", temQuantidade: true },
  { nome: "Filtro de ar", temQuantidade: true },
  { nome: "Filtro de combustível", temQuantidade: true },
  { nome: "Filtro de óleo", temQuantidade: true },
  { nome: "Litros de aditivo", temQuantidade: true },
  { nome: "Litros de óleo", temQuantidade: true },
  {
    nome: "Mangueiras Radiador",
    temQuantidade: true,
    subItens: [
      { label: "Inferior", type: "text" },
      { label: "Superior", type: "text" }
    ]
  },
  { nome: "Outros", temQuantidade: true, subItens: [] },
  { nome: "Parafusos cabeçote", temQuantidade: true },
  {
    nome: "Pistão",
    temQuantidade: true,
    subItens: [
      { label: "Standard (STD)", type: "checkbox" }, // Opção Standard
      { label: "Sobremedida (+0,25 mm)", type: "checkbox" }, // Opção Sobremedida
      { label: "Sobremedida (+0,50 mm)", type: "checkbox" }, // Opção Sobremedida
      { label: "Sobremedida (+0,75 mm)", type: "checkbox" }, // Opção Sobremedida
      { label: "Sobremedida (+1,00 mm)", type: "checkbox" }, // Opção Sobremedida
      { label: "Outra Medida (especifique)", type: "text" } // Para outras medidas ou observações
    ]
  },
  { nome: "Retentor eixo comando", temQuantidade: true },
  { nome: "Retentor traseiro virab.", temQuantidade: true },
  { nome: "Retentor válvula", temQuantidade: true },
  { nome: "Sensor de temperatura", temQuantidade: true },
  { nome: "Silicone", temQuantidade: true },
  { nome: "Tuchos", temQuantidade: true },
  { nome: "Tubo d’água", temQuantidade: true },
  { nome: "Válvula termostática", temQuantidade: true },
  { nome: "Válvulas admissão", temQuantidade: true },
  { nome: "Válvulas escape", temQuantidade: true },
  { nome: "Velas", temQuantidade: true },
  {
    nome: "Cabeçote",
    temQuantidade: true,
    subItens: [
      { label: "Usinagem completa", type: "text" },
      { label: "Limpeza e Revisão", type: "text" },
      { label: "Novo", type: "text" },
      { label: "Recuperação altura", type: "text" }
    ]
  },
  {
    nome: "Banho",
    temQuantidade: true,
    subItens: [
      { label: "cárter", type: "text" },
      { label: "suportes", type: "text" },
      { label: "parafusos", type: "text" },
      { label: "outros", type: "text" }
    ]
  },
  {
    nome: "Virabrequim",
    temQuantidade: true,
    subItens: [
      { label: "Usinagem completa", type: "text" },
      { label: "Novo", type: "text" }
    ]
  },
];

const servicosMotorCompletoData = [
  { nome: "Cabeçote", subItens: [] },
  { nome: "Retífica de Cabeçote", subItens: [] },
  { nome: "Retífica do Bloco" },
  { nome: "Retífica do Virabrequim" },
  { nome: "Montagem do Motor" },
  { nome: "Teste Dinâmico" },
  { nome: "Ajuste de Injeção" },
  { nome: "Revisão do Sistema de Arrefecimento" },
  { nome: "Outros Serviços de Motor", subItens: [] },
];

const OrcamentoMotorCompleto = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10),
    pecas: itensMotorCompletoData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      valorUnitario: 0,
      total: 0,
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.type === "checkbox" ? false : '' })) : [], // Inicializa 'value' como false para checkboxes
    })),
    servicos: servicosMotorCompletoData.map(servico => ({
      ...servico,
      selecionado: false,
      valor: 0,
      total: 0,
      subItens: servico.subItens ? servico.subItens.map(sub => ({ ...sub, value: sub.type === "checkbox" ? false : '' })) : [],
    })),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalGeralManual: 0,
    totalMaoDeObraManual: 0,
    formaPagamento: '',
    garantia: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePecaChange = (index, field, value) => {
    const newPecas = [...formData.pecas];
    newPecas[index][field] = value;
    if (field === 'selecionado' && !value) {
      newPecas[index].quantidade = newPecas[index].temQuantidade ? 1 : 0;
      newPecas[index].valorUnitario = 0;
      newPecas[index].total = 0;
      newPecas[index].subItens = newPecas[index].subItens.map(sub => ({ ...sub, value: sub.type === "checkbox" ? false : '' })); // Resetar subItens também
    }
    setFormData(prev => ({ ...prev, pecas: newPecas }));
  };

  const handleServicoChange = (index, field, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index][field] = value;
    if (field === 'selecionado' && !value) {
      newServicos[index].valor = 0;
      newServicos[index].total = 0;
      newServicos[index].subItens = newServicos[index].subItens.map(sub => ({ ...sub, value: sub.type === "checkbox" ? false : '' })); // Resetar subItens também
    }
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };

  const handleAddSubItem = (itemType, itemIndex) => {
    const items = [...formData[itemType]];
    if (!items[itemIndex].subItens) {
      items[itemIndex].subItens = [];
    }
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

  // Nova função para lidar com a mudança de checkboxes de sub-itens
  const handleSubItemCheckboxChange = (itemType, itemIndex, subItemIndex, isChecked) => {
    const items = [...formData[itemType]];
    // Se for um checkbox, defina o 'value' como o booleano 'isChecked'
    items[itemIndex].subItens[subItemIndex].value = isChecked;
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleManualTotalChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orcamentoFinal = {
      ...formData,
      tipo: 'motor completo',
      valorTotal: formData.totalGeralManual,
      detalhesPecas: formData.pecas.filter(p => p.selecionado || (p.subItens && p.subItens.some(sub => sub.type === "checkbox" ? sub.value : sub.value.trim() !== ''))).map(p => ({ // Ajuste para filtrar checkboxes
        ...p,
        subItens: p.subItens ? p.subItens.filter(sub => sub.type === "checkbox" ? sub.value : sub.value.trim() !== '').map(sub => ({ label: sub.label, value: sub.value, type: sub.type })) : []
      })),
      detalhesServicos: formData.servicos.filter(s => s.selecionado || (s.subItens && s.subItens.some(sub => sub.type === "checkbox" ? sub.value : sub.value.trim() !== ''))).map(s => ({ // Ajuste para filtrar checkboxes
        ...s,
        subItens: s.subItens ? s.subItens.filter(sub => sub.type === "checkbox" ? sub.value : sub.value.trim() !== '').map(sub => ({ label: sub.label, value: sub.value, type: sub.type })) : []
      })),
    };
    onSubmit(orcamentoFinal);
  };

  return (
    <div className="orcamento-form-container">
      <div className="form-header">
        <h1>ORÇAMENTO - MOTOR COMPLETO</h1>
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
                          <> {/* Fragmento para agrupar label e input */}
                            <label htmlFor={`peca-${index}-quantidade`} className="input-label">Qtd:</label>
                            <input
                              type="number"
                              id={`peca-${index}-quantidade`}
                              value={peca.quantidade}
                              onChange={(e) => handlePecaChange(index, 'quantidade', parseInt(e.target.value) || 0)}
                              min="0"
                              className="quantity-input small-input"
                            />
                          </>
                        )}
                        <> {/* Fragmento para agrupar label e input */}
                          <label htmlFor={`peca-${index}-valor`} className="input-label">Medida.:</label>
                          <input
                            type="number"
                            id={`peca-${index}-valor`}
                            placeholder="Medida."
                            value={peca.valorUnitario}
                            onChange={(e) => handlePecaChange(index, 'valorUnitario', parseFloat(e.target.value) || 0)}
                            step="0.01"
                            className="value-input small-input"
                          />
                        </>
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {peca.selecionado && peca.subItens && (
                      <div className="sub-items-container">
                        {peca.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label">{sub.label}:</label>
                            {sub.type === "checkbox" ? (
                              <input
                                type="checkbox"
                                checked={sub.value}
                                onChange={(e) => handleSubItemCheckboxChange('pecas', index, sIdx, e.target.checked)}
                                className="small-input"
                              />
                            ) : (
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
                            )}
                            <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('pecas', index, sIdx)}>X</button>
                          </div>
                        ))}
                        {/* Removido o botão "+ Detalhe" para evitar a adição de sub-itens arbitrários
                            quando o sub-item já é pré-definido como checkboxes.
                            Se houver necessidade de adicionar outros detalhes para "Pistão",
                            considere adicionar uma nova opção de sub-item "Outros Detalhes"
                            com type="text" no itensMotorCompletoData. */}
                        {peca.nome !== "Pistão" && (
                            <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('pecas', index)}>+ Detalhe</button>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="total-cell">
                    {peca.selecionado}
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
          <h2>Serviços - Retifica</h2>
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
                        <> {/* Fragmento para agrupar label e input */}
                          <label htmlFor={`servico-${index}-valor`} className="input-label">Valor:</label>
                          <input
                            type="number"
                            id={`servico-${index}-valor`}
                            placeholder="Valor"
                            value={servico.valor}
                            onChange={(e) => handleServicoChange(index, 'valor', parseFloat(e.target.value) || 0)}
                            step="0.01"
                            className="value-input small-input"
                          />
                        </>
                      </div>
                    )}
                  </td>
                  <td className="subitems-cell">
                    {servico.selecionado && servico.subItens && (
                      <div className="sub-items-container">
                        {servico.subItens.map((sub, sIdx) => (
                          <div key={sIdx} className="sub-item-input-group">
                            <label className="sub-item-label">{sub.label}:</label>
                            {sub.type === "checkbox" ? (
                              <input
                                type="checkbox"
                                checked={sub.value}
                                onChange={(e) => handleSubItemCheckboxChange('servicos', index, sIdx, e.target.checked)}
                                className="small-input"
                              />
                            ) : (
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
                            )}
                            <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('servicos', index, sIdx)}>X</button>
                          </div>
                        ))}
                        <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('servicos', index)}>+ Detalhe</button>
                      </div>
                    )}
                  </td>
                  <td className="total-cell">
                    {servico.selecionado}
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

export default OrcamentoMotorCompleto;