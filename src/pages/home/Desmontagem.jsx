import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomeDetails.css';

function Desmontagem() {
  return (
    <div className="page-black container-black">
      <h1>2. Desmontagem</h1>
      <p>
        Após o diagnóstico, realizamos a desmontagem cuidadosa do motor, separando cada componente para análise detalhada. A desmontagem é feita com atenção para preservar a integridade das peças e evitar danos.
      </p>
      <p>
        Cada componente é inspecionado individualmente para detectar trincas, desgastes ou deformações. Essa avaliação minuciosa é essencial para definir quais peças precisam ser recuperadas, substituídas ou reparadas, garantindo a qualidade do serviço.
      </p>
      <Link to="/">← Voltar para Home</Link>
    </div>
  );
}

export default Desmontagem;
