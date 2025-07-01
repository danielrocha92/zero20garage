import React, { useState, useEffect } from "react";

const orcamentoTemplates = {
  motor: {
    nome: "Motor Parcial e Completo",
    itens: [
      { descricao: "Diagnóstico inicial", quantidade: 1, valorUnitario: 150 },
      { descricao: "Retífica parcial do motor", quantidade: 1, valorUnitario: 1500 },
      { descricao: "Substituição de pistões", quantidade: 4, valorUnitario: 200 },
      { descricao: "Peças e materiais", quantidade: 1, valorUnitario: 300 },
      { descricao: "Deslocamento e atendimento no local", quantidade: 1, valorUnitario: 200 },
    ],
  },
  cabeçote: {
    nome: "Cabeçote",
    itens: [
      { descricao: "Diagnóstico do cabeçote", quantidade: 1, valorUnitario: 100 },
      { descricao: "Retífica do cabeçote", quantidade: 1, valorUnitario: 600 },
      { descricao: "Troca de válvulas e juntas", quantidade: 1, valorUnitario: 350 },
      { descricao: "Peças e materiais", quantidade: 1, valorUnitario: 250 },
      { descricao: "Deslocamento e atendimento no local", quantidade: 1, valorUnitario: 200 },
    ],
  },
  diversos: {
    nome: "Serviços Diversos",
    itens: [
      { descricao: "Diagnóstico geral", quantidade: 1, valorUnitario: 120 },
      { descricao: "Serviços diversos sob consulta", quantidade: 1, valorUnitario: 0 },
      { descricao: "Peças e materiais", quantidade: 1, valorUnitario: 0 },
      { descricao: "Deslocamento e atendimento no local", quantidade: 1, valorUnitario: 200 },
    ],
  },
};

