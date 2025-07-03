// src/components/DadosOrcamentoCompleto.js
// ESTE ARQUIVO CONTÉM OS DADOS ORIGINAIS E COMPLETOS PARA O ORÇAMENTO GERAL

export const itens = [
  { nome: "Anel", valor: 0, tipo: "quantidade" }, // 'quantidade' para itens com input de quantidade
  { nome: "Anti Chamas", valor: 0, tipo: "simples" },
  { nome: "Arruela encosto", valor: 0, tipo: "quantidade" },
  { nome: "Biela", valor: 0, tipo: "simples" },
  { nome: "Bobina", valor: 0, tipo: "simples" },
  { nome: "Bomba d’água", valor: 0, tipo: "simples" },
  { nome: "Bomba de óleo", valor: 0, tipo: "simples" },
  { nome: "Bronzina de biela", valor: 0, tipo: "quantidade" },
  { nome: "Bronzina de mancal", valor: 0, tipo: "quantidade" },
  { nome: "Cabo de vela", valor: 0, tipo: "simples" },
  { nome: "Cebolinha de óleo", valor: 0, tipo: "simples" },
  {
    nome: "Comando de válvula",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Admissão" },
      { nome: "Escape" }
    ],
  },
  {
    nome: "Correias",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Acessórios kit" },
      { nome: "Capa" },
      { nome: "Corrente kit" },
      { nome: "Dent kit" }
    ],
  },
  { nome: "Desengripante e Limpa contato", valor: 0, tipo: "simples" },
  { nome: "Embreagem", valor: 0, tipo: "simples" },
  { nome: "Engrenagem virab.", valor: 0, tipo: "simples" },
  { nome: "Filtro de ar", valor: 0, tipo: "simples" },
  { nome: "Filtro de combustível", valor: 0, tipo: "simples" },
  { nome: "Filtro de óleo", valor: 0, tipo: "simples" },
  {
    nome: "Litros de aditivo",
    valor: 0,
    tipo: "quantidade"
  },
  {
    nome: "Litros de óleo",
    valor: 0,
    tipo: "quantidade"
  },
  {
    nome: "Mangueiras Radiador",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Inferior" },
      { nome: "Superior" }
    ]
  },
  { nome: "Outros", valor: 0, tipo: "simples" },
  { nome: "Parafusos cabeçote", valor: 0, tipo: "simples" },
  { nome: "Pistão", valor: 0, tipo: "quantidade" },
  { nome: "Retentor eixo comando", valor: 0, tipo: "simples" },
  { nome: "Retentor traseiro virab.", valor: 0, tipo: "simples" },
  { nome: "Retentor válvula", valor: 0, tipo: "simples" },
  { nome: "Sensor de temperatura", valor: 0, tipo: "simples" },
  { nome: "Silicone", valor: 0, tipo: "simples" },
  { nome: "Tuchos", valor: 0, tipo: "simples" },
  { nome: "Tubo d’água", valor: 0, tipo: "simples" },
  { nome: "Válvula termostática", valor: 0, tipo: "simples" },
  { nome: "Válvulas admissão", valor: 0, tipo: "simples" },
  { nome: "Válvulas escape", valor: 0, tipo: "simples" },
  { nome: "Velas", valor: 0, tipo: "simples" },
];

export const servicos = [
  {
    nome: "Cabeçote",
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Limpeza e Revisão" },
      { nome: "Novo" },
      { nome: "Recuperação de Altura" },
      { nome: "Usinagem Completa" },
    ],
  },
  {
    nome: "Retífica de Cabeçote", // Este é o mesmo nome do serviço pai no DadosOrcamentoCabecote, mas é ok aqui
    valor: 0,
    tipo: "submenu",
    filhos: [
      { nome: "Banhos Químicos" },
      { nome: "Teste de Trinca" },
      { nome: "Planeamento" },
      { nome: "Retífica de Válvulas" },
      { nome: "Troca de Guias e Assentos" },
      { nome: "Montagem de Cabeçote" }
    ]
  },
  // Adicione outros serviços que estavam no seu orçamento completo aqui
];