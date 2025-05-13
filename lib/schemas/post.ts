import { z } from "zod";
import { authorSchema, type Author } from "./author";

export const postSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  body: z.string(),
  author: authorSchema,
  image: z.union([z.string(), z.object({})]),
  tags: z.array(z.string()),
  created_at: z.string(),
  comments_count: z.number(),
  comments: z.array(z.unknown()),
});

export type Post = z.infer<typeof postSchema>;
export type { Author };
