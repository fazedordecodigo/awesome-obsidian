import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const plugins = sqliteTable("plugins", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  author: text("author").notNull(),
  repo: text("repo").notNull(),
  stars: integer("stars").notNull().default(0),
  downloads: integer("downloads").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export const ratings = sqliteTable("ratings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  itemId: text("item_id").notNull(),
  itemType: text("item_type").notNull().default('plugin'), // 'plugin' ou 'theme'
  averageRating: real("average_rating").notNull().default(0),
  totalRatings: integer("total_ratings").notNull().default(0),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});
