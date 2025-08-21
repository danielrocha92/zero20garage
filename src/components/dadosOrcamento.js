// src/data/dadosOrcamento.js

// ==========================
// Dados do Orcamento Cabeçote
// ==========================
export const itensCabecoteData = [
  { nome: "Anti Chamas", temQuantidade: false },
  { nome: "Biela", temQuantidade: false },
  { nome: "Bobina", temQuantidade: false },
  { nome: "Bomba d'água", temQuantidade: false },
  { nome: "Cabo de vela", temQuantidade: false },
  {
    nome: "Comando de Válvula", temQuantidade: false,
    subItens: [
      { label: "Admin", type: "checkbox", initialValue: false },
      { label: "Escape", type: "checkbox", initialValue: false },
    ]
  },
  {
    nome: "Correias", temQuantidade: false,
    subItens: [
      { label: "Acessórios kit", type: "checkbox", initialValue: false },
      { label: "Capa", type: "checkbox", initialValue: false },
      { label: "Corrente kit", type: "checkbox", initialValue: false },
      { label: "Dent kit", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Cebolinha de óleo", temQuantidade: false },
  { nome: "Embreagem", temQuantidade: false },
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Kit junta motor", temQuantidade: false },
  { nome: "Litros de aditivo", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Litros de Óleo", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
  {
    nome: "Mangueiras Radiador", temQuantidade: false,
    subItens: [
      { label: "Inferior", type: "checkbox", initialValue: false },
      { label: "Superior", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Outros", temQuantidade: false},
  { nome: "Parafusos cabeçote", temQuantidade: false },
  { nome: "Retentor eixo comando", temQuantidade: false },
  { nome: "Retentor válvula", temQuantidade: false },
  { nome: "Sensor de temperatura", temQuantidade: false },
  { nome: "Silicone", temQuantidade: false },
  { nome: "Tubo d'água", temQuantidade: false },
  { nome: "Tuchos", temQuantidade: false },
  { nome: "Velas", temQuantidade: false },
  { nome: "Válvula termostática", temQuantidade: false },
  { nome: "Válvulas admissão", temQuantidade: false },
  { nome: "Válvulas escape", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

export const servicosCabecoteData = [
  { nome: "Limpeza e Revisão", temQuantidade: false },
  { nome: "Novo", temQuantidade: false },
  { nome: "Recuperação de Altura", temQuantidade: false },
  { nome: "Usinagem Completa", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

// ================================
// Dados do Orcamento Motor Completo
// ================================
export const itensMotorCompletoData = [
  { nome: "Anel", temQuantidade: false },
  { nome: "Anti Chamas", temQuantidade: false },
  { nome: "Balancinhos", temQuantidade: false },
  { nome: "Bico Injetor", temQuantidade: true },
  { nome: "Biela", temQuantidade: true },
  { nome: "Bloco do Motor", temQuantidade: false },
  { nome: "Bomba d'água", temQuantidade: false },
  { nome: "Bomba de óleo", temQuantidade: false },
  { nome: "Bobina", temQuantidade: true },
  { nome: "Bronzina de biela", temQuantidade: false },
  { nome: "Bronzina de mancal", temQuantidade: false },
  { nome: "Cabeçote", temQuantidade: false },
  { nome: "Carter", temQuantidade: false },
  { nome: "Comando de válvula", temQuantidade: false },
  {
    nome: "Correias", temQuantidade: false, subItens: [
      { label: "Acessórios kit", type: "checkbox", initialValue: false },
      { label: "Capa", type: "checkbox", initialValue: false },
      { label: "Corrente kit", type: "checkbox", initialValue: false },
      { label: "Dent kit", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Escoras", temQuantidade: false },
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Kit junta motor", temQuantidade: false },
  { nome: "Litros de aditivo", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Litros de Óleo", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Pistão", temQuantidade: false },
  { nome: "Retentor eixo comando", temQuantidade: false },
  { nome: "Retentor válvula", temQuantidade: false },
  { nome: "Tucho", temQuantidade: false },
  { nome: "Velas", temQuantidade: false },
  { nome: "Válvulas admissão", temQuantidade: false },
  { nome: "Válvulas escape", temQuantidade: false },
  { nome: "Virabrequim", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

export const servicosMotorCompletoData = [
  { nome: "Banho (cárter, suportes, parafusos etc)", temQuantidade: false },
  { nome: "Bielas", temQuantidade: false, subItens: [
      { label: "Usinagem", type: "checkbox", initialValue: false },
      { label: "Nova", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Bloco usinagem completa", temQuantidade: false },
  { nome: "Cabeçote", temQuantidade: false, subItens: [
      { label: "Usinagem completa", type: "checkbox", initialValue: false },
      { label: "Limpeza e Revisão", type: "checkbox", initialValue: false },
      { label: "Novo", type: "checkbox", initialValue: false },
      { label: "Recuperação altura", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Montagem de motor Técnica", temQuantidade: false },
  { nome: "Virabrequim", temQuantidade: false, subItens: [
      { label: "Usinagem", type: "checkbox", initialValue: false },
      { label: "Novo", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Volante Usinagem completa", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

// ================================
// Export Geral para facilitar importações
// ================================
export const dadosOrcamento = {
  cabecote: {
    itens: itensCabecoteData,
    servicos: servicosCabecoteData,
  },
  motorCompleto: {
    itens: itensMotorCompletoData,
    servicos: servicosMotorCompletoData,
  }
};
