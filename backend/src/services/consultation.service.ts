import { prisma } from "../config/prisma.js";

export async function listExperts() {
  return prisma.consultationExpert.findMany({ orderBy: { name: "asc" } });
}

export async function listBookings(userId: string) {
  return prisma.consultationBooking.findMany({
    where: { userId }, include: { expert: true }, orderBy: { scheduledAt: "desc" }
  });
}

export async function createBooking(userId: string, data: { expertId: string; scheduledAt: string; notes?: string }) {
  const expert = await prisma.consultationExpert.findUnique({ where: { id: data.expertId } });
  if (!expert) throw new Error("EXPERT_NOT_FOUND");
  const scheduledAt = new Date(data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime())) throw new Error("INVALID_DATE");
  const existing = await prisma.consultationBooking.findFirst({
    where: { expertId: data.expertId, scheduledAt, status: { not: "cancelled" } }
  });
  if (existing) throw new Error("SLOT_TAKEN");
  return prisma.consultationBooking.create({ data: {
    userId, expertId: expert.id, scheduledAt, notes: data.notes, duration: expert.duration, price: expert.price
  }, include: { expert: true } });
}

export async function cancelBooking(userId: string, id: string) {
  const booking = await prisma.consultationBooking.findFirst({ where: { id, userId } });
  if (!booking) throw new Error("BOOKING_NOT_FOUND");
  if (booking.status === "cancelled") return booking;
  return prisma.consultationBooking.update({ where: { id }, data: { status: "cancelled" }, include: { expert: true } });
}

export async function updateBookingStatus(id: string, status: "confirmed" | "cancelled") {
  return prisma.consultationBooking.update({ where: { id }, data: { status }, include: { expert: true } });
}
