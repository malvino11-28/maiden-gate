<p align="center">
  <b>Português</b> | <a href="README.en.md">English</a>
</p>

<h1 align="center">Maiden Gate</h1>

<p align="center">
  Plataforma web full stack de suporte para campanhas do RPG de mesa autoral <strong>Voice Of Flower: Awakening of the Maiden</strong>.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-111827?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-111827?style=for-the-badge&logo=typescript&logoColor=3178C6" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-111827?style=for-the-badge&logo=vite&logoColor=646CFF" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-111827?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=for-the-badge&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=for-the-badge&logo=postgresql&logoColor=4169E1" />
</p>

<p align="center">
  <img alt="Docker" src="https://img.shields.io/badge/Docker-111827?style=for-the-badge&logo=docker&logoColor=2496ED" />
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-111827?style=for-the-badge&logo=vercel&logoColor=FFFFFF" />
  <img alt="Render" src="https://img.shields.io/badge/Render-111827?style=for-the-badge&logo=render&logoColor=46E3B7" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-111827?style=for-the-badge&logo=supabase&logoColor=3ECF8E" />
</p>

---

## Sobre o Projeto

**Maiden Gate** é uma aplicação web full stack criada para auxiliar **Mestres** e **Jogadores** durante campanhas de RPG de mesa.

A plataforma nasceu da necessidade de substituir anotações espalhadas, planilhas manuais e controles físicos por uma ferramenta digital integrada. O objetivo é tornar a experiência de mesa mais organizada, fluida e imersiva, permitindo que o grupo foque mais na narrativa e menos na administração manual de informações.

Embora tenha sido criada inicialmente para o sistema autoral **Voice Of Flower: Awakening of the Maiden**, a base da aplicação foi pensada para ser expansível e adaptável a outros sistemas de RPG no futuro.

---

## Deploy

O projeto está publicado em produção com frontend, backend e banco de dados separados.

| Camada | Serviço | URL / Observação |
|---|---|---|
| Frontend | Vercel | `https://maiden-gate-six.vercel.app` |
| Backend / API | Render | `https://maiden-gate.onrender.com` |
| Banco de dados | Supabase | PostgreSQL com conexão via pooler |
| Container | Docker | Backend Laravel executado em container com Apache/PHP |

### Observações do Deploy

- O frontend foi publicado na **Vercel**.
- O backend Laravel foi publicado no **Render** usando **Docker**.
- O banco de dados PostgreSQL está hospedado no **Supabase**.
- O backend utiliza variáveis de ambiente para definir `APP_URL`, `FRONTEND_URL`, conexão com o banco e configurações de produção.
- O frontend utiliza `VITE_API_URL` para apontar para a API publicada no Render.
- O script de inicialização do container executa comandos importantes do Laravel, como migrations, criação do link de storage e otimização do projeto.

---

## Prévia do Projeto

### Tela Inicial

![Tela Inicial](docs/images/home-preview.png)

### Dashboard do Mestre

![Dashboard do Mestre](docs/images/master-dashboard.png)

### Página de Campanha do Mestre

![Campanha do Mestre](docs/images/master-campaign-page.png)

### Dashboard do Jogador

![Dashboard do Jogador](docs/images/player-dashboard.png)

### Criação de Personagem

![Criação de Personagem](docs/images/character-creation.png)

### Página de Campanha do Jogador

![Campanha do Jogador](docs/images/player-campaign-page.png)

---

## Sobre Voice Of Flower

**Voice Of Flower: Awakening of the Maiden** é um sistema de RPG de mesa autoral em desenvolvimento, ambientado em um universo de fantasia sombria, política, mistério, Miasma, Marcas e conflitos entre facções.

No sistema, personagens possuem Marcas que influenciam suas habilidades, atributos e papel dentro da narrativa. O **Maiden Gate** funciona como uma ferramenta digital para testar, organizar e aplicar essas regras durante campanhas reais.

---

## Funcionalidades Principais

### Autenticação e Perfis

- Cadastro e login de usuários.
- Separação entre perfis de **Mestre** e **Jogador**.
- Rotas protegidas por autenticação.
- Interface adaptada conforme o tipo de usuário.
- Redirecionamento automático de acordo com o perfil do usuário.

---

## Módulo do Mestre

O Mestre possui um painel completo para criar, editar e gerenciar campanhas.

### Dashboard do Mestre

- Listagem de campanhas criadas.
- Estatísticas gerais.
- Solicitações de entrada de jogadores.
- Aceite ou recusa de jogadores em campanhas.
- Acesso rápido para criação de campanhas e elementos.

### Criação e Gestão de Campanhas

- Criação manual de campanhas.
- Uso de campanha pré-pronta baseada em **Voice Of Flower: Awakening of the Maiden**.
- Edição e exclusão de campanhas.
- Upload de imagem de capa da campanha.
- Cadastro de localizações, NPCs, monstros, itens, eventos, sessões e habilidades de campanha.
- Organização dos elementos em **conjuntos** personalizados.
- Controle de visibilidade de elementos para os jogadores.
- Associação de NPCs a Marcas cadastradas no banco de dados.
- Cadastro de status e habilidades para NPCs e monstros.

