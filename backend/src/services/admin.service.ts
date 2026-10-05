import { prisma } from "../config/prisma.js";

export async function overview() {
  const [users, children, courses, lessons] = await Promise.all([
    prisma.user.count(), prisma.child.count(), prisma.course.count(), prisma.lesson.count()
  ]);
  return { users, children, courses, lessons };
}

export async function listCourses() {
  return prisma.course.findMany({ include: { _count: { select: { lessons: true } } }, orderBy: { createdAt: "desc" } });
}

export async function createCourse(data: { title: string; description: string; category: string; difficulty: string; thumbnail?: string }) {
  return prisma.course.create({ data });
}

export async function updateCourse(id: string, data: { title: string; description: string; category: string; difficulty: string; thumbnail?: string }) {
  return prisma.course.update({ where: { id }, data });
}

export async function deleteCourse(id: string) {
  return prisma.course.delete({ where: { id } });
}

export async function listUsers() {
  return prisma.user.findMany({ select: { id: true, email: true, createdAt: true, _count: { select: { children: true } } }, orderBy: { createdAt: "desc" } });
}

export async function listLessons(courseId?: string) {
  return prisma.lesson.findMany({ where: courseId ? { courseId } : undefined, include: { course: { select: { title: true } } }, orderBy: [{ courseId: "asc" }, { order: "asc" }] });
}

type LessonInput = { courseId: string; title: string; description: string; content: string; activityPrompt: string; activityAnswer: string; order: number; duration: number };
export async function createLesson(data: LessonInput) { return prisma.lesson.create({ data }); }
export async function updateLesson(id: string, data: LessonInput) { return prisma.lesson.update({ where: { id }, data }); }
export async function deleteLesson(id: string) { return prisma.lesson.delete({ where: { id } }); }
