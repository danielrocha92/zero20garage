import React, { useState } from 'react';
import './Faq.css';
import DynamicHeader from '../../components/DynamicHeader';
import Breadcrumbs from '../../components/Breadcrumbs';


const faqData = [
  {
    question: '🛠️ O que é uma retífica de motor?',
    answer: 'É um processo de reparo que restaura componentes do motor para as especificações originais de fábrica, melhorando o desempenho e prolongando a vida útil.',
  },
  {
    question: '❓ Quando sei que meu motor precisa de retífica?',
    answer: 'Sinais como perda de potência, fumaça excessiva, aquecimento constante e ruídos anormais podem indicar a necessidade de retífica.',
  },
  {
    question: '⏱️ Quanto tempo dura uma retífica de motor?',
    answer: 'Depende do tipo de motor e do serviço necessário, mas normalmente leva de 3 a 7 dias úteis.',
  },
  {
    question: '🔁 A retífica deixa o motor como novo?',
    answer: 'Sim! Se feita corretamente, o motor volta a operar com desempenho semelhante ao original.',
  },
  {
    question: '🛡️ Qual a garantia após a retífica?',
    answer: 'Oferecemos garantia de 6 meses ou 10.000 km, o que ocorrer primeiro.',
  },
  {
    question: '🚗 Vocês trabalham com todos os tipos de motores?',
    answer: 'Sim! Retificamos motores a gasolina, álcool, diesel e GNV.',
  },
  {
    question: '💰 É melhor retificar ou trocar o motor?',
    answer: 'Depende do estado do motor. A retífica geralmente é mais econômica e mantém o número original do motor.',
  },
  {
    question: '🔧 Quais peças são substituídas na retífica?',
    answer: 'Camisas, pistões, bronzinas, juntas, anéis e outras peças desgastadas são substituídas.',
  },
  {
    question: '🧾 Fazem serviço com nota fiscal?',
    answer: 'Sim, emitimos nota fiscal e garantimos a procedência do serviço.',
  },
  {
    question: '💳 Vocês parcelam o serviço?',
    answer: 'Sim! Parcelamos em até 6x no cartão de crédito.',
  }
];

const Faq = () => {
  const messages = [
    {
      title: 'Que tipo de serviços a 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™ oferece?',
      subtitle: 'Somos uma oficina mecânica e retífica de motores especializada em veículos nacionais e importados.',
    },
    {
      title: 'Vocês trabalham com carros importados?',
      subtitle: 'Sim, somos especialistas em motores tanto de veículos nacionais quanto importados.',
    },
    {
      title: 'Posso confiar nos serviços da 𝗭𝗘𝗥𝗢 𝟮𝟬 𝗚𝗔𝗥𝗔𝗚𝗘™?',
      subtitle: 'Sim, prezamos pela confiança e qualidade em todos os nossos serviços. Nossa equipe experiente está pronta para cuidar do seu carro.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-claro">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />


      <div className="container-claro">
          <h2 translate='no' className="title">Perguntas Frequentes</h2>

          <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleIndex(index)}>
              {item.question}
              <span className="arrow">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p className="paragrafo-claro">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Faq;
