import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';
import BlogShare from '../../components/BlogShare';
import trocarMotorImg from '../../assets/images/trocar-motor.jpg';

const TrocarMotor = () => {
  const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Retificar ou Trocar o Motor? Descubra a Melhor Opção!',
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
          Retificar ou Trocar o Motor? Entenda os Prós e Contras de Cada Opção
        </h1>

        <p className="subtitulo-italico">
          Quando o motor apresenta falhas graves, surge a dúvida: compensa retificar ou é melhor trocar? Ambas as alternativas possuem vantagens e desvantagens que precisam ser avaliadas com cuidado.
        </p>

        <figure className="blog-figure">
          <img src={trocarMotorImg} alt="Retífica de motor sendo realizada" className="blog-img" />
        </figure>

        <section className="section">
          <h3 className="blog-subtitulo">1. Quando optar pela retífica?</h3>
          <p className="blog-paragrafo">
            A retífica é indicada quando o motor apresenta desgastes naturais, mas a estrutura geral ainda está em boas condições. O processo recupera peças, ajusta folgas e devolve o desempenho original.
          </p>
          <ul className="lista-escuro">
            <li><strong>Vantagens:</strong> custo mais baixo que um motor novo, preservação do bloco original e menor impacto ambiental.</li>
            <li><strong>Desvantagens:</strong> qualidade depende da oficina e do maquinário utilizado, podendo não garantir a mesma durabilidade de um motor novo.</li>
          </ul>

          <h3 className="blog-subtitulo">2. Quando considerar a troca?</h3>
          <p className="blog-paragrafo">
            A troca é recomendada quando os danos são muito extensos, inviabilizando a recuperação, ou quando o custo da retífica se aproxima do de um motor novo ou recondicionado.
          </p>
          <ul className="lista-escuro">
            <li><strong>Vantagens:</strong> maior confiabilidade, garantia do fabricante e possibilidade de atualização tecnológica.</li>
            <li><strong>Desvantagens:</strong> investimento inicial mais alto e necessidade de compatibilidade com o veículo.</li>
          </ul>

          <h3 className="blog-subtitulo">3. Fatores a considerar na decisão</h3>
          <p className="blog-paragrafo">
            Avalie o estado geral do veículo, o custo-benefício de cada opção e a confiança na oficina que realizará o serviço. O histórico de manutenções também influencia na escolha.
          </p>

          <h3 className="blog-subtitulo">4. Consulte um especialista</h3>
          <p className="blog-paragrafo">
            Antes de decidir, procure uma oficina especializada em diagnóstico de motores. A ZER0 20 GARAGE™ oferece suporte técnico completo para ajudar você a fazer a melhor escolha.
          </p>

          <h3 className="blog-subtitulo">Conclusão</h3>
          <p className="paragrafo-escuro">
            Retificar ou trocar depende da extensão dos danos e dos objetivos com o veículo. Ambas são soluções válidas, desde que realizadas por profissionais qualificados. Conte com a ZER0 20 GARAGE™ para garantir segurança e qualidade.
          </p>
        </section>

        <footer className="blog-footer">
          <BlogShare slug="trocar-motor" />
        </footer>
      </div>
    </div>
  );
};

export default TrocarMotor;
