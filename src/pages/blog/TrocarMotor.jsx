import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';

const TrocarMotor = () => {
  const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Retificar ou Trocar o Motor? Descubra a Melhor Opção!',
    },
  ];

  return (
    <div className="page-escuro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="container-escuro">

        <section className="section">
          <h2 className="titulo-escuro">
            Retificar ou Trocar o Motor? Entenda os Prós e Contras de Cada Opção
          </h2>
          <p className="paragrafo-escuro">
            Quando o motor apresenta falhas graves, surge a dúvida: compensa retificar ou é melhor trocar? Ambas as alternativas possuem vantagens e desvantagens que precisam ser avaliadas com cuidado.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">1. Quando optar pela retífica?</h3>
          <p className="paragrafo-escuro">
            A retífica é indicada quando o motor apresenta desgastes naturais, mas a estrutura geral ainda está em boas condições. O processo recupera peças, ajusta folgas e devolve o desempenho original.
          </p>
          <ul className="lista-escuro">
            <li><strong>Vantagens:</strong> custo mais baixo que um motor novo, preservação do bloco original e menor impacto ambiental.</li>
            <li><strong>Desvantagens:</strong> qualidade depende da oficina e do maquinário utilizado, podendo não garantir a mesma durabilidade de um motor novo.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">2. Quando considerar a troca?</h3>
          <p className="paragrafo-escuro">
            A troca é recomendada quando os danos são muito extensos, inviabilizando a recuperação, ou quando o custo da retífica se aproxima do de um motor novo ou recondicionado.
          </p>
          <ul className="lista-escuro">
            <li><strong>Vantagens:</strong> maior confiabilidade, garantia do fabricante e possibilidade de atualização tecnológica.</li>
            <li><strong>Desvantagens:</strong> investimento inicial mais alto e necessidade de compatibilidade com o veículo.</li>
          </ul>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">3. Fatores a considerar na decisão</h3>
          <p className="paragrafo-escuro">
            Avalie o estado geral do veículo, o custo-benefício de cada opção e a confiança na oficina que realizará o serviço. O histórico de manutenções também influencia na escolha.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">4. Consulte um especialista</h3>
          <p className="paragrafo-escuro">
            Antes de decidir, procure uma oficina especializada em diagnóstico de motores. A ZER0 20 GARAGE™ oferece suporte técnico completo para ajudar você a fazer a melhor escolha.
          </p>
        </section>

        <section className="section">
          <h3 className="subtitulo-escuro">Conclusão:</h3>
          <p className="paragrafo-escuro">
            Retificar ou trocar depende da extensão dos danos e dos objetivos com o veículo. Ambas são soluções válidas, desde que realizadas por profissionais qualificados. Conte com a ZER0 20 GARAGE™ para garantir segurança e qualidade.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TrocarMotor;
