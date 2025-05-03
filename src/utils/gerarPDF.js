import jsPDF from 'jspdf';

export function gerarPDF(dados) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('Orçamento ZER0 20 GARAGE™', 20, 20);

  doc.setFontSize(12);
  doc.text(`Nome: ${dados.nome}`, 20, 40);
  doc.text(`Email: ${dados.email}`, 20, 50);
  doc.text(`Telefone: ${dados.telefone}`, 20, 60);
  doc.text(`Serviço: ${dados.servico}`, 20, 70);
  doc.text('Mensagem:', 20, 80);

  const mensagem = doc.splitTextToSize(dados.mensagem, 170);
  doc.text(mensagem, 20, 90);

  const dataAtual = new Date().toLocaleDateString();
  doc.text(`Data do envio: ${dataAtual}`, 20, 150);

  doc.save(`Orcamento_${dados.nome}.pdf`);
}
