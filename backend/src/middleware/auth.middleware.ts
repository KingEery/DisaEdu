import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { fail } from "../utils/api-response.js";

export type AuthUser = {
  id: string;
  email: string;
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

  const user = await prisma.user.findUnique({ where: { id: token } });
  if (!user) return fail(res, 401, "UNAUTHORIZED", "Sesi tidak valid.");

  req.user = { id: user.id, email: user.email };
  return next();
}

