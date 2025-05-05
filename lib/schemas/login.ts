import { z } from "zod";

const LoginCredentials = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export { LoginCredentials };
