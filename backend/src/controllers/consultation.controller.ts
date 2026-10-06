import { Request, Response } from "express";
import { fail, ok } from "../utils/api-response.js";
import * as service from "../services/consultation.service.js";
import { bookingStatusSchema, createBookingSchema } from "../validators/consultation.validator.js";
import { z } from "zod";

export async function experts(_req: Request, res: Response) { ok(res, await service.listExperts()); }
export async function bookings(req: Request, res: Response) { ok(res, await service.listBookings(req.user!.id)); }
export async function create(req: Request, res: Response) {
  try { ok(res, await service.createBooking(req.user!.id, createBookingSchema.parse(req.body)), 201); }
  catch (error) {
    const code = error instanceof Error ? error.message : "";
    if (code === "EXPERT_NOT_FOUND") return fail(res, 404, "NOT_FOUND", "Ahli tidak ditemukan.");
    if (code === "SLOT_TAKEN") return fail(res, 409, "SLOT_TAKEN", "Jadwal tersebut sudah dipesan.");
    throw error;
  }
}
export async function cancel(req: Request, res: Response) {
  try { bookingStatusSchema.parse(req.body); ok(res, await service.cancelBooking(req.user!.id, req.params.id)); }
  catch (error) {
    if (error instanceof Error && error.message === "BOOKING_NOT_FOUND") return fail(res, 404, "NOT_FOUND", "Booking tidak ditemukan.");
    throw error;
  }
}
export async function adminUpdate(req: Request, res: Response) {
  const data = zStatus.parse(req.body);
  ok(res, await service.updateBookingStatus(req.params.id, data.status));
}

const zStatus = z.object({ status: z.enum(["confirmed", "cancelled"]) });
