import { prisma } from "../config/prisma.js";

export async function getQuiz(lessonId: string) {
  return prisma.quizQuestion.findMany({ where: { lessonId } });
}

export async function submitQuiz(childId: string, lessonId: string, answers: Record<string, string>) {
  const questions = await getQuiz(lessonId);
  const correct = questions.filter((question) => answers[question.id] === question.correctAnswer).length;
  const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
  const attempt = await prisma.quizAttempt.create({ data: { childId, lessonId, score } });
  return { attempt, score, correct, total: questions.length, questions };
}

