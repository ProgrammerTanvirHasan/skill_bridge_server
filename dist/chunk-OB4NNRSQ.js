import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/modules/booking/booking.service.ts
var createBooking = async (studentId, data) => {
  return prisma.booking.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      scheduledAt: data.scheduledAt,
      status: "PENDING"
    },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    }
  });
};
var getBookingsByUser = async (userId, role) => {
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (!profile) return [];
    return prisma.booking.findMany({
      where: { tutorId: profile.id },
      include: {
        student: { select: { id: true, name: true, email: true } },
        tutor: {
          include: {
            user: true,
            categories: { include: { category: true } }
          }
        }
      },
      orderBy: { scheduledAt: "desc" }
    });
  }
  return prisma.booking.findMany({
    where: { studentId: userId },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    },
    orderBy: { scheduledAt: "desc" }
  });
};
var getBookingById = async (id, userId, role) => {
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      tutor: {
        include: {
          user: true,
          categories: { include: { category: true } }
        }
      },
      student: { select: { id: true, name: true, email: true } }
    }
  });
  if (!booking) return null;
  if (role === "ADMIN") return booking;
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (profile?.id === booking.tutorId) return booking;
  }
  if (booking.studentId === userId) return booking;
  return null;
};
var updateBookingStatus = async (id, status, userId, role) => {
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return null;
  if (role === "TUTOR") {
    const profile = await prisma.tutorProfile.findUnique({
      where: { userId },
      select: { id: true }
    });
    if (profile?.id !== booking.tutorId) return null;
  } else if (role !== "ADMIN" && booking.studentId !== userId) {
    return null;
  }
  return prisma.booking.update({
    where: { id },
    data: { status },
    include: {
      tutor: { include: { user: true } },
      student: { select: { id: true, name: true, email: true } }
    }
  });
};
var getBookingsByTutorId = async (tutorId) => {
  return prisma.booking.findMany({
    where: { tutorId: Number(tutorId) },
    include: {
      student: true,
      tutor: true
    },
    orderBy: { createdAt: "desc" }
  });
};
var bookingService = {
  createBooking,
  getBookingsByUser,
  getBookingById,
  getBookingsByTutorId,
  updateBookingStatus
};

export {
  getBookingsByTutorId,
  bookingService
};
