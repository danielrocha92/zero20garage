import React, { useRef, useState } from 'react';
import styles from './EditorCampanha.module.css';
import GeradorTemplateIA from './GeradorTemplateIA';

export type TemplateCampanha = { id: string; nome: string; mensagem: string };
type EditorCampanhaProps = {
  templates: TemplateCampanha[];
  mensagem: string;
  onMensagemChange: (value: string) => void;
  onSalvarTemplate: (nome: string, mensagem: string) => Promise<void>;
  onSelecionarTemplate: (template: TemplateCampanha) => void;
};

const chips = [
  { value: '{{nome_cliente}}', label: 'Nome do cliente' },
  { value: '{{veiculo}}', label: 'Veículo' },
  { value: '{{placa}}', label: 'Placa' },
  { value: '{{os_numero}}', label: 'Número da OS' },
  { value: '{{data_limite}}', label: 'Data da revisão' },
];

export default function EditorCampanha({ templates, mensagem, onMensagemChange, onSalvarTemplate, onSelecionarTemplate }: EditorCampanhaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [nome, setNome] = useState('');
  const inserir = (chip: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    onMensagemChange(`${mensagem.slice(0, start)}${chip}${mensagem.slice(end)}`);
    requestAnimationFrame(() => { textarea.focus(); textarea.setSelectionRange(start + chip.length, start + chip.length); });
  };
  const salvar = async () => {
    if (!nome.trim() || !mensagem.trim()) return;
    await onSalvarTemplate(nome.trim(), mensagem);
    setNome('');
  };

  return <section className={styles.panel} aria-labelledby="editor-campanha-title">
    <p className={styles.step}>PASSO 2</p><h2 id="editor-campanha-title">Escreva a mensagem</h2><p className={styles.help}>Você pode escolher uma mensagem pronta ou escrever uma nova. Os botões abaixo inserem automaticamente os dados de cada cliente.</p>
    <GeradorTemplateIA onGenerated={onMensagemChange} />
    <div className={styles.row}><label>Usar uma mensagem pronta<select defaultValue="" onChange={(event) => { const selected = templates.find((item) => item.id === event.target.value); if (selected) onSelecionarTemplate(selected); }}><option value="">Escolha uma mensagem</option>{templates.map((template) => <option key={template.id} value={template.id}>{template.nome}</option>)}</select></label><label>Nome para salvar esta mensagem<input value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Ex.: Lembrete de revisão" /></label><button type="button" onClick={salvar}>Salvar mensagem</button></div>
    <p className={styles.chipLabel}>Inserir dados do cliente:</p><div className={styles.chips}>{chips.map((chip) => <button type="button" key={chip.value} onClick={() => inserir(chip.value)}>{chip.label}</button>)}</div>
    <label className={styles.messageLabel}>Mensagem que será enviada<textarea ref={textareaRef} value={mensagem} onChange={(event) => onMensagemChange(event.target.value)} rows={6} placeholder="Olá {{nome_cliente}}, está na hora de revisar o seu {{veiculo}}..." /></label>
  </section>;
}
