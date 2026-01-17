import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true), // Default to draft for safety

    // SEO fields
    excerpt: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
    metaKeywords: z.array(z.string()).optional(),

    // Content organization
    author: z.string().default('Sam Hesson'),
    category: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    relatedPosts: z.array(z.string()).optional(),

    // Media & presentation
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    featured: z.boolean().default(false),

    // Tags & classification
    tags: z.array(z.string()).optional(),

    // Metadata
    lastModified: z.coerce.date().optional(),
    estimatedReadingTime: z.number().optional(), // minutes (for pre-calculation)
  }),
});

export const collections = { blog };
