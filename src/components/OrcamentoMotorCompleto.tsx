import React, { useState } from "react";

const itens = [
  "Pistão", "Anel", "Bronzina de mancal", "Bronzina de biela", "Arruela encosto",
  "Bomba de óleo", "Bomba d’água", "Tubo d’água", "Filtro de óleo", "Filtro de ar",
  "Filtro de combustível", "Litros de óleo", "Litros de aditivo", "Correias (Dent kit, Capa, Acessórios kit, Corrente kit)",
  "Válvula termostática", "Kit junta motor aço", "Retentor traseiro virabrequim", "Engrenagem virabrequim",
  "Retentor eixo comando", "Retentor válvula", "Comando de válvula (Admis/ Escape)",
  "Mangueiras Radiador (Inf./Sup.)", "Válvulas escape", "Válvulas admissão", "Velas", "Anti chamas", "Silicone",
  "Parafusos cabeçote", "Bobina", "Tuchos", "Cebolinha de óleo", "Sensor de temperatura", "Cabo de vela", "Biela",
  "Embreagem", "Desengripante e Limpa contato", "Outros"
];

export default function OrcamentoMotorCompleto() {
  const [selecionados, setSelecionados] = useState<{ [item: string]: number }>({});

  const handleChange = (item: string, valor: string) => {
    setSelecionados((prev) => ({
      ...prev,
      [item]: parseFloat(valor) || 0
    }));
  };

  const total = Object.values(selecionados).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h2>Orçamento – Motor Completo</h2>
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
      <h3>Total: R$ {total.toFixed(2)}</h3>

      <button onClick={() => salvarGoogleSheets(selecionados)}>Salvar no Google Sheets</button>
      <button onClick={() => exportarExcel(selecionados)}>Baixar Excel</button>
      <button onClick={() => exportarPDF(selecionados)}>Baixar PDF</button>
    </div>
  );
}

// As funções salvarGoogleSheets, exportarExcel e exportarPDF podem ser implementadas separadamente