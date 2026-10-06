import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as controller from "../controllers/learning.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const aiLimiter = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true, legacyHeaders: false });

export const learningRoutes = Router();

learningRoutes.use(requireAuth);
learningRoutes.get("/progress/:childId", asyncHandler(controller.getProgress));
learningRoutes.get("/dashboard/:childId", asyncHandler(controller.getDashboard));
learningRoutes.post("/progress", asyncHandler(controller.saveProgress));
learningRoutes.post("/learning-sessions", asyncHandler(controller.startSession));
learningRoutes.get("/lessons/:lessonId/quiz", asyncHandler(controller.getQuiz));
learningRoutes.post("/lessons/:lessonId/quiz/submit", asyncHandler(controller.submitQuiz));
learningRoutes.post("/ai/lesson", aiLimiter, asyncHandler(controller.askAi));
learningRoutes.get("/ai/status", asyncHandler(controller.aiStatus));
