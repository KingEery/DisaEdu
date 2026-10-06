import { prisma } from "../../config/prisma.js";
import { assertOwnChild } from "../child.service.js";
import { GeminiAiProvider } from "./gemini.provider.js";
import { MockAiProvider } from "./mock.provider.js";
import { env } from "../../config/env.js";

const provider = env.aiProvider === "gemini" ? new GeminiAiProvider() : new MockAiProvider();

export function getAiStatus() {
  const isDemo = env.aiProvider !== "gemini";
  return {
    provider: isDemo ? "Mock provider berbasis aturan" : "Google Gemini",
    providerKey: env.aiProvider,
    mode: isDemo ? "demo" : "live",
    isDemo,
    personalization: ["usia", "minat", "preferensi belajar"],
    examples: [
      { profile: "Raka, 7 tahun", details: "Minat: menggambar · Preferensi: visual", response: "Gunakan contoh gambar sederhana dan satu langkah pendek." },
      { profile: "Naya, 12 tahun", details: "Minat: musik · Preferensi: percakapan", response: "Gunakan analogi irama dan ajak anak menjelaskan dengan kalimatnya sendiri." }
    ]
  };
}

export async function askLessonAi(parentId: string, childId: string, lessonId: string, message: string) {
  const child = await assertOwnChild(parentId, childId);
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) throw new Error("LESSON_NOT_FOUND");

  const answer = await provider.lessonHelp({
    childName: child.name,
    childAge: child.age,
    lessonTitle: lesson.title,
    lessonContent: lesson.content,
    preferences: child.learningPreferences as string[],
    interests: child.interests as string[],
    message
  });
  return { answer };
}

export async function simulationAiReply(sessionId: string, message: string) {
  const session = await prisma.simulationSession.findUnique({
    where: { id: sessionId },
    include: { simulation: true, messages: { orderBy: { createdAt: "asc" } } }
  });
  if (!session) throw new Error("SESSION_NOT_FOUND");

  return provider.simulationReply({
    scenario: session.simulation.title,
    systemPrompt: session.simulation.systemPrompt,
    history: session.messages,
    message
  });
}
