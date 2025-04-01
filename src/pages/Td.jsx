import React from 'react-router-dom';
import DynamicHeader from '../components/DynamicHeader';
import WhatsAppButton from '../components/WhatsAppButton';
import './Td.css';

function Td() {
  const messages = [
    {
      title: 'Diagnóstico de Problemas',
      subtitle: 'Identifique e resolva problemas no motor do seu veículo',
    },
    {
      title: 'Equipamentos de Última Geração',
      subtitle: 'Diagnóstico preciso e rápido',
    },
  ];

  return (
    <div className="td-page">
      <DynamicHeader messages={messages} />
      <WhatsAppButton />

      <div className="container">
      <section className="td-info-section">
          <div className='td-info-section'>
          <div className='td-item'>
          <h2>Troca de Peças com Qualidade e Precisão para o Seu Motor</h2>
          <p>Utilizamos apenas peças de alta qualidade, garantindo o desempenho e a durabilidade do seu motor. Nossa equipe especializada realiza a substituição com precisão, seguindo rigorosos padrões de qualidade.</p>

          <h3>Por que a Troca de Peças é Essencial?</h3>
          <p>Um diagnóstico preciso é essencial para identificar a causa raiz dos problemas do seu veículo e evitar gastos desnecessários. Com o diagnóstico correto, você pode ter certeza de que está resolvendo o problema certo.</p>

          <h3>Benefícios da troca de peças desgastadas ou danificadas</h3>
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

          <h3>Agende seu diagnóstico</h3>
          <p>Não espere que os problemas se agravem. Agende agora mesmo o diagnóstico do seu veículo e garanta a sua segurança e tranquilidade.</p>
          <a href="/orcamento" className="cta-button">Solicite um Orçamento</a>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default Td;