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
  { nome: "Cebolinha de óleo", temQuantidade: false },
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
  { nome: "Parafusos cabeçote", temQuantidade: false },
  { nome: "Retentor eixo comando", temQuantidade: false },
  { nome: "Retentor válvula", temQuantidade: false },
  { nome: "Sensor de temperatura", temQuantidade: false },
  { nome: "Silicone", temQuantidade: false },
  { nome: "Tubo d'água", temQuantidade: false },
  { nome: "Tuchos", temQuantidade: false },
  { nome: "Velas", temQuantidade: false },
  { nome: "Válvulas admissão", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Válvulas escape", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Válvula termostática", temQuantidade: false },
].sort((a, b) => a.nome.localeCompare(b.nome));

export const servicosCabecoteData = [
  { nome: "Limpeza e Revisão", temQuantidade: false },
  { nome: "Novo", temQuantidade: false },
  { nome: "Recuperação de Altura", temQuantidade: false },
  { nome: "Usinagem Completa", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

// ================================
// Dados de Peças Motor Completo
// ================================
export const itensMotorCompletoData = [
  { nome: "Anel", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }]  },
  { nome: "Anti Chamas", temQuantidade: false },
  { nome: "Arruela de encosto", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Balancinhos", temQuantidade: false },
  { nome: "Bico Injetor", temQuantidade: true },
  { nome: "Biela", temQuantidade: true },
  { nome: "Bomba d'água", temQuantidade: false },
  { nome: "Bomba de óleo", temQuantidade: false },
  { nome: "Bobina", temQuantidade: true },
  { nome: "Bronzina de biela", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }]  },
  { nome: "Bronzina de mancal", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }]  },
  { nome: "Cabo de vela", temQuantidade: false },
  { nome: "Cebolinha de óleo", temQuantidade: false },
  {
    nome: "Comando de Válvula", temQuantidade: false,
    subItens: [
      { label: "Admin", type: "checkbox", initialValue: false },
      { label: "Escape", type: "checkbox", initialValue: false },
    ]
  },
  {
    nome: "Correias", temQuantidade: false, subItens: [
      { label: "Acessórios kit", type: "checkbox", initialValue: false },
      { label: "Capa", type: "checkbox", initialValue: false },
      { label: "Corrente kit", type: "checkbox", initialValue: false },
      { label: "Dent kit", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Desengripante e Limpa contato ", temQuantidade: false },
  { nome: "Embreagem", temQuantidade: false },
  { nome: "Engrenagem virabrequim", temQuantidade: false },
  { nome: "Escoras", temQuantidade: false },
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Kit junta motor", temQuantidade: false },
  { nome: "Litros de aditivo", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Litros de Óleo", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  {
    nome: "Mangueiras Radiador:", temQuantidade: false, subItens: [
      { label: "Inferior", type: "checkbox", initialValue: false },
      { label: "Superior", type: "checkbox", initialValue: false },
    ]
  },
  { nome: "Parafusos cabeçote", temQuantidade: false },
  { nome: "Pistão", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Retentor eixo comando", temQuantidade: false },
  { nome: "Retentor traseiro virab.", temQuantidade: false },
  { nome: "Retentor válvula", temQuantidade: false },
  { nome: "Sensor de temperatura", temQuantidade: false },
  { nome: "Silicone", temQuantidade: false },
  { nome: "Tubo d'água", temQuantidade: false },
  { nome: "Tucho", temQuantidade: false },
  { nome: "Velas", temQuantidade: false },
  { nome: "Válvulas admissão", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Válvulas escape", temQuantidade: true, subItens: [{ label: "", type: "text", initialValue: "" }] },
  { nome: "Válvula termostática", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

// ================================
// Dados do Serviços Motor Completo
// ================================

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
// Dados de Serviços Diversos
// ================================
export const servicosDiversosData = [
  { nome: "Alinhamento e Balanceamento", temQuantidade: false },
  { nome: "Diagnóstico Computadorizado", temQuantidade: false },
  { nome: "Diagnóstico eletrônico", temQuantidade: false },
  { nome: "Limpeza de bicos injetores", temQuantidade: false },
  { nome: "Regulagem e Reparo de Motores", temQuantidade: false },
  { nome: "Revisão de Sistemas de Freios", temQuantidade: false },
  { nome: "Revisão de Sistemas de Suspensão e Direção", temQuantidade: false },
  { nome: "Revisão elétrica básica", temQuantidade: false },
  { nome: "Revisão Geral e Inspeções", temQuantidade: false },
  { nome: "Sistemas de Arrefecimento", temQuantidade: false },
  { nome: "Sistemas de Escapamento", temQuantidade: false },
  { nome: "Sistemas de Transmissão", temQuantidade: false },
  { nome: "Sistemas Eletrônicos e Elétricos", temQuantidade: false },
  { nome: "Substituição de Pneus", temQuantidade: false },
  { nome: "Troca de correias", temQuantidade: false },
  { nome: "Troca de velas", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

// ================================
// Dados de Troca de Óleo
// ================================
export const itensTrocaOleoData = [
  { nome: "Filtro de ar", temQuantidade: false },
  { nome: "Filtro de combustível", temQuantidade: false },
  { nome: "Filtro de óleo", temQuantidade: false },
  { nome: "Litros de Óleo", temQuantidade: true, subItens: [{ label: "Viscosidade/Marca", type: "text", initialValue: "" }] },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
].sort((a, b) => a.nome.localeCompare(b.nome));

export const servicosTrocaOleoData = [
  { nome: "Mão de Obra - Troca de Óleo e Filtros", temQuantidade: false },
  { nome: "Checagem de Níveis e Fluídos", temQuantidade: false },
  { nome: "Outros", temQuantidade: false, subItens: [{ label: "", type: "text", initialValue: "" }] },
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
  },
  servicosDiversos: {
    itens: [], // Não há itens de peça para esta categoria
    servicos: servicosDiversosData,
  },
  trocaDeOleo: {
    itens: itensTrocaOleoData,
    servicos: servicosTrocaOleoData,
  }
};
