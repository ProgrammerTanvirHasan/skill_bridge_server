import { prisma } from "../../lib/prisma";
type UpdateUserInput = {
  name?: string;
  email?: string;
};
const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

const updateUserProfile = async (id: string, data: UpdateUserInput) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

export const userService = {
  getAllUsers,
  updateUserProfile,
  getUserById,
};
