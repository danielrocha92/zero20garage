import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HomeDetails.css';

function Usinagem() {
  return (
    <div className="page-black container-black">
      <h1>3. Usinagem</h1>
      <p>
        Nesta etapa, realizamos a usinagem e correção dos componentes do motor que apresentam desgaste ou imperfeições. Utilizamos máquinas de alta precisão para restaurar as dimensões originais das peças.
      </p>
      <p>
        O alinhamento perfeito e o acabamento correto garantem que o motor funcione adequadamente, proporcionando maior durabilidade e desempenho. A usinagem é fundamental para assegurar que todas as peças trabalhem em harmonia após a retífica.
      </p>
      <Link to="/">← Voltar para Home</Link>
    </div>
  );
}

export default Usinagem;
