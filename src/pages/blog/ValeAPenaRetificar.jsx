import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import BlogShare from '../../components/BlogShare';
const valeAPenaRetificarImg = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429530/valeAPenaRetificarImg_p5wtyt.jpg';

const ValeAPenaRetificar = () => {
  const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Como Saber Quando Seu Motor Precisa de Reparo?',
    },
  ];

  return (
    <div className="page-escuro blog-article-wrapper">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-claro blog-article">
        <div className="meta-info">
          <span>16 de jun. de 2025 · 4 min de leitura</span>
        </div>

        <h1 className="titulo-escuro destaque">
          Retífica Vale a Pena ou é Melhor Trocar o Motor?
        </h1>

        <p className="subtitulo-italico">
          Quando o motor do carro apresenta falhas graves, surge uma dúvida comum: vale mais a pena retificar ou trocar o motor? A resposta depende de vários fatores, como o estado geral do veículo, o tipo de dano e o orçamento disponível. Neste artigo, explicamos os prós e contras de cada opção.
        </p>

        <figure className="blog-figure">
          <img src={valeAPenaRetificarImg} alt="Retífica de motor sendo realizada" className="blog-img" />
        </figure>

        <section className="section">
          <h3 className="blog-subtitulo">1. Quando vale a pena retificar?</h3>
          <p className="blog-paragrafo">
            A retífica é indicada quando o motor apresenta desgaste ou falhas internas, mas ainda tem estrutura para ser recuperado. É uma opção eficaz para restaurar o desempenho original do motor, desde que o serviço seja bem executado.
          </p>
          <ul className="lista-claro" >
            <li><strong>Motor original do carro:</strong> manter o motor original é uma vantagem em termos de valor de revenda.</li>
            <li><strong>Custo-benefício:</strong> geralmente mais barato do que comprar um motor novo ou recondicionado.</li>
            <li><strong>Personalização:</strong> é possível escolher peças de qualidade e acompanhar todo o processo.</li>
          </ul>

          <h3 className="blog-subtitulo">2. Quando é melhor trocar o motor?</h3>
          <p className="blog-paragrafo">
            Trocar o motor pode ser a melhor escolha quando os danos são muito extensos ou quando o motor já foi retificado várias vezes. Também pode ser uma alternativa viável quando há dificuldade em encontrar peças específicas.
          </p>
          <ul className="lista-claro">
            <li><strong>Motor com trincas no bloco ou cabeçote:</strong> nesses casos, a retífica pode não ser eficaz ou viável.</li>
            <li><strong>Retíficas anteriores mal executadas:</strong> se o motor já passou por muitos reparos e perdeu confiabilidade.</li>
            <li><strong>Facilidade:</strong> comprar um motor recondicionado pode ser mais rápido do que retificar.</li>
          </ul>

          <h3 className="blog-subtitulo">3. Comparativo entre retífica e troca</h3>
          <ul className="lista-claro">
            <li><strong>Retífica:</strong> custo menor, preserva o motor original, exige oficina especializada.</li>
            <li><strong>Troca:</strong> custo mais alto, solução rápida, exige atenção à procedência do motor substituto.</li>
          </ul>

          <h3 className="blog-subtitulo">4. Cuidados ao decidir</h3>
          <p className="blog-paragrafo">
            Antes de decidir, solicite uma avaliação completa do motor por uma oficina de confiança. Peça um orçamento detalhado para ambas as opções e avalie o custo total, incluindo garantia e durabilidade do serviço.
          </p>

          <h3 className="blog-subtitulo">Conclusão</h3>
          <p className="blog-paragrafo">
            A retífica é uma excelente alternativa para quem deseja restaurar o motor com menor custo, especialmente se for a primeira intervenção. Já a troca é indicada para casos extremos ou quando se busca praticidade. Em ambos os casos, o mais importante é contar com profissionais especializados, como os da ZER0 20 GARAGE™, para garantir segurança e qualidade.
          </p>
        </section>

        <footer className="blog-footer">
          <BlogShare slug="vale-a-pena-retificar" />
        </footer>
      </div>
    </div>
  );
};

export default ValeAPenaRetificar;
