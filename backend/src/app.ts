import cors from "cors";
import express from "express";
import { authRoutes } from "./routes/auth.routes.js";
import { childRoutes } from "./routes/child.routes.js";
import { courseRoutes } from "./routes/course.routes.js";
import { learningRoutes } from "./routes/learning.routes.js";
import { simulationRoutes } from "./routes/simulation.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api", courseRoutes);
app.use("/api", learningRoutes);
app.use("/api", simulationRoutes);
app.use(errorMiddleware);

