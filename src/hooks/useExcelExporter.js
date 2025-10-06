// src/hooks/useExcelExporter.js
import * as XLSX from "xlsx";
import { formatValue } from "../utils/formatters"; // Importando a função utilitária

export const useExcelExporter = () => {
  const exportToExcel = (orcamento) => {
    if (!orcamento) {
      console.error("Dados do orçamento não fornecidos para exportação.");
      return;
    }

    const wsData = [
      ["Orçamento", orcamento.ordemServico || ""],
      ["Cliente", orcamento.cliente || ""],
      ["Veículo", orcamento.veiculo || ""],
      ["Data", orcamento.data || ""],
      [],
      ["Peças"],
      ...(orcamento.pecasSelecionadas || []).map((p) => [p.item, formatValue(p.valor)]),
      ["Total Peças", formatValue(orcamento.valorTotalPecas)],
      [],
      ["Serviços"],
      ...(orcamento.servicosSelecionados || []).map((s) => [s.item, formatValue(s.valor)]),
      ["Total Serviços", formatValue(orcamento.valorTotalServicos)],
      ["Mão de Obra", formatValue(orcamento.totalMaoDeObra)],
      [],
      ["Total Geral", formatValue(orcamento.valorTotal)],
      ["Forma de Pagamento", orcamento.formaPagamento || ""],
      ["Observações", orcamento.observacoes || ""],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orçamento");

    const filename = `Orçamento_OS_${orcamento?.ordemServico || "SemOS"}_${
      orcamento?.cliente || "SemCliente"
    }.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return { exportToExcel };
};