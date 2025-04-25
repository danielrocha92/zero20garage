// Diagnostico.jsx
import React from 'react-router-dom';
import './Cp.css'; 
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';

function Cp() {
  const messages = [
    {
      title: 'Consultoria Técnica',
      subtitle: 'Consultoria especializada para ajudar você a tomar as melhores decisões para o seu veículo.',
    },
    {
      title: 'Equipamentos de Última Geração',
      subtitle: 'Diagnóstico preciso e rápido',
    },
  ];

  return (
    <div className="page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="content-section">
        <h2 className="section-title">
          Troca de Peças com Qualidade e Precisão para o Seu Motor
        </h2>
          <p className="section-paragraph">Utilizamos apenas peças de alta qualidade, garantindo o desempenho e a durabilidade do seu motor. Nossa equipe especializada realiza a substituição com precisão, seguindo rigorosos padrões de qualidade.</p>

          <h3 className="section-paragraph">Por que a Troca de Peças é Essencial?</h3>
          <p className="section-paragraph">Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.</p>

          <h3 className="section-paragraph">Benefícios da troca de peças desgastadas ou danificadas</h3>
          <ul>
            <li>Melhora no desempenho do motor.
            </li>
            <li>Aumento da vida útil do veículo.
            </li>
            <li>Redução do consumo de combustível.
            </li>
            <li>Prevenção de problemas futuros.
            </li>
          </ul>

          <h3 className="section-paragraph">Agende seu diagnóstico</h3>
          <p className="section-paragraph">Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.</p>
          <a href="/orcamento" className="button">Solicite um Orçamento</a>
      </div>
    </div>
  );
}
export default Cp;