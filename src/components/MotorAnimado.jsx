import React, { useRef, useState } from 'react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import './MotorAnimado.css';

const etapas = [
  { label: 'Diagnóstico', valor: 0.0 },
  { label: 'Desmontagem', valor: 0.2 },
  { label: 'Limpeza', valor: 0.4 },
  { label: 'Usinagem', valor: 0.6 },
  { label: 'Montagem', valor: 0.8 },
  { label: 'Teste Final', valor: 1.0 },
];

const MotorAnimado = () => {
  const playerRef = useRef(null);
  const [etapaAtiva, setEtapaAtiva] = useState(null);

  const irParaPercentual = (percentual, index) => {
    const totalFrames = 300; // ou o valor exato se souber
    const frame = Math.floor(totalFrames * percentual);
    playerRef.current?.goToAndStop(frame, true);
    setEtapaAtiva(index);
  };

  return (
    <div className="motor-animado-container">
      <h2>Processo de Retífica (.lottie)</h2>

      <DotLottiePlayer
        src="https://lottie.host/6e5c8593-b4de-4cd1-82a6-7d50bceee0a3/hfRyc2Dxxt.lottie"
        autoplay={false}
        loop={false}
        style={{ width: 400, height: 400, margin: '0 auto' }}
        ref={playerRef}
      />

      <div className="etapas-container">
        {etapas.map((etapa, index) => (
          <button
            key={index}
            onClick={() => irParaPercentual(etapa.valor, index)}
            className={`etapa-botao ${etapaAtiva === index ? 'ativo' : ''}`}
          >
            {etapa.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MotorAnimado;
