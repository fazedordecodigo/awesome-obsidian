import { unstable_cache } from 'next/cache';
import { logger } from './logger';

export interface ObsidianPlugin {
  id: string;
  name: string;
  author: string;
  description: string;
  repo: string;
  downloads?: number;
  updated?: number;
  stars?: number;
}

export interface ObsidianTheme {
  name: string;
  author: string;
  repo: string;
  screenshot: string;
  modes: string[];
  legacy?: boolean;
}

export const getObsidianPlugins = unstable_cache(
  async (): Promise<ObsidianPlugin[]> => {
    const pluginsUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugins.json";
    const statsUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugin-stats.json";
    const startTime = Date.now();

    logger.info("Iniciando busca de plugins do Obsidian", { source: "GitHub" });

    try {
      const [pluginsRes, statsRes] = await Promise.all([
        fetch(pluginsUrl),
        fetch(statsUrl),
      ]);

      if (!pluginsRes.ok || !statsRes.ok) {
        logger.error("Falha na resposta da API do GitHub para plugins", {
          pluginsStatus: pluginsRes.status,
          statsStatus: statsRes.status,
          durationMs: Date.now() - startTime
        });
        throw new Error("Failed to fetch Obsidian data");
      }

      const plugins: ObsidianPlugin[] = await pluginsRes.json();
      const stats: Record<string, { downloads?: number; updated?: number; stars?: number }> = await statsRes.json();

      const result = plugins.map((plugin) => ({
        ...plugin,
        downloads: stats[plugin.id]?.downloads || 0,
        updated: stats[plugin.id]?.updated || 0,
        stars: stats[plugin.id]?.stars || 0,
      }));

      logger.info("Plugins do Obsidian carregados com sucesso", {
        count: result.length,
        durationMs: Date.now() - startTime
      });

      return result;
    } catch (error) {
      logger.error("Erro crítico ao buscar plugins do Obsidian", {
        error: error instanceof Error ? error.message : String(error),
        durationMs: Date.now() - startTime
      });
      return [];
    }
  },
  ["obsidian-plugins"],
  {
    revalidate: 86400, // 24 horas
    tags: ["obsidian-plugins"],
  }
);

export const getObsidianThemes = unstable_cache(
  async (): Promise<ObsidianTheme[]> => {
    const themesUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-css-themes.json";
    const startTime = Date.now();

    logger.info("Iniciando busca de temas do Obsidian", { source: "GitHub" });

    try {
      const response = await fetch(themesUrl);

      if (!response.ok) {
        logger.error("Falha na resposta da API do GitHub para temas", {
          status: response.status,
          durationMs: Date.now() - startTime
        });
        throw new Error("Failed to fetch Obsidian themes");
      }

      const themes = await response.json();
      
      logger.info("Temas do Obsidian carregados com sucesso", {
        count: themes.length,
        durationMs: Date.now() - startTime
      });

      return themes;
    } catch (error) {
      logger.error("Erro crítico ao buscar temas do Obsidian", {
        error: error instanceof Error ? error.message : String(error),
        durationMs: Date.now() - startTime
      });
      return [];
    }
  },
  ["obsidian-themes"],
  {
    revalidate: 86400, // 24 horas
    tags: ["obsidian-themes"],
  }
);
