# 🚗 Zero 20 Garage

[![Vercel Status](https://vercelbadge.vercel.app/api/danielrocha92/zero20garage)](https://zero20garage.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node version](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)

**Solução digital completa para oficina mecânica e retífica de motores de precisão.**

Desenvolvido para representar a excelência técnica da **Zero 20 Garage**, integrando marketing institucional robusto, um portal informativo e um sistema administrativo avançado para gestão de orçamentos técnicos.

---

## 🔗 [Acesse o Projeto Online](https://zero20garage.com.br/)

---

## 🛠️ Stack Tecnológica

### Core Frontend
*   **React.js (18+)** — SPA robusta focada em performance e modularidade.
*   **React Router Dom (v7)** — Gerenciamento de rotas institucionais e administrativas protegidas.
*   **CSS Puro Modular** — Arquitetura de estilos dedicada e isolada por página/componente, sem frameworks externos (Bootstrap/Tailwind são proibidos), garantindo máxima performance de carregamento.
*   **Framer Motion** — Micro-animações e transições de página fluidas para uma experiência premium.
*   **Lucide React & React Icons** — Conjunto de ícones moderno e consistente.

### Backend & Serviços
*   **Firebase (Firestore & Storage)** — Banco de dados em tempo real para orçamentos, gerenciamento de mídias de marketing e armazenamento de evidências fotográficas dos veículos.
*   **Node.js & Express** — Backend especializado para processamento de lógica de negócio e geração de relatórios.

### Ferramentas de Utilitário
*   **jsPDF & XLSX** — Geração dinâmica de orçamentos técnicos em PDF e exportação de dados para Excel.
*   **Swiper.js** — Carrosséis modernos com efeitos Coverflow e Fade para banners de marketing e headers dinâmicos.
*   **React Helmet Async** — Otimização técnica de SEO on-page por rota (title, description, canonical, OG tags).
*   **Google Maps API** — Visualização de localização e prova social via avaliações.

---

## ✨ Funcionalidades em Destaque

### 🔍 SEO Técnico & Core Web Vitals
Refatoração completa voltada para ranqueamento local no Google:
*   **SEO On-Page:** `<title>` e `<meta description>` otimizados por página com palavras-chave locais (`revisão`, `manutenção automotiva`, `retífica de motores`, `Mairiporã-SP`).
*   **Schema Markup `AutoRepair`:** JSON-LD enriquecido com `name`, `telephone`, `address`, `geo`, `areaServed` (Mairiporã, Terra Preta, SP), `priceRange` e `openingHoursSpecification` — essencial para Google Maps e SEO Local.
*   **Hierarquia de Headings:** Um único `<h1>` por página com a keyword principal; `<h2>` e `<h3>` para seções de serviços, garantindo semântica correta para crawlers.
*   **Atributos `alt` descritivos:** Todas as imagens possuem textos alternativos ricos com contexto do serviço e localização.
*   **`loading="lazy"`:** Aplicado em todas as imagens abaixo da primeira dobra (below the fold) para otimizar o LCP e reduzir o tempo de carregamento inicial.
*   **Zero CSS Inline:** Política estrita — nenhum `style={{}}` nas páginas institucionais. Todos os estilos são definidos em arquivos CSS puros com classes semânticas.
*   **`<html lang="pt-BR">`:** Declaração de idioma correta para indexação geolocalizada.
*   **Tags `<link rel="canonical">`:** Presentes em todas as rotas para evitar conteúdo duplicado.

### 🏛️ Painel Administrativo de Precisão
O painel admin foi reprojetado para maximizar a produtividade no ambiente de oficina:
*   **Navegação Otimizada:** Menu superior intuitivo que libera espaço para visualização de tabelas e formulários complexos.
*   **Motor de Orçamentos:** Ferramenta avançada para criação de orçamentos de Motores e Cabeçotes, com suporte a itens dinâmicos e cálculos automáticos.
*   **Gestão de Mídia:** Upload direto de fotos do estado dos motores para anexar aos orçamentos, aumentando a transparência com o cliente.
*   **Painel Marketing Dinâmico:** Gestão completa de conteúdo visual (imagens e vídeos) para todas as páginas do site, com:
    *   **Cards agrupados por página** — Organização visual limpa com preview grande e mini-carrossel integrado.
    *   **Banners substituíveis** — Admin pode trocar a imagem de fundo de qualquer página (exceto Home, que é fixa de sistema) diretamente pelo painel.
    *   **Carrossel automático** — Ao adicionar 2+ banners na mesma página, um carrossel com efeito fade é ativado automaticamente no header correspondente.
    *   **Indicadores visuais** — Badges de status (⚙️ Sistema, 📌 Padrão, 🎠 Carrossel Ativo) para gestão intuitiva.

### 👤 Área do Cliente
*   **Consultas Simplificadas:** Interface limpa para os clientes visualizarem o status e detalhes de seus orçamentos.
*   **Design Responsivo:** Foco total na experiência mobile, permitindo que o cliente aprove orçamentos diretamente do celular com clareza.

### 📝 Conteúdo & Blog Profissional
*   **Central de Conhecimento:** Artigos técnicos sobre manutenção e retífica para educar o público e gerar autoridade.
*   **Engajamento:** Sistema de curtidas e visualizações integrado ao Firebase.
*   **SEO Local Estruturado:** Schema.org `AutoRepair` e dados amigáveis ao Google para destacar a oficina em pesquisas da região.

---

## 📂 Estrutura do Projeto

```bash
zero20garage/
├── public/                # Assets estáticos, index.html, robots.txt, sitemap.xml
│   └── index.html         # HTML base: lang="pt-BR", Schema AutoRepair JSON-LD, meta global
├── src/
│   ├── assets/            # Imagens técnicas, animações Lottie e vídeos
│   ├── components/        # Componentes atômicos e estruturais
│   │   ├── orcamento/     # Lógica do motor de orçamentos
│   │   ├── layout/        # Navegação global e administrativa
│   │   └── ui/            # Elementos de interface (Modais, Inputs, Botões)
│   ├── pages/             # Rotas (Home, Blog, Serviços, Admin, Cliente)
│   │   ├── home/          # H1 único + Helmet SEO + CSS sem inline styles
│   │   ├── servicos/      # H1/H2/H3 semânticos + Helmet por rota
│   │   ├── sobre/         # Alt descritivos + loading="lazy" + Helmet
│   │   ├── contato/       # H1 único + mapa embed sem style inline
│   │   └── orcamento/     # Formulário semântico + Helmet otimizado
│   ├── services/          # Camada de integração (Firebase, API)
│   ├── styles/            # CSS puro global e tokens de design
│   │   ├── GlobalStyles.css   # Variáveis CSS, reset, tipografia base
│   │   └── Home.css           # Estilos da home + classes semânticas SEO
│   ├── hooks/             # Lógica reutilizável (PDF, Auth, useMarketingMedia)
│   └── App.jsx            # Configuração principal da aplicação
└── package.json           # Dependências e scripts do projeto
```

---

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/danielrocha92/zero20garage.git
   cd zero20garage
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   Acesse: `http://localhost:3000`

---

## 🎨 Paleta Industrial (Identidade Visual)

A escolha cromática reflete a precisão e a confiança do setor automotivo:

| Cor | Hex | Conceito |
| :--- | :--- | :--- |
| **Preto Grafite** | `#0f0f0f` | Tecnologia e Profissionalismo |
| **Cinza Metálico** | `#b0b0b0` | Metais, Componentes e Precisão |
| **Vermelho Mecânico** | `#ff3b3b` | Potência, Velocidade e Call-to-Action |
| **Branco Neve** | `#f5f5f5` | Clareza e Limpeza nos Dados |

---

## 🔧 Padrões de Código

| Regra | Status |
| :--- | :--- |
| CSS Frameworks (Bootstrap/Tailwind) | ❌ Proibido |
| CSS Inline (`style={{}}`) nas páginas | ❌ Proibido |
| CSS puro com classes semânticas | ✅ Obrigatório |
| Um `<h1>` por página | ✅ Garantido |
| `alt` descritivo em todas as `<img>` | ✅ Garantido |
| `loading="lazy"` em imagens below-the-fold | ✅ Garantido |
| Schema `AutoRepair` JSON-LD | ✅ Implementado |

---

## 👨‍💻 Autor

**Daniel Rocha** — *Web Full-Stack Developer*

*   **🌐 Site:** [Rocha Tech Solutions](https://rocha-tech-solutions.vercel.app/)
*   **📫 LinkedIn:** [Daniel Rocha](https://www.linkedin.com/in/danielrocha92)

---

## 📄 Licença
Este projeto é distribuído sob a licença MIT.
