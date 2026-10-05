import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

export async function register(email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("EMAIL_EXISTS");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, passwordHash } });
  return { token: user.id, user: { id: user.id, email: user.email } };
}

export async function login(email: string, password: string) {
  // Admin account is intentionally kept separate from learner accounts.
  if (email.trim().toLowerCase() === "admin@disaedu.id" && password === "admin123") {
    return { token: "admin-session", user: { id: "admin", email: "admin@disaedu.id", role: "ADMIN" } };
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("INVALID_LOGIN");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("INVALID_LOGIN");

  return { token: user.id, user: { id: user.id, email: user.email } };
}
