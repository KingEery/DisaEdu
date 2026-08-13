import { prisma } from "../config/prisma.js";

export async function listChildren(parentId: string) {
  return prisma.child.findMany({ where: { parentId }, orderBy: { createdAt: "asc" } });
}

export async function createChild(parentId: string, data: { name: string; age: number; avatar?: string; interests: string[]; learningPreferences: string[] }) {
  return prisma.child.create({ data: { ...data, parentId } });
}

export async function getOwnedChild(parentId: string, childId: string) {
  return prisma.child.findFirst({ where: { id: childId, parentId } });
}

export async function updateChild(parentId: string, childId: string, data: { name: string; age: number; avatar?: string; interests: string[]; learningPreferences: string[] }) {
  await assertOwnChild(parentId, childId);
  return prisma.child.update({ where: { id: childId }, data });
}

export async function deleteChild(parentId: string, childId: string) {
  await assertOwnChild(parentId, childId);
  return prisma.child.delete({ where: { id: childId } });
}

export async function assertOwnChild(parentId: string, childId: string) {
  const child = await getOwnedChild(parentId, childId);
  if (!child) throw new Error("FORBIDDEN_CHILD");
  return child;
}

