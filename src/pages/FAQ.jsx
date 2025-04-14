import React, { useState } from 'react';
import './Faq.css';

const faqData = [
  {
    question: 'O que é uma retífica de motor?',
    answer: 'É um processo de reparo que restaura componentes do motor para as especificações originais de fábrica, melhorando o desempenho e prolongando a vida útil.'
  },
  {
    question: 'Quando sei que meu motor precisa de retífica?',
    answer: 'Sinais como perda de potência, fumaça excessiva, aquecimento constante e ruídos anormais podem indicar a necessidade de retífica.'
  },
  {
    question: 'Quanto tempo dura uma retífica de motor?',
    answer: 'Depende do tipo de motor e do serviço necessário, mas normalmente leva de 3 a 7 dias úteis.'
  },
  {
    question: 'A retífica deixa o motor como novo?',
    answer: 'Sim! Se feita corretamente, o motor volta a operar com desempenho semelhante ao original.'
  },
  {
    question: 'Qual a garantia após a retífica?',
    answer: 'Oferecemos garantia de 6 meses ou 10.000 km, o que ocorrer primeiro.'
  },
  {
    question: 'Vocês trabalham com todos os tipos de motores?',
    answer: 'Sim! Retificamos motores a gasolina, álcool, diesel e GNV.'
  },
  {
    question: 'É melhor retificar ou trocar o motor?',
    answer: 'Depende do estado do motor. A retífica geralmente é mais econômica e mantém o número original do motor.'
  },
  {
    question: 'Quais peças são substituídas na retífica?',
    answer: 'Camisas, pistões, bronzinas, juntas, anéis e outras peças desgastadas são substituídas.'
  },
  {
    question: 'Fazem serviço com nota fiscal?',
    answer: 'Sim, emitimos nota fiscal e garantimos a procedência do serviço.'
  },
  {
    question: 'Vocês parcelam o serviço?',
    answer: 'Sim! Parcelamos em até 6x no cartão de crédito.'
  }
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Perguntas Frequentes</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleIndex(index)}>
              {item.question}
              <span className="arrow">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
