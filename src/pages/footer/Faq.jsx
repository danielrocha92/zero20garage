import React, { useState } from 'react';
import { Wrench, HelpCircle, Clock, RefreshCw, ShieldCheck, Car, CircleDollarSign, Settings, Receipt, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/Institucional.css'; // Estilos compartilhados
import DynamicHeader from '../../components/ui/DynamicHeader';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ContatoCta from '../../components/ui/ContatoCta';


const faqData = [
  {
    icon: <Wrench size={20} color="#ff0015" />,
    question: 'O que é uma retífica de motor?',
    answer: 'É um processo de reparo que restaura componentes do motor para as especificações originais de fábrica, melhorando o desempenho e prolongando a vida útil.',
  },
  {
    icon: <HelpCircle size={20} color="#ff0015" />,
    question: 'Quando sei que meu motor precisa de retífica?',
    answer: 'Sinais como perda de potência, fumaça excessiva, aquecimento constante e ruídos anormais podem indicar a necessidade de retífica.',
  },
  {
    icon: <Clock size={20} color="#ff0015" />,
    question: 'Quanto tempo dura uma retífica de motor?',
    answer: 'Depende do tipo de motor e do serviço necessário, mas normalmente leva de 3 a 7 dias úteis.',
  },
  {
    icon: <RefreshCw size={20} color="#ff0015" />,
    question: 'A retífica deixa o motor como novo?',
    answer: 'Sim! Se feita corretamente, o motor volta a operar com desempenho semelhante ao original.',
  },
  {
    icon: <ShieldCheck size={20} color="#ff0015" />,
    question: 'Qual a garantia após a retífica?',
    answer: 'Oferecemos garantia de 6 meses ou 10.000 km, o que ocorrer primeiro.',
  },
  {
    icon: <Car size={20} color="#ff0015" />,
    question: 'Vocês trabalham com todos os tipos de motores?',
    answer: 'Sim! Retificamos motores a gasolina, álcool, diesel e GNV.',
  },
  {
    icon: <CircleDollarSign size={20} color="#ff0015" />,
    question: 'É melhor retificar ou trocar o motor?',
    answer: 'Depende do estado do motor. A retífica geralmente é mais econômica e mantém o número original do motor.',
  },
  {
    icon: <Settings size={20} color="#ff0015" />,
    question: 'Quais peças são substituídas na retífica?',
    answer: 'Camisas, pistões, bronzinas, juntas, anéis e outras peças desgastadas são substituídas.',
  },
  {
    icon: <Receipt size={20} color="#ff0015" />,
    question: 'Fazem serviço com nota fiscal?',
    answer: 'Sim, emitimos nota fiscal e garantimos a procedência do serviço.',
  },
  {
    icon: <CreditCard size={20} color="#ff0015" />,
    question: 'Vocês parcelam o serviço?',
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
    <div className="faq-page">
      <DynamicHeader messages={messages} />
      <Breadcrumbs />

      <div className="faq-container">
          <h2 translate='no' className="subtitulo-escuro">Perguntas Frequentes</h2>

          <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleIndex(index)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="faq-question-text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {item.icon}
                {item.question}
              </span>
              <span className="arrow">
                {activeIndex === index ? <ChevronUp size={20} color="#ff0015" /> : <ChevronDown size={20} color="#ff0015" />}
              </span>
            </div>
            <div className="faq-answer">
              <p className="paragrafo-escuro">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
        {/* Seção de Contato */}
          <ContatoCta />
      </div>
    </div>
  );
};

export default Faq;
