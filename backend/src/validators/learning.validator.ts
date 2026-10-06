import { z } from "zod";

export const progressSchema = z.object({
  childId: z.string(),
  lessonId: z.string(),
  completed: z.boolean().default(true),
  progress: z.number().int().min(0).max(100).default(100),
  sessionId: z.string().optional()
});

export const learningSessionSchema = z.object({ childId: z.string(), lessonId: z.string() });

export const quizSubmitSchema = z.object({
  childId: z.string(),
  answers: z.record(z.string())
});

export const aiLessonSchema = z.object({
  childId: z.string(),
  lessonId: z.string(),
  message: z.string().min(1).max(500)
});

export const simulationStartSchema = z.object({
  childId: z.string()
});

export const simulationMessageSchema = z.object({
  childId: z.string(),
  sessionId: z.string(),
  message: z.string().min(1).max(500)
});
