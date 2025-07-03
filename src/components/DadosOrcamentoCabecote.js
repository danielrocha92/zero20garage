// src/components/DadosOrcamentoCabecote.js
// ESTE ARQUIVO CONTÉM OS DADOS ESPECÍFICOS PARA ORÇAMENTO DE CABEÇOTE

export const itensCabecote = [
  { nome: "Anel (Cabeçote)", valor: 0, tipo: "quantidade" },
  { nome: "Anti Chamas (Cabeçote)", valor: 0, tipo: "simples" },
  { nome: "Retentor de Válvula", valor: 0, tipo: "simples" },
  { nome: "Válvulas de Admissão", valor: 0, tipo: "simples" },
  { nome: "Válvulas de Escape", valor: 0, tipo: "simples" },
  { nome: "Parafusos do Cabeçote", valor: 0, tipo: "simples" },
  { nome: "Junta do Cabeçote", valor: 0, tipo: "simples" },
  { nome: "Tuchos", valor: 0, tipo: "simples" },
  { nome: "Guias de Válvula", valor: 0, tipo: "simples" },
  { nome: "Assentos de Válvula", valor: 0, tipo: "simples" },
  {
    nome: "Comando de Válvula",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Admissão" },
      { nome: "Escape" }
    ],
  },
  { nome: "Retentor Eixo Comando", valor: 0, tipo: "simples" },
  { nome: "Outras Peças Cabeçote", valor: 0, tipo: "simples" },
];

export const servicosCabecote = [
  {
    nome: "Retífica de Cabeçote",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Desmontagem e Avaliação" },
      { nome: "Banhos Químicos" },
      { nome: "Teste de Trinca" },
      { nome: "Teste de Vedação" },
      { nome: "Planeamento da Base" },
      { nome: "Retífica de Sedes de Válvula" },
      { nome: "Retífica de Válvulas" },
      { nome: "Troca de Guias" },
      { nome: "Troca de Assentos" },
      { nome: "Montagem de Cabeçote" },
      { nome: "Ajuste de Folgas" },
    ],
  },
  { nome: "Substituição de Válvulas", valor: 0, tipo: "simples" },
  { nome: "Reparo de Roscas", valor: 0, tipo: "simples" },
  { nome: "Descarbonização Completa", valor: 0, tipo: "simples" },
  { nome: "Outros Serviços de Cabeçote", valor: 0, tipo: "simples" },
];