import { Request, Response } from "express";
import * as simulationService from "../services/simulation.service.js";
import { simulationMessageSchema, simulationStartSchema } from "../validators/learning.validator.js";
import { fail, ok } from "../utils/api-response.js";

export async function list(_req: Request, res: Response) {
  ok(res, await simulationService.listSimulations());
}

export async function start(req: Request, res: Response) {
  const data = simulationStartSchema.parse(req.body);
  try {
    ok(res, await simulationService.startSimulation(req.user!.id, data.childId, req.params.id), 201);
  } catch (error) {
    if (error instanceof Error && error.message === "SIMULATION_NOT_FOUND") {
      fail(res, 404, "NOT_FOUND", "Simulasi tidak ditemukan.");
      return;
    }
    throw error;
  }
}

export async function message(req: Request, res: Response) {
  const data = simulationMessageSchema.parse(req.body);
  ok(res, await simulationService.sendSimulationMessage(req.user!.id, data.childId, data.sessionId, data.message));
}

export async function finish(req: Request, res: Response) {
  const data = simulationStartSchema.extend({ sessionId: simulationMessageSchema.shape.sessionId }).parse(req.body);
  ok(res, await simulationService.finishSimulation(req.user!.id, data.childId, data.sessionId));
}
