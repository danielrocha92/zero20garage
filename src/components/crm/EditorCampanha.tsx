import React, { useRef, useState } from 'react';
import styles from './EditorCampanha.module.css';

export type TemplateCampanha = { id: string; nome: string; mensagem: string };
type EditorCampanhaProps = {
  templates: TemplateCampanha[];
  mensagem: string;
  onMensagemChange: (value: string) => void;
  onSalvarTemplate: (nome: string, mensagem: string) => Promise<void>;
  onSelecionarTemplate: (template: TemplateCampanha) => void;
};

const chips = ['{{nome_cliente}}', '{{veiculo}}', '{{placa}}', '{{os_numero}}', '{{data_limite}}'];

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
    <h2 id="editor-campanha-title">Editor de campanha</h2>
    <div className={styles.row}><label>Template salvo<select defaultValue="" onChange={(event) => { const selected = templates.find((item) => item.id === event.target.value); if (selected) onSelecionarTemplate(selected); }}><option value="">Selecione um template</option>{templates.map((template) => <option key={template.id} value={template.id}>{template.nome}</option>)}</select></label><label>Novo template<input value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Ex.: Alerta App - 15 Dias" /></label><button type="button" onClick={salvar}>Salvar template</button></div>
    <div className={styles.chips}>{chips.map((chip) => <button type="button" key={chip} onClick={() => inserir(chip)}>{chip}</button>)}</div>
    <label className={styles.messageLabel}>Mensagem<textarea ref={textareaRef} value={mensagem} onChange={(event) => onMensagemChange(event.target.value)} rows={6} placeholder="Olá {{nome_cliente}}, identificamos uma revisão próxima..." /></label>
  </section>;
}
