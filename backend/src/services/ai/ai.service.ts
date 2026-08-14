import { prisma } from "../../config/prisma.js";
import { assertOwnChild } from "../child.service.js";
import { GeminiAiProvider } from "./gemini.provider.js";

const provider = new GeminiAiProvider();

export async function askLessonAi(parentId: string, childId: string, lessonId: string, message: string) {
  const child = await assertOwnChild(parentId, childId);
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) throw new Error("LESSON_NOT_FOUND");

  const answer = await provider.lessonHelp({
    childName: child.name,
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