### Página de Campanha do Mestre

- Visualização completa dos elementos da campanha.
- Controle da localização atual da campanha.
- Notas privadas do Mestre.
- Agenda de sessões.
- Visualização dos membros da campanha.
- Visualização e edição de HP/XP dos personagens.
- Visualização de status de NPCs e monstros.
- Gerenciamento de dados principais da campanha.
- Chat compartilhado de rolagem de dados.
- Limpeza do histórico de rolagens pelo Mestre.
- Guia rápido de efeitos de combate.
- Criação, cópia e reorganização de elementos entre conjuntos.

---

## Módulo do Jogador

O Jogador possui um painel próprio para gerenciar personagens, campanhas e participação nas sessões.

### Dashboard do Jogador

- Listagem de personagens criados.
- Estatísticas reais baseadas nos personagens.
- Listagem de campanhas em que participa.
- Listagem de campanhas disponíveis.
- Solicitação de entrada em campanhas.

### Criação e Edição de Personagem

- Seleção de campanha acessível ao jogador.
- Seleção de Marca vinda do banco de dados.
- Visualização de árvore de habilidades por Marca.
- Equipamento de até 6 habilidades.
- Distribuição de atributos: POD, DES, RES, INT, DET e PRE.
- Limite de distribuição inicial controlado por regras do sistema.
- Cálculo automático de status.
- Indicadores visuais de impacto dos atributos.
- Upload de duas imagens: imagem do ícone e imagem completa do personagem.
- Edição e exclusão de personagem.
- Salvamento real no backend.

### Página de Campanha do Jogador

- Visualização dos elementos liberados pelo Mestre.
- Visualização de imagens de localizações, NPCs e monstros.
- Visualização de status de NPCs e monstros.
- Visualização dos dados do próprio personagem.
- Visualização dos membros da campanha.
- Visualização da localização atual definida pelo Mestre.
- Inventário funcional: adicionar item, alterar quantidade e remover item.
- Visualização das sessões criadas pelo Mestre.
- Chat compartilhado de rolagem de dados.
- Guia rápido de efeitos de combate.

---

## Sistema de Rolagem de Dados

O Maiden Gate possui um sistema compartilhado de rolagem de dados entre Mestre e Jogadores.

- Rolagens salvas no backend.
- Histórico compartilhado por campanha.
- Mestre visualiza rolagens dos jogadores.
- Jogadores visualizam rolagens do Mestre e dos outros jogadores.
- Atualização automática por polling.
- Mestre pode limpar todo o histórico da campanha.

---

## Páginas de Regras

Enquanto o livro completo de **Voice Of Flower** ainda está em desenvolvimento, o projeto possui páginas de regras resumidas:

- Regras públicas gerais.
- Regras específicas para Mestres.
- Regras específicas para Jogadores.
- Explicação dos atributos principais.
- Listagem de efeitos de combate.
- Interface em abas com conteúdo essencial.
- Botão de download exibido como indisponível até a finalização do livro.

---

## Responsividade

O projeto possui ajustes específicos para telas menores:

- Menu mobile na página inicial.
- Menu mobile nas páginas autenticadas.
- Abas de campanha adaptadas para seletor mobile.
- Modais adaptados para telas pequenas.
- Guia de efeitos em formato de acordeão no mobile.
- Layout responsivo para dashboards, cards, elementos e formulários.

---

## Tecnologias Utilizadas

### Frontend

<p>
  <img alt="React" src="https://img.shields.io/badge/React-111827?style=flat-square&logo=react&logoColor=61DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-111827?style=flat-square&logo=typescript&logoColor=3178C6" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-111827?style=flat-square&logo=vite&logoColor=646CFF" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-111827?style=flat-square&logo=tailwindcss&logoColor=38BDF8" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-111827?style=flat-square&logo=reactrouter&logoColor=CA4245" />
  <img alt="Axios" src="https://img.shields.io/badge/Axios-111827?style=flat-square&logo=axios&logoColor=5A29E4" />
</p>

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- EmailJS

### Backend

<p>
  <img alt="PHP" src="https://img.shields.io/badge/PHP-111827?style=flat-square&logo=php&logoColor=777BB4" />
  <img alt="Laravel" src="https://img.shields.io/badge/Laravel-111827?style=flat-square&logo=laravel&logoColor=FF2D20" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-111827?style=flat-square&logo=postgresql&logoColor=4169E1" />
  <img alt="REST API" src="https://img.shields.io/badge/REST_API-111827?style=flat-square" />
</p>

- PHP
- Laravel
- API REST
- PostgreSQL
- Migrations
- Upload de arquivos
- Autenticação por API

### Deploy e Infraestrutura

- Vercel para o frontend.
- Render para o backend.
- Supabase PostgreSQL para o banco de dados.
- Docker para empacotar o backend Laravel.
- Apache/PHP no container de produção.

### Ferramentas de Desenvolvimento

