"use server";

import { db } from "@/db";
import { ratings } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getRequestLogger } from "@/lib/logger";

export async function rateItem(itemId: string, itemType: 'plugin' | 'theme', newRating: number) {
  const startTime = Date.now();
  const log = await getRequestLogger({ itemId, itemType, newRating });

  if (newRating < 1 || newRating > 5) {
    log.warn("Tentativa de avaliação inválida", { rating: newRating });
    return { error: "Invalid rating" };
  }

  try {
    log.info("Processando nova avaliação");

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
      
      log.info("Avaliação existente atualizada", { 
        oldAverage: existing.averageRating, 
        newAverage, 
        totalRatings: newTotal,
        durationMs: Date.now() - startTime
      });
    } else {
      await db.insert(ratings).values({
        itemId,
        itemType,
        averageRating: newRating,
        totalRatings: 1,
        updatedAt: new Date(),
      });

      log.info("Nova avaliação criada", { 
        durationMs: Date.now() - startTime 
      });
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    log.error("Erro ao processar avaliação", { 
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startTime
    });
    return { error: "Failed to save rating" };
  }
}
