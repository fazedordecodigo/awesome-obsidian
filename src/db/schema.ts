import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const ratings = sqliteTable("ratings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pluginId: text("plugin_id").notNull().unique(),
  averageRating: real("average_rating").notNull().default(0),
  totalRatings: integer("total_ratings").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});
