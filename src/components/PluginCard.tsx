import React from 'react';
import { Star, Download, User, ExternalLink } from 'lucide-react';

interface PluginCardProps {
  plugin: {
    name: string;
    description: string;
    author: string;
    repo: string;
    stars?: number;
    downloads?: number;
  };
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_40px_-15px_rgba(124,58,237,0.1)]">

      {/* Header do Card */}
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 transition-colors group-hover:bg-purple-500/20 group-hover:text-purple-300">
            <ExternalLink size={22} />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Plugin
          </span>
        </div>

        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-white">
          {plugin.name}
        </h3>

        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
          {plugin.description}
        </p>
      </div>

      {/* Footer do Card */}
      <div className="mt-auto">
        <div className="mb-6 flex items-center justify-between border-t border-white/5 pt-5 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-2 transition-colors hover:text-slate-300">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <User size={12} />
            </div>
            <span className="truncate max-w-[120px]">{plugin.author}</span>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1.5" title="Estrelas">
              <Star size={14} className="text-yellow-500/80" />
              <span className="text-slate-400">{plugin.stars?.toLocaleString() || 0}</span>
            </div>
            {plugin.downloads && (
              <div className="flex items-center gap-1.5" title="Downloads">
                <Download size={14} className="text-blue-400/80" />
                <span className="text-slate-400">{plugin.downloads.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <a
          href={`https://github.com/${plugin.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-bold transition-all hover:bg-purple-500 hover:text-white active:scale-[0.98]"
        >
          Ver no GitHub
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
