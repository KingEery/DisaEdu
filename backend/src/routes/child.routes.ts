import { Router } from "express";
import * as controller from "../controllers/child.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";

export const childRoutes = Router();

childRoutes.use(requireAuth);
childRoutes.get("/", asyncHandler(controller.list));
childRoutes.post("/", asyncHandler(controller.create));
childRoutes.get("/:id", asyncHandler(controller.get));
childRoutes.put("/:id", asyncHandler(controller.update));
childRoutes.delete("/:id", asyncHandler(controller.remove));

