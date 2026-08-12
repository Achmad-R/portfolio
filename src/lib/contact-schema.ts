import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(5000),
  website: z.string().trim().max(100).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;