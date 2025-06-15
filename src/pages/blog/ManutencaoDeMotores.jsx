import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogShare from '../../components/BlogShare';

const ManutencaoDeMotores = () => {
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
          <span>15 de jun. de 2025 · 3 min de leitura</span>
        </div>

        <h1 className="titulo-escuro destaque">
          Manutenção de Motores: Dicas de Profissionais para Maximizar a Vida Útil do Seu Motor
        </h1>

        <p className="subtitulo-italico">
          Saiba como cuidar do motor do seu veículo para que ele dure mais tempo. A manutenção preventiva evita falhas, aumenta o desempenho e reduz os custos com reparos.
        </p>

        <section className="section">
          <h3 className="blog-subtitulo">1. Troca regular de óleo e filtro</h3>
          <p className="blog-paragrafo">
            O óleo lubrificante evita o desgaste das peças internas do motor. Respeitar o intervalo de troca recomendado pelo fabricante é essencial.
          </p>
          <ul className="lista-escuro">
            <li><strong>Óleo mineral:</strong> troca a cada 5.000 km, em média.</li>
            <li><strong>Óleo sintético:</strong> dura até 10.000 km, dependendo do uso.</li>
            <li><strong>Filtro de óleo:</strong> troque junto com o óleo.</li>
          </ul>

          <h3 className="blog-subtitulo">2. Verifique o sistema de arrefecimento</h3>
          <p className="blog-paragrafo">
            O superaquecimento pode comprometer seriamente o motor. Mantenha o nível do líquido de arrefecimento e confira mangueiras e radiador com frequência.
          </p>

          <h3 className="blog-subtitulo">3. Fique atento às velas de ignição</h3>
          <p className="blog-paragrafo">
            Velas desgastadas afetam a combustão, aumentam o consumo e reduzem a potência. A troca periódica garante melhor desempenho e economia.
          </p>

          <h3 className="blog-subtitulo">4. Correias e tensores em bom estado</h3>
          <p className="blog-paragrafo">
            Correias dentadas ou auxiliares ressecadas podem se romper e causar danos severos ao motor. Verifique visualmente e substitua conforme a recomendação.
          </p>

          <h3 className="blog-subtitulo">5. Use combustível de qualidade</h3>
          <p className="blog-paragrafo">
            Gasolina ou etanol adulterados causam carbonização e desgaste precoce de componentes internos. Prefira postos confiáveis e abasteça com regularidade.
          </p>

          <h3 className="blog-subtitulo">6. Realize revisões periódicas</h3>
          <p className="blog-paragrafo">
            Faça check-ups completos com mecânicos de confiança. A prevenção é sempre mais barata e segura do que a correção.
          </p>

          <h3 className="blog-subtitulo">Conclusão</h3>
          <p className="paragrafo-escuro">
            A vida útil do motor depende de cuidados simples, mas constantes. Investir em manutenção preventiva garante economia e tranquilidade ao dirigir. Conte com a ZER0 20 GARAGE™ para manter seu motor sempre em forma.
          </p>
        </section>

        <footer className="blog-footer">
          <BlogShare slug="manutencao-de-motores" />
        </footer>
      </div>
    </div>
  );
};

export default ManutencaoDeMotores;
