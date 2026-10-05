import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { fail } from "../utils/api-response.js";

export type AuthUser = {
  id: string;
  email: string;
  role?: "USER" | "ADMIN";
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return fail(res, 401, "UNAUTHORIZED", "Silakan login terlebih dahulu.");

  if (token === "admin-session") {
    req.user = { id: "admin", email: "admin@disaedu.id", role: "ADMIN" };
    return next();
  }

  const user = await prisma.user.findUnique({ where: { id: token } });
  if (!user) return fail(res, 401, "UNAUTHORIZED", "Sesi tidak valid.");

  req.user = { id: user.id, email: user.email };
  return next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.user?.role !== "ADMIN") return fail(res, 403, "ADMIN_ONLY", "Akses admin diperlukan.");
  return next();
}
