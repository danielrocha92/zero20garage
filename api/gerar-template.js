const allowedVariables = '{{nome_cliente}}, {{veiculo}}, {{placa}}, {{os_numero}}, {{data_limite}}';

export default async function gerarTemplate(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return response.status(500).json({ error: 'Gerador de IA não configurado. Defina GEMINI_API_KEY no ambiente local (.env.local) ou nas variáveis da Vercel.' });
  const { objetivo, tom } = request.body || {};
  if (typeof objetivo !== 'string' || !objetivo.trim()) return response.status(400).json({ error: 'Informe o objetivo da mensagem.' });

  try {
    const model = (process.env.GEMINI_MODEL || 'gemini-2.5-flash').replace(/^models\//, '');
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{
            text: `Você cria mensagens curtas de pós-venda para uma oficina mecânica brasileira. Escreva em português do Brasil, sem markdown, sem promessas indevidas e com chamada clara para ação. Use somente estas variáveis exatamente como estão quando fizer sentido: ${allowedVariables}. Não invente descontos, datas ou serviços.`,
          }],
        },
        contents: [{
          role: 'user',
          parts: [{
            text: `Objetivo: ${objetivo.trim()}\nTom: ${typeof tom === 'string' ? tom : 'amigável e profissional'}`,
          }],
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        },
      }),
    });
    const data = await aiResponse.json();
    if (!aiResponse.ok) {
      const providerMessage = data.error?.message || '';
      console.error('Gemini recusou a geração do template:', {
        status: aiResponse.status,
        message: providerMessage,
      });
      if (aiResponse.status === 400) {
        return response.status(502).json({ error: 'O modelo Gemini ou os dados enviados não são válidos. Verifique GEMINI_MODEL na Vercel.' });
      }
      if (aiResponse.status === 401 || aiResponse.status === 403) {
        return response.status(502).json({ error: 'A chave do Gemini foi recusada. Confirme se ela pertence à Gemini API e se a API está habilitada.' });
      }
      if (aiResponse.status === 429) {
        return response.status(502).json({ error: 'A cota gratuita do Gemini foi atingida. Aguarde ou verifique os limites do projeto Google.' });
      }
      return response.status(502).json({ error: 'O Gemini está indisponível no momento. Consulte os logs da função na Vercel.' });
    }
    const mensagem = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!mensagem) return response.status(502).json({ error: 'A IA retornou uma mensagem vazia.' });
    return response.status(200).json({ mensagem });
  } catch (error) {
    console.error('Erro ao gerar template com IA:', error);
    return response.status(502).json({ error: 'Falha ao conectar ao serviço de IA.' });
  }
}
