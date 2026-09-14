import React from 'react';
import styles from './FiltrosCRM.module.css';

export type FiltrosCRMValue = {
  dataInicial: string;
  dataFinal: string;
  statusGarantia: string;
  perfisUso: string[];
  tiposServico: string[];
};

type FiltrosCRMProps = {
  value: FiltrosCRMValue;
  onChange: (value: FiltrosCRMValue) => void;
  onReset: () => void;
};

const perfis = [
  { value: 'padrao', label: 'Padrão' },
  { value: 'uso_severo_app', label: 'Uso Severo/Aplicativo' },
];

const servicos = ['Motor Completo', 'Motor Parcial', 'Cabeçote', 'Serviços Diversos'];

export default function FiltrosCRM({ value, onChange, onReset }: FiltrosCRMProps) {
  const update = (patch: Partial<FiltrosCRMValue>) => onChange({ ...value, ...patch });
  const toggle = (field: 'perfisUso' | 'tiposServico', item: string) => {
    const current = value[field];
    update({ [field]: current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item] });
  };

  return (
    <section className={styles.panel} aria-labelledby="filtros-crm-title">
      <div className={styles.heading}><div><p className={styles.step}>PASSO 1</p><h2 id="filtros-crm-title">Escolha quem você quer contatar</h2><p className={styles.help}>Use os filtros abaixo para encontrar clientes que precisam de atenção. Se deixar um filtro vazio, todos os registros serão considerados.</p></div><button type="button" className={styles.reset} onClick={onReset}>Limpar filtros</button></div>
      <div className={styles.grid}>
        <label>Serviço concluído a partir de<input type="date" value={value.dataInicial} onChange={(event) => update({ dataInicial: event.target.value })} /></label>
        <label>Serviço concluído até<input type="date" value={value.dataFinal} onChange={(event) => update({ dataFinal: event.target.value })} /></label>
        <label>Qual revisão precisa de contato?
          <select value={value.statusGarantia} onChange={(event) => update({ statusGarantia: event.target.value })}>
            <option value="todos">Qualquer revisão</option>
            <option value="pendente-1">1ª Revisão Pendente</option>
            <option value="atrasada-1">1ª Revisão Atrasada</option>
            <option value="pendente-2">2ª Revisão Pendente</option>
            <option value="atrasada-2">2ª Revisão Atrasada</option>
            <option value="pendente-3">3ª Revisão Pendente</option>
            <option value="atrasada-3">3ª Revisão Atrasada</option>
          </select>
        </label>
      </div>
      <fieldset><legend>Como o veículo é usado?</legend>{perfis.map((item) => <label key={item.value} className={styles.check}><input type="checkbox" checked={value.perfisUso.includes(item.value)} onChange={() => toggle('perfisUso', item.value)} />{item.label}</label>)}</fieldset>
      <fieldset><legend>O que foi feito no veículo?</legend>{servicos.map((item) => <label key={item} className={styles.check}><input type="checkbox" checked={value.tiposServico.includes(item)} onChange={() => toggle('tiposServico', item)} />{item}</label>)}</fieldset>
    </section>
  );
}
