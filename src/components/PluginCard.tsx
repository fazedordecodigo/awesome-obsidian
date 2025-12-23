import React from 'react';
import { Star, Download, User, ExternalLink } from 'lucide-react';

interface PluginCardProps {
  plugin: {
    name: string;
    description: string;
    author: string;
    repo: string;
    stars?: number; // Opcional se não tiver no banco ainda
    downloads?: number; // Opcional
  };
}

export function PluginCard({ plugin }: PluginCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-purple-500/10">

      {/* Header do Card */}
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300">
            <ExternalLink size={20} />
          </div>
          {/* Badge de Categoria ou Status (Exemplo) */}
          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs font-medium text-slate-400">
            Plugin
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-slate-100 group-hover:text-purple-400">
          {plugin.name}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-400">
          {plugin.description}
        </p>
      </div>

      {/* Footer do Card */}
      <div className="mt-auto border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 hover:text-slate-300">
            <User size={14} />
            <span className="truncate max-w-[100px]">{plugin.author}</span>
          </div>

          <div className="flex gap-3">
            <div className="flex items-center gap-1" title="Estrelas">
              <Star size={14} className="text-yellow-500" />
              <span>{plugin.stars || 0}</span>
            </div>
            {/* Se tiver downloads no futuro */}
            {plugin.downloads && (
              <div className="flex items-center gap-1" title="Downloads">
                <Download size={14} className="text-blue-500" />
                <span>{plugin.downloads}</span>
              </div>
            )}
          </div>
        </div>

        <a
          href={`https://github.com/${plugin.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full rounded-lg bg-slate-800 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Ver Repositório
        </a>
      </div>
    </div>
  );
}