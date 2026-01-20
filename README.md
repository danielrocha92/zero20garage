<h1>🚗 Zero20 Garage <img src="https://vercelbadge.vercel.app/api/danielrocha92/zero20garage" alt="Vercel Status"></h1>

<p><strong>Site institucional para oficina mecânica e retífica de motores</strong><br>
💡 Desenvolvido para destacar a qualidade dos serviços da Zero 20 Garage, com foco em performance, design responsivo e experiência do usuário.</p>

<p>🔗 <strong><a href="https://zero20garage.vercel.app/">Acesse o site</a></strong></p>

<hr>

<h2>🛠️ Tecnologias Utilizadas</h2>

<ul>
    <li><strong>React.js</strong> &mdash; SPA moderna e performática.</li>
    <li><strong>Node.js &amp; Express</strong> &mdash; Backend robusto para a API de orçamentos.</li>
    <li><strong>HTML5</strong> &mdash; Estrutura semântica e acessível.</li>
    <li><strong>CSS3</strong> &mdash; Design responsivo com estilização modular.</li>
    <li><strong>Firebase (Firestore & Storage)</strong> &mdash; Banco de dados e armazenamento de imagens para orçamentos.</li>
    <li><strong>Framer Motion</strong> &mdash; Animações e transições de página fluidas.</li>
    <li><strong>React Helmet Async</strong> &mdash; Otimização avançada de SEO e Meta Tags.</li>
    <li><strong>Google Maps API</strong> &mdash; Integração de mapas com avaliações.</li>
    <li><strong>jsPDF &amp; XLSX</strong> &mdash; Exportação de dados e orçamentos para PDF e Excel.</li>
</ul>

<hr>

<h2>🎯 Propósito do Projeto</h2>

<p>Criar uma presença digital profissional para a <strong>Zero20 Garage</strong>, destacando:</p>

<ul>
    <li>✅ Serviços especializados de retífica e manutenção de motores.</li>
    <li>✅ Processo técnico apresentado com infográficos e animações.</li>
    <li>✅ Diferenciais competitivos da oficina.</li>
    <li>✅ Canal direto de contato via WhatsApp.</li>
    <li>✅ <strong>Painel administrativo</strong> para criação, gestão e exportação de orçamentos.</li>
</ul>

<hr>

<h2>🖼️ Estrutura do Projeto</h2>

<pre><code>site-institucional/
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
</code></pre>

<hr>

<h2>🖌️ Wireframe Conceitual</h2>

<table style="width:100%; border-collapse: collapse;" border="1">
    <thead>
        <tr>
            <th style="padding: 8px; text-align: left;">Estrutura da Página (Layout de Cima para Baixo)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 8px;"><strong>HEADER:</strong> <code>LOGO</code> <code>MENU (Sobre, Serviços, Blog)</code></td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>HERO:</strong> Título impactante + CTA (WhatsApp) + Animação Lottie</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>SOBRE:</strong> Texto + Imagem da equipe/oficina</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>SERVIÇOS:</strong> Ícones + Descrição (Retífica, etc.)</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>PROCESSO:</strong> Timeline + Animação</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>DIFERENCIAIS:</strong> Ícones + Textos curtos</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>BLOG:</strong> Cards com imagem + Título + Link</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>DEPOIMENTOS:</strong> Fotos + Nome + Opinião</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>CONTATO:</strong> Mapa + Formulário + Botões flutuantes</td>
        </tr>
        <tr>
            <td style="padding: 8px;"><strong>RODAPÉ:</strong> Links rápidos + Redes sociais + CNPJ</td>
        </tr>
    </tbody>
</table>

<hr>

<h2>🎨 Paleta Industrial</h2>

<table style="width:100%; border-collapse: collapse;" border="1">
    <thead>
        <tr>
            <th style="padding: 8px; text-align: left;">Cor</th>
            <th style="padding: 8px; text-align: left;">Código</th>
            <th style="padding: 8px; text-align: left;">Uso</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="padding: 8px;">Preto Grafite</td>
            <td style="padding: 8px;"><code>#212121</code></td>
            <td style="padding: 8px;">Fundo principal</td>
        </tr>
        <tr>
            <td style="padding: 8px;">Cinza Metálico</td>
            <td style="padding: 8px;"><code>#B0BEC5</code></td>
            <td style="padding: 8px;">Elementos, textos secundários</td>
        </tr>
        <tr>
            <td style="padding: 8px;">Vermelho Mecânico</td>
            <td style="padding: 8px;"><code>#D32F2F</code></td>
            <td style="padding: 8px;">Botões, CTAs (ações principais)</td>
        </tr>
        <tr>
            <td style="padding: 8px;">Branco</td>
            <td style="padding: 8px;"><code>#FFFFFF</code></td>
            <td style="padding: 8px;">Contraste e destaques</td>
        </tr>
    </tbody>
</table>

<p><strong>Por que essas cores?</strong><br>
🔴 Vermelho: velocidade e potência.<br>
⚪ Cinza: metal e tecnologia.</p>

<hr>

<h2>🚀 Como Rodar Localmente</h2>

<p>Clone o repositório:</p>

<pre><code>git clone https://github.com/danielrocha92/zero20garage.git
cd zero20garage
npm install
npm start
</code></pre>

<p>Acesse: <code>http://localhost:3000</code></p>

<p>⸻</p>

<h3>📦 Scripts Disponíveis</h3>
<ul>
    <li><code>npm start</code> &mdash; Executa em modo desenvolvimento.</li>
    <li><code>npm test</code> &mdash; Roda os testes interativos.</li>
    <li><code>npm run build</code> &mdash; Compila para produção.</li>
    <li><code>npm run eject</code> &mdash; Exibe as configurações do CRA.</li>
