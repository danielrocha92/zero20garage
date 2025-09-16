# 🚗 Zero20 Garage ![Vercel](https://vercelbadge.vercel.app/api/danielrocha92/zero20garage)

**Site institucional para oficina mecânica e retífica de motores**  
💡 Desenvolvido para destacar a qualidade dos serviços da Zero 20 Garage, com foco em performance, design responsivo e experiência do usuário.

🔗 **[Acesse o site](https://zero20garage.vercel.app/)**

---

## 🛠️ Tecnologias Utilizadas

- **React.js** — SPA moderna e performática.
- **HTML5** — Estrutura semântica e acessível.
- **CSS3** — Design responsivo com estilização modular.
- **Integração com API externa** — Consumo da [zero20garage-api-orcamentos](https://github.com/danielrocha92/zero20garage-api-orcamentos).
- **Autenticação** — Painel administrativo protegido via login.
- **Gerenciamento de agendamentos** — Integração e visualização de dados em painel.

---

## 🎯 Propósito do Projeto

Criar uma presença digital profissional para a **Zero20 Garage**, destacando:

✅ Serviços especializados de retífica e manutenção de motores.  
✅ Processo técnico apresentado com infográficos e animações.  
✅ Diferenciais competitivos da oficina.  
✅ Canal direto de contato via WhatsApp.

---

## ✨ Novas Funcionalidades

- **Integração de API de orçamentos**: Solicite orçamentos online e acompanhe o status dos pedidos diretamente no site.
- **Autenticação de usuários**: Login seguro para acesso ao painel administrativo e funcionalidades restritas.
- **Melhorias no blog**: Busca por conteúdo, filtros e categorias para facilitar o acesso às informações.
- **Novos depoimentos e avaliações**: Seção ampliada com opiniões de clientes em diversos formatos.
- **Sistema de agendamento online**: Agende serviços diretamente pelo site, com confirmação automática e integração ao painel.
- **Dashboard para clientes**: Área exclusiva para acompanhamento de serviços, histórico de agendamentos e comunicação.

---

## 🖼️ Estrutura do Projeto

site-institucional/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── assets/            # Imagens e fontes
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas principais
│   ├── App.js             # Componente raiz
│   ├── index.js           # Entrada do React
│   ├── styles/            # CSS modularizado
│   ├── data.js            # Conteúdo institucional
│   ├── api/               # Integração com API de orçamentos
│   ├── auth/              # Autenticação e painel administrativo
│   ├── booking/           # Sistema de agendamentos
│   ├── dashboard/         # Área do Admin
└── package.json

---

## 🖌️ Wireframe Conceitual

| LOGO             | MENU (Sobre, Serviços, Blog, Login) |

| HERO: Título impactante + CTA (WhatsApp)        |
| + animação Lottie (motor/pistão)                |

| SOBRE: Texto + imagem da equipe/oficina         |

| SERVIÇOS: Ícones + descrição (Retífica, etc.)   |

| ORÇAMENTO ONLINE: Formulário integrado à API    |

| PROCESSO: Timeline + animação                   |

| DIFERENCIAIS: Ícones + textos curtos            |

| BLOG: Cards com imagem + título + link + busca  |

| DEPOIMENTOS: Fotos + nome + opinião             |

| AGENDAMENTO: Formulário + calendário            |

| DASHBOARD: Histórico do cliente + notificações  |

| CONTATO: Mapa + formulário + botões flutuantes  |

| RODAPÉ: Links rápidos + redes sociais + CNPJ    |

---

## 🎨 Paleta Industrial

| Cor                  | Código   | Uso                                  |
| -------------------- | -------- | ------------------------------------ |
| Preto Grafite        | #212121  | Fundo principal                      |
| Cinza Metálico       | #B0BEC5  | Elementos, textos secundários        |
| Vermelho Mecânico    | #D32F2F  | Botões, CTAs (ações principais)      |
| Branco               | #FFFFFF  | Contraste e destaques                |

**Por que essas cores?**  
🔴 Vermelho: velocidade e potência.  
⚪ Cinza: metal e tecnologia.

---

## 🚀 Como Rodar Localmente

Clone o repositório:

```bash
git clone https://github.com/danielrocha92/zero20garage.git
cd zero20garage
npm install
npm start
```
Acesse: http://localhost:3000

⸻

📦 Scripts Disponíveis
- npm start — Executa em modo desenvolvimento.
- npm test — Roda os testes interativos.
- npm run build — Compila para produção.
- npm run eject — Exibe as configurações do CRA.

⸻

✨ Funcionalidades em Destaque

✅ Animação Lottie integrada no Hero e processo.  
✅ Design responsivo: mobile, tablet e desktop.  
✅ Contato rápido: botão fixo de WhatsApp.  
✅ Blog institucional: dicas e informações sobre retífica.  
✅ Infográfico do processo: educativo e visual.  
✅ Integração com API de orçamentos.  
✅ Sistema de agendamento online.  
✅ Dashboard do cliente.  
✅ Login para painel administrativo.

⸻

🌱 Aprendizados e Práticas Aplicadas
- Arquitetura de componentes reutilizáveis.
- Organização modular de estilos.
- Integração de animações JSON com React.
- Deploy contínuo na Vercel.
- Acessibilidade e boas práticas de UX/UI.
- Consumo seguro de APIs REST.
- Autenticação e gerenciamento de sessões.
- Desenvolvimento de dashboards e agendamento online.

⸻

👨‍💻 Autor

Daniel Rocha  
Front-End Developer apaixonado por criar experiências digitais impactantes.

📫 LinkedIn  
[Daniel Rocha](https://www.linkedin.com/in/danielrocha92)

⸻

🚧 Próximos Passos
- Implementar testes unitários com Jest.
- SEO técnico: otimização de metatags.
- Melhorar acessibilidade (a11y) com ARIA.
- Testes automatizados de integração das novas funcionalidades.
- Evoluir o painel do cliente com notificações em tempo real.

⸻

📄 Licença

Este projeto está sob a licença MIT.

---
