// src/components/OrcamentoGenerico.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import UploadImagemOrcamento from "./UploadImagemOrcamento";
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
  // Memoização dos itens e serviços
  const itensData = useMemo(() => orcamentoData.itens || [], [orcamentoData.itens]);
  const servicosData = useMemo(() => orcamentoData.servicos || [], [orcamentoData.servicos]);

  // Estado principal do formulário
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
    data: new Date().toISOString().slice(0, 10),
    ordemServico: "",
    pecas: itensData.map((item) => ({
      ...item,
      selecionado: false,
      quantidade: item.temQuantidade ? 1 : 0,
      medida: 0,
      subItens: item.subItens
        ? item.subItens.map((sub) => ({
            ...sub,
            value: sub.initialValue || (sub.type === "checkbox" ? false : ""),
          }))
        : [],
    })),
    servicos: servicosData.map((servico) => ({
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
    totalGeralManual: "",
    formaPagamento: "",
    observacoes: "",
    status: "Aberto",
    imagens: [], // <-- novo campo para armazenar URLs de imagens
  });

  // Formata valores monetários
  const formatCurrencySmart = useCallback((value, selectionStart) => {
    if (!value) return { formatted: "", newCursor: 0 };
    const onlyNumbers = value.replace(/\D/g, "");
    const number = (parseFloat(onlyNumbers) / 100).toFixed(2);
    const formatted = Number(number).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const diff = formatted.length - value.length;
    const newCursor = (selectionStart || formatted.length) + diff;
    return { formatted, newCursor: Math.max(0, newCursor) };
  }, []);

  const parseCurrencyToNumber = (value) => {
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

    setFormData((prev) => ({
      ...prev,
      nome: editingData.cliente || "",
      telefone: editingData.telefone || "",
      veiculo: editingData.veiculo || "",
      placa: editingData.placa || "",
      data: validDate,
      ordemServico: editingData.ordemServico || "",
      totalPecasManual: editingData.valorTotalPecas
        ? formatCurrencySmart(String(editingData.valorTotalPecas), 0).formatted
        : "",
      totalServicosManual: editingData.valorTotalServicos
        ? formatCurrencySmart(String(editingData.valorTotalServicos), 0).formatted
        : "",
      totalMaoDeObraManual: editingData.totalMaoDeObra
        ? formatCurrencySmart(String(editingData.totalMaoDeObra), 0).formatted
        : "",
      totalGeralManual: editingData.valorTotal
        ? formatCurrencySmart(String(editingData.valorTotal), 0).formatted
        : "",
      formaPagamento: editingData.formaPagamento || "",
      observacoes: editingData.observacoes || "",
      status: editingData.status || "Aberto",
      pecas: itensData.map((pecaData) => {
        const pecaEdit = editingData.pecasSelecionadas?.find((p) =>
          p.includes(pecaData.nome)
        );
        const quantidadeMatch = pecaEdit ? pecaEdit.match(/::\s*(\d+)/) : null;
        const quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1], 10) : pecaData.temQuantidade ? 1 : 0;
        return {
          ...pecaData,
          selecionado: !!pecaEdit,
          quantidade,
          subItens: pecaData.subItens
            ? pecaData.subItens.map((sub) => ({
                ...sub,
                value: !!pecaEdit && pecaEdit.includes(sub.label) ? true : sub.initialValue,
              }))
            : [],
        };
      }),
      servicos: servicosData.map((servicoData) => {
        const servicoEdit = editingData.servicosSelecionados?.find((s) =>
          s.includes(servicoData.nome)
        );
        const quantidadeMatch = servicoEdit ? servicoEdit.match(/::\s*(\d+)/) : null;
        const quantidade = quantidadeMatch ? parseInt(quantidadeMatch[1], 10) : servicoData.temQuantidade ? 1 : 0;
        return {
          ...servicoData,
          selecionado: !!servicoEdit,
          quantidade,
          subItens: servicoData.subItens
            ? servicoData.subItens.map((sub) => ({
                ...sub,
                value: !!servicoEdit && servicoEdit.includes(sub.label) ? true : sub.initialValue,
              }))
            : [],
        };
      }),
      imagens: editingData.imagens || [],
    }));
  }, [editingData, itensData, servicosData, formatCurrencySmart]);

  // Atualiza campos simples
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza campos monetários
  const handleMonetaryChange = (e) => {
    const { name, value, selectionStart } = e.target;
    const { formatted, newCursor } = formatCurrencySmart(value, selectionStart);
    setFormData((prev) => ({ ...prev, [name]: formatted }));
    requestAnimationFrame(() => {
      e.target.setSelectionRange(newCursor, newCursor);
    });
  };

  // Toggle seleção de peças ou serviços
  const handleToggleSelecionado = (tipo, index) => {
    setFormData((prev) => {
      const list = prev[tipo].map((item, idx) =>
        idx === index ? { ...item, selecionado: !item.selecionado } : item
      );
      return { ...prev, [tipo]: list };
    });
  };

  // Atualiza quantidade
  const handleQuantidadeChange = (tipo, index, quantidade) => {
    setFormData((prev) => {
      const list = prev[tipo].map((item, idx) =>
        idx === index ? { ...item, quantidade } : item
      );
      return { ...prev, [tipo]: list };
    });
  };

  // Atualiza subitens
  const handleSubItemChange = (tipo, index, subIndex, value) => {
    setFormData((prev) => {
      const list = prev[tipo].map((item, idx) => {
        if (idx === index) {
          const newSubItens = item.subItens.map((sub, sIdx) =>
            sIdx === subIndex ? { ...sub, value } : sub
          );
          return { ...item, subItens: newSubItens };
        }
        return item;
      });
      return { ...prev, [tipo]: list };
    });
  };

  // Recebe as imagens enviadas pelo UploadImagemOrcamento
  const handleUploadSuccess = (uploadedFiles) => {
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, ...uploadedFiles],
    }));
  };

  // Formatação final dos itens para envio
  const formatarItens = (lista) =>
    lista
      .filter((i) => i.selecionado)
      .map((item) => {
        let nomeCompleto = item.nome;
        if (item.temQuantidade && item.quantidade > 0) nomeCompleto += `:: ${item.quantidade}`;
        if (item.temQuantidade && item.medida > 0) nomeCompleto += ` Medida: ${item.medida}`;
        const subItensFormatados = item.subItens
          .filter((sub) => (sub.type === "checkbox" && sub.value) || (sub.type === "text" && sub.value))
          .map((sub) => (sub.type === "checkbox" ? sub.label : `${sub.label}: ${sub.value}`))
          .join("; ");
        if (subItensFormatados) nomeCompleto += ` (${subItensFormatados})`;
        return nomeCompleto;
      });

  // Submit final do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      showMessage("Cliente é obrigatório!", true);
      return;
    }

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
      valorTotal: parseCurrencyToNumber(formData.totalGeralManual),
      formaPagamento: formData.formaPagamento,
      observacoes: formData.observacoes,
      status: formData.status,
      imagens: formData.imagens, // envia o array de imagens
    });
  };

  // Opções de quantidade 1–100
  const gerarOpcoesQuantidade = () => Array.from({ length: 100 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>);

  return (
    <div className="client-vehicle-section">
      <h1>{titulo}</h1>
      <form onSubmit={handleSubmit}>
        {/* Seção Cliente e Veículo */}
        <section className="client-vehicle-section">
          <h2>Informações do Cliente e Veículo</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <div className="form-group">
                    <label>OS:</label>
                    <input type="text" name="ordemServico" value={formData.ordemServico} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Cliente:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Telefone:</label>
                    <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-group">
                    <label>Veículo:</label>
                    <input type="text" name="veiculo" value={formData.veiculo} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Placa:</label>
                    <input type="text" name="placa" value={formData.placa} onChange={handleInputChange} />
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <label>Data:</label>
                    <input type="date" name="data" value={formData.data} onChange={handleInputChange} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Seção Peças */}
        <section className="pecas-section">
          <h2>Peças</h2>
          <table className="form-table">
            <thead>
              <tr>
                <th>Selecionar</th>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Medida</th>
                <th>Subitens</th>
              </tr>
            </thead>
            <tbody>
              {formData.pecas.map((peca, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" checked={peca.selecionado} onChange={() => handleToggleSelecionado("pecas", idx)} /></td>
                  <td>{peca.nome}</td>
                  <td>
                    {peca.temQuantidade && (
                      <select value={peca.quantidade} onChange={(e) => handleQuantidadeChange("pecas", idx, parseInt(e.target.value, 10))}>
                        {gerarOpcoesQuantidade()}
                      </select>
                    )}
                  </td>
                  <td>{peca.medida}</td>
                  <td>
                    {peca.subItens && peca.subItens.map((sub, sIdx) => (
                      <div key={sIdx}>
                        {sub.type === "checkbox" ? (
                          <label>
                            <input type="checkbox" checked={sub.value} onChange={(e) => handleSubItemChange("pecas", idx, sIdx, e.target.checked)} />
                            {sub.label}
                          </label>
                        ) : (
                          <input type="text" value={sub.value} onChange={(e) => handleSubItemChange("pecas", idx, sIdx, e.target.value)} placeholder={sub.label} />
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Seção Serviços */}
        <section className="servicos-section">
          <h2>Serviços</h2>
          <table className="form-table">
            <thead>
              <tr>
                <th>Selecionar</th>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Medida</th>
                <th>Subitens</th>
              </tr>
            </thead>
            <tbody>
              {formData.servicos.map((servico, idx) => (
                <tr key={idx}>
                  <td><input type="checkbox" checked={servico.selecionado} onChange={() => handleToggleSelecionado("servicos", idx)} /></td>
                  <td>{servico.nome}</td>
                  <td>
                    {servico.temQuantidade && (
                      <select value={servico.quantidade} onChange={(e) => handleQuantidadeChange("servicos", idx, parseInt(e.target.value, 10))}>
                        {gerarOpcoesQuantidade()}
                      </select>
                    )}
                  </td>
                  <td>{servico.medida}</td>
                  <td>
                    {servico.subItens && servico.subItens.map((sub, sIdx) => (
                      <div key={sIdx}>
                        {sub.type === "checkbox" ? (
                          <label>
                            <input type="checkbox" checked={sub.value} onChange={(e) => handleSubItemChange("servicos", idx, sIdx, e.target.checked)} />
                            {sub.label}
                          </label>
                        ) : (
                          <input type="text" value={sub.value} onChange={(e) => handleSubItemChange("servicos", idx, sIdx, e.target.value)} placeholder={sub.label} />
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Seção Totais e Pagamento */}
        <section className="totais-section">
          <h2>Totais e Pagamento</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <label>Total Peças:</label>
                  <input type="text" name="totalPecasManual" value={formData.totalPecasManual} onChange={handleMonetaryChange} />
                </td>
                <td>
                  <label>Total Serviços:</label>
                  <input type="text" name="totalServicosManual" value={formData.totalServicosManual} onChange={handleMonetaryChange} />
                </td>
                <td>
                  <label>Total Mão de Obra:</label>
                  <input type="text" name="totalMaoDeObraManual" value={formData.totalMaoDeObraManual} onChange={handleMonetaryChange} />
                </td>
                <td>
                  <label>Total Geral:</label>
                  <input type="text" name="totalGeralManual" value={formData.totalGeralManual} onChange={handleMonetaryChange} />
                </td>
                <td>
                  <label>Forma de Pagamento:</label>
                  <input type="text" name="formaPagamento" value={formData.formaPagamento} onChange={handleInputChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Seção Observações */}
        <section className="observacoes-section">
          <label>Observações:</label>
          <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange}></textarea>
        </section>

        {/* Seção Upload de Imagens */}
        <section className="imagens-section">
          <h2>Imagens do Orçamento</h2>
          <UploadImagemOrcamento
            orcamentoId={editingData?.id || "novo"}
            imagemAtual={formData.imagens}
            onUploadSuccess={handleUploadSuccess}
          />
        </section>

        {/* Botão de Envio */}
        <button type="submit" className="submit-btn">Salvar Orçamento</button>
      </form>

      {/* Mensagem de feedback */}
      {message && (
        <div className={`message-box ${isErrorMessage ? "error" : "success"}`}>
          {message} <button onClick={hideMessageBox}>X</button>
        </div>
      )}
    </div>
  );
};

export default OrcamentoGenerico;
