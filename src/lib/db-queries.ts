import { db } from "@/db";
import { ratings } from "@/db/schema";
import { unstable_cache } from "next/cache";

export const getPluginRatings = unstable_cache(
  async () => {
    const allRatings = await db.select().from(ratings);
    const ratingsMap: Record<string, { averageRating: number; totalRatings: number }> = {};
    
    allRatings.forEach((r) => {
      ratingsMap[r.pluginId] = {
        averageRating: r.averageRating,
        totalRatings: r.totalRatings,
      };
    });
    
    return ratingsMap;
  },
  ["all-plugin-ratings"],
  { tags: ["ratings"] }
);
