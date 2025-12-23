# Awesome Obsidian

Uma curadoria moderna e performática de plugins para o Obsidian, permitindo explorar, buscar e avaliar as melhores extensões da comunidade.

## 🚀 Tecnologia Stack

O projeto utiliza as tecnologias mais recentes do ecossistema web para garantir performance e uma excelente experiência de desenvolvedor.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/) (via `@tailwindcss/postcss`)
- **Banco de Dados**: [Drizzle ORM](https://orm.drizzle.team/) com [LibSQL](https://github.com/tursodatabase/libsql) (SQLite/Turso)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gerenciamento de Tema**: `next-themes`

## 🏗️ Arquitetura do Projeto

O Awesome Obsidian foi projetado para ser rápido e eficiente:

- **Static Export**: Configurado com `output: 'export'`, gerando um site estático que pode ser hospedado em qualquer lugar.
- **Integração com API do Obsidian**: Os dados dos plugins são buscados diretamente do repositório oficial `obsidianmd/obsidian-releases`.
- **Cache Inteligente**: Utiliza `unstable_cache` do Next.js para gerenciar o cache das requisições externas e do banco de dados.
- **Busca no Cliente**: A filtragem e paginação dos plugins ocorrem no lado do cliente para uma resposta instantânea.

## 🛠️ Começando

### Pré-requisitos

- Node.js 20+
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/fazedordecodigo/awesome-obsidian.git
   cd awesome-obsidian
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` baseado no `.env.example` e adicione suas credenciais do Turso (se necessário para o sistema de ratings).

4. Inicialize o banco de dados:
   ```bash
   npm run db:push
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📂 Estrutura do Projeto

```text
src/
├── app/            # Rotas, layouts e Server Actions
├── components/     # Componentes UI reutilizáveis
├── db/             # Configuração do Drizzle e Schema
└── lib/            # Lógica de API, queries e utilitários
```

## ✨ Principais Funcionalidades

- **Exploração de Plugins**: Lista completa de plugins da comunidade Obsidian.
- **Busca em Tempo Real**: Filtre plugins por nome, autor ou descrição.
- **Estatísticas**: Visualize downloads, estrelas e data de atualização.
- **Sistema de Avaliação**: Dê notas aos seus plugins favoritos (Ratings).
- **Tema Dark/Light**: Suporte nativo a temas com persistência.

## 🔄 Workflow de Desenvolvimento

- **Desenvolvimento**: `npm run dev` para iniciar o servidor local.
- **Banco de Dados**: Use `npm run db:push` para sincronizar alterações no schema.
- **Build**: `npm run build` gera a exportação estática na pasta `out/`.
- **Linting**: `npm run lint` para garantir a qualidade do código.

## 📏 Padrões de Código

- **Componentes**: Prefira componentes funcionais e utilize Tailwind CSS 4 para estilização.
- **Ícones**: Utilize sempre a biblioteca `lucide-react`.
- **Dados**: Centralize chamadas de API em `src/lib/obsidian-api.ts` e queries em `src/lib/db-queries.ts`.
- **Segurança**: Nunca exponha segredos no código; utilize variáveis de ambiente.

## 🧪 Testes

Atualmente, o projeto utiliza ESLint para garantir a consistência do código. Testes unitários e de integração estão planejados para versões futuras.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os padrões de código estabelecidos e sinta-se à vontade para abrir Pull Requests ou Issues.

1. Faça um Fork do projeto
2. Crie uma Branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a Branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
