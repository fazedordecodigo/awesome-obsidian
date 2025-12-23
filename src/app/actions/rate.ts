"use server";

import { db } from "@/db";
import { ratings } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function rateItem(itemId: string, itemType: 'plugin' | 'theme', newRating: number) {
  if (newRating < 1 || newRating > 5) return { error: "Invalid rating" };

  try {
    const existing = await db.query.ratings.findFirst({
      where: and(
        eq(ratings.itemId, itemId),
        eq(ratings.itemType, itemType)
      ),
    });

    if (existing) {
      const newTotal = existing.totalRatings + 1;
      const newAverage = (existing.averageRating * existing.totalRatings + newRating) / newTotal;

      await db
        .update(ratings)
        .set({
          averageRating: newAverage,
          totalRatings: newTotal,
          updatedAt: new Date(),
        })
        .where(eq(ratings.id, existing.id));
    } else {
      await db.insert(ratings).values({
        itemId,
        itemType,
        averageRating: newRating,
        totalRatings: 1,
        updatedAt: new Date(),
      });
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error rating item:", error);
    return { error: "Failed to save rating" };
  }
}
