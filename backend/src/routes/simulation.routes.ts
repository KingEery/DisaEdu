import { Router } from "express";
import rateLimit from "express-rate-limit";
import * as controller from "../controllers/simulation.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

const aiLimiter = rateLimit({ windowMs: 60_000, limit: 20, standardHeaders: true, legacyHeaders: false });

export const simulationRoutes = Router();

simulationRoutes.use(requireAuth);
simulationRoutes.get("/simulations", asyncHandler(controller.list));
simulationRoutes.post("/simulations/:id/start", asyncHandler(controller.start));
simulationRoutes.post("/simulations/:id/message", aiLimiter, asyncHandler(controller.message));
simulationRoutes.post("/simulations/:id/finish", asyncHandler(controller.finish));
simulationRoutes.post("/ai/simulation", aiLimiter, asyncHandler(controller.message));