const PainelOrcamentos = () => {
  const [categoria, setCategoria] = useState("");
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [itens, setItens] = useState([]);
  const [orcamentosSalvos, setOrcamentosSalvos] = useState([]);

  useEffect(() => {
    // Ao montar o componente, carrega orçamentos do localStorage
    const orcs = JSON.parse(localStorage.getItem("orcamentos")) || [];
    setOrcamentosSalvos(orcs);
  }, []);

  const handleCategoriaChange = (e) => {
    const cat = e.target.value;
    setCategoria(cat);
    // Clona os itens para evitar mutação direta do template
    setItens(orcamentoTemplates[cat]?.itens.map(i => ({ ...i })) || []);
  };

  const calculaTotal = () =>
    itens.reduce((acc, item) => acc + item.quantidade * item.valorUnitario, 0);

  const handleSalvar = (e) => {
    e.preventDefault();

    if (!categoria) {
      alert("Selecione a categoria do orçamento.");
      return;
    }
    if (!cliente.trim()) {
      alert("Informe o nome do cliente.");
      return;
    }
    if (!telefone.trim()) {
      alert("Informe o telefone do cliente.");
      return;
    }
    if (!endereco.trim()) {
      alert("Informe o endereço para serviço.");
      return;
    }

    const novoOrcamento = {
      id: Date.now(),
      categoria,
      nomeCategoria: orcamentoTemplates[categoria].nome,
      cliente,
      telefone,
      endereco,
      diagnostico,
      itens,
      total: calculaTotal(),
      data: new Date().toLocaleString(),
    };

    const orcamentosAtualizados = [...orcamentosSalvos, novoOrcamento];
    localStorage.setItem("orcamentos", JSON.stringify(orcamentosAtualizados));
    setOrcamentosSalvos(orcamentosAtualizados);

    alert(`Orçamento salvo para ${cliente} (${orcamentoTemplates[categoria].nome})`);

    // Reset campos
    setCategoria("");
    setCliente("");
    setTelefone("");
    setEndereco("");
    setDiagnostico("");
    setItens([]);
  };

  // Atualiza quantidade e valor unitário dos itens editáveis
  const handleItemChange = (index, campo, valor) => {
    const novosItens = [...itens];
    if (campo === "quantidade") {
      novosItens[index].quantidade = Math.max(0, parseInt(valor) || 0);
    } else if (campo === "valorUnitario") {
      novosItens[index].valorUnitario = Math.max(0, parseFloat(valor) || 0);
    }
    setItens(novosItens);
  };

  // Remove orçamento salvo
  const removerOrcamento = (id) => {
    if (window.confirm("Deseja remover este orçamento?")) {
      const filtrados = orcamentosSalvos.filter(o => o.id !== id);
      localStorage.setItem("orcamentos", JSON.stringify(filtrados));
      setOrcamentosSalvos(filtrados);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Gerar Orçamento - Retífica de Motores</h2>

      <form onSubmit={handleSalvar} style={{ marginBottom: 40 }}>
        <label>
          Escolha a categoria do orçamento:
          <select value={categoria} onChange={handleCategoriaChange} required>
            <option value="">-- Selecione --</option>
            <option value="motor">Motor Parcial e Completo</option>
            <option value="cabeçote">Cabeçote</option>
            <option value="diversos">Serviços Diversos</option>
          </select>
        </label>

        {categoria && (
          <>
            <div style={{ marginTop: 10 }}>
              <label>Cliente:</label>
              <input
                type="text"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <label>Telefone:</label>
              <input
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                style={{ width: "100%" }}
                placeholder="(xx) xxxx-xxxx"
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <label>Endereço para serviço:</label>
              <input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <label>Diagnóstico:</label>
              <textarea
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                rows={3}
                style={{ width: "100%" }}
              />
            </div>

            <h3 style={{ marginTop: 20 }}>Itens do Orçamento ({orcamentoTemplates[categoria].nome}):</h3>
            <table
              border="1"
              cellPadding="5"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Qtd</th>
                  <th>Valor Unitário (R$)</th>
                  <th>Subtotal (R$)</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, i) => (
                  <tr key={i}>
                    <td>{item.descricao}</td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={item.quantidade}
                        onChange={(e) =>
                          handleItemChange(i, "quantidade", e.target.value)
                        }
                        style={{ width: 60 }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.valorUnitario}
                        onChange={(e) =>
                          handleItemChange(i, "valorUnitario", e.target.value)
                        }
                        style={{ width: 80 }}
                      />
                    </td>
                    <td>{(item.quantidade * item.valorUnitario).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Total: R$ {calculaTotal().toFixed(2)}</h3>

            <button type="submit">Salvar Orçamento</button>
          </>
        )}
      </form>

      <section>
        <h2>Orçamentos Salvos</h2>
        {orcamentosSalvos.length === 0 ? (
          <p>Nenhum orçamento salvo ainda.</p>
        ) : (
          orcamentosSalvos.map((orc) => (
            <div
              key={orc.id}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 15,
                borderRadius: 4,
              }}
            >
              <strong>{orc.nomeCategoria}</strong> - <em>{orc.data}</em>
              <p>
                <b>Cliente:</b> {orc.cliente} | <b>Telefone:</b> {orc.telefone} |{" "}
                <b>Endereço:</b> {orc.endereco}
              </p>
              {orc.diagnostico && (
                <p>
                  <b>Diagnóstico:</b> {orc.diagnostico}
                </p>
              )}
              <table
                border="1"
                cellPadding="3"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Qtd</th>
                    <th>Valor Unitário (R$)</th>
                    <th>Subtotal (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {orc.itens.map((item, i) => (
                    <tr key={i}>
                      <td>{item.descricao}</td>
                      <td>{item.quantidade}</td>
                      <td>{item.valorUnitario.toFixed(2)}</td>
                      <td>{(item.quantidade * item.valorUnitario).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p>
                <b>Total:</b> R$ {orc.total.toFixed(2)}
              </p>
              <button
                style={{ backgroundColor: "#c00", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}
                onClick={() => removerOrcamento(orc.id)}
              >
                Remover
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PainelOrcamentos;
