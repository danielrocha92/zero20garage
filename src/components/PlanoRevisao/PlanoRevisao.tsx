import React from 'react';
import styles from './PlanoRevisao.module.css';

const LOGO_GARAGE = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429488/imagem-og_trb3ws.jpg';
const LOGO_OLEOS = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1791741485/92344bf9-f620-4e74-a498-28f06ba2a12e.png';

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
  dataEntrega?: string;
  tipoServico?: string[];
  revisoes?: Revisao[];
  observacoes?: string;
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
  dataEntrega = '',
  tipoServico = [],
  revisoes = [],
  observacoes = '',
}) => {
  const via = (titulo: string) => (
    <section className={styles.via} aria-label={titulo}>
      <header className={styles.cabecalhoVia}>
        <div>
          <strong>ZERO 20 GARAGE</strong>
          <span>PLANO DE REVISÃO E GARANTIA</span>
        </div>
        <h2>{titulo}</h2>
      </header>

      <div className={styles.dados}>
        <p><b>CLIENTE:</b> <span>{cliente}</span></p>
        <p><b>OS Nº:</b> <span>{numeroOS}</span></p>
        <p><b>DATA DE ENTREGA:</b> <span>{dataEntrega}</span></p>
        <p><b>VEÍCULO:</b> <span>{veiculo}</span></p>
        <p><b>PLACA:</b> <span>{placa}</span></p>
        <p><b>KM DE ENTREGA:</b> <span>{kmEntrega ? `${kmEntrega} km` : ''}</span></p>
      </div>

      <fieldset className={styles.servicos}>
        <legend>SERVIÇO REALIZADO</legend>
        <div className={styles.servicosLista}>
          {servicos.map((servico) => (
            <label key={servico} className={styles.servicoItem}>
              <input
                type="checkbox"
                checked={tipoServico.some((item) => item.toLowerCase().includes(servico.toLowerCase()))}
                readOnly
              />
              {servico}
            </label>
          ))}
        </div>
        <div className={styles.obsCampo}>
          <span>Obs: {observacoes || '____________________________________________________________________'}</span>
        </div>
      </fieldset>

      <div className={styles.revisoes}>
        {titulosRevisao.map((tituloRevisao, index) => {
          const revisao = revisoes[index] || {};
          return (
            <section className={styles.blocoRevisao} key={tituloRevisao}>
              <h3>{tituloRevisao}</h3>
              <p><b>KM Previsto:</b> <span>{revisao.kmPrevisto || ''}</span></p>
              <p><b>Valor (R$):</b> <span>{revisao.valor || ''}</span></p>
              <div className={styles.assinaturaContainer}>
                <span>ASSINATURA/CARIMBO:</span>
                <div className={styles.espacoAssinatura} />
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );

  return (
    <article className={styles.planoRevisao}>
      <header className={styles.topoGeral}>
        <img src={LOGO_GARAGE} alt="Zero 20 Garage" className={styles.logoTopo} />
        <h1 className={styles.tituloPrincipal}>PLANO DE REVISÃO/TROCA DE ÓLEO</h1>
        <img src={LOGO_OLEOS} alt="Zero 20 Óleos e Filtros" className={styles.logoTopo} />
      </header>

      {via('VIA DO CLIENTE')}
      {via('VIA DA OFICINA')}

      <footer className={styles.rodapePlano}>
        <p className={styles.avisoImportante}>
          <strong>É obrigatória a troca do óleo do motor e do filtro de óleo a cada 10.000 km, ou conforme o intervalo previsto no plano de troca de óleo fornecido ao cliente, respeitando sempre o prazo ou a quilometragem estabelecidos nesse plano.</strong> A realização das manutenções dentro dos intervalos recomendados é condição essencial para a preservação da garantia. O descumprimento dessa exigência, especialmente a não realização da troca de óleo e filtro no intervalo estipulado, poderá acarretar a perda da cobertura da garantia, observadas as condições do certificado e a legislação aplicável. O cliente deverá guardar os comprovantes das manutenções realizadas para eventual verificação.
        </p>
        <div className={styles.blocoAssinaturaCliente}>
          <div className={styles.linhaAssinaturaCliente} />
          <span>ASSINATURA DO CLIENTE</span>
        </div>
      </footer>
    </article>
  );
};

export default PlanoRevisao;
