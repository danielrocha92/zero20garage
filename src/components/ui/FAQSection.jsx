import React, { useState } from 'react';
import { HelpCircle, Wrench, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import '../../GlobalStyles.css';
import '../../styles/Institucional.css'; // Importa estilos do FAQ

const faqData = [
  {
    icon: <HelpCircle size={20} color="#ff0015" />,
    question: 'Quanto tempo leva para fazer a manutenção preventiva?',
    answer: 'A manutenção preventiva costuma levar entre 1 e 2 horas, dependendo do modelo do veículo e dos serviços inclusos. Agendando com antecedência, garantimos agilidade no atendimento.',
  },
  {
    icon: <Wrench size={20} color="#ff0015" />,
    question: 'Vocês trabalham com carros importados?',
    answer: 'Sim! Temos mecânicos especializados e ferramentas adequadas para veículos nacionais e importados. Consulte-nos para confirmar peças em estoque.',
  },
  {
    icon: <Calendar size={20} color="#ff0015" />,
    question: 'Preciso agendar ou posso chegar direto?',
    answer: 'Recomendamos agendamento para garantir atendimento rápido. Mas também aceitamos clientes por ordem de chegada, sujeitos à disponibilidade.',
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='faq-container'>
      <h2 className="section-title">Perguntas Frequentes</h2>

      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
            <div className="faq-question" onClick={() => toggleIndex(index)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="faq-question-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
      <a href="/Faq" className="button">Ver Mais</a>
    </div>
  );
};

export default FAQSection;
