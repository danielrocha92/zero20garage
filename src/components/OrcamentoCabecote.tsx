import React, { useState } from "react";

const itens = [
  "Bomba d’água", "Tubo d’água", "Filtro de óleo", "Filtro de ar", "Filtro de combustível",
  "Litros de óleo", "Litros de aditivo", "Correias (Dent kit, Capa, Acessórios kit, Corrente kit)",
  "Válvula termostática", "Kit junta motor aço", "Retentor eixo comando", "Retentor válvula",
  "Comando de válvula (Admis/ Escape)", "Mangueiras Radiador (Inf./Sup.)", "Válvulas escape", "Válvulas admissão",
  "Velas", "Anti chamas", "Silicone", "Parafusos cabeçote", "Bobina", "Tuchos", "Cebolinha de óleo",
  "Sensor de temperatura", "Cabo de vela", "Biela", "Embreagem", "Outros"
];

const servicos = ["Usinagem Completa", "Limpeza e Revisão", "Novo", "Recuperação de Altura"];

export default function OrcamentoCabecote() {
  const [selecionados, setSelecionados] = useState<{ [item: string]: number }>({});
  const [servicosSelecionados, setServicosSelecionados] = useState<{ [item: string]: number }>({});

  const handleChange = (item: string, valor: string, isServico = false) => {
    const target = isServico ? servicosSelecionados : selecionados;
    const setter = isServico ? setServicosSelecionados : setSelecionados;
    setter({
      ...target,
      [item]: parseFloat(valor) || 0
    });
  };

  const total =
    Object.values(selecionados).reduce((a, b) => a + b, 0) +
    Object.values(servicosSelecionados).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h2>Orçamento – Cabeçote</h2>
      <h3>Peças</h3>
      {itens.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!e.target.checked) {
                  setSelecionados((prev) => {
                    const novo = { ...prev };
                    delete novo[item];
                    return novo;
                  });
                }
              }}
            />
            {item}
          </label>
          {selecionados[item] !== undefined && (
            <input
              type="number"
              placeholder="R$"
              onChange={(e) => handleChange(item, e.target.value)}
              style={{ marginLeft: 10 }}
            />
          )}
        </div>
      ))}

      <h3>Serviços</h3>
      {servicos.map((item) => (
        <div key={item}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                if (!e.target.checked) {
                  setServicosSelecionados((prev) => {
                    const novo = { ...prev };
                    delete novo[item];
                    return novo;
                  });
                }
              }}
            />
            {item}
          </label>
          {servicosSelecionados[item] !== undefined && (
            <input
              type="number"
              placeholder="R$"
              onChange={(e) => handleChange(item, e.target.value, true)}
              style={{ marginLeft: 10 }}
            />
          )}
        </div>
      ))}

      <h3>Total Geral: R$ {total.toFixed(2)}</h3>

      <button onClick={() => salvarGoogleSheets({ ...selecionados, ...servicosSelecionados })}>Salvar no Google Sheets</button>
      <button onClick={() => exportarExcel({ ...selecionados, ...servicosSelecionados })}>Baixar Excel</button>
      <button onClick={() => exportarPDF({ ...selecionados, ...servicosSelecionados })}>Baixar PDF</button>
    </div>
  );
}

// salvarGoogleSheets, exportarExcel e exportarPDF: a seguir