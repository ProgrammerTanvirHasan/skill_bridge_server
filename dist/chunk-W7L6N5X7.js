import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/modules/review/review.service.ts
var createReview = async (studentId, data) => {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  if (!data.bookingId) {
    throw new Error("Booking ID is required to submit a review");
  }
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId }
  });
  if (!booking) {
    throw new Error("Booking not found");
  }
  if (booking.studentId !== studentId) {
    throw new Error("You are not allowed to review this booking");
  }
  if (booking.tutorId !== data.tutorId) {
    throw new Error("Tutor mismatch for this booking");
  }
  if (booking.status !== "COMPLETED") {
    throw new Error("Only completed bookings can be reviewed");
  }
  const existingReview = await prisma.review.findFirst({
    where: {
      bookingId: data.bookingId
    }
  });
  if (existingReview) {
    throw new Error("You have already reviewed this booking");
  }
  const review = await prisma.review.create({
    data: {
      studentId,
      tutorId: data.tutorId,
      bookingId: data.bookingId,
      rating: data.rating,
      comment: data.comment ?? null
    },
    include: {
      student: {
        select: {
          id: true,
          name: true
        }
      },
      tutor: {
        include: {
          user: true
        }
      }
    }
  });
  return review;
};
var getReviewsForTutor = async (userId) => {
  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { userId }
  });
  if (!tutorProfile) {
    throw new Error("Tutor profile not found");
  }
  return prisma.review.findMany({
    where: { tutorId: tutorProfile.id },
    include: {
      student: {
        select: { id: true, name: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var reviewService = {
  createReview,
  getReviewsForTutor
};

export {
  reviewService
};
