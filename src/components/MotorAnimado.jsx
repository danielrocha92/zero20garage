import React from 'react';
import { DotLottiePlayer, useDotLottiePlayer } from '@lottiefiles/dotlottie-react';

const MotorAnimado = () => {
  const { player, play, stop, goToAndStop } = useDotLottiePlayer();

  const irParaPercentual = (percentual) => {
    if (player?.current) {
      const totalFrames = player.current?.getLottie?.()?.totalFrames || 0;
      const frame = totalFrames * percentual;
      goToAndStop(frame, true);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>Processo de Retífica (.lottie)</h2>

      <DotLottiePlayer
        lottieRef={player}
        src="https://lottie.host/6e5c8593-b4de-4cd1-82a6-7d50bceee0a3/hfRyc2Dxxt.lottie"
        autoplay={false}
        loop={false}
        style={{ width: 400, height: 400, margin: '0 auto' }}
      />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => irParaPercentual(0.0)}>Diagnóstico</button>
        <button onClick={() => irParaPercentual(0.2)}>Desmontagem</button>
        <button onClick={() => irParaPercentual(0.4)}>Limpeza</button>
        <button onClick={() => irParaPercentual(0.6)}>Usinagem</button>
        <button onClick={() => irParaPercentual(0.8)}>Montagem</button>
        <button onClick={() => irParaPercentual(1.0)}>Teste Final</button>
      </div>
    </div>
  );
};

export default MotorAnimado;
