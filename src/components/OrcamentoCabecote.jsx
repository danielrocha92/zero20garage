// src/components/OrcamentoCabecote.jsx
import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css'; // Importe o novo CSS para formulários

const OrcamentoCabecote = ({ onSubmit }) => {
  // Estado inicial do formulário (ADAPTE COM SEUS DADOS INICIAIS)
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    veiculo: '',
    placa: '',
    data: new Date().toISOString().slice(0, 10), // Data atual no formato YYYY-MM-DD
    pecas: [
      // Exemplo de estrutura de item de peça. Adapte com suas peças reais
      { nome: 'Anel (Cabeçote)', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Tuchos', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Anti Chamas (Cabeçote)', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Guias de Válvula', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Retentor de Válvula', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Assentos de Válvula', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Válvulas de Admissão', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Válvulas de Escape', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Parafusos do Cabeçote', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Junta do Cabeçote', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true },
      { nome: 'Comando de Válvula', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true, subItens: [] },
      { nome: 'Outras Peças Cabeçote', selecionado: false, quantidade: 1, valorUnitario: 0, total: 0, temQuantidade: true, subItens: [] },
    ],
    servicos: [
      // Exemplo de estrutura de item de serviço. Adapte com seus serviços reais
      { nome: 'Usinagem Completa', selecionado: false, valor: 0, total: 0, subItens: [] },
      { nome: 'Limpeza e Revisão', selecionado: false, valor: 0, total: 0, subItens: [] },
      { nome: 'Recuperação de Altura', selecionado: false, valor: 0, total: 0, subItens: [] },
      { nome: 'Montagem de Cabeçote', selecionado: false, valor: 0, total: 0 },
      { nome: 'Teste de estanqueidade', selecionado: false, valor: 0, total: 0},
      { nome: 'Troca de selos', selecionado: false, valor: 0, total: 0},
      { nome: 'Jateamento', selecionado: false, valor: 0, total: 0},
      { nome: 'Retífica de Válvulas', selecionado: false, valor: 0, total: 0},
      { nome: 'Troca de retentores de válvulas', selecionado: false, valor: 0, total: 0},
    ],
    formaPagamento: '',
    garantia: '',
  });

  // Efeito para recalcular o total de peças quando houver mudança
  useEffect(() => {
    const updatedPecas = formData.pecas.map(peca => ({
      ...peca,
      total: peca.selecionado ? (peca.quantidade * peca.valorUnitario).toFixed(2) : 0
    }));
    setFormData(prev => ({ ...prev, pecas: updatedPecas }));
  }, [formData.pecas.map(p => `${p.selecionado}-${p.quantidade}-${p.valorUnitario}`).join('-')]); // Dependências para recalculo

  // Efeito para recalcular o total de serviços quando houver mudança
  useEffect(() => {
    const updatedServicos = formData.servicos.map(servico => ({
      ...servico,
      total: servico.selecionado ? parseFloat(servico.valor || 0).toFixed(2) : 0
    }));
    setFormData(prev => ({ ...prev, servicos: updatedServicos }));
  }, [formData.servicos.map(s => `${s.selecionado}-${s.valor}`).join('-')]); // Dependências para recalculo


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePecaChange = (index, field, value) => {
    const newPecas = [...formData.pecas];
    newPecas[index][field] = value;
    setFormData(prev => ({ ...prev, pecas: newPecas }));
  };

  const handleServicoChange = (index, field, value) => {
    const newServicos = [...formData.servicos];
    newServicos[index][field] = value;
    setFormData(prev => ({ ...prev, servicos: newServicos }));
  };

  // Funções para adicionar/remover sub-itens (se você tiver essa funcionalidade)
  const handleAddSubItem = (itemType, itemIndex) => {
    const items = [...formData[itemType]];
    if (!items[itemIndex].subItens) {
      items[itemIndex].subItens = [];
    }
    items[itemIndex].subItens.push(''); // Adiciona um campo de texto vazio para o sub-item
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleRemoveSubItem = (itemType, itemIndex, subItemIndex) => {
    const items = [...formData[itemType]];
    items[itemIndex].subItens.splice(subItemIndex, 1);
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };

  const handleSubItemTextChange = (itemType, itemIndex, subItemIndex, value) => {
    const items = [...formData[itemType]];
    items[itemIndex].subItens[subItemIndex] = value;
    setFormData(prev => ({ ...prev, [itemType]: items }));
  };


  const calculateTotalPecas = () => {
    return formData.pecas.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
  };

  const calculateTotalServicos = () => {
    return formData.servicos.reduce((sum, item) => sum + parseFloat(item.total || 0), 0);
  };

  const totalPecas = calculateTotalPecas();
  const totalServicos = calculateTotalServicos();
  const totalGeral = totalPecas + totalServicos;


  const handleSubmit = (e) => {
    e.preventDefault();
    // Crie o objeto de orçamento final com todos os dados
    const orcamentoFinal = {
      ...formData,
      tipo: 'cabeçote', // Ou 'motor' para OrcamentoMotorCompleto
      valorTotal: totalGeral,
      detalhesPecas: formData.pecas.filter(p => p.selecionado || p.quantidade > 0 || (p.subItens && p.subItens.length > 0 && p.subItens.some(sub => sub.trim() !== ''))).map(p => ({
          ...p,
          subItens: p.subItens ? p.subItens.filter(sub => sub.trim() !== '') : [] // Limpa subitens vazios
      })),
      detalhesServicos: formData.servicos.filter(s => s.selecionado || (s.subItens && s.subItens.length > 0 && s.subItens.some(sub => sub.trim() !== ''))).map(s => ({
          ...s,
          subItens: s.subItens ? s.subItens.filter(sub => sub.trim() !== '') : [] // Limpa subitens vazios
      })),
    };
    onSubmit(orcamentoFinal); // Chama a função onSubmit do PainelOrcamentos
  };

  return (
    <div className="orcamento-form-container">
      <div className="form-header">
        <h1>Orçamento - Cabeçote</h1>
        <p>Preencha os detalhes do orçamento para o cabeçote.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <section className="client-vehicle-section">
          <div className="form-group">
            <label htmlFor="nome">Nome do Cliente:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="veiculo">Veículo:</label>
            <input type="text" id="veiculo" name="veiculo" value={formData.veiculo} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="placa">Placa:</label>
            <input type="text" id="placa" name="placa" value={formData.placa} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data:</label>
            <input type="date" id="data" name="data" value={formData.data} onChange={handleInputChange} required />
          </div>
        </section>

        {/* Seção de Peças */}
        <section className="section-form">
          <h2>Peças para Cabeçote</h2>
          <div className="items-grid">
            {formData.pecas.map((peca, index) => (
              <div key={index}>
                <div className="item-row">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={peca.selecionado}
                      onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                    />
                    <span className="checkbox-box"></span>
                    {peca.nome}
                  </label>
                  {(peca.selecionado) && ( // Exibir inputs apenas se selecionado ou com quantidade
                    <div className="item-inputs">
                      {peca.temQuantidade && (
                        <input
                          type="number"
                          placeholder="Qtd"
                          value={peca.quantidade}
                          onChange={(e) => handlePecaChange(index, 'quantidade', parseInt(e.target.value) || 0)}
                          min="0"
                          className="quantity-input"
                        />
                      )}
                      <input
                        type="number"
                        placeholder="Valor"
                        value={peca.valorUnitario}
                        onChange={(e) => handlePecaChange(index, 'valorUnitario', parseFloat(e.target.value) || 0)}
                        step="0.01"
                        className="value-input"
                      />
                    </div>
                  )}
                </div>
                {/* Campos para sub-itens, se houver */}
                {(peca.selecionado && peca.subItens !== undefined) && (
                  <div className="sub-items-container">
                    {peca.subItens.map((sub, sIdx) => (
                      <div key={sIdx} className="sub-item-input-group">
                        <input
                          type="text"
                          placeholder="Detalhe do item"
                          value={sub}
                          onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
                        />
                        <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('pecas', index, sIdx)}>X</button>
                      </div>
                    ))}
                    <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('pecas', index)}>+ Adicionar Detalhe</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Serviços */}
        <section className="section-form">
          <h2>Serviços de Retífica de Cabeçote</h2>
          <div className="items-grid">
            {formData.servicos.map((servico, index) => (
              <div key={index}>
                <div className="item-row">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={servico.selecionado}
                      onChange={() => handleServicoChange(index, 'selecionado', !servico.selecionado)}
                    />
                    <span className="checkbox-box"></span>
                    {servico.nome}
                  </label>
                  {(servico.selecionado) && (
                    <div className="item-inputs">
                      <input
                        type="number"
                        placeholder="Valor"
                        value={servico.valor}
                        onChange={(e) => handleServicoChange(index, 'valor', parseFloat(e.target.value) || 0)}
                        step="0.01"
                        className="value-input"
                      />
                    </div>
                  )}
                </div>
                {/* Campos para sub-itens de serviços, se houver */}
                {(servico.selecionado && servico.subItens !== undefined) && (
                  <div className="sub-items-container">
                    {servico.subItens.map((sub, sIdx) => (
                      <div key={sIdx} className="sub-item-input-group">
                        <input
                          type="text"
                          placeholder="Detalhe do serviço"
                          value={sub}
                          onChange={(e) => handleSubItemTextChange('servicos', index, sIdx, e.target.value)}
                        />
                        <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('servicos', index, sIdx)}>X</button>
                      </div>
                    ))}
                    <button type="button" className="add-sub-item-btn" onClick={() => handleAddSubItem('servicos', index)}>+ Adicionar Detalhe</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Linhas de Total */}
        <div className="total-line-form">
          <span className="label">Total Peças:</span>
          <span className="value-display">R$ {totalPecas.toFixed(2)}</span>
        </div>
        <div className="total-line-form">
          <span className="label">Total Serviços:</span>
          <span className="value-display">R$ {totalServicos.toFixed(2)}</span>
        </div>
        <div className="total-geral-form">
          <span className="label">TOTAL GERAL:</span>
          <span className="value-display">R$ {totalGeral.toFixed(2)}</span>
        </div>

        {/* Forma de Pagamento e Garantia */}
        <section className="payment-warranty-section">
            <div className="form-group">
                <label htmlFor="formaPagamento">Forma de Pagamento:</label>
                <input type="text" id="formaPagamento" name="formaPagamento" value={formData.formaPagamento} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label htmlFor="garantia">Garantia:</label>
                <input type="text" id="garantia" name="garantia" value={formData.garantia} onChange={handleInputChange} />
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