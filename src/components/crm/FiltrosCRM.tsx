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
};

const perfis = [
  { value: 'padrao', label: 'Padrão' },
  { value: 'uso_severo_app', label: 'Uso Severo/Aplicativo' },
];

const servicos = ['Motor Completo', 'Motor Parcial', 'Cabeçote', 'Serviços Diversos'];

export default function FiltrosCRM({ value, onChange }: FiltrosCRMProps) {
  const update = (patch: Partial<FiltrosCRMValue>) => onChange({ ...value, ...patch });
  const toggle = (field: 'perfisUso' | 'tiposServico', item: string) => {
    const current = value[field];
    update({ [field]: current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item] });
  };

  return (
    <section className={styles.panel} aria-labelledby="filtros-crm-title">
      <h2 id="filtros-crm-title">Filtros avançados</h2>
      <div className={styles.grid}>
        <label>Conclusão inicial<input type="date" value={value.dataInicial} onChange={(event) => update({ dataInicial: event.target.value })} /></label>
        <label>Conclusão final<input type="date" value={value.dataFinal} onChange={(event) => update({ dataFinal: event.target.value })} /></label>
        <label>Status de garantia
          <select value={value.statusGarantia} onChange={(event) => update({ statusGarantia: event.target.value })}>
            <option value="todos">Todas</option>
            <option value="pendente-1">1ª Revisão Pendente</option>
            <option value="atrasada-1">1ª Revisão Atrasada</option>
            <option value="pendente-2">2ª Revisão Pendente</option>
            <option value="atrasada-2">2ª Revisão Atrasada</option>
            <option value="pendente-3">3ª Revisão Pendente</option>
            <option value="atrasada-3">3ª Revisão Atrasada</option>
          </select>
        </label>
      </div>
      <fieldset><legend>Perfil de uso</legend>{perfis.map((item) => <label key={item.value} className={styles.check}><input type="checkbox" checked={value.perfisUso.includes(item.value)} onChange={() => toggle('perfisUso', item.value)} />{item.label}</label>)}</fieldset>
      <fieldset><legend>Tipo de serviço</legend>{servicos.map((item) => <label key={item} className={styles.check}><input type="checkbox" checked={value.tiposServico.includes(item)} onChange={() => toggle('tiposServico', item)} />{item}</label>)}</fieldset>
    </section>
  );
}
