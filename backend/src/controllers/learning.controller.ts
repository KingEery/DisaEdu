import { Request, Response } from "express";
import { assertOwnChild } from "../services/child.service.js";
import * as progressService from "../services/progress.service.js";
import * as quizService from "../services/quiz.service.js";
import { askLessonAi } from "../services/ai/ai.service.js";
import { aiLessonSchema, learningSessionSchema, progressSchema, quizSubmitSchema } from "../validators/learning.validator.js";
import { fail, ok } from "../utils/api-response.js";
import { getAiStatus } from "../services/ai/ai.service.js";

export function aiStatus(_req: Request, res: Response) {
  ok(res, getAiStatus());
}

export async function getProgress(req: Request, res: Response) {
  await assertOwnChild(req.user!.id, req.params.childId);
  ok(res, await progressService.getProgress(req.params.childId));
}

export async function getDashboard(req: Request, res: Response) {
  await assertOwnChild(req.user!.id, req.params.childId);
  ok(res, await progressService.dashboard(req.params.childId));
}

export async function saveProgress(req: Request, res: Response) {
  const data = progressSchema.parse(req.body);
  await assertOwnChild(req.user!.id, data.childId);
  ok(res, await progressService.saveProgress(data.childId, data.lessonId, data.completed, data.progress, data.sessionId));
}

export async function startSession(req: Request, res: Response) {
  const data = learningSessionSchema.parse(req.body);
  await assertOwnChild(req.user!.id, data.childId);
  ok(res, await progressService.startLearningSession(data.childId, data.lessonId), 201);
}

export async function getQuiz(req: Request, res: Response) {
  ok(res, await quizService.getQuiz(req.params.lessonId));
}

export async function submitQuiz(req: Request, res: Response) {
  const data = quizSubmitSchema.parse(req.body);
  await assertOwnChild(req.user!.id, data.childId);
  ok(res, await quizService.submitQuiz(data.childId, req.params.lessonId, data.answers));
}

export async function askAi(req: Request, res: Response) {
  const data = aiLessonSchema.parse(req.body);
  try {
    ok(res, await askLessonAi(req.user!.id, data.childId, data.lessonId, data.message));
  } catch (error) {
    if (error instanceof Error && error.message === "LESSON_NOT_FOUND") {
      fail(res, 404, "NOT_FOUND", "Materi tidak ditemukan.");
      return;
    }
    throw error;
  }
}
