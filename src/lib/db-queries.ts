import { db } from "@/db";
import { ratings } from "@/db/schema";
import { unstable_cache } from "next/cache";
import { getRequestLogger } from "./logger";

export const getItemRatings = unstable_cache(
  async () => {
    const startTime = Date.now();
    const log = await getRequestLogger();
    log.info("Buscando todas as avaliações do banco de dados");

    try {
      const allRatings = await db.select().from(ratings);
      const ratingsMap: Record<string, Record<string, { averageRating: number; totalRatings: number }>> = {
        plugin: {},
        theme: {},
      };
      
      allRatings.forEach((r) => {
        if (ratingsMap[r.itemType]) {
          ratingsMap[r.itemType][r.itemId] = {
            averageRating: r.averageRating,
            totalRatings: r.totalRatings,
          };
        }
      });
      
      log.info("Avaliações carregadas com sucesso", {
        count: allRatings.length,
        durationMs: Date.now() - startTime
      });

      return ratingsMap;
    } catch (error) {
      log.error("Erro ao buscar avaliações no banco de dados", {
        error: error instanceof Error ? error.message : String(error),
        durationMs: Date.now() - startTime
      });
      throw error;
    }
  },
  ["all-item-ratings"],
  { tags: ["ratings"] }
);
