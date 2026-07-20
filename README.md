# Ryan Veículos — Site + Painel + Backend (Vercel)

Sistema completo: site público, painel administrativo e backend com banco de dados real.
Veículos, fotos e contatos ficam salvos no servidor — o que você cadastra no painel aparece para **todos** os visitantes.

## O que tem aqui

- `index.html` — site público
- `admin.html` — painel administrativo
- `api/` — backend (funções serverless da Vercel)
- `lib/` — banco de dados e dados iniciais de demonstração
- Fotos dos veículos vão para o **Vercel Blob**; dados vão para **Postgres (Neon)**

## Deploy rápido (2 passos — já funciona)

1. Suba TODOS os arquivos desta pasta para um repositório no GitHub (**Add file → Upload files**).
2. Em [vercel.com/new](https://vercel.com/new) → importe o repositório → Framework Preset: **Other** → **Deploy**.

Pronto, o site já abre e funciona. Sem o banco configurado ele roda em "modo local" (cada visitante vê os dados de demonstração; suas edições no painel ficam só no seu navegador — login: ryansoares744@gmail.com / admin123).

## Para ativar o banco de dados (dados iguais para todos)

### 1. Crie o banco de dados
No painel do projeto na Vercel → aba **Storage** → **Create Database** → **Neon (Postgres)** → aceite os padrões e conecte ao projeto.
Isso cria a variável `POSTGRES_URL` automaticamente.

### 2. Crie o armazenamento de fotos
Ainda em **Storage** → **Create Database** → **Blob** → conecte ao projeto.
Isso cria a variável `BLOB_READ_WRITE_TOKEN` automaticamente.

### 3. Defina o acesso do painel
No projeto → **Settings → Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `ADMIN_EMAIL` | ryansoares744@gmail.com |
| `ADMIN_PASSWORD` | *(crie uma senha forte)* |
| `AUTH_SECRET` | *(qualquer texto longo e aleatório)* |

### 4. Redeploy
Aba **Deployments** → menu ⋯ do último deploy → **Redeploy**.
Pronto: o site abre em `https://SEU-PROJETO.vercel.app` e o painel em `/admin`.

## Como funciona

- Primeiro acesso: o banco é criado e preenchido com os 7 veículos de demonstração.
- Painel (`/admin`): login com o e-mail/senha das variáveis acima. Tudo que você salvar (veículos, fotos, status, configurações) vale para todos os visitantes na hora.
- Fotos: comprimidas no navegador e enviadas ao Vercel Blob (JPG/PNG/WebP).
- Contatos: formulários e cliques em "Tenho interesse" gravam no banco e abrem o WhatsApp.
- Se trocar a senha nas Configurações do painel, ela passa a valer no lugar da `ADMIN_PASSWORD`.
- Restaurar demonstração: botão em Configurações (apaga tudo e volta ao estoque de exemplo).

## Limites do plano gratuito da Vercel
Suficientes para uma loja: banco Neon gratuito (0,5 GB), Blob 1 GB de fotos, tráfego generoso. SSL (https) já incluso.
