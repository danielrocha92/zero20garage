import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export function exportarExcel(data: { [item: string]: number }) {
  const ws = XLSX.utils.json_to_sheet(
    Object.entries(data).map(([item, valor]) => ({ item, valor }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Orçamento");
  XLSX.writeFile(wb, "orcamento.xlsx");
}

export function exportarPDF(data: { [item: string]: number }) {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Orçamento", 10, 10);
  let y = 20;
  Object.entries(data).forEach(([item, valor]) => {
    doc.text(`${item}: R$ ${valor}`, 10, y);
    y += 10;
  });
  doc.save("orcamento.pdf");
}

export function salvarGoogleSheets(data: { [item: string]: number }) {
  alert("Integração com Google Sheets deve ser feita no backend com Google Sheets API.");
}