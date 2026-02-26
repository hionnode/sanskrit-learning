import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    title_hi: z.string(),
    title_en: z.string(),
    stage: z.enum(['foundation', 'intermediate']),
    module_slug: z.string(),
    module_title_hi: z.string(),
    module_title_en: z.string(),
    sort_order: z.number(),
    estimated_minutes: z.number().default(15),
    prerequisites: z.array(z.string()).optional(),
    exercises: z.array(
      z.object({
        type: z.literal('mcq'),
        question_hi: z.string(),
        options: z.array(z.object({
          id: z.string(),
          text: z.string(),
        })),
        correct: z.string(),
        explanation_hi: z.string().optional(),
      })
    ).default([]),
  }),
});

const readings = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/readings' }),
  schema: z.object({
    title_hi: z.string(),
    title_en: z.string(),
    category: z.enum(['subhashita', 'hitopadesha', 'panchatantra', 'gita', 'stotra']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    sort_order: z.number(),
    sanskrit_text: z.string(),
    padachheda: z.string().optional(),
    word_meanings: z.array(z.object({
      word: z.string(),
      meaning_hi: z.string(),
    })).default([]),
    anvaya: z.string().optional(),
    translation_hi: z.string(),
  }),
});

export const collections = { lessons, readings };
