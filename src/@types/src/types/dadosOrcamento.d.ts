// src/types/dadosOrcamento.d.ts
export interface ItemOrcamento {
  nome: string;
  valor: number;
  tipo?: string;
}

declare module './DadosOrcamentoCompleto' {
  export const itens: ItemOrcamento[];
  export const servicos: ItemOrcamento[];
}
