import { Request, Response } from "express";
import { assertOwnChild } from "../services/child.service.js";
import * as courseService from "../services/course.service.js";
import { fail, ok } from "../utils/api-response.js";

export async function list(req: Request, res: Response) {
  const childId = req.query.childId?.toString();
  if (childId) await assertOwnChild(req.user!.id, childId);
  ok(res, await courseService.getCourses(childId));
}

export async function get(req: Request, res: Response) {
  const childId = req.query.childId?.toString();
  if (childId) await assertOwnChild(req.user!.id, childId);
  const course = await courseService.getCourse(req.params.id, childId);
  if (!course) {
    fail(res, 404, "NOT_FOUND", "Kursus tidak ditemukan.");
    return;
  }
  ok(res, course);
}

export async function lesson(req: Request, res: Response) {
  const childId = req.query.childId?.toString();
  if (childId) await assertOwnChild(req.user!.id, childId);
  const lessonData = await courseService.getLesson(req.params.id, childId);
  if (!lessonData) {
    fail(res, 404, "NOT_FOUND", "Materi tidak ditemukan.");
    return;
  }
  ok(res, lessonData);
}
