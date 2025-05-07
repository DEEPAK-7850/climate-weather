import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (from original file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Climate tips schema
export const climateTips = pgTable("climate_tips", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  weatherCondition: text("weather_condition"),
  temperature: integer("temperature"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertClimateTipSchema = createInsertSchema(climateTips).pick({
  content: true,
  weatherCondition: true,
  temperature: true,
  location: true,
});

export type InsertClimateTip = z.infer<typeof insertClimateTipSchema>;
export type ClimateTip = typeof climateTips.$inferSelect;

// Weather Search History
export const searchHistory = pgTable("search_history", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  userId: integer("user_id").references(() => users.id),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertSearchHistorySchema = createInsertSchema(searchHistory).pick({
  query: true,
  userId: true,
});

export type InsertSearchHistory = z.infer<typeof insertSearchHistorySchema>;
export type SearchHistory = typeof searchHistory.$inferSelect;
