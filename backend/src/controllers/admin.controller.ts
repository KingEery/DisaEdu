import { Request, Response } from "express";
import * as adminService from "../services/admin.service.js";
import { fail, ok } from "../utils/api-response.js";

export async function overview(_req: Request, res: Response) { ok(res, await adminService.overview()); }
export async function users(_req: Request, res: Response) { ok(res, await adminService.listUsers()); }
export async function courses(_req: Request, res: Response) { ok(res, await adminService.listCourses()); }
export async function createCourse(req: Request, res: Response) { ok(res, await adminService.createCourse(req.body), 201); }
export async function updateCourse(req: Request, res: Response) { ok(res, await adminService.updateCourse(req.params.id, req.body)); }
export async function deleteCourse(req: Request, res: Response) {
  try { ok(res, await adminService.deleteCourse(req.params.id)); }
  catch (error) { if (error instanceof Error && error.message.includes("Record to delete does not exist")) return fail(res, 404, "NOT_FOUND", "Kursus tidak ditemukan."); throw error; }
}
export async function lessons(req: Request, res: Response) { ok(res, await adminService.listLessons(req.query.courseId?.toString())); }
export async function createLesson(req: Request, res: Response) { ok(res, await adminService.createLesson(req.body), 201); }
export async function updateLesson(req: Request, res: Response) { ok(res, await adminService.updateLesson(req.params.id, req.body)); }
export async function deleteLesson(req: Request, res: Response) { ok(res, await adminService.deleteLesson(req.params.id)); }
