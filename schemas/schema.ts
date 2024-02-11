import * as z from "zod";

export const FormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});
