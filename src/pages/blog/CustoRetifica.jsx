import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';


const CustoRetifica = () => {
const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Como Saber Quando Seu Motor Precisa de Reparo?',
    },
  ];

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

    <div className="container-claro">

      <section className="section">
        <h2 className="titulo-escuro">
          Quanto Custa uma Retífica de Motor? Fatores que Influenciam no Valor
        </h2>

        <p className="paragrafo-escuro">
          Uma das dúvidas mais comuns entre motoristas é quanto custa para retificar um motor. O valor pode variar bastante dependendo de vários fatores, desde o tipo de motor até a extensão dos danos. Neste artigo, vamos explicar o que influencia no custo da retífica e como se preparar para esse investimento.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">1. Tipo de motor</h3>
        <p className="paragrafo-escuro">
          O custo da retífica varia conforme o tipo e a complexidade do motor. Motores de 3 ou 4 cilindros tendem a ser mais baratos para retificar do que motores 6 cilindros ou turboalimentados.
        </p>
        <ul className="lista-escuro">
          <li><strong>Motor 1.0 ou 1.6:</strong> custo geralmente menor, peças acessíveis.</li>
          <li><strong>Motor 2.0 ou superior:</strong> mais peças e mão de obra especializada, o que eleva o preço.</li>
          <li><strong>Motor turbo ou diesel:</strong> componentes mais caros e técnicas específicas de retífica.</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">2. Nível de desgaste do motor</h3>
        <p className="paragrafo-escuro">
          Quanto maior o desgaste das peças, maior será o custo do serviço. Um motor que precisa de retífica completa, com substituição de pistões, virabrequim, bronzinas e cabeçote, será mais caro do que uma retífica parcial.
        </p>
        <ul className="lista-escuro">
          <li><strong>Retífica parcial:</strong> geralmente envolve apenas o cabeçote e custa menos.</li>
          <li><strong>Retífica completa:</strong> envolve o motor inteiro e pode dobrar ou triplicar o valor final.</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">3. Peças utilizadas</h3>
        <p className="paragrafo-escuro">
          O tipo e a origem das peças afetam diretamente o custo. Peças originais ou de marcas renomadas tendem a ser mais caras, mas garantem maior durabilidade.
        </p>
        <ul className="lista-escuro">
          <li><strong>Peças paralelas:</strong> custo menor, mas podem comprometer a qualidade a longo prazo.</li>
          <li><strong>Peças originais ou premium:</strong> preço mais alto, mas oferecem maior confiabilidade.</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">4. Mão de obra e especialização</h3>
        <p className="paragrafo-escuro">
          Oficinas com equipamentos modernos e profissionais especializados podem cobrar mais, mas entregam um serviço com mais garantia e precisão. A retífica exige conhecimento técnico e uso de ferramentas específicas.
        </p>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">5. Preço médio de uma retífica no Brasil</h3>
        <p className="paragrafo-escuro">
          Os valores podem variar bastante, mas para referência:
        </p>
        <ul className="lista-escuro">
          <li><strong>Retífica parcial:</strong> entre R$ 1.200 e R$ 3.000, dependendo do veículo.</li>
          <li><strong>Retífica completa:</strong> pode variar de R$ 3.500 a R$ 8.000 ou mais, conforme o motor e as peças necessárias.</li>
        </ul>
      </section>

      <section className="section">
        <h3 className="subtitulo-escuro">Conclusão:</h3>
        <p className="paragrafo-escuro">
          O custo da retífica de motor depende de múltiplos fatores, como o tipo de motor, a gravidade do desgaste, as peças utilizadas e a mão de obra. Apesar do investimento, a retífica é muitas vezes mais vantajosa do que a troca do motor. Sempre busque uma oficina de confiança, como a ZER0 20 GARAGE™, para garantir qualidade e segurança no serviço.
        </p>
      </section>
      </div>
    </div>
  );
}

export default CustoRetifica;
