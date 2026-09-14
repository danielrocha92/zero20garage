import React from 'react';
import styles from './TabelaClientesCRM.module.css';

export type ClienteCRM = { id: string; cliente: string; veiculo: string; placa: string; telefone: string; statusRevisao: string; dataLimite?: string; ultimoContato?: string; };
type Props = { clientes: ClienteCRM[]; selecionados: string[]; onToggle: (id: string) => void; onToggleTodos: () => void; };

export default function TabelaClientesCRM({ clientes, selecionados, onToggle, onToggleTodos }: Props) {
  const todosSelecionados = clientes.length > 0 && clientes.every((cliente) => selecionados.includes(cliente.id));
  return <div className={styles.wrapper}><table><caption className={styles.caption}><span><strong>PASSO 3 — Escolha os clientes</strong><small>Marque quem receberá a mensagem. Depois, clique em “Enviar campanha”.</small></span><span className={styles.count}>{clientes.length} encontrado(s)</span></caption><thead><tr><th><input type="checkbox" checked={todosSelecionados} onChange={onToggleTodos} aria-label="Selecionar todos os clientes" /></th><th>Cliente</th><th>Veículo</th><th>Telefone</th><th>Status da Revisão</th><th>Último Contato</th></tr></thead><tbody>{clientes.map((cliente) => <tr key={cliente.id}><td><input type="checkbox" checked={selecionados.includes(cliente.id)} onChange={() => onToggle(cliente.id)} aria-label={`Selecionar ${cliente.cliente}`} /></td><td>{cliente.cliente}</td><td>{cliente.veiculo}</td><td>{cliente.telefone || 'Não informado'}</td><td><span className={cliente.statusRevisao.includes('Atrasada') ? styles.late : styles.pending}>{cliente.statusRevisao}</span></td><td>{cliente.ultimoContato || 'Nunca'}</td></tr>)}</tbody></table>{clientes.length === 0 && <p className={styles.empty}>Nenhum cliente encontrado. Tente retirar alguns filtros ou escolher outro período.</p>}</div>;
}