<p>
  <img alt="Git" src="https://img.shields.io/badge/Git-111827?style=flat-square&logo=git&logoColor=F05032" />
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-111827?style=flat-square&logo=github&logoColor=FFFFFF" />
  <img alt="VS Code" src="https://img.shields.io/badge/VS_Code-111827?style=flat-square&logo=visualstudiocode&logoColor=007ACC" />
  <img alt="Composer" src="https://img.shields.io/badge/Composer-111827?style=flat-square&logo=composer&logoColor=885630" />
  <img alt="NPM" src="https://img.shields.io/badge/NPM-111827?style=flat-square&logo=npm&logoColor=CB3837" />
</p>

- Git e GitHub
- VS Code
- Composer
- NPM
- Postman/Insomnia
- pgAdmin/Supabase Dashboard

---

## Como Executar Localmente

### Pré-requisitos

- Node.js
- NPM
- PHP
- Composer
- PostgreSQL

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Variáveis de Ambiente

### Frontend

Crie um arquivo `.env` ou `.env.local` no frontend:

```env
VITE_API_URL=http://127.0.0.1:8000/api
VITE_STORAGE_URL=http://127.0.0.1:8000/storage

VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key
```

Em produção, na Vercel:

```env
VITE_API_URL=https://maiden-gate.onrender.com/api
```

### Backend

Configure no `.env` do Laravel:

```env
APP_NAME=Maiden-Gate
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000
FRONTEND_URL=http://localhost:5173

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=seu_db
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
```

Em produção, no Render:

```env
APP_NAME=Maiden-Gate
APP_ENV=production
APP_DEBUG=false
APP_URL=https://maiden-gate.onrender.com
FRONTEND_URL=https://maiden-gate-six.vercel.app

LOG_CHANNEL=stderr
LOG_LEVEL=info

DB_CONNECTION=pgsql
DB_HOST=host_do_pooler_supabase
DB_PORT=0000
DB_DATABASE=postgres
DB_USERNAME=usuario_do_pooler
DB_PASSWORD=senha_do_banco
DB_SSLMODE=require

CACHE_STORE=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
FILESYSTEM_DISK=public
PORT=80
```

> **Importante:** As variáveis de produção devem ficar configuradas diretamente na Vercel e no Render.

---

## Docker

O backend possui um Dockerfile para deploy do Laravel no Render.

O container executa o Laravel com Apache/PHP e aponta o servidor web para a pasta `public` do Laravel.

Também existe um script de inicialização responsável por preparar a aplicação antes de iniciar o servidor:

```bash
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan storage:link
php artisan migrate --force
php artisan optimize
apache2-foreground
```

Esse fluxo evita a necessidade de acessar o shell do Render para executar comandos manuais após o deploy.

---

## Estrutura Geral

```txt
maiden-gate/
├── backend/
│   ├── app/
│   ├── database/
│   ├── docker/
│   ├── routes/
│   ├── Dockerfile
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── shared/
│   │   ├── routes/
│   │   └── services/
│   └── ...
│
├── README.md
└── README.en.md
```

---

## Status do Projeto

O projeto está em fase de **MVP finalizado e publicado**.

As principais funcionalidades já estão implementadas:

- autenticação;
- dashboards;
- criação e edição de campanhas;
- campanhas pré-prontas;
- criação, edição e exclusão de personagens;
- páginas de campanha para Mestre e Jogador;
- inventário;
- rolagem de dados compartilhada;
- organização por conjuntos;
- controle de visibilidade de elementos;
- páginas de regras;
- guia de efeitos;
- responsividade;
- deploy do frontend e backend.

---

## Roadmap

- [x] Autenticação de usuários.
- [x] Separação entre Mestre e Jogador.
- [x] Dashboard do Mestre.
- [x] Dashboard do Jogador.
- [x] Criação de campanhas.
- [x] Campanhas pré-prontas.
- [x] Criação de personagens.
- [x] Upload de imagens.
- [x] Inventário funcional.
- [x] Sessões de campanha.
- [x] Chat compartilhado de dados.
- [x] Páginas de regras.
- [x] Guia de efeitos.
- [x] Organização por conjuntos.
- [x] Interface mobile.
- [x] Deploy do frontend.
- [x] Deploy do backend.

---

## Observações

- O livro completo de regras de **Voice Of Flower** ainda está em desenvolvimento.
- Algumas regras e textos podem mudar conforme o sistema evolui.
- A aba de batalha ainda está marcada como **Em desenvolvimento**.
- O armazenamento local de imagens no backend pode ser substituído futuramente por uma solução externa, como Supabase Storage, Cloudinary ou S3.
- O projeto foi criado como ferramenta prática para apoiar campanhas reais e também como projeto de portfólio full stack.

---

## Autor

Desenvolvido por **Kauan Malvino Garcia**.

- GitHub: [malvino11-28](https://github.com/malvino11-28)
- LinkedIn: [Malvino Garcia](https://www.linkedin.com/in/malvino-garcia)

---

## Licença

Este projeto está licenciado sob a licença **MIT**.
