import React from 'react';
import { Link } from 'react-router-dom'; // Supondo que você use react-router
import '../../styles/HomeDetails.css';

function Diagnostico() {
  return (
    <div className="page-black container-black">
      <h1>1. Diagnóstico</h1>
      <p>
        O processo de retífica começa com um diagnóstico completo e detalhado do motor. Utilizamos equipamentos de última geração para identificar desgastes, fissuras e problemas ocultos que podem afetar o desempenho do motor.
        Essa avaliação técnica abrange todos os componentes essenciais, como bloco, cabeçote, virabrequim, pistões, sistema de lubrificação e arrefecimento.
      </p>
      <p>
        Este passo é fundamental para planejar a retífica de forma precisa, garantindo que cada peça seja inspecionada com cuidado, prevenindo falhas futuras e assegurando a segurança e eficiência do motor.
      </p>
      <Link to="/">← Voltar para Home</Link>
    </div>
  );
}

export default Diagnostico;
