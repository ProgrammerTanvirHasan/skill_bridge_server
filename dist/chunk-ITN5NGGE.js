import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/modules/tutors/tutors.service.ts
var createTutorProfile = async (userId, data) => {
  const categoryIds = [...new Set(data.categoryIds ?? [])];
  return prisma.$transaction(async (tx) => {
    const existing = await tx.tutorProfile.findUnique({
      where: { userId }
    });
    if (existing) {
      throw new Error("Your profile already exists");
    }
    const profile = await tx.tutorProfile.create({
      data: {
        userId,
        bio: data.bio,
        hourlyRate: data.hourlyRate,
        status: data.status
      }
    });
    if (categoryIds.length) {
      await tx.tutorCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          tutorProfileId: profile.id,
          categoryId
        })),
        skipDuplicates: true
      });
    }
    return tx.tutorProfile.findUnique({
      where: { id: profile.id },
      include: {
        user: true,
        categories: { include: { category: true } }
      }
    });
  });
};
var getAllTutors = async (filters) => {
  const where = {};
  if (filters?.categoryId) {
    where.categories = {
      some: { categoryId: filters.categoryId }
    };
  }
  if (filters?.maxPrice) {
    where.hourlyRate = { lte: filters.maxPrice };
  }
  const tutors = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: true,
      categories: { include: { category: true } },
      reviews: true,
      availability: true
    }
  });
  if (filters?.minRating) {
    return tutors.filter((t) => {
      if (!t.reviews.length) return false;
      const avg = t.reviews.reduce((s, r) => s + r.rating, 0) / t.reviews.length;
      return avg >= filters.minRating;
    });
  }
  return tutors;
};
var getTutorById = async (tutorId) => {
  return prisma.tutorProfile.findUnique({
    where: { id: tutorId },
    include: {
      user: true,
      categories: { include: { category: true } },
      reviews: { include: { student: true } }
    }
  });
};
var getAllTutorProfiles = async () => {
  const profiles = await prisma.tutorProfile.findMany({
    include: {
      user: true,
      // যাতে email access করতে পারো
      categories: { include: { category: true } }
    }
  });
  return profiles.map((profile) => ({
    id: profile.id,
    bio: profile.bio,
    hourlyRateCents: profile.hourlyRate,
    status: profile.status,
    categoryIds: profile.categories.map((c) => c.category.id),
    user: {
      id: profile.user.id,
      email: profile.user.email,
      name: profile.user.name
    }
  }));
};
var getTutorByUserId = async (userId) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });
  if (!profile) return null;
  return {
    id: profile.id,
    bio: profile.bio,
    hourlyRateCents: profile.hourlyRate,
    status: profile.status,
    categoryIds: profile.categories.map((c) => c.category.id)
  };
};
var updateTutorProfile = async (userId, data) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!profile) throw new Error("Profile not found");
  const categoryIds = [...new Set(data.categoryIds ?? [])];
  return prisma.$transaction(async (tx) => {
    if (data.categoryIds) {
      await tx.tutorCategory.deleteMany({
        where: { tutorProfileId: profile.id }
      });
      if (categoryIds.length) {
        await tx.tutorCategory.createMany({
          data: categoryIds.map((categoryId) => ({
            tutorProfileId: profile.id,
            categoryId
          })),
          skipDuplicates: true
        });
      }
    }
    return tx.tutorProfile.update({
      where: { id: profile.id },
      data: {
        ...data.bio && { bio: data.bio },
        ...data.hourlyRate && { hourlyRate: data.hourlyRate },
        ...data.status && { status: data.status }
      },
      include: {
        user: true,
        categories: { include: { category: true } },
        availability: true
      }
    });
  });
};
var setAvailability = async (userId, slots) => {
  const profile = await prisma.tutorProfile.findUnique({
    where: { userId },
    select: { id: true }
  });
  if (!profile) throw new Error("Profile not found");
  return prisma.$transaction(async (tx) => {
    await tx.tutorAvailability.deleteMany({
      where: { tutorId: profile.id }
    });
    if (slots.length) {
      await tx.tutorAvailability.createMany({
        data: slots.map((s) => ({
          tutorId: profile.id,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime
        }))
      });
    }
    return tx.tutorAvailability.findMany({
      where: { tutorId: profile.id },
      orderBy: { dayOfWeek: "asc" }
    });
  });
};
var tutorsService = {
  createTutorProfile,
  getAllTutors,
  getTutorById,
  getTutorByUserId,
  getAllTutorProfiles,
  updateTutorProfile,
  setAvailability
};

export {
  tutorsService
};
