import React, { useState } from 'react';
import styles from './GeradorTemplateIA.module.css';

type Props = {
  onGenerated: (message: string) => void;
};

export default function GeradorTemplateIA({ onGenerated }: Props) {
  const [objective, setObjective] = useState('');
  const [tone, setTone] = useState('amigável e profissional');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!objective.trim()) {
      setError('Explique brevemente o que você quer comunicar.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/gerar-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objetivo: objective.trim(), tom: tone }),
      });
      const responseText = await response.text();
      let data: { mensagem?: string; error?: string } = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        if (response.status === 404) {
          throw new Error('A função /api/gerar-template não foi publicada nesta implantação da Vercel. Faça um novo deploy a partir da raiz do projeto.');
        }
        throw new Error('O servidor retornou uma resposta inválida ao gerar o template.');
      }
      if (!response.ok || !data.mensagem) throw new Error(data.error || 'Não foi possível criar a mensagem.');
      onGenerated(data.mensagem);
    } catch (generationError) {
      console.error('Erro ao gerar template com IA:', generationError);
      setError(generationError instanceof Error ? generationError.message : 'Não foi possível criar a mensagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={styles.panel} aria-labelledby="gerador-ia-title">
      <div className={styles.title}><span className={styles.robot} aria-hidden="true">IA</span><div><h3 id="gerador-ia-title">Criar mensagem com IA</h3><p>Descreva o que deseja dizer e a IA prepara um rascunho para você revisar.</p></div></div>
      <label>O que você quer comunicar?
        <input value={objective} onChange={(event) => setObjective(event.target.value)} placeholder="Ex.: lembrar a revisão de óleo desta semana" />
      </label>
      <label>Como a mensagem deve soar?
        <select value={tone} onChange={(event) => setTone(event.target.value)}>
          <option>amigável e profissional</option>
          <option>curto e direto</option>
          <option>acolhedor e próximo</option>
        </select>
      </label>
      <button type="button" className={styles.generate} onClick={generate} disabled={loading}>{loading ? 'Criando mensagem...' : 'Criar rascunho'}</button>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </aside>
  );
}