</ul>

<p>⸻</p>

<h2>✨ Funcionalidades em Destaque</h2>

<p>✅ <strong>Painel Administrativo Completo:</strong></p>
<ul>
    <li>Autenticação de usuário com rotas protegidas.</li>
    <li>Criação e edição de orçamentos detalhados (Motor e Cabeçote).</li>
    <li>Histórico de orçamentos com paginação infinita.</li>
    <li>Upload de imagens associadas a cada orçamento.</li>
    <li>Exportação de relatórios em PDF e Excel.</li>
    <li><strong>Novo:</strong> Módulo de Termo de Garantia com geração de certificados em PDF.</li>
</ul>

<p>✅ <strong>Blog e Conteúdo:</strong></p>
<ul>
    <li>Integração com Firebase para contagem de visualizações e curtidas.</li>
    <li>Padronização visual com CSS Modules (sem estilos inline).</li>
    <li>Componente de compartilhamento em redes sociais.</li>
</ul>

<p>✅ <strong>SEO & Visibilidade (Novo):</strong></p>
<ul>
    <li>Dados estruturados (Schema.org) para Local Business (Google Maps).</li>
    <li>Preload de imagens LCP para performance mobile e desktop.</li>
    <li>Open Graph e Twitter Cards configurados para redes sociais.</li>
</ul>

<p>✅ <strong>Experiência de Usuário Aprimorada:</strong></p>
<ul>
    <li>Animações e transições de página com Framer Motion.</li>
    <li>Design totalmente responsivo (mobile, tablet, desktop).</li>
    <li>Componentes de UI reutilizáveis, como modais, carrossel e botões.</li>
</ul>

<p>⸻</p>

<h2>🌱 Principais Aprendizados Técnicos</h2>

<p>Esta experiência proporcionou lições que vão muito além de "construir um site", tocando em pontos de arquitetura de software, integração de sistemas e ferramentas de nível empresarial.</p>

<ol>
    <li>
        <p><strong>Arquitetura de Backend Híbrida:</strong></p>
        <ul>
            <li><strong>API Customizada (Node.js/Express):</strong> Para controle total sobre a lógica de negócios (cálculos de orçamento, uploads, relatórios).</li>
            <li><strong>BaaS (Firebase/Firestore):</strong> Para interatividade rápida e em tempo real (views e likes do blog), delegando a infraestrutura.</li>
            <li><strong>Lição:</strong> A escolha da ferramenta certa (API customizada vs. BaaS) para a tarefa certa.</li>
        </ul>
    </li>
    <li>
        <p><strong>Aplicação como "Sistema Duplo":</strong></p>
        <ul>
            <li><strong>Portal Público (Marketing):</strong> Foco em performance, UX visual (Framer Motion) e captação.</li>
            <li><strong>Painel Admin (SaaS Interno):</strong> Foco em segurança (rotas protegidas), gerenciamento de estado e funcionalidade (CRUD, PDF/Excel).</li>
            <li><strong>Lição:</strong> A tecnologia para <em>vender</em> um serviço é muito diferente da tecnologia para <em>gerenciá-lo</em>.</li>
        </ul>
    </li>
    <li>
        <p><strong>A Diferença entre UI e UX (com Framer Motion):</strong></p>
        <ul>
            <li><strong>Lição:</strong> O uso de animações não é estético, mas funcional. Transições de página suaves (SPA) e feedback tátil (botões) gerenciam a <em>percepção de velocidade</em> do usuário.</li>
        </ul>
    </li>
    <li>
        <p><strong>Tradução de Dados para o Mundo Real (PDF/Excel):</strong></p>
        <ul>
            <li><strong>Lição:</strong> O valor da engenharia de dados aplicada. A complexidade de "traduzir" dados internos (JSON/React state) em documentos de negócio (PDFs) e planilhas de análise (XLSX) é uma habilidade corporativa valiosa.</li>
        </ul>
    </li>
    <li>
        <p><strong>Poder da Arquitetura de Componentes e Hooks:</strong></p>
        <ul>
            <li><strong>Lição:</strong> A manutenibilidade do código em um projeto grande depende de isolar a lógica (Hooks customizados, como <code>usePdfGenerator</code>) da visualização (componentes reutilizáveis), seguindo as práticas idiomáticas do React.</li>
        </ul>
    </li>
    <li>
        <p><strong>Práticas de DevOps e Acessibilidade:</strong></p>
        <ul>
            <li>Implementação de deploy contínuo (CI/CD) com a Vercel.</li>
            <li>Aplicação de boas práticas de acessibilidade (a11y) e HTML semântico.</li>
        </ul>
    </li>
</ol>

<p>⸻</p>

<h2>👨‍💻 Autor</h2>

<p><strong>Daniel Rocha</strong><br>
Developer Web Full-Stack apaixonado por criar experiências digitais impactantes.</p>

<ul>
    <li><strong>🌐 Site:</strong> <a href="https://rocha-tech-solutions.vercel.app/">Rocha Tech Solutions</a></li>
    <li><strong>📫 LinkedIn:</strong> <a href="https://www.linkedin.com/in/danielrocha92">Daniel Rocha</a></li>
</ul>

<p>⸻</p>

<h2>🚧 Próximos Passos</h2>
    <li>Implementar testes unitários com <strong>Jest</strong> e <strong>React Testing Library</strong>.</li>
    <li>Expandir automação de testes E2E (End-to-End).</li>
    <li>Refatorar componentes grandes para hooks customizados.</li>
</ul>

<p>⸻</p>

<h2>📄 Licença</h2>

<p>Este projeto está sob a licença MIT.</p>

