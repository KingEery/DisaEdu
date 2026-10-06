import { z } from "zod";

export const createBookingSchema = z.object({
  expertId: z.string().min(1),
  scheduledAt: z.string().datetime(),
  notes: z.string().max(1000).optional()
});

export const bookingStatusSchema = z.object({ status: z.enum(["cancelled"]) });
