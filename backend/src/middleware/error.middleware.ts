import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { fail } from "../utils/api-response.js";

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return fail(res, 400, "VALIDATION_ERROR", "Data yang dikirim belum lengkap atau tidak sesuai.");
  }

  console.error(error);
  return fail(res, 500, "INTERNAL_ERROR", "Terjadi kendala. Coba lagi sebentar ya.");
}

