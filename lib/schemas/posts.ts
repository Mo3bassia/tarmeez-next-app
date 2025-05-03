import { z } from "zod";

const authorSchema = z.object({
  id: z.number(),
  profile_image: z.union([z.string(), z.object({})]),
  is_fake: z.boolean(),
  username: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  email_verified_at: z.string().nullable(),
  remember_token: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

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
export type Author = z.infer<typeof authorSchema>;
