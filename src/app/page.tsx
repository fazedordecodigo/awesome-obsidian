import { getObsidianPlugins } from "@/lib/obsidian-api";
import { getPluginRatings } from "@/lib/db-queries";
import PluginCard from "@/components/PluginCard";

export default async function Home() {
  const [plugins, ratingsMap] = await Promise.all([
    getObsidianPlugins(),
    getPluginRatings(),
  ]);

  // Sort by downloads by default
  const sortedPlugins = plugins.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Awesome Obsidian Plugins
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Descubra e avalie os melhores plugins para o seu Obsidian vault.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPlugins.map((plugin) => (
            <PluginCard
              key={plugin.id}
              plugin={plugin}
              ratingInfo={ratingsMap[plugin.id]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
