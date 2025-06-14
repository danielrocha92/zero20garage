import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogShare from '../../components/ShareBar';
import custoRetificaImg from '../../assets/images/custo-retifica.jpg';

const CustoRetifica = () => {
  const messages = [
    {
      title: 'Custo da Retífica',
      subtitle: 'Fatores que Influenciam no Preço da Retífica de Motor',
    },
  ];

  return (
    <div className="page-escuro blog-article-wrapper">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <article className="container-claro blog-article">
        <header className="meta-info">
          <span>14 de jun. de 2025 · 4 min de leitura</span>
        </header>

        <h1 className="blog-titulo">
          Quanto custa uma retífica de motor? Fatores que influenciam no valor
        </h1>

        <p className="blog-paragrafo">
          Uma das dúvidas mais comuns entre motoristas é sobre o valor da retífica de motor. Esse processo, essencial para restaurar o desempenho do veículo, pode variar bastante de preço.
        </p>

        <figure>
          <img src={custoRetificaImg} alt="Retífica de motor sendo realizada" className="blog-img" />
        </figure>

        <section className="section">
          <h2 className="blog-subtitulo">1. Tipo de motor</h2>
          <p className="blog-paragrafo">
            Motores maiores, como os de 6 ou 8 cilindros, costumam exigir mais peças e mão de obra, elevando o custo total.
          </p>

          <h2 className="blog-subtitulo">2. Nível de desgaste</h2>
          <p className="blog-paragrafo">
            Um motor com maior desgaste pode demandar a substituição de diversos componentes, como pistões, bronzinas, válvulas e virabrequim.
          </p>

          <h2 className="blog-subtitulo">3. Qualidade das peças</h2>
          <p className="blog-paragrafo">
            Peças originais têm maior durabilidade, mas são mais caras. Já peças paralelas ou recondicionadas podem reduzir o valor final, com impacto variável na qualidade.
          </p>

          <h2 className="blog-subtitulo">4. Mão de obra e localização</h2>
          <p className="blog-paragrafo">
            Oficinas especializadas podem cobrar mais pela retífica devido à qualidade do serviço. Regiões metropolitanas também tendem a ter preços mais elevados.
          </p>

          <h2 className="blog-subtitulo">5. Exemplo de valores</h2>
          <ul className="blog-lista">
            <li><strong>Motor 1.0 ou 1.6:</strong> custo geralmente menor, de R$ 3.000 a R$ 5.000.</li>
            <li><strong>Motor 2.0 ou superior:</strong> pode ultrapassar R$ 7.000 dependendo das peças e mão de obra.</li>
            <li><strong>Retífica parcial:</strong> quando o dano é localizado, o custo pode ser reduzido pela metade.</li>
          </ul>

          <h2 className="blog-subtitulo">Conclusão</h2>
          <p className="blog-paragrafo">
            O custo da retífica de motor depende de diversos fatores, como tipo de motor, nível de desgaste e qualidade das peças utilizadas. Consultar uma oficina especializada é a melhor forma de obter um orçamento preciso.
          </p>
        </section>

        <footer>
          <BlogShare views={1987} comments={2} likes={7} />
        </footer>
      </article>
    </div>
  );
};

export default CustoRetifica;
