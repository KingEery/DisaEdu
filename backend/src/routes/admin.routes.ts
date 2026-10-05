import { Router } from "express";
import * as controller from "../controllers/admin.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const adminRoutes = Router();
adminRoutes.use(requireAuth, requireAdmin);
adminRoutes.get("/overview", asyncHandler(controller.overview));
adminRoutes.get("/users", asyncHandler(controller.users));
adminRoutes.get("/courses", asyncHandler(controller.courses));
adminRoutes.post("/courses", asyncHandler(controller.createCourse));
adminRoutes.put("/courses/:id", asyncHandler(controller.updateCourse));
adminRoutes.delete("/courses/:id", asyncHandler(controller.deleteCourse));
adminRoutes.get("/lessons", asyncHandler(controller.lessons));
adminRoutes.post("/lessons", asyncHandler(controller.createLesson));
adminRoutes.put("/lessons/:id", asyncHandler(controller.updateLesson));
adminRoutes.delete("/lessons/:id", asyncHandler(controller.deleteLesson));
