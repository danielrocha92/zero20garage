import React, { useEffect, useMemo, useState } from 'react';
import FiltrosCRM, { FiltrosCRMValue } from '../../components/crm/FiltrosCRM';
import EditorCampanha, { TemplateCampanha } from '../../components/crm/EditorCampanha';
import TabelaClientesCRM, { ClienteCRM } from '../../components/crm/TabelaClientesCRM';
import { listarDadosCRM, listarTemplatesCRM, normalizarClienteCRM, registrarContatosCRM, salvarTemplateCRM } from '../../services/crmCampanhas';
import styles from './CrmCampanhas.module.css';

type ClienteInterno = ClienteCRM & { perfilUso: string; tipoServico: string[]; dataConclusao: string; dataLimite: string };
const initialFilters: FiltrosCRMValue = { dataInicial: '', dataFinal: '', statusGarantia: 'todos', perfisUso: [], tiposServico: [] };

const applyVariables = (message: string, client: ClienteInterno) => message.replace(/{{nome_cliente}}/g, client.cliente).replace(/{{veiculo}}/g, client.veiculo).replace(/{{placa}}/g, client.placa).replace(/{{os_numero}}/g, client.id).replace(/{{data_limite}}/g, client.dataLimite ? new Date(client.dataLimite).toLocaleDateString('pt-BR') : '');

export default function CrmCampanhas() {
  const [filters, setFilters] = useState(initialFilters);
  const [clientes, setClientes] = useState<ClienteInterno[]>([]);
  const [templates, setTemplates] = useState<TemplateCampanha[]>([]);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [campaignName, setCampaignName] = useState('Campanha CRM');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  useEffect(() => {
    Promise.all([listarDadosCRM(), listarTemplatesCRM()])
      .then(([ordens, savedTemplates]) => { setClientes(ordens.map(normalizarClienteCRM)); setTemplates(savedTemplates as TemplateCampanha[]); })
      .catch((error) => { console.error('Erro ao carregar CRM:', error); setFeedback({ error: 'Não foi possível carregar os dados do CRM.', success: '' }); })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => clientes.filter((client) => {
    const date = client.dataConclusao ? new Date(client.dataConclusao) : null;
    const afterStart = !filters.dataInicial || (date && date >= new Date(`${filters.dataInicial}T00:00:00`));
    const beforeEnd = !filters.dataFinal || (date && date <= new Date(`${filters.dataFinal}T23:59:59`));
    const status = filters.statusGarantia === 'todos' || filters.statusGarantia === `${client.statusRevisao.toLowerCase().split(' ')[0]}-${client.statusRevisao.match(/\d/)?.[0]}`;
    const profile = !filters.perfisUso.length || filters.perfisUso.includes(client.perfilUso);
    const service = !filters.tiposServico.length || filters.tiposServico.some((item) => client.tipoServico.some((serviceName) => serviceName.includes(item)));
    return Boolean(afterStart && beforeEnd && status && profile && service);
  }), [clientes, filters]);

  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const send = async () => {
    const chosen = filtered.filter((client) => selected.includes(client.id));
    if (!chosen.length || !message.trim()) return;
    setSending(true); setFeedback({ error: '', success: '' });
    try {
      const payload = { campanha: campaignName, mensagem: message, clientes: chosen.map((client) => ({ id: client.id, telefone: client.telefone, mensagem: applyVariables(message, client) })) };
      const response = await fetch('/api/webhook-campanha', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('Webhook recusou a campanha.');
      const timestamp = await registrarContatosCRM(chosen, campaignName);
      setClientes((current) => current.map((client) => selected.includes(client.id) ? { ...client, ultimoContato: new Date(timestamp).toLocaleDateString('pt-BR') } : client));
      setFeedback({ error: '', success: `${chosen.length} contato(s) registrado(s) com sucesso.` }); setSelected([]);
    } catch (error) { console.error('Erro ao disparar campanha:', error); setFeedback({ error: 'Não foi possível disparar a campanha.', success: '' }); } finally { setSending(false); }
  };

  return <main className={styles.page}><header className={styles.header}><p className={styles.eyebrow}>PÓS-VENDA E PREVENÇÃO</p><h1>Campanhas para clientes</h1><p>Envie lembretes de revisão e mensagens de pós-venda de forma simples e organizada.</p></header><div className={styles.guide} aria-label="Como enviar uma campanha"><span><strong>1</strong> Encontre os clientes</span><span><strong>2</strong> Escreva a mensagem</span><span><strong>3</strong> Selecione e envie</span></div><div className={styles.layout}><FiltrosCRM value={filters} onChange={setFilters} onReset={() => setFilters(initialFilters)} /><EditorCampanha templates={templates} mensagem={message} onMensagemChange={setMessage} onSelecionarTemplate={(template) => { setCampaignName(template.nome); setMessage(template.mensagem); }} onSalvarTemplate={async (nome, mensagemValue) => { const template = await salvarTemplateCRM(nome, mensagemValue); setTemplates((current) => [...current, template]); setCampaignName(nome); }} /><div className={styles.actions}><span><strong>{selected.length}</strong> cliente(s) selecionado(s) de {filtered.length}</span><button type="button" className={styles.dispatch} onClick={send} disabled={sending || !selected.length || !message.trim()}>{sending ? 'Enviando...' : 'Enviar campanha'}</button></div>{!selected.length && <p className={styles.tip}>Dica: marque pelo menos um cliente na lista e escreva uma mensagem para habilitar o envio.</p>}{feedback.error && <p className={styles.error} role="alert">{feedback.error}</p>}{feedback.success && <p className={styles.success} role="status">{feedback.success}</p>}{loading ? <p className={styles.feedback}>Buscando clientes...</p> : <TabelaClientesCRM clientes={filtered} selecionados={selected} onToggle={toggle} onToggleTodos={() => setSelected((current) => filtered.every((client) => current.includes(client.id)) ? current.filter((id) => !filtered.some((client) => client.id === id)) : Array.from(new Set([...current, ...filtered.map((client) => client.id)])))} />}</div></main>;
}
