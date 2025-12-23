import { getObsidianPlugins } from '@/lib/obsidian-api';
import { PluginCard } from '@/components/PluginCard';
import { SearchAndPagination } from '@/components/SearchAndPagination';
import { Boxes } from 'lucide-react';

// Configuração da Paginação
const ITEMS_PER_PAGE = 9;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
  }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = (searchParams?.q || '').toLowerCase();
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || 'newest';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // 1. Busca todos os plugins da API do Obsidian
  const allPlugins = await getObsidianPlugins();

  // 2. Filtra os plugins localmente
  const filteredPlugins = query
    ? allPlugins.filter(plugin =>
      plugin.name.toLowerCase().includes(query) ||
      plugin.description.toLowerCase().includes(query) ||
      plugin.author.toLowerCase().includes(query)
    )
    : allPlugins;

  // 3. Ordenação
  const sortedPlugins = [...filteredPlugins].sort((a, b) => {
    if (sort === 'name_asc') {
      return a.name.localeCompare(b.name);
    }
    if (sort === 'name_desc') {
      return b.name.localeCompare(a.name);
    }
    if (sort === 'downloads') {
      return (b.downloads || 0) - (a.downloads || 0);
    }
    if (sort === 'stars') {
      return (b.stars || 0) - (a.stars || 0);
    }
    // newest (padrão) - ordena por timestamp de atualização
    return (b.updated || 0) - (a.updated || 0);
  });

  // 4. Paginação local
  const totalItems = sortedPlugins.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const data = sortedPlugins.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-xl">
              <Boxes className="h-4 w-4" />
              <span>Curadoria de Plugins Obsidian</span>
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-6xl font-bold tracking-tight text-transparent md:text-8xl">
            Awesome Obsidian
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
            Eleve seu segundo cérebro com as melhores ferramentas. Uma coleção selecionada para potencializar seu fluxo de trabalho no Obsidian.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 pb-24">
        {/* Componente Client-Side de Busca e Controles */}
        <SearchAndPagination totalPages={totalPages} />

        {/* Grid de Resultados */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-4xl ring-1 ring-white/10">
              🔍
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-slate-200">Nenhum plugin encontrado</h3>
            <p className="max-w-xs text-slate-500">
              Não encontramos nada para "{query}". Tente termos mais genéricos ou verifique a ortografia.
            </p>
          </div>
        )}
      </div>

      {/* Footer Premium */}
      <footer className="border-t border-white/5 bg-white/[0.01] py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Awesome Obsidian. Feito para a comunidade de PKM.
          </p>
        </div>
      </footer>
    </main>
  );
}