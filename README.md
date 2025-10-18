🚗 Zero20 Garage
Site institucional para oficina mecânica e retífica de motores
💡 Desenvolvido para destacar a qualidade dos serviços da Zero 20 Garage, com foco em performance, design responsivo e experiência do usuário.
🔗 Acesse o site
🛠️ Tecnologias Utilizadas
 * React.js — SPA moderna e performática.
 * Node.js & Express — Backend robusto para a API de orçamentos.
 * HTML5 — Estrutura semântica e acessível.
 * CSS3 — Design responsivo com estilização modular.
 * Firebase (Firestore) — Banco de dados NoSQL para interatividade do blog (views, likes).
 * Framer Motion — Animações e transições de página fluidas.
 * jsPDF & XLSX — Exportação de dados para PDF e Excel.
🎯 Propósito do Projeto
Criar uma presença digital profissional para a Zero20 Garage, destacando:
✅ Serviços especializados de retífica e manutenção de motores.
✅ Processo técnico apresentado com infográficos e animações.
✅ Diferenciais competitivos da oficina.
✅ Canal direto de contato via WhatsApp.
✅ Painel administrativo para criação, gestão e exportação de orçamentos.
🖼️ Estrutura do Projeto
site-institucional/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── assets/            # Imagens e fontes
│   ├── components/
│   │   ├── orcamento/     # Componentes da funcionalidade de orçamento
│   │   └── ui/            # Componentes de UI genéricos (botões, modais)
│   ├── dados/             # Mock de dados e configurações
│   ├── hooks/             # Hooks customizados (usePdfGenerator, etc.)
│   ├── pages/             # Componentes de página (rotas)
│   ├── services/          # Configuração de serviços (Firebase)
│   ├── styles/            # Arquivos CSS centralizados
│   ├── App.jsx            # Componente raiz e gerenciador de rotas
└── package.json

🖌️ Wireframe Conceitual
| LOGO | MENU (Sobre, Serviços, Blog) |
|---|---|
| HERO: Título impactante + CTA (WhatsApp) |  |
| + animação Lottie (motor/pistão) |  |
| SOBRE: Texto + imagem da equipe/oficina |  |
| SERVIÇOS: Ícones + descrição (Retífica, etc.) |  |
| PROCESSO: Timeline + animação |  |
| DIFERENCIAIS: Ícones + textos curtos |  |
| BLOG: Cards com imagem + título + link |  |
| DEPOIMENTOS: Fotos + nome + opinião |  |
| CONTATO: Mapa + formulário + botões flutuantes |  |
| RODAPÉ: Links rápidos + redes sociais + CNPJ |  |
🎨 Paleta Industrial
| Cor | Código | Uso |
|---|---|---|
| Preto Grafite | #212121 | Fundo principal |
| Cinza Metálico | #B0BEC5 | Elementos, textos secundários |
| Vermelho Mecânico | #D32F2F | Botões, CTAs (ações principais) |
| Branco | #FFFFFF | Contraste e destaques |
Por que essas cores?
🔴 Vermelho: velocidade e potência.
⚪ Cinza: metal e tecnologia.
🚀 Como Rodar Localmente
Clone o repositório:
git clone https://github.com/danielrocha92/zero20garage.git
cd zero20garage
npm install
npm start

Acesse: http://localhost:3000
⸻
📦 Scripts Disponíveis
 * npm start — Executa em modo desenvolvimento.
 * npm test — Roda os testes interativos.
 * npm run build — Compila para produção.
 * npm run eject — Exibe as configurações do CRA.
⸻
✨ Funcionalidades em Destaque
✅ Painel Administrativo Completo:
 * Autenticação de usuário com rotas protegidas.
 * Criação e edição de orçamentos detalhados (Motor e Cabeçote).
 * Histórico de orçamentos com paginação infinita.
 * Upload de imagens associadas a cada orçamento.
 * Exportação de relatórios em PDF e Excel.
✅ Blog Interativo:
 * Integração com Firebase para contagem de visualizações e curtidas.
 * Componente de compartilhamento em redes sociais.
✅ Experiência de Usuário Aprimorada:
 * Animações e transições de página com Framer Motion.
 * Design totalmente responsivo (mobile, tablet, desktop).
 * Componentes de UI reutilizáveis, como modais, carrossel e botões.
   ⸻
🌱 Principais Aprendizados Técnicos
Esta experiência proporcionou lições que vão muito além de "construir um site", tocando em pontos de arquitetura de software, integração de sistemas e ferramentas de nível empresarial.
 * Arquitetura de Backend Híbrida:
   * API Customizada (Node.js/Express): Para controle total sobre a lógica de negócios (cálculos de orçamento, uploads, relatórios).
   * BaaS (Firebase/Firestore): Para interatividade rápida e em tempo real (views e likes do blog), delegando a infraestrutura.
   * Lição: A escolha da ferramenta certa (API customizada vs. BaaS) para a tarefa certa.
 * Aplicação como "Sistema Duplo":
   * Portal Público (Marketing): Foco em performance, UX visual (Framer Motion) e captação.
   * Painel Admin (SaaS Interno): Foco em segurança (rotas protegidas), gerenciamento de estado e funcionalidade (CRUD, PDF/Excel).
   * Lição: A tecnologia para vender um serviço é muito diferente da tecnologia para gerenciá-lo.
 * A Diferença entre UI e UX (com Framer Motion):
   * Lição: O uso de animações não é estético, mas funcional. Transições de página suaves (SPA) e feedback tátil (botões) gerenciam a percepção de velocidade do usuário.
 * Tradução de Dados para o Mundo Real (PDF/Excel):
   * Lição: O valor da engenharia de dados aplicada. A complexidade de "traduzir" dados internos (JSON/React state) em documentos de negócio (PDFs) e planilhas de análise (XLSX) é uma habilidade corporativa valiosa.
 * Poder da Arquitetura de Componentes e Hooks:
   * Lição: A manutenibilidade do código em um projeto grande depende de isolar a lógica (Hooks customizados, como usePdfGenerator) da visualização (componentes reutilizáveis), seguindo as práticas idiomáticas do React.
 * Práticas de DevOps e Acessibilidade:
   * Implementação de deploy contínuo (CI/CD) com a Vercel.
   * Aplicação de boas práticas de acessibilidade (a11y) e HTML semântico.
⸻
👨‍💻 Autor
Daniel Rocha
Front-End Developer apaixonado por criar experiências digitais impactantes.
 * 🌐 Site: Rocha Tech Solutions
 * 📫 LinkedIn: Daniel Rocha
⸻
🚧 Próximos Passos
 * Implementar testes unitários com Jest e React Testing Library.
 * Otimizar o SEO técnico com sitemap.xml e robots.txt.
 * Refatorar componentes grandes para hooks customizados, melhorando a legibilidade.
⸻
📄 Licença
Este projeto está sob a licença MIT.
