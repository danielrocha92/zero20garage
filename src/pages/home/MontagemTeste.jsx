import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomeDetails.css';
import '../../GlobalStyles.css';

function MontagemTeste() {
  return (
    <div className="page-claro container-claro">
      <h1>4. Montagem e Teste</h1>
      <p>
        Na fase final, realizamos a montagem técnica do motor utilizando ferramentas calibradas e peças de alta qualidade. Seguimos rigorosos padrões de torque e ajuste para garantir a durabilidade e a performance do motor.
      </p>
      <p>
        Após a montagem, o motor passa por testes específicos para assegurar seu funcionamento ideal, verificando torque, vazamentos e desempenho geral. Este processo garante que seu veículo volte a rodar com segurança e eficiência máxima.
      </p>
      <Link to="/">← Voltar para Home</Link>
    </div>
  );
}

export default MontagemTeste;
