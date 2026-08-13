import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import * as authService from "../services/auth.service.js";
import { fail, ok } from "../utils/api-response.js";

export async function register(req: Request, res: Response) {
  const data = registerSchema.parse(req.body);
  try {
    ok(res, await authService.register(data.email, data.password), 201);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") return fail(res, 400, "EMAIL_EXISTS", "Email sudah terdaftar.");
    throw error;
  }
}

export async function login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body);
  try {
    ok(res, await authService.login(data.email, data.password));
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_LOGIN") return fail(res, 401, "INVALID_LOGIN", "Email atau password belum sesuai.");
    throw error;
  }
}

export async function me(req: Request, res: Response) {
  ok(res, { user: req.user });
}
