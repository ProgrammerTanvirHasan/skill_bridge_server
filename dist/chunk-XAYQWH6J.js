import {
  prisma
} from "./chunk-T4KIXJWJ.js";

// src/modules/user/user.service.ts
var getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var updateUserProfile = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true
    }
  });
};
var userService = {
  getAllUsers,
  updateUserProfile,
  getUserById
};

export {
  userService
};
