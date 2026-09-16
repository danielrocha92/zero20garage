import gerarTemplate from './api/gerar-template.js';

let callCount = 0;

globalThis.fetch = async () => {
  callCount += 1;
  const truncated = callCount === 1;
  return {
    ok: true,
    status: 200,
    json: async () => ({
      candidates: [{
        finishReason: truncated ? 'MAX_TOKENS' : 'STOP',
        content: {
          parts: [{
            text: truncated
              ? 'Olá {{nome_cliente}}, sua revisão está quase vencendo. Agende'
              : 'Olá {{nome_cliente}}, sua revisão está quase vencendo. Agende agora para evitar maiores problemas no seu {{veiculo}}.'
          }]
        }
      }]
    })
  };
};

process.env.GEMINI_API_KEY = 'test-key';
const req = {
  method: 'POST',
  body: { objetivo: 'lembrar revisão', tom: 'amigável e profissional' }
};
const res = {
  status(code) {
    this.code = code;
    return this;
  },
  json(payload) {
    this.payload = payload;
    return payload;
  }
};

await gerarTemplate(req, res);
console.log(JSON.stringify({ calls: callCount, status: res.code, payload: res.payload }));
