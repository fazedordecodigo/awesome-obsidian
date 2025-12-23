import React from 'react';
import { User, ExternalLink, Palette } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ObsidianTheme } from '@/lib/obsidian-api';

interface ThemeCardProps {
  theme: ObsidianTheme;
}

export function ThemeCard({ theme }: ThemeCardProps) {
  const t = useTranslations('ThemeCard');

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-[0_0_40px_-15px_rgba(124,58,237,0.1)] dark:bg-white/[0.02] dark:hover:bg-white/[0.04]">

      {/* Header do Card */}
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-colors group-hover:bg-accent/20 group-hover:text-accent">
            <Palette size={22} />
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            Theme
          </span>
        </div>

        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-border bg-muted">
          {theme.screenshot ? (
            <Image
              src={`https://raw.githubusercontent.com/${theme.repo}/HEAD/${theme.screenshot}`}
              alt={theme.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No Preview
            </div>
          )}
        </div>

        <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {theme.name}
        </h3>

        <div className="mb-8 flex flex-wrap gap-2">
          {theme.modes.map((mode) => (
            <span
              key={mode}
              className="rounded-md bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent/70 ring-1 ring-accent/10"
            >
              {mode}
            </span>
          ))}
          {theme.legacy && (
            <span className="rounded-md bg-yellow-500/5 px-2 py-0.5 text-[10px] font-medium text-yellow-500/70 ring-1 ring-yellow-500/10">
              Legacy
            </span>
          )}
        </div>
      </div>

      {/* Footer do Card */}
      <div className="mt-auto">
        <div className="mb-6 flex items-center justify-between border-t border-border pt-5 text-xs font-medium text-muted">
          <div className="flex items-center gap-2 transition-colors hover:text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-border text-muted">
              <User size={12} />
            </div>
            <span className="truncate max-w-[120px]">{theme.author}</span>
          </div>
        </div>

        <a
          href={`https://github.com/${theme.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3 text-sm font-bold transition-all hover:bg-accent hover:text-white active:scale-[0.98]"
        >
          {t('viewOnGithub')}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
