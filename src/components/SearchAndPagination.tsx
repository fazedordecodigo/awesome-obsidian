'use client';

import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // Recomendo instalar: npm i use-debounce ou implementar manual

export function SearchAndPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  // Atualiza a URL com o termo de busca (Debounce de 300ms)
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reseta para pág 1 ao buscar
    
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  // Navegação de páginas
  const handlePageChange = (direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    if (newPage >= 1 && newPage <= totalPages) {
      params.set('page', newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Campo de Busca */}
      <div className="relative w-full md:max-w-md">
        <label htmlFor="search" className="sr-only">Buscar Plugin</label>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-slate-500" />
        </div>
        <input
          id="search"
          className="block w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-3 text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
          placeholder="Buscar por nome, autor ou descrição..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('q')?.toString()}
        />
      </div>

      {/* Controles de Paginação */}
      <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-900 p-2 md:justify-end">
        <span className="text-sm text-slate-400">
          Página <span className="font-bold text-white">{currentPage}</span> de <span className="font-bold text-white">{totalPages}</span>
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage <= 1}
            className="rounded-md border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage >= totalPages}
            className="rounded-md border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}