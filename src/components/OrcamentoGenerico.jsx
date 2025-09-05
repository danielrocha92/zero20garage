import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./OrcamentoForms.css";

const OrcamentoGenerico = ({
  onSubmit,
  editingData,
  showMessage,
  hideMessageBox,
  message,
  isErrorMessage,
  orcamentoData,
  titulo,
}) => {
  // useMemo para evitar warning de deps no useEffect
  const itensData = useMemo(() => orcamentoData.itens || [], [orcamentoData.itens]);
  const servicosData = useMemo(() => orcamentoData.servicos || [], [orcamentoData.servicos]);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
    data: new Date().toISOString().slice(0, 10),
    ordemServico: "",
    pecas: itensData.map(item => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: item.subItens
        ? item.subItens.map(sub => ({
            ...sub,
            value: sub.initialValue || (sub.type === "checkbox" ? false : ""),
          }))
        : [],
    })),
    servicos: servicosData.map(servico => ({
      ...servico,
      selecionado: false,
      quantidade: servico.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: servico.subItens
        ? servico.subItens.map(sub => ({
            ...sub,
            value: sub.initialValue || (sub.type === "checkbox" ? false : ""),
          }))
        : [],
    })),
    totalPecasManual: "",
    totalServicosManual: "",
    totalMaoDeObraManual: "",
    totalGeralManual: "",
    formaPagamento: "",
    observacoes: "",
    status: "Aberto",
  });

  // ======== Máscara monetária com cursor estável ========
  const formatCurrencySmart = useCallback((value, selectionStart) => {
    if (!value) return { formatted: "", newCursor: 0 };

    const onlyNumbers = value.replace(/\D/g, "");
    const number = (parseFloat(onlyNumbers) / 100).toFixed(2);

    const formatted = Number(number).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    // mantém posição do cursor
    const diff = formatted.length - value.length;
    const newCursor = (selectionStart || formatted.length) + diff;

    return { formatted, newCursor: Math.max(0, newCursor) };
  }, []);

  const parseCurrencyToNumber = value => {
    if (!value) return 0;
    return Number(value.replace(/\D/g, "")) / 100;
  };

  // Preenche formData ao editar
  useEffect(() => {
    if (!editingData) return;

    const parsedDate = new Date(editingData.data);
    const validDate = !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    setFormData(prev => ({
      ...prev,
      nome: editingData.cliente || "",
      telefone: editingData.telefone || "",
      veiculo: editingData.veiculo || "",
      placa: editingData.placa || "",
      data: validDate,
      ordemServico: editingData.ordemServico || "",
      totalPecasManual: editingData.valorTotalPecas
        ? formatCurrencySmart(editingData.valorTotalPecas, 0).formatted
        : "",
      totalServicosManual: editingData.valorTotalServicos
        ? formatCurrencySmart(editingData.valorTotalServicos, 0).formatted
        : "",
      totalMaoDeObraManual: editingData.totalMaoDeObra
        ? formatCurrencySmart(editingData.totalMaoDeObra, 0).formatted
        : "",
      totalGeralManual: editingData.valorTotal
        ? formatCurrencySmart(editingData.valorTotal, 0).formatted
        : "",
      formaPagamento: editingData.formaPagamento || "",
      observacoes: editingData.observacoes || "",
      status: editingData.status || "Aberto",
      pecas: itensData.map(pecaData => {
        const pecaEdit = editingData.pecasSelecionadas?.find(p =>
          p.includes(pecaData.nome)
        );
        const quantidadeMatch = pecaEdit ? pecaEdit.match(/::\s*(\d+)/) : null;
        const quantidade = quantidadeMatch
          ? parseInt(quantidadeMatch[1], 10)
          : pecaData.temQuantidade
          ? 1
          : 0;

        return {
          ...pecaData,
          selecionado: !!pecaEdit,
          quantidade,
          subItens: pecaData.subItens
            ? pecaData.subItens.map(sub => ({
                ...sub,
                value:
                  !!pecaEdit && pecaEdit.includes(sub.label)
                    ? true
                    : sub.initialValue,
              }))
            : [],
        };
      }),
      servicos: servicosData.map(servicoData => {
        const servicoEdit = editingData.servicosSelecionados?.find(s =>
          s.includes(servicoData.nome)
        );
        const quantidadeMatch = servicoEdit
          ? servicoEdit.match(/::\s*(\d+)/)
          : null;
        const quantidade = quantidadeMatch
          ? parseInt(quantidadeMatch[1], 10)
          : servicoData.temQuantidade
          ? 1
          : 0;

        return {
          ...servicoData,
          selecionado: !!servicoEdit,
          quantidade,
          subItens: servicoData.subItens
            ? servicoData.subItens.map(sub => ({
                ...sub,
                value:
                  !!servicoEdit && servicoEdit.includes(sub.label)
                    ? true
                    : sub.initialValue,
              }))
            : [],
        };
      }),
    }));
  }, [editingData, itensData, servicosData, formatCurrencySmart]);

  // ======== Handlers ========
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMonetaryChange = e => {
    const { name, value, selectionStart } = e.target;
    const { formatted, newCursor } = formatCurrencySmart(value, selectionStart);

    setFormData(prev => ({ ...prev, [name]: formatted }));

    requestAnimationFrame(() => {
      e.target.setSelectionRange(newCursor, newCursor);
    });
  };

  const handleToggleSelecionado = (tipo, index) => {
    setFormData(prev => {
      const list = [...prev[tipo]];
      list[index].selecionado = !list[index].selecionado;
      return { ...prev, [tipo]: list };
    });
  };

  const handleQuantidadeChange = (tipo, index, quantidade) => {
    setFormData(prev => {
      const list = [...prev[tipo]];
      list[index].quantidade = quantidade;
      return { ...prev, [tipo]: list };
    });
  };

  const handleSubItemChange = (tipo, index, subIndex, value) => {
    setFormData(prev => {
      const list = [...prev[tipo]];
      list[index].subItens[subIndex].value = value;
      return { ...prev, [tipo]: list };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.nome) {
      showMessage("Cliente é obrigatório!", true);
      return;
    }

    const formatarItens = (lista, tipo) =>
      lista
        .filter(i => i.selecionado)
        .map(item => {
          let nomeCompleto = item.nome;
          if (item.temQuantidade && item.quantidade > 0)
            nomeCompleto += `:: ${item.quantidade}`;
          if (item.temQuantidade && item.medida > 0)
            nomeCompleto += ` Medida: ${item.medida}`;
          const subItensFormatados = item.subItens
            .filter(
              sub =>
                (sub.type === "checkbox" && sub.value) ||
                (sub.type === "text" && sub.value)
            )
            .map(sub =>
              sub.type === "checkbox"
                ? sub.label
                : `${sub.label}: ${sub.value}`
            )
            .join("; ");
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
      pecasSelecionadas: formatarItens(formData.pecas, "pecas"),
      servicosSelecionados: formatarItens(formData.servicos, "servicos"),
      valorTotalPecas: parseCurrencyToNumber(formData.totalPecasManual),
      valorTotalServicos: parseCurrencyToNumber(formData.totalServicosManual),
      totalMaoDeObra: parseCurrencyToNumber(formData.totalMaoDeObraManual),
      valorTotal: parseCurrencyToNumber(formData.totalGeralManual),
      formaPagamento: formData.formaPagamento,
      observacoes: formData.observacoes,
      status: formData.status,
    });
  };

  const gerarOpcoesQuantidade = () =>
    Array.from({ length: 100 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1}
      </option>
    ));

  // ======== Render ========
  return (
    <div className="client-vehicle-section">
      <h1>{titulo}</h1>

      <form onSubmit={handleSubmit}>
        {/* Cliente */}
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <div className="form-group">
                    <label>OS:</label>
                    <input
                      type="text"
                      name="ordemServico"
                      value={formData.ordemServico}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Cliente:</label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Data:</label>
                    <input
                      type="date"
                      name="data"
                      value={formData.data}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-group">
                    <label>Veículo:</label>
                    <input
                      type="text"
                      name="veiculo"
                      value={formData.veiculo}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Placa:</label>
                    <input
                      type="text"
                      name="placa"
                      value={formData.placa}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Telefone:</label>
                    <input
                      type="text"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleInputChange}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Peças + Serviços lado a lado */}
        <div className="grid-50-50">
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
                          onChange={() => handleToggleSelecionado("pecas", index)}
                        />
                        <span className="checkbox-box"></span>
                        {peca.nome}
                      </label>
                    </td>
                    <td className="subitems-cell">
                      {peca.selecionado && peca.subItens?.length > 0 && (
                        <div>
                          {peca.subItens.map((sub, sIdx) => (
                            <div key={sIdx} className="sub-item-input-group">
                              {sub.type === "checkbox" ? (
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={sub.value}
                                    onChange={e =>
                                      handleSubItemChange(
                                        "pecas",
                                        index,
                                        sIdx,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span className="checkbox-box"></span>
                                  {sub.label}
                                </label>
                              ) : (
                                <>
                                  <label className="sub-item-label">
                                    {sub.label}:
                                  </label>
                                  <input
                                    type="text"
                                    value={sub.value}
                                    onChange={e =>
                                      handleSubItemChange(
                                        "pecas",
                                        index,
                                        sIdx,
                                        e.target.value
                                      )
                                    }
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
                      {peca.selecionado && peca.temQuantidade && (
                        <>
                          <label className="quantidade-label">Qtd:</label>
                          <select
                            value={peca.quantidade}
                            onChange={e =>
                              handleQuantidadeChange(
                                "pecas",
                                index,
                                parseInt(e.target.value)
                              )
                            }
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
              <span className="label">Valor total de Peças:</span>
              <input
                type="text"
                name="totalPecasManual"
                value={formData.totalPecasManual}
                onChange={handleMonetaryChange}
                placeholder="R$ 0,00"
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
                          onChange={() =>
                            handleToggleSelecionado("servicos", index)
                          }
                        />
                        <span className="checkbox-box"></span>
                        {servico.nome}
                      </label>
                    </td>
                    <td className="subitems-cell">
                      {servico.selecionado && servico.subItens?.length > 0 && (
                        <div>
                          {servico.subItens.map((sub, sIdx) => (
                            <div key={sIdx} className="sub-item-input-group">
                              {sub.type === "checkbox" ? (
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={sub.value}
                                    onChange={e =>
                                      handleSubItemChange(
                                        "servicos",
                                        index,
                                        sIdx,
                                        e.target.checked
                                      )
                                    }
                                  />
                                  <span className="checkbox-box"></span>
                                  {sub.label}
                                </label>
                              ) : (
                                <>
                                  <label className="sub-item-label">
                                    {sub.label}:
                                  </label>
                                  <input
                                    type="text"
                                    value={sub.value}
                                    onChange={e =>
                                      handleSubItemChange(
                                        "servicos",
                                        index,
                                        sIdx,
                                        e.target.value
                                      )
                                    }
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
                            value={servico.quantidade}
                            onChange={e =>
                              handleQuantidadeChange(
                                "servicos",
                                index,
                                parseInt(e.target.value)
                              )
                            }
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
                type="text"
                name="totalServicosManual"
                value={formData.totalServicosManual}
                onChange={handleMonetaryChange}
                placeholder="R$ 0,00"
                className="input-total"
              />
            </div>
          </section>
        </div>

        {/* Totais */}
        <section className="summary-section">
          <div className="total-line-form">
            <span className="label">Valor total de Mão de Obra Mecânica:</span>
            <input
              type="text"
              name="totalMaoDeObraManual"
              value={formData.totalMaoDeObraManual}
              onChange={handleMonetaryChange}
              placeholder="R$ 0,00"
              className="input-total"
            />
          </div>

          <div className="total-line-form total-geral">
            <span className="label">TOTAL GERAL:</span>
            <input
              type="text"
              name="totalGeralManual"
              value={formData.totalGeralManual}
              onChange={handleMonetaryChange}
              placeholder="R$ 0,00"
              className="input-total-geral"
            />
          </div>
        </section>

        {/* Observações */}
        <section className="section-form">
          <h2>Observações</h2>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleInputChange}
            rows="3"
            className="observacoes-textarea"
          />
        </section>

        {/* Pagamento + Status */}
        <section className="section-form">
          <div className="form-group">
            <label>Forma de Pagamento:</label>
            <input
              type="text"
              name="formaPagamento"
              value={formData.formaPagamento}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Aberto">Aberto</option>
              <option value="Aprovado">Aprovado</option>
              <option value="Concluído">Concluído</option>
            </select>
          </div>
        </section>

        {/* Botões */}
        <div className="form-actions">
          <button type="submit" className="button">
            Salvar
          </button>
          <button type="button" className="button" onClick={hideMessageBox}>
            Cancelar
          </button>
        </div>
      </form>

      {message && (
        <div className={`message-box ${isErrorMessage ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default OrcamentoGenerico;
