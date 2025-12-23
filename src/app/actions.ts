'use server';

import { db } from '@/db';
import { projects, experiences, achievements } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function getProjects() {
  return await db.select().from(projects).orderBy(desc(projects.id));
}

export async function getExperiences() {
  // Sort by year descending. Since year is text, it works for '2023', '2022' etc.
  return await db.select().from(experiences).orderBy(desc(experiences.year));
}

export async function getAchievements() {
  return await db.select().from(achievements).orderBy(desc(achievements.date));
}
