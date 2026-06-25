# Maiden Gate

> Uma plataforma web de suporte para o sistema de RPG de mesa "Voice Of Flower: Forsaken Maiden", projetada para centralizar informações, automatizar cálculos de atributos e servir como assistente digital para Mestres e Jogadores.

---

## Sobre o Projeto

O Maiden Gate nasce para substituir os métodos tradicionais de gerenciamento de RPG, como anotações físicas e planilhas dispersas. A proposta é eliminar o excesso de papel na mesa e otimizar o fluxo de informações, permitindo que o grupo foque na narrativa e na imersão.

Embora seja moldado inicialmente para o sistema Voice Of Flower, o núcleo da plataforma está sendo projetado para ser adaptável para outros sistemas de RPG.

---

## Sobre o Sistema Voice Of Flower

O **Voice Of Flower: Forsaken Maiden** é um sistema próprio de RPG de mesa que atualmente está sendo desenvolvido por mim. Ele possui um cenário e mecânicas autorais, o que torna este software uma ferramenta essencial e sob medida para testar e aplicar suas regras de forma dinâmica.

---

## Tecnologias e Serviços Planejados

O ecossistema do projeto foi estruturado com tecnologias modernas focadas em performance, responsividade e escalabilidade:

- **Frontend:** React, TypeScript e Next.js (para gerenciamento de rotas e interface).
- **Estilização:** Tailwind CSS combinado com componentes shadcn/ui.
- **Backend e Banco de Dados:** PostgreSQL integrado ao Supabase (gerenciando autenticação segura, banco de dados relacional e armazenamento de assets).
- **Hospedagem:** Planejado para plataformas como Vercel ou Netlify.

---

## Principais Funcionalidades (Visão Geral)

### Módulo do Mestre (GM)

- **Gestão de Bestiário e NPCs:** Cadastro e controle de criaturas, chefes e personagens do mundo.
- **Controle de Lore e Locais:** Organização de cidades, dungeons, facções e eventos históricos.
- **Monitoramento de Mesa:** Visualização em tempo real das fichas e status dos jogadores conectados.
- **Apoio Visual:** Upload e exibição de mapas e materiais gráficos de referência.

### Módulo do Jogador

- **Fichas Digitais:** Criação guiada de personagens com escolha de Marcas e Subclasses.
- **Automação:** Cálculos automáticos de atributos mecânicos básicos (POD, DES, RES, INT, VON, PRE).
- **Gerenciador de Status:** Atualização dinâmica de HP, recursos de combate, inventário e árvores de habilidades.

---

## Status: Em Desenvolvimento

A plataforma está em fase inicial de especificação e desenvolvimento de código.

### Roadmap Inicial:

- [ ] **Autenticação:** Sistema de login seguro e controle de acesso diferenciado (Mestre vs. Jogador) via Supabase.
- [ ] **Módulo do Jogador:** Criação de ficha, distribuição de atributos e controle de recursos (HP/Inventário).
- [ ] **Módulo do Mestre:** Painel de controle de campanhas, banco de dados de NPCs e ferramentas de visualização da mesa.
- [ ] **Suporte Visual:** Módulo para disponibilização rápida de mapas de referência.
- [ ] **Customização:** Parâmetros flexíveis para adaptação das regras para outros cenários de RPG.

---

## Restrições do Sistema

- **Conectividade:** Por ser uma plataforma web centralizada, requer conexão ativa com a internet.
- **Responsividade:** Foco total em dispositivos móveis (smartphones e tablets), considerando o uso frequente dessas telas durante sessões presenciais.
