import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  images: text('images').array(), // Nullable temporarily for migration
  tags: text('tags').array().notNull(),
  link: text('link').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  year: text('year').notNull(),
  command: text('command').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  output: text('output').array().notNull(),
  image: text("image"),
  skills: text('skills').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  event: text('event').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  image: text('image').notNull(),
  rank: text('rank').notNull(),
  tier: text('tier').notNull(), // 'gold' | 'silver' | 'bronze' | 'special' | 'default'
  createdAt: timestamp('created_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;
