import { prisma } from "../config/prisma.js";

export async function getCourses(childId?: string) {
  const courses = await prisma.course.findMany({ include: { lessons: { include: { progress: childId ? { where: { childId } } : false } } }, orderBy: { createdAt: "asc" } });
  return courses.map((course) => {
    const completed = course.lessons.filter((lesson) => lesson.progress?.some((item) => item.completed)).length;
    return { ...course, lessonCount: course.lessons.length, progress: course.lessons.length ? Math.round((completed / course.lessons.length) * 100) : 0 };
  });
}

export async function getCourse(id: string, childId?: string) {
  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: {
        include: {
          progress: childId ? { where: { childId } } : false,
          quizQuestions: true
        },
        orderBy: { order: "asc" }
      }
    }
  });
  if (!course) return null;
  const completed = course.lessons.filter((lesson) => lesson.progress?.some((item) => item.completed)).length;
  return { ...course, progress: course.lessons.length ? Math.round((completed / course.lessons.length) * 100) : 0 };
}

export async function getLesson(id: string, childId?: string) {
  return prisma.lesson.findUnique({
    where: { id },
    include: {
      course: true,
      quizQuestions: true,
      progress: childId ? { where: { childId } } : false
    }
  });
}
