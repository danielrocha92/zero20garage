import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const allowedVariables = '{{nome_cliente}}, {{veiculo}}, {{placa}}, {{os_numero}}, {{data_limite}}';

function getLocalEnvironmentValue(name) {
  if (process.env.NODE_ENV === 'production') return '';
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return '';
  const line = readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(`${name}=`));
  return line ? line.slice(name.length + 1).trim().replace(/^['"]|['"]$/g, '') : '';
}

export default async function gerarTemplate(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  const apiKey = process.env.GEMINI_API_KEY || getLocalEnvironmentValue('GEMINI_API_KEY');
  if (!apiKey) return response.status(500).json({ error: 'Gerador de IA não configurado. Defina GEMINI_API_KEY no ambiente local (.env.local) ou nas variáveis da Vercel.' });
  const { objetivo, tom } = request.body || {};
  if (typeof objetivo !== 'string' || !objetivo.trim()) return response.status(400).json({ error: 'Informe o objetivo da mensagem.' });

  try {
    const model = (process.env.GEMINI_MODEL || getLocalEnvironmentValue('GEMINI_MODEL') || 'gemini-3.6-flash').replace(/^models\//, '');
    const basePrompt = `Você cria mensagens curtas e completas de pós-venda para uma oficina mecânica brasileira. Escreva em português do Brasil, sem markdown e sem promessas indevidas. Sempre conclua todas as frases, termine a mensagem com uma chamada clara para ação e escreva entre 2 e 4 frases. Use somente estas variáveis exatamente como estão quando fizer sentido: ${allowedVariables}. Não invente descontos, datas ou serviços.`;
    const userPrompt = `Objetivo: ${objetivo.trim()}\nTom: ${typeof tom === 'string' ? tom : 'amigável e profissional'}`;
    let aiResponse;
    let data;
    let lastFinishReason = '';
    let lastMessage = '';

    for (let attempt = 0; attempt < 3; attempt += 1) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{
              text: attempt === 0
                ? basePrompt
                : `${basePrompt} A resposta anterior foi cortada antes do fim da frase. Responda novamente com 2 a 4 frases completas, sem deixar uma frase pela metade, e termine com uma CTA clara.`,
            }],
          },
          contents: [{
            role: 'user',
            parts: [{
              text: userPrompt,
            }],
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400 + (attempt * 200),
          },
        }),
      };

      aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, requestOptions);
      data = await aiResponse.json();
      lastFinishReason = data.candidates?.[0]?.finishReason || '';
      lastMessage = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim() || '';

      if (aiResponse.status !== 503 && lastFinishReason !== 'MAX_TOKENS') break;
      if (attempt === 2) break;
      await new Promise((resolveRetry) => setTimeout(resolveRetry, 500 * (attempt + 1)));
    }

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
      if (aiResponse.status === 404) {
        return response.status(502).json({ error: `O modelo Gemini configurado não foi encontrado (${model}). Verifique GEMINI_MODEL.` });
      }
      if (aiResponse.status === 503) {
        return response.status(502).json({ error: 'O Gemini está temporariamente sobrecarregado. Aguarde alguns segundos e tente novamente.' });
      }
      return response.status(502).json({
        error: providerMessage
          ? `O Gemini recusou a solicitação (${aiResponse.status}): ${providerMessage}`
          : 'O Gemini está indisponível no momento. Consulte os logs da função.',
      });
    }

    if (!lastMessage) return response.status(502).json({ error: 'A IA retornou uma mensagem vazia.' });
    if (lastFinishReason === 'MAX_TOKENS') {
      return response.status(502).json({ error: 'A IA cortou a resposta antes de concluir a frase. Tente novamente com uma solicitação mais curta.' });
    }
    if (!/[.!?]$/.test(lastMessage.trim())) {
      return response.status(502).json({ error: 'A IA gerou uma mensagem incompleta. Tente novamente.' });
    }

    return response.status(200).json({ mensagem: lastMessage });
  } catch (error) {
    console.error('Erro ao gerar template com IA:', error);
    return response.status(502).json({ error: 'Falha ao conectar ao serviço de IA.' });
  }
}
