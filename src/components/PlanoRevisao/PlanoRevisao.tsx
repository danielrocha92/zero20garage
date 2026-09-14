import React from 'react';
import styles from './PlanoRevisao.module.css';

type Revisao = {
  kmPrevisto?: string | number;
  valor?: string | number;
};

export interface PlanoRevisaoProps {
  cliente?: string;
  numeroOS?: string | number;
  veiculo?: string;
  placa?: string;
  kmEntrega?: string | number;
  tipoServico?: string[];
  revisoes?: Revisao[];
}

const servicos = [
  'Motor Completo',
  'Motor Parcial',
  'Cabeçote',
  'Serviços Diversos',
];

const titulosRevisao = [
  '1ª REVISÃO/TROCA DE ÓLEO',
  '2ª REVISÃO/TROCA DE ÓLEO',
  '3ª REVISÃO/TROCA DE ÓLEO',
];

const PlanoRevisao: React.FC<PlanoRevisaoProps> = ({
  cliente = '',
  numeroOS = '',
  veiculo = '',
  placa = '',
  kmEntrega = '',
  tipoServico = [],
  revisoes = [],
}) => {
  const via = (titulo: string) => (
    <section className={styles.via} aria-label={titulo}>
      <header className={styles.cabecalhoVia}>
        <div>
          <strong>ZER0 20 GARAGE</strong>
          <span>PLANO DE REVISÃO E GARANTIA</span>
        </div>
        <h2>{titulo}</h2>
      </header>

      <div className={styles.dados}>
        <p><b>CLIENTE</b><span>{cliente || '________________________________'}</span></p>
        <p><b>OS Nº</b><span>{numeroOS || '____________'}</span></p>
        <p><b>VEÍCULO</b><span>{veiculo || '________________________________'}</span></p>
        <p><b>PLACA</b><span>{placa || '________'}</span></p>
        <p><b>KM DE ENTREGA</b><span>{kmEntrega || '________ km'}</span></p>
      </div>

      <fieldset className={styles.servicos}>
        <legend>SERVIÇO REALIZADO</legend>
        {servicos.map((servico) => (
          <label key={servico}>
            <input
              type="checkbox"
              checked={tipoServico.some((item) => item.toLowerCase().includes(servico.toLowerCase()))}
              readOnly
            />
            {servico}
          </label>
        ))}
      </fieldset>

      <div className={styles.revisoes}>
        {titulosRevisao.map((tituloRevisao, index) => {
          const revisao = revisoes[index] || {};
          return (
            <section className={styles.blocoRevisao} key={tituloRevisao}>
              <h3>{tituloRevisao}</h3>
              <p><b>KM Previsto:</b> {revisao.kmPrevisto || '________________'}</p>
              <p><b>Valor (R$):</b> {revisao.valor || '________________'}</p>
              <div className={styles.assinatura}>
                ASSINATURA/CARIMBO: __________________________________
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );

  return (
    <article className={styles.planoRevisao}>
      {via('VIA DO CLIENTE')}
      {via('VIA DA OFICINA')}
    </article>
  );
};

export default PlanoRevisao;
