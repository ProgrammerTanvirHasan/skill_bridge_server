import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      tutorProfile: {
        select: {
          id: true,
          bio: true,
          hourlyRate: true,
          status: true,
          categories: { include: { category: true } }
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};
var updateUserStatus = async (userId, status) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true
    }
  });
};
var getAllBookings = async () => {
  return prisma.booking.findMany({
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
};
var getAllCategoriesAdmin = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { tutors: true } }
    }
  });
};
var createCategory = async (name) => {
  return prisma.category.create({
    data: { name }
  });
};
var updateCategory = async (id, name) => {
  return prisma.category.update({
    where: { id },
    data: { name }
  });
};
var deleteCategory = async (id) => {
  await prisma.tutorCategory.deleteMany({ where: { categoryId: id } });
  return prisma.category.delete({
    where: { id }
  });
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategoriesAdmin,
  createCategory,
  updateCategory,
  deleteCategory
};

export {
  adminService
};
