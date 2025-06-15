import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogShare from '../../components/BlogShare';

const RetificaParcialOuCompleta = () => {
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
          Retífica Parcial vs. Completa: Qual a Diferença e Quando Cada Uma é Indicada?
        </h1>

        <p className="subtitulo-italico">
          Quando o motor apresenta falhas ou desgaste, a retífica surge como uma solução técnica eficaz. Mas você sabe a diferença entre uma retífica parcial e uma completa? Entender essas modalidades ajuda a tomar decisões mais seguras e econômicas para seu veículo.
        </p>

        <section className="section">
          <h3 className="blog-subtitulo">1. O que é uma retífica parcial?</h3>
          <p className="blog-paragrafo">
            A retífica parcial é indicada quando o problema no motor está restrito a algumas partes específicas. Em geral, ela envolve o cabeçote, as válvulas ou a troca dos anéis de segmento, sem a desmontagem completa do bloco.
          </p>
          <ul className="lista-escuro">
            <li><strong>Exemplos:</strong> troca da junta do cabeçote, planificação do cabeçote, troca de válvulas e vedadores.</li>
            <li><strong>Vantagem:</strong> menor custo e tempo de serviço.</li>
            <li><strong>Limitação:</strong> nem sempre resolve problemas mais profundos ou generalizados no motor.</li>
          </ul>

          <h3 className="blog-subtitulo">2. O que é uma retífica completa?</h3>
          <p className="blog-paragrafo">
            A retífica completa (ou geral) é realizada quando há desgaste significativo em várias partes do motor. Nesse caso, o motor é totalmente desmontado, todas as peças são avaliadas, usinadas ou substituídas conforme necessário.
          </p>
          <ul className="lista-escuro">
            <li><strong>Exemplos:</strong> usinagem de cilindros, virabrequim, troca de pistões, anéis, bronzinas, retífica de cabeçote.</li>
            <li><strong>Vantagem:</strong> restaura completamente o desempenho do motor, como se fosse novo.</li>
            <li><strong>Desvantagem:</strong> maior custo e tempo de execução.</li>
          </ul>

          <h3 className="blog-subtitulo">3. Quando escolher cada tipo de retífica?</h3>
          <p className="blog-paragrafo">
            A escolha depende da gravidade do problema, da quilometragem e do estado geral do motor. Veja algumas recomendações:
          </p>
          <ul className="lista-escuro">
            <li><strong>Retífica parcial:</strong> indicada quando o motor ainda apresenta bom desempenho e os danos são localizados (como superaquecimento e desgaste no cabeçote).</li>
            <li><strong>Retífica completa:</strong> necessária quando há desgaste generalizado, ruídos internos, consumo de óleo e perda de compressão nos cilindros.</li>
          </ul>

          <h3 className="blog-subtitulo">4. Vale a pena retificar ou trocar o motor?</h3>
          <p className="blog-paragrafo">
            Em muitos casos, a retífica é mais econômica do que a troca do motor, especialmente se for feita por uma oficina especializada e com peças de qualidade. Contudo, se o motor já passou por múltiplas retíficas ou o custo for muito elevado, a substituição pode ser considerada.
          </p>

          <h3 className="blog-subtitulo">Conclusão</h3>
          <p className="paragrafo-escuro">
            Saber a diferença entre retífica parcial e completa é fundamental para tomar a melhor decisão para o seu carro. Em caso de dúvida, conte com a ZER0 20 GARAGE™: temos profissionais capacitados para diagnosticar com precisão e orientar sobre o melhor caminho.
          </p>
        </section>

        <footer className="blog-footer">
          <BlogShare slug="retifica-parcial-ou-completa" />
        </footer>
      </div>
    </div>
  );
};

export default RetificaParcialOuCompleta;
