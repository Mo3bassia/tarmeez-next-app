import { z } from "zod";
import { authorSchema, type Author } from "./author";

export const postsSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  body: z.string(),
  author: authorSchema,
  image: z.union([z.string(), z.object({})]),
  tags: z.array(z.string()).optional(),
  created_at: z.string(),
  comments_count: z.number(),
});

export const postsArraySchema = z.array(postsSchema);

export type Post = z.infer<typeof postsSchema>;
export type { Author };
