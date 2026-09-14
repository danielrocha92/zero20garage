# Tutorial de uso - Zero20 Garage

## 1. Acesso ao sistema

1. Abra o endereço publicado na Vercel.
2. Acesse **Login**.
3. Informe suas credenciais.
4. Após a autenticação, use o menu **Orçamentos** para acessar as ferramentas administrativas.

As rotas administrativas são protegidas e redirecionam para o login quando não existe uma sessão válida.

## 2. Criar uma ordem de serviço

1. Abra **Painel de Orçamentos**.
2. Escolha o tipo de orçamento:
   - Motor Completo
   - Cabeçote
   - Serviços Diversos
   - Troca de Óleo
3. Preencha os dados do cliente, veículo, placa, telefone e OS.
4. Selecione o **Perfil de uso**:
   - **Padrão**: uso particular e rotina regular.
   - **Uso Severo/Aplicativo**: alta quilometragem ou uso profissional.
5. Selecione peças e serviços e preencha os valores.
6. Clique em **Salvar Orçamento**.

Ao salvar uma OS, o sistema cria o plano inicial das três revisões e sincroniza os dados com o Firestore.

## 3. Emitir o certificado e o plano de revisão

1. No painel, clique em **Termo Garantia**.
2. Busque a OS por cliente, placa ou número da OS.
3. Clique em **Selecionar**.
4. Revise os dados e os serviços.
5. Clique em **Baixar Certificado de Garantia (PDF)**.

O PDF contém:

- Certificado de garantia.
- Plano de revisão/troca de óleo.
- Via do cliente.
- Via da oficina.
- Três blocos de revisão com KM, valor e assinatura/carimbo.

O arquivo é salvo no formato:

```text
Garantia_PDR_NomeDoCliente_OS.pdf
```

## 4. Acompanhar retornos no painel de trocas

1. Acesse `/trocas`.
2. Consulte as revisões atrasadas ou próximas do vencimento.
3. Confira cliente, veículo, OS, KM previsto e data limite.
4. Quando o cliente comparecer, clique em **Registrar comparecimento**.
5. O status da revisão será atualizado para `realizada`.

## 5. Usar o CRM de campanhas

1. Acesse `/crm-campanhas`.
2. Use os filtros:
   - Período de conclusão da OS.
   - Status da revisão.
   - Perfil de uso.
   - Tipo de serviço.
3. Selecione os clientes na tabela.
4. Use o checkbox do cabeçalho para selecionar ou remover todos os clientes filtrados.

A tabela exibe:

- Cliente.
- Veículo.
- Telefone.
- Status da revisão.
- Último contato.

## 6. Criar e usar templates de campanha

1. No editor, escreva a mensagem.
2. Para inserir dados automáticos, clique em um chip:
   - `{{nome_cliente}}`
   - `{{veiculo}}`
   - `{{placa}}`
   - `{{os_numero}}`
   - `{{data_limite}}`
3. O chip é inserido na posição atual do cursor.
4. Para salvar a mensagem, informe um nome em **Novo template**.
5. Clique em **Salvar template**.
6. Para reutilizar um template, escolha-o em **Template salvo**.

As variáveis são substituídas individualmente para cada cliente no momento do disparo.

## 7. Disparar uma campanha

1. Selecione pelo menos um cliente.
2. Confirme o texto da mensagem.
3. Clique em **Disparar Campanha**.
4. O sistema envia o payload para `/api/webhook-campanha`.
5. O proxy encaminha a campanha ao webhook externo.
6. Depois do retorno bem-sucedido, o sistema grava o log no Firestore:

```js
{
  data_disparo: "timestamp ISO",
  tipo_campanha: "Nome do template",
  status: "enviado"
}
```

7. A coluna **Último Contato** é atualizada imediatamente.

## 8. Configurar o webhook na Vercel

No projeto da Vercel, abra **Settings > Environment Variables** e crie:

```text
N8N_CAMPANHA_WEBHOOK_URL=https://seu-n8n.example/webhook/campanha
```

Configure a variável nos ambientes necessários, normalmente **Production** e **Preview**, e faça um novo deploy.

Não coloque a URL do n8n em componentes React nem em variáveis `REACT_APP_*`. O navegador deve chamar somente:

```text
/api/webhook-campanha
```

## 9. Boas práticas operacionais

- Confirme telefone e consentimento do cliente antes do disparo.
- Faça uma campanha pequena de teste antes de selecionar toda a base.
- Use filtros específicos para evitar mensagens fora do contexto.
- Não apague logs de contato manualmente.
- Se o disparo falhar, verifique primeiro a variável `N8N_CAMPANHA_WEBHOOK_URL` e os logs da função da Vercel.
