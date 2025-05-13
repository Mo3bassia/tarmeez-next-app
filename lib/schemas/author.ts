import { z } from "zod";

export const authorSchema = z.object({
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

export type Author = z.infer<typeof authorSchema>;
