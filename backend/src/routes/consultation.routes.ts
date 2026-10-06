import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import * as controller from "../controllers/consultation.controller.js";

export const consultationRoutes = Router();
consultationRoutes.use(requireAuth);
consultationRoutes.get("/consultation/experts", asyncHandler(controller.experts));
consultationRoutes.get("/consultation/bookings", asyncHandler(controller.bookings));
consultationRoutes.post("/consultation/bookings", asyncHandler(controller.create));
consultationRoutes.patch("/consultation/bookings/:id", asyncHandler(controller.cancel));
consultationRoutes.patch("/admin/consultation/bookings/:id", requireAdmin, asyncHandler(controller.adminUpdate));
