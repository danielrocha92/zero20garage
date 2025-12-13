import React from 'react';
import '../../styles/Blog.css';
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import BlogShare from '../../components/BlogShare';
const funilariaImage = 'https://res.cloudinary.com/dlyeywiwk/image/upload/v1763429515/sinais-retifica_kcy7mm.jpg';

const SinaisRetifica = () => {
  const messages = [
    {
      title: 'Retífica de Motores',
      subtitle: 'Como Saber Quando Seu Motor Precisa de Reparo?',
    },
  ];

  return (
    <div className="blog-page-light">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="blog-container-light">
        <div className="blog-meta-info">
          <span>14 de jun. de 2025 · 3 min de leitura</span>
        </div>

        <h1 className="blog-title-light">
          Tudo sobre retífica de motor: quando e por que fazer?
        </h1>

        <p className="blog-paragraph-light blog-intro-text">
          Saiba mais sobre o processo de retífica automotiva e como ele pode recuperar o desempenho do seu motor.
        </p>

        <figure className="blog-figure-container">
          <img src={funilariaImage} alt="Profissional trabalhando em retífica de motor" className="blog-featured-image" />
        </figure>

        <section className="blog-section">
          <h3 className="blog-subtitle-light">1. O que é a retífica de motor?</h3>
          <p className="blog-paragraph-light">
            A retífica é um processo de restauração que visa devolver ao motor o seu desempenho original. Envolve a desmontagem completa do motor, inspeção, usinagem de peças desgastadas e substituição de componentes danificados.
          </p>

          <h3 className="blog-subtitle-light">2. Principais sinais de que o motor precisa de retífica</h3>
          <ul className="blog-list-light">
            <li><strong>Consumo excessivo de óleo:</strong> Pode haver desgaste interno mesmo sem vazamentos.</li>
            <li><strong>Fumaça azul ou branca:</strong> Indicam problemas de vedação e queima de óleo.</li>
            <li><strong>Perda de potência:</strong> Baixa compressão em cilindros é um sintoma comum.</li>
            <li><strong>Ruídos metálicos:</strong> Barulhos internos graves pedem diagnóstico urgente.</li>
            <li><strong>Superaquecimento:</strong> Pode estar relacionado a falhas internas no motor.</li>
            <li><strong>Alta quilometragem:</strong> Motores muito rodados pedem atenção especial.</li>
          </ul>

          <h3 className="blog-subtitle-light">3. Quando vale a pena fazer a retífica?</h3>
          <p className="blog-paragraph-light">
            A retífica é recomendada quando o custo é menor do que trocar o motor, e o carro ainda tem boa estrutura geral.
          </p>

          <h3 className="blog-subtitle-light">4. Como prevenir a necessidade de retífica?</h3>
          <ul className="blog-list-light">
            <li><strong>Troque o óleo regularmente:</strong> Evita o desgaste prematuro das peças.</li>
            <li><strong>Use combustível de qualidade:</strong> Previne danos causados por combustíveis adulterados.</li>
            <li><strong>Verifique o sistema de arrefecimento:</strong> Evita superaquecimentos.</li>
            <li><strong>Faça revisões periódicas:</strong> A prevenção é mais barata que a correção.</li>
          </ul>

          <h3 className="blog-subtitle-light">Conclusão</h3>
          <p className="blog-paragraph-light">
            Reconhecer os sinais de desgaste no motor é essencial para evitar falhas graves e custos elevados. Se notar algum dos sintomas listados, procure uma oficina de confiança para avaliação. A retífica pode ser a melhor forma de restaurar seu veículo e prolongar sua vida útil.
          </p>
        </section>

        <footer className="blog-article-footer">
          <BlogShare slug="sinais-retifica" />
        </footer>
      </div>
    </div>
  );
};

export default SinaisRetifica;
