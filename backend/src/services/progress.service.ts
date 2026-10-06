import { prisma } from "../config/prisma.js";

export async function startLearningSession(childId: string, lessonId: string) {
  return prisma.learningSession.create({ data: { childId, lessonId } });
}

export async function saveProgress(childId: string, lessonId: string, completed: boolean, progress: number, sessionId?: string) {
  if (completed && sessionId) {
    const session = await prisma.learningSession.findFirst({ where: { id: sessionId, childId, lessonId, completedAt: null } });
    if (session) {
      const completedAt = new Date();
      await prisma.learningSession.update({ where: { id: session.id }, data: { completedAt, durationSeconds: Math.max(0, Math.round((completedAt.getTime() - session.startedAt.getTime()) / 1000)) } });
    }
  }
  return prisma.lessonProgress.upsert({
    where: { childId_lessonId: { childId, lessonId } },
    create: { childId, lessonId, completed, progress, completedAt: completed ? new Date() : null },
    update: { completed, progress, completedAt: completed ? new Date() : null }
  });
}

export async function getProgress(childId: string) {
  const courses = await prisma.course.findMany({ include: { lessons: { include: { progress: { where: { childId } } } } }, orderBy: { createdAt: "asc" } });
  const courseProgress = courses.map((course) => {
    const completedLessons = course.lessons.filter((lesson) => lesson.progress.some((item) => item.completed)).length;
    return {
      id: course.id,
      title: course.title,
      completedLessons,
      totalLessons: course.lessons.length,
      progress: course.lessons.length ? Math.round((completedLessons / course.lessons.length) * 100) : 0
    };
  });
  const totalLessons = courseProgress.reduce((sum, item) => sum + item.totalLessons, 0);
  const completedLessons = courseProgress.reduce((sum, item) => sum + item.completedLessons, 0);
  const simulationCompleted = await prisma.simulationSession.count({ where: { childId, status: "COMPLETED" } });
  const quizAttempts = await prisma.quizAttempt.count({ where: { childId } });
  const since = new Date();
  since.setDate(since.getDate() - 6);
  since.setHours(0, 0, 0, 0);
  const sessions = await prisma.learningSession.findMany({ where: { childId, startedAt: { gte: since }, completedAt: { not: null } }, select: { startedAt: true, durationSeconds: true } });
  const weeklyActivity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(since);
    date.setDate(since.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return { day: date.toLocaleDateString("id-ID", { weekday: "short" }).replace(".", ""), date: key, minutes: sessions.filter((item) => item.startedAt.toISOString().slice(0, 10) === key).reduce((sum, item) => sum + Math.round((item.durationSeconds ?? 0) / 60), 0) };
  });
  return {
    overall: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    completedLessons,
    totalLessons,
    simulationCompleted,
    quizAttempts,
    courses: courseProgress,
    weeklyActivity,
    weeklyMinutes: weeklyActivity.reduce((sum, item) => sum + item.minutes, 0)
  };
}

export async function dashboard(childId: string) {
  const progress = await getProgress(childId);
  const lastProgress = await prisma.lessonProgress.findFirst({ where: { childId }, include: { lesson: { include: { course: true } } }, orderBy: { updatedAt: "desc" } });
  const nextLesson = await prisma.lesson.findFirst({
    where: { progress: { none: { childId, completed: true } } },
    include: { course: true },
    orderBy: { order: "asc" }
  });
  return {
    progress,
    lastLesson: lastProgress?.lesson ?? null,
    recommendation: nextLesson ? `Lanjutkan materi "${nextLesson.title}" di ${nextLesson.course.title}.` : "Coba latihan percakapan selama 10 menit hari ini.",
    nextLesson
  };
}
