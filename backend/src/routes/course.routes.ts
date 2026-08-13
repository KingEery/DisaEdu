import { Router } from "express";
import * as controller from "../controllers/course.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const courseRoutes = Router();

courseRoutes.use(requireAuth);
courseRoutes.get("/courses", asyncHandler(controller.list));
courseRoutes.get("/courses/:id", asyncHandler(controller.get));
courseRoutes.get("/lessons/:id", asyncHandler(controller.lesson));

