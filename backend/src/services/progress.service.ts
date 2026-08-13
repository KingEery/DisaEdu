import { prisma } from "../config/prisma.js";

export async function saveProgress(childId: string, lessonId: string, completed: boolean, progress: number) {
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
  return {
    overall: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
    completedLessons,
    totalLessons,
    simulationCompleted,
    quizAttempts,
    courses: courseProgress
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

