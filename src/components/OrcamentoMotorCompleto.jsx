import React, { useState, useEffect } from 'react';
import './OrcamentoForms.css'; // Certifique-se de que o CSS está acessível
import backgroundImage from '../assets/images/background.jpg';

// Lista de itens que devem ter apenas um campo de texto para especificação e não devem ter o botão "+ Detalhe"
const itemsWithSingleTextInput = [
  "Anel",
  "Arruela encosto",
  "Bronzina de biela",
  "Bronzina de mancal",
  "Litros de aditivo",
  "Litros de óleo",
  "Pistão",
  "Válvulas admissão",
  "Válvulas escape",
];

// Os dados de itens e serviços completos para o motor
const itensMotorCompletoData = [
  // ITENS COM CHECKBOX + INPUT DE TEXTO ESPECÍFICO (conforme sua lista), ordenados alfabeticamente
  { nome: "Anel", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text", initialValue: "0,50" }] }, // Adicionado initialValue
  { nome: "Anti Chamas", temQuantidade: false }, // Apenas checkbox
  { nome: "Arruela encosto", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text" }] },
  { nome: "Bobina", temQuantidade: false }, // Apenas checkbox
  { nome: "Bomba d’água", temQuantidade: false }, // Apenas checkbox
  { nome: "Bomba de óleo", temQuantidade: false }, // Apenas checkbox
  { nome: "Bronzina de biela", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text", initialValue: "0,75" }] }, // Adicionado initialValue
  { nome: "Bronzina de mancal", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text", initialValue: "0,50" }] }, // Adicionado initialValue
  { nome: "Cabo de vela", temQuantidade: false }, // Apenas checkbox
  { nome: "Cebolinha de óleo", temQuantidade: false }, // Apenas checkbox
  {
    nome: "Comando de Válvula",
    temQuantidade: false, // Alterado para false, pois não há "Qtd/Medidas" ao lado do checkbox na imagem, apenas sub-itens
    subItens: [
      { label: "Admissão", type: "checkbox" }, // Alterado para checkbox
      { label: "Escape", type: "checkbox" } // Alterado para checkbox
    ]
  },
  {
    nome: "Correias",
    temQuantidade: false, // Alterado para false
    subItens: [
      { label: "Dent kit", type: "checkbox" }, // Alterado para checkbox
      { label: "Capa", type: "checkbox" }, // Alterado para checkbox
      { label: "Acessórios kit", type: "checkbox" }, // Alterado para checkbox
      { label: "Corrente kit", type: "checkbox" } // Alterado para checkbox
    ]
  },
  { nome: "Desengripante e Limpa contato", temQuantidade: false }, // Apenas checkbox
  { nome: "Embreagem", temQuantidade: false }, // Apenas checkbox
  { nome: "Engrenagens Radiador", temQuantidade: false }, // Apenas checkbox
  { nome: "Engrenagem virab.", temQuantidade: false }, // Apenas checkbox
  { nome: "Filtro de ar", temQuantidade: false }, // Apenas checkbox
  { nome: "Filtro de combustível", temQuantidade: false }, // Apenas checkbox
  { nome: "Filtro de óleo", temQuantidade: false }, // Apenas checkbox
  { nome: "Litros de aditivo", temQuantidade: false, subItens: [{ label: "Quantidade e Tipo", type: "text", initialValue: "4 litros" }] }, // Ajustado para refletir imagem
  { nome: "Litros de óleo", temQuantidade: false, subItens: [{ label: "Quantidade e Tipo", type: "text", initialValue: "4 Litros de óleo: 15w40" }] }, // Ajustado para refletir imagem
  {
    nome: "Mangueiras Radiador",
    temQuantidade: false,
    subItens: [
      { label: "Inferior", type: "checkbox" }, // Alterado para checkbox
      { label: "Superior", type: "checkbox" } // Alterado para checkbox
    ]
  },
  {
    nome: "Outros", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text" }]
  },
  { nome: "Parafusos cabeçote", temQuantidade: false }, // Apenas checkbox
  { nome: "Pistão", temQuantidade: false, subItens: [{ label: "Especificação/Medida", type: "text", initialValue: "0,50" }] }, // Adicionado initialValue
  { nome: "Retentor eixo comando", temQuantidade: false }, // Apenas checkbox
  { nome: "Retentor traseiro virab.", temQuantidade: false }, // Apenas checkbox
  { nome: "Retentor válvula", temQuantidade: false }, // Apenas checkbox
  { nome: "Sensor de temperatura", temQuantidade: false }, // Apenas checkbox
  { nome: "Silicone", temQuantidade: false }, // Apenas checkbox
  { nome: "Tuchos", temQuantidade: false }, // Apenas checkbox
  { nome: "Tubo d’água", temQuantidade: false }, // Apenas checkbox
  { nome: "Turbina / Válv.", temQuantidade: false }, // Apenas checkbox
  { nome: "Válvula termostática", temQuantidade: false }, // Apenas checkbox
  { nome: "Válvulas admissão", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "04" }] }, // Ajustado para refletir imagem
  { nome: "Válvulas escape", temQuantidade: false, subItens: [{ label: "Quantidade", type: "text", initialValue: "04" }] }, // Ajustado para refletir imagem
  { nome: "Velas", temQuantidade: false }, // Apenas checkbox
].sort((a, b) => a.nome.localeCompare(b.nome)); // Garante a ordem alfabética

const servicosMotorCompletoData = [
  {
    nome: "Biela",
    temQuantidade: false, // Não há Qtd/Medida para serviços na imagem, apenas sub-itens
    subItens: [
      { label: "Usinagem completa", type: "checkbox" }, // Alterado para checkbox
      { label: "Nova", type: "checkbox" } // Alterado para checkbox
    ]
  },
  { nome: "Banho (cárter, suportes, parafusos etc)", temQuantidade: false }, // Apenas checkbox, subItens vazios
  {
    nome: "Cabeçote",
    temQuantidade: false, // Não há Qtd/Medida para serviços na imagem, apenas sub-itens
    subItens: [
      { label: "Usinagem completa", type: "checkbox" }, // Alterado para checkbox
      { label: "Limpeza e Revisão", type: "checkbox" }, // Alterado para checkbox
      { label: "Solda", type: "checkbox" }, // Adicionado conforme a imagem
      { label: "Recuperação altura", type: "checkbox" } // Alterado para checkbox
    ]
  },
  {
    nome: "Bloco",
    temQuantidade: false, // Não há Qtd/Medida para serviços na imagem, apenas sub-itens
    subItens: [
      { label: "Usinagem completa", type: "checkbox" }, // Alterado para checkbox
      { label: "Novo", type: "checkbox" } // Adicionado conforme a imagem
    ]
  },
  { nome: "Montagem de Motor Técnica", temQuantidade: false }, // Apenas checkbox
  {
    nome: "Virabrequim",
    temQuantidade: false, // Não há Qtd/Medida para serviços na imagem, apenas sub-itens
    subItens: [
      { label: "Usinagem completa", type: "checkbox" }, // Alterado para checkbox
      { label: "Novo", type: "checkbox" } // Alterado para checkbox
    ]
  },
  { nome: "Volante Usinagem completa", temQuantidade: false }, // Apenas checkbox
].sort((a, b) => a.nome.localeCompare(b.nome)); // Garante a ordem alfabética

const OrcamentoMotorCompleto = ({ onSubmit, editingData }) => {
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
      subItens: item.subItens ? item.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [], // Usa initialValue se existir
    })),
    servicos: servicosMotorCompletoData.map(servico => ({
      ...servico,
      selecionado: false,
      quantidade: servico.temQuantidade ? 1 : 0, // Adicionado quantidade para serviços, se tiver temQuantidade
      medida: 0,
      total: 0,
      subItens: servico.subItens ? servico.subItens.map(sub => ({ ...sub, value: sub.initialValue || (sub.type === "checkbox" ? false : '') })) : [],
    })),
    totalPecasManual: 0,
    totalServicosManual: 0,
    totalMaoDeObraManual: 0, // Renomeado para seguir a imagem
    totalGeralManual: 0,
    formaPagamento: '',
    garantia: '',
  });

  // Efeito para carregar dados de edição
  useEffect(() => {
    if (editingData) {
      setFormData(prev => ({
        ...prev,
        nome: editingData.cliente || '', // Mapear 'cliente' para 'nome'
        telefone: editingData.telefone || '',
        veiculo: editingData.veiculo || '',
        placa: editingData.placa || '',
        data: editingData.data ? new Date(editingData.data).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10), // Ajuste de formato
        ordemServico: editingData.ordemServico || '', // Mapear 'OS' para 'ordemServico'
        totalPecasManual: parseFloat(editingData.valorTotalPecas) || 0,
        totalServicosManual: parseFloat(editingData.valorTotalServicos) || 0,
        totalMaoDeObraManual: parseFloat(editingData.totalMaoDeObra) || 0, // Ajuste para nome do campo
        totalGeralManual: parseFloat(editingData.valorTotal) || 0,
        formaPagamento: editingData.formaPagamento || '',
        garantia: editingData.garantia || '',
        // Reconstruir o estado de pecas e servicos com base nos dados de edição
        pecas: itensMotorCompletoData.map(item => {
          const editedItem = editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome));
          let selecionado = !!editedItem; // True se o item principal foi encontrado

          let subItensAtualizados = item.subItens ? item.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedItem) {
                // Tenta encontrar o valor do subItem na string editedItem
                const regex = new RegExp(`${sub.label}:\\s*([^;]+)`);
                const match = editedItem.match(regex);
                if (match && match[1]) {
                    if (sub.type === "checkbox") {
                        subValue = true; // Se encontrar o texto, marca como true
                    } else {
                        subValue = match[1].trim();
                    }
                } else if (sub.type === "checkbox" && editedItem.includes(sub.label)) {
                    subValue = true; // Se for checkbox e o label estiver na string
                }
            }
            return { ...sub, value: subValue };
          }) : [];

          // Para itens sem subItens mas que foram marcados com 'X' ou alguma especificação
          if (!item.subItens && selecionado) {
              // Se o item principal foi selecionado e não tem subItens definidos,
              // mas a string do editedItem contém algo além do nome, tente capturar
              const textOnlyRegex = new RegExp(`^${item.nome}\\s*:\\s*(.+)$`);
              const textOnlyMatch = editedItem.match(textOnlyRegex);
              if (textOnlyMatch && textOnlyMatch[1]) {
                  // Se o item tem um valor de texto extra (ex: "Anel: 0,50"), armazene em um subItem
                  subItensAtualizados = [{ label: "Especificação/Medida", type: "text", value: textOnlyMatch[1].trim() }];
              }
          }


          return {
            ...item,
            selecionado,
            quantidade: item.temQuantidade ? (editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome + ' Qtd:'))?.match(/Qtd:\s*(\d+)/)?.[1] || 1) : 0,
            medida: item.temQuantidade ? (parseFloat(editingData.pecasSelecionadas?.find(p => p.startsWith(item.nome + ' Medida:'))?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0,
            subItens: subItensAtualizados,
          };
        }),
        servicos: servicosMotorCompletoData.map(servico => {
          const editedServico = editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome));
          let selecionado = !!editedServico;

          let subItensAtualizados = servico.subItens ? servico.subItens.map(sub => {
            let subValue = sub.initialValue || (sub.type === "checkbox" ? false : '');
            if (selecionado && editedServico) {
                const regex = new RegExp(`${sub.label}\\s*[:]?\\s*([^;]+)?`);
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
            quantidade: servico.temQuantidade ? (editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome + ' Qtd:'))?.match(/Qtd:\s*(\d+)/)?.[1] || 1) : 0,
            medida: servico.temQuantidade ? (parseFloat(editingData.servicosSelecionados?.find(s => s.startsWith(servico.nome + ' Medida:'))?.match(/Medida:\s*([\d,.]+)/)?.[1]?.replace(',', '.')) || 0) : 0,
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

    // Corrected variable name: servicosSelecionadosFormatadas
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
      // Use the correctly spelled variable here
      servicosSelecionados: servicosSelecionadosFormatadas, // <--- Corrected line
      valorTotalPecas: formData.totalPecasManual,
      valorTotalServicos: formData.totalServicosManual,
      totalMaoDeObra: formData.totalMaoDeObraManual,
      valorTotal: formData.totalGeralManual,
      formaPagamento: formData.formaPagamento,
      garantia: formData.garantia,
    };

    onSubmit(orcamentoFinal);
  };

  return (
    <div className="orcamento-form-container">
      <div className="form-header">
        <h1>ORÇAMENTO - COMPLETO/PARCIAL</h1> {/* Título atualizado conforme a imagem */}
        <img src={backgroundImage} alt="Logo" className="logo-orcamento" />
      </div>

      <form onSubmit={handleSubmit}>
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <div className="form-group">
                    <label htmlFor="ordemServico">OS:</label> {/* Campo OS */}
                    <input type="text" id="ordemServico" name="ordemServico" value={formData.ordemServico} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label htmlFor="nome">Cliente:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} />
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
                        checked={peca.selecionado}
                        onChange={() => handlePecaChange(index, 'selecionado', !peca.selecionado)}
                      />
                      <span className="checkbox-box"></span>
                      {peca.nome}
                    </label>
                  </td>
                  <td className="inputs-cell">
                    {peca.selecionado && peca.temQuantidade && ( // Renderiza Qtd/Medida APENAS se temQuantidade for true
                      <div className="item-inputs">
                        <div>
                          <label htmlFor={`peca-${index}-quantidade`} className="input-label">Qtd:</label>
                          <input
                            type="number"
                            id={`peca-${index}-quantidade`}
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
                    {peca.selecionado && peca.subItens && ( // Renderiza subItens APENAS se houver
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
                                      `Insira o texto`
                                }
                                value={sub.value}
                                onChange={(e) => handleSubItemTextChange('pecas', index, sIdx, e.target.value)}
                                step={sub.type === "measure" ? "0.01" : "1"}
                                className="small-input"
                              />
                            )}
                            {/* O botão "X" só aparece se não for um item com input de texto único pré-definido */}
                            {!itemsWithSingleTextInput.includes(peca.nome) && (
                              <button type="button" className="remove-sub-item-btn" onClick={() => handleRemoveSubItem('pecas', index, sIdx)}>X</button>
                            )}
                          </div>
                        ))}
                        {/* O botão "+ Detalhe" só aparece se o item não estiver na lista de itens com input de texto único */}
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
          <h2>Serviços</h2> {/* Título alterado para "Serviços" conforme a imagem */}
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
                    {servico.selecionado && servico.temQuantidade && ( // Renderiza Qtd/medida Unit se temQuantidade for true
                      <div className="item-inputs">
                        <div>
                          <label htmlFor={`servico-${index}-quantidade`} className="input-label">Qtd:</label>
                          <input
                            type="number"
                            id={`servico-${index}-quantidade`}
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
                    {servico.selecionado && servico.subItens && ( // Renderiza subItens se houver
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
                        {/* Para serviços, o botão "+ Detalhe" sempre aparece se houver subItens e não for um item com input único */}
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