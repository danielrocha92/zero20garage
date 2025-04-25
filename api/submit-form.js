export default function handler(req, res) {
    if (req.method === 'POST') {
      const { nome, email, telefone, servico, mensagem } = req.body;
  
      // Aqui você pode salvar no banco, enviar por e-mail, etc.
      console.log('Nova solicitação de orçamento:', {
        nome, email, telefone, servico, mensagem
      });
  
      return res.status(200).json({ success: true });
    }
  
    res.status(405).json({ error: 'Método não permitido' });
  }
  