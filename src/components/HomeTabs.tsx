'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/routing';
import { Boxes, Palette } from 'lucide-react';
import { PluginList } from './PluginList';
import { ThemeList } from './ThemeList';
import { ObsidianPlugin, ObsidianTheme } from '@/lib/obsidian-api';
import { useTranslations } from 'next-intl';

interface HomeTabsProps {
  allPlugins: ObsidianPlugin[];
  allThemes: ObsidianTheme[];
  ratings: Record<string, Record<string, { averageRating: number; totalRatings: number }>>;
}

export function HomeTabs({ allPlugins, allThemes, ratings }: HomeTabsProps) {
  const t = useTranslations('HomePage');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeTab = searchParams.get('type') === 'themes' ? 'themes' : 'plugins';

  const handleTabChange = (tab: 'plugins' | 'themes') => {
    const params = new URLSearchParams(searchParams);
    params.set('type', tab);
    params.set('page', '1'); // Reset page when switching tabs
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-12">
      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-2xl border border-border bg-card/30 p-1.5 backdrop-blur-xl">
          <button
            onClick={() => handleTabChange('plugins')}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${activeTab === 'plugins'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:bg-accent/10 hover:text-accent'
              }`}
          >
            <Boxes size={18} />
            {t('sections.plugins')}
          </button>
          <button
            onClick={() => handleTabChange('themes')}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all ${activeTab === 'themes'
              ? 'bg-accent text-white shadow-lg shadow-accent/20'
              : 'text-muted hover:bg-accent/10 hover:text-accent'
              }`}
          >
            <Palette size={18} />
            {t('sections.themes')}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {activeTab === 'plugins' ? (
          <PluginList allPlugins={allPlugins} ratings={ratings.plugin} />
        ) : (
          <ThemeList allThemes={allThemes} ratings={ratings.theme} />
        )}
      </div>
    </div>
  );
}
