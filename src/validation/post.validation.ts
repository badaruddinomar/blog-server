import { z } from 'zod';

export const postSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
});

export type PostSchema = z.infer<typeof postSchema>;
