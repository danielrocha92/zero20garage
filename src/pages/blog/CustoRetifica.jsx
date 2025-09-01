import React from 'react';
import { Helmet } from 'react-helmet-async';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogShare from '../../components/BlogShare';
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
      <Helmet>
        <title>Quanto custa uma retífica de motor? | ZER0 20 GARAGE™</title>
        <meta name="description" content="Descubra quanto custa uma retífica de motor, quais fatores influenciam no valor e como economizar sem perder qualidade." />
        <meta name="keywords" content="retífica de motor, custo da retífica, valores de retífica, motor 1.0, motor 2.0, oficina especializada" />
        <meta property="og:title" content="Quanto custa uma retífica de motor?" />
        <meta property="og:description" content="Entenda os fatores que afetam o preço da retífica de motor e veja exemplos de valores atualizados." />
        <meta property="og:image" content="/assets/images/custo-retifica.jpg" />
        <meta property="og:type" content="article" />
        <meta name="author" content="ZER0 20 GARAGE™" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://zero20garage.vercel.app/blog/CustoRetifica"
              },
              "headline": "Quanto custa uma retífica de motor?",
              "description": "Descubra quanto custa uma retífica de motor, quais fatores influenciam no valor e como economizar sem perder qualidade.",
              "image": "https://zero20garage.vercel.app/static/media/custo-retifica.21819f7af189025c1da2.jpg",
              "author": {
                "@type": "Organization",
                "name": "Daniel Rocha",
                "url": "https://danielrocha92.github.io",
                "url": "https://github.com/danielrocha92"
              },
              "publisher": {
                "@type": "Organization",
                "name": "ZER0 20 GARAGE™",
                "logo": {
                  "@type": "ImageObject",
                  "url": "http://localhost:3000/static/media/logo.89debbec8296d42c4e67.png"
                }
              },
              "datePublished": "2025-06-14",
              "dateModified": "2025-06-14"
            }
          `}
        </script>
      </Helmet>


      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <article className="container-claro blog-article">
        <div className="meta-info">
          <span>14 de jun. de 2025 · 4 min de leitura</span>
        </div>

        <h1 className="titulo-escuro destaque">
          Quanto custa uma retífica de motor?
        </h1>

        <p className="subtitulo-italico">
          Entenda os principais fatores que afetam o custo da retífica de motor e como calcular o valor final.
        </p>

        <figure className="blog-figure">
          <img
            src={custoRetificaImg}
            alt="Profissional realizando a retífica de um motor em oficina mecânica"
            className="blog-img"
          />
        </figure>

        <section className="section">
          <h2 className="blog-subtitulo">1. Tipo de motor</h2>
          <p className="blog-paragrafo">
            Motores maiores, como os de 6 ou 8 cilindros, costumam exigir mais peças e mão de obra, elevando o custo total da retífica de motor.
          </p>

          <h2 className="blog-subtitulo">2. Nível de desgaste</h2>
          <p className="blog-paragrafo">
            Um motor com maior desgaste pode demandar a substituição de diversos componentes, como pistões, bronzinas, válvulas e virabrequim — aumentando o custo da retífica.
          </p>

          <h2 className="blog-subtitulo">3. Qualidade das peças</h2>
          <p className="blog-paragrafo">
            Peças originais têm maior durabilidade, mas são mais caras. Já peças paralelas ou recondicionadas podem reduzir o valor da retífica, com impacto variável na durabilidade.
          </p>

          <h2 className="blog-subtitulo">4. Mão de obra e localização</h2>
          <p className="blog-paragrafo">
            Oficinas especializadas podem cobrar mais pela retífica de motor devido à qualidade do serviço. Regiões metropolitanas também tendem a ter preços mais elevados.
          </p>

          <h2 className="blog-subtitulo">5. Exemplo de valores para retífica de motor</h2>
          <ul className="blog-lista">
            <li><strong>Motor 1.0 ou 1.6:</strong> custo geralmente menor, de R$ 3.000 a R$ 5.000.</li>
            <li><strong>Motor 2.0 ou superior:</strong> pode ultrapassar R$ 7.000 dependendo das peças e mão de obra.</li>
            <li><strong>Retífica parcial:</strong> quando o dano é localizado, o custo pode ser reduzido pela metade.</li>
          </ul>

          <h3 className="blog-subtitulo">Conclusão: vale a pena fazer a retífica?</h3>
          <p className="blog-paragrafo">
            O custo da retífica de motor depende de diversos fatores, como tipo de motor, nível de desgaste e qualidade das peças utilizadas. Consultar uma oficina especializada é a melhor forma de obter um orçamento preciso para o seu caso.
          </p>
        </section>

        <footer className="blog-footer">
          <BlogShare slug="custo-retifica" />
        </footer>
      </article>
    </div>
  );
};

export default CustoRetifica;
