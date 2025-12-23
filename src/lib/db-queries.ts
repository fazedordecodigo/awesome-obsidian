import { db } from "@/db";
import { ratings } from "@/db/schema";
import { unstable_cache } from "next/cache";

export const getItemRatings = unstable_cache(
  async () => {
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
    
    return ratingsMap;
  },
  ["all-item-ratings"],
  { tags: ["ratings"] }
);
