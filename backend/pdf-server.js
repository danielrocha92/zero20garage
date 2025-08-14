// backend/pdf-server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve assets do front (ajuste caminho se necessário)
app.use('/assets', express.static(path.join(__dirname, '..', 'src', 'assets')));

// templates em backend/templates
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

app.post('/api/orcamento/pdf', async (req, res) => {
  try {
    const orcamento = req.body.orcamento;
    if (!orcamento) return res.status(400).send('Falta orcamento no body');

    const html = await ejs.renderFile(path.join(__dirname, 'templates', 'orcamento.ejs'), { orcamento });

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(150); // leve delay para garantir render

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=orcamento_${orcamento.ordemServico || 'semOS'}.pdf`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error('Erro gerar PDF:', err);
    res.status(500).send('Erro ao gerar PDF');
  }
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`PDF service rodando na porta ${PORT}`));
