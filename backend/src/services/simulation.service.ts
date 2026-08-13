import { prisma } from "../config/prisma.js";
import { assertOwnChild } from "./child.service.js";
import { simulationAiReply } from "./ai/ai.service.js";

export async function listSimulations() {
  return prisma.simulation.findMany({ orderBy: { createdAt: "asc" } });
}

export async function startSimulation(parentId: string, childId: string, simulationId: string) {
  await assertOwnChild(parentId, childId);
  const simulation = await prisma.simulation.findUnique({ where: { id: simulationId } });
  if (!simulation) throw new Error("SIMULATION_NOT_FOUND");
  const session = await prisma.simulationSession.create({ data: { childId, simulationId } });
  const opening = openingMessage(simulation.title);
  await prisma.simulationMessage.create({ data: { sessionId: session.id, role: "assistant", content: opening } });
  return { session, opening };
}

export async function sendSimulationMessage(parentId: string, childId: string, sessionId: string, message: string) {
  await assertOwnChild(parentId, childId);
  const session = await prisma.simulationSession.findFirst({ where: { id: sessionId, childId } });
  if (!session) throw new Error("SESSION_NOT_FOUND");

  await prisma.simulationMessage.create({ data: { sessionId, role: "child", content: message } });
  const reply = await simulationAiReply(sessionId, message);
  await prisma.simulationMessage.create({ data: { sessionId, role: "assistant", content: reply } });
  const messages = await prisma.simulationMessage.findMany({ where: { sessionId }, orderBy: { createdAt: "asc" } });
  return { reply, messages };
}

export async function finishSimulation(parentId: string, childId: string, sessionId: string) {
  await assertOwnChild(parentId, childId);
  const session = await prisma.simulationSession.findFirst({ where: { id: sessionId, childId } });
  if (!session) throw new Error("SESSION_NOT_FOUND");
  return prisma.simulationSession.update({ where: { id: sessionId }, data: { status: "COMPLETED", completedAt: new Date() } });
}

function openingMessage(title: string) {
  if (title.includes("Bertemu")) return "Hai! Namaku Budi. Siapa namamu?";
  if (title.includes("Bantuan")) return "Halo. Kamu terlihat butuh bantuan. Apa yang bisa aku bantu?";
  if (title.includes("Guru")) return "Selamat pagi. Ada yang ingin kamu tanyakan di kelas?";
  return "Halo. Selamat datang di toko. Kamu ingin membeli apa?";
}

