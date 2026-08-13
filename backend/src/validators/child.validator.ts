import { z } from "zod";

export const childSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(3).max(18),
  avatar: z.string().optional(),
  interests: z.array(z.string()).default([]),
  learningPreferences: z.array(z.string()).default([])
});

