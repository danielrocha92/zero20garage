export default async function webhookCampanha(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Método não permitido.' });
  const webhookUrl = process.env.N8N_CAMPANHA_WEBHOOK_URL;
  if (!webhookUrl) return response.status(500).json({ error: 'Webhook de campanha não configurado.' });
  try {
    const externalResponse = await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(request.body) });
    const body = await externalResponse.text();
    return response.status(externalResponse.status).send(body);
  } catch (error) {
    console.error('Erro no proxy do webhook de campanha:', error);
    return response.status(502).json({ error: 'Falha ao conectar ao webhook externo.' });
  }
}
