import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../styles/OrcamentoGenerico.css";

const OrcamentoGenerico = ({
  onSubmit,
  editingData,
  orcamentoData,
  titulo,
}) => {
  // Regex para validação de entrada
  const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // (XX) XXXX-XXXX, XXXXXXXXXXX, (XX) 9XXXX-XXXX
  const regexPlaca = /^[A-Z]{3}[0-9]{4}$|^[A-Z]{3}[0-9][A-Z][0-9]{2}$/i; // AAA1234 ou AAA0A00 (Mercosul)

  // --- NOVO: Estado local para mensagens ---
  const [localMessage, setLocalMessage] = useState({ text: '', isError: false });

  const showLocalMessage = (text, isError = false, duration = 4000) => {
    setLocalMessage({ text, isError });
    setTimeout(() => setLocalMessage({ text: '', isError: false }), duration);
  };

  // Evita acessar propriedades quando orcamentoData for undefined
  const itensData = useMemo(
    () => (orcamentoData && Array.isArray(orcamentoData.itens) ? orcamentoData.itens : []),
    [orcamentoData]
  );
  const servicosData = useMemo(
    () => (orcamentoData && Array.isArray(orcamentoData.servicos) ? orcamentoData.servicos : []),
    [orcamentoData]
  );

  const [formData, setFormData] = useState(() => ({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
    data: new Date().toISOString().slice(0, 10),
    ordemServico: "",
    pecas: (orcamentoData?.itens || []).map((item) => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      itens: [],
      subItens: item.subItens
        ? item.subItens.map((sub) => ({
            ...sub,
            value: sub.initialValue || (sub.type === "checkbox" ? false : ""),
          }))
        : [],
    })),
    servicos: (orcamentoData?.servicos || []).map((servico) => ({
      ...servico,
      selecionado: false,
      quantidade: servico.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: servico.subItens
        ? servico.subItens.map((sub) => ({
            ...sub,
            value: sub.initialValue || (sub.type === "checkbox" ? false : ""),
          }))
        : [],
    })),
    totalPecasManual: "",
    totalServicosManual: "",
    totalMaoDeObraManual: "",
    totalGeralManual: "", // Será calculado, mas mantemos o state para consistência com o restante
    formaPagamento: "",
    observacoes: "",
    status: "Aberto",
  }));

  const formatCurrencySmart = useCallback((value, selectionStart) => {
    if (!value) return { formatted: "", newCursor: 0 };
    const onlyNumbers = value.replace(/\D/g, "");
    // Trata o número como centavos
    const number = (parseFloat(onlyNumbers) / 100);

    // Formata o número como BRL
    const formatted = number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    // Calcula a posição do cursor (mantém a lógica, mas a formatação do toLocaleString é mais complexa)
    // Para simplificar e corrigir o bug, vamos retornar o cursor no final, já que a formatação é automática.
    const newCursor = formatted.length;

    return { formatted, newCursor: Math.max(0, newCursor) };
  }, []);

  // Função para formatar um número puro vindo do banco (edição)
  const formatNumberToCurrency = useCallback((value) => {
    if (typeof value !== 'number' || isNaN(value)) return "";
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  }, []);


  const parseCurrencyToNumber = (value) => {
    if (!value) return 0;
    // Remove tudo que não for dígito ou vírgula, substitui a vírgula por ponto.
    // Primeiro remove o R$ e pontos de milhar, depois troca vírgula por ponto.
    const cleanedValue = value
      .replace(/[R$\s.]/g, "")
      .replace(",", ".");

    const number = parseFloat(cleanedValue);
    return isNaN(number) ? 0 : number;
  };

  // Cálculo automático dos totais (inclui o totalGeral)
  const totaisCalculados = useMemo(() => {
    const totalPecas = parseCurrencyToNumber(formData.totalPecasManual);
    const totalServicos = parseCurrencyToNumber(formData.totalServicosManual);
    const totalMaoDeObra = parseCurrencyToNumber(formData.totalMaoDeObraManual);
    const valorTotal = totalPecas + totalServicos + totalMaoDeObra;

    return {
      valorTotal: formatNumberToCurrency(valorTotal),
    };
  }, [formData.totalPecasManual, formData.totalServicosManual, formData.totalMaoDeObraManual, formatNumberToCurrency]);


  useEffect(() => {
    if (!editingData) return;

    const parsedDate = new Date(editingData.data);
    const validDate = !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

    setFormData((prev) => ({
      ...prev,
      nome: editingData.cliente || "",
      telefone: editingData.telefone || "",
      veiculo: editingData.veiculo || "",
      placa: editingData.placa || "",
      data: validDate,
      ordemServico: editingData.ordemServico || "",
      // CORREÇÃO DO BUG MONETÁRIO: usar formatNumberToCurrency ao invés de formatCurrencySmart
      totalPecasManual: formatNumberToCurrency(editingData.valorTotalPecas),
      totalServicosManual: formatNumberToCurrency(editingData.valorTotalServicos),
      totalMaoDeObraManual: formatNumberToCurrency(editingData.totalMaoDeObra),
      // O total geral não será carregado do editingData. Ele será recalculado.
      formaPagamento: editingData.formaPagamento || "",
      observacoes: editingData.observacoes
        ? editingData.observacoes.replace(/(::.*)?(\(.*\))?/g, "").trim()
        : "",
      status: editingData.status || "Aberto",
      pecas: itensData.map((pecaData) => {
        const pecaEdit = editingData.pecasSelecionadas?.find((p) => {
          // Solução: Verifique se a string começa com o nome da peça.
          // Isso é mais robusto que `includes`
          const pecaNomePadrao = new RegExp(`^${pecaData.nome}(::.*|\\s*$)`);
          return pecaNomePadrao.test(p);
        });

        const selecionado = !!pecaEdit;
        let quantidade = pecaData.temQuantidade ? 1 : 0;
        if (selecionado) {
          const quantidadeMatch = pecaEdit.match(/::\s*(\d+)/);
          quantidade = quantidadeMatch
            ? parseInt(quantidadeMatch[1], 10)
            : pecaData.temQuantidade
            ? 1
            : 0;
        }

        const newSubItens = pecaData.subItens
          ? pecaData.subItens.map((sub) => {
              let value = sub.initialValue || (sub.type === "checkbox" ? false : "");
              if (selecionado) {
                if (sub.type === "checkbox" && pecaEdit.includes(sub.label)) {
                  value = true;
                } else if (sub.type === "text") {
                  const subItemMatch = pecaEdit.match(new RegExp(`${sub.label}:\\s*(.*?)(;|$)`));
                  if (subItemMatch && subItemMatch[1]) {
                    value = subItemMatch[1].trim();
                  }
                }
              }
              return { ...sub, value };
            })
          : [];

        return {
          ...pecaData,
          selecionado,
          quantidade,
          subItens: newSubItens,
        };
      }),
      servicos: servicosData.map((servicoData) => {
        const servicoEdit = editingData.servicosSelecionados?.find((s) => {
          const servicoNomePadrao = new RegExp(`^${servicoData.nome}(::.*|\\s*$)`);
          return servicoNomePadrao.test(s);
        });

        const selecionado = !!servicoEdit;
        let quantidade = servicoData.temQuantidade ? 1 : 0;
        if (selecionado) {
          const quantidadeMatch = servicoEdit.match(/::\s*(\d+)/);
          quantidade = quantidadeMatch
            ? parseInt(quantidadeMatch[1], 10)
            : servicoData.temQuantidade
            ? 1
            : 0;
        }

        const newSubItens = servicoData.subItens
          ? servicoData.subItens.map((sub) => {
              let value = sub.initialValue || (sub.type === "checkbox" ? false : "");
              if (selecionado) {
                if (sub.type === "checkbox" && servicoEdit.includes(sub.label)) {
                  value = true;
                } else if (sub.type === "text") {
                  const subItemMatch = servicoEdit.match(new RegExp(`${sub.label}:\\s*(.*?)(;|$)`));
                  if (subItemMatch && subItemMatch[1]) {
                    value = subItemMatch[1].trim();
                  }
                }
              }
              return { ...sub, value };
            })
          : [];

        return {
          ...servicoData,
          selecionado,
          quantidade,
          subItens: newSubItens,
        };
      }),
    }));
  }, [editingData, itensData, servicosData, formatNumberToCurrency]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMonetaryChange = (e) => {
    const { name, value, selectionStart } = e.target;
    // O valor deve ser limpo para usar o formatCurrencySmart corretamente,
    // tratando a entrada como se fosse em centavos.
    const onlyNumbers = value.replace(/\D/g, "");
    const { formatted, newCursor } = formatCurrencySmart(onlyNumbers, selectionStart);

    setFormData((prev) => ({ ...prev, [name]: formatted }));

    // Atualiza a posição do cursor (comportamento de input monetário)
    requestAnimationFrame(() => {
      try {
        e.target.setSelectionRange(newCursor, newCursor);
      } catch (err) {
        // em alguns browsers/inputs a seleção pode falhar; ignoramos com segurança
      }
    });
  };

  const handleToggleSelecionado = (tipo, index) => {
    setFormData((prev) => {
      const list = (prev[tipo] || []).map((item, idx) =>
        idx === index ? { ...item, selecionado: !item.selecionado } : item
      );
      return { ...prev, [tipo]: list };
    });
  };

  const handleQuantidadeChange = (tipo, index, quantidade) => {
    setFormData((prev) => {
      const list = (prev[tipo] || []).map((item, idx) =>
        idx === index ? { ...item, quantidade } : item
      );
      return { ...prev, [tipo]: list };
    });
  };

  const handleSubItemChange = (tipo, index, subIndex, value) => {
    setFormData((prev) => {
      const list = (prev[tipo] || []).map((item, idx) => {
        if (idx === index) {
          const newSubItens = (item.subItens || []).map((sub, sIdx) =>
            sIdx === subIndex ? { ...sub, value } : sub
          );
          return { ...item, subItens: newSubItens };
        }
        return item;
      });
      return { ...prev, [tipo]: list };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Validação do Cliente
    if (!formData.nome) {
      showLocalMessage("O campo Cliente é obrigatório!", true);
      return;
    }

    // 2. Validação do Telefone
    // Limpa o telefone para verificar só os dígitos ou caracteres esperados
    const telefoneLimpo = formData.telefone.replace(/[\s()-]/g, "");
    if (formData.telefone && !regexTelefone.test(formData.telefone) && !/^\d{10,11}$/.test(telefoneLimpo)) {
        showLocalMessage("Telefone inválido! Formatos aceitos: (XX) XXXXX-XXXX ou XXXXXXXXXXX (somente dígitos)", true);
        return;
    }

    // 3. Validação da Placa
    if (formData.placa && !regexPlaca.test(formData.placa.toUpperCase())) {
        showLocalMessage("Placa inválida! Formatos aceitos: AAA0A00 (Mercosul) ou AAA1234", true);
        return;
    }


const formatarItens = (lista) =>
  (lista || [])
    .filter((i) => i.selecionado)
    .map((item) => {
      // Remove duplicidades do nome
      let nomeLimpo = item.nome.replace(/(::.*)?(\(.*\))?$/, "").trim();

      let nomeCompleto = nomeLimpo;
      if (item.temQuantidade && item.quantidade > 0)
        nomeCompleto += `:: ${item.quantidade}`;
      if (item.temQuantidade && item.medida > 0)
        nomeCompleto += ` Medida: ${item.medida}`;
      const subItensFormatados = (item.subItens || [])
        .filter(
          (sub) =>
            (sub.type === "checkbox" && sub.value) ||
            (sub.type === "text" && sub.value)
        )
        .map((sub) =>
          sub.type === "checkbox"
            ? sub.label
            : `${sub.label}: ${sub.value}`
        )
        .join("; ");
      if (subItensFormatados) nomeCompleto += ` (${subItensFormatados})`;
      return nomeCompleto;
    });

    // O valor total geral será o calculado, não o valor manual
    const valorTotalCalculado = parseCurrencyToNumber(totaisCalculados.valorTotal);


    onSubmit &&
      onSubmit({
        cliente: formData.nome,
        telefone: formData.telefone,
        veiculo: formData.veiculo,
        placa: formData.placa,
        data: formData.data,
        ordemServico: formData.ordemServico,
        pecasSelecionadas: formatarItens(formData.pecas),
        servicosSelecionados: formatarItens(formData.servicos),
        valorTotalPecas: parseCurrencyToNumber(formData.totalPecasManual),
        valorTotalServicos: parseCurrencyToNumber(formData.totalServicosManual),
        totalMaoDeObra: parseCurrencyToNumber(formData.totalMaoDeObraManual),
        valorTotal: valorTotalCalculado, // Usa o valor calculado
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

  return (
    <div className="orcamento-container">
      <h1>{titulo}</h1>
      <form onSubmit={handleSubmit}>
<section className="client-vehicle-section">
  <h2>Informações do Cliente e Veículo</h2>
  <div className="form-table">
    <div className="form-group">
      <label>OS:</label>
      <input
        type="text"
        name="ordemServico"
        value={formData.ordemServico}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-group">
      <label>Cliente:</label>
      <input
        type="text"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
        required
        className={!formData.nome ? 'input-error' : ''}
      />
    </div>

    <div className="form-group">
      <label>Data:</label>
      <input
        type="date"
        name="data"
        value={formData.data}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-group">
      <label>Veículo:</label>
      <input
        type="text"
        name="veiculo"
        value={formData.veiculo}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-group">
      <label>Placa:</label>
      <input
        type="text"
        name="placa"
        value={formData.placa}
        onChange={handleInputChange}
        maxLength={7}
        className={
          formData.placa && !regexPlaca.test(formData.placa.toUpperCase())
            ? 'input-error'
            : ''
        }
      />
    </div>

    <div className="form-group">
      <label>Telefone:</label>
      <input
        type="text"
        name="telefone"
        value={formData.telefone}
        onChange={handleInputChange}
        className={
          formData.telefone &&
          !regexTelefone.test(formData.telefone.replace(/[\s()-]/g, '')) &&
          !/^\d{10,11}$/.test(formData.telefone.replace(/[\s()-]/g, ''))
            ? 'input-error'
            : ''
        }
      />
    </div>
  </div>
</section>


        {/* Peças e Serviços */}
        <div className="grid-50-50">
          {/* Peças */}
          <section className="section-form" style={{ flex: 1 }}>
            <h2>Peças</h2>
            <table className="items-table">
              <tbody>
                {formData.pecas.map((peca, index) => (
                  <tr key={index}>
                    <td className="checkbox-cell">
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={!!peca.selecionado}
                          onChange={() => handleToggleSelecionado("pecas", index)}
                        />
                        <span className="checkbox-box" id="escuro"></span>
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
                                    checked={!!sub.value}
                                    onChange={(e) =>
                                      handleSubItemChange("pecas", index, sIdx, e.target.checked)
                                    }
                                  />
                                  <span className="checkbox-box"></span>
                                  {sub.label}
                                </label>
                              ) : (
                                <>
                                  <label className="quantidade-label">Obs:</label>
                                  <input
                                    type="text"
                                    value={sub.value || ""}
                                    onChange={(e) =>
                                      handleSubItemChange("pecas", index, sIdx, e.target.value)
                                    }
                                    className="small-input"
                                    placeholder={sub.label}
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
                            onChange={(e) =>
                              handleQuantidadeChange("pecas", index, parseInt(e.target.value, 10))
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
          <section className="section-form" style={{ flex: 1 }}>
            <h2>Serviços</h2>
            <table className="items-table">
              <tbody>
                {formData.servicos.map((servico, index) => (
                  <tr key={index}>
                    <td className="checkbox-cell">
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          checked={!!servico.selecionado}
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
                                    checked={!!sub.value}
                                    onChange={(e) =>
                                      handleSubItemChange("servicos", index, sIdx, e.target.checked)
                                    }
                                  />
                                  <span className="checkbox-box"></span>
                                  {sub.label}
                                </label>
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    value={sub.value || ""}
                                    onChange={(e) =>
                                      handleSubItemChange("servicos", index, sIdx, e.target.value)
                                    }
                                    className="small-input"
                                    placeholder={sub.label}
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
                            onChange={(e) =>
                              handleQuantidadeChange("servicos", index, parseInt(e.target.value, 10))
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

        {/* Totais gerais */}
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
            <span className="label">Valor total do Orçamento:</span>
            {/* Campo agora é somente leitura e mostra o valor calculado */}
            <input
              type="text"
              name="totalGeralCalculado"
              value={totaisCalculados.valorTotal}
              readOnly
              className="input-total calculated"
            />
          </div>
        </section>

        {/* Observações e Forma de Pagamento */}
        <section className="payment-observacoes-section">
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
            <label>Observações:</label>
            <textarea
              name="observacoes"
              className="observacoes-input"
              value={formData.observacoes}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            Salvar Orçamento
          </button>
        </div>

        {localMessage.text && (
          <div className={`message-box ${localMessage.isError ? "error" : "success"}`}>
            <span>{localMessage.text}</span>
            <button onClick={() => setLocalMessage({ text: '', isError: false })}>
              &times;
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OrcamentoGenerico;