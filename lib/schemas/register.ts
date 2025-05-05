import { z } from "zod";

const RegisterCredentials = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  email: z
    .union([
      z.string().email("Invalid email address"),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .optional(),
  image: z.any().optional(),
});

export { RegisterCredentials };
