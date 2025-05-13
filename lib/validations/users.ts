import { z } from "zod";

export const usersSchema = z.object({
  id: z.number(),
  profile_image: z.union([z.string(), z.object({})]),
  posts_count: z.number(),
  username: z.string(),
  name: z.string(),
  email: z.string().nullable(),
  comments_count: z.number(),
});

export const usersArraySchema = z.array(usersSchema);

export type User = z.infer<typeof usersSchema>;
