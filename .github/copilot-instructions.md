# Awesome Obsidian - AI Coding Instructions

Este projeto é uma curadoria de plugins para Obsidian, construído com Next.js, Drizzle ORM e LibSQL.

## Arquitetura e Tecnologias
- **Framework**: Next.js 15+ (App Router)
- **Banco de Dados**: LibSQL (SQLite) via Drizzle ORM
- **Estilização**: Tailwind CSS v4
- **Ícones**: Lucide React
- **Data Fetching**: Server Components com cache via `unstable_cache`

## Convenções de Código

### Banco de Dados (Drizzle)
- O schema está em [src/db/schema.ts](src/db/schema.ts).
- Use `npm run db:push` para sincronizar alterações no schema com o banco local.
- Queries complexas ou reutilizáveis devem ficar em [src/lib/db-queries.ts](src/lib/db-queries.ts).

### Server Actions
- Localizadas em [src/app/actions/](src/app/actions/).
- Devem incluir `"use server"` no topo do arquivo.
- Exemplo: [src/app/actions/rate.ts](src/app/actions/rate.ts) para votação em plugins.

### Integração com Obsidian API
- Os dados dos plugins são consumidos de arquivos JSON brutos do repositório `obsidianmd/obsidian-releases`.
- A lógica de fetch está em [src/lib/obsidian-api.ts](src/lib/obsidian-api.ts).
- O cache do fetch é de 24 horas (`revalidate: 86400`).

### Caching e Revalidação
- Use `unstable_cache` para envolver chamadas ao banco de dados em Server Components.
- Use `revalidateTag("ratings")` em Server Actions para invalidar o cache quando os dados mudarem.

### Componentes UI
- Siga o padrão de design "Glassmorphism" e gradientes suaves.
- Use as classes utilitárias do Tailwind v4.
- Componentes de visualização devem ser Server Components por padrão, a menos que precisem de estado ou interatividade (ex: [src/components/PluginCard.tsx](src/components/PluginCard.tsx)).

## Workflows Comuns
- **Desenvolvimento**: `npm run dev`
- **Atualizar Schema**: Edite [src/db/schema.ts](src/db/schema.ts) e execute `npm run db:push`.
- **Variáveis de Ambiente**: Verifique [.env.example](.env.example) para as chaves necessárias (Turso DB URL e Auth Token).
- **Adicionar Ícone**: Use `lucide-react`.

## Estrutura de Pastas
- `src/app`: Rotas, layouts e Server Actions.
- `src/components`: Componentes React (UI).
- `src/db`: Configuração do Drizzle e Schema.
- `src/lib`: Utilitários, queries de banco e integrações de API.
