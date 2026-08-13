import { Request, Response } from "express";
import { childSchema } from "../validators/child.validator.js";
import * as childService from "../services/child.service.js";
import { fail, ok } from "../utils/api-response.js";

export async function list(req: Request, res: Response) {
  ok(res, await childService.listChildren(req.user!.id));
}

export async function create(req: Request, res: Response) {
  const data = childSchema.parse(req.body);
  ok(res, await childService.createChild(req.user!.id, data), 201);
}

export async function get(req: Request, res: Response) {
  const child = await childService.getOwnedChild(req.user!.id, req.params.id);
  if (!child) {
    fail(res, 403, "FORBIDDEN", "Profil anak tidak dapat diakses.");
    return;
  }
  ok(res, child);
}

export async function update(req: Request, res: Response) {
  const data = childSchema.parse(req.body);
  try {
    ok(res, await childService.updateChild(req.user!.id, req.params.id, data));
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN_CHILD") {
      fail(res, 403, "FORBIDDEN", "Profil anak tidak dapat diakses.");
      return;
    }
    throw error;
  }
}

export async function remove(req: Request, res: Response) {
  try {
    ok(res, await childService.deleteChild(req.user!.id, req.params.id));
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN_CHILD") {
      fail(res, 403, "FORBIDDEN", "Profil anak tidak dapat diakses.");
      return;
    }
    throw error;
  }
}
