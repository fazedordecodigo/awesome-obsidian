'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ThemeCard } from './ThemeCard';
import { SearchAndPagination } from './SearchAndPagination';
import { ObsidianTheme } from '@/lib/obsidian-api';
import { useTranslations } from 'next-intl';

const ITEMS_PER_PAGE = 9;

function ThemeListContent({
  allThemes,
  ratings
}: {
  allThemes: ObsidianTheme[];
  ratings: Record<string, { averageRating: number; totalRatings: number }>;
}) {
  const searchParams = useSearchParams();
  const t = useTranslations('ThemeList');

  const query = (searchParams.get('q') || '').toLowerCase();
  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'name_asc';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filtra os temas localmente
  const filteredThemes = useMemo(() => {
    return query
      ? allThemes.filter(theme =>
        theme.name.toLowerCase().includes(query) ||
        theme.author.toLowerCase().includes(query)
      )
      : allThemes;
  }, [allThemes, query]);

  // Ordenação
  const sortedThemes = useMemo(() => {
    return [...filteredThemes].sort((a, b) => {
      if (sort === 'name_asc') return a.name.localeCompare(b.name);
      if (sort === 'name_desc') return b.name.localeCompare(a.name);
      // Temas não têm downloads/stars na API community-css-themes.json
      return 0;
    });
  }, [filteredThemes, sort]);

  const totalItems = sortedThemes.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const data = sortedThemes.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <>
      <SearchAndPagination
        totalPages={totalPages}
        translationNamespace="ThemeList"
      />
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((theme) => (
            <ThemeCard
              key={theme.name}
              theme={theme}
              rating={ratings[theme.repo]}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card text-4xl ring-1 ring-border">
            🎨
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-foreground">{t('noResults')}</h3>
          <p className="max-w-xs text-muted">
            Não encontramos nenhum tema para &quot;{query}&quot;.
          </p>
        </div>
      )}
    </>
  );
}

export function ThemeList({
  allThemes,
  ratings
}: {
  allThemes: ObsidianTheme[];
  ratings: Record<string, { averageRating: number; totalRatings: number }>;
}) {
  const t = useTranslations('ThemeList');
  return (
    <Suspense fallback={<div className="py-20 text-center">{t('loading')}</div>}>
      <ThemeListContent allThemes={allThemes} ratings={ratings} />
    </Suspense>
  );
}
