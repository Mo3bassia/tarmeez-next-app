import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().nullable(),
  profile_image: z.union([z.string(), z.object({})]),
  username: z.string(),
  comments_count: z.number(),
  posts_count: z.number(),
});

export type User = z.infer<typeof userSchema>;
